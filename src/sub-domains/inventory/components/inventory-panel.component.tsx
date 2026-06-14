import { PackageOpen } from "lucide-react";
import { useMemo, useState } from "react";
import type { InventoryEntry } from "@/data/types";
import { items } from "@/lib/game";
import { money } from "@/lib/format";
import { cn } from "@/sub-domains/shared/utils/cn.utils";
import { Panel } from "@/sub-domains/shared/components/ui";
import { InventoryFilterStrip } from "@/sub-domains/inventory/components/inventory-filter-strip.component";
import { InventorySummary } from "@/sub-domains/inventory/components/inventory-summary.component";
import { InventoryToolbar } from "@/sub-domains/inventory/components/inventory-toolbar.component";
import { ItemDetailModal } from "@/sub-domains/inventory/components/item-detail-modal.component";
import { ItemSlot } from "@/sub-domains/inventory/components/item-slot.component";
import type { InventoryPanelProps, InventorySortMode } from "@/sub-domains/inventory/types/inventory-panel.type";
import { clickAmountForMode, quantityFor } from "@/sub-domains/inventory/utils/inventory-ui.utils";

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
}: InventoryPanelProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<InventorySortMode>("name");
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

  const totalValue = rows.reduce((total, entry) => total + items[entry.itemIndex].loafValue * quantityFor(entry, mode), 0);
  const totalWeight = rows.reduce((total, entry) => total + items[entry.itemIndex].weight * quantityFor(entry, mode), 0);

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

      <InventoryToolbar query={query} sort={sort} onQueryChange={setQuery} onSortChange={setSort} />
      <InventoryFilterStrip activeTag={activeTag} totalCount={visibleEntries.length} categoryTags={categoryTags} onTagChange={setActiveTag} />
      <InventorySummary shown={rows.length} total={visibleEntries.length} totalWeight={totalWeight} />

      <div className={cn("inventory-grid", variant === "management" && "inventory-grid-management", variant === "compact" && "inventory-grid-compact")}>
        {rows.length ? (
          rows.map((entry) => (
            <ItemSlot
              key={entry.itemIndex}
              entry={entry}
              mode={mode}
              selected={selectedEntry?.itemIndex === entry.itemIndex}
              allowProtect={allowProtect}
              onMove={onMove}
              onMoveAll={onMoveAll}
              onSelect={setSelectedEntry}
              onToggleProtect={onToggleProtect}
              clickAmount={(event) => clickAmountForMode(mode, event)}
            />
          ))
        ) : (
          <div className="game-panel-empty inventory-empty-state"><PackageOpen size={28} /> Empty</div>
        )}
      </div>

      {selectedEntry ? <ItemDetailModal entry={selectedEntry} mode={mode} onClose={() => setSelectedEntry(null)} onMove={onMove} /> : null}
    </Panel>
  );
}
