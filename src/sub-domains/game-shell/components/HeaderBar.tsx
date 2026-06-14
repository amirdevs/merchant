import type { RefObject } from "react";
import { BookOpen, CircleHelp, Download, RotateCcw, Save, Upload, Volume2, VolumeX } from "lucide-react";
import type { currentMarket } from "../../../lib/game";
import { Button, FrameSurface, IconButton, Muted, StatBadge } from "../../../components/ui";

export function HeaderBar({
  market,
  day,
  soundOn,
  importInputRef,
  onHelp,
  onToggleSound,
  onNewGame,
  onSave,
  onLoad,
  onExport,
  onImport,
}: {
  market: ReturnType<typeof currentMarket>;
  day: number;
  soundOn: boolean;
  importInputRef: RefObject<HTMLInputElement | null>;
  onHelp: () => void;
  onToggleSound: () => void;
  onNewGame: () => void;
  onSave: () => void;
  onLoad: () => void;
  onExport: () => void;
  onImport: (file: File | undefined) => void;
}) {
  return (
    <header className="game-header">
      <FrameSurface className="game-header-title" variant="wood">
        <span className="game-header-kicker">Current Market</span>
        <h1>{market.name}</h1>
        <div className="game-header-meta">
          <StatBadge label="Day" value={day} />
          <Muted className="game-header-subtitle">Merchant ledger online</Muted>
        </div>
      </FrameSurface>

      <nav className="game-header-actions" aria-label="Game actions">
        <IconButton aria-label="Open controls" title="Controls" onClick={onHelp}>
          <CircleHelp size={18} />
        </IconButton>
        <IconButton aria-label={soundOn ? "Disable audio" : "Enable audio"} title={soundOn ? "Disable audio" : "Enable audio"} onClick={onToggleSound}>
          {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </IconButton>
        <Button onClick={onNewGame}><RotateCcw size={16} /> New Game</Button>
        <Button onClick={onSave}><Save size={16} /> Save</Button>
        <Button onClick={onLoad}><BookOpen size={16} /> Load</Button>
        <Button onClick={onExport}><Download size={16} /> Export</Button>
        <Button onClick={() => importInputRef.current?.click()}><Upload size={16} /> Import</Button>
        <input
          ref={importInputRef}
          className="hidden"
          type="file"
          accept="application/json,.json"
          onChange={(event) => {
            void onImport(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      </nav>
    </header>
  );
}
