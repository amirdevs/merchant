import type { Bias, ObtainableItem } from "@/shared/types/game-data";

export type CharacterMerchandiseMatchedItem = {
  itemId?: string;
  itemIndex?: number;
  itemName: string;
  token: string;
  sourceField: string;
  confidence: "high" | "medium" | "review";
};

export type CharacterMerchandiseAssignment = {
  characterId: string;
  displayName: string;
  profession: string;
  stockPools: ObtainableItem[];
  stockBias: Bias[];
  matchedItems: CharacterMerchandiseMatchedItem[];
  missingItemIds: string[];
  reviewNotes: string[];
};

export type CharacterMerchandiseAssignments = CharacterMerchandiseAssignment[];
