import type { ButtonHTMLAttributes } from "react";
import type { Marketplace } from "@/shared/types/game-data";
import { visibleQuantity, type GameState } from "@/game/runtime/game";
import { uiAssets } from "@/shared/utils/ui-assets";
import type { MerchantProfile } from "@/app/types";
import { Muted, ScreenFrame } from "@/shared/components/ui";

type MainMenuViewProps = {
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
};

export function MainMenuView({ state, market, merchantProfile, soundOn, hasSave, onContinue, onNewMerchant, onLoadGame, onOpenSettings, onOpenSystem }: MainMenuViewProps) {
  const goodsCount = state.playerInventory.filter((entry) => visibleQuantity(entry) > 0).length;

  return (
    <ScreenFrame className="min-h-[calc(100dvh-1.5rem)]" contentClassName="justify-center" backdrop={uiAssets.backplates.mainMenuHarbor} overlay="light">
      <div className="grid min-h-[calc(100dvh-4rem)] items-center p-3 lg:grid-cols-[minmax(360px,0.4fr)_1fr] lg:p-8">
        <aside className="max-w-[520px]">
          <div className="mb-5 text-center lg:text-left">
            <div className="text-[0.72rem] uppercase tracking-[0.34em] text-[#ffe09a] drop-shadow">Offline Fantasy Merchant RPG</div>
            <h1 className="mt-3 font-display text-5xl leading-none text-[#ffeec4] drop-shadow-2xl md:text-6xl">
              <span className="block">Merchants</span>
              <span className="block text-brass">of Eudora</span>
            </h1>
            <Muted className="mt-2 block text-sm">Local save / painterly merchant UI build</Muted>
          </div>

          <nav className="grid gap-2.5" aria-label="Main menu actions">
            <MenuCommand disabled={!hasSave} title="Continue" detail={hasSave ? `Day ${state.day} / ${market.name}` : "No local save yet"} onClick={onContinue} />
            <MenuCommand title="New Game" detail="Create a merchant profile" onClick={onNewMerchant} />
            <MenuCommand title="Load Game" detail="Save ledger, import and export" onClick={onLoadGame} />
            <MenuCommand title="Settings" detail="Audio, display, accessibility" onClick={onOpenSettings} />
            <MenuCommand title="Exit" detail="Pause menu and session commands" onClick={onOpenSystem} />
          </nav>
        </aside>

        <div className="hidden lg:block" />
        <div className="absolute bottom-7 right-8 rounded-sm border border-[#d0a65a]/65 bg-black/45 px-5 py-2 font-display text-xl text-[#fff0bf] shadow-lg shadow-black/40">
          {merchantProfile.name} / Day {state.day} / {goodsCount} goods / {soundOn ? "Audio On" : "Audio Off"}
        </div>
      </div>
    </ScreenFrame>
  );
}

function MenuCommand({ title, detail, ...props }: { title: string; detail: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className="group min-h-16 rounded-sm border-2 border-[#d0a65a]/85 bg-cover bg-center px-8 py-2 text-center shadow-xl shadow-black/45 transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(255,248,225,.70), rgba(232,195,126,.46)), url("${uiAssets.core.buttonSecondaryParchment}")`,
      }}
    >
      <span className="block font-display text-2xl font-black leading-none text-[#160d05]">{title}</span>
      <span className="mt-1 block text-sm font-black text-[#5a3917]">{detail}</span>
    </button>
  );
}
