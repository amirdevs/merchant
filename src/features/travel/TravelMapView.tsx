import { BookOpen, MapPinned, Route } from "lucide-react";
import { useState } from "react";
import type { GameState } from "@/lib/game";
import { items, kingdoms, marketplaces } from "@/lib/game";
import { routeAsset } from "@/lib/assets";
import { canPayCopperToll, inventoryTotals } from "@/lib/economy";
import { inventoryIllegalEntries } from "@/lib/legal";
import { money } from "@/lib/format";
import { uiAssets } from "@/lib/ui-assets";
import { routeRiskPreview } from "@/lib/travel-risk";
import type { TravelStrategy } from "@/lib/travel-risk";
import { Button, LedgerRow, ModalShell, Panel, ScreenFrame, StatChip, TitleRibbon } from "@/components/ui";

export function TravelMapView({ state, onTravel, onEnterMarket, onOpenJournal, onClearTravelResult }: { state: GameState; onTravel: (marketIndex: number, strategy?: TravelStrategy) => void; onEnterMarket: () => void; onOpenJournal: () => void; onClearTravelResult: () => void }) {
  const [pendingDestination, setPendingDestination] = useState<number | null>(null);
  const [strategy, setStrategy] = useState<TravelStrategy>("comply");
  const market = marketplaces[state.marketIndex];
  const cargo = inventoryTotals(state.playerInventory, items);
  const currentKingdom = kingdoms[market.kingdomIndex];
  const currentIllegal = inventoryIllegalEntries(state.playerInventory, items, currentKingdom?.illegalItemTags || []);
  const pendingRoute = pendingDestination === null ? null : market.connections.find((connection) => connection.marketplaceIndex === pendingDestination) || null;
  const pendingMarket = pendingDestination === null ? null : marketplaces[pendingDestination];
  const pendingKingdom = pendingMarket ? kingdoms[pendingMarket.kingdomIndex] : null;
  const pendingIllegal = pendingKingdom ? inventoryIllegalEntries(state.playerInventory, items, pendingKingdom.illegalItemTags || []) : [];
  const pendingRisk = pendingRoute && pendingMarket
    ? routeRiskPreview({
      inventory: state.playerInventory,
      items,
      destination: pendingMarket,
      kingdom: pendingKingdom || undefined,
      days: pendingRoute.travelDays,
      tolls: pendingRoute.tolls,
    })
    : null;
  const requestTravel = (marketIndex: number) => setPendingDestination(marketIndex);

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
                onClick={() => requestTravel(destination.index)}
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
              <StatChip label="Animals" value={cargo.packAnimals} />
            </div>
            <div className="mt-3 rounded-sm border border-[#9a7138]/55 bg-[#fff6d7]/55 p-3 text-sm text-[#3b260f]">
              Carry {cargo.weight}/{cargo.carryCapacity} / Pull {cargo.size}/{cargo.sizeCapacity} / Storage {cargo.storageItems}
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
                const risk = routeRiskPreview({
                  inventory: state.playerInventory,
                  items,
                  destination,
                  kingdom: destinationKingdom,
                  days: connection.travelDays,
                  tolls: connection.tolls,
                });
                return (
                  <LedgerRow
                    key={destination.index}
                    title={destination.name}
                    subtitle={`Toll ${money(connection.tolls)} + stallage ${money(destination.stallage)} / guard ${risk.guardInspectionPercent}% / theft ${risk.theftPercent}%${destinationIllegal.length ? ` / ${destinationIllegal.length} illegal stack${destinationIllegal.length === 1 ? "" : "s"}` : ""} / cargo ${money(risk.cargoValue)}`}
                    trailing={<span className="text-sm font-bold uppercase text-[#75501f]">{connection.travelDays}d / {risk.level}</span>}
                    onClick={() => requestTravel(destination.index)}
                  />
                );
              })}
            </div>
          </Panel>
        </aside>
      </div>
      {pendingRoute && pendingMarket ? (
        <ModalShell title={<span className="inline-flex items-center gap-2"><Route size={18} /> Confirm Route</span>}>
          <div className="grid gap-4 text-[#3b260f]">
            <p className="text-lg">Travel from <strong>{market.name}</strong> to <strong>{pendingMarket.name}</strong>?</p>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <StatChip label="Days" value={pendingRoute.travelDays} />
              <StatChip label="Toll" value={money(pendingRoute.tolls)} icon={uiAssets.hud.goldCoin} />
              <StatChip label="Stallage" value={money(pendingMarket.stallage)} icon={uiAssets.hud.goldCoin} />
              <StatChip label="Capacity" value={cargo.canTravel ? "Safe" : "Over"} tone={cargo.canTravel ? "parchment" : "danger"} />
              <StatChip label="Pack Animals" value={cargo.packAnimals} />
              {pendingRisk ? <StatChip label="Route Risk" value={pendingRisk.level} tone={pendingRisk.level === "high" || pendingRisk.level === "severe" ? "danger" : "parchment"} /> : null}
              {pendingRisk ? <StatChip label="Guard Check" value={`${pendingRisk.guardInspectionPercent}%`} /> : null}
              {pendingRisk ? <StatChip label="Theft" value={`${pendingRisk.theftPercent}%`} /> : null}
              {pendingRisk ? <StatChip label="Cargo Value" value={money(pendingRisk.cargoValue)} /> : null}
              <StatChip label="Copper" value={canPayCopperToll(state.playerInventory, items, pendingRoute.tolls + pendingMarket.stallage) ? "Ready" : "Short"} tone={canPayCopperToll(state.playerInventory, items, pendingRoute.tolls + pendingMarket.stallage) ? "parchment" : "danger"} />
            </div>
            {pendingIllegal.length ? <div className="rounded-sm border border-[#8d271f]/60 bg-[#fff6d7]/70 p-3 font-bold text-[#8d271f]">Destination law warning: {pendingIllegal.length} illegal stack{pendingIllegal.length === 1 ? "" : "s"} in cargo.</div> : null}
            {pendingIllegal.length ? (
              <div className="grid grid-cols-3 gap-2">
                {(["comply", "bribe", "evade"] as TravelStrategy[]).map((option) => (
                  <Button key={option} variant={strategy === option ? "primary" : "secondary"} onClick={() => setStrategy(option)}>
                    {option === "bribe" ? "Bribe (12)" : option === "evade" ? "Evade" : "Comply"}
                  </Button>
                ))}
              </div>
            ) : null}
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setPendingDestination(null)}>Cancel</Button>
              <Button onClick={() => { const next = pendingDestination; setPendingDestination(null); if (next !== null) onTravel(next, strategy); }}>Travel</Button>
            </div>
          </div>
        </ModalShell>
      ) : null}
      {state.travelResult ? (
        <ModalShell title="Arrival Summary">
          <div className="grid gap-4 text-[#3b260f]">
            <p className="text-lg">Arrived in <strong>{state.travelResult.toMarketName}</strong> from <strong>{state.travelResult.fromMarketName}</strong>.</p>
            <div className="grid grid-cols-3 gap-2">
              <StatChip label="Days" value={state.travelResult.days} />
              <StatChip label="Toll Paid" value={money(state.travelResult.tolls)} icon={uiAssets.hud.goldCoin} />
              <StatChip label="Stallage" value={money(state.travelResult.stallage)} icon={uiAssets.hud.goldCoin} />
              <StatChip label="Day" value={state.travelResult.arrivalDay} />
            </div>
            {state.travelResult.events.length ? (
              <div className="grid gap-2">
                {state.travelResult.events.map((event) => (
                  <div className="rounded-sm border border-[#8d271f]/60 bg-[#fff6d7]/70 p-3 font-bold text-[#8d271f]" key={event}>{event}</div>
                ))}
              </div>
            ) : (
              <div className="rounded-sm border border-[#1f5960]/35 bg-[#fff6d7]/70 p-3 font-bold text-[#1f5960]">No guard inspection or theft incident occurred.</div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={onClearTravelResult}>Stay On Map</Button>
              <Button onClick={() => { onClearTravelResult(); onEnterMarket(); }}>Enter Market</Button>
            </div>
          </div>
        </ModalShell>
      ) : null}
    </ScreenFrame>
  );
}
