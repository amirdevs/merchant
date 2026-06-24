import type { InventoryEntry, Item, Kingdom, Marketplace } from "@/shared/types/game-data";
import { visibleQuantity } from "@/game/trade/inventory";
import { itemIsIllegal } from "@/game/trade/legal";
import { inventoryTotals } from "@/game/economy/economy";

export type TravelRiskEvent = {
  kind: "inspection" | "theft" | "bribe" | "evasion" | "condition";
  message: string;
};

export type TravelStrategy = "comply" | "bribe" | "evade";

function seededRisk(seed: number) {
  let value = seed || 1;
  value = (value * 1664525 + 1013904223) >>> 0;
  return value / 4294967296;
}

export type RouteRiskPreview = {
  guardInspectionPercent: number;
  theftPercent: number;
  illegalStacks: number;
  exposedIllegalStacks: number;
  concealedIllegalStacks: number;
  cargoValue: number;
  tolls: number;
  days: number;
  level: "low" | "medium" | "high" | "severe";
};

export function routeRiskPreview(options: {
  inventory: InventoryEntry[];
  items: Item[];
  destination: Marketplace;
  kingdom: Kingdom | undefined;
  days: number;
  tolls: number;
  concealmentLevel?: number;
  masteryReduction?: number;
}): RouteRiskPreview {
  const { inventory, items, destination, kingdom, days, tolls, concealmentLevel = 0, masteryReduction = 0 } = options;
  const illegalEntries = inventory.filter((entry) => visibleQuantity(entry) > 0 && itemIsIllegal(items[entry.itemIndex], kingdom?.illegalItemTags || []));
  const exposedIllegalStacks = illegalEntries.filter((entry) => !entry.conceal).length;
  const concealedIllegalStacks = illegalEntries.length - exposedIllegalStacks;
  const baseGuardInspectionPercent = illegalEntries.length
    ? Math.min(95, 12 + days * 2 + exposedIllegalStacks * 28 + concealedIllegalStacks * 8)
    : Math.min(20, 3 + days);
  const guardInspectionPercent = Math.max(0, baseGuardInspectionPercent - concealmentLevel * 8 - masteryReduction);
  const theftPercent = Math.max(0, Math.min(100, (destination.theft?.percent || 0) - masteryReduction));
  const cargoValue = inventoryTotals(inventory, items).value;
  const combined = guardInspectionPercent + theftPercent + Math.min(25, cargoValue / 500);
  const level = combined >= 100 ? "severe" : combined >= 65 ? "high" : combined >= 30 ? "medium" : "low";
  return {
    guardInspectionPercent,
    theftPercent,
    illegalStacks: illegalEntries.length,
    exposedIllegalStacks,
    concealedIllegalStacks,
    cargoValue,
    tolls,
    days,
    level,
  };
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
  travelDays?: number;
  inspectionRoll?: number;
  theftRoll?: number;
  strategy?: TravelStrategy;
  hasPermit?: boolean;
  permitMultiplier?: number;
  heat?: number;
  concealmentLevel?: number;
  masteryReduction?: number;
}) {
  const { inventory, items, destination, kingdom, day, travelDays = 1, strategy = "comply", hasPermit = false, permitMultiplier = 0.45, heat = 0, concealmentLevel = 0, masteryReduction = 0 } = options;
  const events: TravelRiskEvent[] = [];
  const preview = routeRiskPreview({ inventory, items, destination, kingdom, days: travelDays, tolls: 0, concealmentLevel, masteryReduction });
  const illegalTags = kingdom?.illegalItemTags || [];
  const illegalEntry = inventory
    .filter((entry) => {
      const item = items[entry.itemIndex];
      return visibleQuantity(entry) > 0 && itemIsIllegal(item, illegalTags);
    })
    .sort((left, right) => Number(left.conceal) - Number(right.conceal))[0];

  const inspectionRoll = options.inspectionRoll ?? seededRisk((destination.index + 1) * 6151 + day * 173);
  const strategyMultiplier = strategy === "bribe" ? 0.25 : strategy === "evade" ? 0.6 : 1;
  const permitFactor = hasPermit ? permitMultiplier : 1;
  const inspectionPercent = Math.min(100, preview.guardInspectionPercent * strategyMultiplier * permitFactor + heat * 0.35);
  if (illegalEntry && inspectionRoll * 100 < inspectionPercent) {
    const item = items[illegalEntry.itemIndex];
    const taken = strategy === "evade"
      ? visibleQuantity(illegalEntry)
      : Math.min(visibleQuantity(illegalEntry), Math.max(1, Math.ceil(visibleQuantity(illegalEntry) / 2)));
    removeQuantity(illegalEntry, taken);
    events.push({
      kind: strategy === "evade" ? "evasion" : "inspection",
      message: strategy === "evade"
        ? `Your evasion failed. Guards confiscated all ${taken} ${item.name} from the stack.`
        : `Guards inspected your cargo and confiscated ${taken} ${item.name}${illegalEntry.conceal ? " from a concealed compartment" : ""}. Concealment lowers risk but cannot remove it.`,
    });
  } else if (illegalEntry && strategy === "bribe") {
    events.push({ kind: "bribe", message: "A discreet payment steered the inspection away from your cargo." });
  } else if (illegalEntry && strategy === "evade") {
    events.push({ kind: "evasion", message: "You avoided the inspection route without drawing pursuit." });
  }

  const theft = destination.theft;
  const theftRoll = options.theftRoll ?? seededRisk((destination.index + 1) * 8191 + day * 131);
  if (theft && theftRoll * 100 < theft.percent) {
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
