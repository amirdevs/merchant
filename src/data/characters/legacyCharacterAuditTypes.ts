export type LegacyCharacterDecision =
  | "KEEP_AND_REWORK"
  | "REPLACE_VISIBLE_IDENTITY"
  | "MERGE_WITH_ANOTHER"
  | "DISABLE_OR_HIDE"
  | "PROMOTE_TO_SYSTEM_NPC"
  | "NEEDS_MANUAL_REVIEW";

export type LegacyCharacterAuditPriority = "critical" | "high" | "medium" | "low";

export type LegacyCharacterAuditGroup =
  | "law_and_risk"
  | "tutorial_or_guild"
  | "core_merchant"
  | "market_specialist"
  | "traveler"
  | "beggar_or_rumor"
  | "inactive_or_secret"
  | "duplicate_or_weak";

export interface LegacyCharacterAuditRule {
  readonly id: string;
  readonly title: string;
  readonly appliesTo: readonly string[];
  readonly defaultDecision: LegacyCharacterDecision;
  readonly priority: LegacyCharacterAuditPriority;
  readonly notes: string;
}

export interface LegacyCharacterAuditBaseline {
  readonly sourceFile: string;
  readonly currentRecordCount: number;
  readonly indexRange: readonly [number, number];
  readonly auditGoal: string;
  readonly shouldEditGeneratedFileDirectly: false;
  readonly nextStepBeforePortraits: string;
}

export interface LegacyCharacterAuditDecisionSeed {
  readonly originalIndex: number | readonly [number, number];
  readonly sourceIdentity: string;
  readonly auditGroup: LegacyCharacterAuditGroup;
  readonly recommendedDecision: LegacyCharacterDecision;
  readonly priority: LegacyCharacterAuditPriority;
  readonly reason: string;
  readonly remakeDirection: string;
}
