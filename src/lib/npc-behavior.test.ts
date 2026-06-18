import { describe, expect, it } from "vitest";
import type { Character, Item } from "@/data/types";
import {
  fairMatchChance,
  npcBudgetMultiplier,
  npcRoles,
  reputationMinimum,
  roleTradeBlock,
  safetyNetGiftAllowed,
} from "./npc-behavior";
import type { NpcRelation } from "./reputation";

const relation: NpcRelation = { trust: 0, mood: 0, patience: 5, failedOffers: 0, trades: 0, gifts: 0, illegalDeals: 0, favors: 0, secretsUnlocked: [] };

function character(overrides: Partial<Character> = {}): Character {
  return {
    index: 7,
    name: "Test NPC",
    profession: "Merchant",
    professionSlug: "merchant",
    isActive: true,
    isMerchant: true,
    marketplaceIndex: 0,
    maxObtainValue: 100,
    frugalPercent: 0,
    closeToDealPercent: 10,
    reachingDealPercent: 40,
    bias: [],
    obtainableItems: [],
    excludedObtainItems: [],
    inventory: [],
    ...overrides,
  };
}

describe("NPC role behavior", () => {
  it("derives original role flags and adjusts budgets", () => {
    const traveler = character({ isTraveler: true, vote: "Audric" });

    expect(npcRoles(traveler)).toEqual(expect.arrayContaining(["traveler", "guild-official", "merchant"]));
    expect(npcBudgetMultiplier(traveler, { ...relation, trust: 4 })).toBeGreaterThan(1.4);
  });

  it("requires trust for valuable guild business", () => {
    expect(reputationMinimum(character({ vote: "Audric" }), 800)).toBe(2);
    expect(reputationMinimum(character(), 800)).toBe(-Infinity);
  });

  it("blocks visible contraband offered to guards", () => {
    const guard = character({ profession: "Guard", isSnitch: true });
    const illegalItem = { index: 0, name: "Forbidden Idol", tags: ["idols"], loafValue: 10 } as Item;

    expect(roleTradeBlock({
      character: guard,
      relation,
      playerInventory: [{ itemIndex: 0, quantity: 1, offerQuantity: 1 }],
      items: [illegalItem],
      illegalTags: ["idols"],
      characterValue: 10,
    })).toContain("refuses contraband");
  });

  it("gives trusted and traveler NPCs a chance to accept near-fair offers", () => {
    const ordinaryChance = fairMatchChance(character(), relation, 95, 100);
    const travelerChance = fairMatchChance(character({ isTraveler: true }), { ...relation, trust: 4 }, 95, 100);

    expect(ordinaryChance).toBeGreaterThan(0);
    expect(travelerChance).toBeGreaterThan(ordinaryChance);
  });

  it("only permits small safety-net gifts to poor players", () => {
    const giver = character({ isTraveler: true });

    expect(safetyNetGiftAllowed(giver, relation, 40, 20)).toBe(true);
    expect(safetyNetGiftAllowed(giver, relation, 200, 20)).toBe(false);
    expect(safetyNetGiftAllowed(giver, relation, 40, 50)).toBe(false);
  });
});
