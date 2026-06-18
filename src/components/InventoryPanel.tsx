import { useRef, useState, type DragEvent, type KeyboardEvent, type MouseEvent } from "react";
import { Lock } from "lucide-react";
import type { InventoryEntry, Item } from "@/data/types";
import { itemIconAsset } from "@/lib/assets";
import { items, kingdoms } from "@/lib/game";
import { money, title } from "@/lib/format";
import { type MoveAmount, visibleQuantity } from "@/lib/inventory";
import { itemIsIllegal } from "@/lib/legal";
import { cn } from "@/lib/cn";
import { Button, ItemSlot, LedgerRow, ModalShell, Panel, StatChip } from "@/components/ui";

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
  className?: string;
  bodyClassName?: string;
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
  void itemSize;
  void itemWeight;
  void variant;
  return "";
}

function slotSizeClass(itemSize = 0, itemWeight = 0, variant: InventoryPanelProps["variant"]) {
  const bulk = itemSize + itemWeight;
  if (variant === "compact") return bulk >= 20 ? "w-24" : bulk >= 10 ? "w-20" : "w-16";
  if (variant === "management") return bulk >= 26 ? "w-32" : bulk >= 12 ? "w-28" : "w-20 xl:w-24";
  return "w-20 xl:w-24";
}

function itemNotice(item: Item, entry: InventoryEntry, illegalTags: string[]) {
  const origin = item.kingdomIndex === null ? "unknown origin" : kingdoms[item.kingdomIndex]?.name || "unknown origin";
  const legal = itemIsIllegal(item, illegalTags) ? "restricted or illegal in this kingdom" : "legal in the current kingdom";
  const handling = [
    item.size >= 8 ? "Bulky cargo that takes visible stall space." : "Small enough for quick table handling.",
    item.weight >= 8 ? "Heavy enough to strain travel capacity." : "Light enough for ordinary carrying.",
    item.carry ? `Adds ${item.carry} carry capacity while held.` : "",
    item.pull ? `Adds ${item.pull} size capacity while held.` : "",
    entry.protected ? "Protected from offer movement." : "",
    entry.conceal ? "Concealed from normal inspection." : "",
  ].filter(Boolean);
  return {
    origin,
    legal,
    handling,
    summary: `${item.name} is ${title(item.tags[0] || "trade")} cargo from ${origin}. It is worth ${money(item.loafValue)} each before demand, relationship, law, and risk adjustments.`,
  };
}

export function InventoryPanel({ title: panelTitle, subtitle, inventory, owner, mode = "stock", variant = "default", panelVariant = "parchment", allowProtect = false, illegalTags = [], questItemIndexes, className, bodyClassName, onMove, onMoveAll, onToggleProtect }: InventoryPanelProps) {
  const rows = inventory.filter((entry) => quantityFor(entry, mode) > 0);
  const isGrid = variant === "compact" || variant === "management";
  const darkPanel = panelVariant === "wood" || panelVariant === "dark";
  const ownerId = owner || panelTitle;
  const totals = cargoSummary(rows, mode);
  const [dropStatus, setDropStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [noticeEntry, setNoticeEntry] = useState<InventoryEntry | null>(null);
  const dropTimerRef = useRef<number | null>(null);
  const noticeItem = noticeEntry ? itemFor(noticeEntry) : null;
  const notice = noticeEntry && noticeItem ? itemNotice(noticeItem, noticeEntry, illegalTags) : null;

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
      className={className}
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
            "flex flex-wrap content-start items-start gap-1 overflow-auto rounded-md border p-1 shadow-inner",
            darkPanel
              ? "border-[#d0a65a]/35 bg-black/25 shadow-black/35"
              : "border-[#9a7138]/55 bg-[#fff6d7]/35 shadow-[#6c4418]/20",
            dropStatus === "valid" && "ring-2 ring-[#9ce277] ring-offset-2 ring-offset-[#2a1809]",
            dropStatus === "invalid" && "animate-pulse ring-2 ring-[#d5523f] ring-offset-2 ring-offset-[#2a1809]",
            variant === "compact" ? "max-h-56" : "max-h-[67vh]",
            bodyClassName
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
                  "group relative grid min-w-0 place-items-center rounded-sm p-1.5 transition hover:-translate-y-0.5 hover:brightness-105",
                  physicalClass(item?.size, item?.weight, variant),
                  darkPanel ? "text-[#fff8d8]" : "text-[#201207]"
                )}
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
                {item ? (
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-x-1 top-1 z-30 rounded-sm border p-2 text-center text-[0.68rem] font-bold leading-snug opacity-0 shadow-xl transition delay-1000 duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100",
                      darkPanel ? "border-[#d0a65a]/70 bg-[#1b1007]/95 text-[#fff3bd]" : "border-[#9a7138]/70 bg-[#f1d49a]/95 text-[#2a1a0c]"
                    )}
                  >
                    <div className={cn("mb-1 grid min-h-14 place-items-center rounded-sm px-2 py-1", darkPanel ? "bg-black/45" : "bg-[#3f3f3f] text-white")}>
                      {icon ? <img className="h-5 w-5 object-contain" src={icon} alt="" /> : null}
                      <strong className="block max-w-full truncate text-sm leading-tight">{item.name}</strong>
                    </div>
                    <div className="grid gap-1">
                      <div className="grid grid-cols-[1fr_3rem] items-center gap-1">
                        <span className={cn("rounded-sm px-2 py-1 text-sm text-white", darkPanel ? "bg-[#315b86]" : "bg-[#436d9c]")}>Size:</span>
                        <span className="rounded-sm border border-[#7f5b2a] bg-[#fff8df] px-2 py-1 text-sm text-[#2a1a0c]">{item.size}</span>
                      </div>
                      <div className="grid grid-cols-[1fr_3rem] items-center gap-1">
                        <span className={cn("rounded-sm px-2 py-1 text-sm text-white", darkPanel ? "bg-[#3d8754]" : "bg-[#5aa76a]")}>Weight:</span>
                        <span className="rounded-sm border border-[#7f5b2a] bg-[#fff8df] px-2 py-1 text-sm text-[#2a1a0c]">{item.weight}</span>
                      </div>
                    </div>
                    <div className="mt-1 flex flex-wrap justify-center gap-1">
                      {item.tags.slice(0, 3).map((tag) => <span className="rounded-sm border border-[#7f5b2a] bg-[#fff8df] px-2 py-1 text-[#2a1a0c]" key={tag}>{title(tag)}</span>)}
                    </div>
                    {entry.protected || entry.conceal ? <span className="block text-[#1f5960]">{entry.protected ? "Protected" : ""}{entry.protected && entry.conceal ? " / " : ""}{entry.conceal ? "Concealed" : ""}</span> : null}
                    <Button
                      className="mt-2 w-full justify-center px-2 py-1 text-xs"
                      type="button"
                      variant="secondary"
                      onClick={(event) => {
                        event.stopPropagation();
                        setNoticeEntry(entry);
                      }}
                    >
                      Notice
                    </Button>
                  </div>
                ) : null}
              </div>
            );
          }) : <div className="w-full border border-[#9a7138]/45 bg-[#fff6d7]/40 p-3 text-sm text-[#725331]">No visible items here.</div>}
        </div>
      ) : (
      <div
        className={cn(
          "grid max-h-[360px] gap-2 overflow-auto pr-1",
          dropStatus === "valid" && "rounded-sm ring-2 ring-[#9ce277]",
          dropStatus === "invalid" && "animate-pulse rounded-sm ring-2 ring-[#d5523f]",
          bodyClassName
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
      {noticeEntry && noticeItem && notice ? (
        <ModalShell title="Item Notice" onClick={() => setNoticeEntry(null)}>
          <div className="grid gap-4 text-[#2a1a0c]" onClick={(event) => event.stopPropagation()}>
            <div className="grid gap-4 md:grid-cols-[180px_1fr]">
              <div className="grid place-items-center rounded-sm border border-[#9a7138]/60 bg-[#fff6d7]/70 p-4">
                <ItemSlot className="w-32" imageSrc={itemIconAsset(noticeItem.iconFile)} quantity={quantityFor(noticeEntry, mode)} marker={itemIsIllegal(noticeItem, illegalTags) ? "illegal" : noticeItem.unique ? "rare" : undefined} selected={noticeEntry.protected || noticeEntry.highlighted} />
              </div>
              <div>
                <h3 className="font-display text-4xl text-[#26170a]">{noticeItem.name}</h3>
                <p className="mt-1 text-sm font-bold text-[#75501f]">{noticeItem.tags.map(title).join(" / ") || "Uncategorized"}</p>
                <p className="mt-3 rounded-sm border border-[#9a7138]/45 bg-[#fff6d7]/70 p-3 leading-relaxed">{notice.summary}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <StatChip label="Quantity" value={quantityFor(noticeEntry, mode)} />
              <StatChip label="Base Value" value={money(noticeItem.loafValue)} />
              <StatChip label="Size" value={noticeItem.size} />
              <StatChip label="Weight" value={noticeItem.weight} />
              <StatChip label="Rarity" value={noticeItem.rarity || 1} />
              <StatChip label="Origin" value={notice.origin} />
              <StatChip label="Legality" value={notice.legal} tone={itemIsIllegal(noticeItem, illegalTags) ? "danger" : "parchment"} />
              <StatChip label="Offer" value={noticeEntry.offerQuantity} />
            </div>
            <div className="rounded-sm border border-[#9a7138]/45 bg-[#fff6d7]/70 p-3">
              <strong className="block font-display text-2xl text-[#26170a]">Merchant Handling</strong>
              <div className="mt-2 grid gap-1 text-sm">
                {notice.handling.map((line) => <span key={line}>{line}</span>)}
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setNoticeEntry(null)}>Close</Button>
            </div>
          </div>
        </ModalShell>
      ) : null}
    </Panel>
  );
}
