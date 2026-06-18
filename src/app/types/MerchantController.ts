import type { Dispatch, RefObject, SetStateAction } from "react";
import type { Character, InventoryEntry, Marketplace } from "@/data/types";
import type { GameState } from "@/lib/game";
import type { MoveAmount } from "@/lib/inventory";
import type { SaveSlotSummary } from "@/lib/save";
import type { DialogueEffect, DialogueNodeId } from "@/lib/dialogue";
import type { TravelStrategy } from "@/lib/travel-risk";

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
  | "event"
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
  saveGame: (slot?: number) => void;
  loadGame: (slot?: number) => void;
  exportSave: () => void;
  importSave: (file: File | undefined, slot?: number) => Promise<void>;
  toggleAudio: () => void;
  setMessage: (message: string) => void;
  speakWith: (character: Character, topic: string, reply: string, nextNode?: DialogueNodeId, effect?: DialogueEffect) => void;
  setQuestStatus: (marketIndex: number, status: GameState["questStates"][string]) => void;
  setContractStatus: (contractId: string, status: GameState["contractStates"][string]) => void;
  advanceDay: () => void;
  startAuction: () => void;
  bidAuction: () => void;
  passAuction: () => void;
  closeAuction: () => void;
  runHorseRace: (horseName: string, wager: number) => void;
  selectCharacter: (next: Character) => void;
  nextCustomer: () => void;
  movePlayer: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  moveCharacter: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  setPlayerOfferQuantity: (entry: InventoryEntry, quantity: number) => void;
  setCharacterOfferQuantity: (entry: InventoryEntry, quantity: number) => void;
  togglePlayerProtect: (entry: InventoryEntry) => void;
  togglePlayerConceal: (entry: InventoryEntry) => void;
  selectItem: (entry: InventoryEntry) => void;
  toggleItemHighlight: (entry: InventoryEntry) => void;
  setItemNote: (entry: InventoryEntry, note: string) => void;
  clearTradeOffers: () => void;
  undoLastOfferChange: () => void;
  askPrice: () => void;
  askOffer: () => void;
  goodbye: () => void;
  trade: () => void;
  travel: (toMarketIndex: number, strategy?: TravelStrategy) => void;
  clearTravelResult: () => void;
  deleteSave: (slot?: number) => void;
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
  saveSlots: SaveSlotSummary[];
  importInputRef: RefObject<HTMLInputElement | null>;
  actions: MerchantActions;
};
