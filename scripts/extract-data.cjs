"use strict";

const fs = require("fs");
const path = require("path");

const source =
  process.argv[2] ||
  "D:/game/merchant_of_the_six_kingdoms/.orig-work/app/dist/electron/renderer.js";
const outDir = path.resolve(__dirname, "..", "src", "data", "generated");

function decodeJsonParseLiteral(literal) {
  return Function(`"use strict"; return '${literal}';`)();
}

function parseJsonModules(text) {
  const regex = /JSON\.parse\('((?:\\.|[^'])*)'\)/g;
  const modules = [];
  let match;
  while ((match = regex.exec(text))) {
    try {
      modules.push(JSON.parse(decodeJsonParseLiteral(match[1])));
    } catch {
      // Ignore dependency JSON.parse calls that are not data modules.
    }
  }
  return modules;
}

function findArray(modules, predicate, name) {
  const found = modules.find((value) => Array.isArray(value) && predicate(value));
  if (!found) throw new Error(`Could not find ${name}.`);
  return found;
}

function findObject(modules, predicate, name) {
  const found = modules.find((value) => value && !Array.isArray(value) && typeof value === "object" && predicate(value));
  if (!found) throw new Error(`Could not find ${name}.`);
  return found;
}

function findWrappedObject(modules, predicate, name) {
  const direct = modules.find((value) => value && !Array.isArray(value) && typeof value === "object" && predicate(value));
  if (direct) return direct;
  const wrapped = modules.find(
    (value) => Array.isArray(value) && value.length === 1 && value[0] && typeof value[0] === "object" && predicate(value[0])
  );
  if (wrapped) return wrapped[0];
  throw new Error(`Could not find ${name}.`);
}

function writeJson(name, value) {
  fs.writeFileSync(path.join(outDir, `${name}.json`), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

fs.mkdirSync(outDir, { recursive: true });

const text = fs.readFileSync(source, "utf8");
const modules = parseJsonModules(text);

const characters = findArray(
  modules,
  (rows) => rows.length > 100 && rows.some((row) => row && row.portraitFile && "profession" in row),
  "characters"
);
const items = findArray(
  modules,
  (rows) => rows.length > 1000 && rows.some((row) => row && row.iconFile && "loafValue" in row),
  "items"
);
const marketplaces = findArray(
  modules,
  (rows) => rows.length === 20 && rows.some((row) => row && row.connections && row.townsquareFile),
  "marketplaces"
);
const kingdoms = findArray(
  modules,
  (rows) => rows.length >= 6 && rows.length < 20 && rows.some((row) => row && row.illegalItemTags),
  "kingdoms"
);
const professions = findWrappedObject(
  modules,
  (value) => Object.values(value).some((entry) => entry && entry.obtainableItems && entry.bias),
  "professions"
);

characters.forEach((character, index) => {
  character.index = index;
  character.inventory = [];
});
items.forEach((item, index) => {
  item.index = index;
});

writeJson("characters", characters);
writeJson("items", items);
writeJson("marketplaces", marketplaces);
writeJson("kingdoms", kingdoms);
writeJson("professions", professions);
writeJson("manifest", {
  extractedFrom: source,
  counts: {
    characters: characters.length,
    items: items.length,
    marketplaces: marketplaces.length,
    kingdoms: kingdoms.length,
    professions: Object.keys(professions).length,
  },
});

console.log(`Extracted ${characters.length} characters, ${items.length} items, ${marketplaces.length} marketplaces.`);
