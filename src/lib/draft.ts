import type { Item, Marketplace } from "@/data/types";

export type DraftRound = {
  choices: number[];
  playerPick?: number;
  rivalPick?: number;
};

export type DraftSession = {
  marketIndex: number;
  day: number;
  roundIndex: number;
  rounds: DraftRound[];
  playerPicks: number[];
  rivalPicks: number[];
  status: "active" | "finished";
  message: string;
};

function seeded(seed: number) {
  let value = seed || 1;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

export function createDraftSession(market: Marketplace, items: Item[], day: number): DraftSession {
  const roll = seeded((market.index + 1) * 3571 + day * 101);
  const candidates = items.filter((item) => !item.unique && item.loafValue >= 5 && item.loafValue <= 300 && (item.tags.includes("magic") || item.tags.includes("cards") || item.rarity && item.rarity >= 2));
  const pool = candidates.length >= 15 ? candidates : items.filter((item) => !item.unique && item.loafValue >= 5 && item.loafValue <= 300);
  const used = new Set<number>();
  const rounds: DraftRound[] = [];
  while (rounds.length < 5 && used.size < pool.length) {
    const choices: number[] = [];
    while (choices.length < 3 && used.size < pool.length) {
      const item = pool[Math.floor(roll() * pool.length)];
      if (!item || used.has(item.index)) continue;
      used.add(item.index);
      choices.push(item.index);
    }
    if (choices.length) rounds.push({ choices });
  }
  return {
    marketIndex: market.index,
    day,
    roundIndex: 0,
    rounds,
    playerPicks: [],
    rivalPicks: [],
    status: rounds.length ? "active" : "finished",
    message: rounds.length ? "Choose one item; the rival drafts from what remains." : "No draft pool was available.",
  };
}

export function currentDraftRound(session: DraftSession) {
  return session.rounds[session.roundIndex] || null;
}

export function pickDraftItem(session: DraftSession, itemIndex: number, items: Item[]) {
  if (session.status !== "active") return { ok: false, pickedItemIndex: null, message: "The draft is complete." };
  const round = currentDraftRound(session);
  if (!round || !round.choices.includes(itemIndex)) return { ok: false, pickedItemIndex: null, message: "Choose one of the current draft items." };
  round.playerPick = itemIndex;
  session.playerPicks.push(itemIndex);
  const rivalPick = round.choices
    .filter((choice) => choice !== itemIndex)
    .sort((left, right) => (items[right]?.loafValue || 0) - (items[left]?.loafValue || 0))[0];
  if (rivalPick !== undefined) {
    round.rivalPick = rivalPick;
    session.rivalPicks.push(rivalPick);
  }
  session.roundIndex += 1;
  if (session.roundIndex >= session.rounds.length) {
    session.status = "finished";
    session.message = `Draft complete. You selected ${session.playerPicks.length} items.`;
  } else {
    session.message = `You drafted ${items[itemIndex]?.name || "an item"}; the rival selected ${items[rivalPick]?.name || "nothing"}.`;
  }
  return { ok: true, pickedItemIndex: itemIndex, message: session.message };
}
