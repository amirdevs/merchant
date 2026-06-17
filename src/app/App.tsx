import { useMemo, useState } from "react";
import { GameShell } from "@/app/components";
import { useMerchantController } from "@/app/hooks/useMerchantController";
import type { GameView, MerchantProfile, UiPreferences } from "@/app/types";
import { HelpModal } from "@/components/HelpModal";
import { CustomersView } from "@/features/customers/CustomersView";
import { InventoryFilterView } from "@/features/inventory/InventoryFilterView";
import { InventoryManagementView } from "@/features/inventory/InventoryManagementView";
import { ItemDetailView } from "@/features/inventory/ItemDetailView";
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
  "barter",
  "inventory",
  "inventory-filter",
  "item-detail",
];

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

  const hasSave = useMemo(() => saveSeen || Boolean(loadGame()), [saveSeen, controller.state.day]);

  function navigate(view: GameView) {
    setActiveView(view);
  }

  function createMerchant(profile: MerchantProfile) {
    setMerchantProfile(profile);
    controller.actions.newGame();
    setSaveSeen(false);
    setActiveView("market");
  }

  function saveCurrent() {
    controller.actions.saveGame();
    setSaveSeen(true);
  }

  function loadCurrent() {
    controller.actions.loadGame();
    setSaveSeen(true);
    setActiveView("market");
  }

  function startFresh() {
    controller.actions.newGame();
    setSaveSeen(false);
    setActiveView("new-profile");
  }

  const view = (() => {
    switch (activeView) {
      case "main-menu":
        return <MainMenuView state={controller.state} market={controller.market} merchantProfile={merchantProfile} soundOn={controller.soundOn} hasSave={hasSave} onContinue={loadCurrent} onNewMerchant={() => navigate("new-profile")} onLoadGame={() => navigate("load-game")} onOpenSettings={() => navigate("settings")} onOpenSystem={() => navigate("system")} />;
      case "new-profile":
        return <NewMerchantProfileView market={controller.market} merchantProfile={merchantProfile} onCreate={createMerchant} onBack={() => navigate("main-menu")} />;
      case "load-game":
        return <SaveLoadView state={controller.state} merchantProfile={merchantProfile} importInputRef={controller.importInputRef} onBack={() => navigate("main-menu")} onSave={saveCurrent} onLoad={loadCurrent} onExport={controller.actions.exportSave} onImport={(file) => void controller.actions.importSave(file)} onDelete={() => { controller.actions.deleteSave(); setSaveSeen(false); }} onUnavailable={controller.actions.setMessage} />;
      case "settings":
        return <SettingsView soundOn={controller.soundOn} uiPreferences={uiPreferences} onToggleSound={controller.actions.toggleAudio} onChangePreferences={setUiPreferences} onBack={() => navigate("main-menu")} />;
      case "system":
        return <SystemMenuView onResume={() => navigate("market")} onLoadGame={() => navigate("load-game")} onSettings={() => navigate("settings")} onMainMenu={() => navigate("main-menu")} onSave={saveCurrent} onExport={controller.actions.exportSave} onNewGame={startFresh} />;
      case "travel":
        return <TravelMapView state={controller.state} onEnterMarket={() => navigate("market")} onOpenJournal={() => controller.actions.setMessage("Journal and quest ledger are not implemented yet.")} onTravel={(marketIndex) => { controller.actions.travel(marketIndex); navigate("market"); }} />;
      case "market":
        return <MarketHubView market={controller.market} people={controller.people} onNavigate={navigate} onSelectCustomer={(person) => { controller.actions.selectCharacter(person); navigate("barter"); }} onUnavailable={controller.actions.setMessage} />;
      case "customers":
        return <CustomersView people={controller.people} selected={controller.character} onSelect={controller.actions.selectCharacter} onNext={controller.actions.nextCustomer} onNavigate={navigate} onUnavailable={controller.actions.setMessage} />;
      case "barter":
        return <BarterConversationView state={controller.state} character={controller.character} playerOffer={controller.playerOffer} characterOffer={controller.characterOffer} message={controller.state.message} onMovePlayer={controller.actions.movePlayer} onMoveCharacter={controller.actions.moveCharacter} onSetPlayerOfferQuantity={controller.actions.setPlayerOfferQuantity} onSetCharacterOfferQuantity={controller.actions.setCharacterOfferQuantity} onTogglePlayerProtect={controller.actions.togglePlayerProtect} onTrade={controller.actions.trade} onAskPrice={controller.actions.askPrice} onAskOffer={controller.actions.askOffer} onClearOffers={controller.actions.clearTradeOffers} onGoodbye={() => { controller.actions.goodbye(); navigate("customers"); }} onHelp={() => controller.actions.setHelpOpen(true)} onUnavailable={controller.actions.setMessage} />;
      case "inventory":
        return <InventoryManagementView state={controller.state} playerOffer={controller.playerOffer} onMovePlayer={controller.actions.movePlayer} onSetPlayerOfferQuantity={controller.actions.setPlayerOfferQuantity} onTogglePlayerProtect={controller.actions.togglePlayerProtect} onOpenFilter={() => navigate("inventory-filter")} onOpenItemDetail={() => navigate("item-detail")} onUnavailable={controller.actions.setMessage} />;
      case "inventory-filter":
        return <InventoryFilterView state={controller.state} onBack={() => navigate("inventory")} />;
      case "item-detail":
        return <ItemDetailView state={controller.state} market={controller.market} onBack={() => navigate("inventory")} onMovePlayer={controller.actions.movePlayer} onTogglePlayerProtect={controller.actions.togglePlayerProtect} onTogglePlayerConceal={controller.actions.togglePlayerConceal} onUnavailable={controller.actions.setMessage} />;
      default:
        return null;
    }
  })();

  return (
    <GameShell controller={controller} activeView={activeView} merchantProfile={merchantProfile} uiPreferences={uiPreferences} onNavigate={navigate}>
      {view}
      {controller.helpOpen ? <HelpModal onClose={() => controller.actions.setHelpOpen(false)} /> : null}
    </GameShell>
  );
}
