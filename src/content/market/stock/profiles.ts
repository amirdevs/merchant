import type { LifestyleStockBaseline, StockProfile, StockProfileOverride } from "./types";

// Kept for older notes/scripts, but the runtime now uses lifestyle baselines below.
export const universalStockBaseline = {
  archetypeWeight: 0,
  guaranteedTags: [],
};

export const lifestyleStockBaselines: Record<string, LifestyleStockBaseline> = {
  poor: {
    archetypes: [{ id: "salvage", weight: 0.22 }, { id: "food", weight: 0.08 }],
    guaranteedTags: ["food"],
  },
  worker: {
    archetypes: [{ id: "food", weight: 0.08 }, { id: "tools", weight: 0.08 }, { id: "general", weight: 0.06 }],
    guaranteedTags: ["food"],
  },
  shopkeeper: {
    archetypes: [{ id: "general", weight: 0.14 }, { id: "food", weight: 0.06 }, { id: "tools", weight: 0.04 }],
    guaranteedTags: ["container"],
  },
  traveler: {
    archetypes: [{ id: "traveler", weight: 0.16 }, { id: "food", weight: 0.08 }],
    guaranteedTags: ["food", "travel"],
  },
  noble: {
    archetypes: [{ id: "royal", weight: 0.14 }, { id: "luxury", weight: 0.08 }],
    guaranteedTags: ["currency"],
  },
  military: {
    archetypes: [{ id: "soldier", weight: 0.12 }, { id: "traveler", weight: 0.05 }, { id: "food", weight: 0.05 }],
    guaranteedTags: ["food"],
  },
  criminal: {
    archetypes: [{ id: "contraband", weight: 0.14 }, { id: "salvage", weight: 0.1 }],
    guaranteedTags: ["currency"],
  },
  religious: {
    archetypes: [{ id: "religious", weight: 0.12 }, { id: "books", weight: 0.06 }, { id: "food", weight: 0.04 }],
    guaranteedTags: ["religion"],
  },
};

export const fallbackStockProfile: StockProfile = {
  tier: "light",
  archetypes: [{ id: "general", weight: 1 }],
  lifestyleBaseline: "worker",
};

export const merchantFallbackProfile: StockProfile = {
  tier: "stocked",
  archetypes: [{ id: "general", weight: 1 }],
  lifestyleBaseline: "shopkeeper",
  coinMultiplier: 1.15,
};

export const professionStockProfiles: Record<string, StockProfile> = {
  alchemist: {
    tier: "standard",
    archetypes: [{ id: "alchemist", weight: 0.82 }, { id: "magic", weight: 0.1 }, { id: "books", weight: 0.08 }],
    lifestyleBaseline: "shopkeeper",
    guaranteedTags: ["alchemy", "ingredient", "container"],
    forbiddenTags: ["weapon", "armor", "livestock"],
  },
  baker: {
    tier: "modest",
    archetypes: [{ id: "baker", weight: 0.9 }, { id: "food", weight: 0.1 }],
    lifestyleBaseline: "shopkeeper",
    quantityMultiplier: 1.15,
    coinMultiplier: 1.05,
    guaranteedTags: ["bread", "grain"],
  },
  bard: {
    tier: "light",
    archetypes: [{ id: "bard", weight: 0.82 }, { id: "traveler", weight: 0.17 }, { id: "art", weight: 0.01 }],
    lifestyleBaseline: "traveler",
    guaranteedTags: ["music", "game", "book"],
    forbiddenTags: ["ore", "ingots", "armor", "magic", "jewelry", "royal", "contraband", "monster_parts"],
  },
  barkeep: {
    tier: "standard",
    archetypes: [{ id: "barkeep", weight: 0.88 }, { id: "food", weight: 0.12 }],
    lifestyleBaseline: "shopkeeper",
    quantityMultiplier: 1.15,
    coinMultiplier: 1.35,
    guaranteedTags: ["drink", "food", "barrels", "household"],
    forbiddenTags: ["weapon", "armor", "ore", "ingots"],
  },
  beggar: {
    tier: "pocket",
    archetypes: [{ id: "salvage", weight: 0.78 }, { id: "food", weight: 0.22 }],
    lifestyleBaseline: "poor",
    restockDays: 4,
    stackModifier: -1,
    coinMultiplier: 0.45,
    guaranteedTags: ["food"],
    forbiddenTags: ["luxury", "royal", "jewelry", "weapon", "armor"],
  },
  blacksmith: {
    tier: "standard",
    archetypes: [{ id: "blacksmith", weight: 0.94 }, { id: "tools", weight: 0.04 }, { id: "weapons", weight: 0.0125 }, { id: "armor", weight: 0.0075 }],
    lifestyleBaseline: "worker",
    quantityMultiplier: 1.22,
    coinMultiplier: 1.15,
    guaranteedTags: ["ore", "ingots", "coal", "tool"],
    forbiddenTags: ["luxury", "jewelry", "art", "magic", "food", "animal_goods", "statues", "book"],
  },
  butcher: {
    tier: "modest",
    archetypes: [{ id: "butcher", weight: 0.9 }, { id: "food", weight: 0.1 }],
    lifestyleBaseline: "shopkeeper",
    quantityMultiplier: 1.25,
    coinMultiplier: 1.1,
    guaranteedTags: ["meat", "spice", "tool"],
    forbiddenTags: ["fruit", "desserts", "weapon", "armor", "luxury"],
  },
  cook: {
    tier: "modest",
    archetypes: [{ id: "cook", weight: 0.86 }, { id: "food", weight: 0.14 }],
    lifestyleBaseline: "shopkeeper",
    quantityMultiplier: 1.15,
    guaranteedTags: ["food", "spice", "household"],
    forbiddenTags: ["weapon", "armor", "ore"],
  },
  farmer: {
    tier: "standard",
    archetypes: [{ id: "farmer", weight: 0.86 }, { id: "livestock", weight: 0.14 }],
    lifestyleBaseline: "worker",
    quantityMultiplier: 1.35,
    coinMultiplier: 0.95,
    guaranteedTags: ["produce", "grain", "seeds", "tool"],
    forbiddenTags: ["weapon", "armor", "luxury", "magic"],
  },
  fighter: {
    tier: "light",
    archetypes: [{ id: "weapons", weight: 0.44 }, { id: "armor", weight: 0.3 }, { id: "traveler", weight: 0.26 }],
    lifestyleBaseline: "military",
    stackModifier: -1,
  },
  fisher: {
    tier: "modest",
    archetypes: [{ id: "fisher", weight: 0.84 }, { id: "maritime", weight: 0.16 }],
    lifestyleBaseline: "worker",
    quantityMultiplier: 1.22,
    guaranteedTags: ["seafood", "barrels", "tool"],
    forbiddenTags: ["weapon", "armor", "luxury"],
  },
  fletcher: {
    tier: "standard",
    archetypes: [{ id: "fletcher", weight: 0.96 }, { id: "tools", weight: 0.04 }],
    lifestyleBaseline: "worker",
    quantityMultiplier: 1.2,
    coinMultiplier: 1.1,
    guaranteedTags: ["arrows", "bows", "wood", "tool"],
    forbiddenTags: ["swords", "axes", "maces", "flails", "armor", "luxury", "magic", "clothes", "book", "art", "jewelry"],
  },
  hunter: {
    tier: "light",
    archetypes: [{ id: "hunter", weight: 0.78 }, { id: "traveler", weight: 0.14 }, { id: "salvage", weight: 0.08 }],
    lifestyleBaseline: "traveler",
    quantityMultiplier: 1.1,
    guaranteedTags: ["arrows", "bows", "meat"],
  },
  knight: {
    tier: "light",
    archetypes: [{ id: "knight", weight: 0.78 }, { id: "royal", weight: 0.22 }],
    lifestyleBaseline: "military",
    stackModifier: -2,
    coinMultiplier: 1.2,
  },
  magic: {
    tier: "standard",
    archetypes: [{ id: "magic", weight: 0.8 }, { id: "books", weight: 0.2 }],
    lifestyleBaseline: "shopkeeper",
    guaranteedTags: ["magic", "book"],
  },
  merchant: {
    tier: "large",
    archetypes: [{ id: "general", weight: 0.62 }, { id: "luxury", weight: 0.2 }, { id: "traveler", weight: 0.18 }],
    lifestyleBaseline: "shopkeeper",
    coinMultiplier: 1.35,
  },
  miner: {
    tier: "modest",
    archetypes: [{ id: "miner", weight: 0.88 }, { id: "tools", weight: 0.12 }],
    lifestyleBaseline: "worker",
    quantityMultiplier: 1.35,
    coinMultiplier: 0.95,
    guaranteedTags: ["ore", "coal", "rocks", "tool"],
    forbiddenTags: ["weapon", "armor", "finished_good", "luxury", "magic", "food"],
  },
  noble: {
    tier: "light",
    archetypes: [{ id: "royal", weight: 0.62 }, { id: "luxury", weight: 0.38 }],
    lifestyleBaseline: "noble",
    stackModifier: -2,
    coinMultiplier: 1.45,
    guaranteedTags: ["currency"],
  },
  quartermaster: {
    tier: "wholesale",
    archetypes: [{ id: "quartermaster", weight: 0.84 }, { id: "tools", weight: 0.08 }, { id: "traveler", weight: 0.08 }],
    lifestyleBaseline: "military",
    quantityMultiplier: 1.25,
    coinMultiplier: 1.25,
    guaranteedTags: ["food", "grain", "textile", "weapon", "armor", "container"],
  },
  religious: {
    tier: "light",
    archetypes: [{ id: "religious", weight: 0.78 }, { id: "books", weight: 0.22 }],
    lifestyleBaseline: "religious",
    guaranteedTags: ["religion", "book"],
  },
  sailor: {
    tier: "modest",
    archetypes: [{ id: "maritime", weight: 0.74 }, { id: "fisher", weight: 0.16 }, { id: "traveler", weight: 0.1 }],
    lifestyleBaseline: "traveler",
    guaranteedTags: ["maritime", "seafood", "barrels"],
  },
  seamstress: {
    tier: "standard",
    archetypes: [{ id: "seamstress", weight: 0.88 }, { id: "fabrics", weight: 0.08 }, { id: "luxury", weight: 0.04 }],
    lifestyleBaseline: "shopkeeper",
    quantityMultiplier: 1.18,
    guaranteedTags: ["textile", "thread", "tool"],
    forbiddenTags: ["weapon", "armor", "ore"],
  },
  soldier: {
    tier: "sparse",
    archetypes: [{ id: "soldier", weight: 0.84 }, { id: "traveler", weight: 0.16 }],
    lifestyleBaseline: "military",
    stackModifier: -1,
    guaranteedTags: ["weapon", "armor", "food"],
  },
  thief: {
    tier: "light",
    archetypes: [{ id: "contraband", weight: 0.64 }, { id: "salvage", weight: 0.24 }, { id: "jewelry", weight: 0.12 }],
    lifestyleBaseline: "criminal",
    restockMode: "on-arrival",
    guaranteedTags: ["contraband"],
    forbiddenTags: ["religion", "royal"],
  },
  toolmaker: {
    tier: "standard",
    archetypes: [{ id: "toolmaker", weight: 0.9 }, { id: "blacksmith", weight: 0.1 }],
    lifestyleBaseline: "worker",
    quantityMultiplier: 1.2,
    coinMultiplier: 1.1,
    guaranteedTags: ["tool", "metal", "wood"],
    forbiddenTags: ["weapon", "armor", "luxury", "magic"],
  },
};

export const characterStockOverridesById: Record<string, StockProfileOverride> = {
  "character-056": { tier: "grand", archetypes: [{ id: "books", weight: 0.4 }, { id: "luxury", weight: 0.35 }, { id: "general", weight: 0.25 }], lifestyleBaseline: "noble", coinMultiplier: 1.35 },
  "character-064": { tier: "grand", archetypes: [{ id: "magic", weight: 0.78 }, { id: "luxury", weight: 0.22 }], lifestyleBaseline: "shopkeeper", coinMultiplier: 1.25 },
  "character-052": { tier: "large", archetypes: [{ id: "books", weight: 0.82 }, { id: "art", weight: 0.18 }], lifestyleBaseline: "shopkeeper" },
  "character-076": { tier: "large", archetypes: [{ id: "fabrics", weight: 0.84 }, { id: "luxury", weight: 0.16 }], lifestyleBaseline: "shopkeeper" },
};
