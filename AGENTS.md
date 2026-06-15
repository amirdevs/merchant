# Merchant React Electron - Agent Context

This repo is `C:\Freelance\merchant-react-electron`.

The project is an offline React/Electron remake prototype inspired by Merchant of the Six Kingdoms. The user wants to rebuild the game as a local-only app, using the original game as a design/gameplay reference but gradually replacing generated assets so the project has its own look.

## Current UI Direction

Use `docs/ui_parts/` as the current UI visual reference. The target look is bright painterly fantasy merchant UI: sunlit coastal town scenes, parchment ledgers, carved dark wood shells, blue enamel title plates, brass trim, heraldic seals, gold status chips, polished NPC portraits, collectible item art, and beveled green/blue/red command buttons.

Do not describe or implement the UI as a generic dense medieval app. Keep it compact and practical for repeated trading, but match the new premium PC merchant RPG mockups in `docs/ui_parts`.

## Stack

- Package manager: `pnpm`
- App: React 18, TypeScript, Vite, Electron
- Styling: Tailwind CSS v4
- UI icons: `lucide-react`
- Main scripts:
  - `pnpm dev`
  - `pnpm dev:web`
  - `pnpm build`
  - `pnpm audit:data`
  - `pnpm generate:icon-prompts`
  - `pnpm rename:item-icons`

Do not use npm for installs or scripts unless the user explicitly asks.

## Current User Preferences

- The user wants practical implementation, not long proposals.
- The user often says "continue"; continue the current task from local context.
- The user does not need end-of-task game launch testing unless they ask.
- The user expects commits when requested, using Conventional Commit style like `feat(ui): improve inventory`.
- The user is fine with creating new saves; do not spend time preserving old save compatibility unless specifically requested.
- Dist/release build output should not be committed.

## Asset Pipeline State

The item icon pipeline is being restarted. Old generated/cropped item icons were bad because the cropped image content did not match filenames. The user plans to remove/remake item icons.

Important folders:

- `docs/assets/icon-prompts/`: generated JSON configs for image generation
- `docs/assets/icon-sheets/`: user will place generated full sheets here for review
- `public/game-assets/items/`: final cropped item icons should eventually go here
- `scripts/generate-icon-prompts.cjs`: generates the prompt configs
- `scripts/crop-icon-sheet.ps1`: existing cropper work from earlier; may need updates for green background and 16:9 sheets

Current prompt config design:

- 1972 items from `src/data/generated/items.json`
- 2672 total image slots after counting `one`, `few`, and `many`
- 54 config JSON files
- Each config contains at most 50 image slots
- Each sheet should be a strict `10 columns x 5 rows` reading left-to-right, top-to-bottom
- Some items use `single_few_many`; those consume 3 slots
- Use each JSON's `generationPrompt` field when generating images

The latest prompt direction requested by the user:

- Do not pressure exact high resolution; user will upscale later.
- Do not mention PNG in the image prompt.
- If true transparency is not possible, use a solid pure `#00FF00` green background.
- Make the art "totally ultra cartoony and artistic", more magical, fantastic, playful, and cooler.
- Avoid realistic or semi-realistic output.
- Quantity variants must be visually clear:
  - `one`: exactly one main item only
  - `few`: exactly 3 to 5 clearly separated pieces
  - `many`: at least 12 pieces or an overflowing container/pile

Last known issue: a generated batch looked better stylistically but still too realistic/boring for the user, and `one/few/many` sometimes did not read correctly. The generator has been patched to address this, but the user has not yet tested the newest prompt.

## Sheet Review Checklist

When the user asks to "check" generated sheets in `docs/assets/icon-sheets`:

1. List files by `LastWriteTime`.
2. Treat newest files as the next configs in sorted `docs/assets/icon-prompts/items-*.json` order unless filenames match configs.
3. View the images.
4. Check:
   - 50 icons per normal sheet, or correct count for final sheet
   - 10x5 layout
   - left-to-right/top-to-bottom order against the matching JSON `order`
   - style: ultra-cartoony magical fantasy game art, not realistic
   - background: true transparent or solid `#00FF00`; no checkerboard
   - `one/few/many` quantity differences
   - enough spacing for cropping
5. Be direct: say whether to keep or regenerate.

## Git Notes

Recent relevant commits:

- `c412245 feat(assets): rename item icons`
- `65ae229 feat(assets): add cropped item icons`
- `d17f26b feat(assets): preserve icon prompt production files`
- `ff2336d feat(assets): track item icon prompts`
- `302e4c5 feat(assets): generate item icon prompts`

Current worktree may be very dirty because the user is intentionally deleting/remaking item assets. Do not restore asset deletions unless the user explicitly asks.

## Validation

Run `pnpm audit:data` after data/script prompt changes. This has been passing.

## UI Architecture Rules

- Tailwind CSS is the default styling system. Use Tailwind utility classes directly in components for layout, spacing, typography, state styling, and responsive behavior.
- Keep `src/styles.css` minimal: Tailwind imports, font-face declarations, theme tokens, root/body reset, and truly global browser basics only.
- Do not add broad global override files such as `ui-cooking.css`, `ui-gamefit.css`, or similar patch-layer CSS.
- Do not use global CSS to force all screens into shape. Build each screen as real React components that fit the game viewport by design.
- Use small modular React files. Avoid giant components, giant utility files, and multi-component dump files.
- Use component-local CSS modules only when Tailwind cannot cleanly express the effect, such as masks, pseudo-elements, nine-slice frame effects, or complex decorative asset layering.
- Do not introduce duplicate architecture roots. The current clean base uses `src/app`, `src/features`, `src/components`, `src/lib`, and `src/data`.
- Do not recreate `src/sub-domains` unless the user explicitly asks to return to that naming.
- Before returning a patch, check imports for stale references to deleted folders and removed CSS layers.
