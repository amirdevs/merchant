import { useEffect, type ReactNode } from "react";
import { toast, ToastContainer } from "react-toastify";
import { backdropAsset, townAsset } from "@/lib/assets";
import type { GameView, MerchantController, UiPreferences } from "@/app/types";

const titleViews = new Set<GameView>(["main-menu", "new-profile", "load-game", "settings"]);
type GameShellProps = {
  controller: MerchantController;
  activeView: GameView;
  uiPreferences: UiPreferences;
  children: ReactNode;
};

function clockFor(timeOfDayMinutes: number) {
  const totalMinutes = ((Math.floor(timeOfDayMinutes) % 1440) + 1440) % 1440;
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

export function GameShell({ controller, activeView, uiPreferences, children }: GameShellProps) {
  const isTitleArea = titleViews.has(activeView);
  const backgroundImage = isTitleArea ? townAsset(controller.market.townsquareFile) : backdropAsset(controller.market.backdropFile);
  const clock = clockFor(controller.state.timeOfDayMinutes);
  const lighting = lightingFor(clock.hour, clock.minute);

  useEffect(() => {
    if (isTitleArea || !controller.state.message) return;
    if (toast.isActive("game-message")) {
      toast.update("game-message", { render: controller.state.message, autoClose: 4000 });
      return;
    }
    toast(controller.state.message, { toastId: "game-message" });
  }, [controller.state.message, isTitleArea]);

  return (
    <main
      className="relative h-dvh min-h-dvh overflow-hidden bg-ink bg-cover bg-center text-parchment transition-[filter] duration-1000"
      style={{ backgroundImage: `linear-gradient(90deg, rgba(15,9,5,.82), rgba(15,9,5,.18), rgba(15,9,5,.78)), url("${backgroundImage}")` }}
      data-view={activeView}
      data-ui-scale={uiPreferences.uiScale}
    >
      {!isTitleArea ? (
        <div className="pointer-events-none absolute inset-0 z-0 transition-all duration-1000" style={{ backgroundImage: lighting.overlay, filter: lighting.filter }} aria-hidden="true" />
      ) : null}
      <div className="mx-auto flex h-full min-h-0 flex-col p-0">
        <div className="relative z-10 flex min-h-0 flex-1">{children}</div>
      </div>
      <ToastContainer position="bottom-left" autoClose={4000} closeOnClick newestOnTop pauseOnFocusLoss={false} pauseOnHover theme="dark" limit={3} />
    </main>
  );
}
