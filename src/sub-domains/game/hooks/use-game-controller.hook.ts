import { useMemo, useRef, useState } from "react";
import {
  charactersAtMarket,
  completeTrade,
  currentMarket,
  importGame,
  loadGame,
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
import { audioEnabled, playItemSound, playUiSound, setAudioEnabled } from "@/lib/audio";
import { customerIntro } from "@/lib/dialogue";
import type { Character, InventoryEntry } from "@/data/types";
import type { MoveAmount } from "@/lib/inventory";
import { usePersistedSetting } from "@/sub-domains/shared/hooks/use-persisted-setting.hook";
import { defaultMerchantProfile } from "@/sub-domains/game/constants/merchant-profile.constant";
import { defaultUiPreferences } from "@/sub-domains/game/constants/ui-preferences.constant";
import { useGameKeyboardShortcuts } from "@/sub-domains/game/hooks/use-game-keyboard-shortcuts.hook";
import { useGameMods } from "@/sub-domains/game/hooks/use-game-mods.hook";
import { useMarketAmbientAudio } from "@/sub-domains/game/hooks/use-market-ambient-audio.hook";
import type { GameView } from "@/sub-domains/game/types/game-view.type";
import type { MerchantProfile } from "@/sub-domains/game/types/merchant-profile.type";
import type { UiPreferences } from "@/sub-domains/game/types/ui-preferences.type";

export function useGameController() {
  const [state, setState] = useState<GameState>(() => loadGame() || newGame());
  const [activeView, setActiveView] = useState<GameView>("market");
  const [merchantProfile, setMerchantProfile] = usePersistedSetting("merchant-profile-v1", defaultMerchantProfile);
  const [uiPreferences, setUiPreferences] = usePersistedSetting("merchant-ui-preferences-v1", defaultUiPreferences);
  const [helpOpen, setHelpOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(() => audioEnabled());
  const importInputRef = useRef<HTMLInputElement | null>(null);

  const market = currentMarket(state);
  const people = useMemo(() => charactersAtMarket(state).slice(0, 18), [state]);
  const character = selectedCharacter(state);
  const playerOffer = offerValue(state.playerInventory, character, "player", state);
  const characterOffer = character ? offerValue(character.inventory, character, "character", state) : 0;
  const modStatus = useGameMods(setState);

  useMarketAmbientAudio(market);
  useGameKeyboardShortcuts({ activeView, character, importInputRef, setActiveView, setHelpOpen, state });

  function update(mutator: (draft: GameState) => void) {
    setState((current) => {
      const draft = structuredClone(current);
      mutator(draft);
      return draft;
    });
  }

  function updateUiPreferences(patch: Partial<UiPreferences>) {
    setUiPreferences((current) => ({ ...current, ...patch }));
  }

  function startNewGame(profile: MerchantProfile = merchantProfile) {
    playUiSound("menu_click");
    setMerchantProfile(profile);
    const fresh = newGame();
    fresh.message = `${profile.name} opens a new ledger as ${profile.background}. Starter plan: ${profile.starter}. Terms: ${profile.difficulty}.`;
    setState(fresh);
    setActiveView("market");
  }

  function selectCharacter(next: Character, openBarter = false) {
    playUiSound("menu_click");
    update((draft) => {
      draft.selectedCharacterIndex = next.index;
      draft.message = customerIntro(next);
    });
    if (openBarter) setActiveView("barter");
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

  function trade() {
    playUiSound("trade");
    setState((current) => completeTrade(current));
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
    setActiveView("market");
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

  async function importSave(file: File | undefined) {
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
    setActiveView("market");
  }

  function toggleSound() {
    const next = !soundOn;
    setSoundOn(next);
    setAudioEnabled(next);
    if (next) playUiSound("menu_click");
  }

  function saveLocal() {
    playUiSound("pack_closed");
    saveGame(state);
  }

  function loadLocal() {
    playUiSound("pack_open");
    setState(loadGame() || state);
  }

  return {
    activeView,
    character,
    characterOffer,
    exportSave,
    helpOpen,
    importInputRef,
    importSave,
    loadLocal,
    market,
    merchantProfile,
    modStatus,
    moveCharacter,
    movePlayer,
    nextCustomer,
    people,
    playerOffer,
    saveLocal,
    selectCharacter,
    setActiveView,
    setHelpOpen,
    soundOn,
    startNewGame,
    state,
    togglePlayerProtect,
    toggleSound,
    trade,
    travel,
    uiPreferences,
    updateUiPreferences,
  };
}

export type GameController = ReturnType<typeof useGameController>;
