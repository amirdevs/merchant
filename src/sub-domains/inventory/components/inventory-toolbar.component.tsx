import { Search, SlidersHorizontal, X } from "lucide-react";
import type { InventorySortMode } from "@/sub-domains/inventory/types/inventory-panel.type";

export function InventoryToolbar({
  query,
  sort,
  onQueryChange,
  onSortChange,
}: {
  query: string;
  sort: InventorySortMode;
  onQueryChange: (query: string) => void;
  onSortChange: (sort: InventorySortMode) => void;
}) {
  return (
    <div className="inventory-management-toolbar">
      <label className="inventory-search-box">
        <Search size={15} />
        <input placeholder="Search goods, tags, materials..." value={query} onChange={(event) => onQueryChange(event.target.value)} />
        {query ? <button type="button" onClick={() => onQueryChange("")} aria-label="Clear search"><X size={14} /></button> : null}
      </label>
      <label className="inventory-sort-box">
        <SlidersHorizontal size={15} />
        <select value={sort} onChange={(event) => onSortChange(event.target.value as InventorySortMode)}>
          <option value="name">Name</option>
          <option value="value">Value</option>
          <option value="quantity">Qty</option>
          <option value="weight">Weight</option>
        </select>
      </label>
    </div>
  );
}
