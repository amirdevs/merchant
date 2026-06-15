import type { Dispatch, RefObject, SetStateAction } from "react";
import type { Character, InventoryEntry, Marketplace } from "@/data/types";
import type { GameState } from "@/lib/game";
import type { MoveAmount } from "@/lib/inventory";

export type GameView =
  | "main-menu"
  | "new-profile"
  | "load-game"
  | "settings"
  | "system"
  | "travel"
  | "market"
  | "customers"
  | "barter"
  | "inventory"
  | "inventory-filter"
  | "item-detail";

export type MerchantProfile = {
  name: string;
  background: string;
  difficulty: string;
  starter: string;
};

export type UiPreferences = {
  uiScale: number;
  textSpeed: number;
  compactMode: boolean;
  decorativeMotion: boolean;
};

export type MerchantActions = {
  setHelpOpen: Dispatch<SetStateAction<boolean>>;
  newGame: () => void;
  saveGame: () => void;
  loadGame: () => void;
  exportSave: () => void;
  importSave: (file: File | undefined) => Promise<void>;
  toggleAudio: () => void;
  selectCharacter: (next: Character) => void;
  nextCustomer: () => void;
  movePlayer: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  moveCharacter: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  togglePlayerProtect: (entry: InventoryEntry) => void;
  trade: () => void;
  travel: (toMarketIndex: number) => void;
};

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
  importInputRef: RefObject<HTMLInputElement | null>;
  actions: MerchantActions;
};
