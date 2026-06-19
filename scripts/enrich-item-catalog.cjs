const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const itemsFile = path.join(root, "src", "data", "generated", "items.json");

const items = JSON.parse(fs.readFileSync(itemsFile, "utf8"));

function normalize(value) {
  return String(value || "").toLowerCase().replace(/[_-]+/g, " ").trim();
}

function slugify(value) {
  return normalize(value).replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "item";
}

function hasAny(item, tokens) {
  const haystack = [item.name, ...(item.tags || [])].map(normalize);
  return tokens.some((token) => haystack.some((value) => value === token || value.includes(token)));
}

function firstMatchingTag(item, tokens) {
  return (item.tags || []).find((tag) => tokens.includes(normalize(tag)));
}

const familyRules = [
  ["currency", ["coins", "gold coins", "silver coins", "copper coins"]],
  ["document", ["deeds", "company stake", "contract", "license", "map", "maps"]],
  ["book", ["books", "history", "educational", "stories", "compendiums"]],
  ["food", ["food", "bread", "cheese", "dairy"]],
  ["drink", ["drinks", "wine", "beer", "ale", "tea"]],
  ["spice", ["spices", "salt", "sugar"]],
  ["grain", ["grains", "seeds"]],
  ["produce", ["fruit", "veggies", "plants", "flowers", "mushrooms", "leafs", "botanicals"]],
  ["meat", ["meat"]],
  ["seafood", ["seafood", "aquatics"]],
  ["livestock", ["livestock", "packhorses"]],
  ["animal_goods", ["animals", "beasts", "dragon hides", "dragon scales", "bones", "feathers"]],
  ["wood", ["wood", "doors"]],
  ["stone", ["rocks", "statues"]],
  ["ore", ["ore"]],
  ["metal", ["ingots", "iron", "copper", "silver", "gold"]],
  ["gem", ["gems", "crystals"]],
  ["textile", ["fabrics", "linen", "silk", "thread", "clothes", "robes", "cloaks", "hats", "shoes", "gloves"]],
  ["leather", ["leather", "whips"]],
  ["tool", ["tools", "supplies", "keys"]],
  ["weapon", ["weapons", "swords", "axes", "spears", "bows", "daggers", "maces", "flails", "clubs", "crossbows", "arrows", "sword stones"]],
  ["armor", ["armor", "platemail", "shields", "helmets", "guantlets", "leggings", "dragon armor"]],
  ["alchemy", ["alchemy", "potions", "solutions", "aromatics", "remedies", "poisons"]],
  ["magic", ["magic", "wands", "runes", "glyph stones", "scepters", "alphabet stones", "staffs"]],
  ["religion", ["religious", "candles"]],
  ["art", ["paintings", "paints", "pottery", "glass", "coat of arms"]],
  ["music", ["music"]],
  ["game", ["games", "cards"]],
  ["household", ["household", "furniture", "tableware"]],
  ["container", ["storage", "chests"]],
  ["travel", ["supplies", "packhorses"]],
  ["maritime", ["seafood", "aquatics"]],
  ["luxury", ["jewlery", "rings", "necklaces", "amulets", "crowns"]],
  ["contraband", ["poisons", "masks"]],
  ["curio", ["myth"]],
];

const materialByTag = {
  fruit: "fruit",
  veggies: "vegetable",
  mushrooms: "fungus",
  meat: "meat",
  seafood: "fish",
  aquatics: "shellfish",
  dairy: "dairy",
  cheese: "dairy",
  bread: "grain",
  grains: "grain",
  seeds: "grain",
  wood: "wood",
  books: "paper",
  history: "paper",
  educational: "paper",
  stories: "paper",
  compendiums: "paper",
  fabrics: "cloth",
  linen: "cloth",
  silk: "cloth",
  thread: "thread",
  clothes: "cloth",
  robes: "cloth",
  cloaks: "cloth",
  leather: "leather",
  dragon_hides: "leather",
  bones: "bone",
  rocks: "stone",
  pottery: "clay",
  glass: "glass",
  ore: "iron",
  ingots: "iron",
  copper: "copper",
  silver: "silver",
  gold: "gold",
  gems: "gemstone",
  crystals: "crystal",
  candles: "wax",
  aromatics: "oil",
  potions: "spirit",
  solutions: "spirit",
  monsters: "monster_part",
  monster_parts: "monster_part",
  magic: "arcane_material",
  religious: "divine_material",
};

function familyFor(item) {
  for (const [family, tokens] of familyRules) {
    if (hasAny(item, tokens)) return family;
  }
  return "curio";
}

function subfamilyFor(item, family) {
  const ignored = new Set([family, "food", "weapons", "armor", "magic", "tools", "supplies", "animals", "books", "jewlery"]);
  const candidate = (item.tags || []).find((tag) => !ignored.has(slugify(tag)));
  return slugify(candidate || family);
}

function tradeRoleFor(item, family) {
  if (family === "currency") return "currency";
  if (["ore", "wood", "stone", "metal", "gem", "animal_goods"].includes(family)) return "raw";
  if (["produce", "grain", "spice", "alchemy"].includes(family)) return "ingredient";
  if (["tool", "container"].includes(family)) return family;
  if (["weapon", "armor"].includes(family)) return "equipment";
  if (["book", "document"].includes(family)) return "document";
  if (family === "livestock") return "animal";
  if (["luxury", "art", "music", "game", "religion"].includes(family)) return "luxury";
  if (family === "contraband") return "contraband";
  if (family === "curio") return "curio";
  return "finished";
}

function rarityBandFor(item) {
  if (item.unique) return "unique";
  const rarity = Number(item.rarity || 1);
  if (rarity >= 5 || item.loafValue >= 5000) return "legendary";
  if (rarity >= 4 || item.loafValue >= 1000) return "rare";
  if (rarity >= 3 || item.loafValue >= 250) return "uncommon";
  return "common";
}

function bulkProfileFor(item, family) {
  if (family === "currency") return "pile";
  if (["grain", "ore", "metal", "spice"].includes(family)) return "sack";
  if (["drink", "alchemy", "magic"].includes(family)) return "bottle";
  if (["produce", "seafood", "food"].includes(family)) return "basket";
  if (["book", "document"].includes(family)) return "book";
  if (family === "livestock") return "cage";
  if (family === "container") return "chest";
  if (["textile", "leather"].includes(family)) return "roll";
  if (["weapon", "armor", "tool"].includes(family)) return "rack";
  return item.size >= 4 ? "crate" : "single";
}

function quantityFormsFor(item, family, bulkProfile) {
  if (item.unique) return ["one"];
  if (["book", "document", "livestock", "vehicle", "quest"].includes(family)) return ["one"];
  if (item.loafValue >= 1000 && !["currency", "gem"].includes(family)) return ["one"];
  if (["pile", "sack", "basket", "barrel", "bundle", "crate", "jar", "bottle", "rack", "roll"].includes(bulkProfile)) return ["one", "few", "many"];
  if (["currency", "food", "produce", "seafood", "spice", "grain", "ore", "metal", "gem", "alchemy", "magic"].includes(family)) return ["one", "few", "many"];
  return ["one", "few"];
}

function materialAxisFor(item, family) {
  const values = new Set();
  for (const tag of item.tags || []) {
    const material = materialByTag[slugify(tag)];
    if (material) values.add(material);
  }
  if (!values.size) {
    if (["produce", "grain", "spice"].includes(family)) values.add("plant");
    if (family === "weapon" || family === "armor" || family === "tool") values.add("steel");
    if (family === "currency") values.add(hasAny(item, ["gold"]) ? "gold" : hasAny(item, ["silver"]) ? "silver" : "copper");
  }
  return [...values];
}

function productionStageFor(family, tradeRole) {
  if (tradeRole === "raw") return ["raw_material"];
  if (tradeRole === "ingredient") return ["component"];
  if (tradeRole === "tool") return ["tool"];
  if (tradeRole === "equipment") return ["finished_good"];
  if (["currency", "document", "animal", "curio"].includes(tradeRole)) return [tradeRole];
  if (family === "alchemy") return ["refined_material"];
  return ["finished_good"];
}

function freshnessFor(family, item) {
  if (hasAny(item, ["salted", "smoked", "dried", "pickled", "cured"])) return ["preserved"];
  if (["food", "produce", "meat", "seafood", "drink"].includes(family)) return ["fresh"];
  if (["grain", "spice"].includes(family)) return ["shelf_stable"];
  return [];
}

function legalAxisFor(family, item) {
  const values = new Set(["ordinary"]);
  if (["weapon", "armor"].includes(family)) values.add("military_restricted");
  if (family === "contraband" || hasAny(item, ["poison", "mask", "key"])) values.add("forbidden");
  if (item.unique) values.add("licensed");
  return [...values];
}

function marketBehaviorFor(family, tradeRole) {
  const values = new Set();
  if (["food", "grain", "produce", "drink"].includes(family)) values.add("daily_staple");
  if (["ore", "metal", "wood", "stone", "textile", "leather"].includes(family)) values.add("craft_supply");
  if (["weapon", "armor"].includes(family)) values.add("war_good");
  if (["luxury", "art", "music", "game", "jewelry"].includes(family)) values.add("noble_luxury");
  if (["seafood", "maritime"].includes(family)) values.add("port_specialty");
  if (tradeRole === "contraband") values.add("illegal_demand");
  if (!values.size) values.add("bulk_trade");
  return [...values];
}

function storageHandlingFor(item, family, bulkProfile) {
  const values = new Set();
  if (item.weight >= 6 || item.size >= 6) values.add("heavy");
  else if (item.size >= 3) values.add("bulky");
  else values.add("handheld");
  if (["glass", "gem", "art", "book", "document"].includes(family)) values.add("fragile");
  if (["food", "produce", "meat", "seafood", "drink"].includes(family)) values.add("cool_storage");
  if (["grain", "spice", "book", "document"].includes(family)) values.add("dry_storage");
  if (["weapon", "tool"].includes(family)) values.add("sharp");
  if (family === "livestock" || bulkProfile === "cage") values.add("caged");
  if (item.loafValue >= 500) values.add("valuable_small");
  return [...values];
}

function artVariantFor(bulkProfile, forms) {
  const values = new Set([bulkProfile]);
  if (forms.includes("one")) values.add("single_object");
  if (forms.includes("few")) values.add("separated_group");
  if (forms.includes("many")) values.add("overflowing_pile");
  return [...values];
}

function featureHooksFor(family, tradeRole) {
  const values = new Set();
  if (["raw", "ingredient"].includes(tradeRole)) values.add("crafting_input");
  if (["tool", "container"].includes(tradeRole)) values.add("repair_input");
  if (["food", "produce", "meat", "seafood", "grain", "spice"].includes(family)) values.add("cooking_input");
  if (family === "drink") values.add("brewing_input");
  if (family === "alchemy") values.add("alchemy_input");
  if (family === "magic") values.add("enchanting_input");
  if (tradeRole === "contraband") values.add("inspection_risk");
  if (["weapon", "armor"].includes(family)) values.add("equipment");
  if (["luxury", "art", "music", "game", "curio"].includes(family)) values.add("gift");
  if (family === "livestock") values.add("pack_animal");
  return [...values];
}

function sourcesFor(family, item) {
  const values = new Set();
  if (["grain", "produce", "livestock", "food", "drink"].includes(family)) values.add("farmed");
  if (["ore", "stone", "metal", "gem"].includes(family)) values.add("mined");
  if (["wood", "produce", "alchemy"].includes(family)) values.add("foraged");
  if (["tool", "weapon", "armor", "textile", "leather", "container", "art", "music", "game", "household"].includes(family)) values.add("crafted");
  if (family === "religion") values.add("blessed");
  if (family === "contraband") values.add("illicit");
  if (hasAny(item, ["monster", "dragon", "demon", "orcish", "goblin", "troll"])) values.add("monster_derived");
  if (!values.size) values.add("crafted");
  return [...values];
}

function qualityBandsFor(family, item) {
  const values = new Set(["common"]);
  if (item.loafValue >= 250 || Number(item.rarity || 1) >= 3) values.add("fine");
  if (item.loafValue >= 1000 || Number(item.rarity || 1) >= 4) values.add("masterwork");
  if (item.unique) values.add("antique");
  if (family === "magic") values.add("enchanted");
  if (family === "religion") values.add("blessed");
  if (family === "contraband") values.add("counterfeit");
  if (["food", "produce", "meat", "seafood"].includes(family)) values.add("spoiled");
  return [...values];
}

function decayProfileFor(family) {
  if (["produce", "meat", "seafood"].includes(family)) return "fresh";
  if (["food", "drink"].includes(family)) return "expires";
  if (["grain", "spice"].includes(family)) return "preserved";
  if (["weapon", "armor", "tool", "metal"].includes(family)) return "rusts";
  if (family === "alchemy" || family === "magic") return "volatile";
  return "none";
}

function storageNeedsFor(categoryAxes) {
  const needs = new Set();
  for (const value of categoryAxes.storageHandling || []) {
    if (value === "cool_storage") needs.add("chilled");
    if (value === "dry_storage") needs.add("dry");
    if (value === "fragile") needs.add("fragile");
    if (value === "caged") needs.add("stable");
    if (value === "valuable_small") needs.add("locked");
    if (value === "sharp") needs.add("hazardous");
  }
  return [...needs];
}

const seenIds = new Map();
const enriched = items.map((item) => {
  const family = familyFor(item);
  const subfamily = subfamilyFor(item, family);
  const tradeRole = tradeRoleFor(item, family);
  const bulkProfile = bulkProfileFor(item, family);
  const forms = quantityFormsFor(item, family, bulkProfile);
  const categoryAxes = {
    material: materialAxisFor(item, family),
    productionStage: productionStageFor(family, tradeRole),
    freshness: freshnessFor(family, item),
    legalSocial: legalAxisFor(family, item),
    marketBehavior: marketBehaviorFor(family, tradeRole),
    storageHandling: storageHandlingFor(item, family, bulkProfile),
    artVariant: artVariantFor(bulkProfile, forms),
    featureHooks: featureHooksFor(family, tradeRole),
  };
  const baseId = slugify(item.name);
  const count = seenIds.get(baseId) || 0;
  seenIds.set(baseId, count + 1);
  const id = count ? `${baseId}_${item.index}` : baseId;
  const tags = [...new Set([...(item.tags || []), family, subfamily, tradeRole].filter(Boolean))];

  return {
    index: item.index,
    id,
    name: item.name,
    displayName: item.displayName || item.name,
    iconFile: item.iconFile,
    tags,
    family,
    subfamily,
    categoryAxes,
    forms,
    professionUses: [],
    regions: [],
    sources: sourcesFor(family, item),
    tradeRole,
    rarityBand: rarityBandFor(item),
    qualityBands: qualityBandsFor(family, item),
    bulkProfile,
    storageNeeds: storageNeedsFor(categoryAxes),
    decayProfile: decayProfileFor(family),
    marketBehavior: categoryAxes.marketBehavior,
    loafValue: item.loafValue,
    size: item.size,
    weight: item.weight,
    pull: item.pull,
    carry: item.carry,
    rarity: item.rarity,
    unique: item.unique,
    kingdomIndex: item.kingdomIndex,
    imageFile: item.imageFile,
    textFile: item.textFile,
  };
});

fs.writeFileSync(itemsFile, `${JSON.stringify(enriched, null, 2)}\n`);

const familyCounts = enriched.reduce((counts, item) => {
  counts[item.family] = (counts[item.family] || 0) + 1;
  return counts;
}, {});

console.log(`Enriched ${enriched.length} items.`);
for (const [family, count] of Object.entries(familyCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`${family}: ${count}`);
}
