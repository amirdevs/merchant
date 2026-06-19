import { describe, expect, it } from "vitest";
import { newGame } from "./game";
import { charactersAtMarket } from "./npc-flow";

describe("daily customer queue", () => {
  it("changes the regular customer order from day to day", () => {
    const state = newGame();
    const dayOne = charactersAtMarket(state).map((character) => character.index);

    state.day += 1;
    const dayTwo = charactersAtMarket(state).map((character) => character.index);

    expect(dayTwo).not.toEqual(dayOne);
  });

  it("puts an unresolved named quest contact before regular customers", () => {
    const state = newGame();
    state.marketIndex = 10;
    state.questStates[String(state.marketIndex)] = "offered";

    expect(charactersAtMarket(state)[0]?.name).toBe("Faraday Casey");
  });

  it("returns a named quest contact to the shuffled pool after completion", () => {
    const state = newGame();
    state.marketIndex = 10;
    state.questStates[String(state.marketIndex)] = "finished";

    expect(charactersAtMarket(state).map((character) => character.name)).toContain("Faraday Casey");
  });
});
