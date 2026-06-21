# 13 - Final Character Roster Map

This document defines the current final-character target before the full identity-writing pass.

This is still **pre-portrait-generation**.

## Current roster target

| Pool | Count |
|---|---:|
| Existing generated character records | 203 |
| Target visible reworked legacy slots | 192 |
| Target hidden/merged legacy slots | 11 |
| New useful NPC seeds | 48 |
| Target final visible cast | 240 |

The current target is therefore:

```text
192 reworked legacy slots + 48 new useful NPCs = 240 visible characters
```

## Planned portrait-image target

Portrait batching is based on **total images**, not characters.

Current planning target:

| Pool | Tier | Characters | Expressions each | Images |
|---|---|---:|---:|---:|
| reworked legacy | major | 25 | 5 | 125 |
| reworked legacy | merchant | 120 | 3 | 360 |
| reworked legacy | minor | 47 | 1 | 47 |
| useful new NPCs | major | 25 | 5 | 125 |
| useful new NPCs | merchant | 23 | 3 | 69 |
| **Total** |  | **240** |  | **726** |

So the current target is:

```text
240 visible characters
726 planned portrait images
```

This is not the final generation manifest yet. It is the planning target before writing every character identity.

## Why not generate now

Do **not** generate portraits yet.

We still need:

1. final per-character identities,
2. final expression tier per character,
3. final portrait-image manifest,
4. small test portrait sheet,
5. approval of style, consistency, green background, and crop safety.

## New useful NPCs are already included

The 48 useful new NPC seeds are part of the 240-character target.

They live in:

```text
src/data/characters/newUsefulNpcSeeds.ts
```

They cover gameplay functions such as:

- auctioneer
- appraiser
- route scout
- caravan captain
- warehouse keeper
- shipment broker
- company accountant
- investor
- contract board clerk
- black-market fence
- customs guard
- rare item collector
- specialist buyers and market services

## Data file

The machine-readable roster target lives in:

```text
src/data/characters/finalCharacterRosterPlan.ts
```

The current generation status is:

```text
BLOCKED_UNTIL_IDENTITY_CATALOG
```

That means the next step is not image generation. The next step is writing the identity catalog.

## Next step

Next step:

```text
Step 14 - first full identity-catalog batch
```

That step should write the first real group of final original characters with:

- final display names
- short stories/descriptions
- profession and role tags
- unique body/face/clothing/prop design
- trade personality
- quest hooks
- expression tier
- portrait identity anchors

Still no full portrait generation.
