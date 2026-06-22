import { describe, expect, it } from "vitest";
import type { Item, Marketplace } from "@/data/types";
import { createAuctionSession, currentAuctionLot, nextAuctionBid, passAuctionLot, placeAuctionBid } from "./auction";

const market: Marketplace = {
  index: 7,
  name: "Riverton",
  kingdomIndex: 0,
  townsquareFile: "",
  backdropFile: "",
  stallage: 0,
  event: { name: "Auction", frequency: "Every Thursday" },
  connections: [],
};

const items: Item[] = Array.from({ length: 12 }, (_, index) => ({
  index,
  name: `Lot ${index}`,
  tags: ["goods"],
  loafValue: 10 + index * 5,
  size: 1,
  weight: 1,
  kingdomIndex: null,
}));

describe("auction session", () => {
  it("generates stable lots and bid steps", () => {
    const session = createAuctionSession(market, items, 4);

    expect(session.lots).toHaveLength(6);
    expect(nextAuctionBid(session)).toBe(currentAuctionLot(session)?.openingBid);
    expect(createAuctionSession(market, items, 4).lots).toEqual(session.lots);
  });

  it("rejects unaffordable bids", () => {
    const session = createAuctionSession(market, items, 4);

    expect(placeAuctionBid(session, 0).outcome).toBe("unaffordable");
    expect(session.lotIndex).toBe(0);
  });

  it("can outbid a rival and advance to the next lot", () => {
    const session = createAuctionSession(market, items, 4);
    const lot = currentAuctionLot(session)!;
    lot.rivalLimit = lot.openingBid;

    const result = placeAuctionBid(session, 1000);

    expect(result.outcome).toBe("won");
    expect(session.playerWins).toBe(1);
    expect(session.lotIndex).toBe(1);
  });

  it("passes rival-led lots", () => {
    const session = createAuctionSession(market, items, 4);
    session.leader = "rival";
    session.highestBid = 12;

    expect(passAuctionLot(session)).toContain("rival wins");
    expect(session.rivalWins).toBe(1);
  });
});
