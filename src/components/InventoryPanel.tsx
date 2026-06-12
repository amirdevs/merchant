import type { InventoryEntry } from "../data/types";
import { items, visibleQuantity } from "../lib/game";
import { money } from "../lib/format";
import { cn } from "../lib/cn";

const tagIcons: Array<[string, string]> = [
  ["coins", "●"],
  ["food", "◆"],
  ["weapons", "†"],
  ["armor", "▣"],
  ["books", "▤"],
  ["maps", "◇"],
  ["magic", "✦"],
  ["jewlery", "◈"],
  ["jewelry", "◈"],
  ["storage", "▥"],
  ["clothes", "◫"],
  ["alchemy", "✧"],
  ["monster parts", "✹"],
];

function iconFor(entry: InventoryEntry) {
  const item = items[entry.itemIndex];
  return tagIcons.find(([tag]) => item.tags.includes(tag))?.[1] || "□";
}

export function InventoryPanel({
  title,
  inventory,
  mode = "stock",
  onMove,
  onMoveAll,
  allowProtect = false,
}: {
  title: string;
  inventory: InventoryEntry[];
  mode?: "stock" | "offer";
  onMove: (entry: InventoryEntry) => void;
  onMoveAll: (entry: InventoryEntry) => void;
  allowProtect?: boolean;
}) {
  const rows = inventory.filter((entry) => (mode === "offer" ? entry.offerQuantity > 0 : visibleQuantity(entry) > 0));
  return (
    <section className="min-h-[250px] border-2 border-brass-soft bg-panel/90 p-3 shadow-2xl">
      <h2 className="mb-2 font-display text-lg">{title}</h2>
      <div className="flex max-h-[326px] flex-col gap-1.5 overflow-auto pr-1">
        {rows.length ? rows.map((entry) => {
          const item = items[entry.itemIndex];
          const quantity = mode === "offer" ? entry.offerQuantity : visibleQuantity(entry);
          return (
            <button
              key={entry.itemIndex}
              className={cn(
                "relative grid min-h-12 grid-cols-[34px_1fr_46px] items-center gap-2 border border-brass/35 bg-black/25 text-left text-parchment hover:bg-ember/60",
                entry.protected && "border-brass bg-brass/10"
              )}
              onClick={() => onMove(entry)}
              onContextMenu={(event) => {
                event.preventDefault();
                onMoveAll(entry);
              }}
              title="Left click moves one. Right click moves all or clears the offer."
            >
              <span className="ml-1 grid h-[30px] w-[30px] place-items-center border border-brass/40 bg-white/5 text-brass">{iconFor(entry)}</span>
              <span className="min-w-0">
                <span className="block truncate">{item.name}</span>
                <small className="block truncate text-xs text-parchment-muted">{item.tags.slice(0, 3).join(", ")}</small>
              </span>
              <span className="flex flex-col items-end">
                <strong>{quantity}</strong>
                <small className="text-xs text-parchment-muted">{money(item.loafValue)}</small>
              </span>
              {allowProtect && entry.protected ? <span className="absolute left-0.5 top-0 text-brass">★</span> : null}
            </button>
          );
        }) : <p className="m-2 text-parchment-muted">Empty</p>}
      </div>
    </section>
  );
}
