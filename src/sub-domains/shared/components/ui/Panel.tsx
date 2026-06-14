import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../../lib/cn";

type PanelProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
  bodyClassName?: string;
};

export function Panel({ children, className, title, bodyClassName, ...props }: PanelProps) {
  return (
    <section className={cn("ui-panel", className)} {...props}>
      {title ? <h2 className="ui-panel-title">{title}</h2> : null}
      <div className={cn("ui-panel-body", bodyClassName)}>{children}</div>
    </section>
  );
}
