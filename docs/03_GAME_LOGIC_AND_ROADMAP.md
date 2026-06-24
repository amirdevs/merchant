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

## Phase 4 - Playable Merchant Loop v1 Pack

Phase 4 turns the portrait + quest foundation into the first complete merchant loop. The goal is not to expand the whole world yet; the goal is to prove the real game rhythm in a small region before more towns, more items, and more questlines are added.

Implemented source files:

```text
src/lib/playable-merchant-loop.ts
src/lib/playable-merchant-loop.test.ts
src/features/journal/PlayableMerchantLoopPanel.tsx
src/features/journal/JournalView.tsx
scripts/playtest-merchant-loop.cjs
```

Implemented vertical-slice scope:

```text
3 towns:
- Sunwake Harbor
- Riverwake Mill
- Brasskeep Gate

6 loop items:
- Coastal Salt
- Mill Flour
- Lamp Oil
- Dyed Wool
- Ledger Paper
- Iron Nails

first route/profit loop:
Sunwake Harbor -> buy Coastal Salt -> travel to Riverwake Mill -> sell for profit

first story loop:
First Honest Profit -> Bread Before Dawn -> The False Scale -> Warehouse Lease -> A Name on the Door

first company unlock:
finish the story chain -> open company ledger -> register Sunwake Ledger Company
```

Implemented runtime behavior:

```text
buy cargo
sell cargo
track average cost and realized profit
travel between vertical-slice towns
charge travel cost and advance day
record visited towns and route history
show best nearby profit routes
bridge the first rich quest chain into the merchant loop
block company registration before story readiness
register the first company after the chain completes
write a readable ledger entry for each meaningful action
persist the loop in browser local storage under merchant-playable-loop-v1
```

Implemented UI behavior:

```text
Journal now shows Playable Merchant Loop v1 above the standalone rich quest chain.
The loop panel shows current town, copper, profit, cargo, local prices, best nearby routes, story gate, loop goals, company readiness, and ledger entries.
The panel includes quick vertical-slice actions for buy, travel, sell, resolve story gate, register company, run demo, and reset.
```

Validation:

```powershell
pnpm test:merchant-loop
pnpm playtest:merchant-loop
pnpm verify:current-state
```

Important note:

```text
Phase 4 is still a focused vertical-slice runtime. It intentionally keeps the loop small and readable so balance, UI, and consequence clarity can be judged before expanding the full world.
Phase 5 should polish consequences, balance, UI readability, and save/export integration before adding more towns or questlines.
```

## Large implementation roadmap from here

Remaining large phase:

1. **Phase 5 - Consequence, Balance, and UI Polish Pack**: tune profit margins, quest rewards, deadlines, travel cost, route risk, company unlock pacing, and consequence visibility; polish the market, barter, journal, and company surfaces around the new character portraits and story-rich quests; connect save/export more cleanly; hide or retire old quest UI paths that no longer match the remake; prepare the expansion plan after the vertical slice feels good.

## Phase 5 completed - consequence, balance, and UI polish pack

Phase 5 turns the first playable merchant loop from a functional prototype into a clearer playtest surface. It also fixes the Phase 4 JSX build blocker caused by a raw `>` character inside JSX route text.

Implemented scope:

```text
build blocker fixed:
- route cards now render the town arrow safely with JSX-safe text

consequence visibility:
- town reputation per vertical-slice town
- NPC trust tracking for quest givers
- public trust score
- shadow heat score
- company readiness score
- named consequence flags for important player actions

balance visibility:
- money pressure signal
- profit clarity signal
- route-use signal
- story progress signal
- company readiness signal
- next recommended player action

UI polish:
- Journal merchant loop panel now surfaces balance signals and consequences beside the trade loop
- route cards show risk and use a safe arrow
- consequence cards explain why player choices matter
- ledger remains readable and story-friendly
```

Validation:

```powershell
pnpm test:merchant-polish
pnpm test:merchant-loop
pnpm playtest:merchant-loop-polish
pnpm verify:current-state
pnpm build
```

Large roadmap after Phase 5:

1. **Save / GameState Integration Pack**: move the playable merchant loop and rich quest states from local-storage-only prototype state into the project-wide game state/save/export model, while preserving backward compatibility for existing local test saves.
2. **World Expansion Pack 1**: expand the vertical slice from 3 towns to a larger connected region with more original towns, route events, regional shortages, and market consequences.
3. **Questline Expansion Pack 1**: implement more rich questlines from the quest bible as playable chains, not only drafts. Each chain must include story scenes, trade pressure, choices, consequences, and follow-up memory.
4. **Company Systems Pack 1**: deepen the first company after registration with warehouse capacity, first clerk tasks, contracts, remote shipments, ledger summaries, and company reputation.
5. **Full UI/UX Cohesion Pack**: polish market, barter, journal, company, and strategy screens around the new portraits, rich quests, consequences, and company progression.

Do not expand content randomly. Each expansion should make the playable merchant loop deeper, more readable, and more story-rich.
