# 03 - Game Logic And Roadmap

This is the only roadmap doc. Keep current gameplay status, character/portrait gates, quest-overhaul gates, and vertical-slice milestones here instead of adding per-step completion docs.

## Current foundation status

- Loads generated reference data from `src/data/generated`, with current character-profile systems layered over archived seed content.
- Supports local save/load/import/export with the current save envelope.
- Inventory, barter, stock, economy, travel, company, law, rivals, contracts, and transitional quest helpers exist as foundation systems.
- Character portrait runtime integration is complete enough for gameplay: final cropped portraits live under `public/assets/portraits/characters/`, have a manifest, and pass the portrait audit gate.
- Rich Quest System Foundation exists as source data, state helpers, effect helpers, selectors, journal view models, and focused tests.
- The first playable merchant loop now exists as a small story-rich vertical slice: buy, travel, sell, progress rich quests, see consequences, and register the first company.
- The playable loop is now persisted through the project-wide `GameState.playableLoop` runtime field instead of being only a local prototype.
- Economy/world expansion helpers exist for stock pressure, dynamic prices, route risk events, tuned regional items, company upgrade candidates, expansion towns, and next quest seeds.
- Vertical-slice polish helpers exist for alpha-readiness scoring, player-flow checklist, save/load readiness, consequence visibility, and release/playtest guidance.

## Confirmed project direction

The project should not keep archived source public-facing content as the creative target.

Confirmed replacement areas:

1. **Characters** - use the current production names, portraits, stories, role tags, and dialogue flavor while keeping mechanical anchors stable until deeper runtime migration is safe.
2. **Quests** - replace old marketplace quests with original rich merchant stories, meaningful choices, and campaign goals.
3. **Playable loop** - prioritize a real playable vertical slice before producing more loose assets.
4. **GameState runtime** - playable features should persist through the main save/export model instead of private local-only prototype slots.
5. **Expansion** - expand the actual game after cleanup, not the old scaffolding.

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

Generated character sheet PNGs under `docs/assets/character-sheets/` are production intermediates, not runtime assets. After final portraits are locked, they are cleanup candidates unless the user explicitly wants to keep them in the repo.

## Quest overhaul direction

The current placeholder marketplace quests are not the final target. They should be treated as temporary scaffolding until replaced.

The new quest direction is defined in:

```text
docs/09_RICH_QUEST_SYSTEM_BIBLE.md
```

Core rule:

```text
A quest is not a todo.
A quest is a merchant story with a person, a pressure, a trade problem, a choice, a consequence, and a reward.
```

Confirmed campaign premise:

```text
The Ledger That Bought a City
```

The player begins with an old merchant ledger containing debts, favors, forged contracts, hidden route rights, and guild crimes. Through trade, reputation, routes, company growth, and alliances, the player decides what kind of merchant world they will create.

## Implemented large phases

### Phase 1 - Character Runtime Integration Pack

Implemented:

```text
character portrait manifest
runtime portrait selectors
portrait audit gate
first UI surfaces using production character identities
AGENTS/docs order fix for the new quest bible
```

### Phase 2 - Rich Quest System Foundation + Content Pack

Implemented:

```text
25 rich main campaign quest drafts
10 important NPC questline outlines
30 rich side quest concepts
20 repeatable trade contract templates
6 possible campaign endings
rich quest states, effects, selectors, and journal view models
focused rich quest tests
```

### Phase 3 - First Playable Story Chain Pack

Implemented the first five-quest chain:

```text
First Honest Profit
Bread Before Dawn
The False Scale
Warehouse Lease
A Name on the Door
```

The chain supports acceptance, stages, choices, consequences, quest notes, ending pressure, sequential unlocks, and company-registration readiness.

### Phase 4 - Playable Merchant Loop v1 Pack

Implemented the first playable loop:

```text
3 towns: Sunwake Harbor, Riverwake Mill, Brasskeep Gate
6 loop items: Coastal Salt, Mill Flour, Lamp Oil, Dyed Wool, Ledger Paper, Iron Nails
first route/profit loop: buy salt at Sunwake -> travel to Riverwake -> sell for profit
first story loop: five rich quests
first company unlock: finish chain -> open ledger -> register company
```

### Phase 5 - Consequence, Balance, and UI Polish Pack

Implemented:

```text
build blocker fix
town reputation
NPC trust
public trust
shadow heat
company readiness
visible consequence flags
balance signals
next recommended action
Journal UI polish for the loop panel
```

### Phase 6 - Real Game Runtime Integration Pack

Implemented source files:

```text
src/lib/game-runtime-loop.ts
src/lib/game-runtime-loop.test.ts
src/features/journal/PlayableMerchantLoopPanel.tsx
src/features/journal/JournalView.tsx
scripts/playtest-runtime-loop.cjs
docs/logs/runtime-loop-save-report.md
```

Implemented runtime behavior:

```text
GameState receives a `playableLoop` field when the Journal loop is opened.
Loop actions commit to the live GameState object.
Loop actions autosave the primary ledger through the normal save system.
The serialized save/export payload includes loop town, day, copper, cargo, profit, rich quest chain, company state, consequences, town reputation, NPC trust, and loop ledger.
The old standalone local-storage loop should now be treated as a cleanup candidate, not a long-term runtime path.
```

### Phase 7 - Economy, World, and Content Expansion Pack

Implemented source files:

```text
src/lib/economy-world-expansion.ts
src/lib/economy-world-expansion.test.ts
src/features/journal/EconomyWorldExpansionPanel.tsx
scripts/playtest-economy-world.cjs
docs/logs/economy-world-expansion-report.md
```

Implemented behavior:

```text
18 tuned trade items split between starter, regional, and company-use goods
current-town stock pressure rows
dynamic prices affected by scarcity, public trust, shadow heat, and company registration
route risk events affected by saved consequence state
company upgrade candidates after registration
three expansion-town identities: Appleford Orchard, Glassmere Court, Wolfhook Bay
8 next playable quest seeds from the quest bible
world-readiness score for deciding when the slice is ready to expand
Journal UI panel for economy/world expansion visibility
```

### Phase 8 - Full Vertical Slice Polish Pack

Implemented source files:

```text
src/lib/vertical-slice-polish.ts
src/lib/vertical-slice-polish.test.ts
src/features/journal/VerticalSlicePolishPanel.tsx
src/features/journal/JournalView.tsx
scripts/playtest-vertical-slice-polish.cjs
docs/logs/vertical-slice-polish-report.md
```

Implemented behavior:

```text
alpha-readiness score for the current playable loop
player-flow checklist from start to company registration
save/load runtime readiness check
trade-profit clarity check
travel-purpose check
rich quest chain engagement check
company milestone check
visible consequence check
economy/world hook check
player guidance check
Journal UI panel for full vertical-slice polish
release checklist and cleanup guards
focused vertical-slice polish tests
manual vertical-slice playtest report
```

## Current next milestone - Project Cleanup Gate

Before adding more content, clean the project.

Goal:

```text
remove stale prototype files, old public visual assets, obsolete fallbacks, duplicate runtime paths, unused UI images, and retired handoff/prod files so the next expansion phase starts from a lean codebase.
```

The root work order for Codex is:

```text
PROJECT_CLEANUP_REMOVAL_PLAN.md
```

That file is temporary and should be deleted or moved to `docs/logs/` after the cleanup pass is completed.

Cleanup priorities:

```text
1. Remove unnecessary runtime fallbacks now that GameState runtime persistence exists.
2. Stop exposing old marketplace quests as current gameplay.
3. Remove old character portrait/stall runtime paths and public assets after the portrait gate passes.
4. Delete generated character sheet production images if final cropped portraits are locked.
5. Delete unused public UI images after a reference-based audit.
6. Remove obsolete one-time scripts and package commands.
7. Remove duplicate/debug-only UI panels or gate them behind development-only paths.
8. Keep all current gates green: verify:current-state and build must pass.
```

## Expansion roadmap after cleanup

Do not expand content randomly. Each expansion should make the playable merchant loop deeper, more readable, more story-rich, or more consequential.

### Expansion Pack 1 - Starter Region Expansion

Goal: make the first region feel real.

Includes:

```text
6-8 towns
40-60 tuned trade items
15-20 playable quests
10-15 important NPCs
route events
town-specific supply/demand
more company unlocks
starter-region balance pass
```

### Expansion Pack 2 - Campaign + NPC Questlines

Goal: make the game story-driven.

Includes:

```text
Act 1 fully playable
Act 2 partly playable
5-10 NPC personal questlines
rival merchant introduction
choice consequences
alternate quest endings
stronger journal/dialogue presentation
```

### Expansion Pack 3 - Company / Economy Endgame

Goal: make long-term progression worth playing.

Includes:

```text
warehouse levels
clerks
caravans
guild rank
branch offices
bulk contracts
market control
rival company pressure
first ending path
```

## Rule for future expansion

```text
Clean first.
Then expand the actual game, not the old scaffold.
```
