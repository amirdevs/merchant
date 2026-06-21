# Trading and NPC Stock System

This document is the canonical spec for the current barter loop, customer behavior, NPC stock configuration, restocking, stock diagnostics, and intended extension points.

Use `profession-stock-audit.md` as the detailed balance appendix for profession-specific stock problems and recommended stock personality work. Use the generated `profession-stock-review.md` after every stock/item change to inspect real deterministic samples.

## Core Trading Loop

The player trades directly with one customer at a time.

1. The market selects the next unseen customer from the current day's queue.
2. The player moves goods from either inventory into the two offer panels.
3. Offer values are calculated from item value, market demand, NPC preferences, relationship state, illegal-good risk, and other trade modifiers.
4. `Ask Price` asks the NPC to price selected goods from their stock.
5. `Ask Offer` lets the NPC construct a counteroffer against the player's selected goods.
6. `Accept` resolves the barter.
7. `Goodbye` dismisses the customer for the current day and advances to the next unseen customer.

The conversation modal is informational. Trade-changing actions remain on the main barter screen so a modal does not hide the inventories or offer controls.

## Inventory Controls

- Left click: move one item.
- Repeated left click: continue moving one item per click.
- Shift + left click: move half.
- Alt + left click: move ten.
- Middle click: move half.
- Right click: move or clear the full stack.
- Drag and drop: relocate the full stack between stock and offer.
- Protect: prevents accidental movement from the player's stock.
- Conceal: hides player goods from automatic offer matching and visible inspection flows where supported.

The drag preview is only visual. It shows the item, full name, and quantity while leaving the source slot visible.

## Customer Queue

The customer order is deterministic but changes by market and day. Reloading the same save on the same day produces the same order.

Priority order:

1. Unresolved named quest contacts.
2. Active event contacts.
3. NPCs specifically available on that weekday.
4. Remaining customers in a seeded daily shuffle.

Once seen, traded with, skipped, or dismissed, a customer leaves the queue until the next day. The queue resets after day advancement and travel.

## NPC Identity Versus Stock

NPC identity and stock behavior are separate concepts:

- `profession`: displayed occupation and profession-specific preferences.
- `professionSlug`: reusable data template such as `blacksmith`, `alchemist`, or `merchant`.
- `isMerchant`: commercial importance flag used by existing gameplay systems.
- stock profile: explicit inventory capacity, assortment, quantity, and restocking behavior.

`isMerchant` does not choose an NPC's goods. It only guarantees at least a `stocked` capacity unless a named character override changes it. Archetypes and profession defaults choose the goods.

## Stock Configuration Files

The stock system is centralized in:

- `src/data/stock/tiers.ts`
- `src/data/stock/archetypes.ts`
- `src/data/stock/profiles.ts`
- `src/data/stock/types.ts`
- `src/lib/stock-profiles.ts`

Generated character JSON does not need to be edited to rebalance every NPC.

Resolution order:

1. Profession default from `professionStockProfiles`.
2. Merchant minimum-capacity rule when `isMerchant` is true.
3. Named override from `characterStockOverrides`.
4. General fallback when no profession profile exists.
5. Universal baseline overlay for small general goods and basic supplies.

Named overrides are authoritative and can replace the tier, archetypes, restock behavior, value bands, and modifiers.

## Stock Tiers

A stack is one distinct item type, regardless of quantity.

| Tier | Distinct stacks | Quantity multiplier | Typical purpose |
|---|---:|---:|---|
| Empty | 0 | 0 | Story-only NPC |
| Pocket | 3-6 | 0.5 | Beggar, messenger |
| Sparse | 6-11 | 0.7 | Guard, incidental local |
| Light | 10-16 | 0.9 | Traveler, worker |
| Modest | 15-22 | 1.1 | Small vendor |
| Standard | 21-30 | 1.4 | Craftsperson |
| Stocked | 29-40 | 1.8 | Regular merchant |
| Large | 39-52 | 2.4 | Established merchant |
| Wholesale | 50-68 | 3.2 | Quartermaster, supplier |
| Grand | 65-90 | 4.5 | Major trading house |

Each tier also defines:

- coin reserve multiplier;
- rare-item chance;
- restock mode and interval;
- replenishment percentage;
- progression scaling.

## Stock Archetypes

Archetypes determine what kinds of goods appear. Profiles can blend multiple archetypes with different weights.

Current archetypes:

- general;
- food;
- baker;
- barkeep;
- butcher;
- cook;
- farmer;
- fisher;
- fletcher;
- livestock;
- blacksmith;
- miner;
- weapons;
- armor;
- fabrics;
- seamstress;
- leather;
- carpenter;
- tools;
- toolmaker;
- alchemist;
- healer;
- magic;
- books;
- art;
- bard;
- jewelry;
- luxury;
- maritime;
- contraband;
- religious;
- royal;
- knight;
- soldier;
- quartermaster;
- traveler;
- hunter;
- salvage.

An archetype can configure:

- weighted item tags;
- quantity multipliers;
- minimum quantities;
- forbidden tags;
- minimum and maximum values;
- local-goods preference;
- rarity bias;
- guaranteed item tags.

Example:

```ts
{
  tier: "large",
  archetypes: [
    { id: "blacksmith", weight: 0.8 },
    { id: "tools", weight: 0.1 },
    { id: "weapons", weight: 0.06 },
    { id: "armor", weight: 0.04 }
  ],
  guaranteedTags: ["ore", "ingots", "coal", "tool"]
}
```

This produces a metalworking merchant where raw inputs and tools dominate while finished weapons and armor are present but not the main stock.

## Profession Stock Audit Summary

The current balancing standard is that every trading NPC should generally have four layers of stock:

1. Money reserve appropriate to stock tier.
2. Profession essentials that define the NPC immediately.
3. Raw materials or consumables required by that profession.
4. Small general stock such as food, supplies, storage, or household items.

High-priority professions to keep checking after every item or profile change:

- Blacksmiths: ore, ingots, coal, tools, repair stock first; finished weapons and armor should not dominate.
- Fletchers: arrows, bows, wood, and fletching support goods instead of broad weapon catalogs.
- Miners: ore, coal, rocks, gems, carts, and pack animals instead of blacksmith stock.
- Barkeeps: drinks, food, barrels, glassware, household goods, and stronger coin reserves.
- Bards: music, games, books, and art first; traveler stock second.
- Farmers: bulk produce, grains, seeds, and animals.
- Butchers: bulk meat and spices as the dominant goods.
- Toolmakers: tools and materials instead of blacksmith weapons and armor.

The detailed profession-by-profession notes live in `profession-stock-audit.md`.


## Lifestyle Stock Baselines

The old universal baseline no longer adds the same `food`/`supplies` layer to everyone. Resolved stock now adds a small lifestyle layer after profession and named overrides:

- `poor`: salvage and a little food.
- `worker`: food, tools, and small general goods.
- `shopkeeper`: general goods, containers, and light food/tools.
- `traveler`: travel goods and food.
- `noble`: royal/luxury goods and currency.
- `military`: soldier/travel/food support.
- `criminal`: contraband and salvage.
- `religious`: religious goods, books, and small food support.

Profession profiles can set `lifestyleBaseline` directly. Otherwise the resolver infers it from the profession slug and `isMerchant`.

## Save Compatibility Note

Current saves use `SAVE_VERSION = 2` and schema label `item-catalog-2026-06-v2`. Pre-overhaul saves are blocked because old `itemIndex` values can point to wrong recreated items. See `docs/development/save-schema.md`.

## Restocking

NPC stock uses a deterministic seed based on NPC, day, and optional profile seed.

Supported modes:

- `daily`;
- `interval`;
- `weekly`;
- `on-arrival`;
- `never`.

Restocking can partially replenish stock instead of replacing it. `restockRate` controls interpolation between remaining stock and newly generated stock:

- `0`: preserve old stock;
- `0.5`: blend half old and half new;
- `1`: replace with the newly generated stock.

Offer quantities are cleared during restocking.

Day advancement runs normal scheduled restocks. Travel runs arrival-based restocks. Same-day save reloads do not reroll inventories.

## Stock Generation

Generation performs these steps:

1. Resolve the NPC's stock profile.
2. Resolve tier limits and progression scaling.
3. Combine character pools, profession pools, and archetype weights.
4. Apply value limits and forbidden tags.
5. Add guaranteed categories first.
6. Select remaining distinct items using deterministic weighted sampling.
7. Calculate quantity from configured pool ranges, item value, tier quantity, coin multipliers, archetype quantity multipliers, and minimum quantities.
8. Blend the generated stock with remaining stock according to `restockRate`.

Unique items are excluded from ordinary random stock. They should be awarded through quests, events, or explicit future unique-stock rules.

## Existing NPC Trade Behavior

NPCs also have independent behavior outside stock:

- biases change valuation of item tags;
- frugality and haggle values affect negotiation;
- trust, mood, and patience change reactions;
- roles such as guard, thief, traveler, beggar, and guild official add special behavior;
- guards may reject visible contraband;
- snitches may react negatively to illegal goods;
- trusted relationships can unlock secrets and improve outcomes;
- repeated weak offers reduce patience;
- completing trades records relationship history.

Stock profiles do not replace these systems. They control supply shape. Original generated biases now also nudge supply through a dynamic `bias` archetype, so an NPC can value a category during barter and be somewhat more or less likely to stock it.

## Stock Diagnostics

Run these after item catalog, icon, generated data, stock profile, barter, or market simulation changes:

```powershell
pnpm audit:data
pnpm audit:assets
pnpm audit:stock
pnpm review:stock
pnpm test:barter
pnpm build
```

Or run the aggregate command:

```powershell
pnpm verify:current-state
```

`pnpm review:stock` writes `docs/systems/profession-stock-review.md` and samples deterministic inventories by profession across days 1, 3, 7, and 14. The report includes:

- sampled NPC names;
- average visible stacks;
- average total stock value;
- average coin reserve value;
- top item families;
- required-token gaps;
- balance status (`PASS` or `REVIEW`);
- identity/raw/consumable/finished/luxury/illegal stock shares;
- raw/material/input/finished/luxury/currency/travel composition;
- example day-1 stock.

Use this as the first balance check before regenerating prompt configs or tuning profile weights. Treat `REVIEW` as a prompt for manual inspection, not an automatic failure.

## How to Customize an NPC

Prefer the smallest appropriate change:

1. Change a tier when only capacity is wrong.
2. Change archetype weights when assortment is wrong.
3. Change a profession default when all NPCs of that template are wrong.
4. Add a named override when one NPC should be exceptional.
5. Add a new archetype when a reusable category is missing.

Example named override:

```ts
"Example Merchant": {
  tier: "wholesale",
  archetypes: [
    { id: "food", weight: 0.7 },
    { id: "maritime", weight: 0.3 }
  ],
  quantityMultiplier: 1.2,
  guaranteedTags: ["seafood"],
  forbiddenTags: ["magic"],
  restockMode: "daily",
  restockRate: 0.9
}
```

## Changes That Require Follow-up Work

The following changes affect other systems and should not be made in isolation:

- Changing tier stack ranges may require larger or scrollable inventory UI.
- Increasing coin multipliers affects NPC buying power and economy balance.
- Increasing rare-item chance affects progression and quest rewards.
- Adding unique stock requires save-state ownership and duplicate prevention.
- Adding relationship-gated stock requires passing relationship state into generation.
- Adding market supply effects requires using `marketSimulation` during stock generation.
- Adding time-of-day stock requires scheduled refreshes without rerolling unrelated goods.
- Adding event stock requires event-aware profile overlays.
- Letting sold goods enter future NPC stock requires provenance and anti-duplication rules.
- Preserving stock across old saves may require a save-version migration.

## Future Goals

- Continue tuning lifestyle baselines after reviewing generated stock samples; add supplier/settled-vendor variants if needed.
- Add a developer-facing stock inspector showing resolved tier, archetypes, weights, guaranteed tags, and rejected candidates.
- Add market-specific profile overrides.
- Add seasonal and event stock overlays.
- Add relationship-gated hidden shelves.
- Add night-only contraband inventories.
- Add quality grades such as ordinary, refined, masterwork, and enchanted.
- Add named limited-stock items with per-world purchase limits.
- Add merchant price personalities independent of stock profile.
- Add economy telemetry for average stock value, scarcity, and coin flow.
- Add stock provenance so player-sold goods can circulate through markets.
- Add warehouse and wholesale contracts tied to `wholesale` and `grand` suppliers.
- Add UI filters for large inventories.
- Promote the current `review:stock` balance heuristics into stricter CI once the generated catalog stabilizes.
- Add profile validation that reports unknown tags, impossible guarantees, and empty archetypes.
- Add an editor or JSON schema for changing stock profiles without touching TypeScript.
