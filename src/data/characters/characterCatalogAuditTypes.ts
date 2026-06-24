import type { CharacterExpressionTier, CharacterRosterStatus } from "./characterProfileTypes";

export type CharacterCatalogAuditPriority = "core" | "standard" | "low" | "reference_check";

export type CharacterCatalogAuditDecision =
  | "KEEP_VISIBLE_ROLE"
  | "REPLACE_VISIBLE_ROLE"
  | "MERGE_WITH_ANOTHER"
  | "DISABLE_OR_HIDE"
  | "REFERENCE_CHECK_REQUIRED";

export interface CharacterCatalogRangeAudit {
  readonly rangeId: string;
  readonly startIndex: number;
  readonly endIndex: number;
  readonly priority: CharacterCatalogAuditPriority;
  readonly defaultDecision: CharacterCatalogAuditDecision;
  readonly defaultReworkStatus: CharacterRosterStatus;
  readonly defaultExpressionTier: CharacterExpressionTier;
  readonly publicIdentityRule: string;
  readonly gameplayReason: string;
  readonly auditNotes: readonly string[];
}

export interface CharacterCatalogAuditSummary {
  readonly generatedCharacterRecordCount: number;
  readonly firstGeneratedIndex: number;
  readonly lastGeneratedIndex: number;
  readonly targetVisibleSupportingCastSlots: number;
  readonly targetDisableOrMergeSlots: number;
  readonly auditRanges: readonly CharacterCatalogRangeAudit[];
}
