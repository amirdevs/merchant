# Current Roadmap

This is the current high-level roadmap for the local React/Vite merchant RPG remake. Use `game-logic-parity.md` for detailed mechanics parity and `ui-ux-brief.md` for screen-level UI direction.

## Product Direction

- Rebuild the original merchant trading loop as the mechanical baseline.
- Keep the app offline and local-only.
- Prefer clear, testable logic modules before large UI expansions.
- Make the remake clearer and more readable than the original without losing trading depth.
- Keep UI aligned with `docs/ui_parts`: bright painterly fantasy merchant UI, parchment ledgers, carved dark wood, brass trim, blue enamel plates, readable item art, polished NPC portraits, and compact repeated-use trading layouts.

## Current Baseline

Implemented or partially implemented:

- Original extracted characters, items, markets, kingdoms, professions, and related generated data.
- Player inventory, generated NPC stock, offer panels, and trade resolution.
- Original-style barter valuation inputs such as NPC preferences, profession bias, market bias, frugality, haggling pressure, bulk, and exotic/import bonuses.
- Ask Price, Ask Offer, Accept, Clear, and Goodbye flow.
- Travel between connected markets with day advancement, route tolls, confirmation, and arrival outcomes.
- Illegal item markers, concealment, guard/theft risk hooks, and travel warnings.
- Local save/load/import/export with save slots and migration helpers.
- Journal/notice-board surfaces for quests, events, notes, and market information.
- Event, company, warehouse, banking, loan, Myth, auction, draft, and horse-race baselines.
- Current UI direction and reference images in `docs/ui_parts`.

## Main Workstreams

### 1. Core Trade Feel

- Keep improving the barter table toward the original customer-at-stall flow.
- Make customer arrival, dismissal, dialogue, and deal feedback feel like a game scene rather than a directory.
- Continue improving item movement, exact quantities, drag/drop, offer feedback, and trade-complete presentation.

### 2. Inventory And Stock Quality

- Use `docs/systems/trading-and-stock.md` as the stock system spec.
- Use `docs/systems/profession-stock-audit.md` as the balancing backlog.
- Improve profession-specific stock so NPCs carry believable raw materials, tools, finished goods, coins, and lifestyle items.
- Add stock diagnostics for profession averages, guarantee failures, rare items, value budgets, and raw-versus-finished ratios.

### 3. Travel, Law, And Economy

- Deepen stallage, route risk, capacity pressure, packhorse upkeep, and route history.
- Expand illegal goods, bribes, permits, black markets, snitches, heat, and consequences.
- Continue market simulation work: scarcity, oversupply, recovery, event demand, regional production, and price history.

### 4. Dialogue, Quests, And Events

- Expand authored dialogue graphs and typed callbacks.
- Add more multi-stage quest content with clear rewards, failures, and consequences.
- Make notice-board contracts, events, auctions, drafts, horse races, and Myth feel better integrated with travel, law, stock, and NPC trust.

### 5. Long-Term Progression

- Deepen company, warehouse, shipments, banking, loans, faction standing, rival merchants, and late-game trade goals.
- Add strategic reports and balance tools so long runs remain readable.

### 6. UI, Assets, And Polish

- Continue replacing rough/generated assets with the painterly fantasy merchant look.
- Use `docs/game/ui-ux-brief.md` and `docs/ui_parts/` as the current UI source.
- Do not use archived wireframes as visual direction.
- Improve animation, audio coverage, disabled states, tooltips, overflow behavior, and screen-level QA.

## Near-Term Order

1. Finish the profession stock archetype and quantity pass.
2. Add stock diagnostics and validation for generated NPC inventories.
3. Improve barter feedback and customer flow around the current stock changes.
4. Continue UI polish toward `docs/ui_parts`, especially inventory and barter screens.
5. Expand authored quest/dialogue content where it directly supports trading, stock, travel, or law.

## Validation

- Run `pnpm audit:data` after data, generated prompt, or stock-script changes.
- Run targeted tests for logic changes when available.
- Run `pnpm build` when changes have compile/runtime risk or when targeted validation is insufficient.
