import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { GameShell } from "@/app/components";
import { AppErrorBoundary } from "@/app/components/AppErrorBoundary";
import { useMerchantController } from "@/app/hooks/useMerchantController";
import type { GameView, MerchantProfile, UiPreferences } from "@/app/types";
import { HelpModal } from "@/components/HelpModal";
import { loadGame } from "@/lib/game";

const BarterConversationView = lazy(() => import("@/features/trade/BarterConversationView").then((module) => ({ default: module.BarterConversationView })));
const CompanyView = lazy(() => import("@/features/company/CompanyView").then((module) => ({ default: module.CompanyView })));
const CustomersView = lazy(() => import("@/features/customers/CustomersView").then((module) => ({ default: module.CustomersView })));
const EventView = lazy(() => import("@/features/events/EventView").then((module) => ({ default: module.EventView })));
const InventoryFilterView = lazy(() => import("@/features/inventory/InventoryFilterView").then((module) => ({ default: module.InventoryFilterView })));
const InventoryManagementView = lazy(() => import("@/features/inventory/InventoryManagementView").then((module) => ({ default: module.InventoryManagementView })));
const ItemDetailView = lazy(() => import("@/features/inventory/ItemDetailView").then((module) => ({ default: module.ItemDetailView })));
const JournalView = lazy(() => import("@/features/journal/JournalView").then((module) => ({ default: module.JournalView })));
const MainMenuView = lazy(() => import("@/features/menu/MainMenuView").then((module) => ({ default: module.MainMenuView })));
const MarketHubView = lazy(() => import("@/features/market/MarketHubView").then((module) => ({ default: module.MarketHubView })));
const NewMerchantProfileView = lazy(() => import("@/features/profile/NewMerchantProfileView").then((module) => ({ default: module.NewMerchantProfileView })));
const SaveLoadView = lazy(() => import("@/features/save-load/SaveLoadView").then((module) => ({ default: module.SaveLoadView })));
const SettingsView = lazy(() => import("@/features/settings/SettingsView").then((module) => ({ default: module.SettingsView })));
const StrategyDashboardView = lazy(() => import("@/features/strategy/StrategyDashboardView").then((module) => ({ default: module.StrategyDashboardView })));
const SystemMenuView = lazy(() => import("@/features/system/SystemMenuView").then((module) => ({ default: module.SystemMenuView })));
const TravelMapView = lazy(() => import("@/features/travel/TravelMapView").then((module) => ({ default: module.TravelMapView })));

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
  audioVolumes: {
    music: 80,
    ambient: 50,
    dialogue: 80,
    ui: 75,
    items: 70,
    events: 80,
    minigames: 80,
  },
};

const gameViews: GameView[] = [
  "main-menu",
  "new-profile",
  "load-game",
  "settings",
  "system",
  "strategy",
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
const passiveClockViews = new Set<GameView>(["market", "barter", "travel", "journal", "inventory", "inventory-filter", "item-detail", "company", "event", "customers", "strategy"]);
const sceneOverlayViews = new Set<GameView>(["customers", "journal", "inventory", "inventory-filter", "item-detail", "strategy"]);
const titleViews = new Set<GameView>(["main-menu", "new-profile", "load-game", "settings"]);

function SceneLoading() {
  return (
    <div className="grid min-h-0 flex-1 place-items-center bg-[#28190d] p-6 text-[#fff6d7]">
      <div className="rounded-sm border-2 border-[#b98b37] bg-[#3b260f]/90 px-6 py-4 text-center shadow-xl">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[#f1d48a]">Loading Scene</span>
        <strong className="mt-1 block font-display text-2xl">Preparing the stall...</strong>
      </div>
    </div>
  );
}

function initialView(): GameView {
  const view = new URLSearchParams(window.location.search).get("view");
  if (view === "system") return "main-menu";
  return gameViews.includes(view as GameView) ? (view as GameView) : "main-menu";
}

export function App() {
  const controller = useMerchantController();
  const [activeView, setActiveView] = useState<GameView>(() => initialView());
  const [merchantProfile, setMerchantProfile] = useState<MerchantProfile>(defaultMerchantProfile);
  const [uiPreferences, setUiPreferences] = useState<UiPreferences>(defaultUiPreferences);
  const [saveSeen, setSaveSeen] = useState(() => Boolean(loadGame()));
  const [packupSaveDay, setPackupSaveDay] = useState<number | null>(null);
  const [systemMenuOpen, setSystemMenuOpen] = useState(false);
  const advanceTimeRef = useRef(controller.actions.advanceTime);

  const hasSave = useMemo(() => saveSeen || Boolean(loadGame()), [saveSeen, controller.state.day]);
  const hasWaitingCustomer = useMemo(() => {
    const seenToday = controller.state.customerQueueDay === controller.state.day
      ? new Set(controller.state.seenCharacterIndexes)
      : new Set<number>();
    return controller.people.some((person) => !seenToday.has(person.index));
  }, [controller.people, controller.state.customerQueueDay, controller.state.day, controller.state.seenCharacterIndexes]);

  useEffect(() => {
    if (activeView !== "market" || controller.character || !hasWaitingCustomer) return;
    controller.actions.nextCustomer();
  }, [activeView, controller.actions, controller.character, hasWaitingCustomer]);

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

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      if (controller.helpOpen) {
        controller.actions.setHelpOpen(false);
        return;
      }
      if (systemMenuOpen) {
        setSystemMenuOpen(false);
        return;
      }
      if (!titleViews.has(activeView)) setSystemMenuOpen(true);
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [activeView, controller.actions, controller.helpOpen, systemMenuOpen]);

  function navigate(view: GameView) {
    if (view === "system") {
      setSystemMenuOpen(true);
      return;
    }
    setSystemMenuOpen(false);
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
      case "travel":
        return <TravelMapView state={controller.state} onEnterMarket={() => navigate("market")} onOpenJournal={() => navigate("journal")} onTravel={controller.actions.travel} onClearTravelResult={controller.actions.clearTravelResult} onToggleRouteBookmark={controller.actions.toggleRouteBookmark} onSetRouteNote={controller.actions.setRouteNote} onBuySupplies={controller.actions.buyCaravanSupplies} />;
      case "strategy":
        return <StrategyDashboardView state={controller.state} onNavigate={navigate} onSelectCustomer={(person) => { controller.actions.selectCharacter(person); navigate("barter"); }} onNextCustomer={controller.actions.nextCustomer} />;
      case "market":
        return renderMarketScene();
      case "customers":
        return <CustomersView state={controller.state} people={controller.people} selected={controller.character} onSelect={controller.actions.selectCharacter} onNext={controller.actions.nextCustomer} onNavigate={navigate} onSpeak={controller.actions.speakWith} />;
      case "journal":
        return <JournalView state={controller.state} onBack={() => navigate("market")} onNavigate={navigate} onSetQuestStatus={controller.actions.setQuestStatus} onSetContractStatus={controller.actions.setContractStatus} />;
      case "event":
        return <EventView state={controller.state} onBack={() => navigate("market")} onAdvanceDay={controller.actions.advanceDay} onStartAuction={controller.actions.startAuction} onBidAuction={controller.actions.bidAuction} onPassAuction={controller.actions.passAuction} onCloseAuction={controller.actions.closeAuction} onRunHorseRace={controller.actions.runHorseRace} onStartMythGame={controller.actions.startMythGame} onPlayMythCard={controller.actions.playMythCard} onCloseMythGame={controller.actions.closeMythGame} onStartDraft={controller.actions.startDraft} onPickDraftItem={controller.actions.pickDraftItem} onCloseDraft={controller.actions.closeDraft} onToggleMythDeckCard={controller.actions.toggleMythDeckCard} onSaveMythDeckPreset={controller.actions.saveMythDeckPreset} onLoadMythDeckPreset={controller.actions.loadMythDeckPreset} />;
      case "company":
        return <CompanyView state={controller.state} onBack={() => navigate("market")} onOpenWarehouse={controller.actions.openWarehouse} onDepositWarehouse={controller.actions.depositWarehouse} onWithdrawWarehouse={controller.actions.withdrawWarehouse} onBankDeposit={controller.actions.bankDeposit} onBankWithdraw={controller.actions.bankWithdraw} onTakeLoan={controller.actions.takeLoan} onRepayLoan={controller.actions.repayLoan} onStartShipment={controller.actions.startShipment} onRepairPackhorses={controller.actions.repairPackhorses} onUpgradeConcealment={controller.actions.upgradeConcealment} onBuyPermit={controller.actions.buyPermit} />;
      case "barter":
        return <BarterConversationView state={controller.state} character={controller.character} playerOffer={controller.playerOffer} characterOffer={controller.characterOffer} message={controller.state.message} onMovePlayer={controller.actions.movePlayer} onMoveCharacter={controller.actions.moveCharacter} onSetPlayerOfferQuantity={controller.actions.setPlayerOfferQuantity} onSetCharacterOfferQuantity={controller.actions.setCharacterOfferQuantity} onTogglePlayerProtect={controller.actions.togglePlayerProtect} onTrade={controller.actions.trade} onAskPrice={controller.actions.askPrice} onAskOffer={controller.actions.askOffer} onClearOffers={controller.actions.clearTradeOffers} onUndoOfferChange={controller.actions.undoLastOfferChange} onGoodbye={() => { controller.actions.goodbye(); navigate("market"); }} onHelp={() => controller.actions.setHelpOpen(true)} onSpeak={controller.actions.speakWith} />;
      case "inventory":
        return <InventoryManagementView state={controller.state} playerOffer={controller.playerOffer} onMovePlayer={controller.actions.movePlayer} onSetPlayerOfferQuantity={controller.actions.setPlayerOfferQuantity} onTogglePlayerProtect={controller.actions.togglePlayerProtect} onTogglePlayerConceal={controller.actions.togglePlayerConceal} onOpenFilter={() => navigate("inventory-filter")} onOpenItemDetail={(entry) => { controller.actions.selectItem(entry); navigate("item-detail"); }} onNavigate={navigate} onUnavailable={controller.actions.setMessage} />;
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
      <GameShell controller={controller} activeView={activeView} uiPreferences={uiPreferences}>
        <Suspense fallback={<SceneLoading />}>
          {sceneOverlayViews.has(activeView) ? (
            <div className="relative flex min-h-0 flex-1">
              <div className="pointer-events-none absolute inset-0 opacity-55 blur-[1px] saturate-75">{renderMarketScene()}</div>
              <div className="absolute inset-0 z-20 bg-black/45" />
              <div className="relative z-30 flex min-h-0 flex-1 p-2 lg:p-4">{view}</div>
            </div>
          ) : view}
          {systemMenuOpen ? (
            <SystemMenuView
              controller={controller}
              merchantProfile={merchantProfile}
              onResume={() => setSystemMenuOpen(false)}
              onLoadGame={() => navigate("load-game")}
              onSettings={() => navigate("settings")}
              onMainMenu={() => navigate("main-menu")}
              onSave={saveCurrent}
              onExport={controller.actions.exportSave}
              onNewGame={startFresh}
            />
          ) : null}
        </Suspense>
        {controller.helpOpen ? <HelpModal onClose={() => controller.actions.setHelpOpen(false)} /> : null}
      </GameShell>
    </AppErrorBoundary>
  );
}
