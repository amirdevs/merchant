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

Run the current full validation gate:

```powershell
pnpm verify:current-state
```

Useful focused checks:

```powershell
pnpm audit:data
pnpm audit:assets
pnpm audit:item-icons
pnpm audit:stock
pnpm review:stock
pnpm test:barter
pnpm test:economy
pnpm test:travel
pnpm test:quests
pnpm test:company
pnpm test:ui-integration
pnpm test:playtest
pnpm playtest:balance
```

## Data And Assets

- Data is extracted from the original bundled renderer into `src/data/generated`.
- Assets are copied into `public/game-assets`.
- Item/icon lock reports live under `docs/assets/`.
- Re-extract data with:

```powershell
pnpm extract:data
```

## Current Scope

This is a playable vertical slice foundation, not a full clone yet:

- town/customer selection
- original characters/items/markets data
- original town, backdrop, portrait, and stall images
- generated NPC inventories with profession stock profiles, lifestyle baselines, and generated-data bias flavor
- player inventory
- offer panels
- haggling valuation using NPC, profession, market, kingdom, illegal-good, and relationship inputs
- travel helper foundation with toll, risk, capacity, and arrival planning
- local save/load with schema-v2 clean break for the item overhaul
- offline mod packs from `public/data/mods`
- quest/contract/dialogue runtime foundation
- company, warehouse, shipment, and stock-ownership foundation helpers
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
- Profession stock review: `docs/systems/profession-stock-review.md`
- Profession stock audit: `docs/systems/profession-stock-audit.md`
- Item icon pipeline: `docs/assets/item-icon-pipeline.md`
- Item icon lock report: `docs/assets/item-icon-lock-report.md`
- Playtest/balance report: `docs/development/playtest-balance-report.md`
- Technical notes: `docs/development/technical-notes.md`
