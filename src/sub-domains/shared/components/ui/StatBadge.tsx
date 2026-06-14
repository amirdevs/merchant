import type { ReactNode } from "react";
import { cn } from "../../../../lib/cn";

export function StatBadge({ label, value, className }: { label: ReactNode; value: ReactNode; className?: string }) {
  return (
    <span className={cn("ui-stat-badge", className)}>
      <small>{label}</small>
      <strong>{value}</strong>
    </span>
  );
}
