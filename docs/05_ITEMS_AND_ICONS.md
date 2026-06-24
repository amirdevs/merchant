# 05 - Items And Icons

## Item catalog

The current item data module uses chunked files under `src/data/generated/items-*.json`, with `src/data/generated/items.chunked.ts` as the runtime aggregator. Script-side reads and writes should go through `scripts/item-catalog.cjs`.

Inventory still references item indexes in current runtime structures, so save schema v2 blocks incompatible saves from earlier schema versions.

Catalog design should keep items original to this project, practical for trade, and structured enough for stock, quests, market demand, icon generation, and future economy systems. Prefer bright coastal fantasy merchant goods with clear families, subfamilies, trade roles, storage needs, market behavior, quantity forms, and profession uses.

Avoid lore names that feel imported from a different content set, borrowed book/company/faction naming, and thin synonym swaps that make catalog identity inconsistent.

## Icon pipeline

Important folders:

- `docs/assets/icon-prompts/` - prompt configs and manifest
- `docs/assets/icon-sheets/` - icon sheet images for review/cropping
- `public/assets/items/` - final runtime item icons
- `scripts/generate-icon-prompts.cjs` - creates prompt configs
- `scripts/audit-item-icons.cjs` - structural icon lock audit

## Icon standards

- Each item must have a valid runtime `iconFile`.
- Quantity variants must match the item policy: `one`, and when required, `few` and `many`.
- No missing runtime icons.
- No orphan item icons after lock, unless intentionally documented.
- Visual identity still needs manual review; automated audit only proves structural completeness.
- Prompt configs and sheet order are authoritative. Do not rename, reorder, simplify, or guess icon filenames.
- Item sheets use exact JSON order, left-to-right and top-to-bottom.
- Keep pure green `#00FF00` sheet backgrounds only as a crop aid; final runtime icons must be transparent PNGs.
- Do not crop failed, unmatched, semantically wrong, or unsafe sheets into runtime assets.
- Use object-aware safe cropping when exact grid cropping would clip an item or include a neighboring item fragment.
- Final accepted item icons should be 1024x1024 transparent PNGs unless a future runtime requirement changes the target.
- Large image assets should be Git LFS tracked; reports, CSVs, HTML indexes, JSON configs, and source code stay in normal Git.

## Validation

Run:

```powershell
pnpm audit:item-icons
```

The item icon lock report and manual review CSV are generated logs and should be placed under `docs/logs/`.
