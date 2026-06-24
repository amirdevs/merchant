# 00 - Read Me First

This is the first doc to read.

## Current docs reading order

1. `00_READ_ME_FIRST.md` - rules, reading path, and what is current vs log-only.
2. `01_PROJECT_OVERVIEW.md` - what the project is and current scope.
3. `02_DEVELOPMENT_SETUP.md` - commands, scripts, validation, and repo hygiene.
4. `03_GAME_LOGIC_AND_ROADMAP.md` - implemented game logic, playable UI roadmap, character profile plan, portrait gates, quest overhaul gates, and vertical-slice milestones.
5. `04_TRADING_AND_STOCK.md` - NPC stock, generated-data bias, barter, Ask Price, Ask Offer.
6. `05_ITEMS_AND_ICONS.md` - item catalog, icon pipeline, and item-art lock rules.
7. `06_ECONOMY_AND_TRAVEL.md` - money, capacity, travel, risk, market loop.
8. `07_QUESTS_COMPANY_AND_UI.md` - current quest/runtime helpers, contracts, dialogue runtime, company layer, UI view models.
9. `08_UI_UX_DIRECTION.md` - visual direction and UI style rules.
10. `09_RICH_QUEST_SYSTEM_BIBLE.md` - new original rich quest system, main campaign, quest writing rules, quest schema, endings, and vertical-slice quest direction.

## What is source of truth

The numbered docs above are the current source-of-truth docs. `03_GAME_LOGIC_AND_ROADMAP.md` is the only roadmap doc.

## What is not source of truth

`docs/logs/` is for generated reports, old phase notes, temporary audits, one-time handoffs, and historical context. Read logs only when debugging a specific report or past migration.

## Documentation rules

- Permanent docs must be numbered under `/docs`.
- Generated/log-only docs must be under `/docs/logs`.
- Do not add per-step completion docs or root delivery-note docs.
- Update an existing roadmap/system doc instead of creating new docs unless a major new source-of-truth doc is explicitly approved.
- Do not add unnumbered Markdown docs under `/docs`, `/docs/game`, `/docs/systems`, or `/docs/development`.
- Asset production folders can remain under `/docs/assets/` if they contain configs, manifests, images, or asset rules rather than prose source-of-truth docs.
- Item prompt files belong under `/docs/assets/icon-prompts/`.
- Character prompt files belong under `/docs/assets/character-prompts/`.
