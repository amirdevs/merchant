import { describe, expect, it } from "vitest";
import type { Character, Marketplace } from "@/data/types";
import { advanceRivals, createRivalState, rivalsAtMarket } from "./rivals";
import type { MarketSimulation } from "./market-simulation";

const character = {
  index: 1,
  name: "Mara",
  profession: "Merchant",
  isTraveler: true,
  isMerchant: true,
  marketplaceIndex: 0,
  maxObtainValue: 100,
  bias: [{ tag: "silk", percent: 20 }],
  hagglePercent: 25,
} as Character;
const markets = [
  { index: 0, name: "A", connections: [{ marketplaceIndex: 1 }] },
  { index: 1, name: "B", connections: [{ marketplaceIndex: 0 }] },
] as Marketplace[];

describe("rival merchants", () => {
  it("creates named rivals from traveling merchants", () => {
    const state = createRivalState([character]);
    expect(state.merchants[0]).toMatchObject({ name: "Mara", personality: "aggressive", marketIndex: 0 });
  });

  it("moves rivals and creates market pressure", () => {
    const rivals = createRivalState([character]);
    const simulation: MarketSimulation = {};
    const activities = advanceRivals({ rivals, simulation, markets, items: [], day: 2 });
    expect(activities[0]).toContain("bought heavily");
    expect(rivalsAtMarket(rivals, 1)).toHaveLength(1);
    expect(simulation["1"].tagShifts.silk).toBe(12);
  });
});
