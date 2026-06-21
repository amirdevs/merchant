# Merchant docs organization patch

This root-overlay patch adds `scripts/organize-docs.cjs`.

After extracting into the repo root, run:

```powershell
node scripts/organize-docs.cjs
pnpm audit:item-icons
pnpm review:stock
pnpm playtest:balance
pnpm verify:current-state
pnpm build
```

The script creates numbered current docs under `docs/`, moves log/generated/legacy docs under `docs/logs/`, updates report output paths, updates root README docs links, and updates `AGENTS.md` with documentation rules.
