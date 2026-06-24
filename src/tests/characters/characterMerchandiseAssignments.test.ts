import { describe, expect, it } from "vitest";
import { characterMerchandiseAssignments } from "@/content/characters/merchandise";
import { characterIdentityCatalogBatches } from "@/content/characters/profiles";
import { buildRuntimeCharacters } from "@/content/characters/runtime";
import { itemsChunked } from "@/content/items/catalog";

const identities = characterIdentityCatalogBatches.flatMap((batch) => batch.identities);
const identityIds = new Set(identities.map((identity) => identity.characterId));
const itemTokens = new Set(
  itemsChunked.flatMap((item) => [
    item.id,
    item.name,
    item.displayName,
    item.family,
    item.subfamily,
    item.tradeRole,
    ...(item.tags || []),
  ].filter(Boolean).map((token) => String(token).toLowerCase())),
);

describe("character merchandise assignments", () => {
  it("only references known character profiles", () => {
    for (const assignment of characterMerchandiseAssignments) {
      expect(identityIds.has(assignment.characterId)).toBe(true);
    }
  });

  it("uses stock tags that resolve against the item catalog", () => {
    for (const assignment of characterMerchandiseAssignments) {
      for (const pool of assignment.stockPools) {
        const tag = pool.tag.toLowerCase();
        expect(itemTokens.has(tag) || [...itemTokens].some((token) => token.includes(tag) || tag.includes(token))).toBe(true);
      }
    }
  });

  it("merges assigned merchandise into runtime stock pools", () => {
    const characters = buildRuntimeCharacters({ identities });
    const characterById = new Map(characters.map((character) => [character.characterId, character]));
    for (const assignment of characterMerchandiseAssignments) {
      const character = characterById.get(assignment.characterId);
      expect(character).toBeTruthy();
      for (const pool of assignment.stockPools) {
        expect(character?.obtainableItems.some((entry) => entry.tag === pool.tag)).toBe(true);
      }
    }
  });
});
