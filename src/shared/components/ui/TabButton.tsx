import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";
import { uiAssets } from "@/shared/utils/ui-assets";

type TabButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  tone?: "default" | "warning" | "danger";
};

export function TabButton({ active, className, tone = "default", style, ...props }: TabButtonProps) {
  const asset = !props.disabled && active ? uiAssets.micro.tabActive : props.disabled ? uiAssets.micro.tabDisabled : tone === "warning" ? uiAssets.micro.tabWarning : uiAssets.micro.tabInactive;

  return (
    <button
      className={cn(
        "min-h-9 min-w-24 rounded-md bg-cover bg-center px-4 py-1.5 text-sm font-bold leading-none text-[#fff2c7] shadow-sm shadow-black/30 transition",
        "hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
        className
      )}
      style={{
        ...style,
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.1), rgba(0,0,0,.18)), url("${asset}")`,
        backgroundSize: "100% 100%",
      }}
      type="button"
      {...props}
    />
  );
}
