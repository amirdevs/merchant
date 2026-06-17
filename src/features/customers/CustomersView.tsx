import { MessageSquare, Search, UserRound } from "lucide-react";
import type { Character } from "@/data/types";
import { portraitAsset } from "@/lib/assets";
import { uiAssets } from "@/lib/ui-assets";
import type { GameView } from "@/app/types";
import { Button, Panel, ScreenFrame, StatChip, TabButton } from "@/components/ui";

export function CustomersView({ people, selected, onSelect, onNext, onNavigate }: { people: Character[]; selected: Character | null; onSelect: (person: Character) => void; onNext: () => void; onNavigate: (view: GameView) => void }) {
  return (
    <ScreenFrame title="Customers" eyebrow="Roster and Dossier" backdrop={uiAssets.backplates.marketTown} overlay="light">
      <div className="grid flex-1 gap-5 xl:grid-cols-[1fr_420px]">
        <Panel title="Notable Customers" variant="parchment">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <TabButton active>All</TabButton>
            <TabButton>Profession</TabButton>
            <TabButton>Quest</TabButton>
            <div className="ml-auto flex min-w-48 items-center gap-2 rounded-md border border-[#9a7138]/65 bg-[#fff6d7]/55 px-3 py-1.5 text-sm text-[#725331]">
              <Search size={15} />
              <span>Search...</span>
            </div>
          </div>
          <div className="overflow-auto rounded-md border border-[#9a7138]/65 bg-[#fff6d7]/45 shadow-inner shadow-[#6c4418]/20">
            <div className="grid min-w-[760px] grid-cols-[78px_1.2fr_1fr_1fr_100px_100px_92px] gap-2 border-b border-[#9a7138]/55 bg-[#5b3a18]/20 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#75501f]">
              <span>Portrait</span><span>Name</span><span>Profession</span><span>Talk Style</span><span>Likes</span><span>Stock</span><span>Status</span>
            </div>
            {people.map((person) => (
              <button
                key={person.index}
                className={`grid min-w-[760px] grid-cols-[78px_1.2fr_1fr_1fr_100px_100px_92px] items-center gap-2 border-b border-[#9a7138]/35 px-3 py-2 text-left text-sm text-[#2a1a0c] transition hover:bg-[#f7e5bc]/70 ${selected?.index === person.index ? "bg-[#dcb96d]/45" : "bg-transparent"}`}
                onClick={() => onSelect(person)}
              >
                <Portrait person={person} />
                <strong className="truncate font-display text-lg leading-none text-[#26170a]">{person.name}</strong>
                <span className="truncate">{person.profession}</span>
                <span className="truncate text-[#725331]">{person.dialogue?.preference || person.dialogue?.customQuestion || "No notes"}</span>
                <span>{person.bias.filter((bias) => bias.percent > 0).length || "-"}</span>
                <span>{person.inventory.length || "-"}</span>
                <span className="rounded-full border border-[#9a7138]/60 bg-[#fff6d7]/70 px-2 py-1 text-center text-[0.68rem] font-bold uppercase tracking-wide text-[#75501f]">Normal</span>
              </button>
            ))}
          </div>
        </Panel>
        <Panel title="Customer Dossier" variant="parchment">
          {selected ? (
            <div>
              <div className="flex justify-center"><Portrait person={selected} large /></div>
              <h2 className="mt-3 text-center font-display text-3xl text-[#26170a]">{selected.name}</h2>
              <p className="text-center font-bold text-[#75501f]">{selected.profession}</p>
              <dl className="mt-3 grid grid-cols-2 gap-2">
                <StatChip label="Wealth" value="Budget hint" />
                <StatChip label="Trade style" value="Preference hint" />
                <StatChip label="Likes" value="Known tags" />
                <StatChip label="Dislikes" value="Known tags" />
              </dl>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-[#3b260f]">
                {(selected.obtainableItems || []).slice(0, 4).map((pool) => <span key={pool.tag} className="rounded border border-[#9a7138]/45 bg-[#fff6d7]/55 px-2 py-1">{pool.tag}</span>)}
              </div>
              <p className="mt-3 rounded-md border border-[#9a7138]/60 bg-[#fff6d7]/45 p-3 text-sm text-[#3b260f]">{selected.dialogue?.who || selected.dialogue?.customReply || "A market customer waiting to bargain."}</p>
              <div className="mt-4 flex flex-wrap gap-2"><Button subtle><MessageSquare size={16} /> Talk</Button><Button onClick={() => onNavigate("barter")}>Trade</Button><Button subtle onClick={onNext}>Next Customer</Button></div>
            </div>
          ) : (
            <div className="grid place-items-center rounded-md border border-dashed border-[#9a7138]/60 p-8 text-center text-[#725331]"><UserRound className="mb-3" /> Select a customer to inspect their preferences.</div>
          )}
        </Panel>
      </div>
    </ScreenFrame>
  );
}

function Portrait({ person, large }: { person: Character; large?: boolean }) {
  const src = portraitAsset(person.portraitFile);
  return (
    <span className={`${large ? "h-40 w-40" : "h-12 w-12"} grid shrink-0 place-items-center overflow-hidden rounded-md border border-[#9a7138]/70 bg-[#f2ddb1] text-[#26170a]`}>
      {src ? <img className="h-full w-full object-cover" src={src} alt="" /> : <UserRound />}
    </span>
  );
}
