import type { InventoryEntry } from "@/data/types";
import { iconFor } from "@/sub-domains/inventory/utils/inventory-ui.utils";

export function ItemArtFrame({ entry, icon }: { entry: InventoryEntry; icon: string }) {
  return (
    <span className="item-art-frame">
      {icon ? (
        <img
          src={icon}
          alt=""
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      ) : null}
      <span className="item-fallback">{iconFor(entry)}</span>
    </span>
  );
}
