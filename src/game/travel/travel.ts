import type { Marketplace } from "@/shared/types/game-data";

export type TravelConnection = Marketplace["connections"][number];

export function getTravelRoute(from: Marketplace, toMarketIndex: number) {
  return from.connections.find((connection) => connection.marketplaceIndex === toMarketIndex) || null;
}

export function travelDays(from: Marketplace, toMarketIndex: number) {
  return getTravelRoute(from, toMarketIndex)?.travelDays || 1;
}

export function routeCost(route: TravelConnection) {
  return route.tolls;
}

export function marketDemand(market: Marketplace) {
  return (market.bias || []).filter((bias) => bias.percent > 0).sort((left, right) => right.percent - left.percent);
}

export function marketDiscounts(market: Marketplace) {
  return (market.bias || []).filter((bias) => bias.percent < 0).sort((left, right) => left.percent - right.percent);
}

export function compactBiasText(market: Marketplace, kind: "demand" | "discount") {
  const biases = kind === "demand" ? marketDemand(market) : marketDiscounts(market);
  if (!biases.length) return "None";
  return biases.slice(0, 3).map((bias) => `${bias.tag} ${bias.percent > 0 ? "+" : ""}${bias.percent}%`).join(", ");
}

export function routeLedger(from: Marketplace, markets: Marketplace[]) {
  return from.connections.map((connection) => {
    const to = markets[connection.marketplaceIndex];
    return {
      connection,
      to,
      days: connection.travelDays,
      tolls: routeCost(connection),
      demand: compactBiasText(to, "demand"),
      discounts: compactBiasText(to, "discount"),
    };
  });
}
