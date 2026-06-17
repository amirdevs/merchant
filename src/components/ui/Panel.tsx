import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { uiAssets } from "@/lib/ui-assets";

type PanelProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  title?: ReactNode;
  variant?: "parchment" | "wood" | "dark";
  dense?: boolean;
};

const panelSurface: Record<NonNullable<PanelProps["variant"]>, { className: string; texture: string; muted: string; title: string }> = {
  parchment: {
    className: "border-[#b98b37]/90 bg-[#ecd8ac] text-[#24170b]",
    texture: uiAssets.nineSlice.textureParchmentClean,
    muted: "#725331",
    title: "text-[#fff2c7]",
  },
  wood: {
    className: "border-[#b98b37]/85 bg-[#21140a] text-parchment",
    texture: uiAssets.nineSlice.textureWoodDark,
    muted: "#cdbf99",
    title: "text-[#fff2c7]",
  },
  dark: {
    className: "border-[#8b6736]/80 bg-[#170f08] text-parchment",
    texture: uiAssets.nineSlice.textureLeatherBrown,
    muted: "#cdbf99",
    title: "text-[#fff2c7]",
  },
};

export function Panel({ children, className, title, variant = "parchment", dense, style, ...props }: PanelProps) {
  const surface = panelSurface[variant];
  const panelStyle = {
    ...style,
    "--ui-muted": surface.muted,
    backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.12), rgba(0,0,0,.06)), url("${surface.texture}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  } as CSSProperties;

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-sm border-2 shadow-2xl shadow-black/35",
        dense ? "p-3" : "p-4",
        surface.className,
        className
      )}
      style={panelStyle}
      {...props}
    >
      <div className="pointer-events-none absolute inset-1 rounded-sm border border-[#f7d987]/25" />
      {title ? (
        <h2
          className={cn(
            "relative z-10 -mt-1 mb-3 inline-flex min-h-10 max-w-full items-center bg-cover bg-center px-6 py-1.5 font-display text-lg leading-tight",
            "drop-shadow-[0_1px_1px_rgba(0,0,0,.75)]",
            surface.title
          )}
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.14), rgba(0,0,0,.18)), url("${uiAssets.core.pageTitlePlaqueTeal}")`,
            backgroundSize: "100% 100%",
          }}
        >
          {title}
        </h2>
      ) : null}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
