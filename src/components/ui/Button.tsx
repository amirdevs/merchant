import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: "border-brass bg-ember text-parchment shadow-lg hover:brightness-110",
  secondary: "border-brass/70 bg-panel-soft text-parchment hover:bg-ember/75",
  danger: "border-red-900/70 bg-red-950/70 text-red-100 hover:bg-red-900/70",
  ghost: "border-brass/30 bg-black/15 text-parchment-muted hover:border-brass/70 hover:text-parchment",
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 border px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-55",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
        variantClass[variant],
        className
      )}
      {...props}
    />
  );
}
