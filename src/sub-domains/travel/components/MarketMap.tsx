import type { currentMarket } from "../../../lib/game";
import { marketplaces } from "../../../lib/game";
import { mapAsset } from "../../../lib/assets";

export function MarketMap({ market, onTravel }: { market: ReturnType<typeof currentMarket>; onTravel: (marketIndex: number) => void }) {
  const connected = new Set(market.connections.map((connection) => connection.marketplaceIndex));

  return (
    <div className="market-map-frame">
      <img src={mapAsset()} alt="" />
      {marketplaces.map((place) => {
        if (!place.location) return null;
        const isCurrent = place.index === market.index;
        const isConnected = connected.has(place.index);
        return (
          <button
            key={place.index}
            className={isCurrent ? "map-pin map-pin-current" : isConnected ? "map-pin map-pin-connected" : "map-pin map-pin-muted"}
            style={{ top: `${place.location.top}%`, left: `${place.location.left}%` }}
            disabled={!isConnected}
            title={place.name}
            onClick={() => onTravel(place.index)}
          >
            {place.name}
          </button>
        );
      })}
    </div>
  );
}
