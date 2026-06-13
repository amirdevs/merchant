# Asset Pipeline And Redesign Notes

This project currently includes extracted original-style assets under `public/game-assets`. The long-term direction is to keep the gameplay/data reference while gradually replacing generated or copied assets with a distinct local remake style.

## Current Asset Inventory

Visual images in `public/game-assets/imgs`: **359**

| Category | Count | Notes |
| --- | ---: | --- |
| Characters | 202 | Mostly `2048x2048` PNG portraits. Most recognizable asset group. |
| Routes | 45 | Huge route/map images, usually `8192x6828`. |
| Town squares | 21 | Mostly `600x300` JPG scene panels. |
| Backdrops | 19 | Mostly `1920x800` JPG dialogue/background scenes. |
| Flags | 16 | Mix of square `800x800` and banner-like `762x508` PNGs. |
| Stalls | 10 | Small merchant stall/table images. |
| Symbols | 10 | Religion, magic, or faction-style symbols. |
| Settlements | 9 | Small map settlement icons. |
| Cursors | 4 | Cursor outline images. |
| Coat of arms | 4 | Small heraldry images. |
| Seals | 4 | Small seal images. |
| Textures | 3 | Paper/background texture pieces. |
| UI | 3 | Mouse-click helper images. |
| Backgrounds | 2 | General background images. |
| Kazuujan | 2 | Special Kazuujan scene images. |
| Maps | 1 | Main map image. |
| Landing | 1 | Landing/title-style image. |

Audio files in `public/game-assets/media`: **1190**

| Category | Count |
| --- | ---: |
| Voices | 1091 |
| Item sounds | 29 |
| UI sounds | 14 |
| Music | 12 |
| Ambiance | 12 |
| Quest/crowd sounds | 11 |
| Unused sounds | 10 |
| General sounds | 8 |
| Fanfares | 3 |

Font files in `public/game-assets/fonts`: **21**

## Redesign Priority

1. Characters: redesign first. Portraits are the most recognizable original asset group.
2. Town squares and backdrops: these define the game atmosphere.
3. Flags, symbols, coats of arms, and seals: redesign faction identity assets after the main scenes.
4. Stalls, settlements, routes, and map assets: redesign after major identity assets.
5. Audio: redesign later unless the goal becomes a full identity change.

## Item Icon Pipeline

Goal: replace bad item icons with a clean, consistent generated asset pipeline.

1. Generate sheet prompts in batches of 50 image slots.
2. User generates full sheets into `docs/assets/icon-sheets`.
3. Agent reviews sheets before crop/import.
4. Crop sheets into individual item icons.
5. Save final icons under `public/game-assets/items`.
6. Keep paths aligned with `src/data/generated/items.json`.

Important folders:

- `docs/assets/icon-prompts/` - generated JSON configs for image generation.
- `docs/assets/icon-sheets/` - generated full sheets for review.
- `public/game-assets/items/` - final cropped item icons.
- `scripts/generate-icon-prompts.cjs` - generates prompt configs.
- `scripts/crop-icon-sheet.ps1` - crops sheets into individual icons.
- `scripts/rename-item-icons.cjs` - legacy icon rename helper; less relevant after the icon pipeline restart.

## Current Prompt Rules

The image prompt should ask for:

- Ultra-cartoony fantasy game-art icons.
- Magical, fantastic, artistic, playful, cooler than realistic.
- Chunky toy-like 3D forms, bold silhouettes, hand-painted detail.
- 16:9 canvas option.
- Centered 10x5 square-cell grid.
- No visible grid lines or labels.
- No checkerboard.
- True transparency if possible, otherwise solid pure `#00FF00`.
- Strict quantity differences:
  - `one` = exactly one main object.
  - `few` = exactly 3 to 5 separated pieces.
  - `many` = at least 12 pieces or overflowing container/pile.

Avoid realistic or semi-realistic output.

## Sheet Review Checklist

When checking generated sheets in `docs/assets/icon-sheets`:

1. List files by `LastWriteTime`.
2. Treat newest files as the next configs in sorted `docs/assets/icon-prompts/items-*.json` order unless filenames match configs.
3. View the images.
4. Check:
   - 50 icons per normal sheet, or correct count for the final sheet.
   - 10x5 layout.
   - Left-to-right/top-to-bottom order against the matching JSON `order`.
   - Ultra-cartoony magical fantasy game art, not realistic.
   - Background is true transparent or solid `#00FF00`; no checkerboard.
   - `one/few/many` quantity differences are visually clear.
   - Enough spacing for cropping.
5. Be direct: say whether to keep or regenerate.

## Next Asset Work

- Test the newest prompt on at least one sheet.
- If it passes, generate the rest.
- Update cropper if needed for:
  - 16:9 source sheets.
  - Centered 10x5 crop region.
  - Solid green background removal.
  - Optional transparent background handling.
  - Output paths from matching JSON `slots[].output`.
- Add a crop report listing missing, skipped, or suspicious slots.
- Consider adding a thumbnail QA page for reviewing cropped icons quickly.

## Avoid

- Do not trust old icon filenames/content; old crop order was wrong.
- Do not remap by guessing visual content unless explicitly asked.
- Do not commit generated sheets if the user only wants review.
- Character portraits should not be generated in large 100-image sheets. Use individual prompts or small batches.
- Town squares and backdrops should be generated one scene at a time or in very small batches.

