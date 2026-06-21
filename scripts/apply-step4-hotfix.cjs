const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const touched = [];

function filePath(rel) {
  return path.join(root, rel);
}

function read(rel) {
  return fs.readFileSync(filePath(rel), "utf8").replace(/\r\n/g, "\n");
}

function write(rel, content) {
  fs.writeFileSync(filePath(rel), content.replace(/\r?\n/g, "\n"));
  touched.push(rel);
}

function replaceExact(content, search, replacement, label) {
  if (content.includes(replacement)) return content;
  if (!content.includes(search)) throw new Error(`Could not find expected block for ${label}.`);
  return content.replace(search, replacement);
}

function replaceRegex(content, regex, replacement, label) {
  const next = content.replace(regex, replacement);
  if (next === content) throw new Error(`Could not find expected block for ${label}.`);
  return next;
}

function patchGameTs() {
  const rel = "src/lib/game.ts";
  let content = read(rel);

  content = replaceExact(
    content,
    `import { appraiseOffer, valueOffer, type TradePerspective } from "./barter";`,
    `import { appraiseOffer, valueOffer, visibleOfferableInventory, type TradePerspective } from "./barter";`,
    "game.ts barter import"
  );

  content = replaceExact(
    content,
    `  const candidates = state.playerInventory\n    .filter((entry) => entry.quantity > 0 && !entry.conceal && entry.itemIndex !== avoid)`,
    `  const candidates = visibleOfferableInventory(state.playerInventory, "auto")\n    .filter((entry) => entry.itemIndex !== avoid)`,
    "autoAskPrice offerable filter"
  );

  const biasMerge = `  for (const [tag, weight] of Object.entries(settings.profile.stockBiasWeights || {})) {\n    const normalized = normalizeStockToken(tag);\n    weights.set(normalized, (weights.get(normalized) || 0) + weight);\n  }\n`;
  if (!content.includes("settings.profile.stockBiasWeights")) {
    content = replaceExact(
      content,
      `  const { weights, configs } = weightedArchetypeTags(settings.profile.archetypes);\n  for (const pool of pools) weights.set(normalizeStockToken(pool.tag), (weights.get(normalizeStockToken(pool.tag)) || 0) + 4);`,
      `  const { weights, configs } = weightedArchetypeTags(settings.profile.archetypes);\n${biasMerge}  for (const pool of pools) weights.set(normalizeStockToken(pool.tag), (weights.get(normalizeStockToken(pool.tag)) || 0) + 4);`,
      "stock bias weight merge in game.ts"
    );
  }

  write(rel, content);
}

function patchTypesTs() {
  const rel = "src/data/stock/types.ts";
  let content = read(rel);

  content = replaceExact(
    content,
    `  | "hunter"\n  | "salvage"\n  | "bias";`,
    `  | "hunter"\n  | "salvage";`,
    "remove runtime bias archetype id"
  );

  if (!content.includes("export type StockBiasWeights")) {
    content = replaceExact(
      content,
      `export type LifestyleStockBaseline = {\n  archetypes: WeightedArchetype[];\n  guaranteedTags?: string[];\n};`,
      `export type LifestyleStockBaseline = {\n  archetypes: WeightedArchetype[];\n  guaranteedTags?: string[];\n};\n\nexport type StockBiasWeights = Record<string, number>;`,
      "add StockBiasWeights type"
    );
  }

  if (!content.includes("stockBiasWeights?: StockBiasWeights;")) {
    content = replaceExact(
      content,
      `  lifestyleBaseline?: LifestyleStockBaselineId;\n  stackModifier?: number;`,
      `  lifestyleBaseline?: LifestyleStockBaselineId;\n  stockBiasWeights?: StockBiasWeights;\n  stackModifier?: number;`,
      "add StockProfile.stockBiasWeights"
    );
  }

  write(rel, content);
}

function patchArchetypesTs() {
  const rel = "src/data/stock/archetypes.ts";
  let content = read(rel);
  content = content.replace(/\n\s*\/\/ Runtime placeholder\. `resolveStockProfile` rewrites this per NPC from original generated biases\.\n\s*bias:\s*\{\s*weightedTags:\s*\{\}\s*\},/g, "");
  write(rel, content);
}

function patchStockProfilesTs() {
  const rel = "src/lib/stock-profiles.ts";
  let content = read(rel);

  content = content.replace(`import { stockArchetypes } from "@/data/stock/archetypes";\n`, "");
  content = replaceExact(
    content,
    `import type { LifestyleStockBaselineId, StockProfile, StockProfileOverride, StockTierId } from "@/data/stock/types";`,
    `import type { LifestyleStockBaselineId, StockBiasWeights, StockProfile, StockProfileOverride, StockTierId } from "@/data/stock/types";`,
    "stock profile type import"
  );
  content = content.replace(`const BIAS_ARCHETYPE_ID = "bias" as const;\n`, "");

  content = replaceRegex(
    content,
    /function collectGeneratedBiasWeights\(character: Character, profile: StockProfile\) \{/, 
    `function collectGeneratedBiasWeights(character: Character, profile: StockProfile): StockBiasWeights {`,
    "collectGeneratedBiasWeights return type"
  );

  content = replaceRegex(
    content,
    /function applyGeneratedBiasArchetype\(character: Character, profile: StockProfile\): StockProfile \{[\s\S]*?\n\}\n\nexport function resolveStockProfile/,
    `function applyGeneratedBiasWeights(character: Character, profile: StockProfile): StockProfile {\n  const stockBiasWeights = collectGeneratedBiasWeights(character, profile);\n  if (!Object.keys(stockBiasWeights).length) return profile;\n  return { ...profile, stockBiasWeights };\n}\n\nexport function resolveStockProfile`,
    "replace global bias archetype mutation"
  );

  content = replaceExact(
    content,
    `  return applyGeneratedBiasArchetype(character, profile);`,
    `  return applyGeneratedBiasWeights(character, profile);`,
    "resolveStockProfile bias application"
  );

  write(rel, content);
}

function patchReviewStock() {
  const rel = "scripts/review-stock.cjs";
  let content = read(rel);

  content = content.replace(`const BIAS_ARCHETYPE_ID = "bias";\n`, "");
  content = replaceRegex(
    content,
    /function applyGeneratedBiasArchetype\(character, profile\) \{[\s\S]*?\n\}\n\nfunction resolveStockProfile/,
    `function applyGeneratedBiasWeights(character, profile) {\n  const stockBiasWeights = collectGeneratedBiasWeights(character, profile);\n  if (!Object.keys(stockBiasWeights).length) return profile;\n  return { ...profile, stockBiasWeights };\n}\n\nfunction resolveStockProfile`,
    "review-stock bias profile application"
  );
  content = replaceExact(
    content,
    `  return applyGeneratedBiasArchetype(character, profile);`,
    `  return applyGeneratedBiasWeights(character, profile);`,
    "review-stock resolveStockProfile bias application"
  );

  const biasMerge = `  for (const [tag, weight] of Object.entries(settings.profile.stockBiasWeights || {})) {\n    const normalized = normalize(tag);\n    weights.set(normalized, (weights.get(normalized) || 0) + weight);\n  }\n`;
  if (!content.includes("settings.profile.stockBiasWeights")) {
    content = replaceExact(
      content,
      `  const { weights, configs } = weightedArchetypeTags(settings.profile.archetypes);\n  for (const pool of pools) weights.set(normalize(pool.tag), (weights.get(normalize(pool.tag)) || 0) + 4);`,
      `  const { weights, configs } = weightedArchetypeTags(settings.profile.archetypes);\n${biasMerge}  for (const pool of pools) weights.set(normalize(pool.tag), (weights.get(normalize(pool.tag)) || 0) + 4);`,
      "stock bias weight merge in review-stock"
    );
  }

  write(rel, content);
}

function patchPackageJson() {
  const rel = "package.json";
  let content = read(rel);
  content = replaceExact(
    content,
    `"test:barter": "vitest run src/lib/barter.test.ts"`,
    `"test:barter": "vitest run src/lib/barter.test.ts src/lib/game-auto-offer.test.ts"`,
    "test:barter includes real auto-offer test"
  );
  write(rel, content);
}

function ensureAutoOfferTest() {
  const rel = "src/lib/game-auto-offer.test.ts";
  const content = `import { describe, expect, it } from "vitest";\nimport { autoAskPrice, itemIndexByName, newGame } from "./game";\n\ndescribe("real Ask Price offerability", () => {\n  it("does not auto-offer protected player goods", () => {\n    const state = newGame();\n    const character = state.characters.find((candidate) => candidate.isActive && !candidate.isPlunderer);\n    expect(character).toBeTruthy();\n    if (!character) return;\n\n    const loafIndex = itemIndexByName("loaf");\n    const silverIndex = itemIndexByName("silver coins");\n    const copperIndex = itemIndexByName("copper coins");\n\n    character.inventory = [{ itemIndex: loafIndex, quantity: 1, offerQuantity: 1 }];\n    state.playerInventory = [\n      { itemIndex: silverIndex, quantity: 20, offerQuantity: 0, protected: true },\n      { itemIndex: copperIndex, quantity: 1, offerQuantity: 0 },\n    ];\n\n    autoAskPrice(state, character);\n\n    expect(state.playerInventory.find((entry) => entry.itemIndex === silverIndex)?.offerQuantity || 0).toBe(0);\n  });\n});\n`;
  fs.writeFileSync(filePath(rel), content);
  touched.push(rel);
}

try {
  patchGameTs();
  patchTypesTs();
  patchArchetypesTs();
  patchStockProfilesTs();
  patchReviewStock();
  patchPackageJson();
  ensureAutoOfferTest();
  console.log("Step 4 hotfix applied.");
  console.log("Touched files:");
  for (const rel of [...new Set(touched)]) console.log(`- ${rel}`);
} catch (error) {
  console.error("Step 4 hotfix failed:");
  console.error(error.message);
  process.exit(1);
}
