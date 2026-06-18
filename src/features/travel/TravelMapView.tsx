import { BookOpen, Bookmark, MapPinned, Route } from "lucide-react";
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
import { masteryRiskReduction, routeKey, routeMasteryLevel, routeProfitSummary, routeTravelConditions } from "@/lib/caravan";
import { Button, LedgerRow, ModalShell, Panel, ScreenFrame, StatChip, TitleRibbon } from "@/components/ui";

export function TravelMapView({ state, onTravel, onEnterMarket, onOpenJournal, onClearTravelResult, onToggleRouteBookmark, onSetRouteNote, onBuySupplies }: { state: GameState; onTravel: (marketIndex: number, strategy?: TravelStrategy) => void; onEnterMarket: () => void; onOpenJournal: () => void; onClearTravelResult: () => void; onToggleRouteBookmark: (marketIndex: number) => void; onSetRouteNote: (routeId: string, note: string) => void; onBuySupplies: (quantity?: number) => void }) {
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
      concealmentLevel: state.caravan.concealmentLevel,
      masteryReduction: masteryRiskReduction(state.caravan.routeMastery[routeKey(market.index, pendingMarket.index)] || 0),
    })
    : null;
  const pendingConditions = pendingRoute && pendingMarket ? routeTravelConditions(market.index, pendingMarket.index, state.day, pendingRoute.travelDays) : null;
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
              <StatChip label="Supplies" value={state.caravan.supplies} />
              <StatChip label="Morale" value={state.caravan.morale} />
            </div>
            <div className="mt-3 rounded-sm border border-[#9a7138]/55 bg-[#fff6d7]/55 p-3 text-sm text-[#3b260f]">
              Carry {cargo.weight}/{cargo.carryCapacity} / Pull {cargo.size}/{cargo.sizeCapacity} / Storage {cargo.storageItems}
              {currentIllegal.length ? <span className="mt-1 block font-bold text-[#8d271f]">Illegal here: {currentIllegal.length} item stack{currentIllegal.length === 1 ? "" : "s"}</span> : null}
            </div>
            <div className="mt-3 flex flex-wrap gap-2"><Button onClick={onEnterMarket}><MapPinned size={16} /> Enter Market</Button><Button variant="secondary" onClick={() => onBuySupplies(6)}>Buy Supplies</Button><Button subtle onClick={onOpenJournal}><BookOpen size={16} /> Journal</Button><Button subtle disabled>Skip Day</Button></div>
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
                  concealmentLevel: state.caravan.concealmentLevel,
                  masteryReduction: masteryRiskReduction(state.caravan.routeMastery[routeKey(market.index, destination.index)] || 0),
                });
                const trips = state.caravan.routeMastery[routeKey(market.index, destination.index)] || 0;
                const bookmarked = state.caravan.bookmarkedRoutes.includes(routeKey(market.index, destination.index));
                const summary = routeProfitSummary(state.caravan, market.index, destination.index);
                const conditions = routeTravelConditions(market.index, destination.index, state.day, connection.travelDays);
                return (
                  <div className="grid grid-cols-[1fr_auto] gap-2" key={destination.index}>
                    <LedgerRow
                      title={destination.name}
                      subtitle={`Toll ${money(connection.tolls)} + stallage ${money(destination.stallage)} / ${conditions.weather}, ${conditions.roadQuality} road / supplies ${conditions.suppliesNeeded} / morale ${conditions.moraleChange > 0 ? "+" : ""}${conditions.moraleChange} / guard ${risk.guardInspectionPercent}% / theft ${risk.theftPercent}% / mastery ${routeMasteryLevel(trips)}${summary ? ` / avg cost ${money(summary.averageCost)} / incident ${summary.incidentRate}%` : ""}${destinationIllegal.length ? ` / ${destinationIllegal.length} illegal stack${destinationIllegal.length === 1 ? "" : "s"}` : ""}`}
                      trailing={<span className="text-sm font-bold uppercase text-[#75501f]">{connection.travelDays}d / {risk.level}</span>}
                      onClick={() => requestTravel(destination.index)}
                    />
                    <Button size="sm" variant={bookmarked ? "primary" : "secondary"} onClick={() => onToggleRouteBookmark(destination.index)}><Bookmark size={15} /></Button>
                  </div>
                );
              })}
            </div>
          </Panel>
          <Panel title="Recent Journeys" variant="parchment">
            <div className="grid max-h-48 gap-2 overflow-auto">
              {state.caravan.routeHistory.slice(0, 6).map((entry) => (
                <div className="rounded-sm border border-[#9a7138]/55 bg-[#fff6d7]/45 p-2" key={entry.id}>
                  <LedgerRow title={`${marketplaces[entry.fromMarketIndex].name} to ${marketplaces[entry.toMarketIndex].name}`} subtitle={`Day ${entry.dayDeparted}-${entry.dayArrived} / cargo ${money(entry.cargoValue)} / cost ${money(entry.tolls + entry.stallage)} / ${entry.weather || "clear"} / ${entry.roadQuality || "road"} / supplies ${entry.suppliesUsed || 0} / morale ${entry.moraleChange && entry.moraleChange > 0 ? "+" : ""}${entry.moraleChange || 0} / ${entry.strategy}`} trailing={<span className="text-xs font-bold">{entry.incidents.length ? `${entry.incidents.length} incident` : "Clear"}</span>} />
                  <label className="mt-2 block text-xs font-black uppercase tracking-wide text-[#75501f]">
                    Route Note
                    <input
                      className="mt-1 w-full rounded-sm border border-[#9a7138]/50 bg-[#fff8df] px-2 py-1 text-sm normal-case text-[#26170a]"
                      maxLength={240}
                      value={entry.note || ""}
                      onChange={(event) => onSetRouteNote(entry.id, event.target.value)}
                      placeholder="Best cargo, guard behavior, road condition..."
                    />
                  </label>
                </div>
              ))}
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
              {pendingConditions ? <StatChip label="Weather" value={pendingConditions.weather} /> : null}
              {pendingConditions ? <StatChip label="Road" value={pendingConditions.roadQuality} /> : null}
              {pendingConditions ? <StatChip label="Supplies" value={`${Math.min(state.caravan.supplies, pendingConditions.suppliesNeeded)}/${pendingConditions.suppliesNeeded}`} tone={state.caravan.supplies >= pendingConditions.suppliesNeeded ? "parchment" : "danger"} /> : null}
              {pendingConditions ? <StatChip label="Morale" value={`${pendingConditions.moraleChange > 0 ? "+" : ""}${pendingConditions.moraleChange}`} tone={state.caravan.morale + pendingConditions.moraleChange < 30 ? "danger" : "parchment"} /> : null}
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
