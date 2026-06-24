import { describe, expect, it } from "vitest";
import { applyPackhorseTravelWear, applyTravelConditions, createCaravanState, ensureCaravanState, masteryRiskReduction, recordRoute, repairPackhorses, routeMasteryLevel, routeTravelConditions, toggleRouteBookmark, upgradeConcealment } from "@/game/company/caravan";

describe("caravan progression", () => {
  it("records routes and unlocks mastery perks", () => {
    const caravan = createCaravanState();
    for (let trip = 0; trip < 6; trip++) {
      recordRoute(caravan, {
        id: String(trip),
        dayDeparted: trip,
        dayArrived: trip + 1,
        fromMarketIndex: 0,
        toMarketIndex: 1,
        days: 1,
        tolls: 0,
        stallage: 0,
        strategy: "comply",
        cargoValue: 10,
        incidents: [],
        success: true,
      });
    }
    expect(routeMasteryLevel(caravan.routeMastery["0:1"])).toBe(2);
    expect(masteryRiskReduction(6)).toBe(10);
  });

  it("wears, repairs, and upgrades the caravan", () => {
    const caravan = createCaravanState();
    expect(applyPackhorseTravelWear(caravan, 1, 4, false)).toBe(2);
    expect(repairPackhorses(caravan, 1)).toBe(1);
    expect(upgradeConcealment(caravan)).toBe(true);
    expect(caravan.concealmentLevel).toBe(1);
  });

  it("applies route weather, supplies, and morale", () => {
    const caravan = createCaravanState();
    const conditions = routeTravelConditions(0, 1, 4, 3);
    const result = applyTravelConditions(caravan, conditions);
    expect(result.suppliesUsed).toBeGreaterThan(0);
    expect(caravan.supplies).toBeLessThan(12);
    expect(caravan.morale).toBeGreaterThanOrEqual(0);
    expect(applyPackhorseTravelWear(caravan, 1, 3, false, conditions.wearBonus)).toBeGreaterThanOrEqual(2);
  });

  it("migrates old caravan saves", () => {
    const caravan = ensureCaravanState({ packhorseCondition: 101, concealmentLevel: 0, routeHistory: [], routeMastery: {}, bookmarkedRoutes: [] } as never);
    expect(caravan.packhorseCondition).toBe(100);
    expect(caravan.supplies).toBe(12);
    expect(caravan.morale).toBe(70);
  });

  it("bookmarks routes", () => {
    const caravan = createCaravanState();
    expect(toggleRouteBookmark(caravan, 0, 2)).toBe(true);
    expect(toggleRouteBookmark(caravan, 0, 2)).toBe(false);
  });
});
