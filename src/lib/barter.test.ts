import { describe, expect, it } from "vitest";
import type { Character, InventoryEntry, Item, Marketplace, Profession } from "@/data/types";
import { appraiseOffer, valueOffer } from "./barter";

const items: Item[] = [
  { index: 0, name: "local bread", tags: ["food"], loafValue: 10, size: 1, weight: 1, kingdomIndex: 0 },
  { index: 1, name: "foreign silk", tags: ["cloth", "luxury"], loafValue: 100, size: 2, weight: 1, kingdomIndex: 1 },
  { index: 2, name: "iron nails", tags: ["tools"], loafValue: 5, size: 1, weight: 1, kingdomIndex: 0 },
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

describe("barter valuation", () => {
  it("applies character, profession, market, kingdom, exotic, and frugal bias to player offers", () => {
    const value = valueOffer({
      inventory: offer(1, 1),
      items,
      character,
      profession,
      marketplace,
      kingdom,
      perspective: "player",
    });

    expect(value).toBe(145);
  });

  it("applies haggling pressure to character offers and reduces it after failed offers", () => {
    const firstOffer = valueOffer({
      inventory: offer(0, 1),
      items,
      character,
      profession,
      marketplace,
      kingdom,
      perspective: "character",
      offersMade: 0,
    });
    const pressuredOffer = valueOffer({
      inventory: offer(0, 1),
      items,
      character,
      profession,
      marketplace,
      kingdom,
      perspective: "character",
      offersMade: 3,
    });

    expect(firstOffer).toBe(12);
    expect(pressuredOffer).toBe(11.4);
  });

  it("discounts large bulk stacks", () => {
    const value = valueOffer({
      inventory: offer(2, 20),
      items,
      character: null,
      kingdom,
      perspective: "player",
    });

    expect(value).toBe(98);
  });

  it.each([
    [150, 100, "great_deal"],
    [120, 100, "good_deal"],
    [101, 100, "fair_deal"],
    [95, 100, "close"],
    [75, 100, "reaching"],
    [30, 100, "far"],
    [10, 100, "leave"],
  ])("appraises %s against %s as %s", (playerValue, characterValue, expected) => {
    expect(appraiseOffer(playerValue, characterValue, character)).toBe(expected);
  });
});
