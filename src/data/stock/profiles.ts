import type { StockProfile, StockProfileOverride } from "./types";

export const universalStockBaseline = {
  archetypeWeight: 0.2,
  guaranteedTags: ["supplies", "food"],
};

export const fallbackStockProfile: StockProfile = {
  tier: "light",
  archetypes: [{ id: "general", weight: 1 }],
};

export const merchantFallbackProfile: StockProfile = {
  tier: "stocked",
  archetypes: [{ id: "general", weight: 1 }],
};

export const professionStockProfiles: Record<string, StockProfile> = {
  alchemist: { tier: "standard", archetypes: [{ id: "alchemist", weight: 0.8 }, { id: "magic", weight: 0.15 }, { id: "books", weight: 0.05 }], guaranteedTags: ["alchemy", "ingredient", "container"] },
  baker: { tier: "modest", archetypes: [{ id: "baker", weight: 0.85 }, { id: "food", weight: 0.15 }] },
  bard: { tier: "light", archetypes: [{ id: "bard", weight: 0.8 }, { id: "traveler", weight: 0.2 }], guaranteedTags: ["music", "game", "book"] },
  barkeep: { tier: "standard", archetypes: [{ id: "barkeep", weight: 0.85 }, { id: "food", weight: 0.15 }], coinMultiplier: 1.2, guaranteedTags: ["drink", "food", "barrels"] },
  beggar: { tier: "pocket", archetypes: [{ id: "salvage", weight: 0.7 }, { id: "food", weight: 0.3 }], restockDays: 4 },
  blacksmith: { tier: "standard", archetypes: [{ id: "blacksmith", weight: 0.8 }, { id: "tools", weight: 0.1 }, { id: "weapons", weight: 0.06 }, { id: "armor", weight: 0.04 }], guaranteedTags: ["ore", "ingots", "coal", "tool"] },
  butcher: { tier: "modest", archetypes: [{ id: "butcher", weight: 0.9 }, { id: "food", weight: 0.1 }], quantityMultiplier: 1.15, guaranteedTags: ["meat", "spice"] },
  cook: { tier: "modest", archetypes: [{ id: "cook", weight: 0.85 }, { id: "food", weight: 0.15 }], guaranteedTags: ["food", "spice"] },
  farmer: { tier: "standard", archetypes: [{ id: "farmer", weight: 0.85 }, { id: "livestock", weight: 0.15 }], quantityMultiplier: 1.25, guaranteedTags: ["produce", "grain", "seeds"] },
  fighter: { tier: "light", archetypes: [{ id: "weapons", weight: 0.55 }, { id: "armor", weight: 0.3 }, { id: "traveler", weight: 0.15 }] },
  fisher: { tier: "modest", archetypes: [{ id: "fisher", weight: 0.8 }, { id: "maritime", weight: 0.2 }] },
  fletcher: { tier: "standard", archetypes: [{ id: "fletcher", weight: 0.85 }, { id: "tools", weight: 0.15 }], guaranteedTags: ["arrows", "bows", "wood"] },
  hunter: { tier: "light", archetypes: [{ id: "hunter", weight: 0.75 }, { id: "traveler", weight: 0.15 }, { id: "salvage", weight: 0.1 }], guaranteedTags: ["arrows", "bows", "meat"] },
  knight: { tier: "light", archetypes: [{ id: "knight", weight: 0.8 }, { id: "royal", weight: 0.2 }], stackModifier: -2 },
  magic: { tier: "standard", archetypes: [{ id: "magic", weight: 0.8 }, { id: "books", weight: 0.2 }] },
  merchant: { tier: "large", archetypes: [{ id: "general", weight: 0.65 }, { id: "luxury", weight: 0.2 }, { id: "traveler", weight: 0.15 }] },
  miner: { tier: "modest", archetypes: [{ id: "miner", weight: 0.85 }, { id: "tools", weight: 0.15 }], quantityMultiplier: 1.25, guaranteedTags: ["ore", "coal", "rocks"] },
  noble: { tier: "light", archetypes: [{ id: "royal", weight: 0.65 }, { id: "luxury", weight: 0.35 }], stackModifier: -2 },
  quartermaster: { tier: "wholesale", archetypes: [{ id: "quartermaster", weight: 0.8 }, { id: "tools", weight: 0.1 }, { id: "traveler", weight: 0.1 }], guaranteedTags: ["food", "grain", "textile", "weapon", "armor", "container"] },
  religious: { tier: "light", archetypes: [{ id: "religious", weight: 0.8 }, { id: "books", weight: 0.2 }] },
  sailor: { tier: "modest", archetypes: [{ id: "maritime", weight: 0.75 }, { id: "fisher", weight: 0.15 }, { id: "traveler", weight: 0.1 }], guaranteedTags: ["maritime", "seafood", "barrels"] },
  seamstress: { tier: "standard", archetypes: [{ id: "seamstress", weight: 0.9 }, { id: "luxury", weight: 0.1 }], guaranteedTags: ["textile", "thread", "tool"] },
  soldier: { tier: "sparse", archetypes: [{ id: "soldier", weight: 0.85 }, { id: "traveler", weight: 0.15 }], stackModifier: -1 },
  thief: { tier: "light", archetypes: [{ id: "contraband", weight: 0.6 }, { id: "salvage", weight: 0.25 }, { id: "jewelry", weight: 0.15 }], restockMode: "on-arrival" },
  toolmaker: { tier: "standard", archetypes: [{ id: "toolmaker", weight: 0.85 }, { id: "blacksmith", weight: 0.15 }], guaranteedTags: ["tool", "metal", "wood"] },
};

export const characterStockOverrides: Record<string, StockProfileOverride> = {
  "Faraday Casey": { tier: "grand", archetypes: [{ id: "books", weight: 0.35 }, { id: "luxury", weight: 0.35 }, { id: "general", weight: 0.3 }] },
  Incantato: { tier: "grand", archetypes: [{ id: "magic", weight: 0.75 }, { id: "luxury", weight: 0.25 }] },
  "Nevin Quinn": { tier: "large", archetypes: [{ id: "books", weight: 0.8 }, { id: "art", weight: 0.2 }] },
  Saida: { tier: "large", archetypes: [{ id: "fabrics", weight: 0.8 }, { id: "luxury", weight: 0.2 }] },
};
