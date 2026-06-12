import type { Character, GameStateLike } from "./state-types";

export function charactersAtMarket<T extends GameStateLike>(state: T) {
  return state.characters.filter(
    (character) =>
      character.isActive &&
      !character.isPlunderer &&
      (character.marketplaceIndex === state.marketIndex || character.marketplaces?.includes(state.marketIndex))
  );
}

export function selectedCharacter<T extends GameStateLike>(state: T) {
  if (state.selectedCharacterIndex === null) return null;
  return state.characters[state.selectedCharacterIndex] || null;
}

export function nextCustomerIndex<T extends GameStateLike>(state: T) {
  const visible = charactersAtMarket(state);
  if (!visible.length) return null;
  if (state.selectedCharacterIndex === null) return visible[0].index;
  const currentPosition = visible.findIndex((character: Character) => character.index === state.selectedCharacterIndex);
  const next = visible[(currentPosition + 1 + visible.length) % visible.length];
  return next.index;
}

