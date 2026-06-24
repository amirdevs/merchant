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
  EXPECTED_SUPPORTING_CAST_COUNT,
  EXPECTED_PRIMARY_CAST_COUNT,
  characterPortraitAssetForCharacter,
  characterProfileView,
  runtimePortraitAsset,
} from "./characterPortraitManifest";

describe("character portrait manifest", () => {
  it("keeps the final portrait production counts locked", () => {
    expect(characterPortraitManifestSummary.promptSheetCount).toBe(61);
    expect(characterPortraitManifestSummary.portraitCount).toBe(EXPECTED_CHARACTER_PORTRAIT_COUNT);
    expect(characterPortraitManifestSummary.identityCount).toBe(EXPECTED_CHARACTER_IDENTITY_COUNT);
    expect(characterPortraitManifestSummary.primaryCastCount).toBe(EXPECTED_PRIMARY_CAST_COUNT);
    expect(characterPortraitManifestSummary.supportingCastCount).toBe(EXPECTED_SUPPORTING_CAST_COUNT);
  });

  it("has unique output files and image ids", () => {
    expect(new Set(characterPortraitRecords.map((portrait) => portrait.outputFile)).size).toBe(characterPortraitRecords.length);
    expect(new Set(characterPortraitRecords.map((portrait) => portrait.imageId)).size).toBe(characterPortraitRecords.length);
  });

  it("maps known first and last portrait assets", () => {
    expect(characterPortraitsByOutputFile.has("character-001-neutral.png")).toBe(true);
    expect(characterPortraitsByOutputFile.has("character-240-neutral.png")).toBe(true);
    expect(runtimePortraitAsset("character-001-neutral.png")).toBe("/assets/portraits/characters/character-001-neutral.png");
  });

  it("links runtime indexes to character profiles and portrait paths", () => {
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

    const view = characterProfileView(generatedReferenceCharacter);
    expect(view.name).not.toBe("Guard");
    expect(view.id).toBe("character-049");
    expect(characterPortraitAssetForCharacter(generatedReferenceCharacter)).toMatch(/^\/assets\/portraits\/characters\/character-049-/);
  });

  it("has at least one portrait for every identity", () => {
    const missing = characterIdentityProfiles.filter((identity) => !characterPortraitsByCharacterId.has(identity.characterId));
    expect(missing).toEqual([]);
  });
});
