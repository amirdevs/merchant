import { BookOpen, CircleHelp, Download, LogOut, PackageSearch, RotateCcw, Save, Upload, Volume2, VolumeX } from "lucide-react";
import type { GameState } from "@/lib/game";
import type { MerchantProfile } from "@/sub-domains/game/types/merchant-profile.type";
import { Button, Panel } from "@/sub-domains/shared/components/ui";

export function SystemMenuView({
  state,
  merchantProfile,
  modStatus,
  soundOn,
  onResume,
  onToggleSound,
  onHelp,
  onNewGame,
  onSave,
  onLoad,
  onExport,
  onImport,
  onOpenSettings,
  onMainMenu,
  onOpenUiAudit,
}: {
  state: GameState;
  merchantProfile: MerchantProfile;
  modStatus: string;
  soundOn: boolean;
  onResume: () => void;
  onToggleSound: () => void;
  onHelp: () => void;
  onNewGame: () => void;
  onSave: () => void;
  onLoad: () => void;
  onExport: () => void;
  onImport: () => void;
  onOpenSettings: () => void;
  onMainMenu: () => void;
  onOpenUiAudit: () => void;
}) {
  return (
    <section className="ui-screen system-menu-layout core-system-overlay">
      <Panel title="Paused / System Menu" bodyClassName="system-actions">
        <Button onClick={onResume}>Resume</Button>
        <Button onClick={onSave}><Save size={16} /> Save Game</Button>
        <Button onClick={onLoad}><BookOpen size={16} /> Load Game</Button>
        <Button onClick={onOpenSettings}>Settings</Button>
        <Button onClick={onMainMenu}><LogOut size={16} /> Main Menu</Button>
        <Button onClick={onNewGame}><RotateCcw size={16} /> New Game Profile</Button>
        <Button onClick={onExport}><Download size={16} /> Export Save</Button>
        <Button onClick={onImport}><Upload size={16} /> Import Save</Button>
        <Button onClick={onToggleSound}>{soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />} {soundOn ? "Disable Audio" : "Enable Audio"}</Button>
        <Button onClick={onHelp}><CircleHelp size={16} /> Help</Button>
        <Button subtle onClick={onOpenUiAudit}><PackageSearch size={16} /> UI QA Board</Button>
      </Panel>
      <Panel title="Current Session">
        <div className="system-ledger">
          <p><strong>Merchant:</strong> {merchantProfile.name}</p>
          <p><strong>Background:</strong> {merchantProfile.background}</p>
          <p><strong>Day:</strong> {state.day}</p>
          <p><strong>Mods:</strong> {modStatus}</p>
          <p><strong>Audio:</strong> {soundOn ? "enabled" : "disabled"}</p>
          <p className="text-sm text-parchment-muted">Quit is represented as Main Menu for now because this is the browser/Electron UI layer.</p>
        </div>
      </Panel>
    </section>
  );
}
