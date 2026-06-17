import { BookOpen, MapPinned } from "lucide-react";
import type { GameState } from "@/lib/game";
import { items, kingdoms, marketplaces } from "@/lib/game";
import { routeAsset } from "@/lib/assets";
import { canPayCopperToll, inventoryTotals } from "@/lib/economy";
import { inventoryIllegalEntries } from "@/lib/legal";
import { money } from "@/lib/format";
import { uiAssets } from "@/lib/ui-assets";
import { Button, LedgerRow, Panel, ScreenFrame, StatChip, TitleRibbon } from "@/components/ui";

export function TravelMapView({ state, onTravel, onEnterMarket, onOpenJournal }: { state: GameState; onTravel: (marketIndex: number) => void; onEnterMarket: () => void; onOpenJournal: () => void }) {
  const market = marketplaces[state.marketIndex];
  const cargo = inventoryTotals(state.playerInventory, items);
  const currentKingdom = kingdoms[market.kingdomIndex];
  const currentIllegal = inventoryIllegalEntries(state.playerInventory, items, currentKingdom?.illegalItemTags || []);
  return (
    <ScreenFrame title="Travel Map" eyebrow="Market Planner" backdrop={uiAssets.backplates.travelMap} overlay="light">
      <div className="grid flex-1 gap-4 xl:grid-cols-[1.2fr_380px]">
        <div className="relative min-h-[65vh] overflow-hidden rounded-lg border-2 border-[#7f5b2a] bg-cover bg-center shadow-2xl shadow-black/40" style={{ backgroundImage: `linear-gradient(rgba(255,244,210,.08), rgba(44,25,9,.12)), url("${uiAssets.backplates.travelMap}")` }}>
          <div className="absolute left-[5%] top-[5%] rounded-md border-2 border-[#7f5b2a] bg-[#f2ddb1]/92 p-3 text-[#26170a] shadow-xl">
            <span className="text-[0.65rem] uppercase tracking-[0.22em] text-[#75501f]">Current</span>
            <strong className="block font-display text-2xl">{market.name}</strong>
          </div>
          {market.connections.map((connection, index) => {
            const destination = marketplaces[connection.marketplaceIndex];
            return (
              <button
                key={destination.index}
                className="absolute grid place-items-center rounded-full border-2 border-[#7f5b2a] bg-[#f2ddb1]/95 px-4 py-2 font-bold text-[#26170a] shadow-xl transition hover:scale-105"
                style={{ left: `${20 + index * 18}%`, top: `${42 + (index % 2) * 18}%` }}
                type="button"
                onClick={() => onTravel(destination.index)}
              >
                <img className="mb-1 h-8 w-8 object-contain" src={uiAssets.map.friendlyCityMarker} alt="" />
                {destination.name}
              </button>
            );
          })}
          <div className="absolute bottom-4 left-4">
            <TitleRibbon size="sm">Routes / Demand / Risk</TitleRibbon>
          </div>
        </div>

        <aside className="grid content-start gap-4">
          <Panel title="Selected Destination" variant="parchment">
            <div className="grid grid-cols-2 gap-2">
              <StatChip label="Market" value={market.name} icon={uiAssets.map.currentLocationMarker} />
              <StatChip label="Risk" value="Normal" />
              <StatChip label="Demand" value="Mixed" />
              <StatChip label="Capacity" value={cargo.canTravel ? "Safe" : "Over"} />
            </div>
            <div className="mt-3 rounded-sm border border-[#9a7138]/55 bg-[#fff6d7]/55 p-3 text-sm text-[#3b260f]">
              Carry {cargo.weight}/{cargo.carryCapacity} / Size {cargo.size}/{cargo.sizeCapacity}
              {currentIllegal.length ? <span className="mt-1 block font-bold text-[#8d271f]">Illegal here: {currentIllegal.length} item stack{currentIllegal.length === 1 ? "" : "s"}</span> : null}
            </div>
            <div className="mt-3 flex flex-wrap gap-2"><Button onClick={onEnterMarket}><MapPinned size={16} /> Enter Market</Button><Button subtle onClick={onOpenJournal}><BookOpen size={16} /> Journal</Button><Button subtle disabled>Skip Day</Button></div>
          </Panel>
          <Panel title="Route Ledger" variant="parchment">
            <div className="grid gap-2">
              {market.connections.map((connection) => {
                const destination = marketplaces[connection.marketplaceIndex];
                const destinationKingdom = kingdoms[destination.kingdomIndex];
                const destinationIllegal = inventoryIllegalEntries(state.playerInventory, items, destinationKingdom?.illegalItemTags || []);
                return (
                  <LedgerRow
                    key={destination.index}
                    title={destination.name}
                    subtitle={`Toll ${money(connection.tolls)} copper / ${canPayCopperToll(state.playerInventory, items, connection.tolls) ? "payable" : "need copper"}${destinationIllegal.length ? ` / ${destinationIllegal.length} illegal stack${destinationIllegal.length === 1 ? "" : "s"}` : ""} / route asset ${routeAsset(connection.routeFile) ? "linked" : "pending"}`}
                    trailing={<span className="text-sm font-bold text-[#75501f]">{connection.travelDays}d</span>}
                    onClick={() => onTravel(destination.index)}
                  />
                );
              })}
            </div>
          </Panel>
        </aside>
      </div>
    </ScreenFrame>
  );
}
