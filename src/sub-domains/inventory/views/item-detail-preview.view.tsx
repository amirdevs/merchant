import { BookOpen, Gem, Shield, Star, X } from "lucide-react";
import type { InventoryEntry, Marketplace } from "@/data/types";
import { itemIconAsset } from "@/lib/assets";
import { items, type GameState, visibleQuantity } from "@/lib/game";
import { money } from "@/lib/format";
import type { MoveAmount } from "@/lib/inventory";
import { Button } from "@/sub-domains/shared/components/ui";
import { iconFor, rarityLabel } from "@/sub-domains/inventory/utils/inventory-ui.utils";

function firstVisibleEntry(state: GameState): InventoryEntry | null {
  return state.playerInventory.find((entry) => visibleQuantity(entry) > 0) || null;
}

export function ItemDetailPreviewView({
  state,
  market,
  onBack,
  onMovePlayer,
  onTogglePlayerProtect,
}: {
  state: GameState;
  market: Marketplace;
  onBack: () => void;
  onMovePlayer: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  onTogglePlayerProtect: (entry: InventoryEntry) => void;
}) {
  const entry = firstVisibleEntry(state);

  if (!entry) {
    return (
      <section className="ui-screen item-detail-preview-screen">
        <div className="item-detail-modal-backdrop static-preview">
          <div className="item-detail-modal"><button className="item-detail-close" type="button" onClick={onBack}><X size={18} /></button><h2>Item Detail</h2><p>No visible item is available in the current inventory.</p><Button onClick={onBack}>Close</Button></div>
        </div>
      </section>
    );
  }

  const item = items[entry.itemIndex];
  const quantity = visibleQuantity(entry);
  const icon = itemIconAsset(item.iconFile);
  const protectedLabel = entry.protected ? "Protected" : "Unprotected";
  const concealedLabel = entry.conceal ? "Concealed" : "Visible";

  return (
    <section className="ui-screen item-detail-preview-screen" aria-label="Item detail modal preview">
      <div className="item-detail-modal-backdrop static-preview" role="dialog" aria-modal="true" aria-label={`Item detail for ${item.name}`}>
        <div className="item-detail-modal item-detail-modal-core">
          <button className="item-detail-close" type="button" onClick={onBack} aria-label="Close item detail"><X size={18} /></button>
          <div className="item-detail-hero">
            <div className="item-detail-icon-frame">{icon ? <img src={icon} alt="" /> : <span>{iconFor(entry)}</span>}</div>
            <div className="item-detail-heading">
              <span className="game-brand-kicker">Item Detail</span>
              <h3>{item.name}</h3>
              <p>{item.tags.join(" · ") || "uncategorized"}</p>
            </div>
          </div>

          <div className="item-detail-stats">
            <span><small>Quantity</small><strong>{quantity}</strong></span>
            <span><small>Base value</small><strong>{money(item.loafValue)}</strong></span>
            <span><small>Total</small><strong>{money(item.loafValue * quantity)}</strong></span>
            <span><small>Weight</small><strong>{item.weight}</strong></span>
            <span><small>Size</small><strong>{item.size}</strong></span>
            <span><small>Rarity</small><strong>{rarityLabel(item.rarity)}</strong></span>
          </div>

          <div className="item-detail-tags">
            {item.tags.map((tag) => <span key={tag}><Gem size={12} /> {tag}</span>)}
            {item.unique ? <span><Star size={12} /> unique</span> : null}
            <span><Shield size={12} /> {protectedLabel}</span>
            <span>{concealedLabel}</span>
          </div>

          <div className="item-detail-notes">
            <p><strong>Legality in {market.name}:</strong> no local warning currently attached.</p>
            <p><strong>Market demand notes:</strong> demand and discount hints will be connected to the selected market data in the next polish pass.</p>
            <p><strong>Player note:</strong> highlight and note controls are represented here for the final modal behavior.</p>
          </div>

          <div className="item-detail-actions">
            <Button onClick={() => onMovePlayer(entry, 1)}>Add to Offer</Button>
            <Button onClick={() => onTogglePlayerProtect(entry)}>{entry.protected ? "Unprotect" : "Protect"}</Button>
            <Button subtle disabled>Conceal</Button>
            <Button subtle disabled><BookOpen size={16} /> Read / Use</Button>
            <Button onClick={onBack}>Close</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
