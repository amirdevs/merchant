import { describe, expect, it } from "vitest";
import { createPlayableMerchantLoopState, runRecommendedLoopDemo } from "@/lib/playable-merchant-loop";
import { buildVerticalSlicePolishReport, verticalSlicePolishSummary } from "@/lib/vertical-slice-polish";
import type { GameStateWithPlayableLoop } from "@/lib/game-runtime-loop";

describe("vertical slice polish report", () => {
  it("marks the recommended loop demo as alpha-ready enough for manual polish", () => {
    const report = buildVerticalSlicePolishReport(runRecommendedLoopDemo());

    expect(report.alphaReadinessScore).toBeGreaterThanOrEqual(85);
    expect(report.completedChecks).toBeGreaterThanOrEqual(6);
    expect(report.checks.find((entry) => entry.id === "trade")?.status).toBe("done");
    expect(report.checks.find((entry) => entry.id === "company")?.status).toBe("done");
    expect(report.flowPath).toContain("Save, reload, and continue");
  });

  it("keeps a fresh loop honest about what is still blocked", () => {
    const report = buildVerticalSlicePolishReport(createPlayableMerchantLoopState());

    expect(report.alphaReadinessScore).toBeLessThan(70);
    expect(report.checks.some((entry) => entry.status === "blocked")).toBe(true);
    expect(report.primaryNextAction).toMatch(/Journal|Buy|cargo|route|quest|company/i);
  });

  it("recognizes GameState runtime persistence when the saved loop is mounted", () => {
    const gameState = {
      day: 3,
      playableLoop: runRecommendedLoopDemo(),
      playableLoopRuntimeVersion: 1,
    } as GameStateWithPlayableLoop;

    const summary = verticalSlicePolishSummary(gameState);

    expect(summary.blockedChecks).not.toContain("runtime-save");
    expect(summary.alphaReadinessScore).toBeGreaterThanOrEqual(85);
    expect(summary.totalChecks).toBe(8);
  });
});
