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

Run built Electron shell after build:

```powershell
pnpm electron
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
- local save/load

Steam and online systems are not included.

## Version Plan

The implementation order is tracked in `docs/version-plan.md`. The current direction is original gameplay parity first, with modern UI and quality-of-life changes layered on after the baseline rules are stable.
