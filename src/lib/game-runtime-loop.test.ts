import { describe, expect, it } from "vitest";
import { newGame, serializeGame } from "@/lib/game";
import { parseGameSave } from "@/lib/save";
import {
  buildGameRuntimeLoopSnapshot,
  commitGamePlayableLoopState,
  ensureGamePlayableLoopState,
  resetGamePlayableLoopState,
  runtimeLoopSaveSummary,
  type GameStateWithPlayableLoop,
} from "@/lib/game-runtime-loop";
import {
  acceptLoopStoryQuest,
  buyLoopItem,
  registerLoopCompany,
  resolveLoopStoryQuest,
  runRecommendedLoopDemo,
  sellLoopItem,
  travelLoopRoute,
} from "@/lib/playable-merchant-loop";
import { FIRST_PLAYABLE_QUEST_CHAIN_IDS } from "@/lib/first-playable-quest-chain";

function freshGame() {
  return newGame() as GameStateWithPlayableLoop;
}

describe("game runtime playable loop integration", () => {
  it("creates the loop inside GameState instead of relying on standalone local storage", () => {
    const game = freshGame();
    expect(game.playableLoop).toBeUndefined();

    const loop = ensureGamePlayableLoopState(game);

    expect(game.playableLoop).toBe(loop);
    expect(game.playableLoopRuntimeVersion).toBe(1);
    expect(loop.day).toBe(game.day);
  });

  it("stores trade/travel/story progress on the game save payload", () => {
    const game = freshGame();
    let loop = ensureGamePlayableLoopState(game);
    loop = acceptLoopStoryQuest(loop, FIRST_PLAYABLE_QUEST_CHAIN_IDS[0]);
    loop = buyLoopItem(loop, "coastal-salt", 4);
    loop = travelLoopRoute(loop, "riverwake-mill");
    loop = sellLoopItem(loop, "coastal-salt", 4);
    loop = resolveLoopStoryQuest(loop, "honest", FIRST_PLAYABLE_QUEST_CHAIN_IDS[0]);
    commitGamePlayableLoopState(game, loop);

    expect(game.playableLoop?.totalProfit).toBeGreaterThan(0);
    expect(game.day).toBe(game.playableLoop?.day);

    const loaded = parseGameSave(serializeGame(game)) as GameStateWithPlayableLoop | null;
    expect(loaded?.playableLoop?.totalProfit).toBeGreaterThan(0);
    expect(loaded?.playableLoop?.questChain.questStates[FIRST_PLAYABLE_QUEST_CHAIN_IDS[0]]).toBe("completed");
  });

  it("persists the complete recommended loop through serialize and parse", () => {
    const game = freshGame();
    commitGamePlayableLoopState(game, runRecommendedLoopDemo());
    const loaded = parseGameSave(serializeGame(game)) as GameStateWithPlayableLoop | null;
    const summary = runtimeLoopSaveSummary(loaded || game);

    expect(summary.completedGoals).toBe(summary.totalGoals);
    expect(summary.companyRegistered).toBe(true);
    expect(summary.completedRichQuestChain).toBe(true);
    expect(summary.saveField).toBe("playableLoop");
  });

  it("resets the runtime loop without losing the surrounding game state", () => {
    const game = freshGame();
    commitGamePlayableLoopState(game, registerLoopCompany(runRecommendedLoopDemo(), "Test Ledger"));
    expect(game.playableLoop?.company.registered).toBe(true);

    const reset = resetGamePlayableLoopState(game);
    const snapshot = buildGameRuntimeLoopSnapshot(game);

    expect(reset.company.registered).toBe(false);
    expect(snapshot.view.completedGoals).toBe(0);
    expect(game.characters.length).toBeGreaterThan(0);
    expect(game.playerInventory.length).toBeGreaterThan(0);
  });
});
