import { describe, expect, it } from "vitest";
import { activeMythDeck, compareMythCards, createMythProgression, mythDeck, playMythCard, startMythGame, toggleMythDeckCard } from "./myth";

describe("Myth card game", () => {
  it("builds stable archetype decks", () => {
    expect(mythDeck("plantsHarvest", "1")).toEqual(mythDeck("plantsHarvest", "1"));
    expect(mythDeck("plantsHarvest", "1")).toHaveLength(12);
  });

  it("applies suit counters in addition to card power", () => {
    expect(compareMythCards(
      { id: "1", name: "Harvest", suit: "harvest", power: 4, rarity: 1 },
      { id: "2", name: "Wild", suit: "wild", power: 6, rarity: 1 }
    )).toBe("player");
  });

  it("persists a valid player collection and editable deck", () => {
    const progression = createMythProgression();
    const removed = progression.activeDeckIds[0];
    expect(toggleMythDeckCard(progression, removed)).toBe(true);
    expect(activeMythDeck(progression)).toHaveLength(7);
  });

  it("assigns different opponent personalities", () => {
    expect(startMythGame({ opponentName: "A", opponentArchetype: "randomWild", day: 1 }).aiPersonality).toBe("gambler");
    expect(startMythGame({ opponentName: "B", opponentArchetype: "preyPredator", day: 1 }).aiPersonality).toBe("aggressive");
  });

  it("plays a complete deterministic match", () => {
    const session = startMythGame({ opponentName: "Casey", opponentArchetype: "randomWild", day: 3 });
    while (session.status === "active") playMythCard(session, session.playerHand[0].id);

    expect(session.rounds.length).toBeGreaterThanOrEqual(3);
    expect(["player-won", "opponent-won", "draw"]).toContain(session.status);
  });
});
