import { describe, expect, it } from "vitest";
import type { InventoryEntry, Item } from "@/shared/types/game-data";
import {
  addCoinsFromCopper,
  canAffordCopper,
  formatMoney,
  inventoryCoinValue,
  inventoryTotals,
  moneyBreakdown,
  spendCopper,
  tradeAffordability,
  walletSummary,
} from "@/game/economy/economy";

const items = [
  { index: 0, name: "copper coins", tags: ["currency", "coins"], loafValue: 1, size: 0, weight: 0, kingdomIndex: null },
  { index: 1, name: "silver coins", tags: ["currency", "coins"], loafValue: 100, size: 0, weight: 0, kingdomIndex: null },
  { index: 2, name: "gold coins", tags: ["currency", "coins"], loafValue: 10000, size: 0, weight: 0, kingdomIndex: null },
  { index: 3, name: "iron ore", tags: ["ore", "raw_material"], loafValue: 8, size: 3, weight: 5, kingdomIndex: null },
  { index: 4, name: "packhorse", tags: ["packhorses", "pack_animal"], loafValue: 800, size: 1, weight: 1, carry: 300, pull: 200, kingdomIndex: null },
] as Item[];

function inventory(entries: Array<Partial<InventoryEntry> & Pick<InventoryEntry, "itemIndex" | "quantity">>): InventoryEntry[] {
  return entries.map((entry) => ({ offerQuantity: 0, ...entry }));
}

describe("economy helpers", () => {
  it("summarizes wallet value from coin item loaf values", () => {
    const stock = inventory([
      { itemIndex: 0, quantity: 50 },
      { itemIndex: 1, quantity: 3 },
      { itemIndex: 2, quantity: 1 },
      { itemIndex: 3, quantity: 10 },
    ]);

    expect(inventoryCoinValue(stock, items)).toBe(10350);
    expect(walletSummary(stock, items)).toMatchObject({ copperValue: 10350, gold: 1, silver: 3, copper: 50 });
    expect(formatMoney(10350, items)).toBe("1g 3s 50c");
  });

  it("spends copper by normalizing coin change", () => {
    const stock = inventory([
      { itemIndex: 1, quantity: 2 },
      { itemIndex: 0, quantity: 10 },
    ]);

    expect(spendCopper(stock, items, 150)).toBe(true);
    expect(inventoryCoinValue(stock, items)).toBe(60);
    expect(walletSummary(stock, items)).toMatchObject({ gold: 0, silver: 0, copper: 60 });
  });

  it("does not spend when wallet value is too low", () => {
    const stock = inventory([{ itemIndex: 0, quantity: 25 }]);
    expect(spendCopper(stock, items, 26)).toBe(false);
    expect(inventoryCoinValue(stock, items)).toBe(25);
  });

  it("adds coins greedily from a copper value", () => {
    const stock = inventory([]);
    expect(addCoinsFromCopper(stock, items, 10_230)).toBe(true);
    expect(walletSummary(stock, items)).toMatchObject({ gold: 1, silver: 2, copper: 30 });
  });

  it("tracks inventory value, coin value, capacity, and overload state", () => {
    const stock = inventory([
      { itemIndex: 0, quantity: 100 },
      { itemIndex: 3, quantity: 60 },
    ]);
    const totals = inventoryTotals(stock, items);

    expect(totals.value).toBe(580);
    expect(totals.coinValue).toBe(100);
    expect(totals.nonCoinValue).toBe(480);
    expect(totals.overWeight).toBe(100);
    expect(totals.canTravel).toBe(false);
  });

  it("capacity providers increase carry and pull limits", () => {
    const stock = inventory([
      { itemIndex: 3, quantity: 60 },
      { itemIndex: 4, quantity: 1 },
    ]);
    const totals = inventoryTotals(stock, items);

    expect(totals.packAnimals).toBe(1);
    expect(totals.carryCapacity).toBe(500);
    expect(totals.sizeCapacity).toBe(400);
    expect(totals.canTravel).toBe(true);
  });

  it("reports trade affordability with readable labels", () => {
    const stock = inventory([{ itemIndex: 1, quantity: 1 }]);
    expect(canAffordCopper(stock, items, 75)).toBe(true);
    expect(tradeAffordability(stock, items, 125)).toMatchObject({
      availableCopper: 100,
      missingCopper: 25,
      canAfford: false,
      availableLabel: "1s",
      requiredLabel: "1s 25c",
    });
  });

  it("uses default denomination labels when items are not supplied", () => {
    expect(moneyBreakdown(10_205)).toMatchObject({ gold: 1, silver: 2, copper: 5 });
    expect(formatMoney(0)).toBe("0c");
  });
});
