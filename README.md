# Merchant React/Vite Remake

Offline remake prototype using React, Vite, Tailwind 4, and local extracted game assets/data.

> Active development for the current overhaul is on `main`.

## Commands

```powershell
pnpm install
pnpm dev
```

Build:

```powershell
pnpm build
```

Run the current validation gate:

```powershell
pnpm verify:current-state
pnpm test:economy
```

Audit extracted content and asset references:

```powershell
pnpm audit:data
pnpm audit:assets
pnpm audit:item-icons
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

Project documentation lives under `docs/`.

- Docs index: `docs/README.md`
- Current roadmap: `docs/game/roadmap.md`
- Game logic parity: `docs/game/game-logic-parity.md`
- UI/UX brief: `docs/game/ui-ux-brief.md`
- Current UI reference images: `docs/ui_parts/`
- Trading and NPC stock system: `docs/systems/trading-and-stock.md`
- Profession stock audit: `docs/systems/profession-stock-audit.md`
- Item icon pipeline: `docs/assets/item-icon-pipeline.md`
- Item/icon lock process: `docs/development/item-icon-lock.md`
- Technical notes: `docs/development/technical-notes.md`

- Economy foundation: `docs/development/economy-foundation.md`
