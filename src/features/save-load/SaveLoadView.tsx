import type { RefObject } from "react";
import { BookOpen, Download, Save, Search, Trash2, Upload } from "lucide-react";
import type { MerchantProfile } from "@/app/types";
import type { GameState } from "@/lib/game";
import { uiAssets } from "@/lib/ui-assets";
import { Button, LedgerRow, Panel, ScreenFrame, TabButton } from "@/components/ui";

type SaveLoadViewProps = {
  state: GameState;
  merchantProfile: MerchantProfile;
  importInputRef: RefObject<HTMLInputElement | null>;
  onBack: () => void;
  onSave: () => void;
  onLoad: () => void;
  onExport: () => void;
  onImport: (file: File | undefined) => void;
};

export function SaveLoadView({ state, merchantProfile, importInputRef, onBack, onSave, onLoad, onExport, onImport }: SaveLoadViewProps) {
  const rows = [
    { name: "Local Ledger", merchant: merchantProfile.name, city: "Current Market", day: state.day, wealth: "Current", mode: merchantProfile.difficulty, savedAt: "Browser local" },
    { name: "Archive Slot I", merchant: "-", city: "-", day: "-", wealth: "-", mode: "-", savedAt: "Empty" },
    { name: "Archive Slot II", merchant: "-", city: "-", day: "-", wealth: "-", mode: "-", savedAt: "Empty" },
    { name: "Archive Slot III", merchant: "-", city: "-", day: "-", wealth: "-", mode: "-", savedAt: "Empty" },
  ];

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
            <Button subtle><Search size={16} /> Search</Button>
          </div>
          <div className="overflow-hidden rounded-md border border-[#9a7138]/65 bg-[#fff6d7]/35">
            <div className="grid min-w-[820px] grid-cols-[1.15fr_1fr_1fr_70px_90px_1fr_1fr] gap-2 border-b border-[#9a7138]/50 bg-[#5b3a18]/20 px-3 py-2 text-xs uppercase tracking-[0.13em] text-[#75501f]">
              <span>Save Name</span><span>Merchant</span><span>City</span><span>Day</span><span>Wealth</span><span>Mode</span><span>Saved At</span>
            </div>
            {rows.map((row, index) => (
              <LedgerRow
                key={row.name}
                className="min-w-[820px] rounded-none border-0 border-b border-[#9a7138]/35"
                selected={index === 0}
                title={<span className="grid grid-cols-[1.15fr_1fr_1fr_70px_90px_1fr_1fr] gap-2"><strong>{row.name}</strong><span>{row.merchant}</span><span>{row.city}</span><span>{row.day}</span><span>{row.wealth}</span><span>{row.mode}</span><span>{row.savedAt}</span></span>}
              />
            ))}
          </div>
        </Panel>

        <Panel title="Selected Save Detail" variant="parchment">
          <div className="grid gap-3">
            <div className="min-h-40 rounded-md border border-[#9a7138]/60 bg-cover bg-center p-3 text-sm text-[#3c260f]" style={{ backgroundImage: `linear-gradient(0deg, rgba(255,246,217,.84), rgba(255,246,217,.28)), url("${uiAssets.backplates.saveLoadArchiveRoom ?? uiAssets.backplates.settingsRoom}")` }}>
              <strong className="block font-display text-2xl">{merchantProfile.name}</strong>
              <span>Day {state.day} / {merchantProfile.difficulty}</span>
            </div>
            <Button onClick={onLoad}><BookOpen size={16} /> Load</Button>
            <Button variant="secondary" onClick={onSave}><Save size={16} /> Overwrite</Button>
            <Button variant="danger" disabled><Trash2 size={16} /> Delete</Button>
            <Button variant="secondary" onClick={onExport}><Download size={16} /> Export JSON</Button>
            <Button subtle onClick={onBack}>Back</Button>
            <input ref={importInputRef} className="hidden" type="file" accept="application/json,.json" onChange={(event) => { onImport(event.target.files?.[0]); event.target.value = ""; }} />
          </div>
        </Panel>
      </div>
    </ScreenFrame>
  );
}
