import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import { uiAssets } from "@/shared/utils/ui-assets";

type ScreenFrameProps = HTMLAttributes<HTMLElement> & {
  backdrop?: string | null;
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

export function ScreenFrame({ backdrop, title, eyebrow: _eyebrow, children, className, contentClassName, overlay = "medium", style, ...props }: ScreenFrameProps) {
  const frameStyle = {
    ...style,
    backgroundImage: backdrop === null ? overlayStyle[overlay] : `${overlayStyle[overlay]}, url("${backdrop || uiAssets.backplates.marketTown}")`,
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
      aria-label={typeof title === "string" ? title : props["aria-label"]}
    >
      <div className="pointer-events-none absolute inset-1 rounded-sm border border-[#f0c56e]/35" />
      <div className={cn("relative z-10 flex min-h-full flex-col p-3 lg:p-4", contentClassName)}>
        {children}
      </div>
    </section>
  );
}
