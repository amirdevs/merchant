import type { ReactNode } from "react";
import { backdropAsset } from "@/lib/assets";
import type { MerchantController } from "@/app/types/MerchantController";
import { GameHeader } from "@/app/components/GameHeader";

export function GameShell({ controller, children }: { controller: MerchantController; children: ReactNode }) {
  return (
    <main
      className="relative min-h-screen bg-cover bg-center p-3 text-parchment before:pointer-events-none before:fixed before:inset-0 before:bg-ink/65 before:content-['']"
      style={{ backgroundImage: `url("${backdropAsset(controller.market.backdropFile)}")` }}
    >
      <GameHeader controller={controller} />
      {children}
    </main>
  );
}
