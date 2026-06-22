import { describe, expect, it } from "vitest";
import type { Item, Marketplace } from "@/data/types";
import { advanceMarketSimulation, marketRumors, recordMarketTrade, simulatedMarketBiases, type MarketSimulation } from "./market-simulation";

const items: Item[] = [
  { index: 0, name: "Onion", tags: ["food", "vegetable"], loafValue: 2, size: 1, weight: 1, kingdomIndex: null },
];
const market = { index: 0, name: "Boone" } as Marketplace;

describe("dynamic market simulation", () => {
  it("creates scarcity after player buyouts and oversupply after selloffs", () => {
    const simulation: MarketSimulation = {};
    recordMarketTrade({ simulation, marketIndex: 0, day: 1, playerSold: [], playerBought: [{ itemIndex: 0, quantity: 10, offerQuantity: 8 }], items });
    expect(simulatedMarketBiases(simulation, market, 1)[0]).toEqual({ tag: "food", percent: 16 });
    expect(marketRumors(simulation, market, 1)[0]).toContain("scarce");

    recordMarketTrade({ simulation, marketIndex: 0, day: 1, playerSold: [{ itemIndex: 0, quantity: 20, offerQuantity: 20 }], playerBought: [], items });
    expect(simulatedMarketBiases(simulation, market, 1)[0].percent).toBeLessThan(0);
  });

  it("recovers toward baseline over time", () => {
    const simulation: MarketSimulation = { 0: { tagShifts: { food: 20 }, lastUpdatedDay: 1 } };
    advanceMarketSimulation(simulation, 6);
    expect(simulation[0].tagShifts.food).toBe(10);
  });
});
