import { viewTabs } from "@/sub-domains/game/constants/game-view-tabs.constant";
import type { GameView } from "@/sub-domains/game/types/game-view.type";

export function ViewTabs({ activeView, onChange }: { activeView: GameView; onChange: (view: GameView) => void }) {
  return (
    <nav className="view-tabs" aria-label="Game sections">
      {viewTabs.map((tab) => (
        <button key={tab.view} className={`view-tab ${activeView === tab.view ? "is-active" : ""}`} type="button" onClick={() => onChange(tab.view)}>
          <strong>{tab.label}</strong>
          <span>{tab.helper}</span>
        </button>
      ))}
    </nav>
  );
}
