import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { uiAssets } from "@/lib/ui-assets";

type TitleRibbonProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  tone?: "teal" | "red";
};

const sizeClass = {
  sm: "min-h-8 px-4 py-1 text-sm",
  md: "min-h-10 px-6 py-1.5 text-base",
  lg: "min-h-12 px-8 py-2 text-xl",
};

export function TitleRibbon({ children, className, size = "md", tone = "teal", style, ...props }: TitleRibbonProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center bg-cover bg-center text-center font-display leading-tight text-[#fff2c7]",
        "drop-shadow-[0_2px_1px_rgba(0,0,0,.75)]",
        sizeClass[size],
        className
      )}
      style={{
        ...style,
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.14), rgba(0,0,0,.2)), url("${tone === "red" ? uiAssets.nineSlice.headerStripRedOrnate : uiAssets.core.titleRibbonTealWide}")`,
        backgroundSize: "100% 100%",
      }}
      {...props}
    >
      {children}
    </div>
  );
}
