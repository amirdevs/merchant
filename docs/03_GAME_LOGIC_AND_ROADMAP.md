# 03 - Game Logic And Roadmap

## Current implemented foundations

### Data and saves

- Loads generated original data from `src/data/generated`.
- Supports local save/load/import/export.
- Uses save schema v2 after the item rewrite.
- Old pre-overhaul saves are intentionally blocked instead of silently migrated.

### Inventory and barter

- Inventory entries track quantity, offer quantity, protection, and concealment.
- Protected goods cannot be offered.
- Concealed goods are ignored by auto-offer matching.
- Ask Price and Ask Offer have regression coverage.
- Barter valuation uses item value, NPC/profession/market/kingdom bias, exotic/import effects, frugality, haggling, illegal risk, and heat.

### Stock and economy

- NPC stock is generated from stock tiers, archetypes, profession profiles, lifestyle baselines, named overrides, and generated-data bias.
- Economy helpers cover wallet value, denominations, inventory value, capacity, affordability, and trade summaries.

### Travel and risk

- Travel helper layer covers route lookup, tolls, stallage, risk preview, capacity blockers, illegal cargo warnings, and arrival summaries.

### Quests and company

- Quest/runtime foundation supports typed state transactions, contracts, item consumption, rewards, market unlocks, and dialogue logs.
- Company foundation supports warehouses, shipments, insurance, cash, valuation, agents, shares, and dividends.

## Remaining product direction

The foundation roadmap is complete. The next direction should be visible/playable UI integration:

1. trade screen integration polish
2. travel confirmation and arrival screen
3. quest/contract screen actions
4. company/warehouse/shipment UI
5. manual playtest and balance tuning
6. visual/UI polish
7. deeper original-game parity as needed
