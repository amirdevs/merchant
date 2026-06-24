import { describe, expect, it } from "vitest";
import { customerDisplayName, customerIntro } from "@/game/characters/dialogue";
import {
  characterIdentityProfiles,
  characterPortraitAssetForCharacter,
  characterProfileView,
  EXPECTED_CHARACTER_IDENTITY_COUNT,
  EXPECTED_CHARACTER_PORTRAIT_COUNT,
} from "@/game/characters/characterPortraitManifest";
import {
  characterRuntimeProfiles,
  runtimeCharacterProfileByIndex,
  runtimeCharacterProfileSummary,
} from "@/content/characters/characterRuntimeProfiles";
import { autoAskPrice, newGame } from "@/game/runtime/game";

describe("runtime character roster", () => {
  it("builds the converted runtime roster without the raw character json file", () => {
    const state = newGame();
    expect(state.characters).toHaveLength(203);
    expect(runtimeCharacterProfileSummary.totalProfileCount).toBe(EXPECTED_CHARACTER_IDENTITY_COUNT);
    expect(runtimeCharacterProfileSummary.runtimeProfileCount).toBe(203);
    expect(EXPECTED_CHARACTER_PORTRAIT_COUNT).toBe(722);
  });

  it("maps every runtime index to a final profile-backed runtime character", () => {
    const state = newGame();
    const identityById = new Map(characterIdentityProfiles.map((identity) => [identity.characterId, identity]));

    for (const character of state.characters) {
      const runtimeProfile = runtimeCharacterProfileByIndex.get(character.index);
      expect(runtimeProfile?.characterId).toBe(character.characterId);
      expect(identityById.get(character.characterId!)).toBeDefined();
      expect(character.name).toBe(identityById.get(character.characterId!)?.finalDisplayName);
      expect(character.profession).toBe(identityById.get(character.characterId!)?.profession);
    }
  });

  it("uses final visible portrait filenames and never carries stall files", () => {
    const state = newGame();

    for (const character of state.characters) {
      expect(character.stallFile).toBeNull();
      expect(character.portraitFile).toMatch(/^character-\d{3}-[a-z]+\.png$/);
      expect(characterPortraitAssetForCharacter(character)).toMatch(/^\/assets\/portraits\/characters\/character-\d{3}-/);
    }
  });

  it("uses final profile names in customer and trade messaging", () => {
    const state = newGame();
    const character = state.characters.find((entry) => entry.characterId === "character-049");
    expect(character).toBeDefined();

    const view = characterProfileView(character!);
    expect(customerDisplayName(character!)).toBe(view.name);
    expect(customerIntro(character!)).toContain(view.name);

    const playerOfferable = state.characters.find((entry) => entry.inventory.length > 0);
    expect(playerOfferable).toBeDefined();
    expect(autoAskPrice(state, playerOfferable!)).toContain(playerOfferable!.name);
  });

  it("keeps runtime profile records keyed by final character ids", () => {
    expect(characterRuntimeProfiles["character-001"]?.runtimeIndex).toBe(192);
    expect(characterRuntimeProfiles["character-049"]?.runtimeIndex).toBe(0);
    expect(characterRuntimeProfiles["character-240"]?.runtimeIndex).toBe(191);
    expect(characterRuntimeProfiles["character-048"]?.runtimeIndex).toBeNull();
  });
});
