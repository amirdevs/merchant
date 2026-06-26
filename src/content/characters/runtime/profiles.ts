import runtimeProfileDataJson from "./profiles.data.json";
import { characterMerchandiseAssignmentById } from "../merchandise";
import { resolveProfileStockPersona } from "../merchandise/stock-personas";
import { resolveCharacterStockProfile } from "../stock";
import type { FinalCharacterIdentityProfile } from "../profiles/types";
import type { Bias, Character, ObtainableItem } from "@/shared/types/game-data";
import type { CharacterRuntimeProfileRecord } from "./types";

export type {
  CharacterRuntimeCompanyJob,
  CharacterRuntimeDialogueBehavior,
  CharacterRuntimeProfile,
  CharacterRuntimeProfileRecord,
} from "./types";

export const characterRuntimeProfiles = runtimeProfileDataJson as CharacterRuntimeProfileRecord;

export const runtimeCharacterProfileEntries = Object.values(characterRuntimeProfiles);

export const runtimeCharacterProfilesInOrder = runtimeCharacterProfileEntries
  .filter((profile) => typeof profile.runtimeIndex === "number")
  .sort((left, right) => (left.runtimeIndex ?? 0) - (right.runtimeIndex ?? 0));

export const runtimeCharacterProfileByCharacterId = new Map(
  runtimeCharacterProfileEntries.map((profile) => [profile.characterId, profile] as const),
);

export const runtimeCharacterProfileByIndex = new Map(
  runtimeCharacterProfilesInOrder.map((profile) => [profile.runtimeIndex as number, profile] as const),
);

export const runtimeCharacterProfileSummary = {
  totalProfileCount: runtimeCharacterProfileEntries.length,
  runtimeProfileCount: runtimeCharacterProfilesInOrder.length,
  inactiveProfileCount: runtimeCharacterProfileEntries.filter((profile) => profile.runtimeIndex === null).length,
} as const;

export function runtimeCharacterIdForIndex(index: number) {
  return runtimeCharacterProfileByIndex.get(index)?.characterId || null;
}

function mergeObtainableItems(base: ObtainableItem[], extra: ObtainableItem[] | undefined) {
  const byTag = new Map<string, ObtainableItem>();
  for (const entry of [...base, ...(extra || [])]) {
    const tag = entry.tag.trim();
    if (!tag) continue;
    const current = byTag.get(tag);
    if (!current) {
      byTag.set(tag, { ...entry });
      continue;
    }
    current.quantityMin = Math.max(0, Math.min(current.quantityMin || 0, entry.quantityMin || 0));
    current.quantityMax = Math.max(current.quantityMax || 0, entry.quantityMax || 0);
  }
  return [...byTag.values()];
}

function mergeBiases(base: Bias[], extra: Bias[] | undefined) {
  const byTag = new Map<string, Bias>();
  for (const entry of [...base, ...(extra || [])]) {
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

export function buildRuntimeCharacters(options: {
  identities: readonly FinalCharacterIdentityProfile[];
  neutralPortraitByCharacterId?: ReadonlyMap<string, string>;
}) {
  const identityById = new Map(options.identities.map((identity) => [identity.characterId, identity]));

  return runtimeCharacterProfilesInOrder.map((profile) => {
    const identity = identityById.get(profile.characterId);
    if (!identity) throw new Error(`Missing final character identity for runtime profile ${profile.characterId}`);

    const neutralPortrait = options.neutralPortraitByCharacterId?.get(profile.characterId) || `${profile.characterId}-neutral.png`;
    const merchandise = characterMerchandiseAssignmentById.get(profile.characterId);
    const stockPersona = resolveProfileStockPersona(identity);
    const stockProfile = resolveCharacterStockProfile(identity, profile, stockPersona, merchandise);
    const dialogue = profile.dialogueBehavior;
    const profileFirstPools = mergeObtainableItems(
      mergeObtainableItems(
        mergeObtainableItems([...stockProfile.primaryPools, ...stockProfile.secondaryPools], merchandise?.stockPools),
        stockPersona.stockPools,
      ),
      profile.obtainableItems,
    );
    const profileFirstBias = mergeBiases(
      mergeBiases(mergeBiases(stockProfile.stockBias, merchandise?.stockBias), stockPersona.stockBias),
      profile.tradeBias,
    );
    const primaryStockTags = stockProfile.primaryPools.map((entry) => entry.tag.trim()).filter(Boolean);
    const secondaryStockTags = stockProfile.secondaryPools.map((entry) => entry.tag.trim()).filter(Boolean);
    const character: Character = {
      characterId: profile.characterId,
      index: profile.runtimeIndex as number,
      name: identity.finalDisplayName,
      profession: identity.profession,
      professionSlug: profile.professionSlug,
      stockRole: stockProfile.stockRole,
      stockProfileMode: stockProfile.explicitProfile ? "explicit" : "fallback",
      primaryStockTags,
      secondaryStockTags,
      portraitFile: neutralPortrait,
      stallFile: null,
      isActive: profile.isActive,
      isMerchant: profile.isMerchant,
      isPlunderer: profile.isPlunderer || undefined,
      isTraveler: profile.isTraveler || undefined,
      isBeggar: profile.isBeggar || undefined,
      isSnitch: profile.isSnitch || undefined,
      vote: profile.vote,
      mythDeck: profile.mythDeck,
      mythDefeated: profile.mythDefeated,
      companyJob: profile.companyJob,
      marketplaceIndex: profile.marketplaceIndex ?? 0,
      dayAvailable: profile.dayAvailable,
      marketplaces: [...profile.marketplaces],
      maxObtainValue: profile.maxObtainValue,
      frugalPercent: profile.frugalPercent,
      hagglePercent: profile.hagglePercent,
      closeToDealPercent: profile.closeToDealPercent,
      reachingDealPercent: profile.reachingDealPercent,
      farFromDealPercent: profile.farFromDealPercent || undefined,
      dialogue: dialogue && Object.keys(dialogue).length ? { ...dialogue } : undefined,
      bias: profileFirstBias,
      obtainableItems: profileFirstPools,
      excludedObtainItems: [...new Set([...profile.excludedObtainItems, ...(stockPersona.forbiddenTags || []), ...stockProfile.forbiddenTags])],
      inventory: [],
    };
    return character;
  });
}
