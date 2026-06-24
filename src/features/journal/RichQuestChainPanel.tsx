import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ClipboardList, Lock, Play, ScrollText, Star, StepForward, XCircle } from "lucide-react";
import { characterExpressionPortrait, characterIdentityById } from "@/data/characters/characterPortraitManifest";
import { Button, LedgerRow, Panel, StatChip } from "@/components/ui";
import {
  acceptFirstPlayableQuest,
  advanceFirstPlayableQuest,
  buildFirstPlayableQuestChainView,
  chooseFirstPlayableQuestOutcome,
  createFirstPlayableQuestChainState,
  ensureFirstPlayableQuestChainState,
  failFirstPlayableQuest,
  selectFirstPlayableQuest,
  type FirstPlayableQuestCard,
  type FirstPlayableQuestChainState,
} from "@/lib/first-playable-quest-chain";
import { richQuestStatus } from "@/lib/quest-state";

const STORAGE_KEY = "merchant-rich-quest-chain-v1";

function loadChainState(day: number) {
  if (typeof window === "undefined") return createFirstPlayableQuestChainState(day);
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return ensureFirstPlayableQuestChainState(raw ? JSON.parse(raw) : null, day);
  } catch {
    return createFirstPlayableQuestChainState(day);
  }
}

function saveChainState(state: FirstPlayableQuestChainState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function statusClass(status: string) {
  if (status === "completed") return "border-[#1f6f38]/50 bg-[#e5f3d0]/80 text-[#1f6f38]";
  if (status === "failed" || status === "expired") return "border-[#8d271f]/50 bg-[#ffe0d6]/80 text-[#8d271f]";
  if (status === "in_progress" || status === "ready_to_turn_in" || status === "accepted") return "border-[#1f5960]/50 bg-[#d8f0eb]/80 text-[#1f5960]";
  if (status === "locked") return "border-[#9a7138]/40 bg-[#e9d7b5]/70 text-[#7b5726]";
  return "border-[#9a7138]/55 bg-[#fff6d7]/75 text-[#75501f]";
}

function giverProfile(card: FirstPlayableQuestCard) {
  const id = card.quest.giverNpcId;
  return {
    profile: characterIdentityById.get(id) || null,
    portrait: characterExpressionPortrait(id, "neutral")?.assetPath || "",
  };
}

export function RichQuestChainPanel({ day }: { day: number }) {
  const [chainState, setChainState] = useState(() => loadChainState(day));
  const view = useMemo(() => buildFirstPlayableQuestChainView(chainState), [chainState]);
  const selected = view.selectedQuest;
  const giver = giverProfile(selected);
  const selectedStatus = richQuestStatus(chainState, selected.id);

  useEffect(() => {
    setChainState((current) => ensureFirstPlayableQuestChainState({ ...current, day }, day));
  }, [day]);

  useEffect(() => {
    saveChainState(chainState);
  }, [chainState]);

  function update(mutator: (current: FirstPlayableQuestChainState) => FirstPlayableQuestChainState) {
    setChainState((current) => ensureFirstPlayableQuestChainState(mutator(current), day));
  }

  return (
    <Panel title={<span className="inline-flex items-center gap-2"><Star size={18} /> First Playable Story Chain</span>} variant="parchment">
      <div className="mb-4 grid gap-2 md:grid-cols-4">
        <StatChip label="Progress" value={`${view.completedCount}/${view.totalCount}`} />
        <StatChip label="Active" value={view.activeCount} />
        <StatChip label="Complete" value={`${view.progressPercent}%`} />
        <StatChip label="Company" value={view.unlockedCompanyFeatures.length ? "Ready" : "Locked"} />
      </div>

      <p className="mb-4 rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/55 p-3 text-sm font-bold leading-snug text-[#3b260f]">
        {view.summary}
      </p>

      <div className="grid gap-4 xl:grid-cols-[18rem_minmax(0,1fr)]">
        <div className="grid content-start gap-2">
          {view.cards.map((card, index) => {
            const status = richQuestStatus(chainState, card.id);
            return (
              <button
                className={`rounded-sm border p-3 text-left shadow-sm transition hover:-translate-y-0.5 ${view.selectedQuestId === card.id ? "border-[#1f5960] bg-[#fff8df]" : "border-[#9a7138]/45 bg-[#fff6d7]/55"}`}
                key={card.id}
                type="button"
                onClick={() => update((current) => selectFirstPlayableQuest(current, card.id))}
              >
                <span className="mb-1 flex items-center justify-between gap-2">
                  <strong className="font-display text-xl leading-none text-[#26170a]">{index + 1}. {card.title}</strong>
                  {card.lockedByPreviousQuest ? <Lock size={15} className="text-[#7b5726]" /> : null}
                </span>
                <span className={`inline-flex rounded-full border px-2 py-0.5 text-[0.65rem] font-black uppercase tracking-wide ${statusClass(status)}`}>{status.replaceAll("_", " ")}</span>
                <p className="mt-2 line-clamp-2 text-xs font-bold leading-snug text-[#5b3b17]">{card.storyHook}</p>
              </button>
            );
          })}
        </div>

        <div className="grid gap-4">
          <div className="grid gap-3 rounded-sm border-2 border-[#c89d55] bg-[#fff4c5]/75 p-4 shadow-inner lg:grid-cols-[7rem_minmax(0,1fr)]">
            <span className="grid h-28 w-28 place-items-center overflow-hidden rounded-sm border border-[#9a7138]/70 bg-[#f2ddb1] text-[#26170a] shadow-inner">
              {giver.portrait ? <img className="h-full w-full object-cover object-top" src={giver.portrait} alt={giver.profile?.finalDisplayName || selected.portraitCharacterId} /> : <ScrollText />}
            </span>
            <div className="min-w-0">
              <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#7b5726]">{selected.actLabel} / {selected.category}</p>
              <h2 className="font-display text-4xl leading-none text-[#26170a]">{selected.title}</h2>
              <p className="mt-2 text-sm font-bold text-[#5b3b17]">Giver: {giver.profile?.finalDisplayName || selected.portraitCharacterId}</p>
              <p className="mt-2 text-base leading-snug text-[#3b260f]">{selected.quest.storyPremise}</p>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]">
              <strong className="block text-[#26170a]">Current Stage</strong>
              <span className="font-bold text-[#75501f]">{selected.currentStage?.title || "No active stage"}</span>
              <p className="mt-1">{selected.currentStage?.story || selected.storyHook}</p>
              <p className="mt-2 font-bold text-[#1f5960]">{selected.currentStage?.objective || "Choose how to begin."}</p>
            </div>
            <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]">
              <strong className="block text-[#26170a]">Stakes</strong>
              <p>{selected.stakes}</p>
              <p className="mt-2 font-bold text-[#75501f]">Merchant pressure: {selected.quest.merchantConflict}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button disabled={!selected.canAccept} onClick={() => update((current) => acceptFirstPlayableQuest(current, selected.id))}><Play size={16} /> Accept</Button>
            <Button disabled={!selected.canAdvance} variant="secondary" onClick={() => update((current) => advanceFirstPlayableQuest(current, selected.id))}><StepForward size={16} /> Advance Stage</Button>
            <Button disabled={selectedStatus === "completed" || selectedStatus === "locked" || selectedStatus === "failed"} subtle onClick={() => update((current) => failFirstPlayableQuest(current, selected.id))}><XCircle size={16} /> Mark Failed</Button>
            <Button subtle onClick={() => setChainState(createFirstPlayableQuestChainState(day))}>Reset Chain</Button>
          </div>

          <div className="grid gap-2">
            <h3 className="font-display text-2xl text-[#26170a]">Approaches</h3>
            {selected.approaches.map((choice) => (
              <div className="rounded-sm border border-[#9a7138]/45 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]" key={choice.id}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <span>
                    <strong className="block text-[#26170a]">{choice.label}</strong>
                    <span className="font-bold uppercase tracking-wide text-[#75501f]">{choice.approach}</span>
                    <p className="mt-1">{choice.description}</p>
                  </span>
                  <Button disabled={!selected.canResolve || selectedStatus === "completed"} size="sm" onClick={() => update((current) => chooseFirstPlayableQuestOutcome(current, selected.id, choice.id))}>
                    <CheckCircle2 size={15} /> Resolve
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]">
              <strong className="block text-[#26170a]">Rewards / Unlocks</strong>
              <div className="mt-2 grid gap-1">
                {[...selected.rewardPreview, ...(selected.quest.unlocks || []).map((unlock) => unlock.label)].slice(0, 8).map((text) => <span key={text}>- {text}</span>)}
              </div>
            </div>
            <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]">
              <strong className="block text-[#26170a]">Consequences</strong>
              <div className="mt-2 grid gap-1">
                {selected.consequencePreview.map((text) => <span key={text}>- {text}</span>)}
              </div>
            </div>
          </div>

          {view.leadingEndingScores.length || selected.notes.length ? (
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]">
                <strong className="block text-[#26170a]">Ending Pressure</strong>
                <div className="mt-2 grid gap-1">
                  {view.leadingEndingScores.length ? view.leadingEndingScores.map(([key, value]) => <span key={key}>{key}: {value}</span>) : <span>No ending pressure yet.</span>}
                </div>
              </div>
              <div className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm text-[#3b260f]">
                <strong className="block text-[#26170a]">Quest Notes</strong>
                <div className="mt-2 grid max-h-32 gap-1 overflow-auto pr-1">
                  {selected.notes.slice(-6).map((note, index) => <span key={`${selected.id}-${index}`}>- {note}</span>)}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Panel>
  );
}
