import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { uiAssets } from "@/lib/ui-assets";

type ScreenFrameProps = HTMLAttributes<HTMLElement> & {
  backdrop?: string;
  title?: ReactNode;
  eyebrow?: ReactNode;
  children: ReactNode;
  contentClassName?: string;
  overlay?: "light" | "medium" | "dark";
};

const overlayStyle = {
  light: "linear-gradient(90deg, rgba(15,9,4,.28), rgba(255,246,217,.05) 28%, rgba(255,246,217,.03) 68%, rgba(15,9,4,.32))",
  medium: "linear-gradient(90deg, rgba(14,8,4,.55), rgba(255,244,210,.04) 34%, rgba(14,8,4,.58))",
  dark: "linear-gradient(90deg, rgba(10,6,3,.82), rgba(10,6,3,.38), rgba(10,6,3,.82))",
};

export function ScreenFrame({ backdrop, title, eyebrow, children, className, contentClassName, overlay = "medium", style, ...props }: ScreenFrameProps) {
  const frameStyle = {
    ...style,
    backgroundImage: `${overlayStyle[overlay]}, url("${backdrop || uiAssets.backplates.marketTown}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  } as CSSProperties;

  return (
    <section
      className={cn(
        "relative min-h-full w-full overflow-hidden rounded-sm border-2 border-[#b98b37] shadow-2xl shadow-black/55",
        "ring-1 ring-[#dfb45d]/35",
        className
      )}
      style={frameStyle}
      {...props}
    >
      <div className="pointer-events-none absolute inset-1 rounded-sm border border-[#f0c56e]/35" />
      {title || eyebrow ? (
        <div className="pointer-events-none absolute left-4 top-3 z-20 flex max-w-[calc(100%-2rem)] items-baseline gap-2 truncate text-[#fff1b9] drop-shadow-[0_2px_2px_rgba(0,0,0,.8)]">
          {title ? <span className="font-display text-lg leading-none">{title}</span> : null}
          {eyebrow ? <span className="truncate text-[0.58rem] font-black uppercase tracking-[0.22em] text-[#f5cf78]">{eyebrow}</span> : null}
        </div>
      ) : null}
      <div className={cn("relative z-10 flex min-h-full flex-col p-3 lg:p-4", contentClassName)}>
        {children}
      </div>
    </section>
  );
}
