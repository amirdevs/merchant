import type { Dispatch, RefObject, SetStateAction } from "react";
import type { Character, InventoryEntry, Marketplace } from "@/data/types";
import type { GameState } from "@/lib/game";
import type { MoveAmount } from "@/lib/inventory";

export type MerchantController = {
  state: GameState;
  market: Marketplace;
  people: Character[];
  character: Character | null;
  playerOffer: number;
  characterOffer: number;
  modStatus: string;
  helpOpen: boolean;
  soundOn: boolean;
  importInputRef: RefObject<HTMLInputElement>;
  actions: {
    setHelpOpen: Dispatch<SetStateAction<boolean>>;
    newGame: () => void;
    saveGame: () => void;
    loadGame: () => void;
    exportSave: () => void;
    importSave: (file: File | undefined) => Promise<void>;
    toggleAudio: () => void;
    selectCharacter: (character: Character) => void;
    nextCustomer: () => void;
    movePlayer: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
    moveCharacter: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
    togglePlayerProtect: (entry: InventoryEntry) => void;
    trade: () => void;
    travel: (marketIndex: number) => void;
  };
};
