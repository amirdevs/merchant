import { describe, expect, it } from "vitest";
import { activeMythDeck, compareMythCards, createMythProgression, ensureMythProgression, filterMythCards, loadMythDeckPreset, mythDeck, playMythCard, saveMythDeckPreset, startMythGame, toggleMythDeckCard } from "@/game/market/myth";

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

  it("saves and loads deck presets", () => {
    const progression = createMythProgression();
    const original = [...progression.activeDeckIds];
    const preset = saveMythDeckPreset(progression, "Counter Table");
    expect(preset?.cardIds).toEqual(original);

    toggleMythDeckCard(progression, original[0]);
    expect(loadMythDeckPreset(progression, preset?.id || "")).toBe(true);
    expect(progression.activeDeckIds).toEqual(original);
  });

  it("migrates old progressions and filters collections", () => {
    const progression = createMythProgression();
    const migrated = ensureMythProgression({ ...progression, deckPresets: undefined as never });
    expect(migrated.deckPresets.length).toBeGreaterThan(0);
    expect(filterMythCards(migrated.collection, { rarity: 4, sort: "power" }).every((card) => card.rarity === 4)).toBe(true);
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
