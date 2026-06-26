import characterStockProfilesJson from "./character-stock-profiles.json";
import type { CharacterStockPersona } from "../merchandise/stock-personas";
import type { FinalCharacterIdentityProfile } from "../profiles/types";
import type { CharacterRuntimeProfile } from "../runtime/types";
import type { Bias, ObtainableItem } from "@/shared/types/game-data";
import type { CharacterStockProfileRecord, ResolvedCharacterStockProfile } from "./types";

export type { CharacterStockProfileRecord, ResolvedCharacterStockProfile } from "./types";

export const characterStockProfiles = characterStockProfilesJson as CharacterStockProfileRecord[];

export const characterStockProfileById = new Map(
  characterStockProfiles.map((profile) => [profile.characterId, profile] as const),
);

function cleanPools(pools: ObtainableItem[] | undefined) {
  const byTag = new Map<string, ObtainableItem>();
  for (const pool of pools || []) {
    const tag = pool.tag.trim();
    if (!tag) continue;
    const current = byTag.get(tag);
    if (!current) {
      byTag.set(tag, { ...pool });
      continue;
    }
    current.quantityMin = Math.max(0, Math.min(current.quantityMin || 0, pool.quantityMin || 0));
    current.quantityMax = Math.max(current.quantityMax || 0, pool.quantityMax || 0);
  }
  return [...byTag.values()];
}

function cleanBiases(biases: Bias[] | undefined) {
  const byTag = new Map<string, Bias>();
  for (const entry of biases || []) {
    const tag = entry.tag.trim();
    if (!tag) continue;
    const current = byTag.get(tag);
    if (!current) {
      byTag.set(tag, { ...entry });
      continue;
    }
    current.percent = Math.max(current.percent, entry.percent);
  }
  return [...byTag.values()];
}

export function resolveCharacterStockProfile(
  identity: FinalCharacterIdentityProfile,
  runtimeProfile: Pick<CharacterRuntimeProfile, "characterId" | "professionSlug" | "isMerchant">,
  stockPersona: CharacterStockPersona,
  merchandise?: { stockPools?: ObtainableItem[]; stockBias?: Bias[] },
): ResolvedCharacterStockProfile {
  const explicit = characterStockProfileById.get(identity.characterId);
  if (explicit) {
    return {
      characterId: explicit.characterId,
      stockRole: explicit.stockRole,
      primaryPools: cleanPools(explicit.primaryPools),
      secondaryPools: cleanPools(explicit.secondaryPools),
      stockBias: cleanBiases(explicit.stockBias),
      forbiddenTags: [...new Set(explicit.forbiddenTags || [])],
      sourceNotes: explicit.sourceNotes || [],
    };
  }

  return {
    characterId: identity.characterId,
    stockRole: stockPersona.personaId || runtimeProfile.professionSlug || "general_profile_stock",
    primaryPools: cleanPools(merchandise?.stockPools || stockPersona.stockPools),
    secondaryPools: cleanPools(merchandise?.stockPools ? stockPersona.stockPools : []),
    stockBias: cleanBiases([...(stockPersona.stockBias || []), ...((merchandise?.stockBias || []))]),
    forbiddenTags: [...new Set(stockPersona.forbiddenTags || [])],
    sourceNotes: ["fallback profile assembled from persona and merchandise assignment"],
  };
}
