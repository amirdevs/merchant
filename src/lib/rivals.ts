import type { Character, Item, Marketplace } from "@/data/types";
import type { MarketSimulation } from "./market-simulation";

export type RivalMerchant = {
  id: string;
  name: string;
  personality: "cautious" | "aggressive" | "collector" | "smuggler";
  strategy: "hoard" | "flip" | "smuggle" | "undercut";
  marketIndex: number;
  wealth: number;
  debt: number;
  favoriteTags: string[];
  cargoManifest: RivalCargo[];
  routeHabit: string;
  lastMovedDay: number;
  tradesCompleted: number;
};

export type RivalCargo = {
  tag: string;
  quantity: number;
  value: number;
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

function strategyFor(personality: RivalMerchant["personality"]): RivalMerchant["strategy"] {
  if (personality === "smuggler") return "smuggle";
  if (personality === "collector") return "hoard";
  if (personality === "aggressive") return "undercut";
  return "flip";
}

function startingManifest(character: Character, favoriteTags: string[]): RivalCargo[] {
  const tags = favoriteTags.length ? favoriteTags : ["food", "tools"];
  return tags.slice(0, 3).map((tag, index) => ({
    tag,
    quantity: Math.max(1, 2 + index + Math.floor((character.maxObtainValue || 80) / 90)),
    value: Math.max(10, Math.floor((character.maxObtainValue || 80) * (0.18 + index * 0.08))),
  }));
}

export function createRivalState(characters: Character[]): RivalState {
  const candidates = characters.filter((character) => character.isTraveler && character.isMerchant).slice(0, 6);
  return {
    merchants: candidates.map((character) => {
      const personality = personalityFor(character);
      const favoriteTags = (character.bias || []).filter((bias) => bias.percent > 0).sort((left, right) => right.percent - left.percent).slice(0, 3).map((bias) => bias.tag);
      return {
        id: `rival:${character.index}`,
        name: character.name,
        personality,
        strategy: strategyFor(personality),
        marketIndex: character.marketplaceIndex,
        wealth: Math.max(80, character.maxObtainValue || 100),
        debt: personality === "aggressive" ? 35 : personality === "smuggler" ? 20 : 0,
        favoriteTags,
        cargoManifest: startingManifest(character, favoriteTags),
        routeHabit: "local circuit",
        lastMovedDay: 1,
        tradesCompleted: 0,
      };
    }),
    activityLog: [],
  };
}

export function ensureRivalState(rivals: RivalState, characters: Character[] = []) {
  if (!Array.isArray(rivals.merchants)) rivals.merchants = createRivalState(characters).merchants;
  if (!Array.isArray(rivals.activityLog)) rivals.activityLog = [];
  for (const rival of rivals.merchants) {
    if (!rival.strategy) rival.strategy = strategyFor(rival.personality);
    if (typeof rival.debt !== "number") rival.debt = rival.personality === "aggressive" ? 35 : 0;
    if (!Array.isArray(rival.favoriteTags)) rival.favoriteTags = [];
    if (!Array.isArray(rival.cargoManifest) || !rival.cargoManifest.length) {
      rival.cargoManifest = (rival.favoriteTags.length ? rival.favoriteTags : ["mixed goods"]).slice(0, 3).map((tag, index) => ({ tag, quantity: 2 + index, value: 20 + index * 15 }));
    }
    if (!rival.routeHabit) rival.routeHabit = "local circuit";
  }
  return rivals;
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

function updateManifest(rival: RivalMerchant, tag: string, pressure: number, destination: Marketplace) {
  const existing = rival.cargoManifest.find((cargo) => cargo.tag === tag);
  if (existing) {
    existing.quantity += Math.max(1, Math.floor(pressure / 6));
    existing.value += pressure * 2;
  } else {
    rival.cargoManifest.unshift({ tag, quantity: Math.max(1, Math.floor(pressure / 6)), value: pressure * 3 });
  }
  rival.cargoManifest = rival.cargoManifest
    .sort((left, right) => right.value - left.value)
    .slice(0, 4);
  rival.routeHabit = `last seen working ${destination.name}`;
  if (rival.debt > 0 && rival.wealth > rival.debt * 2) rival.debt = Math.max(0, rival.debt - Math.ceil(pressure / 3));
  if (rival.personality === "aggressive" && rival.debt > 40) rival.strategy = "undercut";
  else if (rival.personality === "smuggler") rival.strategy = "smuggle";
  else if (rival.wealth > 220) rival.strategy = "hoard";
  else rival.strategy = strategyFor(rival.personality);
}

export function advanceRivals(options: {
  rivals: RivalState;
  simulation: MarketSimulation;
  markets: Marketplace[];
  items: Item[];
  day: number;
}) {
  const activities: string[] = [];
  ensureRivalState(options.rivals);
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
    updateManifest(rival, tag, pressure, destination);
    activities.push(`${rival.name} reached ${destination.name}, bought heavily in ${tag}, and now carries ${rival.cargoManifest[0]?.quantity || 0} lots of ${rival.cargoManifest[0]?.tag || tag}.`);
  }
  if (activities.length) options.rivals.activityLog = [...activities, ...options.rivals.activityLog].slice(0, 40);
  return activities;
}

export function rivalsAtMarket(rivals: RivalState, marketIndex: number) {
  return rivals.merchants.filter((rival) => rival.marketIndex === marketIndex);
}
