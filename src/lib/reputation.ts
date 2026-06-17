import type { Character } from "@/data/types";

export type NpcRelation = {
  trust: number;
  mood: number;
  patience: number;
  failedOffers: number;
  trades: number;
};

export type NpcRelations = Record<string, NpcRelation>;

export function startingPatience(character: Character) {
  const frugalPenalty = Math.floor((character.frugalPercent || 0) / 10);
  const haggleBonus = Math.floor((character.hagglePercent || 0) / 15);
  return Math.max(3, Math.min(8, 5 + haggleBonus - frugalPenalty));
}

export function createNpcRelation(character: Character): NpcRelation {
  return {
    trust: 0,
    mood: 0,
    patience: startingPatience(character),
    failedOffers: 0,
    trades: 0,
  };
}

export function relationFor(relations: NpcRelations | undefined, character: Character | null) {
  if (!character) return null;
  return relations?.[character.index] || createNpcRelation(character);
}

export function ensureRelation(relations: NpcRelations, character: Character) {
  const key = String(character.index);
  relations[key] ??= createNpcRelation(character);
  return relations[key];
}

export function trustLabel(relation: NpcRelation | null) {
  if (!relation) return "New";
  if (relation.trust >= 8) return "Favored";
  if (relation.trust >= 4) return "Trusted";
  if (relation.trust >= 1) return "Familiar";
  if (relation.trust <= -5) return "Insulted";
  if (relation.trust <= -2) return "Wary";
  return "New";
}

export function moodLabel(relation: NpcRelation | null) {
  if (!relation) return "Open";
  if (relation.mood >= 5) return "Warm";
  if (relation.mood >= 2) return "Pleased";
  if (relation.mood <= -5) return "Angry";
  if (relation.mood <= -2) return "Irritated";
  return "Open";
}

export function patienceLabel(relation: NpcRelation | null) {
  if (!relation) return "Fair";
  if (relation.patience >= 6) return "Patient";
  if (relation.patience >= 3) return "Fair";
  if (relation.patience >= 1) return "Thin";
  return "Leaving";
}

export function ultimatumActive(relation: NpcRelation | null) {
  return Boolean(relation && relation.patience <= 1);
}

export function reactionText(appraisal: string, character: Character) {
  switch (appraisal) {
    case "great_deal":
      return `${character.name} studies the scales, then smiles at the generous bargain.`;
    case "good_deal":
      return `${character.name} nods. The offer is better than fair.`;
    case "fair_deal":
      return `${character.name} accepts the balance of the trade.`;
    case "close":
      return `${character.name} hesitates. That is close, but not enough.`;
    case "reaching":
      return `${character.name} frowns at the gap between the offers.`;
    case "far":
      return `${character.name} looks offended by the bargain.`;
    default:
      return `${character.name} refuses to entertain the offer.`;
  }
}
