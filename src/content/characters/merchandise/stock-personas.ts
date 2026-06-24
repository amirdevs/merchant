import type { Bias, ObtainableItem } from "@/shared/types/game-data";
import type { FinalCharacterIdentityProfile } from "../profiles/types";

export type CharacterStockPersona = {
  personaId: string;
  label: string;
  stockPools: ObtainableItem[];
  stockBias: Bias[];
  forbiddenTags?: string[];
};

const EMPTY_PERSONA: CharacterStockPersona = {
  personaId: "general_profile_stock",
  label: "General profile stock",
  stockPools: [],
  stockBias: [],
};

function pool(tag: string, quantityMin = 1, quantityMax = 4): ObtainableItem {
  return { tag, quantityMin, quantityMax };
}

function bias(tag: string, percent: number): Bias {
  return { tag, percent };
}

function profileText(profile: FinalCharacterIdentityProfile) {
  return [
    profile.finalDisplayName,
    profile.profession,
    profile.marketFlavor,
    profile.tradePersonality,
    profile.shortStory,
    profile.visualIdentity,
    profile.portraitBasePrompt,
    ...(profile.roleTags || []),
    ...(profile.professionProps || []),
    ...(profile.questHooks || []),
  ].join(" ").toLowerCase();
}

function containsAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function makePersona(personaId: string, label: string, stockPools: ObtainableItem[], stockBias: Bias[], forbiddenTags: string[] = []): CharacterStockPersona {
  return { personaId, label, stockPools, stockBias, forbiddenTags };
}

const textileForbidden = ["weapon", "armor", "ore", "ingots", "livestock", "meat", "fish", "mushrooms", "eggs", "gems", "jewelry"];
const cookshopForbidden = ["weapon", "armor", "ore", "ingots", "gems", "jewelry", "royal", "livestock", "magic", "book"];

export function resolveProfileStockPersona(profile: FinalCharacterIdentityProfile): CharacterStockPersona {
  const text = profileText(profile);

  if (containsAny(text, ["silk factor", "silk", "dyed silk", "fabric factor", "cloth factor", "textile factor"])) {
    return makePersona(
      "silk_factor",
      "Silk and textile factor",
      [
        pool("silk", 1, 5),
        pool("silk_bolt", 1, 4),
        pool("dyed_silk", 1, 4),
        pool("raw_silk", 1, 4),
        pool("textile", 1, 5),
        pool("cloth", 1, 5),
        pool("fabric", 1, 5),
        pool("dye_vials", 1, 4),
        pool("pigments", 1, 4),
        pool("ribbons", 1, 5),
        pool("lace", 1, 4),
        pool("thread", 1, 6),
        pool("documents", 1, 3),
      ],
      [
        bias("silk", 85),
        bias("silk_bolt", 75),
        bias("dyed_silk", 70),
        bias("textile", 65),
        bias("cloth", 55),
        bias("fabric", 55),
        bias("dye_vials", 55),
        bias("ribbons", 45),
        bias("thread", 40),
        bias("documents", 20),
      ],
      textileForbidden,
    );
  }

  if (containsAny(text, ["cookshop", "cook shop", "cookware", "kitchen", "cookpot", "cookpot owner", "cookshop owner"])) {
    return makePersona(
      "cookshop_owner",
      "Cookshop and kitchen goods",
      [
        pool("cookware", 1, 5),
        pool("cookpot", 1, 4),
        pool("pot", 1, 4),
        pool("pan", 1, 4),
        pool("cauldron", 1, 3),
        pool("ladle", 1, 5),
        pool("kitchen_tools", 1, 5),
        pool("spices", 1, 6),
        pool("salt", 1, 8),
        pool("flour", 1, 8),
        pool("oil", 1, 5),
        pool("recipe_papers", 1, 3),
        pool("household", 1, 4),
      ],
      [
        bias("cookware", 85),
        bias("cookpot", 75),
        bias("pot", 65),
        bias("pan", 60),
        bias("kitchen_tools", 60),
        bias("spices", 45),
        bias("salt", 35),
        bias("flour", 35),
        bias("oil", 35),
        bias("recipe_papers", 25),
      ],
      cookshopForbidden,
    );
  }

  if (containsAny(text, ["button seller", "buttons", "button tray", "tailoring buttons"])) {
    return makePersona(
      "button_seller",
      "Buttons and small tailoring goods",
      [pool("tailoring_buttons", 1, 5), pool("buttons", 1, 6), pool("thread", 1, 6), pool("ribbons", 1, 5), pool("cloth_repairs", 1, 4), pool("textile", 1, 4)],
      [bias("tailoring_buttons", 85), bias("buttons", 80), bias("thread", 45), bias("ribbons", 35), bias("textile", 25)],
      textileForbidden,
    );
  }

  if (containsAny(text, ["dye merchant", "dye seller", "pigment", "dye vials", "bluepoppy"])) {
    return makePersona(
      "dye_merchant",
      "Dyes and pigments",
      [pool("dye_vials", 1, 5), pool("pigments", 1, 5), pool("cloth", 1, 4), pool("textile", 1, 4)],
      [bias("dye_vials", 85), bias("pigments", 70), bias("cloth", 30), bias("textile", 30)],
      textileForbidden,
    );
  }

  if (containsAny(text, ["seamstress", "tailor", "weaver", "ribbon hawker", "blanket weaver", "sail mender"])) {
    return makePersona(
      "textile_specialist",
      "Textile specialist",
      [pool("textile", 1, 5), pool("cloth", 1, 5), pool("thread", 1, 6), pool("ribbons", 1, 5), pool("lace", 1, 4), pool("wool", 1, 5), pool("fabrics", 1, 5)],
      [bias("textile", 70), bias("cloth", 60), bias("thread", 55), bias("ribbons", 45), bias("fabrics", 45), bias("wool", 35)],
      textileForbidden,
    );
  }

  return EMPTY_PERSONA;
}
