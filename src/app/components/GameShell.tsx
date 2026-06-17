import type { ReactNode } from "react";
import { CircleHelp, Map as MapIcon, Menu, PackageSearch, Store, Users, Volume2, VolumeX, type LucideIcon } from "lucide-react";
import { backdropAsset, townAsset } from "@/lib/assets";
import { money } from "@/lib/format";
import { items, visibleQuantity } from "@/lib/game";
import { uiAssets } from "@/lib/ui-assets";
import type { GameView, MerchantController, MerchantProfile, UiPreferences } from "@/app/types";
import { Button, HudResource, IconButton, Muted, TitleRibbon } from "@/components/ui";

const titleViews = new Set<GameView>(["main-menu", "new-profile", "load-game", "settings"]);

type GameShellProps = {
  controller: MerchantController;
  activeView: GameView;
  merchantProfile: MerchantProfile;
  uiPreferences: UiPreferences;
  onNavigate: (view: GameView) => void;
  children: ReactNode;
};

const navItems: Array<{ view: GameView; label: string; icon: LucideIcon }> = [
  { view: "market", label: "Market", icon: Store },
  { view: "travel", label: "Map", icon: MapIcon },
  { view: "customers", label: "Customers", icon: Users },
  { view: "inventory", label: "Inventory", icon: PackageSearch },
];

export function GameShell({ controller, activeView, merchantProfile, uiPreferences, onNavigate, children }: GameShellProps) {
  const isTitleArea = titleViews.has(activeView);
  const carriedEntries = controller.state.playerInventory.filter((entry) => visibleQuantity(entry) > 0);
  const cargoWeight = carriedEntries.reduce((total, entry) => total + items[entry.itemIndex].weight * visibleQuantity(entry), 0);
  const cargoValue = carriedEntries.reduce((total, entry) => total + items[entry.itemIndex].loafValue * visibleQuantity(entry), 0);
  const backgroundImage = isTitleArea ? townAsset(controller.market.townsquareFile) : backdropAsset(controller.market.backdropFile);

  return (
    <main
      className="min-h-dvh bg-ink bg-cover bg-center text-parchment"
      style={{ backgroundImage: `linear-gradient(90deg, rgba(15,9,5,.82), rgba(15,9,5,.18), rgba(15,9,5,.78)), url("${backgroundImage}")` }}
      data-view={activeView}
      data-ui-scale={uiPreferences.uiScale}
    >
      <div className="mx-auto flex min-h-dvh max-w-[1720px] flex-col gap-3 p-3 lg:p-4">
        {!isTitleArea ? (
          <header
            className="relative z-10 grid gap-3 rounded-lg border-2 border-[#7f5b2a] p-3 shadow-2xl shadow-black/45 xl:grid-cols-[minmax(280px,0.9fr)_1.2fr_auto]"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.08), rgba(0,0,0,.28)), url("${uiAssets.nineSlice.textureWoodDark}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <button className="rounded-md border border-[#caa45b]/60 bg-black/25 px-4 py-3 text-left transition hover:border-brass" type="button" onClick={() => onNavigate("market")}>
              <span className="block text-[0.68rem] uppercase tracking-[0.24em] text-brass">
                {merchantProfile.name} / {activeView.replace(/-/g, " ")}
              </span>
              <TitleRibbon className="mt-1 justify-start" size="sm">
                {controller.market.name}
              </TitleRibbon>
              <Muted className="mt-1 block text-xs">
                {merchantProfile.background} / stallage {money(controller.market.stallage)}
              </Muted>
            </button>

            <dl className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <HudResource icon={uiAssets.hud.day} label="Day" value={controller.state.day} />
              <HudResource icon={uiAssets.hud.wealth} label="Wealth" value={money(cargoValue)} />
              <HudResource icon={uiAssets.hud.weight} label="Carry" value={cargoWeight} />
              <HudResource icon={uiAssets.hud.inventory} label="Goods" value={carriedEntries.length} />
            </dl>

            <nav className="flex flex-wrap items-center justify-end gap-2" aria-label="Primary game pages">
              {navItems.map(({ view, label, icon: Icon }) => (
                <Button key={view} variant={activeView === view ? "primary" : "secondary"} onClick={() => onNavigate(view)}>
                  <Icon size={16} /> {label}
                </Button>
              ))}
              <IconButton aria-label="Open controls" title="Controls" onClick={() => controller.actions.setHelpOpen(true)}>
                <CircleHelp size={18} />
              </IconButton>
              <IconButton
                aria-label={controller.soundOn ? "Disable audio" : "Enable audio"}
                title={controller.soundOn ? "Disable audio" : "Enable audio"}
                onClick={controller.actions.toggleAudio}
              >
                {controller.soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </IconButton>
              <Button onClick={() => onNavigate("system")}>
                <Menu size={16} /> Menu
              </Button>
            </nav>
          </header>
        ) : null}

        <div className="relative z-10 flex min-h-0 flex-1">{children}</div>
      </div>
    </main>
  );
}
