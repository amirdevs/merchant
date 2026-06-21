# UI Integration Pass

Step 10 adds a small view-model layer that turns the pure systems from Steps 6-9 into UI-ready cards and panels.

The goal is not a full screen redesign yet. The goal is to make integration safe by giving UI components simple objects to render instead of reaching directly into every economy, travel, quest, and company helper.

## Source Files

- `src/lib/ui-integration.ts`
- `src/lib/ui-integration.test.ts`

## Command

```powershell
pnpm test:ui-integration
```

`pnpm verify:current-state` also runs this test.

## What The View Models Cover

- inventory money/value/capacity summaries;
- travel route cards with cost, risk, blockers, and warnings;
- quest cards with status and next action;
- company panels with cash, net value, share price, weekly costs, and solvency warnings;
- a combined action checklist for "what should the player resolve before leaving or ending the week".

## Integration Rule

Screens should prefer these view models when showing summary cards. Detailed systems can still use the lower-level helpers, but visible UI should avoid duplicating calculation logic.

## Step 9 Test Fix Included

This overlay also fixes the company shipment test expectation for upfront insured shipment cost. The implementation uses `Math.ceil` for insurance, so cargo worth 80 copper at the default 8% insurance rate costs 7 copper, not 6.
