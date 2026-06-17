import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { uiAssets } from "@/lib/ui-assets";
import { Panel } from "./Panel";

type ModalShellProps = HTMLAttributes<HTMLDivElement> & {
  title?: ReactNode;
  children: ReactNode;
};

export function ModalShell({ className, children, title, ...props }: ModalShellProps) {
  return (
    <div
      className={cn("fixed inset-0 z-50 grid place-items-center bg-black/55 p-4 backdrop-blur-[1px]", className)}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.62), rgba(0,0,0,.62)), url("${uiAssets.micro.overlayModalDim}")`,
        backgroundSize: "auto, 240px 120px",
      }}
      {...props}
    >
      <Panel className="w-full max-w-3xl" title={title} variant="parchment">
        {children}
      </Panel>
    </div>
  );
}
