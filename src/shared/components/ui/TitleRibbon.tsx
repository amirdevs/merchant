import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import { uiAssets } from "@/shared/utils/ui-assets";

type TitleRibbonProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  tone?: "teal" | "red";
};

const sizeClass = {
  sm: "min-h-9 px-5 py-1 text-base",
  md: "min-h-11 px-7 py-1.5 text-lg",
  lg: "min-h-13 px-8 py-2 text-2xl",
};

export function TitleRibbon({ children, className, size = "md", tone = "teal", style, ...props }: TitleRibbonProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center bg-cover bg-center text-center font-display font-bold leading-tight text-[#fff8d8]",
        "drop-shadow-[0_2px_2px_rgba(0,0,0,.9)]",
        sizeClass[size],
        className
      )}
      style={{
        ...style,
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.18), rgba(0,0,0,.38)), url("${tone === "red" ? uiAssets.nineSlice.headerStripRedOrnate : uiAssets.core.titleRibbonTealWide}")`,
        backgroundSize: "100% 100%",
      }}
      {...props}
    >
      {children}
    </div>
  );
}
