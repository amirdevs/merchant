# 04 - Identity Catalog Batch 001 Prompt Plan

This folder sits beside the item prompt pipeline. Character portraits follow the same crop-friendly sheet discipline, but portrait sheets are usually smaller for face quality.

## Status

```text
DRAFT_TEST_BATCH_SEED
```

Do not generate all character portraits from this file yet. This prompt plan exists so sheet layout, naming, and identity anchors stay consistent before generation.

## Batch rule

Character portrait batches are based on **total portrait images**, not characters.

A single character can be split across batches:

```text
portrait-batch-identity-001:
  npc-new-001 neutral/happy/suspicious/worried/angry
  npc-new-002 neutral/happy/suspicious
  npc-new-003 neutral/happy/suspicious
  npc-new-004 neutral/happy/suspicious/worried/angry
  npc-new-005 neutral/happy/suspicious
  npc-new-006 neutral only

later batch:
  npc-new-006 happy/suspicious/worried/angry
```

That split is valid because every image entry repeats the character's identity anchor.

## Suggested sheet for first test

```text
5 columns x 4 rows = 20 portrait images
solid pure green background #00FF00
left-to-right, top-to-bottom order matching JSON order
no labels, numbers, borders, UI frames, watermarks, or text
front/three-quarter bust portraits only
generous padding for crop safety
```

## Shared style only

The shared style can repeat, but character identity must not be generic. Each prompt must preserve the same named person while changing only expression/acting direction.
