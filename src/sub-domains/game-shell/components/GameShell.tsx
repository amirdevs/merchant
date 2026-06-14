import type { ReactNode } from "react";

export function GameShell({ header, children }: { header: ReactNode; children: ReactNode }) {
  return (
    <div className="game-shell">
      {header}
      {children}
    </div>
  );
}
