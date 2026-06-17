import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { uiAssets } from "@/lib/ui-assets";
import { TitleRibbon } from "./TitleRibbon";

type ScreenFrameProps = HTMLAttributes<HTMLElement> & {
  backdrop?: string;
  title?: ReactNode;
  eyebrow?: ReactNode;
  children: ReactNode;
  contentClassName?: string;
  overlay?: "light" | "medium" | "dark";
};

const overlayStyle = {
  light: "linear-gradient(90deg, rgba(31,18,8,.40), rgba(255,246,217,.12) 28%, rgba(255,246,217,.08) 68%, rgba(31,18,8,.44))",
  medium: "linear-gradient(90deg, rgba(20,12,6,.72), rgba(255,244,210,.08) 34%, rgba(20,12,6,.68))",
  dark: "linear-gradient(90deg, rgba(14,8,4,.88), rgba(14,8,4,.44), rgba(14,8,4,.88))",
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
        "relative min-h-[calc(100dvh-2rem)] w-full overflow-hidden rounded-md border-2 border-[#7f5b2a] shadow-2xl shadow-black/55",
        "ring-1 ring-[#dfb45d]/35",
        className
      )}
      style={frameStyle}
      {...props}
    >
      <div className="pointer-events-none absolute inset-2 rounded-md border border-[#d6b16a]/35" />
      <img className="pointer-events-none absolute left-2 top-2 z-20 h-14 w-14 object-contain opacity-90" src={uiAssets.core.cornerOrnamentLeft} alt="" />
      <img className="pointer-events-none absolute right-2 top-2 z-20 h-14 w-14 scale-x-[-1] object-contain opacity-90" src={uiAssets.core.cornerOrnamentRight} alt="" />
      <img className="pointer-events-none absolute bottom-2 left-2 z-20 h-14 w-14 scale-y-[-1] object-contain opacity-80" src={uiAssets.core.cornerOrnamentLeft} alt="" />
      <img className="pointer-events-none absolute bottom-2 right-2 z-20 h-14 w-14 scale-[-1] object-contain opacity-80" src={uiAssets.core.cornerOrnamentRight} alt="" />
      <div className={cn("relative z-10 flex min-h-[calc(100dvh-2rem)] flex-col p-4 lg:p-5", contentClassName)}>
        {title || eyebrow ? (
          <header className="mb-3 flex items-center justify-center">
            <div className="text-center">
              {eyebrow ? <div className="mb-1 text-[0.65rem] uppercase tracking-[0.24em] text-[#f8d98a] drop-shadow">{eyebrow}</div> : null}
              {title ? <TitleRibbon size="md">{title}</TitleRibbon> : null}
            </div>
          </header>
        ) : null}
        {children}
      </div>
    </section>
  );
}
