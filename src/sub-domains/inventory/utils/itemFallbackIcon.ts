import type { InventoryEntry } from "../../../data/types";
import { items } from "../../../lib/game";
import { tagIcons } from "../constants/tagIcons";

export function itemFallbackIcon(entry: InventoryEntry) {
  const item = items[entry.itemIndex];
  return tagIcons.find(([tag]) => item.tags.includes(tag))?.[1] || "?";
}
