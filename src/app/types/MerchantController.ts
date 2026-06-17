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
  | "journal"
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
  setMessage: (message: string) => void;
  speakWith: (character: Character, topic: string, reply: string) => void;
  setQuestStatus: (marketIndex: number, status: GameState["questStates"][string]) => void;
  selectCharacter: (next: Character) => void;
  nextCustomer: () => void;
  movePlayer: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  moveCharacter: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  setPlayerOfferQuantity: (entry: InventoryEntry, quantity: number) => void;
  setCharacterOfferQuantity: (entry: InventoryEntry, quantity: number) => void;
  togglePlayerProtect: (entry: InventoryEntry) => void;
  togglePlayerConceal: (entry: InventoryEntry) => void;
  clearTradeOffers: () => void;
  askPrice: () => void;
  askOffer: () => void;
  goodbye: () => void;
  trade: () => void;
  travel: (toMarketIndex: number) => void;
  clearTravelResult: () => void;
  deleteSave: () => void;
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
