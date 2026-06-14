import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../../lib/cn";

export function ScreenFrame({ className, children, ...props }: HTMLAttributes<HTMLElement> & { children: ReactNode }) {
  return (
    <section className={cn("ui-screen-frame", className)} {...props}>
      {children}
    </section>
  );
}
