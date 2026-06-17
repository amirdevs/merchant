import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Muted({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("text-[color:var(--ui-muted,#cdbf99)]", className)} {...props} />;
}
