import { getPlannedPortraitImageCount } from "./characterRemakeTypes";
import { newUsefulNpcSeeds } from "./newUsefulNpcSeeds";
import { characterIdentityCatalogBatch01Summary } from "./characterIdentityCatalogBatch01";
import type { FinalCharacterRosterPlan } from "./characterRosterTypes";

export const generatedLegacyCharacterCount = 203;
export const targetVisibleLegacyCharacterCount = 192;
export const targetHiddenOrMergedLegacyCharacterCount = generatedLegacyCharacterCount - targetVisibleLegacyCharacterCount;

export const usefulNewNpcSeedCount = newUsefulNpcSeeds.length;
export const usefulNewNpcPortraitImageCount = newUsefulNpcSeeds.reduce(
  (total, seed) => total + getPlannedPortraitImageCount(seed),
  0,
);

export const finalCharacterRosterPlan = {
  planId: "character-roster-v2-pre-portrait",
  portraitGenerationStatus: "BLOCKED_UNTIL_FULL_IDENTITY_CATALOG_AND_TEST_MANIFEST",
  finalVisibleCharacterTarget: targetVisibleLegacyCharacterCount + usefulNewNpcSeedCount,
  hiddenOrMergedLegacyTarget: targetHiddenOrMergedLegacyCharacterCount,
  plannedPortraitImageTarget: 726,
  completedIdentityCatalogBatches: [characterIdentityCatalogBatch01Summary],
  pools: [
    {
      source: "legacy_generated",
      label: "Reworked visible legacy slots",
      characterCount: generatedLegacyCharacterCount,
      visibleCount: targetVisibleLegacyCharacterCount,
      hiddenOrMergedCount: targetHiddenOrMergedLegacyCharacterCount,
      defaultStatus: "REPLACE_VISIBLE_IDENTITY",
      planningNotes: [
        "Keep stable internal generated indexes until runtime migration is safe.",
        "Replace every public name, story, portrait, outfit, and dialogue flavor.",
        "Use 11 hidden/merged slots as the first cleanup target for weak, inactive, duplicate, or mechanically empty characters.",
      ],
      portraitAllocations: [
        {
          tier: "major",
          characterCount: 25,
          expressionsPerCharacter: 5,
          plannedImageCount: 125,
          useCase: "core recurring traders, guard/legal anchors, quest-useful characters, and market service characters",
        },
        {
          tier: "merchant",
          characterCount: 120,
          expressionsPerCharacter: 3,
          plannedImageCount: 360,
          useCase: "normal active merchants, workers, suppliers, and buyers",
        },
        {
          tier: "minor",
          characterCount: 47,
          expressionsPerCharacter: 1,
          plannedImageCount: 47,
          useCase: "background, low-frequency, or flavor-only visible NPCs",
        },
      ],
    },
    {
      source: "new_useful_npc",
      label: "New useful gameplay NPC seeds",
      characterCount: usefulNewNpcSeedCount,
      visibleCount: usefulNewNpcSeedCount,
      hiddenOrMergedCount: 0,
      defaultStatus: "NEW_GAMEPLAY_NPC",
      planningNotes: [
        "These NPCs support trade, travel, company, warehouse, contracts, crime/risk, market services, and specialist item sinks.",
        "They were planned before portrait generation so they can be included in the same final portrait pipeline as reworked old slots.",
        "Portrait image count is derived from each seed's planned expression tier.",
      ],
      portraitAllocations: [
        {
          tier: "major",
          characterCount: 25,
          expressionsPerCharacter: 5,
          plannedImageCount: 125,
          useCase: "high-value gameplay/service NPCs with emotional dialogue states",
        },
        {
          tier: "merchant",
          characterCount: 23,
          expressionsPerCharacter: 3,
          plannedImageCount: 69,
          useCase: "normal useful service and trade NPCs",
        },
      ],
    },
  ],
  generationGateChecklist: [
    "Approve final visible character count and hidden/merged legacy target.",
    "Create a full per-character identity catalog with new names, stories, role tags, visual anchors, and expression tiers.",
    "Create portrait manifest entries for every planned image, batched by total image count rather than character count.",
    "Generate only one small test portrait batch first.",
    "Approve style, consistency, crop safety, and expression identity before full portrait generation.",
  ],
  nextStep: "Step 15 - continue identity-catalog batches until all useful new NPCs and reworked legacy slots have final names, stories, looks, and expression tiers.",
} as const satisfies FinalCharacterRosterPlan;

export const finalCharacterRosterSummary = {
  generatedLegacyCharacterCount,
  targetVisibleLegacyCharacterCount,
  targetHiddenOrMergedLegacyCharacterCount,
  usefulNewNpcSeedCount,
  usefulNewNpcPortraitImageCount,
  finalVisibleCharacterTarget: finalCharacterRosterPlan.finalVisibleCharacterTarget,
  plannedPortraitImageTarget: finalCharacterRosterPlan.plannedPortraitImageTarget,
  completedIdentityCatalogBatches: finalCharacterRosterPlan.completedIdentityCatalogBatches,
  portraitGenerationStatus: finalCharacterRosterPlan.portraitGenerationStatus,
} as const;
