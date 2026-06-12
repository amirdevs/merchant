const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const imgsDir = path.join(publicDir, "game-assets", "imgs");
const mediaDir = path.join(publicDir, "game-assets", "media");
const dataDir = path.join(root, "src", "data", "generated");

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

const characters = readJson("characters.json");
const items = readJson("items.json");
const marketplaces = readJson("marketplaces.json");
const professions = readJson("professions.json");
const manifest = readJson("manifest.json");

const problems = [];

function expectCount(name, actual) {
  const expected = manifest.counts[name];
  if (actual !== expected) problems.push(`${name} count changed: expected ${expected}, got ${actual}`);
}

expectCount("characters", characters.length);
expectCount("items", items.length);
expectCount("marketplaces", marketplaces.length);
expectCount("professions", Object.keys(professions).length);

for (const character of characters) {
  if (character.portraitFile && !exists(imagePath(character.portraitFile, "characters"))) {
    problems.push(`Missing portrait for ${character.name}: ${character.portraitFile}`);
  }
  if (character.stallFile && !exists(imagePath(character.stallFile, "stalls"))) {
    problems.push(`Missing stall for ${character.name}: ${character.stallFile}`);
  }
}

for (const market of marketplaces) {
  if (market.townsquareFile && !exists(imagePath(market.townsquareFile, "townsquares"))) {
    problems.push(`Missing townsquare for ${market.name}: ${market.townsquareFile}`);
  }
  if (market.backdropFile && !exists(imagePath(market.backdropFile, "backdrops"))) {
    problems.push(`Missing backdrop for ${market.name}: ${market.backdropFile}`);
  }
  if (market.ambiancePrimaryFile && !exists(mediaPath(market.ambiancePrimaryFile, "ambiance"))) {
    problems.push(`Missing ambiance for ${market.name}: ${market.ambiancePrimaryFile}`);
  }
  for (const connection of market.connections || []) {
    if (!exists(imagePath(connection.routeFile, "routes"))) {
      problems.push(`Missing route ${market.name} -> ${connection.marketplaceIndex}: ${connection.routeFile}`);
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
