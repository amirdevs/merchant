# Merchant final cleanup fix

Root-overlay hotfix for the last cleanup items found after the latest `main` review.

Apply from repo root:

```powershell
node scripts/apply-final-cleanup.cjs
pnpm review:stock
pnpm playtest:balance
pnpm verify:current-state
pnpm build
```

This patch:

- strengthens fisher stock identity;
- updates stock-review wording to local `stockBiasWeights`;
- changes playtest balance report parsing from word counts to real summary values.

The GitHub default branch still must be changed manually in GitHub settings if desired.
