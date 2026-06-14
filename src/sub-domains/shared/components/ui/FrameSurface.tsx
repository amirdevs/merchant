import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../../lib/cn";

export function FrameSurface({
  className,
  children,
  variant = "wood",
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode; variant?: "wood" | "parchment" }) {
  return (
    <div className={cn("ui-frame-surface", variant === "parchment" && "ui-frame-surface-parchment", className)} {...props}>
      {children}
    </div>
  );
}
