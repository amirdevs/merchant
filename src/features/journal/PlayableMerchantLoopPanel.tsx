import { useMemo, useState } from "react";
import { Building2, CheckCircle2, Coins, DatabaseZap, Map, PackagePlus, Play, RotateCcw, Route, Scale, ShieldCheck, Store, TrendingUp } from "lucide-react";
import { Button, LedgerRow, Panel, StatChip } from "@/components/ui";
import { saveGame, type GameState } from "@/lib/game";
import {
  acceptLoopStoryQuest,
  buildPlayableMerchantLoopView,
  buyLoopItem,
  LOOP_ITEMS,
  registerLoopCompany,
  resolveLoopStoryQuest,
  sellLoopItem,
  travelLoopRoute,
  type LoopItemId,
  type LoopTownId,
  type PlayableMerchantLoopState,
} from "@/lib/playable-merchant-loop";
import { buildGameRuntimeLoopSnapshot, commitGamePlayableLoopState, resetGamePlayableLoopState, type GameStateWithPlayableLoop } from "@/lib/game-runtime-loop";
import { richQuestStatus } from "@/lib/quest-state";

function shortStatus(done: boolean) {
  return done ? "Done" : "Open";
}

function signalTone(status: "good" | "watch" | "risk") {
  if (status === "good") return "border-[#397a45]/55 bg-[#e7f3d4]/70 text-[#264b25]";
  if (status === "watch") return "border-[#b9872b]/55 bg-[#fff0be]/75 text-[#6b4712]";
  return "border-[#9b3f2c]/55 bg-[#f5d0bc]/75 text-[#682315]";
}

type PlayableMerchantLoopPanelProps = {
  gameState: GameState;
};

export function PlayableMerchantLoopPanel({ gameState }: PlayableMerchantLoopPanelProps) {
  const runtimeGameState = gameState as GameStateWithPlayableLoop;
  const [runtimeRevision, setRuntimeRevision] = useState(0);
  const runtimeSnapshot = useMemo(
    () => buildGameRuntimeLoopSnapshot(runtimeGameState),
    [runtimeGameState, runtimeRevision],
  );
  const loopState = runtimeSnapshot.loop;
  const view = useMemo(() => buildPlayableMerchantLoopView(loopState), [loopState, runtimeRevision]);
  const selectedQuest = view.questView.selectedQuest;
  const selectedStatus = richQuestStatus(loopState.questChain, selectedQuest.id);
  const consequence = view.consequenceSummary;
  const balance = view.balanceReport;

  function commit(next: PlayableMerchantLoopState) {
    commitGamePlayableLoopState(runtimeGameState, next);
    saveGame(runtimeGameState);
    setRuntimeRevision((current) => current + 1);
  }

  function update(mutator: (current: PlayableMerchantLoopState) => PlayableMerchantLoopState) {
    commit(mutator(loopState));
  }

  function buyStarterItem() {
    update((current) => buyLoopItem(current, "coastal-salt", 4));
  }

  function sellStarterItem() {
    update((current) => sellLoopItem(current, "coastal-salt", 4));
  }

  function travel(to: LoopTownId) {
    update((current) => travelLoopRoute(current, to));
  }

  function buyItem(itemId: LoopItemId) {
    update((current) => buyLoopItem(current, itemId, 1));
  }

  return (
    <Panel title={<span className="inline-flex items-center gap-2"><Route size={18} /> Playable Merchant Loop v1</span>} variant="parchment">
      <div className="mb-4 grid gap-2 md:grid-cols-6">
        <StatChip label="Town" value={view.town.name} />
        <StatChip label="Copper" value={view.copper} />
        <StatChip label="Profit" value={view.cargoList.length ? `${loopState.totalProfit}` : loopState.totalProfit} />
        <StatChip label="Loop Goals" value={`${view.completedGoals}/${view.totalGoals}`} />
        <StatChip label="Company" value={view.company.registered ? "Registered" : view.company.ledgerOpened ? "Ready" : "Locked"} />
        <StatChip label="Save Field" value={runtimeSnapshot.saveField} />
      </div>

      <p className="mb-4 rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/55 p-3 text-sm font-bold leading-snug text-[#3b260f]">
        Phase 6 stores the playable merchant loop inside the main GameState save and export payload. This panel now edits the primary runtime directly.
      </p>

      <p className="mb-4 rounded-sm border border-[#1f5960]/45 bg-[#dff4ef]/70 p-3 text-sm font-bold leading-snug text-[#1f5960]">
        <DatabaseZap className="mr-1 inline" size={15} /> Runtime save field: <code>playableLoop</code>. Actions in this panel update the main save state and autosave the primary ledger.
      </p>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="grid gap-4">
          <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-[#3b260f]">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <strong className="font-display text-2xl text-[#26170a]">{view.town.name}</strong>
                <p className="text-sm font-bold text-[#75501f]">{view.town.role}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={buyStarterItem}><PackagePlus size={15} /> Buy 4 Salt</Button>
                <Button size="sm" variant="secondary" onClick={() => travel(view.town.id === "sunwake-harbor" ? "riverwake-mill" : "brasskeep-gate")}><Map size={15} /> Travel</Button>
                <Button size="sm" subtle onClick={sellStarterItem}><Coins size={15} /> Sell Salt</Button>
              </div>
            </div>
            <p className="text-sm leading-snug">{view.town.storyHook}</p>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]">
              <strong className="block text-[#26170a]"><Store className="mr-1 inline" size={15} /> Local Prices</strong>
              <div className="mt-2 grid gap-2">
                {LOOP_ITEMS.map((item) => (
                  <div className="flex items-center justify-between gap-2" key={item.id}>
                    <span>
                      <strong>{item.name}</strong>
                      <span className="ml-2 text-[#75501f]">{view.town.priceTable[item.id]}c</span>
                    </span>
                    <Button size="sm" subtle onClick={() => buyItem(item.id)}>Buy 1</Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]">
              <strong className="block text-[#26170a]"><TrendingUp className="mr-1 inline" size={15} /> Best Nearby Profit Routes</strong>
              <div className="mt-2 grid gap-2">
                {view.tradeRoutes.map((route) => (
                  <div className="rounded-sm border border-[#9a7138]/40 bg-[#fff6d7]/65 p-2" key={`${route.routeId}-${route.itemId}`}>
                    <strong className="block text-[#26170a]">{route.itemName}</strong>
                    <span>{route.from} &rarr; {route.to}</span>
                    <span className="block font-bold text-[#1f5960]">Buy {route.buyPrice}c / Sell {route.sellPrice}c / Net {route.netProfit}c / Risk {route.risk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <strong className="text-[#26170a]">Current Story Gate</strong>
              <span className="rounded-full border border-[#9a7138]/55 bg-[#fff6d7]/75 px-2 py-1 text-[0.68rem] font-black uppercase text-[#75501f]">{selectedStatus}</span>
            </div>
            <h3 className="font-display text-2xl text-[#26170a]">{selectedQuest.title}</h3>
            <p className="mt-1">{selectedQuest.storyHook}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button disabled={!selectedQuest.canAccept} size="sm" onClick={() => update((current) => acceptLoopStoryQuest(current))}><Play size={15} /> Accept</Button>
              <Button disabled={selectedStatus === "locked" || selectedStatus === "completed"} size="sm" variant="secondary" onClick={() => update((current) => resolveLoopStoryQuest(current, "honest"))}><CheckCircle2 size={15} /> Resolve Honest</Button>
              <Button disabled={selectedStatus === "locked" || selectedStatus === "completed"} size="sm" subtle onClick={() => update((current) => resolveLoopStoryQuest(current, "practical"))}>Resolve Practical</Button>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]">
              <strong className="block text-[#26170a]"><Scale className="mr-1 inline" size={15} /> Balance Signals</strong>
              <p className="mt-1 font-bold text-[#75501f]">{balance.summary}</p>
              <div className="mt-2 grid gap-2">
                {balance.signals.map((signal) => (
                  <div className={`rounded-sm border p-2 ${signalTone(signal.status)}`} key={signal.id}>
                    <strong className="block">{signal.label}: {signal.status}</strong>
                    <span>{signal.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]">
              <strong className="block text-[#26170a]"><ShieldCheck className="mr-1 inline" size={15} /> Consequences</strong>
              <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                <span className="rounded-sm border border-[#9a7138]/40 bg-[#fff6d7]/70 p-2"><strong className="block">Trust</strong>{consequence.publicTrust}</span>
                <span className="rounded-sm border border-[#9a7138]/40 bg-[#fff6d7]/70 p-2"><strong className="block">Heat</strong>{consequence.shadowHeat}</span>
                <span className="rounded-sm border border-[#9a7138]/40 bg-[#fff6d7]/70 p-2"><strong className="block">Company</strong>{consequence.companyReadiness}</span>
              </div>
              <div className="mt-3 grid gap-1">
                {consequence.townReputation.map((town) => (
                  <span className="flex justify-between gap-2" key={town.townId}><strong>{town.townName}</strong><span>{town.score}</span></span>
                ))}
              </div>
              <p className="mt-3 rounded-sm border border-[#9a7138]/40 bg-[#fff6d7]/70 p-2 font-bold text-[#75501f]">Next: {balance.nextRecommendedAction}</p>
            </div>
          </div>
        </div>

        <aside className="grid content-start gap-4">
          <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]">
            <strong className="block text-[#26170a]">Loop Goals</strong>
            <div className="mt-2 grid gap-2">
              {view.goals.map((goal) => (
                <LedgerRow
                  key={goal.id}
                  title={goal.label}
                  subtitle={shortStatus(goal.done)}
                  trailing={goal.done ? <CheckCircle2 className="text-[#1f6f38]" size={18} /> : <span className="font-bold text-[#75501f]">Open</span>}
                />
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]">
            <strong className="block text-[#26170a]">Cargo</strong>
            <div className="mt-2 grid gap-2">
              {view.cargoList.length ? view.cargoList.map((entry) => (
                <div className="flex items-center justify-between gap-2" key={entry.itemId}>
                  <span>{entry.quantity}x {entry.itemName}</span>
                  <span className="font-bold text-[#75501f]">avg {entry.averageCost}c / sell {entry.currentSellPrice}c</span>
                </div>
              )) : <span>No cargo yet.</span>}
            </div>
          </div>

          <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]">
            <strong className="block text-[#26170a]">Company</strong>
            <p className="mt-1">Warehouse: {view.company.warehouseLeased ? "leased" : "locked"}</p>
            <p>Ledger: {view.company.ledgerOpened ? "ready" : "locked"}</p>
            <p>Clerk: {view.company.clerkHired ? "hired" : "not hired"}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button disabled={view.company.registered} size="sm" onClick={() => update((current) => registerLoopCompany(current))}><Building2 size={15} /> Register</Button>
              <Button
                size="sm"
                subtle
                onClick={() => {
                  resetGamePlayableLoopState(runtimeGameState);
                  saveGame(runtimeGameState);
                  setRuntimeRevision((current) => current + 1);
                }}
              >
                <RotateCcw size={15} /> Reset
              </Button>
            </div>
          </div>

          <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]">
            <strong className="block text-[#26170a]">Ledger</strong>
            <div className="mt-2 grid max-h-64 gap-2 overflow-auto pr-1">
              {view.ledger.map((entry, index) => (
                <div className="rounded-sm border border-[#9a7138]/40 bg-[#fff6d7]/65 p-2" key={`${entry.day}-${index}-${entry.text}`}>
                  <span className="font-bold text-[#75501f]">Day {entry.day} / {entry.type}</span>
                  <p>{entry.text}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </Panel>
  );
}
