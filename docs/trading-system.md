# Trading and NPC Stock System

This document describes the current barter loop, customer behavior, NPC stock configuration, restocking, and the intended extension points.

## Core Trading Loop

The player trades directly with one customer at a time.

1. The market selects the next unseen customer from the current day's queue.
2. The player moves goods from either inventory into the two offer panels.
3. Offer values are calculated from item value, market demand, NPC preferences, relationship state, and other trade modifiers.
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

Named overrides are authoritative and can replace the tier, archetypes, restock behavior, value bands, and modifiers.

## Stock Tiers

A stack is one distinct item type, regardless of quantity.

| Tier | Distinct stacks | Quantity multiplier | Typical purpose |
|---|---:|---:|---|
| Empty | 0 | 0 | Story-only NPC |
| Pocket | 3–6 | 0.5 | Beggar, messenger |
| Sparse | 6–11 | 0.7 | Guard, incidental local |
| Light | 10–16 | 0.9 | Traveler, worker |
| Modest | 15–22 | 1.1 | Small vendor |
| Standard | 21–30 | 1.4 | Craftsperson |
| Stocked | 29–40 | 1.8 | Regular merchant |
| Large | 39–52 | 2.4 | Established merchant |
| Wholesale | 50–68 | 3.2 | Quartermaster, supplier |
| Grand | 65–90 | 4.5 | Major trading house |

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
- fisher;
- livestock;
- blacksmith;
- weapons;
- armor;
- fabrics;
- leather;
- carpenter;
- tools;
- alchemist;
- healer;
- magic;
- books;
- art;
- jewelry;
- luxury;
- maritime;
- contraband;
- religious;
- royal;
- traveler;
- salvage.

An archetype can configure:

- weighted item tags;
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
    { id: "blacksmith", weight: 0.6 },
    { id: "weapons", weight: 0.25 },
    { id: "armor", weight: 0.15 }
  ]
}
```

This produces a large metalworking merchant without changing the NPC's displayed profession.

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
7. Calculate quantity from configured pool ranges, item value, tier quantity, and coin multipliers.
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

Stock profiles do not replace these systems. They only control supply.

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

- Add a developer-facing stock inspector showing resolved tier, archetypes, and selection weights.
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
- Add automated balance audits for stack counts, values, rarity, and coin reserves.
- Add profile validation that reports unknown tags, impossible guarantees, and empty archetypes.
- Add an editor or JSON schema for changing stock profiles without touching TypeScript.
