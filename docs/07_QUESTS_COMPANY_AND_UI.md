# 07 - Quests, Company, And UI Integration

## Quest, contract, and dialogue runtime

Quest helpers live in `src/lib/quest-runtime.ts`.

They cover:

- accepting local quests from typed dialogue effects
- completing local quests
- consuming required quest items safely
- avoiding quantities already in offer panels
- paying quest rewards
- accepting contracts
- unlocking markets
- appending dialogue log entries
- summarizing notice-board work

Run:

```powershell
pnpm test:quests
```

## Company, warehouses, shipments, and stock ownership

Company helpers live in `src/lib/company.ts`.

They cover:

- company state creation
- market-specific warehouses
- warehouse storage and retrieval
- shipment planning
- shipment tolls, risk, insurance, declared cargo value
- delivery/loss resolution
- company cash and valuation
- warehouse and in-transit cargo value
- reputation/influence value
- weekly fixed costs
- share price and dividends
- hired agents and shipment assignment
- player investment

Run:

```powershell
pnpm test:company
```

## UI integration helpers

UI-facing view model helpers live in `src/lib/ui-integration.ts`.

They cover:

- inventory money/value/capacity panel model
- travel route card model
- quest card model
- company summary panel model
- combined action checklist for blockers/warnings

Run:

```powershell
pnpm test:ui-integration
```

## Next product work

Turn helpers into visible screens in this order:

1. trading screen clarity
2. travel confirmation and arrival screen
3. quest/contract board and actions
4. warehouse/company screens
