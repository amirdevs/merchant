# Development Technical Notes

## Stack

- Package manager: `pnpm`
- App: React 18, TypeScript, Vite
- Styling: Tailwind CSS v4
- Icons: `lucide-react`

Do not use npm for installs or scripts unless explicitly asked.

## Branches

Current active overhaul branch: `main`.

GitHub repository metadata may still show `master` as the default branch. See `docs/development/main-branch-validation.md` before opening new work, changing GitHub settings, or merging branch history.

## Commands

```powershell
pnpm install
pnpm dev
pnpm dev:web
pnpm build
```

Current-state verification:

```powershell
pnpm verify:current-state
```

Focused checks:

```powershell
pnpm test
pnpm test:barter
pnpm audit:data
pnpm audit:assets
pnpm audit:stock
pnpm review:stock
```

Item and asset pipeline helpers:

```powershell
pnpm generate:icon-prompts
pnpm rename:item-icons
pnpm sync:ui-assets
pnpm rewrite:item-catalog
pnpm enrich:item-catalog
pnpm extract:data
```

## Data

Generated game data lives in:

- `src/data/generated/items.json`
- `src/data/generated/characters.json`
- `src/data/generated/marketplaces.json`
- `src/data/generated/professions.json`
- `src/data/generated/kingdoms.json`

Data types are in `src/data/types.ts`.

Run this after generated data, item catalog, stock profile, or script prompt changes:

```powershell
pnpm audit:data
pnpm audit:stock
pnpm review:stock
```


## Save Schema

Current save schema: `SAVE_VERSION = 2` with schema label `item-catalog-2026-06-v2`.

This is a clean break from pre-overhaul saves because inventory entries still use `itemIndex`, and the item catalog was recreated. Older saves are shown as incompatible in the Save/Load screen instead of loading silently with wrong item references. See `docs/development/save-schema.md`.

## Asset Resolution

Item icons are resolved by:

- `src/lib/assets.ts`
- `itemIconAsset(file)` returns `/game-assets/items/${file}`

Portraits, stalls, towns, routes, maps, and backdrops use other helpers in the same file.

Run this after icon rename, icon generation, icon cropping, or item `iconFile` changes:

```powershell
pnpm audit:assets
```

## Scripts

- `scripts/verify-current-state.cjs`: runs the current full verification sequence.
- `scripts/extract-data.cjs`: extracts original game data.
- `scripts/audit-data.cjs`: validates generated data.
- `scripts/audit-assets.cjs`: validates runtime asset references.
- `scripts/audit-stock.cjs`: validates stock profile/archetype token coverage.
- `scripts/review-stock.cjs`: generates deterministic profession stock samples and balance diagnostics in `docs/systems/profession-stock-review.md`, including generated-data bias previews.
- `scripts/generate-icon-prompts.cjs`: generates item icon prompt JSONs in `docs/assets/icon-prompts`.
- `scripts/rename-item-icons.cjs`: legacy item icon rename utility.
- `scripts/sync-ui-assets.cjs`: synchronizes UI asset references.
- `scripts/rewrite-item-catalog.cjs`: rewrites item catalog metadata.
- `scripts/enrich-item-catalog.cjs`: enriches item catalog metadata.
- `scripts/crop-icon-sheet.ps1`: cropper for generated icon sheets.

Do not commit `dist/` build output.

## Git Hygiene

- Work from `main` unless explicitly instructed otherwise.
- Do not run destructive git resets.
- Do not restore deleted assets unless asked.
- Ignore unrelated dirty files.
- When committing, prefer small Conventional Commits:
  - `feat(assets): update icon prompts`
  - `feat(ui): improve inventory`
  - `fix(trade): clarify offer feedback`
  - `chore(docs): sync stock verification docs`
