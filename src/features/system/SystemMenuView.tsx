import { CircleHelp, Download, Home, RotateCcw, Save, Settings, Volume2, VolumeX, X } from "lucide-react";
import type { MerchantController, MerchantProfile } from "@/app/types";
import { inventoryTotals } from "@/game/economy/economy";
import { money } from "@/shared/utils/format";
import { items } from "@/game/runtime/game";
import { uiAssets } from "@/shared/utils/ui-assets";
import { Button, HudResource, IconButton, ModalShell, Muted } from "@/shared/components/ui";

function currentTime(minutes: number) {
  const normalized = ((Math.floor(minutes) % 1440) + 1440) % 1440;
  const hour = Math.floor(normalized / 60);
  const minute = normalized % 60;
  const phase = hour < 5 ? "Deep Night" : hour < 8 ? "Dawn" : hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : hour < 20 ? "Dusk" : "Night";
  return { label: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`, phase };
}

type SystemMenuViewProps = {
  controller: MerchantController;
  merchantProfile: MerchantProfile;
  onResume: () => void;
  onLoadGame: () => void;
  onSettings: () => void;
  onMainMenu: () => void;
  onSave: () => void;
  onExport: () => void;
  onNewGame: () => void;
};

export function SystemMenuView({ controller, merchantProfile, onResume, onLoadGame, onSettings, onMainMenu, onSave, onExport, onNewGame }: SystemMenuViewProps) {
  const cargo = inventoryTotals(controller.state.playerInventory, items);
  const clock = currentTime(controller.state.timeOfDayMinutes);

  return (
    <ModalShell title="System Menu" panelClassName="relative max-w-4xl">
      <IconButton className="absolute right-4 top-4" type="button" onClick={onResume} aria-label="Close system menu"><X size={18} /></IconButton>
      <div className="grid gap-4 text-[#2b1a0b]">
        <div className="grid gap-3 border-b border-[#9a7138]/55 pb-4 lg:grid-cols-[minmax(220px,0.8fr)_1fr]">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url("${uiAssets.core.circularEmblemHolder}")` }}>
              <img className="h-8 w-8 object-contain" src={uiAssets.hud.market} alt="" />
            </span>
            <div className="min-w-0">
              <strong className="block truncate font-display text-xl">{controller.market.name}</strong>
              <span className="block truncate text-xs font-black uppercase text-[#77511e]">{merchantProfile.name}</span>
              <Muted className="block truncate text-xs">{merchantProfile.background} / stallage {money(controller.market.stallage)}</Muted>
            </div>
          </div>
          <dl className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
            <HudResource icon={uiAssets.hud.day} label="Day" value={controller.state.day} />
            <HudResource icon={uiAssets.hud.day} label={clock.phase} value={clock.label} />
            <HudResource icon={uiAssets.hud.wealth} label="Value" value={money(cargo.value)} />
            <HudResource icon={uiAssets.hud.weight} label="Carry" value={`${cargo.weight}/${cargo.carryCapacity}`} />
            <HudResource icon={uiAssets.hud.inventory} label="Pull" value={`${cargo.size}/${cargo.sizeCapacity}`} />
            <HudResource icon={uiAssets.hud.inventory} label="Goods" value={cargo.visibleEntries} />
          </dl>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button onClick={onResume}>Resume</Button>
          <Button variant="secondary" onClick={onSave}><Save size={16} /> Save Game</Button>
          <Button variant="secondary" onClick={onLoadGame}>Load Game</Button>
          <Button variant="secondary" onClick={onSettings}><Settings size={16} /> Settings</Button>
          <Button variant="secondary" onClick={() => controller.actions.setHelpOpen(true)}><CircleHelp size={16} /> Controls</Button>
          <Button variant="secondary" onClick={controller.actions.toggleAudio}>
            {controller.soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            {controller.soundOn ? "Disable Audio" : "Enable Audio"}
          </Button>
          <Button variant="secondary" onClick={onExport}><Download size={16} /> Export Save</Button>
          <Button variant="secondary" onClick={onMainMenu}><Home size={16} /> Main Menu</Button>
          <Button variant="danger" onClick={onNewGame}><RotateCcw size={16} /> Quit / New Game</Button>
        </div>
      </div>
    </ModalShell>
  );
}
