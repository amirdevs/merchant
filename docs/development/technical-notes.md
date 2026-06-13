# Development Technical Notes

## Stack

- Package manager: `pnpm`
- App: React 18, TypeScript, Vite, Electron
- Styling: Tailwind CSS v4
- Icons: `lucide-react`

Do not use npm for installs or scripts unless explicitly asked.

## Commands

```powershell
pnpm dev
pnpm dev:web
pnpm build
pnpm audit:data
pnpm generate:icon-prompts
pnpm rename:item-icons
pnpm package:win
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
```

## Asset Resolution

Item icons are resolved by:

- `src/lib/assets.ts`
- `itemIconAsset(file)` returns `/game-assets/items/${file}`

Portraits, stalls, towns, routes, maps, and backdrops use other helpers in the same file.

## Scripts

- `scripts/extract-data.cjs`: extracts original game data.
- `scripts/audit-data.cjs`: validates generated data.
- `scripts/generate-icon-prompts.cjs`: generates item icon prompt JSONs in `docs/assets/icon-prompts`.
- `scripts/rename-item-icons.cjs`: legacy item icon rename utility.
- `scripts/crop-icon-sheet.ps1`: cropper for generated icon sheets.
- `scripts/package-win.cjs`: Windows packaging helper.

## Packaging

The package output is written to:

- `release/MerchantOfflineRemake-win`

Do not commit `dist/` or `release/` build output.

If packaging reports a missing Electron runtime, repair Electron install:

```powershell
pnpm install --force
```

## Git Hygiene

- The worktree may include intentional deletions of old generated assets.
- Do not run destructive git resets.
- Do not restore deleted assets unless asked.
- Ignore unrelated dirty files.
- When committing, prefer small Conventional Commits:
  - `feat(assets): update icon prompts`
  - `feat(ui): improve inventory`
  - `fix(trade): clarify offer feedback`

