export type CharacterRosterStatus =
  | "KEEP_VISIBLE_ROLE"
  | "REPLACE_VISIBLE_ROLE"
  | "MERGE_WITH_ANOTHER"
  | "DISABLE_OR_HIDE"
  | "PRIMARY_CAST_SLOT"
  | "SPECIAL_STORY_SLOT";

export type CharacterExpression =
  | "neutral"
  | "happy"
  | "suspicious"
  | "worried"
  | "angry"
  | "sad"
  | "surprised"
  | "bargaining"
  | "wonder"
  | "proud"
  | "amused"
  | "tired";

export type CharacterExpressionTier = "major" | "merchant" | "minor" | "special";

export type CharacterGameplayGroup =
  | "trade"
  | "travel"
  | "company"
  | "quest"
  | "risk_crime"
  | "market_service"
  | "guild_noble"
  | "collector_specialist";

export interface CharacterPortraitPlan {
  readonly expressionTier: CharacterExpressionTier;
  readonly plannedExpressions: readonly CharacterExpression[];
  readonly portraitFilePrefix: string;
  readonly identityAnchor: string;
  readonly visualTraits: readonly string[];
  readonly professionProps: readonly string[];
  readonly dominantColors: readonly string[];
  readonly negativePrompt: string;
  /** Optional fantasy ancestry/species direction. Use this to avoid an all-human cast. */
  readonly ancestryOrSpecies?: string;
  /** Optional visible magical/otherworldly traits. Keep them readable and profession-safe. */
  readonly magicalTraits?: readonly string[];
}

export interface PrimaryCastSeed {
  readonly characterId: `character-${string}`;
  readonly displayName: string;
  readonly status: "PRIMARY_CAST_SLOT" | "SPECIAL_STORY_SLOT";
  readonly gameplayGroup: CharacterGameplayGroup;
  readonly profession: string;
  readonly roleTags: readonly string[];
  readonly suggestedMarketFlavor: string;
  readonly silhouette: string;
  readonly ageBand: string;
  readonly tradePersonality: string;
  readonly shortStory: string;
  readonly visualDescription: string;
  readonly portraitPlan: CharacterPortraitPlan;
  readonly questHooks: readonly string[];
  readonly integrationNotes: string;
}

export const expressionPresets = {
  major: ["neutral", "happy", "suspicious", "worried", "angry"],
  merchant: ["neutral", "happy", "suspicious"],
  minor: ["neutral"],
} as const satisfies Record<"major" | "merchant" | "minor", readonly CharacterExpression[]>;

export function getPlannedPortraitImageCount(seed: PrimaryCastSeed): number {
  return seed.portraitPlan.plannedExpressions.length;
}
