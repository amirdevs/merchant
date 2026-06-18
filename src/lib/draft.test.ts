import { describe, expect, it } from "vitest";
import type { Item, Marketplace } from "@/data/types";
import { createDraftSession, currentDraftRound, pickDraftItem } from "./draft";

const market = { index: 5, name: "Citadel" } as Marketplace;
const items: Item[] = Array.from({ length: 20 }, (_, index) => ({
  index,
  name: `Magic ${index}`,
  tags: ["magic"],
  loafValue: 10 + index,
  size: 1,
  weight: 1,
  kingdomIndex: null,
  rarity: 2,
}));

describe("magic draft", () => {
  it("generates deterministic rounds without duplicate choices", () => {
    const session = createDraftSession(market, items, 5);
    expect(session.rounds).toHaveLength(5);
    expect(new Set(session.rounds.flatMap((round) => round.choices)).size).toBe(15);
    expect(createDraftSession(market, items, 5).rounds).toEqual(session.rounds);
  });

  it("transfers the player pick and lets the rival choose", () => {
    const session = createDraftSession(market, items, 5);
    const choice = currentDraftRound(session)!.choices[0];
    const result = pickDraftItem(session, choice, items);
    expect(result).toMatchObject({ ok: true, pickedItemIndex: choice });
    expect(session.rivalPicks).toHaveLength(1);
  });
});
