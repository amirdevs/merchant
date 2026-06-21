# Portrait test V2 overlay

This direct overlay replaces the first character portrait test batch with a smaller, cleaner, crop-safe 4x3 test sheet.

Generate this file first:

```text
docs/assets/character-prompts/portrait-batch-identity-001.json
```

Do not generate the old template or any full production batch yet.

## Why V2 exists

The first 5x4 test sheet proved that the pipeline works, but the characters looked too similar, too calm, and too plain. The new batch changes the test gate to:

- 4 columns x 3 rows = 12 portraits
- exact 4096x3072 target sheet with 1024x1024 crop cells
- row/column/crop coordinates in every image entry
- maximum 2 expressions per character per test sheet
- stronger profession-specific props and more entertaining, beautiful, memorable character design
- stricter rule that each portrait stays centered inside its own invisible square cell

## Suggested commit message

```bash
git commit -m "docs: revise character portrait test batch rules"
```
