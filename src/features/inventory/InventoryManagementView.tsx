import { Search } from "lucide-react";
import type { InventoryEntry } from "@/data/types";
import type { GameState } from "@/lib/game";
import type { MoveAmount } from "@/lib/inventory";
import { itemIconAsset } from "@/lib/assets";
import { items, visibleQuantity } from "@/lib/game";
import { money } from "@/lib/format";
import { InventoryPanel } from "@/components/InventoryPanel";
import { Button, Panel } from "@/components/ui";

type InventoryManagementViewProps = {
  state: GameState;
  playerOffer: number;
  onMovePlayer: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  onTogglePlayerProtect: (entry: InventoryEntry) => void;
  onOpenFilter: () => void;
  onOpenItemDetail: () => void;
};

export function InventoryManagementView({ state, playerOffer, onMovePlayer, onTogglePlayerProtect, onOpenFilter, onOpenItemDetail }: InventoryManagementViewProps) {
  const carriedEntries = state.playerInventory.filter((entry) => visibleQuantity(entry) > 0);
  const protectedEntries = carriedEntries.filter((entry) => entry.protected);
  const totalValue = carriedEntries.reduce((total, entry) => total + items[entry.itemIndex].loafValue * visibleQuantity(entry), 0);
  const totalWeight = carriedEntries.reduce((total, entry) => total + items[entry.itemIndex].weight * visibleQuantity(entry), 0);
  const selected = carriedEntries[0];
  const selectedItem = selected ? items[selected.itemIndex] : null;

  return (
    <section className="grid w-full gap-4 rounded-3xl border-2 border-brass/60 bg-panel/90 p-5 shadow-2xl shadow-black/50 xl:grid-cols-[280px_1fr_360px]">
      <aside className="grid content-start gap-4">
        <Panel title="Cargo Summary"><dl className="grid gap-2"><Stat label="Total value" value={money(totalValue)} /><Stat label="Offer value" value={money(playerOffer)} /><Stat label="Capacity used / limit" value={`${totalWeight} / capacity`} /><Stat label="Goods" value={carriedEntries.length} /><Stat label="Protected" value={protectedEntries.length} /></dl></Panel>
        <Panel title="Toolbar"><div className="grid gap-2"><Button subtle onClick={onOpenFilter}><Search size={16} /> Search</Button><Button subtle>Category</Button><Button subtle>Sort</Button><Button subtle>Show illegal</Button><Button subtle>Show quest</Button><Button subtle>Bulk actions</Button></div></Panel>
        <Button onClick={onOpenFilter}><Search size={16} /> Search / Filter</Button>
        <Button subtle onClick={onOpenItemDetail}>Item Detail</Button>
      </aside>
      <InventoryPanel title="Inventory Grid" subtitle="Variable-size goods, quantities, value, protection, concealment, legality, quest and highlight markers." inventory={state.playerInventory} variant="management" onMove={(entry, amount) => onMovePlayer(entry, amount)} onMoveAll={(entry) => onMovePlayer(entry, "all")} onToggleProtect={onTogglePlayerProtect} allowProtect />
      <aside className="grid gap-4">
        <Panel title="Selected Item Inspector">
          {selected && selectedItem ? (
            <>
              <div className="grid h-40 place-items-center overflow-hidden rounded-2xl border border-brass-soft bg-parchment/90 text-ink">{selectedItem.iconFile ? <img className="h-full w-full object-contain p-3" src={itemIconAsset(selectedItem.iconFile)} alt="" /> : null}</div>
              <h2 className="mt-3 font-display text-2xl">{selectedItem.name}</h2>
              <p className="text-sm text-parchment-muted">{selectedItem.tags.join(" · ")}</p>
              <dl className="mt-3 grid grid-cols-2 gap-2"><Stat label="Qty" value={visibleQuantity(selected)} /><Stat label="Value" value={money(selectedItem.loafValue)} /><Stat label="Weight" value={selectedItem.weight} /><Stat label="Size" value={selectedItem.size} /><Stat label="Legality" value="Legal here" /><Stat label="Notes" value="Highlight off" /></dl>
              <div className="mt-3 flex flex-wrap gap-2 text-xs"><Marker label="Protected" active={selected.protected} /><Marker label="Concealed" /><Marker label="Illegal" /><Marker label="Quest" /><Marker label="Highlight" /></div>
              <div className="mt-4 flex flex-wrap gap-2"><Button onClick={() => onMovePlayer(selected, 1)}>Add to Offer</Button><Button subtle onClick={() => onTogglePlayerProtect(selected)}>{selected.protected ? "Unprotect" : "Protect"}</Button></div>
            </>
          ) : <p>No item selected.</p>}
        </Panel>
        <InventoryPanel title="Current Offer" mode="offer" variant="compact" inventory={state.playerInventory} onMove={(entry, amount) => onMovePlayer(entry, amount, true)} onMoveAll={(entry) => onMovePlayer(entry, "none", true)} />
      </aside>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) { return <div className="flex items-center justify-between rounded-xl border border-brass-soft/50 bg-black/25 p-2 text-sm"><dt className="text-brass">{label}</dt><dd>{value}</dd></div>; }
function Marker({ label, active = false }: { label: string; active?: boolean }) { return <span className={`rounded-full border px-2 py-1 ${active ? "border-brass bg-ember" : "border-brass-soft/60 bg-black/25 text-parchment-muted"}`}>{label}</span>; }
