import { BookOpen, MapPinned } from "lucide-react";
import type { GameState } from "@/lib/game";
import { marketplaces } from "@/lib/game";
import { mapAsset, routeAsset } from "@/lib/assets";
import { money } from "@/lib/format";
import { Button, Panel } from "@/components/ui";

export function TravelMapView({ state, onTravel }: { state: GameState; onTravel: (marketIndex: number) => void }) {
  const market = marketplaces[state.marketIndex];
  return (
    <section className="grid w-full gap-5 rounded-3xl border-2 border-brass/60 bg-panel/90 p-5 shadow-2xl shadow-black/50 xl:grid-cols-[1.25fr_0.75fr]">
      <div className="relative min-h-[66vh] overflow-hidden rounded-3xl border border-brass-soft/70 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(244,234,209,.12), rgba(20,15,9,.52)), url(\"${mapAsset()}\")` }}>
        <div className="absolute left-[8%] top-[8%] rounded-full border-2 border-brass bg-panel/90 px-5 py-3 shadow-xl"><span className="text-[0.7rem] uppercase tracking-[0.25em] text-brass">Current</span><strong className="block font-display text-2xl">{market.name}</strong></div>
        {market.connections.map((connection, index) => {
          const destination = marketplaces[connection.marketplaceIndex];
          return <button key={destination.index} className="absolute rounded-full border-2 border-brass bg-ember px-4 py-2 font-bold shadow-xl transition hover:scale-105" style={{ left: `${22 + index * 17}%`, top: `${42 + (index % 2) * 18}%` }} type="button" onClick={() => onTravel(destination.index)}>{destination.name}</button>;
        })}
      </div>
      <Panel title="Selected Market">
        <div className="grid gap-2 text-sm">
          <Stat label="Name / kingdom" value={market.name} />
          <Stat label="Legal warnings" value="No locked contraband warning" />
          <Stat label="Demand / discounts" value="Route hints pending" />
          <Stat label="Quests / events" value={market.event?.name || market.quest?.todo || "None"} />
          <Stat label="Risk / capacity" value="Capacity check visible" />
        </div>
        <div className="mt-3 flex flex-wrap gap-2"><Button><MapPinned size={16} /> Enter Market</Button><Button subtle><BookOpen size={16} /> Journal</Button><Button subtle disabled>Skip Day</Button></div>
      </Panel>
      <Panel title="Route Ledger">
        <div className="grid gap-3">
          {market.connections.map((connection) => {
            const destination = marketplaces[connection.marketplaceIndex];
            return <article key={destination.index} className="rounded-xl border border-brass-soft/60 bg-black/25 p-3"><div className="flex items-center justify-between gap-3"><strong className="font-display text-xl">{destination.name}</strong><span className="rounded-full border border-brass-soft px-2 py-1 text-xs text-brass">{connection.travelDays} days</span></div><p className="mt-1 text-sm text-parchment-muted">Toll {money(connection.tolls)} · route asset {routeAsset(connection.routeFile) ? "linked" : "pending"}</p><Button className="mt-3 w-full" onClick={() => onTravel(destination.index)}><MapPinned size={16} /> Travel</Button></article>;
          })}
        </div>
      </Panel>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) { return <div className="flex items-center justify-between rounded-xl border border-brass-soft/50 bg-black/25 p-2"><span className="text-brass">{label}</span><strong>{value}</strong></div>; }
