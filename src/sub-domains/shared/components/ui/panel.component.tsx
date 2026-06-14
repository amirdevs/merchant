import type { ReactNode } from "react";
import { cn } from "@/sub-domains/shared/utils/cn.utils";

export function Panel({
  children,
  className,
  title,
  bodyClassName,
}: {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("game-panel", className)}>
      {title ? (
        <div className="game-panel-header">
          <h2 className="game-panel-title">{title}</h2>
        </div>
      ) : null}
      <div className={cn("game-panel-body", bodyClassName)}>{children}</div>
    </section>
  );
}
