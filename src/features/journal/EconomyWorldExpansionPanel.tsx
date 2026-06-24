import { Boxes, Building2, Compass, PackageSearch, Route, Sparkles, Store, TrendingUp } from "lucide-react";
import { LedgerRow, Panel, StatChip } from "@/components/ui";
import type { GameState } from "@/lib/game";
import { buildEconomyWorldExpansionView } from "@/lib/economy-world-expansion";
import { buildGameRuntimeLoopSnapshot, type GameStateWithPlayableLoop } from "@/lib/game-runtime-loop";

function toneClass(tone: "safe" | "watch" | "risk" | "opportunity") {
  if (tone === "safe") return "border-[#397a45]/50 bg-[#e7f3d4]/70 text-[#264b25]";
  if (tone === "opportunity") return "border-[#1f5960]/50 bg-[#dff4ef]/75 text-[#1f5960]";
  if (tone === "watch") return "border-[#b9872b]/55 bg-[#fff0be]/75 text-[#6b4712]";
  return "border-[#9b3f2c]/55 bg-[#f5d0bc]/75 text-[#682315]";
}

function upgradeTone(status: "locked" | "available" | "active") {
  if (status === "active") return "text-[#1f6f38]";
  if (status === "available") return "text-[#1f5960]";
  return "text-[#75501f]";
}

type EconomyWorldExpansionPanelProps = {
  state: GameState;
};

export function EconomyWorldExpansionPanel({ state }: EconomyWorldExpansionPanelProps) {
  const snapshot = buildGameRuntimeLoopSnapshot(state as GameStateWithPlayableLoop);
  const view = buildEconomyWorldExpansionView(snapshot.loop);
  const regionalItems = view.tunedItems.filter((item) => item.tier !== "starter").length;

  return (
    <Panel title={<span className="inline-flex items-center gap-2"><Sparkles size={18} /> Economy / World Expansion</span>} variant="parchment">
      <div className="mb-4 grid gap-2 md:grid-cols-5">
        <StatChip label="Readiness" value={`${view.worldReadinessScore}%`} />
        <StatChip label="Status" value={view.readinessLabel} />
        <StatChip label="Tuned Items" value={view.tunedItems.length} />
        <StatChip label="Regional Items" value={regionalItems} />
        <StatChip label="Quest Seeds" value={view.playableQuestSeeds.length} />
      </div>

      <p className="mb-4 rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/55 p-3 text-sm font-bold leading-snug text-[#3b260f]">
        Phase 7 expands the saved merchant loop into a richer economy model: town stock, dynamic prices, route risk, expansion towns, company upgrades, and the next rich quest seeds all read from the runtime loop state.
      </p>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-4">
          <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-[#3b260f]">
            <strong className="font-display text-2xl text-[#26170a]"><Store className="mr-1 inline" size={18} /> {view.currentTown.name}</strong>
            <p className="mt-1 text-sm font-bold text-[#75501f]">{view.currentTown.role}</p>
            <p className="mt-2 text-sm leading-snug">{view.currentTown.tradeIdentity}</p>
            <p className="mt-2 rounded-sm border border-[#9a7138]/40 bg-[#fff6d7]/70 p-2 text-sm font-bold text-[#5b3b17]">{view.currentTown.pressure}</p>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]">
              <strong className="block text-[#26170a]"><Boxes className="mr-1 inline" size={15} /> Current Town Stock Pressure</strong>
              <div className="mt-2 grid gap-2">
                {view.currentTownStocks.map((stock) => (
                  <div className={`rounded-sm border p-2 ${toneClass(stock.tone)}`} key={`${stock.townId}-${stock.itemId}`}>
                    <div className="flex items-start justify-between gap-3">
                      <strong>{stock.itemName}</strong>
                      <span className="font-black">{stock.dynamicPrice}c</span>
                    </div>
                    <span className="block text-xs font-bold uppercase tracking-wide">{stock.trend} / stock {stock.currentStock}</span>
                    <p className="mt-1 text-xs leading-snug">{stock.story}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]">
              <strong className="block text-[#26170a]"><Route className="mr-1 inline" size={15} /> Route Risk Events</strong>
              <div className="mt-2 grid gap-2">
                {view.routeEvents.map((route) => (
                  <div className={`rounded-sm border p-2 ${toneClass(route.tone)}`} key={route.routeId}>
                    <strong className="block">{route.from} &rarr; {route.to}</strong>
                    <span className="block text-xs font-bold uppercase">{route.days}d / cost {route.travelCost}c / risk {route.currentRisk}</span>
                    <p className="mt-1 text-xs leading-snug">{route.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]">
            <strong className="block text-[#26170a]"><TrendingUp className="mr-1 inline" size={15} /> Expansion Profit Reads</strong>
            <div className="mt-2 grid gap-2 lg:grid-cols-2">
              {view.bestTradeRoutes.slice(0, 4).map((route) => (
                <div className="rounded-sm border border-[#9a7138]/40 bg-[#fff6d7]/70 p-2" key={`${route.routeId}-${route.itemId}`}>
                  <strong className="block text-[#26170a]">{route.itemName}</strong>
                  <span>{route.from} &rarr; {route.to}</span>
                  <span className="block font-bold text-[#1f5960]">Net {route.netProfit}c / Risk {route.risk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="grid content-start gap-4">
          <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]">
            <strong className="block text-[#26170a]"><Building2 className="mr-1 inline" size={15} /> Company Upgrade Road</strong>
            <div className="mt-2 grid gap-2">
              {view.companyUpgrades.map((upgrade) => (
                <div className="rounded-sm border border-[#9a7138]/40 bg-[#fff6d7]/70 p-2" key={upgrade.id}>
                  <strong className={`block ${upgradeTone(upgrade.status)}`}>{upgrade.name} / {upgrade.status}</strong>
                  <span className="block text-xs font-bold text-[#75501f]">{upgrade.requirement}</span>
                  <p className="mt-1 text-xs leading-snug">{upgrade.effect}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]">
            <strong className="block text-[#26170a]"><Compass className="mr-1 inline" size={15} /> Next Towns</strong>
            <div className="mt-2 grid gap-2">
              {view.currentTown.connectedTownIds.map((townId) => (
                <LedgerRow key={townId} title={townId} subtitle="Expansion route candidate" />
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]">
            <strong className="block text-[#26170a]"><PackageSearch className="mr-1 inline" size={15} /> Next Quest Seeds</strong>
            <div className="mt-2 grid gap-1">
              {view.playableQuestSeeds.map((questId) => (
                <span className="rounded-sm border border-[#9a7138]/40 bg-[#fff6d7]/70 px-2 py-1 font-bold text-[#75501f]" key={questId}>{questId}</span>
              ))}
            </div>
            <p className="mt-3 rounded-sm border border-[#1f5960]/35 bg-[#dff4ef]/70 p-2 font-bold text-[#1f5960]">Next: {view.nextRecommendedExpansion}</p>
          </div>
        </aside>
      </div>
    </Panel>
  );
}
