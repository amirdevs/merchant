const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dataDir = path.join(root, "src", "data", "generated");
const outFile = path.join(root, "docs", "systems", "profession-stock-review.md");

const characters = JSON.parse(fs.readFileSync(path.join(dataDir, "characters.json"), "utf8"));
const items = JSON.parse(fs.readFileSync(path.join(dataDir, "items.json"), "utf8"));
const kingdoms = JSON.parse(fs.readFileSync(path.join(dataDir, "kingdoms.json"), "utf8"));
const marketplaces = JSON.parse(fs.readFileSync(path.join(dataDir, "marketplaces.json"), "utf8"));
const professions = JSON.parse(fs.readFileSync(path.join(dataDir, "professions.json"), "utf8"));

const tierOrder = ["empty", "pocket", "sparse", "light", "modest", "standard", "stocked", "large", "wholesale", "grand"];
const sampleDays = [1, 3, 7, 14];
const BIAS_ARCHETYPE_ID = "bias";
const BIAS_SOURCE_MULTIPLIERS = { character: 0.85, profession: 0.6, marketplace: 0.35, kingdom: 0.25 };
const BIAS_WEIGHT_PER_PERCENT = 0.055;
const MIN_BIAS_WEIGHT = -5;
const MAX_BIAS_WEIGHT = 6;

function normalize(value) {
  return String(value || "").toLowerCase().replace(/[_-]+/g, " ").trim();
}

function compact(value) {
  return String(value || "").toLowerCase().replace(/[\s_-]+/g, "").trim();
}

function extractObject(file, exportName) {
  const source = fs.readFileSync(file, "utf8");
  const marker = `export const ${exportName}`;
  const start = source.indexOf(marker);
  if (start < 0) throw new Error(`Could not find ${exportName} in ${file}`);
  const equals = source.indexOf("=", start);
  const firstBrace = source.indexOf("{", equals);
  let depth = 0;
  for (let index = firstBrace; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") depth -= 1;
    if (depth === 0) return Function(`"use strict"; return (${source.slice(firstBrace, index + 1)});`)();
  }
  throw new Error(`Could not parse ${exportName} in ${file}`);
}

const stockDir = path.join(root, "src", "data", "stock");
const stockArchetypes = extractObject(path.join(stockDir, "archetypes.ts"), "stockArchetypes");
const stockTiers = extractObject(path.join(stockDir, "tiers.ts"), "stockTiers");
const professionStockProfiles = extractObject(path.join(stockDir, "profiles.ts"), "professionStockProfiles");
const characterStockOverrides = extractObject(path.join(stockDir, "profiles.ts"), "characterStockOverrides");
const fallbackStockProfile = extractObject(path.join(stockDir, "profiles.ts"), "fallbackStockProfile");
const merchantFallbackProfile = extractObject(path.join(stockDir, "profiles.ts"), "merchantFallbackProfile");
const lifestyleStockBaselines = extractObject(path.join(stockDir, "profiles.ts"), "lifestyleStockBaselines");

function itemTokens(item) {
  return new Set([
    item.id,
    item.name,
    item.displayName,
    item.family,
    item.subfamily,
    item.tradeRole,
    item.rarityBand,
    item.bulkProfile,
    item.decayProfile,
    ...(item.tags || []),
    ...(item.forms || []),
    ...(item.professionUses || []),
    ...(item.regions || []),
    ...(item.sources || []),
    ...(item.qualityBands || []),
    ...(item.storageNeeds || []),
    ...(item.marketBehavior || []),
    ...Object.values(item.categoryAxes || {}).flat(),
  ].filter(Boolean).map(normalize));
}

function itemCompactTokens(item) {
  return new Set([...itemTokens(item)].map(compact));
}

const stockItemRecords = items.map((item) => ({
  item,
  name: normalize(item.name),
  tags: [...itemTokens(item)],
  compactTags: [...itemCompactTokens(item)],
}));

function seeded(seed) {
  let value = seed || 1;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeProfile(base, override) {
  if (!override) return { ...clone(base), archetypes: (base.archetypes || []).map((entry) => ({ ...entry })) };
  return {
    ...clone(base),
    ...clone(override),
    archetypes: (override.archetypes || base.archetypes || []).map((entry) => ({ ...entry })),
    forbiddenTags: [...(base.forbiddenTags || []), ...(override.forbiddenTags || [])],
    guaranteedTags: [...(base.guaranteedTags || []), ...(override.guaranteedTags || [])],
  };
}

function atLeastTier(current, minimum) {
  return tierOrder.indexOf(current) >= tierOrder.indexOf(minimum) ? current : minimum;
}

function inferLifestyleBaseline(character, profile) {
  if (profile.lifestyleBaseline) return profile.lifestyleBaseline;
  const slug = character.professionSlug || "";
  if (slug === "beggar") return "poor";
  if (slug === "thief") return "criminal";
  if (slug === "noble") return "noble";
  if (["fighter", "knight", "quartermaster", "soldier"].includes(slug)) return "military";
  if (slug === "religious") return "religious";
  if (["bard", "hunter", "sailor"].includes(slug)) return "traveler";
  if (character.isMerchant) return "shopkeeper";
  return "worker";
}

function applyLifestyleBaseline(character, profile) {
  const baseline = lifestyleStockBaselines[inferLifestyleBaseline(character, profile)];
  if (!baseline) return profile;
  const archetypes = profile.archetypes.map((entry) => ({ ...entry }));
  const existing = new Set(archetypes.map((entry) => entry.id));
  for (const entry of baseline.archetypes || []) {
    if (existing.has(entry.id)) continue;
    archetypes.push({ ...entry });
  }
  return {
    ...profile,
    archetypes,
    guaranteedTags: [...new Set([...(profile.guaranteedTags || []), ...(baseline.guaranteedTags || [])])],
  };
}

function addBiasWeights(weights, biases, multiplier) {
  for (const bias of biases || []) {
    const tag = normalize(bias.tag);
    if (!tag) continue;
    const weighted = Math.max(MIN_BIAS_WEIGHT, Math.min(MAX_BIAS_WEIGHT, bias.percent * BIAS_WEIGHT_PER_PERCENT * multiplier));
    if (Math.abs(weighted) < 0.05) continue;
    weights[tag] = (weights[tag] || 0) + weighted;
  }
}

function isContrabandStocker(character, profile) {
  const baseline = inferLifestyleBaseline(character, profile);
  return baseline === "criminal" || character.isPlunderer || character.professionSlug === "thief" || profile.archetypes.some((entry) => entry.id === "contraband");
}

function collectGeneratedBiasWeights(character, profile) {
  const weights = {};
  const profession = character.professionSlug ? professions[character.professionSlug] : undefined;
  const marketplace = marketplaces[character.marketplaceIndex];
  const kingdom = marketplace ? kingdoms[marketplace.kingdomIndex] : undefined;

  addBiasWeights(weights, character.bias, BIAS_SOURCE_MULTIPLIERS.character);
  addBiasWeights(weights, profession?.bias, BIAS_SOURCE_MULTIPLIERS.profession);
  addBiasWeights(weights, marketplace?.bias, BIAS_SOURCE_MULTIPLIERS.marketplace);
  addBiasWeights(weights, kingdom?.bias, BIAS_SOURCE_MULTIPLIERS.kingdom);

  const illegalWeight = isContrabandStocker(character, profile) ? 6 : -10;
  for (const tag of kingdom?.illegalItemTags || []) {
    const normalized = normalize(tag);
    if (!normalized) continue;
    weights[normalized] = (weights[normalized] || 0) + illegalWeight;
  }

  return Object.fromEntries(Object.entries(weights).filter(([, weight]) => Math.abs(weight) >= 0.05));
}

function applyGeneratedBiasArchetype(character, profile) {
  const weightedTags = collectGeneratedBiasWeights(character, profile);
  stockArchetypes[BIAS_ARCHETYPE_ID] = { ...(stockArchetypes[BIAS_ARCHETYPE_ID] || {}), weightedTags, forbiddenTags: [] };
  if (!Object.keys(weightedTags).length) return profile;
  if (profile.archetypes.some((entry) => entry.id === BIAS_ARCHETYPE_ID)) return profile;
  return {
    ...profile,
    archetypes: [...profile.archetypes, { id: BIAS_ARCHETYPE_ID, weight: 1 }],
  };
}

function resolveStockProfile(character) {
  const profession = character.professionSlug ? professionStockProfiles[character.professionSlug] : undefined;
  let profile = profession ? mergeProfile(profession) : mergeProfile(character.isMerchant ? merchantFallbackProfile : fallbackStockProfile);
  if (character.isMerchant) profile = { ...profile, tier: atLeastTier(profile.tier, "stocked") };
  profile = mergeProfile(profile, characterStockOverrides[character.name]);
  profile = applyLifestyleBaseline(character, profile);
  return applyGeneratedBiasArchetype(character, profile);
}

function resolvedStockSettings(character, day) {
  const profile = resolveStockProfile(character);
  const tier = stockTiers[profile.tier];
  const progression = Math.max(0, day - 1) * (profile.progressionScaling ?? tier.progressionScaling);
  return {
    profile,
    tier,
    minStacks: Math.max(0, tier.minStacks + (profile.stackModifier || 0)),
    maxStacks: Math.max(0, tier.maxStacks + (profile.stackModifier || 0)),
    quantityMultiplier: tier.quantityMultiplier * (profile.quantityMultiplier || 1) * (1 + progression),
    coinMultiplier: tier.coinMultiplier * (profile.coinMultiplier || 1) * (1 + progression),
  };
}

function itemMatchesPool(item, pool) {
  return itemTokens(item).has(normalize(pool.tag));
}

function quantityFor(pool, item, roll, multiplier = 1) {
  const min = Math.max(0, Math.floor(pool.quantityMin || 0));
  const max = Math.max(min, Math.floor(pool.quantityMax || 1));
  const quantity = max <= min ? min : min + Math.floor(roll() * (max - min + 1));
  const adjusted = item.loafValue > 1000 ? Math.min(quantity, 1) : quantity;
  return Math.max(0, Math.round(Math.max(adjusted, max > 0 ? 1 : 0) * multiplier));
}

function weightedArchetypeTags(archetypes) {
  const weights = new Map();
  const configs = [];
  for (const entry of archetypes) {
    const config = stockArchetypes[entry.id];
    if (!config) throw new Error(`Unknown stock archetype: ${entry.id}`);
    configs.push(config);
    for (const [tag, weight] of Object.entries(config.weightedTags || {})) {
      const normalized = normalize(tag);
      weights.set(normalized, (weights.get(normalized) || 0) + weight * (entry.weight ?? 1));
    }
  }
  return { weights, configs };
}

function itemStockWeight(record, weights) {
  let weight = weights.get(record.name) || 0;
  for (const tag of record.tags) weight += weights.get(tag) || 0;
  return weight;
}

function weightedPick(entries, roll) {
  const total = entries.reduce((sum, entry) => sum + Math.max(0, entry.weight), 0);
  if (total <= 0) return null;
  let target = roll() * total;
  for (const entry of entries) {
    target -= Math.max(0, entry.weight);
    if (target <= 0) return entry.value;
  }
  return entries[entries.length - 1]?.value ?? null;
}

function quantityPoolFor(item, pools) {
  return pools.find((pool) => itemMatchesPool(item, pool)) || {
    tag: item.tags?.[0] || item.name,
    quantityMin: item.loafValue >= 1000 ? 1 : item.loafValue >= 100 ? 1 : 2,
    quantityMax: item.loafValue >= 1000 ? 1 : item.loafValue >= 100 ? 4 : 12,
  };
}

function archetypeQuantityMultiplier(item, configs) {
  const tokens = itemTokens(item);
  let multiplier = 1;
  for (const config of configs) {
    for (const [token, configuredMultiplier] of Object.entries(config.quantityMultipliers || {})) {
      if (tokens.has(normalize(token))) multiplier = Math.max(multiplier, configuredMultiplier);
    }
  }
  return multiplier;
}

function archetypeMinimumQuantity(item, configs) {
  const tokens = itemTokens(item);
  let minimum = 0;
  for (const config of configs) {
    for (const [token, configuredMinimum] of Object.entries(config.minimumQuantities || {})) {
      if (tokens.has(normalize(token))) minimum = Math.max(minimum, configuredMinimum);
    }
  }
  return minimum;
}

function addInventory(inventory, itemIndex, quantity) {
  if (quantity <= 0) return;
  const existing = inventory.find((entry) => entry.itemIndex === itemIndex);
  if (existing) existing.quantity += quantity;
  else inventory.push({ itemIndex, quantity, offerQuantity: 0 });
}

function generateInventory(character, day = 1) {
  const settings = resolvedStockSettings(character, day);
  if (settings.maxStacks <= 0) return [];
  const roll = seeded((character.index + 1) * 7919 + Math.max(1, day) * 104729 + (settings.profile.stockSeed || 0));
  const professionPools = character.professionSlug ? professions[character.professionSlug]?.obtainableItems || [] : [];
  const pools = [...(character.obtainableItems || []), ...professionPools].slice(0, 16);
  const { weights, configs } = weightedArchetypeTags(settings.profile.archetypes);
  for (const pool of pools) weights.set(normalize(pool.tag), (weights.get(normalize(pool.tag)) || 0) + 4);
  const forbidden = new Set([...(character.excludedObtainItems || []), ...(settings.profile.forbiddenTags || []), ...configs.flatMap((config) => config.forbiddenTags || [])].map(normalize));
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

  const inventory = [];
  const tierCoinGuarantees = settings.minStacks >= 29 ? ["copper coins", "silver coins", "gold coins"] : settings.minStacks >= 15 ? ["copper coins", "silver coins"] : ["copper coins"];
  const guaranteedTags = [...tierCoinGuarantees, ...(settings.profile.guaranteedTags || []), ...configs.flatMap((config) => config.guaranteedTags || [])].map(normalize);
  for (const guaranteedTag of guaranteedTags) {
    if (inventory.length >= targetStacks) break;
    const guaranteed = candidates.filter((candidate) => candidate.record.name === guaranteedTag || candidate.record.tags.some((tag) => tag === guaranteedTag));
    const selected = guaranteed[Math.floor(roll() * guaranteed.length)];
    if (!selected) continue;
    candidates.splice(candidates.findIndex((candidate) => candidate.item.index === selected.item.index), 1);
    const pool = quantityPoolFor(selected.item, pools);
    const multiplier = selected.record.tags.includes("coins") || selected.record.tags.includes("currency") ? settings.coinMultiplier : settings.quantityMultiplier * archetypeQuantityMultiplier(selected.item, configs);
    addInventory(inventory, selected.item.index, Math.max(archetypeMinimumQuantity(selected.item, configs), quantityFor(pool, selected.item, roll, multiplier)));
  }

  while (inventory.length < targetStacks && candidates.length) {
    const selected = weightedPick(candidates.map((candidate) => ({ value: candidate, weight: candidate.weight })), roll);
    if (!selected) break;
    candidates.splice(candidates.findIndex((candidate) => candidate.item.index === selected.item.index), 1);
    const pool = quantityPoolFor(selected.item, pools);
    const multiplier = selected.record.tags.includes("coins") || selected.record.tags.includes("currency") ? settings.coinMultiplier : settings.quantityMultiplier * archetypeQuantityMultiplier(selected.item, configs);
    addInventory(inventory, selected.item.index, Math.max(archetypeMinimumQuantity(selected.item, configs), quantityFor(pool, selected.item, roll, multiplier)));
  }
  return inventory;
}

const requiredTokens = {
  alchemist: ["alchemy", "ingredient", "container"],
  bard: ["music", "game", "book"],
  barkeep: ["drink", "food", "barrels"],
  blacksmith: ["ore", "ingots", "coal", "tool"],
  butcher: ["meat", "spice", "tool"],
  farmer: ["produce", "grain", "seeds"],
  fisher: ["seafood", "barrels"],
  fletcher: ["arrows", "bows", "wood"],
  hunter: ["arrows", "bows", "meat"],
  miner: ["ore", "coal", "rocks"],
  seamstress: ["textile", "thread", "tool"],
  toolmaker: ["tool", "metal", "wood"],
};


const balanceTargets = {
  alchemist: { identity: ["alchemy", "ingredient", "container", "potions", "remedies"], minIdentityShare: 0.5, maxFinishedShare: 0.35, maxLuxuryShare: 0.35 },
  bard: { identity: ["music", "game", "book", "art", "travel"], minIdentityShare: 0.5, maxRawShare: 0.25, maxLuxuryShare: 0.3 },
  barkeep: { identity: ["drink", "drinks", "food", "barrels", "glass", "household"], minIdentityShare: 0.58, maxRawShare: 0.25, maxFinishedShare: 0.35, maxLuxuryShare: 0.15 },
  blacksmith: { identity: ["ore", "ingots", "metal", "coal", "tool", "tools", "repairinput", "construction"], minIdentityShare: 0.62, maxFinishedShare: 0.28, maxLuxuryShare: 0.08, maxConsumableShare: 0.16 },
  butcher: { identity: ["meat", "preserved", "spice", "tool", "container", "food"], minIdentityShare: 0.58, maxFinishedShare: 0.2, maxLuxuryShare: 0.08 },
  farmer: { identity: ["produce", "grain", "seeds", "livestock", "animal", "tool", "basket", "sack"], minIdentityShare: 0.62, maxFinishedShare: 0.18, maxLuxuryShare: 0.08 },
  fisher: { identity: ["seafood", "fish", "shellfish", "maritime", "barrels", "tool"], minIdentityShare: 0.58, maxFinishedShare: 0.22, maxLuxuryShare: 0.08 },
  fletcher: { identity: ["arrows", "bows", "crossbows", "wood", "tool", "travel"], minIdentityShare: 0.62, maxFinishedShare: 0.42, maxLuxuryShare: 0.08 },
  hunter: { identity: ["arrows", "bows", "meat", "animalgoods", "leather", "travel", "container"], minIdentityShare: 0.52, maxLuxuryShare: 0.2 },
  miner: { identity: ["ore", "coal", "stone", "rocks", "gem", "crystals", "tool", "rawmaterial", "packanimals", "vehicles"], minIdentityShare: 0.64, maxFinishedShare: 0.16, maxLuxuryShare: 0.16, maxConsumableShare: 0.12 },
  seamstress: { identity: ["textile", "fabrics", "thread", "clothes", "tool", "leather", "basket"], minIdentityShare: 0.6, maxRawShare: 0.6, maxLuxuryShare: 0.25 },
  toolmaker: { identity: ["tool", "tools", "repairinput", "metal", "wood", "container", "household"], minIdentityShare: 0.64, maxFinishedShare: 0.25, maxLuxuryShare: 0.08 },
};

const compositionBuckets = {
  currency: ["coin", "coins", "currency", "coppercoins", "silvercoins", "goldcoins"],
  rawMaterials: ["rawmaterial", "ore", "ingots", "metal", "coal", "rocks", "stone", "wood", "textile", "fabrics", "thread", "leather", "animalgoods", "gem", "crystals", "seeds", "grain"],
  consumables: ["food", "drink", "drinks", "produce", "meat", "seafood", "bread", "daily staple", "dailystaple", "spice", "preserved", "remedies", "potions"],
  toolsAndContainers: ["tool", "tools", "repairinput", "container", "barrels", "basket", "sack", "household"],
  finishedGoods: ["weapon", "weapons", "armor", "clothes", "jewelry", "art", "paintings", "statues", "furniture", "book", "books", "music", "game"],
  travelAndAnimals: ["travel", "maritime", "maps", "packanimals", "livestock", "animal", "animals", "vehicles"],
  luxuryOrRare: ["luxury", "royal", "gold", "magic", "contraband", "poisons", "monsterparts", "arcane", "enchantinginput", "divinematerial"],
};

function tokenHasAny(item, bucketTokens) {
  const tokens = itemCompactTokens(item);
  return bucketTokens.some((token) => tokens.has(compact(token)));
}

function inventoryShare(inventory, predicate) {
  if (!inventory.length) return 0;
  const matched = inventory.filter((entry) => {
    const item = items[entry.itemIndex];
    return item && predicate(item);
  }).length;
  return matched / inventory.length;
}

function percent(value) {
  if (!Number.isFinite(value)) return "0%";
  return `${Math.round(value * 100)}%`;
}

function sampleBalance(sample, target) {
  if (!target) return null;
  const identityShare = inventoryShare(sample.inventory, (item) => tokenHasAny(item, target.identity || []));
  const rawShare = inventoryShare(sample.inventory, (item) => tokenHasAny(item, compositionBuckets.rawMaterials));
  const consumableShare = inventoryShare(sample.inventory, (item) => tokenHasAny(item, compositionBuckets.consumables));
  const finishedShare = inventoryShare(sample.inventory, (item) => tokenHasAny(item, compositionBuckets.finishedGoods));
  const luxuryShare = inventoryShare(sample.inventory, (item) => tokenHasAny(item, compositionBuckets.luxuryOrRare));
  const kingdom = kingdoms[marketplaces[sample.character.marketplaceIndex]?.kingdomIndex];
  const illegalTags = (kingdom?.illegalItemTags || []).map(compact);
  const illegalShare = inventoryShare(sample.inventory, (item) => tokenHasAny(item, illegalTags));

  return { identityShare, rawShare, consumableShare, finishedShare, luxuryShare, illegalShare };
}

function averageBalance(samples, target) {
  const balances = samples.map((sample) => sampleBalance(sample, target)).filter(Boolean);
  if (!balances.length) return null;
  const keys = Object.keys(balances[0]);
  return Object.fromEntries(keys.map((key) => [key, average(balances, (balance) => balance[key])]));
}

function balanceFlags(slug, balance, missing, target) {
  if (!target || !balance) return [];
  const flags = [];
  if (missing.length) flags.push(`missing required tokens: ${missing.join(", ")}`);
  if (balance.identityShare < target.minIdentityShare) flags.push(`identity share low (${percent(balance.identityShare)} < ${percent(target.minIdentityShare)})`);
  if (target.maxRawShare !== undefined && balance.rawShare > target.maxRawShare) flags.push(`raw-material share high (${percent(balance.rawShare)} > ${percent(target.maxRawShare)})`);
  if (target.maxConsumableShare !== undefined && balance.consumableShare > target.maxConsumableShare) flags.push(`consumable share high (${percent(balance.consumableShare)} > ${percent(target.maxConsumableShare)})`);
  if (target.maxFinishedShare !== undefined && balance.finishedShare > target.maxFinishedShare) flags.push(`finished-good share high (${percent(balance.finishedShare)} > ${percent(target.maxFinishedShare)})`);
  if (target.maxLuxuryShare !== undefined && balance.luxuryShare > target.maxLuxuryShare) flags.push(`luxury/rare share high (${percent(balance.luxuryShare)} > ${percent(target.maxLuxuryShare)})`);
  if (slug !== "thief" && balance.illegalShare > 0.05) flags.push(`illegal-goods share needs review (${percent(balance.illegalShare)})`);
  return flags;
}

function formatNumber(value) {
  if (!Number.isFinite(value)) return "0";
  return Math.round(value).toLocaleString("en-US");
}

function inventorySummary(inventory) {
  const families = {};
  const names = [];
  const composition = Object.fromEntries(Object.keys(compositionBuckets).map((key) => [key, 0]));
  let totalValue = 0;
  let coinValue = 0;

  for (const entry of inventory) {
    const item = items[entry.itemIndex];
    if (!item) continue;
    const quantity = Math.max(0, entry.quantity || 0);
    const value = (item.loafValue || 0) * quantity;
    const family = item.family || "unknown";

    families[family] = (families[family] || 0) + 1;
    totalValue += value;
    names.push(`${item.name} x${quantity}`);

    for (const [bucket, bucketTokens] of Object.entries(compositionBuckets)) {
      if (tokenHasAny(item, bucketTokens)) composition[bucket] += 1;
    }
    if (tokenHasAny(item, compositionBuckets.currency)) coinValue += value;
  }

  return { families, names, composition, totalValue, coinValue };
}

function topEntries(record, limit = 7) {
  return Object.entries(record)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([key, count]) => `${key} ${count}`)
    .join(", ");
}

function collectSamples(slug, matchingCharacters) {
  return sampleDays.flatMap((day) => matchingCharacters.slice(0, 3).map((character) => {
    const inventory = generateInventory(character, day);
    const summary = inventorySummary(inventory);
    const required = requiredTokens[slug] || [];
    const present = required.filter((token) => inventory.some((entry) => itemTokens(items[entry.itemIndex]).has(normalize(token))));
    return { day, character, inventory, summary, required, present };
  }));
}

function average(samples, getter) {
  if (!samples.length) return 0;
  return samples.reduce((sum, sample) => sum + getter(sample), 0) / samples.length;
}

const lines = [
  "# Profession Stock Review",
  "",
  "Generated by `pnpm review:stock` from the current catalog and stock profiles.",
  "",
  `Sample days: ${sampleDays.join(", ")}.`,
  "",
  "## Summary",
  "",
];

const reviewSlugs = Object.keys(professionStockProfiles).sort();
for (const slug of reviewSlugs) {
  const matchingCharacters = characters.filter((character) => character.isActive && !character.isPlunderer && character.professionSlug === slug);
  if (!matchingCharacters.length) continue;

  const samples = collectSamples(slug, matchingCharacters);
  const dayOneSamples = samples.filter((sample) => sample.day === 1);
  const averageStacks = average(samples, (sample) => sample.inventory.length);
  const averageValue = average(samples, (sample) => sample.summary.totalValue);
  const averageCoinValue = average(samples, (sample) => sample.summary.coinValue);
  const familyCounts = {};
  const compositionCounts = Object.fromEntries(Object.keys(compositionBuckets).map((key) => [key, 0]));

  for (const sample of samples) {
    for (const [family, count] of Object.entries(sample.summary.families)) familyCounts[family] = (familyCounts[family] || 0) + count;
    for (const [bucket, count] of Object.entries(sample.summary.composition)) compositionCounts[bucket] = (compositionCounts[bucket] || 0) + count;
  }

  const required = requiredTokens[slug] || [];
  const missing = required.length
    ? [...new Set(samples.flatMap((sample) => sample.required.filter((token) => !sample.present.includes(token))))]
    : [];

  const profile = professionStockProfiles[slug];
  const resolvedProfile = resolveStockProfile(matchingCharacters[0]);
  const archetypes = resolvedProfile.archetypes.map((entry) => `${entry.id}${entry.weight == null ? "" : ` ${entry.weight}`}`).join(", ");
  const target = balanceTargets[slug];
  const balance = averageBalance(samples, target);
  const flags = balanceFlags(slug, balance, missing, target);
  const biasWeights = collectGeneratedBiasWeights(matchingCharacters[0], resolvedProfile);
  const topBiases = Object.entries(biasWeights)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]) || a[0].localeCompare(b[0]))
    .slice(0, 8)
    .map(([tag, weight]) => `${tag} ${weight.toFixed(1)}`)
    .join(", ");

  lines.push(`### ${slug}`);
  lines.push("");
  lines.push(`- Profile: tier \`${resolvedProfile.tier}\`; lifestyle \`${resolvedProfile.lifestyleBaseline || inferLifestyleBaseline(matchingCharacters[0], resolvedProfile)}\`; archetypes ${archetypes}.`);
  lines.push(`- Generated-data stock bias preview: ${topBiases || "none"}.`);
  if (balance) {
    lines.push(`- Balance status: ${flags.length ? `REVIEW - ${flags.join("; ")}` : "PASS"}.`);
    lines.push(`- Balance shares: identity ${percent(balance.identityShare)}, raw ${percent(balance.rawShare)}, consumable ${percent(balance.consumableShare)}, finished ${percent(balance.finishedShare)}, luxury/rare ${percent(balance.luxuryShare)}, illegal ${percent(balance.illegalShare)}.`);
  } else {
    lines.push("- Balance status: no explicit target yet; inspect manually.");
  }
  lines.push(`- Sampled NPCs: ${dayOneSamples.map((sample) => sample.character.name).join(", ")}.`);
  lines.push(`- Average visible stacks across sampled days: ${formatNumber(averageStacks)}.`);
  lines.push(`- Average total stock value across sampled days: ${formatNumber(averageValue)} loaf-value.`);
  lines.push(`- Average coin reserve value across sampled days: ${formatNumber(averageCoinValue)} loaf-value.`);
  lines.push(`- Top sampled families: ${topEntries(familyCounts) || "none"}.`);
  lines.push(`- Composition buckets: ${topEntries(compositionCounts, Object.keys(compositionBuckets).length) || "none"}.`);
  if (required.length) lines.push(`- Required-token sample gaps: ${missing.length ? missing.join(", ") : "none"}.`);
  lines.push(`- Example day-1 stock: ${dayOneSamples[0]?.summary.names.slice(0, 18).join("; ") || "none"}.`);
  lines.push("");
}

lines.push("## Notes");
lines.push("");
lines.push("- This review samples deterministic generated stock for days 1, 3, 7, and 14. Restock blending and existing save-state stock can still change what a player sees.");
lines.push("- `Average coin reserve value` is estimated from currency-like items in generated inventory, not from a separate future NPC wallet system.");
lines.push("- Composition buckets are token-based diagnostics, so one item can count in multiple buckets.");
lines.push("- Original generated biases now softly affect stock selection through the dynamic `bias` archetype: character and profession biases are strongest, market and kingdom biases are lighter, and illegal kingdom tags discourage legal merchants while helping criminal stock.");
lines.push("- Step 3.6 balance targets are intentionally stack-share heuristics. PASS means the generated stock shape is acceptable for moving to barter tests; REVIEW means the profession may need manual visual/gameplay inspection.");
lines.push("- Broad merchant-style professions intentionally carry mixed goods until named merchant subtypes are designed.");
lines.push("- Inspect high-priority professions manually after every item catalog rewrite: blacksmith, fletcher, miner, barkeep, bard, farmer, butcher, and toolmaker.");
lines.push("- This is a pre-art checkpoint. Prompt configs should not be generated from older item data.");

fs.writeFileSync(outFile, `${lines.join("\n")}\n`);
console.log(`Wrote ${path.relative(root, outFile)}`);
