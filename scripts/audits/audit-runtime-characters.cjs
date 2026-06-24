const fs = require("fs");
const path = require("path");
const {
  buildRuntimeCharacters,
  loadCharacterIdentityCatalog,
  loadCharacterRuntimeProfiles,
} = require("../maintenance/load-character-runtime-data.cjs");

const root = process.cwd();
const blockedRosterPath = path.join(root, "src", "content", "characters", "characters.json");

function walkFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === "dist" || entry.name === ".git") continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(fullPath, acc);
    else acc.push(fullPath);
  }
  return acc;
}

function relative(filePath) {
  return path.relative(root, filePath).replace(/\\/g, "/");
}

function scanForBlockedRosterImports() {
  const files = walkFiles(path.join(root, "src")).concat(walkFiles(path.join(root, "scripts")));
  const offenders = [];
  const blockedPatterns = [
    /from\s+["'][^"']*characters\.json["']/,
    /require\(\s*["'][^"']*characters\.json["']\s*\)/,
    /readJson\(\s*path\.join\(\s*["']characters["']\s*,\s*["']characters\.json["']\s*\)\s*\)/,
    /fs\.readFileSync\([^)]*characters\.json[^)]*\)/,
  ];
  for (const file of files) {
    if (file.endsWith("audit-runtime-characters.cjs") || file.endsWith("audit-character-portraits.cjs")) continue;
    const text = fs.readFileSync(file, "utf8");
    if (blockedPatterns.some((pattern) => pattern.test(text))) offenders.push(relative(file));
  }
  return offenders.sort();
}

function main() {
  const identities = loadCharacterIdentityCatalog();
  const runtimeProfiles = loadCharacterRuntimeProfiles();
  const runtimeCharacters = buildRuntimeCharacters();
  const identityById = new Map(identities.map((identity) => [identity.characterId, identity]));
  const blockedImportFiles = scanForBlockedRosterImports();
  const problems = [];

  if (fs.existsSync(blockedRosterPath)) {
    problems.push(`Blocked runtime roster file still exists: ${relative(blockedRosterPath)}`);
  }

  for (const file of blockedImportFiles) {
    problems.push(`Production source still references characters.json: ${file}`);
  }

  if (identities.length !== 240) {
    problems.push(`Final identity profile count changed: ${identities.length}/240`);
  }

  if (runtimeCharacters.length !== 203) {
    problems.push(`Runtime character count changed: ${runtimeCharacters.length}/203`);
  }

  for (const character of runtimeCharacters) {
    const profile = runtimeProfiles[character.characterId];
    const identity = identityById.get(character.characterId);
    if (!profile) {
      problems.push(`Missing runtime profile for ${character.characterId}`);
      continue;
    }
    if (!identity) {
      problems.push(`Missing final identity profile for ${character.characterId}`);
      continue;
    }
    if (character.name !== identity.finalDisplayName) {
      problems.push(`Visible runtime name mismatch for ${character.characterId}: ${character.name} != ${identity.finalDisplayName}`);
    }
    if (character.profession !== identity.profession) {
      problems.push(`Visible runtime profession mismatch for ${character.characterId}: ${character.profession} != ${identity.profession}`);
    }
    if (character.stallFile !== null) {
      problems.push(`Runtime stall file should be null for ${character.characterId}: ${String(character.stallFile)}`);
    }
    if (!/^character-\d{3}-[a-z]+\.png$/.test(String(character.portraitFile || ""))) {
      problems.push(`Runtime portrait filename is not a final profile portrait for ${character.characterId}: ${String(character.portraitFile)}`);
    }
    if (typeof profile.runtimeIndex !== "number" || profile.runtimeIndex !== character.index) {
      problems.push(`Runtime index mismatch for ${character.characterId}: ${String(profile.runtimeIndex)} != ${character.index}`);
    }
  }

  console.log(`Final identities: ${identities.length}`);
  console.log(`Runtime character profiles: ${Object.values(runtimeProfiles).filter((profile) => profile.runtimeIndex !== null).length}`);
  console.log(`Runtime characters built: ${runtimeCharacters.length}`);

  if (problems.length) {
    console.error("Runtime character audit failed:");
    for (const problem of problems) console.error(`- ${problem}`);
    process.exit(1);
  }

  console.log("Runtime character audit passed.");
}

main();
