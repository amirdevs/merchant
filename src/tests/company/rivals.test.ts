import { describe, expect, it } from "vitest";
import type { Character, Marketplace } from "@/shared/types/game-data";
import { advanceRivals, createRivalState, ensureRivalState, rivalsAtMarket } from "@/game/company/rivals";
import type { MarketSimulation } from "@/game/market/market-simulation";

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
    expect(state.merchants[0].cargoManifest[0].tag).toBe("silk");
    expect(state.merchants[0].strategy).toBe("undercut");
  });

  it("moves rivals and creates market pressure", () => {
    const rivals = createRivalState([character]);
    const simulation: MarketSimulation = {};
    const activities = advanceRivals({ rivals, simulation, markets, items: [], day: 2 });
    expect(activities[0]).toContain("bought heavily");
    expect(rivalsAtMarket(rivals, 1)).toHaveLength(1);
    expect(simulation["1"].tagShifts.silk).toBe(12);
    expect(rivals.merchants[0].cargoManifest[0].quantity).toBeGreaterThan(0);
    expect(rivals.merchants[0].routeHabit).toContain("B");
  });

  it("migrates old rival state with manifests", () => {
    const rivals = createRivalState([character]);
    const migrated = ensureRivalState({
      merchants: [{ ...rivals.merchants[0], cargoManifest: undefined as never, strategy: undefined as never }],
      activityLog: [],
    });
    expect(migrated.merchants[0].cargoManifest).toHaveLength(1);
    expect(migrated.merchants[0].strategy).toBe("undercut");
  });
});
