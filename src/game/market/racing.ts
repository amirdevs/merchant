import type { Marketplace } from "@/shared/types/game-data";

export type RaceHorse = {
  name: string;
  color?: string;
  finishes: number[];
  bonus?: number;
};

export type RaceEntry = RaceHorse & {
  form: number;
  odds: number;
};

export type RaceResult = {
  marketIndex: number;
  day: number;
  horseName: string;
  wager: number;
  placement: number;
  payout: number;
  finishOrder: string[];
};

function raceHorses(market: Marketplace): RaceHorse[] {
  const horses = market.event?.data?.horses;
  return Array.isArray(horses) ? horses.filter((horse): horse is RaceHorse => Boolean(horse && typeof horse === "object" && "name" in horse && "finishes" in horse)) : [];
}

export function raceEntries(market: Marketplace): RaceEntry[] {
  const horses = raceHorses(market);
  return horses.map((horse) => {
    const form = horse.finishes.length ? horse.finishes.reduce((total, finish) => total + finish, 0) / horse.finishes.length : 5;
    const fieldStrength = horses.filter((other) => {
      const otherForm = other.finishes.length ? other.finishes.reduce((total, finish) => total + finish, 0) / other.finishes.length : 5;
      return otherForm < form;
    }).length;
    return { ...horse, form, odds: Math.max(2, Math.min(8, 2 + fieldStrength)) };
  });
}

function deterministicNoise(day: number, marketIndex: number, horseIndex: number) {
  let value = ((day + 1) * 1103515245 + (marketIndex + 1) * 12345 + (horseIndex + 1) * 2654435761) >>> 0;
  value ^= value >>> 13;
  return (value >>> 0) / 4294967296;
}

export function runHorseRace(market: Marketplace, horseName: string, wager: number, day: number): RaceResult | null {
  const entries = raceEntries(market);
  if (!entries.length || wager <= 0 || !entries.some((entry) => entry.name === horseName)) return null;
  const ranked = entries
    .map((entry, index) => ({
      ...entry,
      score: entry.form - (entry.bonus || 0) + deterministicNoise(day, market.index, index) * 4 - 2,
    }))
    .sort((left, right) => left.score - right.score);
  const placement = ranked.findIndex((entry) => entry.name === horseName) + 1;
  const selected = entries.find((entry) => entry.name === horseName)!;
  return {
    marketIndex: market.index,
    day,
    horseName,
    wager,
    placement,
    payout: placement === 1 ? wager * selected.odds : 0,
    finishOrder: ranked.map((entry) => entry.name),
  };
}
