import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  deleteGameSave,
  INCOMPATIBLE_SAVE_MESSAGE,
  listSaveSlots,
  loadGame,
  parseGameSave,
  SAVE_VERSION,
  saveGame,
  serializeGame,
} from "@/game/runtime/save";
import { newGame } from "@/game/runtime/game";

function installLocalStorage() {
  const storage = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key),
    clear: () => storage.clear(),
  });
}

describe("save slots", () => {
  beforeEach(() => {
    installLocalStorage();
  });

  it("saves and loads independent local slots", () => {
    const first = { ...newGame(), day: 3 };
    const second = { ...newGame(), day: 12 };

    saveGame(first, 0);
    saveGame(second, 2);

    expect(loadGame(0)?.day).toBe(3);
    expect(loadGame(2)?.day).toBe(12);
    expect(listSaveSlots()[2]).toMatchObject({ slot: 2, day: 12, empty: false });
  });

  it("deletes only the requested slot", () => {
    saveGame({ ...newGame(), day: 3 }, 0);
    saveGame({ ...newGame(), day: 12 }, 1);

    deleteGameSave(1);

    expect(loadGame(0)?.day).toBe(3);
    expect(loadGame(1)).toBeNull();
  });

  it("blocks pre-v2 saves without mutating or loading them", () => {
    const incompatibleSave = {
      marketIndex: 0,
      day: 2,
      selectedCharacterIndex: null,
      characters: [],
      playerInventory: [],
      message: "outdated",
    };

    localStorage.setItem("merchant-react-save-slot-0", JSON.stringify(incompatibleSave));

    expect(parseGameSave(JSON.stringify(incompatibleSave))).toBeNull();
    expect(loadGame(0)).toBeNull();
    expect(listSaveSlots()[0]).toMatchObject({
      status: "incompatible",
      compatible: false,
      empty: false,
      reason: INCOMPATIBLE_SAVE_MESSAGE,
      saveVersion: null,
    });
  });

  it("loads and inspects new schema-v2 saves", () => {
    const state = { ...newGame(), day: 9 };
    const raw = serializeGame(state);

    localStorage.setItem("merchant-react-save-slot-1", raw);

    expect(JSON.parse(raw).saveVersion).toBe(SAVE_VERSION);
    expect(parseGameSave(raw)?.day).toBe(9);
    expect(listSaveSlots()[1]).toMatchObject({
      status: "compatible",
      compatible: true,
      empty: false,
      day: 9,
      saveVersion: SAVE_VERSION,
    });
  });

  it("blocks envelopes with the v2 number but a different catalog schema", () => {
    const envelope = JSON.parse(serializeGame(newGame()));
    envelope.schemaLabel = "different-item-catalog";
    const raw = JSON.stringify(envelope);

    localStorage.setItem("merchant-react-save-slot-1", raw);

    expect(parseGameSave(raw)).toBeNull();
    expect(listSaveSlots()[1]).toMatchObject({
      status: "incompatible",
      compatible: false,
      empty: false,
      saveVersion: SAVE_VERSION,
    });
  });

  it("reports malformed and invalid v2 slots as corrupt", () => {
    localStorage.setItem("merchant-react-save-slot-1", "{broken");
    localStorage.setItem("merchant-react-save-slot-2", JSON.stringify({
      saveVersion: SAVE_VERSION,
      schemaLabel: "item-catalog-2026-06-v2",
      savedAt: "2026-06-21T00:00:00.000Z",
      game: { day: 3 },
    }));

    expect(listSaveSlots()[1]).toMatchObject({
      status: "corrupt",
      compatible: false,
      empty: false,
      saveVersion: null,
    });
    expect(listSaveSlots()[2]).toMatchObject({
      status: "corrupt",
      compatible: false,
      empty: false,
      saveVersion: SAVE_VERSION,
    });
  });
});
