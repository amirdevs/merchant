import { describe, expect, it } from "vitest";
import { autoAskPrice, itemIndexByName, newGame } from "@/game/runtime/game";

describe("real Ask Price offerability", () => {
  it("does not auto-offer protected player goods", () => {
    const state = newGame();
    const character = state.characters.find((candidate) => candidate.isActive && !candidate.isPlunderer);
    expect(character).toBeTruthy();
    if (!character) return;

    const goldIndex = itemIndexByName("gold coins");
    const silverIndex = itemIndexByName("silver coins");
    const copperIndex = itemIndexByName("copper coins");

    character.inventory = [{ itemIndex: goldIndex, quantity: 1, offerQuantity: 1 }];
    state.playerInventory = [
      { itemIndex: silverIndex, quantity: 20, offerQuantity: 0, protected: true },
      { itemIndex: copperIndex, quantity: 200, offerQuantity: 0 },
    ];

    const message = autoAskPrice(state, character);

    expect(message).toBe(`${character.name} names a price from your goods.`);
    expect(state.playerInventory.find((entry) => entry.itemIndex === silverIndex)?.offerQuantity || 0).toBe(0);
    expect(state.playerInventory.find((entry) => entry.itemIndex === copperIndex)?.offerQuantity || 0).toBeGreaterThan(0);
  }, 20000);
});
