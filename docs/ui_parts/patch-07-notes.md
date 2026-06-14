# Patch 07 — Connected Profile + Persistent UI Preferences

Apply after patch 06.

## Focus

This patch wires the menu/profile/settings screens into real behavior instead of keeping them as visual-only screens.

## Changes

- Merchant profile choices are now stored in local browser storage.
- New Merchant profile values are written into the first new-game ledger message.
- Top bar and main menu now show the chosen merchant name/background.
- Settings controls now persist across sessions:
  - UI scale
  - dialogue speed staging value
  - decorative motion toggle
  - compact responsive UI toggle
- UI scale applies immediately through CSS variables.
- Decorative motion toggle disables transitions/animations.
- Compact mode tightens panels, gaps, and inventory slots for laptop/small Electron windows.
- Additional small-window responsive polish for toolbar, tabs, profile and settings layouts.

## Notes

The profile choices are intentionally not changing economy balance yet. Difficulty/starter are persisted and displayed, but the real game balance remains untouched until a later data-model patch.

## QA Checklist

1. Open Main Menu and confirm merchant name appears.
2. Open New Merchant, change name/background/starter, Begin Journey.
3. Confirm the top bar and first message reflect the new profile.
4. Open Settings, change UI Scale, toggle Compact UI, and reload app.
5. Confirm settings persist after reload.
6. Resize the Electron window below 820px and 520px; toolbar and tabs should stay usable.
