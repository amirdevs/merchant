import { Compass, PackageSearch, Route, Store, Users } from "lucide-react";
import type { Character, Marketplace } from "@/data/types";
import { portraitAsset, routeAsset, townAsset } from "@/lib/assets";
import { items, marketplaces, type GameState, visibleQuantity } from "@/lib/game";
import { money } from "@/lib/format";
import { compactBiasText, routeLedger } from "@/lib/travel";
import { Button, Panel } from "@/sub-domains/shared/components/ui";
import { MarketEconomyStrip } from "@/sub-domains/market/components/market-economy-strip.component";
import { QuestPanel } from "@/sub-domains/market/components/quest-panel.component";

export function MarketHubView({ state, market, people, selectedIndex, onSelect, onTravel, onOpenTravel, onOpenInventory, onOpenCustomers }: { state: GameState; market: Marketplace; people: Character[]; selectedIndex: number | null; onSelect: (character: Character) => void; onTravel: (marketIndex: number) => void; onOpenTravel: () => void; onOpenInventory: () => void; onOpenCustomers: () => void }) {
  const carriedEntries = state.playerInventory.filter((entry) => visibleQuantity(entry) > 0);
  const totalValue = carriedEntries.reduce((total, entry) => total + items[entry.itemIndex].loafValue * visibleQuantity(entry), 0);
  const totalWeight = carriedEntries.reduce((total, entry) => total + items[entry.itemIndex].weight * visibleQuantity(entry), 0);
  const routes = routeLedger(market, marketplaces).slice(0, 4);
  const featuredPeople = people.slice(0, 6);

  return (
    <section className="ui-screen market-v5-layout" aria-label="Market hub">
      <Panel className="market-v5-hero-panel" bodyClassName="p-0">
        <div className="market-v5-hero-art" style={{ backgroundImage: `url("${townAsset(market.townsquareFile)}")` }}>
          <div className="market-v5-hero-badge"><Store size={18} /><span>Westgate Market Hub</span></div>
          <div className="market-v5-hero-copy">
            <span className="game-brand-kicker">Current Market</span>
            <h2>{market.name}</h2>
            <p>Day {state.day}. Stallage {money(market.stallage)}. Watch the crowd, check demand, and choose the next customer before your route costs catch up.</p>
            <div className="market-v5-hero-actions"><Button onClick={onOpenCustomers}><Users size={16} /> Customers</Button><Button onClick={onOpenInventory}><PackageSearch size={16} /> Manage Goods</Button><Button onClick={onOpenTravel}><Compass size={16} /> Open Map</Button></div>
          </div>
        </div>
      </Panel>

      <Panel className="market-v5-ledger" title="Merchant Ledger" bodyClassName="market-v5-stat-grid">
        <span><small>Day</small><strong>{state.day}</strong></span>
        <span><small>Cash Value</small><strong>{money(totalValue)}</strong></span>
        <span><small>Cargo Weight</small><strong>{totalWeight}</strong></span>
        <span><small>Goods</small><strong>{carriedEntries.length}</strong></span>
      </Panel>

      <Panel className="market-v5-demand" title="Local Economy" bodyClassName="market-v5-economy-body">
        <MarketEconomyStrip title="Demand" text={compactBiasText(market, "demand")} />
        <MarketEconomyStrip title="Discounts" text={compactBiasText(market, "discount")} />
      </Panel>

      <Panel className="market-v5-customers" title={<span><Users size={18} /> Customers Waiting</span>}>
        <div className="market-v5-customer-row">
          {featuredPeople.map((person) => (
            <button key={person.index} className={`market-v5-customer ${selectedIndex === person.index ? "is-active" : ""}`} type="button" onClick={() => onSelect(person)}>
              <img src={portraitAsset(person.portraitFile)} alt="" />
              <strong>{person.name}</strong>
              <span>{person.profession || "Customer"}</span>
            </button>
          ))}
        </div>
        <div className="market-v5-panel-footer"><Button subtle onClick={onOpenCustomers}>View full customer roster</Button></div>
      </Panel>

      <QuestPanel market={market} />

      <Panel className="market-v5-routes" title={<span><Route size={18} /> Nearby Routes</span>}>
        <div className="travel-route-list compact market-v5-route-list">
          {routes.map(({ connection, to, days, tolls, demand, discounts }) => (
            <button key={`${market.index}-${connection.marketplaceIndex}-${connection.routeFile}`} className="travel-route market-v5-route" onClick={() => onTravel(connection.marketplaceIndex)}>
              <img src={routeAsset(connection.routeFile)} alt="" />
              <span className="min-w-0"><strong>{to.name}</strong><small>{days} days · {tolls} toll · demand {demand}</small><small>Discounts {discounts}</small></span>
            </button>
          ))}
        </div>
      </Panel>
    </section>
  );
}
