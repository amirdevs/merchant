import { Star } from "lucide-react";
import { useMemo, useState } from "react";
import type { InventoryEntry } from "../../../data/types";
import { items, visibleQuantity } from "../../../lib/game";
import { money } from "../../../lib/format";
import { cn } from "../../../lib/cn";
import type { MoveAmount } from "../../../lib/inventory";
import { itemIconAsset } from "../../../lib/assets";
import { InventorySlotFrame, Panel } from "../../../components/ui";
import { clickMoveAmount } from "../utils/clickMoveAmount";
import { itemFallbackIcon } from "../utils/itemFallbackIcon";
import { itemGridSpan } from "../utils/itemGridSpan";

export function InventoryPanel({
  title,
  inventory,
  mode = "stock",
  onMove,
  onMoveAll,
  onToggleProtect,
  allowProtect = false,
}: {
  title: string;
  inventory: InventoryEntry[];
  mode?: "stock" | "offer";
  onMove: (entry: InventoryEntry, amount: MoveAmount) => void;
  onMoveAll: (entry: InventoryEntry) => void;
  onToggleProtect?: (entry: InventoryEntry) => void;
  allowProtect?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"name" | "value" | "quantity">("name");
  const rows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return inventory
      .filter((entry) => (mode === "offer" ? entry.offerQuantity > 0 : visibleQuantity(entry) > 0))
      .filter((entry) => {
        if (!normalizedQuery) return true;
        const item = items[entry.itemIndex];
        return item.name.toLowerCase().includes(normalizedQuery) || item.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));
      })
      .sort((left, right) => {
        const leftItem = items[left.itemIndex];
        const rightItem = items[right.itemIndex];
        if (sort === "value") return rightItem.loafValue - leftItem.loafValue || leftItem.name.localeCompare(rightItem.name);
        if (sort === "quantity") {
          const leftQuantity = mode === "offer" ? left.offerQuantity : visibleQuantity(left);
          const rightQuantity = mode === "offer" ? right.offerQuantity : visibleQuantity(right);
          return rightQuantity - leftQuantity || leftItem.name.localeCompare(rightItem.name);
        }
        return leftItem.name.localeCompare(rightItem.name);
      });
  }, [inventory, mode, query, sort]);

  const totalValue = rows.reduce((total, entry) => {
    const item = items[entry.itemIndex];
    const quantity = mode === "offer" ? entry.offerQuantity : visibleQuantity(entry);
    return total + item.loafValue * quantity;
  }, 0);

  return (
    <Panel className="inventory-panel" title={<span className="inventory-panel-heading"><span>{title}</span><small>{money(totalValue)}</small></span>}>
      <div className="inventory-toolbar">
        <input placeholder="Search" value={query} onChange={(event) => setQuery(event.target.value)} />
        <select value={sort} onChange={(event) => setSort(event.target.value as "name" | "value" | "quantity")}>
          <option value="name">Name</option>
          <option value="value">Value</option>
          <option value="quantity">Qty</option>
        </select>
      </div>

      <div className="inventory-grid">
        {rows.length ? (
          rows.map((entry) => {
            const item = items[entry.itemIndex];
            const quantity = mode === "offer" ? entry.offerQuantity : visibleQuantity(entry);
            const icon = itemIconAsset(item.iconFile);

            return (
              <InventorySlotFrame key={entry.itemIndex} selected={Boolean(entry.protected)} className={cn("inventory-slot", itemGridSpan(item.size))}>
                <button
                  className="inventory-slot-button"
                  onClick={(event) => onMove(entry, clickMoveAmount(event, mode))}
                  onContextMenu={(event) => {
                    event.preventDefault();
                    onMoveAll(entry);
                  }}
                  title="Left click moves one. Right click moves all or clears. Shift moves half. Alt moves ten."
                >
                  <span className="inventory-slot-icon">
                    {icon ? (
                      <img
                        src={icon}
                        alt=""
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : null}
                    <span>{itemFallbackIcon(entry)}</span>
                  </span>
                  <span className="inventory-slot-copy">
                    <span>{item.name}</span>
                    <small>{money(item.loafValue)}</small>
                  </span>
                  <strong>{quantity}</strong>
                </button>
                {allowProtect ? (
                  <button
                    className={cn("inventory-protect", entry.protected && "inventory-protect-active")}
                    onClick={() => onToggleProtect?.(entry)}
                    title={entry.protected ? "Unstar item" : "Star item"}
                  >
                    <Star size={15} fill={entry.protected ? "currentColor" : "none"} />
                  </button>
                ) : null}
              </InventorySlotFrame>
            );
          })
        ) : (
          <p className="m-2 text-parchment-muted">Empty</p>
        )}
      </div>
    </Panel>
  );
}
