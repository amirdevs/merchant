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

function tagsFor(overrides: Partial<FinalCharacterIdentityProfile>) {
  return resolveProfileStockPersona(profile(overrides)).stockPools.map((entry) => entry.tag);
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
    expect(persona.stockBias.some((entry) => entry.tag === "silk" && entry.percent >= 90)).toBe(true);
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
    expect(persona.stockBias.some((entry) => entry.tag === "cookware" && entry.percent >= 90)).toBe(true);
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

  it("covers common specialist merchant professions", () => {
    const cases: Array<[Partial<FinalCharacterIdentityProfile>, string[]]> = [
      [{ profession: "Baker", shortStory: "Sells bread, flour, and pastries from an oven stall." }, ["bread", "flour"]],
      [{ profession: "Butcher", shortStory: "Cuts meat and smoked sausages." }, ["meat", "sausage"]],
      [{ profession: "Farmer", shortStory: "Sells orchard apples, grain, seeds, and vegetables." }, ["produce", "grain", "seeds"]],
      [{ profession: "Fisher", shortStory: "Brings fish, shellfish, hooks, and salted catch from the harbor." }, ["fish", "seafood"]],
      [{ profession: "Jeweler", shortStory: "Trades gems, pearls, rings, and brooches." }, ["jewelry", "gem"]],
      [{ profession: "Alchemist", shortStory: "Keeps potions, remedies, vials, and herbs." }, ["alchemy", "potion", "herbs"]],
      [{ profession: "Blacksmith", shortStory: "Works iron, coal, tools, nails, and metal goods." }, ["ore", "coal", "tool"]],
      [{ profession: "Fletcher", shortStory: "Makes arrows, bows, feathers, and quivers." }, ["arrows", "bows"]],
      [{ profession: "Scribe", shortStory: "Sells paper, ink, ledgers, contracts, and wax seals." }, ["paper", "ink", "ledger"]],
      [{ profession: "Florist", shortStory: "Sells flowers, seeds, herbs, and botanical baskets." }, ["flower", "seeds", "herbs"]],
    ];

    for (const [input, expectedTags] of cases) {
      const tags = tagsFor(input);
      for (const tag of expectedTags) expect(tags).toContain(tag);
    }
  });
});
