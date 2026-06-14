import { Eye, Gem, PackageOpen, Search, Shield, SlidersHorizontal, Star, X } from "lucide-react";
import { useMemo, useState, type MouseEvent } from "react";
import type { InventoryEntry } from "../data/types";
import { items, visibleQuantity } from "../lib/game";
import { money } from "../lib/format";
import { cn } from "../lib/cn";
import type { MoveAmount } from "../lib/inventory";
import { itemIconAsset } from "../lib/assets";
import { Button, Panel } from "./ui";

const tagIcons: Array<[string, string]> = [
  ["coins", "$"],
  ["food", "F"],
  ["weapons", "W"],
  ["armor", "A"],
  ["books", "B"],
  ["maps", "M"],
  ["magic", "*"],
  ["jewlery", "J"],
  ["jewelry", "J"],
  ["storage", "S"],
  ["clothes", "C"],
  ["alchemy", "X"],
  ["monster parts", "P"],
];

function iconFor(entry: InventoryEntry) {
  const item = items[entry.itemIndex];
  return tagIcons.find(([tag]) => item.tags.includes(tag))?.[1] || "?";
}

function itemGridSpan(size: number) {
  if (size >= 50) return "col-span-4 row-span-3";
  if (size >= 25) return "col-span-3 row-span-3";
  if (size >= 5) return "col-span-2 row-span-2";
  return "col-span-1 row-span-1";
}

function rarityLabel(rarity?: number) {
  if (!rarity || rarity <= 1) return "Common";
  if (rarity === 2) return "Uncommon";
  if (rarity === 3) return "Rare";
  return "Legendary";
}

function quantityFor(entry: InventoryEntry, mode: "stock" | "offer") {
  return mode === "offer" ? entry.offerQuantity : visibleQuantity(entry);
}

export function InventoryPanel({
  title,
  inventory,
  mode = "stock",
  onMove,
  onMoveAll,
  onToggleProtect,
  allowProtect = false,
  variant = "standard",
  subtitle,
}: {
  title: string;
  inventory: InventoryEntry[];
  mode?: "stock" | "offer";
  onMove: (entry: InventoryEntry, amount: MoveAmount) => void;
  onMoveAll: (entry: InventoryEntry) => void;
  onToggleProtect?: (entry: InventoryEntry) => void;
  allowProtect?: boolean;
  variant?: "standard" | "management" | "compact";
  subtitle?: string;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"name" | "value" | "quantity" | "weight">("name");
  const [activeTag, setActiveTag] = useState("all");
  const [selectedEntry, setSelectedEntry] = useState<InventoryEntry | null>(null);

  const visibleEntries = useMemo(() => inventory.filter((entry) => quantityFor(entry, mode) > 0), [inventory, mode]);

  const categoryTags = useMemo(() => {
    const counts = new Map<string, number>();
    visibleEntries.forEach((entry) => {
      const item = items[entry.itemIndex];
      item.tags.slice(0, 3).forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1));
    });
    return [...counts.entries()]
      .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
      .slice(0, variant === "compact" ? 5 : 9);
  }, [visibleEntries, variant]);

  const rows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return visibleEntries
      .filter((entry) => {
        const item = items[entry.itemIndex];
        if (activeTag !== "all" && !item.tags.includes(activeTag)) return false;
        if (!normalizedQuery) return true;
        return item.name.toLowerCase().includes(normalizedQuery) || item.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));
      })
      .sort((left, right) => {
        const leftItem = items[left.itemIndex];
        const rightItem = items[right.itemIndex];
        if (sort === "value") return rightItem.loafValue - leftItem.loafValue || leftItem.name.localeCompare(rightItem.name);
        if (sort === "weight") return rightItem.weight - leftItem.weight || leftItem.name.localeCompare(rightItem.name);
        if (sort === "quantity") return quantityFor(right, mode) - quantityFor(left, mode) || leftItem.name.localeCompare(rightItem.name);
        return leftItem.name.localeCompare(rightItem.name);
      });
  }, [activeTag, mode, query, sort, visibleEntries]);

  const totalValue = rows.reduce((total, entry) => {
    const item = items[entry.itemIndex];
    return total + item.loafValue * quantityFor(entry, mode);
  }, 0);

  const totalWeight = rows.reduce((total, entry) => {
    const item = items[entry.itemIndex];
    return total + item.weight * quantityFor(entry, mode);
  }, 0);

  function clickAmount(event: MouseEvent<HTMLButtonElement>): MoveAmount {
    if (event.altKey) return mode === "offer" ? -10 : 10;
    if (event.shiftKey) return "half";
    return mode === "offer" ? -1 : 1;
  }

  const selectedItem = selectedEntry ? items[selectedEntry.itemIndex] : null;
  const selectedQuantity = selectedEntry ? quantityFor(selectedEntry, mode) : 0;
  const selectedIcon = selectedItem ? itemIconAsset(selectedItem.iconFile) : null;

  return (
    <Panel
      className={cn("inventory-panel", `inventory-panel-${variant}`, mode === "offer" && "inventory-panel-offer")}
      title={
        <span className="inventory-panel-title-row">
          <span className="truncate">{title}</span>
          <small>{money(totalValue)}</small>
        </span>
      }
    >
      {subtitle ? <p className="inventory-subtitle">{subtitle}</p> : null}

      <div className="inventory-management-toolbar">
        <label className="inventory-search-box">
          <Search size={15} />
          <input placeholder="Search goods, tags, materials..." value={query} onChange={(event) => setQuery(event.target.value)} />
          {query ? <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={14} /></button> : null}
        </label>
        <label className="inventory-sort-box">
          <SlidersHorizontal size={15} />
          <select value={sort} onChange={(event) => setSort(event.target.value as "name" | "value" | "quantity" | "weight")}>
            <option value="name">Name</option>
            <option value="value">Value</option>
            <option value="quantity">Qty</option>
            <option value="weight">Weight</option>
          </select>
        </label>
      </div>

      <div className="inventory-filter-strip" aria-label="Inventory filters">
        <button className={activeTag === "all" ? "is-active" : ""} type="button" onClick={() => setActiveTag("all")}>All <span>{visibleEntries.length}</span></button>
        {categoryTags.map(([tag, count]) => (
          <button key={tag} className={activeTag === tag ? "is-active" : ""} type="button" onClick={() => setActiveTag(tag)}>
            {tag} <span>{count}</span>
          </button>
        ))}
      </div>

      <div className="inventory-ledger-summary" aria-label="Inventory summary">
        <span><strong>{rows.length}</strong><small>shown</small></span>
        <span><strong>{visibleEntries.length}</strong><small>total</small></span>
        <span><strong>{totalWeight}</strong><small>weight</small></span>
      </div>

      <div className={cn("inventory-grid", variant === "management" && "inventory-grid-management", variant === "compact" && "inventory-grid-compact")}>
        {rows.length ? (
          rows.map((entry) => {
            const item = items[entry.itemIndex];
            const quantity = quantityFor(entry, mode);
            const icon = itemIconAsset(item.iconFile);

            return (
              <div key={entry.itemIndex} className={cn("item-slot", itemGridSpan(item.size), entry.protected && "protected", selectedEntry?.itemIndex === entry.itemIndex && "selected")}>
                <button
                  className="item-button"
                  onClick={(event) => onMove(entry, clickAmount(event))}
                  onContextMenu={(event) => {
                    event.preventDefault();
                    onMoveAll(entry);
                  }}
                  title="Left click moves one. Right click moves all or clears. Shift moves half. Alt moves ten."
                >
                  <span className="item-art-frame">
                    {icon ? (
                      <img
                        src={icon}
                        alt=""
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : null}
                    <span className="item-fallback">{iconFor(entry)}</span>
                  </span>
                  <span className="item-meta">
                    <span className="item-name">{item.name}</span>
                    <small className="item-value">{money(item.loafValue)}</small>
                  </span>
                  <strong className="item-qty">{quantity}</strong>
                  {entry.protected ? <span className="item-state-badge"><Shield size={11} /> safe</span> : null}
                </button>
                <button className="item-inspect" type="button" onClick={() => setSelectedEntry(entry)} title={`Inspect ${item.name}`}>
                  <Eye size={13} />
                </button>
                {allowProtect ? (
                  <button
                    className={cn("item-protect", entry.protected && "active")}
                    onClick={() => onToggleProtect?.(entry)}
                    title={entry.protected ? "Unstar item" : "Star item"}
                  >
                    <Star size={14} fill={entry.protected ? "currentColor" : "none"} />
                  </button>
                ) : null}
              </div>
            );
          })
        ) : (
          <div className="game-panel-empty inventory-empty-state"><PackageOpen size={28} /> Empty</div>
        )}
      </div>

      {selectedEntry && selectedItem ? (
        <div className="item-detail-modal-backdrop" role="dialog" aria-modal="true" aria-label={`Item detail for ${selectedItem.name}`}>
          <div className="item-detail-modal">
            <button className="item-detail-close" type="button" onClick={() => setSelectedEntry(null)} aria-label="Close item detail"><X size={18} /></button>
            <div className="item-detail-hero">
              <div className="item-detail-icon-frame">
                {selectedIcon ? <img src={selectedIcon} alt="" /> : <span>{iconFor(selectedEntry)}</span>}
              </div>
              <div className="item-detail-heading">
                <span className="game-brand-kicker">Item Detail</span>
                <h3>{selectedItem.name}</h3>
                <p>{selectedItem.tags.join(" · ") || "uncategorized"}</p>
              </div>
            </div>

            <div className="item-detail-stats">
              <span><small>Quantity</small><strong>{selectedQuantity}</strong></span>
              <span><small>Value</small><strong>{money(selectedItem.loafValue)}</strong></span>
              <span><small>Total</small><strong>{money(selectedItem.loafValue * selectedQuantity)}</strong></span>
              <span><small>Weight</small><strong>{selectedItem.weight}</strong></span>
              <span><small>Size</small><strong>{selectedItem.size}</strong></span>
              <span><small>Rarity</small><strong>{rarityLabel(selectedItem.rarity)}</strong></span>
            </div>

            <div className="item-detail-tags">
              {selectedItem.tags.map((tag) => <span key={tag}><Gem size={12} /> {tag}</span>)}
              {selectedItem.unique ? <span><Star size={12} /> unique</span> : null}
              {selectedEntry.protected ? <span><Shield size={12} /> protected</span> : null}
            </div>

            <div className="item-detail-actions">
              <Button onClick={() => onMove(selectedEntry, mode === "offer" ? -1 : 1)}>{mode === "offer" ? "Remove One" : "Offer One"}</Button>
              <Button onClick={() => onMoveAll(selectedEntry)}>{mode === "offer" ? "Clear Offer" : "Move All"}</Button>
              {allowProtect ? <Button onClick={() => onToggleProtect?.(selectedEntry)}>{selectedEntry.protected ? "Unprotect" : "Protect"}</Button> : null}
            </div>
          </div>
        </div>
      ) : null}
    </Panel>
  );
}
