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

Status: mostly implemented.

Goal: make inventory and travel pressure real.

Tasks:

- Add money helpers for coin inventory and spendable currency. Implemented for copper tolls.
- Add cargo value, weight, size, carry, and pull summaries. Implemented.
- Add route toll charging. Implemented with route tolls paid in copper.
- Add stallage/market fee hooks.
- Display capacity state in header, inventory, and travel map. Implemented.
- Block or warn on unaffordable travel. Implemented.
- Prepare pure helpers for later tests. Implemented with `src/lib/economy.ts`.

Acceptance:

- Player cargo totals are computed from inventory.
- Travel displays toll/day/capacity status.
- Travel spends the route toll when affordable.
- Unaffordable travel gives a clear message and does not move the player.

### 2. Illegal Goods And Concealment

Status: mostly implemented.

Goal: make laws and risk visible before adding punishment.

Tasks:

- Add helpers for current kingdom illegal item tags. Implemented with `src/lib/legal.ts`.
- Mark illegal items in inventory, item detail, trade, and travel warnings. Implemented.
- Keep concealment separate from protection. Implemented.
- Prevent auto-offer matching from using concealed items.
- Add current/destination legality panels. Implemented with travel route warnings.

Acceptance:

- Illegal items are visible at a glance.
- Concealed items are visually distinct.
- Travel map warns about illegal goods for destination kingdom.

### 3. Barter Regression Tests

Status: implemented.

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

Status: first pass implemented.

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

Status: first pass implemented.

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

Status: partial.

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

Status: implemented.

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

Status: first pass implemented.

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

Status: first pass implemented.

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

Status: first pass implemented, improved beyond original one-line prompts.

Goal: restore original conversation structure.

Tasks:

- Extract/load dialogue graphs. Partially implemented through typed contextual choices from extracted character fields and market data.
- Track current node per conversation.
- Render response choices. Implemented.
- Support Goodbye and Barter exits. Implemented in the barter conversation screen.
- Add typed callback registry.

Acceptance:

- Original dialogue scripts can run without unsafe arbitrary callbacks.

### 11. Quest State And Journal

Status: first pass implemented.

Goal: make story and jobs persistent.

Tasks:

- Add quest states: unseen, offered, accepted, active, ready, finished, failed. Implemented except active is not separately used yet.
- Add objectives and rewards. Objectives display from extracted market quest data; rewards still missing.
- Add journal tabs for quests, items, markets, rumors, and notes. First pass implemented as Notice Board plus Rumor Ledger.
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

Status: first pass implemented.

Goal: make markets feel alive.

Tasks:

- Add day/week/season/year schedule. First pass estimates next day from extracted frequency.
- Add recurring and one-time events. First pass displays extracted market events.
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

- Multiple save slots. Implemented with four local slots.
- Save metadata. Implemented with saved date, day, and market.
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

## Roadmap V2 - From Current Prototype To Finished Game

This is the active roadmap after the first parity pass. The old phase list above remains as the broad feature map; this V2 list is the practical build order from the current codebase.

### V2.1 Stabilize The Core Trade Loop

Status: mostly implemented.

Goal: make barter, inventory, travel, saves, and dialogue reliable enough to support larger systems.

Tasks:

- Add tests for Ask Price and Ask Offer using fixed player/NPC inventories. Implemented.
- Add tests for travel toll payment, capacity blocking, theft, and guard confiscation. Implemented for theft/guard risk; toll/capacity still need direct tests.
- Add tests for save migration and four local save slots. Implemented.
- Add UI smoke checks for the barter screen so black-screen regressions are caught early.
- Add an explicit error boundary around major game views. Implemented.
- Add undo last offer change. Implemented.
- Add confirm overwrite/delete for save slots. Implemented.

Acceptance:

- A build plus tests catches broken barter, travel, and save behavior.
- User-facing actions fail with visible messages instead of blank screens.
- Save slots cannot be accidentally overwritten or deleted without confirmation.

### V2.2 Finish Trading Parity

Goal: make the trading/bargaining logic feel close to the original while staying clearer than the original.

Tasks:

- Add original-like `benfordsLawRandom` quantity selection for generated inventory and counteroffers. Implemented for generated inventory.
- Add NPC budget/wealth limits.
- Add fair-match random chance and safety-net/gift behavior.
- Add ultimatum mode when patience gets low.
- Add reputation gates and reputation minimums.
- Add barter-specific NPC roles: guard, thief, beggar, traveler, plunderer, snitch, guild president.
- Add offer-quality audio reactions.
- Add detailed debug breakdown for balancing.

Acceptance:

- NPCs do not all negotiate the same way.
- Repeated weak offers, generous offers, and role-specific NPCs change outcomes.
- Balancing can be inspected without guessing.

### V2.3 Finish Inventory And Item Interaction

Goal: make every important item category useful, inspectable, and manageable.

Tasks:

- Add item notes and persistent item highlights.
- Add quest-needed markers in inventory and barter panels.
- Add item comparison popovers.
- Add readable book/letter viewer.
- Add image viewer for maps and paintings.
- Add special item handlers for maps, deeds, Myth cards, storage, and permits.
- Add bulk actions: protect all, reveal all, clear offer, move exact stack sets.
- Add item search that works from the inventory screen, not only a placeholder filter page.

Acceptance:

- Books, maps, paintings, deeds, cards, permits, and storage items have obvious actions.
- Large inventories can be searched, filtered, sorted, marked, and managed quickly.

### V2.4 Deepen Travel, Law, And Smuggling

Goal: turn route planning and contraband into a strategic layer.

Tasks:

- Add stallage/market fee charging.
- Add route risk previews using theft, law, toll, distance, value, and concealment.
- Add guard inspection odds instead of automatic first illegal stack confiscation.
- Add bribes, forged permits, and active evasion choices.
- Add concealment quality and hidden-compartment upgrades.
- Add black market customer hooks.
- Add snitch behavior and reputation penalties.
- Add packhorse care, injury, upkeep, and upgrades.
- Add route ledger history: cost, incidents, profit, and travel notes.

Acceptance:

- Illegal goods are profitable but risky.
- Concealment helps without becoming a guaranteed bypass.
- Travel creates memorable outcomes and useful route history.

### V2.5 Build The Real Dialogue And Quest Runtime

Goal: move from contextual generated dialogue to authored stateful conversations and quests.

Tasks:

- Extract or define dialogue graph nodes with typed response choices.
- Add current dialogue node state per active conversation.
- Add typed callback registry for safe quest/story effects.
- Add quest rewards: items, coins, unlocks, discounts, reputation, and flags. First pass copper rewards implemented.
- Add quest objective checking against inventory, market, day, and NPC relation state. Inventory objective checking implemented.
- Add quest completion transactions through barter.
- Add quest failure and expiry.
- Add journal tabs: active quests, completed, rumors, markets, NPCs, items, notes.
- Add quest item highlighting across inventory, trade, and item detail.

Acceptance:

- Quests can be accepted, progressed, completed, failed, and rewarded.
- Dialogue choices can safely trigger game effects without arbitrary script execution.
- The journal tells the player what to do next.

### V2.6 Add Contracts And Notice Board Jobs

Goal: ensure every market offers useful repeatable work.

Tasks:

- Add contract generator for delivery, procurement, smuggling, courier, race, auction, and rumor jobs.
- Add time limits, destination markets, required items, optional secrecy, and bonus conditions.
- Add contract difficulty tiers.
- Add contract tracking and pinning.
- Add generated rewards based on distance, risk, rarity, and urgency.
- Add contract failure consequences.

Acceptance:

- A player can always find a meaningful job without relying only on authored quests.
- Contracts interact with trading, travel, smuggling, and events.

### V2.7 Make Events Playable

Goal: convert event previews into playable activities.

Tasks:

- Add event sessions for market events.
- Add event demand/supply modifiers before and during events.
- Add event banners in market, travel, and journal views.
- Add auctions with lots, bidder behavior, reserve prices, bid/pass, and results.
- Add drafts with pick order, scouting, confirm pick, and item transfer.
- Add horse racing with entries, odds, advice, betting, results, and payouts.
- Add event preparation hints from NPC dialogue and rumors.

Acceptance:

- Events change prices and create special opportunities.
- Auctions, drafts, and races are playable from start to result.

### V2.8 Build Myth As A Full Side Game

Goal: make Myth a polished optional game loop, not just an item tag.

Tasks:

- Build pure Myth rules module.
- Add card definitions, decks, hand, board, turn state, and win conditions.
- Add quick-play against NPCs.
- Add wagers, prizes, and relationship effects.
- Add tournaments linked to event calendar.
- Add card collection and deck management.
- Add AI personalities for cautious, aggressive, collector, gambler, and expert players.

Acceptance:

- Myth can be played independently and can connect back to NPCs, quests, and events.

### V2.9 Add Long-Term Progression

Goal: give the late game strategic depth beyond hand trading.

Tasks:

- Add warehouses per major market.
- Add company state, staff, agents, and route history.
- Add shipments with risk/reward outcomes.
- Add passive routes only after manual route mastery.
- Add banking, loans, repayment, and debt consequences.
- Add faction and kingdom reputation.
- Add permits, guild seals, tax breaks, fines, and political consequences.
- Add rival merchants with route plans, stock pressure, event participation, and relationship states.

Acceptance:

- The player can grow from hand trader to company operator.
- Political, financial, and rival choices affect the world.

### V2.10 Dynamic Market Simulation

Goal: make the economy replayable and reactive.

Tasks:

- Add supply/demand drift by market, day, season, and event.
- Add scarcity after player buyouts.
- Add rumors before major price shifts.
- Add regional production chains.
- Add rival merchant impact on scarcity and price.
- Add market recovery over time.
- Add balancing tools to inspect price drift and outliers.

Acceptance:

- Trade routes are not solved forever.
- Market conditions create new opportunities and risks across a playthrough.

### V2.11 Polish, Balance, And Release

Goal: make the game stable, readable, balanced, and shippable.

Tasks:

- Balance travel costs, stallage, theft, guard odds, barter thresholds, and rewards.
- Add separate audio channels for UI, dialogue, ambient, events, and minigames.
- Add animation polish for trade, travel, dialogue, events, and inventory actions.
- Add broken asset scans for portraits, items, backdrops, routes, and UI parts.
- Add save import/export compatibility checks.
- Add full-play manual smoke script.
- Add packaging/release build checklist.
- Add final UX pass for all buttons, disabled states, tooltips, and error states.

Acceptance:

- A new player can start, trade, travel, complete jobs, save/load, and recover from errors without developer help.
- Release builds are reproducible and verified.

## V2 Immediate Next Steps

1. Add direct tests for travel toll payment and capacity blocking.
2. Add UI smoke checks for the barter screen.
3. Add NPC budget/wealth limits.
4. Add ultimatum mode when patience gets low.
5. Expand quest rewards beyond copper.
6. Expand notice board contracts after quest rewards work.

## Immediate Next Steps

Deprecated. Use `V2 Immediate Next Steps` above.
