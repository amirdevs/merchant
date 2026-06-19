import { describe, expect, it } from "vitest";
import { benfordsQuantity, generateInventory, newGame, restockNpcInventories } from "./game";
import { resolveStockProfile, resolvedStockSettings } from "./stock-profiles";

describe("inventory generation", () => {
  it("keeps generated quantities inside the configured bounds", () => {
    const rolls = [0, 0.2, 0.5, 0.9, 0.999];
    const quantities = rolls.map((roll) => benfordsQuantity(2, 8, () => roll));

    expect(Math.min(...quantities)).toBeGreaterThanOrEqual(2);
    expect(Math.max(...quantities)).toBeLessThanOrEqual(8);
  });

  it("skews lower rolls toward lower quantities", () => {
    const low = benfordsQuantity(1, 20, () => 0.25);
    const middle = benfordsQuantity(1, 20, () => 0.5);
    const high = benfordsQuantity(1, 20, () => 0.9);

    expect(low).toBeLessThan(middle);
    expect(middle).toBeLessThan(high);
    expect(low).toBeLessThan(6);
  });

  it("returns fixed values for fixed ranges", () => {
    expect(benfordsQuantity(4, 4, () => 0.99)).toBe(4);
  });

  it("resolves explicit profession profiles and merchant capacity separately", () => {
    const state = newGame();
    const merchant = state.characters.find((character) => character.professionSlug === "merchant" && character.isMerchant);
    const baker = state.characters.find((character) => character.professionSlug === "baker" && !character.isMerchant);

    expect(merchant).toBeDefined();
    expect(baker).toBeDefined();
    expect(resolveStockProfile(merchant!).archetypes.map((entry) => entry.id)).toContain("general");
    expect(resolveStockProfile(baker!).archetypes.map((entry) => entry.id)).toContain("baker");
    expect(resolvedStockSettings(merchant!, 20).maxStacks).toBeGreaterThan(resolvedStockSettings(baker!, 20).maxStacks);
  });

  it("refreshes NPC stock deterministically for each day", () => {
    const state = newGame();
    const character = state.characters.find((candidate) => candidate.isActive && candidate.isMerchant && candidate.inventory.length > 0)!;
    const duplicateState = structuredClone(state);
    const before = character.inventory.map((entry) => [entry.itemIndex, entry.quantity]);
    state.day = 2;
    duplicateState.day = 2;
    restockNpcInventories(state);
    restockNpcInventories(duplicateState);
    const after = character.inventory.map((entry) => [entry.itemIndex, entry.quantity]);
    const duplicateCharacter = duplicateState.characters.find((candidate) => candidate.index === character.index)!;

    expect(after).not.toEqual(before);
    expect(duplicateCharacter.inventory).toEqual(character.inventory);
  });
});
