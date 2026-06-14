import type { CSSProperties, ReactNode } from "react";
import { CircleHelp, Map as MapIcon, Menu, PackageSearch, Store, Users, Volume2, VolumeX } from "lucide-react";
import { backdropAsset } from "@/lib/assets";
import { money } from "@/lib/format";
import { currentMarket, items, visibleQuantity } from "@/lib/game";
import { Button, IconButton, Muted } from "@/sub-domains/shared/components/ui";
import type { GameController } from "@/sub-domains/game/hooks/use-game-controller.hook";

export function GameShell({ controller, children }: { controller: GameController; children: ReactNode }) {
  const market = currentMarket(controller.state);
  const isMainMenu = controller.activeView === "main-menu";
  const carriedEntries = controller.state.playerInventory.filter((entry) => visibleQuantity(entry) > 0);
  const cargoWeight = carriedEntries.reduce((total, entry) => total + items[entry.itemIndex].weight * visibleQuantity(entry), 0);
  const cargoValue = carriedEntries.reduce((total, entry) => total + items[entry.itemIndex].loafValue * visibleQuantity(entry), 0);

  return (
    <main
      className={`game-root ${isMainMenu ? "is-title-screen" : ""} ${controller.uiPreferences.decorativeMotion ? "" : "reduce-motion"} ${controller.uiPreferences.compactMode ? "is-compact-ui" : ""}`}
      style={{
        backgroundImage: `url("${backdropAsset(market.backdropFile)}")`,
        "--ui-scale-multiplier": controller.uiPreferences.uiScale / 100,
        "--typewriter-speed": controller.uiPreferences.textSpeed,
      } as CSSProperties}
    >
      <div className="game-viewport">
        {isMainMenu ? (
          children
        ) : (
          <>
            <header className="game-topbar core-game-topbar" aria-label="Game status">
              <button className="game-brand core-game-brand" type="button" onClick={() => controller.setActiveView("market")}> 
                <span className="game-brand-kicker">{controller.merchantProfile.name} · Merchant Ledger</span>
                <h1 className="game-title">{market.name}</h1>
                <Muted className="game-subtitle">{controller.merchantProfile.background} · stallage {money(market.stallage)}</Muted>
              </button>

              <dl className="core-status-strip" aria-label="Current merchant status">
                <div><dt>Day</dt><dd>{controller.state.day}</dd></div>
                <div><dt>Wealth</dt><dd>{money(cargoValue)}</dd></div>
                <div><dt>Carry</dt><dd>{cargoWeight}</dd></div>
                <div><dt>Goods</dt><dd>{carriedEntries.length}</dd></div>
              </dl>

              <nav className="game-toolbar core-page-actions" aria-label="Primary game pages">
                <Button subtle onClick={() => controller.setActiveView("market")}><Store size={16} /> Market</Button>
                <Button subtle onClick={() => controller.setActiveView("travel")}><MapIcon size={16} /> Map</Button>
                <Button subtle onClick={() => controller.setActiveView("customers")}><Users size={16} /> Customers</Button>
                <Button subtle onClick={() => controller.setActiveView("inventory")}><PackageSearch size={16} /> Inventory</Button>
                <IconButton aria-label="Open controls" title="Controls" onClick={() => controller.setHelpOpen(true)}>
                  <CircleHelp size={18} />
                </IconButton>
                <IconButton aria-label={controller.soundOn ? "Disable audio" : "Enable audio"} title={controller.soundOn ? "Disable audio" : "Enable audio"} onClick={controller.toggleSound}>
                  {controller.soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </IconButton>
                <Button onClick={() => controller.setActiveView("system")}><Menu size={16} /> Menu</Button>
              </nav>
            </header>

            {children}
          </>
        )}
      </div>
    </main>
  );
}
