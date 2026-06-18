import type { GameState } from "./game";
import { createCompanyState } from "./company";
import { createCaravanState } from "./caravan";
import { createLawState } from "./law";
import { createRivalState } from "./rivals";
import { createMythProgression } from "./myth";

export const SAVE_VERSION = 1;
const SAVE_KEY = "merchant-react-save";
const SAVE_SLOT_PREFIX = "merchant-react-save-slot-";
const SAVE_SLOT_COUNT = 4;

export type SaveEnvelope = {
  saveVersion: number;
  savedAt: string;
  game: GameState;
};

export type SaveSlotSummary = {
  slot: number;
  name: string;
  savedAt: string | null;
  day: number | null;
  marketIndex: number | null;
  empty: boolean;
};

function isGameState(value: unknown): value is GameState {
  const candidate = value as Partial<GameState> | null;
  if (!(
    candidate &&
      typeof candidate.marketIndex === "number" &&
      typeof candidate.day === "number" &&
      Array.isArray(candidate.characters) &&
      Array.isArray(candidate.playerInventory)
  )) return false;
  if (typeof candidate.offersMade !== "number") candidate.offersMade = 0;
  if (!candidate.npcRelations || typeof candidate.npcRelations !== "object") candidate.npcRelations = {};
  if (!candidate.questStates || typeof candidate.questStates !== "object") candidate.questStates = {};
  if (!candidate.questAcceptedDays || typeof candidate.questAcceptedDays !== "object") candidate.questAcceptedDays = {};
  if (!candidate.contractStates || typeof candidate.contractStates !== "object") candidate.contractStates = {};
  if (!candidate.contractAcceptedDays || typeof candidate.contractAcceptedDays !== "object") candidate.contractAcceptedDays = {};
  if (!("auctionSession" in candidate)) candidate.auctionSession = null;
  if (!("selectedItemIndex" in candidate)) candidate.selectedItemIndex = null;
  if (!candidate.dialogueNodes || typeof candidate.dialogueNodes !== "object") candidate.dialogueNodes = {};
  if (!("raceResult" in candidate)) candidate.raceResult = null;
  if (!("mythSession" in candidate)) candidate.mythSession = null;
  if (!candidate.mythProgression || typeof candidate.mythProgression !== "object") candidate.mythProgression = createMythProgression();
  if (!candidate.marketSimulation || typeof candidate.marketSimulation !== "object") candidate.marketSimulation = {};
  if (!candidate.company || typeof candidate.company !== "object") candidate.company = createCompanyState();
  if (!("draftSession" in candidate)) candidate.draftSession = null;
  if (!candidate.caravan || typeof candidate.caravan !== "object") candidate.caravan = createCaravanState();
  if (!candidate.law || typeof candidate.law !== "object") candidate.law = createLawState();
  if (!candidate.rivals || typeof candidate.rivals !== "object") candidate.rivals = createRivalState(candidate.characters);
  if (!Array.isArray(candidate.dialogueLog)) candidate.dialogueLog = [];
  if (!("travelResult" in candidate)) candidate.travelResult = null;
  if (candidate.travelResult && typeof candidate.travelResult.stallage !== "number") candidate.travelResult.stallage = 0;
  return true;
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

function slotKey(slot = 0) {
  return `${SAVE_SLOT_PREFIX}${Math.max(0, Math.min(SAVE_SLOT_COUNT - 1, slot))}`;
}

export function saveGame(state: GameState, slot = 0) {
  const serialized = serializeGame(state);
  localStorage.setItem(slotKey(slot), serialized);
  if (slot === 0) localStorage.setItem(SAVE_KEY, serialized);
}

export function loadGame(slot = 0) {
  const raw = localStorage.getItem(slotKey(slot)) || (slot === 0 ? localStorage.getItem(SAVE_KEY) : null);
  if (!raw) return null;
  return parseGameSave(raw);
}

export function deleteGameSave(slot = 0) {
  localStorage.removeItem(slotKey(slot));
  if (slot === 0) localStorage.removeItem(SAVE_KEY);
}

export function importGame(raw: string, slot = 0) {
  const game = parseGameSave(raw);
  if (!game) return null;
  saveGame(game, slot);
  return game;
}

export function listSaveSlots(): SaveSlotSummary[] {
  return Array.from({ length: SAVE_SLOT_COUNT }, (_, slot) => {
    const raw = localStorage.getItem(slotKey(slot)) || (slot === 0 ? localStorage.getItem(SAVE_KEY) : null);
    if (!raw) return { slot, name: `Archive Slot ${slot + 1}`, savedAt: null, day: null, marketIndex: null, empty: true };
    try {
      const parsed = JSON.parse(raw) as SaveEnvelope | GameState;
      const game = "game" in parsed ? parsed.game : parsed;
      return {
        slot,
        name: slot === 0 ? "Primary Ledger" : `Archive Slot ${slot + 1}`,
        savedAt: "savedAt" in parsed ? parsed.savedAt : null,
        day: typeof game.day === "number" ? game.day : null,
        marketIndex: typeof game.marketIndex === "number" ? game.marketIndex : null,
        empty: false,
      };
    } catch {
      return { slot, name: `Archive Slot ${slot + 1}`, savedAt: null, day: null, marketIndex: null, empty: true };
    }
  });
}
