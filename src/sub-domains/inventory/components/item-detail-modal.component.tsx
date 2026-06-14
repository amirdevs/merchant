import { Gem, Shield, Star, X } from "lucide-react";
import type { InventoryEntry } from "@/data/types";
import { items } from "@/lib/game";
import { itemIconAsset } from "@/lib/assets";
import { money } from "@/lib/format";
import type { MoveAmount } from "@/lib/inventory";
import { Button } from "@/sub-domains/shared/components/ui";
import type { InventoryPanelMode } from "@/sub-domains/inventory/types/inventory-panel.type";
import { iconFor, quantityFor, rarityLabel } from "@/sub-domains/inventory/utils/inventory-ui.utils";

export function ItemDetailModal({
  entry,
  mode,
  onClose,
  onMove,
}: {
  entry: InventoryEntry;
  mode: InventoryPanelMode;
  onClose: () => void;
  onMove: (entry: InventoryEntry, amount: MoveAmount) => void;
}) {
  const item = items[entry.itemIndex];
  const quantity = quantityFor(entry, mode);
  const icon = itemIconAsset(item.iconFile);

  return (
    <div className="item-detail-modal-backdrop" role="dialog" aria-modal="true" aria-label={`Item detail for ${item.name}`}>
      <div className="item-detail-modal">
        <button className="item-detail-close" type="button" onClick={onClose} aria-label="Close item detail"><X size={18} /></button>
        <div className="item-detail-hero">
          <div className="item-detail-icon-frame">
            {icon ? <img src={icon} alt="" /> : <span>{iconFor(entry)}</span>}
          </div>
          <div className="item-detail-heading">
            <span className="game-brand-kicker">Item Detail</span>
            <h3>{item.name}</h3>
            <p>{item.tags.join(" · ") || "uncategorized"}</p>
          </div>
        </div>

        <div className="item-detail-stats">
          <span><small>Quantity</small><strong>{quantity}</strong></span>
          <span><small>Value</small><strong>{money(item.loafValue)}</strong></span>
          <span><small>Total</small><strong>{money(item.loafValue * quantity)}</strong></span>
          <span><small>Weight</small><strong>{item.weight}</strong></span>
          <span><small>Size</small><strong>{item.size}</strong></span>
          <span><small>Rarity</small><strong>{rarityLabel(item.rarity)}</strong></span>
        </div>

        <div className="item-detail-tags">
          {item.tags.map((tag) => <span key={tag}><Gem size={12} /> {tag}</span>)}
          {item.unique ? <span><Star size={12} /> unique</span> : null}
          {entry.protected ? <span><Shield size={12} /> protected</span> : null}
        </div>

        <div className="item-detail-actions">
          <Button onClick={() => onMove(entry, mode === "offer" ? -1 : 1)}>{mode === "offer" ? "Remove One" : "Offer One"}</Button>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}
