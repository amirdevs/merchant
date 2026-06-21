# Useful NPC Identity Mega Batch Prompt Plan

This prompt-plan file belongs beside the item prompt manifests and covers identity Batch 02.

## Source data

```text
src/data/characters/characterIdentityCatalogBatch02.ts
```

## Current status

```text
DRAFT_PROMPT_PLAN_ONLY
PORTRAIT_GENERATION_BLOCKED
```

Do not generate portraits from this batch until the final manifest and test-sheet gate are approved.

## Batch rule

Character portrait batches are based on **total portrait images**, not character count.

This batch contains:

```text
32 characters
128 planned portrait images
```

The first draft prompt JSON only includes 20 portrait images so a future test sheet can validate:

- face quality;
- expression consistency;
- pure green background;
- cropping safety;
- whether the same character remains recognizable across expressions.

## Draft JSON

```text
docs/assets/character-prompts/portrait-batch-identity-002.json
```

Suggested grid for this future test:

```text
5 columns x 4 rows = 20 portraits
```

The JSON order must be followed left-to-right, top-to-bottom.
