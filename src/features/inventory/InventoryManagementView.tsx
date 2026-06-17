import type { ReactNode } from "react";
import { BookOpen, Box, Grid3X3, PackageSearch, Search, Shield, Star } from "lucide-react";
import type { InventoryEntry } from "@/data/types";
import type { GameState } from "@/lib/game";
import type { MoveAmount } from "@/lib/inventory";
import { itemIconAsset } from "@/lib/assets";
import { items, visibleQuantity } from "@/lib/game";
import { money } from "@/lib/format";
import { uiAssets } from "@/lib/ui-assets";
import { InventoryPanel } from "@/components/InventoryPanel";
import { Button, ItemSlot, Panel, ScreenFrame, StatChip } from "@/components/ui";

type InventoryManagementViewProps = {
  state: GameState;
  playerOffer: number;
  onMovePlayer: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  onTogglePlayerProtect: (entry: InventoryEntry) => void;
  onOpenFilter: () => void;
  onOpenItemDetail: () => void;
};

export function InventoryManagementView({ state, onMovePlayer, onTogglePlayerProtect, onOpenFilter, onOpenItemDetail }: InventoryManagementViewProps) {
  const carriedEntries = state.playerInventory.filter((entry) => visibleQuantity(entry) > 0);
  const totalValue = carriedEntries.reduce((total, entry) => total + items[entry.itemIndex].loafValue * visibleQuantity(entry), 0);
  const totalWeight = carriedEntries.reduce((total, entry) => total + items[entry.itemIndex].weight * visibleQuantity(entry), 0);
  const selected = carriedEntries[0];
  const selectedItem = selected ? items[selected.itemIndex] : null;

  return (
    <ScreenFrame title="Inventory Management" eyebrow="Cargo Ledger" backdrop={uiAssets.backplates.warehouseInventory} overlay="dark" contentClassName="p-2 lg:p-3">
      <div className="grid flex-1 gap-3 xl:grid-cols-[140px_minmax(0,1fr)_360px]">
        <aside className="rounded-sm border-2 border-[#b98b37] p-2 shadow-2xl shadow-black/40" style={{ backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.05), rgba(0,0,0,.34)), url("${uiAssets.nineSlice.textureWoodDark}")` }}>
          <div className="grid gap-3">
            <InventoryTab active icon={<PackageSearch size={30} />} label="Inventory" />
            <InventoryTab icon={<BookOpen size={30} />} label="Catalogs" />
            <InventoryTab icon={<Shield size={30} />} label="Equipment" />
            <InventoryTab icon={<Box size={30} />} label="Shipments" />
            <InventoryTab icon={<Star size={30} />} label="Collections" />
          </div>
        </aside>

        <Panel className="p-4" title="Inventory Grid" variant="parchment">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div className="flex min-w-[20rem] flex-1 flex-wrap gap-2">
              <Button variant="primary">All</Button>
              <Button variant="secondary">Goods</Button>
              <Button variant="secondary">Materials</Button>
              <Button variant="secondary">Luxuries</Button>
              <Button variant="secondary">Quest Items</Button>
            </div>
            <button className="flex min-h-11 w-56 items-center gap-3 rounded-sm border border-[#b98b37]/65 bg-[#fff6d7]/65 px-4 text-left text-[#3b260f]" type="button" onClick={onOpenFilter}>
              <Search size={24} />
              <span className="text-base text-[#725331]">Search items...</span>
            </button>
            <button className="flex min-h-11 w-52 items-center justify-between gap-3 rounded-sm border border-[#b98b37]/65 bg-[#fff6d7]/65 px-4 text-left text-base text-[#3b260f]" type="button">
              <span>Sort by: Value</span>
              <Grid3X3 size={22} />
            </button>
          </div>
          <InventoryPanel title="Cargo" subtitle="Quantities, value, protection, legality, quest and highlight markers." inventory={state.playerInventory} variant="management" onMove={(entry, amount) => onMovePlayer(entry, amount)} onMoveAll={(entry) => onMovePlayer(entry, "all")} onToggleProtect={onTogglePlayerProtect} allowProtect />
          <div className="mt-4 grid gap-3 md:grid-cols-[180px_1fr_220px]">
            <StatChip label="Capacity" value={`${totalWeight} / 200`} icon={uiAssets.hud.weight} />
            <StatChip label="Total Value" value={money(totalValue)} icon={uiAssets.hud.goldCoin} />
            <Button size="lg" variant="secondary"><Grid3X3 size={18} /> Bulk Actions</Button>
          </div>
        </Panel>

        <aside className="grid content-start gap-3">
          <Panel title="Selected Item" variant="parchment">
            {selected && selectedItem ? (
              <>
                <div
                  className="grid min-h-56 place-items-center rounded-sm border border-[#c89d55]/45 p-4 shadow-inner shadow-[#6c4418]/15"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.08), rgba(0,0,0,.05)), url("${uiAssets.inventory.selectedItemInspectorPanel}")`,
                    backgroundSize: "100% 100%",
                  }}
                >
                  <ItemSlot className="w-48" imageSrc={itemIconAsset(selectedItem.iconFile)} selected />
                </div>
                <h2 className="mt-4 font-display text-3xl text-[#26170a]">{selectedItem.name}</h2>
                <p className="text-sm text-[#725331]">{selectedItem.tags.join(" / ")}</p>
                <dl className="mt-3 grid grid-cols-2 gap-2">
                  <StatChip label="Qty" value={visibleQuantity(selected)} />
                  <StatChip label="Value" value={money(selectedItem.loafValue)} />
                  <StatChip label="Weight" value={selectedItem.weight} />
                  <StatChip label="Size" value={selectedItem.size} />
                </dl>
                <div className="mt-5 grid grid-cols-2 gap-2"><Button size="lg" onClick={() => onMovePlayer(selected, 1)}>Add to Offer</Button><Button size="lg" variant="secondary" onClick={() => onTogglePlayerProtect(selected)}>{selected.protected ? "Unprotect" : "Protect"}</Button><Button className="col-span-2" size="lg" variant="secondary" onClick={onOpenItemDetail}>More</Button></div>
              </>
            ) : <p>No item selected.</p>}
          </Panel>
          <InventoryPanel title="Current Offer" mode="offer" variant="compact" inventory={state.playerInventory} onMove={(entry, amount) => onMovePlayer(entry, amount, true)} onMoveAll={(entry) => onMovePlayer(entry, "none", true)} />
        </aside>
      </div>
    </ScreenFrame>
  );
}

function InventoryTab({ active, icon, label }: { active?: boolean; icon: ReactNode; label: string }) {
  return (
    <button
      className={`grid min-h-24 place-items-center gap-1 rounded-sm border-2 px-2 py-3 font-display text-lg font-bold shadow-lg shadow-black/35 [text-shadow:0_1px_2px_rgba(0,0,0,.9)] ${active ? "border-[#d7ad55] text-[#fff8d8]" : "border-[#b98b37]/80 text-[#fff0bf]"}`}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.08), rgba(0,0,0,.54)), url("${active ? uiAssets.nineSlice.textureEnamelBlue : uiAssets.nineSlice.textureWoodDark}")`,
        backgroundSize: "cover",
      }}
      type="button"
    >
      <span className="text-[#ffd975]">{icon}</span>
      <span className="rounded-sm bg-black/25 px-2 py-0.5">{label}</span>
    </button>
  );
}
