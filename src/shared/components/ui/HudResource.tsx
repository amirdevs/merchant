import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import { uiAssets } from "@/shared/utils/ui-assets";

type HudResourceProps = HTMLAttributes<HTMLDivElement> & {
  icon?: string;
  label: ReactNode;
  value: ReactNode;
};

export function HudResource({ className, icon, label, value, style, ...props }: HudResourceProps) {
  return (
    <div
      className={cn(
        "grid min-h-12 grid-cols-[30px_1fr] items-center gap-2 rounded-sm border-2 border-[#b98b37]/80 px-2.5 py-1.5 shadow-md shadow-black/30",
        "bg-cover bg-center text-[#fff8d8]",
        className
      )}
      style={{
        ...style,
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.08), rgba(0,0,0,.52)), url("${uiAssets.nineSlice.textureWoodDark}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      {...props}
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-black/20">
        {icon ? <img className="max-h-7 max-w-7 object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,.9)]" src={icon} alt="" /> : null}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[0.68rem] font-black uppercase tracking-[0.12em] text-[#ffd975] [text-shadow:0_1px_2px_rgba(0,0,0,.9)]">{label}</span>
        <strong className="block truncate font-display text-xl font-bold leading-none [text-shadow:0_1px_2px_rgba(0,0,0,.95)]">{value}</strong>
      </span>
    </div>
  );
}
