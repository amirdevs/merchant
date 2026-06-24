const fs = require('fs');
const {
  ASSIGNMENTS_FILE,
  REVIEW_FILE,
  PROMPT_FILE,
  REPORT_FILE,
  ITEM_EXTENSION_FILE,
  analyzeProfiles,
  readJson,
  renderReport,
  stableStringify,
} = require('../maintenance/character-merchandise-core.cjs');

const result = analyzeProfiles();
const expected = {
  [ASSIGNMENTS_FILE]: result.assignments,
  [REVIEW_FILE]: result.review,
  [PROMPT_FILE]: result.missingPrompts,
  [ITEM_EXTENSION_FILE]: result.missingItems,
};
const issues = [];
for (const [file, value] of Object.entries(expected)) {
  const current = readJson(file, null);
  if (stableStringify(current) !== stableStringify(value)) {
    issues.push(`${file} is out of date. Run pnpm apply:character-merchandise.`);
  }
}
const report = fs.existsSync(REPORT_FILE) ? fs.readFileSync(REPORT_FILE, 'utf8') : '';
const expectedReport = renderReport(result);
if (report !== expectedReport) issues.push(`${REPORT_FILE} is out of date. Run pnpm apply:character-merchandise.`);

const duplicateAssignedTags = [];
for (const assignment of result.assignments) {
  const tags = new Set();
  for (const pool of assignment.stockPools) {
    if (tags.has(pool.tag)) duplicateAssignedTags.push(`${assignment.characterId}:${pool.tag}`);
    tags.add(pool.tag);
  }
}
if (duplicateAssignedTags.length) issues.push(`Duplicate merchandise stock tags: ${duplicateAssignedTags.slice(0, 20).join(', ')}`);

if (issues.length) {
  console.error(`Character merchandise audit failed with ${issues.length} issue(s):`);
  for (const issue of issues.slice(0, 40)) console.error(`- ${issue}`);
  if (issues.length > 40) console.error(`- ...and ${issues.length - 40} more`);
  process.exit(1);
}

console.log('Character merchandise audit passed.');
console.log(`Characters scanned: ${result.profiles.length}`);
console.log(`Assignments: ${result.assignments.length}`);
console.log(`New item records: ${result.missingItems.length}`);
console.log(`Review-needed characters: ${result.review.length}`);
