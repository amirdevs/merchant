import { useState, type RefObject } from "react";
import { BookOpen, Download, Save, Search, Trash2, Upload } from "lucide-react";
import type { MerchantProfile } from "@/app/types";
import type { GameState } from "@/lib/game";
import { marketplaces } from "@/lib/game";
import type { SaveSlotSummary } from "@/lib/save";
import { uiAssets } from "@/lib/ui-assets";
import { Button, LedgerRow, ModalShell, Panel, ScreenFrame, TabButton } from "@/components/ui";

type SaveLoadViewProps = {
  state: GameState;
  merchantProfile: MerchantProfile;
  saveSlots: SaveSlotSummary[];
  importInputRef: RefObject<HTMLInputElement | null>;
  onBack: () => void;
  onSave: (slot?: number) => void;
  onLoad: (slot?: number) => void;
  onExport: () => void;
  onImport: (file: File | undefined, slot?: number) => void;
  onDelete: (slot?: number) => void;
  onUnavailable: (message: string) => void;
};

export function SaveLoadView({ state, merchantProfile, saveSlots, importInputRef, onBack, onSave, onLoad, onExport, onImport, onDelete, onUnavailable }: SaveLoadViewProps) {
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [confirmAction, setConfirmAction] = useState<"save" | "delete" | null>(null);
  const selected = saveSlots.find((slot) => slot.slot === selectedSlot) || saveSlots[0];
  const rows = saveSlots.map((slot) => ({
    ...slot,
    merchant: slot.empty ? "-" : merchantProfile.name,
    city: slot.marketIndex === null ? "-" : marketplaces[slot.marketIndex]?.name || "Unknown",
    day: slot.day ?? "-",
    wealth: slot.empty ? "-" : "Saved",
    mode: slot.empty ? "-" : merchantProfile.difficulty,
    savedAt: slot.savedAt ? new Date(slot.savedAt).toLocaleString() : "Empty",
  }));

  return (
    <ScreenFrame title="Load Game" eyebrow="Archive Ledger" backdrop={uiAssets.backplates.saveLoadArchiveRoom ?? uiAssets.backplates.settingsRoom} overlay="light">
      <div className="grid flex-1 gap-5 lg:grid-cols-[1fr_360px]">
        <Panel title="Save Browser" variant="parchment">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <TabButton active>Local Saves</TabButton>
            <TabButton>Cloud Saves</TabButton>
            <TabButton>Autosaves</TabButton>
            <Button variant="secondary" onClick={() => importInputRef.current?.click()}><Upload size={16} /> Import</Button>
            <Button variant="secondary" onClick={onExport}><Download size={16} /> Export</Button>
            <Button subtle onClick={() => onUnavailable("Save search will matter once there are many more archive slots.")}><Search size={16} /> Search</Button>
          </div>
          <div className="overflow-hidden rounded-md border border-[#9a7138]/65 bg-[#fff6d7]/35">
            <div className="grid min-w-[820px] grid-cols-[1.15fr_1fr_1fr_70px_90px_1fr_1fr] gap-2 border-b border-[#9a7138]/50 bg-[#5b3a18]/20 px-3 py-2 text-xs uppercase tracking-[0.13em] text-[#75501f]">
              <span>Save Name</span><span>Merchant</span><span>City</span><span>Day</span><span>Wealth</span><span>Mode</span><span>Saved At</span>
            </div>
            {rows.map((row, index) => (
              <LedgerRow
                key={row.name}
                className="min-w-[820px] rounded-none border-0 border-b border-[#9a7138]/35"
                selected={selectedSlot === row.slot}
                title={<span className="grid grid-cols-[1.15fr_1fr_1fr_70px_90px_1fr_1fr] gap-2"><strong>{row.name}</strong><span>{row.merchant}</span><span>{row.city}</span><span>{row.day}</span><span>{row.wealth}</span><span>{row.mode}</span><span>{row.savedAt}</span></span>}
                onClick={() => setSelectedSlot(row.slot)}
              />
            ))}
          </div>
        </Panel>

        <Panel title="Selected Save Detail" variant="parchment">
          <div className="grid gap-3">
            <div className="min-h-40 rounded-md border border-[#9a7138]/60 bg-cover bg-center p-3 text-sm text-[#3c260f]" style={{ backgroundImage: `linear-gradient(0deg, rgba(255,246,217,.84), rgba(255,246,217,.28)), url("${uiAssets.backplates.saveLoadArchiveRoom ?? uiAssets.backplates.settingsRoom}")` }}>
              <strong className="block font-display text-2xl">{merchantProfile.name}</strong>
              <span>{selected?.empty ? "Empty archive slot" : `Saved day ${selected?.day ?? "-"}`} / Current day {state.day} / {merchantProfile.difficulty}</span>
            </div>
            <Button disabled={selected?.empty} onClick={() => onLoad(selectedSlot)}><BookOpen size={16} /> Load Slot {selectedSlot + 1}</Button>
            <Button variant="secondary" onClick={() => selected?.empty ? onSave(selectedSlot) : setConfirmAction("save")}><Save size={16} /> Save Slot {selectedSlot + 1}</Button>
            <Button variant="danger" disabled={selected?.empty} onClick={() => setConfirmAction("delete")}><Trash2 size={16} /> Delete Slot {selectedSlot + 1}</Button>
            <Button variant="secondary" onClick={onExport}><Download size={16} /> Export JSON</Button>
            <Button subtle onClick={onBack}>Back</Button>
            <input ref={importInputRef} className="hidden" type="file" accept="application/json,.json" onChange={(event) => { onImport(event.target.files?.[0], selectedSlot); event.target.value = ""; }} />
          </div>
        </Panel>
      </div>
      {confirmAction ? (
        <ModalShell title={confirmAction === "save" ? "Overwrite Save Slot" : "Delete Save Slot"}>
          <div className="grid gap-4 text-[#3b260f]">
            <p className="text-base">
              {confirmAction === "save"
                ? `Overwrite slot ${selectedSlot + 1}? The previous saved ledger will be replaced.`
                : `Delete slot ${selectedSlot + 1}? This local save cannot be recovered.`}
            </p>
            <div className="rounded-sm border border-[#9a7138]/55 bg-[#fff6d7]/60 p-3 text-sm">
              <strong className="block">{selected?.name}</strong>
              <span>{selected?.empty ? "Empty" : `Saved day ${selected?.day ?? "-"} at ${selected?.savedAt ? new Date(selected.savedAt).toLocaleString() : "unknown time"}`}</span>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setConfirmAction(null)}>Cancel</Button>
              <Button
                variant={confirmAction === "delete" ? "danger" : "primary"}
                onClick={() => {
                  if (confirmAction === "save") onSave(selectedSlot);
                  else onDelete(selectedSlot);
                  setConfirmAction(null);
                }}
              >
                {confirmAction === "save" ? "Overwrite" : "Delete"}
              </Button>
            </div>
          </div>
        </ModalShell>
      ) : null}
    </ScreenFrame>
  );
}
