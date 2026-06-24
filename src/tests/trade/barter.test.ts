import { describe, expect, it } from "vitest";
import type { Character, InventoryEntry, Item, Marketplace, Profession } from "@/shared/types/game-data";
import {
  appraiseOffer,
  availableQuantity,
  canAcceptAppraisal,
  explainOfferFailure,
  isOfferableEntry,
  valueOffer,
  valueOfferBreakdown,
  visibleOfferableInventory,
} from "@/game/trade/barter";

const items: Item[] = [
  { index: 0, name: "local bread", displayName: "Local Bread", tags: ["food", "bread"], loafValue: 10, size: 1, weight: 1, kingdomIndex: 0 },
  { index: 1, name: "foreign silk", displayName: "Foreign Silk", tags: ["cloth", "luxury", "textile"], loafValue: 100, size: 2, weight: 1, kingdomIndex: 1 },
  { index: 2, name: "iron nails", displayName: "Iron Nails", tags: ["tools", "tool", "metal"], loafValue: 5, size: 1, weight: 1, kingdomIndex: 0 },
  { index: 3, name: "moon idol", displayName: "Moon Idol", tags: ["relic", "contraband", "illegal"], loafValue: 100, size: 1, weight: 1, kingdomIndex: 0 },
  { index: 4, name: "coal sack", displayName: "Coal Sack", tags: ["coal", "raw_material"], loafValue: 25, size: 3, weight: 8, kingdomIndex: 0 },
];

const character: Character = {
  index: 0,
  name: "Test Trader",
  profession: "Tailor",
  professionSlug: "tailor",
  isActive: true,
  isMerchant: true,
  marketplaceIndex: 0,
  maxObtainValue: 1000,
  frugalPercent: 10,
  hagglePercent: 20,
  closeToDealPercent: 10,
  reachingDealPercent: 40,
  farFromDealPercent: 80,
  bias: [{ tag: "luxury", percent: 15 }],
  obtainableItems: [],
  excludedObtainItems: [],
  inventory: [],
};

const profession: Profession = {
  slug: "tailor",
  bias: [{ tag: "cloth", percent: 10 }],
};

const marketplace: Marketplace = {
  index: 0,
  name: "Test Market",
  kingdomIndex: 0,
  townsquareFile: "",
  backdropFile: "",
  stallage: 0,
  bias: [{ tag: "luxury", percent: 5 }],
  connections: [],
};

const kingdom = {
  index: 0,
  name: "Local Kingdom",
  bias: [{ tag: "cloth", percent: 5 }],
};

function offer(itemIndex: number, quantity: number): InventoryEntry[] {
  return [{ itemIndex, quantity, offerQuantity: quantity }];
}

function inventoryEntry(overrides: Partial<InventoryEntry>): InventoryEntry {
  return { itemIndex: 0, quantity: 1, offerQuantity: 0, ...overrides };
}

describe("barter valuation", () => {
  it("applies character, profession, market, kingdom, exotic, and frugal bias to player offers", () => {
    const breakdown = valueOfferBreakdown({
      inventory: offer(1, 1),
      items,
      character,
      profession,
      marketplace,
      kingdom,
      perspective: "player",
    });

    expect(breakdown.total).toBe(145);
    expect(breakdown.lines[0].adjustments.map((line) => line.label)).toEqual([
      "Market demand",
      "Kingdom demand",
      "Imported goods",
      "Personal taste",
      "Profession taste",
      "Frugal discount",
    ]);
  });

  it("applies haggling pressure to character offers and reduces it after failed offers", () => {
    const firstOffer = valueOffer({ inventory: offer(0, 1), items, character, profession, marketplace, kingdom, perspective: "character", offersMade: 0 });
    const pressuredOffer = valueOffer({ inventory: offer(0, 1), items, character, profession, marketplace, kingdom, perspective: "character", offersMade: 3 });

    expect(firstOffer).toBe(12);
    expect(pressuredOffer).toBe(11.4);
  });

  it("never lets haggling pressure become a negative character-offer penalty", () => {
    const value = valueOffer({ inventory: offer(0, 1), items, character, kingdom, perspective: "character", offersMade: 99 });

    expect(value).toBe(10);
  });

  it("discounts large bulk stacks but caps the bulk penalty", () => {
    const mediumBulk = valueOffer({ inventory: offer(2, 20), items, character: null, kingdom, perspective: "player" });
    const hugeBulk = valueOffer({ inventory: offer(2, 500), items, character: null, kingdom, perspective: "player" });

    expect(mediumBulk).toBe(98);
    expect(hugeBulk).toBe(1875);
  });

  it("discounts illegal goods in normal trade", () => {
    const value = valueOffer({ inventory: offer(3, 1), items, character, kingdom, illegalTags: ["contraband"], perspective: "player" });

    expect(value).toBe(45);
  });

  it("adds a heat-sensitive premium for black-market trade", () => {
    const value = valueOffer({ inventory: offer(3, 1), items, character, kingdom, illegalTags: ["contraband"], blackMarket: true, heat: 40, perspective: "player" });

    expect(value).toBe(120);
  });

  it("floors heavily disliked or risky offers at zero instead of returning negative value", () => {
    const hostileCharacter: Character = { ...character, bias: [{ tag: "coal", percent: -200 }], frugalPercent: 100 };
    const value = valueOffer({ inventory: offer(4, 1), items, character: hostileCharacter, kingdom, perspective: "player" });

    expect(value).toBe(0);
  });

  it("applies difficulty against player offers and in favor of character offers", () => {
    const playerSide = valueOffer({ inventory: offer(0, 1), items, character: null, kingdom, difficulty: 15, perspective: "player" });
    const characterSide = valueOffer({ inventory: offer(0, 1), items, character: null, kingdom, difficulty: 15, perspective: "character" });

    expect(playerSide).toBe(8.5);
    expect(characterSide).toBe(11.5);
  });
});

describe("offer appraisal and acceptance", () => {
  it.each([
    [150, 100, "great_deal"],
    [120, 100, "good_deal"],
    [101, 100, "fair_deal"],
    [100, 100, "close"],
    [95, 100, "close"],
    [75, 100, "reaching"],
    [30, 100, "far"],
    [10, 100, "leave"],
  ] as const)("appraises %s against %s as %s", (playerValue, characterValue, expected) => {
    expect(appraiseOffer(playerValue, characterValue, character)).toBe(expected);
  });

  it("accepts only great, good, and fair deals", () => {
    expect(canAcceptAppraisal("great_deal")).toBe(true);
    expect(canAcceptAppraisal("good_deal")).toBe(true);
    expect(canAcceptAppraisal("fair_deal")).toBe(true);
    expect(canAcceptAppraisal("close")).toBe(false);
    expect(canAcceptAppraisal("reaching")).toBe(false);
    expect(canAcceptAppraisal("far")).toBe(false);
    expect(canAcceptAppraisal("leave")).toBe(false);
  });

  it("keeps equal-value offers out of accepted states", () => {
    const appraisal = appraiseOffer(100, 100, character);

    expect(appraisal).toBe("close");
    expect(canAcceptAppraisal(appraisal)).toBe(false);
  });
});

describe("offerability rules", () => {
  it("calculates remaining available quantity after existing offer quantities", () => {
    expect(availableQuantity(inventoryEntry({ quantity: 12, offerQuantity: 5 }))).toBe(7);
    expect(availableQuantity(inventoryEntry({ quantity: 3, offerQuantity: 9 }))).toBe(0);
  });

  it("blocks protected goods from both manual and automatic offers", () => {
    const entry = inventoryEntry({ protected: true, quantity: 5 });

    expect(isOfferableEntry(entry, "manual")).toBe(false);
    expect(isOfferableEntry(entry, "auto")).toBe(false);
  });

  it("allows concealed goods manually but excludes them from automatic matching", () => {
    const entry = inventoryEntry({ conceal: true, quantity: 5 });

    expect(isOfferableEntry(entry, "manual")).toBe(true);
    expect(isOfferableEntry(entry, "auto")).toBe(false);
  });

  it("filters auto-offer candidates to visible unprotected goods with remaining quantity", () => {
    const inventory: InventoryEntry[] = [
      inventoryEntry({ itemIndex: 0, quantity: 4, offerQuantity: 0 }),
      inventoryEntry({ itemIndex: 1, quantity: 4, offerQuantity: 0, protected: true }),
      inventoryEntry({ itemIndex: 2, quantity: 4, offerQuantity: 0, conceal: true }),
      inventoryEntry({ itemIndex: 3, quantity: 4, offerQuantity: 4 }),
    ];

    expect(visibleOfferableInventory(inventory, "auto").map((entry) => entry.itemIndex)).toEqual([0]);
    expect(visibleOfferableInventory(inventory, "manual").map((entry) => entry.itemIndex)).toEqual([0, 2]);
  });
});

describe("failure explanations", () => {
  it("returns null when the appraisal can be accepted", () => {
    expect(explainOfferFailure({ playerValue: 101, characterValue: 100, appraisal: "fair_deal" })).toBeNull();
  });

  it("explains empty and one-sided offers", () => {
    expect(explainOfferFailure({ playerValue: 0, characterValue: 0, appraisal: "close" })).toBe("No goods are currently offered.");
    expect(explainOfferFailure({ playerValue: 0, characterValue: 100, appraisal: "leave" })).toBe("Add goods or coins to your side of the offer.");
    expect(explainOfferFailure({ playerValue: 100, characterValue: 0, appraisal: "leave" })).toBe("Select something from the customer's stock or use Ask Price first.");
  });

  it("prioritizes protected, concealed, and illegal-goods explanations", () => {
    expect(explainOfferFailure({ playerValue: 50, characterValue: 100, appraisal: "far", hasProtectedGoods: true })).toContain("Protected goods");
    expect(explainOfferFailure({ playerValue: 50, characterValue: 100, appraisal: "far", hasConcealedGoods: true })).toContain("Concealed goods");
    expect(explainOfferFailure({ playerValue: 50, characterValue: 100, appraisal: "far", hasIllegalGoods: true })).toContain("Illegal goods");
  });

  it("explains close, reaching, far, and leave states", () => {
    expect(explainOfferFailure({ playerValue: 95, characterValue: 100, appraisal: "close" })).toContain("close to accepting");
    expect(explainOfferFailure({ playerValue: 75, characterValue: 100, appraisal: "reaching" })).toContain("reaching");
    expect(explainOfferFailure({ playerValue: 30, characterValue: 100, appraisal: "far" })).toContain("far from fair");
    expect(explainOfferFailure({ playerValue: 10, characterValue: 100, appraisal: "leave" })).toContain("much better offer");
  });
});
