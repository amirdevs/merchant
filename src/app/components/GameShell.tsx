import { useEffect, useMemo, useState, type ReactNode } from "react";
import { CircleHelp, Cog, Volume2, VolumeX } from "lucide-react";
import { backdropAsset, townAsset } from "@/lib/assets";
import { inventoryTotals } from "@/lib/economy";
import { money } from "@/lib/format";
import { items } from "@/lib/game";
import { uiAssets } from "@/lib/ui-assets";
import type { GameView, MerchantController, MerchantProfile, UiPreferences } from "@/app/types";
import { HudResource, IconButton, Muted } from "@/components/ui";

const titleViews = new Set<GameView>(["main-menu", "new-profile", "load-game", "settings"]);
const gameDayMinutes = 24 * 60;
const gameMinutesPerRealSecond = 1;

type GameShellProps = {
  controller: MerchantController;
  activeView: GameView;
  merchantProfile: MerchantProfile;
  uiPreferences: UiPreferences;
  onNavigate: (view: GameView) => void;
  children: ReactNode;
};

function clockFor(now: number) {
  const startAtEight = 8 * 60;
  const elapsedGameMinutes = Math.floor((now / 1000) * gameMinutesPerRealSecond);
  const totalMinutes = (startAtEight + elapsedGameMinutes) % gameDayMinutes;
  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  const label = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  const phase = hour < 5 ? "Deep Night" : hour < 8 ? "Dawn" : hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : hour < 20 ? "Dusk" : "Night";
  return { hour, minute, label, phase };
}

function lightingFor(hour: number, minute: number) {
  const t = hour + minute / 60;
  if (t < 5) {
    return {
      filter: "brightness(.56) saturate(.82) hue-rotate(12deg)",
      overlay: "linear-gradient(180deg, rgba(10,18,40,.48), rgba(8,12,26,.54)), radial-gradient(circle at 72% 12%, rgba(164,190,255,.16), transparent 28%)",
    };
  }
  if (t < 8) {
    return {
      filter: "brightness(.84) saturate(.98) hue-rotate(-6deg)",
      overlay: "linear-gradient(180deg, rgba(255,169,96,.24), rgba(80,128,180,.12) 45%, rgba(18,10,4,.18)), radial-gradient(circle at 18% 14%, rgba(255,213,134,.32), transparent 30%)",
    };
  }
  if (t < 12) {
    return {
      filter: "brightness(1.06) saturate(1.08)",
      overlay: "linear-gradient(180deg, rgba(255,236,174,.12), rgba(255,255,255,.04) 48%, rgba(18,10,4,.10)), radial-gradient(circle at 34% 10%, rgba(255,244,185,.26), transparent 26%)",
    };
  }
  if (t < 17) {
    return {
      filter: "brightness(1.12) saturate(1.05)",
      overlay: "linear-gradient(180deg, rgba(255,247,206,.10), rgba(255,255,255,.02) 52%, rgba(18,10,4,.12)), radial-gradient(circle at 54% 8%, rgba(255,246,205,.24), transparent 24%)",
    };
  }
  if (t < 20) {
    return {
      filter: "brightness(.88) saturate(1.12) sepia(.08)",
      overlay: "linear-gradient(180deg, rgba(255,130,76,.26), rgba(98,57,116,.18) 48%, rgba(18,10,4,.26)), radial-gradient(circle at 76% 18%, rgba(255,169,91,.34), transparent 30%)",
    };
  }
  return {
    filter: "brightness(.64) saturate(.86) hue-rotate(10deg)",
    overlay: "linear-gradient(180deg, rgba(12,22,48,.42), rgba(7,10,22,.50)), radial-gradient(circle at 78% 12%, rgba(178,199,255,.18), transparent 28%)",
  };
}

export function GameShell({ controller, activeView, merchantProfile, uiPreferences, onNavigate, children }: GameShellProps) {
  const [now, setNow] = useState(() => Date.now());
  const isTitleArea = titleViews.has(activeView);
  const cargo = inventoryTotals(controller.state.playerInventory, items);
  const backgroundImage = isTitleArea ? townAsset(controller.market.townsquareFile) : backdropAsset(controller.market.backdropFile);
  const clock = useMemo(() => clockFor(now), [now]);
  const lighting = useMemo(() => lightingFor(clock.hour, clock.minute), [clock.hour, clock.minute]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 15000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main
      className="relative min-h-dvh overflow-hidden bg-ink bg-cover bg-center text-parchment transition-[filter] duration-1000"
      style={{ backgroundImage: `linear-gradient(90deg, rgba(15,9,5,.82), rgba(15,9,5,.18), rgba(15,9,5,.78)), url("${backgroundImage}")` }}
      data-view={activeView}
      data-ui-scale={uiPreferences.uiScale}
    >
      {!isTitleArea ? (
        <div className="pointer-events-none absolute inset-0 z-0 transition-all duration-1000" style={{ backgroundImage: lighting.overlay, filter: lighting.filter }} aria-hidden="true" />
      ) : null}
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

            <dl className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
              <HudResource icon={uiAssets.hud.day} label="Day" value={controller.state.day} />
              <HudResource icon={uiAssets.hud.day} label={clock.phase} value={clock.label} />
              <HudResource icon={uiAssets.hud.wealth} label="Value" value={money(cargo.value)} />
              <HudResource icon={uiAssets.hud.weight} label="Carry" value={`${cargo.weight}/${cargo.carryCapacity}`} />
              <HudResource icon={uiAssets.hud.inventory} label="Pull" value={`${cargo.size}/${cargo.sizeCapacity}`} />
              <HudResource icon={uiAssets.hud.inventory} label="Goods" value={cargo.visibleEntries} />
            </dl>

            <nav className="flex flex-wrap items-center justify-end gap-1.5" aria-label="Scene controls">
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
              <IconButton aria-label="Open menu" title="Menu" onClick={() => onNavigate("system")}>
                <Cog size={18} />
              </IconButton>
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
