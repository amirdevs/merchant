import type { Bias, ObtainableItem } from "@/shared/types/game-data";

export type CharacterStockProfileRecord = {
  characterId: string;
  displayName: string;
  profession: string;
  stockRole: string;
  confidence: "direct" | "inferred" | "broad";
  primaryPools: ObtainableItem[];
  secondaryPools: ObtainableItem[];
  stockBias: Bias[];
  forbiddenTags: string[];
  sourceNotes: string[];
  missingTags?: string[];
};

export type ResolvedCharacterStockProfile = {
  characterId: string;
  stockRole: string;
  primaryPools: ObtainableItem[];
  secondaryPools: ObtainableItem[];
  stockBias: Bias[];
  forbiddenTags: string[];
  sourceNotes: string[];
};
