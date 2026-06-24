import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

type StatChipProps = HTMLAttributes<HTMLDivElement> & {
  label: ReactNode;
  value: ReactNode;
  icon?: string;
  tone?: "parchment" | "teal" | "danger";
};

export function StatChip({ className, icon, label, value, tone = "parchment", style, ...props }: StatChipProps) {
  const isParchment = tone === "parchment";

  return (
    <div
      className={cn(
        "inline-grid min-h-12 grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-sm border-2 px-3 py-2 shadow-md shadow-black/30",
        "ring-1 ring-white/10",
        tone === "danger"
          ? "border-[#8d271f]/75 bg-[#f4d7b0] text-[#5a1410]"
          : tone === "teal"
            ? "border-[#d0a65a]/75 bg-[#1f5960] text-[#fff8d8]"
            : "border-[#9a7138]/85 bg-[#f0d49a] text-[#201207]",
        className
      )}
      style={style}
      {...props}
    >
      {icon ? (
        <span className={cn("grid h-8 w-8 place-items-center rounded-full border", isParchment ? "border-[#9a7138]/55 bg-[#fff6d7]/55" : "border-[#d0a65a]/55 bg-black/20")}>
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
