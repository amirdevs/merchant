# Barter Regression Tests

Step 4 adds a wider regression safety net around the current barter math and offer rules.

## Command

```powershell
pnpm test:barter
```

`pnpm verify:current-state` also runs this command before `pnpm build`.

## Covered Areas

- Player-side valuation with character, profession, marketplace, kingdom, exotic, frugal, and difficulty modifiers.
- NPC-side valuation with haggling pressure and repeated-offer pressure.
- Bulk-stack discount and cap.
- Illegal-goods discount in normal trade.
- Black-market premium and heat premium.
- Negative-value floor at zero.
- Appraisal thresholds and acceptance gates.
- Equal-value offers staying non-accepted.
- Protected item offer blocking.
- Concealed item exclusion from automatic offer matching.
- Simple human-readable failure reasons for bad or incomplete offers.

## Design Notes

The tests intentionally target pure helpers in `src/lib/barter.ts` instead of full React components. This keeps the barter rules easy to validate before the UI, inventory panels, and customer action handlers are refactored further.

The new helper functions are small and should be reused by UI/action code later:

- `canAcceptAppraisal`
- `availableQuantity`
- `isOfferableEntry`
- `visibleOfferableInventory`
- `explainOfferFailure`

## Follow-up After This Step

The tests confirm current math and rules. The next integration pass should wire the pure helper functions into the trade action handlers if the UI still has duplicated acceptance, protected-item, concealed-item, or failure-message logic.
