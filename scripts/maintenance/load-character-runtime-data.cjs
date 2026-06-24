const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();
const characterDir = path.join(root, "src", "content", "characters");
const runtimeProfileDataPath = path.join(characterDir, "characterRuntimeProfiles.data.json");
const identityCatalogPath = path.join(characterDir, "characterIdentityCatalog.ts");
const promptDir = path.join(root, "docs", "assets", "character-prompts");

function createTsLoader() {
  const cache = new Map();

  function loadTsModule(filePath) {
    const resolved = path.resolve(filePath);
    if (cache.has(resolved)) return cache.get(resolved).exports;

    const source = fs.readFileSync(resolved, "utf8");
    const transpiled = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        esModuleInterop: true,
      },
      fileName: resolved,
    }).outputText;

    const module = { exports: {} };
    cache.set(resolved, module);

    function localRequire(specifier) {
      if (!specifier.startsWith(".")) return require(specifier);
      const base = path.resolve(path.dirname(resolved), specifier);
      if (fs.existsSync(base)) return require(base);
      if (fs.existsSync(`${base}.ts`)) return loadTsModule(`${base}.ts`);
      if (fs.existsSync(`${base}.js`)) return require(`${base}.js`);
      return require(base);
    }

    const fn = new Function("require", "module", "exports", "__filename", "__dirname", transpiled);
    fn(localRequire, module, module.exports, resolved, path.dirname(resolved));
    return module.exports;
  }

  return loadTsModule;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function loadCharacterIdentityCatalog() {
  const loadTsModule = createTsLoader();
  const catalog = loadTsModule(identityCatalogPath);
  return catalog.characterIdentityCatalogBatches.flatMap((batch) => batch.identities);
}

function loadCharacterRuntimeProfiles() {
  return readJson(runtimeProfileDataPath);
}

function loadCharacterPromptRecords() {
  if (!fs.existsSync(promptDir)) return [];
  return fs.readdirSync(promptDir)
    .filter((file) => /^characters-\d{4}-\d{4}\.json$/.test(file))
    .sort()
    .flatMap((file) => {
      const sheet = readJson(path.join(promptDir, file));
      return Array.isArray(sheet.images) ? sheet.images : [];
    });
}

function buildRuntimeCharacters() {
  const identities = loadCharacterIdentityCatalog();
  const identityById = new Map(identities.map((identity) => [identity.characterId, identity]));
  const promptRecords = loadCharacterPromptRecords();
  const neutralPortraitByCharacterId = new Map();

  for (const portrait of promptRecords) {
    if (portrait.expression !== "neutral" || neutralPortraitByCharacterId.has(portrait.characterId)) continue;
    neutralPortraitByCharacterId.set(portrait.characterId, portrait.outputFile);
  }

  const profiles = Object.values(loadCharacterRuntimeProfiles())
    .filter((profile) => typeof profile.runtimeIndex === "number")
    .sort((left, right) => left.runtimeIndex - right.runtimeIndex);

  return profiles.map((profile) => {
    const identity = identityById.get(profile.characterId);
    if (!identity) throw new Error(`Missing final identity profile for runtime character ${profile.characterId}`);

    return {
      characterId: profile.characterId,
      index: profile.runtimeIndex,
      name: identity.finalDisplayName,
      profession: identity.profession,
      professionSlug: profile.professionSlug,
      portraitFile: neutralPortraitByCharacterId.get(profile.characterId) || null,
      stallFile: null,
      isActive: profile.isActive,
      isMerchant: profile.isMerchant,
      isPlunderer: profile.isPlunderer,
      isTraveler: profile.isTraveler,
      isBeggar: profile.isBeggar,
      isSnitch: profile.isSnitch,
      vote: profile.vote,
      mythDeck: profile.mythDeck,
      mythDefeated: Boolean(profile.mythDefeated),
      companyJob: profile.companyJob,
      marketplaceIndex: profile.marketplaceIndex,
      dayAvailable: profile.dayAvailable,
      marketplaces: profile.marketplaces,
      maxObtainValue: profile.maxObtainValue,
      frugalPercent: profile.frugalPercent,
      hagglePercent: profile.hagglePercent,
      closeToDealPercent: profile.closeToDealPercent,
      reachingDealPercent: profile.reachingDealPercent,
      farFromDealPercent: profile.farFromDealPercent,
      dialogue: profile.dialogueBehavior,
      bias: profile.tradeBias,
      obtainableItems: profile.obtainableItems,
      excludedObtainItems: profile.excludedObtainItems,
      inventory: [],
    };
  });
}

module.exports = {
  buildRuntimeCharacters,
  loadCharacterIdentityCatalog,
  loadCharacterPromptRecords,
  loadCharacterRuntimeProfiles,
  runtimeProfileDataPath,
};
