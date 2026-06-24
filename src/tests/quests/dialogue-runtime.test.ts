import { describe, expect, it } from "vitest";
import { applyDialogueEffect } from "@/game/characters/dialogue-runtime";
import { dialogueChoices } from "@/game/characters/dialogue";
import { newGame } from "@/game/runtime/game";

describe("dialogue graph runtime", () => {
  it("navigates through typed topic nodes", () => {
    const state = newGame();
    const character = state.characters.find((entry) => entry.dialogue?.who) || state.characters[2];
    const root = dialogueChoices(character, {}, "root");
    const tradeRoute = root.find((choice) => choice.nextNode === "trade");

    expect(tradeRoute?.id).toBe("topics-trade");
    expect(dialogueChoices(character, {}, tradeRoute?.nextNode).map((choice) => choice.id)).toEqual(expect.arrayContaining(["preference", "stock", "haggle", "back"]));
  });

  it("uses a registered effect to accept the local quest", () => {
    const state = newGame();
    const questMarket = state.marketIndex;
    const character = state.characters[2];
    const message = applyDialogueEffect(state, character, "accept-local-quest");

    if (message?.includes("accepted")) expect(state.questStates[String(questMarket)]).toBe("accepted");
    else expect(message).toContain("no local quest");
  });
});
