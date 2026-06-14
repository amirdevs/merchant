import { BookOpen, Download, Upload } from "lucide-react";
import type { GameState } from "@/lib/game";
import { Button, Panel } from "@/sub-domains/shared/components/ui";

export function LoadGameView({ state, modStatus, onLoadLocal, onExport, onImport, onBack, onOpenSettings }: { state: GameState; modStatus: string; onLoadLocal: () => void; onExport: () => void; onImport: () => void; onBack: () => void; onOpenSettings: () => void }) {
  return (
    <section className="load-v6-layout ui-screen">
      <Panel className="load-v6-main" title="Load Game" bodyClassName="load-v6-slots">
        <button type="button" className="load-v6-slot is-active" onClick={onLoadLocal}><strong>Local Browser Save</strong><span>Continue from the latest saved game on this device.</span><em>Day {state.day}</em></button>
        <button type="button" className="load-v6-slot" onClick={onImport}><strong>Import Save File</strong><span>Load an exported merchant JSON save.</span><em>JSON</em></button>
        <button type="button" className="load-v6-slot disabled"><strong>Cloud Slot</strong><span>Reserved for future platform sync.</span><em>Locked</em></button>
      </Panel>
      <aside className="load-v6-side">
        <Panel title="Save Tools" bodyClassName="system-actions"><Button onClick={onLoadLocal}><BookOpen size={16} /> Load Local</Button><Button onClick={onExport}><Download size={16} /> Export Current</Button><Button onClick={onImport}><Upload size={16} /> Import Save</Button><Button onClick={onOpenSettings}>Settings</Button><Button onClick={onBack}>Back to Menu</Button></Panel>
        <Panel title="Session Ledger"><div className="system-ledger"><p><strong>Current day:</strong> {state.day}</p><p><strong>Mods:</strong> {modStatus}</p><p><strong>Save format:</strong> JSON export/import</p></div></Panel>
      </aside>
    </section>
  );
}
