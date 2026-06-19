# AI Icon Sheet Handoff

This project is a React/Vite game at repository root. The item icon pipeline uses JSON prompt configs and generated 10x5 icon sheets.

## Important Paths

- Prompt configs: `docs/assets/icon-prompts/items-*.json`
- Raw/generated sheets: `docs/assets/icon-sheets/`
- Final cropped item icons: `public/game-assets/items/`

Do not change item IDs, filenames from JSON, or sheet order.

## Phase 1: Match Unnamed Sheets To JSON Configs

I will push generated sheets to Git. They may have bad names such as `1.png`, `2.png`, or random AI export names.

Your job:

1. Read all JSON configs in `docs/assets/icon-prompts/`, sorted by filename:
   - `items-0001-0050.json`
   - `items-0051-0100.json`
   - and so on.
2. Read all generated sheet images in `docs/assets/icon-sheets/`.
3. Determine which sheet corresponds to which JSON config.
4. Rename each sheet to match its JSON config basename:
   - `items-0001-0050.png`
   - `items-0051-0100.png`
   - etc.
5. Do not crop yet.
6. Create a zip that contains only the correctly renamed full sheets under:

```text
docs/assets/icon-sheets/items-0001-0050.png
docs/assets/icon-sheets/items-0051-0100.png
...
```

The zip must be structured so that if I extract it at project root, the renamed sheets land in `docs/assets/icon-sheets/`.

## How To Match Sheets

Each JSON contains an `order` list and a `generationPrompt`.

Check each sheet visually:

- Layout must be exactly 10 columns x 5 rows.
- Read order is left-to-right, top-to-bottom.
- Cell 1 should match `order[0]`.
- Cell 2 should match `order[1]`.
- Continue through the sheet.
- Normal sheets should have 50 icons.
- The final sheet may have fewer icons if its JSON has fewer entries.

If sheet names are numeric and were generated in batch order, use sorted JSON order as the first guess, but still verify visually.

If a sheet cannot be confidently matched, do not guess. Put it in a separate folder in the zip:

```text
docs/assets/icon-sheets/unmatched/
```

and include a short `MATCHING_REPORT.md` explaining why.

## Phase 2: Create Object Detection Review Sheets

After the sheets are renamed, create object detection / review versions for every sheet.

Goal: make mistakes easy to find before cropping.

For each full sheet, create a review image with:

- Visible 10x5 grid lines.
- Cell labels like `R1C1`, `R1C2`, etc.
- The expected JSON order entry shown near each cell if readable.
- Do not cover the item art too much.

Put review images under:

```text
docs/assets/icon-sheets/review/
```

Use filenames like:

```text
items-0001-0050-review.png
items-0051-0100-review.png
```

Also create:

```text
docs/assets/icon-sheets/review/OBJECT_DETECTION_REPORT.md
```

The report should list:

- PASS/FAIL for each sheet.
- Any wrong cells using row/column and JSON entry.
- Any missing, merged, shifted, realistic, checkerboard, or unclear quantity icons.

Do not crop sheets that fail review.

## Phase 3: Crop Final Approved Sheets

Only after I provide the final approved sheet zip, crop the sheets.

Cropping rules:

1. Use the matching JSON config for each sheet.
2. Crop by exact grid cell boundaries, not by visual object detection.
3. Each sheet is exactly 10 columns x 5 rows.
4. Read left-to-right, top-to-bottom.
5. Use the JSON `order` entries for output filenames.
6. Preserve transparent background if present.
7. If the background is pure `#00FF00`, keep it unless I explicitly request removal.
8. Do not rename, simplify, translate, reorder, or invent filenames.

Output every cropped icon under:

```text
public/game-assets/items/
```

## Final Crop Zip Requirement

This is very important: the final crop zip must be project-root extractable.

The zip must contain paths like:

```text
public/game-assets/items/example-item-id.png
public/game-assets/items/example-item-id__few.png
public/game-assets/items/example-item-id__many.png
```

Do not put the files inside an extra wrapper folder like:

```text
wrong-output/public/game-assets/items/...
```

When I extract the zip at the project root, all images must land directly in the correct final folder:

```text
public/game-assets/items/
```

## Final Deliverables

For the sheet renaming phase, return:

- A zip with renamed full sheets in `docs/assets/icon-sheets/`.
- `MATCHING_REPORT.md`.

For the object detection phase, return:

- Review images in `docs/assets/icon-sheets/review/`.
- `OBJECT_DETECTION_REPORT.md`.

For the final crop phase, return:

- A project-root-extractable zip containing cropped icons under `public/game-assets/items/`.
- `CROPPING_REPORT.md` listing processed sheets, cropped icon count, skipped sheets, and any problems.

