import type { Marketplace } from "@/data/types";
import type { GameState } from "@/lib/game";
import type { GameView } from "@/sub-domains/game/types/game-view.type";
import type { MerchantProfile } from "@/sub-domains/game/types/merchant-profile.type";
import type { UiPreferences } from "@/sub-domains/game/types/ui-preferences.type";
import { Panel } from "@/sub-domains/shared/components/ui";

const implementedScreens: Array<{ view: GameView; mockup: string; status: string; focus: string }> = [
  { view: "main-menu", mockup: "01_main_menu_8x.png", status: "implemented", focus: "title, save card, primary navigation" },
  { view: "new-profile", mockup: "02_new_merchant_profile_8x.png", status: "connected", focus: "profile paper, local persistence" },
  { view: "load-game", mockup: "03_load_game_8x.png", status: "connected", focus: "local save, import/export" },
  { view: "settings", mockup: "04_settings_8x.png", status: "connected", focus: "audio, UI scale, compact mode" },
  { view: "system", mockup: "05_system_menu_8x.png", status: "connected", focus: "save/load/help tools" },
  { view: "travel", mockup: "06_travel_map_8x.png", status: "implemented", focus: "map nodes, route ledger" },
  { view: "market", mockup: "07_westgate_market_hub_8x.png", status: "implemented", focus: "town hub, economy cards" },
  { view: "customers", mockup: "08_customers_8x.png", status: "implemented", focus: "customer board and dossier" },
  { view: "barter", mockup: "09_barter_conversation_main_8x.png", status: "core-ready", focus: "offer columns, portrait, dialogue" },
  { view: "inventory", mockup: "10_inventory_management_8x.png", status: "core-ready", focus: "search, filters, modal" },
];

const qaChecks = [
  "Resize Electron from 1920×1080 down to 1280×720 and confirm panels do not clip.",
  "Use number keys 1–7 to jump Market, Customers, Barter, Inventory, Travel, System, QA.",
  "Use M/I/B/C/T/Y/Q shortcuts for Menu, Inventory, Barter, Customers, Travel, System, QA.",
  "Use Ctrl/Cmd+S for local save and Ctrl/Cmd+O for save import.",
  "Open Inventory and inspect at least one item detail modal from the eye button.",
  "Open Barter and verify both offer columns remain scrollable at small heights.",
];

export function UiAuditView({ state, market, merchantProfile, uiPreferences, onJump }: { state: GameState; market: Marketplace; merchantProfile: MerchantProfile; uiPreferences: UiPreferences; onJump: (view: GameView) => void }) {
  return (
    <section className="ui-audit-screen ui-screen" aria-label="UI implementation QA board">
      <Panel className="ui-audit-hero" title="UI QA Board" bodyClassName="ui-audit-hero-body">
        <div><span className="game-brand-kicker">Patch 08 · responsive implementation board</span><h2>Compare, jump, resize, and inspect</h2><p>This board is a temporary developer page for checking how closely the React implementation follows the 12 UI mockups while staying dynamic and responsive.</p></div>
        <dl className="ui-audit-stats"><div><dt>Merchant</dt><dd>{merchantProfile.name}</dd></div><div><dt>Market</dt><dd>{market.name}</dd></div><div><dt>Day</dt><dd>{state.day}</dd></div><div><dt>Scale</dt><dd>{uiPreferences.uiScale}%</dd></div><div><dt>Compact</dt><dd>{uiPreferences.compactMode ? "On" : "Off"}</dd></div><div><dt>Motion</dt><dd>{uiPreferences.decorativeMotion ? "On" : "Off"}</dd></div></dl>
      </Panel>
      <div className="ui-audit-grid">
        <Panel title="Implemented screens" bodyClassName="ui-audit-screen-list">
          {implementedScreens.map((screen, index) => <button key={`${screen.view}-${screen.mockup}`} className="ui-audit-screen-row" type="button" onClick={() => onJump(screen.view)}><span className="ui-audit-number">{String(index + 1).padStart(2, "0")}</span><span className="ui-audit-copy"><strong>{screen.mockup}</strong><small>{screen.focus}</small></span><em>{screen.status}</em></button>)}
        </Panel>
        <Panel title="Responsive QA checklist" bodyClassName="ui-audit-checklist">{qaChecks.map((check) => <label key={check}><input type="checkbox" /> <span>{check}</span></label>)}</Panel>
        <Panel title="Keyboard shortcuts" bodyClassName="ui-audit-shortcuts"><kbd>1</kbd><span>Market</span><kbd>2</kbd><span>Customers</span><kbd>3</kbd><span>Barter</span><kbd>4</kbd><span>Inventory</span><kbd>5</kbd><span>Travel</span><kbd>6</kbd><span>System</span><kbd>7</kbd><span>QA board</span><kbd>M</kbd><span>Main Menu</span><kbd>Esc</kbd><span>System / back to market</span><kbd>?</kbd><span>Controls</span></Panel>
      </div>
    </section>
  );
}
