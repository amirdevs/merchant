# MATCHING_REPORT

Source branch inspected: `main`.

Matching method: JSON configs sorted by filename; generated sheets sorted by timestamp plus numeric suffix; valid images renamed to JSON basename. Review overlays are JPG files to keep repository size lower than PNG overlays.

- Prompt configs: 101
- Source sheet files: 101
- Renamed valid sheets included: 101
- Invalid source files in `unmatched/`: 0
- PASS: 101
- FAIL: 0

## Corrections after manual review

- `items-4001-4050.json`: replacement sheet checked locally as a readable PNG and a structurally valid 10x5 sheet with 50 populated cells.
- `items-5001-5006.json`: earlier `R1C7 extra_art` finding was a false positive. Manual recheck confirms the final 6-item sheet is structurally valid.

## Current status

All 101 prompt configs now have a structurally valid matching sheet from a count/object-presence perspective.

## Next required step

Run semantic QA before final cropping. Semantic QA must confirm that each icon visually matches the JSON item name and quantity/state.
