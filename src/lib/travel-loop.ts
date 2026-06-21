import type { InventoryEntry, Item, Kingdom, Marketplace } from "@/data/types";
import { inventoryTotals, tradeAffordability, type InventoryTotals } from "@/lib/economy";
import { itemIsIllegal } from "@/lib/legal";
import { visibleQuantity } from "@/lib/inventory";
import { routeRiskPreview, type RouteRiskPreview } from "@/lib/travel-risk";

export type TravelConnection = Marketplace["connections"][number];

export type MarketCloseStatus = {
  status: "open" | "closing-soon" | "closed";
  minutesUntilClose: number;
  minutesUntilOpen: number;
  label: string;
};

export type TravelPlan = {
  fromMarketIndex: number;
  toMarketIndex: number;
  fromMarketName: string;
  toMarketName: string;
  days: number;
  tolls: number;
  stallage: number;
  totalDueCopper: number;
  canPay: boolean;
  missingCopper: number;
  cargo: InventoryTotals;
  risk: RouteRiskPreview;
  warnings: string[];
  blockers: string[];
  summary: string;
};

const DAY_MINUTES = 24 * 60;
const DEFAULT_MARKET_OPEN_MINUTES = 8 * 60;
const DEFAULT_MARKET_CLOSE_MINUTES = 20 * 60;

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function normalizeMinutes(minutes: number) {
  const safeMinutes = Number.isFinite(minutes) ? Math.floor(minutes) : DEFAULT_MARKET_OPEN_MINUTES;
  return ((safeMinutes % DAY_MINUTES) + DAY_MINUTES) % DAY_MINUTES;
}

function routeLabel(days: number) {
  return `${Math.max(0, Math.floor(days))} day${Math.max(0, Math.floor(days)) === 1 ? "" : "s"}`;
}

export function findTravelConnection(from: Marketplace, toMarketIndex: number): TravelConnection | null {
  return from.connections.find((connection) => connection.marketplaceIndex === toMarketIndex) || null;
}

export function marketCloseStatus(
  timeOfDayMinutes: number,
  openMinutes = DEFAULT_MARKET_OPEN_MINUTES,
  closeMinutes = DEFAULT_MARKET_CLOSE_MINUTES
): MarketCloseStatus {
  const time = normalizeMinutes(timeOfDayMinutes);
  const open = normalizeMinutes(openMinutes);
  const close = normalizeMinutes(closeMinutes);
  const isOpenWindow = open <= close ? time >= open && time < close : time >= open || time < close;

  if (!isOpenWindow) {
    const minutesUntilOpen = time < open ? open - time : DAY_MINUTES - time + open;
    return {
      status: "closed",
      minutesUntilClose: 0,
      minutesUntilOpen,
      label: `Market is closed. Opens in ${minutesUntilOpen} minute${minutesUntilOpen === 1 ? "" : "s"}.`,
    };
  }

  const minutesUntilClose = time <= close ? close - time : DAY_MINUTES - time + close;
  if (minutesUntilClose <= 90) {
    return {
      status: "closing-soon",
      minutesUntilClose,
      minutesUntilOpen: 0,
      label: `Market closes soon: ${minutesUntilClose} minute${minutesUntilClose === 1 ? "" : "s"} left.`,
    };
  }

  return {
    status: "open",
    minutesUntilClose,
    minutesUntilOpen: 0,
    label: `Market is open for ${minutesUntilClose} more minute${minutesUntilClose === 1 ? "" : "s"}.`,
  };
}

export function illegalCargoSummary(inventory: InventoryEntry[], items: Item[], kingdom: Kingdom | undefined) {
  const illegalTags = kingdom?.illegalItemTags || [];
  const illegalEntries = inventory.filter((entry) => {
    const item = items[entry.itemIndex];
    return item && visibleQuantity(entry) > 0 && itemIsIllegal(item, illegalTags);
  });
  const exposed = illegalEntries.filter((entry) => !entry.conceal).length;
  const concealed = illegalEntries.length - exposed;
  return {
    illegalStacks: illegalEntries.length,
    exposedIllegalStacks: exposed,
    concealedIllegalStacks: concealed,
  };
}

export function routeDangerLabel(risk: Pick<RouteRiskPreview, "level" | "guardInspectionPercent" | "theftPercent">) {
  const guard = clampPercent(risk.guardInspectionPercent);
  const theft = clampPercent(risk.theftPercent);
  return `${risk.level.toUpperCase()} risk: ${guard}% inspection / ${theft}% theft`;
}

export function buildTravelWarnings(options: {
  cargo: InventoryTotals;
  risk: RouteRiskPreview;
  canPay: boolean;
  missingCopper: number;
  destination: Marketplace;
}) {
  const { cargo, risk, canPay, missingCopper, destination } = options;
  const warnings: string[] = [];
  const blockers: string[] = [];

  if (!cargo.canTravel) {
    blockers.push(`Cargo is overloaded by ${Math.ceil(cargo.overWeight)} weight and ${Math.ceil(cargo.overSize)} size.`);
  }
  if (!canPay) {
    blockers.push(`Missing ${missingCopper} copper for route tolls/stallage.`);
  }
  if (risk.exposedIllegalStacks > 0) {
    warnings.push(`${risk.exposedIllegalStacks} illegal stack${risk.exposedIllegalStacks === 1 ? " is" : "s are"} exposed to inspection.`);
  }
  if (risk.concealedIllegalStacks > 0) {
    warnings.push(`${risk.concealedIllegalStacks} illegal stack${risk.concealedIllegalStacks === 1 ? " is" : "s are"} concealed; risk is lower but not zero.`);
  }
  if (risk.theftPercent >= 25) {
    warnings.push(`${destination.name} has elevated theft risk (${clampPercent(risk.theftPercent)}%).`);
  }
  if (risk.level === "high" || risk.level === "severe") {
    warnings.push(routeDangerLabel(risk));
  }
  if (cargo.packAnimals <= 0 && cargo.totalQuantity > 50) {
    warnings.push("Large cargo with no pack animal may become difficult once stricter capacity is enabled.");
  }

  return { warnings, blockers };
}

export function planTravel(options: {
  from: Marketplace;
  destination: Marketplace;
  destinationKingdom: Kingdom | undefined;
  inventory: InventoryEntry[];
  items: Item[];
  timeOfDayMinutes?: number;
  concealmentLevel?: number;
  masteryReduction?: number;
}) : TravelPlan | null {
  const { from, destination, destinationKingdom, inventory, items, concealmentLevel = 0, masteryReduction = 0 } = options;
  const connection = findTravelConnection(from, destination.index);
  if (!connection) return null;

  const days = Math.max(0, Math.floor(connection.travelDays || 0));
  const tolls = Math.max(0, Math.floor(connection.tolls || 0));
  const stallage = Math.max(0, Math.floor(destination.stallage || 0));
  const totalDueCopper = tolls + stallage;
  const affordability = tradeAffordability(inventory, items, totalDueCopper);
  const cargo = inventoryTotals(inventory, items);
  const risk = routeRiskPreview({
    inventory,
    items,
    destination,
    kingdom: destinationKingdom,
    days,
    tolls,
    concealmentLevel,
    masteryReduction,
  });
  const { warnings, blockers } = buildTravelWarnings({
    cargo,
    risk,
    canPay: affordability.canAfford,
    missingCopper: affordability.missingCopper,
    destination,
  });
  const summary = `${from.name} → ${destination.name}: ${routeLabel(days)}, ${totalDueCopper}c due, ${routeDangerLabel(risk)}.`;

  return {
    fromMarketIndex: from.index,
    toMarketIndex: destination.index,
    fromMarketName: from.name,
    toMarketName: destination.name,
    days,
    tolls,
    stallage,
    totalDueCopper,
    canPay: affordability.canAfford,
    missingCopper: affordability.missingCopper,
    cargo,
    risk,
    warnings,
    blockers,
    summary,
  };
}

export function arrivalSummary(options: {
  fromMarketName: string;
  toMarketName: string;
  days: number;
  tolls: number;
  stallage: number;
  events?: string[];
}) {
  const { fromMarketName, toMarketName, days, tolls, stallage, events = [] } = options;
  const paid = tolls + stallage;
  const parts = [`Arrived in ${toMarketName} from ${fromMarketName} after ${routeLabel(days)}.`];
  if (paid > 0) parts.push(`Paid ${paid} copper (${tolls} tolls, ${stallage} stallage).`);
  if (events.length) parts.push(`Events: ${events.join(" ")}`);
  else parts.push("No travel incidents were recorded.");
  return parts.join(" ");
}
