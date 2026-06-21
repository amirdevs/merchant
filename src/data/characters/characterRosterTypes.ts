import type { CharacterExpressionTier, CharacterReworkStatus } from "./characterRemakeTypes";

export type CharacterRosterSource = "legacy_generated" | "new_useful_npc" | "future_story_npc";

export interface PortraitTierAllocation {
  readonly tier: CharacterExpressionTier;
  readonly characterCount: number;
  readonly expressionsPerCharacter: number;
  readonly plannedImageCount: number;
  readonly useCase: string;
}

export interface CharacterRosterPoolPlan {
  readonly source: CharacterRosterSource;
  readonly label: string;
  readonly characterCount: number;
  readonly visibleCount: number;
  readonly hiddenOrMergedCount: number;
  readonly defaultStatus: CharacterReworkStatus;
  readonly planningNotes: readonly string[];
  readonly portraitAllocations: readonly PortraitTierAllocation[];
}

export interface FinalCharacterRosterPlan {
  readonly planId: string;
  readonly portraitGenerationStatus: "BLOCKED_UNTIL_IDENTITY_CATALOG" | "READY_FOR_TEST_BATCH" | "READY_FOR_FULL_BATCHES";
  readonly finalVisibleCharacterTarget: number;
  readonly hiddenOrMergedLegacyTarget: number;
  readonly plannedPortraitImageTarget: number;
  readonly pools: readonly CharacterRosterPoolPlan[];
  readonly generationGateChecklist: readonly string[];
  readonly nextStep: string;
}

export function getPoolPortraitImageTotal(pool: CharacterRosterPoolPlan): number {
  return pool.portraitAllocations.reduce((total, allocation) => total + allocation.plannedImageCount, 0);
}

export function getRosterPortraitImageTotal(plan: FinalCharacterRosterPlan): number {
  return plan.pools.reduce((total, pool) => total + getPoolPortraitImageTotal(pool), 0);
}
