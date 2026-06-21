import type {
  LegacyCharacterAuditBaseline,
  LegacyCharacterAuditDecisionSeed,
  LegacyCharacterAuditRule,
} from "./legacyCharacterAuditTypes";

export const legacyCharacterAuditBaseline = {
  sourceFile: "src/data/generated/characters.json",
  currentRecordCount: 203,
  indexRange: [0, 202],
  auditGoal:
    "Classify every generated character before final identity writing, portrait prompt manifests, and portrait sheet generation.",
  shouldEditGeneratedFileDirectly: false,
  nextStepBeforePortraits:
    "Build the final roster map that combines reworked legacy slots, useful new NPC seeds, disabled weak slots, and final expression counts.",
} as const satisfies LegacyCharacterAuditBaseline;

export const legacyCharacterAuditRules = [
  {
    id: "keep-internal-indexes",
    title: "Keep generated indexes stable",
    appliesTo: ["all legacy records"],
    defaultDecision: "REPLACE_VISIBLE_IDENTITY",
    priority: "critical",
    notes:
      "Do not delete or renumber generated character records until all quest, market, save, and dialogue references are migrated. Replace public identity through the remake layer first.",
  },
  {
    id: "rewrite-visible-identity",
    title: "Replace all public-facing identity",
    appliesTo: ["names", "portraits", "dialogue flavor", "short descriptions", "visual design"],
    defaultDecision: "REPLACE_VISIBLE_IDENTITY",
    priority: "critical",
    notes:
      "Every visible old name and portrait must become an original remake identity. The generated data remains mechanical reference only.",
  },
  {
    id: "disable-weak-duplicates",
    title: "Disable or merge weak duplicates",
    appliesTo: ["redundant merchants", "inactive records", "low-purpose repeated roles"],
    defaultDecision: "NEEDS_MANUAL_REVIEW",
    priority: "high",
    notes:
      "Do not generate portraits for weak duplicate slots until the final roster map decides whether they become disabled, merged, or promoted into a useful system role.",
  },
  {
    id: "system-support-promotion",
    title: "Promote useful old slots into system NPCs",
    appliesTo: ["guards", "thieves", "travelers", "guild leaders", "market specialists"],
    defaultDecision: "PROMOTE_TO_SYSTEM_NPC",
    priority: "high",
    notes:
      "Important old mechanical roles can become customs officers, caravan rivals, brokers, quest contacts, appraisers, or other useful remake NPCs.",
  },
  {
    id: "portrait-later",
    title: "No portraits during audit",
    appliesTo: ["all character records"],
    defaultDecision: "NEEDS_MANUAL_REVIEW",
    priority: "critical",
    notes:
      "Portrait generation starts only after the final roster, expression counts, identity anchors, and image-based prompt batches are approved.",
  },
] as const satisfies readonly LegacyCharacterAuditRule[];

export const legacyCharacterAuditDecisionSeeds = [
  {
    originalIndex: 0,
    sourceIdentity: "Guard",
    auditGroup: "law_and_risk",
    recommendedDecision: "PROMOTE_TO_SYSTEM_NPC",
    priority: "critical",
    reason: "Guards are core to illegal-goods, confiscation, toll, and route-risk systems.",
    remakeDirection:
      "Replace with an original customs/road-law character family. Keep the mechanical role, but split future portraits into stern, suspicious, and angry expressions.",
  },
  {
    originalIndex: 1,
    sourceIdentity: "Thief",
    auditGroup: "law_and_risk",
    recommendedDecision: "PROMOTE_TO_SYSTEM_NPC",
    priority: "critical",
    reason: "The thief/plunderer role supports robbery, risk, black-market, and route danger loops.",
    remakeDirection:
      "Replace with an original underworld contact or roadside thief archetype. Keep risk mechanics, rewrite all name/look/dialogue.",
  },
  {
    originalIndex: [2, 10],
    sourceIdentity: "Early guild/tutorial market leaders",
    auditGroup: "tutorial_or_guild",
    recommendedDecision: "REPLACE_VISIBLE_IDENTITY",
    priority: "critical",
    reason: "These are high-visibility NPCs and should not keep old names, old portraits, or old tutorial flavor.",
    remakeDirection:
      "Create original guild presidents, mentors, auctioneers, and market officials with small story descriptions and strong profession silhouettes.",
  },
  {
    originalIndex: [11, 120],
    sourceIdentity: "Main active merchants and market specialists",
    auditGroup: "core_merchant",
    recommendedDecision: "KEEP_AND_REWORK",
    priority: "high",
    reason: "Most active merchants are useful as stock anchors, market flavor, quest contacts, and portrait variety.",
    remakeDirection:
      "Keep mechanical slots where useful, but rewrite names, biographies, profession styling, visual anchors, trade personalities, and expression plans.",
  },
  {
    originalIndex: [121, 180],
    sourceIdentity: "Later active specialists, travelers, rumor, and duplicate market roles",
    auditGroup: "market_specialist",
    recommendedDecision: "NEEDS_MANUAL_REVIEW",
    priority: "medium",
    reason: "This range likely contains useful roles mixed with duplicates that should be merged or disabled before portrait generation.",
    remakeDirection:
      "Audit against market needs. Promote unique roles; merge redundant ones into stronger new identities; avoid generating portraits for weak slots.",
  },
  {
    originalIndex: [181, 202],
    sourceIdentity: "Late/special/inactive tail records",
    auditGroup: "inactive_or_secret",
    recommendedDecision: "NEEDS_MANUAL_REVIEW",
    priority: "medium",
    reason: "Tail records can include inactive, special, hidden, or weak records that may not deserve portrait work.",
    remakeDirection:
      "Check references before disabling. Keep story-critical slots, hide inactive filler, and convert only useful ones into original special NPCs.",
  },
] as const satisfies readonly LegacyCharacterAuditDecisionSeed[];

export const legacyCharacterAuditNextActions = [
  "Create the final roster map with one row per generated index and every useful new NPC seed.",
  "Mark each generated slot as keep/rework, replace identity, merge, disable/hide, promote to system NPC, or needs review.",
  "Calculate the final visible character count and total portrait-image count before any image generation.",
  "Only after final roster approval, write the full hand-made names, stories, visual anchors, and expression prompts.",
] as const;
