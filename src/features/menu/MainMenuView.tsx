import type { ButtonHTMLAttributes } from "react";
import type { Marketplace } from "@/data/types";
import { money } from "@/lib/format";
import { visibleQuantity, type GameState } from "@/lib/game";
import { uiAssets } from "@/lib/ui-assets";
import type { MerchantProfile } from "@/app/types";
import { Button, Muted, Panel, ScreenFrame, TitleRibbon } from "@/components/ui";

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
      <div className="grid gap-6 p-2 lg:grid-cols-[minmax(320px,0.52fr)_1fr_minmax(280px,0.38fr)] lg:p-6">
        <aside className="flex max-w-[430px] flex-col justify-center">
          <div className="mb-5 text-center lg:text-left">
            <div className="text-[0.68rem] uppercase tracking-[0.32em] text-[#ffe09a] drop-shadow">Offline Fantasy Merchant RPG</div>
            <h1 className="mt-3 font-display text-5xl leading-none text-[#ffeec4] drop-shadow-2xl md:text-6xl">
              <span className="block">Merchants</span>
              <span className="block text-brass">of Eudora</span>
            </h1>
            <Muted className="mt-2 block text-sm">Local save / painterly merchant UI build</Muted>
          </div>

          <nav className="grid gap-2" aria-label="Main menu actions">
            <MenuCommand disabled={!hasSave} title="Continue" detail={hasSave ? `Day ${state.day} / ${market.name}` : "No local save yet"} onClick={onContinue} />
            <MenuCommand title="New Game" detail="Create a merchant profile" onClick={onNewMerchant} />
            <MenuCommand title="Load Game" detail="Save ledger, import and export" onClick={onLoadGame} />
            <MenuCommand title="Settings" detail="Audio, display, accessibility" onClick={onOpenSettings} />
            <MenuCommand title="Exit" detail="Pause menu and session commands" onClick={onOpenSystem} />
          </nav>
        </aside>

        <div className="hidden lg:block" />

        <Panel className="self-center" title="Current Session" variant="parchment">
          <h2 className="font-display text-3xl leading-tight text-[#2b1a0c]">{merchantProfile.name}</h2>
          <p className="text-sm text-[color:var(--ui-muted)]">{merchantProfile.background}</p>
          <dl className="mt-4 grid grid-cols-2 gap-2">
            <SummaryStat label="City" value={market.name} />
            <SummaryStat label="Day" value={state.day} />
            <SummaryStat label="Goods" value={goodsCount} />
            <SummaryStat label="Audio" value={soundOn ? "On" : "Off"} />
          </dl>
          <p className="mt-4 rounded-md border border-[#9a7138]/60 bg-[#fff6d7]/45 p-3 text-sm text-[#4a3218]">
            {money(market.stallage)} stallage / {merchantProfile.difficulty}
          </p>
          <Button className="mt-4 w-full" variant="secondary" onClick={onLoadGame}>
            Open Save Ledger
          </Button>
        </Panel>
      </div>
    </ScreenFrame>
  );
}

function MenuCommand({ title, detail, ...props }: { title: string; detail: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" {...props} className="group text-left disabled:cursor-not-allowed disabled:opacity-45">
      <TitleRibbon className="w-full justify-start px-6 text-base transition group-hover:brightness-110" size="md">
        {title}
      </TitleRibbon>
      <span className="mt-1 block px-5 text-xs text-[#fff0bf] opacity-90 drop-shadow">{detail}</span>
    </button>
  );
}

function SummaryStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-[#9a7138]/55 bg-[#fff6d7]/45 p-3">
      <dt className="text-[0.62rem] uppercase tracking-[0.18em] text-[#75501f]">{label}</dt>
      <dd className="mt-1 truncate font-display text-lg text-[#26170a]">{value}</dd>
    </div>
  );
}
