import { Search, X } from "lucide-react";
import { items, type GameState, visibleQuantity } from "@/lib/game";
import { Button, Panel } from "@/sub-domains/shared/components/ui";

const categoryChips = ["food", "weapons", "armor", "books", "magic", "alchemy", "clothes", "jewelry"];
const statusChips = ["Protected", "Concealed", "Illegal", "Quest", "Highlighted"];

export function InventorySearchFilterView({ state, onBack }: { state: GameState; onBack: () => void }) {
  const visibleEntries = state.playerInventory.filter((entry) => visibleQuantity(entry) > 0);
  const totalTags = new Set(visibleEntries.flatMap((entry) => items[entry.itemIndex].tags));

  return (
    <section className="ui-screen inventory-filter-core-screen" aria-label="Inventory search and filter popover preview">
      <div className="inventory-filter-dimmed-grid" aria-hidden="true">
        {visibleEntries.slice(0, 24).map((entry) => {
          const item = items[entry.itemIndex];
          return <span key={entry.itemIndex}>{item.name}<small>{visibleQuantity(entry)}</small></span>;
        })}
      </div>

      <Panel className="inventory-filter-popover" title={<span className="inventory-filter-title"><Search size={18} /> Search Inventory <button type="button" onClick={onBack} aria-label="Close search"><X size={16} /></button></span>}>
        <label className="inventory-filter-input-row">
          <span>Search by name or tag</span>
          <input autoFocus placeholder="copper, food, weapon..." />
        </label>

        <div className="inventory-filter-result-count">Result count: {visibleEntries.length}</div>

        <div className="inventory-filter-section">
          <strong>Category chips</strong>
          <div className="inventory-filter-chip-row">
            {categoryChips.map((chip) => <button className={totalTags.has(chip) ? "is-active" : ""} key={chip} type="button">{chip}</button>)}
          </div>
        </div>

        <div className="inventory-filter-section">
          <strong>Status toggles</strong>
          <div className="inventory-filter-chip-row">
            {statusChips.map((chip) => <button key={chip} type="button">{chip}</button>)}
          </div>
        </div>

        <div className="inventory-filter-sort-grid">
          <button type="button">Name ↓</button>
          <button type="button">Value ↓</button>
          <button type="button">Quantity ↓</button>
        </div>

        <footer className="inventory-filter-actions">
          <Button subtle onClick={onBack}>Clear</Button>
          <Button onClick={onBack}>Apply</Button>
        </footer>
      </Panel>
    </section>
  );
}
