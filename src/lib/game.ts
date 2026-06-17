import charactersJson from "../data/generated/characters.json";
import itemsJson from "../data/generated/items.json";
import kingdomsJson from "../data/generated/kingdoms.json";
import marketplacesJson from "../data/generated/marketplaces.json";
import professionsJson from "../data/generated/professions.json";
import type { Character, InventoryEntry, Item, Marketplace, ObtainableItem, Profession } from "../data/types";
import { appraiseOffer, valueOffer, type TradePerspective } from "./barter";
import { addInventory, clearOffers, moveOffer, transferOffers, visibleQuantity } from "./inventory";
import { applyModPacks } from "./mods";
import { charactersAtMarket, nextCustomerIndex, selectedCharacter } from "./npc-flow";
import { deleteGameSave, importGame, loadGame, saveGame, serializeGame } from "./save";

export const items = itemsJson as Item[];
export const kingdoms = kingdomsJson as Array<{ index: number; bias?: { tag: string; percent: number }[] }>;
export const marketplaces = marketplacesJson as Marketplace[];
export const professions = professionsJson as Record<string, Profession>;

const baseCharacters = charactersJson as Character[];
let modsLoaded = false;

export type GameState = {
  marketIndex: number;
  day: number;
  selectedCharacterIndex: number | null;
  characters: Character[];
  playerInventory: InventoryEntry[];
  message: string;
  offersMade: number;
};

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function seeded(seed: number) {
  let value = seed || 1;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function itemMatchesPool(item: Item, pool: ObtainableItem) {
  const tag = pool.tag.toLowerCase();
  return item.name.toLowerCase() === tag || item.tags.some((itemTag) => itemTag.toLowerCase() === tag);
}

function quantityFor(pool: ObtainableItem, item: Item, roll: () => number) {
  const min = Math.max(0, Math.floor(pool.quantityMin || 0));
  const max = Math.max(min, Math.floor(pool.quantityMax || 1));
  let quantity = min + Math.floor(roll() * (max - min + 1));
  if (quantity <= 0 && max > 0) quantity = 1;
  if (item.loafValue > 1000) quantity = Math.min(quantity, 1);
  return Math.max(0, quantity);
}

export function generateInventory(character: Character) {
  const roll = seeded((character.index + 1) * 7919);
  const inventory: InventoryEntry[] = [];
  const professionPools = character.professionSlug ? professions[character.professionSlug]?.obtainableItems || [] : [];
  const pools = [...(character.obtainableItems || []), ...professionPools].slice(0, 10);
  for (const pool of pools) {
    const matches = items.filter((item) => {
      if (item.unique) return false;
      if (item.loafValue > character.maxObtainValue) return false;
      if (character.excludedObtainItems?.some((tag) => item.tags.includes(tag) || item.name === tag)) return false;
      return itemMatchesPool(item, pool);
    });
    if (!matches.length) continue;
    const item = matches[Math.floor(roll() * matches.length)];
    addInventory(inventory, item.index, quantityFor(pool, item, roll));
    if (inventory.length >= 12) break;
  }
  return inventory;
}

export function newGame(): GameState {
  const characters = clone(baseCharacters).map((character) => ({
    ...character,
    inventory: generateInventory(character),
  }));

  const playerInventory: InventoryEntry[] = [];
  addInventory(playerInventory, itemIndexByName("copper coins"), 240);
  addInventory(playerInventory, itemIndexByName("silver coins"), 20);
  addInventory(playerInventory, itemIndexByName("loaf"), 8);
  addInventory(playerInventory, itemIndexByName("onions"), 12);
  addInventory(playerInventory, itemIndexByName("working gloves"), 2);

  return {
    marketIndex: 0,
    day: 1,
    selectedCharacterIndex: null,
    characters,
    playerInventory,
    message: "A new ledger begins in Boone.",
    offersMade: 0,
  };
}

export async function loadMods() {
  if (modsLoaded) return { loaded: 0, skipped: 0, names: [] };
  const result = await applyModPacks({ items, characters: baseCharacters, marketplaces, professions });
  modsLoaded = true;
  return result;
}

export function itemIndexByName(name: string) {
  const found = items.find((item) => item.name.toLowerCase() === name.toLowerCase());
  return found?.index ?? 0;
}

export function currentMarket(state: GameState) {
  return marketplaces[state.marketIndex];
}

export function currentKingdom(state: GameState) {
  const kingdomIndex = currentMarket(state).kingdomIndex;
  return { ...kingdoms[kingdomIndex], index: kingdomIndex };
}

export function offerValue(inventory: InventoryEntry[], character: Character | null, perspective: TradePerspective, state?: GameState) {
  return valueOffer({
    inventory,
    items,
    character,
    perspective,
    profession: character?.professionSlug ? professions[character.professionSlug] : undefined,
    marketplace: state ? currentMarket(state) : undefined,
    kingdom: state ? currentKingdom(state) : undefined,
    offersMade: state?.offersMade || 0,
  });
}

export function preferencePercent(character: Character, item: Item) {
  return (character.bias || []).reduce((total, bias) => {
    if (item.name === bias.tag || item.tags.includes(bias.tag)) return total + bias.percent;
    return total;
  }, 0);
}

function preferenceHint(character: Character) {
  const likes = (character.bias || [])
    .filter((bias) => bias.percent > 0)
    .sort((left, right) => right.percent - left.percent)
    .slice(0, 3)
    .map((bias) => `${bias.tag} +${bias.percent}%`);
  if (!likes.length) return "They have no obvious stated favorites.";
  return `They favor ${likes.join(", ")}.`;
}

export function completeTrade(state: GameState) {
  const character = selectedCharacter(state);
  if (!character) return state;
  const playerValue = offerValue(state.playerInventory, character, "player", state);
  const characterValue = offerValue(character.inventory, character, "character", state);
  const appraisal = appraiseOffer(playerValue, characterValue, character);
  if (!["great_deal", "good_deal", "fair_deal"].includes(appraisal)) {
    const missing = Math.max(0, Math.ceil(characterValue - playerValue));
    return {
      ...state,
      offersMade: state.offersMade + 1,
      message: `${character.name} refuses. Missing ${missing} loaf value. ${preferenceHint(character)}`,
    };
  }

  const next = clone(state);
  const nextCharacter = next.characters[character.index];
  transferOffers(next.playerInventory, nextCharacter.inventory);
  transferOffers(nextCharacter.inventory, next.playerInventory);
  return {
    ...next,
    offersMade: 0,
    message: `${character.name} accepts the trade.`,
  };
}

export { charactersAtMarket, clearOffers, deleteGameSave, importGame, loadGame, moveOffer, nextCustomerIndex, saveGame, selectedCharacter, serializeGame, visibleQuantity };
