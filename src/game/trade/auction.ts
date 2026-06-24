import type { Item, Marketplace } from "@/shared/types/game-data";
import { itemMatchesCatalogToken } from "@/game/trade/item-catalog";

export type AuctionLot = {
  id: string;
  itemIndex: number;
  quantity: number;
  openingBid: number;
  rivalLimit: number;
};

export type AuctionSession = {
  marketIndex: number;
  day: number;
  lotIndex: number;
  lots: AuctionLot[];
  highestBid: number;
  leader: "none" | "player" | "rival";
  status: "active" | "finished";
  message: string;
  playerWins: number;
  rivalWins: number;
};

function seeded(seed: number) {
  let value = seed || 1;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function isAuctionCandidate(item: Item) {
  return !item.unique
    && item.loafValue >= 2
    && item.loafValue <= 400
    && !itemMatchesCatalogToken(item, "currency")
    && !itemMatchesCatalogToken(item, "coins")
    && !item.name.toLowerCase().includes("coin");
}

export function createAuctionSession(market: Marketplace, items: Item[], day: number): AuctionSession {
  const roll = seeded((market.index + 1) * 9187 + day * 313);
  const candidates = items.filter(isAuctionCandidate);
  const lots: AuctionLot[] = [];
  const used = new Set<number>();
  while (lots.length < 6 && used.size < candidates.length) {
    const item = candidates[Math.floor(roll() * candidates.length)];
    if (!item || used.has(item.index)) continue;
    used.add(item.index);
    const quantity = item.loafValue <= 20 ? 1 + Math.floor(roll() * 4) : 1;
    const baseValue = item.loafValue * quantity;
    const openingBid = Math.max(1, Math.floor(baseValue * (0.35 + roll() * 0.2)));
    const rivalLimit = Math.max(openingBid + 1, Math.floor(baseValue * (0.7 + roll() * 0.65)));
    lots.push({
      id: `${market.index}:${day}:${item.index}`,
      itemIndex: item.index,
      quantity,
      openingBid,
      rivalLimit,
    });
  }
  return {
    marketIndex: market.index,
    day,
    lotIndex: 0,
    lots,
    highestBid: 0,
    leader: "none",
    status: lots.length ? "active" : "finished",
    message: lots.length ? "The auctioneer presents the first lot." : "No suitable auction lots were found.",
    playerWins: 0,
    rivalWins: 0,
  };
}

export function currentAuctionLot(session: AuctionSession) {
  return session.lots[session.lotIndex] || null;
}

export function nextAuctionBid(session: AuctionSession) {
  const lot = currentAuctionLot(session);
  if (!lot) return 0;
  const increment = Math.max(1, Math.ceil(lot.openingBid * 0.15));
  return session.highestBid > 0 ? session.highestBid + increment : lot.openingBid;
}

export function rivalTell(session: AuctionSession) {
  const lot = currentAuctionLot(session);
  if (!lot) return "The benches are emptying.";
  const pressure = session.highestBid / lot.rivalLimit;
  if (pressure >= 0.9) return "The rival bidder avoids the auctioneer's gaze and grips the bid card.";
  if (pressure >= 0.65) return "The rival bidder pauses before every raise.";
  if (pressure >= 0.35) return "The rival bidder remains attentive but no longer relaxed.";
  return "The rival bidder looks comfortable and confident.";
}

function advanceLot(session: AuctionSession) {
  session.lotIndex += 1;
  session.highestBid = 0;
  session.leader = "none";
  if (session.lotIndex >= session.lots.length) {
    session.status = "finished";
    session.message = `Auction complete. You won ${session.playerWins} lot${session.playerWins === 1 ? "" : "s"}.`;
  }
}

export function placeAuctionBid(session: AuctionSession, availableCopper: number) {
  if (session.status !== "active") return { outcome: "finished" as const, cost: 0, lot: null, message: "The auction has ended." };
  const lot = currentAuctionLot(session);
  if (!lot) return { outcome: "finished" as const, cost: 0, lot: null, message: "No lot is currently open." };
  const bid = nextAuctionBid(session);
  if (availableCopper < bid) {
    session.message = `You need ${bid} copper to raise the bid.`;
    return { outcome: "unaffordable" as const, cost: 0, lot, message: session.message };
  }

  session.highestBid = bid;
  session.leader = "player";
  const rivalIncrement = Math.max(1, Math.ceil(lot.openingBid * 0.15));
  if (bid + rivalIncrement <= lot.rivalLimit) {
    session.highestBid = bid + rivalIncrement;
    session.leader = "rival";
    session.message = `A rival counters at ${session.highestBid} copper.`;
    return { outcome: "countered" as const, cost: 0, lot, message: session.message };
  }

  const cost = bid;
  session.playerWins += 1;
  const wonLot = { ...lot };
  advanceLot(session);
  const message = `Won ${wonLot.quantity} item${wonLot.quantity === 1 ? "" : "s"} for ${cost} copper.`;
  session.message = message;
  return { outcome: "won" as const, cost, lot: wonLot, message };
}

export function passAuctionLot(session: AuctionSession) {
  if (session.status !== "active") return "The auction has ended.";
  const lot = currentAuctionLot(session);
  if (!lot) return "No lot is currently open.";
  if (session.leader === "rival") session.rivalWins += 1;
  const message = session.leader === "rival"
    ? `You pass. The rival wins the lot for ${session.highestBid} copper.`
    : "You pass and the auctioneer withdraws the lot.";
  advanceLot(session);
  session.message = message;
  return message;
}
