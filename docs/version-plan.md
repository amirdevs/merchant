# Version Plan

The rebuild target is original gameplay parity first, with a more usable modern interface around it. Rules should stay close to the extracted original data and logic unless a later version is explicitly marked as a balance or quality-of-life change.

## v0.2 - Logic Boundaries

Status: in progress.

- Keep item movement, offer transfer, and protected/starred items in `src/lib/inventory.ts`.
- Keep offer valuation and deal appraisal in `src/lib/barter.ts`.
- Keep customer filtering and selected-customer lookup in `src/lib/npc-flow.ts`.
- Keep travel pricing and route calculations in `src/lib/travel.ts`.
- Keep local storage save/load in `src/lib/save.ts`.
- Preserve the current extracted data counts from `src/data/generated/manifest.json`.

## v0.3 - Original Inventory Parity

- Improve generated NPC inventories against the original profession and character item pools.
- Audit weak or empty NPC stocks with deterministic inventory reports.
- Add inventory sorting, filtering, and compact item inspection.
- Keep protected/starred player items unavailable for haggling requests and offer additions.

## v0.4 - Original Haggling Parity

- Rebuild haggling as a visible conversation flow instead of a single hidden value check.
- Show what the selected NPC likes, dislikes, overvalues, and undervalues.
- Explain offer quality with clear labels such as bad, reaching, close, fair, good, and great.
- Add a next-customer action that advances inside the customer flow instead of acting like goodbye.

## v0.5 - Travel And Fatigue

- Recreate route costs, delays, market travel, and tolls from original logic where available.
- Make travel costs legible before confirming the route.
- Reduce repeated-click friction in market, inventory, and dialogue flows.

## v0.6 - Help And Accessibility

- Add an on-screen help button that opens a modal with all keyboard and mouse actions.
- Make long dialogue and chat text scroll correctly inside its box.
- Add clearer hover and selected states for dense inventory screens.

## Later Balance Pass

Only after original logic is working, apply optional changes:

- Lower travel expenses if they still feel too punishing.
- Improve bad NPC inventories by profession and market.
- Add more haggling feedback and merchant personality differences.
- Add new items or events while keeping them separate from the original-data baseline.
