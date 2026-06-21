# Phase 0 To 3 Patch Notes

This root-overlay patch is cumulative with the earlier validation ZIP and continues through roadmap Step 3.

## Step 0: Branch/Default Cleanup Support

Implemented in docs/tooling only:

- `README.md` and docs now state that active overhaul work is on `main`.
- `docs/development/main-branch-validation.md` documents the remaining manual GitHub default-branch change.

Not automated:

- Changing GitHub's default branch from `master` to `main` still has to be done in GitHub repository settings.

## Step 1: Current-State Validation

Implemented:

- `pnpm verify:current-state` in `package.json`.
- `scripts/verify-current-state.cjs` runs the core checks in order.
- `scripts/review-stock.cjs` generates stronger stock diagnostics.
- Docs updated to list the current commands and expected validation flow.

## Step 2: Save Schema Clean Break

Implemented:

- `SAVE_VERSION` is now `2`.
- Save envelopes now include `schemaLabel: "item-catalog-2026-06-v2"`.
- Legacy raw `GameState` saves and older envelope versions are rejected.
- Save slots report `compatible`, `incompatible`, `corrupt`, or `empty`.
- The Save/Load UI disables loading incompatible/corrupt saves but allows deleting or overwriting them.
- `docs/development/save-schema.md` documents the decision and future migration path.

Reason:

- Inventory ownership still uses `itemIndex`, and the item catalog was recreated. Old saves could silently point to the wrong item.

## Step 3: NPC Stock Realism Pass

Implemented:

- Added `LifestyleStockBaselineId` and `LifestyleStockBaseline` types.
- Added lifestyle baselines: poor, worker, shopkeeper, traveler, noble, military, criminal, religious.
- Replaced runtime universal baseline behavior with inferred/profile-selected lifestyle baselines.
- Strongly retuned high-priority profession profiles:
  - blacksmith
  - fletcher
  - miner
  - barkeep
  - bard
  - farmer
  - butcher
  - toolmaker
  - plus nearby profiles such as baker, cook, fisher, hunter, seamstress, sailor, soldier, etc.
- Strengthened archetype weights and forbidden tags so profession stock is more identifiable.
- Updated `review-stock` to mirror lifestyle-baseline resolution.

## After Extracting

Run:

```powershell
pnpm install
pnpm verify:current-state
```

Then manually inspect:

```powershell
docs/systems/profession-stock-review.md
```

High-priority manual review targets remain blacksmith, fletcher, miner, barkeep, bard, farmer, butcher, and toolmaker.

## Step 3.5: Bias-Aware Stock Generation

Implemented:

- Added a dynamic `bias` stock archetype.
- `resolveStockProfile` now converts original generated-data biases into stock-selection weights.
- Stock selection now softly considers:
  - `character.bias`
  - `profession.bias`
  - `marketplace.bias`
  - `kingdom.bias`
  - `kingdom.illegalItemTags`
- Character and profession biases are strongest; market and kingdom biases are lighter.
- Positive biases increase selection weight; negative biases reduce selection weight.
- Illegal kingdom tags reduce normal merchant stock but increase criminal/contraband-oriented stock.
- `pnpm review:stock` now shows a generated-data stock bias preview per profession sample.

Reason:

- The remake stock profiles should not erase original-game taste, market, and kingdom logic. Profiles define the profession shape; generated biases now nudge the final assortment toward the original data.

## Step 3.6: Stock Balance Inspection And Tuning

Implemented:

- Tuned original generated-data bias influence down so it stays a flavor layer instead of overpowering profession identity.
- Tightened dynamic bias caps:
  - character bias remains strongest,
  - profession bias is secondary,
  - marketplace and kingdom bias are lighter,
  - normal merchants are more strongly discouraged from kingdom-illegal goods,
  - criminal/contraband-oriented stockers still receive illegal-good encouragement.
- Added explicit balance targets to `scripts/review-stock.cjs` for the important profession profiles.
- `pnpm review:stock` now reports:
  - `Balance status: PASS` or `REVIEW`,
  - identity share,
  - raw-material share,
  - consumable share,
  - finished-good share,
  - luxury/rare share,
  - illegal-goods share.
- Added `docs/development/stock-balance-tuning.md` as the interpretation guide.

Reason:

- Step 3.5 connected old generated biases to stock, but Step 3.6 keeps those biases mild and gives us a repeatable way to decide whether NPC stock is balanced enough before moving to barter regression tests.

## Step 4 Addendum - Barter Correctness Regression Tests

This overlay also includes Step 4 regression coverage for the current barter layer.

Changed files:

- `src/lib/barter.ts`
- `src/lib/barter.test.ts`
- `docs/development/barter-regression-tests.md`

Step 4 adds pure helper functions for acceptance, offerability, and failure messages so rules can be tested outside the React UI. The existing `pnpm test:barter` command now covers valuation modifiers, appraisal thresholds, illegal goods, black-market premiums, repeated haggling pressure, protected/concealed item rules, and bad-offer explanations.

Run:

```powershell
pnpm test:barter
```

or run the whole verification gate:

```powershell
pnpm verify:current-state
```
