import { BookOpen, Building2, Map, PackageSearch, Users } from "lucide-react";
import type { Character, Marketplace } from "@/data/types";
import { townAsset } from "@/lib/assets";
import { money } from "@/lib/format";
import type { GameView } from "@/app/types";
import { Button, Panel } from "@/components/ui";

export function MarketHubView({ market, people, onNavigate }: { market: Marketplace; people: Character[]; onNavigate: (view: GameView) => void }) {
  return (
    <section className="grid w-full gap-5 rounded-3xl border-2 border-brass/60 bg-panel/90 p-5 shadow-2xl shadow-black/50 xl:grid-cols-[1.25fr_0.75fr]">
      <div className="grid min-h-[62vh] content-end overflow-hidden rounded-3xl border border-brass-soft/70 bg-cover bg-center p-5" style={{ backgroundImage: `linear-gradient(0deg, rgba(15,9,5,.92), rgba(15,9,5,.16)), url(\"${townAsset(market.townsquareFile)}\")` }}>
        <span className="text-[0.7rem] uppercase tracking-[0.32em] text-brass">Town Hub</span>
        <h1 className="font-display text-5xl text-parchment">{market.name}</h1>
        <p className="max-w-3xl text-parchment-muted">A practical hub for trading, travel planning, inventory review, and customer selection.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button onClick={() => onNavigate("customers")}><Users size={16} /> Customers</Button>
          <Button variant="secondary" onClick={() => onNavigate("barter")}><Building2 size={16} /> Barter</Button>
          <Button variant="secondary" onClick={() => onNavigate("travel")}><Map size={16} /> Travel Map</Button>
          <Button variant="secondary" onClick={() => onNavigate("inventory")}><PackageSearch size={16} /> Inventory</Button>
          <Button subtle><BookOpen size={16} /> Journal</Button>
          <Button subtle>Notice Board</Button>
        </div>
      </div>
      <aside className="grid gap-4">
        <Panel title="Market Status"><dl className="grid gap-2"><Stat label="Demand / discounts" value="Local hints" /><Stat label="Law warnings" value="No known illegal goods" /><Stat label="Stallage" value={money(market.stallage)} /><Stat label="Routes" value={market.connections.length} /><Stat label="Notable customers" value={people.length} /><Stat label="Active event" value={market.event?.name || "None"} /></dl></Panel>
        <Panel title="Customers / NPC Roster"><div className="grid gap-2">{people.slice(0, 4).map((person) => <button key={person.index} className="rounded-xl border border-brass-soft/60 bg-black/25 p-2 text-left text-sm" type="button" onClick={() => onNavigate("customers")}><strong>{person.name}</strong><span className="block text-parchment-muted">{person.profession}</span></button>)}</div></Panel>
        <Panel title="Local Services"><div className="grid grid-cols-2 gap-2"><Button subtle onClick={() => onNavigate("barter")}>Trade</Button><Button subtle>Company</Button><Button subtle onClick={() => onNavigate("inventory")}>Inventory</Button><Button subtle onClick={() => onNavigate("travel")}>Map</Button></div></Panel>
        <Panel title="Notice Board"><div className="grid gap-2 text-sm text-parchment-muted"><p>{market.quest?.todo || "No active quest notice in this town."}</p><p>{market.event?.scene || "Market gossip and price pressure will appear here."}</p></div><Button className="mt-4 w-full" subtle onClick={() => onNavigate("load-game")}><BookOpen size={16} /> Open Ledger</Button></Panel>
      </aside>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) { return <div className="flex items-center justify-between rounded-xl border border-brass-soft/50 bg-black/25 p-3"><dt className="text-brass">{label}</dt><dd>{value}</dd></div>; }
