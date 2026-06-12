import type { GameState } from "./game";

export const SAVE_VERSION = 1;
const SAVE_KEY = "merchant-react-save";

export type SaveEnvelope = {
  saveVersion: number;
  savedAt: string;
  game: GameState;
};

function isGameState(value: unknown): value is GameState {
  const candidate = value as Partial<GameState> | null;
  return Boolean(
    candidate &&
      typeof candidate.marketIndex === "number" &&
      typeof candidate.day === "number" &&
      Array.isArray(candidate.characters) &&
      Array.isArray(candidate.playerInventory)
  );
}

export function serializeGame(state: GameState) {
  const envelope: SaveEnvelope = {
    saveVersion: SAVE_VERSION,
    savedAt: new Date().toISOString(),
    game: state,
  };
  return JSON.stringify(envelope, null, 2);
}

export function parseGameSave(raw: string) {
  try {
    const parsed = JSON.parse(raw) as SaveEnvelope | GameState;
    if ("game" in parsed && isGameState(parsed.game)) return parsed.game;
    if (isGameState(parsed)) return parsed;
    return null;
  } catch {
    return null;
  }
}

export function saveGame(state: GameState) {
  localStorage.setItem(SAVE_KEY, serializeGame(state));
}

export function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  return parseGameSave(raw);
}

export function importGame(raw: string) {
  const game = parseGameSave(raw);
  if (!game) return null;
  saveGame(game);
  return game;
}
