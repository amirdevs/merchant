# 03 - Game Logic And Roadmap

This is the only roadmap doc. Keep current gameplay status, character/portrait gates, quest-overhaul gates, and vertical-slice milestones here instead of adding per-step completion docs.

## Current foundation status

- Loads generated reference data from `src/data/generated`, with remake layers for systems that need original public-facing content.
- Supports local save/load/import/export with the current save envelope.
- Inventory, barter, stock, economy, travel, company, law, rivals, contracts, and legacy quest helpers exist as foundation systems.
- Character portrait runtime integration is complete enough for gameplay: final cropped portraits live under `public/assets/portraits/characters/`, have a manifest, and pass the portrait audit gate.
- Rich Quest System Foundation exists as source data, state helpers, effect helpers, selectors, journal view models, and focused tests.
- The first playable merchant loop now exists as a small story-rich vertical slice: buy, travel, sell, progress rich quests, see consequences, and register the first company.
- Phase 6 moves that loop into the main GameState/save/export model through the `playableLoop` runtime field.
- Phase 7 adds the first economy/world expansion layer: town stock pressure, dynamic prices, route risk events, tuned regional items, company upgrade candidates, expansion towns, and next quest seeds.

## Confirmed remake direction

The remake should not keep old reference-game public-facing content as the creative target.

Confirmed replacement areas:

1. **Characters** - use original remake names, portraits, stories, role tags, and dialogue flavor while keeping mechanical anchors stable until deeper runtime migration is safe.
2. **Quests** - replace old marketplace quests with original rich merchant stories, meaningful choices, and campaign goals.
3. **Playable loop** - prioritize a real playable vertical slice before producing more loose assets.
4. **GameState runtime** - playable features should persist through the main save/export model instead of private local-only prototype slots.

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
first UI surfaces using remake-facing character identities
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

Phase 6 moves the playable loop from a standalone/local-only prototype into the project-wide runtime model.

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
The old standalone local-storage loop remains only as a fallback for isolated component testing.
```

Validation:

```powershell
pnpm test:runtime-loop
pnpm playtest:runtime-loop
pnpm verify:current-state
pnpm build
```

### Phase 7 - Economy, World, and Content Expansion Pack

Phase 7 expands the saved playable merchant loop into a richer merchant-world foundation without adding random filler.

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

Validation:

```powershell
pnpm test:economy-world
pnpm playtest:economy-world
pnpm verify:current-state
pnpm build
```

## Compact roadmap from here

Keep phases large so the user does not need constant ZIP/unZIP work.

### Phase 8 - Full Vertical Slice Polish

Goal: make the current game feel like a proper demo/alpha.

Includes:

```text
market/travel/journal/company/inventory flow polish
tutorial guidance inside story UI
balance tuning
consequence visibility polish
save/load/export edge-case pass
old-system cleanup where migration is complete
manual release/playtest checklist
```

## Rule for future expansion

Do not expand content randomly. Each expansion should make the playable merchant loop deeper, more readable, more story-rich, or more consequential.

### Phase 8 - Full Vertical Slice Polish Pack

Phase 8 turns the current saved merchant loop into a clean alpha-style vertical slice before more content is added.

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
large player-flow checklist from start to company registration
save/load runtime check
trade-profit clarity check
travel-purpose check
rich quest chain engagement check
company milestone check
visible consequence check
economy/world hook check
player guidance check
release checklist and cleanup guards
Journal UI panel for full vertical-slice polish
```

Validation:

```powershell
pnpm test:vertical-polish
pnpm playtest:vertical-polish
pnpm verify:current-state
pnpm build
```

## Compact roadmap after Phase 8

The foundation is now character-integrated, quest-rich, persistent, consequence-visible, economy-aware, and alpha-polished. Future work should not be another foundation rewrite. Use larger expansion packs only:

```text
1. Expand playable content only when it supports the current loop.
2. Add more real quests from the quest bible.
3. Expand towns/routes/items after the starter loop remains stable.
4. Replace old world visuals and remaining legacy scaffolding when the new runtime equivalent exists.
5. Keep every new feature tied to trade, story, company progression, or visible consequences.
```
