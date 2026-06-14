import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../../lib/cn";

export function InventorySlotFrame({
  className,
  children,
  selected = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode; selected?: boolean }) {
  return (
    <div className={cn("ui-slot-frame", selected && "ui-slot-frame-selected", className)} {...props}>
      {children}
    </div>
  );
}
