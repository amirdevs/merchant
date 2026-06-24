import { describe, expect, it } from "vitest";
import {
  acceptLoopStoryQuest,
  buildLoopBalanceReport,
  buildLoopConsequenceSummary,
  buyLoopItem,
  createPlayableMerchantLoopState,
  registerLoopCompany,
  resolveLoopStoryQuest,
  runRecommendedLoopDemo,
  sellLoopItem,
  travelLoopRoute,
} from "./playable-merchant-loop";
import { FIRST_PLAYABLE_QUEST_CHAIN_IDS } from "./first-playable-quest-chain";

describe("playable merchant loop polish and consequence layer", () => {
  it("tracks visible reputation and consequence changes from profitable trade", () => {
    let state = createPlayableMerchantLoopState();
    state = acceptLoopStoryQuest(state, FIRST_PLAYABLE_QUEST_CHAIN_IDS[0]);
    state = buyLoopItem(state, "coastal-salt", 4);
    state = travelLoopRoute(state, "riverwake-mill");
    state = sellLoopItem(state, "coastal-salt", 4);

    const summary = buildLoopConsequenceSummary(state);
    expect(summary.publicTrust).toBeGreaterThan(0);
    expect(summary.townReputation.find((town) => town.townId === "riverwake-mill")?.score).toBeGreaterThan(0);
    expect(summary.visibleConsequences).toContain("first-visible-profit");
  });

  it("surfaces different consequence profiles for honest and exploit approaches", () => {
    let honest = createPlayableMerchantLoopState();
    honest = acceptLoopStoryQuest(honest, FIRST_PLAYABLE_QUEST_CHAIN_IDS[0]);
    honest = resolveLoopStoryQuest(honest, "honest", FIRST_PLAYABLE_QUEST_CHAIN_IDS[0]);

    let exploit = createPlayableMerchantLoopState();
    exploit = acceptLoopStoryQuest(exploit, FIRST_PLAYABLE_QUEST_CHAIN_IDS[0]);
    exploit = resolveLoopStoryQuest(exploit, "exploit", FIRST_PLAYABLE_QUEST_CHAIN_IDS[0]);

    expect(buildLoopConsequenceSummary(honest).publicTrust).toBeGreaterThan(buildLoopConsequenceSummary(exploit).publicTrust);
    expect(buildLoopConsequenceSummary(exploit).shadowHeat).toBeGreaterThan(buildLoopConsequenceSummary(honest).shadowHeat);
  });

  it("produces a healthy balance report after the recommended demo", () => {
    const state = runRecommendedLoopDemo();
    const balance = buildLoopBalanceReport(state);
    const summary = buildLoopConsequenceSummary(state);

    expect(balance.signals.length).toBeGreaterThanOrEqual(5);
    expect(balance.signals.filter((signal) => signal.status === "good").length).toBeGreaterThanOrEqual(4);
    expect(balance.nextRecommendedAction).toContain("Replay");
    expect(summary.companyReadiness).toBeGreaterThan(0);
    expect(summary.visibleConsequences).toContain("first-company-registered");
  });

  it("company registration adds a visible company readiness consequence", () => {
    const state = registerLoopCompany(runRecommendedLoopDemo(), "Sunwake Ledger Company");
    const summary = buildLoopConsequenceSummary(state);
    expect(summary.companyReadiness).toBeGreaterThanOrEqual(5);
    expect(summary.visibleConsequences).toContain("first-company-registered");
  });
});
