import { useEffect, useMemo, useState, type ReactNode } from "react";
import { BookOpen, Box, Eye, Grid3X3, PackageCheck, PackageSearch, Search, Shield, ShieldCheck, Star, XCircle } from "lucide-react";
import type { InventoryEntry } from "@/data/types";
import type { GameState } from "@/lib/game";
import type { MoveAmount } from "@/lib/inventory";
import { itemIconAsset } from "@/lib/assets";
import { currentKingdom, items, marketplaces, visibleQuantity } from "@/lib/game";
import { money } from "@/lib/format";
import { inventoryTotals } from "@/lib/economy";
import { uiAssets } from "@/lib/ui-assets";
import { InventoryPanel } from "@/components/InventoryPanel";
import { Button, ItemSlot, Panel, ScreenFrame, StatChip } from "@/components/ui";
import { cn } from "@/lib/cn";
import { itemIsQuestNeeded } from "@/lib/quests";

type InventoryManagementViewProps = {
  state: GameState;
  playerOffer: number;
  onMovePlayer: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  onSetPlayerOfferQuantity?: (entry: InventoryEntry, quantity: number) => void;
  onTogglePlayerProtect: (entry: InventoryEntry) => void;
  onTogglePlayerConceal: (entry: InventoryEntry) => void;
  onOpenFilter: () => void;
  onOpenItemDetail: (entry: InventoryEntry) => void;
  onUnavailable: (message: string) => void;
};

type InventoryCategory = "All" | "Goods" | "Materials" | "Luxuries" | "Quest Items";
type InventorySort = "Value" | "Name" | "Quantity" | "Weight";

const FILTER_KEY = "merchant-inventory-filters";

export function InventoryManagementView({ state, onMovePlayer, onSetPlayerOfferQuantity, onTogglePlayerProtect, onTogglePlayerConceal, onOpenFilter, onOpenItemDetail, onUnavailable }: InventoryManagementViewProps) {
  const [category, setCategory] = useState<InventoryCategory>(() => {
    const saved = localStorage.getItem(FILTER_KEY);
    return saved ? (JSON.parse(saved).category as InventoryCategory) || "All" : "All";
  });
  const [sortBy, setSortBy] = useState<InventorySort>(() => {
    const saved = localStorage.getItem(FILTER_KEY);
    return saved ? (JSON.parse(saved).sortBy as InventorySort) || "Value" : "Value";
  });
  const [search, setSearch] = useState("");
  const illegalTags = currentKingdom(state).illegalItemTags || [];
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
    const normalizedSearch = search.trim().toLowerCase();
    return carriedEntries
      .filter(matchesCategory)
      .filter((entry) => {
        if (!normalizedSearch) return true;
        const item = items[entry.itemIndex];
        return item.name.toLowerCase().includes(normalizedSearch)
          || item.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch))
          || entry.note?.toLowerCase().includes(normalizedSearch);
      })
      .sort((left, right) => {
        const leftItem = items[left.itemIndex];
        const rightItem = items[right.itemIndex];
        if (sortBy === "Name") return leftItem.name.localeCompare(rightItem.name);
        if (sortBy === "Quantity") return visibleQuantity(right) - visibleQuantity(left);
        if (sortBy === "Weight") return rightItem.weight - leftItem.weight;
        return rightItem.loafValue - leftItem.loafValue;
      });
  }, [carriedEntries, category, search, sortBy]);
  const totals = inventoryTotals(state.playerInventory, items);
  const selected = filteredEntries.find((entry) => entry.itemIndex === state.selectedItemIndex) || filteredEntries[0] || carriedEntries[0];
  const selectedItem = selected ? items[selected.itemIndex] : null;
  const questItemIndexes = new Set(carriedEntries.filter((entry) => itemIsQuestNeeded(items[entry.itemIndex], marketplaces, state.questStates)).map((entry) => entry.itemIndex));

  useEffect(() => {
    localStorage.setItem(FILTER_KEY, JSON.stringify({ category, sortBy }));
  }, [category, sortBy]);

  function protectVisible() {
    const targets = filteredEntries.filter((entry) => !entry.protected);
    if (!targets.length) {
      onUnavailable("All visible cargo is already protected.");
      return;
    }
    targets.forEach(onTogglePlayerProtect);
    onUnavailable(`Protected ${targets.length} visible stacks.`);
  }

  function revealVisible() {
    const targets = filteredEntries.filter((entry) => entry.conceal);
    if (!targets.length) {
      onUnavailable("No visible cargo is concealed.");
      return;
    }
    targets.forEach(onTogglePlayerConceal);
    onUnavailable(`Revealed ${targets.length} visible stacks.`);
  }

  function offerVisibleStacks() {
    if (!onSetPlayerOfferQuantity) {
      onUnavailable("Offer controls are unavailable here.");
      return;
    }
    const targets = filteredEntries.filter((entry) => visibleQuantity(entry) > 0 && !entry.protected);
    if (!targets.length) {
      onUnavailable("No unprotected visible cargo can be offered.");
      return;
    }
    targets.forEach((entry) => onSetPlayerOfferQuantity(entry, entry.quantity));
    onUnavailable(`Moved ${targets.length} visible stacks into the offer.`);
  }

  function clearVisibleOffers() {
    if (!onSetPlayerOfferQuantity) {
      onUnavailable("Offer controls are unavailable here.");
      return;
    }
    const targets = filteredEntries.filter((entry) => entry.offerQuantity > 0);
    if (!targets.length) {
      onUnavailable("No visible offers to clear.");
      return;
    }
    targets.forEach((entry) => onSetPlayerOfferQuantity(entry, 0));
    onUnavailable(`Cleared ${targets.length} visible offer stacks.`);
  }

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
            <label className="flex min-h-11 w-64 items-center gap-3 rounded-sm border border-[#b98b37]/65 bg-[#fff6d7]/65 px-4 text-left text-[#3b260f]">
              <Search size={24} />
              <input className="min-w-0 flex-1 bg-transparent text-base text-[#26170a] outline-none placeholder:text-[#725331]" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, tag, note..." />
              <button className="text-xs font-black uppercase text-[#75501f]" type="button" onClick={onOpenFilter}>More</button>
            </label>
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
          <div className="mb-4 grid gap-2 rounded-sm border border-[#b98b37]/55 bg-[#fff6d7]/45 p-2 sm:grid-cols-2 xl:grid-cols-4">
            <Button variant="secondary" onClick={protectVisible}><ShieldCheck size={16} /> Protect Visible</Button>
            <Button variant="secondary" onClick={revealVisible}><Eye size={16} /> Reveal Visible</Button>
            <Button variant="secondary" onClick={offerVisibleStacks}><PackageCheck size={16} /> Offer Visible</Button>
            <Button variant="secondary" onClick={clearVisibleOffers}><XCircle size={16} /> Clear Visible Offers</Button>
          </div>
          <InventoryPanel title="Cargo" owner="player" subtitle="Quantities, value, protection, legality, quest and highlight markers." inventory={filteredEntries} illegalTags={illegalTags} questItemIndexes={questItemIndexes} variant="management" onMove={(entry, amount) => onMovePlayer(entry, amount)} onMoveAll={(entry) => onMovePlayer(entry, "all")} onSetOfferQuantity={onSetPlayerOfferQuantity} onToggleProtect={onTogglePlayerProtect} allowProtect />
          <div className="mt-4 grid gap-3 md:grid-cols-5">
            <StatChip label="Carry" value={`${totals.weight} / ${totals.carryCapacity}`} icon={uiAssets.hud.weight} />
            <StatChip label="Pull" value={`${totals.size} / ${totals.sizeCapacity}`} icon={uiAssets.hud.inventory} />
            <StatChip label="Animals" value={totals.packAnimals} />
            <StatChip label="Storage" value={totals.storageItems} />
            <StatChip label="Total Value" value={money(totals.value)} icon={uiAssets.hud.goldCoin} />
          </div>
          {totals.canTravel ? null : (
            <div className="mt-3 rounded-sm border border-[#8d271f]/60 bg-[#fff6d7]/65 p-3 text-sm font-bold text-[#8d271f]">
              Cargo exceeds travel capacity. Over carry: {totals.overWeight}. Over pull: {totals.overSize}. Add pack animals, storage, or reduce cargo before traveling.
            </div>
          )}
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
                  <ItemSlot className="w-48" imageSrc={itemIconAsset(selectedItem.iconFile)} selected marker={selectedItem.tags.some((tag) => illegalTags.includes(tag)) ? "illegal" : selectedItem.unique ? "rare" : undefined} />
                </div>
                <h2 className="mt-4 font-display text-3xl text-[#26170a]">{selectedItem.name}</h2>
                <p className="text-sm text-[#725331]">{selectedItem.tags.join(" / ")}</p>
                <dl className="mt-3 grid grid-cols-2 gap-2">
                  <StatChip label="Qty" value={visibleQuantity(selected)} />
                  <StatChip label="Value" value={money(selectedItem.loafValue)} />
                  <StatChip label="Weight" value={selectedItem.weight} />
                  <StatChip label="Size" value={selectedItem.size} />
                </dl>
                {selected.note ? <p className="mt-3 rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/55 p-2 text-sm text-[#3b260f]">{selected.note}</p> : null}
                <div className="mt-5 grid grid-cols-2 gap-2"><Button size="lg" onClick={() => onMovePlayer(selected, 1)}>Add to Offer</Button><Button size="lg" variant="secondary" onClick={() => onTogglePlayerProtect(selected)}>{selected.protected ? "Unprotect" : "Protect"}</Button><Button className="col-span-2" size="lg" variant="secondary" onClick={() => onOpenItemDetail(selected)}>More</Button></div>
              </>
            ) : <p>No item selected for {category}.</p>}
          </Panel>
          <InventoryPanel title="Current Offer" owner="player" mode="offer" variant="compact" inventory={state.playerInventory} illegalTags={illegalTags} onMove={(entry, amount) => onMovePlayer(entry, amount, true)} onMoveAll={(entry) => onMovePlayer(entry, "none", true)} onSetOfferQuantity={onSetPlayerOfferQuantity} />
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
