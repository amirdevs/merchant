import { Map } from "lucide-react";
import type { Marketplace } from "@/data/types";
import { routeAsset } from "@/lib/assets";
import { marketplaces } from "@/lib/game";
import { compactBiasText, routeLedger } from "@/lib/travel";
import { Panel } from "@/components/ui";
import { MarketMap } from "@/features/travel/components/MarketMap";

export function TravelPanel({ market, onTravel }: { market: Marketplace; onTravel: (marketIndex: number) => void }) {
  const routes = routeLedger(market, marketplaces);

  return (
    <Panel title={<span className="flex items-center gap-2"><Map size={18} /> Travel</span>}>
      <div className="grid gap-3">
        <MarketMap market={market} onTravel={onTravel} />

        <div className="grid grid-cols-2 gap-2 text-sm max-[760px]:grid-cols-1">
          <div className="border border-brass/35 bg-black/25 p-2">
            <strong className="text-brass">Current demand</strong>
            <p className="mt-1 text-parchment-muted">{compactBiasText(market, "demand")}</p>
          </div>
          <div className="border border-brass/35 bg-black/25 p-2">
            <strong className="text-brass">Current discounts</strong>
            <p className="mt-1 text-parchment-muted">{compactBiasText(market, "discount")}</p>
          </div>
        </div>

        <div className="grid gap-2">
          {routes.map(({ connection, to, days, tolls, demand, discounts }) => (
            <button
              key={`${market.index}-${connection.marketplaceIndex}-${connection.routeFile}`}
              className="grid grid-cols-[72px_1fr_auto] items-center gap-3 border border-brass bg-ember/95 p-2 text-left text-parchment hover:brightness-110 max-[640px]:grid-cols-1"
              onClick={() => onTravel(connection.marketplaceIndex)}
            >
              <img className="h-12 w-[72px] border border-brass/45 bg-black/30 object-cover" src={routeAsset(connection.routeFile)} alt="" />
              <span className="min-w-0">
                <strong className="block truncate">{to.name}</strong>
                <small className="block truncate text-parchment-muted">Demand: {demand}</small>
                <small className="block truncate text-parchment-muted">Discounts: {discounts}</small>
              </span>
              <span className="text-right text-sm text-parchment-muted">{days}d / {tolls} toll</span>
            </button>
          ))}
        </div>
      </div>
    </Panel>
  );
}
