import type { MouseEvent } from "react";
import type { InventoryEntry } from "@/data/types";
import { items, visibleQuantity } from "@/lib/game";
import type { MoveAmount } from "@/lib/inventory";
import { tagIcons } from "@/sub-domains/inventory/constants/inventory-ui.constant";
import type { InventoryPanelMode } from "@/sub-domains/inventory/types/inventory-panel.type";

export function iconFor(entry: InventoryEntry) {
  const item = items[entry.itemIndex];
  return tagIcons.find(([tag]) => item.tags.includes(tag))?.[1] || "?";
}

export function itemGridSpan(size: number) {
  if (size >= 50) return "col-span-4 row-span-3";
  if (size >= 25) return "col-span-3 row-span-3";
  if (size >= 5) return "col-span-2 row-span-2";
  return "col-span-1 row-span-1";
}

export function rarityLabel(rarity?: number) {
  if (!rarity || rarity <= 1) return "Common";
  if (rarity === 2) return "Uncommon";
  if (rarity === 3) return "Rare";
  return "Legendary";
}

export function quantityFor(entry: InventoryEntry, mode: InventoryPanelMode) {
  return mode === "offer" ? entry.offerQuantity : visibleQuantity(entry);
}

export function clickAmountForMode(mode: InventoryPanelMode, event: MouseEvent<HTMLButtonElement>): MoveAmount {
  if (event.altKey) return mode === "offer" ? -10 : 10;
  if (event.shiftKey) return "half";
  return mode === "offer" ? -1 : 1;
}
