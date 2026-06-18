import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Panel } from "./Panel";

type ModalShellProps = HTMLAttributes<HTMLDivElement> & {
  title?: ReactNode;
  panelClassName?: string;
  children: ReactNode;
};

export function ModalShell({ className, children, title, panelClassName, ...props }: ModalShellProps) {
  return (
    <div
      className={cn("fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm", className)}
      {...props}
    >
      <Panel className={cn("w-full max-w-3xl", panelClassName)} title={title} variant="parchment">
        {children}
      </Panel>
    </div>
  );
}
