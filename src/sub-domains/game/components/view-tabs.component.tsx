import { viewTabs } from "@/sub-domains/game/constants/game-view-tabs.constant";
import type { GameView } from "@/sub-domains/game/types/game-view.type";

/**
 * Developer-only page switcher.
 *
 * The first routing patch exposed this on every screen, which made the game feel
 * like one giant debug workspace. Normal gameplay must use the in-game header,
 * hub actions, system menu, and page-specific buttons instead.
 */
export function ViewTabs({ activeView, onChange }: { activeView: GameView; onChange: (view: GameView) => void }) {
  if (activeView !== "ui-check") return null;

  return (
    <nav className="view-tabs view-tabs-qa" aria-label="UI audit screen switcher">
      {viewTabs.map((tab) => (
        <button key={tab.view} className={`view-tab ${activeView === tab.view ? "is-active" : ""}`} type="button" onClick={() => onChange(tab.view)}>
          <strong>{tab.label}</strong>
          <span>{tab.helper}</span>
        </button>
      ))}
    </nav>
  );
}
