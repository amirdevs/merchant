import type { Character as DataCharacter, InventoryEntry } from "../data/types";

export type Character = DataCharacter;

export type GameStateLike = {
  marketIndex: number;
  selectedCharacterIndex: number | null;
  characters: Character[];
  playerInventory: InventoryEntry[];
};

