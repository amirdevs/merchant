import { useEffect, useMemo, useRef, useState } from "react";
import type { Character, InventoryEntry } from "@/data/types";
import {
  charactersAtMarket,
  completeTrade,
  currentMarket,
  clearOffers,
  deleteGameSave,
  importGame,
  items,
  loadGame,
  loadMods,
  marketplaces,
  moveOffer,
  newGame,
  nextCustomerIndex,
  offerValue,
  saveGame,
  selectedCharacter,
  serializeGame,
  type GameState,
} from "@/lib/game";
import type { MoveAmount } from "@/lib/inventory";
import { customerIntro } from "@/lib/dialogue";
import { audioEnabled, playAmbient, playItemSound, playUiSound, setAudioEnabled } from "@/lib/audio";
import type { MerchantController } from "@/app/types/MerchantController";

export function useMerchantController(): MerchantController {
  const [state, setState] = useState<GameState>(() => loadGame() || newGame());
  const [helpOpen, setHelpOpen] = useState(false);
  const [modStatus, setModStatus] = useState("Loading mods...");
  const [soundOn, setSoundOn] = useState(() => audioEnabled());
  const importInputRef = useRef<HTMLInputElement>(null);

  const market = currentMarket(state);
  const people = useMemo(() => charactersAtMarket(state).slice(0, 18), [state]);
  const character = selectedCharacter(state);
  const playerOffer = offerValue(state.playerInventory, character, "player", state);
  const characterOffer = character ? offerValue(character.inventory, character, "character", state) : 0;

  useEffect(() => {
    let cancelled = false;
    loadMods().then((result) => {
      if (cancelled) return;
      setModStatus(result.loaded ? `Loaded mods: ${result.names.join(", ")}` : "No mods loaded");
      if (!loadGame()) setState(newGame());
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    playAmbient(market.ambiancePrimaryFile);
  }, [market.ambiancePrimaryFile]);

  function update(mutator: (draft: GameState) => void) {
    setState((current) => {
      const draft = structuredClone(current);
      mutator(draft);
      return draft;
    });
  }

  function selectCharacter(next: Character) {
    playUiSound("menu_click");
    update((draft) => {
      draft.selectedCharacterIndex = next.index;
      draft.message = customerIntro(next);
    });
  }

  function nextCustomer() {
    playUiSound("menu_click");
    update((draft) => {
      const nextIndex = nextCustomerIndex(draft);
      if (nextIndex === null) return;
      const next = draft.characters[nextIndex];
      draft.selectedCharacterIndex = next.index;
      draft.message = customerIntro(next);
    });
  }

  function movePlayer(entry: InventoryEntry, amount: MoveAmount, isOfferPanel = false) {
    playItemSound("page");
    update((draft) => {
      const actual = draft.playerInventory.find((item) => item.itemIndex === entry.itemIndex);
      if (actual) moveOffer(actual, amount, isOfferPanel);
    });
  }

  function moveCharacter(entry: InventoryEntry, amount: MoveAmount, isOfferPanel = false) {
    playItemSound("page");
    update((draft) => {
      const current = selectedCharacter(draft);
      const actual = current?.inventory.find((item) => item.itemIndex === entry.itemIndex);
      if (actual && current) moveOffer(actual, amount, isOfferPanel);
    });
  }

  function togglePlayerProtect(entry: InventoryEntry) {
    playUiSound("pack_closed");
    update((draft) => {
      const actual = draft.playerInventory.find((item) => item.itemIndex === entry.itemIndex);
      if (!actual) return;
      actual.protected = !actual.protected;
      if (actual.protected) actual.offerQuantity = 0;
    });
  }

  function togglePlayerConceal(entry: InventoryEntry) {
    playUiSound("pack_closed");
    update((draft) => {
      const actual = draft.playerInventory.find((item) => item.itemIndex === entry.itemIndex);
      if (!actual) return;
      actual.conceal = !actual.conceal;
      draft.message = actual.conceal ? "Item concealed in your ledger." : "Item revealed in your ledger.";
    });
  }

  function setMessage(message: string) {
    update((draft) => {
      draft.message = message;
    });
  }

  function clearTradeOffers() {
    playUiSound("pack_closed");
    update((draft) => {
      clearOffers(draft.playerInventory);
      const current = selectedCharacter(draft);
      if (current) clearOffers(current.inventory);
      draft.message = "Cleared both sides of the offer.";
    });
  }

  function askPrice() {
    playUiSound("menu_click");
    update((draft) => {
      const current = selectedCharacter(draft);
      if (!current) {
        draft.message = "Choose a customer before asking for a price.";
        return;
      }
      const value = offerValue(current.inventory, current, "character", draft);
      draft.message = value > 0
        ? `${current.name} values their selected goods at ${Math.ceil(value)} loaf value.`
        : `${current.name} has not placed anything in their offer yet.`;
    });
  }

  function askOffer() {
    playUiSound("menu_click");
    update((draft) => {
      const current = selectedCharacter(draft);
      if (!current) {
        draft.message = "Choose a customer before asking for an offer.";
        return;
      }
      const visible = current.inventory.filter((entry) => entry.quantity - entry.offerQuantity > 0);
      if (!visible.length) {
        draft.message = `${current.name} has nothing else to offer.`;
        return;
      }
      const next = visible
        .slice()
        .sort((left, right) => items[left.itemIndex].loafValue - items[right.itemIndex].loafValue)[0];
      next.offerQuantity = Math.min(next.quantity, next.offerQuantity + 1);
      draft.message = `${current.name} adds ${items[next.itemIndex].name} to their side.`;
    });
  }

  function goodbye() {
    playUiSound("menu_click");
    update((draft) => {
      clearOffers(draft.playerInventory);
      const current = selectedCharacter(draft);
      if (current) clearOffers(current.inventory);
      draft.selectedCharacterIndex = null;
      draft.message = "You step away from the bargaining table.";
    });
  }

  function trade() {
    playUiSound("trade");
    setState((current) => completeTrade(current));
  }

  function deleteSave() {
    playUiSound("pack_closed");
    deleteGameSave();
    update((draft) => {
      draft.message = "Deleted the local browser save.";
    });
  }

  function travel(toMarketIndex: number) {
    playUiSound("map");
    update((draft) => {
      const route = currentMarket(draft).connections.find((connection) => connection.marketplaceIndex === toMarketIndex);
      draft.marketIndex = toMarketIndex;
      draft.day += route?.travelDays || 1;
      draft.selectedCharacterIndex = null;
      draft.message = `Arrived in ${marketplaces[toMarketIndex].name}.`;
    });
  }

  function exportSave() {
    playUiSound("pack_open");
    const blob = new Blob([serializeGame(state)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `merchant-save-day-${state.day}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function importSaveFile(file: File | undefined) {
    if (!file) return;
    playUiSound("pack_open");
    const imported = importGame(await file.text());
    if (!imported) {
      update((draft) => {
        draft.message = "Save import failed. The file was not a valid merchant save.";
      });
      return;
    }
    setState({ ...imported, message: "Imported save file." });
  }

  function toggleAudio() {
    const next = !soundOn;
    setSoundOn(next);
    setAudioEnabled(next);
    if (next) playUiSound("menu_click");
  }

  return {
    state,
    market,
    people,
    character,
    playerOffer,
    characterOffer,
    modStatus,
    helpOpen,
    soundOn,
    importInputRef,
    actions: {
      setHelpOpen,
      newGame: () => setState(newGame()),
      saveGame: () => {
        playUiSound("pack_closed");
        saveGame(state);
      },
      loadGame: () => {
        playUiSound("pack_open");
        setState(loadGame() || state);
      },
      exportSave,
      importSave: importSaveFile,
      toggleAudio,
      setMessage,
      selectCharacter,
      nextCustomer,
      movePlayer,
      moveCharacter,
      togglePlayerProtect,
      togglePlayerConceal,
      clearTradeOffers,
      askPrice,
      askOffer,
      goodbye,
      trade,
      travel,
      deleteSave,
    },
  };
}
