# Agent Roadmap - Assets And Icons

## Goal

Replace bad item icons with a clean, consistent generated asset pipeline:

1. Generate sheet prompts in batches of 50 image slots.
2. User generates sheets into `docs/icon-sheets`.
3. Agent reviews sheets before crop/import.
4. Crop sheets into individual item icons.
5. Save final icons under `public/game-assets/items`.
6. Keep paths aligned with `src/data/generated/items.json`.

## Current Prompt Rules

The image prompt should ask for:

- Ultra-cartoony fantasy game-art icons
- Magical, fantastic, artistic, playful, cooler than realistic
- Chunky toy-like 3D forms, bold silhouettes, hand-painted detail
- 16:9 canvas option
- Centered 10x5 square-cell grid
- No visible grid lines or labels
- No checkerboard
- True transparency if possible, otherwise solid pure `#00FF00`
- Strict quantity differences:
  - one = exactly one main object
  - few = exactly 3 to 5 separated pieces
  - many = at least 12 pieces or overflowing container/pile

## Next Work

- Test the newest prompt on at least one sheet.
- If it passes, generate the rest.
- Update cropper to support:
  - 16:9 source sheets
  - centered 10x5 crop region
  - solid green background removal
  - optional transparent background handling
  - output paths from matching JSON `slots[].output`
- Add a crop report listing missing, skipped, or suspicious slots.
- Consider adding a thumbnail QA page for reviewing cropped icons quickly.

## Avoid

- Do not trust old icon filenames/content; old crop order was wrong.
- Do not remap by guessing visual content unless the user explicitly asks.
- Do not commit generated sheets if the user only wants review.

