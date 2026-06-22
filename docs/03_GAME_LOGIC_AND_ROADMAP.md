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
src/data/characters/characterIdentityCatalogBatch02.ts
src/data/characters/characterIdentityCatalogLegacyBatch01.ts
src/data/characters/characterIdentityCatalogLegacyBatch02.ts
src/data/characters/characterIdentityCatalogLegacyBatch03.ts
src/data/characters/characterIdentityCatalogLegacyBatch04.ts
src/data/characters/characterIdentityCatalog.ts
```

Current planning targets:

```text
203 generated reference records
48 useful new NPC identities complete
194 useful-new-NPC portrait prompts complete
192 legacy reworked identities complete across batches 001-004
528 legacy portrait prompts complete across batches 001-004
240 visible character identities prepared before final roster review
722 prepared portrait prompts in final all-cast sheet order
```

Current production prompt files live under `docs/assets/character-prompts/` and are named like item prompt ranges:

```text
characters-0001-0012.json
characters-0013-0024.json
characters-0025-0036.json
...
characters-0721-0722.json
```

Generate character sheets in filename order. Do not use old category names such as useful, legacy, new-npcs, identity, batch group, test, template, or manifest as generation order.

Character work should move in larger useful chunks:

1. useful-new-NPC identity catalog and portrait manifests are complete;
2. legacy identity catalog and portrait manifests are complete;
3. final visible roster, expression counts, and all-cast sheet order are normalized;
4. generate full portrait sheets only after all character prompts are finished and reviewed;
5. integrate remake identities and portraits into market, barter, quest, and company UI.

## Portrait generation gate

Do not generate full portrait sheets until all of these are true:

- final visible roster is reviewed;
- per-character identity catalog is complete;
- expression counts and total image count are final;
- sequential portrait JSON files exist under `docs/assets/character-prompts/`;
- the small test sheet passes style, consistency, green-background, slot-order, and crop-safety checks;
- the final all-cast production sequence uses clean 3x4 / 12-image sheets.

Portrait prompts are batched by total image count, not by character count. A single character can have some expressions in one batch and remaining expressions in another batch, as long as every prompt repeats the same identity anchors.

Approved sheet direction:

```text
3 columns x 4 rows
12 portraits per sheet
one continuous flat #00FF00 background
no visible cells, panels, borders, or separators
crop by JSON row/column/order/outputFile
if generated resolution is smaller than the JSON canvas, scale the crop grid proportionally
```

## What is done / what remains

Done:

- foundation systems for stock, barter, economy, travel, quests, company, UI view models, and playtest/report checks;
- playable Strategy Planner integration pass;
- useful new NPC seed roster;
- legacy character audit plan and final roster target;
- useful-new-NPC identity catalog, 48 characters / 194 portrait prompts;
- legacy identity batches 001-004, 192 characters / 528 portrait prompts;
- normalized character prompt files, 61 JSON files / 722 portrait prompts;
- approved portrait style gate: charming, slightly cartoony, fantasy ancestry variety, single flat green background, crop-safe spacing.

Remaining:

- review the final 240-character roster and expression counts;
- only then generate/crop all portrait sheets;
- wire remake character identity and portraits into the runtime UI;
- add audits for missing portraits, duplicate display names, original-name leaks, missing stories, missing role tags, and orphan files.
