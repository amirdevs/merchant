# 03 - Game Logic And Roadmap

This is the only roadmap doc. Keep gameplay status, character/portrait gates, quest-system gates, vertical-slice milestones, structure status, and expansion milestones here instead of adding per-step completion docs.

## Current foundation status

- The app loads core runtime data and current character-profile systems.
- Runtime character behavior now lives in typed character runtime profiles, while visible identity resolves through the final character profile catalog and portrait manifest.
- Save, load, import, and export use the current save envelope.
- Inventory, barter, stock, economy, travel, company, law, rivals, contracts, and quest foundation helpers exist as foundation systems.
- Runtime character portraits live under `public/assets/portraits/characters/`, have a manifest, and pass the portrait audit gate.
- Rich quest foundations exist as authored quest data, state helpers, effect helpers, selectors, journal view models, and focused tests.
- The first merchant loop exists as a story-rich vertical slice: buy, travel, sell, progress rich quests, see consequences, and register the first company.
- The playable loop persists through `GameState.playableLoop`.
- Economy and world helpers exist for stock pressure, dynamic prices, route risk events, tuned regional items, company upgrade candidates, expansion towns, and upcoming quest seeds.
- Vertical-slice polish helpers exist for alpha-readiness scoring, player-flow checklist, save/load readiness, consequence visibility, and release/playtest guidance.
- The project now uses the domain-based structure described in `docs/02_DEVELOPMENT_SETUP.md`.

## Confirmed project direction

The project should prioritize playable, original merchant-game systems over loose asset production.

Confirmed areas:

1. **Characters** - use current production names, portraits, stories, role tags, and dialogue flavor while keeping mechanical anchors stable during runtime integration work.
2. **Quests** - expand the quest foundation into rich merchant stories, meaningful choices, and campaign goals.
3. **Playable loop** - prioritize a real playable vertical slice before producing more loose assets.
4. **GameState runtime** - playable features should persist through the main save/export model.
5. **Expansion** - expand the actual game using the current domain-based structure.

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
src/content/characters/runtime/profiles.ts
src/game/characters/characterPortraitManifest.ts
src/tests/characters/characterPortraitManifest.test.ts
scripts/audits/audit-character-portraits.cjs
scripts/audits/audit-runtime-characters.cjs
```

Runtime character validation blocks raw roster files, direct `characters.json` imports, stale portrait/stall filenames, and runtime/profile mapping drift.

Character sheet files under `docs/assets/character-sheets/` are supporting art assets, not runtime assets. After final portraits are locked, they can stay as optional production files unless the user wants a slimmer repository.

## Quest direction

The current marketplace quest foundation is a starting content layer that should keep expanding into richer stories over time.

The quest direction is defined in:

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

The player begins with a merchant ledger containing debts, favors, forged contracts, hidden route rights, and guild crimes. Through trade, reputation, routes, company growth, and alliances, the player decides what kind of merchant world they will create.

## Implemented large phases

### Phase 1 - Character Runtime Integration Pack

Implemented:

```text
character portrait manifest
runtime portrait selectors
portrait audit gate
first UI surfaces using production character identities
AGENTS/docs order fix for the quest bible
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
src/game/vertical-slice/game-runtime-loop.ts
src/tests/runtime/game-runtime-loop.test.ts
src/features/journal/PlayableMerchantLoopPanel.tsx
src/features/journal/JournalView.tsx
scripts/playtests/playtest-runtime-loop.cjs
docs/logs/runtime-loop-save-report.md
```

Implemented runtime behavior:

```text
GameState receives a `playableLoop` field when the Journal loop is opened.
Loop actions commit to the live GameState object.
Loop actions autosave the primary ledger through the normal save system.
The serialized save/export payload includes loop town, day, copper, cargo, profit, rich quest chain, company state, consequences, town reputation, NPC trust, and loop ledger.
Development-only manual test paths can exist only when they do not compete with the main GameState runtime.
```

### Phase 7 - Economy, World, and Content Expansion Pack

Implemented source files:

```text
src/game/vertical-slice/economy-world-expansion.ts
src/tests/vertical-slice/economy-world-expansion.test.ts
src/features/journal/EconomyWorldExpansionPanel.tsx
scripts/playtests/playtest-economy-world.cjs
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
8 upcoming playable quest seeds from the quest bible
world-readiness score for deciding when the slice is ready to expand
Journal UI panel for economy/world expansion visibility
```

### Phase 8 - Full Vertical Slice Polish Pack

Implemented source files:

```text
src/game/vertical-slice/vertical-slice-polish.ts
src/tests/vertical-slice/vertical-slice-polish.test.ts
src/features/journal/VerticalSlicePolishPanel.tsx
src/features/journal/JournalView.tsx
scripts/playtests/playtest-vertical-slice-polish.cjs
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

## Project Structure Pass status

The project structure is now organized by domain:

```text
src/app/       app shell and app-specific state/control code
src/content/   authored/static game content and catalogs
src/game/      pure gameplay/domain logic and runtime helpers
src/features/  screen-level UI surfaces
src/shared/    reusable utilities, types, hooks, constants, and generic components
src/tests/     grouped tests by domain
scripts/audits/       audit gates
scripts/playtests/    playtest/report generators
scripts/generators/   content and asset generation helpers
scripts/maintenance/  validation and maintenance orchestrators
```

Structure rules going forward:

```text
1. Put gameplay rules in src/game/.
2. Put authored content in src/content/.
3. Put screen-level UI in src/features/.
4. Put generic utilities and shared UI in src/shared/.
5. Put grouped tests in src/tests/.
6. Keep scripts grouped by task type.
7. Do not add root handoff docs or temporary notes.
8. Keep all current gates green: verify:current-state and build must pass.
```

## Current next milestone - Expansion Pack 1: Starter Region Expansion

Do not expand content randomly. Each expansion should make the playable merchant loop deeper, more readable, more story-rich, or more consequential.

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

## Later expansion roadmap

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
Keep the domain structure clean.
Then expand the actual game, not support-only files.
```
