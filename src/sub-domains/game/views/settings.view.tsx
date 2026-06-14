import type { UiPreferences } from "@/sub-domains/game/types/ui-preferences.type";
import { Button, Panel } from "@/sub-domains/shared/components/ui";

export function SettingsView({ soundOn, modStatus, uiPreferences, onUpdatePreferences, onToggleSound, onBack, onOpenSystem }: { soundOn: boolean; modStatus: string; uiPreferences: UiPreferences; onUpdatePreferences: (patch: Partial<UiPreferences>) => void; onToggleSound: () => void; onBack: () => void; onOpenSystem: () => void }) {
  return (
    <section className="settings-v6-layout ui-screen">
      <Panel title="Settings" bodyClassName="settings-v6-form">
        <div className="settings-v6-row"><span><strong>Audio</strong><small>Toggle UI and ambient sound.</small></span><button type="button" className={soundOn ? "is-active" : ""} onClick={onToggleSound}>{soundOn ? "Enabled" : "Disabled"}</button></div>
        <label className="settings-v6-slider"><span><strong>UI Scale</strong><small>{uiPreferences.uiScale}% responsive target</small></span><input type="range" min="80" max="120" value={uiPreferences.uiScale} onChange={(event) => onUpdatePreferences({ uiScale: Number(event.target.value) })} /></label>
        <label className="settings-v6-slider"><span><strong>Dialogue Speed</strong><small>{uiPreferences.textSpeed}% typewriter speed</small></span><input type="range" min="20" max="100" value={uiPreferences.textSpeed} onChange={(event) => onUpdatePreferences({ textSpeed: Number(event.target.value) })} /></label>
        <div className="settings-v6-row"><span><strong>Decorative Motion</strong><small>Use subtle menu and panel movement.</small></span><button type="button" className={uiPreferences.decorativeMotion ? "is-active" : ""} onClick={() => onUpdatePreferences({ decorativeMotion: !uiPreferences.decorativeMotion })}>{uiPreferences.decorativeMotion ? "On" : "Off"}</button></div>
        <div className="settings-v6-row"><span><strong>Compact Responsive UI</strong><small>Tighter panels for laptop and small Electron windows.</small></span><button type="button" className={uiPreferences.compactMode ? "is-active" : ""} onClick={() => onUpdatePreferences({ compactMode: !uiPreferences.compactMode })}>{uiPreferences.compactMode ? "On" : "Off"}</button></div>
      </Panel>
      <Panel title="Interface Notes" bodyClassName="message-ledger settings-v6-notes"><p>The controls match the settings mockup visually and persist across sessions. UI scale and compact mode apply immediately to the whole shell.</p><p className="mt-2 text-sm text-parchment-muted">{modStatus}</p></Panel>
      <Panel title="Navigation" bodyClassName="system-actions"><Button onClick={onBack}>Back to Main Menu</Button><Button onClick={onOpenSystem}>Advanced System Menu</Button></Panel>
    </section>
  );
}
