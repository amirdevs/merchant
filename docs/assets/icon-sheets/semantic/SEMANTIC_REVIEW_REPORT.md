# Semantic Review Report

Status: SEMANTIC REVIEW BOARDS GENERATED; final per-item semantic approval is pending manual/visual sign-off.

This phase is different from object detection:
- Object detection checked whether each expected grid cell has an icon and whether extra cells exist.
- Semantic review checks whether each icon visually matches the expected JSON item name, variant, material, quantity, and item family.

Generated artifacts:
- Semantic boards: 101
- Checklist rows: 5006
- Checklist: `SEMANTIC_REVIEW_CHECKLIST.csv`
- Full board package was generated outside Git because it contains 101 binary review images.

Current structural status from the corrected object-detection phase:
- PASS: 101 sheets
- FAIL: 0 sheets

Important: No final cropping should be treated as semantically approved until the checklist statuses are updated from `PENDING_REVIEW` to `PASS`, `WARN`, or `FAIL`.

## First visual notes from this semantic setup

- `items-4001-4050` now has the correct 50 expected weapon entries and visually matches the dagger/sword/flail sequence at a category level.
- However, several wide `few` / `many` weapon piles touch or cross exact grid-cell borders in the source sheet. This is not an object-count failure, but it is a crop-safety warning: exact cell cropping may clip edges or include neighbor fragments unless the crop method is adjusted or the sheet is regenerated with more spacing.
- Therefore this semantic phase should be used to catch both meaning mismatches and crop-safety issues before final icon extraction.

## Recommended semantic status values

- `PASS`: icon visually matches the expected item and quantity/variant.
- `WARN`: icon is usable but unclear, too similar to neighboring variants, too cropped, too realistic, or visually weak.
- `FAIL`: wrong object, wrong material/color, wrong quantity variant, merged objects, severe crop risk, or mismatch with JSON output name.

## Next gate before crop

Final crop should start only after the semantic checklist is reviewed and all `FAIL` rows are either regenerated, accepted manually, or moved to a known-problems list.
