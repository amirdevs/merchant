import type { ReactNode } from "react";
import { Building2, Map, Menu, PackageSearch, ScrollText, Users } from "lucide-react";
import type { Character, Marketplace } from "@/data/types";
import { money } from "@/lib/format";
import { uiAssets } from "@/lib/ui-assets";
import type { GameView } from "@/app/types";
import { Button, LedgerRow, Panel, ScreenFrame, StatChip } from "@/components/ui";

export function MarketHubView({ market, people, onNavigate, onSelectCustomer }: { market: Marketplace; people: Character[]; onNavigate: (view: GameView) => void; onSelectCustomer: (person: Character) => void; onUnavailable: (message: string) => void }) {
  const featuredPeople = people.slice(0, 5);

  return (
    <ScreenFrame backdrop={uiAssets.backplates.marketTown} overlay="light" contentClassName="p-2 lg:p-3">
      <div
        className="relative flex min-h-[520px] flex-1 overflow-hidden rounded-sm border-2 border-[#b98b37] bg-cover bg-center shadow-2xl shadow-black/45"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(255,244,206,.02), rgba(31,18,8,.10) 56%, rgba(18,10,4,.64)), url("${uiAssets.backplates.marketTown}")`,
          backgroundPosition: "center top",
        }}
      >
        <div className="absolute left-4 top-4 w-[25rem] max-w-[42vw]">
          <Panel className="p-5" title="Market Status" variant="parchment">
            <h1 className="font-display text-5xl leading-none text-[#2b1a0b]">{market.name}</h1>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#7b5726]">Coastal Trade Hub</p>
            <dl className="grid gap-3 text-lg">
              <StatChip label="Stallage" value={money(market.stallage)} icon={uiAssets.hud.goldCoin} />
              <StatChip label="Routes" value={market.connections.length} icon={uiAssets.hud.market} />
              <StatChip label="Customers" value={people.length} icon={uiAssets.hud.inventory} />
              <StatChip label="Event" value={market.event?.name || "None"} icon={uiAssets.hud.warning} />
            </dl>
          </Panel>
          <Panel className="mt-4 p-4" title="News and Tips" variant="parchment">
            <p className="text-base leading-snug text-[#3b260f]">{market.quest?.todo || "Prices shift quickly near the harbor. Check customers before committing cargo."}</p>
          </Panel>
        </div>

        <div className="absolute right-4 top-auto bottom-24 w-[26rem] max-w-[38vw]">
          <Panel className="p-4" title="Notable Customers" variant="parchment">
            <div className="grid gap-2">
              {featuredPeople.map((person, index) => (
                <LedgerRow
                  key={person.index}
                  className="py-2"
                  selected={index === 0}
                  title={person.name}
                  subtitle={person.profession}
                  trailing={<span className="text-[0.68rem] font-bold uppercase tracking-wide text-[#75501f]">Normal</span>}
                  onClick={() => onSelectCustomer(person)}
                />
              ))}
            </div>
            <Button className="mt-3 w-full" onClick={() => onNavigate("customers")}>View All</Button>
          </Panel>
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <div
            className="mx-auto flex min-h-20 items-stretch justify-center gap-3 border-t-2 border-[#b98b37] px-6 py-2 shadow-2xl shadow-black/45"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.07), rgba(0,0,0,.28)), url("${uiAssets.nineSlice.textureWoodDark}")`,
              backgroundSize: "cover",
            }}
          >
            <MarketCommand icon={<Building2 size={34} />} label="Trade" onClick={() => onNavigate("barter")} />
            <MarketCommand icon={<Map size={34} />} label="Map" onClick={() => onNavigate("travel")} />
            <MarketCommand icon={<PackageSearch size={34} />} label="Inventory" onClick={() => onNavigate("inventory")} />
            <MarketCommand icon={<Users size={34} />} label="Customers" onClick={() => onNavigate("customers")} />
            <MarketCommand icon={<ScrollText size={34} />} label="Notice Board" onClick={() => onNavigate("journal")} />
            <MarketCommand icon={<Menu size={34} />} label="Menu" onClick={() => onNavigate("system")} />
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

function MarketCommand({ icon, label, onClick }: { icon: ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      className="grid h-16 w-32 place-items-center gap-0.5 rounded-sm border-2 border-[#d0a65a]/80 bg-cover bg-center px-3 py-1.5 font-display text-lg font-bold text-[#fff8d8] shadow-lg shadow-black/40 transition hover:-translate-y-0.5 hover:brightness-110 [text-shadow:0_1px_2px_rgba(0,0,0,.9)]"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.08), rgba(0,0,0,.52)), url("${uiAssets.nineSlice.textureWoodDark}")`,
      }}
      type="button"
      onClick={onClick}
    >
      <span className="text-[#ffd975] drop-shadow">{icon}</span>
      <span className="rounded-sm bg-black/25 px-2 py-0.5 leading-none">{label}</span>
    </button>
  );
}
