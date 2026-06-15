import { MessageSquare, UserRound } from "lucide-react";
import type { Character } from "@/data/types";
import { portraitAsset } from "@/lib/assets";
import type { GameView } from "@/app/types";
import { Button, Panel } from "@/components/ui";

export function CustomersView({ people, selected, onSelect, onNext, onNavigate }: { people: Character[]; selected: Character | null; onSelect: (person: Character) => void; onNext: () => void; onNavigate: (view: GameView) => void }) {
  return (
    <section className="grid w-full gap-5 rounded-3xl border-2 border-brass/60 bg-panel/90 p-5 shadow-2xl shadow-black/50 xl:grid-cols-[1fr_420px]">
      <Panel title="Notable Customers">
        <div className="mb-3 flex flex-wrap gap-2"><Button subtle>Profession</Button><Button subtle>Quest</Button><Button subtle>Merchant</Button><Button subtle>Search</Button></div>
        <div className="grid max-h-[68vh] gap-3 overflow-auto pr-1 md:grid-cols-2">
          {people.map((person) => <button key={person.index} type="button" onClick={() => onSelect(person)} className={`flex gap-3 rounded-2xl border p-3 text-left transition hover:border-brass ${selected?.index === person.index ? "border-brass bg-ember/60" : "border-brass-soft/60 bg-black/25"}`}><Portrait person={person} /><div className="min-w-0"><strong className="block truncate font-display text-xl">{person.name}</strong><span className="text-sm text-brass">{person.profession}</span><p className="mt-1 line-clamp-2 text-xs text-parchment-muted">{person.dialogue?.preference || person.dialogue?.who || "No notes in ledger."}</p><span className="mt-2 block text-xs text-parchment-muted">Affiliation: local · stock preview · quest marker</span></div></button>)}
        </div>
      </Panel>
      <aside className="grid gap-4">
        <Panel title="Customer Dossier">
          {selected ? <div><Portrait person={selected} large /><h2 className="mt-3 font-display text-3xl">{selected.name}</h2><p className="text-brass">{selected.profession}</p><dl className="mt-3 grid grid-cols-2 gap-2 text-sm"><Stat label="Wealth" value="Budget hint" /><Stat label="Trade style" value="Preference hint" /><Stat label="Likes" value="Known tags" /><Stat label="Dislikes" value="Known tags" /></dl><p className="mt-3 text-sm text-parchment-muted">{selected.dialogue?.who || selected.dialogue?.customReply || "A market customer waiting to bargain."}</p><div className="mt-4 flex flex-wrap gap-2"><Button subtle><MessageSquare size={16} /> Talk</Button><Button onClick={() => onNavigate("barter")}>Trade</Button><Button subtle onClick={onNext}>Next Customer</Button></div></div> : <div className="grid place-items-center rounded-2xl border border-dashed border-brass-soft/60 p-8 text-center text-parchment-muted"><UserRound className="mb-3" /> Select a customer to inspect their preferences.</div>}
        </Panel>
      </aside>
    </section>
  );
}

function Portrait({ person, large }: { person: Character; large?: boolean }) { const src = portraitAsset(person.portraitFile); return <span className={`${large ? "h-40 w-40" : "h-16 w-16"} grid shrink-0 place-items-center overflow-hidden rounded-2xl border border-brass-soft bg-parchment/85 text-ink`}>{src ? <img className="h-full w-full object-cover" src={src} alt="" /> : <UserRound />}</span>; }
function Stat({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-brass-soft/60 bg-black/25 p-2"><dt className="text-brass">{label}</dt><dd className="text-parchment-muted">{value}</dd></div>; }
