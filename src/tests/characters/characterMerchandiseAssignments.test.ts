import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assignments from '@/content/characters/merchandise/assignments.json';
import characterMerchandiseItems from '@/content/items/catalog/character-merchandise-items.json';

const promptDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../docs/assets/item-prompts');
const missingItemPrompts = fs.readdirSync(promptDir)
  .filter((file) => /^missing-character-merchandise-items-\d{4}-\d{4}\.json$/.test(file))
  .sort()
  .flatMap((file) => JSON.parse(fs.readFileSync(path.join(promptDir, file), 'utf8')).slots || []);

describe('character merchandise assignments', () => {
  it('assigns actual button stock to the button seller', () => {
    const buttonSeller = assignments.find((assignment) => assignment.characterId === 'character-167');
    expect(buttonSeller).toBeTruthy();
    expect(buttonSeller?.stockPools.map((pool) => pool.tag)).toEqual(expect.arrayContaining(['tailoring_buttons', 'buttons']));
    expect(buttonSeller?.missingItemIds).toContain('character_merchandise_tailoring_buttons');
  });

  it('adds icon prompts for every new character merchandise item', () => {
    const promptIds = new Set(missingItemPrompts.map((item) => item.itemId));
    for (const item of characterMerchandiseItems) {
      expect(promptIds.has(item.id)).toBe(true);
    }
  });

  it('does not keep noisy broad text matches in curated stock', () => {
    const serialized = JSON.stringify(assignments).toLowerCase();
    expect(serialized).not.toContain('company_stake');
    expect(serialized).not.toContain('ponderings of the infinite ledger');
    expect(serialized).not.toContain('blueglass ore sample');
    expect(serialized).not.toContain('cauldron');
  });
});
