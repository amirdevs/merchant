import { describe, expect, it } from "vitest";
import type { InventoryEntry, Item, Kingdom, Marketplace } from "@/data/types";
import { applyTravelRisks } from "./travel-risk";

const items: Item[] = [
  { index: 0, name: "monster fang", tags: ["monster"], loafValue: 20, size: 1, weight: 1, kingdomIndex: 0 },
  { index: 1, name: "silver ring", tags: ["jewelry"], loafValue: 80, size: 1, weight: 1, kingdomIndex: 0 },
  { index: 2, name: "locked chest", tags: ["storage"], loafValue: 50, size: 4, weight: 4, kingdomIndex: 0 },
];

const kingdom: Kingdom = {
  index: 0,
  name: "Strict Kingdom",
  illegalItemTags: ["monster"],
};

function market(theftPercent = 0): Marketplace {
  return {
    index: 0,
    name: "Risk Market",
    kingdomIndex: 0,
    townsquareFile: "",
    backdropFile: "",
    stallage: 0,
    theft: {
      percent: theftPercent,
      maxLoafValue: 100,
      maxQuantity: 2,
      maxSize: 2,
    },
    connections: [],
  };
}

describe("travel risks", () => {
  it("confiscates half of the first unconcealed illegal stack", () => {
    const inventory: InventoryEntry[] = [{ itemIndex: 0, quantity: 5, offerQuantity: 0 }];
    const events = applyTravelRisks({ inventory, items, destination: market(), kingdom, day: 1 });

    expect(events).toHaveLength(1);
    expect(events[0].kind).toBe("inspection");
    expect(inventory[0].quantity).toBe(2);
  });

  it("does not confiscate concealed illegal goods", () => {
    const inventory: InventoryEntry[] = [{ itemIndex: 0, quantity: 5, offerQuantity: 0, conceal: true }];
    const events = applyTravelRisks({ inventory, items, destination: market(), kingdom, day: 1 });

    expect(events).toHaveLength(0);
    expect(inventory[0].quantity).toBe(5);
  });

  it("steals eligible unprotected goods and ignores protected goods", () => {
    const inventory: InventoryEntry[] = [
      { itemIndex: 1, quantity: 3, offerQuantity: 0, protected: true },
      { itemIndex: 0, quantity: 3, offerQuantity: 0, conceal: true },
      { itemIndex: 2, quantity: 1, offerQuantity: 0 },
    ];
    const events = applyTravelRisks({ inventory, items, destination: market(100), kingdom: undefined, day: 1 });

    expect(events.some((event) => event.kind === "theft")).toBe(true);
    expect(inventory.find((entry) => entry.itemIndex === 1)?.quantity).toBe(3);
    expect(inventory.find((entry) => entry.itemIndex === 0)?.quantity).toBe(1);
  });
});
