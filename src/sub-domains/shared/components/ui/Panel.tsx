import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../../lib/cn";

type PanelProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
};

export function Panel({ children, className, title, ...props }: PanelProps) {
  return (
    <section className={cn("ui-panel", className)} {...props}>
      {title ? <h2 className="ui-panel-title">{title}</h2> : null}
      {children}
    </section>
  );
}
