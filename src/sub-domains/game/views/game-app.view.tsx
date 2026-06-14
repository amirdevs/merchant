import { HelpModal } from "@/sub-domains/shared/components/feedback/help-modal.component";
import { GameShell } from "@/sub-domains/game/components/game-shell.component";
import { useGameController } from "@/sub-domains/game/hooks/use-game-controller.hook";
import { MainMenuView } from "@/sub-domains/game/views/main-menu.view";
import { NewMerchantProfileView } from "@/sub-domains/game/views/new-merchant-profile.view";
import { LoadGameView } from "@/sub-domains/game/views/load-game.view";
import { SettingsView } from "@/sub-domains/game/views/settings.view";
import { SystemMenuView } from "@/sub-domains/game/views/system-menu.view";
import { UiAuditView } from "@/sub-domains/game/views/ui-audit.view";
import { MarketHubView } from "@/sub-domains/market/views/market-hub.view";
import { CustomersView } from "@/sub-domains/customer/views/customers.view";
import { BarterConversationView } from "@/sub-domains/barter/views/barter-conversation.view";
import { InventoryManagementView } from "@/sub-domains/inventory/views/inventory-management.view";
import { InventorySearchFilterView } from "@/sub-domains/inventory/views/inventory-search-filter.view";
import { ItemDetailPreviewView } from "@/sub-domains/inventory/views/item-detail-preview.view";
import { TravelMapView } from "@/sub-domains/travel/views/travel-map.view";

export function GameAppView() {
  const controller = useGameController();

  function renderActiveView() {
    if (controller.activeView === "main-menu") {
      return (
        <MainMenuView
          state={controller.state}
          market={controller.market}
          merchantProfile={controller.merchantProfile}
          soundOn={controller.soundOn}
          hasSave={controller.hasSave}
          onContinue={() => controller.setActiveView("market")}
          onNewMerchant={() => controller.setActiveView("new-profile")}
          onLoadGame={() => controller.setActiveView("load-game")}
          onOpenSettings={() => controller.setActiveView("settings")}
          onOpenSystem={() => controller.setActiveView("system")}
        />
      );
    }

    if (controller.activeView === "new-profile") {
      return <NewMerchantProfileView market={controller.market} merchantProfile={controller.merchantProfile} onCreate={controller.startNewGame} onBack={() => controller.setActiveView("main-menu")} />;
    }

    if (controller.activeView === "load-game") {
      return <LoadGameView state={controller.state} modStatus={controller.modStatus} onLoadLocal={controller.loadLocal} onExport={controller.exportSave} onImport={() => controller.importInputRef.current?.click()} onBack={() => controller.setActiveView("main-menu")} onOpenSettings={() => controller.setActiveView("settings")} />;
    }

    if (controller.activeView === "settings") {
      return <SettingsView soundOn={controller.soundOn} modStatus={controller.modStatus} uiPreferences={controller.uiPreferences} onUpdatePreferences={controller.updateUiPreferences} onToggleSound={controller.toggleSound} onBack={() => controller.setActiveView("main-menu")} onOpenSystem={() => controller.setActiveView("system")} />;
    }

    if (controller.activeView === "travel") {
      return <TravelMapView state={controller.state} market={controller.market} onTravel={controller.travel} />;
    }

    if (controller.activeView === "market") {
      return <MarketHubView state={controller.state} market={controller.market} people={controller.people} selectedIndex={controller.state.selectedCharacterIndex} onSelect={(person) => controller.selectCharacter(person, true)} onTravel={controller.travel} onOpenTravel={() => controller.setActiveView("travel")} onOpenInventory={() => controller.setActiveView("inventory")} onOpenCustomers={() => controller.setActiveView("customers")} />;
    }

    if (controller.activeView === "customers") {
      return <CustomersView state={controller.state} market={controller.market} people={controller.people} character={controller.character} playerOffer={controller.playerOffer} characterOffer={controller.characterOffer} onSelect={(person) => controller.selectCharacter(person)} onTrade={() => controller.setActiveView("barter")} onNextCustomer={controller.nextCustomer} />;
    }

    if (controller.activeView === "barter") {
      return <BarterConversationView state={controller.state} market={controller.market} people={controller.people} character={controller.character} playerOffer={controller.playerOffer} characterOffer={controller.characterOffer} modStatus={controller.modStatus} onMovePlayer={controller.movePlayer} onMoveCharacter={controller.moveCharacter} onTogglePlayerProtect={controller.togglePlayerProtect} onSelectCustomer={(person) => controller.selectCharacter(person)} onNextCustomer={controller.nextCustomer} onTrade={controller.trade} />;
    }

    if (controller.activeView === "inventory") {
      return <InventoryManagementView state={controller.state} playerOffer={controller.playerOffer} onMovePlayer={controller.movePlayer} onTogglePlayerProtect={controller.togglePlayerProtect} onOpenFilter={() => controller.setActiveView("inventory-filter")} onOpenItemDetail={() => controller.setActiveView("item-detail")} />;
    }

    if (controller.activeView === "inventory-filter") {
      return <InventorySearchFilterView state={controller.state} onBack={() => controller.setActiveView("inventory")} />;
    }

    if (controller.activeView === "item-detail") {
      return <ItemDetailPreviewView state={controller.state} market={controller.market} onBack={() => controller.setActiveView("inventory")} onMovePlayer={controller.movePlayer} onTogglePlayerProtect={controller.togglePlayerProtect} />;
    }

    if (controller.activeView === "ui-check") {
      return <UiAuditView state={controller.state} market={controller.market} merchantProfile={controller.merchantProfile} uiPreferences={controller.uiPreferences} onJump={controller.setActiveView} />;
    }

    return (
      <SystemMenuView
        state={controller.state}
        merchantProfile={controller.merchantProfile}
        modStatus={controller.modStatus}
        soundOn={controller.soundOn}
        onResume={() => controller.setActiveView("market")}
        onToggleSound={controller.toggleSound}
        onHelp={() => controller.setHelpOpen(true)}
        onNewGame={() => controller.setActiveView("new-profile")}
        onSave={controller.saveLocal}
        onLoad={controller.loadLocal}
        onExport={controller.exportSave}
        onImport={() => controller.importInputRef.current?.click()}
        onOpenSettings={() => controller.setActiveView("settings")}
        onMainMenu={() => controller.setActiveView("main-menu")}
        onOpenUiAudit={() => controller.setActiveView("ui-check")}
      />
    );
  }

  return (
    <GameShell controller={controller}>
      {renderActiveView()}
      <input
        ref={controller.importInputRef}
        className="hidden"
        type="file"
        accept="application/json,.json"
        onChange={(event) => {
          void controller.importSave(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
      {controller.helpOpen ? <HelpModal onClose={() => controller.setHelpOpen(false)} /> : null}
    </GameShell>
  );
}
