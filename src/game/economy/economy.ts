import type { InventoryEntry, Item } from "@/shared/types/game-data";
import { itemMatchesCatalogToken } from "@/game/trade/item-catalog";
import { addInventory, visibleQuantity } from "@/game/trade/inventory";

export const BASE_CARRY_CAPACITY = 200;
export const BASE_SIZE_CAPACITY = 200;

export const COIN_ITEM_NAMES = ["copper coins", "silver coins", "gold coins"] as const;
export type CoinItemName = (typeof COIN_ITEM_NAMES)[number];

export type CoinDenomination = {
  name: CoinItemName;
  itemIndex: number;
  copperValue: number;
};

export type MoneyBreakdown = {
  copperValue: number;
  gold: number;
  silver: number;
  copper: number;
};

export type WalletSummary = MoneyBreakdown & {
  coinStacks: number;
  coinQuantity: number;
  denominations: CoinDenomination[];
};

export type InventoryTotals = {
  visibleEntries: number;
  totalQuantity: number;
  value: number;
  coinValue: number;
  nonCoinValue: number;
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

function normalizeName(value: string) {
  return value.toLowerCase().trim();
}

export function isCoinItem(item: Item) {
  const normalizedName = normalizeName(item.name);
  return COIN_ITEM_NAMES.some((name) => name === normalizedName) || itemMatchesCatalogToken(item, "currency") || itemMatchesCatalogToken(item, "coins");
}

export function coinDenominations(items: Item[]): CoinDenomination[] {
  return COIN_ITEM_NAMES.flatMap((name) => {
    const item = items.find((candidate) => normalizeName(candidate.name) === name);
    if (!item || item.loafValue <= 0) return [];
    return [{ name, itemIndex: item.index, copperValue: Math.max(1, Math.floor(item.loafValue)) }];
  }).sort((left, right) => right.copperValue - left.copperValue);
}

export function copperValueForItem(item: Item, quantityValue = 1) {
  return Math.max(0, Math.floor(item.loafValue || 0) * Math.max(0, Math.floor(quantityValue || 0)));
}

export function inventoryCoinValue(inventory: InventoryEntry[], items: Item[]) {
  const denominations = coinDenominations(items);
  return denominations.reduce((total, denomination) => {
    const entry = inventory.find((candidate) => candidate.itemIndex === denomination.itemIndex);
    return total + (entry ? quantity(entry) * denomination.copperValue : 0);
  }, 0);
}

export function moneyBreakdown(copperValue: number, items?: Item[]): MoneyBreakdown {
  const safeValue = Math.max(0, Math.floor(copperValue || 0));
  const denominations = items ? coinDenominations(items) : [];
  const goldValue = denominations.find((coin) => coin.name === "gold coins")?.copperValue || 10_000;
  const silverValue = denominations.find((coin) => coin.name === "silver coins")?.copperValue || 100;
  const gold = Math.floor(safeValue / goldValue);
  const afterGold = safeValue - gold * goldValue;
  const silver = Math.floor(afterGold / silverValue);
  const copper = afterGold - silver * silverValue;
  return { copperValue: safeValue, gold, silver, copper };
}

export function formatMoney(copperValue: number, items?: Item[]) {
  const breakdown = moneyBreakdown(copperValue, items);
  const parts = [
    breakdown.gold ? `${breakdown.gold}g` : "",
    breakdown.silver ? `${breakdown.silver}s` : "",
    breakdown.copper || (!breakdown.gold && !breakdown.silver) ? `${breakdown.copper}c` : "",
  ].filter(Boolean);
  return parts.join(" ");
}

export function walletSummary(inventory: InventoryEntry[], items: Item[]): WalletSummary {
  const denominations = coinDenominations(items);
  const copperValue = inventoryCoinValue(inventory, items);
  const breakdown = moneyBreakdown(copperValue, items);
  return {
    ...breakdown,
    coinStacks: denominations.filter((coin) => inventory.some((entry) => entry.itemIndex === coin.itemIndex && quantity(entry) > 0)).length,
    coinQuantity: denominations.reduce((total, coin) => total + quantity(inventory.find((entry) => entry.itemIndex === coin.itemIndex) || { itemIndex: coin.itemIndex, quantity: 0, offerQuantity: 0 }), 0),
    denominations,
  };
}

export function inventoryTotals(inventory: InventoryEntry[], items: Item[]): InventoryTotals {
  return inventory.reduce<InventoryTotals>(
    (totals, entry) => {
      const count = quantity(entry);
      if (count <= 0) return totals;
      const item = items[entry.itemIndex];
      if (!item) return totals;
      const entryValue = copperValueForItem(item, count);
      const isCoin = isCoinItem(item);
      totals.visibleEntries += 1;
      totals.totalQuantity += count;
      totals.value += entryValue;
      totals.coinValue += isCoin ? entryValue : 0;
      totals.nonCoinValue += isCoin ? 0 : entryValue;
      totals.weight += item.weight * count;
      totals.size += item.size * count;
      totals.carryCapacity += (item.carry || 0) * count;
      totals.sizeCapacity += (item.pull || 0) * count;
      if (itemMatchesCatalogToken(item, "packhorses") || itemMatchesCatalogToken(item, "pack_animal")) totals.packAnimals += count;
      if (itemMatchesCatalogToken(item, "storage") || itemMatchesCatalogToken(item, "container")) totals.storageItems += count;
      totals.overWeight = Math.max(0, totals.weight - totals.carryCapacity);
      totals.overSize = Math.max(0, totals.size - totals.sizeCapacity);
      totals.canTravel = totals.overWeight <= 0 && totals.overSize <= 0;
      return totals;
    },
    {
      visibleEntries: 0,
      totalQuantity: 0,
      value: 0,
      coinValue: 0,
      nonCoinValue: 0,
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

export function coinQuantity(inventory: InventoryEntry[], items: Item[], coinName: CoinItemName | string) {
  const coin = items.find((item) => normalizeName(item.name) === normalizeName(coinName));
  if (!coin) return 0;
  const entry = inventory.find((item) => item.itemIndex === coin.index);
  return entry ? quantity(entry) : 0;
}

export function canAffordCopper(inventory: InventoryEntry[], items: Item[], copperValue: number) {
  if (copperValue <= 0) return true;
  return inventoryCoinValue(inventory, items) >= Math.floor(copperValue);
}

function clearVisibleCoins(inventory: InventoryEntry[], denominations: CoinDenomination[]) {
  for (const denomination of denominations) {
    const entry = inventory.find((candidate) => candidate.itemIndex === denomination.itemIndex);
    if (!entry) continue;
    entry.quantity = Math.max(0, Math.min(entry.quantity, entry.offerQuantity));
    if (entry.offerQuantity > entry.quantity) entry.offerQuantity = entry.quantity;
  }
}

export function addCoinsFromCopper(inventory: InventoryEntry[], items: Item[], copperValue: number) {
  let remaining = Math.max(0, Math.floor(copperValue || 0));
  const denominations = coinDenominations(items);
  for (const denomination of denominations) {
    const count = Math.floor(remaining / denomination.copperValue);
    if (count <= 0) continue;
    addInventory(inventory, denomination.itemIndex, count);
    remaining -= count * denomination.copperValue;
  }
  return remaining === 0;
}

export function spendCopper(inventory: InventoryEntry[], items: Item[], copperValue: number) {
  const amount = Math.max(0, Math.floor(copperValue || 0));
  if (amount <= 0) return true;
  const denominations = coinDenominations(items);
  const available = inventoryCoinValue(inventory, items);
  if (available < amount) return false;
  clearVisibleCoins(inventory, denominations);
  return addCoinsFromCopper(inventory, items, available - amount);
}

export function canPayCopperToll(inventory: InventoryEntry[], items: Item[], tollCopper: number) {
  return canAffordCopper(inventory, items, tollCopper);
}

export function spendCopperToll(inventory: InventoryEntry[], items: Item[], tollCopper: number) {
  return spendCopper(inventory, items, tollCopper);
}

export function tradeAffordability(inventory: InventoryEntry[], items: Item[], requiredCopper: number) {
  const wallet = walletSummary(inventory, items);
  const required = Math.max(0, Math.floor(requiredCopper || 0));
  return {
    requiredCopper: required,
    availableCopper: wallet.copperValue,
    missingCopper: Math.max(0, required - wallet.copperValue),
    canAfford: wallet.copperValue >= required,
    availableLabel: formatMoney(wallet.copperValue, items),
    requiredLabel: formatMoney(required, items),
  };
}
