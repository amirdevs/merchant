import type { InventoryEntry, Item, Kingdom } from "@/data/types";
import { visibleQuantity } from "@/lib/inventory";

export function illegalTagsForKingdom(kingdom: Pick<Kingdom, "illegalItemTags"> | undefined) {
  return kingdom?.illegalItemTags || [];
}

export function itemIsIllegal(item: Item, illegalTags: string[]) {
  return illegalTags.some((tag) => item.tags.includes(tag));
}

export function inventoryIllegalEntries(inventory: InventoryEntry[], items: Item[], illegalTags: string[]) {
  return inventory.filter((entry) => visibleQuantity(entry) > 0 && itemIsIllegal(items[entry.itemIndex], illegalTags));
}

export function inventoryHasUnconcealedIllegalGoods(inventory: InventoryEntry[], items: Item[], illegalTags: string[]) {
  return inventoryIllegalEntries(inventory, items, illegalTags).some((entry) => !entry.conceal);
}
