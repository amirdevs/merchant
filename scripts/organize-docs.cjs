const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const docsDir = path.join(root, "docs");
const logsDir = path.join(docsDir, "logs");

function p(...parts) {
  return path.join(root, ...parts);
}

function rel(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function write(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content.endsWith("\n") ? content : `${content}\n`);
}

function archiveIfExists(fromRel, toRel) {
  const from = p(fromRel);
  const to = p(toRel);
  if (!fs.existsSync(from)) return false;
  ensureDir(path.dirname(to));
  if (fs.existsSync(to)) fs.rmSync(to, { recursive: true, force: true });
  fs.renameSync(from, to);
  return true;
}

function patchFile(fileRel, patcher) {
  const file = p(fileRel);
  const original = read(file);
  if (!original) return false;
  const next = patcher(original);
  if (next !== original) write(file, next);
  return next !== original;
}

function replaceAll(text, search, replacement) {
  return text.split(search).join(replacement);
}

function cleanupEmptyDirs() {
  const candidates = [p("docs", "game"), p("docs", "systems"), p("docs", "development")];
  for (const dir of candidates) {
    if (!fs.existsSync(dir)) continue;
    const entries = fs.readdirSync(dir);
    if (!entries.length) fs.rmSync(dir, { recursive: true, force: true });
  }
}

ensureDir(docsDir);
ensureDir(logsDir);

const canonicalDocs = new Map([
  ["docs/00_READ_ME_FIRST.md", `# 00 - Read Me First

This is the ordered documentation index for the project.

Read the current source-of-truth docs in this order:

1. [01 - Project Overview](01_PROJECT_OVERVIEW.md)
2. [02 - Development Setup](02_DEVELOPMENT_SETUP.md)
3. [03 - Game Logic And Roadmap](03_GAME_LOGIC_AND_ROADMAP.md)
4. [04 - Trading And Stock](04_TRADING_AND_STOCK.md)
5. [05 - Items And Icons](05_ITEMS_AND_ICONS.md)
6. [06 - Economy And Travel](06_ECONOMY_AND_TRAVEL.md)
7. [07 - Quests, Company, And UI Integration](07_QUESTS_COMPANY_AND_UI.md)
8. [08 - UI/UX Direction](08_UI_UX_DIRECTION.md)

Generated reports, old phase notes, temporary audits, and historical one-off docs belong under [logs/](logs/). They are useful evidence, but they are not the primary docs to read before working.

## Documentation rules

- Current docs must live directly under \`docs/\` and use a two-digit order prefix, for example \`04_TRADING_AND_STOCK.md\`.
- Log-only or generated docs must live under \`docs/logs/\` and also use a number/date prefix where practical.
- Avoid adding new unnumbered \`.md\` files under \`docs/\`.
- Keep large generated asset configs in their existing folders, such as \`docs/assets/icon-prompts/\`, but do not treat those as prose docs.
`],
  ["docs/01_PROJECT_OVERVIEW.md", `# 01 - Project Overview

This project is an offline React/Vite remake prototype inspired by Merchant of the Six Kingdoms.

The current direction is a local-only merchant RPG/trading game with:

- extracted original data as gameplay reference;
- regenerated/reworked item catalog and item icons;
- profession-aware NPC stock;
- barter valuation with old-game biases;
- save/load, travel, market, quest, company, and UI-integration foundations;
- reports and audits for stock, item icons, and playtest balance.

## Active branch

Use \`main\` for current work. The GitHub repository may still report \`master\` as the default branch until the repo setting is changed manually.

## Important source folders

- \`src/lib/\`: gameplay helpers and pure system foundations.
- \`src/data/generated/\`: extracted/generated item, character, market, kingdom, and profession data.
- \`src/data/stock/\`: stock tiers, archetypes, and profile configuration.
- \`public/game-assets/items/\`: final runtime item icons.
- \`docs/\`: numbered current docs.
- \`docs/logs/\`: generated reports and historical/phase logs.
`],
  ["docs/02_DEVELOPMENT_SETUP.md", `# 02 - Development Setup

## Stack

- Package manager: \`pnpm\`
- App: React 18, TypeScript, Vite
- Styling: Tailwind CSS v4
- Icons: \`lucide-react\`

Do not use npm for installs or scripts unless explicitly requested.

## Main commands

\`\`\`powershell
pnpm install
pnpm dev
pnpm build
\`\`\`

## Validation commands

\`\`\`powershell
pnpm audit:data
pnpm audit:assets
pnpm audit:item-icons
pnpm audit:stock
pnpm review:stock
pnpm test:barter
pnpm test:economy
pnpm test:travel
pnpm test:quests
pnpm test:company
pnpm test:ui-integration
pnpm test:playtest
pnpm playtest:balance
pnpm verify:current-state
\`\`\`

\`pnpm verify:current-state\` is the broad checkpoint before pushing meaningful gameplay/system changes.

## Save policy

The item overhaul intentionally uses a clean break for older saves. Old pre-overhaul saves should not silently load into incorrect item indexes. New saves should use the current save schema and current item data.

## Generated reports

Generated reports now belong under \`docs/logs/\`, especially:

- \`docs/logs/profession-stock-review.md\`
- \`docs/logs/item-icon-lock-report.md\`
- \`docs/logs/item-icon-lock-report.json\`
- \`docs/logs/item-icon-manual-review.csv\`
- \`docs/logs/playtest-balance-report.md\`
`],
  ["docs/03_GAME_LOGIC_AND_ROADMAP.md", `# 03 - Game Logic And Roadmap

## Foundation status

The foundation roadmap has been implemented and validated locally by the user through commands/tests:

1. Branch/docs/validation setup.
2. Save schema clean break.
3. Profession stock system, generated-data bias, and balance reporting.
4. Barter correctness/regression tests.
5. Item/icon lock audit.
6. Economy helpers.
7. Travel/risk/market helpers.
8. Quest/contract/dialogue runtime helpers.
9. Company, warehouse, shipment, and stock-ownership helpers.
10. UI-integration view model helpers.
11. Playtest/balance report foundation.

## Current product state

Most new systems are pure helpers/tests/foundations. The next major product direction should be chosen deliberately:

- wire foundations into visible gameplay screens;
- polish the trading/inventory UI;
- build playable quest/contract flows;
- build company/warehouse UI;
- continue original-game parity;
- continue item icon visual review/corrections.

## Rule of thumb

Do not start a new large system until reports and tests are clean. Prefer small vertical integrations that make an existing foundation visible and playable.
`],
  ["docs/04_TRADING_AND_STOCK.md", `# 04 - Trading And Stock

## Trading

The barter system values offers using:

- base item value;
- character, profession, market, and kingdom bias;
- exotic/import bonuses;
- bulk discounts;
- frugality and haggling pressure;
- illegal-good risk, black-market behavior, and heat.

Regression tests cover important acceptance/refusal behavior, protected/concealed offerability, failed-offer pressure, and failure explanations.

## Stock

NPC stock is driven by the new stock system first:

- stock tier controls stack count, quantity, coins, restocking, and progression;
- profession profiles decide the core NPC identity;
- archetypes choose item families/tags;
- lifestyle baselines add small realistic support stock;
- named overrides handle special characters.

Generated old-game data then acts as a mild flavor layer through local \`stockBiasWeights\` on each resolved profile. Character/profession biases are strongest; market/kingdom biases are lighter; illegal kingdom tags discourage legal merchants while helping criminal/contraband stock.

## Reports

Run:

\`\`\`powershell
pnpm review:stock
\`\`\`

Read:

\`\`\`text
docs/logs/profession-stock-review.md
\`\`\`

The report is diagnostic output, not source-of-truth prose.
`],
  ["docs/05_ITEMS_AND_ICONS.md", `# 05 - Items And Icons

## Item data

The item catalog has been rewritten to use cleaner names, richer tags/families/forms, and runtime icon references.

## Icon lock audit

Run:

\`\`\`powershell
pnpm audit:item-icons
\`\`\`

Generated reports:

\`\`\`text
docs/logs/item-icon-lock-report.md
docs/logs/item-icon-lock-report.json
docs/logs/item-icon-manual-review.csv
\`\`\`

The audit checks structural correctness:

- missing \`iconFile\`;
- missing runtime icon files;
- missing one/few/many quantity variants;
- duplicate prompt output targets;
- duplicate runtime icon references;
- orphan icon files;
- invalid/non-normalized paths;
- manifest/config count mismatch.

Visual correctness still requires manual review through the CSV.

## Asset folders

- \`docs/assets/icon-prompts/\`: generated image prompt configs.
- \`docs/assets/icon-sheets/\`: generated sheets for review/cropping.
- \`public/game-assets/items/\`: final cropped runtime icons.
`],
  ["docs/06_ECONOMY_AND_TRAVEL.md", `# 06 - Economy And Travel

## Economy foundation

Shared economy helpers cover:

- coin denomination discovery;
- wallet value;
- gold/silver/copper breakdown;
- readable money labels;
- inventory value;
- coin versus non-coin value;
- weight/size/carry/pull totals;
- overload/capacity status;
- affordability checks;
- payment with change normalization.

Run:

\`\`\`powershell
pnpm test:economy
\`\`\`

## Travel/risk foundation

Travel helpers cover:

- route connection lookup;
- market open/closing/closed state;
- route days;
- tolls and destination stallage;
- total copper due;
- affordability;
- capacity blockers;
- illegal cargo warnings;
- theft/inspection preview;
- route danger labels;
- arrival summary text.

Run:

\`\`\`powershell
pnpm test:travel
\`\`\`
`],
  ["docs/07_QUESTS_COMPANY_AND_UI.md", `# 07 - Quests, Company, And UI Integration

## Quest/contract/dialogue runtime

Typed runtime helpers cover:

- accepting local quests from dialogue effects;
- completing local quests;
- consuming required quest items without touching quantities already in offer panels;
- paying quest rewards;
- accepting contracts;
- unlocking markets;
- appending dialogue log entries;
- summarizing notice-board quest work.

Run:

\`\`\`powershell
pnpm test:quests
\`\`\`

## Company/warehouse/shipment foundation

Company helpers cover:

- warehouses by market;
- warehouse capacity by weight/size;
- storage/retrieval of visible goods;
- shipment planning and resolution;
- tolls, risk, insurance, and cargo value;
- company cash, valuation, share price, dividends;
- hired agents and risk reduction;
- player investment.

Run:

\`\`\`powershell
pnpm test:company
\`\`\`

## UI integration foundation

UI-facing helpers build view models for inventory value/capacity, travel cards, quest cards, company summaries, and action checklists.

Run:

\`\`\`powershell
pnpm test:ui-integration
pnpm test:playtest
pnpm playtest:balance
\`\`\`
`],
  ["docs/08_UI_UX_DIRECTION.md", `# 08 - UI/UX Direction

The target visual direction is a premium fantasy merchant RPG interface:

- sunlit coastal town scenes;
- parchment ledgers;
- carved dark wood shells;
- blue enamel title plates;
- brass trim;
- heraldic seals;
- gold status chips;
- polished NPC portraits;
- collectible item art;
- beveled green/blue/red command buttons.

Keep screens compact and practical for repeated trading. Avoid generic SaaS layouts and avoid dense plain medieval tables unless they are framed as readable merchant ledgers.

Use \`docs/ui_parts/\` as the current visual reference folder.
`],
]);

for (const [fileRel, content] of canonicalDocs) write(p(fileRel), content);

const archives = [
  ["docs/README.md", "docs/logs/00_previous-docs-readme.md"],
  ["docs/game/roadmap.md", "docs/logs/20_legacy-game-roadmap.md"],
  ["docs/game/game-logic-parity.md", "docs/logs/21_legacy-game-logic-parity.md"],
  ["docs/game/ui-ux-brief.md", "docs/logs/22_legacy-ui-ux-brief.md"],
  ["docs/systems/trading-and-stock.md", "docs/logs/30_legacy-trading-and-stock.md"],
  ["docs/systems/profession-stock-audit.md", "docs/logs/31_legacy-profession-stock-audit.md"],
  ["docs/systems/profession-stock-review.md", "docs/logs/profession-stock-review.md"],
  ["docs/development/technical-notes.md", "docs/logs/40_legacy-technical-notes.md"],
  ["docs/development/main-branch-validation.md", "docs/logs/41_legacy-main-branch-validation.md"],
  ["docs/development/phase-0-to-3-changes.md", "docs/logs/42_legacy-phase-0-to-3-changes.md"],
  ["docs/development/save-schema.md", "docs/logs/43_legacy-save-schema.md"],
  ["docs/development/stock-balance-tuning.md", "docs/logs/44_legacy-stock-balance-tuning.md"],
  ["docs/development/barter-regression-tests.md", "docs/logs/45_legacy-barter-regression-tests.md"],
  ["docs/development/item-icon-lock.md", "docs/logs/46_legacy-item-icon-lock.md"],
  ["docs/development/economy-foundation.md", "docs/logs/47_legacy-economy-foundation.md"],
  ["docs/development/travel-risk-market-loop.md", "docs/logs/48_legacy-travel-risk-market-loop.md"],
  ["docs/development/quest-contract-dialogue-runtime.md", "docs/logs/49_legacy-quest-contract-dialogue-runtime.md"],
  ["docs/development/company-warehouses-shipments.md", "docs/logs/50_legacy-company-warehouses-shipments.md"],
  ["docs/development/ui-integration-pass.md", "docs/logs/51_legacy-ui-integration-pass.md"],
  ["docs/development/playtest-balance-pass.md", "docs/logs/52_legacy-playtest-balance-pass.md"],
  ["docs/development/playtest-balance-report.md", "docs/logs/playtest-balance-report.md"],
  ["docs/assets/item-icon-pipeline.md", "docs/logs/60_legacy-item-icon-pipeline.md"],
  ["docs/assets/item-icon-lock-report.md", "docs/logs/item-icon-lock-report.md"],
  ["docs/assets/item-icon-lock-report.json", "docs/logs/item-icon-lock-report.json"],
  ["docs/assets/item-icon-manual-review.csv", "docs/logs/item-icon-manual-review.csv"],
];

let archivedCount = 0;
for (const [from, to] of archives) if (archiveIfExists(from, to)) archivedCount += 1;

patchFile("README.md", (source) => {
  const replacement = `## Docs

Read current documentation in order under \`docs/\`:

- \`docs/00_READ_ME_FIRST.md\` - ordered documentation index
- \`docs/01_PROJECT_OVERVIEW.md\`
- \`docs/02_DEVELOPMENT_SETUP.md\`
- \`docs/03_GAME_LOGIC_AND_ROADMAP.md\`
- \`docs/04_TRADING_AND_STOCK.md\`
- \`docs/05_ITEMS_AND_ICONS.md\`
- \`docs/06_ECONOMY_AND_TRAVEL.md\`
- \`docs/07_QUESTS_COMPANY_AND_UI.md\`
- \`docs/08_UI_UX_DIRECTION.md\`

Generated reports and historical one-off docs live under \`docs/logs/\`.`;

  if (/## Docs[\s\S]*$/m.test(source)) return source.replace(/## Docs[\s\S]*$/m, replacement);
  return `${source.trim()}\n\n${replacement}\n`;
});

patchFile("AGENTS.md", (source) => {
  const section = `## Documentation Rules

- Current prose docs must live under \`docs/\` and use a two-digit order prefix, for example \`04_TRADING_AND_STOCK.md\`.
- Log-only docs, generated reports, temporary phase notes, old audits, and one-off implementation summaries must live under \`docs/logs/\`.
- Do not add new unnumbered Markdown files under \`docs/\`. The only acceptable prose-doc pattern is numbered current docs or numbered/log docs.
- Keep generated asset config folders such as \`docs/assets/icon-prompts/\` and image reference folders such as \`docs/ui_parts/\`, but do not place prose planning docs there.
- When creating a new doc, first decide whether it is current source-of-truth documentation or a log. Source-of-truth goes in the numbered root docs; logs go in \`docs/logs/\`.
`;

  if (/## Documentation Rules[\s\S]*?(?=\n## |$)/m.test(source)) {
    return source.replace(/## Documentation Rules[\s\S]*?(?=\n## |$)/m, section.trimEnd() + "\n");
  }
  return source.replace(/\n## Git Notes\n/, `\n${section}\n## Git Notes\n`);
});

patchFile("scripts/review-stock.cjs", (source) => {
  let next = source;
  next = next.replace(
    'const outFile = path.join(root, "docs", "systems", "profession-stock-review.md");',
    'const outFile = path.join(root, "docs", "logs", "profession-stock-review.md");'
  );
  if (!next.includes("fs.mkdirSync(path.dirname(outFile), { recursive: true });")) {
    next = next.replace(
      "fs.writeFileSync(outFile, `${lines.join(\"\\n\")}\\n`);",
      "fs.mkdirSync(path.dirname(outFile), { recursive: true });\nfs.writeFileSync(outFile, `${lines.join(\"\\n\")}\\n`);"
    );
  }
  return next;
});

patchFile("scripts/audit-item-icons.cjs", (source) => {
  let next = source;
  next = next.replace('const outDir = path.join(root, "docs", "assets");', 'const outDir = path.join(root, "docs", "logs");');
  next = replaceAll(next, "docs/assets/item-icon-manual-review.csv", "docs/logs/item-icon-manual-review.csv");
  next = replaceAll(next, "docs/assets/item-icon-lock-report.json", "docs/logs/item-icon-lock-report.json");
  next = replaceAll(next, "docs/assets/item-icon-lock-report.md", "docs/logs/item-icon-lock-report.md");
  if (!next.includes("fs.mkdirSync(outDir, { recursive: true });")) {
    next = next.replace(
      "fs.writeFileSync(path.join(outDir, \"item-icon-lock-report.md\"), `${report}\\n`);",
      "fs.mkdirSync(outDir, { recursive: true });\nfs.writeFileSync(path.join(outDir, \"item-icon-lock-report.md\"), `${report}\\n`);"
    );
  }
  return next;
});

const playtestScript = String.raw`const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const outFile = path.join(root, "docs", "logs", "playtest-balance-report.md");

function readIfExists(relativePath) {
  const file = path.join(root, relativePath);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function readFirst(relativePaths) {
  for (const relativePath of relativePaths) {
    const text = readIfExists(relativePath);
    if (text) return text;
  }
  return "";
}

function countMatches(text, pattern) {
  return (text.match(pattern) || []).length;
}

function parseMarkdownMetric(text, label) {
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = text.match(new RegExp(`^- ${escapedLabel}:\\s*(\\d+)\\s*$`, "mi"));
  return match ? Number(match[1]) : null;
}

function readIconMetrics() {
  const jsonText = readFirst([
    "docs/logs/item-icon-lock-report.json",
    "docs/assets/item-icon-lock-report.json",
  ]);
  if (jsonText) {
    try {
      const report = JSON.parse(jsonText);
      const issues = Array.isArray(report.issues) ? report.issues : [];
      const warnings = Array.isArray(report.warnings) ? report.warnings : [];
      const orphanFiles = Array.isArray(report.orphanFiles) ? report.orphanFiles : [];
      return {
        source: "JSON",
        missingRuntimeIcons: issues.filter((issue) => issue?.code === "missing-runtime-icon-file").length,
        orphanIcons: Number(report.summary?.orphanItemIconFileCount ?? orphanFiles.length),
        errors: Number(report.summary?.issueCount ?? issues.length),
        warnings: Number(report.summary?.warningCount ?? warnings.length),
      };
    } catch {
      // Fall back to the generated markdown summary below.
    }
  }

  const markdown = readFirst([
    "docs/logs/item-icon-lock-report.md",
    "docs/assets/item-icon-lock-report.md",
  ]);
  return {
    source: markdown ? "markdown" : "unavailable",
    missingRuntimeIcons: parseMarkdownMetric(markdown, "Missing runtime icon files") ?? 0,
    orphanIcons: parseMarkdownMetric(markdown, "Orphan item icon files") ?? 0,
    errors: parseMarkdownMetric(markdown, "Errors") ?? 0,
    warnings: parseMarkdownMetric(markdown, "Warnings") ?? 0,
  };
}

const stockReport = readFirst([
  "docs/logs/profession-stock-review.md",
  "docs/systems/profession-stock-review.md",
]);
const iconReport = readFirst([
  "docs/logs/item-icon-lock-report.md",
  "docs/assets/item-icon-lock-report.md",
]);

const stockPasses = countMatches(stockReport, /Balance status: PASS/g);
const stockReviews = countMatches(stockReport, /Balance status: REVIEW/g);
const iconMetrics = readIconMetrics();
const iconIssues = iconMetrics.missingRuntimeIcons + iconMetrics.orphanIcons + iconMetrics.errors + iconMetrics.warnings;

const generatedAt = new Date().toISOString();
const lines = [
  "# Playtest And Balance Report",
  "",
  `Generated: ${generatedAt}`,
  "",
  "This report is a lightweight checkpoint after the item, stock, barter, economy, travel, quest, company, and UI-integration foundation work.",
  "",
  "## Automated Inputs",
  "",
  `- Stock report present: ${stockReport ? "yes" : "no"}`,
  `- Stock PASS sections: ${stockPasses}`,
  `- Stock REVIEW sections: ${stockReviews}`,
  `- Item icon report present: ${iconReport ? "yes" : "no"}`,
  `- Item icon metrics source: ${iconMetrics.source}`,
  `- Missing runtime icon files: ${iconMetrics.missingRuntimeIcons}`,
  `- Orphan item icon files: ${iconMetrics.orphanIcons}`,
  `- Icon errors: ${iconMetrics.errors}`,
  `- Icon warnings: ${iconMetrics.warnings}`,
  `- Icon issues total: ${iconIssues}`,
  "",
  "## Interpretation",
  "",
  stockReviews ? `- Stock review still has ${stockReviews} section(s) marked REVIEW. Inspect docs/logs/profession-stock-review.md.` : "- Stock review has no REVIEW sections.",
  iconIssues ? `- Item icon audit has ${iconIssues} structural issue(s). Inspect docs/logs/item-icon-lock-report.md.` : "- Item icon audit has no structural issues.",
  "- This report does not replace a manual playtest. It is a checkpoint for deciding whether to move into visible UI/product work.",
  "",
  "## Manual Playtest Checklist",
  "",
  "- Start a new save after the item/save-schema overhaul.",
  "- Trade with blacksmith, fisher, barkeep, farmer, fletcher, miner, and merchant NPCs.",
  "- Use Ask Price and Ask Offer with protected/concealed goods present.",
  "- Travel between markets and check toll/risk/capacity messaging.",
  "- Accept or simulate a local quest/contract path.",
  "- Check company/warehouse helper outputs before building visible company UI.",
  "- Save, reload, and repeat a small trade/travel loop.",
  "",
];

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, `${lines.join("\n")}\n`);
console.log(`Wrote ${path.relative(root, outFile)}`);
`;
write(p("scripts/playtest-balance.cjs"), playtestScript);

cleanupEmptyDirs();

console.log(`Organized docs. Archived/moved ${archivedCount} old/generated doc file(s) into ${rel(logsDir)}.`);
console.log("Current docs now use numbered root files under docs/.");
console.log("Generated reports now write to docs/logs/.");
