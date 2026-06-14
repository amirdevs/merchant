import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/sub-domains/shared/utils/cn.utils";

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn("game-button", className)} {...props} />;
}
