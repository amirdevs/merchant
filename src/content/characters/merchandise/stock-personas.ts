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
    ...(profile.gameplayGroups || []),
    ...(profile.roleTags || []),
    ...(profile.professionProps || []),
    ...(profile.questHooks || []),
    ...(profile.uniquenessTraits || []),
  ].join(" ").toLowerCase();
}

function containsAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function makePersona(personaId: string, label: string, stockPools: ObtainableItem[], stockBias: Bias[], forbiddenTags: string[] = []): CharacterStockPersona {
  return { personaId, label, stockPools, stockBias, forbiddenTags };
}

const noJewelsOrWeapons = ["weapon", "armor", "ore", "ingots", "gems", "jewelry", "royal", "livestock"];
const noFoodOrAnimals = ["food", "meat", "fish", "seafood", "produce", "fruit", "livestock", "eggs", "mushrooms"];
const noHeavyTrade = ["ore", "ingots", "armor", "weapon", "livestock", "barrels"];
const textileForbidden = ["weapon", "armor", "ore", "ingots", "livestock", "meat", "fish", "mushrooms", "eggs", "gems", "jewelry"];
const cookshopForbidden = ["weapon", "armor", "ore", "ingots", "gems", "jewelry", "royal", "livestock", "magic", "book"];

export function resolveProfileStockPersona(profile: FinalCharacterIdentityProfile): CharacterStockPersona {
  const text = profileText(profile);

  if (containsAny(text, ["silk factor", "silk", "dyed silk", "fabric factor", "cloth factor", "textile factor"])) {
    return makePersona(
      "silk_factor",
      "Silk and textile factor",
      [pool("silk", 1, 6), pool("silk_bolt", 1, 5), pool("dyed_silk", 1, 5), pool("raw_silk", 1, 5), pool("textile", 1, 6), pool("cloth", 1, 6), pool("fabric", 1, 6), pool("dye_vials", 1, 5), pool("pigments", 1, 5), pool("ribbons", 1, 6), pool("lace", 1, 5), pool("thread", 1, 8), pool("documents", 1, 3), pool("wax_seal", 1, 3)],
      [bias("silk", 95), bias("silk_bolt", 90), bias("dyed_silk", 85), bias("raw_silk", 75), bias("textile", 70), bias("cloth", 65), bias("fabric", 65), bias("dye_vials", 65), bias("ribbons", 55), bias("thread", 50), bias("documents", 25)],
      textileForbidden,
    );
  }

  if (containsAny(text, ["button seller", "buttons", "button tray", "tailoring buttons"])) {
    return makePersona(
      "button_seller",
      "Buttons and small tailoring goods",
      [pool("tailoring_buttons", 1, 7), pool("buttons", 1, 8), pool("thread", 1, 8), pool("ribbons", 1, 6), pool("lace", 1, 5), pool("cloth_repairs", 1, 5), pool("textile", 1, 5)],
      [bias("tailoring_buttons", 95), bias("buttons", 90), bias("thread", 55), bias("ribbons", 45), bias("lace", 35), bias("textile", 30)],
      textileForbidden,
    );
  }

  if (containsAny(text, ["cookshop", "cook shop", "cookware", "kitchen", "cookpot", "cookpot owner", "cookshop owner", "cookshop owner"])) {
    return makePersona(
      "cookshop_owner",
      "Cookshop and kitchen goods",
      [pool("cookware", 1, 6), pool("cookpot", 1, 5), pool("pot", 1, 5), pool("pan", 1, 5), pool("cauldron", 1, 4), pool("ladle", 1, 6), pool("kitchen_tools", 1, 6), pool("spices", 1, 8), pool("salt", 1, 10), pool("flour", 1, 10), pool("oil", 1, 6), pool("recipe_papers", 1, 4), pool("household", 1, 4)],
      [bias("cookware", 95), bias("cookpot", 90), bias("pot", 75), bias("pan", 70), bias("kitchen_tools", 70), bias("ladle", 65), bias("spices", 55), bias("salt", 45), bias("flour", 45), bias("oil", 40), bias("recipe_papers", 35)],
      cookshopForbidden,
    );
  }

  if (containsAny(text, ["dye merchant", "dye seller", "dyer", "pigment", "dye vials", "bluepoppy", "ink dye"])) {
    return makePersona("dye_merchant", "Dyes and pigments", [pool("dye_vials", 1, 7), pool("pigments", 1, 7), pool("ink", 1, 5), pool("cloth", 1, 5), pool("textile", 1, 5)], [bias("dye_vials", 95), bias("pigments", 90), bias("ink", 55), bias("cloth", 35), bias("textile", 35)], textileForbidden);
  }

  if (containsAny(text, ["seamstress", "tailor", "weaver", "ribbon hawker", "blanket weaver", "sail mender", "mender", "clothier", "fabric seller"])) {
    return makePersona("textile_specialist", "Textile specialist", [pool("textile", 1, 7), pool("cloth", 1, 7), pool("thread", 1, 8), pool("ribbons", 1, 6), pool("lace", 1, 5), pool("wool", 1, 6), pool("fabrics", 1, 7), pool("needle", 1, 4)], [bias("textile", 90), bias("cloth", 80), bias("thread", 70), bias("ribbons", 55), bias("fabrics", 60), bias("wool", 45), bias("lace", 40)], textileForbidden);
  }

  if (containsAny(text, ["baker", "bread", "flour", "oven", "pastry", "bun", "loaf"])) {
    return makePersona("baker", "Baker and grain goods", [pool("bread", 2, 14), pool("loaf", 2, 16), pool("flour", 2, 14), pool("grain", 2, 12), pool("pastry", 1, 8), pool("honey", 1, 5), pool("salt", 1, 7)], [bias("bread", 95), bias("loaf", 80), bias("flour", 80), bias("grain", 60), bias("pastry", 50), bias("honey", 35)], ["weapon", "armor", "ore", "gems", "jewelry", "livestock"]);
  }

  if (containsAny(text, ["butcher", "meat", "sausage", "smoked ham", "steak", "chop", "cookfire meat"])) {
    return makePersona("butcher", "Butcher and preserved meats", [pool("meat", 1, 10), pool("sausage", 1, 8), pool("smoked", 1, 8), pool("spice", 1, 6), pool("salt", 1, 8), pool("knife", 1, 3), pool("leather", 1, 4)], [bias("meat", 95), bias("sausage", 75), bias("smoked", 65), bias("spice", 40), bias("salt", 35)], ["jewelry", "gems", "magic", "book", "royal"]);
  }

  if (containsAny(text, ["fish", "fisher", "fisherman", "net mender", "oyster", "pearl diver", "shellfish", "harbor catch"])) {
    return makePersona("fisher", "Fish and maritime catch", [pool("fish", 2, 14), pool("seafood", 2, 14), pool("shellfish", 1, 8), pool("oyster", 1, 7), pool("barrels", 1, 5), pool("net", 1, 4), pool("hook", 1, 5), pool("salt", 1, 8), pool("maritime", 1, 5)], [bias("fish", 95), bias("seafood", 85), bias("shellfish", 60), bias("barrels", 40), bias("net", 35), bias("maritime", 35)], ["weapon", "armor", "ore", "gems", "royal", "book"]);
  }

  if (containsAny(text, ["pearl", "shell jeweler", "gem", "jewel", "jeweler", "lapidary", "necklace", "ring", "brooch"])) {
    return makePersona("jeweler", "Jewelry and small luxuries", [pool("jewelry", 1, 5), pool("gem", 1, 4), pool("pearls", 1, 4), pool("brooch", 1, 4), pool("ring", 1, 4), pool("necklace", 1, 4), pool("luxury", 1, 4), pool("scale", 1, 2)], [bias("jewelry", 95), bias("gem", 85), bias("pearls", 75), bias("brooch", 60), bias("ring", 55), bias("luxury", 45)], ["meat", "fish", "grain", "produce", "weapon", "armor"]);
  }

  if (containsAny(text, ["alchemist", "apothecary", "potion", "tonic", "remedy", "vial", "elixir", "herbal cure", "healer"])) {
    return makePersona("alchemist", "Alchemy and remedies", [pool("alchemy", 1, 7), pool("ingredient", 1, 8), pool("potion", 1, 6), pool("tonic", 1, 6), pool("remedy", 1, 6), pool("vial", 1, 8), pool("herbs", 1, 8), pool("medicine", 1, 6), pool("container", 1, 4)], [bias("alchemy", 95), bias("ingredient", 80), bias("potion", 70), bias("tonic", 65), bias("remedy", 60), bias("herbs", 55), bias("medicine", 55)], ["weapon", "armor", "livestock", "meat", "fish", "royal"]);
  }

  if (containsAny(text, ["blacksmith", "smith", "forge", "ironmonger", "horseshoe", "nails", "anvil", "blade smith"])) {
    return makePersona("blacksmith", "Forge goods and metalwork", [pool("ore", 1, 8), pool("ingots", 1, 7), pool("iron", 1, 7), pool("coal", 1, 8), pool("tool", 1, 6), pool("metal", 1, 6), pool("nails", 1, 8), pool("horseshoe", 1, 6), pool("weapon", 1, 3)], [bias("ore", 85), bias("ingots", 80), bias("iron", 70), bias("coal", 65), bias("tool", 60), bias("metal", 60)], ["food", "jewelry", "luxury", "magic", "art", "book"]);
  }

  if (containsAny(text, ["miner", "quarry", "ore", "coal", "stone", "gem prospector", "chalk", "crystal miner"])) {
    return makePersona("miner", "Mine and quarry goods", [pool("ore", 1, 10), pool("coal", 1, 10), pool("stone", 1, 8), pool("rocks", 1, 8), pool("crystal", 1, 5), pool("tool", 1, 5), pool("chalk", 1, 6)], [bias("ore", 95), bias("coal", 80), bias("stone", 65), bias("rocks", 65), bias("tool", 40), bias("crystal", 35)], ["food", "finished_good", "textile", "meat", "fish", "book"]);
  }

  if (containsAny(text, ["fletcher", "arrow", "bow", "bowyer", "feather", "quiver", "shaft maker"])) {
    return makePersona("fletcher", "Arrows and bowcraft", [pool("arrows", 2, 12), pool("bows", 1, 5), pool("wood", 1, 8), pool("feather", 1, 8), pool("quiver", 1, 4), pool("tool", 1, 4)], [bias("arrows", 95), bias("bows", 75), bias("wood", 55), bias("feather", 45), bias("quiver", 35)], ["swords", "axes", "maces", "armor", "jewelry", "magic", "food"]);
  }

  if (containsAny(text, ["carpenter", "woodworker", "joiner", "coop", "cooper", "barrel", "crate maker", "wheelwright"])) {
    return makePersona("woodworker", "Woodwork and storage goods", [pool("wood", 1, 10), pool("tool", 1, 6), pool("barrels", 1, 7), pool("crate", 1, 7), pool("storage", 1, 5), pool("furniture", 1, 5), pool("wheel", 1, 4), pool("rope", 1, 5)], [bias("wood", 90), bias("barrels", 70), bias("crate", 65), bias("storage", 55), bias("tool", 50), bias("furniture", 45)], ["jewelry", "gems", "magic", "meat", "fish", "ore"]);
  }

  if (containsAny(text, ["book", "librarian", "scribe", "stationer", "paper", "ink", "ledger", "clerk", "document", "contract", "map seller"])) {
    return makePersona("scribe_books", "Books, ledgers, and documents", [pool("book", 1, 7), pool("ledger", 1, 5), pool("paper", 1, 7), pool("ink", 1, 6), pool("documents", 1, 6), pool("contract", 1, 4), pool("map", 1, 4), pool("wax_seal", 1, 5)], [bias("book", 85), bias("ledger", 70), bias("paper", 65), bias("ink", 60), bias("documents", 60), bias("contract", 45)], ["meat", "fish", "ore", "weapon", "armor", "livestock"]);
  }

  if (containsAny(text, ["banker", "guild official", "notary", "permit", "charter", "share clerk", "coin broker", "money changer"])) {
    return makePersona("guild_finance", "Guild papers and financial goods", [pool("currency", 1, 8), pool("coin", 1, 8), pool("ledger", 1, 5), pool("documents", 1, 6), pool("contract", 1, 5), pool("permit", 1, 4), pool("wax_seal", 1, 5), pool("share", 1, 3)], [bias("currency", 75), bias("ledger", 70), bias("documents", 65), bias("contract", 55), bias("permit", 50), bias("wax_seal", 40)], ["meat", "fish", "ore", "livestock", "weapon"]);
  }

  if (containsAny(text, ["sailor", "ship chandler", "rope", "sail", "harbor", "dock", "navigator", "cartographer", "route scout"])) {
    return makePersona("maritime_travel", "Maritime and travel supplies", [pool("maritime", 1, 7), pool("rope", 1, 7), pool("sail", 1, 5), pool("barrels", 1, 6), pool("map", 1, 4), pool("travel", 1, 6), pool("lantern", 1, 5), pool("food", 1, 6), pool("tool", 1, 5)], [bias("maritime", 85), bias("rope", 70), bias("sail", 60), bias("travel", 55), bias("map", 45), bias("barrels", 40)], ["royal", "jewelry", "magic", "livestock"]);
  }

  if (containsAny(text, ["hunter", "trapper", "tanner", "leather", "hide", "fur", "pelt", "bone charm"])) {
    return makePersona("hunter_leather", "Hunting and leather goods", [pool("meat", 1, 8), pool("leather", 1, 7), pool("hide", 1, 7), pool("fur", 1, 5), pool("pelt", 1, 5), pool("bone", 1, 5), pool("arrows", 1, 6), pool("knife", 1, 3)], [bias("leather", 85), bias("hide", 70), bias("meat", 65), bias("fur", 55), bias("arrows", 45), bias("bone", 40)], ["jewelry", "royal", "magic", "book", "ore"]);
  }

  if (containsAny(text, ["florist", "flower", "seed seller", "herbalist", "garden", "cactus fruit", "forager", "mushroom", "botanical"])) {
    return makePersona("botanical", "Flowers, seeds, and gathered goods", [pool("flower", 1, 8), pool("seeds", 1, 8), pool("herbs", 1, 8), pool("botanical", 1, 8), pool("mushrooms", 1, 6), pool("fruit", 1, 8), pool("basket", 1, 4)], [bias("flower", 90), bias("seeds", 75), bias("herbs", 70), bias("botanical", 65), bias("fruit", 45), bias("mushrooms", 40)], noJewelsOrWeapons);
  }

  if (containsAny(text, ["farmer", "orchard", "vegetable", "grain", "seed", "apple", "cider", "field", "harvest"])) {
    return makePersona("farmer", "Farm and orchard goods", [pool("produce", 2, 14), pool("grain", 2, 14), pool("seeds", 1, 10), pool("apple", 2, 14), pool("cider", 1, 7), pool("vegetable", 2, 12), pool("herbs", 1, 7), pool("tool", 1, 4)], [bias("produce", 90), bias("grain", 70), bias("seeds", 60), bias("apple", 60), bias("cider", 50), bias("vegetable", 55)], noJewelsOrWeapons);
  }

  if (containsAny(text, ["artist", "painter", "sculptor", "mask maker", "toy maker", "miniature", "brush", "paint", "statue", "canvas"])) {
    return makePersona("artisan_art", "Artisan and crafted goods", [pool("art", 1, 6), pool("painting", 1, 4), pool("brush", 1, 5), pool("pigments", 1, 5), pool("statue", 1, 4), pool("mask", 1, 4), pool("toy", 1, 5), pool("wood", 1, 4)], [bias("art", 85), bias("painting", 65), bias("brush", 60), bias("pigments", 55), bias("statue", 45), bias("toy", 40)], ["meat", "fish", "ore", "weapon", "armor", "livestock"]);
  }

  if (containsAny(text, ["perfume", "scent", "soap", "candle", "wax", "wick", "bath", "cosmetic"])) {
    return makePersona("household_luxury", "Scents, candles, and small household luxuries", [pool("perfume", 1, 5), pool("scent", 1, 5), pool("soap", 1, 6), pool("candle", 1, 8), pool("wax", 1, 7), pool("wick", 1, 7), pool("household", 1, 5), pool("luxury", 1, 4)], [bias("perfume", 80), bias("candle", 75), bias("wax", 65), bias("wick", 55), bias("soap", 50), bias("household", 45)], ["weapon", "armor", "ore", "meat", "fish", "livestock"]);
  }

  if (containsAny(text, ["bard", "musician", "song", "instrument", "card player", "game", "dice", "tavern performer"])) {
    return makePersona("performance_games", "Music, games, and performance goods", [pool("music", 1, 5), pool("instrument", 1, 4), pool("game", 1, 6), pool("cards", 1, 6), pool("dice", 1, 5), pool("book", 1, 3), pool("travel", 1, 4)], [bias("music", 80), bias("game", 70), bias("cards", 60), bias("instrument", 55), bias("dice", 45)], noHeavyTrade);
  }

  if (containsAny(text, ["priest", "nun", "monk", "shrine", "candle", "relic", "religious", "temple", "blessing"])) {
    return makePersona("religious_goods", "Religious goods", [pool("religion", 1, 6), pool("candle", 1, 8), pool("book", 1, 5), pool("relic", 1, 3), pool("herbs", 1, 5), pool("cloth", 1, 4)], [bias("religion", 85), bias("candle", 70), bias("book", 55), bias("relic", 45), bias("herbs", 35)], ["contraband", "weapon", "ore", "meat", "fish"]);
  }

  if (containsAny(text, ["thief", "fence", "smuggler", "contraband", "black-market", "black market", "forged", "hidden wares"])) {
    return makePersona("black_market", "Discreet market goods", [pool("contraband", 1, 6), pool("jewelry", 1, 4), pool("small_luxury", 1, 4), pool("documents", 1, 4), pool("lockpick", 1, 4), pool("salvage", 1, 5)], [bias("contraband", 95), bias("jewelry", 55), bias("small_luxury", 50), bias("documents", 35), bias("salvage", 35)], ["religion", "livestock", "grain", "bulky"]);
  }

  if (containsAny(text, ["noble", "countess", "duke", "lady", "lord", "court", "luxury", "silk court", "collector"])) {
    return makePersona("court_luxury", "Court and luxury goods", [pool("luxury", 1, 6), pool("royal", 1, 4), pool("jewelry", 1, 4), pool("perfume", 1, 4), pool("art", 1, 4), pool("silk", 1, 4), pool("documents", 1, 3)], [bias("luxury", 85), bias("royal", 65), bias("jewelry", 55), bias("perfume", 45), bias("art", 40), bias("silk", 35)], ["meat", "fish", "ore", "grain", "livestock"]);
  }

  return EMPTY_PERSONA;
}
