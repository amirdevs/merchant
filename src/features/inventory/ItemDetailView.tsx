import { BookOpen, Gem, Shield, Star, X } from "lucide-react";
import type { InventoryEntry, Marketplace } from "@/data/types";
import { itemIconAsset } from "@/lib/assets";
import { items, type GameState, visibleQuantity } from "@/lib/game";
import { money } from "@/lib/format";
import type { MoveAmount } from "@/lib/inventory";
import { uiAssets } from "@/lib/ui-assets";
import { Button, IconButton, ItemSlot, Panel, ScreenFrame, StatChip } from "@/components/ui";

function firstVisibleEntry(state: GameState): InventoryEntry | null { return state.playerInventory.find((entry) => visibleQuantity(entry) > 0) || null; }

export function ItemDetailView({ state, market, onBack, onMovePlayer, onTogglePlayerProtect }: { state: GameState; market: Marketplace; onBack: () => void; onMovePlayer: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void; onTogglePlayerProtect: (entry: InventoryEntry) => void }) {
  const entry = firstVisibleEntry(state);
  if (!entry) return <ScreenFrame backdrop={uiAssets.backplates.warehouseInventory} overlay="dark"><Panel title="Item Detail"><Button onClick={onBack}>Close</Button><p>No visible item is available.</p></Panel></ScreenFrame>;
  const item = items[entry.itemIndex];
  const quantity = visibleQuantity(entry);
  const icon = itemIconAsset(item.iconFile);
  return (
    <ScreenFrame backdrop={uiAssets.backplates.warehouseInventory} overlay="dark" contentClassName="place-items-center">
      <Panel className="relative w-full max-w-4xl" title="Item Detail" variant="parchment">
        <IconButton className="absolute right-4 top-4" type="button" onClick={onBack} aria-label="Close item detail"><X size={18} /></IconButton>
        <div className="grid gap-5 md:grid-cols-[260px_1fr]">
          <div className="grid place-items-center rounded-md border border-[#9a7138]/70 bg-[#fff6d7]/45 p-4">{icon ? <ItemSlot className="w-48" imageSrc={icon} selected marker={item.unique ? "rare" : undefined} /> : <Gem size={72} />}</div>
          <div>
            <h3 className="font-display text-5xl text-[#26170a]">{item.name}</h3>
            <p className="mt-1 text-[#725331]">{item.tags.join(" / ") || "uncategorized"}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3"><StatChip label="Quantity" value={quantity} /><StatChip label="Base value" value={money(item.loafValue)} /><StatChip label="Total" value={money(item.loafValue * quantity)} /><StatChip label="Weight" value={item.weight} /><StatChip label="Size" value={item.size} /><StatChip label="Rarity" value={item.rarity || 1} /></div>
            <div className="mt-4 flex flex-wrap gap-2">{item.tags.map((tag) => <span className="inline-flex items-center gap-1 rounded-full border border-[#9a7138]/60 bg-[#fff6d7]/45 px-3 py-1 text-sm text-[#3b260f]" key={tag}><Gem size={12} /> {tag}</span>)}{item.unique ? <span className="inline-flex items-center gap-1 rounded-full border border-[#1f5960] bg-[#1f5960]/20 px-3 py-1 text-sm text-[#1c1309]"><Star size={12} /> unique</span> : null}<span className="inline-flex items-center gap-1 rounded-full border border-[#9a7138]/60 bg-[#fff6d7]/45 px-3 py-1 text-sm text-[#3b260f]"><Shield size={12} /> {entry.protected ? "Protected" : "Unprotected"}</span></div>
            <div className="mt-4 rounded-md border border-[#9a7138]/60 bg-[#fff6d7]/45 p-3 text-sm text-[#3b260f]"><p><strong>Market demand notes:</strong> demand and discount hints will be connected to selected market data.</p><p><strong>Legality:</strong> legal in {market.name}.</p></div>
            <div className="mt-4 flex flex-wrap gap-2"><Button onClick={() => onMovePlayer(entry, 1)}>Add to Offer</Button><Button onClick={() => onTogglePlayerProtect(entry)}>{entry.protected ? "Unprotect" : "Protect"}</Button><Button subtle disabled>Conceal</Button><Button subtle disabled><BookOpen size={16} /> Read / Use</Button><Button onClick={onBack}>Close</Button></div>
          </div>
        </div>
      </Panel>
    </ScreenFrame>
  );
}
