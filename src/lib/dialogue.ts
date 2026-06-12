import type { Character } from "../data/types";

export function customerIntro(character: Character) {
  return character.dialogue?.who || `${character.name} is ready to trade.`;
}

export function customerPreference(character: Character) {
  return character.dialogue?.preference || "No stated preference.";
}

export function customerPrompt(character: Character) {
  return character.dialogue?.customQuestion || "What are you looking for?";
}

export function customerReply(character: Character) {
  return character.dialogue?.customReply || customerPreference(character);
}
