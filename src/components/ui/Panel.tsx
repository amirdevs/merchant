import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type PanelProps = HTMLAttributes<HTMLElement> & {
  title?: ReactNode;
};

export function Panel({ children, className, title, ...props }: PanelProps) {
  return (
    <section className={cn("border-2 border-brass-soft bg-panel/90 p-3 shadow-2xl", className)} {...props}>
      {title ? <h2 className="mb-2 font-display text-lg leading-tight">{title}</h2> : null}
      {children}
    </section>
  );
}
