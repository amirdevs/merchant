import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { uiAssets } from "@/lib/ui-assets";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "success";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  subtle?: boolean;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: "border-[#12373a]/80 text-[#fff4cf] shadow-lg shadow-black/30 hover:brightness-110",
  secondary: "border-[#8e6733]/80 text-[#2c1b0d] shadow-md shadow-black/20 hover:brightness-105",
  danger: "border-[#5e140e]/80 text-[#fff1dc] shadow-lg shadow-black/30 hover:brightness-110",
  ghost: "border-[#896736]/60 text-[color:var(--ui-muted,#d6c498)] shadow-sm shadow-black/20 hover:border-brass hover:text-parchment",
  success: "border-[#134b38]/80 text-[#fff4cf] shadow-lg shadow-black/30 hover:brightness-110",
};

const variantAsset: Record<ButtonVariant, string> = {
  primary: uiAssets.core.buttonPrimaryTeal,
  secondary: uiAssets.core.buttonSecondaryParchment,
  danger: uiAssets.core.buttonDangerRed,
  ghost: uiAssets.core.buttonDisabledDark,
  success: uiAssets.core.buttonPrimaryTeal,
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "min-h-8 px-2.5 py-1 text-xs",
  md: "min-h-10 px-3.5 py-2 text-sm",
  lg: "min-h-12 px-5 py-2.5 text-base",
};

export function Button({ className, variant = "primary", size = "md", subtle, style, ...props }: ButtonProps) {
  const resolvedVariant = subtle ? "ghost" : variant;
  const buttonStyle: CSSProperties = {
    ...style,
    backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.14), rgba(0,0,0,.2)), url("${variantAsset[resolvedVariant]}")`,
    backgroundSize: "100% 100%",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border bg-cover bg-center font-semibold leading-none transition",
        "text-shadow-sm [text-shadow:0_1px_1px_rgba(0,0,0,.55)]",
        "disabled:cursor-not-allowed disabled:opacity-55",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
        sizeClass[size],
        variantClass[resolvedVariant],
        className
      )}
      style={buttonStyle}
      {...props}
    />
  );
}
