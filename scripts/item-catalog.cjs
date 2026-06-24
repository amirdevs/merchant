const fs = require("fs");
const path = require("path");

const ITEM_CHUNK_SIZE = 300;

function generatedDataDir(root) {
  return path.join(root, "src", "data", "generated");
}

function itemChunkFiles(root) {
  const dataDir = generatedDataDir(root);
  return fs
    .readdirSync(dataDir)
    .filter((file) => /^items-\d{4}-\d{4}\.json$/.test(file))
    .sort()
    .map((file) => path.join(dataDir, file));
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8").replace(/^\uFEFF/, ""));
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function loadGeneratedItems(root) {
  return itemChunkFiles(root).flatMap((file) => readJson(file));
}

function writeGeneratedItems(root, items) {
  const dataDir = generatedDataDir(root);
  const currentChunkFiles = itemChunkFiles(root);

  for (const file of currentChunkFiles) fs.rmSync(file, { force: true });

  for (let index = 0; index < items.length; index += ITEM_CHUNK_SIZE) {
    const start = index + 1;
    const end = Math.min(index + ITEM_CHUNK_SIZE, items.length);
    const file = path.join(dataDir, `items-${String(start).padStart(4, "0")}-${String(end).padStart(4, "0")}.json`);
    writeJson(file, items.slice(index, end));
  }

  const legacyItemsFile = path.join(dataDir, "items.json");
  if (fs.existsSync(legacyItemsFile)) fs.rmSync(legacyItemsFile, { force: true });
}

module.exports = {
  ITEM_CHUNK_SIZE,
  generatedDataDir,
  loadGeneratedItems,
  writeGeneratedItems,
};
