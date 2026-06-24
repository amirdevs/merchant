const { execFileSync } = require('node:child_process');

console.log('Character merchandise assignments are curated in source files.');
console.log('No broad automatic text extraction is performed by this command.');
console.log('Running the merchandise audit instead.');
execFileSync('node', ['scripts/audits/audit-character-merchandise-alignment.cjs'], { stdio: 'inherit' });
