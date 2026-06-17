import { describe, expect, it } from "vitest";
import type { Character } from "@/data/types";
import { autoAskOffer, autoAskPrice, itemIndexByName, newGame, offerValue, type GameState } from "./game";

function testCharacter(inventory: Character["inventory"]): Character {
  return {
    index: 0,
    name: "Mira",
    profession: "Trader",
    professionSlug: null,
    isActive: true,
    isMerchant: true,
    marketplaceIndex: 0,
    maxObtainValue: 1000,
    frugalPercent: 0,
    hagglePercent: 0,
    closeToDealPercent: 10,
    reachingDealPercent: 40,
    farFromDealPercent: 80,
    bias: [],
    obtainableItems: [],
    excludedObtainItems: [],
    inventory,
  };
}

function stateWith(character: Character): GameState {
  return {
    ...newGame(),
    selectedCharacterIndex: character.index,
    characters: [character],
    playerInventory: [
      { itemIndex: itemIndexByName("onions"), quantity: 12, offerQuantity: 0 },
      { itemIndex: itemIndexByName("copper coins"), quantity: 4, offerQuantity: 0 },
      { itemIndex: itemIndexByName("silver coins"), quantity: 1, offerQuantity: 0 },
      { itemIndex: itemIndexByName("working gloves"), quantity: 1, offerQuantity: 0, conceal: true },
    ],
  };
}

describe("auto barter matching", () => {
  it("ask price fills visible player goods to exceed the selected NPC offer", () => {
    const character = testCharacter([{ itemIndex: itemIndexByName("loaf"), quantity: 1, offerQuantity: 1 }]);
    const state = stateWith(character);

    const message = autoAskPrice(state, character);

    expect(message).toBe("Mira names a price from your goods.");
    expect(offerValue(state.playerInventory, character, "player", state)).toBeGreaterThan(offerValue(character.inventory, character, "character", state));
    expect(state.playerInventory.find((entry) => entry.itemIndex === itemIndexByName("working gloves"))?.offerQuantity).toBe(0);
  });

  it("ask offer fills NPC goods to make a fair counteroffer", () => {
    const character = testCharacter([{ itemIndex: itemIndexByName("copper coins"), quantity: 10, offerQuantity: 0 }]);
    const state = stateWith(character);
    state.playerInventory.find((entry) => entry.itemIndex === itemIndexByName("silver coins"))!.offerQuantity = 1;

    const message = autoAskOffer(state, character);

    expect(message).toBe("Mira makes a counteroffer.");
    expect(character.inventory.some((entry) => entry.offerQuantity > 0)).toBe(true);
  });

  it("ask offer reports missing player goods instead of changing NPC offers", () => {
    const character = testCharacter([{ itemIndex: itemIndexByName("onions"), quantity: 10, offerQuantity: 0 }]);
    const state = stateWith(character);

    const message = autoAskOffer(state, character);

    expect(message).toBe("Select some of your goods first, then ask what they will offer.");
    expect(character.inventory.every((entry) => entry.offerQuantity === 0)).toBe(true);
  });
});
