import type { InventoryEntry, Item, Marketplace } from "@/data/types";
import { visibleQuantity } from "./inventory";

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
    normalize(item.name) === normalized ||
    item.tags.some((tag) => normalize(tag) === normalized) ||
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
