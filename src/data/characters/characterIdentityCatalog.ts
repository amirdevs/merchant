import { characterIdentityCatalogBatch01 } from "./characterIdentityCatalogBatch01";
import { characterIdentityCatalogBatch02 } from "./characterIdentityCatalogBatch02";
import { characterIdentityCatalogLegacyBatch01 } from "./characterIdentityCatalogLegacyBatch01";
import { characterIdentityCatalogLegacyBatch02 } from "./characterIdentityCatalogLegacyBatch02";
import { characterIdentityCatalogLegacyBatch03 } from "./characterIdentityCatalogLegacyBatch03";
import { getIdentityBatchPortraitImageCount } from "./characterIdentityTypes";

export const characterIdentityCatalogBatches = [
  characterIdentityCatalogBatch01,
  characterIdentityCatalogBatch02,
  characterIdentityCatalogLegacyBatch01,
  characterIdentityCatalogLegacyBatch02,
  characterIdentityCatalogLegacyBatch03,
] as const;

export const characterIdentityCatalogIdentityCount = characterIdentityCatalogBatches.reduce(
  (total, batch) => total + batch.identities.length,
  0,
);

export const characterIdentityCatalogPortraitImageCount = characterIdentityCatalogBatches.reduce(
  (total, batch) => total + getIdentityBatchPortraitImageCount(batch),
  0,
);

const allCharacterIdentityCatalogIdentities = characterIdentityCatalogBatches.flatMap(
  (batch) => batch.identities,
);

export const usefulNewNpcIdentityCatalogIdentityCount = allCharacterIdentityCatalogIdentities.filter(
  (identity) => identity.source === "new_useful_npc",
).length;

export const usefulNewNpcIdentityCatalogPortraitImageCount = allCharacterIdentityCatalogIdentities
  .filter((identity) => identity.source === "new_useful_npc")
  .reduce((total, identity) => total + identity.plannedExpressions.length, 0);

export const legacyReworkedIdentityCatalogIdentityCount = allCharacterIdentityCatalogIdentities.filter(
  (identity) => identity.source === "legacy_reworked",
).length;

export const legacyReworkedIdentityCatalogPortraitImageCount = allCharacterIdentityCatalogIdentities
  .filter((identity) => identity.source === "legacy_reworked")
  .reduce((total, identity) => total + identity.plannedExpressions.length, 0);

export const usefulNewNpcIdentityCatalogComplete = usefulNewNpcIdentityCatalogIdentityCount === 48;
export const legacyIdentityCatalogStarted = legacyReworkedIdentityCatalogIdentityCount > 0;
export const legacyIdentityCatalogBatch03Complete = legacyReworkedIdentityCatalogIdentityCount >= 162;

export const characterIdentityCatalogSummary = {
  batchCount: characterIdentityCatalogBatches.length,
  identityCount: characterIdentityCatalogIdentityCount,
  portraitImageCount: characterIdentityCatalogPortraitImageCount,
  usefulNewNpcIdentityCatalogIdentityCount,
  usefulNewNpcIdentityCatalogPortraitImageCount,
  usefulNewNpcIdentityCatalogComplete,
  legacyReworkedIdentityCatalogIdentityCount,
  legacyReworkedIdentityCatalogPortraitImageCount,
  legacyIdentityCatalogStarted,
  legacyIdentityCatalogBatch03Complete,
} as const;
