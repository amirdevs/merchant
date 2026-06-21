# Stock Balance Tuning Guide

This guide explains the Step 3.6 stock-balance pass.

## Current Stock Model

Final NPC stock is built in layers:

1. profession stock profile and archetypes;
2. lifestyle baseline;
3. character/profession obtainable item pools;
4. original generated-data bias as a mild weight adjustment;
5. kingdom law adjustment for illegal goods;
6. value, rarity, quantity, and restock rules.

Profession identity must remain stronger than generated-data bias. A blacksmith should still look like a blacksmith even when the local market has demand for other goods.

## Bias Strength

Generated biases are intentionally capped and mild:

- character bias: strongest flavor;
- profession bias: medium flavor;
- marketplace bias: light local flavor;
- kingdom bias: light regional flavor;
- illegal tags: strong discouragement for normal merchants, encouragement for criminal/contraband stockers.

If many NPCs in one market start feeling samey, reduce marketplace and kingdom multipliers first.

If special named NPCs feel too generic, use a named stock override instead of raising global bias strength.

## Reading `profession-stock-review.md`

Run:

```powershell
pnpm review:stock
```

Then inspect:

```text
docs/systems/profession-stock-review.md
```

Each profession now reports:

- **Balance status**: `PASS` or `REVIEW`.
- **Identity share**: how much stock matches the profession's core identity.
- **Raw share**: material/input-heavy goods.
- **Consumable share**: food, drink, remedies, produce, spices, etc.
- **Finished share**: weapons, armor, books, art, jewelry, clothes, furniture, etc.
- **Luxury/rare share**: magic, royal, contraband, gold, rare materials, etc.
- **Illegal share**: goods matching the current kingdom's illegal tags.

`PASS` means the stock shape is good enough for the next development step. It does not mean final balance is perfect.

`REVIEW` means inspect the example stock manually before continuing.

## Common Fixes

- Low identity share: increase the profession archetype weight or add missing guaranteed tags.
- Too many finished goods: lower weapons/armor/luxury/art side archetypes or add forbidden tags.
- Too many raw materials: lower raw/material archetypes or add more shop/lifestyle support.
- Too many illegal goods: check `forbiddenTags`, criminal lifestyle inference, and kingdom illegal tags.
- Too much market sameness: reduce marketplace/kingdom bias multipliers.
- Too much generic food/supplies: reduce the lifestyle baseline for that profession.

## Current Manual Review Priorities

Inspect these first after every catalog or stock change:

1. blacksmith;
2. miner;
3. fletcher;
4. barkeep;
5. butcher;
6. farmer;
7. toolmaker;
8. bard.

Move to Step 4 only after these profiles are not obviously wrong in the generated review.
