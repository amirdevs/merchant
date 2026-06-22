import { describe, expect, it } from "vitest";
import { ultimatumActive, type NpcRelation } from "./reputation";

describe("reputation state", () => {
  it("marks ultimatum mode when patience is nearly gone", () => {
    const relation: NpcRelation = { trust: 0, mood: -3, patience: 1, failedOffers: 2, trades: 0, gifts: 0, illegalDeals: 0, favors: 0, secretsUnlocked: [] };

    expect(ultimatumActive(relation)).toBe(true);
    expect(ultimatumActive({ ...relation, patience: 2 })).toBe(false);
  });
});
