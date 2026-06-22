import charactersJson from "../data/generated/characters.json";
import itemsJson from "../data/generated/items.json";
import kingdomsJson from "../data/generated/kingdoms.json";
import marketplacesJson from "../data/generated/marketplaces.json";
import professionsJson from "../data/generated/professions.json";
import type { Character, InventoryEntry, Item, Kingdom, Marketplace, ObtainableItem, Profession } from "../data/types";
import { appraiseOffer, valueOffer, visibleOfferableInventory, type TradePerspective } from "./barter";
import type { AuctionSession } from "./auction";
import type { RaceResult } from "./racing";
import { createMythProgression, type MythProgression, type MythSession } from "./myth";
import { advanceMarketSimulation, recordMarketTrade, seasonalMarketBiases, simulatedMarketBiases, type MarketSimulation } from "./market-simulation";
import { createCompanyState, settleShipments, type CompanyState } from "./company";
import type { DraftSession } from "./draft";
import { applyPackhorseTravelWear, applyTravelConditions, createCaravanState, masteryRiskReduction, recordRoute, routeKey, routeTravelConditions, type CaravanState } from "./caravan";
import { activePermit, adjustKingdomHeat, canUseBlackMarket, coolLawHeat, createLawState, kingdomHeat, permitInspectionMultiplier, type LawState } from "./law";
import { npcRoles } from "./npc-behavior";
import { advanceRivals, createRivalState, type RivalState } from "./rivals";
import { expireContracts, type ContractAcceptedDays, type ContractStates } from "./contracts";
import { canPayCopperToll, inventoryTotals, spendCopperToll } from "./economy";
import { eventBiases } from "./events";
import type { DialogueNodeId } from "./dialogue";
import { addInventory, clearOffers, moveOffer, transferOffers, visibleQuantity } from "./inventory";
import { applyModPacks } from "./mods";
import {
  deterministicTradeRoll,
  fairMatchChance,
  npcBudgetMultiplier,
  roleReactionSuffix,
  roleTradeBlock,
  safetyNetGiftAllowed,
} from "./npc-behavior";
import { charactersAtMarket, nextCustomerIndex, selectedCharacter } from "./npc-flow";
import { ensureRelation, type NpcRelations, reactionText, startingPatience, ultimatumActive } from "./reputation";
import { deleteGameSave, importGame, loadGame, saveGame, serializeGame } from "./save";
import { applyTravelRisks, routeRiskPreview, type TravelStrategy } from "./travel-risk";
import { expireQuests, questOfferCanComplete, questReward } from "./quests";
import { stockArchetypes } from "../data/stock/archetypes";
import type { StockArchetype, WeightedArchetype } from "../data/stock/types";
import { resolvedStockSettings } from "./stock-profiles";
import { itemCatalogTokens, itemMatchesCatalogToken, normalizeItemToken } from "./item-catalog";

export const items = itemsJson as Item[];
export const kingdoms = kingdomsJson as Kingdom[];
export const marketplaces = marketplacesJson as Marketplace[];
export const professions = professionsJson as Record<string, Profession>;
export const GAME_DAY_MINUTES = 24 * 60;
export const MARKET_OPEN_MINUTES = 8 * 60;
export const MARKET_CLOSE_MINUTES = 20 * 60;

const baseCharacters = charactersJson as Character[];
const stockItemRecords = items.map((item) => ({
  item,
  name: normalizeStockToken(item.name),
  tags: [...itemCatalogTokens(item)],
}));
let modsLoaded = false;

export type GameState = {
  marketIndex: number;
  day: number;
  timeOfDayMinutes: number;
  selectedCharacterIndex: number | null;
  customerQueueDay: number;
  seenCharacterIndexes: number[];
  characters: Character[];
  playerInventory: InventoryEntry[];
  message: string;
  offersMade: number;
  npcRelations: NpcRelations;
  questStates: Record<string, "unseen" | "offered" | "accepted" | "ready" | "finished" | "failed">;
  questAcceptedDays: Record<string, number>;
  contractStates: ContractStates;
  contractAcceptedDays: ContractAcceptedDays;
  auctionSession: AuctionSession | null;
  selectedItemIndex: number | null;
  dialogueNodes: Record<string, DialogueNodeId>;
  raceResult: RaceResult | null;
  mythSession: MythSession | null;
  mythProgression: MythProgression;
  marketSimulation: MarketSimulation;
  company: CompanyState;
  draftSession: DraftSession | null;
  caravan: CaravanState;
  law: LawState;
  rivals: RivalState;
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
    stallage: number;
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

export function normalizeTimeOfDay(minutes: number) {
  const safeMinutes = Number.isFinite(minutes) ? Math.floor(minutes) : MARKET_OPEN_MINUTES;
  return ((safeMinutes % GAME_DAY_MINUTES) + GAME_DAY_MINUTES) % GAME_DAY_MINUTES;
}

export function advanceGameClock(state: Pick<GameState, "day" | "timeOfDayMinutes">, minutes: number) {
  const current = normalizeTimeOfDay(state.timeOfDayMinutes);
  const nextTotal = current + Math.max(0, Math.floor(minutes));
  const daysElapsed = Math.floor(nextTotal / GAME_DAY_MINUTES);
  state.timeOfDayMinutes = normalizeTimeOfDay(nextTotal);
  state.day += daysElapsed;
  return daysElapsed;
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
  const tag = normalizeStockToken(pool.tag);
  return itemMatchesCatalogToken(item, tag);
}

function quantityFor(pool: ObtainableItem, item: Item, roll: () => number, multiplier = 1) {
  const min = Math.max(0, Math.floor(pool.quantityMin || 0));
  const max = Math.max(min, Math.floor(pool.quantityMax || 1));
  let quantity = benfordsQuantity(min, max, roll);
  if (quantity <= 0 && max > 0) quantity = 1;
  if (item.loafValue > 1000) quantity = Math.min(quantity, 1);
  return Math.max(0, Math.round(quantity * multiplier));
}

function normalizeStockToken(value: string) {
  return normalizeItemToken(value);
}

function weightedArchetypeTags(archetypes: WeightedArchetype[]) {
  const weights = new Map<string, number>();
  const configs: StockArchetype[] = [];
  for (const entry of archetypes) {
    const config = stockArchetypes[entry.id];
    configs.push(config);
    for (const [tag, weight] of Object.entries(config.weightedTags)) {
      const normalized = normalizeStockToken(tag);
      weights.set(normalized, (weights.get(normalized) || 0) + weight * (entry.weight ?? 1));
    }
  }
  return { weights, configs };
}

function itemStockWeight(record: (typeof stockItemRecords)[number], weights: Map<string, number>) {
  let weight = weights.get(record.name) || 0;
  for (const tag of record.tags) weight += weights.get(tag) || 0;
  return weight;
}

function weightedPick<T>(entries: Array<{ value: T; weight: number }>, roll: () => number) {
  const total = entries.reduce((sum, entry) => sum + Math.max(0, entry.weight), 0);
  if (total <= 0) return null;
  let target = roll() * total;
  for (const entry of entries) {
    target -= Math.max(0, entry.weight);
    if (target <= 0) return entry.value;
  }
  return entries[entries.length - 1]?.value ?? null;
}

function quantityPoolFor(item: Item, pools: ObtainableItem[]) {
  return pools.find((pool) => itemMatchesPool(item, pool)) || {
    tag: item.tags[0] || item.name,
    quantityMin: item.loafValue >= 1000 ? 1 : item.loafValue >= 100 ? 1 : 2,
    quantityMax: item.loafValue >= 1000 ? 1 : item.loafValue >= 100 ? 4 : 12,
  };
}

function archetypeQuantityMultiplier(item: Item, configs: StockArchetype[]) {
  const tokens = itemCatalogTokens(item);
  let multiplier = 1;
  for (const config of configs) {
    for (const [token, configuredMultiplier] of Object.entries(config.quantityMultipliers || {})) {
      if (tokens.has(normalizeStockToken(token))) multiplier = Math.max(multiplier, configuredMultiplier);
    }
  }
  return multiplier;
}

function archetypeMinimumQuantity(item: Item, configs: StockArchetype[]) {
  const tokens = itemCatalogTokens(item);
  let minimum = 0;
  for (const config of configs) {
    for (const [token, configuredMinimum] of Object.entries(config.minimumQuantities || {})) {
      if (tokens.has(normalizeStockToken(token))) minimum = Math.max(minimum, configuredMinimum);
    }
  }
  return minimum;
}

export function generateInventory(character: Character, day = 1) {
  const settings = resolvedStockSettings(character, day);
  if (settings.maxStacks <= 0) return [];
  const roll = seeded((character.index + 1) * 7919 + Math.max(1, day) * 104729 + (settings.profile.stockSeed || 0));
  const professionPools = character.professionSlug ? professions[character.professionSlug]?.obtainableItems || [] : [];
  const pools = [...(character.obtainableItems || []), ...professionPools].slice(0, 16);
  const { weights, configs } = weightedArchetypeTags(settings.profile.archetypes);
  for (const [tag, weight] of Object.entries(settings.profile.stockBiasWeights || {})) {
    const normalized = normalizeStockToken(tag);
    weights.set(normalized, (weights.get(normalized) || 0) + weight);
  }
  for (const pool of pools) weights.set(normalizeStockToken(pool.tag), (weights.get(normalizeStockToken(pool.tag)) || 0) + 4);

  const forbidden = new Set([
    ...(character.excludedObtainItems || []),
    ...(settings.profile.forbiddenTags || []),
    ...configs.flatMap((config) => config.forbiddenTags || []),
  ].map(normalizeStockToken));
  const minValue = settings.profile.minValue || 0;
  const maxValue = Math.min(character.maxObtainValue, settings.profile.maxValue ?? character.maxObtainValue);
  const targetStacks = Math.min(items.length, settings.minStacks + Math.floor(roll() * (settings.maxStacks - settings.minStacks + 1)));
  const rarityBias = Math.max(0, ...configs.map((config) => config.rarityBias || 0));
  const localityBias = Math.max(0, ...configs.map((config) => config.localityBias || 0));
  const marketKingdomIndex = marketplaces[character.marketplaceIndex]?.kingdomIndex;
  const candidates = stockItemRecords.flatMap((record) => {
    const { item } = record;
    if (item.unique || item.loafValue < minValue || item.loafValue > maxValue) return [];
    if (forbidden.has(record.name) || record.tags.some((tag) => forbidden.has(tag))) return [];
    const baseWeight = itemStockWeight(record, weights);
    if (baseWeight <= 0) return [];
    const localBonus = item.kingdomIndex === marketKingdomIndex ? 1 + localityBias : 1;
    const rarityPenalty = item.rarity && item.rarity > 2 && roll() > settings.tier.rareItemChance + rarityBias ? 0.15 : 1;
    return [{ item, record, weight: baseWeight * localBonus * rarityPenalty }];
  });
  const inventory: InventoryEntry[] = [];
  const tierCoinGuarantees = settings.minStacks >= 29
    ? ["copper coins", "silver coins", "gold coins"]
    : settings.minStacks >= 15
      ? ["copper coins", "silver coins"]
      : ["copper coins"];
  const guaranteedTags = [
    ...tierCoinGuarantees,
    ...(settings.profile.guaranteedTags || []),
    ...configs.flatMap((config) => config.guaranteedTags || []),
  ].map(normalizeStockToken);

  for (const guaranteedTag of guaranteedTags) {
    if (inventory.length >= targetStacks) break;
    const guaranteed = candidates.filter((candidate) =>
      candidate.record.name === guaranteedTag ||
      candidate.record.tags.some((tag) => tag === guaranteedTag)
    );
    const selected = guaranteed[Math.floor(roll() * guaranteed.length)];
    if (!selected) continue;
    candidates.splice(candidates.findIndex((candidate) => candidate.item.index === selected.item.index), 1);
    const pool = quantityPoolFor(selected.item, pools);
    const multiplier = selected.record.tags.includes("coins") || selected.record.tags.includes("currency")
      ? settings.coinMultiplier
      : settings.quantityMultiplier * archetypeQuantityMultiplier(selected.item, configs);
    addInventory(inventory, selected.item.index, Math.max(
      archetypeMinimumQuantity(selected.item, configs),
      quantityFor(pool, selected.item, roll, multiplier)
    ));
  }

  while (inventory.length < targetStacks && candidates.length) {
    const selected = weightedPick(candidates.map((candidate) => ({ value: candidate, weight: candidate.weight })), roll);
    if (!selected) break;
    candidates.splice(candidates.findIndex((candidate) => candidate.item.index === selected.item.index), 1);
    const pool = quantityPoolFor(selected.item, pools);
    const multiplier = selected.record.tags.includes("coins") || selected.record.tags.includes("currency")
      ? settings.coinMultiplier
      : settings.quantityMultiplier * archetypeQuantityMultiplier(selected.item, configs);
    addInventory(inventory, selected.item.index, Math.max(
      archetypeMinimumQuantity(selected.item, configs),
      quantityFor(pool, selected.item, roll, multiplier)
    ));
  }
  return inventory;
}

function shouldRestock(character: Character, day: number, reason: "day" | "arrival") {
  const settings = resolvedStockSettings(character, day);
  const lastDay = character.stockLastRestockDay || 1;
  if (settings.restockMode === "never") return false;
  if (settings.restockMode === "on-arrival") return reason === "arrival";
  if (settings.restockMode === "weekly") return day - lastDay >= 7;
  if (settings.restockMode === "interval") return day - lastDay >= Math.max(1, settings.restockDays);
  return day > lastDay;
}

function mergeRestockedInventory(current: InventoryEntry[], generated: InventoryEntry[], rate: number) {
  if (rate >= 1) return generated;
  const merged: InventoryEntry[] = [];
  const indexes = new Set([...current.map((entry) => entry.itemIndex), ...generated.map((entry) => entry.itemIndex)]);
  for (const itemIndex of indexes) {
    const oldQuantity = current.find((entry) => entry.itemIndex === itemIndex)?.quantity || 0;
    const newQuantity = generated.find((entry) => entry.itemIndex === itemIndex)?.quantity || 0;
    const quantity = Math.max(0, Math.round(oldQuantity * (1 - rate) + newQuantity * rate));
    if (quantity > 0) merged.push({ itemIndex, quantity, offerQuantity: 0 });
  }
  return merged;
}

export function restockNpcInventories(state: Pick<GameState, "characters" | "day">, reason: "day" | "arrival" = "day") {
  for (const character of state.characters) {
    if (!character.isActive || character.isPlunderer || !shouldRestock(character, state.day, reason)) continue;
    const settings = resolvedStockSettings(character, state.day);
    character.inventory = mergeRestockedInventory(character.inventory, generateInventory(character, state.day), settings.restockRate);
    character.stockLastRestockDay = state.day;
  }
}

export function newGame(): GameState {
  const characters = clone(baseCharacters).map((character) => ({
    ...character,
    inventory: generateInventory(character, 1),
    stockLastRestockDay: 1,
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
    timeOfDayMinutes: MARKET_OPEN_MINUTES,
    selectedCharacterIndex: null,
    customerQueueDay: 1,
    seenCharacterIndexes: [],
    characters,
    playerInventory,
    message: "A new ledger begins in Boone.",
    offersMade: 0,
    npcRelations: {},
    questStates: {},
    questAcceptedDays: {},
    contractStates: {},
    contractAcceptedDays: {},
    auctionSession: null,
    selectedItemIndex: null,
    dialogueNodes: {},
    raceResult: null,
    mythSession: null,
    mythProgression: createMythProgression(),
    marketSimulation: {},
    company: createCompanyState(),
    draftSession: null,
    caravan: createCaravanState(),
    law: createLawState(),
    rivals: createRivalState(characters),
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
  const market = state ? currentMarket(state) : undefined;
  const kingdom = state ? currentKingdom(state) : undefined;
  const relation = state && character ? ensureRelation(state.npcRelations, character) : null;
  const blackMarket = Boolean(state && character && canUseBlackMarket(state.law, relation?.trust || 0, npcRoles(character).includes("thief")));
  return valueOffer({
    inventory,
    items,
    character,
    perspective,
    profession: character?.professionSlug ? professions[character.professionSlug] : undefined,
    marketplace: market ? { ...market, bias: [...(market.bias || []), ...seasonalMarketBiases(state?.day || 1), ...eventBiases(market, state?.day || 1), ...simulatedMarketBiases(state?.marketSimulation || {}, market, state?.day || 1)] } : undefined,
    kingdom,
    offersMade: state?.offersMade || 0,
    illegalTags: kingdom?.illegalItemTags || [],
    blackMarket,
    heat: state && kingdom ? kingdomHeat(state.law, kingdom.index) : 0,
  });
}

export function preferencePercent(character: Character, item: Item) {
  return (character.bias || []).reduce((total, bias) => {
    if (itemMatchesCatalogToken(item, bias.tag)) return total + bias.percent;
    return total;
  }, 0);
}

function itemPreferenceScore(state: GameState, character: Character, itemIndex: number) {
  const item = items[itemIndex];
  const profession = character.professionSlug ? professions[character.professionSlug] : undefined;
  const market = currentMarket(state);
  const kingdom = currentKingdom(state);
  const scoreBias = (biases: Array<{ tag: string; percent: number }> = []) =>
    biases.reduce((total, bias) => itemMatchesCatalogToken(item, bias.tag) ? total + bias.percent : total, 0);
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
  const candidates = visibleOfferableInventory(state.playerInventory, "auto")
    .filter((entry) => entry.itemIndex !== avoid)
    .sort((left, right) => itemPreferenceScore(state, character, right.itemIndex) - itemPreferenceScore(state, character, left.itemIndex));

  for (const entry of candidates) {
    const item = items[entry.itemIndex];
    if (itemMatchesCatalogToken(item, "packhorses") || itemMatchesCatalogToken(item, "storage") || itemMatchesCatalogToken(item, "cards")) continue;
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
  const budget = npcTradeBudget(character, state);
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
    if (itemMatchesCatalogToken(item, "masks")) continue;
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

export function npcTradeBudget(character: Character, state?: GameState) {
  const relation = state ? ensureRelation(state.npcRelations, character) : null;
  return Math.max(0, Math.floor((character.maxObtainValue || 0) * npcBudgetMultiplier(character, relation)));
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
  const budget = npcTradeBudget(character, state);
  if (characterValue > budget) {
    return {
      ...state,
      message: `${character.name} cannot afford that much from their stock.`,
    };
  }
  const next = clone(state);
  const nextCharacter = selectedCharacter(next);
  if (!nextCharacter) return state;
  const relation = ensureRelation(next.npcRelations, nextCharacter);
  const offeredIllegalStacks = next.playerInventory.filter((entry) => entry.offerQuantity > 0 && (currentKingdom(next).illegalItemTags || []).some((tag) => itemMatchesCatalogToken(items[entry.itemIndex], tag)));
  const block = roleTradeBlock({
    character: nextCharacter,
    relation,
    playerInventory: next.playerInventory,
    items,
    illegalTags: currentKingdom(next).illegalItemTags || [],
    characterValue,
  });
  if (block) {
    relation.mood -= 1;
    if (offeredIllegalStacks.length && npcRoles(nextCharacter).includes("snitch")) {
      adjustKingdomHeat(next.law, currentKingdom(next).index, 8 + offeredIllegalStacks.length * 4);
      relation.trust -= 1;
      next.message = `${block} Heat rises in ${currentKingdom(next).name}.`;
      return next;
    }
    next.message = block;
    return next;
  }

  if (playerValue <= 0 && characterValue <= 0) {
    next.message = "Place goods on at least one side before proposing the trade.";
    return next;
  }

  const playerCargoValue = next.playerInventory.reduce((total, entry) => total + items[entry.itemIndex].loafValue * entry.quantity, 0);
  const npcGift = playerValue <= 0 && safetyNetGiftAllowed(nextCharacter, relation, playerCargoValue, characterValue);
  const playerSold = next.playerInventory.filter((entry) => entry.offerQuantity > 0).map((entry) => ({ ...entry }));
  const playerBought = nextCharacter.inventory.filter((entry) => entry.offerQuantity > 0).map((entry) => ({ ...entry }));
  const illegalTradeStacks = playerSold.filter((entry) => (currentKingdom(next).illegalItemTags || []).some((tag) => itemMatchesCatalogToken(items[entry.itemIndex], tag)));
  const marketQuest = currentMarket(next);
  const completesQuest = next.questStates[String(marketQuest.index)] === "accepted"
    && questOfferCanComplete(marketQuest, next.playerInventory, items);
  let appraisal = appraiseOffer(playerValue, characterValue, nextCharacter);
  const fairChance = fairMatchChance(nextCharacter, relation, playerValue, characterValue);
  const fairMatch = appraisal === "close" && deterministicTradeRoll(next.day, nextCharacter.index, next.offersMade) < fairChance;

  if (!["great_deal", "good_deal", "fair_deal"].includes(appraisal) && !fairMatch && !npcGift) {
    relation.failedOffers += 1;
    relation.patience -= 1;
    relation.mood += appraisal === "close" ? -1 : appraisal === "reaching" ? -2 : -3;
    if (appraisal === "far" || appraisal === "leave") relation.trust -= 1;
    if (relation.patience <= 0) {
      clearOffers(next.playerInventory);
      clearOffers(nextCharacter.inventory);
      next.offersMade += 1;
      next.seenCharacterIndexes = Array.from(new Set([...(next.seenCharacterIndexes || []), nextCharacter.index]));
      next.selectedCharacterIndex = null;
      next.message = `${character.name} has lost patience and leaves the table.`;
      return next;
    }
    const missing = Math.max(0, Math.ceil(characterValue - playerValue));
    next.offersMade += 1;
    next.message = `${reactionText(appraisal, character)} Missing ${missing} loaf value. ${preferenceHint(character)} Patience: ${relation.patience}.${ultimatumActive(relation) ? " Final offer: improve the trade now or they will leave." : ""}`;
    return next;
  }

  if (fairMatch) appraisal = "fair_deal";
  relation.trades += 1;
  relation.failedOffers = 0;
  relation.patience = startingPatience(nextCharacter);
  relation.mood += appraisal === "great_deal" ? 3 : appraisal === "good_deal" ? 2 : 1;
  relation.trust += appraisal === "great_deal" ? 2 : 1;
  transferOffers(next.playerInventory, nextCharacter.inventory);
  transferOffers(nextCharacter.inventory, next.playerInventory);
  recordMarketTrade({
    simulation: next.marketSimulation,
    marketIndex: next.marketIndex,
    day: next.day,
    playerSold,
    playerBought,
    items,
  });
  if (illegalTradeStacks.length && npcRoles(nextCharacter).includes("thief")) {
    adjustKingdomHeat(next.law, currentKingdom(next).index, 4 + illegalTradeStacks.length * 2);
    next.law.blackMarketReputation = Math.min(20, next.law.blackMarketReputation + 1);
    relation.illegalDeals += 1;
  }
  if (playerValue > 0 && characterValue <= 0) {
    relation.gifts += 1;
    relation.favors += playerValue >= 50 ? 2 : 1;
  }
  if (appraisal === "great_deal") relation.favors += 1;
  if (relation.trust >= 4 && !relation.secretsUnlocked.includes("trusted-route")) relation.secretsUnlocked.push("trusted-route");
  if (relation.illegalDeals >= 2 && !relation.secretsUnlocked.includes("underworld-contact")) relation.secretsUnlocked.push("underworld-contact");
  let questMessage = "";
  if (completesQuest && marketQuest.quest) {
    const reward = questReward(marketQuest, items);
    const copper = items.find((item) => item.name.toLowerCase() === "copper coins");
    if (copper) addInventory(next.playerInventory, copper.index, reward.copper);
    for (const itemReward of reward.items) addInventory(next.playerInventory, itemReward.itemIndex, itemReward.quantity);
    next.questStates[String(marketQuest.index)] = "finished";
    questMessage = ` ${marketQuest.quest.name} completed through the delivery. Reward: ${reward.copper} copper.`;
  }
  const giftMessage = npcGift
    ? `${nextCharacter.name} offers a small safety-net gift to keep you trading.`
    : playerValue > 0 && characterValue <= 0
      ? `${nextCharacter.name} accepts your gift.`
      : fairMatch
        ? `${nextCharacter.name} accepts the near-fair offer after a moment of thought.`
        : reactionText(appraisal, character);
  const suffix = roleReactionSuffix(nextCharacter);
  return {
    ...next,
    offersMade: 0,
    message: `${giftMessage}${suffix ? ` ${suffix}` : ""}${questMessage}`,
  };
}

export function travelToMarket(state: GameState, toMarketIndex: number, strategy: TravelStrategy = "comply") {
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

  const stallage = marketplaces[toMarketIndex].stallage || 0;
  const destinationKingdom = kingdoms[marketplaces[toMarketIndex].kingdomIndex];
  const fromMarketIndex = state.marketIndex;
  const masteryTrips = state.caravan.routeMastery[routeKey(fromMarketIndex, toMarketIndex)] || 0;
  const riskPreview = routeRiskPreview({
    inventory: state.playerInventory,
    items,
    destination: marketplaces[toMarketIndex],
    kingdom: destinationKingdom,
    days: route.travelDays || 1,
    tolls: route.tolls,
    concealmentLevel: state.caravan.concealmentLevel,
    masteryReduction: masteryRiskReduction(masteryTrips),
  });
  const bribeCost = strategy === "bribe" && riskPreview.illegalStacks > 0 ? 12 : 0;
  const totalCost = route.tolls + stallage + bribeCost;
  if (!canPayCopperToll(state.playerInventory, items, totalCost)) {
    state.message = `You need ${totalCost} copper coins for tolls, stallage${bribeCost ? ", and the planned bribe" : ""}.`;
    return false;
  }

  const fromMarketName = currentMarket(state).name;
  const departedDay = state.day;
  const conditions = routeTravelConditions(fromMarketIndex, toMarketIndex, state.day, route.travelDays || 1);
  const conditionResult = applyTravelConditions(state.caravan, conditions);
  spendCopperToll(state.playerInventory, items, totalCost);
  state.marketIndex = toMarketIndex;
  state.day += route.travelDays || 1;
  restockNpcInventories(state, "arrival");
  state.timeOfDayMinutes = normalizeTimeOfDay(MARKET_OPEN_MINUTES + Math.min(8 * 60, (route.travelDays || 1) * 90));
  coolLawHeat(state.law, route.travelDays || 1);
  advanceMarketSimulation(state.marketSimulation, state.day);
  const rivalActivities = advanceRivals({ rivals: state.rivals, simulation: state.marketSimulation, markets: marketplaces, items, day: state.day });
  const settledShipments = settleShipments(state.company, state.day);
  const expiredContracts = expireContracts({
    states: state.contractStates,
    acceptedDays: state.contractAcceptedDays,
    currentDay: state.day,
    markets: marketplaces,
    kingdoms,
  });
  const expiredQuests = expireQuests({
    states: state.questStates,
    acceptedDays: state.questAcceptedDays,
    currentDay: state.day,
    markets: marketplaces,
  });
  const failurePenalty = expiredContracts.reduce((total, contract) => total + contract.failurePenaltyCopper, 0);
  if (failurePenalty > 0) spendCopperToll(state.playerInventory, items, failurePenalty);
  state.selectedCharacterIndex = null;
  state.customerQueueDay = state.day;
  state.seenCharacterIndexes = [];
  const riskEvents = applyTravelRisks({
    inventory: state.playerInventory,
    items,
    destination: marketplaces[toMarketIndex],
    kingdom: currentKingdom(state),
    day: state.day,
    travelDays: route.travelDays || 1,
    strategy,
    hasPermit: state.playerInventory.some((entry) => {
      const item = items[entry.itemIndex];
      return visibleQuantity(entry) > 0 && [...itemCatalogTokens(item)].some((token) => token.includes("permit"));
    }) || Boolean(activePermit(state.law, destinationKingdom.index, state.day)),
    permitMultiplier: permitInspectionMultiplier(activePermit(state.law, destinationKingdom.index, state.day)),
    heat: kingdomHeat(state.law, destinationKingdom.index),
    concealmentLevel: state.caravan.concealmentLevel,
    masteryReduction: masteryRiskReduction(masteryTrips),
  });
  if (riskEvents.some((event) => event.kind === "inspection")) adjustKingdomHeat(state.law, destinationKingdom.index, 12);
  if (strategy === "evade") adjustKingdomHeat(state.law, destinationKingdom.index, riskEvents.some((event) => event.kind === "evasion" && event.message.includes("failed")) ? 18 : 6);
  const wear = applyPackhorseTravelWear(state.caravan, cargo.packAnimals, route.travelDays || 1, !cargo.canTravel, conditions.wearBonus);
  if (conditionResult.shortage > 0) {
    riskEvents.push({ kind: "condition", message: `The caravan ran short by ${conditionResult.shortage} supplies; morale fell sharply.` });
  }
  recordRoute(state.caravan, {
    id: `${fromMarketIndex}:${toMarketIndex}:${departedDay}`,
    dayDeparted: departedDay,
    dayArrived: state.day,
    fromMarketIndex,
    toMarketIndex,
    days: route.travelDays || 1,
    tolls: route.tolls,
    stallage,
    strategy,
    cargoValue: riskPreview.cargoValue,
    incidents: riskEvents.map((event) => event.message),
    weather: conditions.weather,
    roadQuality: conditions.roadQuality,
    suppliesUsed: conditionResult.suppliesUsed,
    moraleChange: conditionResult.moraleChange,
    success: true,
  });
  state.travelResult = {
    fromMarketName,
    toMarketName: marketplaces[toMarketIndex].name,
    days: route.travelDays || 1,
    tolls: route.tolls,
    stallage,
    arrivalDay: state.day,
    events: [`${conditions.weather} weather, ${conditions.roadQuality} road, ${conditionResult.suppliesUsed}/${conditions.suppliesNeeded} supplies used.`, ...riskEvents.map((event) => event.message)],
  };
  state.message = rivalActivities.length
    ? `Arrived in ${marketplaces[toMarketIndex].name}. ${rivalActivities[0]}`
    : settledShipments.length
    ? `Arrived in ${marketplaces[toMarketIndex].name}. Company shipment results: ${settledShipments.map((shipment) => shipment.status).join(", ")}.`
    : expiredQuests.length
    ? `Arrived in ${marketplaces[toMarketIndex].name}. ${expiredQuests.map((market) => market.quest?.name).join(", ")} failed after missing the deadline.`
    : expiredContracts.length
    ? `Arrived in ${marketplaces[toMarketIndex].name}. ${expiredContracts.length} contract${expiredContracts.length === 1 ? "" : "s"} expired on the road; up to ${failurePenalty} copper was claimed in penalties.`
    : riskEvents.length
    ? `Arrived in ${marketplaces[toMarketIndex].name}. ${riskEvents[0].message}`
    : `Paid ${route.tolls} copper toll and ${stallage} stallage${bribeCost ? ` plus ${bribeCost} for discretion` : ""}, then arrived in ${marketplaces[toMarketIndex].name}.${wear ? ` Packhorse condition lost ${wear}.` : ""}`;
  return true;
}

export { charactersAtMarket, clearOffers, deleteGameSave, importGame, loadGame, moveOffer, nextCustomerIndex, saveGame, selectedCharacter, serializeGame, visibleQuantity };
