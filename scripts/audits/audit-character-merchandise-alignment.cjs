const fs = require('node:fs');
const path = require('node:path');

const repoRoot = process.cwd();
const assignmentsPath = path.join(repoRoot, 'src/content/characters/merchandise/assignments.json');
const itemsPath = path.join(repoRoot, 'src/content/items/catalog/character-merchandise-items.json');
const promptPath = path.join(repoRoot, 'docs/assets/item-prompts/missing-character-merchandise-items.json');
const reportPath = path.join(repoRoot, 'docs/logs/character-merchandise-alignment-report.md');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const assignments = readJson(assignmentsPath);
const itemRecords = readJson(itemsPath);
const promptBatch = readJson(promptPath);
const issues = [];

const assignmentById = new Map(assignments.map((assignment) => [assignment.characterId, assignment]));
const itemIds = new Set(itemRecords.map((item) => item.id));
const promptItemIds = new Set((promptBatch.items || []).map((item) => item.itemId));

const forbiddenNoise = [
  'company_stake',
  'Sunwake Harbor Company Share',
  'Ponderings of the Infinite Ledger',
  'blueglass ore sample',
  'cauldron',
  'hints',
  'patience',
  'bulk delivery job',
  'paperwork clarity',
  'warnings before comfort',
];

for (const assignment of assignments) {
  for (const pool of assignment.stockPools || []) {
    if (forbiddenNoise.some((noise) => pool.tag.toLowerCase().includes(noise.toLowerCase()))) {
      issues.push(`${assignment.characterId} has noisy stock pool tag ${pool.tag}`);
    }
  }
  for (const matched of assignment.matchedItems || []) {
    if (forbiddenNoise.some((noise) => (matched.itemName || matched.itemId || '').toLowerCase().includes(noise.toLowerCase()))) {
      issues.push(`${assignment.characterId} has noisy matched item ${matched.itemName || matched.itemId}`);
    }
  }
  for (const missingId of assignment.missingItemIds || []) {
    if (!itemIds.has(missingId)) issues.push(`${assignment.characterId} references missing item record ${missingId}`);
    if (!promptItemIds.has(missingId)) issues.push(`${assignment.characterId} missing prompt for ${missingId}`);
  }
}

const buttonSeller = assignmentById.get('character-167');
if (!buttonSeller) issues.push('Missing merchandise assignment for character-167 Button Seller.');
else {
  const tags = new Set((buttonSeller.stockPools || []).map((pool) => pool.tag));
  if (!tags.has('tailoring_buttons') || !tags.has('buttons')) {
    issues.push('Button Seller must include tailoring_buttons and buttons stock pools.');
  }
  if (!(buttonSeller.missingItemIds || []).includes('character_merchandise_tailoring_buttons')) {
    issues.push('Button Seller must reference the tailoring buttons item record.');
  }
}

if (!itemIds.has('character_merchandise_tailoring_buttons')) {
  issues.push('Missing item record for Assorted Tailoring Buttons.');
}
if (!promptItemIds.has('character_merchandise_tailoring_buttons')) {
  issues.push('Missing icon prompt for Assorted Tailoring Buttons.');
}
if (!fs.existsSync(reportPath)) issues.push('Missing merchandise alignment report.');

if (issues.length) {
  console.error(`Character merchandise audit failed with ${issues.length} issue(s):`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`Character merchandise audit passed: ${assignments.length} curated assignments, ${itemRecords.length} item records, ${promptBatch.items.length} icon prompts.`);
