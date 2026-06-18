import { describe, expect, it } from "vitest";
import type { Marketplace } from "@/data/types";
import { raceEntries, runHorseRace } from "./racing";

const market: Marketplace = {
  index: 8,
  name: "Dauphine Coast",
  kingdomIndex: 0,
  townsquareFile: "",
  backdropFile: "",
  stallage: 0,
  event: {
    name: "Horse Race",
    frequency: "Every Tuesday",
    data: {
      horses: [
        { name: "Swift", finishes: [1, 2, 1], bonus: 0 },
        { name: "Steady", finishes: [3, 2, 3], bonus: 0 },
        { name: "Wild", finishes: [6, 1, 5], bonus: 0 },
      ],
    },
  },
  connections: [],
};

describe("horse racing", () => {
  it("derives odds from historical form", () => {
    const entries = raceEntries(market);
    expect(entries[0]).toMatchObject({ name: "Swift", odds: 2 });
    expect(entries[2].odds).toBeGreaterThan(entries[0].odds);
  });

  it("produces deterministic race results and payouts", () => {
    const result = runHorseRace(market, "Swift", 10, 2);
    expect(result).not.toBeNull();
    expect(runHorseRace(market, "Swift", 10, 2)).toEqual(result);
    expect(result?.finishOrder).toHaveLength(3);
    expect(result?.payout).toBe(result?.placement === 1 ? 20 : 0);
  });
});
