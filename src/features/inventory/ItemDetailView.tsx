import { BookOpen, Gem, Shield, Star, X } from "lucide-react";
import type { InventoryEntry, Marketplace } from "@/data/types";
import { itemIconAsset } from "@/lib/assets";
import { items, type GameState, visibleQuantity } from "@/lib/game";
import { money } from "@/lib/format";
import type { MoveAmount } from "@/lib/inventory";
import { Button, IconButton } from "@/components/ui";

function firstVisibleEntry(state: GameState): InventoryEntry | null { return state.playerInventory.find((entry) => visibleQuantity(entry) > 0) || null; }

export function ItemDetailView({ state, market, onBack, onMovePlayer, onTogglePlayerProtect }: { state: GameState; market: Marketplace; onBack: () => void; onMovePlayer: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void; onTogglePlayerProtect: (entry: InventoryEntry) => void }) {
  const entry = firstVisibleEntry(state);
  if (!entry) return <section className="grid w-full place-items-center rounded-3xl border-2 border-brass/60 bg-black/60 p-5"><div className="rounded-2xl border border-brass bg-panel p-6"><Button onClick={onBack}>Close</Button><h2 className="mt-4 font-display text-3xl">Item Detail</h2><p>No visible item is available.</p></div></section>;
  const item = items[entry.itemIndex];
  const quantity = visibleQuantity(entry);
  const icon = itemIconAsset(item.iconFile);
  return (
    <section className="grid w-full place-items-center rounded-3xl border-2 border-brass/60 bg-black/60 p-5 shadow-2xl shadow-black/50 backdrop-blur-sm" aria-label="Item detail modal preview">
      <div className="relative w-full max-w-4xl rounded-3xl border-2 border-brass bg-panel/95 p-5 shadow-2xl">
        <IconButton className="absolute right-4 top-4" type="button" onClick={onBack} aria-label="Close item detail"><X size={18} /></IconButton>
        <div className="grid gap-5 md:grid-cols-[260px_1fr]">
          <div className="grid min-h-72 place-items-center rounded-3xl border border-brass-soft bg-parchment/90 text-ink">{icon ? <img className="h-full max-h-72 w-full object-contain p-5" src={icon} alt="" /> : <Gem size={72} />}</div>
          <div>
            <span className="text-[0.7rem] uppercase tracking-[0.3em] text-brass">Item Detail</span>
            <h3 className="font-display text-5xl">{item.name}</h3>
            <p className="mt-1 text-parchment-muted">{item.tags.join(" · ") || "uncategorized"}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3"><Stat label="Quantity" value={quantity} /><Stat label="Base value" value={money(item.loafValue)} /><Stat label="Total" value={money(item.loafValue * quantity)} /><Stat label="Weight" value={item.weight} /><Stat label="Size" value={item.size} /><Stat label="Rarity" value={item.rarity || 1} /></div>
            <div className="mt-4 flex flex-wrap gap-2">{item.tags.map((tag) => <span className="inline-flex items-center gap-1 rounded-full border border-brass-soft/60 bg-black/25 px-3 py-1 text-sm" key={tag}><Gem size={12} /> {tag}</span>)}{item.unique ? <span className="inline-flex items-center gap-1 rounded-full border border-brass bg-ember px-3 py-1 text-sm"><Star size={12} /> unique</span> : null}<span className="inline-flex items-center gap-1 rounded-full border border-brass-soft/60 bg-black/25 px-3 py-1 text-sm"><Shield size={12} /> {entry.protected ? "Protected" : "Unprotected"}</span></div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <Stat label="Quest flag" value="No" />
              <Stat label="Unique" value={item.unique ? "Yes" : "No"} />
              <Stat label="Protected" value={entry.protected ? "Yes" : "No"} />
              <Stat label="Concealed" value="No" />
              <Stat label="Highlighted" value="No" />
              <Stat label="Legality" value={`Legal in ${market.name}`} />
            </div>
            <div className="mt-4 rounded-2xl border border-brass-soft/60 bg-black/25 p-3 text-sm text-parchment-muted"><p><strong>Market demand notes:</strong> demand and discount hints will be connected to selected market data.</p><p><strong>Player note:</strong> no note or highlight has been added.</p></div>
            <div className="mt-4 flex flex-wrap gap-2"><Button onClick={() => onMovePlayer(entry, 1)}>Add to Offer</Button><Button onClick={() => onTogglePlayerProtect(entry)}>{entry.protected ? "Unprotect" : "Protect"}</Button><Button subtle disabled>Conceal</Button><Button subtle disabled><BookOpen size={16} /> Read / Use</Button><Button subtle disabled>Highlight</Button><Button onClick={onBack}>Close</Button></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) { return <span className="rounded-xl border border-brass-soft/60 bg-black/25 p-3"><small className="block text-[0.65rem] uppercase tracking-[0.18em] text-brass">{label}</small><strong>{value}</strong></span>; }
