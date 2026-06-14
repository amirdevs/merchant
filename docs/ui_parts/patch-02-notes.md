# UI Patch 02 — Screen navigation and responsive page scaffold

This patch assumes patch 01 was already extracted.

## What changed

- Added real section navigation for the game UI:
  - Market
  - Customers
  - Barter
  - Inventory
  - Travel
  - System
- Added a functional main menu screen reachable by clicking the game title or Menu.
- Separated the previous single dense page into multiple responsive screens.
- Added a Market Hub screen closer to the `07_westgate_market_hub_8x.png` design direction.
- Added a dedicated Customers screen closer to the `08_customers_8x.png` design direction.
- Kept Barter as a dense three-column gameplay screen for desktop, but responsive for smaller windows.
- Added Inventory, Travel, and System screens using the same parchment/wood/brass component style.

## Implementation rule

The UI mockups are still used as visual targets only. Buttons, text, inventory grids, customers, offers, travel routes, and menus are real React UI, not cropped mockup images.

## Files changed

- `src/main.tsx`
- `src/styles.css`
- `docs/ui_parts/patch-02-notes.md`
- `docs/ui_parts/patch-02-file-list.txt`

## QA checklist

After extracting at project root, run the app and check:

1. Top tabs switch between sections.
2. Clicking the title opens Main Menu.
3. Market screen customer click opens Barter.
4. Inventory protect/move buttons still work.
5. Travel route buttons still move to a new market.
6. System menu save/load/import/export still work.
7. Resize the Electron/browser window down to tablet/mobile widths and check no section becomes unusable.

## Next patch recommendation

Patch 03 should focus on making the Barter screen visually closer to `09_barter_conversation_main_8x.png`: stronger middle conversation panel, clearer trade meter, better offer zones, and improved NPC mood/preference display.
