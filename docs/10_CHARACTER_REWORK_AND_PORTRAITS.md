# 10 - Character Rework And Portraits

This document is the source-of-truth roadmap for replacing all visible character identity, adding useful new NPCs before portrait generation, and preparing portrait prompt batches that can be generated and cropped consistently.

## Current starting point

The generated character file currently contains 203 original character records. The first record is index `0` and the last known record is index `202`, so the current extracted/generated base should be treated as 203 records until a new audit says otherwise.

Original generated character records must not be treated as final public-facing identity. They can remain as mechanical/internal references for indexes, market assignments, stock behavior, quest references, and save/runtime compatibility.

## Main goal

Replace the visible cast with original characters:

- new names;
- new looks;
- new portraits;
- short story descriptions;
- profession-specific visual traits;
- role tags;
- trade personality;
- expression portrait variants;
- useful new NPCs for trading, travel, quests, company, warehouse, route risk, and market flavor.

## Important decision

Useful new NPCs should be added before the full portrait generation pass.

Reason: portrait generation and cropping is expensive. The final roster should be planned first so the project does not generate/crop 200 portraits, later add 50 NPCs, and then need a second portrait pipeline.

## Roadmap

### C0 - Character audit and dependency map

Purpose: understand the existing 203 records before touching visible identity.

Tasks:

1. Count total records, active records, merchants, travelers, guards, beggars, snitches, myth/special characters, inactive characters, and market assignments.
2. Identify records referenced by quests, dialogue runtime, market queues, company systems, tests, or stock generation.
3. Mark weak or duplicate NPCs.
4. Mark characters that should become hidden/disabled instead of deleted.
5. Produce a log report under `docs/logs/character-rework-audit.md`.

Do not delete original character records in this phase.

### C1 - Add useful new NPC plan first

Purpose: decide the new gameplay-supporting NPCs before portrait generation.

Recommended new NPC groups:

- Trade: auctioneer, appraiser, bulk goods broker, rare collector, damaged goods dealer, import/export clerk, festival trader, market inspector.
- Travel: route scout, caravan captain, toll officer, border customs guard, roadside innkeeper, pack animal trader, ferry master, smuggler guide.
- Company and warehouse: warehouse keeper, shipment broker, company accountant, investor, debt collector, insurance agent, dock foreman, cartwright.
- Quest/story: contract board clerk, guild representative, missing-shipment witness, rival merchant, noble patron, religious relic buyer, rumor seller.
- Risk/crime: black-market fence, thief contact, corrupt guard, contraband buyer, night courier, forger, bounty hunter, legal advocate.

Recommended first target:

```text
40-60 new useful NPCs
10-25 weak original slots disabled or hidden
220-240 visible final characters after rework
```

Do not exceed this target without a new balance discussion. Too many portraits and role records will make market readability worse.

### C2 - Final roster map

Purpose: create the final public-facing cast before writing portrait prompts.

Each roster row should decide:

- stable internal character id or original index;
- new display name;
- keep/rework/replace/disable/new status;
- market assignment;
- gameplay role;
- profession;
- expression tier;
- portrait count;
- whether the character needs stock, quests, dialogue, company integration, or only ambient flavor.

Suggested statuses:

```text
KEEP_AND_REWORK
REPLACE_VISIBLE_IDENTITY
MERGE_WITH_ANOTHER
DISABLE_OR_HIDE
NEW_GAMEPLAY_NPC
SPECIAL_STORY_NPC
```

### C3 - Remake character data layer

Purpose: avoid breaking old indexes while replacing visible identity.

Add a remake-facing character layer later, for example:

```text
src/data/characters/characterRemakeCatalog.ts
src/data/characters/characterRemakeTypes.ts
```

Each entry should include:

```ts
{
  characterId: "npc-000",
  originalIndex: 0,
  status: "KEEP_AND_REWORK",
  displayName: "Tavian Brindlehook",
  shortStory: "...",
  roleTags: ["guard", "city", "law"],
  profession: "guard",
  marketId: "...",
  visualDescription: "...",
  tradePersonality: "strict_haggler",
  questHooks: ["..."],
  expressionTier: "major",
  portraitFiles: {
    neutral: "/assets/portraits/npc-000-neutral.png"
  }
}
```

### C4 - Name, story, and gameplay identity rewrite

Purpose: every visible character should feel original and useful.

Each character should get:

- a new name;
- a 2-4 sentence short story;
- a visual description;
- profession-specific role tags;
- trade personality;
- at least one rumor, conflict, preference, or quest hook if they are a meaningful NPC.

Story style:

```text
Profession identity + personal motivation + market/trade behavior hint + small secret or hook.
```

Do not use generic biographies. A candle seller, ferryman, blacksmith, guard, banker, smugglers' guide, and noble patron should not feel interchangeable.

### C5 - Expression system

Purpose: make character portraits feel alive during trade, quests, and dialogue.

Recommended expression tiers:

```text
major: neutral, happy, suspicious, worried, angry
merchant: neutral, happy, suspicious
minor: neutral only
special: custom set based on story role
```

Suggested UI usage:

- neutral: default state;
- happy: fair trade, successful quest, good relation;
- suspicious: bad offer, illegal goods, uncertain rumor;
- worried: danger, debt, missing shipment, route risk;
- angry: insult, failed quest, cheated deal, guard confrontation;
- sad: loss, ruined shipment, failed delivery;
- surprised: rare item, unexpected event.

Not every character needs every expression. Total portrait image count must be planned before generation.

### C6 - Portrait prompt production

Purpose: create prompt manifests before image generation.

Character portrait prompts belong beside item prompts:

```text
docs/assets/character-prompts/
```

Batching rule:

```text
Batch by total portrait images, not by character count.
```

Example:

```text
200 characters x 5 expressions = 1000 portrait images.
The 1000 images are divided into batches.
A single character can have 3 expression images in batch 001 and 2 expression images in batch 006.
```

Every image entry must repeat the same identity anchors so the character remains consistent across different batches.

### C7 - Portrait sheet generation and cropping

Purpose: generate portrait sheets once and let another GPT/chat crop the sheets reliably.

Rules should mirror the item sheet pipeline where possible:

- strict grid;
- left-to-right, top-to-bottom order;
- one portrait per cell;
- solid pure green `#00FF00` background for cropping;
- no labels, numbers, text, borders, UI frames, or watermarks;
- consistent theme and rendering quality;
- enough padding around every portrait;
- every batch manifest records exact slot order.

Unlike items, character sheets may use smaller grids for quality. The batch manifest must always declare `columns`, `rows`, `slotCount`, and exact `order`.

Recommended grids:

```text
10x5 = 50 portraits, maximum efficiency, same as item sheets
5x4 = 20 portraits, better face quality
4x3 = 12 portraits, high-quality important characters or expression sets
```

Use smaller grids for major NPC expression variants if face quality drops.

### C8 - Runtime integration

Purpose: connect remake identity and portraits to the app.

Targets:

1. Market NPC list uses new display names and portraits.
2. Barter/trade view changes expression based on offer state.
3. Quest/dialogue view uses the correct expression.
4. Company/warehouse/shipment NPCs appear in company-related UI.
5. Save data stores stable IDs, not fragile visible names.

### C9 - Validation and lock

Purpose: prevent regressions after portrait import.

Add later audits for:

- missing portrait files;
- orphan portrait files;
- invalid expression file paths;
- duplicate display names;
- duplicate silhouette/visual trait risk;
- missing short stories;
- missing role tags;
- characters with original visible names still leaking into UI.

Reports should go under `docs/logs/`.

## Prompt quality rules

Prompts must be hand-written per character. Shared style text is allowed, but the identity content must be unique.

Each character should intentionally differ by:

- silhouette;
- age band;
- face shape;
- body type;
- skin tone;
- hair or head covering;
- scars, wrinkles, makeup, tattoos, or other distinguishing details;
- clothing cut and material;
- profession tools;
- posture;
- class/status signal;
- dominant colors;
- emotional baseline.

Bad prompt:

```text
A medieval merchant portrait in fantasy style.
```

Good prompt:

```text
A broad-shouldered middle-aged dock broker with sea-weathered brown skin, a chipped front tooth, braided grey beard tied with copper rings, heavy blue wool coat patched with sailcloth, rope burns on his hands, and a brass tally-counter hanging from his belt. He looks amused but calculating, like he already knows the weight of every crate in the harbor.
```

## Asset file naming

Recommended portrait files:

```text
public/game-assets/portraits/npc-000-neutral.png
public/game-assets/portraits/npc-000-happy.png
public/game-assets/portraits/npc-000-suspicious.png
```

Recommended generated sheet folder:

```text
docs/assets/character-sheets/
```

Recommended prompt folders:

```text
docs/assets/character-prompts/
  00_CHARACTER_PROMPT_RULES.md
  portrait-batch-template.json
  portrait-batch-001.json
  portrait-batch-002.json
```

## Immediate next implementation step

Create the roster audit and final roster plan before writing all portrait prompts.

First concrete patch should add:

- character audit script/report;
- final roster planning file;
- seed list of useful new NPCs;
- remake character type definitions;
- no portrait generation yet.
