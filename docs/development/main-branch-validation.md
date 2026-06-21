# Main Branch And Current-State Verification

## Branch Status

The current overhaul work belongs to `main`.

The repository currently still reports `master` as the GitHub default branch. A root-overlay ZIP cannot change GitHub repository settings, so this patch does not alter branches or refs.

Recommended repository setting after reviewing this patch:

```powershell
gh repo edit amirdevs/merchant --default-branch main
```

Or change it in GitHub:

1. Repository Settings.
2. Branches.
3. Default branch.
4. Switch from `master` to `main`.

Do this only after confirming that `main` is the branch you want future PRs, code search, and default clones to target.

## Root-Overlay Patch Workflow

This ZIP is designed to be extracted at the repository root. It contains only files that should overwrite or add files at their real repository paths.

Safe application flow:

```powershell
git checkout main
git pull
# extract ZIP at repo root
pnpm install
pnpm verify:current-state
```

Expected changed/added files from this patch:

```text
README.md
package.json
docs/README.md
docs/development/main-branch-validation.md
docs/development/technical-notes.md
docs/systems/trading-and-stock.md
scripts/review-stock.cjs
scripts/verify-current-state.cjs
```

## Verification Command

Use the aggregate command after stock, trading, item, or icon changes:

```powershell
pnpm verify:current-state
```

It runs the current high-value checks in order:

1. `pnpm audit:data`
2. `pnpm audit:assets`
3. `pnpm audit:stock`
4. `pnpm review:stock`
5. `pnpm test:barter`
6. `pnpm build`

`pnpm review:stock` writes a generated balance report to:

```text
docs/systems/profession-stock-review.md
```

Review that report before item prompt generation or NPC stock tuning. The most important sections to inspect are blacksmith, fletcher, miner, barkeep, bard, farmer, butcher, and toolmaker.

## What This Patch Does Not Do

- It does not commit anything.
- It does not touch GitHub branch settings.
- It does not merge `master` and `main`.
- It does not preserve old save compatibility after item-index/catalog changes.
- It does not finish company stock ownership, dividends, warehouses, shipments, loans, or long-term market simulation.
