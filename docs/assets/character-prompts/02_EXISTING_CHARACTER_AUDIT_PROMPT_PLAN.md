# 02 - Existing Character Audit Prompt Plan

No portrait images should be generated from this file.

This file explains how legacy generated characters will enter the portrait pipeline after the final roster map is approved.

## Current status

```text
Useful new NPC seeds: planned
Existing 203 generated characters: audit in progress
Portrait generation: blocked
```

## Legacy character prompt flow

1. Audit each generated character slot.
2. Decide keep, replace, merge, disable, promote, or review.
3. Build the final roster map.
4. Write hand-made identity anchors for every final visible character.
5. Assign expression counts.
6. Create portrait image manifests batched by image count, not character count.
7. Generate one small test batch.
8. Generate full sheets only after test approval.

## Image batching reminder

Batches are based on total portrait images.

Example:

```text
200 characters x 5 expressions = 1000 portrait images
```

That means the batch plan is for 1000 images, not 200 characters.

A single character can appear across multiple batches:

```text
Batch 001: npc-014 neutral, npc-014 happy, npc-014 suspicious
Batch 002: npc-014 worried, npc-014 angry
```

Every repeated expression must include the same identity anchor so the character remains consistent.

## Prompt quality rule

Only shared art/crop/style rules may repeat. The character identity prompt must be hand-written and profession-specific.

Each final character must define:

```text
new display name
short story
audit decision
role tags
trade personality
quest hooks
silhouette
age band
face/hair/body/clothing details
profession props
dominant colors
identity anchor
planned expressions
portrait file prefix
```

## When generation starts

Portrait generation starts after:

```text
13_FINAL_CHARACTER_ROSTER_MAP.md
14_CHARACTER_IDENTITY_PASS.md
15_PORTRAIT_MANIFEST_BATCHES.md
```

Then we run only a small test sheet first.
