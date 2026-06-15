import { Search, X } from "lucide-react";
import { items, type GameState, visibleQuantity } from "@/lib/game";
import { Button, IconButton, Panel } from "@/components/ui";

const categoryChips = ["food", "weapons", "armor", "books", "magic", "alchemy", "clothes", "jewelry"];
const statusChips = ["Protected", "Concealed", "Illegal", "Quest", "Highlighted"];

export function InventoryFilterView({ state, onBack }: { state: GameState; onBack: () => void }) {
  const visibleEntries = state.playerInventory.filter((entry) => visibleQuantity(entry) > 0);
  const totalTags = new Set(visibleEntries.flatMap((entry) => items[entry.itemIndex].tags));
  return (
    <section className="relative grid w-full place-items-center overflow-hidden rounded-3xl border-2 border-brass/60 bg-panel/80 p-5 shadow-2xl shadow-black/50">
      <div className="absolute inset-5 grid grid-cols-2 gap-2 opacity-20 md:grid-cols-4 xl:grid-cols-6" aria-hidden="true">{visibleEntries.slice(0, 30).map((entry) => <span key={entry.itemIndex} className="rounded-xl border border-brass-soft/50 bg-black/50 p-2 text-xs">{items[entry.itemIndex].name}<small className="float-right text-brass">{visibleQuantity(entry)}</small></span>)}</div>
      <Panel className="relative z-10 w-full max-w-2xl" title={<span className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-2"><Search size={18} /> Search Inventory</span><IconButton onClick={onBack} aria-label="Close search"><X size={16} /></IconButton></span>}>
        <label className="grid gap-1 text-sm"><span className="text-brass">Search by name or tag</span><input className="rounded-lg border border-brass-soft bg-ink/80 px-3 py-2 text-parchment outline-none focus:border-brass" autoFocus placeholder="copper, food, weapon..." /></label>
        <div className="mt-3 rounded-xl border border-brass-soft/60 bg-black/25 p-3 text-sm">Result count: {visibleEntries.length}</div>
        <ChipSection title="Category chips" chips={categoryChips} active={(chip) => totalTags.has(chip)} />
        <ChipSection title="Status toggles" chips={statusChips} />
        <div className="mt-4 grid grid-cols-3 gap-2"><Button subtle>Name ↓</Button><Button subtle>Value ↓</Button><Button subtle>Quantity ↓</Button></div>
        <footer className="mt-4 flex justify-end gap-2"><Button subtle onClick={onBack}>Clear</Button><Button onClick={onBack}>Apply</Button></footer>
      </Panel>
    </section>
  );
}

function ChipSection({ title, chips, active = () => false }: { title: string; chips: string[]; active?: (chip: string) => boolean }) { return <div className="mt-4"><strong className="text-brass">{title}</strong><div className="mt-2 flex flex-wrap gap-2">{chips.map((chip) => <button className={`rounded-full border px-3 py-1 text-sm ${active(chip) ? "border-brass bg-ember" : "border-brass-soft/60 bg-black/25"}`} key={chip} type="button">{chip}</button>)}</div></div>; }
