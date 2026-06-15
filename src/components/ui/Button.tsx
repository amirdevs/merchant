import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "success";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  subtle?: boolean;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: "border-brass bg-gradient-to-b from-ember to-[#553016] text-parchment shadow-lg shadow-black/30 hover:brightness-110",
  secondary: "border-brass/70 bg-panel-soft/90 text-parchment hover:bg-ember/75",
  danger: "border-red-900/70 bg-red-950/75 text-red-100 hover:bg-red-900/75",
  ghost: "border-brass/30 bg-black/20 text-parchment-muted hover:border-brass/70 hover:text-parchment",
  success: "border-emerald-700/70 bg-emerald-950/70 text-emerald-100 hover:bg-emerald-900/70",
};

export function Button({ className, variant = "primary", subtle, ...props }: ButtonProps) {
  const resolvedVariant = subtle ? "ghost" : variant;
  return (
    <button
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition",
        "disabled:cursor-not-allowed disabled:opacity-55",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
        variantClass[resolvedVariant],
        className
      )}
      {...props}
    />
  );
}
