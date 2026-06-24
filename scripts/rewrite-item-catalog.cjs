const fs = require("fs");
const path = require("path");
const { loadGeneratedItems, writeGeneratedItems } = require("./item-catalog.cjs");

const root = path.join(__dirname, "..");
const dataDir = path.join(root, "src", "data", "generated");
const manifestFile = path.join(dataDir, "manifest.json");
const charactersFile = path.join(dataDir, "characters.json");
const professionsFile = path.join(dataDir, "professions.json");
const marketplacesFile = path.join(dataDir, "marketplaces.json");
const kingdomsFile = path.join(dataDir, "kingdoms.json");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function normalize(value) {
  return String(value || "").toLowerCase().replace(/[_-]+/g, " ").trim();
}

function slugify(value) {
  return normalize(value).replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "item";
}

function uniqueSlug(base, used) {
  let slug = slugify(base);
  let next = slug;
  let counter = 2;
  while (used.has(next)) {
    next = `${slug}_${counter}`;
    counter += 1;
  }
  used.add(next);
  return next;
}

const placeReplacements = [
  ["East Coast Shipping Company", "Sunwake Harbor Company"],
  ["Boone", "Amberwick"],
  ["Ascension", "Highbell"],
  ["Ayr", "Stormmere"],
  ["Notting Hill", "Crownfall"],
  ["Notting", "Crownfall"],
  ["Shikyomo Volcano", "Emberpeak"],
  ["Shikyomo", "Embercourt"],
  ["The Citadel", "Brasskeep"],
  ["Citadel", "Brasskeep"],
  ["Kai", "Pearlgate"],
  ["Riverton", "Riverwake"],
  ["Dauphine Coast", "Dawnmere Coast"],
  ["Clydesdale", "Appleford"],
  ["Warg Bay", "Wolfhook Bay"],
  ["Hollow Lake", "Mirrorfen"],
  ["Eldham Harbor", "Oldwake Harbor"],
  ["Ingress Rock", "Gatecrag"],
  ["Egilsdóttir", "Frosthaven"],
  ["Egilsdottir", "Frosthaven"],
  ["Oasis of Refuge", "Sunwell Oasis"],
  ["Kazuujan", "Glassmere"],
  ["Kaichi", "Goldreef"],
  ["Redlands", "Redvale"],
  ["Danburg", "Bellmarsh"],
  ["Hartford", "Greenhollow"],
  ["Fray", "Border March"],
];

const wordReplacements = [
  ["Mythology", "Starfall"],
  ["Myth", "Crowncards"],
  ["myth", "crowncards"],
  ["Realm", "Painted Coast"],
  ["realm", "painted coast"],
  ["Toki Pona", "Tide Cant"],
  ["toki pona", "tide cant"],
  ["Rosetta Stone", "Harbor Glossary"],
  ["Necromancy", "Gravebinding"],
  ["necromancy", "gravebinding"],
  ["Conjuration", "Lantern-Summoning"],
  ["Revision", "Reshaping"],
  ["Entropy", "Unraveling"],
  ["Fortuitism", "Luckbinding"],
  ["Revival", "Springtide"],
  ["Crusades", "Banner Wars"],
  ["Feudalism", "Guildrule"],
  ["Destruction", "Sundering"],
  ["Darkness", "Long Dusk"],
  ["Winston Robert", "Merren Vale"],
  ["Captain Tucker", "Captain Vey"],
  ["Elder Ian", "Elder Orren"],
  ["Jaqu", "Jaro"],
  ["Urand", "Starwell"],
  ["urand", "starwell"],
  ["orcish", "ironclan"],
  ["Orcish", "Ironclan"],
  ["orc", "ironclan"],
  ["Orc", "Ironclan"],
  ["goblin", "bogling"],
  ["Goblin", "Bogling"],
  ["hobgoblin", "bridge bogling"],
  ["Hobgoblin", "Bridge Bogling"],
  ["troll", "mire brute"],
  ["Troll", "Mire Brute"],
  ["warg", "dusk wolf"],
  ["Warg", "Dusk Wolf"],
  ["elven", "starcourt"],
  ["Elven", "Starcourt"],
  ["dwarf", "deepforge"],
  ["Dwarf", "Deepforge"],
  ["naga", "reef serpent"],
  ["Naga", "Reef Serpent"],
  ["merfolk", "tidefolk"],
  ["Merfolk", "Tidefolk"],
  ["demon", "ash fiend"],
  ["Demon", "Ash Fiend"],
  ["vampire", "nightbound"],
  ["Vampire", "Nightbound"],
  ["juggernaut", "storm ox colossus"],
  ["Juggernaut", "Storm Ox Colossus"],
];

const qualityReplacements = [
  ["legendary", "fabled"],
  ["Legendary", "Fabled"],
  ["rare", "scarce"],
  ["Rare", "Scarce"],
  ["uncommon", "notable"],
  ["Uncommon", "Notable"],
  ["common", "market"],
  ["Common", "Market"],
  ["cheap", "rough"],
  ["Cheap", "Rough"],
];

const directNames = new Map([
  [3, "Sunwake Harbor Company Share"],
  [4, "Painted Coast Annals I: First Lanterns"],
  [5, "Painted Coast Annals II: Crownfall Roads"],
  [6, "Painted Coast Annals III: Guild Charms"],
  [7, "Painted Coast Annals IV: The Sundering Tide"],
  [8, "Painted Coast Annals V: Springtide Markets"],
  [9, "Painted Coast Annals VI: The Banner Wars"],
  [10, "Painted Coast Annals VII: The Long Dusk"],
  [11, "Painted Coast Annals VIII: Guildrule"],
  [12, "Amberwick Harbor Chronicle"],
  [13, "Highbell Shrine Chronicle"],
  [14, "Stormmere Ledger Chronicle"],
  [15, "Crownfall Hill Chronicle"],
  [16, "Embercourt Market Chronicle"],
  [17, "Brasskeep Gate Chronicle"],
  [18, "Pearlgate Tide Chronicle"],
  [19, "Riverwake Mill Chronicle"],
  [20, "Dawnmere Coast Chronicle"],
  [21, "Appleford Orchard Chronicle"],
  [22, "Wolfhook Bay Chronicle"],
  [23, "Mirrorfen Lake Chronicle"],
  [24, "Oldwake Harbor Chronicle"],
  [25, "Gatecrag Toll Chronicle"],
  [26, "Frosthaven Snow Chronicle"],
  [27, "Sunwell Oasis Chronicle"],
  [28, "Glassmere Court Chronicle"],
  [29, "Blue Enamel Charms"],
  [30, "Lantern-Summoning Primer"],
  [31, "Gravebinding Primer"],
  [32, "Mirror-Mask Primer"],
  [33, "Reshaping Primer"],
  [34, "Unraveling Primer"],
  [35, "Field Farmer's Almanac"],
  [36, "Painted Flower Almanac"],
  [37, "Pocket Guide to Small Beasts"],
  [38, "Pocket Guide to Work Beasts"],
  [39, "Fisher's Tide Almanac"],
  [40, "Blue Enamel Bestiary"],
  [41, "Amateur Alchemist's Shelf"],
  [42, "Miner's Chalk Reference"],
  [43, "Blacksmith's Door Directory"],
  [44, "Crowncards Table Rules"],
  [45, "Crowncards Collector's Compendium"],
  [46, "Crowncards Deckcraft I"],
  [47, "Crowncards Deckcraft II"],
  [48, "Crowncards Winning Tables"],
  [49, "The Great Crowncards Match"],
  [50, "Nine Lantern Signs"],
  [51, "Starfall Epic"],
  [52, "One Hundred Thirty-One Market Charms"],
  [53, "Book of Springtide"],
  [54, "Book of Springtide in Gold Sleeve"],
  [55, "Children of the Tide Saints"],
  [56, "Moonlit Awareness and Wonder"],
  [57, "Luckbinder Manifesto"],
  [58, "Battle of Stormmere"],
  [59, "Legend of Jaro"],
  [60, "Crownfall the First"],
  [61, "A Poor Merchant's Lucky Day"],
  [62, "Bellmarsh Battle Report"],
  [63, "Tragedy of Captain Vey"],
  [64, "Chronicles of the Banner Wars"],
  [65, "little tide words"],
  [66, "Harbor Tales for Children"],
  [67, "Folk Tales of the Border March"],
  [68, "A Parable of Small Debts"],
  [69, "Elder Orren's Indecent Errand"],
  [70, "Prophecies of a Thousand Market Days"],
  [71, "Amateur Alchemy"],
  [72, "Advanced Alchemy"],
  [73, "Merchant's Brass Handbook"],
  [74, "Pocket Price Formula"],
  [75, "The Practical Way of War"],
  [76, "Tide Cant Harbor Glossary"],
  [77, "Meditations by the Warehouse Door"],
  [78, "Ponderings of the Infinite Ledger"],
  [79, "Early Economics of Harbor Bread"],
  [80, "Letter from a Worried Mother"],
  [81, "Critique of Merren Vale's Painting"],
  [82, "A Discussion on Trade Languages"],
  [83, "A Study of Common Weapons"],
  [84, "Essay on Caravan Strategy"],
  [85, "Examination of Market Beasts"],
  [86, "Experimental Field Remedies"],
  [87, "Redvale War Update"],
  [88, "Young Lovers' Letter"],
  [1951, "Crowncards Deck"],
  [1952, "Crowncards Tide Card"],
  [1953, "Crowncards Sun Card"],
  [1954, "Crowncards Star Card"],
  [1955, "Crowncards Moon Card"],
  [1956, "Crowncards Ember Card"],
  [1957, "Crowncards Clock Card"],
  [1958, "Crowncards Cloud Card"],
  [1959, "Crowncards Fish Card"],
  [1960, "Crowncards Sprout Card"],
  [1961, "Crowncards Frost Card"],
  [1962, "Crowncards Dream Card"],
  [1963, "Crowncards Heart Card"],
  [1964, "Crowncards Madness Card"],
  [1965, "Crowncards Lightning Card"],
  [1966, "Crowncards Harvest Card"],
  [1967, "Crowncards Hare Card"],
  [1968, "Crowncards Peace Card"],
  [1969, "Crowncards War Card"],
  [1970, "Crowncards Fox Card"],
  [1971, "Crowncards Lantern Card"],
]);

const tagReplacements = new Map([
  ["jewlery", "jewelry"],
  ["myth", "crowncards"],
  ["myth books", "crowncards_lore"],
  ["monster parts", "monster_parts"],
  ["glyph stones", "glyph_stones"],
  ["coat of arms", "heraldic_art"],
  ["shikyomo resistance", "rebellion"],
  ["toki pona", "tide_cant"],
  ["dariy", "dairy"],
  ["leafs", "leaves"],
  ["guantlets", "gauntlets"],
  ["packhorses", "pack_animals"],
  ["deserts", "desserts"],
  ["carts", "vehicles"],
  ["packs", "travel"],
  ["graves", "religion"],
  ["trolls", "mire_brutes"],
  ["goblin", "boglings"],
  ["goblins", "boglings"],
  ["orcish", "ironclan"],
  ["elven", "starcourt"],
]);

const sourceTagFragments = [
  "boone",
  "ascension",
  "ayr",
  "notting",
  "shikyomo",
  "citadel",
  "kazuujan",
  "kaichi",
  "redlands",
  "toki",
  "east coast",
  "troll",
  "goblin",
  "orcish",
  "elven",
];

function applyTextReplacements(value) {
  let next = String(value || "");
  const replaceAllInsensitive = (source, from, to) => {
    const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return source.replace(new RegExp(`\\b${escaped}\\b`, "gi"), to);
  };
  for (const [from, to] of placeReplacements) next = replaceAllInsensitive(next, from, to);
  for (const [from, to] of wordReplacements) next = replaceAllInsensitive(next, from, to);
  for (const [from, to] of qualityReplacements) next = replaceAllInsensitive(next, from, to);
  return next.replace(/\s+/g, " ").trim();
}

function cleanedTags(tags, itemName = "") {
  const result = new Set();
  const derivedTags = new Set(["raw", "ingredient", "finished", "equipment", "animal"]);
  for (const rawTag of tags || []) {
    const normalized = normalize(rawTag);
    if (!normalized) continue;
    if (derivedTags.has(normalized)) continue;
    if (normalized === "ore" && !/\bore\b/i.test(itemName)) continue;
    if (normalized === "drink") continue;
    if (sourceTagFragments.some((fragment) => normalized.includes(fragment))) continue;
    result.add(tagReplacements.get(normalized) || slugify(applyTextReplacements(normalized)));
  }
  return [...result];
}

function familyForAdded(tags) {
  const values = tags.map(normalize);
  if (values.includes("currency")) return "currency";
  if (values.includes("spice")) return "spice";
  if (values.includes("grain")) return "grain";
  if (values.includes("produce")) return "produce";
  if (values.includes("seafood")) return "seafood";
  if (values.includes("meat")) return "meat";
  if (values.includes("drink") || values.includes("drinks")) return "drink";
  if (values.includes("ore")) return "ore";
  if (values.includes("metal")) return "metal";
  if (values.includes("textile")) return "textile";
  if (values.includes("leather")) return "leather";
  if (values.includes("tool")) return "tool";
  if (values.includes("alchemy")) return "alchemy";
  if (values.includes("magic")) return "magic";
  if (values.includes("religion")) return "religion";
  if (values.includes("book")) return "book";
  if (values.includes("art")) return "art";
  if (values.includes("music")) return "music";
  if (values.includes("game")) return "game";
  if (values.includes("container")) return "container";
  if (values.includes("travel")) return "travel";
  if (values.includes("maritime")) return "maritime";
  if (values.includes("luxury")) return "luxury";
  if (values.includes("document")) return "document";
  if (values.includes("contraband")) return "contraband";
  if (values.includes("livestock")) return "livestock";
  if (values.includes("household")) return "household";
  return "curio";
}

function addedItem(name, tags, loafValue, size = 1, weight = 1, rarity = 1) {
  const normalizedTags = tags.map((tag) => tag === "drink" ? "drinks" : tag);
  const family = familyForAdded(normalizedTags);
  return {
    name,
    displayName: name,
    iconFile: null,
    tags: [...new Set([...normalizedTags, family])],
    loafValue,
    size,
    weight,
    pull: 0,
    carry: 0,
    rarity,
    unique: false,
    kingdomIndex: null,
    imageFile: null,
    textFile: null,
  };
}

const additions = [
  ["brass trade token", ["currency", "trade_instrument"], 12, 0, 0],
  ["sealed credit note", ["currency", "document", "trade_instrument"], 500, 0, 0, 2],
  ["dockmaster tally strip", ["document", "maritime"], 45],
  ["caravan bond", ["document", "trade_instrument"], 900, 1, 1, 3],
  ["pearl backed promissory note", ["document", "luxury"], 1600, 1, 1, 3],
  ["jewel weight scale set", ["tool", "luxury"], 240, 2, 2, 2],
  ["merchant seal kit", ["tool", "document"], 180, 1, 1, 2],
  ["oat loaf", ["food", "bread"], 8],
  ["barley flatbread", ["food", "bread", "grain"], 7],
  ["honeycrust roll", ["food", "bread", "honey"], 12],
  ["salt bun", ["food", "bread", "spice"], 9],
  ["moonbun pastry", ["food", "desserts"], 18, 1, 1, 2],
  ["orchard pie", ["food", "desserts", "fruit"], 24, 1, 2, 2],
  ["sailor hardcake", ["food", "travel"], 6],
  ["festival sugar twist", ["food", "desserts", "festival_good"], 15],
  ["amber wheat sack", ["grain", "food"], 30, 3, 5],
  ["blue barley sack", ["grain", "food"], 28, 3, 5],
  ["red millet sack", ["grain", "food"], 25, 3, 4],
  ["moonpea seed packet", ["grain", "seeds"], 14],
  ["saffron crocus bulbs", ["grain", "seeds", "spice"], 80, 1, 1, 3],
  ["orchard graft bundle", ["grain", "produce"], 55, 2, 2, 2],
  ["clover feed sack", ["grain", "livestock"], 18, 3, 4],
  ["sunpear", ["produce", "fruit", "food"], 10],
  ["moonplum", ["produce", "fruit", "food"], 12],
  ["saltmelon", ["produce", "fruit", "food"], 16, 2, 3],
  ["ruby carrot", ["produce", "veggies", "food"], 8],
  ["lantern squash", ["produce", "veggies", "food"], 15, 2, 3],
  ["glassberry basket", ["produce", "fruit", "food"], 30, 2, 2, 2],
  ["stormcap mushroom", ["produce", "mushrooms", "food"], 22, 1, 1, 2],
  ["pepperleaf bundle", ["produce", "spice", "food"], 14],
  ["pork shoulder", ["meat", "food"], 45, 2, 4],
  ["beef rib slab", ["meat", "food"], 55, 2, 5],
  ["mutton haunch", ["meat", "food"], 42, 2, 4],
  ["pepper sausage coil", ["meat", "food", "spice"], 34, 1, 2],
  ["salt cured bacon", ["meat", "food"], 38, 1, 2],
  ["rendered tallow jar", ["meat", "container"], 18, 1, 2],
  ["butcher twine", ["tool", "meat"], 8],
  ["silverfin fish", ["seafood", "fish", "food"], 14],
  ["lanternfish", ["seafood", "fish", "food"], 18, 1, 1, 2],
  ["tide eel", ["seafood", "fish", "food"], 20],
  ["reef crab", ["seafood", "shellfish", "food"], 18],
  ["moon oyster", ["seafood", "shellfish", "food", "luxury"], 32, 1, 1, 2],
  ["salted cod barrel", ["seafood", "food", "container"], 85, 4, 7, 2],
  ["fish roe jar", ["seafood", "food", "luxury"], 70, 1, 1, 3],
  ["squid ink flask", ["seafood", "alchemy"], 48],
  ["honey ale keg", ["drink", "barrels"], 95, 4, 7, 2],
  ["pear wine bottle", ["drink", "luxury"], 45, 1, 1, 2],
  ["berry cordial", ["drink", "luxury"], 55, 1, 1, 2],
  ["spiced tea tin", ["drink", "spice"], 28],
  ["mintwater flask", ["drink"], 10],
  ["pewter tankard", ["household", "drink"], 20],
  ["blueglass cup", ["household", "glass", "drink"], 26],
  ["Tidefall saffron", ["spice", "food", "luxury"], 250, 1, 1, 4],
  ["smoked salt jar", ["spice", "food"], 35],
  ["star salt jar", ["spice", "magic", "food"], 90, 1, 1, 3],
  ["cinnamon bark roll", ["spice", "food"], 24],
  ["vanilla pod tube", ["spice", "food"], 75, 1, 1, 3],
  ["berry jam jar", ["food", "spice"], 32],
  ["pickled onion jar", ["food", "spice"], 24],
  ["sailcloth roll", ["textile", "maritime"], 60, 3, 4],
  ["blue brocade panel", ["textile", "luxury"], 120, 2, 2, 3],
  ["sea silk scarf", ["textile", "luxury"], 180, 1, 1, 3],
  ["gold thread spool", ["textile", "luxury"], 110, 1, 1, 3],
  ["bone needle case", ["tool", "textile"], 35],
  ["pattern paper roll", ["textile", "document"], 18],
  ["cured hide", ["leather", "animal_goods"], 45, 2, 3],
  ["waxed boot leather", ["leather", "textile"], 65, 2, 3],
  ["dyed strap bundle", ["leather", "tool"], 28],
  ["saddle pad", ["leather", "livestock"], 42, 2, 3],
  ["shell button blanks", ["animal_goods", "textile"], 18],
  ["pine plank stack", ["wood", "construction"], 36, 4, 7],
  ["oak beam", ["wood", "construction"], 55, 5, 9],
  ["barrel stave bundle", ["wood", "container"], 24, 2, 3],
  ["pitch bucket", ["tool", "maritime"], 38, 1, 3],
  ["slate tile stack", ["stone", "construction"], 28, 3, 6],
  ["iron nail keg", ["metal", "construction"], 42, 2, 4],
  ["bog iron ore", ["ore", "metal"], 20, 2, 4],
  ["red iron ore", ["ore", "metal"], 22, 2, 4],
  ["charcoal bundle", ["tool", "metal"], 16, 2, 3],
  ["forge flux jar", ["metal", "alchemy"], 30],
  ["steel billet", ["metal", "ingots"], 70, 2, 4],
  ["brass bar", ["metal", "ingots"], 45, 2, 3],
  ["rivet tin", ["metal", "tool"], 18],
  ["hinge blank", ["metal", "construction"], 24],
  ["quenching oil jar", ["metal", "tool"], 32],
  ["sea glass chips", ["gem", "glass", "luxury"], 40],
  ["moonstone pebble", ["gem", "luxury"], 95, 1, 1, 3],
  ["pearl seed", ["gem", "seafood", "luxury"], 70, 1, 1, 3],
  ["mother of pearl tile", ["gem", "shell", "luxury"], 85, 1, 1, 3],
  ["enamel powder jar", ["gem", "art"], 60],
  ["farrier rasp", ["tool", "livestock"], 35],
  ["glassblower pipe", ["tool", "glass"], 90, 2, 2, 3],
  ["net mender shuttle", ["tool", "maritime"], 24],
  ["rope splicing fid", ["tool", "maritime"], 22],
  ["ledger ruler", ["tool", "document"], 18],
  ["brass compass", ["tool", "travel"], 120, 1, 1, 3],
  ["reed basket", ["container", "household"], 14, 2, 1],
  ["waxed pouch", ["container", "travel"], 18],
  ["blueglass bottle", ["container", "glass"], 22],
  ["clay amphora", ["container", "drink"], 28, 2, 3],
  ["padded gem case", ["container", "luxury"], 60, 1, 1, 2],
  ["potion rack", ["container", "alchemy"], 75, 2, 2],
  ["trail lantern", ["travel", "tool"], 36, 1, 2],
  ["sunwax candle", ["travel", "religion"], 8],
  ["road map", ["travel", "document"], 40],
  ["toll pass", ["travel", "document"], 55],
  ["saddlebag pair", ["travel", "leather"], 65, 2, 3],
  ["caravan repair kit", ["travel", "tool"], 85, 2, 3],
  ["weather charm", ["travel", "magic"], 75, 1, 1, 2],
  ["tar pot", ["maritime", "tool"], 30, 1, 2],
  ["sail patch kit", ["maritime", "textile"], 42],
  ["brass fishhook tin", ["maritime", "tool"], 20],
  ["crab trap", ["maritime", "seafood"], 35, 2, 3],
  ["tide chart", ["maritime", "document"], 45],
  ["signal flag", ["maritime", "textile"], 28],
  ["Ledger of Little Debts", ["book", "document"], 65],
  ["Tide Almanac", ["book", "maritime"], 70],
  ["Orchard Road Recipes", ["book", "food"], 55],
  ["Harbor Beasts and How to Price Them", ["book", "animal_goods"], 85],
  ["Practical Charms for Rainy Markets", ["book", "magic"], 95],
  ["The Pearl Tax Tables", ["book", "document"], 110],
  ["guild license", ["document"], 120],
  ["painted fan", ["art", "luxury"], 60],
  ["miniature harbor painting", ["art", "luxury"], 90, 1, 1, 2],
  ["puppet mask", ["art", "game"], 35],
  ["lute string set", ["music", "tool"], 24],
  ["tin whistle", ["music"], 18],
  ["painted card deck", ["game", "crowncards"], 45],
  ["fortune tiles", ["game", "magic"], 55],
  ["glowmoss bundle", ["alchemy", "produce"], 32],
  ["frostroot", ["alchemy", "produce"], 40],
  ["dream poppy pod", ["alchemy", "produce"], 55, 1, 1, 2],
  ["glasswing beetle husk", ["alchemy", "animal_goods"], 70, 1, 1, 3],
  ["firefly dust vial", ["alchemy", "magic"], 95, 1, 1, 3],
  ["binding salt jar", ["alchemy", "spice"], 36],
  ["red vigor tonic", ["alchemy", "potions"], 65, 1, 1, 2],
  ["green mending cordial", ["alchemy", "remedies"], 80, 1, 1, 2],
  ["seasick sailor remedy", ["alchemy", "remedies", "maritime"], 45],
  ["thornbite antivenom", ["alchemy", "remedies"], 95, 1, 1, 3],
  ["whisper ink vial", ["magic", "document"], 75, 1, 1, 2],
  ["glowchalk stick", ["magic", "tool"], 32],
  ["moonthread spool", ["magic", "textile"], 90, 1, 1, 3],
  ["pocket ward charm", ["magic", "luxury"], 85, 1, 1, 2],
  ["bottled breeze", ["magic", "alchemy"], 120, 1, 1, 3],
  ["rain call seed", ["magic", "grain"], 130, 1, 1, 3],
  ["shrine candle", ["religion", "household"], 12],
  ["votive ribbon", ["religion", "textile"], 10],
  ["pilgrim shell", ["religion", "animal_goods"], 18],
  ["blessing oil vial", ["religion", "alchemy"], 45],
  ["temple incense cone", ["religion", "spice"], 24],
  ["oath cord", ["religion", "document"], 20],
  ["dock knife", ["weapon", "daggers"], 35],
  ["boar spear", ["weapon", "spears"], 55, 3, 4],
  ["caravan sabre", ["weapon", "swords"], 120, 3, 3, 2],
  ["arrow bundle", ["weapon", "arrows"], 18],
  ["bodkin arrow case", ["weapon", "arrows"], 28],
  ["boiled leather vest", ["armor", "leather"], 95, 3, 4, 2],
  ["enamel parade shield", ["armor", "shields", "luxury"], 180, 4, 5, 3],
  ["market piglet", ["livestock", "animals"], 60, 4, 8],
  ["pack mule", ["livestock", "pack_animals"], 260, 8, 20, 2],
  ["beehive box", ["livestock", "food"], 90, 3, 5, 2],
  ["songbird cage", ["livestock", "luxury"], 85, 2, 2, 2],
  ["false bottom box", ["contraband", "container"], 75, 1, 1, 2],
  ["unmarked pearl pouch", ["contraband", "luxury"], 240, 1, 1, 3],
  ["loaded dice", ["contraband", "game"], 45],
  ["forged toll pass", ["contraband", "document"], 90, 1, 1, 3],
  ["lockpick roll", ["contraband", "tool"], 85, 1, 1, 2],
  ["coded ledger scrap", ["contraband", "document"], 35],
  ["bottle with a tiny storm", ["curio", "magic"], 180, 1, 1, 3],
  ["singing shell", ["curio", "music"], 95, 1, 1, 2],
  ["brass mechanical beetle", ["curio", "tool"], 140, 1, 1, 3],
  ["glass apple", ["curio", "glass"], 120, 1, 1, 3],
  ["memory ribbon", ["curio", "textile"], 80, 1, 1, 2],
  ["soft kid leather", ["leather", "animal_goods"], 55, 2, 2],
  ["thick oxhide", ["leather", "animal_goods"], 70, 3, 4],
  ["dyed belt leather", ["leather", "textile"], 48, 2, 2],
  ["leather cord spool", ["leather", "tool"], 20],
  ["bridle ring set", ["leather", "livestock"], 35],
  ["saddle strap bundle", ["leather", "livestock"], 42],
  ["waxed satchel flap", ["leather", "container"], 26],
  ["hunter pelt roll", ["leather", "animal_goods"], 65, 2, 3],
  ["fur trim strip", ["leather", "textile", "luxury"], 58],
  ["cobbler sole blanks", ["leather", "tool"], 32],
  ["tin nugget pouch", ["ore", "metal"], 18],
  ["copper nugget pouch", ["ore", "metal"], 24],
  ["silver ore chips", ["ore", "metal"], 80, 1, 2, 2],
  ["gold dust vial", ["ore", "metal", "luxury"], 160, 1, 1, 3],
  ["coal sack", ["ore", "metal"], 20, 3, 5],
  ["riverstone ore pan", ["ore", "tool"], 35, 2, 2],
  ["blueglass ore sample", ["ore", "gem"], 95, 1, 1, 3],
  ["deepforge sample box", ["ore", "container"], 110, 1, 2, 3],
  ["laying hen", ["livestock", "animals"], 35, 2, 3],
  ["duck pair", ["livestock", "animals"], 45, 2, 3],
  ["goose", ["livestock", "animals"], 42, 2, 3],
  ["milk goat", ["livestock", "animals"], 85, 4, 9],
  ["wool sheep", ["livestock", "animals"], 90, 4, 10],
  ["pony", ["livestock", "pack_animals"], 340, 8, 20, 2],
  ["ox", ["livestock", "pack_animals"], 420, 10, 30, 2],
  ["feed trough", ["livestock", "container"], 45, 4, 6],
  ["veterinary salve", ["livestock", "alchemy"], 55],
  ["apple cider jug", ["drink", "food"], 26, 1, 2],
  ["dark malt barrel", ["drink", "barrels"], 110, 4, 7, 2],
  ["sailor grog bottle", ["drink", "maritime"], 30],
  ["moonmilk crock", ["drink", "dairy"], 22, 1, 2],
  ["coffee bean sack", ["drink", "food"], 75, 2, 4, 2],
  ["cocoa nib pouch", ["drink", "spice"], 90, 1, 1, 3],
  ["tap spigot", ["drink", "tool"], 28],
  ["warehouse claim ticket", ["document", "trade_instrument"], 85],
  ["customs tag", ["document", "maritime"], 18],
  ["import permit", ["document", "travel"], 140, 1, 1, 2],
  ["apprentice papers", ["document"], 60],
  ["blank contract", ["document"], 24],
  ["tax seal strip", ["document"], 40],
  ["witness ribbon", ["document", "textile"], 16],
  ["boundary map", ["document", "travel"], 80, 1, 1, 2],
  ["small drum", ["music"], 28],
  ["brass bell chime", ["music", "religion"], 45],
  ["song scroll", ["music", "book"], 35],
  ["music box cylinder", ["music", "luxury"], 160, 1, 1, 3],
  ["shell rattle", ["music", "seafood"], 18],
  ["ship bell", ["maritime", "music"], 75, 2, 3],
  ["anchor charm", ["maritime", "religion"], 32],
  ["rope hawser", ["maritime", "tool"], 60, 3, 5],
  ["fishing float bundle", ["maritime", "tool"], 22],
  ["eel basket", ["maritime", "seafood"], 28, 2, 2],
  ["net weight pouch", ["maritime", "tool"], 18],
  ["captain logbook", ["maritime", "book"], 95, 1, 1, 2],
  ["deck brush", ["maritime", "tool"], 20, 2, 2],
  ["consecrated salt", ["religion", "spice"], 35],
  ["painted prayer bead", ["religion", "luxury"], 28],
  ["small brass idol", ["religion", "art"], 80, 1, 1, 2],
  ["festival wreath", ["religion", "produce"], 18],
  ["memorial card", ["religion", "document"], 12],
  ["silvered prayer pin", ["religion", "luxury"], 55, 1, 1, 2],
].map((entry) => addedItem(...entry));

const items = loadGeneratedItems(root);
const manifest = readJson(manifestFile);
const characters = readJson(charactersFile);
const professions = readJson(professionsFile);
const marketplaces = readJson(marketplacesFile);
const kingdoms = readJson(kingdomsFile);

const oldTokenToNewToken = new Map();
const usedIds = new Set();
const genericTokens = new Set([
  "alchemy", "alphabet stones", "amulets", "animals", "any", "armor", "aromatics", "axes", "banners", "barrels", "baskets",
  "books", "botanicals", "butterflies", "candles", "cards", "carts", "chests", "clothes", "coats", "coins", "copper",
  "crates", "crystals", "daggers", "dairy", "deeds", "dragons", "drinks", "drums", "educational", "fabrics", "fish",
  "flags", "flails", "flowers", "flute", "food", "fruit", "fruits", "furniture", "games", "gems", "glass", "gloves",
  "glyph stones", "gold", "grains", "harp", "horses", "household", "ingots", "insects", "iron ingot", "iron ingots",
  "jewlery", "jewelry", "livestock", "loaf", "loom", "lute", "maces", "magic", "maps", "meat", "monster parts",
  "mushrooms", "music", "nuts", "ore", "packhorses", "packs", "paintings", "paints", "poison", "potions", "pottery",
  "remedies", "robes", "rocks", "runes", "sacks", "scepters", "seafood", "seeds", "shields", "shoes", "silver",
  "snakes", "solutions", "spears", "spices", "statues", "storage", "supplies", "sword stones", "swords", "tools",
  "trumpet", "veggies", "violin", "wands", "war hammers", "weapons", "wood", "wool",
].map(normalize));

for (const item of items) {
  const oldTokens = new Set([
    item.id,
    item.name,
    slugify(item.name),
    item.iconFile ? path.posix.basename(String(item.iconFile).replace(/\\/g, "/"), ".png") : null,
  ].filter(Boolean).map((value) => normalize(value)));

  const nextName = directNames.get(item.index) || applyTextReplacements(item.name);
  item.name = nextName;
  item.displayName = nextName;
  item.tags = cleanedTags(item.tags, nextName);
  item.id = uniqueSlug(nextName, usedIds);
  item.iconFile = `${item.family || "items"}/${item.id}.png`;

  for (const token of oldTokens) oldTokenToNewToken.set(token, item.id);
}

const existingItemNames = new Set(items.map((item) => normalize(item.name)));
const newAdditions = additions.filter((entry) => !existingItemNames.has(normalize(entry.name)));
for (const item of newAdditions) {
  item.index = items.length;
  item.id = uniqueSlug(item.name, usedIds);
  item.iconFile = `${familyForAdded(item.tags)}/${item.id}.png`;
  items.push(item);
}

function remapToken(value, options = {}) {
  if (typeof value !== "string") return value;
  const normalized = normalize(value);
  if (tagReplacements.has(normalized)) return tagReplacements.get(normalized);
  if (options.allowItemTokens && !genericTokens.has(normalized) && oldTokenToNewToken.has(normalized)) return oldTokenToNewToken.get(normalized);
  return slugify(applyTextReplacements(value));
}

function remapBiases(biases) {
  if (!Array.isArray(biases)) return biases;
  for (const bias of biases) bias.tag = remapToken(bias.tag, { allowItemTokens: true });
  return biases;
}

function remapPools(pools) {
  if (!Array.isArray(pools)) return pools;
  for (const pool of pools) pool.tag = remapToken(pool.tag, { allowItemTokens: true });
  return pools;
}

for (const character of characters) {
  remapBiases(character.bias);
  remapPools(character.obtainableItems);
  character.excludedObtainItems = (character.excludedObtainItems || []).map((token) => remapToken(token, { allowItemTokens: true }));
}

for (const profession of Object.values(professions)) {
  remapBiases(profession.bias);
  remapPools(profession.obtainableItems);
}

for (const kingdom of kingdoms) {
  kingdom.bias = remapBiases(kingdom.bias);
  kingdom.illegalItemTags = (kingdom.illegalItemTags || []).map((token) => remapToken(token, { allowItemTokens: true }));
}

function remapUnknown(value) {
  if (Array.isArray(value)) return value.map(remapUnknown);
  if (!value || typeof value !== "object") return typeof value === "string" ? remapToken(value, { allowItemTokens: true }) : value;
  for (const [key, child] of Object.entries(value)) {
    if (typeof child === "string" && /(item|filename|tag|reward|delivery|plant|cure|sign|tracker|artwork|quest)/i.test(key)) {
      value[key] = remapToken(child, { allowItemTokens: true });
    } else {
      value[key] = remapUnknown(child);
    }
  }
  return value;
}

for (const market of marketplaces) {
  remapBiases(market.bias);
  if (market.quest) {
    market.quest.questItems = (market.quest.questItems || []).map((token) => remapToken(token, { allowItemTokens: true }));
    market.quest.data = remapUnknown(market.quest.data || {});
  }
  if (market.event?.data) market.event.data = remapUnknown(market.event.data);
}

manifest.counts.items = items.length;

writeGeneratedItems(root, items);
writeJson(manifestFile, manifest);
writeJson(charactersFile, characters);
writeJson(professionsFile, professions);
writeJson(marketplacesFile, marketplaces);
writeJson(kingdomsFile, kingdoms);

console.log(`Rewrote item catalog to ${items.length} items.`);
console.log(`Added ${newAdditions.length} new items.`);
