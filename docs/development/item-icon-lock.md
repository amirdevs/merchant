# Item/Icon Lock

Step 5 makes the item and icon layer safe enough to build economy, quests, and company systems on top of it.

## Commands

```powershell
pnpm audit:item-icons
pnpm verify:current-state
```

`pnpm audit:item-icons` checks the runtime item icon data and the generated icon prompt output slots.

It writes:

- `docs/assets/item-icon-lock-report.md`
- `docs/assets/item-icon-lock-report.json`
- `docs/assets/item-icon-manual-review.csv`

## What The Audit Checks

Blocking errors:

- missing `iconFile` values;
- missing runtime icon files;
- empty icon files;
- unsupported icon extensions;
- unsafe icon paths;
- missing one/few/many generated output files;
- duplicate prompt output targets;
- prompt slot count mismatches;
- manifest count mismatches;
- quantity variant policy mismatches.

Warnings:

- duplicate runtime icon references;
- orphan item icon files;
- non-normalized icon paths;
- prompt slots whose stored `iconFile` is stale compared with current item data.

## Quantity Variant Policy

The icon prompt generator decides whether an item needs only `one` or all `one/few/many` variants from item metadata.

The lock audit compares current `items.json` against `docs/assets/icon-prompts/items-*.json` and checks that the expected final files exist under `public/game-assets/items/`.

## Manual Visual Review

The script cannot know whether an image visually matches its item name.

Use `docs/assets/item-icon-manual-review.csv` for the visual pass. Fill:

- `reviewStatus`: `pass`, `regenerate`, `wrong-item`, `bad-quantity`, `bad-crop`, `duplicate`, or `needs-discussion`;
- `reviewNotes`: short reason or regeneration note.

High-priority manual review buckets:

1. items used in stock profiles: currency, food, ore, ingots, coal, tools, arrows, bows, meat, spices, grain, seeds, drinks, barrels;
2. expensive/rare/luxury items;
3. illegal/contraband items;
4. items with `few` and `many` variants;
5. any duplicate runtime icon references.

## Lock Rule

Do not start heavy economy, quest, or company work until:

```powershell
pnpm audit:item-icons
pnpm verify:current-state
```

pass, and the manual CSV has no high-priority `wrong-item` or `bad-quantity` rows.
