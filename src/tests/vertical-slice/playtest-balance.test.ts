import { describe, expect, it } from "vitest";
import { defaultPlaytestChecklist, playtestChecklistMarkdown, summarizePlaytestResults } from "@/game/vertical-slice/playtest-balance";

describe("playtest and balance checklist helpers", () => {
  it("starts with the major roadmap systems covered", () => {
    const checks = defaultPlaytestChecklist();
    expect(checks.map((check) => check.area)).toEqual(expect.arrayContaining(["items", "stock", "barter", "economy", "travel", "quests", "company", "save_load"]));
  });

  it("blocks continuation when a blocker check fails", () => {
    const checks = defaultPlaytestChecklist();
    const summary = summarizePlaytestResults(checks, [
      { checkId: "startup-new-game", status: "pass" },
      { checkId: "profession-stock-identity", status: "blocker", note: "Blacksmith stock is random." },
    ]);
    expect(summary.readyForNextStep).toBe(false);
    expect(summary.blocker).toBe(1);
  });

  it("allows continuation with mostly passing checks and small review debt", () => {
    const checks = defaultPlaytestChecklist();
    const results = checks.map((check) => ({ checkId: check.id, status: "pass" as const }));
    results[1] = { checkId: checks[1].id, status: "review" as const };
    const summary = summarizePlaytestResults(checks, results);
    expect(summary.readyForNextStep).toBe(true);
    expect(summary.review).toBe(1);
  });

  it("renders a markdown checklist", () => {
    const markdown = playtestChecklistMarkdown(defaultPlaytestChecklist(), [{ checkId: "startup-new-game", status: "pass" }]);
    expect(markdown).toContain("# Playtest And Balance Checklist");
    expect(markdown).toContain("Start a new game");
  });
});
