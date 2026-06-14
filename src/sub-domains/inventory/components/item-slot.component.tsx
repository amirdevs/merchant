import { Eye, Shield, Star } from "lucide-react";
import { items } from "@/lib/game";
import { money } from "@/lib/format";
import { itemIconAsset } from "@/lib/assets";
import { cn } from "@/sub-domains/shared/utils/cn.utils";
import { ItemArtFrame } from "@/sub-domains/inventory/components/item-art-frame.component";
import type { ItemSlotProps } from "@/sub-domains/inventory/types/inventory-panel.type";
import { itemGridSpan, quantityFor } from "@/sub-domains/inventory/utils/inventory-ui.utils";

export function ItemSlot({ entry, mode, selected, allowProtect, onMove, onMoveAll, onSelect, onToggleProtect, clickAmount }: ItemSlotProps) {
  const item = items[entry.itemIndex];
  const quantity = quantityFor(entry, mode);
  const icon = itemIconAsset(item.iconFile);

  return (
    <div className={cn("item-slot", itemGridSpan(item.size), entry.protected && "protected", selected && "selected")}>
      <button
        className="item-button"
        onClick={(event) => onMove(entry, clickAmount(event))}
        onContextMenu={(event) => {
          event.preventDefault();
          onMoveAll(entry);
        }}
        title="Left click moves one. Right click moves all or clears. Shift moves half. Alt moves ten."
      >
        <ItemArtFrame entry={entry} icon={icon} />
        <span className="item-meta">
          <span className="item-name">{item.name}</span>
          <small className="item-value">{money(item.loafValue)}</small>
        </span>
        <strong className="item-qty">{quantity}</strong>
        {entry.protected ? <span className="item-state-badge"><Shield size={11} /> safe</span> : null}
      </button>
      <button className="item-inspect" type="button" onClick={() => onSelect(entry)} title={`Inspect ${item.name}`}>
        <Eye size={13} />
      </button>
      {allowProtect ? (
        <button
          className={cn("item-protect", entry.protected && "active")}
          onClick={() => onToggleProtect?.(entry)}
          title={entry.protected ? "Unstar item" : "Star item"}
        >
          <Star size={14} fill={entry.protected ? "currentColor" : "none"} />
        </button>
      ) : null}
    </div>
  );
}
