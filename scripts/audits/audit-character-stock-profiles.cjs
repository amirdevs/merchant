const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const PROFILE_PATH = path.join(ROOT, 'src/content/characters/stock/character-stock-profiles.json');
const RUNTIME_PROFILE_PATH = path.join(ROOT, 'src/content/characters/runtime/profiles.data.json');
const ITEM_CATALOG_DIR = path.join(ROOT, 'src/content/items/catalog');
const REPORT_PATH = path.join(ROOT, 'docs/logs/character-stock-profile-report.md');

const ABSTRACT_TAGS = new Set([
  'market', 'merchant', 'specialty_trade', 'finished_good', 'input_good', 'ordinary', 'dry', 'durable', 'small_group',
  'single_object', 'food', 'tool', 'tools', 'luxury', 'currency', 'documents', 'document', 'household', 'travel',
  'container', 'storage', 'maritime', 'botanical', 'religion', 'contraband', 'royal', 'art', 'magic', 'music',
  'textile', 'cloth', 'fabric', 'metal', 'wood', 'produce', 'ingredient', 'small_luxury', 'salvage', 'bulky',
]);

const ROLE_EXPECTATIONS = [
  { match: 'Lysaro Vellthorn', role: 'silk_factor', tags: ['silk_bolt', 'dye_vials'] },
  { match: 'Milo Copperpot', role: 'cookshop_owner', tags: ['cookpot', 'ladle', 'spices'] },
  { match: 'Rima Glasslark', role: 'glass_seller', tags: ['glassware', 'glass_bottle'] },
  { match: 'Ivo Plumspice', role: 'spice_merchant', tags: ['spices', 'spice_jar_set'] },
  { match: 'Edris Nightjar', role: 'lamp_oil_seller', tags: ['lamp_oil', 'lantern'] },
  { match: 'Senna Rainbarrel', role: 'water_seller', tags: ['rainwater_jug', 'water'] },
  { match: 'Jarek Thornboot', role: 'cobbler', tags: ['shoe_repair', 'leather'] },
  { match: 'Kellan Sootwink', role: 'chimney_sweep', tags: ['chimney_brush', 'soot'] },
  { match: 'Orvik Bellows', role: 'tinker', tags: ['repair_tools', 'tinware'] },
  { match: 'Tovan Gristlen', role: 'miller', tags: ['flour', 'grain'] },
  { match: 'Borin Mulefriend', role: 'pack_animal_trader', tags: ['pack_saddle', 'animal_feed'] },
  { match: 'Brindle Mossback', role: 'stable_hand', tags: ['halter', 'horse_brush'] },
  { match: 'Hanna Milkbell', role: 'stable_hand', tags: ['feed_scoop', 'halter'] },
  { match: 'Talia Redscale', role: 'reptile_seller', tags: ['reptile', 'animal_cage'] },
  { match: 'Vessa Stonebloom', role: 'potter', tags: ['pottery', 'clay'] },
  { match: 'Nico Quickmeasure', role: 'surveying_tools', tags: ['measuring_cord', 'map'] },
  { match: 'Nixie Copperbell', role: 'bell_polisher', tags: ['bell', 'brass_polish'] },
  { match: 'Idris Starbrass', role: 'surveying_tools', tags: ['astrolabe', 'compass'] },
  { match: 'Mora Pindrop', role: 'locksmith', tags: ['lock', 'key'] },
];

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  const source = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  return JSON.parse(source);
}

function normalizeToken(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .replace(/_+/g, '_');
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
  return [
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
  ].map(normalizeToken).filter(Boolean);
}

function readItemTokens() {
  const tokens = new Set();
  for (const filePath of walkJsonFiles(ITEM_CATALOG_DIR)) {
    const parsed = readJson(filePath, []);
    if (!Array.isArray(parsed)) continue;
    for (const item of parsed) for (const token of itemTokens(item)) tokens.add(token);
  }
  return tokens;
}

function poolTags(profile) {
  return [...(profile.primaryPools || []), ...(profile.secondaryPools || [])].map((entry) => normalizeToken(entry.tag)).filter(Boolean);
}

const profiles = readJson(PROFILE_PATH, []);
const runtimeProfiles = Object.values(readJson(RUNTIME_PROFILE_PATH, {}));
const tokens = readItemTokens();
const profileById = new Map(profiles.map((profile) => [profile.characterId, profile]));
const failures = [];
const warnings = [];

if (!profiles.length) failures.push('No explicit character stock profiles were generated.');

const runtimeCharacters = runtimeProfiles.filter((profile) => typeof profile.runtimeIndex === 'number');
for (const runtimeProfile of runtimeCharacters) {
  if (!profileById.has(runtimeProfile.characterId)) failures.push(`Missing stock profile for runtime character ${runtimeProfile.characterId}.`);
}

for (const profile of profiles) {
  if (!profile.characterId) failures.push('A stock profile is missing characterId.');
  if (!profile.displayName) failures.push(`${profile.characterId} is missing displayName.`);
  if (!profile.stockRole) failures.push(`${profile.characterId} is missing stockRole.`);
  if (!Array.isArray(profile.primaryPools) || profile.primaryPools.length < 2) failures.push(`${profile.characterId} has fewer than 2 primary pools.`);
  if (!Array.isArray(profile.stockBias) || profile.stockBias.length < 2) failures.push(`${profile.characterId} has fewer than 2 stock bias entries.`);
  const seen = new Set();
  for (const tag of poolTags(profile)) {
    if (seen.has(tag)) failures.push(`${profile.characterId} repeats stock pool tag ${tag}.`);
    seen.add(tag);
    if (!tokens.has(tag) && !ABSTRACT_TAGS.has(tag)) warnings.push(`${profile.characterId} uses stock tag without catalog token: ${tag}.`);
  }
}

for (const expectation of ROLE_EXPECTATIONS) {
  const profile = profiles.find((entry) => entry.displayName === expectation.match);
  if (!profile) {
    failures.push(`Expected stock profile was not found for ${expectation.match}.`);
    continue;
  }
  const tags = new Set(poolTags(profile));
  if (profile.stockRole !== expectation.role) {
    failures.push(`${expectation.match} must use stock role ${expectation.role}, got ${profile.stockRole}.`);
  }
  for (const tag of expectation.tags) {
    if (!tags.has(normalizeToken(tag))) failures.push(`${expectation.match} is missing expected stock tag ${tag}.`);
  }
}

const genericProfiles = profiles.filter((profile) => profile.stockRole === 'general_market_trader');
if (genericProfiles.length > Math.max(12, Math.ceil(profiles.length * 0.12))) {
  warnings.push(`General market trader role count is high: ${genericProfiles.length}. Review broad profiles manually.`);
}

const roleCounts = new Map();
const confidenceCounts = new Map();
for (const profile of profiles) {
  roleCounts.set(profile.stockRole, (roleCounts.get(profile.stockRole) || 0) + 1);
  confidenceCounts.set(profile.confidence || 'unknown', (confidenceCounts.get(profile.confidence || 'unknown') || 0) + 1);
}

const lines = [];
lines.push('# Character Stock Profile Report');
lines.push('');
lines.push(`Runtime characters: ${runtimeCharacters.length}`);
lines.push(`Explicit stock profiles: ${profiles.length}`);
lines.push(`Failures: ${failures.length}`);
lines.push(`Warnings: ${warnings.length}`);
lines.push('');
lines.push('## Confidence');
for (const [key, count] of [...confidenceCounts.entries()].sort()) lines.push(`- ${key}: ${count}`);
lines.push('');
lines.push('## Roles');
for (const [key, count] of [...roleCounts.entries()].sort((a, b) => b[1] - a[1])) lines.push(`- ${key}: ${count}`);
lines.push('');
lines.push('## Failures');
if (!failures.length) lines.push('None.');
for (const failure of failures) lines.push(`- ${failure}`);
lines.push('');
lines.push('## Warnings');
if (!warnings.length) lines.push('None.');
for (const warning of warnings.slice(0, 200)) lines.push(`- ${warning}`);
lines.push('');
lines.push('## Profiles');
for (const profile of profiles) {
  lines.push(`- ${profile.characterId} - ${profile.displayName} - ${profile.profession} - ${profile.stockRole} - ${profile.confidence}`);
  lines.push(`  - primary: ${(profile.primaryPools || []).map((entry) => entry.tag).join(', ')}`);
  if ((profile.secondaryPools || []).length) lines.push(`  - secondary: ${profile.secondaryPools.map((entry) => entry.tag).join(', ')}`);
}
fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
fs.writeFileSync(REPORT_PATH, `${lines.join('\n')}\n`);

for (const warning of warnings.slice(0, 30)) console.warn(warning);
if (warnings.length > 30) console.warn(`...and ${warnings.length - 30} more warnings. See docs/logs/character-stock-profile-report.md.`);
if (failures.length) {
  for (const failure of failures) console.error(failure);
  process.exit(1);
}
console.log(`Character stock profile audit passed for ${profiles.length} profiles.`);
