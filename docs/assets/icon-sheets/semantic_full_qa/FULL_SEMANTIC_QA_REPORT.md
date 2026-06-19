# Full Semantic QA + Exact-Crop Safety Gate

## Result

**DO NOT FINAL-CROP YET.**

The sheets passed object/count checking, but they do **not** pass the stricter crop-border gate the user requested. Under exact 10×5 grid cropping, many cells include part of a neighboring icon or cut off part of the intended icon.

## Totals

- Sheets checked: **101**
- Expected item slots checked: **5006**
- Exact-crop sheet PASS: **0**
- Exact-crop sheet WARN: **0**
- Exact-crop sheet FAIL/BLOCKED: **101**
- Cell WARN, low padding: **832**
- Cell FAIL, crop boundary touched/crossed or contamination risk: **3968**

## Meaning

This is not a simple semantic-name issue. It is a crop-safety blocker:

- exact cell crops can include pieces of another item;
- an item can be cut by the cell boundary;
- some sheets do not have enough green padding between icons;
- final extraction should not run until these are fixed or until we switch to an object-aware extraction method.

## Representative evidence

See:

```text
docs/assets/icon-sheets/semantic_full_qa/EXACT_CROP_PROBLEM_EXAMPLES.jpg
```

Example: `items-0001-0050` `R2C3` should be only `Painted Coast Annals III: Guild Charms`, but the exact crop includes part of the coin from the row above and part of the next book on the right. That means the current exact-grid crop would produce contaminated icons.

## Semantic status

Semantic review is **blocked**, not approved. The visual theme generally matches the fantasy item families, but because exact crops are unsafe across the set, a clean semantic PASS would be misleading. Semantic approval should happen after one of these fixes:

1. regenerate sheets with much more padding inside every 10×5 cell, or
2. use an object-aware cropper that isolates the intended object from the green background and recenters it on a clean canvas.

## Recommended next action

I recommend switching Phase 3 from exact-grid crop to **safe object-aware extraction**:

- use each JSON slot as the expected center/window;
- isolate non-green connected components near the slot center;
- reject neighbor components crossing from adjacent cells;
- preserve the full intended object even if it slightly crosses the mathematical cell boundary;
- recenter the isolated icon on a green/transparent canvas;
- create a per-icon QA contact sheet before committing final crops.

If exact-grid cropping must remain mandatory, then the safe option is to regenerate the affected sheets with stronger padding. Based on this run, that would affect most sheets.
