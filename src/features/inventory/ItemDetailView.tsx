import { useEffect, useState } from "react";
import { BookOpen, Gem, Highlighter, Save, Shield, Star, X } from "lucide-react";
import type { InventoryEntry, Marketplace } from "@/data/types";
import { itemIconAsset } from "@/lib/assets";
import { kingdoms, items, type GameState, visibleQuantity } from "@/lib/game";
import { itemIsIllegal } from "@/lib/legal";
import { itemMatchesCatalogToken } from "@/lib/item-catalog";
import { buildItemLore } from "@/lib/item-lore";
import { money } from "@/lib/format";
import type { MoveAmount } from "@/lib/inventory";
import { uiAssets } from "@/lib/ui-assets";
import { Button, IconButton, ItemSlot, Panel, ScreenFrame, StatChip } from "@/components/ui";

function selectedVisibleEntry(state: GameState): InventoryEntry | null {
  return state.playerInventory.find((entry) => entry.itemIndex === state.selectedItemIndex && visibleQuantity(entry) > 0)
    || state.playerInventory.find((entry) => visibleQuantity(entry) > 0)
    || null;
}

function LoreSection({ title, children }: { title: string; children: string }) {
  return (
    <section className="rounded-md border border-[#9a7138]/45 bg-[#fff6d7]/55 p-3">
      <strong className="font-display text-xl text-[#26170a]">{title}</strong>
      <p className="mt-1 leading-relaxed">{children}</p>
    </section>
  );
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
  const lore = buildItemLore({ item, market, kingdom, quantity, illegal });
  return (
    <ScreenFrame backdrop={uiAssets.backplates.warehouseInventory} overlay="dark" contentClassName="place-items-center">
      <Panel className="relative w-full max-w-5xl" title="Item Detail" variant="parchment">
        <IconButton className="absolute right-4 top-4" type="button" onClick={onBack} aria-label="Close item detail"><X size={18} /></IconButton>
        <div className="grid gap-5 md:grid-cols-[260px_1fr]">
          <div className="grid content-start gap-3">
            <div className="grid place-items-center rounded-md border border-[#9a7138]/70 bg-[#fff6d7]/45 p-4">{icon ? <ItemSlot className="w-48" imageSrc={icon} selected marker={illegal ? "illegal" : item.unique ? "rare" : undefined} /> : <Gem size={72} />}</div>
            <div className="rounded-md border border-[#9a7138]/60 bg-[#fff6d7]/45 p-3 text-sm text-[#3b260f]">
              <strong className="font-display text-xl text-[#26170a]">Ledger Summary</strong>
              <p className="mt-1 leading-relaxed">{lore.shortDescription}</p>
            </div>
          </div>
          <div>
            <h3 className="font-display text-5xl text-[#26170a]">{item.name}</h3>
            <p className="mt-1 text-[#725331]">{lore.subtitle}</p>
            <p className="mt-3 rounded-md border border-[#9a7138]/45 bg-[#fff8df]/70 p-3 text-sm italic leading-relaxed text-[#5a3715]">{lore.flavorText}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3"><StatChip label="Quantity" value={quantity} /><StatChip label="Base value" value={money(item.loafValue)} /><StatChip label="Total" value={money(item.loafValue * quantity)} /><StatChip label="Weight" value={item.weight} /><StatChip label="Size" value={item.size} /><StatChip label="Rarity" value={item.rarity || 1} /></div>
            <div className="mt-4 flex flex-wrap gap-2">{item.tags.map((tag) => <span className="inline-flex items-center gap-1 rounded-full border border-[#9a7138]/60 bg-[#fff6d7]/45 px-3 py-1 text-sm text-[#3b260f]" key={tag}><Gem size={12} /> {tag}</span>)}{item.unique ? <span className="inline-flex items-center gap-1 rounded-full border border-[#1f5960] bg-[#1f5960]/20 px-3 py-1 text-sm text-[#1c1309]"><Star size={12} /> unique</span> : null}<span className="inline-flex items-center gap-1 rounded-full border border-[#9a7138]/60 bg-[#fff6d7]/45 px-3 py-1 text-sm text-[#3b260f]"><Shield size={12} /> {entry.protected ? "Protected" : "Unprotected"}</span>{entry.conceal ? <span className="inline-flex items-center gap-1 rounded-full border border-[#1f5960] bg-[#1f5960]/20 px-3 py-1 text-sm text-[#1c1309]">Concealed</span> : null}</div>
            <div className="mt-4 rounded-md border border-[#9a7138]/60 bg-[#fff6d7]/45 p-3 text-sm text-[#3b260f]"><p><strong>Market demand:</strong> {(market.bias || []).filter((bias) => itemMatchesCatalogToken(item, bias.tag)).map((bias) => `${bias.tag} ${bias.percent > 0 ? "+" : ""}${bias.percent}%`).join(", ") || "No specific local modifier."}</p><p><strong>Legality:</strong> {illegal ? `illegal in ${kingdom?.name || market.name}` : `legal in ${kingdom?.name || market.name}`}.</p></div>
            {readerOpen ? (
              <div className="mt-4 grid gap-3 rounded-md border-2 border-[#1f5960]/55 bg-[#fff8df]/85 p-4 text-[#3b260f]">
                <div>
                  <strong className="inline-flex items-center gap-2 font-display text-2xl"><BookOpen size={20} /> Read / Inspect</strong>
                  <p className="mt-1 text-sm text-[#725331]">A richer merchant-facing lore card for appraisal, roleplay, and trade decisions.</p>
                </div>
                <LoreSection title="Trade Lore">{lore.lore}</LoreSection>
                <LoreSection title="Appraisal">{lore.appraisal}</LoreSection>
                <LoreSection title="Handling / Use">{lore.handling}</LoreSection>
                <LoreSection title="Market Note">{lore.marketNote}</LoreSection>
                <LoreSection title="Merchant Advice">{lore.useText}</LoreSection>
              </div>
            ) : null}
            <label className="mt-4 grid gap-1 text-sm font-bold text-[#5a3715]">Merchant note<textarea className="min-h-24 rounded-md border border-[#9a7138]/70 bg-[#fff8df]/80 p-3 font-normal text-[#26170a] outline-none focus:border-[#1f5960]" maxLength={500} value={note} onChange={(event) => setNote(event.target.value)} placeholder="Price target, buyer, route, provenance..." /></label>
            <div className="mt-4 flex flex-wrap gap-2"><Button onClick={() => onMovePlayer(entry, 1)}>Add to Offer</Button><Button onClick={() => onTogglePlayerProtect(entry)}>{entry.protected ? "Unprotect" : "Protect"}</Button><Button subtle onClick={() => onTogglePlayerConceal(entry)}>{entry.conceal ? "Reveal" : "Conceal"}</Button><Button subtle onClick={() => onToggleHighlight(entry)}><Highlighter size={16} /> {entry.highlighted ? "Unmark" : "Highlight"}</Button><Button subtle onClick={() => setReaderOpen((open) => !open)}><BookOpen size={16} /> {readerOpen ? "Close Lore" : "Read / Use"}</Button><Button variant="secondary" onClick={() => onSetNote(entry, note)}><Save size={16} /> Save Note</Button><Button onClick={onBack}>Close</Button></div>
          </div>
        </div>
      </Panel>
    </ScreenFrame>
  );
}
