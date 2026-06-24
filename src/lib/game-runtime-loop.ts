import type { GameState } from "@/lib/game";
import {
  buildPlayableMerchantLoopView,
  createPlayableMerchantLoopState,
  ensurePlayableMerchantLoopState,
  type PlayableMerchantLoopState,
} from "@/lib/playable-merchant-loop";

export const PLAYABLE_LOOP_SAVE_FIELD = "playableLoop";
export const PLAYABLE_LOOP_RUNTIME_VERSION = 1;

export type GameStateWithPlayableLoop = GameState & {
  playableLoop?: PlayableMerchantLoopState;
  playableLoopRuntimeVersion?: number;
};

function clampDay(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? Math.floor(value) : fallback;
}

export function ensureGamePlayableLoopState(gameState: GameStateWithPlayableLoop): PlayableMerchantLoopState {
  const gameDay = clampDay(gameState.day, 1);
  const loop = ensurePlayableMerchantLoopState(gameState.playableLoop, gameDay);
  loop.day = gameDay;
  gameState.playableLoop = loop;
  gameState.playableLoopRuntimeVersion = PLAYABLE_LOOP_RUNTIME_VERSION;
  return loop;
}

export function commitGamePlayableLoopState(gameState: GameStateWithPlayableLoop, loopState: PlayableMerchantLoopState): PlayableMerchantLoopState {
  const loop = ensurePlayableMerchantLoopState(loopState, clampDay(gameState.day, 1));
  gameState.playableLoop = loop;
  gameState.playableLoopRuntimeVersion = PLAYABLE_LOOP_RUNTIME_VERSION;
  gameState.day = clampDay(loop.day, gameState.day);
  gameState.message = runtimeLoopMessage(loop);
  return loop;
}

export function updateGamePlayableLoopState(
  gameState: GameStateWithPlayableLoop,
  mutator: (current: PlayableMerchantLoopState) => PlayableMerchantLoopState,
): PlayableMerchantLoopState {
  const current = ensureGamePlayableLoopState(gameState);
  return commitGamePlayableLoopState(gameState, mutator(current));
}

export function resetGamePlayableLoopState(gameState: GameStateWithPlayableLoop): PlayableMerchantLoopState {
  return commitGamePlayableLoopState(gameState, createPlayableMerchantLoopState(clampDay(gameState.day, 1)));
}

export function buildGameRuntimeLoopSnapshot(gameState: GameStateWithPlayableLoop) {
  const loop = ensureGamePlayableLoopState(gameState);
  const view = buildPlayableMerchantLoopView(loop);
  return {
    loop,
    view,
    saveField: PLAYABLE_LOOP_SAVE_FIELD,
    runtimeVersion: gameState.playableLoopRuntimeVersion || PLAYABLE_LOOP_RUNTIME_VERSION,
    persistedInGameState: Boolean(gameState.playableLoop),
    gameDay: gameState.day,
    readyForSaveExport: Boolean(gameState.playableLoop && gameState.playableLoopRuntimeVersion === PLAYABLE_LOOP_RUNTIME_VERSION),
  };
}

export function runtimeLoopMessage(loopState: PlayableMerchantLoopState) {
  const view = buildPlayableMerchantLoopView(loopState);
  const company = view.company.registered ? `${view.company.name} registered` : view.company.ledgerOpened ? "company ledger ready" : "company still locked";
  return `${view.title}: ${view.completedGoals}/${view.totalGoals} goals complete, ${view.copper} copper, ${company}.`;
}

export function runtimeLoopSaveSummary(gameState: GameStateWithPlayableLoop) {
  const snapshot = buildGameRuntimeLoopSnapshot(gameState);
  return {
    saveField: snapshot.saveField,
    runtimeVersion: snapshot.runtimeVersion,
    day: snapshot.loop.day,
    town: snapshot.view.town.name,
    copper: snapshot.view.copper,
    totalProfit: snapshot.loop.totalProfit,
    completedGoals: snapshot.view.completedGoals,
    totalGoals: snapshot.view.totalGoals,
    companyRegistered: snapshot.view.company.registered,
    completedRichQuestChain: snapshot.view.questView.completedChain,
  };
}
