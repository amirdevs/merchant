import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/sub-domains/shared/utils/cn.utils";

export function IconButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn("game-icon-button", className)} {...props} />;
}
