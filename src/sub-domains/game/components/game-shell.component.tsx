import type { CSSProperties, ReactNode } from "react";
import { CircleHelp, Volume2, VolumeX } from "lucide-react";
import { backdropAsset } from "@/lib/assets";
import { money } from "@/lib/format";
import { currentMarket } from "@/lib/game";
import { Button, IconButton, Muted } from "@/sub-domains/shared/components/ui";
import { ViewTabs } from "@/sub-domains/game/components/view-tabs.component";
import type { GameController } from "@/sub-domains/game/hooks/use-game-controller.hook";

export function GameShell({ controller, children }: { controller: GameController; children: ReactNode }) {
  const market = currentMarket(controller.state);

  return (
    <main
      className={`game-root ${controller.uiPreferences.decorativeMotion ? "" : "reduce-motion"} ${controller.uiPreferences.compactMode ? "is-compact-ui" : ""}`}
      style={{
        backgroundImage: `url("${backdropAsset(market.backdropFile)}")`,
        "--ui-scale-multiplier": controller.uiPreferences.uiScale / 100,
        "--typewriter-speed": controller.uiPreferences.textSpeed,
      } as CSSProperties}
    >
      <div className="game-viewport">
        <header className="game-topbar">
          <button className="game-brand" type="button" onClick={() => controller.setActiveView("main-menu")}>
            <span className="game-brand-kicker">{controller.merchantProfile.name} · Merchant Ledger</span>
            <h1 className="game-title">{market.name}</h1>
            <Muted className="game-subtitle">Day {controller.state.day} · {controller.merchantProfile.background} · stallage {money(market.stallage)} · {controller.activeView.replace("-", " ")}</Muted>
          </button>
          <div className="game-toolbar">
            <IconButton aria-label="Open controls" title="Controls" onClick={() => controller.setHelpOpen(true)}>
              <CircleHelp size={18} />
            </IconButton>
            <IconButton aria-label={controller.soundOn ? "Disable audio" : "Enable audio"} title={controller.soundOn ? "Disable audio" : "Enable audio"} onClick={controller.toggleSound}>
              {controller.soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </IconButton>
            <Button onClick={() => controller.setActiveView("main-menu")}>Menu</Button>
            <Button onClick={() => controller.setActiveView("system")}>System</Button>
          </div>
        </header>

        <ViewTabs activeView={controller.activeView} onChange={controller.setActiveView} />
        {children}
      </div>
    </main>
  );
}
