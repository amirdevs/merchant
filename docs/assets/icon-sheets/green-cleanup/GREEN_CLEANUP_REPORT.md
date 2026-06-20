# Final Green Cleanup + Inspection Report

## Result

- Icons processed: 5006
- Output format: 256×256 transparent PNG
- Strict `#00FF00` / near-screen-green residue files after cleanup: 0
- Empty / too-small failures after cleanup: 0
- Canvas-edge clipping warnings after cleanup: 0
- Minimum transparent margin after cleanup: 15px
- QA boards generated: 101

## Cleanup modes

- `low`: 2712 icons — aggressive de-green/de-spill because green content was likely background fringe.
- `medium`: 1572 icons — edge-focused de-green/de-spill.
- `preserve`: 722 icons — conservative cleanup to protect real green items such as vines, leaves, herbs, poison effects, green magic, etc.

## Status counts

- PASS: 3985
- WARN_EDGE_GREEN_LEFT: 1021

## Notes

The previous crop placement was kept. This pass only cleaned the green-screen matte/fringe and re-inspected every generated PNG.

The inspection checked every icon for:
- empty or destroyed alpha,
- canvas-edge clipping,
- strict pure-green / near-`#00FF00` residue,
- green edge spill,
- final bounding-box margin.

`WARN_EDGE_GREEN_LEFT` is only reported for low/medium cleanup modes. Green-preserve icons can still have green colors because the actual item is green; those were not treated as failures.

The files are project-root extractable and should land in:

```text
public/game-assets/items/
docs/assets/icon-sheets/green-cleanup/
```
