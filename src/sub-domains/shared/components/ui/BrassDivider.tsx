import type { HTMLAttributes } from "react";
import { cn } from "../../../../lib/cn";

export function BrassDivider({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("ui-brass-divider", className)} aria-hidden="true" {...props} />;
}
