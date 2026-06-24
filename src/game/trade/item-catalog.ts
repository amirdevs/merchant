import type { Item } from "@/shared/types/game-data";

export function normalizeItemToken(value: string) {
  return value.toLowerCase().replace(/[_-]+/g, " ").trim();
}

export function itemCatalogTokens(item: Item) {
  const tokens = new Set<string>();
  const add = (value: unknown) => {
    if (typeof value !== "string" || !value.trim()) return;
    tokens.add(normalizeItemToken(value));
  };
  const addMany = (values: unknown) => {
    if (!Array.isArray(values)) return;
    for (const value of values) add(value);
  };

  add(item.id);
  add(item.name);
  add(item.displayName);
  add(item.family);
  add(item.subfamily);
  add(item.tradeRole);
  add(item.rarityBand);
  add(item.bulkProfile);
  add(item.decayProfile);
  addMany(item.tags);
  addMany(item.forms);
  addMany(item.professionUses);
  addMany(item.regions);
  addMany(item.sources);
  addMany(item.qualityBands);
  addMany(item.storageNeeds);
  addMany(item.marketBehavior);

  for (const values of Object.values(item.categoryAxes || {})) addMany(values);

  return tokens;
}

export function itemMatchesCatalogToken(item: Item, token: string) {
  return itemCatalogTokens(item).has(normalizeItemToken(token));
}
