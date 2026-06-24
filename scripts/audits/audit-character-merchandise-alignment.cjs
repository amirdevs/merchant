#!/usr/bin/env node
/*
 * Audits character profile descriptions/props against the current item catalog.
 *
 * Outputs:
 * - docs/logs/character-merchandise-alignment-report.md
 * - src/content/characters/merchandise/assignments.json
 * - docs/assets/item-prompts/missing-character-merchandise-items.json
 */

const fs = require('node:fs');
const path = require('node:path');

const repoRoot = process.cwd();
const CONTENT_ROOT = path.join(repoRoot, 'src', 'content');
const CHARACTER_ROOT = path.join(CONTENT_ROOT, 'characters');
const REPORT_PATH = path.join(repoRoot, 'docs', 'logs', 'character-merchandise-alignment-report.md');
const ASSIGNMENTS_PATH = path.join(CHARACTER_ROOT, 'merchandise', 'assignments.json');
const PROMPT_PATH = path.join(repoRoot, 'docs', 'assets', 'item-prompts', 'missing-character-merchandise-items.json');

const PRODUCT_LEXICON = [
  { key: 'button', labels: ['button', 'buttons'], prompts: ['small carved clothing buttons', 'wooden buttons', 'bone buttons', 'brass buttons'], category: 'tailoring notions' },
  { key: 'needle', labels: ['needle', 'needles'], prompts: ['tailor needles', 'sewing needles'], category: 'tailoring notions' },
  { key: 'thread', labels: ['thread', 'threads', 'spool', 'spools'], prompts: ['thread spools', 'dyed thread'], category: 'tailoring notions' },
  { key: 'ribbon', labels: ['ribbon', 'ribbons', 'trim', 'trims'], prompts: ['dyed ribbons', 'decorative trim'], category: 'tailoring notions' },
  { key: 'lace', labels: ['lace', 'laces'], prompts: ['lace trim', 'fine lace'], category: 'tailoring notions' },
  { key: 'bead', labels: ['bead', 'beads'], prompts: ['glass beads', 'colored beads'], category: 'craft materials' },
  { key: 'charm', labels: ['charm', 'charms'], prompts: ['market charms', 'small brass charms'], category: 'trinkets' },
  { key: 'wax', labels: ['wax', 'sealing wax', 'wax sticks'], prompts: ['sealing wax sticks', 'red wax seals'], category: 'stationery' },
  { key: 'paper', labels: ['paper', 'parchment', 'scrolls'], prompts: ['parchment sheets', 'trade papers'], category: 'stationery' },
  { key: 'ink', labels: ['ink', 'inkpot', 'inkpots'], prompts: ['black ink bottle', 'market inkpot'], category: 'stationery' },
  { key: 'ledger', labels: ['ledger', 'ledgers'], prompts: ['bound trade ledger', 'merchant ledger'], category: 'documents' },
  { key: 'tag', labels: ['tag', 'tags', 'appraisal tags'], prompts: ['appraisal tags', 'labeled trade tags'], category: 'market tools' },
  { key: 'scale', labels: ['scale', 'scales', 'weighing scale', 'brass scale'], prompts: ['tiny brass scale', 'merchant weighing scale'], category: 'market tools' },
  { key: 'lens', labels: ['lens', 'lenses', 'glass lens'], prompts: ['green glass lens', 'appraiser lens'], category: 'market tools' },
  { key: 'bell', labels: ['bell', 'bells', 'hand bell'], prompts: ['brass hand bell', 'auction bell'], category: 'market tools' },
  { key: 'crate', labels: ['crate', 'crates'], prompts: ['wooden trade crate', 'bulk goods crate'], category: 'containers' },
  { key: 'hook', labels: ['hook', 'hooks', 'crate hook'], prompts: ['iron crate hook', 'warehouse hook'], category: 'market tools' },
  { key: 'rope', labels: ['rope', 'ropes'], prompts: ['coiled rope', 'trade rope'], category: 'trade supplies' },
  { key: 'sack', labels: ['sack', 'sacks', 'bag', 'bags'], prompts: ['grain sack', 'market sack'], category: 'containers' },
  { key: 'basket', labels: ['basket', 'baskets'], prompts: ['woven market basket', 'reed basket'], category: 'containers' },
  { key: 'bottle', labels: ['bottle', 'bottles', 'vial', 'vials'], prompts: ['glass vial', 'small bottle'], category: 'containers' },
  { key: 'jar', labels: ['jar', 'jars'], prompts: ['clay jar', 'preserve jar'], category: 'containers' },
  { key: 'flour', labels: ['flour'], prompts: ['sack of flour'], category: 'food staple' },
  { key: 'bread', labels: ['bread', 'loaf', 'loaves'], prompts: ['fresh bread loaf'], category: 'prepared food' },
  { key: 'salt', labels: ['salt'], prompts: ['coarse salt sack'], category: 'food staple' },
  { key: 'fish', labels: ['fish', 'fishes'], prompts: ['fresh river fish', 'salted fish'], category: 'food' },
  { key: 'herb', labels: ['herb', 'herbs'], prompts: ['bundled herbs', 'healing herbs'], category: 'alchemy/herbal' },
  { key: 'spice', labels: ['spice', 'spices'], prompts: ['mixed spice pouch', 'rare spices'], category: 'food luxury' },
  { key: 'cloth', labels: ['cloth', 'fabric', 'textile', 'textiles'], prompts: ['folded cloth bolt', 'dyed fabric'], category: 'textiles' },
  { key: 'leather', labels: ['leather', 'hide', 'hides'], prompts: ['worked leather roll', 'tanned hide'], category: 'materials' },
  { key: 'wood', labels: ['wood', 'timber', 'plank', 'planks'], prompts: ['timber planks', 'wood bundle'], category: 'materials' },
  { key: 'iron', labels: ['iron', 'ingot', 'ingots'], prompts: ['iron ingot', 'metal ingots'], category: 'materials' },
  { key: 'gem', labels: ['gem', 'gems', 'jewel', 'jewels'], prompts: ['polished gem', 'small jewels'], category: 'luxury' },
  { key: 'flower', labels: ['flower', 'flowers', 'bouquet'], prompts: ['market bouquet', 'fresh flowers'], category: 'flora' },
  { key: 'seed', labels: ['seed', 'seeds'], prompts: ['seed pouch', 'plant seeds'], category: 'farm supplies' },
  { key: 'candle', labels: ['candle', 'candles'], prompts: ['tallow candle', 'wax candles'], category: 'household goods' },
  { key: 'lantern', labels: ['lantern', 'lanterns'], prompts: ['brass lantern', 'paper lantern'], category: 'household goods' },
  { key: 'mask', labels: ['mask', 'masks'], prompts: ['festival mask', 'painted mask'], category: 'festival goods' },
  { key: 'card', labels: ['card', 'cards', 'deck'], prompts: ['playing cards', 'market card deck'], category: 'games' },
];

const SELLING_CUES = [
  'sell', 'sells', 'selling', 'seller', 'sold', 'vendor', 'merchant', 'trader', 'trade', 'trades',
  'shop', 'stall', 'stock', 'supplier', 'broker', 'dealer', 'maker', 'makes', 'crafts', 'crafting',
  'specialist', 'collector', 'buyer', 'buys', 'orders', 'contracts', 'market', 'wholesale', 'goods'
];

function walkFiles(dir, predicate, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, predicate, acc);
    else if (predicate(full)) acc.push(full);
  }
  return acc;
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function readText(file) {
  return fs.readFileSync(file, 'utf8');
}

function normalizeSpaces(value) {
  return String(value || '').replace(/[_-]/g, ' ').replace(/\s+/g, ' ').trim();
}

function slug(value) {
  return normalizeSpaces(value).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}

function textHasPhrase(text, phrase) {
  const escaped = phrase.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^a-z])${escaped}([^a-z]|$)`, 'i').test(text);
}

function containsAny(text, labels) {
  return labels.some((label) => textHasPhrase(text, label));
}

function nearbyCue(text, labels) {
  const lower = text.toLowerCase();
  for (const label of labels) {
    const idx = lower.indexOf(label.toLowerCase());
    if (idx === -1) continue;
    const start = Math.max(0, idx - 140);
    const end = Math.min(lower.length, idx + label.length + 140);
    const windowText = lower.slice(start, end);
    if (SELLING_CUES.some((cue) => textHasPhrase(windowText, cue))) return true;
  }
  return false;
}

function extractBalancedObjects(text, anchor) {
  const objects = [];
  let searchAt = 0;
  while (true) {
    const anchorAt = text.indexOf(anchor, searchAt);
    if (anchorAt === -1) break;
    let start = anchorAt;
    while (start >= 0 && text[start] !== '{') start -= 1;
    if (start < 0) break;

    let depth = 0;
    let inString = false;
    let quote = '';
    let escaped = false;
    let end = -1;
    for (let i = start; i < text.length; i += 1) {
      const ch = text[i];
      if (inString) {
        if (escaped) escaped = false;
        else if (ch === '\\') escaped = true;
        else if (ch === quote) inString = false;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === '`') {
        inString = true;
        quote = ch;
        continue;
      }
      if (ch === '{') depth += 1;
      if (ch === '}') {
        depth -= 1;
        if (depth === 0) {
          end = i + 1;
          break;
        }
      }
    }
    if (end > start) objects.push(text.slice(start, end));
    searchAt = Math.max(anchorAt + anchor.length, end + 1);
  }
  return objects;
}

function parseObject(objectText, file) {
  try {
    // Object snippets are project-authored TS object literals. They are evaluated locally for audit extraction only.
    return Function(`"use strict"; return (${objectText});`)();
  } catch (error) {
    return null;
  }
}

function loadCharacters() {
  const files = walkFiles(CHARACTER_ROOT, (file) => /cast-batch-\d{2}\.ts$/.test(path.basename(file)));
  const characters = [];
  for (const file of files) {
    const text = readText(file);
    const chunks = extractBalancedObjects(text, '"characterId"');
    for (const chunk of chunks) {
      const parsed = parseObject(chunk, file);
      if (!parsed || !parsed.characterId || !parsed.finalDisplayName) continue;
      characters.push({ ...parsed, sourceFile: path.relative(repoRoot, file).replace(/\\/g, '/') });
    }
  }
  characters.sort((a, b) => String(a.characterId).localeCompare(String(b.characterId), undefined, { numeric: true }));
  return characters;
}

function loadItems() {
  const files = walkFiles(CONTENT_ROOT, (file) => /\.(ts|json)$/.test(file) && !file.includes(`${path.sep}characters${path.sep}`));
  const seen = new Map();
  for (const file of files) {
    const text = readText(file);
    const chunks = [
      ...extractBalancedObjects(text, 'loafValue'),
      ...extractBalancedObjects(text, '"loafValue"'),
    ];
    for (const chunk of chunks) {
      const parsed = parseObject(chunk, file);
      if (!parsed || typeof parsed !== 'object') continue;
      const name = parsed.displayName || parsed.name;
      if (!name || typeof parsed.loafValue !== 'number') continue;
      const itemId = parsed.id || parsed.filename || parsed.slug || slug(name);
      const key = String(itemId);
      if (!seen.has(key)) {
        seen.set(key, {
          itemId: key,
          name: String(name),
          rawName: parsed.name ? String(parsed.name) : String(name),
          tags: Array.isArray(parsed.tags) ? parsed.tags.map(String) : [],
          iconFile: parsed.iconFile || null,
          family: parsed.family || null,
          sourceFile: path.relative(repoRoot, file).replace(/\\/g, '/'),
        });
      }
    }
  }
  return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function characterText(character) {
  const fields = [
    character.finalDisplayName,
    character.profession,
    character.marketFlavor,
    character.tradePersonality,
    character.shortStory,
    character.visualIdentity,
    character.identityAnchor,
    character.portraitBasePrompt,
    character.integrationNotes,
    ...(character.roleTags || []),
    ...(character.professionProps || []),
    ...(character.questHooks || []),
    ...(character.uniquenessTraits || []),
  ];
  return normalizeSpaces(fields.filter(Boolean).join(' ')).toLowerCase();
}

function buildItemIndex(items) {
  const indexed = items.map((item) => {
    const labels = new Set([item.name, item.rawName, item.itemId, ...(item.tags || [])]);
    for (const word of normalizeSpaces(item.name).split(' ')) {
      if (word.length > 3) labels.add(word);
    }
    return {
      ...item,
      labels: [...labels].map((label) => normalizeSpaces(label).toLowerCase()).filter((label) => label.length >= 3),
    };
  });
  return indexed;
}

function findItemMatches(term, itemIndex) {
  const termLabels = new Set([term.key, ...term.labels, ...term.prompts].map((v) => normalizeSpaces(v).toLowerCase()));
  const matches = [];
  for (const item of itemIndex) {
    const labelHit = item.labels.some((label) => {
      if (termLabels.has(label)) return true;
      return [...termLabels].some((termLabel) => label.includes(termLabel) || termLabel.includes(label));
    });
    if (labelHit) matches.push(item);
  }
  return matches.slice(0, 6);
}

function inferMatches(characters, items) {
  const itemIndex = buildItemIndex(items);
  const findings = [];
  const missing = new Map();
  const assignments = [];

  for (const character of characters) {
    const text = characterText(character);
    const charFindings = [];
    for (const term of PRODUCT_LEXICON) {
      if (!containsAny(text, term.labels)) continue;
      const sellingIntent = nearbyCue(text, term.labels);
      const inProps = (character.professionProps || []).some((prop) => containsAny(String(prop).toLowerCase(), term.labels));
      const inProfession = containsAny(String(character.profession || '').toLowerCase(), term.labels);
      const inStory = containsAny(String(character.shortStory || '').toLowerCase(), term.labels);
      const inVisual = containsAny(String(character.visualIdentity || '').toLowerCase(), term.labels) || containsAny(String(character.portraitBasePrompt || '').toLowerCase(), term.labels);
      const itemMatches = findItemMatches(term, itemIndex);
      const confidence = sellingIntent || inProfession ? 'high' : inStory || inProps ? 'medium' : 'low';
      const finding = {
        productKey: term.key,
        labels: term.labels,
        category: term.category,
        confidence,
        reasons: [
          sellingIntent ? 'selling/trade cue near term' : null,
          inProfession ? 'profession mentions term' : null,
          inStory ? 'story mentions term' : null,
          inProps ? 'professionProps mention term' : null,
          inVisual ? 'visual identity mentions term' : null,
        ].filter(Boolean),
        existingItems: itemMatches.map((item) => ({ itemId: item.itemId, name: item.name, sourceFile: item.sourceFile })),
      };
      charFindings.push(finding);

      if (!itemMatches.length && confidence !== 'low') {
        const missingKey = term.key;
        if (!missing.has(missingKey)) {
          missing.set(missingKey, {
            itemId: `character_merchandise_${slug(term.key)}`,
            displayName: term.labels[term.labels.length - 1].replace(/\b\w/g, (ch) => ch.toUpperCase()),
            productKey: term.key,
            category: term.category,
            neededBy: [],
            prompt: `Ultra-cartoony magical fantasy game item icon of ${term.prompts[0] || term.labels[0]}, collectible readable RPG trading item, isolated object centered with generous padding, pure green #00FF00 background, no text, no label, no border, no UI frame, not realistic, not photorealistic.`,
            negativePrompt: 'no text, no labels, no numbers, no watermark, no border, no frame, no character, no hand, no photorealism, no modern packaging, no busy background',
          });
        }
        missing.get(missingKey).neededBy.push({ characterId: character.characterId, name: character.finalDisplayName, profession: character.profession });
      }
    }

    if (charFindings.length) {
      findings.push({
        characterId: character.characterId,
        name: character.finalDisplayName,
        profession: character.profession,
        sourceFile: character.sourceFile,
        findings: charFindings,
      });
      const existing = charFindings.flatMap((finding) => finding.existingItems.map((item) => ({
        productKey: finding.productKey,
        confidence: finding.confidence,
        itemId: item.itemId,
        itemName: item.name,
      })));
      if (existing.length) {
        assignments.push({
          characterId: character.characterId,
          name: character.finalDisplayName,
          profession: character.profession,
          suggestedStockItems: existing,
          missingStockConcepts: charFindings.filter((finding) => !finding.existingItems.length && finding.confidence !== 'low').map((finding) => finding.productKey),
        });
      }
    }
  }

  return { findings, missingItems: [...missing.values()], assignments };
}

function writeReport({ characters, items, findings, missingItems, assignments }) {
  const lines = [];
  lines.push('# Character Merchandise Alignment Report');
  lines.push('');
  lines.push('Generated by `pnpm audit:character-merchandise`.');
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push(`- Character profiles scanned: ${characters.length}`);
  lines.push(`- Item catalog records detected: ${items.length}`);
  lines.push(`- Characters with merchandise-like mentions: ${findings.length}`);
  lines.push(`- Characters with existing item matches: ${assignments.length}`);
  lines.push(`- Missing merchandise item concepts: ${missingItems.length}`);
  lines.push('');
  lines.push('## Existing item matches to wire into character stock');
  lines.push('');
  if (!assignments.length) lines.push('- None detected.');
  for (const assignment of assignments) {
    lines.push(`### ${assignment.characterId} — ${assignment.name} (${assignment.profession})`);
    for (const item of assignment.suggestedStockItems) {
      lines.push(`- ${item.productKey}: ${item.itemName} \`${item.itemId}\` (${item.confidence})`);
    }
    if (assignment.missingStockConcepts.length) {
      lines.push(`- Missing concepts: ${assignment.missingStockConcepts.join(', ')}`);
    }
    lines.push('');
  }
  lines.push('## Missing item prompts generated');
  lines.push('');
  if (!missingItems.length) lines.push('- None detected.');
  for (const item of missingItems) {
    lines.push(`- ${item.displayName} \`${item.itemId}\` — needed by ${item.neededBy.map((n) => `${n.characterId} ${n.name}`).join(', ')}`);
  }
  lines.push('');
  lines.push('## Full finding list');
  lines.push('');
  for (const row of findings) {
    lines.push(`### ${row.characterId} — ${row.name}`);
    lines.push(`- Profession: ${row.profession}`);
    lines.push(`- Source: ${row.sourceFile}`);
    for (const finding of row.findings) {
      const existing = finding.existingItems.length ? finding.existingItems.map((item) => `${item.name} (${item.itemId})`).join(', ') : 'NO EXISTING ITEM MATCH';
      lines.push(`- ${finding.productKey} [${finding.confidence}] — ${finding.reasons.join('; ') || 'text mention'} — ${existing}`);
    }
    lines.push('');
  }
  ensureDir(REPORT_PATH);
  fs.writeFileSync(REPORT_PATH, `${lines.join('\n')}\n`);
}

function main() {
  const characters = loadCharacters();
  const items = loadItems();
  const { findings, missingItems, assignments } = inferMatches(characters, items);

  const assignmentDoc = {
    generatedBy: 'pnpm audit:character-merchandise',
    note: 'Review before wiring into runtime stock. Existing item matches should become character-specific stock. Missing concepts should be generated as item icons before being added to the item catalog.',
    summary: {
      characterProfilesScanned: characters.length,
      itemCatalogRecordsDetected: items.length,
      charactersWithMerchandiseMentions: findings.length,
      charactersWithExistingItemMatches: assignments.length,
      missingMerchandiseItemConcepts: missingItems.length,
    },
    assignments,
  };

  const promptDoc = {
    batchId: 'missing-character-merchandise-items',
    purpose: 'Generate item icons for character-described merchandise that is not present in the current item catalog.',
    background: '#00FF00',
    itemPromptRules: {
      layout: 'individual item icons or grid sheets as preferred by the item icon pipeline',
      background: 'pure green #00FF00',
      noText: true,
      style: 'ultra-cartoony magical fantasy game art, collectible trading item icon, readable silhouette',
    },
    items: missingItems.map((item, index) => ({ order: index + 1, ...item })),
  };

  ensureDir(ASSIGNMENTS_PATH);
  fs.writeFileSync(ASSIGNMENTS_PATH, `${JSON.stringify(assignmentDoc, null, 2)}\n`);
  ensureDir(PROMPT_PATH);
  fs.writeFileSync(PROMPT_PATH, `${JSON.stringify(promptDoc, null, 2)}\n`);
  writeReport({ characters, items, findings, missingItems, assignments });

  console.log(`Wrote ${path.relative(repoRoot, REPORT_PATH)}`);
  console.log(`Wrote ${path.relative(repoRoot, ASSIGNMENTS_PATH)}`);
  console.log(`Wrote ${path.relative(repoRoot, PROMPT_PATH)}`);
  console.log(`Characters scanned: ${characters.length}`);
  console.log(`Items detected: ${items.length}`);
  console.log(`Characters with merchandise mentions: ${findings.length}`);
  console.log(`Missing item concepts: ${missingItems.length}`);
  if (findings.length === 0) {
    console.error('No merchandise mentions were detected. Check source paths and catalog format.');
    process.exitCode = 1;
  }
}

main();
