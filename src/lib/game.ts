import charactersJson from "../data/generated/characters.json";
import itemsJson from "../data/generated/items.json";
import kingdomsJson from "../data/generated/kingdoms.json";
import marketplacesJson from "../data/generated/marketplaces.json";
import professionsJson from "../data/generated/professions.json";
import type { Character, InventoryEntry, Item, Kingdom, Marketplace, ObtainableItem, Profession } from "../data/types";
import { appraiseOffer, valueOffer, type TradePerspective } from "./barter";
import { canPayCopperToll, inventoryTotals, spendCopperToll } from "./economy";
import { addInventory, clearOffers, moveOffer, transferOffers, visibleQuantity } from "./inventory";
import { applyModPacks } from "./mods";
import { charactersAtMarket, nextCustomerIndex, selectedCharacter } from "./npc-flow";
import { ensureRelation, type NpcRelations, reactionText, startingPatience } from "./reputation";
import { deleteGameSave, importGame, loadGame, saveGame, serializeGame } from "./save";
import { applyTravelRisks } from "./travel-risk";

export const items = itemsJson as Item[];
export const kingdoms = kingdomsJson as Kingdom[];
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
  npcRelations: NpcRelations;
  questStates: Record<string, "unseen" | "offered" | "accepted" | "ready" | "finished" | "failed">;
  dialogueLog: Array<{
    day: number;
    characterIndex: number;
    characterName: string;
    marketIndex: number;
    topic: string;
    note: string;
  }>;
  travelResult?: {
    fromMarketName: string;
    toMarketName: string;
    days: number;
    tolls: number;
    arrivalDay: number;
    events: string[];
  } | null;
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

export function benfordsQuantity(min: number, max: number, roll: () => number) {
  const safeMin = Math.max(0, Math.floor(min || 0));
  const safeMax = Math.max(safeMin, Math.floor(max || 1));
  if (safeMin === safeMax) return safeMin;
  const span = safeMax - safeMin + 1;
  const skewed = Math.floor(Math.pow(roll(), 2) * span);
  return Math.min(safeMax, safeMin + skewed);
}

function itemMatchesPool(item: Item, pool: ObtainableItem) {
  const tag = pool.tag.toLowerCase();
  return item.name.toLowerCase() === tag || item.tags.some((itemTag) => itemTag.toLowerCase() === tag);
}

function quantityFor(pool: ObtainableItem, item: Item, roll: () => number) {
  const min = Math.max(0, Math.floor(pool.quantityMin || 0));
  const max = Math.max(min, Math.floor(pool.quantityMax || 1));
  let quantity = benfordsQuantity(min, max, roll);
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
    npcRelations: {},
    questStates: {},
    dialogueLog: [],
    travelResult: null,
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

function itemPreferenceScore(state: GameState, character: Character, itemIndex: number) {
  const item = items[itemIndex];
  const profession = character.professionSlug ? professions[character.professionSlug] : undefined;
  const market = currentMarket(state);
  const kingdom = currentKingdom(state);
  const scoreBias = (biases: Array<{ tag: string; percent: number }> = []) =>
    biases.reduce((total, bias) => item.tags.includes(bias.tag) || item.name.toLowerCase() === bias.tag.toLowerCase() ? total + bias.percent : total, 0);
  const exotic = item.kingdomIndex !== null && item.kingdomIndex !== kingdom?.index ? 20 : 0;
  return preferencePercent(character, item) + scoreBias(profession?.bias) + scoreBias(market.bias) + scoreBias(kingdom?.bias) + exotic;
}

export function autoAskPrice(state: GameState, character: Character) {
  const characterValue = offerValue(character.inventory, character, "character", state);
  if (characterValue <= 0) return `Select goods from ${character.name}'s stock first, then ask for the price.`;

  clearOffers(state.playerInventory);
  const avoid = character.inventory.filter((entry) => entry.offerQuantity > 0).length === 1
    ? character.inventory.find((entry) => entry.offerQuantity > 0)?.itemIndex
    : undefined;
  const candidates = state.playerInventory
    .filter((entry) => entry.quantity > 0 && !entry.conceal && entry.itemIndex !== avoid)
    .sort((left, right) => itemPreferenceScore(state, character, right.itemIndex) - itemPreferenceScore(state, character, left.itemIndex));

  for (const entry of candidates) {
    const item = items[entry.itemIndex];
    if (item.tags.includes("packhorses") || item.tags.includes("storage") || item.tags.includes("cards")) continue;
    if (item.loafValue > characterValue) continue;
    while (entry.offerQuantity < entry.quantity) {
      entry.offerQuantity++;
      if (offerValue(state.playerInventory, character, "player", state) > characterValue) return `${character.name} names a price from your goods.`;
    }
  }

  clearOffers(state.playerInventory);
  return characterValue < 5
    ? `${character.name} will not price such a small offer.`
    : `${character.name} cannot find a fair price from your visible goods.`;
}

export function autoAskOffer(state: GameState, character: Character) {
  const playerValue = offerValue(state.playerInventory, character, "player", state);
  if (playerValue <= 0) return "Select some of your goods first, then ask what they will offer.";
  const budget = npcTradeBudget(character);
  if (budget <= 0) return `${character.name} cannot afford to make an offer.`;

  clearOffers(character.inventory);
  const avoid = state.playerInventory.filter((entry) => entry.offerQuantity > 0).length === 1
    ? state.playerInventory.find((entry) => entry.offerQuantity > 0)?.itemIndex
    : undefined;
  const candidates = character.inventory
    .filter((entry) => entry.quantity > 0 && entry.itemIndex !== avoid)
    .sort((left, right) => itemPreferenceScore(state, character, left.itemIndex) - itemPreferenceScore(state, character, right.itemIndex));

  for (const entry of candidates) {
    const item = items[entry.itemIndex];
    if (item.tags.includes("masks")) continue;
    if (item.loafValue > playerValue) continue;
    while (entry.offerQuantity < entry.quantity) {
      entry.offerQuantity++;
      if (offerValue(character.inventory, character, "character", state) > budget) {
        entry.offerQuantity--;
        break;
      }
      if (offerValue(character.inventory, character, "character", state) > playerValue) break;
    }
    while (entry.offerQuantity > 1 && offerValue(character.inventory, character, "character", state) >= playerValue) {
      entry.offerQuantity--;
    }
    if (offerValue(character.inventory, character, "character", state) > 0) break;
  }

  while (offerValue(state.playerInventory, character, "player", state) > offerValue(character.inventory, character, "character", state) * 3) {
    const offered = character.inventory.find((entry) => entry.offerQuantity > 0);
    if (!offered) break;
    if (offered.offerQuantity <= 1) break;
    offered.offerQuantity--;
  }

  const appraisal = appraiseOffer(
    offerValue(state.playerInventory, character, "player", state),
    offerValue(character.inventory, character, "character", state),
    character
  );
  if (["great_deal", "good_deal", "fair_deal"].includes(appraisal) && character.inventory.some((entry) => entry.offerQuantity > 0)) {
    return `${character.name} makes a counteroffer.`;
  }

  clearOffers(character.inventory);
  return `${character.name} cannot match that offer with their stock.`;
}

export function npcTradeBudget(character: Character) {
  return Math.max(0, character.maxObtainValue || 0);
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
  const budget = npcTradeBudget(character);
  if (characterValue > budget) {
    return {
      ...state,
      message: `${character.name} cannot afford that much from their stock.`,
    };
  }
  const appraisal = appraiseOffer(playerValue, characterValue, character);
  if (!["great_deal", "good_deal", "fair_deal"].includes(appraisal)) {
    const next = clone(state);
    const nextCharacter = selectedCharacter(next);
    if (!nextCharacter) return state;
    const relation = ensureRelation(next.npcRelations, nextCharacter);
    relation.failedOffers += 1;
    relation.patience -= 1;
    relation.mood += appraisal === "close" ? -1 : appraisal === "reaching" ? -2 : -3;
    if (appraisal === "far" || appraisal === "leave") relation.trust -= 1;
    if (relation.patience <= 0) {
      clearOffers(next.playerInventory);
      clearOffers(nextCharacter.inventory);
      next.offersMade += 1;
      next.selectedCharacterIndex = null;
      next.message = `${character.name} has lost patience and leaves the table.`;
      return next;
    }
    const missing = Math.max(0, Math.ceil(characterValue - playerValue));
    next.offersMade += 1;
    next.message = `${reactionText(appraisal, character)} Missing ${missing} loaf value. ${preferenceHint(character)} Patience: ${relation.patience}.`;
    return next;
  }

  const next = clone(state);
  const nextCharacter = next.characters[character.index];
  const relation = ensureRelation(next.npcRelations, nextCharacter);
  relation.trades += 1;
  relation.failedOffers = 0;
  relation.patience = startingPatience(nextCharacter);
  relation.mood += appraisal === "great_deal" ? 3 : appraisal === "good_deal" ? 2 : 1;
  relation.trust += appraisal === "great_deal" ? 2 : 1;
  transferOffers(next.playerInventory, nextCharacter.inventory);
  transferOffers(nextCharacter.inventory, next.playerInventory);
  return {
    ...next,
    offersMade: 0,
    message: reactionText(appraisal, character),
  };
}

export function travelToMarket(state: GameState, toMarketIndex: number) {
  const route = currentMarket(state).connections.find((connection) => connection.marketplaceIndex === toMarketIndex);
  if (!route) {
    state.message = "No known route connects these markets.";
    return false;
  }

  const cargo = inventoryTotals(state.playerInventory, items);
  if (!cargo.canTravel) {
    state.message = `Cargo is too heavy or bulky to travel. Carry ${cargo.weight}/${cargo.carryCapacity}, size ${cargo.size}/${cargo.sizeCapacity}.`;
    return false;
  }

  if (!canPayCopperToll(state.playerInventory, items, route.tolls)) {
    state.message = `You need ${route.tolls} copper coins for the route toll.`;
    return false;
  }

  const fromMarketName = currentMarket(state).name;
  spendCopperToll(state.playerInventory, items, route.tolls);
  state.marketIndex = toMarketIndex;
  state.day += route.travelDays || 1;
  state.selectedCharacterIndex = null;
  const riskEvents = applyTravelRisks({
    inventory: state.playerInventory,
    items,
    destination: marketplaces[toMarketIndex],
    kingdom: currentKingdom(state),
    day: state.day,
  });
  state.travelResult = {
    fromMarketName,
    toMarketName: marketplaces[toMarketIndex].name,
    days: route.travelDays || 1,
    tolls: route.tolls,
    arrivalDay: state.day,
    events: riskEvents.map((event) => event.message),
  };
  state.message = riskEvents.length
    ? `Arrived in ${marketplaces[toMarketIndex].name}. ${riskEvents[0].message}`
    : `Paid ${route.tolls} copper toll and arrived in ${marketplaces[toMarketIndex].name}.`;
  return true;
}

export { charactersAtMarket, clearOffers, deleteGameSave, importGame, loadGame, moveOffer, nextCustomerIndex, saveGame, selectedCharacter, serializeGame, visibleQuantity };
