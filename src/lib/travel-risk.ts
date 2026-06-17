import type { InventoryEntry, Item, Kingdom, Marketplace } from "@/data/types";
import { visibleQuantity } from "./inventory";
import { itemIsIllegal } from "./legal";

export type TravelRiskEvent = {
  kind: "inspection" | "theft";
  message: string;
};

function seededRisk(seed: number) {
  let value = seed || 1;
  value = (value * 1664525 + 1013904223) >>> 0;
  return value / 4294967296;
}

function removeQuantity(entry: InventoryEntry, quantity: number) {
  entry.quantity = Math.max(0, entry.quantity - quantity);
  entry.offerQuantity = Math.min(entry.offerQuantity, entry.quantity);
}

function pruneEmpty(inventory: InventoryEntry[]) {
  for (let index = inventory.length - 1; index >= 0; index--) {
    if (inventory[index].quantity <= 0) inventory.splice(index, 1);
  }
}

export function applyTravelRisks(options: {
  inventory: InventoryEntry[];
  items: Item[];
  destination: Marketplace;
  kingdom: Kingdom | undefined;
  day: number;
}) {
  const { inventory, items, destination, kingdom, day } = options;
  const events: TravelRiskEvent[] = [];
  const illegalTags = kingdom?.illegalItemTags || [];
  const illegalEntry = inventory.find((entry) => {
    const item = items[entry.itemIndex];
    return visibleQuantity(entry) > 0 && !entry.conceal && itemIsIllegal(item, illegalTags);
  });

  if (illegalEntry) {
    const item = items[illegalEntry.itemIndex];
    const taken = Math.min(visibleQuantity(illegalEntry), Math.max(1, Math.ceil(visibleQuantity(illegalEntry) / 2)));
    removeQuantity(illegalEntry, taken);
    events.push({
      kind: "inspection",
      message: `Guards inspected your cargo and confiscated ${taken} ${item.name}. Concealed goods are harder to spot.`,
    });
  }

  const theft = destination.theft;
  if (theft && seededRisk((destination.index + 1) * 8191 + day * 131) * 100 < theft.percent) {
    const candidates = inventory
      .filter((entry) => {
        const item = items[entry.itemIndex];
        return visibleQuantity(entry) > 0 && !entry.protected && item.loafValue <= theft.maxLoafValue && item.size <= theft.maxSize;
      })
      .sort((left, right) => items[right.itemIndex].loafValue - items[left.itemIndex].loafValue);
    const stolen = candidates[0];
    if (stolen) {
      const item = items[stolen.itemIndex];
      const taken = Math.min(visibleQuantity(stolen), Math.max(1, theft.maxQuantity));
      removeQuantity(stolen, taken);
      events.push({
        kind: "theft",
        message: `A thief slipped through the crowd and stole ${taken} ${item.name}. Protected cargo is safer.`,
      });
    }
  }

  pruneEmpty(inventory);
  return events;
}
