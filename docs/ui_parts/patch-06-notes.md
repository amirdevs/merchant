# UI Patch 06 — Main Menu, Profile, Load, Settings

Apply after patch 05.

## Focus

This patch implements the remaining menu mockup family:

- `01_main_menu_8x.png`
- `02_new_merchant_profile_8x.png`
- `03_load_game_8x.png`
- `04_settings_8x.png`
- `05_system_menu_8x.png`

## What changed

- Main menu is now a dedicated full-screen medieval hero layout.
- Added New Merchant Profile view with responsive form controls.
- Added Load Game view with local/import/export save slot styling.
- Added Settings view with audio toggle and staged UI/text controls.
- System menu now links to the visual Settings screen.

## Notes

The profile choices are UI-ready but not yet persisted into game state. The existing `newGame()` logic is kept safe for now. A later gameplay-data patch can wire profile/background/difficulty into the save schema.
