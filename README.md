# Merchant React/Electron Remake

Offline remake prototype using React, Electron, Vite, Tailwind 4, and local extracted game assets/data.

## Commands

```powershell
pnpm install
pnpm dev
```

For a browser-only dev run:

```powershell
pnpm dev:web
```

Build:

```powershell
pnpm build
```

Audit extracted content and asset references:

```powershell
pnpm audit:data
```

Run built Electron shell after build:

```powershell
pnpm electron
```

Package an offline Windows folder:

```powershell
pnpm package:win
```

The package is written to `release/MerchantOfflineRemake-win`. If packaging reports a missing Electron runtime, repair the Electron install first:

```powershell
pnpm install --force
```

## Data And Assets

- Data is extracted from the original bundled renderer into `src/data/generated`.
- Assets are copied into `public/game-assets`.
- Re-extract data with:

```powershell
pnpm extract:data
```

## Current Scope

This is a playable vertical slice, not a full clone yet:

- town/customer selection
- original characters/items/markets data
- original town, backdrop, portrait, and stall images
- generated NPC inventories
- player inventory
- offer panels
- haggling valuation using NPC preferences
- travel between connected markets
- local save/load with import/export
- offline mod packs from `public/data/mods`
- market quest/event notes
- routed original UI, item, travel, and ambient sounds

Steam and online systems are not included.

## Docs

Project documentation is indexed in `docs/README.md`.

- Gameplay roadmap and parity: `docs/game/roadmap-and-parity.md`
- UI/UX brief: `docs/game/ui-ux-brief.md`
- Asset pipeline: `docs/assets/asset-pipeline.md`
- Technical notes: `docs/development/technical-notes.md`
