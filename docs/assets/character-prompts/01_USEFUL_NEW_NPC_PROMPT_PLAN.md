# 01 - Useful New NPC Prompt Plan

This folder sits beside the item icon prompt pipeline and is the working area for character portrait prompt manifests.

## Current useful-new-NPC seed target

The first useful NPC roster lives in:

```text
src/data/characters/newUsefulNpcSeeds.ts
```

It currently defines:

```text
48 useful new NPC seeds
194 planned portrait images across their expression tiers
```

These are not generated yet. They are the seed roster and prompt source for review before final portrait-sheet production.

## Batching rule

Portrait sheets are batched by total portrait image count, not by character count.

Example:

```text
npc-new-001 neutral
npc-new-001 happy
npc-new-001 suspicious
npc-new-001 worried
npc-new-001 angry
npc-new-002 neutral
...
```

A single character can be split across batches if a sheet reaches its image limit.

## First example generation batch

`portrait-batch-new-npcs-001.json` contains the first 20 portrait image entries in a `5x4` sheet. It intentionally includes only the neutral expression for `npc-new-006` so the remaining expressions continue later, proving the image-based batch rule.

Use this batch only after the roster is accepted. If the roster changes, regenerate/update batch manifests before producing portrait sheets.

## Quality target

Use smaller grids for face quality when needed:

```text
5x4 = 20 portraits, good default
4x3 = 12 portraits, important NPCs or difficult expression consistency
10x5 = 50 portraits, only if quality remains acceptable
```

The prompt entries repeat identity anchors so expression variants remain the same person even when split across different sheets.
