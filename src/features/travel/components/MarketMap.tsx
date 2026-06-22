import type { Marketplace } from "@/data/types";
import { mapAsset } from "@/lib/assets";
import { marketplaces } from "@/lib/game";

export function MarketMap({ market, onTravel }: { market: Marketplace; onTravel: (marketIndex: number) => void }) {
  const connected = new Set(market.connections.map((connection) => connection.marketplaceIndex));

  return (
    <div className="relative aspect-[2/1] overflow-hidden border border-brass/45 bg-black/35">
      <img className="h-full w-full object-cover opacity-80" src={mapAsset()} alt="" />
      {marketplaces.map((place) => {
        if (!place.location) return null;
        const isCurrent = place.index === market.index;
        const isConnected = connected.has(place.index);
        return (
          <button
            key={place.index}
            className={`absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border text-[0px] ${
              isCurrent ? "border-parchment bg-good" : isConnected ? "border-parchment bg-brass" : "border-brass/40 bg-panel/70"
            }`}
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
