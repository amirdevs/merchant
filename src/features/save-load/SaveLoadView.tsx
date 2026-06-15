import type { RefObject } from "react";
import { BookOpen, Download, Save, Search, Trash2, Upload } from "lucide-react";
import type { MerchantProfile } from "@/app/types";
import type { GameState } from "@/lib/game";
import { Button, Panel } from "@/components/ui";

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
  ];

  return (
    <section className="w-full rounded-3xl border-2 border-brass/60 bg-panel/90 p-5 shadow-2xl shadow-black/50">
      <header className="mb-5 flex items-center justify-between border-b border-brass-soft/60 pb-4">
        <div><span className="text-[0.7rem] uppercase tracking-[0.3em] text-brass">Save / Load</span><h1 className="font-display text-4xl">Save Ledger</h1></div>
        <Button subtle onClick={onBack}>Back</Button>
      </header>
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <Panel title="Save Browser">
          <div className="mb-3 flex flex-wrap gap-2">
            <Button subtle>Load tab</Button><Button subtle>Save tab</Button>
            <Button variant="secondary" onClick={() => importInputRef.current?.click()}><Upload size={16} /> Import</Button>
            <Button variant="secondary" onClick={onExport}><Download size={16} /> Export selected</Button>
            <Button subtle>Sort</Button><Button subtle><Search size={16} /> Search</Button>
          </div>
          <div className="overflow-auto rounded-xl border border-brass-soft/60">
            <div className="grid min-w-[820px] grid-cols-[1.15fr_1fr_1fr_70px_90px_1fr_1fr] gap-2 bg-black/40 px-3 py-2 text-xs uppercase tracking-[0.14em] text-brass">
              <span>Save Name</span><span>Merchant</span><span>City</span><span>Day</span><span>Wealth</span><span>Mode</span><span>Saved At</span>
            </div>
            {rows.map((row) => (
              <button key={row.name} className="grid min-w-[820px] grid-cols-[1.15fr_1fr_1fr_70px_90px_1fr_1fr] gap-2 border-t border-brass-soft/40 bg-black/20 px-3 py-3 text-left text-sm transition hover:bg-ember/40" type="button">
                <strong>{row.name}</strong><span>{row.merchant}</span><span>{row.city}</span><span>{row.day}</span><span>{row.wealth}</span><span>{row.mode}</span><span>{row.savedAt}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-brass-soft/60 bg-black/25 p-3 text-sm text-parchment-muted">Empty state, selected row, search, and sort controls are visible as ledger structure even before multi-slot saves are wired.</div>
        </Panel>
        <Panel title="Selected Save Detail">
          <div className="grid gap-3">
            <div className="rounded-xl border border-brass-soft/60 bg-black/25 p-3 text-sm text-parchment-muted">Location thumbnail, inventory summary, quest summary, and overwrite/delete warnings appear here for the selected save.</div>
            <Button onClick={onLoad}><BookOpen size={16} /> Load</Button>
            <Button variant="secondary" onClick={onSave}><Save size={16} /> Overwrite</Button>
            <Button variant="danger" disabled><Trash2 size={16} /> Delete</Button>
            <Button variant="secondary" onClick={onExport}><Download size={16} /> Export JSON</Button>
            <input ref={importInputRef} className="hidden" type="file" accept="application/json,.json" onChange={(event) => { onImport(event.target.files?.[0]); event.target.value = ""; }} />
            <p className="rounded-xl border border-red-900/60 bg-red-950/30 p-3 text-sm text-red-100">Overwrite and delete require confirmation before changing a save.</p>
          </div>
        </Panel>
      </div>
    </section>
  );
}
