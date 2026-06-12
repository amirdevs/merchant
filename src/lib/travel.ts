import type { Marketplace } from "../data/types";

export function getTravelRoute(from: Marketplace, toMarketIndex: number) {
  return from.connections.find((connection) => connection.marketplaceIndex === toMarketIndex) || null;
}

export function travelDays(from: Marketplace, toMarketIndex: number) {
  return getTravelRoute(from, toMarketIndex)?.travelDays || 1;
}

