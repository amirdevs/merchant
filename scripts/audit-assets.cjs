const fs = require("fs");
const path = require("path");
const { loadGeneratedItems } = require("./item-catalog.cjs");

const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const dataDir = path.join(root, "src", "data", "generated");
const strict = process.argv.includes("--strict");
const verbose = process.argv.includes("--verbose") || strict;
const auditGeneratedAssetRefs = process.argv.includes("--generated-assets") || strict;
const auditCatalogCharacterAssetFields = process.argv.includes("--catalog-character-assets") || strict;
const auditUiAssets = process.argv.includes("--ui-assets") || strict;

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
const skipped = {
  inactivePortrait: 0,
  inactiveStall: 0,
  itemIcon: 0,
  townsquare: 0,
  backdrop: 0,
  ambiance: 0,
  route: 0,
  ui: 0,
};

function check(label, url) {
  if (!url) return;
  checks.push({ label, url });
  if (!existsFromPublic(url)) missing.push({ label, url });
}

const characters = readJson("characters.json");
const items = loadGeneratedItems(root);
const marketplaces = readJson("marketplaces.json");

for (const character of characters) {
  if (!auditCatalogCharacterAssetFields) {
    if (character.portraitFile) skipped.inactivePortrait += 1;
    if (character.stallFile) skipped.inactiveStall += 1;
    continue;
  }

  check(`inactive portrait: ${character.name}`, imageUrl(character.portraitFile, "characters"));
  check(`inactive stall: ${character.name}`, imageUrl(character.stallFile, "stalls"));
}

for (const item of items) {
  if (!auditGeneratedAssetRefs) {
    if (item.iconFile) skipped.itemIcon += 1;
    continue;
  }
  check(`item icon: ${item.name}`, itemIconUrl(item.iconFile));
}

for (const market of marketplaces) {
  if (!auditGeneratedAssetRefs) {
    if (market.townsquareFile) skipped.townsquare += 1;
    if (market.backdropFile) skipped.backdrop += 1;
    if (market.ambiancePrimaryFile) skipped.ambiance += 1;
    if (market.ambianceSecondaryFile) skipped.ambiance += 1;
    skipped.route += (market.connections || []).filter((connection) => connection.routeFile).length;
    continue;
  }

  check(`townsquare: ${market.name}`, imageUrl(market.townsquareFile, "townsquares"));
  check(`backdrop: ${market.name}`, imageUrl(market.backdropFile, "backdrops"));
  check(`ambiance: ${market.name}`, mediaUrl(market.ambiancePrimaryFile, "ambiance"));
  check(`ambiance: ${market.name}`, mediaUrl(market.ambianceSecondaryFile, "ambiance"));
  for (const connection of market.connections || []) {
    check(`route: ${market.name} -> ${connection.marketplaceIndex}`, imageUrl(connection.routeFile, "routes"));
  }
}

const uiAssetsPath = path.join(root, "src", "lib", "ui-assets.ts");
if (fs.existsSync(uiAssetsPath)) {
  const uiAssetsSource = fs.readFileSync(uiAssetsPath, "utf8");
  const uiMatches = [...uiAssetsSource.matchAll(/uiAsset\("([^"]+)",\s*"([^"]+)"/g)];
  if (!auditUiAssets) {
    skipped.ui += uiMatches.length;
  } else {
    for (const match of uiMatches) check(`ui: ${match[1]}/${match[2]}`, `/game-assets/ui/${match[1]}/${match[2]}`);
  }
}

const byPrefix = missing.reduce((counts, issue) => {
  const prefix = issue.label.split(":")[0];
  counts[prefix] = (counts[prefix] || 0) + 1;
  return counts;
}, {});

console.log(`Asset audit checked ${checks.length} active references.`);
console.log(`Missing active references: ${missing.length}`);
console.log(
  `Skipped inactive/generated references by default: ${skipped.inactivePortrait} portrait, ${skipped.inactiveStall} stall, ${skipped.itemIcon} item icon, ${skipped.townsquare} townsquare, ${skipped.backdrop} backdrop, ${skipped.ambiance} ambiance, ${skipped.route} route, ${skipped.ui} ui.`
);
console.log("Use pnpm audit:assets -- --strict to run the full inactive/generated visual reference audit.");
console.log("Use pnpm audit:character-portraits for the final portrait gate.");
for (const [prefix, count] of Object.entries(byPrefix).sort()) console.log(`- ${prefix}: ${count}`);

if (missing.length && verbose) {
  console.log("First missing references:");
  for (const issue of missing.slice(0, 80)) console.log(`- ${issue.label}: ${issue.url}`);
  if (missing.length > 80) console.log(`- ...and ${missing.length - 80} more`);
}

if (strict && missing.length) process.exit(1);
