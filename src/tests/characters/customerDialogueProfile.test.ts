import { describe, expect, it } from "vitest";
import type { Character } from "@/shared/types/game-data";
import { customerDisplayName, customerIntro, dialogueChoices } from "@/game/characters/dialogue";
import { characterProfileView } from "@/game/characters/characterPortraitManifest";

function sampleRuntimeCharacter(): Character {
  return {
    index: 0,
    name: "Placeholder Guard",
    profession: "Guard",
    professionSlug: null,
    portraitFile: "character-049-neutral.png",
    stallFile: null,
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
}

describe("customer dialogue profile names", () => {
  it("uses the character profile catalog for arrival and dialogue text", () => {
    const character = sampleRuntimeCharacter();
    const profile = characterProfileView(character);

    expect(profile.name).not.toBe(character.name);
    expect(customerDisplayName(character)).toBe(profile.name);
    expect(customerIntro(character)).toContain(profile.name);
    expect(customerIntro(character)).not.toContain("Guard steps up");

    const choices = dialogueChoices(character);
    expect(choices.map((choice) => choice.reply).join("\n")).toContain(profile.name);
  });
});
