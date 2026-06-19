import { useMemo, useRef, useState, type DragEvent, type KeyboardEvent, type MouseEvent } from "react";
import { ArrowDownAZ, Lock, Search } from "lucide-react";
import type { InventoryEntry, Item } from "@/data/types";
import { itemIconAsset } from "@/lib/assets";
import { items, kingdoms } from "@/lib/game";
import { money, title } from "@/lib/format";
import { type MoveAmount, visibleQuantity } from "@/lib/inventory";
import { itemIsIllegal } from "@/lib/legal";
import { cn } from "@/lib/cn";
import { Button, ItemSlot, LedgerRow, ModalShell, Panel, Portal, StatChip } from "@/components/ui";

type InventoryPanelMode = "stock" | "offer";
type InventoryPanelSort = "merchant" | "name" | "category" | "quantity" | "value" | "total-value" | "rarity" | "size" | "weight";

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

function merchantSortRank(item: Item | undefined, entry: InventoryEntry, questItemIndexes?: Set<number>) {
  if (!item) return 99;
  const tags = new Set(item.tags.map((tag) => tag.toLowerCase()));
  const name = item.name.toLowerCase();
  if (tags.has("coins") || /\b(copper|silver|gold) coins?\b/.test(name)) return 0;
  if (tags.has("jewlery") || tags.has("gems") || tags.has("crystals") || tags.has("rings") || tags.has("necklaces") || tags.has("amulets")) return 1;
  if (questItemIndexes?.has(entry.itemIndex) || item.unique) return 2;
  if (tags.has("magic") || tags.has("potions") || tags.has("remedies") || tags.has("alchemy")) return 3;
  if (tags.has("weapons")) return 4;
  if (tags.has("armor") || tags.has("clothes")) return 5;
  if (tags.has("tools") || tags.has("supplies")) return 6;
  if (tags.has("ore") || tags.has("ingots") || tags.has("wood") || tags.has("fabrics") || tags.has("materials")) return 7;
  if (tags.has("food") || tags.has("drinks")) return 8;
  if (tags.has("animals") || tags.has("livestock") || tags.has("packhorses") || tags.has("carts")) return 9;
  if (tags.has("books") || tags.has("maps") || tags.has("paintings") || tags.has("statues") || tags.has("art")) return 10;
  if (tags.has("furniture") || tags.has("storage") || tags.has("household")) return 11;
  return 12;
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
const dragFallbackType = "text/plain";
const hoverCardWidth = 220;
const hoverCardHeight = 286;

type HoverCardState = {
  entry: InventoryEntry;
  item: Item;
  icon?: string;
  left: number;
  top: number;
};

type MouseGuideState = {
  left: number;
  top: number;
};

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
  const heavy = itemWeight >= 12;

  if (variant === "compact") {
    if (bulk >= 30) return "basis-[7rem] min-h-[6.25rem] items-end";
    if (bulk >= 20 || heavy) return "basis-[6rem] min-h-[5.5rem] items-end";
    if (bulk >= 10) return "basis-[5rem] min-h-[4.75rem]";
    return "basis-[4rem] min-h-[4.25rem]";
  }

  if (variant === "management") {
    if (bulk >= 30) return "basis-[9rem] min-h-[9rem]";
    if (bulk >= 20 || heavy) return "basis-[8rem] min-h-[8rem]";
    if (bulk >= 10) return "basis-[7rem] min-h-[7rem]";
    return "basis-[5.5rem] min-h-[6rem]";
  }

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
  const visibleRows = inventory.filter((entry) => quantityFor(entry, mode) > 0);
  const isGrid = variant === "compact" || variant === "management";
  const darkPanel = panelVariant === "wood" || panelVariant === "dark";
  const ownerId = owner || panelTitle;
  const totals = cargoSummary(visibleRows, mode);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState<InventoryPanelSort>("merchant");
  const [dropStatus, setDropStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [noticeEntry, setNoticeEntry] = useState<InventoryEntry | null>(null);
  const [hoverCard, setHoverCard] = useState<HoverCardState | null>(null);
  const [mouseGuide, setMouseGuide] = useState<MouseGuideState | null>(null);
  const dropTimerRef = useRef<number | null>(null);
  const hoverTimerRef = useRef<number | null>(null);
  const hoverCloseTimerRef = useRef<number | null>(null);
  const dragPreviewRef = useRef<HTMLElement | null>(null);
  const previousCursorRef = useRef("");
  const noticeItem = noticeEntry ? itemFor(noticeEntry) : null;
  const notice = noticeEntry && noticeItem ? itemNotice(noticeItem, noticeEntry, illegalTags) : null;
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const entry of visibleRows) {
      const primaryTag = itemFor(entry)?.tags[0];
      if (primaryTag) counts.set(primaryTag, (counts.get(primaryTag) || 0) + 1);
    }
    return [...counts.entries()]
      .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
      .slice(0, variant === "compact" ? 6 : 10)
      .map(([tag]) => tag);
  }, [inventory, mode, variant]);
  const normalizedQuery = query.trim().toLowerCase();
  const rows = visibleRows
    .filter((entry) => {
      const item = itemFor(entry);
      if (!item) return false;
      if (category !== "all" && item.tags[0] !== category) return false;
      return !normalizedQuery || item.name.toLowerCase().includes(normalizedQuery) || item.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));
    })
    .sort((left, right) => {
      const leftItem = itemFor(left);
      const rightItem = itemFor(right);
      if (sortBy === "merchant") {
        const rankDifference = merchantSortRank(leftItem, left, questItemIndexes) - merchantSortRank(rightItem, right, questItemIndexes);
        if (rankDifference) return rankDifference;
        const rarityDifference = (rightItem?.rarity || 0) - (leftItem?.rarity || 0);
        if (rarityDifference) return rarityDifference;
        const valueDifference = (rightItem?.loafValue || 0) - (leftItem?.loafValue || 0);
        if (valueDifference) return valueDifference;
        return (leftItem?.name || "").localeCompare(rightItem?.name || "");
      }
      if (sortBy === "category") {
        const categoryDifference = (leftItem?.tags[0] || "other").localeCompare(rightItem?.tags[0] || "other");
        return categoryDifference || (leftItem?.name || "").localeCompare(rightItem?.name || "");
      }
      if (sortBy === "quantity") return quantityFor(right, mode) - quantityFor(left, mode);
      if (sortBy === "value") return (rightItem?.loafValue || 0) - (leftItem?.loafValue || 0);
      if (sortBy === "total-value") return (rightItem?.loafValue || 0) * quantityFor(right, mode) - (leftItem?.loafValue || 0) * quantityFor(left, mode);
      if (sortBy === "rarity") return (rightItem?.rarity || 0) - (leftItem?.rarity || 0) || (rightItem?.loafValue || 0) - (leftItem?.loafValue || 0);
      if (sortBy === "size") return (rightItem?.size || 0) - (leftItem?.size || 0) || (rightItem?.weight || 0) - (leftItem?.weight || 0);
      if (sortBy === "weight") return (rightItem?.weight || 0) - (leftItem?.weight || 0) || (rightItem?.size || 0) - (leftItem?.size || 0);
      return (leftItem?.name || "").localeCompare(rightItem?.name || "");
    });

  function flashDropStatus(nextStatus: "valid" | "invalid") {
    if (dropTimerRef.current) window.clearTimeout(dropTimerRef.current);
    setDropStatus(nextStatus);
    dropTimerRef.current = window.setTimeout(() => setDropStatus("idle"), 650);
  }

  function dragData(entry: InventoryEntry): InventoryDragData {
    return { owner: ownerId, mode, itemIndex: entry.itemIndex };
  }

  function onDragStart(event: DragEvent<HTMLElement>, entry: InventoryEntry, item?: Item, icon?: string) {
    clearHoverTimers();
    setHoverCard(null);
    setMouseGuide(null);
    const payload = JSON.stringify(dragData(entry));
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(dragType, payload);
    event.dataTransfer.setData(dragFallbackType, payload);

    const preview = document.createElement("div");
    preview.style.cssText = [
      "position:fixed",
      "left:-1000px",
      "top:-1000px",
      "width:220px",
      "min-height:170px",
      "display:grid",
      "place-items:center",
      "padding:14px 14px 36px",
      "border:3px solid #d6aa50",
      "border-radius:18px",
      "background:radial-gradient(circle at 50% 35%,#fff7cc 0%,#d7a957 52%,#4a2910 100%)",
      "box-shadow:0 18px 36px rgba(0,0,0,.48),inset 0 0 0 3px rgba(82,45,14,.65)",
      "color:#2a1708",
      "font-family:Georgia,serif",
      "pointer-events:none",
      "transform:rotate(-2deg)",
    ].join(";");
    preview.setAttribute("aria-hidden", "true");

    if (icon) {
      const image = document.createElement("img");
      image.src = icon;
      image.alt = "";
      image.style.cssText = "width:88px;height:88px;object-fit:contain;filter:drop-shadow(0 8px 7px rgba(0,0,0,.4));";
      preview.appendChild(image);
    }

    const label = document.createElement("strong");
    label.textContent = item?.name || `Item ${entry.itemIndex}`;
    label.style.cssText = "max-width:190px;white-space:normal;overflow-wrap:anywhere;font-size:15px;line-height:1.15;text-align:center;";
    preview.appendChild(label);

    const quantity = document.createElement("span");
    quantity.textContent = `Full stack ×${quantityFor(entry, mode)}`;
    quantity.style.cssText = "position:absolute;right:-10px;top:-10px;padding:5px 9px;border:2px solid #5a3415;border-radius:999px;background:#fff1a8;font:900 13px system-ui;color:#281507;box-shadow:0 4px 10px rgba(0,0,0,.35);";
    preview.appendChild(quantity);

    const dragHint = document.createElement("span");
    dragHint.textContent = "✥ Move stack";
    dragHint.style.cssText = "position:absolute;left:9px;bottom:7px;padding:3px 6px;border-radius:6px;background:rgba(42,23,8,.88);font:800 10px system-ui;text-transform:uppercase;letter-spacing:.04em;color:#fff1b5;";
    preview.appendChild(dragHint);

    document.body.appendChild(preview);
    dragPreviewRef.current = preview;
    event.dataTransfer.setDragImage(preview, 110, 180);

    previousCursorRef.current = document.documentElement.style.cursor;
    document.documentElement.style.cursor = "grabbing";
  }

  function onDragEnd() {
    document.documentElement.style.cursor = previousCursorRef.current;
    previousCursorRef.current = "";
    dragPreviewRef.current?.remove();
    dragPreviewRef.current = null;
    setDropStatus("idle");
  }

  function onDrop(event: DragEvent<HTMLElement>) {
    const raw = event.dataTransfer.getData(dragType) || event.dataTransfer.getData(dragFallbackType);
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
      onMove(entry, mode === "offer" ? entry.quantity : -entry.quantity);
      flashDropStatus("valid");
    } catch {
      flashDropStatus("invalid");
      return;
    }
  }

  function onDragOver(event: DragEvent<HTMLElement>) {
    if (event.dataTransfer.types.includes(dragType) || event.dataTransfer.types.includes(dragFallbackType)) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    }
  }

  function handleItemClick(event: MouseEvent<HTMLElement>, entry: InventoryEntry) {
    if (event.button !== 0) return;
    clearHoverTimers();
    setHoverCard(null);
    setMouseGuide(null);
    onMove(entry, moveAmountFromInput(event, mode));
  }

  function handleItemContextMenu(event: MouseEvent<HTMLElement>, entry: InventoryEntry) {
    event.preventDefault();
    clearHoverTimers();
    setHoverCard(null);
    setMouseGuide(null);
    onMoveAll(entry);
  }

  function handleItemAuxClick(event: MouseEvent<HTMLElement>, entry: InventoryEntry) {
    if (event.button !== 1) return;
    event.preventDefault();
    clearHoverTimers();
    setHoverCard(null);
    setMouseGuide(null);
    onMove(entry, "half");
  }

  function clearHoverTimers() {
    if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
    if (hoverCloseTimerRef.current) window.clearTimeout(hoverCloseTimerRef.current);
  }

  function openHoverCard(event: MouseEvent<HTMLElement>, entry: InventoryEntry, item: Item, icon?: string) {
    clearHoverTimers();
    showMouseGuide(event);
    const rect = event.currentTarget.getBoundingClientRect();
    const left = Math.min(Math.max(rect.left + rect.width / 2 - hoverCardWidth / 2, 8), window.innerWidth - hoverCardWidth - 8);
    const belowTop = rect.bottom + 8;
    const top = belowTop + hoverCardHeight > window.innerHeight ? Math.max(8, rect.top - hoverCardHeight - 8) : belowTop;

    hoverTimerRef.current = window.setTimeout(() => {
      setMouseGuide(null);
      setHoverCard({ entry, item, icon, left, top });
    }, 1000);
  }

  function scheduleCloseHoverCard() {
    if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
    setMouseGuide(null);
    hoverCloseTimerRef.current = window.setTimeout(() => setHoverCard(null), 140);
  }

  function showMouseGuide(event: MouseEvent<HTMLElement>) {
    if (!Number.isFinite(event.clientX) || !Number.isFinite(event.clientY)) return;
    const guideWidth = 196;
    const guideHeight = 32;
    setMouseGuide({
      left: Math.min(event.clientX + 14, window.innerWidth - guideWidth - 8),
      top: Math.min(event.clientY + 14, window.innerHeight - guideHeight - 8),
    });
  }

  return (
    <Panel
      className={cn("flex min-h-0 flex-col", className)}
      variant={panelVariant}
      dense={variant === "compact"}
      titleClassName="w-full shrink-0 flex-col items-stretch px-2.5 py-2"
      contentClassName="min-h-0 flex-1"
      title={
        <span className="grid w-full gap-1.5">
          <span className="flex min-w-0 items-center gap-2">
            <span className="min-w-0 flex-1">
              <span className="block truncate">{panelTitle}</span>
              {subtitle ? <span className="block truncate text-[0.65rem] font-normal text-[#e8d39d]">{subtitle}</span> : null}
              <span className="block text-[0.62rem] font-black uppercase tracking-wide text-[#e8d39d]">Size {totals.size} / Weight {totals.weight} / {rows.length} of {visibleRows.length}</span>
            </span>
            <label className="relative min-w-0 flex-1 font-sans text-xs">
              <Search className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-[#75501f]" size={13} />
              <input
                className="h-8 w-full rounded-sm border border-[#9a7138]/80 bg-[#fff6d7] pl-7 pr-2 text-[#26170a] outline-none placeholder:text-[#8a6a42] focus:border-[#d6ad57]"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search"
                aria-label={`Search ${panelTitle}`}
              />
            </label>
            <label className="relative shrink-0 font-sans text-xs">
              <ArrowDownAZ className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-[#75501f]" size={13} />
              <select
                className="h-8 appearance-none rounded-sm border border-[#9a7138]/80 bg-[#fff6d7] pl-7 pr-6 font-bold text-[#26170a] outline-none focus:border-[#d6ad57]"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as InventoryPanelSort)}
                aria-label={`Sort ${panelTitle}`}
              >
                <option value="merchant">Merchant</option>
                <option value="name">Name</option>
                <option value="category">Category</option>
                <option value="quantity">Count</option>
                <option value="value">Unit Value</option>
                <option value="total-value">Stack Value</option>
                <option value="rarity">Rarity</option>
                <option value="size">Size</option>
                <option value="weight">Weight</option>
              </select>
            </label>
          </span>
          <span className="flex w-full gap-1 overflow-x-auto pb-0.5 font-sans [scrollbar-width:thin]">
            {["all", ...categories].map((tag) => (
              <button
                className={cn(
                  "shrink-0 rounded-full border px-2 py-0.5 text-[0.58rem] font-black uppercase tracking-wide transition",
                  category === tag
                    ? "border-[#ffe08a] bg-[#d6ad57] text-[#26170a]"
                    : "border-[#d6ad57]/55 bg-[#163f44]/80 text-[#fff3bd] hover:border-[#ffe08a]"
                )}
                type="button"
                onClick={() => setCategory(tag)}
                key={tag}
              >
                {tag === "all" ? "All" : title(tag)}
              </button>
            ))}
          </span>
        </span>
      }
    >
      {isGrid ? (
        <div
          className={cn(
            "flex flex-wrap content-start items-start rounded-md border shadow-inner",
            variant === "compact"
              ? "h-full min-h-0 gap-1 overflow-x-hidden overflow-y-auto overscroll-contain p-1 [scrollbar-color:#b98b37_transparent] [scrollbar-width:thin]"
              : "max-h-[67vh] gap-2 overflow-x-hidden overflow-y-auto overscroll-contain p-2 [scrollbar-color:#b98b37_transparent] [scrollbar-width:thin]",
            darkPanel
              ? "border-[#d0a65a]/35 bg-black/25 shadow-black/35"
              : "border-[#9a7138]/55 bg-[#fff6d7]/35 shadow-[#6c4418]/20",
            dropStatus === "valid" && "cursor-move",
            dropStatus === "valid" && "ring-2 ring-[#9ce277] ring-offset-2 ring-offset-[#2a1809]",
            dropStatus === "invalid" && "animate-pulse ring-2 ring-[#d5523f] ring-offset-2 ring-offset-[#2a1809]",
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
                  "group relative grid min-w-0 place-items-center rounded-sm transition hover:-translate-y-0.5 hover:brightness-105",
                  variant === "compact" ? "p-0" : "p-1.5",
                  physicalClass(item?.size, item?.weight, variant),
                  darkPanel ? "text-[#fff8d8]" : "text-[#201207]"
                )}
                onMouseEnter={(event) => {
                  if (item) openHoverCard(event, entry, item, icon);
                }}
                onMouseMove={showMouseGuide}
                onMouseLeave={scheduleCloseHoverCard}
                onFocus={(event) => {
                  if (item) openHoverCard(event, entry, item, icon);
                }}
                onBlur={scheduleCloseHoverCard}
              >
                <ItemSlot
                  className={cn("mx-auto", slotSizeClass(item?.size, item?.weight, variant))}
                  imageSrc={icon}
                  marker={marker}
                  quantity={shownQuantity}
                  selected={(entry.protected || entry.highlighted) && mode !== "offer"}
                  draggable
                  onDragStart={(event) => onDragStart(event, entry, item, icon)}
                  onDragEnd={onDragEnd}
                  onClick={(event) => handleItemClick(event, entry)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onMove(entry, moveAmountFromInput(event, mode));
                    }
                  }}
                  onContextMenu={(event) => handleItemContextMenu(event, entry)}
                  onAuxClick={(event) => handleItemAuxClick(event, entry)}
                  onDoubleClick={(event) => {
                    event.preventDefault();
                  }}
                  aria-label={`${item?.name || `Item ${entry.itemIndex}`}. Left click moves one. Right click moves all or clears. Middle click splits half. Shift-left moves half. Alt-left moves ten. Drag between stock and offer.`}
                />
                {allowProtect && onToggleProtect && mode !== "offer" ? (
                  <button
                    className="absolute left-1 top-1 grid h-5 w-5 place-items-center rounded-full border border-[#5a3b18] bg-[#f1dcae] text-[#2a1a0c] opacity-0 shadow transition group-hover:opacity-100 focus-visible:opacity-100"
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
              </div>
            );
          }) : <div className="w-full border border-[#9a7138]/45 bg-[#fff6d7]/40 p-3 text-sm text-[#725331]">No visible items here.</div>}
        </div>
      ) : (
      <div
        className={cn(
          "grid max-h-[360px] gap-2 overflow-x-hidden overflow-y-auto overscroll-contain pr-1 [scrollbar-color:#b98b37_transparent] [scrollbar-width:thin]",
          dropStatus === "valid" && "cursor-move",
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
              className="text-[#2a1a0c] transition duration-150"
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
              onClick={(event) => handleItemClick(event, entry)}
              onMouseEnter={showMouseGuide}
              onMouseMove={showMouseGuide}
              onMouseLeave={scheduleCloseHoverCard}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onMove(entry, moveAmountFromInput(event, mode));
                }
              }}
              onContextMenu={(event) => handleItemContextMenu(event, entry)}
              onAuxClick={(event) => handleItemAuxClick(event, entry)}
              onDoubleClick={(event) => {
                event.preventDefault();
              }}
              aria-label={`${item?.name || `Item ${entry.itemIndex}`}. Left click moves one. Right click moves all or clears. Middle click splits half. Shift-left moves half. Alt-left moves ten. Drag between stock and offer.`}
              draggable
              onDragStart={(event) => onDragStart(event, entry, item, icon)}
              onDragEnd={onDragEnd}
            />
          );
        }) : <div className="border border-[#9a7138]/45 bg-[#fff6d7]/40 p-3 text-sm text-[#725331]">No visible items here.</div>}
      </div>
      )}
      {mouseGuide && !hoverCard && !noticeEntry ? (
        <Portal>
          <div
            className="pointer-events-none fixed z-[800] flex items-center gap-1 rounded-sm border border-[#d0a65a]/80 bg-[#160d05]/95 px-1.5 py-1 text-[0.62rem] font-black uppercase text-[#fff3bd] shadow-xl shadow-black/50"
            style={{ left: mouseGuide.left, top: mouseGuide.top }}
            aria-hidden="true"
          >
            <MouseAction button="L" action={mode === "offer" ? "Remove 1" : "Offer 1"} />
            <MouseAction button="M" action="Half" />
            <MouseAction button="R" action={mode === "offer" ? "Clear" : "All"} />
          </div>
        </Portal>
      ) : null}
      {hoverCard ? (
        <Portal>
          <div
            className="fixed z-[900] w-[220px] rounded-sm border-2 border-[#7f5b2a] bg-[#e5c07c] p-2 text-center text-[0.68rem] font-bold leading-snug text-[#2a1a0c] shadow-2xl shadow-black/45"
            style={{
              left: hoverCard.left,
              top: hoverCard.top,
              backgroundImage: "linear-gradient(180deg, rgba(255,246,195,.9), rgba(209,151,76,.88))",
            }}
            onMouseEnter={clearHoverTimers}
            onMouseLeave={scheduleCloseHoverCard}
          >
            <div className="mb-2 grid min-h-20 place-items-center rounded-sm bg-[#3f3f3f] px-2 py-2 text-white shadow-inner shadow-black/35">
              {hoverCard.icon ? <img className="h-8 w-8 object-contain drop-shadow" src={hoverCard.icon} alt="" /> : null}
              <strong className="block max-w-full truncate text-lg leading-tight">{hoverCard.item.name}</strong>
            </div>
            <div className="grid gap-1">
              <div className="grid grid-cols-[1fr_3.5rem] items-center gap-1">
                <span className="rounded-sm bg-[#436d9c] px-2 py-1 text-base text-white shadow">Size:</span>
                <span className="rounded-sm border border-[#7f5b2a] bg-[#fff8df] px-2 py-1 text-base text-[#2a1a0c]">{hoverCard.item.size}</span>
              </div>
              <div className="grid grid-cols-[1fr_3.5rem] items-center gap-1">
                <span className="rounded-sm bg-[#5aa76a] px-2 py-1 text-base text-white shadow">Weight:</span>
                <span className="rounded-sm border border-[#7f5b2a] bg-[#fff8df] px-2 py-1 text-base text-[#2a1a0c]">{hoverCard.item.weight}</span>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-1">
              {hoverCard.item.tags.slice(0, 3).map((tag) => <span className="rounded-sm border border-[#7f5b2a] bg-[#fff8df] px-2 py-1 text-sm text-[#2a1a0c]" key={tag}>{title(tag)}</span>)}
            </div>
            {hoverCard.entry.protected || hoverCard.entry.conceal ? <span className="mt-1 block text-[#1f5960]">{hoverCard.entry.protected ? "Protected" : ""}{hoverCard.entry.protected && hoverCard.entry.conceal ? " / " : ""}{hoverCard.entry.conceal ? "Concealed" : ""}</span> : null}
            <Button
              className="mt-2 w-full justify-center px-2 py-1 text-xs"
              type="button"
              variant="secondary"
              onClick={(event) => {
                event.stopPropagation();
                setNoticeEntry(hoverCard.entry);
                setHoverCard(null);
              }}
            >
              Notice
            </Button>
          </div>
        </Portal>
      ) : null}
      {noticeEntry && noticeItem && notice ? (
        <ModalShell title="Item Details & Actions" panelClassName="max-w-4xl" onClick={() => setNoticeEntry(null)}>
          <div className="grid gap-4 text-[#2a1a0c]" onClick={(event) => event.stopPropagation()}>
            <div className="grid gap-4 md:grid-cols-[200px_1fr]">
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
              <StatChip label="Total Value" value={money(noticeItem.loafValue * quantityFor(noticeEntry, mode))} />
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
            <div className="rounded-sm border border-[#9a7138]/45 bg-[#fff6d7]/70 p-3">
              <strong className="block font-display text-2xl text-[#26170a]">{mode === "offer" ? "Offer Actions" : "Item Actions"}</strong>
              <p className="mt-1 text-sm text-[#725331]">
                {mode === "offer" ? "Return this item from the offer to its owner's stock." : "Move this item into the current offer."}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button onClick={() => onMove(noticeEntry, mode === "offer" ? -1 : 1)}>{mode === "offer" ? "Remove One" : "Offer One"}</Button>
                <Button variant="secondary" onClick={() => onMove(noticeEntry, "half")}>{mode === "offer" ? "Remove Half" : "Offer Half"}</Button>
                <Button variant="secondary" onClick={() => onMoveAll(noticeEntry)}>{mode === "offer" ? "Clear Item" : "Offer All"}</Button>
                {allowProtect && onToggleProtect && mode !== "offer" ? (
                  <Button subtle onClick={() => onToggleProtect(noticeEntry)}>{noticeEntry.protected ? "Unprotect" : "Protect"}</Button>
                ) : null}
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="secondary" onClick={() => setNoticeEntry(null)}>Close</Button>
            </div>
          </div>
        </ModalShell>
      ) : null}
    </Panel>
  );
}

function MouseAction({ button, action }: { button: string; action: string }) {
  const activeButton = button === "L" ? "left" : button === "M" ? "middle" : "right";

  return (
    <span className="flex items-center gap-0.5 whitespace-nowrap">
      <span className="grid h-4 w-3 grid-cols-2 grid-rows-[6px_1fr] overflow-hidden rounded-t-full rounded-b-md border border-[#fff3bd]/75" aria-hidden="true">
        <span className={cn("border-b border-r border-[#fff3bd]/45", activeButton === "left" && "bg-[#ffd975]")} />
        <span className={cn("border-b border-[#fff3bd]/45", activeButton === "right" && "bg-[#ffd975]")} />
        <span className={cn("col-span-2", activeButton === "middle" && "bg-[#ffd975]")} />
      </span>
      <span>{action}</span>
    </span>
  );
}
