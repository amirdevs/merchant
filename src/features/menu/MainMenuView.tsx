import type { ButtonHTMLAttributes } from "react";
import type { Marketplace } from "@/data/types";
import { townAsset } from "@/lib/assets";
import { money } from "@/lib/format";
import { visibleQuantity, type GameState } from "@/lib/game";
import type { MerchantProfile } from "@/app/types";
import { Button, Muted } from "@/components/ui";

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
    <section className="grid min-h-[calc(100dvh-2rem)] w-full overflow-hidden rounded-3xl border-2 border-brass/60 bg-cover bg-center shadow-2xl shadow-black/50" style={{ backgroundImage: `linear-gradient(90deg, rgba(18, 10, 5, 0.90), rgba(18, 10, 5, 0.36), rgba(18, 10, 5, 0.82)), url(\"${townAsset(market.townsquareFile)}\")` }}>
      <div className="grid gap-6 p-6 lg:grid-cols-[minmax(360px,0.92fr)_minmax(320px,0.55fr)] lg:p-10 xl:p-14">
        <div className="flex max-w-2xl flex-col justify-center">
          <span className="mb-3 text-[0.72rem] uppercase tracking-[0.38em] text-brass">Offline Fantasy Merchant RPG</span>
          <h1 className="font-display text-6xl leading-[0.95] text-parchment drop-shadow-2xl md:text-7xl xl:text-8xl"><span className="block">Merchant</span><span className="block text-brass">Ledger</span></h1>
          <Muted className="mt-4 text-base">Boone market build · local save · refactored Tailwind base</Muted>

          <nav className="mt-8 grid gap-3" aria-label="Main menu actions">
            <MenuCommand primary disabled={!hasSave} title="Continue" detail={hasSave ? `Day ${state.day} · ${market.name}` : "No local save yet"} onClick={onContinue} />
            <MenuCommand title="New Game" detail="Create a merchant profile" onClick={onNewMerchant} />
            <MenuCommand title="Load Game" detail="Save ledger, import and export" onClick={onLoadGame} />
            <MenuCommand title="Settings" detail="Audio, display, accessibility" onClick={onOpenSettings} />
            <MenuCommand title="Exit / System" detail="Pause menu and session commands" onClick={onOpenSystem} />
          </nav>
        </div>

        <aside className="self-center rounded-3xl border-2 border-brass/60 bg-panel/90 p-5 shadow-2xl shadow-black/50 backdrop-blur-sm" aria-label="Current save summary">
          <span className="text-[0.7rem] uppercase tracking-[0.3em] text-brass">Current Session</span>
          <h2 className="mt-2 font-display text-4xl">{merchantProfile.name}</h2>
          <dl className="mt-5 grid grid-cols-2 gap-3">
            <SummaryStat label="City" value={market.name} />
            <SummaryStat label="Day" value={state.day} />
            <SummaryStat label="Goods" value={goodsCount} />
            <SummaryStat label="Audio" value={soundOn ? "On" : "Off"} />
          </dl>
          <p className="mt-5 rounded-xl border border-brass-soft/60 bg-black/25 p-3 text-sm text-parchment-muted">{money(market.stallage)} stallage · {merchantProfile.background}</p>
          <Button className="mt-4 w-full" variant="secondary" onClick={onLoadGame}>Open Save Ledger</Button>
        </aside>
      </div>
    </section>
  );
}

function MenuCommand({ title, detail, primary, ...props }: { title: string; detail: string; primary?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={`group rounded-2xl border px-5 py-4 text-left shadow-xl transition disabled:cursor-not-allowed disabled:opacity-45 ${primary ? "border-brass bg-gradient-to-r from-ember to-panel" : "border-brass-soft/70 bg-panel/80 hover:border-brass hover:bg-ember/70"}`}>
      <strong className="block font-display text-2xl leading-none text-parchment">{title}</strong>
      <span className="mt-1 block text-sm text-parchment-muted group-hover:text-parchment">{detail}</span>
    </button>
  );
}

function SummaryStat({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-xl border border-brass-soft/50 bg-black/25 p-3"><dt className="text-[0.62rem] uppercase tracking-[0.22em] text-brass">{label}</dt><dd className="mt-1 font-display text-xl">{value}</dd></div>;
}
