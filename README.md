# Merchant React/Vite Remake

Offline React/Vite remake prototype using extracted Merchant-style data, local assets, and new replacement systems for trading, stock, items, travel, quests, company management, UI integration, and original character/portrait replacement.

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
- playable UI integration through the Strategy Planner
- character rework planning for replacing original visible NPC identities
- useful-new-NPC seed and identity catalog data under `src/data/characters/`
- playtest/balance report generation
- offline local save/load and import/export

Steam and online systems are not included.

## Documentation Reading Order

Read docs in order from `docs/00_READ_ME_FIRST.md` through `docs/08_UI_UX_DIRECTION.md`.

Current source-of-truth docs:

```text
00_READ_ME_FIRST.md
01_PROJECT_OVERVIEW.md
02_DEVELOPMENT_SETUP.md
03_GAME_LOGIC_AND_ROADMAP.md
04_TRADING_AND_STOCK.md
05_ITEMS_AND_ICONS.md
06_ECONOMY_AND_TRAVEL.md
07_QUESTS_COMPANY_AND_UI.md
08_UI_UX_DIRECTION.md
```

Generated reports, old phase notes, audit outputs, and historical notes belong under `docs/logs/` and are not part of the normal reading path.

Asset prompt configs are kept under `docs/assets/`:

- `docs/assets/icon-prompts/` for item icon sheets
- `docs/assets/character-prompts/` for character portrait JSON manifests, expression sheets, and prompt rules
