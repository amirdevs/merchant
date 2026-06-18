import type { ButtonHTMLAttributes, ReactNode } from "react";
import { LockKeyhole } from "lucide-react";
import { cn } from "@/lib/cn";
import { uiAssets } from "@/lib/ui-assets";

type ItemSlotProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  imageSrc?: string;
  quantity?: ReactNode;
  marker?: "protected" | "quest" | "illegal" | "rare";
  selected?: boolean;
  locked?: boolean;
};

const markerAsset = {
  protected: uiAssets.inventory.markerProtected,
  quest: uiAssets.inventory.markerQuest,
  illegal: uiAssets.inventory.markerIllegal,
  rare: uiAssets.inventory.markerRare,
};

export function ItemSlot({ className, imageSrc, quantity, marker, selected, locked, style, ...props }: ItemSlotProps) {
  const slotAsset = locked ? uiAssets.inventory.slotLockedLarge : selected ? uiAssets.inventory.slotSelectedLarge : imageSrc ? uiAssets.inventory.slotFilledLarge : uiAssets.inventory.slotEmptyLarge;

  return (
    <button
      className={cn(
        "relative grid aspect-square w-20 place-items-center bg-contain bg-center bg-no-repeat p-2 transition hover:brightness-110",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
        className
      )}
      style={{
        ...style,
        backgroundImage: `url("${slotAsset}")`,
      }}
      type="button"
      {...props}
    >
      {selected ? <img className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-80 mix-blend-screen" src={uiAssets.inventory.slotHighlightGlow} alt="" /> : null}
      {imageSrc ? <img className="max-h-[72%] max-w-[72%] object-contain drop-shadow" src={imageSrc} alt="" /> : null}
      {locked ? <LockKeyhole className="absolute text-brass drop-shadow" size={18} /> : null}
      {quantity ? (
        <span className="absolute right-1 top-1 min-w-6 rounded-full border-2 border-[#5a3b18] bg-[#fff2bd] px-1.5 text-center text-sm font-black leading-6 text-[#160d05] shadow shadow-black/35">
          {quantity}
        </span>
      ) : null}
      {marker ? <img className="absolute -right-1 -top-1 h-6 w-6 object-contain drop-shadow" src={markerAsset[marker]} alt="" /> : null}
    </button>
  );
}
