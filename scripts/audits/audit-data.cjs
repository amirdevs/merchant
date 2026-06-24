const fs = require("fs");
const path = require("path");
const { loadGeneratedItems } = require("../maintenance/item-catalog.cjs");

const root = process.cwd();
const publicDir = path.join(root, "public");
const imgsDir = path.join(publicDir, "game-assets", "imgs");
const mediaDir = path.join(publicDir, "game-assets", "media");
const dataDir = path.join(root, "src", "content");

// Default audit:data is a structural/data-shape gate.
// The generated data still contains inactive visual filenames for townsquares,
// backdrops, ambiance, routes, portraits, and stalls. Keep those deeper checks
// opt-in so verify:current-state is not blocked by retired asset paths.
const auditCatalogCharacterAssetFields = process.argv.includes("--catalog-character-assets");
const auditInactiveWorldAssetFields = process.argv.includes("--inactive-world-assets");
const strictInactiveAssets = process.argv.includes("--strict-assets");

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8"));
}

function baseOf(file) {
  if (!file) return "";
  const name = String(file).replace(/\\/g, "/").split("/").pop();
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(0, dot) : name;
}

function extOf(file) {
  if (!file) return "";
  const dot = String(file).lastIndexOf(".");
  return dot >= 0 ? String(file).slice(dot) : "";
}

function imagePath(file, bucket) {
  return path.join(imgsDir, `${baseOf(file)}--${bucket}${extOf(file)}`);
}

function mediaPath(file, bucket) {
  return path.join(mediaDir, `${baseOf(file)}--${bucket}${extOf(file)}`);
}

function exists(file) {
  return Boolean(file) && fs.existsSync(file);
}

const characters = readJson(path.join("characters", "characters.json"));
const items = loadGeneratedItems(root);
const marketplaces = readJson(path.join("market", "marketplaces.json"));
const professions = readJson(path.join("market", "professions.json"));
const manifest = readJson("manifest.json");

const problems = [];
let skippedLegacyPortraitFields = 0;
let skippedLegacyStallFields = 0;
let skippedLegacyTownsquareFields = 0;
let skippedLegacyBackdropFields = 0;
let skippedLegacyAmbianceFields = 0;
let skippedLegacyRouteFields = 0;

function expectCount(name, actual) {
  const expected = manifest.counts[name];
  if (actual !== expected) problems.push(`${name} count changed: expected ${expected}, got ${actual}`);
}

expectCount("characters", characters.length);
expectCount("items", items.length);
expectCount("marketplaces", marketplaces.length);
expectCount("professions", Object.keys(professions).length);

for (const character of characters) {
  if (!auditCatalogCharacterAssetFields && !strictInactiveAssets) {
    if (character.portraitFile) skippedLegacyPortraitFields += 1;
    if (character.stallFile) skippedLegacyStallFields += 1;
    continue;
  }

  if (character.portraitFile && !exists(imagePath(character.portraitFile, "characters"))) {
    problems.push(`Missing inactive portrait path for ${character.name}: ${character.portraitFile}`);
  }
  if (character.stallFile && !exists(imagePath(character.stallFile, "stalls"))) {
    problems.push(`Missing inactive stall path for ${character.name}: ${character.stallFile}`);
  }
}

for (const market of marketplaces) {
  if (!auditInactiveWorldAssetFields && !strictInactiveAssets) {
    if (market.townsquareFile) skippedLegacyTownsquareFields += 1;
    if (market.backdropFile) skippedLegacyBackdropFields += 1;
    if (market.ambiancePrimaryFile) skippedLegacyAmbianceFields += 1;
    if (market.ambianceSecondaryFile) skippedLegacyAmbianceFields += 1;
    skippedLegacyRouteFields += (market.connections || []).filter((connection) => connection.routeFile).length;
    continue;
  }

  if (market.townsquareFile && !exists(imagePath(market.townsquareFile, "townsquares"))) {
    problems.push(`Missing inactive townsquare path for ${market.name}: ${market.townsquareFile}`);
  }
  if (market.backdropFile && !exists(imagePath(market.backdropFile, "backdrops"))) {
    problems.push(`Missing inactive backdrop path for ${market.name}: ${market.backdropFile}`);
  }
  if (market.ambiancePrimaryFile && !exists(mediaPath(market.ambiancePrimaryFile, "ambiance"))) {
    problems.push(`Missing inactive ambiance path for ${market.name}: ${market.ambiancePrimaryFile}`);
  }
  if (market.ambianceSecondaryFile && !exists(mediaPath(market.ambianceSecondaryFile, "ambiance"))) {
    problems.push(`Missing inactive ambiance path for ${market.name}: ${market.ambianceSecondaryFile}`);
  }
  for (const connection of market.connections || []) {
    if (connection.routeFile && !exists(imagePath(connection.routeFile, "routes"))) {
      problems.push(`Missing inactive route path ${market.name} -> ${connection.marketplaceIndex}: ${connection.routeFile}`);
    }
  }
}

if (problems.length) {
  console.error(`Data audit failed with ${problems.length} issue(s):`);
  for (const problem of problems.slice(0, 100)) console.error(`- ${problem}`);
  if (problems.length > 100) console.error(`- ...and ${problems.length - 100} more`);
  process.exit(1);
}

console.log("Data audit passed.");
console.log(`Characters: ${characters.length}`);
console.log(`Items: ${items.length}`);
console.log(`Marketplaces: ${marketplaces.length}`);
console.log(`Professions: ${Object.keys(professions).length}`);
if (!auditCatalogCharacterAssetFields && !strictInactiveAssets) {
  console.log(`Skipped inactive character asset fields: ${skippedLegacyPortraitFields} portraitFile, ${skippedLegacyStallFields} stallFile.`);
  console.log("Run pnpm audit:character-portraits for the final portrait gate.");
}
if (!auditInactiveWorldAssetFields && !strictInactiveAssets) {
  console.log(
    `Skipped inactive world asset fields: ${skippedLegacyTownsquareFields} townsquare, ${skippedLegacyBackdropFields} backdrop, ${skippedLegacyAmbianceFields} ambiance, ${skippedLegacyRouteFields} route.`
  );
  console.log("Run pnpm audit:data -- --inactive-world-assets to inspect inactive world visual references.");
}
