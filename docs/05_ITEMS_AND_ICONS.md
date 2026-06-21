# 05 - Items And Icons

## Item catalog

The item catalog is generated under `src/data/generated/items.json` and now carries richer item metadata such as family, subfamily, forms, trade role, rarity, storage needs, market behavior, and icon file.

Inventory still references item indexes in current runtime structures, so save schema v2 blocks older saves after the catalog rewrite.

## Icon pipeline

Important folders:

- `docs/assets/icon-prompts/` - prompt configs and manifest
- `docs/assets/icon-sheets/` - generated sheet images for review/cropping
- `public/game-assets/items/` - final runtime item icons
- `scripts/generate-icon-prompts.cjs` - creates prompt configs
- `scripts/audit-item-icons.cjs` - structural icon lock audit

## Icon standards

- Each item must have a valid runtime `iconFile`.
- Quantity variants must match the item policy: `one`, and when required, `few` and `many`.
- No missing runtime icons.
- No orphan item icons after lock, unless intentionally documented.
- Visual identity still needs manual review; automated audit only proves structural completeness.

## Validation

Run:

```powershell
pnpm audit:item-icons
```

The item icon lock report and manual review CSV are generated logs and should be placed under `docs/logs/`.
