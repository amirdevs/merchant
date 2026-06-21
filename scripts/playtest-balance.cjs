const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const outFile = path.join(root, "docs", "development", "playtest-balance-report.md");

function readIfExists(relativePath) {
  const file = path.join(root, relativePath);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function countMatches(text, pattern) {
  return (text.match(pattern) || []).length;
}

const stockReport = readIfExists("docs/systems/profession-stock-review.md");
const iconReport = readIfExists("docs/assets/item-icon-lock-report.md");

const stockPasses = countMatches(stockReport, /Balance status: PASS/g);
const stockReviews = countMatches(stockReport, /Balance status: REVIEW/g);
const iconMissing = countMatches(iconReport, /missing/gi);
const iconOrphans = countMatches(iconReport, /orphan/gi);

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
  `- Icon report missing-word hits: ${iconMissing}`,
  `- Icon report orphan-word hits: ${iconOrphans}`,
  "",
  "## Manual Smoke Checklist",
  "",
  "| Area | Check | Result | Notes |",
  "|---|---|---|---|",
  "| Startup | Start a new game and check for console errors | manual | |",
  "| Save/Load | Save v2, reload v2, confirm old saves stay blocked | manual | |",
  "| Items | Inspect common item icons and quantity variants | manual | |",
  "| Stock | Inspect blacksmith, miner, fletcher, barkeep, butcher, farmer, bard, toolmaker | manual | |",
  "| Barter | Ask Price/Ask Offer with protected and concealed goods | manual | |",
  "| Economy | Compare money/capacity panel numbers against inventory | manual | |",
  "| Travel | Preview travel, pay toll/stallage, inspect arrival summary | manual | |",
  "| Quests | Accept/complete one sample quest or contract state | manual | |",
  "| Company | Plan warehouse/shipment helper state from tests or dev UI | manual | |",
  "",
  "## Go / No-Go Rule",
  "",
  "- Any startup, save/load, stock-identity, or barter-transfer failure is a blocker.",
  "- More than two REVIEW profession-stock sections should be tuned before UI polish.",
  "- Missing runtime item icons should be fixed before quest/company content depends on those goods.",
  "",
];

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, `${lines.join("\n")}\n`);
console.log(`Wrote ${path.relative(root, outFile)}`);
