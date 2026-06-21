# 03 - Final Roster Prompt Plan

Character portrait prompts stay blocked until the final identity catalog exists.

## Current target

```text
240 visible characters
726 planned portrait images
```

## Batching rule

Batch by total portrait images, not character count.

Example:

```text
portrait-batch-001 may contain:
- npc-legacy-000-neutral
- npc-legacy-000-suspicious
- npc-legacy-000-angry
- npc-new-001-neutral
- npc-new-001-happy
```

A character can have some expressions in one batch and remaining expressions in another batch, as long as each image repeats the same identity anchor.

## Generation gate

Do not generate the 726-image portrait set yet.

Before generating, create:

1. full identity catalog,
2. full portrait image manifest,
3. test batch of 10-20 total images,
4. approved cropping/style result.

## Consistency rule

Each image entry must keep the same identity anchors:

```text
same face structure
same age band
same body shape
same key hair/beard/scar/makeup details
same profession props
same clothing silhouette
same dominant colors
```

Only expression, posture, and emotional acting should change between expressions.
