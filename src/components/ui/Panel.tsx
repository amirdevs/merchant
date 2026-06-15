import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type PanelProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  title?: ReactNode;
};

export function Panel({ children, className, title, ...props }: PanelProps) {
  return (
    <section className={cn("rounded-2xl border-2 border-brass-soft/80 bg-panel/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-[1px]", className)} {...props}>
      {title ? <h2 className="mb-3 font-display text-lg leading-tight text-brass">{title}</h2> : null}
      {children}
    </section>
  );
}
