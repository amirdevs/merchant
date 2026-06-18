import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type LedgerRowProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: ReactNode;
  subtitle?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  selected?: boolean;
};

export function LedgerRow({ className, title, subtitle, leading, trailing, selected, style, ...props }: LedgerRowProps) {
  return (
    <button
      className={cn(
        "grid min-h-14 w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-sm border-2 px-3 py-2 text-left shadow-sm shadow-black/20 transition",
        "hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
        selected ? "border-[#1f5960] bg-[#d7e4d6]/85 text-[#160d05]" : "border-[#9a7138]/75 bg-[#fff6d7]/55 text-[#201207]",
        className
      )}
      style={style}
      type="button"
      {...props}
    >
      {leading ? <span className="grid min-h-9 min-w-9 place-items-center">{leading}</span> : <span />}
      <span className="min-w-0">
        <strong className="block truncate text-base font-black leading-tight">{title}</strong>
        {subtitle ? <span className="block truncate text-sm font-semibold text-[#5a3917]">{subtitle}</span> : null}
      </span>
      {trailing ? <span className="justify-self-end">{trailing}</span> : null}
    </button>
  );
}
