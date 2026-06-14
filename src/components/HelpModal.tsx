import { X } from "lucide-react";
import { Button, IconButton, Panel } from "./ui";

const actions = [
  ["Left click item", "Move one item into or out of the current offer."],
  ["Right click item", "Move all visible stock into an offer, or clear that offer row."],
  ["Shift + click item", "Move about half of the available stack."],
  ["Alt + click item", "Move ten items at a time."],
  ["Star item", "Protect a player inventory item so it cannot be moved into an offer."],
  ["Inventory search", "Filter the current inventory panel by item name or tag."],
  ["Inventory sort", "Sort the current inventory panel by name, value, or quantity."],
  ["Click customer", "Select that market customer and show their dialogue and inventories."],
  ["Next Customer", "Switch to the next valid customer in the current market."],
  ["Make Offer", "Ask the selected customer to accept or reject the visible trade."],
  ["Travel route", "Move to another connected market and advance days."],
  ["New Game", "Start a fresh offline save state."],
  ["Save", "Write the current game state to local browser storage."],
  ["Load", "Load the local browser save if one exists."],
  ["Audio", "Toggle routed UI, item, travel, and ambient sounds."],
];

export function HelpModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="help-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="help-title" onClick={onClose}>
      <Panel className="help-modal-panel" title={null} onClick={(event) => event.stopPropagation()}>
        <header className="help-modal-header">
          <h2 id="help-title">Controls</h2>
          <IconButton aria-label="Close help" title="Close help" onClick={onClose}>
            <X size={18} />
          </IconButton>
        </header>

        <div className="help-action-list">
          {actions.map(([action, description]) => (
            <div key={action} className="help-action-card">
              <strong>{action}</strong>
              <span>{description}</span>
            </div>
          ))}
        </div>

        <footer className="mt-4 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </footer>
      </Panel>
    </div>
  );
}
