import type { CharacterExpressionTier, CharacterReworkStatus } from "./characterRemakeTypes";

export type LegacyCharacterAuditPriority = "core" | "standard" | "low" | "reference_check";

export type LegacyCharacterAuditDecision =
  | "KEEP_AND_REWORK"
  | "REPLACE_VISIBLE_IDENTITY"
  | "MERGE_WITH_ANOTHER"
  | "DISABLE_OR_HIDE"
  | "REFERENCE_CHECK_REQUIRED";

export interface LegacyCharacterRangeAudit {
  readonly rangeId: string;
  readonly startIndex: number;
  readonly endIndex: number;
  readonly priority: LegacyCharacterAuditPriority;
  readonly defaultDecision: LegacyCharacterAuditDecision;
  readonly defaultReworkStatus: CharacterReworkStatus;
  readonly defaultExpressionTier: CharacterExpressionTier;
  readonly publicIdentityRule: string;
  readonly gameplayReason: string;
  readonly auditNotes: readonly string[];
}

export interface LegacyCharacterAuditSummary {
  readonly generatedCharacterRecordCount: number;
  readonly firstGeneratedIndex: number;
  readonly lastGeneratedIndex: number;
  readonly targetLegacyVisibleSlots: number;
  readonly targetLegacyDisableOrMergeSlots: number;
  readonly auditRanges: readonly LegacyCharacterRangeAudit[];
}
