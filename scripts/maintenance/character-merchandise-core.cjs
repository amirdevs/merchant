const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const CHARACTER_BATCH_DIR = path.join(ROOT, 'src/content/characters/profiles/batches');
const RUNTIME_PROFILE_FILE = path.join(ROOT, 'src/content/characters/runtime/profiles.data.json');
const ITEM_CHUNK_DIR = path.join(ROOT, 'src/content/items/catalog/chunks');
const MERCH_DIR = path.join(ROOT, 'src/content/characters/merchandise');
const ITEM_EXTENSION_FILE = path.join(ROOT, 'src/content/items/catalog/character-merchandise-items.json');
const ASSIGNMENTS_FILE = path.join(MERCH_DIR, 'assignments.json');
const REVIEW_FILE = path.join(MERCH_DIR, 'review-needed.json');
const PROMPT_FILE = path.join(ROOT, 'docs/assets/item-prompts/missing-character-merchandise-items.json');
const REPORT_FILE = path.join(ROOT, 'docs/logs/character-merchandise-alignment-report.md');

const GENERIC_TERMS = new Set([
  'a','an','and','the','with','without','for','from','into','onto','near','like','his','her','their','its','one','two','three','four','five',
  'market','merchant','trade','trader','buyer','seller','vendor','dealer','broker','goods','wares','item','items','stock','price','prices',
  'story','stories','rumor','rumors','quest','quests','contract','contracts','job','jobs','sale','sales','offer','offers','coin','coins',
  'person','people','customer','customers','town','city','dock','road','route','guild','company','shop','stall','hall','row',
]);

const BODY_AND_CLOTHES_TERMS = new Set([
  'skin','hair','eyes','eye','face','cheekbones','jaw','mouth','brow','finger','fingers','hands','hand','shoulder','shoulders','body','posture','stance',
  'smile','grin','expression','coat','apron','sleeves','sleeve','vest','collar','scarf','cap','hat','braid','beard','shirt','dress','robe','belt',
  'boots','gloves','cloak','silhouette','build','adult','young','elderly','tall','short','broad','thin','narrow','wide','round','square',
]);

const TOOL_OR_SERVICE_NOUNS = new Set([
  'bell','scale','scales','lens','lenses','papers','paper','ledger','ledgers','slate','stamp','stamps','ink pad','hook','hooks','pouch','satchel','box','sample box',
  'cards','card','tag','tags','map','maps','permit','permits','receipt','receipts','quill','quills','brush','brushes','needle','needles',
]);

const SELLING_CUES = [
  'sell','sells','selling','stock','stocks','stocking','offer','offers','offering','trade','trades','trading','deal in','deals in','dealer of','dealer in',
  'vendor of','seller of','merchant of','broker of','specializes in','specialist in','known for','keeps a stall of','keeps crates of','keeps baskets of',
  'carries','carries trays of','carries baskets of','runs a stall of','imports','exports','buys and sells','clearance','clearance of',
];

const STOCK_PROFESSION_CUES = [
  'merchant','trader','dealer','vendor','seller','broker','collector','supplier','grocer','baker','fisher','fishmonger','florist','tailor','seamstress',
  'clothier','weaver','butcher','farmer','alchemist','apothecary','blacksmith','smith','bookbinder','bookseller','candlemaker','spice','spicer',
  'perfumer','jeweler','gem','carpenter','tanner','leatherworker','fletcher','miner','cook','innkeeper','herbalist',
];

const STRONG_CONTEXT_FIELDS = new Set(['profession', 'roleTags', 'tradePersonality', 'shortStory', 'questHooks']);
const PROP_FIELDS = new Set(['professionProps', 'visualIdentity', 'portraitBasePrompt']);

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

function writeJson(filePath, value) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9'\-\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function singularizeToken(value) {
  const token = normalize(value);
  if (token.endsWith('ies') && token.length > 4) return `${token.slice(0, -3)}y`;
  if (token.endsWith('ses')) return token.slice(0, -2);
  if (token.endsWith('s') && !token.endsWith('ss') && token.length > 3) return token.slice(0, -1);
  return token;
}

function slugify(value) {
  return normalize(value).replace(/'/g, '').replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '').replace(/^_+|_+$/g, '');
}

function titleCase(value) {
  return normalize(value).split(' ').filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

function extractString(block, field) {
  const match = block.match(new RegExp(`"${field}"\\s*:\\s*"([\\s\\S]*?)"`));
  return match ? match[1].replace(/\\"/g, '"') : '';
}

function extractArray(block, field) {
  const match = block.match(new RegExp(`"${field}"\\s*:\\s*\\[([\\s\\S]*?)\\]`));
  if (!match) return [];
  return [...match[1].matchAll(/"([^"\\]*(?:\\.[^"\\]*)*)"/g)].map((entry) => entry[1].replace(/\\"/g, '"'));
}

function identityBlocksFromBatch(source) {
  const markers = [...source.matchAll(/"characterId"\s*:\s*"character-\d{3}"/g)].map((match) => match.index);
  return markers.map((markerIndex, index) => {
    const start = source.lastIndexOf('{', markerIndex);
    const nextMarker = markers[index + 1] ?? source.indexOf('\n  ]', markerIndex);
    const end = nextMarker > start ? source.lastIndexOf('}', nextMarker) + 1 : source.length;
    return source.slice(start, end);
  }).filter((block) => block.includes('"characterId"'));
}

function readCharacterProfiles() {
  if (!fs.existsSync(CHARACTER_BATCH_DIR)) return [];
  const files = fs.readdirSync(CHARACTER_BATCH_DIR).filter((file) => file.endsWith('.ts')).sort();
  const profiles = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(CHARACTER_BATCH_DIR, file), 'utf8');
    for (const block of identityBlocksFromBatch(raw)) {
      const profile = {
        sourceFile: file,
        characterId: extractString(block, 'characterId'),
        finalDisplayName: extractString(block, 'finalDisplayName'),
        profession: extractString(block, 'profession'),
        roleTags: extractArray(block, 'roleTags'),
        marketFlavor: extractString(block, 'marketFlavor'),
        tradePersonality: extractString(block, 'tradePersonality'),
        shortStory: extractString(block, 'shortStory'),
        visualIdentity: extractString(block, 'visualIdentity'),
        professionProps: extractArray(block, 'professionProps'),
        portraitBasePrompt: extractString(block, 'portraitBasePrompt'),
        questHooks: extractArray(block, 'questHooks'),
      };
      if (profile.characterId) profiles.push(profile);
    }
  }
  return profiles;
}

function readActiveRuntimeCharacterIds() {
  const runtimeProfiles = readJson(RUNTIME_PROFILE_FILE, {});
  return new Set(
    Object.values(runtimeProfiles)
      .filter((profile) => profile && typeof profile.runtimeIndex === 'number')
      .map((profile) => profile.characterId),
  );
}

function readItems() {
  const items = [];
  if (fs.existsSync(ITEM_CHUNK_DIR)) {
    for (const file of fs.readdirSync(ITEM_CHUNK_DIR).filter((file) => file.endsWith('.json')).sort()) {
      const chunk = readJson(path.join(ITEM_CHUNK_DIR, file), []);
      if (Array.isArray(chunk)) items.push(...chunk);
    }
  }
  return items;
}

function itemTextParts(item) {
  return [
    item.id,
    item.name,
    item.displayName,
    item.family,
    item.subfamily,
    item.tradeRole,
    ...(item.tags || []),
    ...(item.forms || []),
    ...(item.professionUses || []),
    ...(item.sources || []),
    ...(item.marketBehavior || []),
    ...Object.values(item.categoryAxes || {}).flat(),
  ].filter(Boolean);
}

function buildItemAliases(items) {
  const aliases = new Map();
  for (const item of items) {
    const tokens = new Set();
    for (const part of itemTextParts(item)) {
      const normalized = normalize(String(part).replace(/_/g, ' '));
      if (!normalized) continue;
      tokens.add(normalized);
      tokens.add(singularizeToken(normalized));
      const words = normalized.split(' ').filter(Boolean);
      if (words.length > 1) {
        tokens.add(words.slice(-1)[0]);
        tokens.add(words.slice(-2).join(' '));
      }
    }
    for (const token of tokens) {
      if (!token || token.length < 3 || GENERIC_TERMS.has(token)) continue;
      if (!aliases.has(token)) aliases.set(token, []);
      aliases.get(token).push(item);
    }
  }
  return aliases;
}

function canonicalStockTag(item, fallbackToken) {
  const explicitTag = (item.tags || []).map((tag) => normalize(tag).replace(/\s+/g, '_')).find(Boolean);
  if (explicitTag) return explicitTag;
  if (item.id) return normalize(item.id).replace(/\s+/g, '_');
  if (item.name) return normalize(item.name).replace(/\s+/g, '_');
  return normalize(fallbackToken).replace(/\s+/g, '_');
}

function containsPhrase(text, phrase) {
  const normalized = ` ${normalize(text)} `;
  const safe = normalize(phrase).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?:^|\\s)${safe}(?:\\s|$)`).test(normalized);
}

function profileTextSources(profile) {
  return [
    { field: 'profession', value: profile.profession },
    { field: 'roleTags', value: profile.roleTags.join(' ') },
    { field: 'marketFlavor', value: profile.marketFlavor },
    { field: 'tradePersonality', value: profile.tradePersonality },
    { field: 'shortStory', value: profile.shortStory },
    { field: 'visualIdentity', value: profile.visualIdentity },
    { field: 'professionProps', value: profile.professionProps.join('; ') },
    { field: 'portraitBasePrompt', value: profile.portraitBasePrompt },
    { field: 'questHooks', value: profile.questHooks.join('; ') },
  ].filter((source) => source.value);
}

function hasSellingCue(text) {
  const normalized = normalize(text);
  return SELLING_CUES.some((cue) => normalized.includes(cue));
}

function profileLooksLikeStockSeller(profile) {
  const text = normalize([profile.profession, profile.roleTags.join(' '), profile.tradePersonality, profile.shortStory].join(' '));
  return STOCK_PROFESSION_CUES.some((cue) => text.includes(cue));
}

function confidenceFor(profile, source) {
  const sellingCue = hasSellingCue(source.value);
  if (sellingCue && STRONG_CONTEXT_FIELDS.has(source.field)) return 'high';
  if (STRONG_CONTEXT_FIELDS.has(source.field) && profileLooksLikeStockSeller(profile)) return 'high';
  if (source.field === 'professionProps' && profileLooksLikeStockSeller(profile)) return 'medium';
  if (PROP_FIELDS.has(source.field)) return 'review';
  return 'medium';
}

function nounPhraseLooksLikeItem(phrase) {
  const normalized = normalize(phrase);
  if (!normalized || normalized.length < 3) return false;
  const words = normalized.split(' ').filter(Boolean);
  if (!words.length || words.length > 5) return false;
  if (words.every((word) => GENERIC_TERMS.has(word) || BODY_AND_CLOTHES_TERMS.has(word))) return false;
  if (BODY_AND_CLOTHES_TERMS.has(words[words.length - 1])) return false;
  return true;
}

function cleanCandidatePhrase(phrase) {
  let normalized = normalize(phrase);
  normalized = normalized.replace(/\b(rows|row|trays|tray|crates|crate|boxes|box|bundles|bundle|piles|pile|baskets|basket|jars|jar|bags|bag|sacks|sack|small|large|tiny|polished|cracked|bent|chipped|sealed|marked|wax stained|wax-stained|red dyed|red-dyed)\b/g, ' ');
  normalized = normalized.replace(/\s+/g, ' ').trim();
  return normalized;
}

function extractCuePhrases(text) {
  const normalized = normalize(text);
  const phrases = [];
  for (const cue of SELLING_CUES) {
    const escaped = cue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`${escaped}\\s+(?:a|an|the|small|large|tiny|rows of|trays of|crates of|bundles of|piles of|baskets of|jars of|bags of|sacks of)?\\s*([a-z0-9'\\-\\s]{3,80}?)(?:\\.|,|;| and | with | for | because | while |$)`, 'g');
    let match;
    while ((match = re.exec(normalized))) {
      const phrase = cleanCandidatePhrase(match[1]);
      if (nounPhraseLooksLikeItem(phrase)) phrases.push(phrase);
    }
  }
  return phrases;
}

function extractPropPhrases(profile) {
  return profile.professionProps.map(cleanCandidatePhrase).filter(nounPhraseLooksLikeItem);
}

function itemCategoryForPhrase(phrase) {
  const token = normalize(phrase);
  if (/button|thread|ribbon|lace|needle|pin|buckle|clasp|fabric|cloth/.test(token)) return 'tailoring notions';
  if (/flour|bread|salt|fish|apple|cider|honey|spice|herb|tea|cheese|meat|grain|onion|vegetable|fruit/.test(token)) return 'food and provisions';
  if (/gem|ring|jewel|silver|gold|pearl|amber|charm|bead/.test(token)) return 'luxury goods';
  if (/wax|ink|paper|ledger|card|seal|stamp|permit|receipt/.test(token)) return 'documents and stationery';
  if (/candle|lantern|oil/.test(token)) return 'household goods';
  if (/wood|iron|leather|rope|hinge|cup|tool|nail/.test(token)) return 'craft supplies';
  if (/medicine|remedy|tonic|salve|plant|seed|flower/.test(token)) return 'apothecary goods';
  return 'specialty market goods';
}

function defaultValueForCategory(category) {
  if (category === 'luxury goods') return 120;
  if (category === 'documents and stationery') return 35;
  if (category === 'tailoring notions') return 18;
  if (category === 'food and provisions') return 16;
  if (category === 'apothecary goods') return 45;
  if (category === 'craft supplies') return 28;
  return 30;
}

function buildMissingItem(phrase, index) {
  const slug = slugify(phrase);
  const category = itemCategoryForPhrase(phrase);
  const value = defaultValueForCategory(category);
  return {
    index,
    id: `character_merchandise_${slug}`,
    name: normalize(phrase),
    displayName: titleCase(phrase),
    iconFile: `character-merchandise/character_merchandise_${slug}.png`,
    tags: Array.from(new Set([slug, singularizeToken(slug.replace(/_/g, ' ')).replace(/\s+/g, '_'), 'character_merchandise', category.replace(/\s+/g, '_')])).filter(Boolean),
    family: 'character merchandise',
    subfamily: category,
    categoryAxes: {
      material: [],
      productionStage: ['finished_good'],
      freshness: [],
      legalSocial: ['ordinary'],
      marketBehavior: ['specialty_trade'],
      storageHandling: ['handheld'],
      artVariant: ['single_object', 'small_group'],
      featureHooks: ['character_merchandise'],
    },
    forms: ['one', 'few', 'many'],
    professionUses: [],
    regions: [],
    sources: ['market'],
    tradeRole: 'specialty_good',
    rarityBand: value >= 100 ? 'uncommon' : 'common',
    qualityBands: ['common', 'fine'],
    bulkProfile: 'small_goods',
    storageNeeds: [],
    decayProfile: 'none',
    marketBehavior: ['specialty_trade'],
    loafValue: value,
    size: 1,
    weight: 1,
    pull: 0,
    carry: 0,
    rarity: value >= 100 ? 2 : 1,
    unique: false,
    kingdomIndex: null,
    imageFile: null,
    textFile: null,
  };
}

function promptForMissingItem(item, sourceCharacters) {
  return {
    itemId: item.id,
    outputFile: item.iconFile,
    displayName: item.displayName,
    category: item.subfamily,
    sourceCharacters,
    prompt: `Ultra-cartoony magical fantasy game item icon of ${item.displayName.toLowerCase()}, charming readable collectible merchant inventory art, isolated item on pure green #00FF00 background, no text, no labels, no frame, no watermark, crisp silhouette, playful non-realistic fantasy PC game icon style.`,
    negativePrompt: 'photorealistic, modern packaging, text, letters, watermark, UI frame, border, messy background, transparent background',
  };
}

function bestItemMatchForPhrase(phrase, aliases) {
  const normalized = normalize(phrase);
  const candidates = [normalized, singularizeToken(normalized), ...normalized.split(' ').filter((word) => word.length > 2).map(singularizeToken)];
  for (const candidate of candidates) {
    const matches = aliases.get(candidate);
    if (matches?.length) return { token: candidate, item: matches[0] };
  }
  let best = null;
  for (const [alias, items] of aliases.entries()) {
    if (alias.length < 4) continue;
    if (containsPhrase(normalized, alias) || containsPhrase(alias, normalized)) {
      if (!best || alias.length > best.token.length) best = { token: alias, item: items[0] };
    }
  }
  return best;
}

function analyzeProfiles() {
  const activeRuntimeCharacterIds = readActiveRuntimeCharacterIds();
  const profiles = readCharacterProfiles().filter((profile) => activeRuntimeCharacterIds.has(profile.characterId));
  const existingItems = readItems();
  const aliases = buildItemAliases(existingItems);
  const maxIndex = existingItems.reduce((max, item) => Math.max(max, Number(item.index) || 0), -1);
  let nextIndex = maxIndex + 1;
  const missingBySlug = new Map();
  const missingSources = new Map();
  const assignments = [];
  const review = [];

  for (const profile of profiles) {
    const matched = new Map();
    const missingIds = new Set();
    const reviewNotes = [];
    const candidatePhrases = [];
    const textSources = profileTextSources(profile);

    for (const source of textSources) {
      const sourceConfidence = confidenceFor(profile, source);
      for (const [alias, items] of aliases.entries()) {
        if (alias.length < 4 || GENERIC_TERMS.has(alias)) continue;
        if (!containsPhrase(source.value, alias)) continue;
        const item = items[0];
        const canonicalTag = canonicalStockTag(item, alias);
        const key = canonicalTag;
        const confidence = sourceConfidence === 'review' && !profileLooksLikeStockSeller(profile) ? 'review' : sourceConfidence;
        if (confidence === 'review') {
          reviewNotes.push(`Review ${item.name} from ${source.field}: matched '${alias}' in profile text.`);
          continue;
        }
        matched.set(key, {
          itemId: item.id,
          itemIndex: item.index,
          itemName: item.displayName || item.name,
          token: canonicalTag,
          sourceField: source.field,
          confidence,
        });
      }
      for (const phrase of extractCuePhrases(source.value)) {
        candidatePhrases.push({ phrase, sourceField: source.field, confidence: sourceConfidence === 'review' ? 'medium' : sourceConfidence });
      }
    }

    for (const phrase of extractPropPhrases(profile)) {
      candidatePhrases.push({ phrase, sourceField: 'professionProps', confidence: profileLooksLikeStockSeller(profile) ? 'medium' : 'review' });
    }

    for (const candidate of candidatePhrases) {
      const phrase = candidate.phrase;
      if (TOOL_OR_SERVICE_NOUNS.has(phrase) && candidate.confidence !== 'high') {
        reviewNotes.push(`Review prop/tool phrase '${phrase}' from ${candidate.sourceField}; not automatically treated as stock.`);
        continue;
      }
      const match = bestItemMatchForPhrase(phrase, aliases);
      if (match) {
        if (candidate.confidence === 'review') {
          reviewNotes.push(`Review matched item ${match.item.name} from ${candidate.sourceField}: '${phrase}'.`);
          continue;
        }
        const canonicalTag = canonicalStockTag(match.item, match.token);
        matched.set(canonicalTag, {
          itemId: match.item.id,
          itemIndex: match.item.index,
          itemName: match.item.displayName || match.item.name,
          token: canonicalTag,
          sourceField: candidate.sourceField,
          confidence: candidate.confidence,
        });
        continue;
      }
      if (candidate.confidence === 'review') {
        reviewNotes.push(`Review missing phrase '${phrase}' from ${candidate.sourceField}; not automatically added.`);
        continue;
      }
      const slug = slugify(phrase);
      if (!slug || slug.length < 3) continue;
      if (!missingBySlug.has(slug)) {
        const item = buildMissingItem(phrase, nextIndex++);
        missingBySlug.set(slug, item);
        missingSources.set(slug, []);
      }
      missingSources.get(slug).push({ characterId: profile.characterId, displayName: profile.finalDisplayName, phrase, sourceField: candidate.sourceField });
      missingIds.add(missingBySlug.get(slug).id);
    }

    const matchedItems = [...matched.values()].sort((a, b) => a.itemName.localeCompare(b.itemName));
    const stockPools = matchedItems.map((match) => ({ tag: match.token, quantityMin: match.confidence === 'high' ? 2 : 1, quantityMax: match.confidence === 'high' ? 8 : 4 }));
    const stockBias = matchedItems.map((match) => ({ tag: match.token, percent: match.confidence === 'high' ? 45 : 25 }));

    if (matchedItems.length || missingIds.size || reviewNotes.length) {
      assignments.push({
        characterId: profile.characterId,
        displayName: profile.finalDisplayName,
        profession: profile.profession,
        stockPools,
        stockBias,
        matchedItems,
        missingItemIds: [...missingIds].sort(),
        reviewNotes: reviewNotes.sort(),
      });
    }
    if (reviewNotes.length) {
      review.push({ characterId: profile.characterId, displayName: profile.finalDisplayName, profession: profile.profession, notes: reviewNotes.sort() });
    }
  }

  const missingItems = [...missingBySlug.values()].sort((a, b) => a.id.localeCompare(b.id));
  const missingPrompts = {
    schema: 'merchant-character-merchandise-missing-items-v1',
    count: missingItems.length,
    items: missingItems.map((item) => promptForMissingItem(item, missingSources.get(slugify(item.name)) || [])),
  };

  return {
    profiles,
    existingItems,
    assignments: assignments.sort((a, b) => a.characterId.localeCompare(b.characterId)),
    review: review.sort((a, b) => a.characterId.localeCompare(b.characterId)),
    missingItems,
    missingPrompts,
  };
}

function renderReport(result) {
  const matchedAssignments = result.assignments.filter((assignment) => assignment.matchedItems.length);
  const missingAssignments = result.assignments.filter((assignment) => assignment.missingItemIds.length);
  const lines = [
    '# Character Merchandise Alignment Report',
    '',
    'Generated by `pnpm apply:character-merchandise` / `pnpm audit:character-merchandise`.',
    '',
    '## Summary',
    '',
    '| Check | Count |',
    '|---|---:|',
    `| Character profiles scanned | ${result.profiles.length} |`,
    `| Item records scanned | ${result.existingItems.length} |`,
    `| Characters with merchandise findings | ${result.assignments.length} |`,
    `| Characters with matched existing stock | ${matchedAssignments.length} |`,
    `| Characters requiring new item records | ${missingAssignments.length} |`,
    `| New item records proposed | ${result.missingItems.length} |`,
    `| Review-needed characters | ${result.review.length} |`,
    '',
    '## Existing item stock assignments',
    '',
  ];
  if (!matchedAssignments.length) lines.push('- None.');
  for (const assignment of matchedAssignments) {
    lines.push(`- **${assignment.displayName}** (${assignment.characterId}, ${assignment.profession}): ${assignment.matchedItems.map((item) => `${item.itemName} via \`${item.token}\``).join('; ')}`);
  }
  lines.push('', '## New item prompts needed', '');
  if (!result.missingItems.length) lines.push('- None.');
  for (const item of result.missingItems) {
    const sources = result.missingPrompts.items.find((prompt) => prompt.itemId === item.id)?.sourceCharacters || [];
    lines.push(`- **${item.displayName}** (${item.id}) from ${sources.map((source) => `${source.displayName} / ${source.sourceField}`).join(', ')}`);
  }
  lines.push('', '## Review-needed notes', '');
  if (!result.review.length) lines.push('- None.');
  for (const entry of result.review) {
    lines.push(`- **${entry.displayName}** (${entry.characterId}):`);
    for (const note of entry.notes.slice(0, 8)) lines.push(`  - ${note}`);
    if (entry.notes.length > 8) lines.push(`  - ...and ${entry.notes.length - 8} more.`);
  }
  lines.push('');
  return `${lines.join('\n')}\n`;
}

function stableStringify(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

module.exports = {
  ROOT,
  ASSIGNMENTS_FILE,
  REVIEW_FILE,
  PROMPT_FILE,
  REPORT_FILE,
  ITEM_EXTENSION_FILE,
  analyzeProfiles,
  readJson,
  writeJson,
  renderReport,
  stableStringify,
};
