import type { InventoryEntry, Item } from "@/data/types";
import { visibleQuantity } from "@/lib/inventory";

export const BASE_CARRY_CAPACITY = 200;
export const BASE_SIZE_CAPACITY = 200;

export type InventoryTotals = {
  visibleEntries: number;
  totalQuantity: number;
  value: number;
  weight: number;
  size: number;
  carryCapacity: number;
  sizeCapacity: number;
  overWeight: number;
  overSize: number;
  packAnimals: number;
  storageItems: number;
  canTravel: boolean;
};

function quantity(entry: InventoryEntry) {
  return visibleQuantity(entry);
}

export function inventoryTotals(inventory: InventoryEntry[], items: Item[]): InventoryTotals {
  return inventory.reduce<InventoryTotals>(
    (totals, entry) => {
      const count = quantity(entry);
      if (count <= 0) return totals;
      const item = items[entry.itemIndex];
      totals.visibleEntries += 1;
      totals.totalQuantity += count;
      totals.value += item.loafValue * count;
      totals.weight += item.weight * count;
      totals.size += item.size * count;
      totals.carryCapacity += (item.carry || 0) * count;
      totals.sizeCapacity += (item.pull || 0) * count;
      if (item.tags.includes("packhorses")) totals.packAnimals += count;
      if (item.tags.includes("storage")) totals.storageItems += count;
      totals.overWeight = Math.max(0, totals.weight - totals.carryCapacity);
      totals.overSize = Math.max(0, totals.size - totals.sizeCapacity);
      totals.canTravel = totals.overWeight <= 0 && totals.overSize <= 0;
      return totals;
    },
    {
      visibleEntries: 0,
      totalQuantity: 0,
      value: 0,
      weight: 0,
      size: 0,
      carryCapacity: BASE_CARRY_CAPACITY,
      sizeCapacity: BASE_SIZE_CAPACITY,
      overWeight: 0,
      overSize: 0,
      packAnimals: 0,
      storageItems: 0,
      canTravel: true,
    }
  );
}

export function coinQuantity(inventory: InventoryEntry[], items: Item[], coinName: string) {
  const coin = items.find((item) => item.name.toLowerCase() === coinName.toLowerCase());
  if (!coin) return 0;
  const entry = inventory.find((item) => item.itemIndex === coin.index);
  return entry ? quantity(entry) : 0;
}

export function canPayCopperToll(inventory: InventoryEntry[], items: Item[], tollCopper: number) {
  if (tollCopper <= 0) return true;
  return coinQuantity(inventory, items, "copper coins") >= tollCopper;
}

export function spendCopperToll(inventory: InventoryEntry[], items: Item[], tollCopper: number) {
  if (tollCopper <= 0) return true;
  const coin = items.find((item) => item.name.toLowerCase() === "copper coins");
  if (!coin) return false;
  const entry = inventory.find((item) => item.itemIndex === coin.index);
  if (!entry || quantity(entry) < tollCopper) return false;
  entry.quantity -= tollCopper;
  if (entry.offerQuantity > entry.quantity) entry.offerQuantity = entry.quantity;
  return true;
}
