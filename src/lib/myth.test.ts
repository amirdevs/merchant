import { describe, expect, it } from "vitest";
import { compareMythCards, mythDeck, playMythCard, startMythGame } from "./myth";

describe("Myth card game", () => {
  it("builds stable archetype decks", () => {
    expect(mythDeck("plantsHarvest", "1")).toEqual(mythDeck("plantsHarvest", "1"));
    expect(mythDeck("plantsHarvest", "1")).toHaveLength(12);
  });

  it("applies suit counters in addition to card power", () => {
    expect(compareMythCards(
      { id: "1", name: "Harvest", suit: "harvest", power: 4 },
      { id: "2", name: "Wild", suit: "wild", power: 6 }
    )).toBe("player");
  });

  it("plays a complete deterministic match", () => {
    const session = startMythGame({ opponentName: "Casey", opponentArchetype: "randomWild", day: 3 });
    while (session.status === "active") playMythCard(session, session.playerHand[0].id);

    expect(session.rounds.length).toBeGreaterThanOrEqual(3);
    expect(["player-won", "opponent-won", "draw"]).toContain(session.status);
  });
});
