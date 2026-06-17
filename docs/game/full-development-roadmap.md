# Full Development Roadmap

This roadmap is the working path from the current prototype to a complete offline merchant RPG. It should be updated whenever a milestone is completed or reprioritized.

## Guiding Goals

- Rebuild the original Merchant of the Six Kingdoms game loop as the mechanical baseline.
- Make the remake clearer, deeper, more readable, and more replayable than the original.
- Keep the app offline and local-only.
- Prefer pure logic modules with tests before large UI screens.
- Keep the UI aligned with `docs/ui_parts`: bright painterly fantasy merchant UI, parchment ledgers, carved wood, brass trim, blue enamel plates, and practical trading density.

## Phase 1 - Foundations

### 1. Economy, Capacity, And Travel Costs

Status: started.

Goal: make inventory and travel pressure real.

Tasks:

- Add money helpers for coin inventory and spendable currency. Started with copper toll helpers.
- Add cargo value, weight, size, carry, and pull summaries. Started.
- Add route toll charging. Started with route tolls paid in copper.
- Add stallage/market fee hooks.
- Display capacity state in header, inventory, and travel map. Started.
- Block or warn on unaffordable travel. Started.
- Prepare pure helpers for later tests. Started with `src/lib/economy.ts`.

Acceptance:

- Player cargo totals are computed from inventory.
- Travel displays toll/day/capacity status.
- Travel spends the route toll when affordable.
- Unaffordable travel gives a clear message and does not move the player.

### 2. Illegal Goods And Concealment

Goal: make laws and risk visible before adding punishment.

Tasks:

- Add helpers for current kingdom illegal item tags.
- Mark illegal items in inventory, item detail, trade, and travel warnings.
- Keep concealment separate from protection.
- Prevent auto-offer matching from using concealed items.
- Add current/destination legality panels.

Acceptance:

- Illegal items are visible at a glance.
- Concealed items are visually distinct.
- Travel map warns about illegal goods for destination kingdom.

### 3. Barter Regression Tests

Goal: lock down original-style barter math.

Tasks:

- Add fixed-inventory tests for appraisal states.
- Test frugality, haggling, bulk, exotic, market, profession, and character bias.
- Test Ask Price and Ask Offer matching.
- Test failed offers increasing haggling pressure.

Acceptance:

- Barter formula changes require test updates.
- Known original-style scenarios stay stable.

## Phase 2 - Trading Depth

### 4. NPC Reputation, Patience, And Reactions

Goal: make customers feel like people.

Tasks:

- Add per-NPC reputation/trust/mood state.
- Add patience and offer counters.
- Add offer-quality response text and audio tones.
- Add consequences for insulting offers and perks for generous/fair trading.
- Add relationship badges in customer and barter views.

Acceptance:

- Repeated poor offers affect the conversation.
- Good deals can improve trust.
- NPC reactions are specific and readable.

### 5. Deal Intelligence

Goal: make trading understandable without removing discovery.

Tasks:

- Add offer explanation panel.
- Show top positive and negative valuation reasons.
- Show missing value, excess value, and risk.
- Add optional detailed debug breakdown for balancing.
- Add undo last offer change.

Acceptance:

- Player can understand why a trade failed.
- Hints preserve hidden exact math unless debug mode is enabled.

### 6. Inventory Quality Of Life

Goal: make large inventories usable.

Tasks:

- Exact quantity entry.
- Persistent filters.
- Item notes.
- Highlight, quest, illegal, concealed, protected, and collection markers.
- Item comparison popovers.
- Text/image item readers.

Acceptance:

- Player can manage large cargo without friction.
- Books, letters, maps, paintings, and special items can be inspected.

## Phase 3 - Travel And World Risk

### 7. Travel Confirmation And Arrival Results

Goal: make every route a meaningful decision.

Tasks:

- Add travel confirmation modal.
- Show route days, tolls, capacity, illegal goods, and risk.
- Add arrival result screen.
- Add route summary to ledger.

Acceptance:

- Player confirms before paying/moving.
- Arrival summarizes time and costs.

### 8. Carry, Pull, And Packhorses

Goal: rebuild original capacity pressure.

Tasks:

- Implement carry and pull stats from items.
- Add packhorse carry/pull bonuses.
- Add over-weight and over-size warnings.
- Block packup/travel when impossible or require discard.
- Add storage item behavior.

Acceptance:

- Heavy/large goods change travel planning.
- Packhorses and storage have real value.

### 9. Theft, Guards, And Smuggling

Goal: turn illegal goods into a strategic risk/reward layer.

Tasks:

- Add guard inspection.
- Add theft events using market theft configs.
- Add confiscation.
- Add bribes and basic evasion.
- Add black market hooks.
- Add consequences for snitches.

Acceptance:

- Carrying illegal or valuable goods creates risk.
- Concealment reduces risk but does not remove it entirely.

## Phase 4 - Dialogue And Quests

### 10. Dialogue Graph Runtime

Goal: restore original conversation structure.

Tasks:

- Extract/load dialogue graphs.
- Track current node per conversation.
- Render response choices.
- Support Goodbye and Barter exits.
- Add typed callback registry.

Acceptance:

- Original dialogue scripts can run without unsafe arbitrary callbacks.

### 11. Quest State And Journal

Goal: make story and jobs persistent.

Tasks:

- Add quest states: unseen, offered, accepted, active, ready, finished, failed.
- Add objectives and rewards.
- Add journal tabs for quests, items, markets, rumors, and notes.
- Add quest item highlighting.

Acceptance:

- Quest progress persists through save/load.
- Player always knows active objectives.

### 12. Notice Board And Contracts

Goal: add repeatable and authored objectives.

Tasks:

- Add market notice board.
- Add delivery, procurement, smuggling, race, auction, and rumor contracts.
- Add time limits and optional bonus rewards.
- Add contract filtering and tracking.

Acceptance:

- Player has useful optional work in every market.

## Phase 5 - Events And Minigames

### 13. Event Calendar

Goal: make markets feel alive.

Tasks:

- Add day/week/season/year schedule.
- Add recurring and one-time events.
- Add demand/supply event bias.
- Add event banners and warnings.

Acceptance:

- Players can plan around future events.

### 14. Auctions And Drafts

Goal: rebuild high-stakes item events.

Tasks:

- Add auction lots, bidder behavior, reserve prices, bid/pass, and results.
- Add draft pick order, pick ownership, choice scouting, and confirm pick.
- Add bidder tells and scouting improvements beyond original.

Acceptance:

- Auctions and drafts are playable and produce real item transfers.

### 15. Horse Racing

Goal: add betting and event variety.

Tasks:

- Add race entries, odds, advice purchase, bet amount, result, and payout.
- Add track/weather/stable modifiers as an improvement.

Acceptance:

- Player can place bets and receive results/rewards.

### 16. Myth Card Game

Goal: make Myth a polished side game.

Tasks:

- Build pure Myth rules module.
- Add deck/hand/board state.
- Add casual games and tournament flow.
- Add wagers and prizes.
- Add collection/deck management.

Acceptance:

- Myth can be played independently and through NPC/event hooks.

## Phase 6 - Long-Term Progression

### 17. Company, Warehouse, And Shipments

Goal: give late-game merchants strategic scale.

Tasks:

- Add company state, stock, warehouses, shipment jobs, agents, and history.
- Add risk/reward shipment outcomes.
- Add passive routes only after manual route mastery.

Acceptance:

- Player can invest in long-term trade operations.

### 18. Banking, Loans, And Factions

Goal: make money and politics matter.

Tasks:

- Add loans and repayment.
- Add faction/kingdom reputation.
- Add guild seals, permits, tax breaks, and penalties.
- Add election/vote consequences.

Acceptance:

- Financial and political choices affect the world.

### 19. Dynamic Market Simulation

Goal: make replayable markets.

Tasks:

- Add supply/demand drift.
- Add scarcity after buyouts.
- Add rumors before major shifts.
- Add regional production chains.
- Add rival merchant route pressure.

Acceptance:

- Different playthroughs produce different trade opportunities.

## Phase 7 - Polish, Balance, And Release

### 20. Save System Completion

Tasks:

- Multiple save slots.
- Save metadata.
- Confirm overwrite/delete.
- Schema migrations.
- Import/export stability.

### 21. Audio And Animation

Tasks:

- Dialogue voices by tone/personality.
- Offer quality reactions.
- Event and crowd sounds.
- Separate volume channels.
- UI animation polish.

### 22. Balance Pass

Tasks:

- Travel costs.
- Inventory friction.
- NPC inventories.
- Barter thresholds.
- Quest rewards.
- Event payouts.

### 23. Full QA And Packaging

Tasks:

- Regression tests.
- Manual full-play smoke.
- Broken asset scans.
- Save/load migration checks.
- Desktop packaging if needed.

## Immediate Next Steps

1. Finish Phase 1.1: economy, capacity, and travel costs.
2. Add Phase 1.2: illegal goods and concealment markers.
3. Add Phase 1.3: barter regression tests.
4. Continue through Phase 2 once the core loop has real pressure and stable math.
