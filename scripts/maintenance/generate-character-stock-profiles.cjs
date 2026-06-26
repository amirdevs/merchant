const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const POSIX = (value) => value.split(path.sep).join('/');

const OUTPUT_PROFILE_PATH = path.join(ROOT, 'src/content/characters/stock/character-stock-profiles.json');
const OUTPUT_ITEM_PATH = path.join(ROOT, 'src/content/items/catalog/npc-stock-profile-items.json');
const OUTPUT_PROMPT_DIR = path.join(ROOT, 'docs/assets/item-prompts');
const OUTPUT_REPORT_PATH = path.join(ROOT, 'docs/logs/character-stock-profile-report.md');
const RUNTIME_PROFILE_PATH = path.join(ROOT, 'src/content/characters/runtime/profiles.data.json');
const IDENTITY_BATCH_DIR = path.join(ROOT, 'src/content/characters/profiles/batches');
const ITEM_CATALOG_DIR = path.join(ROOT, 'src/content/items/catalog');

const ABSTRACT_TAGS = new Set([
  'market', 'merchant', 'specialty_trade', 'finished_good', 'input_good', 'ordinary', 'dry', 'durable', 'small_group',
  'single_object', 'food', 'tool', 'tools', 'luxury', 'currency', 'documents', 'document', 'household', 'travel',
  'container', 'storage', 'maritime', 'botanical', 'religion', 'contraband', 'royal', 'art', 'magic', 'music',
  'textile', 'cloth', 'fabric', 'metal', 'wood', 'produce', 'ingredient', 'small_luxury', 'salvage', 'bulky',
]);

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  const source = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  return JSON.parse(source);
}

function writeJson(filePath, value) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function normalizeToken(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .replace(/_+/g, '_');
}

function normalizePhrase(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function textHasPhrase(text, phrase) {
  const needle = normalizePhrase(phrase);
  if (!needle) return false;
  return ` ${text} `.includes(` ${needle} `);
}

function titleCase(token) {
  return normalizeToken(token)
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function pool(tag, quantityMin = 1, quantityMax = 6) {
  return { tag, quantityMin, quantityMax };
}

function role({ id, label, terms, primary, secondary = [], forbidden = [], family = 'market goods', subfamily = 'specialist stock' }) {
  return { id, label, terms, primary, secondary, forbidden, family, subfamily };
}

const ROLE_CATALOG = [
  role({ id: 'silk_factor', label: 'Silk and textile factor', terms: ['silk factor', 'dyed silk', 'silk bolt', 'raw silk', 'textile factor', 'cloth factor', 'fabric factor'], primary: [pool('silk_bolt', 1, 5), pool('dyed_silk', 1, 5), pool('raw_silk', 1, 5), pool('dye_vials', 1, 5), pool('ribbons', 1, 6), pool('lace', 1, 5)], secondary: [pool('thread', 1, 8), pool('wax_seal', 1, 3), pool('ledger', 1, 3), pool('contract', 1, 3)], forbidden: ['weapon', 'armor', 'ore', 'ingots', 'livestock', 'meat', 'fish', 'mushrooms', 'eggs', 'gems', 'jewelry'], family: 'textiles', subfamily: 'silk goods' }),
  role({ id: 'button_seller', label: 'Buttons and tailoring notions', terms: ['button seller', 'buttons', 'button tray', 'tailoring buttons', 'thimble'], primary: [pool('tailoring_buttons', 1, 8), pool('buttons', 1, 8), pool('thread', 1, 8), pool('ribbons', 1, 6), pool('lace', 1, 5)], secondary: [pool('needle', 1, 5), pool('pin', 1, 6), pool('cloth_repairs', 1, 5)], forbidden: ['weapon', 'armor', 'ore', 'meat', 'fish', 'livestock', 'gems', 'jewelry'], family: 'textiles', subfamily: 'tailoring notions' }),
  role({ id: 'cookshop_owner', label: 'Cookshop and kitchen goods', terms: ['cookshop', 'cook shop', 'cookware', 'kitchen', 'cookpot', 'cookshop owner', 'cookshop keeper'], primary: [pool('cookpot', 1, 5), pool('cookware', 1, 6), pool('ladle', 1, 6), pool('kitchen_tools', 1, 6), pool('spices', 1, 8), pool('recipe_papers', 1, 4)], secondary: [pool('salt', 1, 10), pool('flour', 1, 10), pool('oil', 1, 6), pool('pan', 1, 5), pool('cauldron', 1, 4)], forbidden: ['weapon', 'armor', 'ore', 'ingots', 'gems', 'jewelry', 'royal', 'livestock', 'magic', 'book'], family: 'household goods', subfamily: 'cookware' }),
  role({ id: 'glass_seller', label: 'Glassware and careful containers', terms: ['glass seller', 'glassware', 'glass', 'glass vial', 'glass bottle', 'bottle seller', 'window glass'], primary: [pool('glassware', 1, 7), pool('glass_bottle', 1, 6), pool('glass_vial', 1, 8), pool('glass_pane', 1, 5), pool('jar', 1, 6), pool('bottle', 1, 6)], secondary: [pool('wax', 1, 4), pool('cloth', 1, 4), pool('crate', 1, 4)], forbidden: ['meat', 'fish', 'livestock', 'weapon', 'armor', 'ore', 'grain'], family: 'containers', subfamily: 'glassware' }),
  role({ id: 'spice_merchant', label: 'Spices and kitchen aromatics', terms: ['spice hawker', 'spice merchant', 'spice seller', 'spices', 'pepper', 'saffron', 'clove', 'cinnamon'], primary: [pool('spices', 1, 10), pool('spice', 1, 9), pool('spice_jar_set', 1, 5), pool('clove_oil_vial', 1, 4), pool('salt', 1, 8), pool('pepper', 1, 5)], secondary: [pool('jar', 1, 5), pool('basket', 1, 4), pool('honey', 1, 4)], forbidden: ['weapon', 'armor', 'ore', 'livestock', 'jewelry', 'gems'], family: 'food', subfamily: 'spices' }),
  role({ id: 'lamp_oil_seller', label: 'Lamp oil and lighting goods', terms: ['lamp oil seller', 'lamp oil', 'oil seller', 'lantern oil', 'lamp seller', 'oil merchant'], primary: [pool('lamp_oil', 1, 8), pool('oil', 1, 8), pool('lantern', 1, 5), pool('wick', 1, 8), pool('candle', 1, 7), pool('bottle', 1, 5)], secondary: [pool('wax', 1, 5), pool('jar', 1, 4), pool('cloth', 1, 4)], forbidden: ['meat', 'fish', 'livestock', 'ore', 'weapon', 'armor', 'gems'], family: 'household goods', subfamily: 'lighting' }),
  role({ id: 'water_seller', label: 'Water and clean carrying vessels', terms: ['water seller', 'rainwater', 'water bearer', 'cistern', 'well water', 'spring water'], primary: [pool('rainwater_jug', 1, 8), pool('water', 1, 10), pool('jug', 1, 8), pool('waterskin', 1, 6), pool('bottle', 1, 6)], secondary: [pool('bucket', 1, 5), pool('cup', 1, 5), pool('cloth', 1, 4)], forbidden: ['weapon', 'armor', 'ore', 'jewelry', 'gems', 'livestock', 'meat'], family: 'household goods', subfamily: 'water vessels' }),
  role({ id: 'cobbler', label: 'Shoes, boots, and leather repairs', terms: ['cobbler', 'shoe', 'shoes', 'boot', 'boots', 'sole', 'heel repair'], primary: [pool('shoe_repair', 1, 7), pool('shoes', 1, 5), pool('boots', 1, 5), pool('leather', 1, 7), pool('buckle', 1, 6), pool('thread', 1, 6)], secondary: [pool('nails', 1, 6), pool('wax', 1, 5), pool('polish', 1, 4)], forbidden: ['fish', 'meat', 'ore', 'gems', 'jewelry', 'royal'], family: 'leather goods', subfamily: 'footwear' }),
  role({ id: 'chimney_sweep', label: 'Soot cleaning and hearth tools', terms: ['chimney sweep', 'chimney', 'sweep', 'soot', 'ash broom'], primary: [pool('chimney_brush', 1, 7), pool('brush_bundle', 1, 6), pool('soot', 1, 6), pool('ash', 1, 6), pool('coal', 1, 5)], secondary: [pool('ladder', 1, 3), pool('cloth', 1, 4), pool('bucket', 1, 4)], forbidden: ['jewelry', 'gems', 'royal', 'meat', 'fish', 'livestock'], family: 'household goods', subfamily: 'hearth cleaning' }),
  role({ id: 'charcoal_burner', label: 'Charcoal, fuel, and hearth supplies', terms: ['charcoal burner', 'charcoal', 'coal burner', 'coal seller', 'fuel seller', 'ashbarrel'], primary: [pool('charcoal', 2, 12), pool('coal', 2, 12), pool('firewood', 2, 10), pool('kindling', 2, 10), pool('ash', 1, 6), pool('soot', 1, 5)], secondary: [pool('sack', 1, 5), pool('basket', 1, 4), pool('lantern', 1, 3)], forbidden: ['jewelry', 'gems', 'royal', 'meat', 'fish', 'livestock', 'book'], family: 'fuel', subfamily: 'charcoal goods' }),
  role({ id: 'miller', label: 'Milled grain and flour goods', terms: ['miller', 'grist', 'mill', 'millstone', 'meal sack'], primary: [pool('flour', 2, 14), pool('grain', 2, 14), pool('meal', 2, 12), pool('bran_sack', 1, 8), pool('salt', 1, 6)], secondary: [pool('basket', 1, 4), pool('sack', 1, 5), pool('tool', 1, 4)], forbidden: ['weapon', 'armor', 'ore', 'gems', 'jewelry', 'livestock'], family: 'food', subfamily: 'milled grain' }),
  role({ id: 'tinker', label: 'Tinker tools and small repairs', terms: ['tinker', 'tinware', 'repairman', 'repair tools', 'kettle repair', 'mended pot'], primary: [pool('repair_tools', 1, 7), pool('small_gears', 1, 6), pool('tinware', 1, 6), pool('kettle', 1, 5), pool('pot', 1, 5), pool('wire', 1, 6)], secondary: [pool('metal_scraps', 1, 6), pool('nails', 1, 7), pool('oil', 1, 4)], forbidden: ['meat', 'fish', 'livestock', 'jewelry', 'gems', 'royal'], family: 'metalwork', subfamily: 'small repairs' }),
  role({ id: 'pack_animal_trader', label: 'Pack animals and caravan tack', terms: ['pack animal trader', 'mule', 'pack animal', 'animal trader', 'saddle', 'harness'], primary: [pool('mule', 1, 3), pool('pack_saddle', 1, 5), pool('harness', 1, 6), pool('animal_feed', 1, 8), pool('rope', 1, 7), pool('pack_bell', 1, 6)], secondary: [pool('brush', 1, 5), pool('grain', 1, 6), pool('blanket', 1, 4)], forbidden: ['jewelry', 'gems', 'book', 'paper', 'magic', 'seafood'], family: 'livestock', subfamily: 'pack tack' }),
  role({ id: 'reptile_seller', label: 'Reptile and small animal care', terms: ['reptile seller', 'reptile', 'lizard', 'snake', 'scales', 'terrarium'], primary: [pool('reptile', 1, 4), pool('lizard', 1, 4), pool('animal_cage', 1, 5), pool('feed', 1, 7), pool('insects', 1, 7)], secondary: [pool('jar', 1, 4), pool('basket', 1, 4), pool('cloth', 1, 4)], forbidden: ['jewelry', 'gems', 'ore', 'weapon', 'armor', 'book'], family: 'livestock', subfamily: 'small animals' }),
  role({ id: 'potter', label: 'Pottery and clay vessels', terms: ['potter', 'pottery', 'clay', 'ceramic', 'crock', 'kiln'], primary: [pool('pottery', 1, 8), pool('clay', 1, 8), pool('ceramic', 1, 7), pool('bowl', 1, 7), pool('cup', 1, 7), pool('jug', 1, 7)], secondary: [pool('straw', 1, 5), pool('crate', 1, 5), pool('chalk', 1, 4)], forbidden: ['meat', 'fish', 'livestock', 'jewelry', 'gems', 'weapon'], family: 'household goods', subfamily: 'pottery' }),
  role({ id: 'surveying_tools', label: 'Surveying and navigation instruments', terms: ['surveyor', 'astrolabe seller', 'astrolabe', 'cartographer', 'navigator', 'measuring cord', 'compass', 'lens seller'], primary: [pool('measuring_cord', 1, 5), pool('map', 1, 5), pool('compass', 1, 4), pool('astrolabe', 1, 3), pool('lens', 1, 4), pool('ledger', 1, 4)], secondary: [pool('paper', 1, 5), pool('ink', 1, 4), pool('brass_tools', 1, 4)], forbidden: ['meat', 'fish', 'livestock', 'grain', 'jewelry', 'gems'], family: 'instruments', subfamily: 'surveying tools' }),
  role({ id: 'bell_polisher', label: 'Bells and polishing supplies', terms: ['bell polisher', 'bell', 'brass polish', 'polishing cloth'], primary: [pool('bell', 1, 6), pool('small_bells', 1, 8), pool('brass_polish', 1, 6), pool('polishing_cloth', 1, 6), pool('wax', 1, 5), pool('oil', 1, 5)], secondary: [pool('brass', 1, 5), pool('cloth', 1, 4), pool('brush_bundle', 1, 4)], forbidden: ['meat', 'fish', 'livestock', 'grain', 'jewelry', 'gems'], family: 'metalwork', subfamily: 'bells' }),
  role({ id: 'locksmith', label: 'Locks, keys, and precise metalwork', terms: ['locksmith', 'lock', 'key', 'lockpick', 'needle locksmith'], primary: [pool('lock', 1, 7), pool('key', 1, 8), pool('lockpick', 1, 5), pool('small_gears', 1, 6), pool('needle', 1, 5), pool('iron', 1, 5)], secondary: [pool('tool', 1, 5), pool('oil', 1, 4), pool('wax', 1, 4)], forbidden: ['meat', 'fish', 'livestock', 'grain', 'jewelry', 'gems'], family: 'metalwork', subfamily: 'locks and keys' }),
  role({ id: 'dye_merchant', label: 'Dyes, pigments, and color work', terms: ['dye merchant', 'dye seller', 'dyer', 'pigment', 'dye vials', 'color mixer', 'ink dye'], primary: [pool('dye_vials', 1, 8), pool('pigments', 1, 8), pool('ink', 1, 6), pool('brush', 1, 5)], secondary: [pool('cloth', 1, 5), pool('ribbons', 1, 5), pool('wax', 1, 5)], forbidden: ['weapon', 'armor', 'ore', 'meat', 'fish', 'livestock', 'jewelry'], family: 'craft supplies', subfamily: 'pigments' }),
  role({ id: 'textile_specialist', label: 'Textile and sewing specialist', terms: ['seamstress', 'tailor', 'weaver', 'ribbon hawker', 'blanket weaver', 'sail mender', 'clothier', 'fabric seller', 'thread seller'], primary: [pool('cloth', 1, 8), pool('thread', 1, 9), pool('ribbons', 1, 7), pool('lace', 1, 6), pool('needle', 1, 5), pool('wool', 1, 6)], secondary: [pool('buttons', 1, 6), pool('dye_vials', 1, 5), pool('sail_repair', 1, 4)], forbidden: ['weapon', 'armor', 'ore', 'meat', 'fish', 'livestock', 'gems'], family: 'textiles', subfamily: 'sewing goods' }),
  role({ id: 'baker', label: 'Baker and grain goods', terms: ['baker', 'bread', 'flour', 'oven', 'pastry', 'bun', 'loaf'], primary: [pool('bread', 2, 14), pool('loaf', 2, 14), pool('flour', 2, 14), pool('grain', 2, 12), pool('pastry', 1, 8)], secondary: [pool('honey', 1, 5), pool('salt', 1, 7), pool('basket', 1, 4)], forbidden: ['weapon', 'armor', 'ore', 'gems', 'jewelry', 'livestock'], family: 'food', subfamily: 'baked goods' }),
  role({ id: 'butcher', label: 'Butcher and preserved meats', terms: ['butcher', 'meat', 'sausage', 'smoked ham', 'steak', 'chop', 'cookfire meat'], primary: [pool('meat', 1, 10), pool('sausage', 1, 8), pool('smoked', 1, 8), pool('salt', 1, 8), pool('knife', 1, 3)], secondary: [pool('spice', 1, 6), pool('leather', 1, 4), pool('bone', 1, 4)], forbidden: ['jewelry', 'gems', 'magic', 'book', 'royal'], family: 'food', subfamily: 'meat' }),
  role({ id: 'farmer', label: 'Farm and orchard goods', terms: ['farmer', 'orchard', 'vegetable', 'grain', 'seed', 'apple', 'cider', 'field', 'harvest'], primary: [pool('grain', 2, 14), pool('seeds', 1, 10), pool('apple', 2, 14), pool('vegetable', 2, 12), pool('herbs', 1, 7)], secondary: [pool('cider', 1, 7), pool('basket', 1, 4), pool('tool', 1, 4)], forbidden: ['weapon', 'armor', 'ore', 'gems', 'jewelry', 'royal'], family: 'food', subfamily: 'farm goods' }),
  role({ id: 'botanical', label: 'Flowers, seeds, and gathered goods', terms: ['florist', 'flower', 'seed seller', 'herbalist', 'garden', 'cactus fruit', 'forager', 'mushroom', 'botanical'], primary: [pool('flower', 1, 8), pool('seeds', 1, 8), pool('herbs', 1, 8), pool('mushrooms', 1, 6), pool('fruit', 1, 8)], secondary: [pool('basket', 1, 4), pool('medicine', 1, 5), pool('honey', 1, 4)], forbidden: ['weapon', 'armor', 'ore', 'gems', 'jewelry', 'royal'], family: 'food', subfamily: 'gathered goods' }),
  role({ id: 'fisher', label: 'Fish and maritime catch', terms: ['fish', 'fisher', 'fisherman', 'net mender', 'oyster', 'pearl diver', 'shellfish', 'harbor catch'], primary: [pool('fish', 2, 14), pool('seafood', 2, 14), pool('shellfish', 1, 8), pool('oyster', 1, 7), pool('hook', 1, 5)], secondary: [pool('barrels', 1, 5), pool('net', 1, 4), pool('salt', 1, 8), pool('rope', 1, 5)], forbidden: ['weapon', 'armor', 'ore', 'gems', 'royal', 'book'], family: 'food', subfamily: 'seafood' }),
  role({ id: 'jeweler', label: 'Jewelry and small luxuries', terms: ['pearl', 'shell jeweler', 'gem', 'jewel', 'jeweler', 'lapidary', 'necklace', 'ring', 'brooch'], primary: [pool('jewelry', 1, 5), pool('gem', 1, 4), pool('pearls', 1, 4), pool('brooch', 1, 4), pool('ring', 1, 4), pool('necklace', 1, 4)], secondary: [pool('scale', 1, 2), pool('small_pearl_lot', 1, 3), pool('luxury', 1, 4)], forbidden: ['meat', 'fish', 'grain', 'produce', 'weapon', 'armor'], family: 'luxury goods', subfamily: 'jewelry' }),
  role({ id: 'alchemist', label: 'Alchemy and remedies', terms: ['alchemist', 'apothecary', 'potion', 'tonic', 'remedy', 'vial', 'elixir', 'herbal cure', 'healer'], primary: [pool('potion', 1, 6), pool('tonic', 1, 6), pool('remedy', 1, 6), pool('vial', 1, 8), pool('herbs', 1, 8), pool('medicine', 1, 6)], secondary: [pool('ingredient', 1, 8), pool('bottle', 1, 5), pool('jar', 1, 5)], forbidden: ['weapon', 'armor', 'livestock', 'meat', 'fish', 'royal'], family: 'alchemy', subfamily: 'remedies' }),
  role({ id: 'blacksmith', label: 'Forge goods and metalwork', terms: ['blacksmith', 'forge', 'ironmonger', 'horseshoe', 'nails', 'anvil', 'blade smith'], primary: [pool('iron', 1, 7), pool('coal', 1, 8), pool('tool', 1, 6), pool('metal', 1, 6), pool('nails', 1, 8), pool('horseshoe', 1, 6)], secondary: [pool('ore', 1, 8), pool('ingots', 1, 7), pool('weapon', 1, 3)], forbidden: ['food', 'jewelry', 'luxury', 'magic', 'art', 'book'], family: 'metalwork', subfamily: 'forge goods' }),
  role({ id: 'miner', label: 'Mine and quarry goods', terms: ['miner', 'quarry', 'ore', 'coal', 'stone quarry', 'gem prospector', 'chalk', 'crystal miner'], primary: [pool('ore', 1, 10), pool('coal', 1, 10), pool('stone', 1, 8), pool('rocks', 1, 8), pool('chalk', 1, 6)], secondary: [pool('crystal', 1, 5), pool('tool', 1, 5), pool('lantern', 1, 4)], forbidden: ['food', 'textile', 'meat', 'fish', 'book'], family: 'raw materials', subfamily: 'quarry goods' }),
  role({ id: 'fletcher', label: 'Arrows and bowcraft', terms: ['fletcher', 'arrow', 'bow', 'bowyer', 'feather', 'quiver', 'shaft maker'], primary: [pool('arrows', 2, 12), pool('bows', 1, 5), pool('feather', 1, 8), pool('quiver', 1, 4)], secondary: [pool('wood', 1, 8), pool('tool', 1, 4), pool('leather', 1, 4)], forbidden: ['swords', 'axes', 'maces', 'armor', 'jewelry', 'magic', 'food'], family: 'woodwork', subfamily: 'bowcraft' }),
  role({ id: 'woodworker', label: 'Woodwork and storage goods', terms: ['carpenter', 'woodworker', 'joiner', 'coop', 'cooper', 'barrel', 'crate maker', 'wheelwright'], primary: [pool('wood', 1, 10), pool('barrels', 1, 7), pool('crate', 1, 7), pool('storage', 1, 5), pool('furniture', 1, 5)], secondary: [pool('tool', 1, 6), pool('wheel', 1, 4), pool('rope', 1, 5)], forbidden: ['meat', 'fish', 'jewelry', 'gems', 'magic', 'book'], family: 'woodwork', subfamily: 'storage goods' }),
  role({ id: 'scribe_books', label: 'Books, ledgers, and documents', terms: ['librarian', 'scribe', 'stationer', 'paper seller', 'ink seller', 'ledger keeper', 'clerk', 'document seller', 'contract seller', 'map seller'], primary: [pool('book', 1, 7), pool('ledger', 1, 5), pool('paper', 1, 7), pool('ink', 1, 6), pool('contract', 1, 4), pool('wax_seal', 1, 5)], secondary: [pool('map', 1, 4), pool('letter_writing_kit', 1, 4), pool('quill', 1, 5)], forbidden: ['meat', 'fish', 'ore', 'weapon', 'armor', 'livestock'], family: 'documents', subfamily: 'stationery' }),
  role({ id: 'guild_finance', label: 'Guild papers and financial goods', terms: ['banker', 'guild official', 'notary', 'permit', 'charter', 'share clerk', 'coin broker', 'money changer'], primary: [pool('coin', 1, 8), pool('ledger', 1, 5), pool('contract', 1, 5), pool('permit', 1, 4), pool('wax_seal', 1, 5)], secondary: [pool('share', 1, 3), pool('paper', 1, 5), pool('ink', 1, 4)], forbidden: ['meat', 'fish', 'ore', 'livestock', 'weapon'], family: 'documents', subfamily: 'guild finance' }),
  role({ id: 'maritime_travel', label: 'Maritime and travel supplies', terms: ['sailor', 'ship chandler', 'shipwright', 'harbor trader', 'dock trader', 'route scout', 'caravan scout'], primary: [pool('rope', 1, 7), pool('sail', 1, 5), pool('map', 1, 4), pool('lantern', 1, 5), pool('travel', 1, 6)], secondary: [pool('barrels', 1, 6), pool('food', 1, 6), pool('tool', 1, 5), pool('compass', 1, 3)], forbidden: ['royal', 'jewelry', 'magic', 'livestock'], family: 'travel supplies', subfamily: 'maritime goods' }),
  role({ id: 'hunter_leather', label: 'Hunting and leather goods', terms: ['hunter', 'trapper', 'tanner', 'leather seller', 'hide seller', 'furrier', 'pelt', 'bone charm'], primary: [pool('leather', 1, 7), pool('hide', 1, 7), pool('fur', 1, 5), pool('pelt', 1, 5), pool('bone', 1, 5)], secondary: [pool('meat', 1, 8), pool('arrows', 1, 6), pool('knife', 1, 3)], forbidden: ['jewelry', 'royal', 'magic', 'book', 'ore'], family: 'leather goods', subfamily: 'hunting goods' }),
  role({ id: 'artisan_art', label: 'Artisan and crafted goods', terms: ['artist', 'painter', 'sculptor', 'mask maker', 'toy maker', 'miniature', 'paint seller', 'statue', 'canvas'], primary: [pool('brush', 1, 5), pool('pigments', 1, 5), pool('painting', 1, 4), pool('statue', 1, 4), pool('mask', 1, 4), pool('toy', 1, 5)], secondary: [pool('wood', 1, 4), pool('cloth', 1, 4), pool('paper', 1, 4)], forbidden: ['meat', 'fish', 'ore', 'weapon', 'armor', 'livestock'], family: 'crafted goods', subfamily: 'art supplies' }),
  role({ id: 'household_luxury', label: 'Scents, candles, and household luxuries', terms: ['perfume', 'scent', 'soap', 'candle maker', 'candle seller', 'wax seller', 'wick seller', 'bath', 'cosmetic'], primary: [pool('perfume', 1, 5), pool('soap', 1, 6), pool('candle', 1, 8), pool('wax', 1, 7), pool('wick', 1, 7)], secondary: [pool('bottle', 1, 5), pool('jar', 1, 5), pool('luxury', 1, 4)], forbidden: ['weapon', 'armor', 'ore', 'meat', 'fish', 'livestock'], family: 'household goods', subfamily: 'scented goods' }),
  role({ id: 'tavern_keeper', label: 'Tavern food, hearth, and table goods', terms: ['tavern keeper', 'tavern', 'innkeeper', 'taproom', 'hearth meal', 'supper house'], primary: [pool('tavern_meal', 2, 10), pool('bread', 2, 10), pool('stew', 1, 8), pool('cheese', 1, 8), pool('mug', 1, 8), pool('candle', 1, 6)], secondary: [pool('cards', 1, 5), pool('dice', 1, 5), pool('instrument', 1, 3), pool('firewood', 1, 6)], forbidden: ['ore', 'ingots', 'armor', 'weapon', 'livestock', 'gems', 'jewelry'], family: 'food', subfamily: 'tavern goods' }),
  role({ id: 'performance_games', label: 'Music, games, and performance goods', terms: ['bard', 'musician', 'song seller', 'instrument seller', 'card player', 'game seller', 'dice seller', 'tavern performer'], primary: [pool('instrument', 1, 4), pool('game', 1, 6), pool('cards', 1, 6), pool('dice', 1, 5)], secondary: [pool('book', 1, 3), pool('travel', 1, 4), pool('mask', 1, 3)], forbidden: ['ore', 'ingots', 'armor', 'weapon', 'livestock', 'barrels'], family: 'entertainment', subfamily: 'games' }),
  role({ id: 'religious_goods', label: 'Religious goods', terms: ['priest', 'nun', 'monk', 'shrine', 'relic seller', 'religious goods', 'temple', 'blessing'], primary: [pool('candle', 1, 8), pool('relic', 1, 3), pool('book', 1, 5), pool('cloth', 1, 4)], secondary: [pool('herbs', 1, 5), pool('wax', 1, 5), pool('oil', 1, 4)], forbidden: ['contraband', 'weapon', 'ore', 'meat', 'fish'], family: 'religious goods', subfamily: 'shrine supplies' }),
  role({ id: 'black_market', label: 'Discreet market goods', terms: ['thief', 'fence', 'smuggler', 'contraband', 'black market', 'forged', 'hidden wares'], primary: [pool('contraband', 1, 6), pool('lockpick', 1, 4), pool('forged_documents', 1, 4), pool('small_luxury', 1, 4)], secondary: [pool('jewelry', 1, 4), pool('salvage', 1, 5), pool('documents', 1, 4)], forbidden: ['religion', 'livestock', 'grain', 'bulky'], family: 'black market goods', subfamily: 'discreet goods' }),
  role({ id: 'court_luxury', label: 'Court and luxury goods', terms: ['noble', 'countess', 'duke', 'lady', 'lord', 'court merchant', 'luxury collector', 'courtier'], primary: [pool('luxury', 1, 6), pool('royal', 1, 4), pool('jewelry', 1, 4), pool('perfume', 1, 4), pool('silk', 1, 4)], secondary: [pool('art', 1, 4), pool('documents', 1, 3), pool('wax_seal', 1, 3)], forbidden: ['meat', 'fish', 'ore', 'grain', 'livestock'], family: 'luxury goods', subfamily: 'court goods' }),
  role({ id: 'street_peddler', label: 'Street peddler small wares', terms: ['street peddler', 'peddler', 'hawker'], primary: [pool('buttons', 1, 6), pool('ribbons', 1, 6), pool('candle', 1, 6), pool('paper', 1, 4), pool('small_bells', 1, 5)], secondary: [pool('basket', 1, 3), pool('jar', 1, 4), pool('toy', 1, 4)], forbidden: ['ore', 'ingots', 'livestock', 'weapon', 'armor', 'royal'], family: 'market goods', subfamily: 'small wares' }),
  role({ id: 'stable_hand', label: 'Stable hand tack and grooming stock', terms: ['stable hand', 'stable helper', 'stable boy', 'stable girl', 'stable sweep', 'ostler', 'horse brush', 'feed scoop', 'halter', 'hay fork', 'muck rake'], primary: [pool('halter', 1, 7), pool('horse_brush', 1, 7), pool('feed_scoop', 1, 6), pool('animal_feed', 1, 10), pool('hay_bundle', 1, 8), pool('horseshoe', 1, 6)], secondary: [pool('rope', 1, 6), pool('bucket', 1, 6), pool('blanket', 1, 4), pool('brush_bundle', 1, 4)], forbidden: ['jewelry', 'gems', 'royal', 'magic', 'seafood'], family: 'stable goods', subfamily: 'tack and grooming' }),
  role({ id: 'porter', label: 'Porter and hauling gear', terms: ['porter', 'dock porter', 'old porter', 'basket carrier', 'brick carrier', 'load carrier', 'hauler', 'dock hand', 'freight hand'], primary: [pool('rope', 1, 8), pool('sack', 1, 8), pool('basket', 1, 8), pool('crate', 1, 7), pool('handcart', 1, 4), pool('work_gloves', 1, 6)], secondary: [pool('cloth', 1, 5), pool('lantern', 1, 4), pool('bucket', 1, 5), pool('tool', 1, 4)], forbidden: ['jewelry', 'gems', 'royal', 'magic', 'book'], family: 'market goods', subfamily: 'hauling gear' }),
  role({ id: 'courier_clerk', label: 'Courier, clerk, and posting supplies', terms: ['courier', 'night courier', 'courier child', 'ferry clerk', 'contract board clerk', 'queue marker', 'public scribe', 'message runner', 'notice clerk'], primary: [pool('letter_writing_kit', 1, 6), pool('paper', 1, 8), pool('ink', 1, 7), pool('quill', 1, 7), pool('contract', 1, 5), pool('wax_seal', 1, 5)], secondary: [pool('ledger', 1, 4), pool('map', 1, 4), pool('permit', 1, 4), pool('satchel', 1, 4)], forbidden: ['meat', 'fish', 'ore', 'weapon', 'armor', 'livestock'], family: 'documents', subfamily: 'message supplies' }),
  role({ id: 'quartermaster', label: 'Quartermaster logistics stock', terms: ['quartermaster', 'supply clerk', 'warehouse clerk'], primary: [pool('rope', 1, 8), pool('crate', 1, 8), pool('barrels', 1, 7), pool('salt', 1, 8), pool('cloth', 1, 7), pool('lantern', 1, 5)], secondary: [pool('bread', 1, 8), pool('tool', 1, 5), pool('basket', 1, 5), pool('paper', 1, 4)], forbidden: ['jewelry', 'gems', 'royal', 'magic'], family: 'market goods', subfamily: 'logistics' }),
  role({ id: 'general_market_trader', label: 'General market trader', terms: [], primary: [pool('bread', 1, 6), pool('cloth', 1, 5), pool('salt', 1, 6), pool('candle', 1, 5), pool('rope', 1, 4)], secondary: [pool('basket', 1, 3), pool('jar', 1, 4), pool('paper', 1, 3)], forbidden: [], family: 'market goods', subfamily: 'general goods' }),
];

const ROLE_BY_ID = new Map(ROLE_CATALOG.map((entry) => [entry.id, entry]));

function findMatchingBrace(source, startIndex) {
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let index = startIndex; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
}

function parseStringLiteral(raw) {
  if (!raw) return '';
  const quote = raw[0];
  const body = raw.slice(1, -1);
  if (quote === '`') return body.replace(/\$\{[^}]*\}/g, '').replace(/\\`/g, '`').replace(/\\n/g, ' ');
  try {
    return JSON.parse(raw.replace(/^'/, '"').replace(/'$/, '"'));
  } catch {
    return body.replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\n/g, ' ');
  }
}

function extractString(block, field) {
  const safeField = field.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const fieldPattern = `["']?${safeField}["']?`;
  const quoted = block.match(new RegExp(fieldPattern + '\\s*:\\s*([\\"\'])([\\s\\S]*?)\\1'));
  if (quoted) return quoted[2].replace(/\\n/g, ' ').replace(/\\\"/g, '"').replace(/\\'/g, "'");
  const templated = block.match(new RegExp(fieldPattern + '\\s*:\\s*`([\\s\\S]*?)`'));
  return templated ? templated[1].replace(/\$\{[^}]*\}/g, '').replace(/\\n/g, ' ') : '';
}

function extractStringArray(block, field) {
  const safeField = field.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = block.match(new RegExp(`["']?${safeField}["']?\\s*:\\s*\\[([\\s\\S]*?)\\]`));
  if (!match) return [];
  const values = [];
  const re = /("(?:\\.|[^"])*"|'(?:\\.|[^'])*'|`(?:\\.|[^`])*`)/g;
  let item;
  while ((item = re.exec(match[1]))) values.push(parseStringLiteral(item[1]));
  return values;
}

function parseIdentityBatches() {
  const identities = new Map();
  if (!fs.existsSync(IDENTITY_BATCH_DIR)) return identities;
  for (const file of fs.readdirSync(IDENTITY_BATCH_DIR).filter((entry) => entry.endsWith('.ts')).sort()) {
    const filePath = path.join(IDENTITY_BATCH_DIR, file);
    const source = fs.readFileSync(filePath, 'utf8');
    const idRe = /["']?characterId["']?\s*:\s*["'](character-\d+)["']/g;
    let match;
    while ((match = idRe.exec(source))) {
      const before = source.lastIndexOf('{', match.index);
      const end = before >= 0 ? findMatchingBrace(source, before) : -1;
      if (before < 0 || end < 0) continue;
      const block = source.slice(before, end + 1);
      const characterId = match[1];
      const parsed = {
        characterId,
        finalDisplayName: extractString(block, 'finalDisplayName'),
        profession: extractString(block, 'profession'),
        marketFlavor: extractString(block, 'marketFlavor'),
        tradePersonality: extractString(block, 'tradePersonality'),
        shortStory: extractString(block, 'shortStory'),
        visualIdentity: extractString(block, 'visualIdentity'),
        identityAnchor: extractString(block, 'identityAnchor'),
        portraitBasePrompt: extractString(block, 'portraitBasePrompt'),
        integrationNotes: extractString(block, 'integrationNotes'),
        gameplayGroups: extractStringArray(block, 'gameplayGroups'),
        roleTags: extractStringArray(block, 'roleTags'),
        professionProps: extractStringArray(block, 'professionProps'),
        questHooks: extractStringArray(block, 'questHooks'),
        uniquenessTraits: extractStringArray(block, 'uniquenessTraits'),
      };
      if (!parsed.finalDisplayName && !parsed.profession) continue;
      const existing = identities.get(characterId);
      if (existing?.finalDisplayName && existing?.profession && (!parsed.finalDisplayName || !parsed.profession)) continue;
      identities.set(characterId, parsed);
    }
  }
  return identities;
}

function walkJsonFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walkJsonFiles(filePath));
    if (entry.isFile() && entry.name.endsWith('.json')) results.push(filePath);
  }
  return results;
}

function flattenCategoryAxes(axes) {
  const values = [];
  if (!axes || typeof axes !== 'object') return values;
  for (const entry of Object.values(axes)) {
    if (Array.isArray(entry)) values.push(...entry);
  }
  return values;
}

function itemTokens(item) {
  const raw = [
    item.id,
    item.name,
    item.displayName,
    item.family,
    item.subfamily,
    ...(item.tags || []),
    ...(item.professionUses || []),
    ...(item.marketBehavior || []),
    ...(item.sources || []),
    ...flattenCategoryAxes(item.categoryAxes),
  ];
  return new Set(raw.map(normalizeToken).filter(Boolean));
}

function readItemCatalog() {
  const items = [];
  for (const filePath of walkJsonFiles(ITEM_CATALOG_DIR)) {
    if (path.resolve(filePath) === path.resolve(OUTPUT_ITEM_PATH)) continue;
    try {
      const parsed = readJson(filePath, []);
      if (Array.isArray(parsed)) items.push(...parsed);
    } catch (error) {
      throw new Error(`Could not read ${POSIX(path.relative(ROOT, filePath))}: ${error.message}`);
    }
  }
  const tokens = new Set();
  let maxIndex = 0;
  for (const item of items) {
    maxIndex = Math.max(maxIndex, Number(item.index) || 0);
    for (const token of itemTokens(item)) tokens.add(token);
  }
  return { items, tokens, maxIndex };
}

function textFor(identity, runtimeProfile) {
  const fields = [
    identity.profession,
    identity.marketFlavor,
    identity.tradePersonality,
    identity.shortStory,
    identity.visualIdentity,
    identity.identityAnchor,
    identity.portraitBasePrompt,
    identity.integrationNotes,
    runtimeProfile.professionSlug,
    ...(identity.gameplayGroups || []),
    ...(identity.roleTags || []),
    ...(identity.professionProps || []),
    ...(identity.questHooks || []),
    ...(identity.uniquenessTraits || []),
  ];
  return normalizePhrase(fields.filter(Boolean).join(' '));
}

function scoreRole(roleEntry, text, identity) {
  if (roleEntry.id === 'general_market_trader') return 0;
  let score = 0;
  const profession = normalizePhrase(identity.profession || '');
  for (const term of roleEntry.terms) {
    const normalized = normalizePhrase(term);
    if (!textHasPhrase(text, normalized)) continue;
    score += 5 + Math.min(10, normalized.length / 3);
    if (textHasPhrase(profession, normalized)) score += 16;
  }
  for (const tag of identity.roleTags || []) {
    const tagText = normalizePhrase(tag);
    if (!tagText) continue;
    if (roleEntry.terms.some((term) => textHasPhrase(tagText, term) || textHasPhrase(normalizePhrase(term), tagText))) score += 8;
  }
  return score;
}

function chooseRole(identity, runtimeProfile) {
  const text = textFor(identity, runtimeProfile);
  let best = ROLE_BY_ID.get('general_market_trader');
  let bestScore = 0;
  for (const roleEntry of ROLE_CATALOG) {
    const score = scoreRole(roleEntry, text, identity);
    if (score > bestScore) {
      best = roleEntry;
      bestScore = score;
    }
  }
  const confidence = bestScore >= 22 ? 'direct' : bestScore >= 10 ? 'inferred' : 'broad';
  return { roleEntry: best, confidence, score: Number(bestScore.toFixed(1)) };
}

function biasForPools(primary, secondary) {
  const biases = [];
  primary.forEach((entry, index) => biases.push({ tag: entry.tag, percent: Math.max(64, 100 - index * 6) }));
  secondary.forEach((entry, index) => biases.push({ tag: entry.tag, percent: Math.max(24, 52 - index * 5) }));
  return biases;
}

function wantedTagsForProfile(profile) {
  return [...profile.primaryPools, ...profile.secondaryPools].map((entry) => normalizeToken(entry.tag)).filter(Boolean);
}

function shouldCreateItemForTag(tag) {
  if (!tag || ABSTRACT_TAGS.has(tag)) return false;
  if (tag.length <= 2) return false;
  return true;
}

function buildGeneratedItem(tag, index, roleEntry) {
  const displayName = titleCase(tag);
  const iconFile = `character-stock/${tag}.png`;
  const isFood = ['bread', 'loaf', 'flour', 'grain', 'pastry', 'honey', 'salt', 'meat', 'sausage', 'fish', 'seafood', 'shellfish', 'oyster', 'apple', 'vegetable', 'herbs', 'mushrooms', 'fruit', 'spices', 'spice', 'oil', 'water', 'meal', 'bran', 'feed', 'insects'].some((foodTag) => tag.includes(foodTag));
  const isDocument = ['paper', 'ink', 'ledger', 'contract', 'permit', 'map', 'seal', 'quill', 'document', 'recipe'].some((docTag) => tag.includes(docTag));
  const family = isFood ? 'food' : isDocument ? 'documents' : roleEntry.family;
  return {
    index,
    id: `stock_profile_${tag}`,
    name: displayName.toLowerCase(),
    displayName,
    iconFile,
    tags: [...new Set([tag, roleEntry.id, 'character_stock', 'specialty_trade'])],
    family,
    subfamily: roleEntry.subfamily,
    categoryAxes: {
      material: [],
      productionStage: ['finished_good'],
      freshness: isFood ? ['shelf_stable'] : [],
      legalSocial: ['ordinary'],
      marketBehavior: ['specialty_trade'],
      storageHandling: [isFood ? 'sealed' : 'dry'],
      artVariant: ['single_object'],
      featureHooks: ['character_stock_profile'],
    },
    forms: ['one', 'few', 'many'],
    professionUses: [roleEntry.id],
    regions: [],
    sources: ['market'],
    tradeRole: isFood ? 'consumable_good' : 'specialty_good',
    rarityBand: 'common',
    qualityBands: ['common', 'fine'],
    bulkProfile: tag.includes('bolt') || tag.includes('cloth') ? 'cloth_roll' : tag.includes('barrel') || tag.includes('crate') ? 'storage_bundle' : 'small_goods',
    storageNeeds: isFood ? ['dry'] : [],
    decayProfile: isFood ? 'slow' : 'none',
    marketBehavior: ['specialty_trade'],
    loafValue: isFood ? 35 : 55,
    size: tag.includes('bolt') || tag.includes('barrel') || tag.includes('crate') || tag.includes('saddle') ? 3 : 1,
    weight: tag.includes('bolt') || tag.includes('barrel') || tag.includes('crate') || tag.includes('saddle') ? 2 : 1,
    pull: 0,
    carry: 0,
    rarity: 1,
    unique: false,
    kingdomIndex: null,
    imageFile: null,
    textFile: null,
    description: `specialist stock item for ${roleEntry.label.toLowerCase()}: ${displayName.toLowerCase()}`,
  };
}

function buildPrompt(item, order) {
  return {
    order,
    itemId: item.id,
    outputFile: item.iconFile,
    prompt: `Ultra-cartoony magical fantasy game item icon of ${item.displayName.toLowerCase()}, clear readable collectible merchant stock, centered object, no text, no border, pure green background #00FF00.`,
  };
}

const PROMPT_BATCH_SIZE = 50;
const PROMPT_GRID_COLUMNS = 10;
const PROMPT_GRID_ROWS = 5;
const PROMPT_STYLE = 'Ultra-cartoony fantasy merchant inventory icon, artistic magical game asset, playful and fantastic rather than realistic, bold exaggerated silhouette, chunky toy-like 3D form, hand-painted details, vibrant enchanted colors, glowing magical accents, whimsical proportions, polished collectible-game look, consistent three-quarter top-down camera angle, isolated object, no text, no labels, no UI frame, no border, no watermark.';
const PROMPT_SHEET_TEMPLATE = [
  'Create one sprite sheet containing exactly {slotCount} separate inventory item icons.',
  'Use a strict 10 columns by 5 rows grid. Every grid cell must contain exactly one centered icon and must stay visually separated from neighboring cells with empty padding.',
  'Use a strongly stylized ultra-cartoony fantasy game-art look, not realistic and not semi-realistic: make the icons feel much cooler, more magical, more artistic, more playful, and more fantastic, with bold shapes, chunky 3D forms, crisp hand-painted details, enchanted glows, saturated accents, rim light, decorative fantasy materials, and collectible-game polish.',
  'Avoid boring everyday realism. Push each item toward a memorable fantasy-game version while preserving what the item is.',
  'Do not add visible grid lines, numbers, labels, captions, letters, watermarks, UI frames, boxes, or shadows that cross cells. Do not show a transparency checkerboard. Use a solid pure #00FF00 green background.',
  'Use the 16:9 canvas option. Inside it, create a centered 2:1 transparent sprite-sheet area with a strict 10 by 5 grid of square cells. The grid should span nearly the full canvas width and leave equal transparent padding above and below. Do not stretch the grid to 16:9.',
  'Make each icon large, sharp, and detailed enough to crop into an individual high-quality icon later. Use the highest available resolution for the 16:9 canvas. The crop area is the centered 10 by 5 grid, not the full 16:9 canvas.',
  'Use the provided slot order exactly, reading left to right across each row, then top to bottom. Do not reorder, skip, merge, duplicate, or rename any slot.',
  'The icons must share one consistent ultra-cartoony magical fantasy game-art direction, lighting setup, camera angle, and scale language, while still making each merchant-stock item visually distinct by silhouette, material, color, trim, age, and fantasy decoration.',
  'Every slot in this sheet is a single object item. Show exactly one main item in each slot.',
].join(' ');

function promptSheetText(slotCount) {
  return PROMPT_SHEET_TEMPLATE.replace('{slotCount}', String(slotCount));
}

function slotLabel(slot) {
  return `${slot.sheetSlot}. ${slot.itemName} (one)`;
}

function writePromptBatches(items) {
  ensureDir(path.join(OUTPUT_PROMPT_DIR, 'placeholder.json'));
  for (const file of fs.readdirSync(OUTPUT_PROMPT_DIR)) {
    if (/^missing-character-stock-items-\d{4}-\d{4}\.json$/.test(file)) {
      fs.rmSync(path.join(OUTPUT_PROMPT_DIR, file), { force: true });
    }
  }
  if (!items.length) return [];

  const prompts = items.map((item, index) => {
    const prompt = buildPrompt(item, index + 1);
    return {
      globalSlot: index + 1,
      itemNumber: index + 1,
      itemId: prompt.itemId,
      itemName: item.displayName,
      variant: 'single',
      variantName: 'one',
      outputFile: prompt.outputFile,
      prompt: prompt.prompt,
    };
  });

  const files = [];
  for (let start = 0; start < prompts.length; start += PROMPT_BATCH_SIZE) {
    const batchSlots = prompts.slice(start, start + PROMPT_BATCH_SIZE).map((slot, index) => ({
      ...slot,
      sheetSlot: index + 1,
      row: Math.floor(index / PROMPT_GRID_COLUMNS) + 1,
      column: (index % PROMPT_GRID_COLUMNS) + 1,
    }));
    const first = String(batchSlots[0].globalSlot).padStart(4, '0');
    const last = String(batchSlots[batchSlots.length - 1].globalSlot).padStart(4, '0');
    const fileName = `missing-character-stock-items-${first}-${last}.json`;
    const order = batchSlots.map(slotLabel);
    const sheetPrompt = promptSheetText(batchSlots.length);
    writeJson(path.join(OUTPUT_PROMPT_DIR, fileName), {
      batch: {
        firstGlobalSlot: batchSlots[0].globalSlot,
        lastGlobalSlot: batchSlots[batchSlots.length - 1].globalSlot,
        slotCount: batchSlots.length,
        maxSlotsPerSheet: PROMPT_BATCH_SIZE,
      },
      grid: {
        columns: PROMPT_GRID_COLUMNS,
        rows: PROMPT_GRID_ROWS,
        readingOrder: 'left-to-right by row, top-to-bottom',
        targetCanvas: 'highest available 16:9 canvas',
        targetGrid: 'centered 2:1 grid area inside the 16:9 canvas, strict 10x5 square cells',
        targetCell: 'square cells; grid spans nearly the full width with transparent padding above and below',
      },
      style: PROMPT_STYLE,
      sheetPrompt,
      generationPrompt: `${sheetPrompt}\n\nSlot order:\n${order.join('\n')}`,
      order,
      slots: batchSlots,
    });
    files.push(fileName);
  }
  return files;
}

function main() {
  const runtimeProfiles = readJson(RUNTIME_PROFILE_PATH, {});
  const identities = parseIdentityBatches();
  const { tokens, maxIndex } = readItemCatalog();
  const generatedProfiles = [];
  const missingByTag = new Map();
  let nextIndex = Math.max(maxIndex + 1, 2238);

  const runtimeEntries = Object.values(runtimeProfiles)
    .filter((profile) => typeof profile.runtimeIndex === 'number')
    .sort((left, right) => (left.runtimeIndex ?? 0) - (right.runtimeIndex ?? 0));

  for (const runtimeProfile of runtimeEntries) {
    const identity = identities.get(runtimeProfile.characterId) || {
      characterId: runtimeProfile.characterId,
      finalDisplayName: runtimeProfile.characterId,
      profession: runtimeProfile.professionSlug || 'Trader',
      roleTags: [],
      professionProps: [],
      questHooks: [],
      uniquenessTraits: [],
    };
    const { roleEntry, confidence, score } = chooseRole(identity, runtimeProfile);
    const profile = {
      characterId: runtimeProfile.characterId,
      displayName: identity.finalDisplayName || runtimeProfile.characterId,
      profession: identity.profession || runtimeProfile.professionSlug || 'Trader',
      stockRole: roleEntry.id,
      confidence,
      primaryPools: roleEntry.primary,
      secondaryPools: roleEntry.secondary,
      stockBias: biasForPools(roleEntry.primary, roleEntry.secondary),
      forbiddenTags: roleEntry.forbidden,
      sourceNotes: [
        `role: ${roleEntry.label}`,
        `score: ${score}`,
        `runtime profession slug: ${runtimeProfile.professionSlug || 'none'}`,
      ],
      missingTags: [],
    };

    for (const tag of wantedTagsForProfile(profile)) {
      if (tokens.has(tag)) continue;
      if (!shouldCreateItemForTag(tag)) continue;
      if (!missingByTag.has(tag)) {
        const item = buildGeneratedItem(tag, nextIndex, roleEntry);
        nextIndex += 1;
        missingByTag.set(tag, item);
        tokens.add(tag);
      }
      profile.missingTags.push(tag);
    }
    generatedProfiles.push(profile);
  }

  const generatedItems = [...missingByTag.values()].sort((left, right) => left.index - right.index);
  const promptFiles = writePromptBatches(generatedItems);

  writeJson(OUTPUT_PROFILE_PATH, generatedProfiles);
  writeJson(OUTPUT_ITEM_PATH, generatedItems);

  ensureDir(OUTPUT_REPORT_PATH);
  const roleCounts = new Map();
  const confidenceCounts = new Map();
  for (const profile of generatedProfiles) {
    roleCounts.set(profile.stockRole, (roleCounts.get(profile.stockRole) || 0) + 1);
    confidenceCounts.set(profile.confidence, (confidenceCounts.get(profile.confidence) || 0) + 1);
  }
  const lines = [];
  lines.push('# Character Stock Profile Report');
  lines.push('');
  lines.push(`Generated explicit stock profiles: ${generatedProfiles.length}`);
  lines.push(`Generated stock item records: ${generatedItems.length}`);
  lines.push('');
  lines.push('## Confidence');
  for (const [key, count] of [...confidenceCounts.entries()].sort()) lines.push(`- ${key}: ${count}`);
  lines.push('');
  lines.push('## Roles');
  for (const [key, count] of [...roleCounts.entries()].sort((a, b) => b[1] - a[1])) lines.push(`- ${key}: ${count}`);
  lines.push('');
  lines.push('## Generated item prompts');
  if (!generatedItems.length) lines.push('No additional item prompts were needed.');
  for (const fileName of promptFiles) lines.push(`- batch: docs/assets/item-prompts/${fileName}`);
  for (const item of generatedItems) lines.push(`- ${item.displayName} -> ${item.iconFile}`);
  lines.push('');
  lines.push('## Profiles');
  for (const profile of generatedProfiles) {
    lines.push(`- ${profile.characterId} — ${profile.displayName} — ${profile.profession} — ${profile.stockRole} — ${profile.confidence}`);
    lines.push(`  - primary: ${profile.primaryPools.map((entry) => entry.tag).join(', ')}`);
    if (profile.secondaryPools.length) lines.push(`  - secondary: ${profile.secondaryPools.map((entry) => entry.tag).join(', ')}`);
  }
  fs.writeFileSync(OUTPUT_REPORT_PATH, `${lines.join('\n')}\n`);

  console.log(`Generated ${generatedProfiles.length} character stock profiles.`);
  console.log(`Generated ${generatedItems.length} item records for missing stock tags.`);
  console.log(`Wrote ${POSIX(path.relative(ROOT, OUTPUT_REPORT_PATH))}.`);
}

main();
