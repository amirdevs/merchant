import { Download, Home, RotateCcw, Save, Settings, X } from "lucide-react";
import { uiAssets } from "@/lib/ui-assets";
import { Button, IconButton, Panel, ScreenFrame } from "@/components/ui";

export function SystemMenuView({ onResume, onLoadGame, onSettings, onMainMenu, onSave, onExport, onNewGame }: { onResume: () => void; onLoadGame: () => void; onSettings: () => void; onMainMenu: () => void; onSave: () => void; onExport: () => void; onNewGame: () => void }) {
  return (
    <ScreenFrame backdrop={uiAssets.backplates.tradeConversation} overlay="dark" contentClassName="place-items-center">
      <Panel className="relative w-full max-w-2xl" title="System Menu" variant="parchment">
        <IconButton className="absolute right-4 top-4" type="button" onClick={onResume} aria-label="Close system menu"><X size={18} /></IconButton>
        <div className="grid gap-3">
          <div className="rounded-md border border-[#9a7138]/60 bg-[#fff6d7]/45 p-3 text-sm text-[#3b260f]">Current city, day, save status, and unsaved-change warnings belong in this compact command layer.</div>
          <Button onClick={onResume}>Resume</Button>
          <Button variant="secondary" onClick={onSave}><Save size={16} /> Save Game</Button>
          <Button variant="secondary" onClick={onLoadGame}>Load Game</Button>
          <Button variant="secondary" onClick={onSettings}><Settings size={16} /> Settings</Button>
          <Button variant="secondary" onClick={onExport}><Download size={16} /> Export Save</Button>
          <Button variant="secondary" onClick={onMainMenu}><Home size={16} /> Main Menu</Button>
          <Button variant="danger" onClick={onNewGame}><RotateCcw size={16} /> Quit / New Game</Button>
        </div>
      </Panel>
    </ScreenFrame>
  );
}
