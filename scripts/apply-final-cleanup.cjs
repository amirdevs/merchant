const fs = require("fs");
const path = require("path");

const root = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function write(relativePath, content) {
  fs.writeFileSync(path.join(root, relativePath), content);
  console.log(`updated ${relativePath}`);
}

function replaceRequired(relativePath, pattern, replacement, label) {
  const file = path.join(root, relativePath);
  let content = fs.readFileSync(file, "utf8");
  const next = content.replace(pattern, replacement);
  if (next === content) {
    throw new Error(`Could not apply ${label} in ${relativePath}`);
  }
  fs.writeFileSync(file, next);
  console.log(`patched ${relativePath}: ${label}`);
}

// 1) Tune fisher profile harder toward fish/seafood identity and away from unrelated book/spice/luxury noise.
replaceRequired(
  "src/data/stock/profiles.ts",
  /  fisher: \{[\s\S]*?\n  \},\n  fletcher:/,
  `  fisher: {\n    tier: "modest",\n    archetypes: [{ id: "fisher", weight: 0.94 }, { id: "maritime", weight: 0.06 }],\n    lifestyleBaseline: "worker",\n    quantityMultiplier: 1.32,\n    coinMultiplier: 1.05,\n    guaranteedTags: ["seafood", "fish", "barrels", "tool"],\n    forbiddenTags: ["weapon", "armor", "luxury", "book", "books", "magic", "jewelry", "spice"],\n  },\n  fletcher:`,
  "stronger fisher profession profile"
);

// 2) Tune the reusable fisher archetype itself so fish/seafood/preserved catch dominates.
replaceRequired(
  "src/data/stock/archetypes.ts",
  /  fisher: \{[\s\S]*?\n  \},\n  fletcher:/,
  `  fisher: {\n    weightedTags: { seafood: 22, fish: 18, shellfish: 10, preserved: 7, barrels: 7, maritime: 4, container: 3, tool: 2 },\n    forbiddenTags: ["weapon", "armor", "luxury", "book", "books", "magic", "jewelry", "spice"],\n    quantityMultipliers: { seafood: 3.5, fish: 3.1, shellfish: 2.4, preserved: 2.2, barrels: 1.4 },\n    minimumQuantities: { seafood: 18, fish: 14, barrels: 3 },\n    guaranteedTags: ["seafood", "fish", "barrels"],\n  },\n  fletcher:`,
  "stronger fisher archetype"
);

// 3) Update fisher target to count preserved fish/container/barrel support as identity stock.
replaceRequired(
  "scripts/review-stock.cjs",
  /  fisher: \{ identity: \[[^\n]+\], minIdentityShare: [^\n]+ \},/,
  `  fisher: { identity: ["seafood", "fish", "shellfish", "maritime", "preserved", "barrels", "container", "tool"], minIdentityShare: 0.55, maxFinishedShare: 0.22, maxLuxuryShare: 0.08 },`,
  "fisher balance target"
);

// 4) Update stale review wording from the removed dynamic archetype to local stockBiasWeights.
replaceRequired(
  "scripts/review-stock.cjs",
  /- Original generated biases now softly affect stock selection through the dynamic `bias` archetype: character and profession biases are strongest, market and kingdom biases are lighter, and illegal kingdom tags discourage legal merchants while helping criminal stock\./,
  `- Original generated biases now softly affect stock selection through local \`stockBiasWeights\` on the resolved stock profile: character and profession biases are strongest, market and kingdom biases are lighter, and illegal kingdom tags discourage legal merchants while helping criminal stock.`,
  "stock bias wording"
);

// 5) Replace word-count playtest parsing with summary-value parsing.
const playtestPath = "scripts/playtest-balance.cjs";
let playtest = read(playtestPath);
playtest = playtest.replace(
  /function countMatches\(text, pattern\) \{\n  return \(text\.match\(pattern\) \|\| \[\]\)\.length;\n\}\n/,
  `function countMatches(text, pattern) {\n  return (text.match(pattern) || []).length;\n}\n\nfunction escapeRegExp(value) {\n  return String(value).replace(/[.*+?^\${}()|[\\]\\\\]/g, "\\\\$&");\n}\n\nfunction summaryNumber(text, label) {\n  const pattern = new RegExp(\`^- \\${escapeRegExp(label)}:\\\\s*(\\\\d+)\\\\s*$\`, "mi");\n  const match = text.match(pattern);\n  return match ? Number(match[1]) : 0;\n}\n\nfunction summaryStatus(text) {\n  const match = text.match(/^- Status:\\s*\\*\\*([^*]+)\\*\\*/mi);\n  return match ? match[1].trim() : "unknown";\n}\n`
);
playtest = playtest.replace(
  /const iconMissing = countMatches\(iconReport, \/missing\/gi\);\nconst iconOrphans = countMatches\(iconReport, \/orphan\/gi\);/,
  `const iconStatus = summaryStatus(iconReport);\nconst iconErrors = summaryNumber(iconReport, "Errors");\nconst iconWarnings = summaryNumber(iconReport, "Warnings");\nconst iconOrphans = summaryNumber(iconReport, "Orphan item icon files");\nconst iconFiles = summaryNumber(iconReport, "Actual item icon files");`
);
playtest = playtest.replace(
  /  `- Icon report missing-word hits: \$\{iconMissing\}`,\n  `- Icon report orphan-word hits: \$\{iconOrphans\}`,/,
  `  \`- Icon report status: \${iconStatus}\`,\n  \`- Icon report actual item icon files: \${iconFiles}\`,\n  \`- Icon report errors: \${iconErrors}\`,\n  \`- Icon report warnings: \${iconWarnings}\`,\n  \`- Icon report orphan item icon files: \${iconOrphans}\`,`
);
write(playtestPath, playtest);

console.log("Final cleanup patch applied. Regenerate reports with pnpm review:stock and pnpm playtest:balance.");
