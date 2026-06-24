import type { Bias, ObtainableItem } from "@/shared/types/game-data";

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
