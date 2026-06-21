# Playtest And Balance Pass

Step 11 is the checkpoint after the pure foundations are in place.

Run:

```powershell
pnpm verify:current-state
pnpm playtest:balance
```

Then manually inspect:

- `docs/systems/profession-stock-review.md`
- `docs/assets/item-icon-lock-report.md`
- `docs/development/playtest-balance-report.md`

## Blockers

Fix these before more feature work:

- new game startup errors;
- current v2 saves fail to reload;
- incompatible old saves load silently;
- protected/concealed goods are auto-offered;
- high-priority profession stock no longer reads by profession;
- missing runtime item icons for common goods;
- company/travel/economy tests fail.

## Manual priority professions

Inspect these first:

- blacksmith;
- miner;
- fletcher;
- barkeep;
- butcher;
- farmer;
- bard;
- toolmaker.
