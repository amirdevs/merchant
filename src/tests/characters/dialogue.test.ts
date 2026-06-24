import { describe, expect, it } from "vitest";
import { charactersAtMarket, currentKingdom, currentMarket, marketplaces, newGame } from "@/game/runtime/game";
import { dialogueChoices } from "@/game/characters/dialogue";

describe("dialogue navigation", () => {
  it("keeps nested personal and trade questions off the root menu", () => {
    const state = newGame();
    const character = charactersAtMarket(state)[0];
    const context = {
      market: currentMarket(state),
      markets: marketplaces,
      kingdom: currentKingdom(state),
      day: state.day,
    };

    const rootIds = dialogueChoices(character, context).map((choice) => choice.id);

    expect(rootIds).toEqual([
      "topics-personal",
      "topics-trade",
      "topics-world",
      "topics-work",
      "goodbye",
    ]);
    expect(dialogueChoices(character, context, "personal").map((choice) => choice.id)).toContain("who");
    expect(dialogueChoices(character, context, "trade").map((choice) => choice.id)).toEqual([
      "preference",
      "stock",
      "haggle",
      "back",
    ]);
  });
});
