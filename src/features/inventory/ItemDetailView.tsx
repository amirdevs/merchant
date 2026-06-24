import { useEffect, useState } from "react";
import { BookOpen, Gem, Highlighter, Save, Shield, Star, X } from "lucide-react";
import type { InventoryEntry, Marketplace } from "@/shared/types/game-data";
import { itemIconAsset } from "@/shared/utils/assets";
import { kingdoms, items, type GameState, visibleQuantity } from "@/game/runtime/game";
import { itemIsIllegal } from "@/game/trade/legal";
import { itemCatalogTokens, itemMatchesCatalogToken } from "@/game/trade/item-catalog";
import { money } from "@/shared/utils/format";
import type { MoveAmount } from "@/game/trade/inventory";
import { uiAssets } from "@/shared/utils/ui-assets";
import { Button, IconButton, ItemSlot, Panel, ScreenFrame, StatChip } from "@/shared/components/ui";

function selectedVisibleEntry(state: GameState): InventoryEntry | null {
  return state.playerInventory.find((entry) => entry.itemIndex === state.selectedItemIndex && visibleQuantity(entry) > 0)
    || state.playerInventory.find((entry) => visibleQuantity(entry) > 0)
    || null;
}

function readableText(itemName: string, tokens: Set<string>, marketName: string) {
  const has = (token: string) => tokens.has(token);
  if (has("books") || has("book") || has("letters") || has("letter") || has("document")) {
    return `${itemName}: a merchant's reading copy. Its margins mention bargaining customs, trusted contacts, and price rumors around ${marketName}.`;
  }
  if (has("maps") || has("map")) {
    return `${itemName}: roads, coastlines, toll posts, and discreet cargo paths are marked around ${marketName}.`;
  }
  if (has("paintings") || has("painting") || has("art")) {
    return `${itemName}: inspect the composition, provenance marks, condition, and collector appeal before offering it.`;
  }
  if (has("deeds") || has("deed") || has("permits") || has("permit")) {
    return `${itemName}: this document may support ownership, access, tax, or legal claims. Keep it protected while traveling.`;
  }
  if (has("cards") || has("myth") || has("game")) {
    return `${itemName}: a collectible Myth game piece. Its strategic value depends on the deck and opponent.`;
  }
  if (has("storage") || has("container")) return `${itemName}: increases practical cargo capacity while carried.`;
  return `${itemName}: no readable text is attached, but its tags, origin, rarity, condition, and market demand remain useful for appraisal.`;
}

export function ItemDetailView({ state, market, onBack, onMovePlayer, onTogglePlayerProtect, onTogglePlayerConceal, onToggleHighlight, onSetNote }: { state: GameState; market: Marketplace; onBack: () => void; onMovePlayer: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void; onTogglePlayerProtect: (entry: InventoryEntry) => void; onTogglePlayerConceal: (entry: InventoryEntry) => void; onToggleHighlight: (entry: InventoryEntry) => void; onSetNote: (entry: InventoryEntry, note: string) => void }) {
  const entry = selectedVisibleEntry(state);
  const [note, setNote] = useState(entry?.note || "");
  const [readerOpen, setReaderOpen] = useState(false);
  useEffect(() => {
    setNote(entry?.note || "");
    setReaderOpen(false);
  }, [entry?.itemIndex, entry?.note]);
  if (!entry) return <ScreenFrame backdrop={uiAssets.backplates.warehouseInventory} overlay="dark"><Panel title="Item Detail"><Button onClick={onBack}>Close</Button><p>No visible item is available.</p></Panel></ScreenFrame>;
  const item = items[entry.itemIndex];
  const quantity = visibleQuantity(entry);
  const icon = itemIconAsset(item.iconFile);
  const kingdom = kingdoms[market.kingdomIndex];
  const illegal = itemIsIllegal(item, kingdom?.illegalItemTags || []);
  const tokens = itemCatalogTokens(item);
  return (
    <ScreenFrame backdrop={uiAssets.backplates.warehouseInventory} overlay="dark" contentClassName="place-items-center">
      <Panel className="relative w-full max-w-4xl" title="Item Detail" variant="parchment">
        <IconButton className="absolute right-4 top-4" type="button" onClick={onBack} aria-label="Close item detail"><X size={18} /></IconButton>
        <div className="grid gap-5 md:grid-cols-[260px_1fr]">
          <div className="grid place-items-center rounded-md border border-[#9a7138]/70 bg-[#fff6d7]/45 p-4">{icon ? <ItemSlot className="w-48" imageSrc={icon} selected marker={illegal ? "illegal" : item.unique ? "rare" : undefined} /> : <Gem size={72} />}</div>
          <div>
            <h3 className="font-display text-5xl text-[#26170a]">{item.name}</h3>
            <p className="mt-1 text-[#725331]">{item.tags.join(" / ") || "uncategorized"}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3"><StatChip label="Quantity" value={quantity} /><StatChip label="Base value" value={money(item.loafValue)} /><StatChip label="Total" value={money(item.loafValue * quantity)} /><StatChip label="Weight" value={item.weight} /><StatChip label="Size" value={item.size} /><StatChip label="Rarity" value={item.rarity || 1} /></div>
            <div className="mt-4 flex flex-wrap gap-2">{item.tags.map((tag) => <span className="inline-flex items-center gap-1 rounded-full border border-[#9a7138]/60 bg-[#fff6d7]/45 px-3 py-1 text-sm text-[#3b260f]" key={tag}><Gem size={12} /> {tag}</span>)}{item.unique ? <span className="inline-flex items-center gap-1 rounded-full border border-[#1f5960] bg-[#1f5960]/20 px-3 py-1 text-sm text-[#1c1309]"><Star size={12} /> unique</span> : null}<span className="inline-flex items-center gap-1 rounded-full border border-[#9a7138]/60 bg-[#fff6d7]/45 px-3 py-1 text-sm text-[#3b260f]"><Shield size={12} /> {entry.protected ? "Protected" : "Unprotected"}</span>{entry.conceal ? <span className="inline-flex items-center gap-1 rounded-full border border-[#1f5960] bg-[#1f5960]/20 px-3 py-1 text-sm text-[#1c1309]">Concealed</span> : null}</div>
            <div className="mt-4 rounded-md border border-[#9a7138]/60 bg-[#fff6d7]/45 p-3 text-sm text-[#3b260f]"><p><strong>Market demand:</strong> {(market.bias || []).filter((bias) => itemMatchesCatalogToken(item, bias.tag)).map((bias) => `${bias.tag} ${bias.percent > 0 ? "+" : ""}${bias.percent}%`).join(", ") || "No specific local modifier."}</p><p><strong>Legality:</strong> {illegal ? `illegal in ${kingdom?.name || market.name}` : `legal in ${kingdom?.name || market.name}`}.</p></div>
            {readerOpen ? <div className="mt-4 rounded-md border-2 border-[#1f5960]/55 bg-[#fff8df]/85 p-4 text-[#3b260f]"><strong className="font-display text-2xl">Read / Inspect</strong><p className="mt-2 leading-relaxed">{readableText(item.name, tokens, market.name)}</p></div> : null}
            <label className="mt-4 grid gap-1 text-sm font-bold text-[#5a3715]">Merchant note<textarea className="min-h-24 rounded-md border border-[#9a7138]/70 bg-[#fff8df]/80 p-3 font-normal text-[#26170a] outline-none focus:border-[#1f5960]" maxLength={500} value={note} onChange={(event) => setNote(event.target.value)} placeholder="Price target, buyer, route, provenance..." /></label>
            <div className="mt-4 flex flex-wrap gap-2"><Button onClick={() => onMovePlayer(entry, 1)}>Add to Offer</Button><Button onClick={() => onTogglePlayerProtect(entry)}>{entry.protected ? "Unprotect" : "Protect"}</Button><Button subtle onClick={() => onTogglePlayerConceal(entry)}>{entry.conceal ? "Reveal" : "Conceal"}</Button><Button subtle onClick={() => onToggleHighlight(entry)}><Highlighter size={16} /> {entry.highlighted ? "Unmark" : "Highlight"}</Button><Button subtle onClick={() => setReaderOpen((open) => !open)}><BookOpen size={16} /> Read / Use</Button><Button variant="secondary" onClick={() => onSetNote(entry, note)}><Save size={16} /> Save Note</Button><Button onClick={onBack}>Close</Button></div>
          </div>
        </div>
      </Panel>
    </ScreenFrame>
  );
}
