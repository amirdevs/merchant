import type { InventoryEntry, Item, Marketplace } from "@/shared/types/game-data";
import { itemMatchesCatalogToken } from "@/game/trade/item-catalog";
import { visibleQuantity } from "@/game/trade/inventory";

export type QuestItemProgress = {
  token: string;
  held: number;
  complete: boolean;
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[_-]+/g, " ").trim();
}

function itemMatchesQuestToken(item: Item, token: string) {
  const normalized = normalize(token);
  return (
    itemMatchesCatalogToken(item, normalized) ||
    Boolean(item.iconFile && normalize(item.iconFile).includes(normalized))
  );
}

export function itemIsQuestNeeded(item: Item, markets: Marketplace[], questStates: Record<string, string>) {
  return markets.some((market) => {
    const status = questStates[String(market.index)] || "offered";
    if (status === "finished" || status === "failed") return false;
    return (market.quest?.questItems || []).some((token) => itemMatchesQuestToken(item, token));
  });
}

export function questItemProgress(market: Marketplace, inventory: InventoryEntry[], items: Item[]): QuestItemProgress[] {
  const required = market.quest?.questItems || [];
  return required.map((token) => {
    const held = inventory.reduce((total, entry) => {
      const item = items[entry.itemIndex];
      if (!item || !itemMatchesQuestToken(item, token)) return total;
      return total + visibleQuantity(entry);
    }, 0);
    return { token, held, complete: held > 0 };
  });
}

export function questCanComplete(market: Marketplace, inventory: InventoryEntry[], items: Item[]) {
  const progress = questItemProgress(market, inventory, items);
  if (!market.quest) return false;
  if (!progress.length) return true;
  return progress.every((entry) => entry.complete);
}

export function questOfferCanComplete(market: Marketplace, inventory: InventoryEntry[], items: Item[]) {
  const required = market.quest?.questItems || [];
  if (!market.quest || !required.length) return false;
  return required.every((token) => inventory.some((entry) => {
    const item = items[entry.itemIndex];
    return entry.offerQuantity > 0 && item && itemMatchesQuestToken(item, token);
  }));
}

export function questDeadline(market: Marketplace, acceptedDay: number | undefined) {
  const days = typeof market.quest?.data?.deadlineDays === "number" ? market.quest.data.deadlineDays : null;
  return acceptedDay !== undefined && days ? acceptedDay + Math.max(1, days) : null;
}

export function expireQuests(options: {
  states: Record<string, string>;
  acceptedDays: Record<string, number>;
  currentDay: number;
  markets: Marketplace[];
}) {
  const expired: Marketplace[] = [];
  for (const market of options.markets) {
    const key = String(market.index);
    if (!["accepted", "active", "ready"].includes(options.states[key])) continue;
    const deadline = questDeadline(market, options.acceptedDays[key]);
    if (deadline !== null && options.currentDay > deadline) {
      options.states[key] = "failed";
      expired.push(market);
    }
  }
  return expired;
}

export function questRewardCopper(market: Marketplace) {
  const explicit = market.quest?.data && typeof (market.quest.data as Record<string, unknown>).reward === "number"
    ? Number((market.quest.data as Record<string, unknown>).reward)
    : null;
  if (explicit !== null) return Math.max(10, explicit * 4);
  return Math.max(25, (market.index + 1) * 15);
}

export type QuestReward = {
  copper: number;
  items: Array<{ itemIndex: number; quantity: number }>;
};

function questData(market: Marketplace) {
  return (market.quest?.data || {}) as Record<string, unknown>;
}

export function questReward(market: Marketplace, items: Item[]): QuestReward {
  const data = questData(market);
  const rewardToken = typeof data.rewardItemFilename === "string"
    ? data.rewardItemFilename
    : typeof data.rewardItem === "string"
      ? data.rewardItem
      : null;
  const rewardQuantity = typeof data.rewardQuantity === "number" ? Math.max(1, data.rewardQuantity) : 1;
  const rewardItem = rewardToken ? items.find((item) => itemMatchesQuestToken(item, rewardToken)) : null;

  return {
    copper: questRewardCopper(market),
    items: rewardItem ? [{ itemIndex: rewardItem.index, quantity: rewardQuantity }] : [],
  };
}
