import type { KeyboardEvent, MouseEvent } from "react";
import { Lock, Shield, Star } from "lucide-react";
import type { InventoryEntry } from "@/data/types";
import { itemIconAsset } from "@/lib/assets";
import { items } from "@/lib/game";
import { money, title } from "@/lib/format";
import { type MoveAmount, visibleQuantity } from "@/lib/inventory";
import { cn } from "@/lib/cn";
import { Button, Panel } from "@/components/ui";

type InventoryPanelMode = "stock" | "offer";

type InventoryPanelProps = {
  title: string;
  subtitle?: string;
  inventory: InventoryEntry[];
  mode?: InventoryPanelMode;
  variant?: "default" | "compact" | "management";
  allowProtect?: boolean;
  onMove: (entry: InventoryEntry, amount: MoveAmount) => void;
  onMoveAll: (entry: InventoryEntry) => void;
  onToggleProtect?: (entry: InventoryEntry) => void;
};

function itemFor(entry: InventoryEntry) {
  return items.find((item) => item.index === entry.itemIndex);
}

function quantityFor(entry: InventoryEntry, mode: InventoryPanelMode) {
  return mode === "offer" ? entry.offerQuantity : visibleQuantity(entry);
}

function moveAmountFromInput(event: MouseEvent | KeyboardEvent, mode: InventoryPanelMode): MoveAmount {
  if (event.shiftKey) return "half";
  if (event.altKey) return mode === "offer" ? -10 : 10;
  return mode === "offer" ? -1 : 1;
}

export function InventoryPanel({ title: panelTitle, subtitle, inventory, mode = "stock", variant = "default", allowProtect = false, onMove, onMoveAll, onToggleProtect }: InventoryPanelProps) {
  const rows = inventory.filter((entry) => quantityFor(entry, mode) > 0);

  return (
    <Panel
      title={
        <span className="flex items-start justify-between gap-2">
          <span>
            <span className="block">{panelTitle}</span>
            {subtitle ? <span className="mt-1 block text-xs font-normal leading-snug text-parchment-muted">{subtitle}</span> : null}
          </span>
          <span className="shrink-0 text-xs text-parchment-muted">{rows.length}</span>
        </span>
      }
    >
      <div className={cn("grid gap-2 overflow-auto pr-1", variant === "compact" ? "max-h-56" : "max-h-[360px]", variant === "management" ? "sm:grid-cols-2 2xl:grid-cols-3" : null)}>
        {rows.length ? rows.map((entry) => {
          const item = itemFor(entry);
          const shownQuantity = quantityFor(entry, mode);
          const icon = itemIconAsset(item?.iconFile);

          return (
            <article
              key={`${panelTitle}-${entry.itemIndex}`}
              className={cn(
                "grid grid-cols-[42px_1fr_auto] items-center gap-2 border border-brass/45 bg-black/25 p-2 text-left text-parchment transition hover:border-brass hover:bg-ember/60",
                entry.protected && mode !== "offer" ? "border-brass bg-brass/10" : null
              )}
              role="button"
              tabIndex={0}
              onClick={(event) => onMove(entry, moveAmountFromInput(event, mode))}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onMove(entry, moveAmountFromInput(event, mode));
                }
              }}
              onContextMenu={(event) => {
                event.preventDefault();
                onMoveAll(entry);
              }}
              title="Left click moves one. Shift moves half. Alt moves ten. Right click moves all / clears."
            >
              <span className="relative grid h-[42px] w-[42px] place-items-center border border-brass/40 bg-panel-soft">
                {icon ? <img className="max-h-9 max-w-9 object-contain" src={icon} alt="" /> : <span className="text-xs text-parchment-muted">?</span>}
                {entry.protected && mode !== "offer" ? <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full border border-brass bg-panel text-brass"><Shield size={12} /></span> : null}
                {item?.unique ? <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border border-brass bg-ember text-brass"><Star size={12} /></span> : null}
              </span>

              <span className="min-w-0">
                <strong className="block truncate text-sm">{item?.name || `Item ${entry.itemIndex}`}</strong>
                <small className="block truncate text-parchment-muted">{item ? `${money(item.loafValue)} value · ${item.tags.slice(0, 3).map(title).join(", ")}` : "Unknown item"}</small>
              </span>

              <span className="grid justify-items-end gap-1">
                <strong className="text-brass">×{shownQuantity}</strong>
                {allowProtect && onToggleProtect && mode !== "offer" ? (
                  <Button
                    className="px-2 py-1 text-xs"
                    type="button"
                    variant={entry.protected ? "secondary" : "ghost"}
                    onClick={(event) => {
                      event.stopPropagation();
                      onToggleProtect(entry);
                    }}
                  >
                    <Lock size={12} />
                  </Button>
                ) : null}
              </span>
            </article>
          );
        }) : <div className="border border-brass/35 bg-black/20 p-3 text-sm text-parchment-muted">No visible items here.</div>}
      </div>
    </Panel>
  );
}
