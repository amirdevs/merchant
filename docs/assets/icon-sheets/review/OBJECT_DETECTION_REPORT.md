# OBJECT_DETECTION_REPORT

Object-presence review checks sheet structure only. It is not a semantic guarantee that each icon exactly matches its item name.

- PASS: 101
- FAIL: 0

## Corrections applied after manual review

- `items-4001-4050.json`: PASS after regenerated replacement sheet review. The uploaded replacement is a readable PNG and a structurally valid 10x5 sheet with 50 populated cells.
- `items-5001-5006.json`: PASS after manual recheck. The earlier `R1C7 extra_art` finding was a false positive; the final sheet has the expected 6 items in `R1C1` through `R1C6`.

## Current status

All 101 prompt configs have a structurally valid matching sheet from an object-presence/count perspective.

## Next required step

Run semantic QA before final cropping. Semantic QA must confirm that each cell visually matches the JSON item name and quantity/state.
