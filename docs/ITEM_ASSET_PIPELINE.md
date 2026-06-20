# Item & Icon Asset Pipeline

This document is the permanent source of truth for generating, reviewing, cleaning, cropping, upscaling, and committing item icon assets for the Merchant project.

It replaces the old root-level `AI_ICON_SHEET_HANDOFF.md`. Keep this file in `docs/`, update it whenever the pipeline changes, and make every future icon generation pass follow it.

## Current Pipeline Goal

Generate thousands of collectible fantasy item icons from JSON prompt configs, review them safely, extract them into clean transparent PNG icons, and keep a complete trace of the process in the repository.

The current proven pipeline is:

1. Generate full 10×5 item sheets from JSON configs.
2. Match every generated sheet to its JSON config.
3. Create object-detection/review overlays.
4. Run semantic and crop-safety QA.
5. Use object-aware safe cropping instead of naive exact-grid cropping when objects cross cell borders.
6. Remove the green screen background completely while preserving real green item details.
7. Upscale final icons to 4×.
8. Verify all output icons one by one with automated QA checks and visual QA boards.
9. Commit final images through Git LFS, with reports and trace docs kept in normal Git.

## Important Paths

```text
# Prompt configs
/docs/assets/icon-prompts/items-*.json

# Raw/generated full sheets
/docs/assets/icon-sheets/

# Renamed full sheets after matching
/docs/assets/icon-sheets/items-0001-0050.png
/docs/assets/icon-sheets/items-0051-0100.png
...

# Object-detection review overlays
/docs/assets/icon-sheets/review/

# Semantic review boards and reports
/docs/assets/icon-sheets/semantic/
/docs/assets/icon-sheets/semantic_full_qa/

# Safe crop reports and QA boards
/docs/assets/icon-sheets/safe-crop/

# Green cleanup reports and QA boards
/docs/assets/icon-sheets/green-cleanup/

# 4× upscale reports and QA boards
/docs/assets/icon-sheets/upscale-4x-clean/

# Final game-ready item icons
/public/game-assets/items/
```

## Non-Negotiable Rules

### Do not change IDs or filenames

Every output icon filename must come from the matching JSON config. Do not simplify, translate, rename, reorder, invent, or normalize item IDs.

Correct:

```text
public/game-assets/items/currency/gold_coins.png
public/game-assets/items/example/example_item__few.png
public/game-assets/items/example/example_item__many.png
```

Wrong:

```text
public/game-assets/items/gold.png
public/game-assets/items/new-name-i-liked-better.png
public/game-assets/items/generated_001.png
```

### Use JSON order exactly

Every sheet uses JSON `order` or `slots` order.

Read order is always:

```text
left-to-right, top-to-bottom
R1C1, R1C2, ... R1C10,
R2C1, ...,
R5C10
```

Normal sheets contain 50 items. The final sheet may contain fewer items if the JSON contains fewer entries. Empty final-sheet cells must remain empty.

### Never guess sheet matches

If a sheet cannot be confidently matched to a JSON config, put it in:

```text
docs/assets/icon-sheets/unmatched/
```

and document it in:

```text
docs/assets/icon-sheets/MATCHING_REPORT.md
```

Do not crop or use unmatched sheets.

### Do not crop failed sheets

If object detection, semantic review, or crop-safety review fails, do not create final icons from that sheet until it is fixed, regenerated, or manually approved with a report entry.

## Phase 1 — Prompt Configs

Prompt configs live in:

```text
docs/assets/icon-prompts/items-*.json
```

Each config should include:

- the target batch name, such as `items-0001-0050.json`
- exact item order
- item IDs / output paths
- a generation prompt
- strict sheet layout rules

Required sheet rules:

```text
10 columns × 5 rows
solid pure green background: #00FF00
one separate icon per occupied cell
no checkerboard
no labels, numbers, text, UI frames, borders, or watermarks
ultra-cartoony magical fantasy game art
playful, colorful, exaggerated, collectible, non-realistic
enough padding around every item
```

## Phase 2 — Generate Full Sheets

Generated sheets should be placed in:

```text
docs/assets/icon-sheets/
```

The AI export filename can be messy at first, for example:

```text
ChatGPT Image Jun 19, 2026, 07_41_16 PM (1).png
1.png
random-export-name.png
```

Do not rely only on filename. The sheet must be matched visually against the JSON order.

## Phase 3 — Match and Rename Sheets

For each JSON config:

1. Open the JSON config.
2. Read the ordered item list.
3. Open candidate sheet images.
4. Compare visible icons to JSON cells.
5. Rename the matched sheet to the JSON basename:

```text
items-0001-0050.png
items-0051-0100.png
...
```

The renamed file must land in:

```text
docs/assets/icon-sheets/items-0001-0050.png
```

Create/update:

```text
docs/assets/icon-sheets/MATCHING_REPORT.md
```

The report must include:

- total prompt configs
- total source sheets
- matched sheets
- unmatched sheets
- corrupt files
- manual corrections
- final PASS/FAIL summary

## Phase 4 — Object Detection / Structure Review

After matching and renaming, create review overlays for every sheet under:

```text
docs/assets/icon-sheets/review/
```

Review overlay requirements:

- visible 10×5 grid lines
- cell labels such as `R1C1`, `R1C2`
- expected JSON entry shown near each cell
- labels must not hide important item art
- final partial sheet must show empty cells clearly

Example filenames:

```text
docs/assets/icon-sheets/review/items-0001-0050-review.jpg
docs/assets/icon-sheets/review/items-0051-0100-review.jpg
```

Create/update:

```text
docs/assets/icon-sheets/review/OBJECT_DETECTION_REPORT.md
```

This report checks only structural problems:

- missing cell art
- extra cell art
- shifted order
- merged cells
- corrupt images
- unreadable cells
- final-sheet extra icons

Important: object detection is not semantic QA. It only confirms that an object exists in the expected cell, not that the object is the correct item.

## Phase 5 — Semantic Review

Semantic review checks whether each icon actually matches the JSON item name.

Create semantic boards under:

```text
docs/assets/icon-sheets/semantic/
```

Create/update:

```text
docs/assets/icon-sheets/semantic/SEMANTIC_REVIEW_REPORT.md
docs/assets/icon-sheets/semantic/SEMANTIC_REVIEW_CHECKLIST.csv
docs/assets/icon-sheets/semantic/SEMANTIC_REVIEW_INDEX.html
```

Semantic statuses:

```text
PASS  — icon clearly matches the item name
WARN  — unclear, borderline, stylized, or crop-risky but maybe usable
FAIL  — wrong object, wrong quantity, wrong variant, bad style, missing item, or unusable
```

Semantic review must catch examples like:

- JSON says meat, icon looks like grapes
- JSON says `__few`, icon looks like one item
- JSON says `__many`, icon looks too sparse
- icon looks too realistic or not fantasy game style
- icon contains unrelated object fragments
- item is impossible to identify

## Phase 6 — Crop-Safety Review

Before final cropping, run a crop-safety review.

This is critical. A sheet can pass object detection but still fail crop safety.

Exact grid cropping is unsafe when:

- part of an item crosses into a neighboring cell
- part of a neighboring item enters the current cell
- an object touches a crop boundary
- shadows or glows cross the boundary
- thin details such as handles, ribbons, blades, horns, ropes, or leaves would be cut

Create/update:

```text
docs/assets/icon-sheets/semantic_full_qa/FULL_SEMANTIC_QA_REPORT.md
```

The report should summarize:

- sheets checked
- item slots checked
- exact-crop safe sheets
- blocked sheets
- low-padding warnings
- crop-boundary fail cells
- example problem cells

If exact-grid cropping would cut items or include neighbor pieces, do not use exact-grid cropping for final output.

## Phase 7 — Object-Aware Safe Cropping

The successful current pipeline uses object-aware cropping instead of naive exact-grid cropping.

Object-aware safe cropper goal:

```text
Keep the intended item.
Remove green background.
Remove neighboring item fragments.
Avoid cutting any part of the intended item.
Recenter the item on a transparent square canvas.
Preserve enough transparent margin.
```

Safe cropper steps:

1. Start from the exact nominal grid cell.
2. Detect foreground against pure green background.
3. Expand search enough to keep item details that cross the nominal boundary.
4. Reject disconnected neighboring components when possible.
5. Keep the primary intended foreground component/group.
6. Create a clean alpha mask.
7. Recenter on a square transparent canvas.
8. Preserve visible item details and padding.
9. Write a QA row for every output icon.

Final crop reports live under:

```text
docs/assets/icon-sheets/safe-crop/
```

Required files:

```text
docs/assets/icon-sheets/safe-crop/CROPPING_REPORT.md
docs/assets/icon-sheets/safe-crop/SAFE_CROP_CELLS.csv
docs/assets/icon-sheets/safe-crop/SAFE_CROP_SUMMARY.csv
docs/assets/icon-sheets/safe-crop/SEMANTIC_VISUAL_REVIEW_CHECKLIST.csv
docs/assets/icon-sheets/safe-crop/SAFE_CROP_QA_INDEX.html
docs/assets/icon-sheets/safe-crop/qa-boards/
```

The safe crop report must include:

- sheets processed
- icons written
- output dimensions
- failed crops
- QA board count
- warnings
- skipped sheets
- known limitations

## Phase 8 — Green Background Cleanup

The generated sheets use pure green `#00FF00`. Final icons must have transparent background.

Green cleanup must remove:

- exact `#00FF00`
- near-green antialiasing
- green halos around the object
- low-alpha green residue
- green patches inside transparent areas

But it must preserve legitimate green item content, such as:

- leaves
- herbs
- vines
- poison effects
- green gems
- green magic
- green fabric or painted details

Use a conservative cleanup for icons where green is likely part of the item.

Create/update:

```text
docs/assets/icon-sheets/green-cleanup/GREEN_CLEANUP_REPORT.md
docs/assets/icon-sheets/green-cleanup/GREEN_CLEANUP_CELLS.csv
docs/assets/icon-sheets/green-cleanup/GREEN_CLEANUP_INDEX.html
docs/assets/icon-sheets/green-cleanup/qa-boards/
```

The report must include:

- total icons processed
- exact green residue count
- near-screen-green residue count
- low-alpha green residue count
- empty/destroyed icon count
- clipping warnings
- minimum transparent margin
- special handling for real green items

Acceptance target:

```text
exact #00FF00 residue files: 0
near-screen-green residue files: 0
empty/destroyed icons: 0
edge clipping risk: 0
```

## Phase 9 — 4× Upscaling

Final game icons should be upscaled from 256×256 to 1024×1024 unless the game specifically needs a smaller runtime variant.

Current final output:

```text
1024×1024 PNG
transparent background
green-free
object-aware crop preserved
```

Upscale reports live under:

```text
docs/assets/icon-sheets/upscale-4x-clean/
```

Required files:

```text
docs/assets/icon-sheets/upscale-4x-clean/UPSCALE_4X_REPORT.md
docs/assets/icon-sheets/upscale-4x-clean/UPSCALE_4X_CELLS.csv
docs/assets/icon-sheets/upscale-4x-clean/UPSCALE_4X_INDEX.html
docs/assets/icon-sheets/upscale-4x-clean/qa-boards/
```

Acceptance target:

```text
icon count: exactly expected JSON slot count
image size: 1024×1024
transparent background: yes
exact #00FF00: 0
low-alpha screen-green residue: 0
empty/destroyed icons: 0
edge clipping risk: 0
```

## Phase 10 — Final Output

Final game-ready icons must be written to:

```text
public/game-assets/items/
```

Rules:

- project-root relative paths
- exact JSON filenames
- transparent PNG
- 1024×1024 final size unless intentionally changed
- no green background
- no neighbor fragments
- no cut-off corners/details
- no duplicate wrapper folder

Correct ZIP/package structure:

```text
public/game-assets/items/example-item-id.png
public/game-assets/items/example-item-id__few.png
public/game-assets/items/example-item-id__many.png
docs/assets/icon-sheets/safe-crop/...
docs/assets/icon-sheets/green-cleanup/...
docs/assets/icon-sheets/upscale-4x-clean/...
```

Wrong:

```text
some-extra-folder/public/game-assets/items/...
wrong-output/public/game-assets/items/...
```

## Phase 11 — Git LFS

Large image assets should be stored through Git LFS, not normal Git history.

Use `.gitattributes` rules like:

```gitattributes
public/game-assets/items/**/*.png filter=lfs diff=lfs merge=lfs -text
docs/assets/icon-sheets/**/*.png filter=lfs diff=lfs merge=lfs -text
docs/assets/icon-sheets/**/*.jpg filter=lfs diff=lfs merge=lfs -text
docs/assets/icon-sheets/**/*.jpeg filter=lfs diff=lfs merge=lfs -text
```

Keep normal Git for:

```text
*.md
*.csv
*.html
*.json
source code
configuration files
```

Do not track all of `public/` with LFS. Only final item PNGs under `public/game-assets/items/` should be LFS-managed.

Before merging a large icon PR, verify:

```bash
git lfs ls-files | grep 'public/game-assets/items' | wc -l
git lfs ls-files | grep 'docs/assets/icon-sheets' | wc -l
```

Also verify that a fresh checkout with LFS enabled gets real images, not pointer text files:

```bash
git lfs install
git lfs pull
file public/game-assets/items/path/to/icon.png
```

## Phase 12 — Production-Clean Git Workflow

For large asset updates, do not commit directly to `main`.

Use this branch workflow:

1. Create a fresh branch from latest `main`.
2. Add/update `.gitattributes` if needed.
3. Generate outputs on the branch.
4. Hard-clean old final icons before writing new final icons:

```bash
rm -rf public/game-assets/items
mkdir -p public/game-assets/items
```

5. Keep trace docs and sheets.
6. Remove temporary generation workflow files before final commit if they are one-time-only.
7. Commit generated files in safe batches if needed.
8. Verify output counts and LFS tracking.
9. Open PR.
10. Squash merge only after verification.

Avoid merging:

- trial workflows
- incomplete generated assets
- normal-Git binary dumps that should be LFS
- stale old item files
- duplicate generated folders

## Required Final Verification Checklist

Before calling any asset batch final, verify all of these:

```text
[ ] JSON configs count matches expected batch count.
[ ] Every expected sheet exists.
[ ] Every sheet is matched and renamed.
[ ] MATCHING_REPORT.md says PASS.
[ ] OBJECT_DETECTION_REPORT.md says PASS.
[ ] Semantic review has no unhandled FAIL cells.
[ ] Crop-safety review has no unhandled exact-crop issues.
[ ] Safe crop wrote exactly expected icon count.
[ ] Green cleanup reports zero screen-green residue.
[ ] Upscale wrote exactly expected icon count.
[ ] Final icons are 1024×1024 PNG.
[ ] Final icons have transparent background.
[ ] No item is clipped at canvas edges.
[ ] No neighbor item fragments exist in any final icon.
[ ] No empty/destroyed icons exist.
[ ] public/game-assets/items/ was cleanly replaced.
[ ] Docs/reports/QA boards are committed.
[ ] Image assets are LFS-tracked.
[ ] Temporary workflow files are removed from final tree unless intentionally kept.
```

## Recommended Reports to Keep

Keep these reports permanently with each generation batch:

```text
docs/assets/icon-sheets/MATCHING_REPORT.md
docs/assets/icon-sheets/review/OBJECT_DETECTION_REPORT.md
docs/assets/icon-sheets/review/MANUAL_RECHECK_REPORT.md
docs/assets/icon-sheets/semantic/SEMANTIC_REVIEW_REPORT.md
docs/assets/icon-sheets/semantic_full_qa/FULL_SEMANTIC_QA_REPORT.md
docs/assets/icon-sheets/safe-crop/CROPPING_REPORT.md
docs/assets/icon-sheets/green-cleanup/GREEN_CLEANUP_REPORT.md
docs/assets/icon-sheets/upscale-4x-clean/UPSCALE_4X_REPORT.md
```

For traceability, reports should include:

- date/time
- source branch or commit
- sheet count
- item slot count
- output icon count
- warnings
- manual corrections
- failed/skipped files
- generation/crop/cleanup settings

## When Regenerating Only One Sheet

If only one sheet is wrong:

1. Regenerate only that JSON batch.
2. Replace only its full sheet under `docs/assets/icon-sheets/`.
3. Recreate only its review/semantic/QA boards.
4. Update reports with manual correction notes.
5. Re-run final crop/cleanup/upscale for affected icons.
6. Verify that unaffected icons were not changed unless intentionally regenerated.

## Known Pitfall From This Project

The original exact-grid crop rule was useful for detecting order and structure, but it was not safe for final extraction because many generated items crossed cell boundaries. The successful pipeline used object-aware cropping to avoid:

- cutting off item parts
- including parts of neighboring items
- leaving green background around edges
- losing small details during cleanup

Future runs should keep exact-grid review for auditing, but final output should use object-aware safe crop whenever sheet padding is imperfect.

## Current Proven Final Output Standard

The current accepted final standard is:

```text
5006 icons
1024×1024 PNG
transparent background
no visible green background
object-aware crop
no clipped item edges
no neighbor fragments
QA reports included
LFS-tracked images
```

If future requirements change, update this section first so the next asset run has a clear target.
