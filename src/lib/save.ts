import { MARKET_OPEN_MINUTES, type GameState } from "./game";
import { createCompanyState } from "./company";
import { createCaravanState, ensureCaravanState } from "./caravan";
import { createLawState } from "./law";
import { createRivalState, ensureRivalState } from "./rivals";
import { createMythProgression, ensureMythProgression } from "./myth";

export const SAVE_VERSION = 2;
export const SAVE_SCHEMA_LABEL = "item-catalog-2026-06-v2";
export const INCOMPATIBLE_SAVE_MESSAGE =
  "This save was created before the item-catalog and NPC-stock overhaul. Start a new game or delete the old slot; loading it could point inventories at the wrong items.";

const SAVE_KEY = "merchant-react-save";
const SAVE_SLOT_PREFIX = "merchant-react-save-slot-";
const SAVE_SLOT_COUNT = 4;

export type SaveEnvelope = {
  saveVersion: number;
  schemaLabel?: string;
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
  compatible: boolean;
  status: "empty" | "compatible" | "incompatible" | "corrupt";
  reason?: string;
  saveVersion?: number | null;
};

function emptySlot(slot: number): SaveSlotSummary {
  return {
    slot,
    name: slot === 0 ? "Primary Ledger" : `Archive Slot ${slot + 1}`,
    savedAt: null,
    day: null,
    marketIndex: null,
    empty: true,
    compatible: false,
    status: "empty",
  };
}

function isCurrentEnvelope(value: unknown): value is SaveEnvelope {
  const candidate = value as Partial<SaveEnvelope> | null;
  return Boolean(
    candidate &&
      typeof candidate === "object" &&
      "game" in candidate &&
      candidate.saveVersion === SAVE_VERSION &&
      candidate.schemaLabel === SAVE_SCHEMA_LABEL
  );
}

function isGameState(value: unknown): value is GameState {
  const candidate = value as Partial<GameState> | null;
  if (!(
    candidate &&
      typeof candidate.marketIndex === "number" &&
      typeof candidate.day === "number" &&
      Array.isArray(candidate.characters) &&
      Array.isArray(candidate.playerInventory)
  )) return false;
  if (typeof candidate.timeOfDayMinutes !== "number") candidate.timeOfDayMinutes = MARKET_OPEN_MINUTES;
  if (typeof candidate.customerQueueDay !== "number") candidate.customerQueueDay = candidate.day;
  if (!Array.isArray(candidate.seenCharacterIndexes)) candidate.seenCharacterIndexes = [];
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
  else candidate.mythProgression = ensureMythProgression(candidate.mythProgression);
  if (!candidate.marketSimulation || typeof candidate.marketSimulation !== "object") candidate.marketSimulation = {};
  if (!candidate.company || typeof candidate.company !== "object") candidate.company = createCompanyState();
  if (!("draftSession" in candidate)) candidate.draftSession = null;
  if (!candidate.caravan || typeof candidate.caravan !== "object") candidate.caravan = createCaravanState();
  else candidate.caravan = ensureCaravanState(candidate.caravan);
  if (!candidate.law || typeof candidate.law !== "object") candidate.law = createLawState();
  if (!candidate.rivals || typeof candidate.rivals !== "object") candidate.rivals = createRivalState(candidate.characters);
  else candidate.rivals = ensureRivalState(candidate.rivals, candidate.characters);
  if (!Array.isArray(candidate.dialogueLog)) candidate.dialogueLog = [];
  if (!("travelResult" in candidate)) candidate.travelResult = null;
  if (candidate.travelResult && typeof candidate.travelResult.stallage !== "number") candidate.travelResult.stallage = 0;
  return true;
}

export function serializeGame(state: GameState) {
  const envelope: SaveEnvelope = {
    saveVersion: SAVE_VERSION,
    schemaLabel: SAVE_SCHEMA_LABEL,
    savedAt: new Date().toISOString(),
    game: state,
  };
  return JSON.stringify(envelope, null, 2);
}

export function parseGameSave(raw: string) {
  try {
    const parsed = JSON.parse(raw) as SaveEnvelope | GameState;
    if (!isCurrentEnvelope(parsed)) return null;
    if (isGameState(parsed.game)) return parsed.game;
    return null;
  } catch {
    return null;
  }
}

function inspectSave(raw: string, slot: number): SaveSlotSummary {
  try {
    const parsed = JSON.parse(raw) as Partial<SaveEnvelope> | Partial<GameState>;
    const maybeEnvelope = parsed as Partial<SaveEnvelope>;
    const game = "game" in maybeEnvelope ? maybeEnvelope.game : parsed;
    const saveVersion = "saveVersion" in maybeEnvelope && typeof maybeEnvelope.saveVersion === "number" ? maybeEnvelope.saveVersion : null;
    const savedAt = "savedAt" in maybeEnvelope && typeof maybeEnvelope.savedAt === "string" ? maybeEnvelope.savedAt : null;
    const day = game && typeof (game as Partial<GameState>).day === "number" ? ((game as Partial<GameState>).day as number) : null;
    const marketIndex = game && typeof (game as Partial<GameState>).marketIndex === "number" ? ((game as Partial<GameState>).marketIndex as number) : null;

    if (!isCurrentEnvelope(parsed)) {
      return {
        slot,
        name: slot === 0 ? "Primary Ledger" : `Archive Slot ${slot + 1}`,
        savedAt,
        day,
        marketIndex,
        empty: false,
        compatible: false,
        status: "incompatible",
        reason: INCOMPATIBLE_SAVE_MESSAGE,
        saveVersion,
      };
    }

    if (!isGameState(maybeEnvelope.game)) {
      return {
        slot,
        name: slot === 0 ? "Primary Ledger" : `Archive Slot ${slot + 1}`,
        savedAt,
        day,
        marketIndex,
        empty: false,
        compatible: false,
        status: "corrupt",
        reason: "This slot has the current save version, but its game-state payload is not valid.",
        saveVersion: SAVE_VERSION,
      };
    }

    return {
      slot,
      name: slot === 0 ? "Primary Ledger" : `Archive Slot ${slot + 1}`,
      savedAt,
      day,
      marketIndex,
      empty: false,
      compatible: true,
      status: "compatible",
      saveVersion: SAVE_VERSION,
    };
  } catch {
    return {
      slot,
      name: slot === 0 ? "Primary Ledger" : `Archive Slot ${slot + 1}`,
      savedAt: null,
      day: null,
      marketIndex: null,
      empty: false,
      compatible: false,
      status: "corrupt",
      reason: "This slot does not contain readable JSON.",
      saveVersion: null,
    };
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
    if (!raw) return emptySlot(slot);
    return inspectSave(raw, slot);
  });
}
