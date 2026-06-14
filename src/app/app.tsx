import { backdropAsset } from "../lib/assets";
import { HelpModal } from "../components/HelpModal";
import { GameShell } from "../sub-domains/game-shell/components/GameShell";
import { HeaderBar } from "../sub-domains/game-shell/components/HeaderBar";
import { TradeWorkspace } from "../sub-domains/game-shell/components/TradeWorkspace";
import { useMerchantGameController } from "./hooks/useMerchantGameController";

export function App() {
  const game = useMerchantGameController();

  return (
    <main className="game-root" style={{ backgroundImage: `url("${backdropAsset(game.market.backdropFile)}")` }}>
      <GameShell
        header={
          <HeaderBar
            market={game.market}
            day={game.state.day}
            soundOn={game.soundOn}
            importInputRef={game.importInputRef}
            onHelp={() => game.setHelpOpen(true)}
            onToggleSound={game.toggleSound}
            onNewGame={game.newGameNow}
            onSave={game.saveNow}
            onLoad={game.loadNow}
            onExport={game.exportSave}
            onImport={game.importSaveFile}
          />
        }
      >
        <TradeWorkspace game={game} />
      </GameShell>

      {game.helpOpen ? <HelpModal onClose={() => game.setHelpOpen(false)} /> : null}
    </main>
  );
}
