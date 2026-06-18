import { useRef, useState, type DragEvent, type KeyboardEvent, type MouseEvent } from "react";
import { Lock } from "lucide-react";
import type { InventoryEntry } from "@/data/types";
import { itemIconAsset } from "@/lib/assets";
import { items } from "@/lib/game";
import { money, title } from "@/lib/format";
import { type MoveAmount, visibleQuantity } from "@/lib/inventory";
import { itemIsIllegal } from "@/lib/legal";
import { cn } from "@/lib/cn";
import { uiAssets } from "@/lib/ui-assets";
import { Button, ItemSlot, LedgerRow, Panel } from "@/components/ui";

type InventoryPanelMode = "stock" | "offer";

type InventoryPanelProps = {
  title: string;
  subtitle?: string;
  inventory: InventoryEntry[];
  owner?: string;
  mode?: InventoryPanelMode;
  variant?: "default" | "compact" | "management";
  panelVariant?: "parchment" | "wood" | "dark";
  allowProtect?: boolean;
  illegalTags?: string[];
  questItemIndexes?: Set<number>;
  onMove: (entry: InventoryEntry, amount: MoveAmount) => void;
  onMoveAll: (entry: InventoryEntry) => void;
  onSetOfferQuantity?: (entry: InventoryEntry, quantity: number) => void;
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

type InventoryDragData = {
  owner: string;
  mode: InventoryPanelMode;
  itemIndex: number;
};

const dragType = "application/x-merchant-inventory-item";

function cargoSummary(rows: InventoryEntry[], mode: InventoryPanelMode) {
  return rows.reduce(
    (totals, entry) => {
      const item = itemFor(entry);
      const count = quantityFor(entry, mode);
      if (!item || count <= 0) return totals;
      totals.size += item.size * count;
      totals.weight += item.weight * count;
      return totals;
    },
    { size: 0, weight: 0 }
  );
}

function physicalClass(itemSize = 0, itemWeight = 0, variant: InventoryPanelProps["variant"]) {
  const bulk = itemSize + itemWeight;
  if (variant === "compact") {
    if (bulk >= 20 || itemSize >= 14 || itemWeight >= 14) return "col-span-2 row-span-2 min-h-44";
    if (bulk >= 10 || itemSize >= 8 || itemWeight >= 8) return "col-span-2 min-h-36";
    return "min-h-32";
  }
  if (variant === "management") {
    if (bulk >= 26 || itemSize >= 18 || itemWeight >= 18) return "col-span-2 row-span-2 min-h-64";
    if (bulk >= 12 || itemSize >= 8 || itemWeight >= 8) return "col-span-2 min-h-56";
    return "min-h-48";
  }
  return "";
}

function slotSizeClass(itemSize = 0, itemWeight = 0, variant: InventoryPanelProps["variant"]) {
  const bulk = itemSize + itemWeight;
  if (variant === "compact") return bulk >= 20 ? "w-24" : bulk >= 10 ? "w-20" : "w-14";
  if (variant === "management") return bulk >= 26 ? "w-32" : bulk >= 12 ? "w-28" : "w-20 xl:w-24";
  return "w-20 xl:w-24";
}

function itemSummary(entry: InventoryEntry) {
  const item = itemFor(entry);
  if (!item) return `Item ${entry.itemIndex}`;
  return `${item.name}\nValue: ${money(item.loafValue)} each\nSize: ${item.size} / Weight: ${item.weight}\nTags: ${item.tags.slice(0, 5).map(title).join(", ")}${entry.protected ? "\nProtected" : ""}${entry.conceal ? "\nConcealed" : ""}`;
}

export function InventoryPanel({ title: panelTitle, subtitle, inventory, owner, mode = "stock", variant = "default", panelVariant = "parchment", allowProtect = false, illegalTags = [], questItemIndexes, onMove, onMoveAll, onSetOfferQuantity, onToggleProtect }: InventoryPanelProps) {
  const rows = inventory.filter((entry) => quantityFor(entry, mode) > 0);
  const isGrid = variant === "compact" || variant === "management";
  const darkPanel = panelVariant === "wood" || panelVariant === "dark";
  const ownerId = owner || panelTitle;
  const totals = cargoSummary(rows, mode);
  const [dropStatus, setDropStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const dropTimerRef = useRef<number | null>(null);

  function flashDropStatus(nextStatus: "valid" | "invalid") {
    if (dropTimerRef.current) window.clearTimeout(dropTimerRef.current);
    setDropStatus(nextStatus);
    dropTimerRef.current = window.setTimeout(() => setDropStatus("idle"), 650);
  }

  function dragData(entry: InventoryEntry): InventoryDragData {
    return { owner: ownerId, mode, itemIndex: entry.itemIndex };
  }

  function onDragStart(event: DragEvent<HTMLElement>, entry: InventoryEntry) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(dragType, JSON.stringify(dragData(entry)));
  }

  function onDrop(event: DragEvent<HTMLElement>) {
    const raw = event.dataTransfer.getData(dragType);
    if (!raw) return;
    event.preventDefault();
    try {
      const dragged = JSON.parse(raw) as InventoryDragData;
      if (dragged.owner !== ownerId || dragged.mode === mode) {
        flashDropStatus("invalid");
        return;
      }
      const entry = inventory.find((item) => item.itemIndex === dragged.itemIndex);
      if (!entry) {
        flashDropStatus("invalid");
        return;
      }
      onMove(entry, mode === "offer" ? 1 : -1);
      flashDropStatus("valid");
    } catch {
      flashDropStatus("invalid");
      return;
    }
  }

  function onDragOver(event: DragEvent<HTMLElement>) {
    if (event.dataTransfer.types.includes(dragType)) event.preventDefault();
  }

  return (
    <Panel
      variant={panelVariant}
      dense={variant === "compact"}
      title={
        <span className="flex items-start justify-between gap-2">
          <span>
            <span className="block">{panelTitle}</span>
            {subtitle ? <span className="mt-1 block text-xs font-normal leading-snug text-[#e8d39d]">{subtitle}</span> : null}
            <span className="mt-1 block text-[0.68rem] font-black uppercase tracking-wide text-[#e8d39d]">Size {totals.size} / Weight {totals.weight}</span>
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
            dropStatus === "valid" && "ring-2 ring-[#9ce277] ring-offset-2 ring-offset-[#2a1809]",
            dropStatus === "invalid" && "animate-pulse ring-2 ring-[#d5523f] ring-offset-2 ring-offset-[#2a1809]",
            variant === "compact" ? "max-h-56 auto-rows-[minmax(8rem,auto)] grid-cols-3 gap-1.5 sm:grid-cols-4" : "max-h-[67vh] auto-rows-[minmax(12rem,auto)] grid-cols-4 gap-3 sm:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
          )}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          {rows.length ? rows.map((entry) => {
            const item = itemFor(entry);
            const shownQuantity = quantityFor(entry, mode);
            const icon = itemIconAsset(item?.iconFile);
            const marker = item && itemIsIllegal(item, illegalTags) ? "illegal" : questItemIndexes?.has(entry.itemIndex) ? "quest" : item?.unique ? "rare" : entry.protected && mode !== "offer" ? "protected" : undefined;

            return (
              <div
                key={`${panelTitle}-${entry.itemIndex}`}
                className={cn(
                  "group relative min-w-0 rounded-sm border-2 p-1.5 shadow-sm transition hover:-translate-y-0.5 hover:brightness-105",
                  physicalClass(item?.size, item?.weight, variant),
                  darkPanel
                    ? "border-[#d0a65a]/65 bg-[#120b05]/85 text-[#fff8d8] shadow-black/25"
                    : "border-[#c89d55]/65 bg-[#f5e1b7]/80 text-[#201207] shadow-[#6c4418]/15"
                )}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.08), rgba(0,0,0,.10)), url("${uiAssets.inventory.itemIconFrameLarge}")`,
                  backgroundSize: "100% 100%",
                }}
                title={itemSummary(entry)}
              >
                <ItemSlot
                  className={cn("mx-auto", slotSizeClass(item?.size, item?.weight, variant))}
                  imageSrc={icon}
                  marker={marker}
                  quantity={shownQuantity}
                  selected={(entry.protected || entry.highlighted) && mode !== "offer"}
                  draggable
                  onDragStart={(event) => onDragStart(event, entry)}
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
                  onAuxClick={(event) => {
                    if (event.button !== 1) return;
                    event.preventDefault();
                    onMove(entry, "half");
                  }}
                  onDoubleClick={(event) => {
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
                {entry.conceal && mode !== "offer" ? (
                  <span className="absolute left-1 top-1 rounded-full border border-[#1f5960]/80 bg-[#102f34]/90 px-1.5 py-0.5 text-[0.56rem] font-black uppercase tracking-wide text-[#dffcff] shadow">
                    Hidden
                  </span>
                ) : null}
                {entry.highlighted && mode !== "offer" ? <span className="absolute bottom-16 left-1 rounded-full border border-[#d0a65a] bg-[#5a3715]/90 px-1.5 py-0.5 text-[0.56rem] font-black uppercase text-[#fff3bd]">Marked</span> : null}
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
                {item ? (
                  <div className={cn("mt-1 grid grid-cols-2 gap-1 text-center text-[0.58rem] font-black uppercase", darkPanel ? "text-[#ffe6a0]" : "text-[#6a451a]")}>
                    <span className="rounded-sm bg-black/15 px-1 py-0.5">S {item.size}</span>
                    <span className="rounded-sm bg-black/15 px-1 py-0.5">W {item.weight}</span>
                  </div>
                ) : null}
                {item ? (
                  <div
                    className={cn(
                      "pointer-events-none absolute left-2 right-2 top-2 z-20 hidden rounded-sm border p-2 text-left text-[0.68rem] font-bold leading-snug shadow-xl group-hover:block group-focus-within:block",
                      darkPanel ? "border-[#d0a65a]/70 bg-[#1b1007]/95 text-[#fff3bd]" : "border-[#9a7138]/70 bg-[#fff8df]/95 text-[#2a1a0c]"
                    )}
                  >
                    <strong className="block truncate text-xs">{item.name}</strong>
                    <span className="block">Value {money(item.loafValue)} each</span>
                    <span className="block">Size {item.size} / Weight {item.weight}</span>
                    <span className="block truncate">{item.tags.slice(0, 4).map(title).join(", ")}</span>
                    {entry.protected || entry.conceal ? <span className="block text-[#1f5960]">{entry.protected ? "Protected" : ""}{entry.protected && entry.conceal ? " / " : ""}{entry.conceal ? "Concealed" : ""}</span> : null}
                  </div>
                ) : null}
                {onSetOfferQuantity ? (
                  <label className={cn("mt-1 flex items-center justify-center gap-1 rounded-sm border px-1 py-0.5 text-[0.65rem] font-black", darkPanel ? "border-[#d0a65a]/35 bg-black/35 text-[#ffe6a0]" : "border-[#9a7138]/45 bg-[#fff4c5]/70 text-[#5a3917]")}>
                    Offer
                    <input
                      className="h-6 w-12 rounded-sm border border-[#9a7138]/45 bg-[#fff8df] px-1 text-center text-[#24170b]"
                      min={0}
                      max={entry.quantity}
                      type="number"
                      value={entry.offerQuantity}
                      onChange={(event) => onSetOfferQuantity(entry, Number(event.target.value))}
                      onClick={(event) => event.stopPropagation()}
                    />
                  </label>
                ) : null}
              </div>
            );
          }) : <div className="col-span-full border border-[#9a7138]/45 bg-[#fff6d7]/40 p-3 text-sm text-[#725331]">No visible items here.</div>}
        </div>
      ) : (
      <div
        className={cn(
          "grid max-h-[360px] gap-2 overflow-auto pr-1",
          dropStatus === "valid" && "rounded-sm ring-2 ring-[#9ce277]",
          dropStatus === "invalid" && "animate-pulse rounded-sm ring-2 ring-[#d5523f]"
        )}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {rows.length ? rows.map((entry) => {
          const item = itemFor(entry);
          const shownQuantity = quantityFor(entry, mode);
          const icon = itemIconAsset(item?.iconFile);
          const marker = item && itemIsIllegal(item, illegalTags) ? "illegal" : questItemIndexes?.has(entry.itemIndex) ? "quest" : item?.unique ? "rare" : entry.protected && mode !== "offer" ? "protected" : undefined;

          return (
            <LedgerRow
              key={`${panelTitle}-${entry.itemIndex}`}
              className="text-[#2a1a0c]"
              selected={(entry.protected || entry.highlighted) && mode !== "offer"}
              leading={
                <span className="relative">
                  <ItemSlot className="w-12" imageSrc={icon} marker={marker} selected={(entry.protected || entry.highlighted) && mode !== "offer"} />
                  {entry.conceal && mode !== "offer" ? <span className="absolute -bottom-0.5 left-0 rounded-sm bg-[#102f34] px-1 text-[0.55rem] font-black uppercase text-[#dffcff]">Hidden</span> : null}
                </span>
              }
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
                  {onSetOfferQuantity ? (
                    <label className="flex items-center gap-1 text-[0.65rem] font-black uppercase text-[#75501f]">
                      Offer
                      <input
                        className="h-7 w-14 rounded-sm border border-[#9a7138]/50 bg-[#fff8df] px-1 text-center text-[#24170b]"
                        min={0}
                        max={entry.quantity}
                        type="number"
                        value={entry.offerQuantity}
                        onChange={(event) => onSetOfferQuantity(entry, Number(event.target.value))}
                        onClick={(event) => event.stopPropagation()}
                      />
                    </label>
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
              onAuxClick={(event) => {
                if (event.button !== 1) return;
                event.preventDefault();
                onMove(entry, "half");
              }}
              onDoubleClick={(event) => {
                event.preventDefault();
                onMoveAll(entry);
              }}
              aria-label={`${item?.name || `Item ${entry.itemIndex}`}. Left click moves one. Shift moves half. Alt moves ten. Right click moves all or clears.`}
              draggable
              onDragStart={(event) => onDragStart(event, entry)}
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
