# Agent Roadmap - Technical Notes

## Data

Generated game data lives in:

- `src/data/generated/items.json`
- `src/data/generated/characters.json`
- `src/data/generated/marketplaces.json`
- `src/data/generated/professions.json`
- `src/data/generated/kingdoms.json`

Data types are in `src/data/types.ts`.

Run:

```powershell
pnpm audit:data
```

after data changes.

## Asset Resolution

Item icons are resolved by:

- `src/lib/assets.ts`
- `itemIconAsset(file)` returns `/game-assets/items/${file}`

Portraits/stalls/towns/routes/maps use other helpers in the same file.

## Current Scripts

- `scripts/extract-data.cjs`: extracts original game data
- `scripts/audit-data.cjs`: validates generated data
- `scripts/generate-icon-prompts.cjs`: generates item icon prompt JSONs
- `scripts/rename-item-icons.cjs`: previous item-name rename utility; may be less relevant after icon remake
- `scripts/crop-icon-sheet.ps1`: cropper from previous asset pass
- `scripts/package-win.cjs`: packaging helper

## Build

Use:

```powershell
pnpm dev
pnpm dev:web
pnpm build
```

Do not use npm.

## Git Hygiene

- The worktree may include intentional deletions of old generated assets.
- Do not run destructive git resets.
- Do not restore deleted assets unless asked.
- When committing, prefer small conventional commits:
  - `feat(assets): update icon prompts`
  - `feat(ui): improve inventory`
  - `fix(trade): clarify offer feedback`

