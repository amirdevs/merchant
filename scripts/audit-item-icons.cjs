const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dataDir = path.join(root, "src", "data", "generated");
const publicItemsDir = path.join(root, "public", "game-assets", "items");
const promptDir = path.join(root, "docs", "assets", "icon-prompts");
const outDir = path.join(root, "docs", "logs");

const failOnWarnings = process.argv.includes("--strict-warnings");
const failOnOrphans = process.argv.includes("--strict-orphans");
const jsonOnly = process.argv.includes("--json");

const imageExts = new Set([".png", ".webp", ".jpg", ".jpeg", ".gif"]);

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function safeReadJson(file) {
  try {
    return readJson(file);
  } catch (error) {
    return { __error: error.message };
  }
}

function posix(value) {
  return String(value || "").replace(/\\/g, "/").replace(/^\/+/, "");
}

function normalizePath(value) {
  return posix(value).replace(/^public\/game-assets\/items\//, "").replace(/^game-assets\/items\//, "");
}

function extOf(file) {
  return path.posix.extname(posix(file)).toLowerCase();
}

function stripPublicItemsPrefix(value) {
  return normalizePath(value);
}

function existsItemFile(relativePath) {
  return fs.existsSync(path.join(publicItemsDir, relativePath));
}

function statItemFile(relativePath) {
  try {
    return fs.statSync(path.join(publicItemsDir, relativePath));
  } catch {
    return null;
  }
}

function walkFiles(dir, prefix = "") {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = prefix ? path.posix.join(prefix, entry.name) : entry.name;
    if (entry.isDirectory()) files.push(...walkFiles(full, rel));
    else files.push(rel);
  }
  return files;
}

function countBy(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) || 0) + 1);
  return counts;
}

function pushIssue(bucket, severity, code, message, details = {}) {
  bucket.push({ severity, code, message, ...details });
}

function csvEscape(value) {
  const text = String(value ?? "");
  if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function itemTokens(item) {
  return [
    item.id,
    item.name,
    item.displayName,
    item.family,
    item.subfamily,
    item.tradeRole,
    item.rarityBand,
    item.bulkProfile,
    item.decayProfile,
    ...(item.tags || []),
    ...(item.forms || []),
    ...(item.professionUses || []),
    ...(item.regions || []),
    ...(item.sources || []),
    ...(item.qualityBands || []),
    ...(item.storageNeeds || []),
    ...(item.marketBehavior || []),
    ...Object.values(item.categoryAxes || {}).flat(),
  ].filter(Boolean).map((value) => String(value).toLowerCase());
}

function quantityVariantFromFile(file) {
  const base = path.posix.basename(posix(file), extOf(file));
  if (/_few$/i.test(base)) return "few";
  if (/_many$/i.test(base)) return "many";
  return "one";
}

function makeReportTable(rows, columns) {
  if (!rows.length) return "_None._";
  const header = `| ${columns.join(" | ")} |`;
  const divider = `| ${columns.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${columns.map((column) => String(row[column] ?? "").replace(/\|/g, "\\|")).join(" | ")} |`);
  return [header, divider, ...body].join("\n");
}

fs.mkdirSync(outDir, { recursive: true });

const itemsPath = path.join(dataDir, "items.json");
const items = readJson(itemsPath);
const issues = [];
const warnings = [];

const runtimeIconRefs = [];
const iconRefToItems = new Map();
const itemByIndex = new Map();

for (const item of items) {
  itemByIndex.set(item.index, item);
  const iconFile = normalizePath(item.iconFile || "");
  const label = `${item.index}: ${item.displayName || item.name}`;

  if (!iconFile) {
    pushIssue(issues, "error", "missing-icon-file-field", `${label} has no iconFile.`, { itemIndex: item.index, itemName: item.name });
    continue;
  }

  runtimeIconRefs.push(iconFile);
  if (!iconRefToItems.has(iconFile)) iconRefToItems.set(iconFile, []);
  iconRefToItems.get(iconFile).push(item);

  if (iconFile !== posix(item.iconFile || "")) {
    pushIssue(warnings, "warning", "non-normalized-icon-path", `${label} icon path is not normalized.`, { itemIndex: item.index, itemName: item.name, iconFile: item.iconFile });
  }

  if (iconFile.includes("..") || path.posix.isAbsolute(iconFile)) {
    pushIssue(issues, "error", "unsafe-icon-path", `${label} has an unsafe icon path.`, { itemIndex: item.index, itemName: item.name, iconFile });
  }

  if (!imageExts.has(extOf(iconFile))) {
    pushIssue(issues, "error", "invalid-icon-extension", `${label} icon is not a supported image type.`, { itemIndex: item.index, itemName: item.name, iconFile });
  }

  if (!existsItemFile(iconFile)) {
    pushIssue(issues, "error", "missing-runtime-icon-file", `${label} icon file is missing.`, { itemIndex: item.index, itemName: item.name, iconFile });
  } else {
    const stat = statItemFile(iconFile);
    if (stat && stat.size <= 0) {
      pushIssue(issues, "error", "empty-runtime-icon-file", `${label} icon file is empty.`, { itemIndex: item.index, itemName: item.name, iconFile });
    }
  }
}

for (const [iconFile, refs] of iconRefToItems.entries()) {
  if (refs.length > 1) {
    pushIssue(warnings, "warning", "duplicate-runtime-icon-reference", `${refs.length} items reference the same runtime icon.`, {
      iconFile,
      items: refs.slice(0, 12).map((item) => `${item.index}:${item.name}`).join("; "),
      totalItems: refs.length,
    });
  }
}

const expectedPromptOutputs = new Map();
const promptSlots = [];
const promptFiles = [];

if (fs.existsSync(promptDir)) {
  for (const file of fs.readdirSync(promptDir).sort()) {
    if (!/^items-\d{4}-\d{4}\.json$/.test(file)) continue;
    promptFiles.push(file);
    const config = safeReadJson(path.join(promptDir, file));
    if (config.__error) {
      pushIssue(issues, "error", "invalid-icon-prompt-json", `${file} could not be parsed.`, { file, error: config.__error });
      continue;
    }

    if (!config.batch || typeof config.batch.slotCount !== "number") {
      pushIssue(warnings, "warning", "missing-prompt-batch", `${file} is missing batch metadata.`, { file });
    }

    if (!Array.isArray(config.slots)) {
      pushIssue(issues, "error", "missing-prompt-slots", `${file} has no slots array.`, { file });
      continue;
    }

    if (config.batch && config.slots.length !== config.batch.slotCount) {
      pushIssue(issues, "error", "prompt-slot-count-mismatch", `${file} slot count does not match batch metadata.`, {
        file,
        batchSlotCount: config.batch.slotCount,
        slotsLength: config.slots.length,
      });
    }

    for (const slot of config.slots) {
      const output = stripPublicItemsPrefix(slot.output || "");
      const item = itemByIndex.get(slot.itemIndex);
      const variant = slot.variant === "single" ? "one" : slot.variant;
      promptSlots.push({ ...slot, file, output, variant });

      if (!output) {
        pushIssue(issues, "error", "missing-slot-output", `${file} slot ${slot.sheetSlot} has no output path.`, { file, sheetSlot: slot.sheetSlot });
        continue;
      }

      if (!item) {
        pushIssue(issues, "error", "unknown-slot-item-index", `${file} slot ${slot.sheetSlot} references unknown item index.`, { file, sheetSlot: slot.sheetSlot, itemIndex: slot.itemIndex, output });
      }

      if (item && normalizePath(item.iconFile || "") !== normalizePath(slot.iconFile || "")) {
        pushIssue(warnings, "warning", "slot-iconfile-stale", `${file} slot ${slot.sheetSlot} iconFile differs from current item data.`, {
          file,
          sheetSlot: slot.sheetSlot,
          itemIndex: slot.itemIndex,
          itemName: item.name,
          slotIconFile: slot.iconFile,
          currentIconFile: item.iconFile,
        });
      }

      if (!imageExts.has(extOf(output))) {
        pushIssue(issues, "error", "invalid-slot-output-extension", `${file} slot ${slot.sheetSlot} output is not a supported image type.`, { file, sheetSlot: slot.sheetSlot, output });
      }

      if (!existsItemFile(output)) {
        pushIssue(issues, "error", "missing-quantity-variant-icon", `${file} slot ${slot.sheetSlot} expected icon output is missing.`, {
          file,
          sheetSlot: slot.sheetSlot,
          globalSlot: slot.globalSlot,
          itemIndex: slot.itemIndex,
          itemName: slot.itemName,
          variant,
          output,
        });
      } else {
        const stat = statItemFile(output);
        if (stat && stat.size <= 0) {
          pushIssue(issues, "error", "empty-quantity-variant-icon", `${file} slot ${slot.sheetSlot} expected icon output is empty.`, {
            file,
            sheetSlot: slot.sheetSlot,
            globalSlot: slot.globalSlot,
            itemIndex: slot.itemIndex,
            itemName: slot.itemName,
            variant,
            output,
          });
        }
      }

      if (!expectedPromptOutputs.has(output)) expectedPromptOutputs.set(output, []);
      expectedPromptOutputs.get(output).push({ file, slot });
    }
  }
} else {
  pushIssue(warnings, "warning", "missing-icon-prompt-directory", "docs/assets/icon-prompts does not exist; quantity variant lock cannot be checked.");
}

for (const [output, refs] of expectedPromptOutputs.entries()) {
  if (refs.length > 1) {
    pushIssue(issues, "error", "duplicate-prompt-output", "Multiple prompt slots output to the same icon file.", {
      output,
      refs: refs.slice(0, 12).map((ref) => `${ref.file}#${ref.slot.sheetSlot}`).join("; "),
      totalRefs: refs.length,
    });
  }
}

const manifestPath = path.join(promptDir, "manifest.json");
let manifest = null;
if (fs.existsSync(manifestPath)) {
  manifest = safeReadJson(manifestPath);
  if (manifest.__error) {
    pushIssue(issues, "error", "invalid-icon-manifest-json", "Icon prompt manifest could not be parsed.", { error: manifest.__error });
    manifest = null;
  }
}

if (manifest) {
  if (manifest.totalItems !== items.length) {
    pushIssue(issues, "error", "manifest-item-count-mismatch", "Icon prompt manifest totalItems does not match generated items.", {
      manifestTotalItems: manifest.totalItems,
      actualItems: items.length,
    });
  }
  if (manifest.totalImageSlots !== promptSlots.length) {
    pushIssue(issues, "error", "manifest-slot-count-mismatch", "Icon prompt manifest totalImageSlots does not match prompt slot count.", {
      manifestTotalImageSlots: manifest.totalImageSlots,
      actualSlots: promptSlots.length,
    });
  }
  if (Array.isArray(manifest.batches)) {
    const missingBatches = manifest.batches.filter((file) => !promptFiles.includes(file));
    if (missingBatches.length) {
      pushIssue(issues, "error", "manifest-missing-batches", "Icon prompt manifest references missing batch files.", { missingBatches: missingBatches.slice(0, 25).join(", "), totalMissing: missingBatches.length });
    }
  }
}

const actualItemFiles = walkFiles(publicItemsDir).filter((file) => imageExts.has(extOf(file)));
const actualItemFileSet = new Set(actualItemFiles);
const expectedFileSet = new Set([...runtimeIconRefs, ...expectedPromptOutputs.keys()]);
const orphanFiles = actualItemFiles.filter((file) => !expectedFileSet.has(posix(file))).sort();

if (orphanFiles.length) {
  const severity = failOnOrphans ? "error" : "warning";
  pushIssue(failOnOrphans ? issues : warnings, severity, "orphan-item-icon-file", "Item icon files exist but are not referenced by item data or prompt outputs.", {
    totalOrphans: orphanFiles.length,
    sample: orphanFiles.slice(0, 80).join("; "),
  });
}

for (const expected of expectedFileSet) {
  if (expected && !actualItemFileSet.has(expected) && !existsItemFile(expected)) {
    // Already reported with a more specific code above for most paths. This catches generated path drift.
    if (!issues.some((issue) => issue.iconFile === expected || issue.output === expected)) {
      pushIssue(issues, "error", "missing-expected-icon-file", "Expected item icon file is missing.", { expected });
    }
  }
}

const variantCountsByItem = new Map();
for (const slot of promptSlots) {
  const key = slot.itemIndex;
  if (!variantCountsByItem.has(key)) variantCountsByItem.set(key, { one: 0, few: 0, many: 0, outputs: [] });
  const record = variantCountsByItem.get(key);
  if (slot.variant === "one" || slot.variant === "few" || slot.variant === "many") record[slot.variant] += 1;
  record.outputs.push(slot.output);
}

const variantRows = [];
for (const item of items) {
  const record = variantCountsByItem.get(item.index);
  const forms = item.forms || [];
  const expectsVariants = !item.unique && forms.includes("few") && forms.includes("many");
  if (!record) {
    pushIssue(warnings, "warning", "item-missing-from-icon-prompts", "Item is not represented in icon prompt slots.", { itemIndex: item.index, itemName: item.name, iconFile: item.iconFile });
    continue;
  }
  const validSingle = record.one === 1;
  const validVariants = expectsVariants ? record.few === 1 && record.many === 1 : record.few === 0 && record.many === 0;
  if (!validSingle || !validVariants) {
    pushIssue(issues, "error", "quantity-variant-policy-mismatch", "Prompt outputs do not match item quantity variant policy.", {
      itemIndex: item.index,
      itemName: item.name,
      expected: expectsVariants ? "one,few,many" : "one",
      actual: `one:${record.one}, few:${record.few}, many:${record.many}`,
      forms: forms.join(", "),
      unique: Boolean(item.unique),
    });
  }
  if (expectsVariants || record.few || record.many) {
    variantRows.push({
      itemIndex: item.index,
      itemName: item.name,
      policy: expectsVariants ? "one/few/many" : "single-only",
      one: record.one,
      few: record.few,
      many: record.many,
      iconFile: normalizePath(item.iconFile || ""),
      outputs: record.outputs.join("; "),
    });
  }
}

const duplicateRows = [...iconRefToItems.entries()]
  .filter(([, refs]) => refs.length > 1)
  .map(([iconFile, refs]) => ({
    iconFile,
    count: refs.length,
    items: refs.slice(0, 12).map((item) => `${item.index}: ${item.name}`).join("; "),
  }))
  .slice(0, 80);

const issueRows = issues.slice(0, 120).map((issue) => ({
  severity: issue.severity,
  code: issue.code,
  message: issue.message,
  path: issue.iconFile || issue.output || issue.expected || issue.file || "",
}));

const warningRows = warnings.slice(0, 120).map((issue) => ({
  severity: issue.severity,
  code: issue.code,
  message: issue.message,
  path: issue.iconFile || issue.output || issue.sample || issue.file || "",
}));

const manualRows = promptSlots.map((slot) => {
  const item = itemByIndex.get(slot.itemIndex) || {};
  const tokens = itemTokens(item).slice(0, 18).join(" ");
  const outputExists = Boolean(slot.output && existsItemFile(slot.output));
  return {
    globalSlot: slot.globalSlot,
    batchFile: slot.file,
    sheetSlot: slot.sheetSlot,
    itemIndex: slot.itemIndex,
    itemName: slot.itemName,
    variant: slot.variant,
    output: slot.output,
    exists: outputExists ? "yes" : "no",
    family: item.family || "",
    subfamily: item.subfamily || "",
    tradeRole: item.tradeRole || "",
    reviewStatus: "",
    reviewNotes: "",
    tokens,
  };
});

const csvColumns = ["globalSlot", "batchFile", "sheetSlot", "itemIndex", "itemName", "variant", "output", "exists", "family", "subfamily", "tradeRole", "reviewStatus", "reviewNotes", "tokens"];
const csv = [csvColumns.join(",")]
  .concat(manualRows.map((row) => csvColumns.map((column) => csvEscape(row[column])).join(",")))
  .join("\n");

const summary = {
  generatedAt: new Date().toISOString(),
  itemCount: items.length,
  runtimeIconReferenceCount: runtimeIconRefs.length,
  uniqueRuntimeIconReferenceCount: new Set(runtimeIconRefs).size,
  promptBatchCount: promptFiles.length,
  promptSlotCount: promptSlots.length,
  expectedPromptOutputCount: expectedPromptOutputs.size,
  actualItemIconFileCount: actualItemFiles.length,
  orphanItemIconFileCount: orphanFiles.length,
  duplicateRuntimeIconReferenceCount: duplicateRows.length,
  issueCount: issues.length,
  warningCount: warnings.length,
  status: issues.length === 0 && (!failOnWarnings || warnings.length === 0) ? "PASS" : "FAIL",
};

const report = [
  "# Item Icon Lock Report",
  "",
  "Generated by `pnpm audit:item-icons`.",
  "",
  "## Summary",
  "",
  `- Status: **${summary.status}**`,
  `- Items: ${summary.itemCount}`,
  `- Runtime icon references: ${summary.runtimeIconReferenceCount}`,
  `- Unique runtime icon references: ${summary.uniqueRuntimeIconReferenceCount}`,
  `- Icon prompt batches: ${summary.promptBatchCount}`,
  `- Prompt image slots: ${summary.promptSlotCount}`,
  `- Expected prompt outputs: ${summary.expectedPromptOutputCount}`,
  `- Actual item icon files: ${summary.actualItemIconFileCount}`,
  `- Orphan item icon files: ${summary.orphanItemIconFileCount}`,
  `- Errors: ${summary.issueCount}`,
  `- Warnings: ${summary.warningCount}`,
  "",
  "## Blocking Errors",
  "",
  makeReportTable(issueRows, ["severity", "code", "message", "path"]),
  "",
  "## Warnings",
  "",
  makeReportTable(warningRows, ["severity", "code", "message", "path"]),
  "",
  "## Duplicate Runtime Icon References",
  "",
  makeReportTable(duplicateRows, ["iconFile", "count", "items"]),
  "",
  "## Quantity Variant Items",
  "",
  makeReportTable(variantRows.slice(0, 120), ["itemIndex", "itemName", "policy", "one", "few", "many", "iconFile"]),
  "",
  "## Manual Review Files",
  "",
  "- `docs/logs/item-icon-manual-review.csv`: row-by-row visual review sheet.",
  "- `docs/logs/item-icon-lock-report.json`: complete machine-readable report.",
  "",
  "## Manual Visual Review Standard",
  "",
  "For each row in the CSV, mark `reviewStatus` as `pass`, `regenerate`, `wrong-item`, `bad-quantity`, `bad-crop`, `duplicate`, or `needs-discussion`.",
  "",
  "Visual checks cannot be fully automated. The automated lock proves references and quantity outputs are structurally complete; the CSV is for visual identity review.",
  "",
].join("\n");

const jsonReport = {
  summary,
  issues,
  warnings,
  duplicateRuntimeIconReferences: duplicateRows,
  orphanFiles,
  quantityVariantRows: variantRows,
  manualReviewRows: manualRows,
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "item-icon-lock-report.md"), `${report}\n`);
fs.writeFileSync(path.join(outDir, "item-icon-lock-report.json"), `${JSON.stringify(jsonReport, null, 2)}\n`);
fs.writeFileSync(path.join(outDir, "item-icon-manual-review.csv"), `${csv}\n`);

if (!jsonOnly) {
  console.log(`Item icon lock status: ${summary.status}`);
  console.log(`Items: ${summary.itemCount}`);
  console.log(`Prompt slots: ${summary.promptSlotCount}`);
  console.log(`Actual item icon files: ${summary.actualItemIconFileCount}`);
  console.log(`Errors: ${summary.issueCount}`);
  console.log(`Warnings: ${summary.warningCount}`);
  console.log("Wrote docs/logs/item-icon-lock-report.md");
  console.log("Wrote docs/logs/item-icon-lock-report.json");
  console.log("Wrote docs/logs/item-icon-manual-review.csv");
  if (issues.length) {
    console.log("First blocking errors:");
    for (const issue of issues.slice(0, 30)) console.log(`- ${issue.code}: ${issue.message}`);
  }
  if (warnings.length) {
    console.log("First warnings:");
    for (const issue of warnings.slice(0, 20)) console.log(`- ${issue.code}: ${issue.message}`);
  }
}

if (issues.length || (failOnWarnings && warnings.length)) process.exit(1);
