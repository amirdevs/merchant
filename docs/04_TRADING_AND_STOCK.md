# 04 - Trading And Stock

## Stock model

Final NPC stock is built from multiple layers:

```text
profession stock profile
+ lifestyle baseline
+ named character override
+ generated-data stock bias
+ legal/illegal rules
+ value/rarity/quantity limits
```

The stock profile is the main identity layer. A blacksmith should still look like a blacksmith, a fisher like a fisher, and a barkeep like a barkeep.

Generated-data bias is mild flavor, not the main stock driver. It uses local `stockBiasWeights` on each resolved stock profile. Character and profession bias are strongest; market and kingdom bias are lighter. Illegal kingdom tags discourage legal merchants and can support criminal/contraband stock.

## Current stock files

- `src/data/stock/types.ts`
- `src/data/stock/tiers.ts`
- `src/data/stock/archetypes.ts`
- `src/data/stock/profiles.ts`
- `src/lib/stock-profiles.ts`
- `scripts/audit-stock.cjs`
- `scripts/review-stock.cjs`

## Stock validation

Run:

```powershell
pnpm audit:stock
pnpm review:stock
```

The review report is a generated log and should be kept under `docs/logs/`.

## Barter model

Barter valuation includes:

- base item value
- character bias
- profession bias
- marketplace bias
- kingdom bias
- exotic/import bonus
- bulk discount
- NPC frugality
- NPC haggling
- repeated failed-offer pressure
- illegal/black-market effects
- heat/risk

## Real offerability rules

- Protected player goods must not be offered manually or by Ask Price.
- Concealed player goods must not be used by auto-offer matching.
- Equal value is not enough; accepted offers must be favorable enough for the NPC.
- Failure explanations should be readable and actionable.

## Tests

Run:

```powershell
pnpm test:barter
```
