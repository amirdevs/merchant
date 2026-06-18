import { useEffect, useMemo, useRef, useState } from "react";
import type { Character, InventoryEntry } from "@/data/types";
import {
  charactersAtMarket,
  autoAskOffer,
  autoAskPrice,
  completeTrade,
  currentMarket,
  currentKingdom,
  clearOffers,
  deleteGameSave,
  importGame,
  items,
  kingdoms,
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
  travelToMarket,
  type GameState,
} from "@/lib/game";
import { setOfferQuantity, type MoveAmount } from "@/lib/inventory";
import { expireQuests, questCanComplete, questReward } from "@/lib/quests";
import { customerIntro } from "@/lib/dialogue";
import type { DialogueEffect, DialogueNodeId } from "@/lib/dialogue";
import { applyDialogueEffect } from "@/lib/dialogue-runtime";
import { audioEnabled, playAmbient, playItemSound, playUiSound, setAudioEnabled } from "@/lib/audio";
import type { MerchantController } from "@/app/types/MerchantController";
import { listSaveSlots } from "@/lib/save";
import { completeContract, expireContracts, resolveContract } from "@/lib/contracts";
import { createAuctionSession, passAuctionLot, placeAuctionBid } from "@/lib/auction";
import { eventIsActive } from "@/lib/events";
import { coinQuantity, spendCopperToll } from "@/lib/economy";
import { addInventory } from "@/lib/inventory";
import type { TravelStrategy } from "@/lib/travel-risk";
import { runHorseRace as calculateHorseRace } from "@/lib/racing";

export function useMerchantController(): MerchantController {
  const [state, setState] = useState<GameState>(() => loadGame() || newGame());
  const [helpOpen, setHelpOpen] = useState(false);
  const [modStatus, setModStatus] = useState("Loading mods...");
  const [soundOn, setSoundOn] = useState(() => audioEnabled());
  const [saveSlots, setSaveSlots] = useState(() => listSaveSlots());
  const importInputRef = useRef<HTMLInputElement>(null);
  const lastOfferSnapshotRef = useRef<{
    player: Array<[number, number]>;
    characterIndex: number | null;
    character: Array<[number, number]>;
  } | null>(null);

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

  function rememberOfferSnapshot(draft: GameState) {
    const current = selectedCharacter(draft);
    lastOfferSnapshotRef.current = {
      player: draft.playerInventory.map((entry) => [entry.itemIndex, entry.offerQuantity]),
      characterIndex: current?.index ?? null,
      character: current?.inventory.map((entry) => [entry.itemIndex, entry.offerQuantity]) || [],
    };
  }

  function restoreOfferQuantities(inventory: InventoryEntry[], snapshot: Array<[number, number]>) {
    for (const entry of inventory) {
      const found = snapshot.find(([itemIndex]) => itemIndex === entry.itemIndex);
      entry.offerQuantity = Math.max(0, Math.min(entry.quantity, found?.[1] || 0));
    }
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
      rememberOfferSnapshot(draft);
      const actual = draft.playerInventory.find((item) => item.itemIndex === entry.itemIndex);
      if (actual) moveOffer(actual, amount, isOfferPanel);
    });
  }

  function moveCharacter(entry: InventoryEntry, amount: MoveAmount, isOfferPanel = false) {
    playItemSound("page");
    update((draft) => {
      rememberOfferSnapshot(draft);
      const current = selectedCharacter(draft);
      const actual = current?.inventory.find((item) => item.itemIndex === entry.itemIndex);
      if (actual && current) moveOffer(actual, amount, isOfferPanel);
    });
  }

  function setPlayerOfferQuantity(entry: InventoryEntry, quantity: number) {
    playItemSound("page");
    update((draft) => {
      rememberOfferSnapshot(draft);
      const actual = draft.playerInventory.find((item) => item.itemIndex === entry.itemIndex);
      if (actual) setOfferQuantity(actual, quantity);
    });
  }

  function setCharacterOfferQuantity(entry: InventoryEntry, quantity: number) {
    playItemSound("page");
    update((draft) => {
      rememberOfferSnapshot(draft);
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

  function selectItem(entry: InventoryEntry) {
    update((draft) => {
      draft.selectedItemIndex = entry.itemIndex;
    });
  }

  function toggleItemHighlight(entry: InventoryEntry) {
    update((draft) => {
      const actual = draft.playerInventory.find((item) => item.itemIndex === entry.itemIndex);
      if (!actual) return;
      actual.highlighted = !actual.highlighted;
      draft.selectedItemIndex = actual.itemIndex;
      draft.message = actual.highlighted ? `${items[actual.itemIndex].name} highlighted.` : `${items[actual.itemIndex].name} highlight removed.`;
    });
  }

  function setItemNote(entry: InventoryEntry, note: string) {
    update((draft) => {
      const actual = draft.playerInventory.find((item) => item.itemIndex === entry.itemIndex);
      if (!actual) return;
      actual.note = note.slice(0, 500);
      draft.selectedItemIndex = actual.itemIndex;
      draft.message = `Updated note for ${items[actual.itemIndex].name}.`;
    });
  }

  function setMessage(message: string) {
    update((draft) => {
      draft.message = message;
    });
  }

  function speakWith(character: Character, topic: string, reply: string, nextNode?: DialogueNodeId, effect?: DialogueEffect) {
    playUiSound("menu_click");
    update((draft) => {
      if (nextNode) draft.dialogueNodes[String(character.index)] = nextNode;
      const effectMessage = applyDialogueEffect(draft, character, effect);
      draft.message = effectMessage ? `${reply} ${effectMessage}` : reply;
      draft.dialogueLog = [
        {
          day: draft.day,
          characterIndex: character.index,
          characterName: character.name,
          marketIndex: draft.marketIndex,
          topic,
          note: effectMessage ? `${reply} ${effectMessage}` : reply,
        },
        ...(draft.dialogueLog || []).filter((entry) => !(entry.characterIndex === character.index && entry.topic === topic && entry.note === reply)),
      ].slice(0, 80);
    });
  }

  function setQuestStatus(marketIndex: number, status: GameState["questStates"][string]) {
    update((draft) => {
      const market = marketplaces[marketIndex];
      if (status === "finished" && market?.quest && !questCanComplete(market, draft.playerInventory, items)) {
        draft.message = `${market.quest.name}: required quest items are still missing.`;
        return;
      }
      draft.questStates[String(marketIndex)] = status;
      if (status === "accepted" && draft.questAcceptedDays[String(marketIndex)] === undefined) {
        draft.questAcceptedDays[String(marketIndex)] = draft.day;
      }
      const questName = market?.quest?.name || "Quest";
      if (status === "finished" && market?.quest) {
        const reward = questReward(market, items);
        const copper = reward.copper;
        const copperItem = items.find((item) => item.name.toLowerCase() === "copper coins");
        if (copperItem) {
          const entry = draft.playerInventory.find((item) => item.itemIndex === copperItem.index);
          if (entry) entry.quantity += copper;
          else draft.playerInventory.push({ itemIndex: copperItem.index, quantity: copper, offerQuantity: 0 });
        }
        for (const itemReward of reward.items) {
          const entry = draft.playerInventory.find((item) => item.itemIndex === itemReward.itemIndex);
          if (entry) entry.quantity += itemReward.quantity;
          else draft.playerInventory.push({ itemIndex: itemReward.itemIndex, quantity: itemReward.quantity, offerQuantity: 0 });
        }
        const itemText = reward.items.length ? ` and ${reward.items.length} item reward${reward.items.length === 1 ? "" : "s"}` : "";
        draft.message = `${questName}: finished. Rewarded ${copper} copper${itemText}.`;
        return;
      }
      draft.message = `${questName}: ${status}.`;
    });
  }

  function setContractStatus(contractId: string, status: GameState["contractStates"][string]) {
    update((draft) => {
      const contract = resolveContract(contractId, marketplaces, kingdoms);
      if (!contract) {
        draft.message = "That contract is no longer available.";
        return;
      }
      if (status === "accepted") {
        draft.contractStates[contractId] = "accepted";
        draft.contractAcceptedDays[contractId] = draft.day;
        draft.message = `${contract.title} accepted. Deadline: day ${draft.day + contract.daysLimit}.`;
        return;
      }
      if (status === "completed") {
        const result = completeContract({
          contract,
          status: draft.contractStates[contractId] || "available",
          acceptedDay: draft.contractAcceptedDays[contractId],
          currentDay: draft.day,
          currentMarketIndex: draft.marketIndex,
          inventory: draft.playerInventory,
          items,
        });
        draft.contractStates[contractId] = result.ok ? "completed" : result.expired ? "failed" : draft.contractStates[contractId] || "available";
        draft.message = result.message;
        return;
      }
      draft.contractStates[contractId] = status;
      draft.message = `${contract.title}: ${status}.`;
    });
  }

  function advanceDay() {
    update((draft) => {
      draft.day += 1;
      const expiredContracts = expireContracts({
        states: draft.contractStates,
        acceptedDays: draft.contractAcceptedDays,
        currentDay: draft.day,
        markets: marketplaces,
        kingdoms,
      });
      const expiredQuests = expireQuests({
        states: draft.questStates,
        acceptedDays: draft.questAcceptedDays,
        currentDay: draft.day,
        markets: marketplaces,
      });
      const penalty = expiredContracts.reduce((total, contract) => total + contract.failurePenaltyCopper, 0);
      if (penalty) spendCopperToll(draft.playerInventory, items, penalty);
      const failures = [...expiredContracts.map((contract) => contract.title), ...expiredQuests.map((market) => market.quest?.name || "Quest")];
      draft.message = failures.length
        ? `Day ${draft.day}. Failed deadlines: ${failures.join(", ")}${penalty ? `. Up to ${penalty} copper paid in penalties.` : "."}`
        : `A day passes. It is now day ${draft.day}.`;
    });
  }

  function startAuction() {
    update((draft) => {
      const current = currentMarket(draft);
      if (!current.event?.name?.toLowerCase().includes("auction")) {
        draft.message = "There is no auction scheduled in this market.";
        return;
      }
      if (!eventIsActive(current, draft.day)) {
        draft.message = `${current.event.name} is not active today.`;
        return;
      }
      const deposit = typeof current.event.data?.depositAmount === "number" ? current.event.data.depositAmount : 0;
      if (!spendCopperToll(draft.playerInventory, items, deposit)) {
        draft.message = `You need ${deposit} copper for the auction deposit.`;
        return;
      }
      draft.auctionSession = createAuctionSession(current, items, draft.day);
      draft.message = deposit > 0 ? `Paid ${deposit} copper deposit. The auction begins.` : "The auction begins.";
    });
  }

  function bidAuction() {
    update((draft) => {
      const session = draft.auctionSession;
      if (!session) {
        draft.message = "Start an auction session first.";
        return;
      }
      const copper = coinQuantity(draft.playerInventory, items, "copper coins");
      const result = placeAuctionBid(session, copper);
      if (result.outcome === "won" && result.lot) {
        spendCopperToll(draft.playerInventory, items, result.cost);
        addInventory(draft.playerInventory, result.lot.itemIndex, result.lot.quantity);
        draft.message = `${result.message} Added ${items[result.lot.itemIndex].name} to inventory.`;
        return;
      }
      draft.message = result.message;
    });
  }

  function passAuction() {
    update((draft) => {
      if (!draft.auctionSession) {
        draft.message = "Start an auction session first.";
        return;
      }
      draft.message = passAuctionLot(draft.auctionSession);
    });
  }

  function closeAuction() {
    update((draft) => {
      draft.auctionSession = null;
      draft.message = "You leave the auction floor.";
    });
  }

  function runHorseRace(horseName: string, wager: number) {
    update((draft) => {
      const current = currentMarket(draft);
      if (!current.event?.name?.toLowerCase().includes("horse race") || !eventIsActive(current, draft.day)) {
        draft.message = "The horse race is not active here today.";
        return;
      }
      const safeWager = Math.max(1, Math.floor(wager));
      if (!spendCopperToll(draft.playerInventory, items, safeWager)) {
        draft.message = `You need ${safeWager} copper for that wager.`;
        return;
      }
      const result = calculateHorseRace(current, horseName, safeWager, draft.day);
      if (!result) {
        addInventory(draft.playerInventory, itemIndexByName("copper coins"), safeWager);
        draft.message = "That horse could not be entered.";
        return;
      }
      if (result.payout) addInventory(draft.playerInventory, itemIndexByName("copper coins"), result.payout);
      draft.raceResult = result;
      draft.message = result.placement === 1
        ? `${horseName} wins. Payout: ${result.payout} copper.`
        : `${horseName} finished in place ${result.placement}. The wager was lost.`;
    });
  }

  function clearTradeOffers() {
    playUiSound("pack_closed");
    update((draft) => {
      rememberOfferSnapshot(draft);
      clearOffers(draft.playerInventory);
      const current = selectedCharacter(draft);
      if (current) clearOffers(current.inventory);
      draft.message = "Cleared both sides of the offer.";
      draft.offersMade = 0;
    });
  }

  function undoLastOfferChange() {
    playUiSound("pack_closed");
    update((draft) => {
      const snapshot = lastOfferSnapshotRef.current;
      if (!snapshot) {
        draft.message = "No offer change to undo.";
        return;
      }
      restoreOfferQuantities(draft.playerInventory, snapshot.player);
      const current = snapshot.characterIndex === null ? null : draft.characters[snapshot.characterIndex];
      if (current) restoreOfferQuantities(current.inventory, snapshot.character);
      draft.message = "Restored the previous offer.";
      lastOfferSnapshotRef.current = null;
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
      rememberOfferSnapshot(draft);
      draft.message = autoAskPrice(draft, current);
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
      rememberOfferSnapshot(draft);
      draft.message = autoAskOffer(draft, current);
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

  function refreshSaveSlots() {
    setSaveSlots(listSaveSlots());
  }

  function deleteSave(slot = 0) {
    playUiSound("pack_closed");
    deleteGameSave(slot);
    refreshSaveSlots();
    update((draft) => {
      draft.message = `Deleted save slot ${slot + 1}.`;
    });
  }

  function travel(toMarketIndex: number, strategy: TravelStrategy = "comply") {
    playUiSound("map");
    update((draft) => {
      travelToMarket(draft, toMarketIndex, strategy);
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

  async function importSaveFile(file: File | undefined, slot = 0) {
    if (!file) return;
    playUiSound("pack_open");
    const imported = importGame(await file.text(), slot);
    if (!imported) {
      update((draft) => {
        draft.message = "Save import failed. The file was not a valid merchant save.";
      });
      return;
    }
    refreshSaveSlots();
    setState({ ...imported, message: `Imported save file into slot ${slot + 1}.` });
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
    saveSlots,
    importInputRef,
    actions: {
      setHelpOpen,
      newGame: () => setState(newGame()),
      saveGame: (slot = 0) => {
        playUiSound("pack_closed");
        saveGame(state, slot);
        refreshSaveSlots();
      },
      loadGame: (slot = 0) => {
        playUiSound("pack_open");
        setState(loadGame(slot) || state);
      },
      exportSave,
      importSave: importSaveFile,
      toggleAudio,
      setMessage,
      speakWith,
      setQuestStatus,
      setContractStatus,
      advanceDay,
      startAuction,
      bidAuction,
      passAuction,
      closeAuction,
      runHorseRace,
      selectCharacter,
      nextCustomer,
      movePlayer,
      moveCharacter,
      setPlayerOfferQuantity,
      setCharacterOfferQuantity,
      togglePlayerProtect,
      togglePlayerConceal,
      selectItem,
      toggleItemHighlight,
      setItemNote,
      clearTradeOffers,
      undoLastOfferChange,
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
