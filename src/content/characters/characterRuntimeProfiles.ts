import runtimeProfileDataJson from "./characterRuntimeProfiles.data.json";
import type { FinalCharacterIdentityProfile } from "./characterIdentityTypes";
import type { Bias, Character, ObtainableItem } from "@/shared/types/game-data";

export type CharacterRuntimeDialogueBehavior = {
  who?: string;
  preference?: string;
  customQuestion?: string;
  customReply?: string;
};

export type CharacterRuntimeCompanyJob = {
  timeInWeeks: number;
  riskPercent: number;
  costInGold: number;
  storageTag: string;
  rewardAmount: number;
  rewardItem: string;
  rewardLabel: string;
  rewardText: string;
  kingdomIndex: number | null;
};

export type CharacterRuntimeProfile = {
  characterId: string;
  runtimeIndex: number | null;
  isActive: boolean;
  professionSlug: string | null;
  marketplaceIndex: number | null;
  marketplaces: number[];
  isMerchant: boolean;
  isPlunderer: boolean;
  isTraveler: boolean;
  isBeggar: boolean;
  isSnitch: boolean;
  vote: string | null;
  mythDeck: string | null;
  mythDefeated: boolean;
  companyJob: CharacterRuntimeCompanyJob | null;
  dayAvailable: number | null;
  maxObtainValue: number;
  frugalPercent: number;
  hagglePercent: number;
  closeToDealPercent: number;
  reachingDealPercent: number;
  farFromDealPercent: number;
  dialogueBehavior: CharacterRuntimeDialogueBehavior | null;
  tradeBias: Bias[];
  obtainableItems: ObtainableItem[];
  excludedObtainItems: string[];
};

export type CharacterRuntimeProfileRecord = Record<string, CharacterRuntimeProfile>;

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

export function buildRuntimeCharacters(options: {
  identities: readonly FinalCharacterIdentityProfile[];
  neutralPortraitByCharacterId?: ReadonlyMap<string, string>;
}) {
  const identityById = new Map(options.identities.map((identity) => [identity.characterId, identity]));

  return runtimeCharacterProfilesInOrder.map((profile) => {
    const identity = identityById.get(profile.characterId);
    if (!identity) throw new Error(`Missing final character identity for runtime profile ${profile.characterId}`);

    const neutralPortrait = options.neutralPortraitByCharacterId?.get(profile.characterId) || `${profile.characterId}-neutral.png`;
    const dialogue = profile.dialogueBehavior;
    const character: Character = {
      characterId: profile.characterId,
      index: profile.runtimeIndex as number,
      name: identity.finalDisplayName,
      profession: identity.profession,
      professionSlug: profile.professionSlug,
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
      bias: profile.tradeBias.map((entry) => ({ ...entry })),
      obtainableItems: profile.obtainableItems.map((entry) => ({ ...entry })),
      excludedObtainItems: [...profile.excludedObtainItems],
      inventory: [],
    };
    return character;
  });
}
