# Merchant Roadmap Step 5-8 Overlay

Extract this ZIP in the repository root. It includes the Step 5 item/icon lock tooling, Step 6 economy helpers, Step 7 travel/risk helpers, and Step 8 quest/contract/dialogue runtime foundation.

After extracting, run:

```powershell
pnpm install
pnpm test:quests
pnpm verify:current-state
pnpm build
```

Important generated/review files after verification:

- `docs/assets/item-icon-lock-report.md`
- `docs/assets/item-icon-manual-review.csv`
- `docs/systems/profession-stock-review.md`

Step 8 adds `src/lib/quest-runtime.ts` and `src/lib/quest-runtime.test.ts`.
