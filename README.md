# Merchant React/Vite Remake

Offline remake prototype using React, Vite, Tailwind 4, and local extracted game assets/data.

## Commands

```powershell
pnpm install
pnpm dev
```

Build:

```powershell
pnpm build
```

Audit extracted content and asset references:

```powershell
pnpm audit:data
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

- Gameplay roadmap and parity: `docs/game/roadmap-and-parity.md`
- UI/UX brief: `docs/game/ui-ux-brief.md`
- Current UI reference images: `docs/ui_parts/`
- UI regeneration backlog and prompts: `docs/ui-regeneration/`
- Older UI wireframes, not a current visual target: `docs/game/core-ui-wireframes.md`
- Asset pipeline: `docs/assets/asset-pipeline.md`
- Technical notes: `docs/development/technical-notes.md`
