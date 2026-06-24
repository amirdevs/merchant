import type { Bias, Marketplace } from "@/shared/types/game-data";

export type MarketEventPreview = {
  marketIndex: number;
  marketName: string;
  name: string;
  frequency: string;
  characterName?: string | null;
  nextDay: number;
  active: boolean;
};

const WEEKDAYS: Record<string, number> = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
};

function weekday(day: number) {
  return ((Math.max(1, day) - 1) % 7) + 1;
}

function scheduledWeekday(frequency?: string | null) {
  const normalized = (frequency || "").toLowerCase();
  const entry = Object.entries(WEEKDAYS).find(([name]) => normalized.includes(name));
  return entry?.[1] ?? null;
}

function intervalFor(frequency?: string | null) {
  const normalized = (frequency || "").toLowerCase();
  if (normalized.includes("daily")) return 1;
  if (normalized.includes("weekly")) return 7;
  if (normalized.includes("monthly")) return 30;
  if (normalized.includes("yearly") || normalized.includes("annual")) return 365;
  return 14;
}

export function eventIsActive(market: Marketplace, day: number) {
  if (!market.event?.name || market.event.name.toLowerCase() === "inaccessible") return false;
  const targetWeekday = scheduledWeekday(market.event.frequency);
  if (targetWeekday !== null) return weekday(day) === targetWeekday;
  const interval = intervalFor(market.event.frequency);
  return day % interval === 0;
}

export function nextEventDay(market: Marketplace, day: number) {
  if (eventIsActive(market, day)) return day;
  const targetWeekday = scheduledWeekday(market.event?.frequency);
  if (targetWeekday !== null) {
    const distance = (targetWeekday - weekday(day) + 7) % 7;
    return day + (distance || 7);
  }
  const interval = intervalFor(market.event?.frequency);
  return day + ((interval - (day % interval)) % interval || interval);
}

export function eventBiases(market: Marketplace, day: number): Bias[] {
  if (!eventIsActive(market, day)) return [];
  const name = (market.event?.name || "").toLowerCase();
  if (name.includes("auction")) return [{ tag: "jewelry", percent: 20 }, { tag: "paintings", percent: 20 }, { tag: "rare", percent: 15 }];
  if (name.includes("draft")) return [{ tag: "magic", percent: 25 }, { tag: "cards", percent: 20 }];
  if (name.includes("horse")) return [{ tag: "packhorses", percent: 30 }, { tag: "food", percent: 10 }];
  if (name.includes("card game")) return [{ tag: "cards", percent: 30 }, { tag: "myth", percent: 30 }];
  if (name.includes("revival")) return [{ tag: "food", percent: 15 }, { tag: "clothes", percent: 10 }];
  if (name.includes("market day")) {
    const included = Array.isArray(market.event?.data?.includedItems) ? market.event.data.includedItems as string[] : [];
    return included.slice(0, 8).map((tag) => ({ tag, percent: 25 }));
  }
  return [{ tag: "food", percent: 10 }];
}

export function marketEventPreviews(markets: Marketplace[], day: number): MarketEventPreview[] {
  return markets
    .filter((market) => market.event?.name && market.event.name.toLowerCase() !== "inaccessible")
    .map((market) => ({
      marketIndex: market.index,
      marketName: market.name,
      name: market.event?.name || "Market Event",
      frequency: market.event?.frequency || "irregular",
      characterName: market.event?.characterName,
      nextDay: nextEventDay(market, day),
      active: eventIsActive(market, day),
    }))
    .sort((left, right) => left.nextDay - right.nextDay || left.marketName.localeCompare(right.marketName));
}
