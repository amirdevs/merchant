# Step 4 Hotfix Notes

This patch fixes two issues found after the Step 0-4 overlay was applied and Codex ran the first stabilization pass.

## Fixes

1. `Ask Price` now uses the shared offerability rules for automatic player-side matching, so protected player goods cannot be auto-offered.
2. Generated-data stock bias weights are no longer stored by mutating the global `stockArchetypes.bias` object. Resolved stock profiles now carry their own `stockBiasWeights`, and inventory generation merges those weights locally.

## Apply

From repo root after extracting this overlay:

```powershell
node scripts/apply-step4-hotfix.cjs
pnpm test:barter
pnpm verify:current-state
pnpm build
```

## Expected touched files

- `package.json`
- `scripts/review-stock.cjs`
- `src/data/stock/archetypes.ts`
- `src/data/stock/types.ts`
- `src/lib/game.ts`
- `src/lib/stock-profiles.ts`
- `src/lib/game-auto-offer.test.ts`
