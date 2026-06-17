import type { UiPreferences } from "@/app/types";
import { uiAssets } from "@/lib/ui-assets";
import { Button, Panel, ScreenFrame, TabButton } from "@/components/ui";

type SettingsViewProps = {
  soundOn: boolean;
  uiPreferences: UiPreferences;
  onToggleSound: () => void;
  onChangePreferences: (next: UiPreferences) => void;
  onBack: () => void;
};

export function SettingsView({ soundOn, uiPreferences, onToggleSound, onChangePreferences, onBack }: SettingsViewProps) {
  return (
    <ScreenFrame title="Settings" eyebrow="Options Ledger" backdrop={uiAssets.backplates.settingsRoom} overlay="light">
      <div className="grid flex-1 gap-5 lg:grid-cols-[220px_1fr]">
        <aside className="grid content-start gap-2">
          <TabButton active>Audio</TabButton>
          <TabButton>Display</TabButton>
          <TabButton>Gameplay</TabButton>
          <TabButton>Accessibility</TabButton>
          <TabButton>Controls</TabButton>
          <TabButton>Language</TabButton>
        </aside>

        <div className="grid gap-5 xl:grid-cols-3">
          <Panel title="Audio" variant="parchment">
            <Toggle label="Sound master" active={soundOn} onClick={onToggleSound} />
            <Range label="Music volume" value={80} min={0} max={100} onChange={() => undefined} />
            <Range label="Ambience volume" value={70} min={0} max={100} onChange={() => undefined} />
            <Range label="Voices volume" value={60} min={0} max={100} onChange={() => undefined} />
            <Range label="UI sounds volume" value={75} min={0} max={100} onChange={() => undefined} />
            <Range label="Item sounds volume" value={65} min={0} max={100} onChange={() => undefined} />
          </Panel>
          <Panel title="Display" variant="parchment">
            <Range label="UI scale" value={uiPreferences.uiScale} min={80} max={125} onChange={(value) => onChangePreferences({ ...uiPreferences, uiScale: value })} />
            <Toggle label="Fullscreen" active={false} onClick={() => undefined} />
            <Toggle label="Windowed mode" active onClick={() => undefined} />
            <Toggle label="High contrast parchment" active onClick={() => undefined} />
            <Toggle label="Compact mode" active={uiPreferences.compactMode} onClick={() => onChangePreferences({ ...uiPreferences, compactMode: !uiPreferences.compactMode })} />
          </Panel>
          <Panel title="Gameplay / Accessibility" variant="parchment">
            <Range label="Text speed" value={uiPreferences.textSpeed} min={0} max={100} onChange={(value) => onChangePreferences({ ...uiPreferences, textSpeed: value })} />
            <Toggle label="Theft enabled" active={false} onClick={() => undefined} />
            <Toggle label="Highlight important items" active onClick={() => undefined} />
            <Toggle label="Decorative motion" active={uiPreferences.decorativeMotion} onClick={() => onChangePreferences({ ...uiPreferences, decorativeMotion: !uiPreferences.decorativeMotion })} />
            <Toggle label="Large focus rings" active onClick={() => undefined} />
            <footer className="mt-5 flex flex-wrap justify-end gap-2"><Button subtle>Reset Defaults</Button><Button subtle onClick={onBack}>Cancel</Button><Button>Apply</Button></footer>
          </Panel>
        </div>
      </div>
    </ScreenFrame>
  );
}

function Toggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="mt-3 flex w-full items-center justify-between rounded-md border border-[#9a7138]/60 bg-[#fff6d7]/45 p-3 text-left text-[#2d1b0b]">
      <span>{label}</span>
      <strong className={active ? "text-[#1f6749]" : "text-[#7c1e14]"}>{active ? "On" : "Off"}</strong>
    </button>
  );
}

function Range({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return (
    <label className="mt-3 grid gap-2 text-sm text-[#2d1b0b]">
      <span className="flex justify-between text-[#5a3715]"><b>{label}</b><em className="not-italic text-[#725331]">{value}%</em></span>
      <input className="accent-[#1f5960]" type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}
