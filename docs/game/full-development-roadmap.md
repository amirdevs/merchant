# Full Development Roadmap

This roadmap is the working path from the current prototype to a complete offline merchant RPG. It should be updated whenever a milestone is completed or reprioritized.

## Guiding Goals

- Rebuild the original Merchant of the Six Kingdoms game loop as the mechanical baseline.
- Make the remake clearer, deeper, more readable, and more replayable than the original.
- Keep the app offline and local-only.
- Prefer pure logic modules with tests before large UI screens.
- Keep the UI aligned with `docs/ui_parts`: bright painterly fantasy merchant UI, parchment ledgers, carved wood, brass trim, blue enamel plates, and practical trading density.

## Current Completion Snapshot

Updated: June 18, 2026.

The roadmap now has a playable implementation baseline across every major game pillar. This does not mean final content, balance, art, or release QA is complete. It means each large system has working state, actions, persistence, UI entry points, and core tests that future content can extend.

Implemented baseline:

- Original-style barter valuation, Ask Price, Ask Offer, NPC budgets, patience, reputation, fair-match chance, gifts, ultimatum mode, and role-specific behavior.
- Persistent inventory notes/highlights, quest markers, search, exact quantities, protection/concealment, and readable/inspectable special items.
- Toll and stallage charging, capacity blocking, route risk forecasts, guard odds, theft, bribes, permits, evasion, and arrival results.
- Persistent typed dialogue graphs, safe callbacks, richer contextual topics, remembered notes, and quest acceptance.
- Authored quest state, item/coin rewards, barter delivery completion, optional deadlines, failure, and journal tracking.
- Generated contracts with objectives, deadlines, rewards, cargo consumption, completion validation, and failure penalties.
- Exact weekly event schedules, event demand modifiers, banners, auctions, Magic Draft, horse racing, and Myth matches.
- Company warehouses, banking, loans, passive shipments, shipment outcomes, and basic faction standing.
- Reactive market scarcity/oversupply, recovery over time, price modifiers, and market rumors.
- Four save slots, migrations, import/export, error boundaries, audio channels, offer reactions, and automated regression tests.

Release-hardening work still remains:

- Expand authored dialogue/quest content and special-case story callbacks beyond the generic safe runtime.
- Add deeper black markets, concealment upgrades, packhorse care, route history, permits, politics, rivals, and regional production chains.
- Expand Myth collection/deck management and AI personalities.
- Add event presentation polish, animation, real audio asset coverage, balancing tools, and manual full-play QA.
- Split the main JavaScript bundle and complete desktop packaging/release checks.

## High Priority V0 - Game Feel And Original-Style Flow

Status: implemented baseline; polish, content depth, and animation quality remain.

This priority sits above the numbered feature phases. The current React build has many useful mechanics, but it still reads too much like a website because navigation is always visible, several systems are exposed as independent pages, and the trading table lacks tactile movement. The next major UI/mechanics pass should make the app feel like a standalone game: one scene at a time, contextual exits, physical inventory interactions, animated feedback, and customers arriving at the player's stall.

Confirmed original-game reference notes:

- The original opens and plays as full-screen scenes, not as a website shell.
- It does not show persistent global navigation during normal play.
- Barter starts with a customer arriving at the player's stall, not from freely browsing a customer directory.
- After a customer leaves, the core stall actions are `Next Customer`, `Journal`, and `Packup`.
- `Packup` ends the trading day, saves, and moves the player to the map/day layer.
- Inventory and journal are in-scene panels or overlays, not normal pages.
- Barter has two-sided inventory, offer, and concealed panels.
- `Size` and `Weight` are shown separately and both matter.
- Large cargo such as horses, carts, crates, and bulky objects occupies larger visual inventory cells.
- Trading supports click and drag movement: left-click one, right-click all, middle-click split.
- Ask Offer creates a concrete counteroffer, then the player accepts or cancels.
- NPCs comment on deal quality, so accepted/rejected trade feedback should describe how good or bad the deal was.
- The travel map is a single parchment scene with town hotspots, route drawing, route cost, arrival days, law/quest information, and contextual actions.
- The remake should have a readable day/night cycle: a top-screen clock, gradual lighting changes across backgrounds, and different sun/moon ambience by time of day.

### V0.1 Replace Website Navigation With Game Scenes

Status: implemented baseline; richer transitions remain.

- Remove the always-visible top-level page navigation as the primary game movement model. Implemented by removing primary nav buttons from the game shell.
- Make the default in-run screen a location scene: town square, market stall, road map, company office, event hall, or pause menu. Market stall baseline implemented.
- Show only actions that make sense from the current place instead of exposing every system all the time. Implemented on the market stall baseline.
- Keep the HUD compact: day, money/value, cargo weight, cargo size, current town, and urgent status only. Implemented in the game shell baseline.
- Move secondary information into in-world overlays such as ledgers, books, cargo bags, notices, and stamped documents. Baseline implemented for roster, journal, cargo, item detail, filters, and system menu overlays.
- Use illustrated backgrounds, carved frames, parchment panels, scene hotspots, and animated transitions so each screen reads as a game space rather than a web page. Baseline implemented; major transition animation remains polish.
- Add a visible time-of-day clock and dynamic scene lighting so the player can read morning, afternoon, dusk, and night at a glance. Persistent gameplay time, HUD clock, passive time tick, action time costs, and lighting overlay implemented.

### V0.2 Original-Style Customer Flow

Status: implemented baseline; richer authored arrival presentation remains.

- Stop treating customer selection as a global directory that the player freely browses for barter. Implemented on the market hub.
- Make customers come to the player's stall one at a time, using a controlled queue influenced by market, profession, day, events, rumors, quests, heat, reputation, and random chance. Baseline queue uses existing customer rotation.
- Let the player call for the next customer, dismiss a customer, or leave the stall for town actions. Implemented with stall actions and Goodbye returning to the stall.
- Keep special NPCs accessible through contextual scenes when appropriate: quest meetings, company office, event halls, black-market contacts, and story encounters.
- Convert the current customers page into a behind-the-scenes roster/dossier or journal overlay, not the main barter entry point. Implemented as an in-scene overlay.
- Add visible arrival presentation: portrait slide-in, name/profession banner, short greeting, mood, relationship memory, and reason for visiting.

### V0.3 Contextual Scene Map

Status: implemented baseline.

- `Market` becomes the town square and player stall hub. Implemented.
- `Barter` becomes the focused trade table reached when a customer arrives. Implemented.
- `Travel` becomes the road/map gate reached from the town square or route exit. Implemented baseline through Map and Packup actions.
- `Company` becomes a physical office/warehouse/bank scene, not a generic management page. Existing scene remains the entry point; deeper physical room dressing remains polish.
- `Event` appears only when the current town has an active event or invitation. Implemented on the stall command bar.
- `Inventory`, `Journal`, `Item Detail`, and filters become overlays or sheets opened from relevant scenes. Implemented baseline.
- `Settings`, `Save`, `Load`, and `System` live inside a pause/menu layer, not normal town navigation. System menu implemented as an in-scene overlay; title/load/settings still exist for out-of-run flows.
- Keep expanded systems such as rivals, permits, Myth, contracts, route mastery, and balance tools, but surface them through scene objects and ledgers instead of persistent nav buttons.

### V0.4 Weight, Size, And Physical Cargo

Status: implemented baseline; deeper physical simulation remains.

- Upgrade item capacity from simple totals into a true weight-plus-size model inspired by the original game.
- Give items display classes for both dimensions: tiny, small, medium, bulky, huge, and heavy/super-heavy variants where needed. First-pass classes use current size/weight values.
- Make inventory visuals reflect size: larger cards, slot spans, bundle/pile art, or denser stack presentation depending on item class. First-pass grid spans and slot sizes implemented.
- Use weight for travel speed, route danger, packhorse strain, theft risk, guard suspicion, racing/event eligibility, and fatigue. Existing travel/capacity risk hooks use weight; deeper event-specific use remains.
- Use size for bag/cargo space, packhorse/cart upgrades, hiding difficulty, storage limits, fragile goods, and trade-table space. Existing capacity and visual slot spans use size; deeper hiding/storage rules remain.
- Add item feedback based on physicality: heavy thuds, coin clinks, paper rustles, glass clinks, magic shimmer, food handling, and bundle movement. First-pass visual physicality implemented; detailed audio categories remain polish.

### V0.5 Drag-And-Drop Trading Table

Status: implemented baseline; accepted-trade transfer animation remains.

- Let the player drag items from their inventory to their offer side. Implemented for matching player panels.
- Let the player drag items from the customer's inventory to the customer's offer side. Implemented for matching NPC panels.
- Let dragged items return from offer zones back into inventory. Implemented for matching owner panels.
- Add stack quantity controls after dropping stackable goods. Implemented with existing exact offer quantity inputs on offer-capable panels.
- Add fast interactions for repeated trading: right-click quick move, double-click move, split stack, protect/conceal toggle, and clear side. Implemented baseline with right-click all, double-click all, middle-click half, existing protect/conceal actions, and clear side.
- Make invalid drops bounce or shake with a clear reason: too heavy, no room, protected, concealed, customer refuses, not enough quantity, or illegal risk. Implemented baseline with accepted/invalid drop feedback; detailed reason text remains polish.
- Animate accepted trades by moving goods and coins across the table before updating inventories.

### V0.6 Barter Table Life And Feedback

Status: implemented baseline; portrait expression sets and full animation remain.

- Add NPC portrait reactions for pleased, tempted, neutral, annoyed, suspicious, insulted, and ready-to-deal states. Implemented as deal-quality reaction states; portrait expression art remains.
- Animate offer value and fairness changes instead of instantly changing numbers. Implemented baseline with animated balance bar.
- Show physical item piles, coin stacks, seals, or labels on the table so offers feel tangible. Implemented baseline with visible offer piles.
- Make Ask Price, Ask Offer, haggle, gift, ultimatum, accept, and reject actions produce short dialogue beats and visual feedback. Existing messages plus deal reaction panel implemented baseline.
- Add table effects for important moments: coin sparkle, parchment stamp, refusal shake, suspicious glare, almost-deal glow, and trade-complete flourish.
- Add small idle motion and audio loops so the barter screen does not feel frozen while the player thinks.

### V0.7 Scene Animation And Presentation

Status: implemented baseline; full transition/reward animation remains.

- Add page-turn, curtain, slide, wagon-route, fade, and stamp transitions for major scene changes.
- Add typewriter/dialogue reveal with optional faster text speed.
- Add inventory pickup/drop animation, stack split animation, and item-detail reveal. Drop feedback and split interaction implemented baseline; richer animation remains.
- Add travel route drawing, wagon movement, incident cards, toll payment, and arrival reveal.
- Add reward animations for coins, goods, quest completion, contracts, and rare finds.
- Add tasteful error feedback with motion and sound instead of relying only on toast text. Invalid drop motion feedback implemented baseline; broader error feedback remains.
- Upgrade the first-pass day/night presentation into a persistent gameplay clock with time costs for bartering, waiting, packup, travel departure, shop/event schedules, and per-market lighting palettes. Persistent clock, time costs, and lighting implemented baseline; per-market bespoke palettes and schedules remain.

### V0.8 Suggested Build Order

1. Replace global navigation with the scene shell and contextual exits.
2. Implement customer arrival queue and make barter start from the player's stall.
3. Convert customers, inventory, journal, filters, and item detail into overlays or ledgers.
4. Implement true weight/size classes and visible physical cargo differences.
5. Add drag-and-drop trading table interactions.
6. Add barter reactions, table motion, item movement, sounds, and deal animations.
7. Add scene transitions, travel presentation, reward effects, and error feedback.

## Phase 1 - Foundations

### 1. Economy, Capacity, And Travel Costs

Status: implemented baseline.

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

Status: implemented baseline.

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

Status: implemented baseline.

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

Status: implemented baseline.

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

Status: implemented baseline.

Goal: make large inventories usable.

Tasks:

- Exact quantity entry.
- Persistent filters.
- Item notes.
- Highlight, quest, illegal, concealed, protected, and collection markers.
- Item comparison popovers. Implemented baseline on inventory item cards.
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

Status: implemented baseline.

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

Status: implemented baseline.

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

Status: implemented baseline, improved beyond original one-line prompts.

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

Status: implemented baseline.

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

Status: implemented baseline.

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

Status: implemented baseline.

Goal: make markets feel alive.

Tasks:

- Add day/week/season/year schedule. First pass estimates next day from extracted frequency.
- Add recurring and one-time events. First pass displays extracted market events.
- Add demand/supply event bias.
- Add event banners and warnings.

Acceptance:

- Players can plan around future events.

### 14. Auctions And Drafts

Status: implemented baseline.

Goal: rebuild high-stakes item events.

Tasks:

- Add auction lots, bidder behavior, reserve prices, bid/pass, and results.
- Add draft pick order, pick ownership, choice scouting, and confirm pick.
- Add bidder tells and scouting improvements beyond original.

Acceptance:

- Auctions and drafts are playable and produce real item transfers.

### 15. Horse Racing

Status: implemented baseline.

Goal: add betting and event variety.

Tasks:

- Add race entries, odds, advice purchase, bet amount, result, and payout.
- Add track/weather/stable modifiers as an improvement.

Acceptance:

- Player can place bets and receive results/rewards.

### 16. Myth Card Game

Status: playable baseline.

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

Status: implemented baseline.

Goal: give late-game merchants strategic scale.

Tasks:

- Add company state, stock, warehouses, shipment jobs, agents, and history.
- Add risk/reward shipment outcomes.
- Add passive routes only after manual route mastery.

Acceptance:

- Player can invest in long-term trade operations.

### 18. Banking, Loans, And Factions

Status: implemented baseline.

Goal: make money and politics matter.

Tasks:

- Add loans and repayment.
- Add faction/kingdom reputation.
- Add guild seals, permits, tax breaks, and penalties.
- Add election/vote consequences.

Acceptance:

- Financial and political choices affect the world.

### 19. Dynamic Market Simulation

Status: implemented baseline.

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

Status: implemented baseline.

Tasks:

- Multiple save slots. Implemented with four local slots.
- Save metadata. Implemented with saved date, day, and market.
- Confirm overwrite/delete.
- Schema migrations.
- Import/export stability.

### 21. Audio And Animation

Status: audio infrastructure implemented; animation and asset coverage remain.

Tasks:

- Dialogue voices by tone/personality.
- Offer quality reactions.
- Event and crowd sounds.
- Separate volume channels.
- UI animation polish.

### 22. Balance Pass

Status: ongoing.

Tasks:

- Travel costs.
- Inventory friction.
- NPC inventories.
- Barter thresholds.
- Quest rewards.
- Event payouts.

### 23. Full QA And Packaging

Status: automated checks implemented; manual full-play and desktop release QA remain.

Tasks:

- Regression tests.
- Manual full-play smoke.
- Broken asset scans.
- Save/load migration checks.
- Desktop packaging if needed.

## Roadmap V2 - From Current Prototype To Finished Game

This is the active roadmap after the first parity pass. The old phase list above remains as the broad feature map; this V2 list is the practical build order from the current codebase.

### V2.1 Stabilize The Core Trade Loop

Status: implemented.

Goal: make barter, inventory, travel, saves, and dialogue reliable enough to support larger systems.

Tasks:

- Add tests for Ask Price and Ask Offer using fixed player/NPC inventories. Implemented.
- Add tests for travel toll payment, capacity blocking, theft, and guard confiscation. Implemented.
- Add tests for save migration and four local save slots. Implemented.
- Add UI smoke checks for the barter screen so black-screen regressions are caught early. Implemented.
- Add an explicit error boundary around major game views. Implemented.
- Add undo last offer change. Implemented.
- Add confirm overwrite/delete for save slots. Implemented.

Acceptance:

- A build plus tests catches broken barter, travel, and save behavior.
- User-facing actions fail with visible messages instead of blank screens.
- Save slots cannot be accidentally overwritten or deleted without confirmation.

### V2.2 Finish Trading Parity

Status: implemented baseline.

Goal: make the trading/bargaining logic feel close to the original while staying clearer than the original.

Tasks:

- Add original-like `benfordsLawRandom` quantity selection for generated inventory and counteroffers. Implemented for generated inventory.
- Add NPC budget/wealth limits. Implemented.
- Add fair-match random chance and safety-net/gift behavior. Implemented.
- Add ultimatum mode when patience gets low. Implemented.
- Add reputation gates and reputation minimums. Implemented.
- Add barter-specific NPC roles: guard, thief, beggar, traveler, plunderer, snitch, guild official. Implemented baseline from original flags.
- Add offer-quality audio reactions. Implemented with dialogue audio channel hooks.
- Add detailed debug breakdown for balancing. Implemented through deal-intelligence value lines; dedicated tuning UI remains future polish.

Acceptance:

- NPCs do not all negotiate the same way.
- Repeated weak offers, generous offers, and role-specific NPCs change outcomes.
- Balancing can be inspected without guessing.

### V2.3 Finish Inventory And Item Interaction

Status: implemented baseline.

Goal: make every important item category useful, inspectable, and manageable.

Tasks:

- Add item notes and persistent item highlights. Implemented.
- Add quest-needed markers in inventory and barter panels. Implemented in shared inventory panels.
- Add item comparison popovers. Implemented baseline on inventory item cards.
- Add readable book/letter viewer. Implemented baseline.
- Add image/inspection viewer for maps and paintings. Implemented baseline.
- Add special item handlers for maps, deeds, Myth cards, storage, and permits. Implemented baseline inspection and mechanical hooks.
- Add bulk actions: protect all, reveal all, clear offer, move exact stack sets. Implemented baseline for visible filtered cargo.
- Add item search that works from the inventory screen, not only a placeholder filter page. Implemented.

Acceptance:

- Books, maps, paintings, deeds, cards, permits, and storage items have obvious actions.
- Large inventories can be searched, filtered, sorted, marked, and managed quickly.

### V2.4 Deepen Travel, Law, And Smuggling

Status: mostly implemented.

Goal: turn route planning and contraband into a strategic layer.

Tasks:

- Add stallage/market fee charging. Implemented.
- Add route risk previews using theft, law, toll, distance, value, and concealment. Implemented.
- Add guard inspection odds instead of automatic first illegal stack confiscation. Implemented.
- Add bribes, permits, and active evasion choices. Implemented baseline.
- Add concealment quality and hidden-compartment upgrades.
- Add black market customer hooks.
- Add snitch behavior and reputation penalties.
- Add packhorse care, injury, upkeep, and upgrades.
- Add route ledger history: cost, incidents, profit, and travel notes. Implemented with route history, average route comparison, incidents, and editable route notes.

Acceptance:

- Illegal goods are profitable but risky.
- Concealment helps without becoming a guaranteed bypass.
- Travel creates memorable outcomes and useful route history.

### V2.5 Build The Real Dialogue And Quest Runtime

Status: implemented baseline.

Goal: move from contextual generated dialogue to authored stateful conversations and quests.

Tasks:

- Extract or define dialogue graph nodes with typed response choices. Implemented.
- Add current dialogue node state per active conversation. Implemented.
- Add typed callback registry for safe quest/story effects. Implemented.
- Add quest rewards: items, coins, unlocks, discounts, reputation, and flags. First pass copper rewards implemented.
- Add quest objective checking against inventory, market, day, and NPC relation state. Inventory objective checking implemented.
- Add quest completion transactions through barter. Implemented.
- Add quest failure and expiry. Implemented for authored deadlines.
- Add journal tabs: active quests, completed, rumors, markets, NPCs, items, notes.
- Add quest item highlighting across inventory, trade, and item detail.

Acceptance:

- Quests can be accepted, progressed, completed, failed, and rewarded.
- Dialogue choices can safely trigger game effects without arbitrary script execution.
- The journal tells the player what to do next.

### V2.6 Add Contracts And Notice Board Jobs

Status: implemented baseline.

Goal: ensure every market offers useful repeatable work.

Tasks:

- Add contract generator for delivery, procurement, smuggling, courier, race, auction, and rumor jobs. First pass includes delivery, procurement, and smuggling.
- Add time limits, destination markets, required items, optional secrecy, and bonus conditions. First pass includes time limits, destinations, and risk summaries.
- Add contract difficulty tiers. First pass includes low/medium/high risk.
- Add contract tracking and pinning. First pass includes accepted/completed contract state.
- Add generated rewards based on distance, risk, rarity, and urgency. First pass includes copper rewards from route and risk data.
- Add contract failure consequences. Implemented with expiry and copper penalties.

Acceptance:

- A player can always find a meaningful job without relying only on authored quests.
- Contracts interact with trading, travel, smuggling, and events.

### V2.7 Make Events Playable

Status: implemented baseline.

Goal: convert event previews into playable activities.

Tasks:

- Add event sessions for market events. Implemented for auctions, drafts, races, and Myth.
- Add event demand/supply modifiers before and during events. Implemented.
- Add event banners in market and journal views. Implemented.
- Add auctions with lots, bidder behavior, reserve limits, bid/pass, tells, and results. Implemented.
- Add drafts with generated rounds, rival picks, confirm pick, and item transfer. Implemented baseline.
- Add horse racing with entries, form, odds, betting, results, and payouts. Implemented.
- Add event preparation hints from NPC dialogue and rumors. Implemented baseline.

Acceptance:

- Events change prices and create special opportunities.
- Auctions, drafts, and races are playable from start to result.

### V2.8 Build Myth As A Full Side Game

Status: playable baseline.

Goal: make Myth a polished optional game loop, not just an item tag.

Tasks:

- Build pure Myth rules module. Implemented.
- Add card definitions, archetype decks, hands, rounds, turn state, and win conditions. Implemented.
- Add quick-play against NPCs. Implemented through the Warg Bay event.
- Add wagers and prizes. Implemented; relationship effects remain.
- Add tournaments linked to event calendar. Implemented baseline.
- Add card collection and deck management.
- Add AI personalities for cautious, aggressive, collector, gambler, and expert players.

Acceptance:

- Myth can be played independently and can connect back to NPCs, quests, and events.

### V2.9 Add Long-Term Progression

Status: implemented baseline.

Goal: give the late game strategic depth beyond hand trading.

Tasks:

- Add warehouses per market. Implemented.
- Add company state and shipment history. Implemented; staff/agents remain.
- Add shipments with risk/reward outcomes. Implemented.
- Add passive routes. Implemented as one active company shipment at a time.
- Add banking, loans, repayment, and debt consequences. Implemented baseline.
- Add faction and kingdom reputation. Implemented as shipment destination standing.
- Add permits, guild seals, tax breaks, fines, and political consequences.
- Add rival merchants with route plans, stock pressure, event participation, and relationship states.

Acceptance:

- The player can grow from hand trader to company operator.
- Political, financial, and rival choices affect the world.

### V2.10 Dynamic Market Simulation

Status: implemented baseline.

Goal: make the economy replayable and reactive.

Tasks:

- Add supply/demand drift by market, day, trade, and event. Implemented; seasonal modeling remains.
- Add scarcity after player buyouts. Implemented.
- Add rumors around major price shifts. Implemented.
- Add regional production chains.
- Add rival merchant impact on scarcity and price.
- Add market recovery over time. Implemented.
- Add balancing tools to inspect price drift and outliers.

Acceptance:

- Trade routes are not solved forever.
- Market conditions create new opportunities and risks across a playthrough.

### V2.11 Polish, Balance, And React Completion

Status: in progress.

Goal: make the React game stable, readable, balanced, and complete enough for repeated full playthroughs.

Tasks:

- Balance travel costs, stallage, theft, guard odds, barter thresholds, and rewards.
- Add separate audio channels for UI, dialogue, ambient, events, and minigames. Implemented infrastructure; real asset coverage and settings controls remain.
- Add animation polish for trade, travel, dialogue, events, and inventory actions.
- Add broken asset scans for portraits, items, backdrops, routes, and UI parts. Implemented with `pnpm audit:assets`.
- Add save import/export compatibility checks.
- Add full-play manual smoke script.
- Desktop packaging is explicitly deferred until the user requests it.
- Add final UX pass for all buttons, disabled states, tooltips, and error states.

Acceptance:

- A new player can start, trade, travel, complete jobs, save/load, and recover from errors without developer help.
- React production builds are reproducible and verified.

## Roadmap V3 - Gameplay Expansion

Desktop packaging is out of scope for V3. Work should remain focused on the React game, its mechanics, content, balance, assets, and browser-side quality.

### V3.1 Caravan And Route Mastery

Status: implemented baseline.

- Add persistent route history with costs, incidents, cargo value, outcome, and notes. Implemented.
- Add route mastery levels and perks after repeated successful travel. Implemented with inspection/theft reduction.
- Add packhorse condition, travel wear, repair, and upgrades. Condition/wear/repair implemented; injuries and specialized upgrades remain.
- Add hidden compartments and concealment-quality upgrades. Implemented with three levels.
- Add route bookmarks and preferred-route comparisons. Implemented with bookmarks and route average comparison.
- Add journey supplies, weather, terrain, and caravan morale.

### V3.2 Underworld, Law, And Politics

Status: implemented baseline.

- Add black-market customers and contraband-only inventories. Underworld access and NPC labels implemented; dedicated inventories remain.
- Add forged permits with quality, expiry, detection, and confiscation risk. Quality/expiry/risk implemented.
- Add kingdom heat/wanted levels and cooldown over time. Implemented.
- Add fines, jail alternatives, informants, snitches, and legal favors.
- Add guild permits, tax discounts, trade licenses, and restricted markets.
- Add elections, votes, faction choices, and consequences.

### V3.3 Rival Merchants And Regional Economy

Status: implemented baseline.

- Add named rival merchants with wealth, personality, and routes. Implemented; cargo manifests remain.
- Let rivals buy out stock and affect scarcity. Implemented; event and contract participation remain.
- Add regional production chains and commodity dependencies.
- Add seasonal production, shortages, disasters, and recovery.
- Add route competition, price history, route profitability, and economic reports.
- Add balancing inspectors for extreme prices and infinite-profit loops.

### V3.4 Myth Collection And Competitive Play

Status: implemented baseline.

- Add a persistent Myth card collection and owned cards. Implemented.
- Add deck builder and validation. Implemented for one active 5-12 card deck; saved deck presets and filters remain.
- Add card rarity and special abilities. Implemented baseline; status effects and board positions remain.
- Add cautious, aggressive, collector, gambler, and expert AI. Implemented.
- Add casual matches, ranked opponents, wagers, tournaments, trophies, and rewards.
- Connect Myth outcomes to NPC relationships, quests, and events.

### V3.5 Story, Dialogue, And World Content

Status: in progress.

- Expand every authored quest into multi-stage objectives and consequences.
- Add dialogue conditions based on quests, relations, inventory, laws, events, and factions.
- Add NPC memories, secrets, favors, rivalries, introductions, and follow-up conversations. Gifts, illegal deals, favors, and unlockable secrets implemented; rivalries and larger arcs remain.
- Add rumors that can be true, outdated, exaggerated, or deliberately false.
- Add character-specific gifts, betrayals, rescues, recruitment, and long-term arcs.
- Add more repeatable contract families and chained contracts.

### V3.6 React Quality, Balance, And Presentation

Status: in progress.

- Add focused UI tests for events, company, inventory, dialogue, travel, and saves. Core logic and barter UI coverage implemented; more screen-level coverage remains.
- Add a repeatable full-play smoke checklist and automated core-loop scenario. Automated cross-system scenario implemented; manual checklist remains.
- Add developer balance views for barter, travel, events, market drift, and progression. Journal balance inspector implemented for major economy/progression outliers.
- Add button-state, keyboard, tooltip, overflow, and error-state review.
- Add animation polish and full audio asset/channel controls.
- Add broken-asset scans and missing-content reports. Implemented baseline with `pnpm audit:assets`; deeper content reports remain.
- Split large React bundles and lazy-load major screens where useful.
- Keep desktop packaging deferred.

## Roadmap V4 - Content Depth And Replayability

Desktop packaging remains out of scope for V4. This phase is about making the React game feel deeper, less predictable, and more replayable after the current V3 baselines.

### V4.1 Story And Dialogue Expansion

Status: planned.

- Turn major authored quests into multi-stage arcs with branching outcomes, follow-up dialogue, and visible world consequences.
- Add NPC rivalries, introductions, alliances, betrayals, rescues, recruitment, and recurring personal requests.
- Expand NPC memories so characters remember gifts, insults, illegal deals, failed promises, successful favors, and important trades across the whole run.
- Add false, outdated, exaggerated, and faction-planted rumors so information itself becomes a trade good.
- Add character-specific gift preferences, secret unlocks, and long-term loyalty rewards.
- Add chained contracts that start as ordinary jobs and escalate into story, law, underworld, or rival-merchant consequences.

### V4.2 Black Market, Law, And Politics Depth

Status: planned.

- Add dedicated black-market inventories with contraband-only stock, rare stolen goods, forged documents, and risk-adjusted prices.
- Add informants, snitches, jail alternatives, confiscation negotiations, legal favors, and quiet ways to reduce heat.
- Add guild permits, tax discounts, trade licenses, restricted market access, and kingdom-specific exemptions.
- Add elections, faction votes, local politics, guild disputes, and consequences that change taxes, laws, prices, and route safety.
- Add underworld reputation tiers with new contacts, better illegal prices, worse guard attention, and betrayal risk.
- Add smuggling missions that require route planning, concealment upgrades, permits, and trusted contacts.

### V4.3 Regional Economy And Production Chains

Status: planned.

- Add regional production chains where raw goods, tools, food, luxury goods, and magical materials affect each other's prices.
- Add seasonal production cycles, festivals, harvests, shortages, disasters, recovery periods, and temporary route opportunities.
- Add market price history, route profitability reports, and discovered trade-route comparisons.
- Add rival merchant competition that reacts to profitable routes and can drain stock before the player arrives.
- Add economy reports that explain why a price is rising or falling instead of showing only the final number.
- Add balance checks for infinite-profit loops, extreme price drift, and economy states that become too punishing.

### V4.4 Rival Merchants And Competitive World

Status: planned.

- Give rivals cargo manifests, preferred commodities, route habits, cash reserves, debt pressure, and changing strategies.
- Let rivals participate in auctions, contracts, events, black-market deals, and regional shortages.
- Add direct rivalry actions: undercutting, buying out key stock, bidding wars, rumor spreading, sabotage, and cooperation offers.
- Add rival relationship states such as respectful competitor, bitter enemy, business partner, and secret underworld associate.
- Add rival journals, arrival rumors, and market notices so the player can track and counter them.
- Add late-game rival arcs where major competitors become recurring campaign threats or allies.

### V4.5 Caravan, Travel, And Route Mastery Depth

Status: planned.

- Add journey supplies, weather, terrain, road quality, caravan morale, and route-specific hazards.
- Add packhorse injuries, fatigue, special tack, armored packs, silent harnesses, cooling crates, and fragile-cargo protection.
- Add custom route notes, player bookmarks, known incident history, and best-profit route comparison.
- Add specialized caravan upgrades for legal trade, smuggling, luxury delivery, fragile goods, magical goods, and bulk cargo.
- Add route events that branch from current cargo, heat, permits, rival activity, weather, and NPC relationships.
- Add travel contracts where speed, risk management, cargo condition, and secrecy matter as much as arrival.

### V4.6 Myth Competitive And Collection Depth

Status: planned.

- Add saved deck presets, card filters, rarity filters, sort modes, and quick deck validation.
- Add ranked play, wagers, tournaments, seasonal cups, trophies, and named champions.
- Add deeper card abilities with status effects, board positions, counters, combo cards, and faction synergies.
- Connect Myth wins, losses, wagers, and tournament results to NPC relationships and story opportunities.
- Add collectible card rewards through quests, rivals, auctions, black markets, and special events.
- Add AI opponent profiles with visible habits the player can learn and exploit.

### V4.7 React Quality, Presentation, And Tools

Status: planned.

- Add screen-level UI tests for travel, company, events, inventory, dialogue, journal, Myth, and save/load flows.
- Add a manual full-play smoke checklist covering a complete merchant run from new game through late-game systems.
- Add broken asset scans for portraits, item art, UI parts, backdrops, audio, and event images.
- Add button-state, disabled-state, tooltip, keyboard, overflow, and error-state review across every screen.
- Add animation polish for trade offers, accepted deals, rejected offers, travel results, event rewards, Myth turns, and inventory actions.
- Add full audio settings with separate channel controls for UI, dialogue, ambient, events, minigames, and offer reactions.
- Split large React bundles and lazy-load major screens where it helps browser performance.

### V4 Suggested Build Order

1. Black-market inventories and smuggling missions, because they connect trading, law, travel, and NPC trust.
2. Route notes, route profitability, weather, supplies, and caravan injuries, because travel should become a core strategic layer.
3. Regional production chains and seasonal economy events, because they make trade routes change across long runs.
4. Rival cargo manifests and rival participation in auctions, contracts, and profitable routes.
5. Myth deck presets, ranked matches, tournaments, and NPC-linked rewards.
6. Multi-stage NPC arcs, false rumors, chained contracts, rescues, betrayals, and recruitable allies.
7. Screen-level QA, asset scans, animation polish, audio settings, and bundle splitting.

## V2 Immediate Next Steps

1. Run a complete manual playthrough covering trade, travel, contracts, every playable event, Myth, company progression, saves, and failure recovery.
2. Add focused UI tests for events, company actions, inventory notes/readers, and dialogue graph navigation.
3. Add black-market customers, concealment upgrades, packhorse upkeep, route history, and rival merchants.
4. Expand Myth collection/deck management and opponent personalities.
5. Add balancing dashboards for barter, event payouts, market drift, travel risk, loans, and shipments.
6. Complete animation/audio asset coverage, bundle splitting, and React-side QA. Desktop packaging remains deferred.

## Current Sprint - V2.1 Completion

Status: implemented.

Goal: finish the remaining safety net before deeper NPC/economy work.

Tasks:

- Extract travel execution into a pure testable game-logic function. Implemented.
- Test successful travel: toll is paid, day advances, market changes, arrival result is recorded. Implemented.
- Test failed travel: unaffordable toll does not move the player. Implemented.
- Test failed travel: overloaded cargo does not move the player. Implemented.
- Add a barter screen smoke test that renders the conversation view with a selected NPC and verifies core controls exist. Implemented.
- Keep `pnpm test`, `pnpm audit:data`, and `pnpm build` passing.

Acceptance:

- Travel regressions are caught without relying on manual clicking.
- Barter screen rendering regressions are caught before they become black-screen bugs.
- The sprint can be marked complete before starting NPC budgets and ultimatum mode.

## Immediate Next Steps

Deprecated. Use `V2 Immediate Next Steps` above.
