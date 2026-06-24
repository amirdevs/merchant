import { Search, X } from "lucide-react";
import { items, type GameState, visibleQuantity } from "@/game/runtime/game";
import { uiAssets } from "@/shared/utils/ui-assets";
import { Button, IconButton, Panel, ScreenFrame, TabButton } from "@/shared/components/ui";

const categoryChips = ["food", "weapons", "armor", "books", "magic", "alchemy", "clothes", "jewelry"];
const statusChips = ["Protected", "Concealed", "Illegal", "Quest", "Highlighted"];

export function InventoryFilterView({ state, onBack }: { state: GameState; onBack: () => void }) {
  const visibleEntries = state.playerInventory.filter((entry) => visibleQuantity(entry) > 0);
  const totalTags = new Set(visibleEntries.flatMap((entry) => items[entry.itemIndex].tags));
  return (
    <ScreenFrame backdrop={uiAssets.backplates.warehouseInventory} overlay="dark" contentClassName="place-items-center">
      <Panel className="relative z-10 w-full max-w-2xl" variant="parchment" title={<span className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-2"><Search size={18} /> Search Inventory</span><IconButton onClick={onBack} aria-label="Close search"><X size={16} /></IconButton></span>}>
        <label className="grid gap-1 text-sm text-[#725331]"><span className="font-bold text-[#5a3715]">Search by name or tag</span><input className="rounded-md border border-[#9a7138]/70 bg-[#fff8df]/80 px-3 py-2 text-[#26170a] outline-none focus:border-[#1f5960]" autoFocus placeholder="copper, food, weapon..." /></label>
        <div className="mt-3 rounded-md border border-[#9a7138]/60 bg-[#fff6d7]/45 p-3 text-sm text-[#3b260f]">Result count: {visibleEntries.length}</div>
        <ChipSection title="Category chips" chips={categoryChips} active={(chip) => totalTags.has(chip)} />
        <ChipSection title="Status toggles" chips={statusChips} />
        <div className="mt-4 grid grid-cols-3 gap-2"><TabButton>Name</TabButton><TabButton>Value</TabButton><TabButton>Quantity</TabButton></div>
        <footer className="mt-4 flex justify-end gap-2"><Button subtle onClick={onBack}>Clear</Button><Button onClick={onBack}>Apply</Button></footer>
      </Panel>
    </ScreenFrame>
  );
}

function ChipSection({ title, chips, active = () => false }: { title: string; chips: string[]; active?: (chip: string) => boolean }) {
  return <div className="mt-4"><strong className="text-[#5a3715]">{title}</strong><div className="mt-2 flex flex-wrap gap-2">{chips.map((chip) => <button className={`rounded-full border px-3 py-1 text-sm ${active(chip) ? "border-[#1f5960] bg-[#1f5960]/20 text-[#1c1309]" : "border-[#9a7138]/60 bg-[#fff6d7]/45 text-[#3b260f]"}`} key={chip} type="button">{chip}</button>)}</div></div>;
}
