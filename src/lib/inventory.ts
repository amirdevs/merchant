import type { InventoryEntry } from "../data/types";

export type MoveAmount = number | "all" | "none" | "half";

export function visibleQuantity(entry: InventoryEntry) {
  return Math.max(0, entry.quantity - entry.offerQuantity);
}

export function addInventory(inventory: InventoryEntry[], itemIndex: number, quantity: number, offerQuantity = 0, conceal = false) {
  if (quantity <= 0) return;
  const existing = inventory.find((entry) => entry.itemIndex === itemIndex);
  if (existing) {
    existing.quantity += quantity;
    existing.offerQuantity += offerQuantity;
  } else {
    inventory.push({ itemIndex, quantity, offerQuantity, conceal });
  }
}

export function moveOffer(entry: InventoryEntry, amount: MoveAmount, isOfferPanel = false) {
  if (entry.protected && !isOfferPanel && amount !== "none") return;

  if (amount === "all") {
    entry.offerQuantity = isOfferPanel ? 0 : entry.quantity;
    return;
  }

  if (amount === "none") {
    entry.offerQuantity = 0;
    return;
  }

  if (amount === "half") {
    entry.offerQuantity = isOfferPanel
      ? Math.floor(entry.offerQuantity / 2)
      : Math.ceil((entry.quantity - entry.offerQuantity) / 2) + entry.offerQuantity;
    return;
  }

  entry.offerQuantity = Math.max(0, Math.min(entry.quantity, entry.offerQuantity + amount));
}

export function setOfferQuantity(entry: InventoryEntry, quantity: number) {
  if (entry.protected && quantity > 0) return;
  const nextQuantity = Number.isFinite(quantity) ? Math.floor(quantity) : 0;
  entry.offerQuantity = Math.max(0, Math.min(entry.quantity, nextQuantity));
}

export function clearOffers(inventory: InventoryEntry[]) {
  for (const entry of inventory) entry.offerQuantity = 0;
}

export function transferOffers(from: InventoryEntry[], to: InventoryEntry[]) {
  for (const entry of from) {
    if (entry.offerQuantity <= 0) continue;
    addInventory(to, entry.itemIndex, entry.offerQuantity);
    entry.quantity -= entry.offerQuantity;
    entry.offerQuantity = 0;
  }

  for (let index = from.length - 1; index >= 0; index--) {
    if (from[index].quantity <= 0) from.splice(index, 1);
  }
}
