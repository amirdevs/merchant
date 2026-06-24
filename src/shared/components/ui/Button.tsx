import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "success";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  subtle?: boolean;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: "border-[#d6ad57]/85 bg-[#1f5960] text-[#fff8d8] shadow-lg shadow-black/25 hover:bg-[#276b73]",
  secondary: "border-[#9a7138]/85 bg-[#f0d49a] text-[#201207] shadow-md shadow-black/20 hover:bg-[#f6dfa9]",
  danger: "border-[#f1b06f]/80 bg-[#8d271f] text-[#fff8e2] shadow-lg shadow-black/25 hover:bg-[#a93228]",
  ghost: "border-[#b98b37]/70 bg-[#2a1a0c]/70 text-[#fff1c4] shadow-sm shadow-black/20 hover:border-brass hover:bg-[#3b260f] hover:text-white",
  success: "border-[#d6ad57]/85 bg-[#2f7743] text-[#fff8d8] shadow-lg shadow-black/25 hover:bg-[#38894f]",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 py-1.5 text-sm",
  md: "min-h-11 px-4 py-2 text-base",
  lg: "min-h-13 px-5 py-3 text-lg",
};

export function Button({ className, variant = "primary", size = "md", subtle, style, ...props }: ButtonProps) {
  const resolvedVariant = subtle ? "ghost" : variant;

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
      style={style}
      {...props}
    />
  );
}
