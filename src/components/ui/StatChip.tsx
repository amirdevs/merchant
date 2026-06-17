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
        "inline-grid min-h-12 grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-sm border-2 px-3 py-2 shadow-md shadow-black/30",
        "ring-1 ring-white/10",
        isParchment ? "border-[#9a7138]/85 text-[#201207]" : "border-[#d0a65a]/75 text-[#fff8d8]",
        className
      )}
      style={{
        ...style,
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.45), rgba(255,238,190,.24)), url("${texture}")`,
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
        <span className={cn("block truncate text-[0.7rem] font-black uppercase tracking-[0.14em]", isParchment ? "text-[#5a3917]" : "text-[#ffe6a0]")}>{label}</span>
        <strong className="block truncate font-display text-lg font-bold leading-tight">{value}</strong>
      </span>
    </div>
  );
}
