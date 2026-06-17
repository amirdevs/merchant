const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const source = path.join(projectRoot, "docs", "ui_parts", "ui-assets", "public", "game-assets", "ui");
const target = path.join(projectRoot, "public", "game-assets", "ui");
const upscaledDirName = "upscayl_png_upscayl-standard-4x_4x";

if (!fs.existsSync(source)) {
  throw new Error(`Reviewed UI asset source does not exist: ${source}`);
}

fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(target, { recursive: true });

const sourceGroups = fs
  .readdirSync(source, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const group of sourceGroups) {
  const sourceGroup = path.join(source, group);
  const sourceUpscaled = path.join(sourceGroup, upscaledDirName);
  const sourceForRuntime = fs.existsSync(sourceUpscaled) ? sourceUpscaled : sourceGroup;
  const targetGroup = path.join(target, group);
  fs.mkdirSync(targetGroup, { recursive: true });

  for (const file of fs.readdirSync(sourceForRuntime)) {
    if (file.endsWith(".png")) {
      fs.copyFileSync(path.join(sourceForRuntime, file), path.join(targetGroup, file));
    }
  }
}

const groups = fs
  .readdirSync(target, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

let runtime = 0;

for (const group of groups) {
  const groupDir = path.join(target, group);
  const groupRuntime = fs.readdirSync(groupDir).filter((file) => file.endsWith(".png")).length;
  runtime += groupRuntime;
  console.log(`${group}: ${groupRuntime} runtime 4x assets`);
}

console.log(`Synced reviewed UI assets to ${target}`);
console.log(`Total: ${runtime} runtime 4x assets`);
