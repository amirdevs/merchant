# Merchant next roadmap direct overlay

This overlay implements the next playable UI roadmap pass directly. It does not use patch scripts.

Files included:

- `src/app/App.tsx`
- `src/app/types/MerchantController.ts`
- `src/features/market/MarketHubView.tsx`
- `src/features/strategy/StrategyDashboardView.tsx`
- `src/features/company/CompanyView.tsx`
- `docs/09_PLAYABLE_UI_INTEGRATION.md`

After extracting in the repo root, run:

```powershell
pnpm verify:current-state
pnpm build
```

Then manually smoke-test the new Market > Planner flow and Company screen.
