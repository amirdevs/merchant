import charactersJson from "../data/generated/characters.json";
import itemsJson from "../data/generated/items.json";
import kingdomsJson from "../data/generated/kingdoms.json";
import marketplacesJson from "../data/generated/marketplaces.json";
import professionsJson from "../data/generated/professions.json";
import type { Character, InventoryEntry, Item, Kingdom, Marketplace, ObtainableItem, Profession } from "../data/types";
import { appraiseOffer, valueOffer, type TradePerspective } from "./barter";
import type { AuctionSession } from "./auction";
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
  questAcceptedDays: Record<string, number>;
  contractStates: ContractStates;
  contractAcceptedDays: ContractAcceptedDays;
  auctionSession: AuctionSession | null;
  selectedItemIndex: number | null;
  dialogueNodes: Record<string, DialogueNodeId>;
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
    questAcceptedDays: {},
    contractStates: {},
    contractAcceptedDays: {},
    auctionSession: null,
    selectedItemIndex: null,
    dialogueNodes: {},
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
  return valueOffer({
    inventory,
    items,
    character,
    perspective,
    profession: character?.professionSlug ? professions[character.professionSlug] : undefined,
    marketplace: market ? { ...market, bias: [...(market.bias || []), ...eventBiases(market, state?.day || 1)] } : undefined,
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
    next.message = block;
    return next;
  }

  if (playerValue <= 0 && characterValue <= 0) {
    next.message = "Place goods on at least one side before proposing the trade.";
    return next;
  }

  const playerCargoValue = next.playerInventory.reduce((total, entry) => total + items[entry.itemIndex].loafValue * entry.quantity, 0);
  const npcGift = playerValue <= 0 && safetyNetGiftAllowed(nextCharacter, relation, playerCargoValue, characterValue);
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
  const riskPreview = routeRiskPreview({
    inventory: state.playerInventory,
    items,
    destination: marketplaces[toMarketIndex],
    kingdom: destinationKingdom,
    days: route.travelDays || 1,
    tolls: route.tolls,
  });
  const bribeCost = strategy === "bribe" && riskPreview.illegalStacks > 0 ? 12 : 0;
  const totalCost = route.tolls + stallage + bribeCost;
  if (!canPayCopperToll(state.playerInventory, items, totalCost)) {
    state.message = `You need ${totalCost} copper coins for tolls, stallage${bribeCost ? ", and the planned bribe" : ""}.`;
    return false;
  }

  const fromMarketName = currentMarket(state).name;
  spendCopperToll(state.playerInventory, items, totalCost);
  state.marketIndex = toMarketIndex;
  state.day += route.travelDays || 1;
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
      return visibleQuantity(entry) > 0 && (item.tags.some((tag) => tag.toLowerCase().includes("permit")) || item.name.toLowerCase().includes("permit"));
    }),
  });
  state.travelResult = {
    fromMarketName,
    toMarketName: marketplaces[toMarketIndex].name,
    days: route.travelDays || 1,
    tolls: route.tolls,
    stallage,
    arrivalDay: state.day,
    events: riskEvents.map((event) => event.message),
  };
  state.message = expiredQuests.length
    ? `Arrived in ${marketplaces[toMarketIndex].name}. ${expiredQuests.map((market) => market.quest?.name).join(", ")} failed after missing the deadline.`
    : expiredContracts.length
    ? `Arrived in ${marketplaces[toMarketIndex].name}. ${expiredContracts.length} contract${expiredContracts.length === 1 ? "" : "s"} expired on the road; up to ${failurePenalty} copper was claimed in penalties.`
    : riskEvents.length
    ? `Arrived in ${marketplaces[toMarketIndex].name}. ${riskEvents[0].message}`
    : `Paid ${route.tolls} copper toll and ${stallage} stallage${bribeCost ? ` plus ${bribeCost} for discretion` : ""}, then arrived in ${marketplaces[toMarketIndex].name}.`;
  return true;
}

export { charactersAtMarket, clearOffers, deleteGameSave, importGame, loadGame, moveOffer, nextCustomerIndex, saveGame, selectedCharacter, serializeGame, visibleQuantity };
