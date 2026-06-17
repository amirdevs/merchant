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
      <div className="pointer-events-none absolute inset-1 rounded-sm border border-[#f0c56e]/45" />
      <img className="pointer-events-none absolute left-2 top-2 z-20 h-14 w-14 object-contain opacity-90" src={uiAssets.core.cornerOrnamentLeft} alt="" />
      <img className="pointer-events-none absolute right-2 top-2 z-20 h-14 w-14 scale-x-[-1] object-contain opacity-90" src={uiAssets.core.cornerOrnamentRight} alt="" />
      <img className="pointer-events-none absolute bottom-2 left-2 z-20 h-14 w-14 scale-y-[-1] object-contain opacity-80" src={uiAssets.core.cornerOrnamentLeft} alt="" />
      <img className="pointer-events-none absolute bottom-2 right-2 z-20 h-14 w-14 scale-[-1] object-contain opacity-80" src={uiAssets.core.cornerOrnamentRight} alt="" />
      <div className={cn("relative z-10 flex min-h-full flex-col p-3 lg:p-4", contentClassName)}>
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
