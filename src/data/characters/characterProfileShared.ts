import type { Character } from "@/data/types";
import type { CharacterExpression } from "./characterProfileTypes";

export type CharacterProfileView = {
  readonly id: string | null;
  readonly name: string;
  readonly profession: string;
  readonly portraitSrc: string;
  readonly story: string;
  readonly marketFlavor: string;
  readonly tradePersonality: string;
  readonly roleTags: readonly string[];
  readonly gameplayGroups: readonly string[];
  readonly ancestryOrSpecies?: string;
  readonly magicalTraits: readonly string[];
  readonly visualIdentity: string;
};

export function fallbackCharacterProfileView(character: Character): CharacterProfileView {
  return {
    id: null,
    name: character.name,
    profession: character.profession,
    portraitSrc: "",
    story: character.dialogue?.who || "A trader with unfinished business at the stall.",
    marketFlavor: character.dialogue?.preference || "A customer watches the market and weighs the deal carefully.",
    tradePersonality: character.dialogue?.preference || "Practical and price-conscious.",
    roleTags: [],
    gameplayGroups: [],
    ancestryOrSpecies: undefined,
    magicalTraits: [],
    visualIdentity: "Character profile pending.",
  };
}

export function fallbackCharacterDisplayName(character: Character) {
  return fallbackCharacterProfileView(character).name;
}

export function tradePortraitExpression(playerAdvantage: number, mood = 0): CharacterExpression {
  if (mood <= -3) return "angry";
  if (mood < 0 || playerAdvantage < -200) return "suspicious";
  if (playerAdvantage >= 250) return "happy";
  return "neutral";
}
