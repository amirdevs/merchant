const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const shouldDeleteLegacySubdomains = process.argv.includes("--delete-legacy-subdomains");

const stalePaths = [
  "src/ui-cooking.css",
  "src/ui-gamefit.css",
  "docs/ui_cooking",
  "docs/ui_extraction",
];

for (const entry of fs.readdirSync(root)) {
  if (/^PATCH_\d+_.*\.(txt|md)$/.test(entry)) stalePaths.push(entry);
}

if (shouldDeleteLegacySubdomains) {
  stalePaths.push("src/sub-domains");
}

for (const relative of stalePaths) {
  const absolute = path.join(root, relative);
  if (!fs.existsSync(absolute)) continue;
  fs.rmSync(absolute, { recursive: true, force: true });
  console.log(`removed ${relative}`);
}

console.log("UI cleanup complete.");
