import { Compass, Route } from "lucide-react";
import type { Marketplace } from "@/data/types";
import { routeAsset } from "@/lib/assets";
import { marketplaces, type GameState } from "@/lib/game";
import { compactBiasText, routeLedger } from "@/lib/travel";
import { Panel } from "@/sub-domains/shared/components/ui";
import { MarketEconomyStrip } from "@/sub-domains/market/components/market-economy-strip.component";
import { QuestPanel } from "@/sub-domains/market/components/quest-panel.component";
import { MarketMap } from "@/sub-domains/travel/components/market-map.component";

export function TravelMapView({ state, market, onTravel }: { state: GameState; market: Marketplace; onTravel: (marketIndex: number) => void }) {
  const routes = routeLedger(market, marketplaces);
  const bestRoute = routes[0];

  return (
    <section className="travel-v5-layout ui-screen" aria-label="Travel map">
      <Panel className="travel-v5-map-panel" bodyClassName="p-0">
        <div className="travel-v5-map-stage">
          <MarketMap market={market} onTravel={onTravel} />
          <div className="travel-v5-map-card"><span className="game-brand-kicker">Travel Planner</span><h2>{market.name}</h2><p>Day {state.day}. Routes are carved into the map board. Connected destinations are bright brass; locked cities stay dim.</p></div>
          <div className="travel-v5-compass"><Compass size={34} /><span>Routes</span></div>
        </div>
      </Panel>
      <aside className="travel-v5-side">
        <Panel title={<span><Route size={18} /> Route Ledger</span>}>
          <div className="travel-v5-route-stack">
            {routes.map(({ connection, to, days, tolls, demand, discounts }) => (
              <button key={`${market.index}-${connection.marketplaceIndex}-${connection.routeFile}`} className="travel-v5-route-card" type="button" onClick={() => onTravel(connection.marketplaceIndex)}>
                <img src={routeAsset(connection.routeFile)} alt="" />
                <span className="travel-v5-route-copy"><strong>{to.name}</strong><small>{days} days · {tolls} toll</small><em>Demand {demand} · Discounts {discounts}</em></span>
              </button>
            ))}
          </div>
        </Panel>
        <Panel title="Market Pressure" bodyClassName="travel-v5-pressure"><MarketEconomyStrip title="Demand" text={compactBiasText(market, "demand")} /><MarketEconomyStrip title="Discounts" text={compactBiasText(market, "discount")} />{bestRoute ? <div className="travel-v5-best-route"><strong>Suggested first check</strong><span>{bestRoute.to.name}</span></div> : null}</Panel>
        <QuestPanel market={market} />
      </aside>
    </section>
  );
}
