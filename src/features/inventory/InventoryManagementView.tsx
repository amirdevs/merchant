import { useMemo, useState, type ReactNode } from "react";
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
import { cn } from "@/lib/cn";

type InventoryManagementViewProps = {
  state: GameState;
  playerOffer: number;
  onMovePlayer: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  onTogglePlayerProtect: (entry: InventoryEntry) => void;
  onOpenFilter: () => void;
  onOpenItemDetail: () => void;
  onUnavailable: (message: string) => void;
};

type InventoryCategory = "All" | "Goods" | "Materials" | "Luxuries" | "Quest Items";
type InventorySort = "Value" | "Name" | "Quantity" | "Weight";

export function InventoryManagementView({ state, onMovePlayer, onTogglePlayerProtect, onOpenFilter, onOpenItemDetail, onUnavailable }: InventoryManagementViewProps) {
  const [category, setCategory] = useState<InventoryCategory>("All");
  const [sortBy, setSortBy] = useState<InventorySort>("Value");
  const carriedEntries = state.playerInventory.filter((entry) => visibleQuantity(entry) > 0);
  const filteredEntries = useMemo(() => {
    const matchesCategory = (entry: InventoryEntry) => {
      const item = items[entry.itemIndex];
      const tags = item.tags.map((tag) => tag.toLowerCase());
      if (category === "All") return true;
      if (category === "Goods") return true;
      if (category === "Materials") return tags.some((tag) => ["wood", "metal", "cloth", "leather", "stone"].includes(tag));
      if (category === "Luxuries") return tags.some((tag) => ["jewelry", "gem", "luxury", "art", "rare"].includes(tag)) || item.loafValue >= 250;
      return tags.some((tag) => ["quest", "map", "deed"].includes(tag)) || item.unique;
    };
    return carriedEntries
      .filter(matchesCategory)
      .sort((left, right) => {
        const leftItem = items[left.itemIndex];
        const rightItem = items[right.itemIndex];
        if (sortBy === "Name") return leftItem.name.localeCompare(rightItem.name);
        if (sortBy === "Quantity") return visibleQuantity(right) - visibleQuantity(left);
        if (sortBy === "Weight") return rightItem.weight - leftItem.weight;
        return rightItem.loafValue - leftItem.loafValue;
      });
  }, [carriedEntries, category, sortBy]);
  const totalValue = carriedEntries.reduce((total, entry) => total + items[entry.itemIndex].loafValue * visibleQuantity(entry), 0);
  const totalWeight = carriedEntries.reduce((total, entry) => total + items[entry.itemIndex].weight * visibleQuantity(entry), 0);
  const selected = filteredEntries[0] || carriedEntries[0];
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
              {(["All", "Goods", "Materials", "Luxuries", "Quest Items"] as InventoryCategory[]).map((nextCategory) => (
                <Button key={nextCategory} variant={category === nextCategory ? "primary" : "secondary"} onClick={() => setCategory(nextCategory)}>{nextCategory}</Button>
              ))}
            </div>
            <button className="flex min-h-11 w-56 items-center gap-3 rounded-sm border border-[#b98b37]/65 bg-[#fff6d7]/65 px-4 text-left text-[#3b260f]" type="button" onClick={onOpenFilter}>
              <Search size={24} />
              <span className="text-base text-[#725331]">Search items...</span>
            </button>
            <button
              className="flex min-h-11 w-52 items-center justify-between gap-3 rounded-sm border border-[#b98b37]/65 bg-[#fff6d7]/65 px-4 text-left text-base text-[#3b260f]"
              type="button"
              onClick={() => {
                const order: InventorySort[] = ["Value", "Name", "Quantity", "Weight"];
                setSortBy(order[(order.indexOf(sortBy) + 1) % order.length]);
              }}
            >
              <span>Sort by: {sortBy}</span>
              <Grid3X3 size={22} />
            </button>
          </div>
          <InventoryPanel title="Cargo" subtitle="Quantities, value, protection, legality, quest and highlight markers." inventory={filteredEntries} variant="management" onMove={(entry, amount) => onMovePlayer(entry, amount)} onMoveAll={(entry) => onMovePlayer(entry, "all")} onToggleProtect={onTogglePlayerProtect} allowProtect />
          <div className="mt-4 grid gap-3 md:grid-cols-[180px_1fr_220px]">
            <StatChip label="Capacity" value={`${totalWeight} / 200`} icon={uiAssets.hud.weight} />
            <StatChip label="Total Value" value={money(totalValue)} icon={uiAssets.hud.goldCoin} />
            <Button size="lg" variant="secondary" onClick={() => onUnavailable("Bulk inventory actions are not implemented yet.")}><Grid3X3 size={18} /> Bulk Actions</Button>
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
            ) : <p>No item selected for {category}.</p>}
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
      className={cn("grid min-h-24 place-items-center gap-1 rounded-sm border-2 px-2 py-3 font-display text-lg font-bold shadow-lg shadow-black/35 [text-shadow:0_1px_2px_rgba(0,0,0,.9)]", active ? "border-[#d7ad55] text-[#fff8d8]" : "border-[#b98b37]/80 text-[#fff0bf]")}
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
