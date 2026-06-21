# Merchant React/Vite Remake

Offline React/Vite remake prototype using extracted Merchant-style data, local assets, and new replacement systems for trading, stock, items, travel, quests, company management, and UI integration.

## Commands

```powershell
pnpm install
pnpm dev
pnpm build
```

Core validation:

```powershell
pnpm verify:current-state
```

Useful targeted checks:

```powershell
pnpm audit:data
pnpm audit:assets
pnpm audit:item-icons
pnpm audit:stock
pnpm review:stock
pnpm playtest:balance
pnpm test:barter
pnpm test:economy
pnpm test:travel
pnpm test:quests
pnpm test:company
pnpm test:ui-integration
pnpm test:playtest
```

## Current Scope

This is a playable local vertical-slice foundation, not a full clone yet. It currently includes:

- generated original data loading
- new item catalog/icon pipeline
- profession-aware NPC stock and restocking
- old generated-data bias as mild stock/trade flavor
- barter valuation, Ask Price, Ask Offer, and regression tests
- save schema v2 clean break
- item/icon structural lock checks
- economy, capacity, travel, quest, company, and UI-integration helper foundations
- playtest/balance report generation
- offline local save/load and import/export

Steam and online systems are not included.

## Documentation Reading Order

Read docs in order from `docs/00_READ_ME_FIRST.md` to `docs/08_UI_UX_DIRECTION.md`.

Generated reports, old phase notes, audit outputs, and historical notes belong under `docs/logs/` and are not part of the normal reading path.
