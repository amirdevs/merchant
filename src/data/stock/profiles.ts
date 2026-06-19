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
  alchemist: { tier: "standard", archetypes: [{ id: "alchemist", weight: 0.75 }, { id: "magic", weight: 0.25 }] },
  baker: { tier: "modest", archetypes: [{ id: "baker", weight: 0.85 }, { id: "food", weight: 0.15 }] },
  bard: { tier: "light", archetypes: [{ id: "traveler", weight: 0.6 }, { id: "art", weight: 0.4 }] },
  barkeep: { tier: "modest", archetypes: [{ id: "food", weight: 0.8 }, { id: "general", weight: 0.2 }] },
  beggar: { tier: "pocket", archetypes: [{ id: "salvage", weight: 0.7 }, { id: "food", weight: 0.3 }], restockDays: 4 },
  blacksmith: { tier: "standard", archetypes: [{ id: "blacksmith", weight: 0.6 }, { id: "weapons", weight: 0.2 }, { id: "armor", weight: 0.2 }] },
  butcher: { tier: "modest", archetypes: [{ id: "food", weight: 0.8 }, { id: "livestock", weight: 0.2 }] },
  cook: { tier: "modest", archetypes: [{ id: "food", weight: 0.85 }, { id: "tools", weight: 0.15 }] },
  farmer: { tier: "modest", archetypes: [{ id: "food", weight: 0.65 }, { id: "livestock", weight: 0.2 }, { id: "tools", weight: 0.15 }] },
  fighter: { tier: "light", archetypes: [{ id: "weapons", weight: 0.55 }, { id: "armor", weight: 0.3 }, { id: "traveler", weight: 0.15 }] },
  fisher: { tier: "modest", archetypes: [{ id: "fisher", weight: 0.8 }, { id: "maritime", weight: 0.2 }] },
  fletcher: { tier: "standard", archetypes: [{ id: "weapons", weight: 0.75 }, { id: "tools", weight: 0.25 }] },
  hunter: { tier: "light", archetypes: [{ id: "salvage", weight: 0.45 }, { id: "weapons", weight: 0.25 }, { id: "food", weight: 0.2 }, { id: "traveler", weight: 0.1 }] },
  knight: { tier: "light", archetypes: [{ id: "armor", weight: 0.5 }, { id: "weapons", weight: 0.35 }, { id: "royal", weight: 0.15 }] },
  magic: { tier: "standard", archetypes: [{ id: "magic", weight: 0.8 }, { id: "books", weight: 0.2 }] },
  merchant: { tier: "large", archetypes: [{ id: "general", weight: 0.65 }, { id: "luxury", weight: 0.2 }, { id: "traveler", weight: 0.15 }] },
  miner: { tier: "modest", archetypes: [{ id: "blacksmith", weight: 0.55 }, { id: "tools", weight: 0.3 }, { id: "salvage", weight: 0.15 }] },
  noble: { tier: "light", archetypes: [{ id: "royal", weight: 0.65 }, { id: "luxury", weight: 0.35 }] },
  quartermaster: { tier: "wholesale", archetypes: [{ id: "general", weight: 0.45 }, { id: "tools", weight: 0.25 }, { id: "traveler", weight: 0.2 }, { id: "weapons", weight: 0.1 }] },
  religious: { tier: "light", archetypes: [{ id: "religious", weight: 0.8 }, { id: "books", weight: 0.2 }] },
  sailor: { tier: "modest", archetypes: [{ id: "maritime", weight: 0.65 }, { id: "traveler", weight: 0.25 }, { id: "food", weight: 0.1 }] },
  seamstress: { tier: "standard", archetypes: [{ id: "fabrics", weight: 0.85 }, { id: "luxury", weight: 0.15 }] },
  soldier: { tier: "sparse", archetypes: [{ id: "weapons", weight: 0.45 }, { id: "armor", weight: 0.35 }, { id: "traveler", weight: 0.2 }] },
  thief: { tier: "light", archetypes: [{ id: "contraband", weight: 0.6 }, { id: "salvage", weight: 0.25 }, { id: "jewelry", weight: 0.15 }], restockMode: "on-arrival" },
  toolmaker: { tier: "standard", archetypes: [{ id: "tools", weight: 0.8 }, { id: "blacksmith", weight: 0.2 }] },
};

export const characterStockOverrides: Record<string, StockProfileOverride> = {
  "Faraday Casey": { tier: "grand", archetypes: [{ id: "books", weight: 0.35 }, { id: "luxury", weight: 0.35 }, { id: "general", weight: 0.3 }] },
  Incantato: { tier: "grand", archetypes: [{ id: "magic", weight: 0.75 }, { id: "luxury", weight: 0.25 }] },
  "Nevin Quinn": { tier: "large", archetypes: [{ id: "books", weight: 0.8 }, { id: "art", weight: 0.2 }] },
  Saida: { tier: "large", archetypes: [{ id: "fabrics", weight: 0.8 }, { id: "luxury", weight: 0.2 }] },
};
