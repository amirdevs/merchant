import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export function Panel({
  children,
  className,
  title,
  ...props
}: HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  title?: ReactNode;
}) {
  return (
    <section className={cn("ui-panel", className)} {...props}>
      {title ? <h2 className="ui-panel-title">{title}</h2> : null}
      {children}
    </section>
  );
}
