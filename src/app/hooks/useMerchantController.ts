import { useEffect, useMemo, useRef, useState } from "react";
import type { Character, InventoryEntry } from "@/data/types";
import {
  charactersAtMarket,
  completeTrade,
  currentMarket,
  currentKingdom,
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
  preferencePercent,
  professions,
  saveGame,
  selectedCharacter,
  serializeGame,
  type GameState,
} from "@/lib/game";
import { setOfferQuantity, type MoveAmount } from "@/lib/inventory";
import { canPayCopperToll, inventoryTotals, spendCopperToll } from "@/lib/economy";
import { applyTravelRisks } from "@/lib/travel-risk";
import { appraiseOffer } from "@/lib/barter";
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

  function setPlayerOfferQuantity(entry: InventoryEntry, quantity: number) {
    playItemSound("page");
    update((draft) => {
      const actual = draft.playerInventory.find((item) => item.itemIndex === entry.itemIndex);
      if (actual) setOfferQuantity(actual, quantity);
    });
  }

  function setCharacterOfferQuantity(entry: InventoryEntry, quantity: number) {
    playItemSound("page");
    update((draft) => {
      const current = selectedCharacter(draft);
      const actual = current?.inventory.find((item) => item.itemIndex === entry.itemIndex);
      if (actual) setOfferQuantity(actual, quantity);
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

  function speakWith(character: Character, topic: string, reply: string) {
    playUiSound("menu_click");
    update((draft) => {
      draft.message = reply;
      draft.dialogueLog = [
        {
          day: draft.day,
          characterIndex: character.index,
          characterName: character.name,
          marketIndex: draft.marketIndex,
          topic,
          note: reply,
        },
        ...(draft.dialogueLog || []).filter((entry) => !(entry.characterIndex === character.index && entry.topic === topic && entry.note === reply)),
      ].slice(0, 80);
    });
  }

  function setQuestStatus(marketIndex: number, status: GameState["questStates"][string]) {
    update((draft) => {
      draft.questStates[String(marketIndex)] = status;
      const questName = marketplaces[marketIndex]?.quest?.name || "Quest";
      draft.message = `${questName}: ${status}.`;
    });
  }

  function clearTradeOffers() {
    playUiSound("pack_closed");
    update((draft) => {
      clearOffers(draft.playerInventory);
      const current = selectedCharacter(draft);
      if (current) clearOffers(current.inventory);
      draft.message = "Cleared both sides of the offer.";
      draft.offersMade = 0;
    });
  }

  function itemPreferenceScore(draft: GameState, current: Character, itemIndex: number) {
    const item = items[itemIndex];
    const profession = current.professionSlug ? professions[current.professionSlug] : undefined;
    const market = currentMarket(draft);
    const kingdom = currentKingdom(draft);
    const scoreBias = (biases: Array<{ tag: string; percent: number }> = []) =>
      biases.reduce((total, bias) => item.tags.includes(bias.tag) || item.name.toLowerCase() === bias.tag.toLowerCase() ? total + bias.percent : total, 0);
    const exotic = item.kingdomIndex !== null && item.kingdomIndex !== kingdom?.index ? 20 : 0;
    return preferencePercent(current, item) + scoreBias(profession?.bias) + scoreBias(market.bias) + scoreBias(kingdom?.bias) + exotic;
  }

  function acceptanceFor(draft: GameState, current: Character) {
    return appraiseOffer(
      offerValue(draft.playerInventory, current, "player", draft),
      offerValue(current.inventory, current, "character", draft),
      current
    );
  }

  function askPrice() {
    playUiSound("menu_click");
    update((draft) => {
      const current = selectedCharacter(draft);
      if (!current) {
        draft.message = "Choose a customer before asking for a price.";
        return;
      }
      const characterValue = offerValue(current.inventory, current, "character", draft);
      if (characterValue <= 0) {
        draft.message = `Select goods from ${current.name}'s stock first, then ask for the price.`;
        return;
      }

      clearOffers(draft.playerInventory);
      const avoid = current.inventory.filter((entry) => entry.offerQuantity > 0).length === 1
        ? current.inventory.find((entry) => entry.offerQuantity > 0)?.itemIndex
        : undefined;
      const candidates = draft.playerInventory
        .filter((entry) => entry.quantity > 0 && !entry.conceal && entry.itemIndex !== avoid)
        .sort((left, right) => itemPreferenceScore(draft, current, right.itemIndex) - itemPreferenceScore(draft, current, left.itemIndex));

      for (const entry of candidates) {
        const item = items[entry.itemIndex];
        if (item.tags.includes("packhorses") || item.tags.includes("storage") || item.tags.includes("cards")) continue;
        if (item.loafValue > characterValue) continue;
        while (entry.offerQuantity < entry.quantity) {
          entry.offerQuantity++;
          if (offerValue(draft.playerInventory, current, "player", draft) > characterValue) {
            draft.message = `${current.name} names a price from your goods.`;
            return;
          }
        }
      }

      clearOffers(draft.playerInventory);
      draft.message = characterValue < 5
        ? `${current.name} will not price such a small offer.`
        : `${current.name} cannot find a fair price from your visible goods.`;
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
      const playerValue = offerValue(draft.playerInventory, current, "player", draft);
      if (playerValue <= 0) {
        draft.message = "Select some of your goods first, then ask what they will offer.";
        return;
      }

      clearOffers(current.inventory);
      const avoid = draft.playerInventory.filter((entry) => entry.offerQuantity > 0).length === 1
        ? draft.playerInventory.find((entry) => entry.offerQuantity > 0)?.itemIndex
        : undefined;
      const candidates = current.inventory
        .filter((entry) => entry.quantity > 0 && entry.itemIndex !== avoid)
        .sort((left, right) => itemPreferenceScore(draft, current, left.itemIndex) - itemPreferenceScore(draft, current, right.itemIndex));

      for (const entry of candidates) {
        const item = items[entry.itemIndex];
        if (item.tags.includes("masks")) continue;
        if (item.loafValue > playerValue) continue;
        while (entry.offerQuantity < entry.quantity) {
          entry.offerQuantity++;
          if (offerValue(current.inventory, current, "character", draft) > playerValue) break;
        }
        if (offerValue(current.inventory, current, "character", draft) > 0) break;
      }

      while (offerValue(draft.playerInventory, current, "player", draft) > offerValue(current.inventory, current, "character", draft) * 3) {
        const offered = current.inventory.find((entry) => entry.offerQuantity > 0);
        if (!offered) break;
        offered.offerQuantity--;
      }

      const appraisal = acceptanceFor(draft, current);
      if (["great_deal", "good_deal", "fair_deal"].includes(appraisal) && current.inventory.some((entry) => entry.offerQuantity > 0)) {
        draft.message = `${current.name} makes a counteroffer.`;
        return;
      }

      clearOffers(current.inventory);
      draft.message = `${current.name} cannot match that offer with their stock.`;
    });
  }

  function goodbye() {
    playUiSound("menu_click");
    update((draft) => {
      clearOffers(draft.playerInventory);
      const current = selectedCharacter(draft);
      if (current) clearOffers(current.inventory);
      draft.selectedCharacterIndex = null;
      draft.offersMade = 0;
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
      if (!route) {
        draft.message = "No known route connects these markets.";
        return;
      }
      const cargo = inventoryTotals(draft.playerInventory, items);
      if (!cargo.canTravel) {
        draft.message = `Cargo is too heavy or bulky to travel. Carry ${cargo.weight}/${cargo.carryCapacity}, size ${cargo.size}/${cargo.sizeCapacity}.`;
        return;
      }
      if (!canPayCopperToll(draft.playerInventory, items, route.tolls)) {
        draft.message = `You need ${route.tolls} copper coins for the route toll.`;
        return;
      }
      const fromMarketName = currentMarket(draft).name;
      spendCopperToll(draft.playerInventory, items, route.tolls);
      draft.marketIndex = toMarketIndex;
      draft.day += route.travelDays || 1;
      draft.selectedCharacterIndex = null;
      const riskEvents = applyTravelRisks({
        inventory: draft.playerInventory,
        items,
        destination: marketplaces[toMarketIndex],
        kingdom: currentKingdom(draft),
        day: draft.day,
      });
      draft.travelResult = {
        fromMarketName,
        toMarketName: marketplaces[toMarketIndex].name,
        days: route.travelDays || 1,
        tolls: route.tolls,
        arrivalDay: draft.day,
        events: riskEvents.map((event) => event.message),
      };
      draft.message = riskEvents.length
        ? `Arrived in ${marketplaces[toMarketIndex].name}. ${riskEvents[0].message}`
        : `Paid ${route.tolls} copper toll and arrived in ${marketplaces[toMarketIndex].name}.`;
    });
  }

  function clearTravelResult() {
    update((draft) => {
      draft.travelResult = null;
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
      speakWith,
      setQuestStatus,
      selectCharacter,
      nextCustomer,
      movePlayer,
      moveCharacter,
      setPlayerOfferQuantity,
      setCharacterOfferQuantity,
      togglePlayerProtect,
      togglePlayerConceal,
      clearTradeOffers,
      askPrice,
      askOffer,
      goodbye,
      trade,
      travel,
      clearTravelResult,
      deleteSave,
    },
  };
}
