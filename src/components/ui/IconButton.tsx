import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { uiAssets } from "@/lib/ui-assets";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: "default" | "danger";
};

export function IconButton({ className, style, tone = "default", ...props }: IconButtonProps) {
  const iconStyle: CSSProperties = {
    ...style,
    backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.16), rgba(0,0,0,.18)), url("${tone === "danger" ? uiAssets.core.iconButtonDangerSwords : uiAssets.core.iconButtonDarkScales}")`,
    backgroundSize: "100% 100%",
  };

  return (
    <button
      className={cn(
        "grid h-10 w-10 place-items-center rounded-md border border-[#816334]/80 bg-cover bg-center text-parchment shadow-md shadow-black/30 transition hover:brightness-110",
        "disabled:cursor-not-allowed disabled:opacity-55",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
        className
      )}
      style={iconStyle}
      {...props}
    />
  );
}
