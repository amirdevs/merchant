import { Map } from "lucide-react";
import type { currentMarket } from "../../../lib/game";
import { marketplaces } from "../../../lib/game";
import { routeAsset } from "../../../lib/assets";
import { compactBiasText, routeLedger } from "../../../lib/travel";
import { Panel } from "../../../components/ui";
import { MarketMap } from "./MarketMap";

export function TravelPanel({ market, onTravel }: { market: ReturnType<typeof currentMarket>; onTravel: (marketIndex: number) => void }) {
  const routes = routeLedger(market, marketplaces);

  return (
    <Panel title={<span className="flex items-center gap-2"><Map size={18} /> Travel</span>}>
      <div className="travel-board">
        <MarketMap market={market} onTravel={onTravel} />

        <div className="travel-bias-grid">
          <div className="travel-bias-card">
            <strong>Current demand</strong>
            <p>{compactBiasText(market, "demand")}</p>
          </div>
          <div className="travel-bias-card">
            <strong>Current discounts</strong>
            <p>{compactBiasText(market, "discount")}</p>
          </div>
        </div>

        <div className="route-ledger-list">
          {routes.map(({ connection, to, days, tolls, demand, discounts }) => (
            <button key={`${market.index}-${connection.marketplaceIndex}-${connection.routeFile}`} className="route-ledger-card" onClick={() => onTravel(connection.marketplaceIndex)}>
              <img src={routeAsset(connection.routeFile)} alt="" />
              <span>
                <strong>{to.name}</strong>
                <small>Demand: {demand}</small>
                <small>Discounts: {discounts}</small>
              </span>
              <em>{days}d / {tolls} toll</em>
            </button>
          ))}
        </div>
      </div>
    </Panel>
  );
}
