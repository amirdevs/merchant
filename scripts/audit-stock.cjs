const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dataDir = path.join(root, "src", "data", "generated");
const items = JSON.parse(fs.readFileSync(path.join(dataDir, "items.json"), "utf8"));
const professions = JSON.parse(fs.readFileSync(path.join(dataDir, "professions.json"), "utf8"));

function normalize(value) {
  return String(value || "").toLowerCase().replace(/[_-]+/g, " ").trim();
}

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
    if (depth === 0) {
      const literal = source.slice(firstBrace, index + 1);
      return Function(`"use strict"; return (${literal});`)();
    }
  }
  throw new Error(`Could not parse ${exportName} in ${file}`);
}

const stockArchetypes = extractObject(path.join(root, "src", "data", "stock", "archetypes.ts"), "stockArchetypes");
const professionStockProfiles = extractObject(path.join(root, "src", "data", "stock", "profiles.ts"), "professionStockProfiles");
const itemRecords = items.map((item) => ({ item, tokens: itemTokens(item) }));

function matchingItems(token) {
  const normalized = normalize(token);
  return itemRecords.filter((record) => record.tokens.has(normalized));
}

function collectArchetypeTokens(config) {
  return [
    ...Object.keys(config.weightedTags || {}),
    ...Object.keys(config.quantityMultipliers || {}),
    ...Object.keys(config.minimumQuantities || {}),
    ...(config.forbiddenTags || []),
    ...(config.guaranteedTags || []),
  ];
}

const problems = [];
for (const [id, config] of Object.entries(stockArchetypes)) {
  for (const token of collectArchetypeTokens(config)) {
    if (!matchingItems(token).length) problems.push(`Archetype ${id} token has no item match: ${token}`);
  }
}

const requiredProfessionTokens = {
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

const coverage = [];
for (const [slug, requiredTokens] of Object.entries(requiredProfessionTokens)) {
  const profile = professionStockProfiles[slug];
  if (!profile) {
    problems.push(`Missing stock profile for ${slug}`);
    continue;
  }
  const profileTokens = new Set();
  for (const entry of profile.archetypes || []) {
    for (const token of collectArchetypeTokens(stockArchetypes[entry.id] || {})) profileTokens.add(normalize(token));
  }
  for (const token of profile.guaranteedTags || []) profileTokens.add(normalize(token));

  for (const token of requiredTokens) {
    const count = matchingItems(token).length;
    coverage.push({ slug, token, count });
    if (count <= 0) problems.push(`Required ${slug} token has no item coverage: ${token}`);
    if (!profileTokens.has(normalize(token))) problems.push(`Required ${slug} token is not represented in profile/archetypes: ${token}`);
  }
}

const professionCoverage = Object.entries(professions).map(([slug, profession]) => {
  const poolTokens = (profession.obtainableItems || []).map((entry) => entry.tag).filter((tag) => !["any", "copper_coins", "silver_coins", "gold_coins"].includes(tag));
  const count = itemRecords.filter((record) => poolTokens.some((tag) => record.tokens.has(normalize(tag)))).length;
  return { slug, count, poolTokens };
});

if (problems.length) {
  console.error(`Stock audit failed with ${problems.length} issue(s):`);
  for (const problem of problems.slice(0, 120)) console.error(`- ${problem}`);
  if (problems.length > 120) console.error(`- ...and ${problems.length - 120} more`);
  process.exit(1);
}

console.log("Stock audit passed.");
console.log(`Items: ${items.length}`);
console.log(`Archetypes: ${Object.keys(stockArchetypes).length}`);
console.log("Required token coverage:");
for (const entry of coverage) console.log(`- ${entry.slug}.${entry.token}: ${entry.count}`);
console.log("Profession broad-pool coverage:");
for (const entry of professionCoverage) console.log(`- ${entry.slug}: ${entry.count}`);
