import { describe, expect, it } from "vitest";
import type { Marketplace } from "@/data/types";
import { eventBiases, eventIsActive, marketEventPreviews, nextEventDay } from "./events";

function eventMarket(frequency: string, name = "Auction"): Marketplace {
  return {
    index: 0,
    name: "Riverton",
    kingdomIndex: 0,
    townsquareFile: "",
    backdropFile: "",
    stallage: 0,
    event: { name, frequency },
    connections: [],
  };
}

describe("market events", () => {
  it("uses exact weekly weekdays", () => {
    const market = eventMarket("Every Thursday");

    expect(eventIsActive(market, 4)).toBe(true);
    expect(eventIsActive(market, 5)).toBe(false);
    expect(nextEventDay(market, 5)).toBe(11);
  });

  it("marks today's events active in calendar previews", () => {
    const preview = marketEventPreviews([eventMarket("Every Thursday")], 4)[0];

    expect(preview).toMatchObject({ active: true, nextDay: 4, marketName: "Riverton" });
  });

  it("applies temporary demand during active events", () => {
    const market = eventMarket("Every Thursday");

    expect(eventBiases(market, 4)).toEqual(expect.arrayContaining([{ tag: "jewelry", percent: 20 }]));
    expect(eventBiases(market, 5)).toEqual([]);
  });
});
