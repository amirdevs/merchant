# UI Patch 08 — QA Board + Keyboard/Responsive Polish

Apply after patch 07.

## What changed

- Added a temporary **UI QA Board** screen for comparing the React implementation against the 12 UI mockups.
- Added a `QA` tab to the top navigation.
- Added keyboard shortcuts for faster playtesting:
  - `1` Market
  - `2` Customers
  - `3` Barter
  - `4` Inventory
  - `5` Travel
  - `6` System
  - `7` QA Board
  - `M` Main Menu
  - `I` Inventory
  - `B` Barter, or Customers if no customer is selected
  - `C` Customers
  - `T` Travel
  - `Y` System
  - `Q` QA Board
  - `Esc` System / return to market from main menu
  - `?` Help controls
  - `Ctrl/Cmd + S` Save local
  - `Ctrl/Cmd + O` Import save
- Improved focus-visible styling so keyboard navigation is easier to inspect.
- Added responsive CSS for the QA board at 1100px, 680px, and 520px widths.

## Files changed

- `src/main.tsx`
- `src/styles.css`
- `docs/ui_parts/patch-08-notes.md`
- `docs/ui_parts/patch-08-file-list.txt`

## Why this step exists

Before deeper polish, we need a fast way to jump between every implemented screen and test resizing. This board is developer-facing and can be removed later after the UI is stable.
