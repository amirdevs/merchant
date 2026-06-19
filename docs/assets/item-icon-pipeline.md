# Item Icon Pipeline

This document tracks the current item icon generation pipeline.

## Folders

- `docs/assets/icon-prompts/`: generated JSON prompt configs.
- `docs/assets/icon-sheets/`: generated full sheets placed here for review.
- `public/game-assets/items/`: final cropped runtime item icons.

## Scripts

- `pnpm generate:icon-prompts`: regenerates prompt configs from generated item data.
- `pnpm rename:item-icons`: legacy rename utility.
- `scripts/crop-icon-sheet.ps1`: cropper for generated icon sheets.

Run `pnpm audit:data` after changing data or prompt-generation scripts.

## Current Prompt Batch Shape

- Source data: `src/data/generated/items.json`.
- Current item count: 1,972.
- Current output slots: 2,672 after `one`, `few`, and `many` variants.
- Config count: 54 normal JSON files.
- Normal sheet layout: strict 10 columns by 5 rows.
- Normal sheet size: 50 image slots.
- Final sheet may contain fewer than 50 slots.
- Read order: left to right, top to bottom.

Use each config file's `generationPrompt` field when generating images.

## Current Art Direction

- Ultra-cartoony magical fantasy game art.
- Playful, artistic, fantastic, and readable as small inventory icons.
- Avoid realistic or semi-realistic output.
- Do not mention PNG in image prompts.
- Do not require exact high resolution; upscaling can happen later.
- Prefer true transparency when possible.
- If transparency is unavailable, use a solid pure `#00FF00` background.

## Quantity Rules

- `one`: exactly one main item only.
- `few`: exactly 3 to 5 clearly separated pieces.
- `many`: at least 12 pieces or an overflowing container, pile, crate, bowl, sack, bundle, or cluster.

## Sheet Review Checklist

When reviewing files in `docs/assets/icon-sheets`:

1. List files by `LastWriteTime`.
2. Match newest files to sorted `docs/assets/icon-prompts/items-*.json` order unless filenames identify configs.
3. Check that each normal sheet has 50 icons and the final sheet has the expected remaining count.
4. Check for a strict 10 by 5 layout.
5. Check left-to-right, top-to-bottom order against the matching config `order`.
6. Check style: ultra-cartoony magical fantasy game art, not realistic.
7. Check background: true transparent or solid `#00FF00`; no checkerboard.
8. Check `one`, `few`, and `many` quantity differences.
9. Check enough spacing for cropping.
10. Decide directly whether to keep or regenerate.
