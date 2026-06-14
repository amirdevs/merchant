import { X } from "lucide-react";
import { Button, IconButton } from "@/sub-domains/shared/components/ui";

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
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-labelledby="help-title" onClick={onClose}>
      <section className="max-h-[85vh] w-full max-w-2xl overflow-auto border-2 border-brass bg-panel p-4 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <header className="mb-3 flex items-center justify-between gap-3 border-b border-brass/45 pb-3">
          <h2 id="help-title" className="font-display text-2xl">
            Controls
          </h2>
          <IconButton aria-label="Close help" title="Close help" onClick={onClose}>
            <X size={18} />
          </IconButton>
        </header>

        <div className="grid gap-2">
          {actions.map(([action, description]) => (
            <div key={action} className="grid grid-cols-[170px_1fr] gap-3 border border-brass/35 bg-black/25 p-2 text-sm max-[640px]:grid-cols-1">
              <strong className="text-brass">{action}</strong>
              <span className="text-parchment-muted">{description}</span>
            </div>
          ))}
        </div>

        <footer className="mt-4 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </footer>
      </section>
    </div>
  );
}
