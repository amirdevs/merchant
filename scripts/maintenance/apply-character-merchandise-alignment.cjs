const fs = require('fs');
const {
  ASSIGNMENTS_FILE,
  REVIEW_FILE,
  PROMPT_FILE,
  REPORT_FILE,
  ITEM_EXTENSION_FILE,
  analyzeProfiles,
  writeJson,
  renderReport,
} = require('./character-merchandise-core.cjs');

const result = analyzeProfiles();
writeJson(ASSIGNMENTS_FILE, result.assignments);
writeJson(REVIEW_FILE, result.review);
writeJson(PROMPT_FILE, result.missingPrompts);
writeJson(ITEM_EXTENSION_FILE, result.missingItems);
fs.mkdirSync(require('path').dirname(REPORT_FILE), { recursive: true });
fs.writeFileSync(REPORT_FILE, renderReport(result), 'utf8');

console.log(`Character merchandise alignment applied.`);
console.log(`Assignments: ${result.assignments.length}`);
console.log(`New item records: ${result.missingItems.length}`);
console.log(`Review-needed characters: ${result.review.length}`);
console.log(`Wrote ${ASSIGNMENTS_FILE}`);
console.log(`Wrote ${ITEM_EXTENSION_FILE}`);
console.log(`Wrote ${PROMPT_FILE}`);
console.log(`Wrote ${REPORT_FILE}`);
