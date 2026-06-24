import { describe, expect, it } from "vitest";
import type { Character } from "@/data/types";
import {
  characterIdentityProfiles,
  characterPortraitManifestSummary,
  characterPortraitRecords,
  characterPortraitsByCharacterId,
  characterPortraitsByOutputFile,
  EXPECTED_CHARACTER_IDENTITY_COUNT,
  EXPECTED_CHARACTER_PORTRAIT_COUNT,
  EXPECTED_LEGACY_REWORKED_COUNT,
  EXPECTED_USEFUL_NEW_NPC_COUNT,
  remakeCharacterPortraitAsset,
  remakeCharacterView,
  runtimePortraitAsset,
} from "./characterPortraitManifest";

describe("character portrait manifest", () => {
  it("keeps the final portrait production counts locked", () => {
    expect(characterPortraitManifestSummary.promptSheetCount).toBe(61);
    expect(characterPortraitManifestSummary.portraitCount).toBe(EXPECTED_CHARACTER_PORTRAIT_COUNT);
    expect(characterPortraitManifestSummary.identityCount).toBe(EXPECTED_CHARACTER_IDENTITY_COUNT);
    expect(characterPortraitManifestSummary.usefulNewNpcCount).toBe(EXPECTED_USEFUL_NEW_NPC_COUNT);
    expect(characterPortraitManifestSummary.legacyReworkedCount).toBe(EXPECTED_LEGACY_REWORKED_COUNT);
  });

  it("has unique output files and image ids", () => {
    expect(new Set(characterPortraitRecords.map((portrait) => portrait.outputFile)).size).toBe(characterPortraitRecords.length);
    expect(new Set(characterPortraitRecords.map((portrait) => portrait.imageId)).size).toBe(characterPortraitRecords.length);
  });

  it("maps known first and last portrait assets", () => {
    expect(characterPortraitsByOutputFile.has("npc-new-001-neutral.png")).toBe(true);
    expect(characterPortraitsByOutputFile.has("npc-legacy-191-neutral.png")).toBe(true);
    expect(runtimePortraitAsset("npc-new-001-neutral.png")).toBe("/assets/portraits/characters/npc-new-001-neutral.png");
  });

  it("links legacy generated indexes to remake profiles and portrait paths", () => {
    const generatedReferenceCharacter = {
      index: 0,
      name: "Guard",
      profession: "Guard",
      professionSlug: null,
      portraitFile: "male_notting_soldier_high.png",
      isActive: true,
      isMerchant: false,
      marketplaceIndex: 0,
      maxObtainValue: 100,
      frugalPercent: 8,
      closeToDealPercent: 0,
      reachingDealPercent: 0,
      bias: [],
      obtainableItems: [],
      excludedObtainItems: [],
      inventory: [],
    } satisfies Character;

    const view = remakeCharacterView(generatedReferenceCharacter);
    expect(view.name).not.toBe("Guard");
    expect(view.id).toBe("npc-legacy-000");
    expect(remakeCharacterPortraitAsset(generatedReferenceCharacter)).toMatch(/^\/assets\/portraits\/characters\/npc-legacy-000-/);
  });

  it("has at least one portrait for every identity", () => {
    const missing = characterIdentityProfiles.filter((identity) => !characterPortraitsByCharacterId.has(identity.characterId));
    expect(missing).toEqual([]);
  });
});
