import { useEffect, useMemo, useRef, useState } from "react";
import { GameShell } from "@/app/components";
import { AppErrorBoundary } from "@/app/components/AppErrorBoundary";
import { useMerchantController } from "@/app/hooks/useMerchantController";
import type { GameView, MerchantProfile, UiPreferences } from "@/app/types";
import { HelpModal } from "@/components/HelpModal";
import { CustomersView } from "@/features/customers/CustomersView";
import { CompanyView } from "@/features/company/CompanyView";
import { EventView } from "@/features/events/EventView";
import { InventoryFilterView } from "@/features/inventory/InventoryFilterView";
import { InventoryManagementView } from "@/features/inventory/InventoryManagementView";
import { ItemDetailView } from "@/features/inventory/ItemDetailView";
import { JournalView } from "@/features/journal/JournalView";
import { MarketHubView } from "@/features/market/MarketHubView";
import { MainMenuView } from "@/features/menu/MainMenuView";
import { NewMerchantProfileView } from "@/features/profile/NewMerchantProfileView";
import { SaveLoadView } from "@/features/save-load/SaveLoadView";
import { SettingsView } from "@/features/settings/SettingsView";
import { SystemMenuView } from "@/features/system/SystemMenuView";
import { BarterConversationView } from "@/features/trade/BarterConversationView";
import { TravelMapView } from "@/features/travel/TravelMapView";
import { loadGame } from "@/lib/game";

const defaultMerchantProfile: MerchantProfile = {
  name: "Arian Valecross",
  background: "Ledger Apprentice",
  difficulty: "Standard Market",
  starter: "Balanced Pack",
};

const defaultUiPreferences: UiPreferences = {
  uiScale: 100,
  textSpeed: 45,
  compactMode: false,
  decorativeMotion: true,
};

const gameViews: GameView[] = [
  "main-menu",
  "new-profile",
  "load-game",
  "settings",
  "system",
  "travel",
  "market",
  "customers",
  "journal",
  "event",
  "company",
  "barter",
  "inventory",
  "inventory-filter",
  "item-detail",
];
const passiveClockViews = new Set<GameView>(["market", "barter", "travel", "journal", "inventory", "inventory-filter", "item-detail", "company", "event", "customers"]);
const sceneOverlayViews = new Set<GameView>(["customers", "journal", "inventory", "inventory-filter", "item-detail", "system"]);

function initialView(): GameView {
  const view = new URLSearchParams(window.location.search).get("view");
  return gameViews.includes(view as GameView) ? (view as GameView) : "main-menu";
}

export function App() {
  const controller = useMerchantController();
  const [activeView, setActiveView] = useState<GameView>(() => initialView());
  const [merchantProfile, setMerchantProfile] = useState<MerchantProfile>(defaultMerchantProfile);
  const [uiPreferences, setUiPreferences] = useState<UiPreferences>(defaultUiPreferences);
  const [saveSeen, setSaveSeen] = useState(() => Boolean(loadGame()));
  const [packupSaveDay, setPackupSaveDay] = useState<number | null>(null);
  const advanceTimeRef = useRef(controller.actions.advanceTime);

  const hasSave = useMemo(() => saveSeen || Boolean(loadGame()), [saveSeen, controller.state.day]);
  const currentCustomerIsHere = controller.character ? controller.people.some((person) => person.index === controller.character?.index) : false;

  useEffect(() => {
    if (activeView !== "market" || currentCustomerIsHere || !controller.people.length) return;
    controller.actions.selectCharacter(controller.people[0]);
  }, [activeView, currentCustomerIsHere, controller.people, controller.actions]);

  useEffect(() => {
    if (packupSaveDay === null || controller.state.day < packupSaveDay) return;
    controller.actions.saveGame(0);
    setSaveSeen(true);
    setPackupSaveDay(null);
  }, [controller.state.day, controller.actions, packupSaveDay]);

  useEffect(() => {
    advanceTimeRef.current = controller.actions.advanceTime;
  }, [controller.actions.advanceTime]);

  useEffect(() => {
    if (!passiveClockViews.has(activeView)) return;
    const timer = window.setInterval(() => advanceTimeRef.current(5), 15000);
    return () => window.clearInterval(timer);
  }, [activeView]);

  function navigate(view: GameView) {
    setActiveView(view);
  }

  function createMerchant(profile: MerchantProfile) {
    setMerchantProfile(profile);
    controller.actions.newGame();
    setSaveSeen(false);
    setActiveView("market");
  }

  function saveCurrent(slot = 0) {
    controller.actions.saveGame(slot);
    setSaveSeen(true);
  }

  function loadCurrent(slot = 0) {
    controller.actions.loadGame(slot);
    setSaveSeen(true);
    setActiveView("market");
  }

  function startFresh() {
    controller.actions.newGame();
    setSaveSeen(false);
    setActiveView("new-profile");
  }

  function packupForMap() {
    setPackupSaveDay(controller.state.day + 1);
    controller.actions.advanceDay();
    setActiveView("travel");
  }

  function renderMarketScene() {
    return <MarketHubView state={controller.state} market={controller.market} people={controller.people} onNavigate={navigate} onSelectCustomer={(person) => { controller.actions.selectCharacter(person); navigate("barter"); }} onNextCustomer={controller.actions.nextCustomer} onPackup={packupForMap} onUnavailable={controller.actions.setMessage} />;
  }

  const view = (() => {
    switch (activeView) {
      case "main-menu":
        return <MainMenuView state={controller.state} market={controller.market} merchantProfile={merchantProfile} soundOn={controller.soundOn} hasSave={hasSave} onContinue={loadCurrent} onNewMerchant={() => navigate("new-profile")} onLoadGame={() => navigate("load-game")} onOpenSettings={() => navigate("settings")} onOpenSystem={() => navigate("system")} />;
      case "new-profile":
        return <NewMerchantProfileView market={controller.market} merchantProfile={merchantProfile} onCreate={createMerchant} onBack={() => navigate("main-menu")} />;
      case "load-game":
        return <SaveLoadView state={controller.state} merchantProfile={merchantProfile} saveSlots={controller.saveSlots} importInputRef={controller.importInputRef} onBack={() => navigate("main-menu")} onSave={saveCurrent} onLoad={loadCurrent} onExport={controller.actions.exportSave} onImport={(file, slot) => void controller.actions.importSave(file, slot)} onDelete={(slot) => { controller.actions.deleteSave(slot); setSaveSeen(false); }} onUnavailable={controller.actions.setMessage} />;
      case "settings":
        return <SettingsView soundOn={controller.soundOn} uiPreferences={uiPreferences} onToggleSound={controller.actions.toggleAudio} onChangePreferences={setUiPreferences} onBack={() => navigate("main-menu")} />;
      case "system":
        return <SystemMenuView onResume={() => navigate("market")} onLoadGame={() => navigate("load-game")} onSettings={() => navigate("settings")} onMainMenu={() => navigate("main-menu")} onSave={saveCurrent} onExport={controller.actions.exportSave} onNewGame={startFresh} />;
      case "travel":
        return <TravelMapView state={controller.state} onEnterMarket={() => navigate("market")} onOpenJournal={() => navigate("journal")} onTravel={controller.actions.travel} onClearTravelResult={controller.actions.clearTravelResult} onToggleRouteBookmark={controller.actions.toggleRouteBookmark} onSetRouteNote={controller.actions.setRouteNote} />;
      case "market":
        return renderMarketScene();
      case "customers":
        return <CustomersView state={controller.state} people={controller.people} selected={controller.character} onSelect={controller.actions.selectCharacter} onNext={controller.actions.nextCustomer} onNavigate={navigate} onSpeak={controller.actions.speakWith} />;
      case "journal":
        return <JournalView state={controller.state} onBack={() => navigate("market")} onSetQuestStatus={controller.actions.setQuestStatus} onSetContractStatus={controller.actions.setContractStatus} />;
      case "event":
        return <EventView state={controller.state} onBack={() => navigate("market")} onAdvanceDay={controller.actions.advanceDay} onStartAuction={controller.actions.startAuction} onBidAuction={controller.actions.bidAuction} onPassAuction={controller.actions.passAuction} onCloseAuction={controller.actions.closeAuction} onRunHorseRace={controller.actions.runHorseRace} onStartMythGame={controller.actions.startMythGame} onPlayMythCard={controller.actions.playMythCard} onCloseMythGame={controller.actions.closeMythGame} onStartDraft={controller.actions.startDraft} onPickDraftItem={controller.actions.pickDraftItem} onCloseDraft={controller.actions.closeDraft} onToggleMythDeckCard={controller.actions.toggleMythDeckCard} />;
      case "company":
        return <CompanyView state={controller.state} onBack={() => navigate("market")} onOpenWarehouse={controller.actions.openWarehouse} onDepositWarehouse={controller.actions.depositWarehouse} onWithdrawWarehouse={controller.actions.withdrawWarehouse} onBankDeposit={controller.actions.bankDeposit} onBankWithdraw={controller.actions.bankWithdraw} onTakeLoan={controller.actions.takeLoan} onRepayLoan={controller.actions.repayLoan} onStartShipment={controller.actions.startShipment} onRepairPackhorses={controller.actions.repairPackhorses} onUpgradeConcealment={controller.actions.upgradeConcealment} onBuyPermit={controller.actions.buyPermit} />;
      case "barter":
        return <BarterConversationView state={controller.state} character={controller.character} playerOffer={controller.playerOffer} characterOffer={controller.characterOffer} message={controller.state.message} onMovePlayer={controller.actions.movePlayer} onMoveCharacter={controller.actions.moveCharacter} onSetPlayerOfferQuantity={controller.actions.setPlayerOfferQuantity} onSetCharacterOfferQuantity={controller.actions.setCharacterOfferQuantity} onTogglePlayerProtect={controller.actions.togglePlayerProtect} onTrade={controller.actions.trade} onAskPrice={controller.actions.askPrice} onAskOffer={controller.actions.askOffer} onClearOffers={controller.actions.clearTradeOffers} onUndoOfferChange={controller.actions.undoLastOfferChange} onGoodbye={() => { controller.actions.goodbye(); navigate("market"); }} onHelp={() => controller.actions.setHelpOpen(true)} onSpeak={controller.actions.speakWith} />;
      case "inventory":
        return <InventoryManagementView state={controller.state} playerOffer={controller.playerOffer} onMovePlayer={controller.actions.movePlayer} onSetPlayerOfferQuantity={controller.actions.setPlayerOfferQuantity} onTogglePlayerProtect={controller.actions.togglePlayerProtect} onTogglePlayerConceal={controller.actions.togglePlayerConceal} onOpenFilter={() => navigate("inventory-filter")} onOpenItemDetail={(entry) => { controller.actions.selectItem(entry); navigate("item-detail"); }} onUnavailable={controller.actions.setMessage} />;
      case "inventory-filter":
        return <InventoryFilterView state={controller.state} onBack={() => navigate("inventory")} />;
      case "item-detail":
        return <ItemDetailView state={controller.state} market={controller.market} onBack={() => navigate("inventory")} onMovePlayer={controller.actions.movePlayer} onTogglePlayerProtect={controller.actions.togglePlayerProtect} onTogglePlayerConceal={controller.actions.togglePlayerConceal} onToggleHighlight={controller.actions.toggleItemHighlight} onSetNote={controller.actions.setItemNote} />;
      default:
        return null;
    }
  })();

  return (
    <AppErrorBoundary>
      <GameShell controller={controller} activeView={activeView} merchantProfile={merchantProfile} uiPreferences={uiPreferences} onNavigate={navigate}>
        {sceneOverlayViews.has(activeView) ? (
          <div className="relative flex min-h-0 flex-1">
            <div className="pointer-events-none absolute inset-0 opacity-55 blur-[1px] saturate-75">{renderMarketScene()}</div>
            <div className="absolute inset-0 z-20 bg-black/45" />
            <div className="relative z-30 flex min-h-0 flex-1 p-2 lg:p-4">{view}</div>
          </div>
        ) : view}
        {controller.helpOpen ? <HelpModal onClose={() => controller.actions.setHelpOpen(false)} /> : null}
      </GameShell>
    </AppErrorBoundary>
  );
}
