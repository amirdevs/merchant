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
  primary: "border-[#d6ad57]/85 text-[#fff8d8] shadow-lg shadow-black/35 hover:brightness-110",
  secondary: "border-[#9a7138]/85 text-[#201207] shadow-md shadow-black/25 hover:brightness-105",
  danger: "border-[#f1b06f]/80 text-[#fff8e2] shadow-lg shadow-black/35 hover:brightness-110",
  ghost: "border-[#b98b37]/70 text-[#fff1c4] shadow-sm shadow-black/25 hover:border-brass hover:text-white",
  success: "border-[#d6ad57]/85 text-[#fff8d8] shadow-lg shadow-black/35 hover:brightness-110",
};

const variantAsset: Record<ButtonVariant, string> = {
  primary: uiAssets.core.buttonPrimaryTeal,
  secondary: uiAssets.core.buttonSecondaryParchment,
  danger: uiAssets.core.buttonDangerRed,
  ghost: uiAssets.core.buttonDisabledDark,
  success: uiAssets.core.buttonPrimaryTeal,
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 py-1.5 text-sm",
  md: "min-h-11 px-4 py-2 text-base",
  lg: "min-h-13 px-5 py-3 text-lg",
};

export function Button({ className, variant = "primary", size = "md", subtle, style, ...props }: ButtonProps) {
  const resolvedVariant = subtle ? "ghost" : variant;
  const buttonStyle: CSSProperties = {
    ...style,
    backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.22), rgba(0,0,0,.34)), url("${variantAsset[resolvedVariant]}")`,
    backgroundSize: "100% 100%",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm border-2 bg-cover bg-center font-bold leading-none transition",
        "text-shadow-sm [text-shadow:0_1px_2px_rgba(0,0,0,.8)]",
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
