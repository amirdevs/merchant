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
