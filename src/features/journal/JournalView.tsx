import { BookOpen, Building2, Map, Menu, PackageSearch, Store } from "lucide-react";
import type { GameView } from "@/app/types";
import { Button, LedgerRow, Panel, ScreenFrame, StatChip } from "@/components/ui";
import { currentKingdom, currentMarket, items, kingdoms, marketplaces, type GameState } from "@/lib/game";
import { marketEventPreviews } from "@/lib/events";
import { contractDeadline, contractItemProgress, generatedContracts, resolveContract } from "@/lib/contracts";
import { marketRumorLedger, seasonalMarketReport } from "@/lib/market-simulation";
import { createBalanceReport } from "@/lib/balance";
import { uiAssets } from "@/lib/ui-assets";
import { PlayableMerchantLoopPanel } from "./PlayableMerchantLoopPanel";
import { EconomyWorldExpansionPanel } from "./EconomyWorldExpansionPanel";
import { VerticalSlicePolishPanel } from "./VerticalSlicePolishPanel";

type JournalViewProps = {
  state: GameState;
  onBack: () => void;
  onNavigate: (view: GameView) => void;
  onSetContractStatus: (contractId: string, status: GameState["contractStates"][string]) => void;
};

export function JournalView({ state, onBack, onNavigate, onSetContractStatus }: JournalViewProps) {
  const market = currentMarket(state);
  const kingdom = currentKingdom(state);
  const eventPreviews = marketEventPreviews(marketplaces, state.day).slice(0, 8);
  const localContracts = generatedContracts(market, marketplaces, kingdom);
  const trackedContracts = Object.entries(state.contractStates)
    .filter(([, status]) => status === "accepted")
    .map(([contractId]) => resolveContract(contractId, marketplaces, kingdoms))
    .filter((contract): contract is NonNullable<typeof contract> => Boolean(contract));
  const contracts = [...localContracts, ...trackedContracts.filter((tracked) => !localContracts.some((local) => local.id === tracked.id))];
  const notes = state.dialogueLog.slice(0, 8);
  const dynamicRumors = marketRumorLedger(state.marketSimulation, market, state.day);
  const season = seasonalMarketReport(state.day);
  const balance = createBalanceReport(state);

  return (
    <ScreenFrame title="Journal" eyebrow="Rich Quests, Notices, Contracts, Rumors" backdrop={uiAssets.backplates.marketTown} overlay="light">
      <nav className="mb-2 flex flex-wrap justify-end gap-2 pt-7">
        <Button size="sm" onClick={onBack}><Store size={15} /> Stall</Button>
        <Button size="sm" variant="secondary" onClick={() => onNavigate("travel")}><Map size={15} /> Map</Button>
        <Button size="sm" variant="secondary" onClick={() => onNavigate("inventory")}><PackageSearch size={15} /> Cargo</Button>
        <Button size="sm" variant="secondary" onClick={() => onNavigate("company")}><Building2 size={15} /> Company</Button>
        <Button size="sm" subtle onClick={() => onNavigate("system")}><Menu size={15} /> Menu</Button>
      </nav>

      <div className="grid flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
        <main className="grid content-start gap-4">
          <PlayableMerchantLoopPanel gameState={state} />

          <EconomyWorldExpansionPanel state={state} />

          <VerticalSlicePolishPanel state={state} />
        </main>

        <aside className="grid content-start gap-4">
          <Panel title="Contracts" variant="parchment">
            <div className="grid max-h-72 gap-2 overflow-auto pr-1">
              {contracts.map((contract) => {
                const status = state.contractStates[contract.id] || "available";
                const deadline = contractDeadline(contract, state.contractAcceptedDays[contract.id]);
                const progress = contractItemProgress(contract, state.playerInventory, items);
                return (
                  <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/55 p-3 text-sm text-[#3b260f]" key={contract.id}>
                    <div className="flex items-start justify-between gap-2">
                      <span>
                        <strong className="block text-[#26170a]">{contract.title}</strong>
                        <span>{contract.detail}</span>
                      </span>
                      <span className="rounded-full border border-[#9a7138]/60 bg-[#fff6d7]/70 px-2 py-1 text-[0.68rem] font-bold uppercase text-[#75501f]">{status}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="font-bold text-[#75501f]">{contract.rewardCopper} copper / {contract.daysLimit}d / {contract.risk} risk</span>
                      {deadline !== null ? <span className={state.day > deadline ? "font-bold text-[#8d271f]" : "font-bold text-[#1f5960]"}>Deadline day {deadline}</span> : null}
                      {progress.required > 0 ? <span className="font-bold text-[#75501f]">Cargo {contract.requiresConcealment ? progress.concealed : progress.held}/{progress.required}</span> : null}
                      <Button disabled={status !== "available"} size="sm" onClick={() => onSetContractStatus(contract.id, "accepted")}>Accept</Button>
                      <Button disabled={status !== "accepted"} size="sm" variant="secondary" onClick={() => onSetContractStatus(contract.id, "completed")}>Complete</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel title="Event Calendar" variant="parchment">
            {eventPreviews.length ? (
              <div className="grid gap-2">
                {eventPreviews.map((event) => (
                  <LedgerRow
                    key={`${event.marketName}-${event.name}`}
                    title={event.name}
                    subtitle={`${event.marketName} / ${event.frequency}${event.characterName ? ` / ${event.characterName}` : ""}`}
                    trailing={<span className={event.active ? "text-sm font-black text-[#1f6f38]" : "text-sm font-bold text-[#75501f]"}>{event.active ? "Active" : `Day ${event.nextDay}`}</span>}
                  />
                ))}
              </div>
            ) : <p className="text-[#3b260f]">No market events are recorded yet.</p>}
          </Panel>

          <Panel title="Balance Inspector" variant="parchment">
            <div className="grid grid-cols-2 gap-2">
              <StatChip label="Cargo Value" value={balance.playerCargoValue} />
              <StatChip label="Company Wealth" value={balance.companyWealth} />
              <StatChip label="Max Drift" value={`${balance.maximumMarketShift}%`} />
              <StatChip label="Max Heat" value={balance.maximumHeat} />
            </div>
          </Panel>

          <Panel title="Economy Report" variant="parchment">
            <strong className="block font-display text-2xl text-[#26170a]">{season.name}</strong>
            <p className="mt-1 text-sm font-bold text-[#3b260f]">{season.report}</p>
            <div className="mt-3 grid gap-1">
              {season.biases.map((bias) => (
                <span className={bias.percent >= 0 ? "rounded-sm border border-[#1f5960]/40 bg-[#fff6d7]/70 px-2 py-1 text-sm font-bold text-[#1f5960]" : "rounded-sm border border-[#8d271f]/40 bg-[#fff6d7]/70 px-2 py-1 text-sm font-bold text-[#8d271f]"} key={bias.tag}>
                  {bias.tag} {bias.percent > 0 ? "+" : ""}{bias.percent}%
                </span>
              ))}
            </div>
          </Panel>

          <Panel title={<span className="inline-flex items-center gap-2"><BookOpen size={18} /> Rumor Ledger</span>} variant="parchment">
            {dynamicRumors.length ? (
              <div className="mb-3 grid gap-2">
                {dynamicRumors.map((rumor) => (
                  <div
                    className={rumor.reliability === "false"
                      ? "rounded-sm border border-[#8d271f]/40 bg-[#fff6d7]/70 p-3 text-sm font-bold text-[#8d271f]"
                      : rumor.reliability === "exaggerated"
                        ? "rounded-sm border border-[#b98b37]/60 bg-[#fff6d7]/70 p-3 text-sm font-bold text-[#75501f]"
                        : "rounded-sm border border-[#1f5960]/40 bg-[#fff6d7]/70 p-3 text-sm font-bold text-[#1f5960]"}
                    key={rumor.text}
                  >
                    <span className="mr-2 rounded-full border border-current px-2 py-0.5 text-[0.62rem] uppercase tracking-wide">{rumor.reliability}</span>
                    {rumor.text}
                  </div>
                ))}
              </div>
            ) : null}
            {notes.length ? (
              <div className="grid max-h-[42vh] gap-2 overflow-auto pr-1">
                {notes.map((note) => (
                  <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/55 p-3 text-sm text-[#3b260f]" key={`${note.day}-${note.characterIndex}-${note.topic}`}>
                    <strong className="block text-[#26170a]">Day {note.day}: {note.characterName}</strong>
                    <span className="block font-bold text-[#75501f]">{note.topic}</span>
                    <span>{note.note}</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-[#3b260f]">Ask customers about routes, laws, prices, and their trade history to build this ledger.</p>}
            <Button className="mt-4 w-full" variant="secondary" onClick={onBack}>Back</Button>
          </Panel>
        </aside>
      </div>
    </ScreenFrame>
  );
}
