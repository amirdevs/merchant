import type { Marketplace } from "@/data/types";

export type MarketEventPreview = {
  marketName: string;
  name: string;
  frequency: string;
  characterName?: string | null;
  nextDay: number;
};

function intervalFor(frequency?: string | null) {
  const normalized = (frequency || "").toLowerCase();
  if (normalized.includes("daily")) return 1;
  if (normalized.includes("weekly")) return 7;
  if (normalized.includes("monthly")) return 30;
  if (normalized.includes("yearly") || normalized.includes("annual")) return 365;
  return 14;
}

export function marketEventPreviews(markets: Marketplace[], day: number): MarketEventPreview[] {
  return markets
    .filter((market) => market.event?.name)
    .map((market) => {
      const interval = intervalFor(market.event?.frequency);
      const nextDay = day + ((interval - (day % interval)) % interval || interval);
      return {
        marketName: market.name,
        name: market.event?.name || "Market Event",
        frequency: market.event?.frequency || "irregular",
        characterName: market.event?.characterName,
        nextDay,
      };
    })
    .sort((left, right) => left.nextDay - right.nextDay || left.marketName.localeCompare(right.marketName));
}
