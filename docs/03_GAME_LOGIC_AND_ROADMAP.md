# 03 - Game Logic And Roadmap

This is the only roadmap doc. Keep current gameplay status, next UI work, character/portrait gates, quest-overhaul gates, and vertical-slice milestones here instead of adding per-step completion docs.

## Current foundation status

- Loads generated reference data from `src/data/generated`, with remake layers for systems that need original public-facing content.
- Supports local save/load/import/export with save schema v2 after the item rewrite. Old pre-overhaul saves are intentionally blocked instead of silently migrated.
- Inventory entries track quantity, offer quantity, protection, and concealment. Protected goods cannot be offered, and concealed goods are ignored by auto-offer matching.
- Barter valuation uses item value, NPC/profession/market/kingdom bias, exotic/import effects, frugality, haggling, illegal risk, and heat.
- NPC stock is generated from stock tiers, archetypes, profession profiles, lifestyle baselines, named overrides, and generated-data bias.
- Economy helpers cover wallet value, denominations, inventory value, capacity, affordability, and trade summaries.
- Travel helpers cover route lookup, tolls, stallage, risk preview, capacity blockers, illegal cargo warnings, and arrival summaries.
- Company helpers support warehouses, shipments, insurance, cash, valuation, agents, shares, and dividends.
- The Strategy Planner exposes the first playable UI integration pass for trade, cargo, routes, quests/contracts, company state, and action blockers.
- Character portrait runtime integration has a manifest, selectors, tests, and an audit gate for the final cropped portrait assets.
- Rich Quest System Foundation now exists as source data, state helpers, effect helpers, selectors, journal view models, and focused tests.

## Confirmed remake direction

The remake should not keep old reference-game public-facing content as the creative target.

Confirmed replacement areas:

1. **Characters** - replace public-facing names, stories, portraits, role tags, and dialogue flavor while keeping mechanical anchors stable until runtime migration is safe.
2. **Quests** - replace old marketplace quests with a new original rich quest system focused on merchant stories, meaningful choices, and campaign goals.
3. **Playable loop** - after portraits and quests are integrated, focus on a vertical slice instead of producing more loose assets.

## Character runtime integration status

Final cropped runtime portraits live under:

```text
public/assets/portraits/characters/
```

The portrait gate passes only when:

```text
722 expected portrait files exist
0 missing portrait files
0 orphan portrait files
0 duplicate output filenames
0 visible magenta filename labels remain after cleanup
all files are valid PNGs
all filenames match JSON outputFile values
```

The runtime manifest and audit live in:

```text
src/data/characters/characterPortraitManifest.ts
src/data/characters/characterPortraitManifest.test.ts
scripts/audit-character-portraits.cjs
```

Phase 1 connected the cropped portrait set to runtime selectors and touched the first important UI surfaces. Remaining character/UI work should continue inside future gameplay phases instead of becoming another asset-only phase.

## Quest overhaul direction

The current reference-style marketplace quests are not the remake target. They should be treated as legacy scaffolding until replaced.

The new quest direction is defined in:

```text
docs/09_RICH_QUEST_SYSTEM_BIBLE.md
```

Core rule:

```text
A quest is not a todo.
A quest is a merchant story with a person, a pressure, a trade problem, a choice, a consequence, and a reward.
```

The quest system supports three layers:

| Layer | Purpose |
|---|---|
| Main campaign quests | Give the player long-term goals, progression, and endings. |
| Character questlines | Make important NPCs memorable and relationship-driven. |
| Side quests and contracts | Keep markets alive with rich side stories and repeatable trade work. |

Confirmed main campaign premise:

```text
The Ledger That Bought a City
```

The player begins with an old merchant ledger containing debts, favors, forged contracts, hidden route rights, and guild crimes. Through trade, reputation, routes, company growth, and alliances, the player decides what kind of merchant world they will create.

Confirmed campaign acts:

1. **The First Ledger** - learning trade and discovering hidden obligations.
2. **Roads and Debts** - travel, delivery, tolls, route risk, and disputed cargo.
3. **The Guild War** - faction pressure, market manipulation, rival merchants, and moral choices.
4. **The Company Charter** - company registration, warehouse, clerks, caravan rights, and guild seal.
5. **The Final Market** - endgame decisions, guild vote, rival ledger, and final market future.

Confirmed possible endings:

```text
Fair Trade Ending
Guildmaster Ending
Shadow Ledger Ending
Free Roads Ending
Coin Emperor Ending
Quiet Partner Ending
```

## Phase 2 - Rich Quest System Foundation + Content Pack

Phase 2 adds the new quest foundation without trying to make every quest playable in UI yet.

Implemented source files:

```text
src/data/quests/questTypes.ts
src/data/quests/questCatalog.ts
src/data/quests/mainCampaignQuests.ts
src/data/quests/characterQuestlines.ts
src/data/quests/sideQuests.ts
src/data/quests/repeatableContractTemplates.ts
src/data/quests/index.ts
src/lib/quest-state.ts
src/lib/quest-effects.ts
src/lib/quest-selectors.ts
src/lib/quest-journal-view-model.ts
src/lib/rich-quest-system.test.ts
```

Implemented content targets:

```text
25 rich main campaign quest drafts
10 important NPC questline outlines
30 rich side quest concepts
20 repeatable trade contract templates
6 possible campaign endings
5 approved vertical-slice quest IDs
```

Implemented runtime foundation:

```text
rich quest states: locked, available, offered, accepted, in_progress, ready_to_turn_in, completed, failed, expired, blocked
quest acceptance / stage advancement / completion helpers
choice outcome application
reward, consequence, and unlock helpers
campaign progress selectors
vertical-slice selectors
journal view models that expose story, stakes, approaches, rewards, consequences, NPCs, markets, and notes
```

Validation:

```powershell
pnpm test:rich-quests
pnpm test:quests
pnpm verify:current-state
```

## First vertical-slice quest chain

The first playable quest chain is:

1. **First Honest Profit** - teach trade margins through a story-framed sale.
2. **Bread Before Dawn** - solve an urgent shortage with multiple approaches.
3. **The False Scale** - expose, exploit, or ignore cheating market scales.
4. **Warehouse Lease** - unlock storage using reputation, money, or leverage.
5. **A Name on the Door** - register the first trading company.

This chain should test:

```text
quest acceptance
multi-stage objectives
item delivery
profit objective
NPC trust changes
city reputation changes
choice consequences
quest unlocks
company unlock
save/load persistence
quest journal readability
```

## Large implementation roadmap from here

Keep these phases large so the user does not need constant ZIP/unZIP work.

1. **Phase 3 - First Playable Story Chain Pack**: implement the first five-quest chain as actual gameplay with acceptance, stages, choices, outcomes, persistence, dialogue text, expression switching, and tests.
2. **Phase 4 - Playable Merchant Loop v1 Pack**: tune a two/three-town vertical-slice region with 10-20 items, 10-15 important NPCs, travel, profit routes, quest consequences, first company unlock, onboarding, and a manual playtest report.
3. **Phase 5 - Consequence, Balance, and UI Polish Pack**: tune profit/rewards/deadlines/travel risk, show consequences clearly, polish quest/cards/market/barter/company UI, fix save/load rough edges, and prepare expansion.

## What is done / what remains

Done:

- foundation systems for stock, barter, economy, travel, legacy quests, company, UI view models, and playtest/report checks;
- playable Strategy Planner integration pass;
- useful new NPC seed roster;
- legacy character audit plan and final roster target;
- useful-new-NPC identity catalog, 48 characters / 194 portrait prompts;
- legacy identity batches 001-004, 192 characters / 528 portrait prompts;
- normalized character prompt files, 61 JSON files / 722 portrait prompts;
- cropped portrait assets placed under `public/assets/portraits/characters/`;
- runtime character portrait manifest, selectors, audit script, and focused manifest tests;
- first UI integration pass for remake character names, portraits, stories, market flavor, and dialogue helpers;
- confirmed quest overhaul direction: original rich merchant stories, main campaign goals, character questlines, consequences, and multiple endings;
- Phase 2 rich quest foundation and source catalog.

Remaining:

- implement the first five-quest vertical-slice chain as real gameplay;
- connect rich quest state to save/load and UI actions;
- connect quest consequences to NPC trust, reputation, market state, routes, and company unlocks;
- continue removing old visible flavor from screens not covered by Phase 1;
- polish the playable merchant loop v1.

## Phase 3 - First Playable Story Chain Pack

Phase 3 turns the first five approved rich quests into a playable vertical-slice quest chain inside the Journal.

Implemented source files:

```text
src/lib/first-playable-quest-chain.ts
src/lib/first-playable-quest-chain.test.ts
src/features/journal/RichQuestChainPanel.tsx
src/features/journal/JournalView.tsx
```

Implemented gameplay scope:

```text
First Honest Profit -> Bread Before Dawn -> The False Scale -> Warehouse Lease -> A Name on the Door
```

Implemented runtime behavior:

```text
first quest starts available
later quests unlock only after the previous quest completes
quests can be accepted
quest stages can be advanced
quest choices can resolve the quest
choice rewards, consequences, unlocks, and ending pressure are applied through the rich quest effect helpers
final quest completion marks company registration readiness
progress is persisted in local browser storage under merchant-rich-quest-chain-v1 while deeper GameState save/export migration remains planned for Phase 4
```

Implemented UI behavior:

```text
Journal now puts the rich story chain above legacy local notices
quest cards show order, status, lock state, story hook, stage, stakes, merchant conflict, approaches, rewards, consequences, quest notes, ending pressure, and giver portrait
legacy local quest scaffolding remains visible but explicitly marked as migration-only
```

Validation:

```powershell
pnpm test:rich-quest-chain
pnpm test:rich-quests
pnpm test:quests
pnpm verify:current-state
```

Important note:

```text
Phase 3 uses browser-local rich quest persistence so the chain is playable immediately without risking the existing save schema.
Phase 4 should move this progress into GameState save/export and connect quest consequences to real inventory, city reputation, market state, route access, NPC trust, and company systems.
```
