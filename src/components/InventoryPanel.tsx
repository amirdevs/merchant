import { Star } from "lucide-react";
import { useMemo, useState, type MouseEvent } from "react";
import type { InventoryEntry } from "../data/types";
import { items, visibleQuantity } from "../lib/game";
import { money } from "../lib/format";
import { cn } from "../lib/cn";
import type { MoveAmount } from "../lib/inventory";
import { Panel } from "./ui";

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

  function clickAmount(event: MouseEvent<HTMLButtonElement>): MoveAmount {
    if (event.altKey) return mode === "offer" ? -10 : 10;
    if (event.shiftKey) return "half";
    return mode === "offer" ? -1 : 1;
  }

  return (
    <Panel className="min-h-[250px]" title={<span className="flex items-center justify-between gap-2"><span>{title}</span><small className="font-serif text-xs text-parchment-muted">{money(totalValue)}</small></span>}>
      <div className="mb-2 grid grid-cols-[1fr_110px] gap-2">
        <input
          className="min-w-0 border border-brass/45 bg-black/25 px-2 py-1 text-sm text-parchment outline-none placeholder:text-parchment-muted focus:border-brass"
          placeholder="Search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          className="border border-brass/45 bg-panel-soft px-2 py-1 text-sm text-parchment outline-none focus:border-brass"
          value={sort}
          onChange={(event) => setSort(event.target.value as "name" | "value" | "quantity")}
        >
          <option value="name">Name</option>
          <option value="value">Value</option>
          <option value="quantity">Qty</option>
        </select>
      </div>
      <div className="flex max-h-[326px] flex-col gap-1.5 overflow-auto pr-1">
        {rows.length ? (
          rows.map((entry) => {
            const item = items[entry.itemIndex];
            const quantity = mode === "offer" ? entry.offerQuantity : visibleQuantity(entry);

            return (
              <div
                key={entry.itemIndex}
                className={cn(
                  "relative grid min-h-12 grid-cols-[1fr_auto] items-stretch border border-brass/35 bg-black/25 text-left text-parchment hover:bg-ember/60",
                  entry.protected && "border-brass bg-brass/10"
                )}
              >
                <button
                  className="grid min-h-12 grid-cols-[34px_1fr_46px] items-center gap-2 text-left"
                  onClick={(event) => onMove(entry, clickAmount(event))}
                  onContextMenu={(event) => {
                    event.preventDefault();
                    onMoveAll(entry);
                  }}
                  title="Left click moves one. Right click moves all or clears. Shift moves half. Alt moves ten."
                >
                  <span className="ml-1 grid h-[30px] w-[30px] place-items-center border border-brass/40 bg-white/5 text-brass">
                    {iconFor(entry)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate">{item.name}</span>
                    <small className="block truncate text-xs text-parchment-muted">{item.tags.slice(0, 3).join(", ")}</small>
                  </span>
                  <span className="flex flex-col items-end">
                    <strong>{quantity}</strong>
                    <small className="text-xs text-parchment-muted">{money(item.loafValue)}</small>
                  </span>
                </button>
                {allowProtect ? (
                  <button
                    className={cn("grid w-8 place-items-center border-l border-brass/35 text-parchment-muted hover:text-brass", entry.protected && "text-brass")}
                    onClick={() => onToggleProtect?.(entry)}
                    title={entry.protected ? "Unstar item" : "Star item"}
                  >
                    <Star size={15} fill={entry.protected ? "currentColor" : "none"} />
                  </button>
                ) : null}
              </div>
            );
          })
        ) : (
          <p className="m-2 text-parchment-muted">Empty</p>
        )}
      </div>
    </Panel>
  );
}
