const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const items = require(path.join(root, "src", "data", "generated", "items.json"));
const outDir = path.join(root, "icon-prompts");
const batchSize = 100;

const style =
  "Medieval fantasy merchant inventory icon, hand-painted semi-realistic game asset, isolated object on transparent background, readable at small inventory-tile size, soft parchment-era lighting, consistent three-quarter top-down camera angle, no text, no UI frame, no border, no watermark.";

function isCoin(item) {
  return ["gold coins", "silver coins", "copper coins"].includes(item.name);
}

function variantReason(item) {
  if (item.unique) return null;
  const iconFile = item.iconFile || "";
  if (isCoin(item)) return "coin stack";
  if ((item.tags || []).includes("food")) return "food quantity";
  if (/^storage\/(barrels|crates|sacks)\//.test(iconFile)) return "container fill";
  if (/^supplies\/(ingots|ore|rocks)\//.test(iconFile)) return "raw material pile";
  if (/^fabrics\/(fibers|threads|linen|silk)\//.test(iconFile)) return "fabric bundle";
  if (/^alchemy\/(potions|poison|remedies|solutions|aromatic)\//.test(iconFile)) return "alchemy group";
  if (/^drinks\//.test(iconFile)) return "drink group";
  if (/^paints\//.test(iconFile)) return "paint group";
  if (/^weapons\/arrows\//.test(iconFile)) return "arrow bundle";
  if (/^botanicals\/(seeds|leafs)\//.test(iconFile)) return "botanical bundle";
  if (/^jewlery\/(gems|crystals)\//.test(iconFile)) return "gem crystal group";
  return null;
}

function outputPath(iconFile, variant) {
  if (variant === "single") return `public/game-assets/items/${iconFile}`;
  const parsed = path.posix.parse(iconFile.replace(/\\/g, "/"));
  if (/_1$/.test(parsed.name)) {
    const suffix = variant === "few" ? "_2" : "_3";
    return `public/game-assets/items/${path.posix.join(parsed.dir, parsed.name.replace(/_1$/, suffix) + parsed.ext)}`;
  }
  return `public/game-assets/items/${path.posix.join(parsed.dir, `${parsed.name}_${variant}${parsed.ext}`)}`;
}

function cleanedName(item) {
  return item.name.replace(/\b(common|uncommon|rare|legendary|cheap)\b/gi, "").replace(/\s+/g, " ").trim();
}

function promptFor(item, variant, reason) {
  const baseName = cleanedName(item);
  const tags = (item.tags || []).slice(0, 5).join(", ");
  const rarity = item.rarity > 1 ? ` Rarity cue: ${item.name.split(" ")[0]} quality if that word is a rarity adjective.` : "";
  const sizeCue = item.size >= 50 ? " It should feel physically large and heavy." : item.size >= 5 ? " It should feel medium-sized." : " It should fit a small inventory tile.";

  if (variant === "single") {
    return `${style} Create one clear ${baseName}. Item category tags: ${tags}.${sizeCue}${rarity}`;
  }

  if (variant === "few") {
    return `${style} Create a small grouped quantity of ${baseName}, about 3 to 5 pieces, arranged naturally as a few ${reason}. Item category tags: ${tags}.${sizeCue}${rarity}`;
  }

  return `${style} Create an abundant grouped quantity of ${baseName}, a clear pile, stack, bundle, cluster, or filled-container version that reads as many ${reason}. Item category tags: ${tags}.${sizeCue}${rarity}`;
}

function itemRecord(item) {
  const reason = variantReason(item);
  const variants = reason ? ["single", "few", "many"] : ["single"];
  return {
    index: item.index,
    name: item.name,
    tags: item.tags || [],
    size: item.size,
    weight: item.weight,
    rarity: item.rarity,
    unique: Boolean(item.unique),
    iconFile: item.iconFile,
    variantPolicy: reason ? "single_few_many" : "single",
    variantReason: reason,
    outputs: Object.fromEntries(variants.map((variant) => [variant, outputPath(item.iconFile, variant)])),
    prompts: Object.fromEntries(variants.map((variant) => [variant, promptFor(item, variant, reason)])),
  };
}

function writeJson(file, value) {
  fs.writeFileSync(path.join(outDir, file), `${JSON.stringify(value, null, 2)}\n`);
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const records = items.map(itemRecord);
const variantRecords = records.filter((record) => record.variantPolicy === "single_few_many");
const singleRecords = records.filter((record) => record.variantPolicy === "single");
const byReason = {};
for (const record of variantRecords) byReason[record.variantReason] = (byReason[record.variantReason] || 0) + 1;

const batches = [];
for (let start = 0; start < records.length; start += batchSize) {
  const batch = records.slice(start, start + batchSize);
  const first = String(batch[0].index + 1).padStart(4, "0");
  const last = String(batch[batch.length - 1].index + 1).padStart(4, "0");
  const file = `items-${first}-${last}.json`;
  writeJson(file, {
    batch: { firstItemNumber: batch[0].index + 1, lastItemNumber: batch[batch.length - 1].index + 1, count: batch.length },
    style,
    items: batch,
  });
  batches.push(file);
}

writeJson("manifest.json", {
  generatedAt: new Date().toISOString(),
  totalItems: records.length,
  batchSize,
  batches,
  variantItems: variantRecords.length,
  singleOnlyItems: singleRecords.length,
  variantReasons: byReason,
  style,
});

console.log(`Generated ${batches.length} batches in ${path.relative(root, outDir)}`);
console.log(`Items: ${records.length}`);
console.log(`Variant items: ${variantRecords.length}`);
console.log(`Single-only items: ${singleRecords.length}`);
