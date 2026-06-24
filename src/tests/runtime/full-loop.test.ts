import { describe, expect, it } from "vitest";
import { createShipment, openWarehouse } from "@/game/company/company";
import { activeMythDeck, playMythCard, startMythGame } from "@/game/market/myth";
import { itemIndexByName, items, marketplaces, newGame, travelToMarket } from "@/game/runtime/game";
import { parseGameSave, serializeGame } from "@/game/runtime/save";

describe("full gameplay loop smoke", () => {
  it("crosses travel, company, Myth, and save persistence", () => {
    const state = newGame();
    const route = marketplaces[state.marketIndex].connections[0];

    expect(travelToMarket(state, route.marketplaceIndex)).toBe(true);
    expect(state.caravan.routeHistory).toHaveLength(1);

    openWarehouse(state.company, state.marketIndex);
    state.company.bankCopper = 500;
    const returnRoute = marketplaces[state.marketIndex].connections[0];
    expect(createShipment(state.company, state.marketIndex, returnRoute.marketplaceIndex, state.day, returnRoute.travelDays, returnRoute.tolls)).not.toBeNull();

    const myth = startMythGame({
      opponentName: "Smoke Rival",
      opponentArchetype: "randomWild",
      day: state.day,
      playerDeck: activeMythDeck(state.mythProgression),
    });
    while (myth.status === "active") playMythCard(myth, myth.playerHand[0].id);
    state.mythSession = myth;

    const restored = parseGameSave(serializeGame(state));
    expect(restored?.marketIndex).toBe(state.marketIndex);
    expect(restored?.caravan.routeHistory).toHaveLength(1);
    expect(restored?.company.shipments).toHaveLength(1);
    expect(restored?.mythSession?.status).not.toBe("active");
    expect(restored?.playerInventory.some((entry) => entry.itemIndex === itemIndexByName("copper coins") && items[entry.itemIndex].name === "copper coins")).toBe(true);
  });
});
