import type { Character } from "@/data/types";
import { characterStockOverrides, fallbackStockProfile, merchantFallbackProfile, professionStockProfiles } from "@/data/stock/profiles";
import { stockTiers } from "@/data/stock/tiers";
import type { StockProfile, StockProfileOverride, StockTierId } from "@/data/stock/types";

const tierOrder: StockTierId[] = ["empty", "pocket", "sparse", "light", "modest", "standard", "stocked", "large", "wholesale", "grand"];

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

export function resolveStockProfile(character: Character): StockProfile {
  const profession = character.professionSlug ? professionStockProfiles[character.professionSlug] : undefined;
  let profile = profession ? mergeProfile(profession) : mergeProfile(character.isMerchant ? merchantFallbackProfile : fallbackStockProfile);

  // `isMerchant` is only a commercial-capacity default. It does not choose item types.
  if (character.isMerchant) profile = { ...profile, tier: atLeastTier(profile.tier, "stocked") };

  return mergeProfile(profile, characterStockOverrides[character.name]);
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
