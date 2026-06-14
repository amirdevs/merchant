# UI Patch 04 — Inventory Management + Item Detail

This patch assumes patches 01, 02, and 03 have already been extracted.

## Focus

Patch 04 moves the inventory UI closer to the mockups:

- `10_inventory_management_8x.png`
- `11_inventory_search_filter_8x.png`
- `12_item_detail_modal_8x.png`

## What changed

- Added a richer `InventoryManagementScreen` in `src/main.tsx`.
- Upgraded `InventoryPanel` with:
  - search by item name or tag
  - category filter chips
  - sorting by name, value, quantity, and weight
  - inventory summary row
  - visible inspect button per item
  - reusable item detail modal
  - protected cargo badges
  - compact mode for offer panels
- Added responsive layout rules for desktop, medium, and narrow Electron windows.

## How to test

1. Extract this ZIP at the project root.
2. Run the game.
3. Open the `Inventory` tab.
4. Try searching for an item, changing filters, sorting, protecting items, and clicking the eye icon on an item.
5. Check that Barter still works, because Barter uses the same upgraded `InventoryPanel`.

## Notes

The UI is still built as real React components, not cropped mockup images. Static mockups remain visual targets only.
