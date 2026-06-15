import type { UiPreferences } from "@/app/types";
import { Button, Panel } from "@/components/ui";

type SettingsViewProps = {
  soundOn: boolean;
  uiPreferences: UiPreferences;
  onToggleSound: () => void;
  onChangePreferences: (next: UiPreferences) => void;
  onBack: () => void;
};

export function SettingsView({ soundOn, uiPreferences, onToggleSound, onChangePreferences, onBack }: SettingsViewProps) {
  return (
    <section className="w-full rounded-3xl border-2 border-brass/60 bg-panel/90 p-5 shadow-2xl shadow-black/50">
      <header className="mb-5 flex items-center justify-between border-b border-brass-soft/60 pb-4"><div><span className="text-[0.7rem] uppercase tracking-[0.3em] text-brass">Settings</span><h1 className="font-display text-4xl">Options Ledger</h1></div><Button subtle onClick={onBack}>Back</Button></header>
      <div className="grid gap-5 lg:grid-cols-3">
        <Panel title="Audio">
          <Toggle label="Sound master" active={soundOn} onClick={onToggleSound} />
          <Range label="Music volume" value={80} min={0} max={100} onChange={() => undefined} />
          <Range label="Ambience volume" value={70} min={0} max={100} onChange={() => undefined} />
          <Range label="Voices volume" value={60} min={0} max={100} onChange={() => undefined} />
          <Range label="UI sounds volume" value={75} min={0} max={100} onChange={() => undefined} />
          <Range label="Item sounds volume" value={65} min={0} max={100} onChange={() => undefined} />
        </Panel>
        <Panel title="Display">
          <Range label="UI scale" value={uiPreferences.uiScale} min={80} max={125} onChange={(value) => onChangePreferences({ ...uiPreferences, uiScale: value })} />
          <Toggle label="Fullscreen" active={false} onClick={() => undefined} />
          <Toggle label="Windowed mode" active onClick={() => undefined} />
          <Toggle label="High contrast parchment" active onClick={() => undefined} />
          <Toggle label="Compact mode" active={uiPreferences.compactMode} onClick={() => onChangePreferences({ ...uiPreferences, compactMode: !uiPreferences.compactMode })} />
        </Panel>
        <Panel title="Gameplay / Accessibility">
          <Range label="Text speed" value={uiPreferences.textSpeed} min={0} max={100} onChange={(value) => onChangePreferences({ ...uiPreferences, textSpeed: value })} />
          <Toggle label="Theft enabled" active={false} onClick={() => undefined} />
          <Toggle label="Highlight important items" active onClick={() => undefined} />
          <Toggle label="Decorative motion" active={uiPreferences.decorativeMotion} onClick={() => onChangePreferences({ ...uiPreferences, decorativeMotion: !uiPreferences.decorativeMotion })} />
          <Toggle label="Large focus rings" active onClick={() => undefined} />
        </Panel>
      </div>
      <footer className="mt-5 flex justify-end gap-2"><Button subtle>Reset Defaults</Button><Button subtle onClick={onBack}>Cancel</Button><Button>Apply</Button></footer>
    </section>
  );
}

function Toggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) { return <button type="button" onClick={onClick} className="mt-3 flex w-full items-center justify-between rounded-xl border border-brass-soft/60 bg-black/25 p-3 text-left"><span>{label}</span><strong className={active ? "text-good" : "text-bad"}>{active ? "On" : "Off"}</strong></button>; }
function Range({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) { return <label className="mt-3 grid gap-2 text-sm"><span className="flex justify-between text-brass"><b>{label}</b><em className="not-italic text-parchment-muted">{value}</em></span><input type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} /></label>; }
