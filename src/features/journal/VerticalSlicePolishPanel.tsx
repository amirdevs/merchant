import { CheckCircle2, ClipboardCheck, Sparkles, TriangleAlert } from "lucide-react";
import { Panel, StatChip } from "@/shared/components/ui";
import type { GameState } from "@/game/runtime/game";
import { buildVerticalSlicePolishReport } from "@/game/vertical-slice/vertical-slice-polish";
import type { GameStateWithPlayableLoop } from "@/game/vertical-slice/game-runtime-loop";

function statusClass(status: string) {
  if (status === "done") return "border-[#1f6f38]/45 bg-[#fff6d7]/70 text-[#1f6f38]";
  if (status === "watch") return "border-[#b98b37]/65 bg-[#fff6d7]/70 text-[#75501f]";
  return "border-[#8d271f]/45 bg-[#fff6d7]/70 text-[#8d271f]";
}

function StatusIcon({ status }: { status: string }) {
  if (status === "done") return <CheckCircle2 size={15} />;
  if (status === "watch") return <TriangleAlert size={15} />;
  return <ClipboardCheck size={15} />;
}

export function VerticalSlicePolishPanel({ state }: { state: GameState }) {
  const report = buildVerticalSlicePolishReport(state as GameStateWithPlayableLoop);

  return (
    <Panel title={<span className="inline-flex items-center gap-2"><Sparkles size={18} /> Full Vertical Slice Polish</span>} variant="parchment">
      <div className="grid gap-3 text-[#3b260f]">
        <p className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-3 text-sm font-bold leading-snug">
          Phase 8 is the alpha-readiness pass. It checks whether the saved merchant loop, rich quest chain, company milestone, visible consequences, economy hooks, and player guidance feel like one playable game instead of separate prototype panels.
        </p>

        <div className="grid gap-2 md:grid-cols-4">
          <StatChip label="Alpha Score" value={`${report.alphaReadinessScore}%`} />
          <StatChip label="Label" value={report.alphaLabel} />
          <StatChip label="Done Checks" value={`${report.completedChecks}/${report.totalChecks}`} />
          <StatChip label="Main Action" value={report.primaryNextAction} />
        </div>

        <div className="rounded-sm border border-[#1f5960]/35 bg-[#fff6d7]/65 p-3">
          <strong className="block font-display text-2xl text-[#26170a]">Player Flow</strong>
          <div className="mt-2 flex flex-wrap gap-2 text-xs font-black uppercase tracking-wide text-[#1f5960]">
            {report.flowPath.map((step, index) => (
              <span className="rounded-full border border-[#1f5960]/40 bg-[#fff6d7]/75 px-3 py-1" key={step}>
                {index + 1}. {step}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-2 md:grid-cols-2">
          {report.checks.map((check) => (
            <div className={`rounded-sm border p-3 text-sm ${statusClass(check.status)}`} key={check.id}>
              <div className="mb-1 flex items-center justify-between gap-2">
                <strong className="inline-flex items-center gap-2 text-[#26170a]"><StatusIcon status={check.status} /> {check.title}</strong>
                <span className="rounded-full border border-current px-2 py-0.5 text-[0.62rem] font-black uppercase tracking-wide">{check.status}</span>
              </div>
              <p className="font-bold leading-snug">{check.detail}</p>
              <p className="mt-2 text-xs font-black uppercase leading-snug tracking-wide opacity-85">Next: {check.action}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <div className="rounded-sm border border-[#9a7138]/45 bg-[#fff6d7]/60 p-3">
            <strong className="block font-display text-2xl text-[#26170a]">Release Checklist</strong>
            <ul className="mt-2 grid gap-1 text-sm font-bold">
              {report.releaseChecklist.map((item) => <li key={item}>- {item}</li>)}
            </ul>
          </div>
          <div className="rounded-sm border border-[#8d271f]/25 bg-[#fff6d7]/60 p-3">
            <strong className="block font-display text-2xl text-[#26170a]">Cleanup Guards</strong>
            <ul className="mt-2 grid gap-1 text-sm font-bold">
              {report.cleanupGuards.map((item) => <li key={item}>- {item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </Panel>
  );
}
