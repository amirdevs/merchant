import type { ReactNode } from "react";
import { CircleHelp, Cog, Map as MapIcon, PackageSearch, ScrollText, Store, Users, Volume2, VolumeX, type LucideIcon } from "lucide-react";
import { backdropAsset, townAsset } from "@/lib/assets";
import { inventoryTotals } from "@/lib/economy";
import { money } from "@/lib/format";
import { items } from "@/lib/game";
import { uiAssets } from "@/lib/ui-assets";
import type { GameView, MerchantController, MerchantProfile, UiPreferences } from "@/app/types";
import { Button, HudResource, IconButton, Muted } from "@/components/ui";

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
  { view: "journal", label: "Journal", icon: ScrollText },
  { view: "inventory", label: "Inventory", icon: PackageSearch },
];

export function GameShell({ controller, activeView, merchantProfile, uiPreferences, onNavigate, children }: GameShellProps) {
  const isTitleArea = titleViews.has(activeView);
  const cargo = inventoryTotals(controller.state.playerInventory, items);
  const backgroundImage = isTitleArea ? townAsset(controller.market.townsquareFile) : backdropAsset(controller.market.backdropFile);

  return (
    <main
      className="min-h-dvh bg-ink bg-cover bg-center text-parchment"
      style={{ backgroundImage: `linear-gradient(90deg, rgba(15,9,5,.82), rgba(15,9,5,.18), rgba(15,9,5,.78)), url("${backgroundImage}")` }}
      data-view={activeView}
      data-ui-scale={uiPreferences.uiScale}
    >
      <div className="mx-auto flex min-h-dvh flex-col gap-2 p-2 lg:p-3">
        {!isTitleArea ? (
          <header
            className="relative z-10 grid min-h-16 items-center gap-2 rounded-sm border-2 border-[#b98b37] px-3 py-2 shadow-2xl shadow-black/45 xl:grid-cols-[minmax(260px,0.8fr)_1fr_auto]"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.06), rgba(0,0,0,.34)), url("${uiAssets.nineSlice.textureWoodDark}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <button className="grid min-h-12 grid-cols-[44px_1fr] items-center gap-3 rounded-sm border border-[#d0a65a]/55 bg-black/25 px-3 py-1.5 text-left transition hover:border-brass" type="button" onClick={() => onNavigate("market")}>
              <span className="grid h-11 w-11 place-items-center bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url("${uiAssets.core.circularEmblemHolder}")` }}>
                <img className="h-7 w-7 object-contain" src={uiAssets.hud.market} alt="" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[0.65rem] uppercase tracking-[0.22em] text-brass">{merchantProfile.name} / {activeView.replace(/-/g, " ")}</span>
                <span className="block truncate font-display text-2xl leading-none text-[#fff0bf]">{controller.market.name}</span>
                <Muted className="block truncate text-[0.68rem]">{merchantProfile.background} / stallage {money(controller.market.stallage)}</Muted>
              </span>
            </button>

            <dl className="grid grid-cols-5 gap-1.5">
              <HudResource icon={uiAssets.hud.day} label="Day" value={controller.state.day} />
              <HudResource icon={uiAssets.hud.wealth} label="Value" value={money(cargo.value)} />
              <HudResource icon={uiAssets.hud.weight} label="Carry" value={`${cargo.weight}/${cargo.carryCapacity}`} />
              <HudResource icon={uiAssets.hud.inventory} label="Pull" value={`${cargo.size}/${cargo.sizeCapacity}`} />
              <HudResource icon={uiAssets.hud.inventory} label="Goods" value={cargo.visibleEntries} />
            </dl>

            <nav className="flex flex-wrap items-center justify-end gap-1.5" aria-label="Primary game pages">
              {navItems.map(({ view, label, icon: Icon }) => (
                <Button key={view} size="sm" variant={activeView === view ? "primary" : "secondary"} onClick={() => onNavigate(view)}>
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
              <Button size="sm" onClick={() => onNavigate("system")}>
                <Cog size={16} /> Menu
              </Button>
            </nav>
          </header>
        ) : null}

        <div className="relative z-10 flex min-h-0 flex-1">{children}</div>
        {!isTitleArea && controller.state.message ? (
          <div className="pointer-events-none fixed bottom-3 left-3 z-50 max-w-xl rounded-sm border-2 border-[#b98b37]/80 bg-[#fff6d7]/95 px-4 py-2 text-sm font-bold text-[#2b1a0b] shadow-2xl shadow-black/40">
            {controller.state.message}
          </div>
        ) : null}
      </div>
    </main>
  );
}
