import { describe, expect, it } from "vitest";
import {
  acceptLoopStoryQuest,
  bestLoopTradeRoutes,
  buildPlayableMerchantLoopView,
  buyLoopItem,
  createPlayableMerchantLoopState,
  registerLoopCompany,
  resolveLoopStoryQuest,
  runRecommendedLoopDemo,
  sellLoopItem,
  travelLoopRoute,
} from "./playable-merchant-loop";
import { FIRST_PLAYABLE_QUEST_CHAIN_IDS } from "./first-playable-quest-chain";
import { richQuestStatus } from "./quest-state";

describe("playable merchant loop v1", () => {
  it("provides profitable starter routes", () => {
    const routes = bestLoopTradeRoutes("sunwake-harbor");
    expect(routes.length).toBeGreaterThan(0);
    expect(routes[0].netProfit).toBeGreaterThan(0);
    expect(routes.some((route) => route.itemId === "coastal-salt" && route.to === "Riverwake Mill")).toBe(true);
  });

  it("lets the player buy, travel, sell, and mark the first quest ready", () => {
    let state = createPlayableMerchantLoopState();
    state = acceptLoopStoryQuest(state, FIRST_PLAYABLE_QUEST_CHAIN_IDS[0]);
    state = buyLoopItem(state, "coastal-salt", 4);
    state = travelLoopRoute(state, "riverwake-mill");
    state = sellLoopItem(state, "coastal-salt", 4);

    expect(state.currentTownId).toBe("riverwake-mill");
    expect(state.totalProfit).toBeGreaterThan(0);
    expect(state.completedTrades).toBe(1);
    expect(richQuestStatus(state.questChain, FIRST_PLAYABLE_QUEST_CHAIN_IDS[0])).toBe("ready_to_turn_in");
  });

  it("runs the recommended vertical-slice demo through company registration", () => {
    const state = runRecommendedLoopDemo();
    const view = buildPlayableMerchantLoopView(state);

    expect(view.questView.completedChain).toBe(true);
    expect(view.company.registered).toBe(true);
    expect(view.completedGoals).toBe(view.totalGoals);
    expect(view.copper).toBeGreaterThan(0);
    expect(view.ledger.length).toBeGreaterThan(5);
  });

  it("does not register the company before the quest chain is complete", () => {
    const state = registerLoopCompany(createPlayableMerchantLoopState(), "Too Early Traders");
    expect(state.company.registered).toBe(false);
    expect(state.ledger[0].text).toContain("not ready");
  });

  it("unlocks the next quest after resolving the first profitable trade quest", () => {
    let state = createPlayableMerchantLoopState();
    state = acceptLoopStoryQuest(state, FIRST_PLAYABLE_QUEST_CHAIN_IDS[0]);
    state = buyLoopItem(state, "coastal-salt", 2);
    state = travelLoopRoute(state, "riverwake-mill");
    state = sellLoopItem(state, "coastal-salt", 2);
    state = resolveLoopStoryQuest(state, "honest", FIRST_PLAYABLE_QUEST_CHAIN_IDS[0]);

    expect(richQuestStatus(state.questChain, FIRST_PLAYABLE_QUEST_CHAIN_IDS[0])).toBe("completed");
    expect(richQuestStatus(state.questChain, FIRST_PLAYABLE_QUEST_CHAIN_IDS[1])).toBe("available");
  });
});
