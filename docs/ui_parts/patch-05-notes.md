# UI Patch 05 — Travel Map, Market Hub, Customers

Apply after patch 04.

## Focus

This patch moves the next three mockup targets closer to real implementation:

- `06_travel_map_8x.png`
- `07_westgate_market_hub_8x.png`
- `08_customers_8x.png`

## Changed

- Reworked Market screen into a denser Market Hub layout with hero art, customer row, merchant ledger, economy notes, market notes, and route cards.
- Reworked Customers screen into a customer board plus selected customer dossier.
- Reworked Travel screen into a large responsive map stage with route ledger, map card, compass badge, demand/discount panels, and route cards.
- Kept all UI dynamic React components; no UI mockup PNGs are sliced into runtime UI.
- Added responsive behavior for desktop, medium windows, and narrow Electron windows.

## Files

- `src/main.tsx`
- `src/styles.css`

## QA checklist

After extracting, run the app and check:

1. Market tab: hero art, customer row, local economy, market notes, and nearby routes.
2. Customers tab: customer board, selected portrait/dossier, preferences, and trade position.
3. Travel tab: map nodes, route ledger, current city node disabled, connected destinations clickable.
4. Resize the Electron window to confirm the panels stack cleanly.

## Next patch recommendation

Patch 06 should focus on Main Menu, New Merchant/Profile, Load Game, Settings, and System Menu polish.
