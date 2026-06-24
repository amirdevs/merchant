import { describe, expect, it } from "vitest";
import { activePermit, adjustKingdomHeat, canUseBlackMarket, coolLawHeat, createLawState, issuePermit, permitInspectionMultiplier } from "@/game/company/law";

describe("law and permits", () => {
  it("tracks and cools kingdom heat", () => {
    const law = createLawState();
    expect(adjustKingdomHeat(law, 2, 35)).toBe(35);
    coolLawHeat(law, 5);
    expect(law.heatByKingdom["2"]).toBe(30);
  });

  it("issues expiring permits with inspection protection", () => {
    const law = createLawState();
    const permit = issuePermit(law, 1, 10, 3, false);
    expect(activePermit(law, 1, 39)).toEqual(permit);
    expect(activePermit(law, 1, 41)).toBeNull();
    expect(permitInspectionMultiplier(permit)).toBe(0.3);
  });

  it("gates black markets by trust or underworld reputation", () => {
    const law = createLawState();
    expect(canUseBlackMarket(law, 0, true)).toBe(false);
    law.blackMarketReputation = 1;
    expect(canUseBlackMarket(law, 0, true)).toBe(true);
  });
});
