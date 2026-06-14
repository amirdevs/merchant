import type { HTMLAttributes } from "react";
import { cn } from "@/sub-domains/shared/utils/cn.utils";

export function Muted({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("game-muted", className)} {...props} />;
}
