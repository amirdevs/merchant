# UI implementation notes — patch 01

Source target: GitHub `master` branch, especially the current React/Electron structure under `src/` and the mockups under `docs/ui_parts/`.

This patch intentionally does **not** slice the mockup PNGs into buttons or text panels. The PNGs are used as the visual target only. Runtime UI is real React/CSS so inventory, NPCs, market data, prices, save/load, text, and responsive states remain dynamic.

## What changed

- Reworked `src/styles.css` into a medieval merchant design system:
  - carved wood frame
  - parchment/brass panels
  - rounded brass buttons
  - responsive 3-column barter layout
  - responsive stacked layout for tablet/mobile
  - polished item slots and map/customer panels
- Replaced `src/components/ui.tsx` with reusable styled wrappers:
  - `Panel`
  - `Button`
  - `IconButton`
  - `Muted`
- Reworked `src/components/InventoryPanel.tsx` to look closer to the inventory/search/detail mockups:
  - stronger item cells
  - better icon framing
  - parchment/brass controls
  - responsive grid
  - protected/starred state still preserved
- Reworked `src/main.tsx` layout toward the barter/conversation, market hub, customers, travel map, and inventory mockups while preserving current game logic.

## Responsive rules

The UI is designed around a 16:9 Electron viewport but scales down:

- Wide desktop: 3-column barter layout.
- Medium desktop/tablet: right inventory moves below as a two-column row.
- Small screen: all panels stack vertically; toolbar becomes a two-column button grid.

## Next patch recommendations

1. Add an actual screen state system for the 12 mockup pages.
2. Add Main Menu, New Merchant Profile, Load Game, Settings, and System Menu screens.
3. Add a reusable Item Detail modal that opens from inventory slots.
4. Add search/filter overlay matching `11_inventory_search_filter_8x.png`.
5. Add better exact background/texture assets if you want an even closer match to the PNG mockups.

## Important

This patch is a root-overlay ZIP. Extract it at the project root.
