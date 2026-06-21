# Economy Foundation

Step 6 adds a shared economy helper layer in `src/lib/economy.ts`.

## Goals

- Keep money math in one place.
- Use the generated item values for coin denominations instead of hard-coding all wallet math into UI/game actions.
- Separate coin value from non-coin inventory value.
- Keep capacity/carry/pull totals reusable for trade, travel, warehouses, and future company systems.

## Current Helpers

- `coinDenominations(items)`: finds copper, silver, and gold coin items and reads their `loafValue` as copper-equivalent value.
- `inventoryCoinValue(inventory, items)`: totals visible wallet value.
- `moneyBreakdown(copperValue, items?)`: converts a copper value into gold/silver/copper display units.
- `formatMoney(copperValue, items?)`: readable compact label such as `1g 3s 50c`.
- `walletSummary(inventory, items)`: combines wallet value, coin counts, and denominations.
- `inventoryTotals(inventory, items)`: returns total value, coin value, non-coin value, weight, size, capacity, overload, pack animals, and storage items.
- `canAffordCopper(...)`: checks wallet affordability.
- `spendCopper(...)`: spends from visible coins and returns change using available coin denominations.
- `tradeAffordability(...)`: returns readable affordability data for UI and future trade checks.

## Important Behavior

`spendCopper` spends only visible coin quantities. If a coin stack has `offerQuantity`, that offered part is preserved. The visible wallet is normalized into the largest available denominations after payment.

This is acceptable for tolls, fees, and future payment helpers because the system cares about wallet value more than preserving the exact original coin stack split.

## Verification

Run:

```powershell
pnpm test:economy
pnpm verify:current-state
```

## Future Work

Step 6 does not yet redesign the trade UI. Later economy work can now use these helpers for:

- NPC budget checks;
- quick-payment buttons;
- exact fee/toll/stallage payment;
- warehouse fees;
- shipment insurance;
- company ledger valuation;
- route profit forecasts.
