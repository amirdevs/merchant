import type { Character, InventoryEntry, Item } from "@/shared/types/game-data";
import type { NpcRelation } from "@/game/characters/reputation";
import { itemIsIllegal } from "@/game/trade/legal";

export type NpcRole =
  | "guard"
  | "thief"
  | "beggar"
  | "traveler"
  | "plunderer"
  | "snitch"
  | "guild-official"
  | "merchant";

export function npcRoles(character: Character): NpcRole[] {
  const profession = character.profession.toLowerCase();
  const roles = new Set<NpcRole>();
  if (profession.includes("guard") || profession === "soldier") roles.add("guard");
  if (profession.includes("thief") || character.professionSlug === "thief") roles.add("thief");
  if (character.isBeggar || profession.includes("beggar")) roles.add("beggar");
  if (character.isTraveler) roles.add("traveler");
  if (character.isPlunderer) roles.add("plunderer");
  if (character.isSnitch) roles.add("snitch");
  if (character.vote || /quartermaster|herald|diplomat|guild/.test(profession)) roles.add("guild-official");
  if (!roles.size || character.isMerchant) roles.add("merchant");
  return [...roles];
}

export function roleLabel(character: Character) {
  return npcRoles(character).map((role) => role.replace("-", " ")).join(", ");
}

export function npcBudgetMultiplier(character: Character, relation: NpcRelation | null) {
  const roles = npcRoles(character);
  let multiplier = 1;
  if (roles.includes("traveler")) multiplier += 0.2;
  if (roles.includes("guild-official")) multiplier += 0.15;
  if (roles.includes("beggar")) multiplier = Math.min(multiplier, 0.25);
  if (roles.includes("plunderer")) multiplier += 0.1;
  multiplier += Math.max(-0.2, Math.min(0.3, (relation?.trust || 0) * 0.03));
  return Math.max(0.1, multiplier);
}

export function reputationMinimum(character: Character, characterValue: number) {
  const roles = npcRoles(character);
  if (roles.includes("guild-official") && characterValue >= 500) return 2;
  if (roles.includes("guard") && characterValue >= 250) return 1;
  return -Infinity;
}

export function offeredIllegalItems(inventory: InventoryEntry[], items: Item[], illegalTags: string[]) {
  return inventory.filter((entry) => entry.offerQuantity > 0 && itemIsIllegal(items[entry.itemIndex], illegalTags));
}

export function roleTradeBlock(options: {
  character: Character;
  relation: NpcRelation;
  playerInventory: InventoryEntry[];
  items: Item[];
  illegalTags: string[];
  characterValue: number;
}) {
  const { character, relation, playerInventory, items, illegalTags, characterValue } = options;
  const roles = npcRoles(character);
  const illegal = offeredIllegalItems(playerInventory, items, illegalTags);

  if (illegal.length && roles.includes("guard")) {
    return `${character.name} refuses contraband offered in plain sight.`;
  }
  if (illegal.length && roles.includes("snitch") && !roles.includes("thief")) {
    return `${character.name} lowers their voice and threatens to report the contraband.`;
  }
  const minimum = reputationMinimum(character, characterValue);
  if (relation.trust < minimum) {
    return `${character.name} reserves valuable business for merchants they trust. Trust ${minimum} required.`;
  }
  return null;
}

export function fairMatchChance(character: Character, relation: NpcRelation, playerValue: number, characterValue: number) {
  if (characterValue <= 0 || playerValue >= characterValue) return 0;
  const ratio = playerValue / characterValue;
  if (ratio < 0.9) return 0;
  const roles = npcRoles(character);
  let chance = 0.1 + (ratio - 0.9) * 3;
  chance += Math.max(-0.1, Math.min(0.25, relation.trust * 0.025));
  chance += Math.max(-0.08, Math.min(0.12, relation.mood * 0.015));
  if (roles.includes("traveler")) chance += 0.08;
  if (roles.includes("beggar")) chance += 0.15;
  if (roles.includes("plunderer")) chance -= 0.15;
  return Math.max(0, Math.min(0.75, chance));
}

export function deterministicTradeRoll(day: number, characterIndex: number, offersMade: number) {
  let value = ((day + 1) * 2654435761 + (characterIndex + 1) * 2246822519 + (offersMade + 1) * 3266489917) >>> 0;
  value ^= value >>> 16;
  return (value >>> 0) / 4294967296;
}

export function safetyNetGiftAllowed(character: Character, relation: NpcRelation, playerCargoValue: number, giftValue: number) {
  if (giftValue <= 0 || giftValue > 25 || playerCargoValue > 80) return false;
  const roles = npcRoles(character);
  return relation.trust >= 2 || roles.includes("beggar") || roles.includes("traveler") || roles.includes("guild-official");
}

export function roleReactionSuffix(character: Character) {
  const roles = npcRoles(character);
  if (roles.includes("beggar")) return "The kindness will be remembered on the street.";
  if (roles.includes("guard")) return "The guard records the exchange carefully.";
  if (roles.includes("thief")) return "The thief checks every edge of the bargain.";
  if (roles.includes("traveler")) return "The traveler values a quick agreement before the road calls.";
  if (roles.includes("plunderer")) return "The plunderer respects strength more than courtesy.";
  if (roles.includes("guild-official")) return "Word of the bargain may travel through the guild.";
  return "";
}
