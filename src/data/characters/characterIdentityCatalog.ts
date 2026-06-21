import { characterIdentityCatalogBatch01 } from "./characterIdentityCatalogBatch01";
import { characterIdentityCatalogBatch02 } from "./characterIdentityCatalogBatch02";
import { characterIdentityCatalogLegacyBatch01 } from "./characterIdentityCatalogLegacyBatch01";
import { characterIdentityCatalogLegacyBatch02 } from "./characterIdentityCatalogLegacyBatch02";
import { getIdentityBatchPortraitImageCount } from "./characterIdentityTypes";

export const usefulNewNpcIdentityCatalogBatches = [
  characterIdentityCatalogBatch01,
  characterIdentityCatalogBatch02,
] as const;

export const legacyReworkedIdentityCatalogBatches = [
  characterIdentityCatalogLegacyBatch01,
  characterIdentityCatalogLegacyBatch02,
] as const;

export const characterIdentityCatalogBatches = [
  ...usefulNewNpcIdentityCatalogBatches,
  ...legacyReworkedIdentityCatalogBatches,
] as const;

export const characterIdentityCatalogIdentityCount = characterIdentityCatalogBatches.reduce(
  (total, batch) => total + batch.identities.length,
  0,
);

export const characterIdentityCatalogPortraitImageCount = characterIdentityCatalogBatches.reduce(
  (total, batch) => total + getIdentityBatchPortraitImageCount(batch),
  0,
);

export const usefulNewNpcIdentityCatalogIdentityCount = usefulNewNpcIdentityCatalogBatches.reduce(
  (total, batch) => total + batch.identities.length,
  0,
);

export const usefulNewNpcIdentityCatalogPortraitImageCount = usefulNewNpcIdentityCatalogBatches.reduce(
  (total, batch) => total + getIdentityBatchPortraitImageCount(batch),
  0,
);

export const legacyReworkedIdentityCatalogIdentityCount = legacyReworkedIdentityCatalogBatches.reduce(
  (total, batch) => total + batch.identities.length,
  0,
);

export const legacyReworkedIdentityCatalogPortraitImageCount = legacyReworkedIdentityCatalogBatches.reduce(
  (total, batch) => total + getIdentityBatchPortraitImageCount(batch),
  0,
);

export const usefulNewNpcIdentityCatalogComplete = usefulNewNpcIdentityCatalogIdentityCount === 48;
export const legacyIdentityCatalogStarted = legacyReworkedIdentityCatalogIdentityCount > 0;

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
} as const;
