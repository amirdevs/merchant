import type { Marketplace } from "@/data/types";
import { townAsset } from "@/lib/assets";
import { visibleQuantity, type GameState } from "@/lib/game";
import { money } from "@/lib/format";
import type { MerchantProfile } from "@/sub-domains/game/types/merchant-profile.type";
import { Muted } from "@/sub-domains/shared/components/ui";

export function MainMenuView({
  state,
  market,
  merchantProfile,
  soundOn,
  hasSave,
  onContinue,
  onNewMerchant,
  onLoadGame,
  onOpenSettings,
  onOpenSystem,
}: {
  state: GameState;
  market: Marketplace;
  merchantProfile: MerchantProfile;
  soundOn: boolean;
  hasSave: boolean;
  onContinue: () => void;
  onNewMerchant: () => void;
  onLoadGame: () => void;
  onOpenSettings: () => void;
  onOpenSystem: () => void;
}) {
  const goodsCount = state.playerInventory.filter((entry) => visibleQuantity(entry) > 0).length;

  return (
    <section className="main-menu-core-screen" aria-label="Title and main menu">
      <div className="main-menu-core-art" style={{ backgroundImage: `url("${townAsset(market.townsquareFile)}")` }}>
        <div className="main-menu-core-title">
          <span className="game-brand-kicker">Merchant of the Six Kingdoms</span>
          <h1>Merchant Ledger</h1>
          <Muted>offline medieval fantasy trading · v0.1</Muted>
        </div>

        <nav className="main-menu-core-actions" aria-label="Main menu actions">
          <button className="main-menu-core-primary" type="button" onClick={onContinue} disabled={!hasSave}>
            <strong>Continue</strong>
            <span>{hasSave ? `Day ${state.day} · ${market.name}` : "No local save yet"}</span>
          </button>
          <button type="button" onClick={onNewMerchant}><strong>New Game</strong><span>Create a merchant profile</span></button>
          <button type="button" onClick={onLoadGame}><strong>Load Game</strong><span>Save ledger and import/export</span></button>
          <button type="button" onClick={onOpenSettings}><strong>Settings</strong><span>Audio, display, accessibility</span></button>
          <button type="button" onClick={onOpenSystem}><strong>Exit</strong><span>Open system menu</span></button>
        </nav>

        <aside className="main-menu-core-savecard" aria-label="Current save summary">
          <span className="game-brand-kicker">Current Session</span>
          <h2>{merchantProfile.name}</h2>
          <dl>
            <div><dt>City</dt><dd>{market.name}</dd></div>
            <div><dt>Day</dt><dd>{state.day}</dd></div>
            <div><dt>Goods</dt><dd>{goodsCount}</dd></div>
            <div><dt>Audio</dt><dd>{soundOn ? "On" : "Off"}</dd></div>
          </dl>
          <Muted>{money(market.stallage)} stallage · {merchantProfile.background}</Muted>
        </aside>
      </div>
    </section>
  );
}
