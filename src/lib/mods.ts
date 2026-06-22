import type { Character, Item, Marketplace, Profession } from "../data/types";

const MOD_ROOT = "/data/mods";

export type ModPack = {
  name?: string;
  items?: Array<Partial<Item> & { index: number }>;
  characters?: Array<Partial<Character> & { index: number }>;
  marketplaces?: Array<Partial<Marketplace> & { index: number }>;
  professions?: Record<string, Partial<Profession>>;
};

export type ModLoadResult = {
  loaded: number;
  skipped: number;
  names: string[];
};

async function fetchJson<T>(url: string) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`Failed to load ${url}`);
  return (await response.json()) as T;
}

export async function loadModPacks(): Promise<ModPack[]> {
  const manifest = await fetchJson<{ mods?: string[] }>(`${MOD_ROOT}/manifest.json`);
  const files = manifest.mods || [];
  const packs: ModPack[] = [];

  for (const file of files) {
    if (!file.endsWith(".json") || file.includes("..")) continue;
    packs.push(await fetchJson<ModPack>(`${MOD_ROOT}/${file}`));
  }

  return packs;
}

function patchByIndex<T extends { index: number }>(target: T[], patches: Array<Partial<T> & { index: number }> | undefined) {
  if (!patches) return;
  for (const patch of patches) {
    const existing = target.find((entry) => entry.index === patch.index);
    if (existing) Object.assign(existing, patch);
    else target.push(patch as T);
  }
}

export async function applyModPacks(options: {
  items: Item[];
  characters: Character[];
  marketplaces: Marketplace[];
  professions: Record<string, Profession>;
}): Promise<ModLoadResult> {
  let packs: ModPack[] = [];
  try {
    packs = await loadModPacks();
  } catch {
    return { loaded: 0, skipped: 1, names: [] };
  }

  for (const pack of packs) {
    patchByIndex(options.items, pack.items);
    patchByIndex(options.characters, pack.characters);
    patchByIndex(options.marketplaces, pack.marketplaces);
    for (const [slug, patch] of Object.entries(pack.professions || {})) {
      options.professions[slug] = { ...(options.professions[slug] || { slug }), ...patch };
    }
  }

  return {
    loaded: packs.length,
    skipped: 0,
    names: packs.map((pack, index) => pack.name || `Mod ${index + 1}`),
  };
}
