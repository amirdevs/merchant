import { describe, expect, it } from "vitest";
import { createBalanceReport } from "@/game/economy/balance";
import { newGame } from "@/game/runtime/game";

describe("balance report", () => {
  it("summarizes economy and flags extreme outliers", () => {
    const state = newGame();
    state.marketSimulation["0"] = { tagShifts: { food: 95 }, lastUpdatedDay: 1 };
    state.law.heatByKingdom["0"] = 80;
    state.caravan.packhorseCondition = 20;

    const report = createBalanceReport(state);

    expect(report.maximumMarketShift).toBe(95);
    expect(report.maximumHeat).toBe(80);
    expect(report.warnings.map((warning) => warning.label)).toEqual(expect.arrayContaining(["Extreme market drift", "Severe legal heat", "Packhorse condition"]));
  });
});
