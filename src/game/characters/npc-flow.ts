import type { Character, GameStateLike } from "@/game/runtime/state-types";
import marketplacesJson from "@/content/market/marketplaces.json";
import type { Marketplace } from "@/shared/types/game-data";
import { eventIsActive } from "@/game/market/events";

const marketplaces = marketplacesJson as Marketplace[];

function weekdayIndex(day: number) {
  return (Math.max(1, day) - 1) % 7;
}

function queueRoll(state: GameStateLike, character: Character) {
  let value = (
    (state.day + 1) * 2654435761 ^
    (state.marketIndex + 1) * 2246822519 ^
    (character.index + 1) * 3266489917
  ) >>> 0;
  value ^= value >>> 16;
  value = Math.imul(value, 2246822507) >>> 0;
  value ^= value >>> 13;
  return value >>> 0;
}

function customerPriority(state: GameStateLike, character: Character) {
  const market = marketplaces[state.marketIndex];
  const namedContact = market?.event?.characterName?.trim().toLowerCase();
  const isNamedContact = Boolean(namedContact && character.name.trim().toLowerCase() === namedContact);
  const questStatus = state.questStates?.[String(state.marketIndex)] || "offered";
  const questNeedsContact = Boolean(market?.quest && !["finished", "failed"].includes(questStatus));

  if (isNamedContact && questNeedsContact) return 0;
  if (isNamedContact && eventIsActive(market, state.day)) return 1;
  if (character.dayAvailable === weekdayIndex(state.day)) return 2;
  return 3;
}

export function charactersAtMarket<T extends GameStateLike>(state: T) {
  return state.characters
    .filter(
      (character) =>
      character.isActive &&
      !character.isPlunderer &&
      (character.dayAvailable === null ||
        character.dayAvailable === undefined ||
        character.dayAvailable === weekdayIndex(state.day)) &&
      (character.marketplaceIndex === state.marketIndex || character.marketplaces?.includes(state.marketIndex))
    )
    .sort((left, right) => {
      const priorityDifference = customerPriority(state, left) - customerPriority(state, right);
      return priorityDifference || queueRoll(state, left) - queueRoll(state, right) || left.index - right.index;
    });
}

export function resetCustomerQueueForDay<T extends GameStateLike>(state: T) {
  state.customerQueueDay = state.day;
  state.seenCharacterIndexes = [];
}

export function ensureCustomerQueue<T extends GameStateLike>(state: T) {
  if (state.customerQueueDay !== state.day || !Array.isArray(state.seenCharacterIndexes)) {
    resetCustomerQueueForDay(state);
  }
}

export function markCustomerSeen<T extends GameStateLike>(state: T, characterIndex: number | null | undefined) {
  ensureCustomerQueue(state);
  if (characterIndex === null || characterIndex === undefined) return;
  if (!state.seenCharacterIndexes!.includes(characterIndex)) state.seenCharacterIndexes!.push(characterIndex);
}

export function selectedCharacter<T extends GameStateLike>(state: T) {
  if (state.selectedCharacterIndex === null) return null;
  return state.characters[state.selectedCharacterIndex] || null;
}

export function nextCustomerIndex<T extends GameStateLike>(state: T) {
  ensureCustomerQueue(state);
  const visible = charactersAtMarket(state);
  if (!visible.length) return null;
  const seen = new Set(state.seenCharacterIndexes || []);
  const available = visible.filter((character) => !seen.has(character.index));
  if (!available.length) return null;
  if (state.selectedCharacterIndex === null) return available[0].index;
  const currentPosition = visible.findIndex((character: Character) => character.index === state.selectedCharacterIndex);
  const ordered = currentPosition < 0
    ? available
    : [...visible.slice(currentPosition + 1), ...visible.slice(0, currentPosition + 1)].filter((character) => !seen.has(character.index));
  const next = ordered[0] || available[0];
  return next.index;
}
