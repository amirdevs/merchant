import { describe, expect, it } from "vitest";
import type { InventoryEntry, Item, Kingdom, Marketplace } from "@/data/types";
import { applyTravelRisks, routeRiskPreview } from "./travel-risk";

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
    const events = applyTravelRisks({ inventory, items, destination: market(), kingdom, day: 1, inspectionRoll: 0 });

    expect(events).toHaveLength(1);
    expect(events[0].kind).toBe("inspection");
    expect(inventory[0].quantity).toBe(2);
  });

  it("previews guard, theft, cargo, and concealment risk", () => {
    const inventory: InventoryEntry[] = [
      { itemIndex: 0, quantity: 2, offerQuantity: 0 },
      { itemIndex: 0, quantity: 1, offerQuantity: 0, conceal: true },
      { itemIndex: 1, quantity: 2, offerQuantity: 0 },
    ];

    const preview = routeRiskPreview({ inventory, items, destination: market(35), kingdom, days: 4, tolls: 7 });

    expect(preview).toMatchObject({
      theftPercent: 35,
      illegalStacks: 2,
      exposedIllegalStacks: 1,
      concealedIllegalStacks: 1,
      tolls: 7,
      days: 4,
    });
    expect(preview.guardInspectionPercent).toBeGreaterThan(40);
    expect(preview.cargoValue).toBe(220);
  });

  it("usually protects concealed illegal goods while retaining residual risk", () => {
    const inventory: InventoryEntry[] = [{ itemIndex: 0, quantity: 5, offerQuantity: 0, conceal: true }];
    const events = applyTravelRisks({ inventory, items, destination: market(), kingdom, day: 1, inspectionRoll: 1 });

    expect(events).toHaveLength(0);
    expect(inventory[0].quantity).toBe(5);
  });

  it("can discover concealed goods on a low inspection roll", () => {
    const inventory: InventoryEntry[] = [{ itemIndex: 0, quantity: 5, offerQuantity: 0, conceal: true }];
    const events = applyTravelRisks({ inventory, items, destination: market(), kingdom, day: 1, inspectionRoll: 0 });

    expect(events[0].message).toContain("concealed compartment");
    expect(inventory[0].quantity).toBe(2);
  });

  it("supports bribe, permit, and evasion inspection strategies", () => {
    const bribed: InventoryEntry[] = [{ itemIndex: 0, quantity: 5, offerQuantity: 0 }];
    const bribeEvents = applyTravelRisks({ inventory: bribed, items, destination: market(), kingdom, day: 1, inspectionRoll: 0.2, strategy: "bribe" });
    expect(bribeEvents[0].kind).toBe("bribe");
    expect(bribed[0].quantity).toBe(5);

    const permitted: InventoryEntry[] = [{ itemIndex: 0, quantity: 5, offerQuantity: 0 }];
    applyTravelRisks({ inventory: permitted, items, destination: market(), kingdom, day: 1, inspectionRoll: 0.3, hasPermit: true });
    expect(permitted[0].quantity).toBe(5);

    const evasion: InventoryEntry[] = [{ itemIndex: 0, quantity: 5, offerQuantity: 0 }];
    const evasionEvents = applyTravelRisks({ inventory: evasion, items, destination: market(), kingdom, day: 1, inspectionRoll: 0, strategy: "evade" });
    expect(evasionEvents[0].kind).toBe("evasion");
    expect(evasion).toHaveLength(0);
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
