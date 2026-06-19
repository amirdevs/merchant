const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dataDir = path.join(root, "src", "data", "generated");
const outFile = path.join(root, "docs", "systems", "profession-stock-review.md");

const characters = JSON.parse(fs.readFileSync(path.join(dataDir, "characters.json"), "utf8"));
const items = JSON.parse(fs.readFileSync(path.join(dataDir, "items.json"), "utf8"));
const marketplaces = JSON.parse(fs.readFileSync(path.join(dataDir, "marketplaces.json"), "utf8"));
const professions = JSON.parse(fs.readFileSync(path.join(dataDir, "professions.json"), "utf8"));

const tierOrder = ["empty", "pocket", "sparse", "light", "modest", "standard", "stocked", "large", "wholesale", "grand"];

function normalize(value) {
  return String(value || "").toLowerCase().replace(/[_-]+/g, " ").trim();
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
const universalStockBaseline = extractObject(path.join(stockDir, "profiles.ts"), "universalStockBaseline");

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

const stockItemRecords = items.map((item) => ({
  item,
  name: normalize(item.name),
  tags: [...itemTokens(item)],
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

function resolveStockProfile(character) {
  const profession = character.professionSlug ? professionStockProfiles[character.professionSlug] : undefined;
  let profile = profession ? mergeProfile(profession) : mergeProfile(character.isMerchant ? merchantFallbackProfile : fallbackStockProfile);
  if (character.isMerchant) profile = { ...profile, tier: atLeastTier(profile.tier, "stocked") };
  profile = mergeProfile(profile, characterStockOverrides[character.name]);
  const hasGeneral = profile.archetypes.some((entry) => entry.id === "general");
  return {
    ...profile,
    archetypes: hasGeneral ? profile.archetypes : [...profile.archetypes, { id: "general", weight: universalStockBaseline.archetypeWeight }],
    guaranteedTags: [...new Set([...(profile.guaranteedTags || []), ...universalStockBaseline.guaranteedTags])],
  };
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
    tag: item.tags[0] || item.name,
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

function inventorySummary(inventory) {
  const families = {};
  const names = [];
  for (const entry of inventory) {
    const item = items[entry.itemIndex];
    families[item.family || "unknown"] = (families[item.family || "unknown"] || 0) + 1;
    names.push(`${item.name} x${entry.quantity}`);
  }
  return { families, names };
}

const lines = [
  "# Profession Stock Review",
  "",
  "Generated by `pnpm review:stock` from the current catalog and stock profiles.",
  "",
  "## Summary",
  "",
];

const reviewSlugs = Object.keys(professionStockProfiles).sort();
for (const slug of reviewSlugs) {
  const matchingCharacters = characters.filter((character) => character.isActive && !character.isPlunderer && character.professionSlug === slug);
  if (!matchingCharacters.length) continue;
  const samples = matchingCharacters.slice(0, 3).map((character) => {
    const inventory = generateInventory(character, 1);
    const summary = inventorySummary(inventory);
    const required = requiredTokens[slug] || [];
    const present = required.filter((token) => inventory.some((entry) => itemTokens(items[entry.itemIndex]).has(normalize(token))));
    return { character, inventory, summary, required, present };
  });
  const averageStacks = Math.round(samples.reduce((sum, sample) => sum + sample.inventory.length, 0) / samples.length);
  const familyCounts = {};
  for (const sample of samples) {
    for (const [family, count] of Object.entries(sample.summary.families)) familyCounts[family] = (familyCounts[family] || 0) + count;
  }
  const topFamilies = Object.entries(familyCounts).sort((a, b) => b[1] - a[1]).slice(0, 7).map(([family, count]) => `${family} ${count}`).join(", ");
  lines.push(`### ${slug}`);
  lines.push("");
  lines.push(`- Sampled NPCs: ${samples.map((sample) => sample.character.name).join(", ")}.`);
  lines.push(`- Average visible stacks: ${averageStacks}.`);
  lines.push(`- Top sampled families: ${topFamilies || "none"}.`);
  if (requiredTokens[slug]) {
    const missing = [...new Set(samples.flatMap((sample) => sample.required.filter((token) => !sample.present.includes(token))))];
    lines.push(`- Required-token sample gaps: ${missing.length ? missing.join(", ") : "none"}.`);
  }
  lines.push(`- Example stock: ${samples[0].summary.names.slice(0, 16).join("; ")}.`);
  lines.push("");
}

lines.push("## Notes");
lines.push("");
lines.push("- This review samples day 1 deterministic stock. Restock progression can increase quantities later.");
lines.push("- Broad merchant-style professions still intentionally carry mixed goods until named merchant subtypes are designed.");
lines.push("- This is a pre-art checkpoint. Prompt configs should not be generated from older item data.");

fs.writeFileSync(outFile, `${lines.join("\n")}\n`);
console.log(`Wrote ${path.relative(root, outFile)}`);
