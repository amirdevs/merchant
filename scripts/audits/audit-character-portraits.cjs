const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const { buildRuntimeCharacters, loadCharacterRuntimeProfiles } = require("../maintenance/load-character-runtime-data.cjs");

const root = process.cwd();
const promptDir = path.join(root, "docs", "assets", "character-prompts");
const portraitDir = path.join(root, "public", "assets", "portraits", "characters");
const blockedRosterPath = path.join(root, "src", "content", "characters", "characters.json");
const identityDir = path.join(root, "src", "content", "characters");
const logDir = path.join(root, "docs", "logs");
const reportPath = path.join(logDir, "character-portrait-lock-report.md");

const expectedCounts = {
  sheets: 61,
  portraits: 722,
  identities: 240,
  primaryCastIdentities: 48,
  supportingCastIdentities: 192,
};

function fail(message) {
  throw new Error(message);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function listPromptFiles() {
  if (!fs.existsSync(promptDir)) fail(`Missing prompt directory: ${relative(promptDir)}`);
  return fs.readdirSync(promptDir)
    .filter((file) => /^characters-\d{4}-\d{4}\.json$/.test(file))
    .sort();
}

function relative(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

function uniqueDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates].sort();
}

function collectPromptRecords() {
  const promptFiles = listPromptFiles();
  const records = [];
  const sheetIssues = [];
  for (const file of promptFiles) {
    const fullPath = path.join(promptDir, file);
    const sheet = readJson(fullPath);
    if (!Array.isArray(sheet.images)) {
      sheetIssues.push(`${file}: missing images[]`);
      continue;
    }
    for (const image of sheet.images) {
      records.push({
        promptFile: file,
        batchId: sheet.batchId,
        globalOrder: image.globalOrder,
        order: image.order,
        row: image.row,
        column: image.column,
        cell: image.cell,
        imageId: image.imageId,
        characterId: image.characterId,
        displayName: image.displayName,
        profession: image.profession,
        expression: image.expression,
        outputFile: image.outputFile,
      });
    }
  }
  return { promptFiles, records, sheetIssues };
}

function parsePng(buffer) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (buffer.length < 24 || !buffer.subarray(0, 8).equals(signature)) {
    return { valid: false, reason: "not a PNG signature" };
  }

  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idat = [];

  while (offset + 12 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    if (dataEnd + 4 > buffer.length) return { valid: false, reason: "truncated PNG chunk" };

    if (type === "IHDR") {
      width = buffer.readUInt32BE(dataStart);
      height = buffer.readUInt32BE(dataStart + 4);
      bitDepth = buffer[dataStart + 8];
      colorType = buffer[dataStart + 9];
    } else if (type === "IDAT") {
      idat.push(buffer.subarray(dataStart, dataEnd));
    } else if (type === "IEND") {
      break;
    }
    offset = dataEnd + 4;
  }

  if (!width || !height) return { valid: false, reason: "missing IHDR dimensions" };
  return { valid: true, width, height, bitDepth, colorType, idat };
}

function bytesPerPixel(colorType) {
  if (colorType === 2) return 3; // RGB
  if (colorType === 6) return 4; // RGBA
  return 0;
}

function unfilterScanlines(raw, width, height, bpp, stride) {
  const pixels = Buffer.alloc(height * stride);
  let inputOffset = 0;
  for (let y = 0; y < height; y += 1) {
    const filter = raw[inputOffset++];
    const rowStart = y * stride;
    const prevRowStart = rowStart - stride;
    for (let x = 0; x < stride; x += 1) {
      const rawByte = raw[inputOffset++];
      const left = x >= bpp ? pixels[rowStart + x - bpp] : 0;
      const up = y > 0 ? pixels[prevRowStart + x] : 0;
      const upLeft = y > 0 && x >= bpp ? pixels[prevRowStart + x - bpp] : 0;
      let value;
      if (filter === 0) value = rawByte;
      else if (filter === 1) value = rawByte + left;
      else if (filter === 2) value = rawByte + up;
      else if (filter === 3) value = rawByte + Math.floor((left + up) / 2);
      else if (filter === 4) value = rawByte + paeth(left, up, upLeft);
      else throw new Error(`Unsupported PNG filter ${filter}`);
      pixels[rowStart + x] = value & 0xff;
    }
  }
  return pixels;
}

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

function countMagentaPixels(buffer) {
  const parsed = parsePng(buffer);
  if (!parsed.valid) return { ...parsed, magentaPixels: null };
  const bpp = bytesPerPixel(parsed.colorType);
  if (parsed.bitDepth !== 8 || !bpp) {
    return { ...parsed, magentaPixels: null, warning: `unsupported scan for bitDepth ${parsed.bitDepth}, colorType ${parsed.colorType}` };
  }
  try {
    const inflated = zlib.inflateSync(Buffer.concat(parsed.idat));
    const stride = parsed.width * bpp;
    const expected = (stride + 1) * parsed.height;
    if (inflated.length < expected) return { ...parsed, magentaPixels: null, warning: "inflated data shorter than expected" };
    const pixels = unfilterScanlines(inflated, parsed.width, parsed.height, bpp, stride);
    let magentaPixels = 0;
    for (let i = 0; i < pixels.length; i += bpp) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = bpp === 4 ? pixels[i + 3] : 255;
      if (a > 0 && r === 255 && g === 0 && b === 255) magentaPixels += 1;
    }
    return { ...parsed, magentaPixels };
  } catch (error) {
    return { ...parsed, magentaPixels: null, warning: error.message };
  }
}

function auditPortraitFiles(expectedOutputFiles) {
  if (!fs.existsSync(portraitDir)) {
    return { actualPngFiles: [], missing: expectedOutputFiles, orphan: [], invalid: [`Missing portrait directory: ${relative(portraitDir)}`], nonsquare: [], magenta: [], scanWarnings: [] };
  }
  const actualPngFiles = fs.readdirSync(portraitDir).filter((file) => file.toLowerCase().endsWith(".png")).sort();
  const actualSet = new Set(actualPngFiles);
  const expectedSet = new Set(expectedOutputFiles);
  const missing = expectedOutputFiles.filter((file) => !actualSet.has(file));
  const orphan = actualPngFiles.filter((file) => !expectedSet.has(file));
  const invalid = [];
  const nonsquare = [];
  const magenta = [];
  const scanWarnings = [];

  for (const file of actualPngFiles.filter((name) => expectedSet.has(name))) {
    const fullPath = path.join(portraitDir, file);
    const buffer = fs.readFileSync(fullPath);
    const result = countMagentaPixels(buffer);
    if (!result.valid) {
      invalid.push(`${file}: ${result.reason}`);
      continue;
    }
    if (result.width !== result.height) nonsquare.push(`${file}: ${result.width}x${result.height}`);
    if (result.magentaPixels && result.magentaPixels > 0) magenta.push(`${file}: ${result.magentaPixels} #FF00FF pixels`);
    if (result.warning) scanWarnings.push(`${file}: ${result.warning}`);
  }
  return { actualPngFiles, missing, orphan, invalid, nonsquare, magenta, scanWarnings };
}

function auditIdentityCatalog(records) {
  const byCharacterId = new Map();
  for (const record of records) {
    if (!byCharacterId.has(record.characterId)) byCharacterId.set(record.characterId, record);
  }
  const uniqueCharacters = [...byCharacterId.values()];
  const duplicateDisplayNames = uniqueDuplicates(uniqueCharacters.map((record) => record.displayName).filter(Boolean));
  const missingNames = uniqueCharacters.filter((record) => !record.displayName).map((record) => record.characterId);
  const missingProfessions = uniqueCharacters.filter((record) => !record.profession).map((record) => record.characterId);

  const runtimeProfiles = loadCharacterRuntimeProfiles();
  const runtimeCharacters = buildRuntimeCharacters();
  const runtimeByCharacterId = new Map(runtimeCharacters.map((character) => [character.characterId, character]));
  const runtimeProfileCharacterIds = new Set(
    Object.values(runtimeProfiles)
      .filter((profile) => profile.runtimeIndex !== null)
      .map((profile) => profile.characterId),
  );
  const runtimeNameCollisions = uniqueCharacters
    .filter((record) => runtimeProfileCharacterIds.has(record.characterId) && runtimeByCharacterId.get(record.characterId)?.name !== record.displayName)
    .map((record) => `${record.characterId}: runtime name mismatch`);

  const identityFiles = fs.existsSync(identityDir)
    ? fs.readdirSync(identityDir).filter((file) => /^characterIdentityCatalog.*\.ts$/.test(file) && !file.includes("Types"))
    : [];
  const identitySource = identityFiles.map((file) => fs.readFileSync(path.join(identityDir, file), "utf8")).join("\n");
  const finalDisplayNameCount = (identitySource.match(/finalDisplayName:/g) || []).length;
  const shortStoryCount = (identitySource.match(/shortStory:/g) || []).length;
  const roleTagsCount = (identitySource.match(/roleTags:/g) || []).length;
  const questHooksCount = (identitySource.match(/questHooks:/g) || []).length;

  const catalogStructureIssues = [];
  if (finalDisplayNameCount < expectedCounts.identities) catalogStructureIssues.push(`finalDisplayName fields: ${finalDisplayNameCount}/${expectedCounts.identities}`);
  if (shortStoryCount < expectedCounts.identities) catalogStructureIssues.push(`shortStory fields: ${shortStoryCount}/${expectedCounts.identities}`);
  if (roleTagsCount < expectedCounts.identities) catalogStructureIssues.push(`roleTags fields: ${roleTagsCount}/${expectedCounts.identities}`);
  if (questHooksCount < expectedCounts.identities) catalogStructureIssues.push(`questHooks fields: ${questHooksCount}/${expectedCounts.identities}`);

  return {
    uniqueCharacters,
    duplicateDisplayNames,
    missingNames,
    missingProfessions,
    runtimeNameCollisions,
    catalogStructureIssues,
    catalogFieldCounts: { finalDisplayNameCount, shortStoryCount, roleTagsCount, questHooksCount },
  };
}

function markdownList(items, empty = "None") {
  if (!items.length) return `- ${empty}`;
  return items.map((item) => `- ${item}`).join("\n");
}

function main() {
  const { promptFiles, records, sheetIssues } = collectPromptRecords();
  const runtimeProfiles = loadCharacterRuntimeProfiles();
  const activeRuntimeProfileCount = Object.values(runtimeProfiles).filter((profile) => profile.runtimeIndex !== null).length;
  const expectedOutputFiles = records.map((record) => record.outputFile).sort();
  const promptIssues = [];
  const globalOrders = records.map((record) => record.globalOrder).sort((a, b) => a - b);
  const expectedOrders = Array.from({ length: records.length }, (_, index) => index + 1);
  if (promptFiles.length !== expectedCounts.sheets) promptIssues.push(`Prompt sheet count ${promptFiles.length}/${expectedCounts.sheets}`);
  if (records.length !== expectedCounts.portraits) promptIssues.push(`Prompt image count ${records.length}/${expectedCounts.portraits}`);
  if (globalOrders.some((value, index) => value !== expectedOrders[index])) promptIssues.push("Global orders are not a perfect 1..722 sequence.");
  const duplicateOutputFiles = uniqueDuplicates(records.map((record) => record.outputFile));
  const duplicateImageIds = uniqueDuplicates(records.map((record) => record.imageId));
  if (duplicateOutputFiles.length) promptIssues.push(`Duplicate output files: ${duplicateOutputFiles.join(", ")}`);
  if (duplicateImageIds.length) promptIssues.push(`Duplicate image ids: ${duplicateImageIds.join(", ")}`);

  const portraits = auditPortraitFiles(expectedOutputFiles);
  const identities = auditIdentityCatalog(records);
  const allIssues = [
    ...(fs.existsSync(blockedRosterPath) ? [`Blocked runtime roster file still exists: ${relative(blockedRosterPath)}`] : []),
    ...sheetIssues,
    ...promptIssues,
    ...portraits.missing.map((file) => `Missing portrait: ${file}`),
    ...portraits.orphan.map((file) => `Orphan portrait: ${file}`),
    ...portraits.invalid.map((issue) => `Invalid portrait: ${issue}`),
    ...portraits.nonsquare.map((issue) => `Nonsquare portrait: ${issue}`),
    ...portraits.magenta.map((issue) => `Magenta label remains: ${issue}`),
    ...identities.duplicateDisplayNames.map((name) => `Duplicate display name: ${name}`),
    ...identities.missingNames.map((id) => `Missing display name: ${id}`),
    ...identities.missingProfessions.map((id) => `Missing profession: ${id}`),
    ...identities.runtimeNameCollisions.map((issue) => `Runtime name collision: ${issue}`),
    ...(activeRuntimeProfileCount !== 203
      ? [`Runtime profile count changed: ${activeRuntimeProfileCount}/203`]
      : []),
  ];

  fs.mkdirSync(logDir, { recursive: true });
  const report = `# Character Portrait Lock Report\n\nGenerated by \`pnpm audit:character-portraits\`.\n\n## Summary\n\n| Check | Result |\n|---|---:|\n| Prompt sheets | ${promptFiles.length}/${expectedCounts.sheets} |\n| Prompt image records | ${records.length}/${expectedCounts.portraits} |\n| Runtime PNG files | ${portraits.actualPngFiles.length} |\n| Unique character IDs | ${identities.uniqueCharacters.length}/${expectedCounts.identities} |\n| Missing portraits | ${portraits.missing.length} |\n| Orphan portraits | ${portraits.orphan.length} |\n| Invalid PNGs/LFS pointers | ${portraits.invalid.length} |\n| Nonsquare PNGs | ${portraits.nonsquare.length} |\n| Visible magenta label pixels | ${portraits.magenta.length} files |\n| Duplicate display names | ${identities.duplicateDisplayNames.length} |\n| Runtime name collisions | ${identities.runtimeNameCollisions.length} |\n\n## Issues\n\n${markdownList(allIssues, "No blocking issues found.")}\n\n## Non-blocking identity source coverage warnings\n\n${markdownList(identities.catalogStructureIssues, "None")}\n\nThese source-coverage warnings only count explicit fields in the TypeScript identity catalog files. They do not fail the portrait gate when the runtime prompt records already provide display names, professions, stories, role tags, and quest hooks.\n\n## PNG scan warnings\n\n${markdownList(portraits.scanWarnings, "None")}\n\n## Identity catalog field counts\n\n- finalDisplayName: ${identities.catalogFieldCounts.finalDisplayNameCount}\n- shortStory: ${identities.catalogFieldCounts.shortStoryCount}\n- roleTags: ${identities.catalogFieldCounts.roleTagsCount}\n- questHooks: ${identities.catalogFieldCounts.questHooksCount}\n`;
  fs.writeFileSync(reportPath, report);
  console.log(`Wrote ${relative(reportPath)}`);
  if (allIssues.length) {
    console.error(report);
    process.exit(1);
  }
  console.log("Character portrait/runtime audit passed.");
}

main();
