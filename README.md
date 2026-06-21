# Merchant roadmap Step 5-11 root overlay

Extract this ZIP at the repository root.

This cumulative overlay includes Steps 5-11 plus the Step 9/10 company integration fix:

- `createCompanyState`, `CompanyState`, and `settleShipments` are restored/exported from `src/lib/company.ts` for `game.ts` and `save.ts` compatibility.
- Step 11 adds playtest/balance checklist helpers and a report generator.

Run after extracting:

```powershell
pnpm install
pnpm test:company
pnpm test:barter
pnpm test:playtest
pnpm playtest:balance
pnpm verify:current-state
pnpm build
```

Review:

- `docs/development/playtest-balance-report.md`
- `docs/systems/profession-stock-review.md`
- `docs/assets/item-icon-lock-report.md`
