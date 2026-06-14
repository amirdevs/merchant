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
  onContinue,
  onNewMerchant,
  onLoadGame,
  onOpenTravel,
  onOpenBarter,
  onOpenInventory,
  onOpenSettings,
  onOpenSystem,
}: {
  state: GameState;
  market: Marketplace;
  merchantProfile: MerchantProfile;
  soundOn: boolean;
  onContinue: () => void;
  onNewMerchant: () => void;
  onLoadGame: () => void;
  onOpenTravel: () => void;
  onOpenBarter: () => void;
  onOpenInventory: () => void;
  onOpenSettings: () => void;
  onOpenSystem: () => void;
}) {
  return (
    <section className="main-menu-v6-screen">
      <div className="main-menu-v6-art" style={{ backgroundImage: `url("${townAsset(market.townsquareFile)}")` }}>
        <div className="main-menu-v6-masthead">
          <span className="game-brand-kicker">Merchant of the Six Kingdoms</span>
          <h2>Merchant Ledger</h2>
          <p>{merchantProfile.name} · {merchantProfile.background}. Buy low, bargain carefully, protect your pack, and move through the kingdoms before the market turns.</p>
        </div>

        <nav className="main-menu-v6-buttons" aria-label="Main menu actions">
          <button className="main-menu-v6-primary" type="button" onClick={onContinue}><strong>Continue</strong><span>Day {state.day} · {market.name}</span></button>
          <button type="button" onClick={onNewMerchant}><strong>New Merchant</strong><span>Create a fresh profile</span></button>
          <button type="button" onClick={onLoadGame}><strong>Load Game</strong><span>Local/imported saves</span></button>
          <button type="button" onClick={onOpenTravel}><strong>Travel Map</strong><span>Routes and markets</span></button>
          <button type="button" onClick={onOpenBarter}><strong>Barter Table</strong><span>Talk to customers</span></button>
          <button type="button" onClick={onOpenInventory}><strong>Inventory</strong><span>Inspect your goods</span></button>
          <button type="button" onClick={onOpenSettings}><strong>Settings</strong><span>Audio and interface</span></button>
          <button type="button" onClick={onOpenSystem}><strong>System</strong><span>Save, export, help</span></button>
        </nav>

        <aside className="main-menu-v6-savecard">
          <span className="game-brand-kicker">Current Save</span>
          <h3>{market.name}</h3>
          <dl>
            <div><dt>Merchant</dt><dd>{merchantProfile.name}</dd></div>
            <div><dt>Day</dt><dd>{state.day}</dd></div>
            <div><dt>Audio</dt><dd>{soundOn ? "On" : "Off"}</dd></div>
            <div><dt>Goods</dt><dd>{state.playerInventory.filter((entry) => visibleQuantity(entry) > 0).length}</dd></div>
          </dl>
          <Muted>{money(market.stallage)} stallage</Muted>
        </aside>
      </div>
    </section>
  );
}
