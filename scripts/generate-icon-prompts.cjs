const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const items = require(path.join(root, "src", "data", "generated", "items.json"));
const outDir = path.join(root, "docs", "icon-prompts");
const slotsPerSheet = 50;
const columns = 10;
const rows = 5;

const style =
  "Ultra-cartoony fantasy merchant inventory icon, artistic magical game asset, playful and fantastic rather than realistic, bold exaggerated silhouette, chunky toy-like 3D form, hand-painted details, vibrant enchanted colors, glowing magical accents, whimsical proportions, polished collectible-game look, consistent three-quarter top-down camera angle, isolated object, no text, no labels, no UI frame, no border, no watermark.";

const sheetPrompt = [
  "Create one sprite sheet containing exactly 50 separate inventory item icons.",
  "Use a strict 10 columns by 5 rows grid. Every grid cell must contain exactly one centered icon and must stay visually separated from neighboring cells with empty padding.",
  "Use a strongly stylized ultra-cartoony fantasy game-art look, not realistic and not semi-realistic: make the icons feel much cooler, more magical, more artistic, more playful, and more fantastic, with bold shapes, chunky 3D forms, crisp hand-painted details, enchanted glows, saturated accents, rim light, decorative fantasy materials, and collectible-game polish.",
  "Avoid boring everyday realism. Push each item toward a memorable fantasy-game version while preserving what the item is.",
  "Do not add visible grid lines, numbers, labels, captions, letters, watermarks, UI frames, boxes, or shadows that cross cells. Do not show a transparency checkerboard. Use a solid pure #00FF00 green background.",
  "Use the 16:9 canvas option. Inside it, create a centered 2:1 transparent sprite-sheet area with a strict 10 by 5 grid of square cells. The grid should span nearly the full canvas width and leave equal transparent padding above and below. Do not stretch the grid to 16:9.",
  "Make each icon large, sharp, and detailed enough to crop into an individual high-quality icon later. Use the highest available resolution for the 16:9 canvas. The crop area is the centered 10 by 5 grid, not the full 16:9 canvas.",
  "Use the provided slot order exactly, reading left to right across each row, then top to bottom. Do not reorder, skip, merge, duplicate, or rename any slot.",
  "The icons must share one consistent ultra-cartoony magical fantasy game-art direction, lighting setup, camera angle, and scale language, while still making similar items visually distinct by shape, color, material, rarity, decoration, magic effects, and quantity.",
  "Quantity rules are strict. For slots marked one, show exactly one main item only. For slots marked few, show exactly 3 to 5 clearly separated pieces and make the group obviously larger than one. For slots marked many, show at least 12 pieces or an overflowing pile, crate, bowl, sack, bundle, or cluster, making it obviously much more than few.",
].join(" ");

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
  return `public/game-assets/items/${path.posix.join(parsed.dir, `${parsed.name}_${variant}${parsed.ext}`)}`;
}

function cleanedName(item) {
  return item.name.replace(/\b(common|uncommon|rare|legendary|cheap)\b/gi, "").replace(/\s+/g, " ").trim();
}

function rarityCue(item) {
  if (item.rarity <= 1) return "";
  const first = item.name.split(" ")[0].toLowerCase();
  if (!["common", "uncommon", "rare", "legendary", "cheap"].includes(first)) return "";
  return ` Rarity cue: make it visibly ${first} quality through material, finish, ornament, or condition.`;
}

function sizeCue(item) {
  if (item.size >= 50) return "It should feel physically large and heavy.";
  if (item.size >= 5) return "It should feel medium-sized.";
  return "It should read clearly in a small inventory tile.";
}

function promptFor(item, variant, reason) {
  const baseName = cleanedName(item);
  const tags = (item.tags || []).slice(0, 6).join(", ");
  const shared = `Item: ${item.name}. Category tags: ${tags}. ${sizeCue(item)}${rarityCue(item)}`;

  if (variant === "single") {
    return `Create exactly one clear ${baseName}, with no extra duplicate pieces. Make it an ultra-cartoony magical fantasy game icon. ${shared}`;
  }

  if (variant === "few") {
    return `Create exactly 3 to 5 clearly separated ${baseName}, arranged naturally as a few ${reason}. It must visibly contain more pieces than the one version but far fewer than the many version. Make it an ultra-cartoony magical fantasy game icon. ${shared}`;
  }

  return `Create a very abundant quantity of ${baseName}, at least 12 visible pieces or an overflowing pile, stack, bundle, cluster, crate, bowl, sack, or filled-container version that reads as many ${reason}. It must look much larger than the few version. Make it an ultra-cartoony magical fantasy game icon. ${shared}`;
}

function variantsFor(item) {
  const reason = variantReason(item);
  return {
    reason,
    variants: reason ? ["single", "few", "many"] : ["single"],
  };
}

function slotLabel(slot) {
  const variantName = slot.variant === "single" ? "one" : slot.variant;
  return `${slot.sheetSlot}. ${slot.itemName} (${variantName})`;
}

function writeJson(file, value) {
  fs.writeFileSync(path.join(outDir, file), `${JSON.stringify(value, null, 2)}\n`);
}

fs.mkdirSync(outDir, { recursive: true });
for (const file of fs.readdirSync(outDir)) {
  if (/^items-\d{4}-\d{4}\.json$/.test(file) || file === "manifest.json") {
    fs.rmSync(path.join(outDir, file), { force: true });
  }
}

const slots = [];
for (const item of items) {
  const { reason, variants } = variantsFor(item);
  for (const variant of variants) {
    slots.push({
      globalSlot: slots.length + 1,
      itemIndex: item.index,
      itemNumber: item.index + 1,
      itemName: item.name,
      variant,
      variantName: variant === "single" ? "one" : variant,
      variantPolicy: reason ? "single_few_many" : "single",
      variantReason: reason,
      tags: item.tags || [],
      size: item.size,
      weight: item.weight,
      rarity: item.rarity,
      unique: Boolean(item.unique),
      iconFile: item.iconFile,
      output: outputPath(item.iconFile, variant),
      prompt: promptFor(item, variant, reason),
    });
  }
}

const batches = [];
for (let start = 0; start < slots.length; start += slotsPerSheet) {
  const batchSlots = slots.slice(start, start + slotsPerSheet).map((slot, index) => ({
    ...slot,
    sheetSlot: index + 1,
    row: Math.floor(index / columns) + 1,
    column: (index % columns) + 1,
  }));
  const first = String(batchSlots[0].globalSlot).padStart(4, "0");
  const last = String(batchSlots[batchSlots.length - 1].globalSlot).padStart(4, "0");
  const file = `items-${first}-${last}.json`;
  const order = batchSlots.map(slotLabel);

  writeJson(file, {
    batch: {
      firstGlobalSlot: batchSlots[0].globalSlot,
      lastGlobalSlot: batchSlots[batchSlots.length - 1].globalSlot,
      slotCount: batchSlots.length,
      maxSlotsPerSheet: slotsPerSheet,
    },
    grid: {
      columns,
      rows,
      readingOrder: "left-to-right by row, top-to-bottom",
      targetCanvas: "highest available 16:9 canvas",
      targetGrid: "centered 2:1 grid area inside the 16:9 canvas, strict 10x5 square cells",
      targetCell: "square cells; grid spans nearly the full width with transparent padding above and below",
    },
    style,
    sheetPrompt,
    generationPrompt: `${sheetPrompt}\n\nSlot order:\n${order.join("\n")}`,
    order,
    slots: batchSlots,
  });
  batches.push(file);
}

const variantItems = items.filter((item) => variantReason(item)).length;
const byReason = {};
for (const item of items) {
  const reason = variantReason(item);
  if (reason) byReason[reason] = (byReason[reason] || 0) + 1;
}

writeJson("manifest.json", {
  generatedAt: new Date().toISOString(),
  totalItems: items.length,
  totalImageSlots: slots.length,
  slotsPerSheet,
  grid: { columns, rows },
  batches,
  variantItems,
  singleOnlyItems: items.length - variantItems,
  variantReasons: byReason,
  style,
  sheetPrompt,
});

console.log(`Generated ${batches.length} batches in ${path.relative(root, outDir)}`);
console.log(`Items: ${items.length}`);
console.log(`Image slots: ${slots.length}`);
console.log(`Slots per sheet: ${slotsPerSheet}`);
