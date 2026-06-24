import { describe, expect, it } from "vitest";
import { itemIndexByName, items, marketplaces, newGame, travelToMarket } from "@/game/runtime/game";

function copperEntry(state = newGame()) {
  return state.playerInventory.find((entry) => entry.itemIndex === itemIndexByName("copper coins"));
}

describe("travel execution", () => {
  function paidRoute() {
    return marketplaces[0].connections.find((route) => route.tolls > 0) || marketplaces[0].connections[0];
  }

  it("spends tolls, advances time, moves markets, and records arrival", () => {
    const state = newGame();
    const route = paidRoute();
    const copperBefore = copperEntry(state)?.quantity || 0;

    const travelled = travelToMarket(state, route.marketplaceIndex);

    expect(travelled).toBe(true);
    expect(state.marketIndex).toBe(route.marketplaceIndex);
    expect(state.day).toBe(1 + route.travelDays);
    expect(copperEntry(state)?.quantity).toBe(copperBefore - route.tolls - marketplaces[route.marketplaceIndex].stallage);
    expect(state.travelResult).toMatchObject({
      fromMarketName: marketplaces[0].name,
      toMarketName: marketplaces[route.marketplaceIndex].name,
      days: route.travelDays,
      tolls: route.tolls,
      stallage: marketplaces[route.marketplaceIndex].stallage,
      arrivalDay: state.day,
    });
    expect(state.travelResult?.events[0]).toContain("weather");
    expect(state.caravan.routeHistory[0]).toMatchObject({ suppliesUsed: expect.any(Number), weather: expect.any(String), roadQuality: expect.any(String) });
  });

  it("does not move the player when route toll is unaffordable", () => {
    const state = newGame();
    const route = paidRoute();
    const copper = copperEntry(state);
    if (copper) copper.quantity = 0;

    const travelled = travelToMarket(state, route.marketplaceIndex);

    expect(travelled).toBe(false);
    expect(state.marketIndex).toBe(0);
    expect(state.day).toBe(1);
    expect(state.travelResult).toBeNull();
    expect(state.message).toContain("copper coins");
  });

  it("does not move the player while cargo exceeds capacity", () => {
    const state = newGame();
    const route = marketplaces[state.marketIndex].connections[0];
    const heavyItem = items
      .filter((item) => item.weight > 0 || item.size > 0)
      .sort((left, right) => (right.weight + right.size) - (left.weight + left.size))[0];
    state.playerInventory.push({ itemIndex: heavyItem.index, quantity: 999, offerQuantity: 0 });

    const travelled = travelToMarket(state, route.marketplaceIndex);

    expect(travelled).toBe(false);
    expect(state.marketIndex).toBe(0);
    expect(state.day).toBe(1);
    expect(state.travelResult).toBeNull();
    expect(state.message).toContain("too heavy or bulky");
  });
});
