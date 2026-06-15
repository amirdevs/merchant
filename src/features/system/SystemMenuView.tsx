import { Download, Home, RotateCcw, Save, Settings, X } from "lucide-react";
import { Button, Panel } from "@/components/ui";

export function SystemMenuView({ onResume, onLoadGame, onSettings, onMainMenu, onSave, onExport, onNewGame }: { onResume: () => void; onLoadGame: () => void; onSettings: () => void; onMainMenu: () => void; onSave: () => void; onExport: () => void; onNewGame: () => void }) {
  return (
    <section className="grid w-full place-items-center rounded-3xl border-2 border-brass/60 bg-black/55 p-5 shadow-2xl shadow-black/50 backdrop-blur-sm">
      <Panel className="w-full max-w-2xl" title={<span className="flex items-center justify-between gap-3"><span>Paused / Menu</span><button type="button" onClick={onResume} aria-label="Close system menu"><X size={18} /></button></span>}>
        <div className="grid gap-3">
          <div className="rounded-xl border border-brass-soft/60 bg-black/25 p-3 text-sm text-parchment-muted">Current city, day, save status, and unsaved-change warnings belong in this compact command layer.</div>
          <Button onClick={onResume}>Resume</Button>
          <Button variant="secondary" onClick={onSave}><Save size={16} /> Save Game</Button>
          <Button variant="secondary" onClick={onLoadGame}>Load Game</Button>
          <Button variant="secondary" onClick={onSettings}><Settings size={16} /> Settings</Button>
          <Button variant="secondary" onClick={onExport}><Download size={16} /> Export Save</Button>
          <Button variant="secondary" onClick={onMainMenu}><Home size={16} /> Main Menu</Button>
          <Button variant="danger" onClick={onNewGame}><RotateCcw size={16} /> Quit / New Game</Button>
        </div>
      </Panel>
    </section>
  );
}
