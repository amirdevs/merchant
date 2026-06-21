# Portrait Test Sheet Gate

Generate this before any full portrait production:

```text
docs/assets/character-prompts/portrait-batch-identity-001.json
```

## Current V2 test settings

```text
Grid: 4 columns x 3 rows
Total images: 12
Target sheet: 4096 x 3072
Crop cell: 1024 x 1024
Background: #00FF00
```

## Why 4x3 now

The first 5x4 sheet was technically cropable, but the portraits looked too boring and repetitive. The 4x3 test gives every face and prop more room, improves expression quality, and makes later cropping safer.

## Approval checklist

Approve the test sheet only if:

- every cell follows JSON order;
- each portrait is centered inside its own square crop cell;
- no portrait touches or crosses into another cell;
- the characters look beautiful, entertaining, and profession-specific;
- repeated expressions still look like the same character;
- different characters do not look like clones;
- the green background is clean enough for automatic crop/removal;
- all props are visible but not cut off.

If this test fails, update prompt direction before generating more sheets.
