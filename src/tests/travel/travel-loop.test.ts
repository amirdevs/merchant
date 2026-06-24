import { describe, expect, it } from "vitest";
import type { InventoryEntry, Item, Kingdom, Marketplace } from "@/shared/types/game-data";
import {
  arrivalSummary,
  buildTravelWarnings,
  findTravelConnection,
  illegalCargoSummary,
  marketCloseStatus,
  planTravel,
  routeDangerLabel,
} from "@/game/travel/travel-loop";

const items: Item[] = [
  { index: 0, name: "copper coins", tags: ["currency", "coins"], loafValue: 1, size: 0, weight: 0, kingdomIndex: null },
  { index: 1, name: "silver coins", tags: ["currency", "coins"], loafValue: 100, size: 0, weight: 0, kingdomIndex: null },
  { index: 2, name: "smuggled relic", tags: ["contraband", "religious"], loafValue: 250, size: 1, weight: 1, kingdomIndex: 1 },
  { index: 3, name: "grain sack", tags: ["food", "grain"], loafValue: 10, size: 2, weight: 5, kingdomIndex: 0 },
  { index: 4, name: "cart", tags: ["storage", "vehicle"], loafValue: 300, size: 8, weight: 20, pull: 500, carry: 200, kingdomIndex: null },
];

const boone: Marketplace = {
  index: 0,
  name: "Boone",
  kingdomIndex: 0,
  townsquareFile: "",
  backdropFile: "",
  stallage: 3,
  connections: [{ marketplaceIndex: 1, routeFile: "route.png", travelDays: 2, tolls: 12 }],
};

const ashgate: Marketplace = {
  index: 1,
  name: "Ashgate",
  kingdomIndex: 1,
  townsquareFile: "",
  backdropFile: "",
  stallage: 5,
  theft: { percent: 35, maxLoafValue: 500, maxQuantity: 2, maxSize: 4 },
  connections: [],
};

const kingdom: Kingdom = {
  index: 1,
  name: "Ash Kingdom",
  illegalItemTags: ["contraband"],
};

function inventory(entries: Partial<InventoryEntry>[]): InventoryEntry[] {
  return entries.map((entry) => ({ itemIndex: entry.itemIndex ?? 0, quantity: entry.quantity ?? 1, offerQuantity: entry.offerQuantity ?? 0, protected: entry.protected, conceal: entry.conceal }));
}

describe("travel loop helpers", () => {
  it("finds route connections by destination market", () => {
    expect(findTravelConnection(boone, 1)?.travelDays).toBe(2);
    expect(findTravelConnection(boone, 99)).toBeNull();
  });

  it("reports market close state", () => {
    expect(marketCloseStatus(9 * 60).status).toBe("open");
    expect(marketCloseStatus(19 * 60).status).toBe("closing-soon");
    expect(marketCloseStatus(23 * 60).status).toBe("closed");
  });

  it("summarizes illegal cargo exposure", () => {
    const summary = illegalCargoSummary(inventory([
      { itemIndex: 2, quantity: 1 },
      { itemIndex: 2, quantity: 1, conceal: true },
      { itemIndex: 3, quantity: 5 },
    ]), items, kingdom);
    expect(summary).toEqual({ illegalStacks: 2, exposedIllegalStacks: 1, concealedIllegalStacks: 1 });
  });

  it("builds a travel plan with total due, risk, warnings and blockers", () => {
    const plan = planTravel({
      from: boone,
      destination: ashgate,
      destinationKingdom: kingdom,
      inventory: inventory([
        { itemIndex: 0, quantity: 10 },
        { itemIndex: 2, quantity: 1 },
        { itemIndex: 3, quantity: 5 },
      ]),
      items,
    });
    expect(plan).not.toBeNull();
    expect(plan?.days).toBe(2);
    expect(plan?.totalDueCopper).toBe(17);
    expect(plan?.canPay).toBe(false);
    expect(plan?.missingCopper).toBe(7);
    expect(plan?.risk.exposedIllegalStacks).toBe(1);
    expect(plan?.warnings.some((warning) => warning.includes("illegal"))).toBe(true);
    expect(plan?.blockers.some((blocker) => blocker.includes("Missing"))).toBe(true);
  });

  it("allows a route when money and capacity are enough", () => {
    const plan = planTravel({
      from: boone,
      destination: ashgate,
      destinationKingdom: kingdom,
      inventory: inventory([
        { itemIndex: 1, quantity: 1 },
        { itemIndex: 4, quantity: 1 },
        { itemIndex: 3, quantity: 10 },
      ]),
      items,
    });
    expect(plan?.canPay).toBe(true);
    expect(plan?.blockers).toEqual([]);
    expect(plan?.summary).toContain("Boone → Ashgate");
  });

  it("returns null for disconnected markets", () => {
    const plan = planTravel({
      from: ashgate,
      destination: boone,
      destinationKingdom: kingdom,
      inventory: inventory([{ itemIndex: 1, quantity: 1 }]),
      items,
    });
    expect(plan).toBeNull();
  });

  it("formats risk and arrival summaries for UI copy", () => {
    expect(routeDangerLabel({ level: "high", guardInspectionPercent: 42.4, theftPercent: 35.2 })).toBe("HIGH risk: 42% inspection / 35% theft");
    expect(arrivalSummary({ fromMarketName: "Boone", toMarketName: "Ashgate", days: 2, tolls: 12, stallage: 5 })).toContain("No travel incidents");
  });

  it("creates direct warnings from travel risk/cargo state", () => {
    const result = buildTravelWarnings({
      cargo: {
        visibleEntries: 1,
        totalQuantity: 1,
        value: 1,
        coinValue: 1,
        nonCoinValue: 0,
        weight: 300,
        size: 100,
        carryCapacity: 200,
        sizeCapacity: 200,
        overWeight: 100,
        overSize: 0,
        packAnimals: 0,
        storageItems: 0,
        canTravel: false,
      },
      risk: {
        guardInspectionPercent: 70,
        theftPercent: 35,
        illegalStacks: 1,
        exposedIllegalStacks: 1,
        concealedIllegalStacks: 0,
        cargoValue: 1000,
        tolls: 20,
        days: 4,
        level: "high",
      },
      canPay: false,
      missingCopper: 3,
      destination: ashgate,
    });
    expect(result.blockers).toHaveLength(2);
    expect(result.warnings.length).toBeGreaterThanOrEqual(3);
  });
});
