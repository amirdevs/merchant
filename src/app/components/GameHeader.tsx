import { BookOpen, CircleHelp, Download, RotateCcw, Save, Upload, Volume2, VolumeX } from "lucide-react";
import type { MerchantController } from "@/app/types/MerchantController";
import { Button, IconButton, Muted } from "@/components/ui";

export function GameHeader({ controller }: { controller: MerchantController }) {
  const { market, state, soundOn, importInputRef, actions } = controller;

  return (
    <header className="relative z-10 flex items-center justify-between gap-3 border-2 border-brass-soft bg-panel/90 px-4 py-3 shadow-2xl max-[760px]:items-start">
      <div>
        <h1 className="font-display text-3xl leading-none">{market.name}</h1>
        <Muted className="text-sm">Day {state.day}</Muted>
      </div>
      <div className="flex flex-wrap justify-end gap-2">
        <IconButton aria-label="Open controls" title="Controls" onClick={() => actions.setHelpOpen(true)}>
          <CircleHelp size={18} />
        </IconButton>
        <IconButton aria-label={soundOn ? "Disable audio" : "Enable audio"} title={soundOn ? "Disable audio" : "Enable audio"} onClick={actions.toggleAudio}>
          {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </IconButton>
        <Button onClick={actions.newGame}>
          <RotateCcw size={16} /> New Game
        </Button>
        <Button onClick={actions.saveGame}>
          <Save size={16} /> Save
        </Button>
        <Button onClick={actions.loadGame}>
          <BookOpen size={16} /> Load
        </Button>
        <Button onClick={actions.exportSave}>
          <Download size={16} /> Export
        </Button>
        <Button onClick={() => importInputRef.current?.click()}>
          <Upload size={16} /> Import
        </Button>
        <input
          ref={importInputRef}
          className="hidden"
          type="file"
          accept="application/json,.json"
          onChange={(event) => {
            void actions.importSave(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      </div>
    </header>
  );
}
