import { describe, expect, it } from "vitest";
import { resolveProfileStockPersona } from "@/content/characters/merchandise/stock-personas";
import type { FinalCharacterIdentityProfile } from "@/content/characters/profiles/types";

function profile(overrides: Partial<FinalCharacterIdentityProfile>): FinalCharacterIdentityProfile {
  return {
    characterId: "character-999",
    rosterGroup: "supporting_cast",
    runtimeIndex: null,
    catalogKey: "character-999",
    finalDisplayName: "Test Merchant",
    profession: "Merchant",
    gameplayGroups: ["trade"],
    roleTags: [],
    marketFlavor: "market",
    voiceDirection: "clear",
    tradePersonality: "specialist trader",
    shortStory: "",
    visualIdentity: "",
    uniquenessTraits: [],
    professionProps: [],
    dominantColors: [],
    expressionTier: "merchant",
    plannedExpressions: [],
    portraitFilePrefix: "character-999",
    identityAnchor: "test",
    portraitBasePrompt: "test",
    negativePrompt: "test",
    questHooks: [],
    integrationNotes: "test",
    ...overrides,
  };
}

describe("character stock personas", () => {
  it("detects silk factors as textile specialists", () => {
    const persona = resolveProfileStockPersona(profile({
      finalDisplayName: "Lysaro Vellthorn",
      profession: "Silk Factor",
      roleTags: ["silk", "textile", "guild official", "merchant"],
      shortStory: "A guild official who deals in silk bolts and dyed cloth.",
    }));

    const poolTags = persona.stockPools.map((entry) => entry.tag);
    expect(persona.personaId).toBe("silk_factor");
    expect(poolTags).toContain("silk");
    expect(poolTags).toContain("dye_vials");
    expect(poolTags).toContain("ribbons");
    expect(persona.stockBias.some((entry) => entry.tag === "silk" && entry.percent >= 80)).toBe(true);
  });

  it("detects cookshop owners as kitchen goods specialists", () => {
    const persona = resolveProfileStockPersona(profile({
      finalDisplayName: "Milo Copperpot",
      profession: "Cookshop Owner",
      roleTags: ["cookshop", "cookware", "food", "merchant"],
      shortStory: "A cookshop owner who sells kitchen tools, pots, spice jars, and recipe papers.",
    }));

    const poolTags = persona.stockPools.map((entry) => entry.tag);
    expect(persona.personaId).toBe("cookshop_owner");
    expect(poolTags).toContain("cookware");
    expect(poolTags).toContain("cookpot");
    expect(poolTags).toContain("spices");
    expect(persona.stockBias.some((entry) => entry.tag === "cookware" && entry.percent >= 80)).toBe(true);
  });

  it("detects button sellers as tailoring goods specialists", () => {
    const persona = resolveProfileStockPersona(profile({
      finalDisplayName: "Boro Thimbleback",
      profession: "Button Seller",
      roleTags: ["buttons", "tailoring"],
      visualIdentity: "Carries trays of glittering buttons.",
    }));

    const poolTags = persona.stockPools.map((entry) => entry.tag);
    expect(persona.personaId).toBe("button_seller");
    expect(poolTags).toContain("tailoring_buttons");
    expect(poolTags).toContain("buttons");
  });
});
