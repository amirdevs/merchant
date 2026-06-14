import type { ReactNode } from "react";
import { ScreenFrame } from "../../../components/ui";

export function GameShell({ header, children }: { header: ReactNode; children: ReactNode }) {
  return (
    <ScreenFrame className="game-shell">
      {header}
      {children}
    </ScreenFrame>
  );
}
