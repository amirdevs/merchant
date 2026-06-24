import { X } from "lucide-react";
import { Button, IconButton, Panel, Portal } from "@/shared/components/ui";

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
    <Portal>
      <div
        className="fixed inset-0 z-[1100] grid place-items-center bg-black/75 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-title"
        onClick={onClose}
      >
        <Panel className="max-h-[88dvh] w-full max-w-4xl overflow-auto" title={null} onClick={(event) => event.stopPropagation()}>
          <header className="mb-4 flex items-center justify-between gap-3 border-b border-brass/35 pb-3">
            <h2 id="help-title" className="font-display text-2xl">
              Controls
            </h2>
            <IconButton aria-label="Close help" title="Close help" onClick={onClose}>
              <X size={18} />
            </IconButton>
          </header>

          <div className="grid grid-cols-2 gap-2 max-[720px]:grid-cols-1">
            {actions.map(([action, description]) => (
              <div key={action} className="border border-brass/35 bg-black/20 p-3">
                <strong className="block text-brass">{action}</strong>
                <span className="mt-1 block text-sm text-parchment-muted">{description}</span>
              </div>
            ))}
          </div>

          <footer className="mt-4 flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </footer>
        </Panel>
      </div>
    </Portal>
  );
}
