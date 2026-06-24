import { characterIdentityCatalogBatches } from "@/content/characters/profiles";
import { buildRuntimeCharacters } from "@/content/characters/runtime";
import kingdomsJson from "@/content/world/kingdoms.json";
import marketplacesJson from "@/content/market/marketplaces.json";
import professionsJson from "@/content/market/professions.json";
import type { Bias, Character, Kingdom, Marketplace, Profession } from "@/shared/types/game-data";
import { characterStockOverridesById, fallbackStockProfile, lifestyleStockBaselines, merchantFallbackProfile, professionStockProfiles } from "@/content/market/stock/profiles";
import { stockTiers } from "@/content/market/stock/tiers";
import type { LifestyleStockBaselineId, StockBiasWeights, StockProfile, StockProfileOverride, StockTierId } from "@/content/market/stock/types";
import { normalizeItemToken } from "@/game/trade/item-catalog";

const tierOrder: StockTierId[] = ["empty", "pocket", "sparse", "light", "modest", "standard", "stocked", "large", "wholesale", "grand"];
const professions = professionsJson as Record<string, Profession>;
const marketplaces = marketplacesJson as Marketplace[];
const kingdoms = kingdomsJson as Kingdom[];
const runtimeIdentityProfiles = characterIdentityCatalogBatches.flatMap((batch) => batch.identities);
const baseCharacters = buildRuntimeCharacters({ identities: runtimeIdentityProfiles });

const BIAS_SOURCE_MULTIPLIERS = {
  character: 0.85,
  profession: 0.6,
  marketplace: 0.35,
  kingdom: 0.25,
};
const BIAS_WEIGHT_PER_PERCENT = 0.055;
const MIN_BIAS_WEIGHT = -5;
const MAX_BIAS_WEIGHT = 6;

function mergeProfile(base: StockProfile, override?: StockProfileOverride): StockProfile {
  if (!override) return { ...base, archetypes: base.archetypes.map((entry) => ({ ...entry })) };
  return {
    ...base,
    ...override,
    archetypes: (override.archetypes || base.archetypes).map((entry) => ({ ...entry })),
    forbiddenTags: [...(base.forbiddenTags || []), ...(override.forbiddenTags || [])],
    guaranteedTags: [...(base.guaranteedTags || []), ...(override.guaranteedTags || [])],
  };
}

function atLeastTier(current: StockTierId, minimum: StockTierId) {
  return tierOrder.indexOf(current) >= tierOrder.indexOf(minimum) ? current : minimum;
}

function inferLifestyleBaseline(character: Character, profile: StockProfile): LifestyleStockBaselineId {
  if (profile.lifestyleBaseline) return profile.lifestyleBaseline;
  const slug = character.professionSlug || "";
  if (slug === "beggar") return "poor";
  if (slug === "thief") return "criminal";
  if (slug === "noble") return "noble";
  if (["fighter", "knight", "quartermaster", "soldier"].includes(slug)) return "military";
  if (slug === "religious") return "religious";
  if (["bard", "hunter", "sailor"].includes(slug)) return "traveler";
  if (character.isMerchant) return "shopkeeper";
  return "worker";
}

function applyLifestyleBaseline(character: Character, profile: StockProfile): StockProfile {
  const baseline = lifestyleStockBaselines[inferLifestyleBaseline(character, profile)];
  if (!baseline) return profile;

  const archetypes = profile.archetypes.map((entry) => ({ ...entry }));
  const existing = new Set(archetypes.map((entry) => entry.id));
  for (const entry of baseline.archetypes) {
    if (existing.has(entry.id)) continue;
    archetypes.push({ ...entry });
  }

  return {
    ...profile,
    archetypes,
    guaranteedTags: [...new Set([...(profile.guaranteedTags || []), ...(baseline.guaranteedTags || [])])],
  };
}

function addBiasWeights(weights: Record<string, number>, biases: Bias[] | undefined, multiplier: number) {
  for (const bias of biases || []) {
    const tag = normalizeItemToken(bias.tag || "");
    if (!tag) continue;
    const weighted = Math.max(MIN_BIAS_WEIGHT, Math.min(MAX_BIAS_WEIGHT, bias.percent * BIAS_WEIGHT_PER_PERCENT * multiplier));
    if (Math.abs(weighted) < 0.05) continue;
    weights[tag] = (weights[tag] || 0) + weighted;
  }
}

function isContrabandStocker(character: Character, profile: StockProfile) {
  const baseline = inferLifestyleBaseline(character, profile);
  return baseline === "criminal" || character.isPlunderer || character.professionSlug === "thief" || profile.archetypes.some((entry) => entry.id === "contraband");
}

function collectGeneratedBiasWeights(character: Character, profile: StockProfile): StockBiasWeights {
  const weights: Record<string, number> = {};
  const profession = character.professionSlug ? professions[character.professionSlug] : undefined;
  const marketplace = marketplaces[character.marketplaceIndex];
  const kingdom = marketplace ? kingdoms[marketplace.kingdomIndex] : undefined;

  addBiasWeights(weights, character.bias, BIAS_SOURCE_MULTIPLIERS.character);
  addBiasWeights(weights, profession?.bias, BIAS_SOURCE_MULTIPLIERS.profession);
  addBiasWeights(weights, marketplace?.bias, BIAS_SOURCE_MULTIPLIERS.marketplace);
  addBiasWeights(weights, kingdom?.bias, BIAS_SOURCE_MULTIPLIERS.kingdom);

  const illegalWeight = isContrabandStocker(character, profile) ? 6 : -10;
  for (const tag of kingdom?.illegalItemTags || []) {
    const normalized = normalizeItemToken(tag);
    if (!normalized) continue;
    weights[normalized] = (weights[normalized] || 0) + illegalWeight;
  }

  return Object.fromEntries(Object.entries(weights).filter(([, weight]) => Math.abs(weight) >= 0.05));
}

function applyGeneratedBiasWeights(character: Character, profile: StockProfile): StockProfile {
  const stockBiasWeights = collectGeneratedBiasWeights(character, profile);
  if (!Object.keys(stockBiasWeights).length) return profile;
  return { ...profile, stockBiasWeights };
}

export function resolveStockProfile(character: Character): StockProfile {
  const profession = character.professionSlug ? professionStockProfiles[character.professionSlug] : undefined;
  let profile = profession ? mergeProfile(profession) : mergeProfile(character.isMerchant ? merchantFallbackProfile : fallbackStockProfile);

  // `isMerchant` is only a commercial-capacity default. It does not choose item types.
  if (character.isMerchant) profile = { ...profile, tier: atLeastTier(profile.tier, "stocked") };

  profile = mergeProfile(profile, character.characterId ? characterStockOverridesById[character.characterId] : undefined);
  profile = applyLifestyleBaseline(character, profile);
  return applyGeneratedBiasWeights(character, profile);
}

export function resolvedStockSettings(character: Character, day: number) {
  const profile = resolveStockProfile(character);
  const tier = stockTiers[profile.tier];
  const progression = Math.max(0, day - 1) * (profile.progressionScaling ?? tier.progressionScaling);
  return {
    profile,
    tier,
    minStacks: Math.max(0, tier.minStacks + (profile.stackModifier || 0)),
    maxStacks: Math.max(0, tier.maxStacks + (profile.stackModifier || 0)),
    quantityMultiplier: tier.quantityMultiplier * (profile.quantityMultiplier || 1) * (1 + progression),
    coinMultiplier: tier.coinMultiplier * (profile.coinMultiplier || 1) * (1 + progression),
    restockMode: profile.restockMode || tier.restockMode,
    restockDays: profile.restockDays ?? tier.restockDays,
    restockRate: profile.restockRate ?? tier.restockRate,
  };
}

export function debugStockBiasWeights(characterIndex: number) {
  const character = baseCharacters[characterIndex];
  if (!character) return {};
  const profession = character.professionSlug ? professionStockProfiles[character.professionSlug] : undefined;
  let profile = profession ? mergeProfile(profession) : mergeProfile(character.isMerchant ? merchantFallbackProfile : fallbackStockProfile);
  if (character.isMerchant) profile = { ...profile, tier: atLeastTier(profile.tier, "stocked") };
  profile = mergeProfile(profile, character.characterId ? characterStockOverridesById[character.characterId] : undefined);
  profile = applyLifestyleBaseline(character, profile);
  return collectGeneratedBiasWeights(character, profile);
}
