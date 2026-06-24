import type { CharacterExpression, CharacterExpressionTier, CharacterGameplayGroup } from "./characterProfileTypes";

export type CharacterRosterGroup = "supporting_cast" | "primary_cast";

export type CharacterIdentityBatchStatus =
  | "catalog_profile_batch"
  | "portrait_manifest_ready"
  | "profile_locked";

export interface CharacterExpressionProfile {
  readonly expression: CharacterExpression;
  readonly actingDirection: string;
  readonly promptDelta: string;
}

export interface FinalCharacterIdentityProfile {
  readonly characterId: string;
  readonly rosterGroup: CharacterRosterGroup;
  readonly runtimeIndex: number | null;
  readonly catalogKey: string | null;
  readonly finalDisplayName: string;
  readonly profession: string;
  readonly gameplayGroups: readonly CharacterGameplayGroup[];
  readonly roleTags: readonly string[];
  readonly marketFlavor: string;
  readonly voiceDirection: string;
  readonly tradePersonality: string;
  readonly shortStory: string;
  readonly visualIdentity: string;
  readonly uniquenessTraits: readonly string[];
  readonly professionProps: readonly string[];
  readonly dominantColors: readonly string[];
  readonly expressionTier: CharacterExpressionTier;
  readonly plannedExpressions: readonly CharacterExpressionProfile[];
  readonly portraitFilePrefix: string;
  readonly identityAnchor: string;
  readonly portraitBasePrompt: string;
  readonly negativePrompt: string;
  readonly questHooks: readonly string[];
  readonly integrationNotes: string;
  /** Optional fantasy ancestry/species direction. Use this to make the cast visibly varied. */
  readonly ancestryOrSpecies?: string;
  /** Optional visible magical/otherworldly traits. Keep these consistent across expressions. */
  readonly magicalTraits?: readonly string[];
}

export interface CharacterIdentityCatalogBatch {
  readonly batchId: string;
  readonly status: CharacterIdentityBatchStatus;
  readonly rosterScope: string;
  readonly portraitGenerationAllowed: false;
  readonly notes: readonly string[];
  readonly identities: readonly FinalCharacterIdentityProfile[];
}

export function getIdentityBatchPortraitImageCount(batch: CharacterIdentityCatalogBatch): number {
  return batch.identities.reduce((total, identity) => total + identity.plannedExpressions.length, 0);
}
