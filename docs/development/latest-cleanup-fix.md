# Latest Cleanup Fix

This patch is a small stability cleanup after the Step 5-11 foundation work.

It fixes:

- the accidentally overwritten project `README.md`;
- stale stock-review wording around generated-data bias;
- playtest report summary parsing so clean icon reports do not count the words "missing" or "orphan" as issues;
- fisher stock identity tuning;
- legacy `bankCopper` sync after company cash mutations.

Apply from the repo root:

```powershell
node scripts/apply-latest-cleanup.cjs
pnpm review:stock
pnpm playtest:balance
pnpm test:company
pnpm verify:current-state
pnpm build
```
