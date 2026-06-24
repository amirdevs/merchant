# 03 - Game Logic And Roadmap

This is the only roadmap doc. Keep current gameplay status, next UI work, character/portrait gates, quest-overhaul gates, and vertical-slice milestones here instead of adding per-step completion docs.

## Current foundation status

- Loads generated reference data from `src/data/generated`, with a remake layer for systems that need original public-facing content.
- Supports local save/load/import/export with save schema v2 after the item rewrite. Old pre-overhaul saves are intentionally blocked instead of silently migrated.
- Inventory entries track quantity, offer quantity, protection, and concealment. Protected goods cannot be offered, and concealed goods are ignored by auto-offer matching.
- Barter valuation uses item value, NPC/profession/market/kingdom bias, exotic/import effects, frugality, haggling, illegal risk, and heat.
- NPC stock is generated from stock tiers, archetypes, profession profiles, lifestyle baselines, named overrides, and generated-data bias.
- Economy helpers cover wallet value, denominations, inventory value, capacity, affordability, and trade summaries.
- Travel helpers cover route lookup, tolls, stallage, risk preview, capacity blockers, illegal cargo warnings, and arrival summaries.
- Quest/runtime helpers currently support typed state transactions, contracts, item consumption, rewards, market unlocks, and dialogue logs, but quest content must be overhauled for the remake.
- Company helpers support warehouses, shipments, insurance, cash, valuation, agents, shares, and dividends.
- The Strategy Planner exposes the first playable UI integration pass for trade, cargo, routes, quests/contracts, company state, and action blockers.
- Character portrait runtime integration now has a manifest, selectors, tests, and an audit gate for the final cropped portrait assets.

## Confirmed remake direction

The remake should not keep old reference-game public-facing content as the creative target.

Confirmed replacement areas:

1. **Characters** - replace public-facing names, stories, portraits, role tags, and dialogue flavor while keeping mechanical anchors stable until runtime migration is safe.
2. **Quests** - replace old marketplace quests with a new original rich quest system focused on merchant stories, meaningful choices, and campaign goals.
3. **Playable loop** - after portraits and quests are integrated, focus on a vertical slice instead of producing more loose assets.

## Next playable UI work

1. Polish trade intelligence directly inside the barter screen.
2. Add exact route planner cards to the travel confirmation and arrival flow.
3. Replace journal status buttons with full typed quest/contract transactions.
4. Add real shipment cargo selection, warehouse capacity decisions, company ledger, and shareholder UI.
5. Run manual playtest and balance tuning after the workflows are visible.
6. Continue visual/UI polish against `docs/ui_parts/` and the bright painterly merchant RPG direction.

## Character rework phase plan

Visible character identity must be original. Keep generated indexes stable as mechanical anchors until runtime migration is safe, but replace public-facing names, portraits, dialogue flavor, looks, stories, and identity.

Current character planning data lives in:

```text
src/data/characters/newUsefulNpcSeeds.ts
src/data/characters/legacyCharacterAuditPlan.ts
src/data/characters/finalCharacterRosterPlan.ts
src/data/characters/characterIdentityCatalogBatch01.ts
src/data/characters/characterIdentityCatalogBatch02.ts
src/data/characters/characterIdentityCatalogLegacyBatch01.ts
src/data/characters/characterIdentityCatalogLegacyBatch02.ts
src/data/characters/characterIdentityCatalogLegacyBatch03.ts
src/data/characters/characterIdentityCatalogLegacyBatch04.ts
src/data/characters/characterIdentityCatalog.ts
src/data/characters/characterPortraitManifest.ts
```

Current planning targets:

```text
203 generated reference records
48 useful new NPC identities complete
194 useful-new-NPC portrait prompts complete
192 legacy reworked identities complete across batches 001-004
528 legacy portrait prompts complete across batches 001-004
240 visible character identities prepared before final roster review
722 prepared portrait prompts in final all-cast sheet order
```

Current production prompt files live under `docs/assets/character-prompts/` and are named like item prompt ranges:

```text
characters-0001-0012.json
characters-0013-0024.json
characters-0025-0036.json
...
characters-0721-0722.json
```

Generate character sheets in filename order. Do not use old category names such as useful, legacy, new-npcs, identity, batch group, test, template, or manifest as generation order.

Character work should move in larger useful chunks:

1. useful-new-NPC identity catalog and portrait manifests are complete;
2. legacy identity catalog and portrait manifests are complete;
3. final visible roster, expression counts, and all-cast sheet order are normalized;
4. generate full portrait sheets only after all character prompts are finished and reviewed;
5. crop and clean the generated sheets into runtime portrait assets;
6. integrate remake identities and portraits into market, barter, quest, and company UI.

## Portrait generation, crop, and runtime gate

Portrait generation uses the final `docs/assets/character-prompts/characters-*.json` files.

Approved sheet direction:

```text
3 columns x 4 rows
12 portraits per sheet
one continuous flat #00FF00 background
filename labels are allowed only as generation/cropping aids when required by the latest prompt JSON
crop by JSON row/column/order/outputFile
if generated resolution is smaller than the JSON canvas, scale the crop grid proportionally
```

After cropping, final runtime portraits should be placed under:

```text
public/assets/portraits/characters/
```

The crop/integration gate passes only when:

```text
722 expected portrait files exist
0 missing portrait files
0 orphan portrait files
0 duplicate output filenames
0 visible magenta filename labels remain after cleanup
all files are valid PNGs
all filenames match JSON outputFile values
```

The runtime manifest and audit now live in:

```text
src/data/characters/characterPortraitManifest.ts
src/data/characters/characterPortraitManifest.test.ts
scripts/audit-character-portraits.cjs
```

The generated portrait lock report is:

```text
docs/logs/character-portrait-lock-report.md
```

## Character runtime integration status

Phase 1 connects the cropped portrait set to runtime selectors instead of requiring screens to guess file paths.

Implemented Phase 1 scope:

1. Runtime manifest imports the final `characters-*.json` prompt files and exposes 722 output-file records.
2. Character identity profiles are connected to portrait expressions by `characterId`.
3. Legacy generated indexes map to `npc-legacy-###` identities while keeping mechanical indexes stable.
4. Runtime portrait paths resolve to `/assets/portraits/characters/*.png`.
5. Market hub, customer dossier, barter screen, and dialogue helpers use remake-facing names, professions, stories, market flavor, role tags, and portraits.
6. The audit checks prompt count/order, missing portraits, orphan portraits, invalid PNG/LFS pointer files, nonsquare crops, remaining pure magenta labels, duplicate display names, old generated-name leaks, and identity catalog story/tag field coverage.

Remaining character/UI follow-up after Phase 1:

- Continue replacing old visible flavor in screens not touched by the first runtime integration pass.
- Use expression switching more deeply once quest choices and barter outcomes drive richer emotional states.
- Add important useful-new-NPC placement into the first vertical-slice region when the quest system needs them.
- Retire old portrait asset paths after the new screens no longer need fallbacks.

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

The quest system should support three layers:

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

Quest Overhaul V1 content target:

```text
25 rich main campaign quests
10 important NPC questlines
30 rich side quests
20 repeatable trade contract templates
5+ possible campaign endings
```

Do not implement 100 quests first. Build the quest system and a small vertical slice before expanding the catalog.

## Quest Overhaul V1 milestone

The next large implementation phase should deliver:

1. New quest schema and state model.
2. New rich quest bible and writing rules reflected in source quest data.
3. Main campaign act structure in data files.
4. First 25 main quest drafts.
5. First 10 NPC questline outlines.
6. First 30 side quest concepts.
7. First 20 repeatable contract templates.
8. Quest journal UI direction that shows story, stakes, choices, and consequences.
9. Legacy quest data deprecated from creative/runtime direction.
10. First vertical-slice quest chain prepared for implementation.

Target implementation split:

```text
src/data/quests/questCatalog.ts
src/data/quests/mainCampaignQuests.ts
src/data/quests/characterQuestlines.ts
src/data/quests/sideQuests.ts
src/data/quests/repeatableContractTemplates.ts
src/lib/quest-state.ts
src/lib/quest-effects.ts
src/lib/quest-selectors.ts
src/lib/quest-journal-view-model.ts
```

Exact file names can change during implementation, but content, state, effects, generated contracts, and UI view models should stay separated.

## First vertical-slice quest chain

After portraits are integrated, the first playable quest chain should be:

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

1. **Phase 2 - Rich Quest System Foundation + Content Pack**: schema, states, requirements, rewards, consequences, effect engine, quest selectors, journal view models, 25 main quest drafts, 10 NPC questlines, 30 side quests, 20 repeatable contract templates, tests, and docs updates.
2. **Phase 3 - First Playable Story Chain Pack**: implement the first five-quest chain as actual gameplay with acceptance, stages, choices, outcomes, persistence, dialogue text, expression switching, and tests.
3. **Phase 4 - Playable Merchant Loop v1 Pack**: tune a two/three-town vertical-slice region with 10-20 items, 10-15 important NPCs, travel, profit routes, quest consequences, first company unlock, onboarding, and a manual playtest report.
4. **Phase 5 - Consequence, Balance, and UI Polish Pack**: tune profit/rewards/deadlines/travel risk, show consequences clearly, polish quest/cards/market/barter/company UI, fix save/load rough edges, and prepare expansion.

## What is done / what remains

Done:

- foundation systems for stock, barter, economy, travel, quests, company, UI view models, and playtest/report checks;
- playable Strategy Planner integration pass;
- useful new NPC seed roster;
- legacy character audit plan and final roster target;
- useful-new-NPC identity catalog, 48 characters / 194 portrait prompts;
- legacy identity batches 001-004, 192 characters / 528 portrait prompts;
- normalized character prompt files, 61 JSON files / 722 portrait prompts;
- approved portrait style gate: charming, slightly cartoony, fantasy ancestry variety, single flat green background, crop-safe spacing;
- cropped portrait assets placed under `public/assets/portraits/characters/`;
- runtime character portrait manifest, selectors, audit script, and focused manifest tests;
- first UI integration pass for remake character names, portraits, stories, market flavor, and dialogue helpers;
- confirmed quest overhaul direction: original rich merchant stories, main campaign goals, character questlines, consequences, and multiple endings.

Remaining:

- run and review `pnpm audit:character-portraits` after `git lfs pull` on the local machine;
- continue removing old visible flavor from screens not covered by Phase 1;
- deprecate old reference quest content from gameplay direction;
- create the new quest catalog and state/effect model;
- implement the first five-quest vertical-slice chain;
- connect quest consequences to NPC trust, reputation, market state, routes, and company unlocks;
- polish the playable merchant loop v1.
