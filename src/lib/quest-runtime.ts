import type { InventoryEntry, Item, Marketplace } from "../data/types";
import type { DialogueChoice } from "./dialogue";
import type { ContractStatus } from "./contracts";
import { addInventory, visibleQuantity } from "./inventory";
import { itemMatchesCatalogToken } from "./item-catalog";
import { questCanComplete, questDeadline, questReward } from "./quests";

export type RuntimeQuestStatus = "unseen" | "offered" | "accepted" | "ready" | "finished" | "failed";

export type QuestRuntimeState = {
  day: number;
  marketIndex: number;
  inventory: InventoryEntry[];
  questStates: Record<string, RuntimeQuestStatus>;
  questAcceptedDays: Record<string, number>;
  contractStates?: Record<string, ContractStatus>;
  contractAcceptedDays?: Record<string, number>;
  unlockedMarketIndexes?: number[];
  dialogueLog?: Array<{
    day: number;
    characterIndex?: number;
    characterName?: string;
    marketIndex: number;
    topic: string;
    note: string;
  }>;
};

export type QuestRuntimeTransaction =
  | { type: "acceptQuest"; marketIndex: number; day?: number }
  | { type: "setQuestStatus"; marketIndex: number; status: RuntimeQuestStatus }
  | { type: "addInventory"; itemIndex: number; quantity: number; conceal?: boolean }
  | { type: "removeInventory"; itemIndex: number; quantity: number }
  | { type: "removeInventoryByToken"; token: string; quantity?: number }
  | { type: "addCopper"; quantity: number }
  | { type: "acceptContract"; contractId: string; day?: number }
  | { type: "setContractStatus"; contractId: string; status: ContractStatus }
  | { type: "unlockMarket"; marketIndex: number }
  | { type: "appendDialogueLog"; topic: string; note: string; characterIndex?: number; characterName?: string; marketIndex?: number; day?: number };

export type QuestRuntimeResult = {
  state: QuestRuntimeState;
  ok: boolean;
  messages: string[];
  applied: QuestRuntimeTransaction[];
  failed?: QuestRuntimeTransaction;
};

export type QuestWorkSummary = {
  marketIndex: number;
  name: string;
  status: RuntimeQuestStatus;
  canComplete: boolean;
  deadline: number | null;
  requiredItems: string[];
  todo: string | null;
};

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function questKey(marketOrIndex: Marketplace | number) {
  return String(typeof marketOrIndex === "number" ? marketOrIndex : marketOrIndex.index);
}

export function questStatus(state: Pick<QuestRuntimeState, "questStates">, marketOrIndex: Marketplace | number): RuntimeQuestStatus {
  return (state.questStates[questKey(marketOrIndex)] || "offered") as RuntimeQuestStatus;
}

export function questIsActive(status: RuntimeQuestStatus) {
  return status === "accepted" || status === "ready";
}

export function describeQuestStatus(status: RuntimeQuestStatus) {
  if (status === "unseen") return "not discovered";
  if (status === "offered") return "available";
  if (status === "accepted") return "accepted";
  if (status === "ready") return "ready to complete";
  if (status === "finished") return "finished";
  return "failed";
}

function cleanupInventory(inventory: InventoryEntry[]) {
  for (let index = inventory.length - 1; index >= 0; index -= 1) {
    if (inventory[index].quantity <= 0) inventory.splice(index, 1);
    else inventory[index].offerQuantity = Math.max(0, Math.min(inventory[index].offerQuantity, inventory[index].quantity));
  }
}

function removeInventory(inventory: InventoryEntry[], itemIndex: number, quantity: number) {
  let remaining = Math.max(0, Math.floor(quantity));
  for (const entry of inventory) {
    if (remaining <= 0) break;
    if (entry.itemIndex !== itemIndex) continue;
    const taken = Math.min(visibleQuantity(entry), remaining);
    entry.quantity -= taken;
    remaining -= taken;
  }
  cleanupInventory(inventory);
  return remaining === 0;
}

function removeInventoryByToken(inventory: InventoryEntry[], items: Item[], token: string, quantity = 1) {
  let remaining = Math.max(0, Math.floor(quantity));
  for (const entry of inventory) {
    if (remaining <= 0) break;
    const item = items[entry.itemIndex];
    if (!item || !itemMatchesCatalogToken(item, token)) continue;
    const taken = Math.min(visibleQuantity(entry), remaining);
    entry.quantity -= taken;
    remaining -= taken;
  }
  cleanupInventory(inventory);
  return remaining === 0;
}

function copperItemIndex(items: Item[]) {
  return items.find((item) => item.name.toLowerCase() === "copper coins")?.index ?? items.find((item) => item.tags.includes("currency"))?.index ?? null;
}

export function applyQuestTransactions(
  state: QuestRuntimeState,
  transactions: QuestRuntimeTransaction[],
  context: { items: Item[] } = { items: [] }
): QuestRuntimeResult {
  const next = clone(state);
  next.contractStates ||= {};
  next.contractAcceptedDays ||= {};
  next.unlockedMarketIndexes ||= [];
  next.dialogueLog ||= [];
  const messages: string[] = [];
  const applied: QuestRuntimeTransaction[] = [];

  for (const transaction of transactions) {
    if (transaction.type === "acceptQuest") {
      const key = questKey(transaction.marketIndex);
      if (["finished", "failed"].includes(next.questStates[key])) {
        return { state: next, ok: false, messages, applied, failed: transaction };
      }
      next.questStates[key] = "accepted";
      next.questAcceptedDays[key] = transaction.day ?? next.day;
      messages.push(`Quest ${transaction.marketIndex} accepted on day ${next.questAcceptedDays[key]}.`);
      applied.push(transaction);
      continue;
    }

    if (transaction.type === "setQuestStatus") {
      next.questStates[questKey(transaction.marketIndex)] = transaction.status;
      messages.push(`Quest ${transaction.marketIndex} marked ${describeQuestStatus(transaction.status)}.`);
      applied.push(transaction);
      continue;
    }

    if (transaction.type === "addInventory") {
      addInventory(next.inventory, transaction.itemIndex, transaction.quantity, 0, Boolean(transaction.conceal));
      messages.push(`Added ${transaction.quantity} item ${transaction.itemIndex}.`);
      applied.push(transaction);
      continue;
    }

    if (transaction.type === "removeInventory") {
      if (!removeInventory(next.inventory, transaction.itemIndex, transaction.quantity)) {
        return { state: next, ok: false, messages, applied, failed: transaction };
      }
      messages.push(`Removed ${transaction.quantity} item ${transaction.itemIndex}.`);
      applied.push(transaction);
      continue;
    }

    if (transaction.type === "removeInventoryByToken") {
      if (!removeInventoryByToken(next.inventory, context.items, transaction.token, transaction.quantity || 1)) {
        return { state: next, ok: false, messages, applied, failed: transaction };
      }
      messages.push(`Removed ${transaction.quantity || 1} ${transaction.token}.`);
      applied.push(transaction);
      continue;
    }

    if (transaction.type === "addCopper") {
      const copperIndex = copperItemIndex(context.items);
      if (copperIndex === null) return { state: next, ok: false, messages, applied, failed: transaction };
      addInventory(next.inventory, copperIndex, transaction.quantity);
      messages.push(`Added ${transaction.quantity} copper.`);
      applied.push(transaction);
      continue;
    }

    if (transaction.type === "acceptContract") {
      next.contractStates![transaction.contractId] = "accepted";
      next.contractAcceptedDays![transaction.contractId] = transaction.day ?? next.day;
      messages.push(`Contract ${transaction.contractId} accepted.`);
      applied.push(transaction);
      continue;
    }

    if (transaction.type === "setContractStatus") {
      next.contractStates![transaction.contractId] = transaction.status;
      messages.push(`Contract ${transaction.contractId} marked ${transaction.status}.`);
      applied.push(transaction);
      continue;
    }

    if (transaction.type === "unlockMarket") {
      if (!next.unlockedMarketIndexes!.includes(transaction.marketIndex)) next.unlockedMarketIndexes!.push(transaction.marketIndex);
      messages.push(`Market ${transaction.marketIndex} unlocked.`);
      applied.push(transaction);
      continue;
    }

    if (transaction.type === "appendDialogueLog") {
      next.dialogueLog!.push({
        day: transaction.day ?? next.day,
        marketIndex: transaction.marketIndex ?? next.marketIndex,
        characterIndex: transaction.characterIndex,
        characterName: transaction.characterName,
        topic: transaction.topic,
        note: transaction.note,
      });
      applied.push(transaction);
    }
  }

  return { state: next, ok: true, messages, applied };
}

export function dialogueChoiceTransactions(choice: Pick<DialogueChoice, "effect" | "label" | "reply">, context: { market?: Marketplace; day: number }): QuestRuntimeTransaction[] {
  if (choice.effect === "accept-local-quest" && context.market?.quest) {
    return [
      { type: "acceptQuest", marketIndex: context.market.index, day: context.day },
      { type: "appendDialogueLog", marketIndex: context.market.index, day: context.day, topic: choice.label, note: choice.reply },
    ];
  }
  return [];
}

export function completeLocalQuest(options: {
  state: QuestRuntimeState;
  market: Marketplace;
  items: Item[];
}) {
  const { state, market, items } = options;
  if (!market.quest) return { ok: false, state, messages: ["This market has no local quest."], applied: [] as QuestRuntimeTransaction[] };
  const status = questStatus(state, market);
  if (!questIsActive(status) && status !== "offered") {
    return { ok: false, state, messages: [`Quest is ${describeQuestStatus(status)}.`], applied: [] as QuestRuntimeTransaction[] };
  }
  if (!questCanComplete(market, state.inventory, items)) {
    return { ok: false, state, messages: [`${market.quest.name} still needs: ${(market.quest.questItems || []).join(", ") || "completion conditions"}.`], applied: [] as QuestRuntimeTransaction[] };
  }

  const reward = questReward(market, items);
  const transactions: QuestRuntimeTransaction[] = [
    ...(market.quest.questItems || []).map((token) => ({ type: "removeInventoryByToken" as const, token, quantity: 1 })),
    ...(reward.copper > 0 ? [{ type: "addCopper" as const, quantity: reward.copper }] : []),
    ...reward.items.map((item) => ({ type: "addInventory" as const, itemIndex: item.itemIndex, quantity: item.quantity })),
    { type: "setQuestStatus", marketIndex: market.index, status: "finished" },
  ];
  return applyQuestTransactions(state, transactions, { items });
}

export function summarizeQuestWork(options: {
  markets: Marketplace[];
  state: Pick<QuestRuntimeState, "inventory" | "questStates" | "questAcceptedDays">;
  items: Item[];
}): QuestWorkSummary[] {
  return options.markets
    .filter((market) => Boolean(market.quest))
    .map((market) => {
      const status = questStatus(options.state, market);
      return {
        marketIndex: market.index,
        name: market.quest!.name,
        status,
        canComplete: questCanComplete(market, options.state.inventory, options.items),
        deadline: questDeadline(market, options.state.questAcceptedDays[questKey(market)]),
        requiredItems: market.quest!.questItems || [],
        todo: market.quest!.todo || null,
      };
    });
}
