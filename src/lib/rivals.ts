import type { Character, Item, Marketplace } from "@/data/types";
import type { MarketSimulation } from "./market-simulation";

export type RivalMerchant = {
  id: string;
  name: string;
  personality: "cautious" | "aggressive" | "collector" | "smuggler";
  marketIndex: number;
  wealth: number;
  favoriteTags: string[];
  lastMovedDay: number;
  tradesCompleted: number;
};

export type RivalState = {
  merchants: RivalMerchant[];
  activityLog: string[];
};

function personalityFor(character: Character): RivalMerchant["personality"] {
  const profession = character.profession.toLowerCase();
  if (profession.includes("thief")) return "smuggler";
  if (profession.includes("collector") || profession.includes("librarian")) return "collector";
  if ((character.hagglePercent || 0) >= 20) return "aggressive";
  return "cautious";
}

export function createRivalState(characters: Character[]): RivalState {
  const candidates = characters.filter((character) => character.isTraveler && character.isMerchant).slice(0, 6);
  return {
    merchants: candidates.map((character) => ({
      id: `rival:${character.index}`,
      name: character.name,
      personality: personalityFor(character),
      marketIndex: character.marketplaceIndex,
      wealth: Math.max(80, character.maxObtainValue || 100),
      favoriteTags: (character.bias || []).filter((bias) => bias.percent > 0).sort((left, right) => right.percent - left.percent).slice(0, 3).map((bias) => bias.tag),
      lastMovedDay: 1,
      tradesCompleted: 0,
    })),
    activityLog: [],
  };
}

function nextMarket(rival: RivalMerchant, markets: Marketplace[], day: number) {
  const market = markets[rival.marketIndex];
  if (!market?.connections.length) return rival.marketIndex;
  const index = (day + rival.name.length + rival.tradesCompleted) % market.connections.length;
  return market.connections[index].marketplaceIndex;
}

function pressureTag(rival: RivalMerchant, market: Marketplace) {
  return rival.favoriteTags[0] || market.bias?.find((bias) => bias.percent > 0)?.tag || "food";
}

export function advanceRivals(options: {
  rivals: RivalState;
  simulation: MarketSimulation;
  markets: Marketplace[];
  items: Item[];
  day: number;
}) {
  const activities: string[] = [];
  for (const rival of options.rivals.merchants) {
    if (options.day <= rival.lastMovedDay) continue;
    const destinationIndex = nextMarket(rival, options.markets, options.day);
    rival.marketIndex = destinationIndex;
    rival.lastMovedDay = options.day;
    rival.tradesCompleted += 1;
    const destination = options.markets[destinationIndex];
    const tag = pressureTag(rival, destination);
    const marketState = options.simulation[String(destinationIndex)] ??= { tagShifts: {}, lastUpdatedDay: options.day };
    const pressure = rival.personality === "aggressive" ? 12 : rival.personality === "collector" ? 9 : 6;
    marketState.tagShifts[tag] = Math.min(120, (marketState.tagShifts[tag] || 0) + pressure);
    const profit = 8 + pressure;
    rival.wealth += profit;
    activities.push(`${rival.name} reached ${destination.name} and bought heavily in ${tag}.`);
  }
  if (activities.length) options.rivals.activityLog = [...activities, ...options.rivals.activityLog].slice(0, 40);
  return activities;
}

export function rivalsAtMarket(rivals: RivalState, marketIndex: number) {
  return rivals.merchants.filter((rival) => rival.marketIndex === marketIndex);
}
