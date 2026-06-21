# Merchant React/Vite Remake

Offline remake prototype using React, Vite, Tailwind 4, and local extracted game assets/data.

> Current overhaul branch: `main`.
>
> GitHub repository metadata still reports `master` as the default branch. The trading, item, stock-profile, routed UI, and regenerated item-icon work reviewed in this patch belongs to `main`. See `docs/development/main-branch-validation.md` before merging or opening new work.

## Commands

```powershell
pnpm install
pnpm dev
```

Build:

```powershell
pnpm build
```

Barter regression tests:

```powershell
pnpm test:barter
```

Run the full current-state verification pass after trading, item, icon, or stock-profile changes:

```powershell
pnpm verify:current-state
```

That command runs:

```powershell
pnpm audit:data
pnpm audit:assets
pnpm audit:stock
pnpm review:stock
pnpm test:barter
pnpm build
```

Run individual audits when iterating on one area:

```powershell
pnpm audit:data
pnpm audit:assets
pnpm audit:stock
pnpm review:stock
pnpm test:barter
```

`pnpm review:stock` writes `docs/systems/profession-stock-review.md` with deterministic profession stock samples, stack counts, value totals, coin reserve estimates, required-token gaps, and raw/material/finished/luxury composition.

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
- stock profiles by profession, tier, archetype, lifestyle baseline, generated-data bias, and named override
- player inventory
- item detail, filtering, sorting, protect/unprotect, and conceal/reveal
- offer panels
- Ask Price / Ask Offer
- haggling valuation using NPC preferences, profession bias, market bias, kingdom bias, relationship state, illegal-good pressure, market simulation hooks, and barter pressure
- travel between connected markets
- local save/load with import/export
- save schema version 2 with old item-catalog saves blocked instead of silently loading wrong item indexes
- offline mod packs from `public/data/mods`
- market quest/event notes
- routed original UI, item, travel, and ambient sounds

Steam and online systems are not included.

## Docs

Project documentation lives under `docs/`.

- Docs index: `docs/README.md`
- Main branch and verification note: `docs/development/main-branch-validation.md`
- Phase 0 to 3 patch notes: `docs/development/phase-0-to-3-changes.md`
- Save schema note: `docs/development/save-schema.md`
- Current roadmap: `docs/game/roadmap.md`
- Game logic parity: `docs/game/game-logic-parity.md`
- UI/UX brief: `docs/game/ui-ux-brief.md`
- Current UI reference images: `docs/ui_parts/`
- Trading and NPC stock system: `docs/systems/trading-and-stock.md`
- Profession stock audit: `docs/systems/profession-stock-audit.md`
- Generated profession stock review: `docs/systems/profession-stock-review.md`
- Item icon pipeline: `docs/assets/item-icon-pipeline.md`
- Technical notes: `docs/development/technical-notes.md`
