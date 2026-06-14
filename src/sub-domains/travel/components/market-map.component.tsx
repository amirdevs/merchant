import type { Marketplace } from "@/data/types";
import { mapAsset } from "@/lib/assets";
import { marketplaces } from "@/lib/game";

export function MarketMap({ market, onTravel }: { market: Marketplace; onTravel: (marketIndex: number) => void }) {
  const connected = new Set(market.connections.map((connection) => connection.marketplaceIndex));

  return (
    <div className="market-map travel-v5-map">
      <img src={mapAsset()} alt="" />
      {marketplaces.map((place) => {
        if (!place.location) return null;
        const isCurrent = place.index === market.index;
        const isConnected = connected.has(place.index);
        return (
          <button
            key={place.index}
            className={`map-node travel-v5-node ${isCurrent ? "current" : isConnected ? "connected" : "locked"}`}
            style={{ top: `${place.location.top}%`, left: `${place.location.left}%` }}
            disabled={isCurrent || !isConnected}
            title={place.name}
            onClick={() => onTravel(place.index)}
          >
            <span>{place.name}</span>
          </button>
        );
      })}
    </div>
  );
}
