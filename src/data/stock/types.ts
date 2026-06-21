export type StockTierId =
  | "empty"
  | "pocket"
  | "sparse"
  | "light"
  | "modest"
  | "standard"
  | "stocked"
  | "large"
  | "wholesale"
  | "grand";

export type StockArchetypeId =
  | "general"
  | "food"
  | "baker"
  | "barkeep"
  | "butcher"
  | "cook"
  | "farmer"
  | "fisher"
  | "fletcher"
  | "livestock"
  | "blacksmith"
  | "miner"
  | "weapons"
  | "armor"
  | "fabrics"
  | "seamstress"
  | "leather"
  | "carpenter"
  | "tools"
  | "toolmaker"
  | "alchemist"
  | "healer"
  | "magic"
  | "books"
  | "art"
  | "bard"
  | "jewelry"
  | "luxury"
  | "maritime"
  | "contraband"
  | "religious"
  | "royal"
  | "knight"
  | "soldier"
  | "quartermaster"
  | "traveler"
  | "hunter"
  | "salvage"
  | "bias";

export type LifestyleStockBaselineId =
  | "poor"
  | "worker"
  | "shopkeeper"
  | "traveler"
  | "noble"
  | "military"
  | "criminal"
  | "religious";

export type StockRestockMode = "daily" | "interval" | "weekly" | "on-arrival" | "never";

export type StockTier = {
  minStacks: number;
  maxStacks: number;
  quantityMultiplier: number;
  coinMultiplier: number;
  rareItemChance: number;
  restockMode: StockRestockMode;
  restockDays: number;
  restockRate: number;
  progressionScaling: number;
};

export type StockArchetype = {
  weightedTags: Record<string, number>;
  quantityMultipliers?: Record<string, number>;
  minimumQuantities?: Record<string, number>;
  forbiddenTags?: string[];
  minValue?: number;
  maxValue?: number;
  localityBias?: number;
  rarityBias?: number;
  guaranteedTags?: string[];
};

export type WeightedArchetype = {
  id: StockArchetypeId;
  weight?: number;
};

export type LifestyleStockBaseline = {
  archetypes: WeightedArchetype[];
  guaranteedTags?: string[];
};

export type StockProfile = {
  tier: StockTierId;
  archetypes: WeightedArchetype[];
  lifestyleBaseline?: LifestyleStockBaselineId;
  stackModifier?: number;
  quantityMultiplier?: number;
  coinMultiplier?: number;
  minValue?: number;
  maxValue?: number;
  forbiddenTags?: string[];
  guaranteedTags?: string[];
  restockMode?: StockRestockMode;
  restockDays?: number;
  restockRate?: number;
  progressionScaling?: number;
  stockSeed?: number;
};

export type StockProfileOverride = Partial<Omit<StockProfile, "archetypes">> & {
  archetypes?: WeightedArchetype[];
};
