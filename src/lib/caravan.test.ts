import { describe, expect, it } from "vitest";
import { applyPackhorseTravelWear, createCaravanState, masteryRiskReduction, recordRoute, repairPackhorses, routeMasteryLevel, toggleRouteBookmark, upgradeConcealment } from "./caravan";

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

  it("bookmarks routes", () => {
    const caravan = createCaravanState();
    expect(toggleRouteBookmark(caravan, 0, 2)).toBe(true);
    expect(toggleRouteBookmark(caravan, 0, 2)).toBe(false);
  });
});
