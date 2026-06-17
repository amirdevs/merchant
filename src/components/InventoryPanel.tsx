import type { KeyboardEvent, MouseEvent } from "react";
import { Lock } from "lucide-react";
import type { InventoryEntry } from "@/data/types";
import { itemIconAsset } from "@/lib/assets";
import { items } from "@/lib/game";
import { money, title } from "@/lib/format";
import { type MoveAmount, visibleQuantity } from "@/lib/inventory";
import { cn } from "@/lib/cn";
import { uiAssets } from "@/lib/ui-assets";
import { Button, ItemSlot, LedgerRow, Panel } from "@/components/ui";

type InventoryPanelMode = "stock" | "offer";

type InventoryPanelProps = {
  title: string;
  subtitle?: string;
  inventory: InventoryEntry[];
  mode?: InventoryPanelMode;
  variant?: "default" | "compact" | "management";
  panelVariant?: "parchment" | "wood" | "dark";
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

export function InventoryPanel({ title: panelTitle, subtitle, inventory, mode = "stock", variant = "default", panelVariant = "parchment", allowProtect = false, onMove, onMoveAll, onToggleProtect }: InventoryPanelProps) {
  const rows = inventory.filter((entry) => quantityFor(entry, mode) > 0);
  const isGrid = variant === "compact" || variant === "management";
  const darkPanel = panelVariant === "wood" || panelVariant === "dark";

  return (
    <Panel
      variant={panelVariant}
      dense={variant === "compact"}
      title={
        <span className="flex items-start justify-between gap-2">
          <span>
            <span className="block">{panelTitle}</span>
            {subtitle ? <span className="mt-1 block text-xs font-normal leading-snug text-[#e8d39d]">{subtitle}</span> : null}
          </span>
          <span className="shrink-0 text-xs text-[#e8d39d]">{rows.length}</span>
        </span>
      }
    >
      {isGrid ? (
        <div
          className={cn(
            "grid overflow-auto rounded-md border p-2 shadow-inner",
            darkPanel
              ? "border-[#d0a65a]/35 bg-black/25 shadow-black/35"
              : "border-[#9a7138]/55 bg-[#fff6d7]/35 shadow-[#6c4418]/20",
            variant === "compact" ? "max-h-56 grid-cols-3 gap-1.5 sm:grid-cols-4" : "max-h-[67vh] grid-cols-4 gap-3 sm:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
          )}
        >
          {rows.length ? rows.map((entry) => {
            const item = itemFor(entry);
            const shownQuantity = quantityFor(entry, mode);
            const icon = itemIconAsset(item?.iconFile);
            const marker = item?.unique ? "rare" : entry.protected && mode !== "offer" ? "protected" : undefined;

            return (
              <div
                key={`${panelTitle}-${entry.itemIndex}`}
                className={cn(
                  "group relative min-w-0 rounded-sm border-2 p-1.5 shadow-sm transition hover:-translate-y-0.5 hover:brightness-105",
                  darkPanel
                    ? "border-[#d0a65a]/65 bg-[#120b05]/85 text-[#fff8d8] shadow-black/25"
                    : "border-[#c89d55]/65 bg-[#f5e1b7]/80 text-[#201207] shadow-[#6c4418]/15"
                )}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.08), rgba(0,0,0,.10)), url("${uiAssets.inventory.itemIconFrameLarge}")`,
                  backgroundSize: "100% 100%",
                }}
              >
                <ItemSlot
                  className={cn("mx-auto", variant === "compact" ? "w-14" : "w-20 xl:w-24")}
                  imageSrc={icon}
                  marker={marker}
                  quantity={shownQuantity}
                  selected={entry.protected && mode !== "offer"}
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
                  aria-label={`${item?.name || `Item ${entry.itemIndex}`}. Left click moves one. Shift moves half. Alt moves ten. Right click moves all or clears.`}
                />
                {allowProtect && onToggleProtect && mode !== "offer" ? (
                  <button
                    className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full border border-[#5a3b18] bg-[#f1dcae] text-[#2a1a0c] opacity-0 shadow transition group-hover:opacity-100 focus-visible:opacity-100"
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onToggleProtect(entry);
                    }}
                    aria-label={entry.protected ? "Remove protection" : "Protect item"}
                  >
                    <Lock size={11} />
                  </button>
                ) : null}
                <div
                  className={cn(
                    "mt-1 truncate rounded-sm border px-1.5 py-0.5 text-center text-[0.72rem] font-black leading-tight shadow-sm",
                    darkPanel ? "border-[#d0a65a]/45 bg-black/55 text-[#fff3bd]" : "border-[#9a7138]/45 bg-[#fff4c5]/80 text-[#24170b]"
                  )}
                  title={item?.name || `Item ${entry.itemIndex}`}
                >
                  {item?.name || `Item ${entry.itemIndex}`}
                </div>
                {item ? <RarityStars rarity={item.rarity || 1} dark={darkPanel} /> : null}
              </div>
            );
          }) : <div className="col-span-full border border-[#9a7138]/45 bg-[#fff6d7]/40 p-3 text-sm text-[#725331]">No visible items here.</div>}
        </div>
      ) : (
      <div className="grid max-h-[360px] gap-2 overflow-auto pr-1">
        {rows.length ? rows.map((entry) => {
          const item = itemFor(entry);
          const shownQuantity = quantityFor(entry, mode);
          const icon = itemIconAsset(item?.iconFile);
          const marker = item?.unique ? "rare" : entry.protected && mode !== "offer" ? "protected" : undefined;

          return (
            <LedgerRow
              key={`${panelTitle}-${entry.itemIndex}`}
              className="text-[#2a1a0c]"
              selected={entry.protected && mode !== "offer"}
              leading={<ItemSlot className="w-12" imageSrc={icon} marker={marker} selected={entry.protected && mode !== "offer"} />}
              title={item?.name || `Item ${entry.itemIndex}`}
              subtitle={item ? `${money(item.loafValue)} value / ${item.tags.slice(0, 3).map(title).join(", ")}` : "Unknown item"}
              trailing={
                <span className="grid justify-items-end gap-1">
                  <strong className="text-[#75501f]">x{shownQuantity}</strong>
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
              }
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
              aria-label={`${item?.name || `Item ${entry.itemIndex}`}. Left click moves one. Shift moves half. Alt moves ten. Right click moves all or clears.`}
            />
          );
        }) : <div className="border border-[#9a7138]/45 bg-[#fff6d7]/40 p-3 text-sm text-[#725331]">No visible items here.</div>}
      </div>
      )}
    </Panel>
  );
}

function RarityStars({ rarity, dark }: { rarity: number; dark?: boolean }) {
  const count = Math.max(1, Math.min(5, Math.round(rarity)));

  return (
    <span className="mt-1 flex items-center justify-center gap-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <img
          key={index}
          className={cn("h-3 w-3 object-contain", index >= count && "grayscale opacity-35", dark && "drop-shadow")}
          src={uiAssets.inventory.badgeRarityStar}
          alt=""
        />
      ))}
    </span>
  );
}
