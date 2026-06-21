const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function write(relativePath, content) {
  fs.writeFileSync(path.join(root, relativePath), content);
}

function replaceOnce(relativePath, search, replacement, label) {
  const file = path.join(root, relativePath);
  const source = fs.readFileSync(file, "utf8");
  if (!source.includes(search)) {
    if (source.includes(replacement)) {
      console.log(`Already applied: ${label}`);
      return;
    }
    throw new Error(`Could not find patch target for ${label} in ${relativePath}`);
  }
  fs.writeFileSync(file, source.replace(search, replacement));
  console.log(`Patched: ${label}`);
}

function replaceRegex(relativePath, regex, replacement, label) {
  const file = path.join(root, relativePath);
  const source = fs.readFileSync(file, "utf8");
  if (!regex.test(source)) throw new Error(`Could not find patch target for ${label} in ${relativePath}`);
  fs.writeFileSync(file, source.replace(regex, replacement));
  console.log(`Patched: ${label}`);
}

function patchCompany() {
  const relativePath = "src/lib/company.ts";

  replaceOnce(relativePath,
`function syncLegacyCompanyCash(company: CompanyState) {
  company.cashCopper = Math.max(0, Math.floor(company.cashCopper || 0));
  company.bankCopper = company.cashCopper;
}`,
`function syncLegacyCompanyCash(company: Pick<CompanyLedger, "cashCopper"> & { bankCopper?: number }) {
  company.cashCopper = Math.max(0, Math.floor(company.cashCopper || 0));
  if ("bankCopper" in company) company.bankCopper = company.cashCopper;
}`,
"make legacy company cash sync work for ledgers and full company state");

  replaceOnce(relativePath,
`  company.cashCopper -= due;
  shipment.status = "in_transit";`,
`  company.cashCopper -= due;
  syncLegacyCompanyCash(company);
  shipment.status = "in_transit";`,
"sync bankCopper after starting a shipment");

  replaceOnce(relativePath,
`  company.cashCopper -= plan.totalCopper;
  return { ok: true, reason: "dividend_paid" as const, plan };`,
`  company.cashCopper -= plan.totalCopper;
  syncLegacyCompanyCash(company);
  return { ok: true, reason: "dividend_paid" as const, plan };`,
"sync bankCopper after dividend payment");

  replaceOnce(relativePath,
`  company.cashCopper -= amount;
  return true;
}`,
`  company.cashCopper -= amount;
  syncLegacyCompanyCash(company);
  return true;
}`,
"sync bankCopper after generic company payment");

  replaceOnce(relativePath,
`  company.cashCopper += amount;
  return { ok: true, reason: "invested" as const };`,
`  company.cashCopper += amount;
  syncLegacyCompanyCash(company);
  return { ok: true, reason: "invested" as const };`,
"sync bankCopper after player investment");
}

function patchFisherStock() {
  replaceOnce("src/data/stock/profiles.ts",
`  fisher: {
    tier: "modest",
    archetypes: [{ id: "fisher", weight: 0.84 }, { id: "maritime", weight: 0.16 }],
    lifestyleBaseline: "worker",
    quantityMultiplier: 1.22,
    guaranteedTags: ["seafood", "barrels", "tool"],
    forbiddenTags: ["weapon", "armor", "luxury"],
  },`,
`  fisher: {
    tier: "modest",
    archetypes: [{ id: "fisher", weight: 0.93 }, { id: "maritime", weight: 0.07 }],
    lifestyleBaseline: "worker",
    stackModifier: -1,
    quantityMultiplier: 1.3,
    guaranteedTags: ["seafood", "fish", "barrels", "tool"],
    forbiddenTags: ["weapon", "armor", "luxury", "book", "books", "spice", "clothes", "jewelry", "magic"],
  },`,
"tighten fisher profession profile");

  replaceOnce("src/data/stock/archetypes.ts",
`  fisher: {
    weightedTags: { seafood: 15, fish: 11, shellfish: 6, maritime: 5, preserved: 4, barrels: 5, container: 3, tool: 2 },
    quantityMultipliers: { seafood: 3.2, fish: 2.8, shellfish: 2.2, preserved: 2 },
    minimumQuantities: { seafood: 16 },
    guaranteedTags: ["seafood", "barrels"],
  },`,
`  fisher: {
    weightedTags: { seafood: 22, fish: 16, shellfish: 9, maritime: 8, barrels: 7, preserved: 5, tool: 4, container: 1 },
    forbiddenTags: ["book", "books", "spice", "clothes", "luxury", "weapon", "armor", "jewelry", "magic"],
    quantityMultipliers: { seafood: 3.5, fish: 3, shellfish: 2.4, preserved: 2.1, barrels: 1.4 },
    minimumQuantities: { seafood: 18, fish: 12, barrels: 2 },
    guaranteedTags: ["seafood", "fish", "barrels"],
  },`,
"tighten fisher archetype weights");

  replaceOnce("scripts/review-stock.cjs",
`  fisher: { identity: ["seafood", "fish", "shellfish", "maritime", "barrels", "tool"], minIdentityShare: 0.58, maxFinishedShare: 0.22, maxLuxuryShare: 0.08 },`,
`  fisher: { identity: ["seafood", "fish", "shellfish", "maritime", "barrels", "tool", "preserved", "container"], minIdentityShare: 0.58, maxFinishedShare: 0.22, maxLuxuryShare: 0.08 },`,
"count fisher support goods as fisher identity in review report");
}

function patchStockReviewNote() {
  replaceOnce("scripts/review-stock.cjs",
`lines.push("- Original generated biases now softly affect stock selection through the dynamic \`bias\` archetype: character and profession biases are strongest, market and kingdom biases are lighter, and illegal kingdom tags discourage legal merchants while helping criminal stock.");`,
`lines.push("- Original generated biases now softly affect stock selection through per-profile \`stockBiasWeights\`: character and profession biases are strongest, market and kingdom biases are lighter, and illegal kingdom tags discourage legal merchants while helping criminal stock.");`,
"update stock review generated-bias wording");
}

function patchPlaytestReport() {
  const content = "const fs = require(\"fs\");\nconst path = require(\"path\");\n\nconst root = path.join(__dirname, \"..\");\nconst outFile = path.join(root, \"docs\", \"development\", \"playtest-balance-report.md\");\n\nfunction readIfExists(relativePath) {\n  const file = path.join(root, relativePath);\n  return fs.existsSync(file) ? fs.readFileSync(file, \"utf8\") : \"\";\n}\n\nfunction countMatches(text, pattern) {\n  return (text.match(pattern) || []).length;\n}\n\nfunction summaryLine(markdown, label) {\n  const prefix = `- ${label}:`;\n  return markdown.split(/\\r?\\n/).find((line) => line.trim().startsWith(prefix)) || \"\";\n}\n\nfunction summaryNumber(markdown, label) {\n  const line = summaryLine(markdown, label);\n  const match = line.match(/:\\s+(\\d+)\\s*$/);\n  return match ? Number(match[1]) : null;\n}\n\nfunction summaryStatus(markdown) {\n  const line = summaryLine(markdown, \"Status\");\n  const match = line.match(/:\\s+\\*\\*(.+?)\\*\\*/);\n  return match ? match[1].trim() : null;\n}\n\nconst stockReport = readIfExists(\"docs/systems/profession-stock-review.md\");\nconst iconReport = readIfExists(\"docs/assets/item-icon-lock-report.md\");\n\nconst stockPasses = countMatches(stockReport, /Balance status: PASS/g);\nconst stockReviews = countMatches(stockReport, /Balance status: REVIEW/g);\nconst iconStatus = summaryStatus(iconReport) || \"unknown\";\nconst iconErrors = summaryNumber(iconReport, \"Errors\");\nconst iconWarnings = summaryNumber(iconReport, \"Warnings\");\nconst iconOrphans = summaryNumber(iconReport, \"Orphan item icon files\");\nconst iconMissingRuntime = countMatches(iconReport, /missing runtime icon file/gi);\nconst iconMissingVariants = countMatches(iconReport, /missing quantity variant/gi);\n\nconst generatedAt = new Date().toISOString();\nconst lines = [\n  \"# Playtest And Balance Report\",\n  \"\",\n  `Generated: ${generatedAt}`,\n  \"\",\n  \"This report is a lightweight checkpoint after the item, stock, barter, economy, travel, quest, company, and UI-integration foundation work.\",\n  \"\",\n  \"## Automated Inputs\",\n  \"\",\n  `- Stock report present: ${stockReport ? \"yes\" : \"no\"}`,\n  `- Stock PASS sections: ${stockPasses}`,\n  `- Stock REVIEW sections: ${stockReviews}`,\n  `- Item icon report present: ${iconReport ? \"yes\" : \"no\"}`,\n  `- Item icon status: ${iconStatus}`,\n  `- Item icon errors: ${iconErrors ?? \"unknown\"}`,\n  `- Item icon warnings: ${iconWarnings ?? \"unknown\"}`,\n  `- Orphan item icon files: ${iconOrphans ?? \"unknown\"}`,\n  `- Missing runtime icon file findings: ${iconMissingRuntime}`,\n  `- Missing quantity variant findings: ${iconMissingVariants}`,\n  \"\",\n  \"## Manual Smoke Checklist\",\n  \"\",\n  \"| Area | Check | Result | Notes |\",\n  \"|---|---|---|---|\",\n  \"| Startup | Start a new game and check for console errors | manual | |\",\n  \"| Save/Load | Save v2, reload v2, confirm old saves stay blocked | manual | |\",\n  \"| Items | Inspect common item icons and quantity variants | manual | |\",\n  \"| Stock | Inspect blacksmith, miner, fletcher, barkeep, butcher, farmer, bard, toolmaker, fisher | manual | |\",\n  \"| Barter | Ask Price/Ask Offer with protected and concealed goods | manual | |\",\n  \"| Economy | Compare money/capacity panel numbers against inventory | manual | |\",\n  \"| Travel | Preview travel, pay toll/stallage, inspect arrival summary | manual | |\",\n  \"| Quests | Accept/complete one sample quest or contract state | manual | |\",\n  \"| Company | Plan warehouse/shipment helper state from tests or dev UI | manual | |\",\n  \"\",\n  \"## Go / No-Go Rule\",\n  \"\",\n  \"- Any startup, save/load, stock-identity, or barter-transfer failure is a blocker.\",\n  \"- More than two REVIEW profession-stock sections should be tuned before UI polish.\",\n  \"- Missing runtime item icons should be fixed before quest/company content depends on those goods.\",\n  \"\",\n];\n\nfs.mkdirSync(path.dirname(outFile), { recursive: true });\nfs.writeFileSync(outFile, `${lines.join(\"\\n\")}\\n`);\nconsole.log(`Wrote ${path.relative(root, outFile)}`);\n";
  write("scripts/playtest-balance.cjs", content);
  console.log("Patched: parse item-icon report summary values in playtest report");
}

patchCompany();
patchFisherStock();
patchStockReviewNote();
patchPlaytestReport();

console.log("Latest cleanup patch applied.");
