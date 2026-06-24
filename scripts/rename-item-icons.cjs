const fs = require("node:fs");
const path = require("node:path");
const { loadGeneratedItems, writeGeneratedItems } = require("./item-catalog.cjs");

const root = path.resolve(__dirname, "..");
const promptDir = path.join(root, "docs", "assets", "icon-prompts");
const publicPrefix = "public/game-assets/items/";
const reportFile = path.join(root, "docs", "assets", "icon-rename-report.json");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function posixDir(file) {
  return path.posix.dirname(file.replace(/\\/g, "/"));
}

function slugify(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_")
    .toLowerCase();
}

function variantSuffix(variant) {
  return variant === "single" ? "" : `_${slugify(variant)}`;
}

function fsPath(publicPath) {
  return path.join(root, publicPath.replace(/\//g, path.sep));
}

function relativeIcon(publicPath) {
  if (!publicPath.startsWith(publicPrefix)) {
    throw new Error(`Unexpected output path: ${publicPath}`);
  }
  return publicPath.slice(publicPrefix.length);
}

function ensureParent(file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
}

const promptFiles = fs
  .readdirSync(promptDir)
  .filter((file) => /^items-\d{4}-\d{4}\.json$/.test(file))
  .sort()
  .map((file) => path.join(promptDir, file));

const usedNewPaths = new Map();
const itemIconByIndex = new Map();
const mappings = [];
const collisions = [];

for (const file of promptFiles) {
  const doc = readJson(file);
  for (const item of doc.items || []) {
    const oldIcon = item.iconFile && item.iconFile.replace(/\\/g, "/");
    const oldOutputs = item.outputs || {};
    const firstOutput = oldOutputs.single || Object.values(oldOutputs)[0];
    if (!oldIcon || !firstOutput) continue;

    const dir = posixDir(oldIcon);
    const baseSlug = slugify(item.name || `item_${item.index}`);

    for (const [variant, oldPublicPath] of Object.entries(oldOutputs)) {
      const baseName = `${baseSlug}${variantSuffix(variant)}` || `item_${item.index}${variantSuffix(variant)}`;
      let newRelative = path.posix.join(dir, `${baseName}.png`);
      let newPublicPath = `${publicPrefix}${newRelative}`;

      if (usedNewPaths.has(newPublicPath) && usedNewPaths.get(newPublicPath) !== `${item.index}:${variant}`) {
        collisions.push({
          path: newPublicPath,
          first: usedNewPaths.get(newPublicPath),
          second: `${item.index}:${variant}`,
        });
        newRelative = path.posix.join(dir, `${baseName}_${item.index}.png`);
        newPublicPath = `${publicPrefix}${newRelative}`;
      }

      usedNewPaths.set(newPublicPath, `${item.index}:${variant}`);
      mappings.push({
        itemIndex: item.index,
        itemName: item.name,
        variant,
        oldPublicPath,
        newPublicPath,
        oldIconFile: oldIcon,
        newIconFile: relativeIcon(newPublicPath),
      });

      if (variant === "single") {
        itemIconByIndex.set(item.index, relativeIcon(newPublicPath));
      }
    }
  }
}

const missingSources = [];
const copied = [];
const oldAssetPaths = new Set();
const newAssetPaths = new Set();

for (const mapping of mappings) {
  const oldFs = fsPath(mapping.oldPublicPath);
  const newFs = fsPath(mapping.newPublicPath);
  oldAssetPaths.add(mapping.oldPublicPath);
  newAssetPaths.add(mapping.newPublicPath);

  if (!fs.existsSync(oldFs)) {
    missingSources.push(mapping);
    continue;
  }
  ensureParent(newFs);
  if (path.resolve(oldFs) !== path.resolve(newFs)) {
    fs.copyFileSync(oldFs, newFs);
  }
  copied.push(mapping);
}

const removedOld = [];
for (const oldPublicPath of oldAssetPaths) {
  if (newAssetPaths.has(oldPublicPath)) continue;
  const oldFs = fsPath(oldPublicPath);
  if (fs.existsSync(oldFs)) {
    fs.unlinkSync(oldFs);
    removedOld.push(oldPublicPath);
  }
}

const items = loadGeneratedItems(root);
let updatedItems = 0;
for (const item of items) {
  const nextIcon = itemIconByIndex.get(item.index);
  if (nextIcon && item.iconFile !== nextIcon) {
    item.iconFile = nextIcon;
    updatedItems += 1;
  }
}
writeGeneratedItems(root, items);

let updatedPromptItems = 0;
for (const file of promptFiles) {
  const doc = readJson(file);
  for (const item of doc.items || []) {
    const itemMappings = mappings.filter((entry) => entry.itemIndex === item.index);
    if (!itemMappings.length) continue;

    const single = itemMappings.find((entry) => entry.variant === "single");
    if (single) item.iconFile = single.newIconFile;
    for (const entry of itemMappings) {
      item.outputs[entry.variant] = entry.newPublicPath;
    }
    updatedPromptItems += 1;
  }
  writeJson(file, doc);
}

const report = {
  generatedAt: new Date().toISOString(),
  totalMappings: mappings.length,
  copied: copied.length,
  removedOld: removedOld.length,
  updatedItems,
  updatedPromptItems,
  missingSources: missingSources.map((entry) => ({
    itemIndex: entry.itemIndex,
    itemName: entry.itemName,
    variant: entry.variant,
    expectedSource: entry.oldPublicPath,
    target: entry.newPublicPath,
  })),
  collisions,
  mappings: mappings.map((entry) => ({
    itemIndex: entry.itemIndex,
    itemName: entry.itemName,
    variant: entry.variant,
    from: entry.oldPublicPath,
    to: entry.newPublicPath,
  })),
};

writeJson(reportFile, report);

console.log(`Mappings: ${mappings.length}`);
console.log(`Copied/current: ${copied.length}`);
console.log(`Removed old files: ${removedOld.length}`);
console.log(`Updated app items: ${updatedItems}`);
console.log(`Updated prompt items: ${updatedPromptItems}`);
console.log(`Missing source images: ${missingSources.length}`);
console.log(`Report: ${path.relative(root, reportFile)}`);
