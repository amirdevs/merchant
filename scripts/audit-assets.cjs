const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const dataDir = path.join(root, "src", "data", "generated");
const strict = process.argv.includes("--strict");

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8"));
}

function existsFromPublic(url) {
  const cleanUrl = String(url || "").replace(/^\/+/, "").replace(/\?.*$/, "");
  return fs.existsSync(path.join(publicDir, cleanUrl.replace(/^game-assets\//, "game-assets/")));
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

function imageUrl(file, bucket) {
  if (!file) return "";
  return `/game-assets/imgs/${baseOf(file)}--${bucket}${extOf(file)}`;
}

function mediaUrl(file, bucket) {
  if (!file) return "";
  return `/game-assets/media/${baseOf(file)}--${bucket}${extOf(file)}`;
}

function itemIconUrl(file) {
  return file ? `/game-assets/items/${String(file).replace(/\\/g, "/")}` : "";
}

const checks = [];
const missing = [];

function check(label, url) {
  if (!url) return;
  checks.push({ label, url });
  if (!existsFromPublic(url)) missing.push({ label, url });
}

const characters = readJson("characters.json");
const items = readJson("items.json");
const marketplaces = readJson("marketplaces.json");

for (const character of characters) {
  check(`portrait: ${character.name}`, imageUrl(character.portraitFile, "characters"));
  check(`stall: ${character.name}`, imageUrl(character.stallFile, "stalls"));
}

for (const item of items) {
  check(`item icon: ${item.name}`, itemIconUrl(item.iconFile));
}

for (const market of marketplaces) {
  check(`townsquare: ${market.name}`, imageUrl(market.townsquareFile, "townsquares"));
  check(`backdrop: ${market.name}`, imageUrl(market.backdropFile, "backdrops"));
  check(`ambiance: ${market.name}`, mediaUrl(market.ambiancePrimaryFile, "ambiance"));
  check(`ambiance: ${market.name}`, mediaUrl(market.ambianceSecondaryFile, "ambiance"));
  for (const connection of market.connections || []) {
    check(`route: ${market.name} -> ${connection.marketplaceIndex}`, imageUrl(connection.routeFile, "routes"));
  }
}

const uiAssetsSource = fs.readFileSync(path.join(root, "src", "lib", "ui-assets.ts"), "utf8");
for (const match of uiAssetsSource.matchAll(/uiAsset\("([^"]+)",\s*"([^"]+)"/g)) {
  check(`ui: ${match[1]}/${match[2]}`, `/game-assets/ui/${match[1]}/${match[2]}`);
}

const byPrefix = missing.reduce((counts, issue) => {
  const prefix = issue.label.split(":")[0];
  counts[prefix] = (counts[prefix] || 0) + 1;
  return counts;
}, {});

console.log(`Asset audit checked ${checks.length} references.`);
console.log(`Missing references: ${missing.length}`);
for (const [prefix, count] of Object.entries(byPrefix).sort()) console.log(`- ${prefix}: ${count}`);

if (missing.length) {
  console.log("First missing references:");
  for (const issue of missing.slice(0, 80)) console.log(`- ${issue.label}: ${issue.url}`);
  if (missing.length > 80) console.log(`- ...and ${missing.length - 80} more`);
}

if (strict && missing.length) process.exit(1);
