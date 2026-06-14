export function InventorySummary({ shown, total, totalWeight }: { shown: number; total: number; totalWeight: number }) {
  return (
    <div className="inventory-ledger-summary" aria-label="Inventory summary">
      <span><strong>{shown}</strong><small>shown</small></span>
      <span><strong>{total}</strong><small>total</small></span>
      <span><strong>{totalWeight}</strong><small>weight</small></span>
    </div>
  );
}
