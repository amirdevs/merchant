import type { InventoryEntry } from "@/data/types";
import { items, type GameState, visibleQuantity } from "@/lib/game";
import { money } from "@/lib/format";
import type { MoveAmount } from "@/lib/inventory";
import { Button, Panel } from "@/sub-domains/shared/components/ui";
import { InventoryPanel } from "@/sub-domains/inventory/components";

export function InventoryManagementView({
  state,
  playerOffer,
  onMovePlayer,
  onTogglePlayerProtect,
  onOpenFilter,
  onOpenItemDetail,
}: {
  state: GameState;
  playerOffer: number;
  onMovePlayer: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  onTogglePlayerProtect: (entry: InventoryEntry) => void;
  onOpenFilter: () => void;
  onOpenItemDetail: () => void;
}) {
  const carriedEntries = state.playerInventory.filter((entry) => visibleQuantity(entry) > 0);
  const offeredEntries = state.playerInventory.filter((entry) => entry.offerQuantity > 0);
  const protectedEntries = state.playerInventory.filter((entry) => entry.protected && visibleQuantity(entry) > 0);
  const totalValue = carriedEntries.reduce((total, entry) => total + items[entry.itemIndex].loafValue * visibleQuantity(entry), 0);
  const totalWeight = carriedEntries.reduce((total, entry) => total + items[entry.itemIndex].weight * visibleQuantity(entry), 0);
  const rareCount = carriedEntries.filter((entry) => (items[entry.itemIndex].rarity || 1) > 1 || items[entry.itemIndex].unique).length;
  const topGoods = [...carriedEntries].sort((left, right) => items[right.itemIndex].loafValue * visibleQuantity(right) - items[left.itemIndex].loafValue * visibleQuantity(left)).slice(0, 6);

  return (
    <section className="inventory-v4-screen ui-screen" aria-label="Inventory management">
      <Panel className="inventory-v4-overview" title="Merchant Pack" bodyClassName="inventory-v4-overview-body">
        <div className="inventory-v4-hero-copy"><span className="game-brand-kicker">Inventory Management</span><h2>Your goods, offers, and protected cargo</h2><p>{state.message}</p><div className="inventory-v4-hero-actions"><Button onClick={onOpenFilter}>Search / Filter</Button><Button subtle onClick={onOpenItemDetail}>Item Detail</Button></div></div>
        <div className="inventory-v4-stat-grid"><span><small>Total value</small><strong>{money(totalValue)}</strong></span><span><small>Offer value</small><strong>{money(playerOffer)}</strong></span><span><small>Weight</small><strong>{totalWeight}</strong></span><span><small>Goods</small><strong>{carriedEntries.length}</strong></span><span><small>Protected</small><strong>{protectedEntries.length}</strong></span><span><small>Rare / unique</small><strong>{rareCount}</strong></span></div>
      </Panel>
      <div className="inventory-v4-main">
        <InventoryPanel title="Inventory" subtitle="Search, filter, inspect, protect, and move goods into the current offer." inventory={state.playerInventory} variant="management" onMove={(entry, amount) => onMovePlayer(entry, amount)} onMoveAll={(entry) => onMovePlayer(entry, "all")} onToggleProtect={onTogglePlayerProtect} allowProtect />
        <aside className="inventory-v4-side">
          <InventoryPanel title="Current Offer" subtitle="Right click clears a stack from the offer." mode="offer" variant="compact" inventory={state.playerInventory} onMove={(entry, amount) => onMovePlayer(entry, amount, true)} onMoveAll={(entry) => onMovePlayer(entry, "none", true)} />
          <Panel title="Valuable Goods" bodyClassName="inventory-v4-valuables">
            {topGoods.map((entry) => { const item = items[entry.itemIndex]; const quantity = visibleQuantity(entry); return <div className="inventory-v4-valuable-row" key={entry.itemIndex}><strong>{item.name}</strong><span>{quantity} × {money(item.loafValue)}</span></div>; })}
            {!topGoods.length ? <div className="game-panel-empty">No goods in pack.</div> : null}
          </Panel>
          <Panel title="Search & Filter Notes" bodyClassName="message-ledger inventory-v4-notes"><p>Use the search bar to find goods by name or tag. Use category chips to narrow the pack like the search/filter mockup.</p><p className="mt-2 text-sm text-parchment-muted">Click the eye button on any item to open the reusable item detail modal.</p>{offeredEntries.length ? <p className="mt-2">Current offer contains {offeredEntries.length} goods.</p> : null}</Panel>
        </aside>
      </div>
    </section>
  );
}
