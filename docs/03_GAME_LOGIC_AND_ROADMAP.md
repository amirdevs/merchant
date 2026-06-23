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

## Portrait generation and crop gate

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

The first quest overhaul milestone should deliver:

1. New quest schema and state model.
2. New rich quest bible and writing rules.
3. Main campaign act structure.
4. First 25 main quest drafts.
5. First 10 NPC questline outlines.
6. First 30 side quest concepts.
7. First 20 repeatable contract templates.
8. Quest journal UI direction that shows story, stakes, choices, and consequences.
9. Legacy quest data deprecated from creative/runtime direction.
10. First vertical-slice quest chain implemented and testable.

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

After portraits are cropped and integrated, the first playable quest chain should be:

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

## Post-crop to vertical-slice roadmap

After cropped portraits are good, the game roadmap is:

1. **Portrait asset lock** - verify all 722 portraits exist, are valid, and have no visible filename labels.
2. **Runtime portrait manifest** - connect each character expression to the correct file path.
3. **Character UI integration** - show new portraits/names/stories in markets, barter, dialogue, quests, and company screens.
4. **Quest Overhaul V1** - replace old quest content direction with the new rich merchant quest system.
5. **First vertical-slice quest chain** - implement the five-quest chain listed above.
6. **Playable merchant loop v1** - start in one town, meet NPCs, buy goods, travel, sell for profit, complete a quest, unlock company progress, and save.
7. **Relationship and consequence pass** - make NPC trust, city reputation, market prices, and route access react to quest choices.
8. **Company progression pass** - register company, lease warehouse, hire first clerk, and unlock caravan papers.
9. **Balance/playtest pass** - tune profit, deadlines, travel cost, risk, quest rewards, and reputation gains.
10. **UI/UX polish pass** - make the loop readable, beautiful, and easy to understand.

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
- confirmed quest overhaul direction: original rich merchant stories, main campaign goals, character questlines, consequences, and multiple endings.

Remaining:

- review/crop/clean all generated portrait sheets into `public/assets/portraits/characters/`;
- wire remake character identity and portraits into the runtime UI;
- add audits for missing portraits, duplicate display names, original-name leaks, missing stories, missing role tags, and orphan files;
- deprecate old reference quest content from gameplay direction;
- create the new quest catalog and state/effect model;
- implement the first five-quest vertical-slice chain;
- connect quest consequences to NPC trust, reputation, market state, routes, and company unlocks;
- polish the playable merchant loop v1.
