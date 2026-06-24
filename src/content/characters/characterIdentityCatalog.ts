import { characterIdentityCatalogCastBatch01 } from "./characterIdentityCatalogCastBatch01";
import { characterIdentityCatalogCastBatch02 } from "./characterIdentityCatalogCastBatch02";
import { characterIdentityCatalogCastBatch03 } from "./characterIdentityCatalogCastBatch03";
import { characterIdentityCatalogCastBatch04 } from "./characterIdentityCatalogCastBatch04";
import { characterIdentityCatalogCastBatch05 } from "./characterIdentityCatalogCastBatch05";
import { characterIdentityCatalogCastBatch06 } from "./characterIdentityCatalogCastBatch06";
import { getIdentityBatchPortraitImageCount } from "./characterIdentityTypes";

export const characterIdentityCatalogBatches = [
  characterIdentityCatalogCastBatch01,
  characterIdentityCatalogCastBatch02,
  characterIdentityCatalogCastBatch03,
  characterIdentityCatalogCastBatch04,
  characterIdentityCatalogCastBatch05,
  characterIdentityCatalogCastBatch06,
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

export const primaryCastIdentityCount = allCharacterIdentityCatalogIdentities.filter(
  (identity) => identity.rosterGroup === "primary_cast",
).length;

export const primaryCastPortraitImageCount = allCharacterIdentityCatalogIdentities
  .filter((identity) => identity.rosterGroup === "primary_cast")
  .reduce((total, identity) => total + identity.plannedExpressions.length, 0);

export const supportingCastIdentityCount = allCharacterIdentityCatalogIdentities.filter(
  (identity) => identity.rosterGroup === "supporting_cast",
).length;

export const supportingCastPortraitImageCount = allCharacterIdentityCatalogIdentities
  .filter((identity) => identity.rosterGroup === "supporting_cast")
  .reduce((total, identity) => total + identity.plannedExpressions.length, 0);

export const primaryCastCatalogComplete = primaryCastIdentityCount === 48;
export const supportingCastCatalogStarted = supportingCastIdentityCount > 0;
export const supportingCastCatalogBatch03Complete = supportingCastIdentityCount >= 162;
export const supportingCastCatalogComplete = supportingCastIdentityCount >= 192;
export const characterIdentityCatalogReady =
  primaryCastCatalogComplete && supportingCastCatalogComplete;

export const characterIdentityCatalogSummary = {
  batchCount: characterIdentityCatalogBatches.length,
  identityCount: characterIdentityCatalogIdentityCount,
  portraitImageCount: characterIdentityCatalogPortraitImageCount,
  primaryCastIdentityCount,
  primaryCastPortraitImageCount,
  primaryCastCatalogComplete,
  supportingCastIdentityCount,
  supportingCastPortraitImageCount,
  supportingCastCatalogStarted,
  supportingCastCatalogBatch03Complete,
  supportingCastCatalogComplete,
  characterIdentityCatalogReady,
} as const;
