# Development Technical Notes

## Stack

- Package manager: `pnpm`
- App: React 18, TypeScript, Vite
- Styling: Tailwind CSS v4
- Icons: `lucide-react`

Do not use npm for installs or scripts unless explicitly asked.

## Commands

```powershell
pnpm dev
pnpm dev:web
pnpm build
pnpm test
pnpm test:barter
pnpm test:economy
pnpm test:travel
pnpm verify:current-state
pnpm audit:data
pnpm audit:assets
pnpm audit:item-icons
pnpm audit:stock
pnpm review:stock
pnpm generate:icon-prompts
pnpm rename:item-icons
```

## Data

Generated game data lives in:

- `src/data/generated/items.json`
- `src/data/generated/characters.json`
- `src/data/generated/marketplaces.json`
- `src/data/generated/professions.json`
- `src/data/generated/kingdoms.json`

Data types are in `src/data/types.ts`.

Run this after data or script prompt changes:

```powershell
pnpm audit:data
pnpm audit:item-icons
pnpm audit:assets
```

## Asset Resolution

Item icons are resolved by:

- `src/lib/assets.ts`
- `itemIconAsset(file)` returns `/game-assets/items/${file}`

Portraits, stalls, towns, routes, maps, and backdrops use other helpers in the same file.

## Scripts

- `scripts/extract-data.cjs`: extracts original game data.
- `scripts/audit-data.cjs`: validates generated data.
- `scripts/audit-assets.cjs`: validates broad runtime asset references.
- `scripts/audit-item-icons.cjs`: validates item icons, quantity variants, duplicate references, orphan files, and writes item icon lock reports.
- `scripts/audit-stock.cjs`: validates stock profile/archetype token coverage.
- `scripts/review-stock.cjs`: writes profession stock review output.
- `scripts/verify-current-state.cjs`: runs the current validation gate.
- `scripts/generate-icon-prompts.cjs`: generates item icon prompt JSONs in `docs/assets/icon-prompts`.
- `scripts/rename-item-icons.cjs`: legacy item icon rename utility.
- `scripts/crop-icon-sheet.ps1`: cropper for generated icon sheets.

Do not commit `dist/` build output.

## Git Hygiene

- The active overhaul branch is `main`; the repository may still report `master` as default until GitHub settings are updated.
- The worktree may include intentional deletions of old generated assets.
- Do not run destructive git resets.
- Do not restore deleted assets unless asked.
- Ignore unrelated dirty files.
- When committing, prefer small Conventional Commits:
  - `feat(assets): lock item icons`
  - `feat(ui): improve inventory`
  - `fix(trade): clarify offer feedback`


## Economy Foundation

Shared money, wallet, inventory value, and capacity helpers live in:

- `src/lib/economy.ts`
- `src/lib/economy.test.ts`

Use these helpers for tolls, fees, future NPC budget checks, warehouses, shipments, and company ledger calculations instead of duplicating coin math in UI or feature code.
