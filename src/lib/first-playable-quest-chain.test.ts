import { describe, expect, it } from "vitest";
import {
  FIRST_PLAYABLE_QUEST_CHAIN_IDS,
  acceptFirstPlayableQuest,
  advanceFirstPlayableQuest,
  buildFirstPlayableQuestChainView,
  chooseFirstPlayableQuestOutcome,
  completeFirstPlayableQuestWithDefaultChoice,
  createFirstPlayableQuestChainState,
  ensureFirstPlayableQuestChainState,
  selectFirstPlayableQuest,
} from "./first-playable-quest-chain";
import { richQuestStatus } from "./quest-state";

function completeSelectedQuest(state = createFirstPlayableQuestChainState()) {
  const selected = state.selectedQuestId;
  const accepted = acceptFirstPlayableQuest(state, selected);
  const advancedOnce = advanceFirstPlayableQuest(accepted, selected);
  const advancedTwice = advanceFirstPlayableQuest(advancedOnce, selected);
  return completeFirstPlayableQuestWithDefaultChoice(advancedTwice, selected);
}

describe("first playable quest chain", () => {
  it("starts with only the first quest available", () => {
    const state = createFirstPlayableQuestChainState();
    expect(richQuestStatus(state, FIRST_PLAYABLE_QUEST_CHAIN_IDS[0])).toBe("available");
    expect(richQuestStatus(state, FIRST_PLAYABLE_QUEST_CHAIN_IDS[1])).toBe("locked");
    const view = buildFirstPlayableQuestChainView(state);
    expect(view.totalCount).toBe(5);
    expect(view.selectedQuest.title).toBe("First Honest Profit");
  });

  it("accepts, advances, completes, and unlocks the next quest", () => {
    const next = completeSelectedQuest();
    expect(richQuestStatus(next, FIRST_PLAYABLE_QUEST_CHAIN_IDS[0])).toBe("completed");
    expect(richQuestStatus(next, FIRST_PLAYABLE_QUEST_CHAIN_IDS[1])).toBe("available");
    expect(next.selectedQuestId).toBe(FIRST_PLAYABLE_QUEST_CHAIN_IDS[1]);
    expect(Object.values(next.endingScores).some((score) => score > 0)).toBe(true);
  });

  it("can complete the full five-quest chain and unlock company registration readiness", () => {
    let state = createFirstPlayableQuestChainState();
    for (const questId of FIRST_PLAYABLE_QUEST_CHAIN_IDS) {
      state = selectFirstPlayableQuest(state, questId);
      state = acceptFirstPlayableQuest(state, questId);
      state = advanceFirstPlayableQuest(state, questId);
      state = advanceFirstPlayableQuest(state, questId);
      state = chooseFirstPlayableQuestOutcome(state, questId, state.questChoices[questId] || "");
      if (richQuestStatus(state, questId) !== "completed") state = completeFirstPlayableQuestWithDefaultChoice(state, questId);
    }
    const view = buildFirstPlayableQuestChainView(state);
    expect(view.completedChain).toBe(true);
    expect(view.completedCount).toBe(5);
    expect(view.unlockedCompanyFeatures).toContain("company-registration-ready");
  });

  it("repairs partial saved state for persistence migration", () => {
    const restored = ensureFirstPlayableQuestChainState({ questStates: { [FIRST_PLAYABLE_QUEST_CHAIN_IDS[0]]: "completed" } }, 12);
    expect(restored.day).toBe(12);
    expect(richQuestStatus(restored, FIRST_PLAYABLE_QUEST_CHAIN_IDS[1])).toBe("available");
  });
});
