import { Grid3X3, Search } from "lucide-react";
import type { InventoryEntry } from "@/data/types";
import type { GameState } from "@/lib/game";
import type { MoveAmount } from "@/lib/inventory";
import { itemIconAsset } from "@/lib/assets";
import { items, visibleQuantity } from "@/lib/game";
import { money } from "@/lib/format";
import { uiAssets } from "@/lib/ui-assets";
import { InventoryPanel } from "@/components/InventoryPanel";
import { Button, ItemSlot, Panel, ScreenFrame, StatChip } from "@/components/ui";

type InventoryManagementViewProps = {
  state: GameState;
  playerOffer: number;
  onMovePlayer: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  onTogglePlayerProtect: (entry: InventoryEntry) => void;
  onOpenFilter: () => void;
  onOpenItemDetail: () => void;
};

export function InventoryManagementView({ state, playerOffer, onMovePlayer, onTogglePlayerProtect, onOpenFilter, onOpenItemDetail }: InventoryManagementViewProps) {
  const carriedEntries = state.playerInventory.filter((entry) => visibleQuantity(entry) > 0);
  const protectedEntries = carriedEntries.filter((entry) => entry.protected);
  const totalValue = carriedEntries.reduce((total, entry) => total + items[entry.itemIndex].loafValue * visibleQuantity(entry), 0);
  const totalWeight = carriedEntries.reduce((total, entry) => total + items[entry.itemIndex].weight * visibleQuantity(entry), 0);
  const selected = carriedEntries[0];
  const selectedItem = selected ? items[selected.itemIndex] : null;

  return (
    <ScreenFrame title="Inventory Management" eyebrow="Cargo Ledger" backdrop={uiAssets.backplates.warehouseInventory} overlay="medium">
      <div className="grid flex-1 gap-4 xl:grid-cols-[180px_1fr_360px]">
        <aside className="grid content-start gap-3">
          <Panel title="Cargo" variant="wood" dense>
            <dl className="grid gap-2">
              <StatChip label="Total value" value={money(totalValue)} icon={uiAssets.hud.goldCoin} />
              <StatChip label="Offer value" value={money(playerOffer)} />
              <StatChip label="Capacity" value={`${totalWeight} / limit`} icon={uiAssets.hud.weight} />
              <StatChip label="Goods" value={carriedEntries.length} icon={uiAssets.hud.inventory} />
              <StatChip label="Protected" value={protectedEntries.length} />
            </dl>
          </Panel>
          <Panel title="Inventory" variant="wood" dense>
            <div className="grid gap-2">
              <Button onClick={onOpenFilter}><Search size={16} /> Search</Button>
              <Button subtle>Goods</Button>
              <Button subtle>Materials</Button>
              <Button subtle>Luxuries</Button>
              <Button subtle>Quest</Button>
              <Button subtle><Grid3X3 size={16} /> Bulk</Button>
            </div>
          </Panel>
        </aside>
        <InventoryPanel title="Inventory Grid" subtitle="Quantities, value, protection, legality, quest and highlight markers." inventory={state.playerInventory} variant="management" onMove={(entry, amount) => onMovePlayer(entry, amount)} onMoveAll={(entry) => onMovePlayer(entry, "all")} onToggleProtect={onTogglePlayerProtect} allowProtect />
        <aside className="grid content-start gap-4">
          <Panel title="Selected Item Inspector" variant="parchment">
            {selected && selectedItem ? (
              <>
                <div
                  className="grid place-items-center rounded-md border border-[#c89d55]/45 p-4 shadow-inner shadow-[#6c4418]/15"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.08), rgba(0,0,0,.05)), url("${uiAssets.inventory.selectedItemInspectorPanel}")`,
                    backgroundSize: "100% 100%",
                  }}
                >
                  <ItemSlot className="w-40" imageSrc={itemIconAsset(selectedItem.iconFile)} selected />
                </div>
                <h2 className="mt-3 font-display text-2xl text-[#26170a]">{selectedItem.name}</h2>
                <p className="text-sm text-[#725331]">{selectedItem.tags.join(" / ")}</p>
                <dl className="mt-3 grid grid-cols-2 gap-2">
                  <StatChip label="Qty" value={visibleQuantity(selected)} />
                  <StatChip label="Value" value={money(selectedItem.loafValue)} />
                  <StatChip label="Weight" value={selectedItem.weight} />
                  <StatChip label="Size" value={selectedItem.size} />
                </dl>
                <div className="mt-4 flex flex-wrap gap-2"><Button onClick={() => onMovePlayer(selected, 1)}>Add to Offer</Button><Button subtle onClick={() => onTogglePlayerProtect(selected)}>{selected.protected ? "Unprotect" : "Protect"}</Button><Button subtle onClick={onOpenItemDetail}>Detail</Button></div>
              </>
            ) : <p>No item selected.</p>}
          </Panel>
          <InventoryPanel title="Current Offer" mode="offer" variant="compact" inventory={state.playerInventory} onMove={(entry, amount) => onMovePlayer(entry, amount, true)} onMoveAll={(entry) => onMovePlayer(entry, "none", true)} />
        </aside>
      </div>
    </ScreenFrame>
  );
}
