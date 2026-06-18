import type { Bias, InventoryEntry, Item, Marketplace } from "@/data/types";

export type SimulatedMarket = {
  tagShifts: Record<string, number>;
  lastUpdatedDay: number;
};

export type MarketSimulation = Record<string, SimulatedMarket>;
export type MarketRumor = {
  text: string;
  reliability: "reliable" | "exaggerated" | "stale" | "false";
};

function marketState(simulation: MarketSimulation, marketIndex: number, day: number) {
  const key = String(marketIndex);
  simulation[key] ??= { tagShifts: {}, lastUpdatedDay: day };
  return simulation[key];
}

function decayValue(value: number, days: number) {
  const decay = days * 2;
  return value > 0 ? Math.max(0, value - decay) : Math.min(0, value + decay);
}

export function advanceMarketSimulation(simulation: MarketSimulation, day: number) {
  for (const state of Object.values(simulation)) {
    const elapsed = Math.max(0, day - state.lastUpdatedDay);
    if (!elapsed) continue;
    for (const [tag, value] of Object.entries(state.tagShifts)) {
      const next = decayValue(value, elapsed);
      if (next === 0) delete state.tagShifts[tag];
      else state.tagShifts[tag] = next;
    }
    state.lastUpdatedDay = day;
  }
}

function adjustEntry(state: SimulatedMarket, entry: InventoryEntry, items: Item[], direction: 1 | -1) {
  const item = items[entry.itemIndex];
  if (!item || entry.offerQuantity <= 0) return;
  const magnitude = Math.min(18, Math.max(1, entry.offerQuantity * 2));
  const tags = item.tags.slice(0, 3);
  if (!tags.length) tags.push(item.name.toLowerCase());
  for (const tag of tags) {
    state.tagShifts[tag] = Math.max(-60, Math.min(120, (state.tagShifts[tag] || 0) + magnitude * direction));
  }
}

export function recordMarketTrade(options: {
  simulation: MarketSimulation;
  marketIndex: number;
  day: number;
  playerSold: InventoryEntry[];
  playerBought: InventoryEntry[];
  items: Item[];
}) {
  advanceMarketSimulation(options.simulation, options.day);
  const state = marketState(options.simulation, options.marketIndex, options.day);
  for (const entry of options.playerSold) adjustEntry(state, entry, options.items, -1);
  for (const entry of options.playerBought) adjustEntry(state, entry, options.items, 1);
}

export function simulatedMarketBiases(simulation: MarketSimulation, market: Marketplace, day: number): Bias[] {
  const state = simulation[String(market.index)];
  if (!state) return [];
  const elapsed = Math.max(0, day - state.lastUpdatedDay);
  return Object.entries(state.tagShifts)
    .map(([tag, percent]) => [tag, decayValue(percent, elapsed)] as const)
    .filter(([, percent]) => Math.abs(percent) >= 1)
    .sort((left, right) => Math.abs(right[1]) - Math.abs(left[1]))
    .slice(0, 12)
    .map(([tag, percent]) => ({ tag, percent }));
}

export function marketRumors(simulation: MarketSimulation, market: Marketplace, day: number) {
  return marketRumorLedger(simulation, market, day).map((rumor) => rumor.text);
}

function rumorRoll(marketIndex: number, day: number, salt: number) {
  let value = ((marketIndex + 1) * 1103515245 + (day + 11) * 12345 + salt * 2654435761) >>> 0;
  value ^= value >>> 13;
  return (value >>> 0) / 4294967296;
}

export function marketRumorLedger(simulation: MarketSimulation, market: Marketplace, day: number): MarketRumor[] {
  const realRumors = simulatedMarketBiases(simulation, market, day)
    .filter((bias) => Math.abs(bias.percent) >= 10)
    .slice(0, 4)
    .map<MarketRumor>((bias, index) => {
      const roll = rumorRoll(market.index, day, index);
      const reliability: MarketRumor["reliability"] = roll > 0.82 ? "exaggerated" : roll > 0.68 ? "stale" : "reliable";
      const direction = bias.percent > 0 ? "scarce" : "flooding";
      const text = reliability === "exaggerated"
        ? `${bias.tag} is supposedly impossible to find in ${market.name}; prices may be overhyped.`
        : reliability === "stale"
          ? `Old road talk says ${bias.tag} was ${direction} in ${market.name}; verify before betting the wagon.`
          : bias.percent > 0
            ? `${bias.tag} is becoming scarce in ${market.name}; prices are climbing.`
            : `${bias.tag} is flooding ${market.name}; buyers are paying less.`;
      return { text, reliability };
    });

  if (realRumors.length >= 3) return realRumors;

  const bias = market.bias?.[Math.floor(rumorRoll(market.index, day, 99) * (market.bias?.length || 1))];
  if (!bias) return realRumors;
  const falseDirection = bias.percent > 0 ? "cheap" : "scarce";
  return realRumors.concat({
    reliability: "false",
    text: `A dockhand claims ${bias.tag} is ${falseDirection} in ${market.name}, but the story smells planted.`,
  }).slice(0, 4);
}
