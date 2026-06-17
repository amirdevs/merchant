import { BookOpen, CheckCircle2, ScrollText } from "lucide-react";
import { currentKingdom, currentMarket, marketplaces, type GameState } from "@/lib/game";
import { items } from "@/lib/game";
import { marketEventPreviews } from "@/lib/events";
import { questCanComplete, questItemProgress, questRewardCopper } from "@/lib/quests";
import { Button, LedgerRow, Panel, ScreenFrame, StatChip } from "@/components/ui";
import { uiAssets } from "@/lib/ui-assets";

type QuestStatus = GameState["questStates"][string];

type JournalViewProps = {
  state: GameState;
  onBack: () => void;
  onSetQuestStatus: (marketIndex: number, status: QuestStatus) => void;
};

export function JournalView({ state, onBack, onSetQuestStatus }: JournalViewProps) {
  const market = currentMarket(state);
  const kingdom = currentKingdom(state);
  const questMarkets = marketplaces.filter((nextMarket) => nextMarket.quest);
  const currentStatus: QuestStatus = state.questStates[String(market.index)] || (market.quest ? "offered" : "unseen");
  const notes = state.dialogueLog.slice(0, 12);
  const eventPreviews = marketEventPreviews(marketplaces, state.day).slice(0, 8);
  const currentQuestProgress = questItemProgress(market, state.playerInventory, items);
  const currentQuestReady = questCanComplete(market, state.playerInventory, items);

  return (
    <ScreenFrame title="Journal" eyebrow="Quests, Notices, Rumors" backdrop={uiAssets.backplates.marketTown} overlay="light">
      <div className="grid flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
        <Panel title={<span className="inline-flex items-center gap-2"><ScrollText size={18} /> Notice Board</span>} variant="parchment">
          <div className="mb-4 grid grid-cols-3 gap-2">
            <StatChip label="Market" value={market.name} />
            <StatChip label="Kingdom" value={kingdom.name} />
            <StatChip label="Local Quest" value={market.quest?.name || "None"} />
          </div>

          {market.quest ? (
            <div className="mb-4 rounded-sm border border-[#9a7138]/60 bg-[#fff6d7]/60 p-4 text-[#3b260f]">
              <h2 className="font-display text-3xl text-[#26170a]">{market.quest.name}</h2>
              <p className="mt-2 text-base">{market.quest.todo || "No written objective yet. Ask around the market for details."}</p>
              {currentQuestProgress.length ? (
                <div className="mt-3 grid gap-1 text-sm">
                  {currentQuestProgress.map((entry) => (
                    <span className={entry.complete ? "font-bold text-[#1f6f38]" : "font-bold text-[#8d271f]"} key={entry.token}>
                      {entry.token}: held {entry.held}
                    </span>
                  ))}
                </div>
              ) : null}
              <p className="mt-2 text-sm font-bold text-[#75501f]">Reward: {questRewardCopper(market)} copper</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button onClick={() => onSetQuestStatus(market.index, "accepted")}>Accept</Button>
                <Button disabled={!currentQuestReady} variant="secondary" onClick={() => onSetQuestStatus(market.index, "ready")}>Mark Ready</Button>
                <Button disabled={!currentQuestReady} subtle onClick={() => onSetQuestStatus(market.index, "finished")}><CheckCircle2 size={16} /> Finish</Button>
              </div>
              <p className="mt-2 text-sm font-bold uppercase tracking-wide text-[#75501f]">Status: {currentStatus}</p>
            </div>
          ) : (
            <div className="mb-4 rounded-sm border border-[#9a7138]/60 bg-[#fff6d7]/60 p-4 text-[#3b260f]">No authored notice is posted in this market yet.</div>
          )}

          <div className="grid max-h-[46vh] gap-2 overflow-auto pr-1">
            {questMarkets.map((questMarket) => {
              const status = state.questStates[String(questMarket.index)] || "offered";
              return (
                <LedgerRow
                  key={questMarket.index}
                  title={questMarket.quest?.name || questMarket.name}
                  subtitle={`${questMarket.name} / ${questMarket.quest?.todo || "Ask locally for details."}`}
                  trailing={<span className="rounded-full border border-[#9a7138]/60 bg-[#fff6d7]/70 px-2 py-1 text-[0.68rem] font-bold uppercase text-[#75501f]">{status}</span>}
                />
              );
            })}
          </div>
        </Panel>

        <aside className="grid content-start gap-4">
          <Panel title="Event Calendar" variant="parchment">
            {eventPreviews.length ? (
              <div className="grid gap-2">
                {eventPreviews.map((event) => (
                  <LedgerRow
                    key={`${event.marketName}-${event.name}`}
                    title={event.name}
                    subtitle={`${event.marketName} / ${event.frequency}${event.characterName ? ` / ${event.characterName}` : ""}`}
                    trailing={<span className="text-sm font-bold text-[#75501f]">Day {event.nextDay}</span>}
                  />
                ))}
              </div>
            ) : (
              <p className="text-[#3b260f]">No market events are recorded yet.</p>
            )}
          </Panel>
          <Panel title={<span className="inline-flex items-center gap-2"><BookOpen size={18} /> Rumor Ledger</span>} variant="parchment">
            {notes.length ? (
              <div className="grid max-h-[62vh] gap-2 overflow-auto pr-1">
                {notes.map((note) => (
                  <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/55 p-3 text-sm text-[#3b260f]" key={`${note.day}-${note.characterIndex}-${note.topic}`}>
                    <strong className="block text-[#26170a]">Day {note.day}: {note.characterName}</strong>
                    <span className="block font-bold text-[#75501f]">{note.topic}</span>
                    <span>{note.note}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#3b260f]">Ask customers about routes, laws, prices, and their trade history to build this ledger.</p>
            )}
            <Button className="mt-4 w-full" variant="secondary" onClick={onBack}>Back</Button>
          </Panel>
        </aside>
      </div>
    </ScreenFrame>
  );
}
