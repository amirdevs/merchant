import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { uiAssets } from "@/lib/ui-assets";

type HudResourceProps = HTMLAttributes<HTMLDivElement> & {
  icon?: string;
  label: ReactNode;
  value: ReactNode;
};

export function HudResource({ className, icon, label, value, style, ...props }: HudResourceProps) {
  return (
    <div
      className={cn(
        "grid min-h-12 grid-cols-[32px_1fr] items-center gap-2 rounded-md border border-[#8b6736]/70 px-3 py-2 shadow-md shadow-black/25",
        "bg-cover bg-center text-[#f8ecc9]",
        className
      )}
      style={{
        ...style,
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.1), rgba(0,0,0,.35)), url("${uiAssets.nineSlice.textureWoodDark}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      {...props}
    >
      <span className="grid h-8 w-8 place-items-center">
        {icon ? <img className="max-h-7 max-w-7 object-contain drop-shadow" src={icon} alt="" /> : null}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[0.62rem] uppercase tracking-[0.18em] text-brass">{label}</span>
        <strong className="block truncate font-display text-lg leading-none">{value}</strong>
      </span>
    </div>
  );
}
