import { GameShell } from "@/app/components/GameShell";
import { useMerchantController } from "@/app/hooks/useMerchantController";
import { HelpModal } from "@/components/HelpModal";
import { TradeWorkspace } from "@/features/trade/components/TradeWorkspace";

export function App() {
  const controller = useMerchantController();

  return (
    <GameShell controller={controller}>
      <TradeWorkspace controller={controller} />
      {controller.helpOpen ? <HelpModal onClose={() => controller.actions.setHelpOpen(false)} /> : null}
    </GameShell>
  );
}
