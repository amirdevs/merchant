import { beforeEach, describe, expect, it, vi } from "vitest";
import { deleteGameSave, listSaveSlots, loadGame, parseGameSave, saveGame } from "./save";
import { newGame } from "./game";

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

  it("migrates older saves with missing modern fields", () => {
    const legacy = {
      marketIndex: 0,
      day: 2,
      selectedCharacterIndex: null,
      characters: [],
      playerInventory: [],
      message: "legacy",
    };

    const parsed = parseGameSave(JSON.stringify(legacy));

    expect(parsed?.offersMade).toBe(0);
    expect(parsed?.npcRelations).toEqual({});
    expect(parsed?.questStates).toEqual({});
    expect(parsed?.dialogueLog).toEqual([]);
  });
});
