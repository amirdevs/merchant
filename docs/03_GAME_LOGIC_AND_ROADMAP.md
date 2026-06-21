# 03 - Game Logic And Roadmap

This is the only roadmap doc. Keep current gameplay status, next UI work, and character/portrait gates here instead of adding per-step completion docs.

## Current foundation status

- Loads generated reference data from `src/data/generated`, with a remake layer for systems that need original public-facing content.
- Supports local save/load/import/export with save schema v2 after the item rewrite. Old pre-overhaul saves are intentionally blocked instead of silently migrated.
- Inventory entries track quantity, offer quantity, protection, and concealment. Protected goods cannot be offered, and concealed goods are ignored by auto-offer matching.
- Barter valuation uses item value, NPC/profession/market/kingdom bias, exotic/import effects, frugality, haggling, illegal risk, and heat.
- NPC stock is generated from stock tiers, archetypes, profession profiles, lifestyle baselines, named overrides, and generated-data bias.
- Economy helpers cover wallet value, denominations, inventory value, capacity, affordability, and trade summaries.
- Travel helpers cover route lookup, tolls, stallage, risk preview, capacity blockers, illegal cargo warnings, and arrival summaries.
- Quest/runtime helpers support typed state transactions, contracts, item consumption, rewards, market unlocks, and dialogue logs.
- Company helpers support warehouses, shipments, insurance, cash, valuation, agents, shares, and dividends.
- The Strategy Planner exposes the first playable UI integration pass for trade, cargo, routes, quests/contracts, company state, and action blockers.

## Next playable UI work

1. Polish trade intelligence directly inside the barter screen.
2. Add exact route planner cards to the travel confirmation and arrival flow.
3. Replace journal status buttons with full typed quest/contract transactions.
4. Add real shipment cargo selection, warehouse capacity decisions, company ledger, and shareholder UI.
5. Run manual playtest and balance tuning after the workflows are visible.
6. Continue visual/UI polish against `docs/ui_parts/` and the bright painterly merchant RPG direction.

## Character rework phase plan

Visible character identity must be original. Keep generated indexes stable as mechanical anchors until runtime migration is safe, but replace public-facing names, portraits, dialogue flavor, looks, stories, and identity.

Current character planning data lives in:

```text
src/data/characters/newUsefulNpcSeeds.ts
src/data/characters/legacyCharacterAuditPlan.ts
src/data/characters/finalCharacterRosterPlan.ts
src/data/characters/characterIdentityCatalogBatch01.ts
```

Current planning targets:

```text
203 generated reference records
48 useful new NPC seeds
240 target visible characters
726 target portrait images
```

Character work should move in larger useful chunks:

1. finish useful NPC identities;
2. rewrite legacy identities in large groups;
3. finalize visible roster and expression tiers;
4. create complete portrait image manifests;
5. generate one approved test sheet;
6. generate full portrait sheets only after approval;
7. integrate remake identities and portraits into market, barter, quest, and company UI.

## Portrait generation gate

Do not generate full portrait sheets until all of these are true:

- final visible roster is reviewed;
- per-character identity catalog is complete;
- expression counts and total image count are final;
- portrait JSON manifests exist under `docs/assets/character-prompts/`;
- the small test sheet passes style, consistency, green-background, slot-order, and crop-safety checks.

Portrait prompts are batched by total image count, not by character count. A single character can have some expressions in one batch and remaining expressions in another batch, as long as every prompt repeats the same identity anchors.

## What is done / what remains

Done:

- foundation systems for stock, barter, economy, travel, quests, company, UI view models, and playtest/report checks;
- playable Strategy Planner integration pass;
- useful new NPC seed roster;
- legacy character audit plan and final roster target;
- first useful-new-NPC identity catalog batch;
- draft portrait manifest seeds for test batches.

Remaining:

- complete the useful-new-NPC identity catalog in source;
- rewrite legacy generated character identities;
- approve final roster and expression counts;
- approve one portrait test sheet before production generation;
- wire remake character identity and portraits into the runtime UI;
- add audits for missing portraits, duplicate display names, original-name leaks, missing stories, missing role tags, and orphan files.
