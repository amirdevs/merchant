import { BookOpen, Building2, Map, PackageSearch, ScrollText, Users } from "lucide-react";
import type { Character, Marketplace } from "@/data/types";
import { money } from "@/lib/format";
import { uiAssets } from "@/lib/ui-assets";
import type { GameView } from "@/app/types";
import { Button, LedgerRow, Panel, ScreenFrame, StatChip } from "@/components/ui";

export function MarketHubView({ market, people, onNavigate }: { market: Marketplace; people: Character[]; onNavigate: (view: GameView) => void }) {
  const featuredPeople = people.slice(0, 5);

  return (
    <ScreenFrame backdrop={uiAssets.backplates.marketTown} overlay="light" contentClassName="p-3 lg:p-4">
      <div
        className="relative flex h-[calc(100dvh-13rem)] min-h-[520px] flex-1 overflow-hidden rounded-lg border-2 border-[#6f4b1f] bg-cover bg-center shadow-2xl shadow-black/45"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(255,244,206,.08), rgba(31,18,8,.20) 58%, rgba(18,10,4,.58)), url("${uiAssets.backplates.marketTown}")`,
          backgroundPosition: "center top",
        }}
      >
        <div className="absolute left-4 top-4 w-64 max-w-[42vw]">
          <Panel className="p-3" title="Market Status" variant="parchment">
            <h1 className="font-display text-3xl leading-none text-[#2b1a0b]">{market.name}</h1>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#7b5726]">Coastal Trade Hub</p>
            <dl className="grid gap-2">
              <StatChip label="Stallage" value={money(market.stallage)} icon={uiAssets.hud.goldCoin} />
              <StatChip label="Routes" value={market.connections.length} icon={uiAssets.hud.market} />
              <StatChip label="Customers" value={people.length} icon={uiAssets.hud.inventory} />
              <StatChip label="Event" value={market.event?.name || "None"} icon={uiAssets.hud.warning} />
            </dl>
          </Panel>
          <Panel className="mt-3 p-3" title="News and Tips" variant="parchment">
            <p className="text-sm leading-snug text-[#3b260f]">{market.quest?.todo || "Prices shift quickly near the harbor. Check customers before committing cargo."}</p>
          </Panel>
        </div>

        <div className="absolute right-4 top-6 w-72 max-w-[38vw]">
          <Panel className="p-3" title="Noble Customers" variant="parchment">
            <div className="grid gap-1.5">
              {featuredPeople.map((person, index) => (
                <LedgerRow
                  key={person.index}
                  className="py-1.5"
                  selected={index === 0}
                  title={person.name}
                  subtitle={person.profession}
                  trailing={<span className="text-[0.68rem] font-bold uppercase tracking-wide text-[#75501f]">Normal</span>}
                  onClick={() => onNavigate("customers")}
                />
              ))}
            </div>
            <Button className="mt-3 w-full" onClick={() => onNavigate("customers")}>View All</Button>
          </Panel>
        </div>

        <div className="absolute inset-x-4 bottom-4">
          <div
            className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2 rounded-md border-2 border-[#7f5b2a] p-2 shadow-2xl shadow-black/45"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.07), rgba(0,0,0,.28)), url("${uiAssets.nineSlice.textureWoodDark}")`,
              backgroundSize: "cover",
            }}
          >
            <Button onClick={() => onNavigate("barter")}><Building2 size={16} /> Trade</Button>
            <Button variant="secondary" onClick={() => onNavigate("customers")}><Users size={16} /> Customers</Button>
            <Button variant="secondary" onClick={() => onNavigate("inventory")}><PackageSearch size={16} /> Inventory</Button>
            <Button variant="secondary" onClick={() => onNavigate("travel")}><Map size={16} /> Map</Button>
            <Button subtle><ScrollText size={16} /> News</Button>
            <Button subtle><BookOpen size={16} /> Menu</Button>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}
