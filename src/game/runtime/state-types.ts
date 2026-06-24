import type { Character as DataCharacter, InventoryEntry } from "@/shared/types/game-data";

export type Character = DataCharacter;

export type GameStateLike = {
  marketIndex: number;
  day: number;
  selectedCharacterIndex: number | null;
  characters: Character[];
  playerInventory: InventoryEntry[];
  questStates?: Record<string, string>;
  customerQueueDay?: number;
  seenCharacterIndexes?: number[];
};
