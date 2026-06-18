export type MythSuit = "wild" | "harvest" | "prey" | "predator" | "arcane";

export type MythCard = {
  id: string;
  name: string;
  suit: MythSuit;
  power: number;
  rarity: 1 | 2 | 3 | 4;
  ability?: "surge" | "guard" | "gambit";
};

export type MythAiPersonality = "cautious" | "aggressive" | "collector" | "gambler" | "expert";

export type MythProgression = {
  collection: MythCard[];
  activeDeckIds: string[];
  deckPresets: MythDeckPreset[];
  trophies: string[];
  wins: number;
  losses: number;
};

export type MythDeckPreset = {
  id: string;
  name: string;
  cardIds: string[];
};

export type MythCardFilter = {
  suit?: MythSuit | "all";
  rarity?: MythCard["rarity"] | "all";
  sort?: "name" | "power" | "rarity" | "suit";
};

export type MythRound = {
  playerCard: MythCard;
  opponentCard: MythCard;
  winner: "player" | "opponent" | "draw";
};

export type MythSession = {
  opponentName: string;
  opponentArchetype: string;
  playerHand: MythCard[];
  opponentHand: MythCard[];
  rounds: MythRound[];
  playerPoints: number;
  opponentPoints: number;
  status: "active" | "player-won" | "opponent-won" | "draw";
  wager: number;
  prize: number;
  message: string;
  aiPersonality: MythAiPersonality;
};

const suits: MythSuit[] = ["wild", "harvest", "prey", "predator", "arcane"];
const counters: Record<MythSuit, MythSuit> = {
  wild: "arcane",
  harvest: "wild",
  prey: "harvest",
  predator: "prey",
  arcane: "predator",
};

function seedFrom(value: string) {
  return [...value].reduce((seed, character) => (seed * 31 + character.charCodeAt(0)) >>> 0, 2166136261);
}

function seeded(seed: number) {
  let value = seed || 1;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function preferredSuits(archetype: string): MythSuit[] {
  const normalized = archetype.toLowerCase();
  if (normalized.includes("plant") || normalized.includes("harvest")) return ["harvest", "prey"];
  if (normalized.includes("predator") || normalized.includes("prey")) return ["predator", "prey"];
  if (normalized.includes("wild")) return ["wild", "arcane"];
  if (normalized.includes("magic") || normalized.includes("arcane")) return ["arcane", "predator"];
  return suits;
}

export function mythDeck(archetype: string, seedSuffix = "") {
  const roll = seeded(seedFrom(`${archetype}:${seedSuffix}`));
  const preferred = preferredSuits(archetype);
  return Array.from({ length: 12 }, (_, index) => {
    const suit = roll() < 0.7 ? preferred[Math.floor(roll() * preferred.length)] : suits[Math.floor(roll() * suits.length)];
    const power = 2 + Math.floor(roll() * 7);
    const rarity = Math.max(1, Math.min(4, 1 + Math.floor(roll() * 4))) as MythCard["rarity"];
    const ability = rarity >= 3 ? (["surge", "guard", "gambit"] as const)[Math.floor(roll() * 3)] : undefined;
    return { id: `${archetype}:${seedSuffix}:${index}`, name: `${suit[0].toUpperCase()}${suit.slice(1)} ${power}`, suit, power, rarity, ability } satisfies MythCard;
  });
}

function drawHand(deck: MythCard[], count = 5) {
  return deck.slice().sort((left, right) => left.id.localeCompare(right.id)).slice(0, count);
}

export function createMythProgression(): MythProgression {
  const collection = mythDeck("balancedMerchant", "starter");
  const activeDeckIds = collection.slice(0, 8).map((card) => card.id);
  return {
    collection,
    activeDeckIds,
    deckPresets: [{ id: "starter", name: "Starter Table", cardIds: [...activeDeckIds] }],
    trophies: [],
    wins: 0,
    losses: 0,
  };
}

export function activeMythDeck(progression: MythProgression) {
  return progression.activeDeckIds.map((id) => progression.collection.find((card) => card.id === id)).filter((card): card is MythCard => Boolean(card));
}

export function ensureMythProgression(progression: MythProgression): MythProgression {
  if (!Array.isArray(progression.collection)) progression.collection = [];
  if (!Array.isArray(progression.activeDeckIds)) progression.activeDeckIds = [];
  if (!Array.isArray(progression.deckPresets)) progression.deckPresets = [];
  if (!Array.isArray(progression.trophies)) progression.trophies = [];
  if (typeof progression.wins !== "number") progression.wins = 0;
  if (typeof progression.losses !== "number") progression.losses = 0;
  progression.activeDeckIds = progression.activeDeckIds.filter((id) => progression.collection.some((card) => card.id === id)).slice(0, 12);
  if (progression.activeDeckIds.length < 5) {
    progression.activeDeckIds = progression.collection.slice(0, Math.min(8, progression.collection.length)).map((card) => card.id);
  }
  progression.deckPresets = progression.deckPresets
    .filter((preset) => preset && typeof preset.id === "string" && Array.isArray(preset.cardIds))
    .map((preset) => ({
      ...preset,
      name: preset.name || "Saved Deck",
      cardIds: preset.cardIds.filter((id) => progression.collection.some((card) => card.id === id)).slice(0, 12),
    }))
    .filter((preset) => preset.cardIds.length >= 5);
  if (!progression.deckPresets.length && progression.activeDeckIds.length >= 5) {
    progression.deckPresets.push({ id: "starter", name: "Starter Table", cardIds: [...progression.activeDeckIds] });
  }
  return progression;
}

export function toggleMythDeckCard(progression: MythProgression, cardId: string) {
  ensureMythProgression(progression);
  const index = progression.activeDeckIds.indexOf(cardId);
  if (index >= 0) {
    if (progression.activeDeckIds.length <= 5) return false;
    progression.activeDeckIds.splice(index, 1);
    return true;
  }
  if (progression.activeDeckIds.length >= 12 || !progression.collection.some((card) => card.id === cardId)) return false;
  progression.activeDeckIds.push(cardId);
  return true;
}

export function saveMythDeckPreset(progression: MythProgression, name = "Saved Table") {
  ensureMythProgression(progression);
  if (progression.activeDeckIds.length < 5 || progression.activeDeckIds.length > 12) return null;
  const id = `deck-${progression.deckPresets.length + 1}-${progression.activeDeckIds.join("-").length}`;
  const preset = { id, name, cardIds: [...progression.activeDeckIds] };
  progression.deckPresets = [preset, ...progression.deckPresets.filter((deck) => deck.cardIds.join("|") !== preset.cardIds.join("|"))].slice(0, 6);
  return preset;
}

export function loadMythDeckPreset(progression: MythProgression, presetId: string) {
  ensureMythProgression(progression);
  const preset = progression.deckPresets.find((deck) => deck.id === presetId);
  if (!preset || preset.cardIds.length < 5) return false;
  progression.activeDeckIds = preset.cardIds.filter((id) => progression.collection.some((card) => card.id === id)).slice(0, 12);
  return progression.activeDeckIds.length >= 5;
}

export function filterMythCards(collection: MythCard[], filter: MythCardFilter = {}) {
  const filtered = collection.filter((card) => {
    const suitOk = !filter.suit || filter.suit === "all" || card.suit === filter.suit;
    const rarityOk = !filter.rarity || filter.rarity === "all" || card.rarity === filter.rarity;
    return suitOk && rarityOk;
  });
  const sort = filter.sort || "name";
  return filtered.sort((left, right) => {
    if (sort === "power") return right.power - left.power || left.name.localeCompare(right.name);
    if (sort === "rarity") return right.rarity - left.rarity || right.power - left.power;
    if (sort === "suit") return left.suit.localeCompare(right.suit) || left.name.localeCompare(right.name);
    return left.name.localeCompare(right.name);
  });
}

export function addMythCard(progression: MythProgression, card: MythCard) {
  ensureMythProgression(progression);
  const copy = { ...card, id: `${card.id}:owned:${progression.collection.length}` };
  progression.collection.push(copy);
  return copy;
}

function personalityForArchetype(archetype: string): MythAiPersonality {
  const normalized = archetype.toLowerCase();
  if (normalized.includes("wild")) return "gambler";
  if (normalized.includes("predator")) return "aggressive";
  if (normalized.includes("plant") || normalized.includes("harvest")) return "cautious";
  if (normalized.includes("collector")) return "collector";
  return "expert";
}

export function startMythGame(options: { opponentName: string; opponentArchetype: string; day: number; wager?: number; prize?: number; playerDeck?: MythCard[]; aiPersonality?: MythAiPersonality }): MythSession {
  return {
    opponentName: options.opponentName,
    opponentArchetype: options.opponentArchetype,
    playerHand: drawHand(options.playerDeck?.length ? options.playerDeck : mythDeck("balancedMerchant", String(options.day))),
    opponentHand: drawHand(mythDeck(options.opponentArchetype, String(options.day))),
    rounds: [],
    playerPoints: 0,
    opponentPoints: 0,
    status: "active",
    wager: options.wager || 0,
    prize: options.prize || 0,
    message: `${options.opponentName} draws a hand of Myth cards.`,
    aiPersonality: options.aiPersonality || personalityForArchetype(options.opponentArchetype),
  };
}

export function compareMythCards(playerCard: MythCard, opponentCard: MythCard) {
  let playerPower = playerCard.power + (playerCard.ability === "surge" ? 1 : 0);
  let opponentPower = opponentCard.power + (opponentCard.ability === "surge" ? 1 : 0);
  if (counters[playerCard.suit] === opponentCard.suit) playerPower += 3;
  if (counters[opponentCard.suit] === playerCard.suit) opponentPower += 3;
  return playerPower === opponentPower ? "draw" : playerPower > opponentPower ? "player" : "opponent";
}

function chooseOpponentCard(session: MythSession, playerCard: MythCard) {
  if (session.aiPersonality === "gambler") {
    const index = (session.rounds.length * 7 + session.opponentName.length) % session.opponentHand.length;
    return index;
  }
  if (session.aiPersonality === "cautious") {
    const counterIndex = session.opponentHand.findIndex((card) => counters[card.suit] === playerCard.suit);
    if (counterIndex >= 0) return counterIndex;
    return session.opponentHand.reduce((best, card, index, hand) => card.power < hand[best].power ? index : best, 0);
  }
  if (session.aiPersonality === "collector") {
    return session.opponentHand.reduce((best, card, index, hand) => card.rarity > hand[best].rarity ? index : best, 0);
  }
  if (session.aiPersonality === "expert") {
    return session.opponentHand.reduce((best, card, index, hand) => {
      const score = card.power + (counters[card.suit] === playerCard.suit ? 3 : 0);
      const bestScore = hand[best].power + (counters[hand[best].suit] === playerCard.suit ? 3 : 0);
      return score > bestScore ? index : best;
    }, 0);
  }
  return session.opponentHand.reduce((best, card, index, hand) => card.power > hand[best].power ? index : best, 0);
}

export function playMythCard(session: MythSession, playerCardId: string) {
  if (session.status !== "active") return session.message;
  const playerIndex = session.playerHand.findIndex((card) => card.id === playerCardId);
  if (playerIndex < 0) return "Choose a card from your hand.";
  const playerCard = session.playerHand.splice(playerIndex, 1)[0];
  const opponentIndex = chooseOpponentCard(session, playerCard);
  const opponentCard = session.opponentHand.splice(opponentIndex, 1)[0];
  const winner = compareMythCards(playerCard, opponentCard);
  session.rounds.push({ playerCard, opponentCard, winner });
  if (winner === "player") session.playerPoints += 1;
  if (winner === "opponent") session.opponentPoints += 1;
  session.message = `${playerCard.name} faced ${opponentCard.name}: ${winner}.`;

  if (!session.playerHand.length || session.playerPoints >= 3 || session.opponentPoints >= 3) {
    session.status = session.playerPoints === session.opponentPoints ? "draw" : session.playerPoints > session.opponentPoints ? "player-won" : "opponent-won";
    session.message = session.status === "player-won"
      ? `You defeated ${session.opponentName} ${session.playerPoints}-${session.opponentPoints}.`
      : session.status === "opponent-won"
        ? `${session.opponentName} won ${session.opponentPoints}-${session.playerPoints}.`
        : `The Myth match ended in a ${session.playerPoints}-${session.opponentPoints} draw.`;
  }
  return session.message;
}
