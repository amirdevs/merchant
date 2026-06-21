# 14 - First Identity Catalog Batch

This document records the first real character identity-writing batch for the remake roster.

This is still **pre-portrait-generation**. Do not generate portrait sheets from this step yet.

## What this step adds

Machine-readable identity data lives in:

```text
src/data/characters/characterIdentityTypes.ts
src/data/characters/characterIdentityCatalogBatch01.ts
```

Batch 01 covers the first 16 useful new NPCs:

| ID | Final name | Role | Tier | Planned images |
|---|---|---|---|---:|
| `npc-new-001` | Mirella Brasscall | Auctioneer | major | 5 |
| `npc-new-002` | Orren Scale-Eye | Appraiser | merchant | 3 |
| `npc-new-003` | Basko Fencrate | Bulk Goods Broker | merchant | 3 |
| `npc-new-004` | Saffra Moonlock | Rare Item Collector | major | 5 |
| `npc-new-005` | Joryn Crackbox | Damaged Goods Dealer | merchant | 3 |
| `npc-new-006` | Helva Quaystamp | Import Export Clerk | major | 5 |
| `npc-new-007` | Pella Brightspoon | Festival Trader | merchant | 3 |
| `npc-new-008` | Davin Ledgerhook | Market Inspector | major | 5 |
| `npc-new-009` | Kesta Far-Ridge | Route Scout | major | 5 |
| `npc-new-010` | Brann Oxweather | Caravan Captain | major | 5 |
| `npc-new-011` | Nilo Gatecoin | Toll Officer | merchant | 3 |
| `npc-new-012` | Arra Stonepassport | Border Customs Guard | major | 5 |
| `npc-new-013` | Tovin Hearthmile | Roadside Innkeeper | merchant | 3 |
| `npc-new-014` | Madu Long-Ear | Pack Animal Trader | merchant | 3 |
| `npc-new-015` | Suren Reedwake | Ferry Master | major | 5 |
| `npc-new-016` | Vaska LowLantern | Smuggler Guide | major | 5 |

Batch 01 totals:

```text
16 characters
62 planned portrait images
```

## Portrait generation status

```text
BLOCKED_UNTIL_FULL_IDENTITY_CATALOG_AND_TEST_MANIFEST
```

This batch creates final identity anchors, stories, visual identities, and expression plans. It does **not** mean full portrait generation is ready.

## Prompt batching reminder

Portrait sheets are batched by **total images**, not by characters.

Example from this batch:

```text
npc-new-001 has 5 planned expression images
npc-new-002 has 3 planned expression images
npc-new-006 may have only one expression in the first test prompt batch and the rest in a later batch
```

That is allowed. The important rule is that every image repeats enough identity anchors to keep the same character recognizable across different sheets.

## Draft prompt-plan files

Draft prompt planning for this batch lives beside the item prompts:

```text
docs/assets/character-prompts/04_IDENTITY_CATALOG_BATCH_001_PROMPT_PLAN.md
docs/assets/character-prompts/portrait-batch-identity-001.json
```

The JSON prompt batch is a **draft test-batch seed**. It is not approval to generate all portraits yet.

## Quality rules

Every character in this identity batch has hand-written:

- final display name
- short story/description
- profession and gameplay role tags
- unique body/face/clothing/prop design
- voice direction
- trade personality
- quest hooks
- expression tier
- identity anchor for portrait consistency

Only the global portrait style is shared. Faces, shapes, clothing, props, posture, and personality should be visibly different.

## Next step

Next step:

```text
Step 15 - continue identity-catalog batches
```

Do not generate portraits until the full final identity catalog and first approved test manifest are ready.
