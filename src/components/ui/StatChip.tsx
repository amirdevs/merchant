import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { uiAssets } from "@/lib/ui-assets";

type StatChipProps = HTMLAttributes<HTMLDivElement> & {
  label: ReactNode;
  value: ReactNode;
  icon?: string;
  tone?: "parchment" | "teal" | "danger";
};

export function StatChip({ className, icon, label, value, tone = "parchment", style, ...props }: StatChipProps) {
  const isParchment = tone === "parchment";
  const texture = tone === "teal" ? uiAssets.core.statusBarFrameTeal : tone === "danger" ? uiAssets.core.buttonDangerRed : uiAssets.inventory.valueComparisonPlaque;

  return (
    <div
      className={cn(
        "inline-grid min-h-11 grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-md border px-3 py-1.5 shadow-md shadow-black/25",
        "ring-1 ring-white/10",
        isParchment ? "border-[#9a7138]/75 text-[#28180a]" : "border-[#d0a65a]/65 text-[#fff2c7]",
        className
      )}
      style={{
        ...style,
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.18), rgba(0,0,0,.14)), url("${texture}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
      {...props}
    >
      {icon ? (
        <span
          className="grid h-8 w-8 place-items-center bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${uiAssets.core.circularEmblemHolder}")` }}
        >
          <img className="h-5 w-5 object-contain drop-shadow" src={icon} alt="" />
        </span>
      ) : null}
      <span className="min-w-0">
        <span className={cn("block truncate text-[0.62rem] uppercase tracking-[0.16em]", isParchment ? "text-[#75501f]" : "text-[#f7d987]")}>{label}</span>
        <strong className="block truncate font-display text-base leading-tight">{value}</strong>
      </span>
    </div>
  );
}
