import { characterIdentityCatalogBatch01 } from "./characterIdentityCatalogBatch01";
import { characterIdentityCatalogBatch02 } from "./characterIdentityCatalogBatch02";
import { getIdentityBatchPortraitImageCount } from "./characterIdentityTypes";

export const characterIdentityCatalogBatches = [
  characterIdentityCatalogBatch01,
  characterIdentityCatalogBatch02,
] as const;

export const characterIdentityCatalogIdentityCount = characterIdentityCatalogBatches.reduce(
  (total, batch) => total + batch.identities.length,
  0,
);

export const characterIdentityCatalogPortraitImageCount = characterIdentityCatalogBatches.reduce(
  (total, batch) => total + getIdentityBatchPortraitImageCount(batch),
  0,
);

export const usefulNewNpcIdentityCatalogComplete = characterIdentityCatalogIdentityCount === 48;

export const characterIdentityCatalogSummary = {
  batchCount: characterIdentityCatalogBatches.length,
  identityCount: characterIdentityCatalogIdentityCount,
  portraitImageCount: characterIdentityCatalogPortraitImageCount,
  usefulNewNpcIdentityCatalogComplete,
} as const;
