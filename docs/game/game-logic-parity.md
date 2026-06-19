# Game Logic Parity

This file tracks remake game logic against the original Merchant of the Six Kingdoms runtime.

Original reference currently inspected:

- `D:\game\fun games\merchant of the six kingdoms\Merchant.of.the.Six.Kingdoms.v6.3\.codex-inspect\renderer.js`
- Previously extracted manifest path is stale: `D:/game/merchant_of_the_six_kingdoms/.orig-work/app/dist/electron/renderer.js`

Use `docs/game/roadmap.md` for the broad product roadmap. Use this file for implementation-level game mechanics.

## Current Logic Implemented

### Data And Content

- Loads extracted original items, characters, marketplaces, kingdoms, and professions from `src/data/generated`.
- Supports offline mod packs from `public/data/mods`.
- Generates deterministic NPC inventories from character/profession obtainable item pools.
- Starts the player with a small local inventory of coins, loaf, onions, and working gloves.

### Inventory And Offers

- Inventory entries track `quantity`, `offerQuantity`, `protected`, and `conceal`.
- Left click moves one item into or out of an offer.
- Right click moves all into stock offer or clears offer panel.
- Shift moves half.
- Alt moves ten.
- Protected player items cannot be added to an offer.
- Conceal/reveal exists on player inventory entries.
- Offer transfer removes empty source entries and merges matching target entries.
- Current item UI supports category filtering, sort cycling, item detail, protect/unprotect, and conceal/reveal.

### Barter Valuation

Core barter math has been aligned with the original where current extracted data supports it.

Implemented valuation inputs:

- Base item `loafValue * offerQuantity`.
- Character bias.
- Profession bias.
- Marketplace bias.
- Kingdom bias.
- Exotic/import bonus when item origin kingdom differs from current kingdom.
- Bulk discount for larger quantities.
- NPC frugality discount on player offers.
- NPC haggling bonus on character offers.
- Haggling bonus decreases after failed offers through `offersMade`.
- Difficulty hook exists in the formula, currently defaulting to `0`.

Implemented appraisal states:

- `great_deal`
- `good_deal`
- `fair_deal`
- `close`
- `reaching`
- `far`
- `leave`

Important original behavior now matched:

- Equal value is not accepted; the player offer must be in the NPC's favor.
- NPC `frugalPercent` discounts the value of what the player gives.
- NPC `hagglePercent` increases the value of what the NPC gives.

### Barter Actions

- `Ask Price` tries to fill the player offer with visible player goods that match the NPC's selected goods.
- `Ask Offer` tries to fill the NPC offer with their goods to match the player's selected goods.
- `Accept` completes a trade only for `great_deal`, `good_deal`, or `fair_deal`.
- Failed offers increment `offersMade`.
- `Clear` clears both offers and resets offer pressure.
- `Goodbye` clears offers and deselects the customer.

### Travel

- Travel between connected markets works.
- Travel advances day count by route `travelDays`.
- Travel charges route tolls in copper, advances days, and shows confirmation/arrival summaries.
- Arrival can trigger guard confiscation for unconcealed illegal goods and deterministic market theft events.

### Save/Load

- Local browser save/load/import/export works.
- Save delete works.
- Old saves without `offersMade` are upgraded in memory with `offersMade: 0`.
- Four local save slots with metadata are supported.
- Old saves without NPC relations, quest states, dialogue notes, or travel results are upgraded in memory.

### Dialogue, Journal, And Events

- Dialogue choices are generated from extracted NPC dialogue, preferences, market demand, route data, laws, theft risk, stock pools, haggling style, and relationship memory.
- Dialogue replies are persisted into an NPC conversation ledger.
- Journal/Notice Board displays local market quests, quest statuses, authored market quest lists, conversation notes, and upcoming market events.
- Quest statuses persist through save/load.

### UI Action Feedback

- Most visible UI buttons now either perform a supported action or show an explicit "not implemented yet" message.
- Unsupported systems should not silently do nothing.

## Original Logic Still Missing Or Partial

### Barter And NPC Behavior

- Reputation minimums and original-specific reputation gates.
- Ultimatum mode.
- Original voice/tone audio reactions for offer quality.
- Full original request/solicit dialogue text routing.
- Random chance for fair match offer.
- Safety net/gift behavior.
- Beggar, plunderer, snitch, guard, traveler, and non-merchant special behavior.
- Better inventory turnover using `turnoverPercent`.
- Original `benfordsLawRandom` quantity selection for generated offers.

### Economy

- Real currency conversion UX and helper actions.
- Difficulty setting that feeds barter valuation.
- Dynamic supply/demand changes over time.
- Event demand modifiers.
- Company jobs, warehouses, shipments, profit split, and stock value.
- NPC wealth/budget limits.

### Travel, Capacity, And Risk

- Stallage/market fees.
- Deeper packhorse care/injury/upgrades.
- Arrival result summary.
- Route risk and travel incidents.
- Market closing/packup flow.

### Illegal Items, Theft, And Guards

- Bribes and active evasion choices.
- Deeper concealment odds and guard personality rules.
- Snitch behavior and reputation penalties.

### Dialogue, Quests, And Events

- Full original dialogue graph runtime.
- Response choices from extracted scripts.
- Typed callback registry for original callback ids.
- Quest rewards and completion transactions.
- Event sessions and rewards.
- Quest-specific barter hooks such as forced offer items, special costs, or quest completion transactions.

### Special Item Behavior

- Text readers for books/letters.
- Image viewers for paintings/maps.
- Map item unlocks.
- Deed behavior.
- Myth card/deck behavior.
- Carry/pull item behavior.
- Quest/highlight/uncollected markers.

### Minigames And Special Systems

- Auctions.
- Drafts.
- Horse races.
- Myth card game and tournaments.
- Library/recommendations.
- Banks/loans.
- Elections/votes/story outcomes.

## Original Mechanics Inventory

The original renderer references these major systems. Use this as the high-level parity map when deciding what to rebuild next.

### Trading And Bartering

- Deep barter valuation with character, profession, marketplace, kingdom, exotic, bulk, frugal, haggling, difficulty, and quest-specific modifiers.
- Ask Price and Ask Offer matching behavior.
- Request/solicit flow with NPC speech.
- Offer quality states and voice/tone reactions.
- NPC patience, reputation, and repeated-offer pressure.
- Special NPC roles such as merchants, travelers, beggars, guards, thieves, snitches, and plunderers.
- Gift/safety-net behavior for very poor players or generous trades.

### Inventory And Item Systems

- Item quantity, weight, size, carry, pull, rarity, uniqueness, kingdom origin, image/text files, and special tags.
- Protect/flag behavior.
- Concealment separate from protection.
- Illegal item status by kingdom.
- Item notes and item highlighting.
- Text readers for books/letters.
- Image viewers for paintings/maps.
- Map unlocks.
- Deed behavior.
- Myth card/deck behavior.
- Packhorse and storage item behavior.

### Travel And Capacity

- Route travel days.
- Tolls.
- Stallage/market fees.
- Carry and pull limits.
- Packup flow.
- Market closing events.
- Route and destination unlocks.
- Travel risk hooks.

### Law, Theft, And Consequences

- Kingdom illegal item tags.
- Guard inspection and confiscation.
- Theft chance by market.
- Theft constraints by max loaf value, max quantity, and max item size.
- Snitch behavior.
- Concealment consequences.
- Reputation penalties.

### Dialogue, Quests, And Story

- Dialogue graph nodes with response choices.
- Callback ids for quest and story effects.
- Quest start/reject/finish/fail states.
- Quest rewards in items, coins, market unlocks, discounts, or story flags.
- Journal updates.
- Story consequence screens.
- Character dialogue mutation after quest outcomes.
- Election/vote outcomes.
- Exile/resistance choices.

### Events And Minigames

- Auctions.
- Drafts.
- Horse races and betting.
- Myth card games and tournaments.
- Market event calendar.
- Recurring and one-time events.
- Event-biased demand/supply.
- Crowd/reaction audio.

### Long-Term Economy And Progression

- Company jobs.
- Warehouse/shipment systems.
- Stock ownership and value changes.
- Loans and bank behavior.
- Library and recommendation systems.
- Faction/kingdom relationships.
- Dynamic supply restrictions.

## Better-Than-Original Improvement Ideas

These are not strict parity requirements. They are product improvements to make the remake more readable, strategic, and replayable than the original.

### Barter Clarity

- Add a Deal Intelligence panel with readable hints: liked tags, disliked tags, bulk penalty, exotic bonus, market demand, and haggling pressure.
- Show offer quality as a conversational meter instead of only raw value.
- Add "why they refused" feedback with the top 2-3 reasons.
- Add optional advanced tooltips that reveal the full valuation breakdown for debugging/balancing.
- Add undo for the last offer change.
- Add saved trade templates for common payments such as "one silver worth", "food bundle", or "fair counteroffer".

### Merchant Memory And Ledger

- Auto-record seen NPC preferences.
- Auto-record observed prices and appraisal notes.
- Auto-record profitable routes and market demand.
- Auto-record illegal goods by kingdom.
- Add manual notes per NPC, item, market, and route.
- Add bookmarks for routes and target items.
- Add a "shopping list" and "contract items needed" tracker.

### NPC Depth

- Add relationship states: stranger, familiar, trusted, favored, insulted, rival.
- Add grudges for exploitative offers or repeated failed haggles.
- Add generous-trader perks: tips, discounts, gifts, early event warnings.
- Add NPC schedules and availability by weekday/event.
- Add NPC budgets and preferred payment types.
- Add personality traits: patient, greedy, proud, cautious, desperate, collector, gambler.
- Add rumor quality based on trust and profession.

### Rival Merchants

- Add rival merchants who buy scarce goods, attend auctions, win races, speculate, and alter prices.
- Let rivals become allies, competitors, debtors, informants, or enemies.
- Add visible rival route plans that the player can beat, join, sabotage, or ignore.
- Add reputation contests for guild leadership or market dominance.

### Contracts And Quests

- Add contract tiers from simple delivery to multi-market trade chains.
- Add optional bonuses for speed, condition, secrecy, or profit margin.
- Add branching quest negotiation with advance payment, higher reward, alternate reward, or refusal.
- Add quest consequences that change market laws, events, taxes, NPC stock, and market unlocks.
- Add repeatable notice-board jobs with authored rare jobs mixed in.

### Illegal Goods And Smuggling

- Add black market customers.
- Add hidden compartments and concealment upgrades.
- Add bribes, forged permits, informants, and guard routes.
- Add smuggling-specific route risk.
- Add legal alternatives: licenses, faction exemptions, church permissions, guild seals.
- Make illegal goods high-profit but high-consequence instead of only punitive.

### Travel Strategy

- Add route profit forecasting with tolls, days, risk, and capacity.
- Add weather and seasonal route modifiers.
- Add caravan guards, insurance, and road supplies.
- Add travel incidents with choices: pay, fight, hide, abandon cargo, negotiate.
- Add route permits and faction toll discounts.
- Add packhorse care, injuries, and upgrades.

### Market Simulation

- Add festivals, wars, harvests, storms, shortages, and religious holidays.
- Add market supply/demand that drifts over time.
- Add scarcity after the player buys out a market.
- Add demand spikes from quests and events.
- Add regional production chains: raw materials, crafted goods, luxury exports.
- Add visible rumors before major price shifts.

### Player Builds

- Add merchant archetypes through perks rather than combat classes:
  - Honest Broker.
  - Smuggler.
  - Collector.
  - Investor.
  - Gambler.
  - Scholar.
  - Caravan Master.
  - Guild Diplomat.
- Perks should improve trading actions: appraisal clarity, better rumors, lower tolls, safer concealment, faster relationship gain, or better auction reads.

### Events And Minigames

- Improve auctions with bidder tells, reserve prices, fake-outs, and pre-auction scouting.
- Improve horse races with imperfect tips, track/weather conditions, odds movement, and stable reputation.
- Improve drafts with pick trading, scouting, and long-term item planning.
- Make Myth a polished side game with quick-play, tournaments, deck collection, and wager rules.
- Add event preparation screens so players can plan instead of stumbling into events.

### Company And Progression

- Add warehouses in major markets.
- Add hired agents who run routes or gather rumors.
- Add shipment insurance and risk/reward choices.
- Add company stock, dividends, and market influence.
- Add unlockable offices with ledger upgrades.
- Add passive route automation only after the player understands the manual trade loop.

### Quality Of Life

- Add quick split controls and exact quantity entry.
- Add item comparison popovers.
- Add search filters that persist per screen.
- Add route bookmarks.
- Add "show only profitable/needed/illegal/concealed/quest" filters.
- Add a compact transaction summary after every trade.
- Add clear save metadata and multiple save slots.
- Add optional tutorial overlays that can be disabled.

## Highest Impact Next Milestones

1. Capacity, money helpers, travel tolls, and stallage.
2. Illegal item markers and concealment consequences.
3. Original-style barter regression tests.
4. NPC reputation, patience, and offer-quality reactions.
5. Dialogue graph runtime and typed callback registry.
6. Quest state machine and journal.
7. Travel confirmation/result screens with risk.
8. Market event calendar.
9. Theft, guard, and snitch mechanics.
10. Auctions, drafts, horse racing, and Myth.
11. Company, warehouse, loans, and long-term market simulation.

## Recommended Next Implementation Order

1. Add a pure `economy`/`capacity` module for money, weight, size, carry, pull, tolls, and stallage.
2. Add illegal item helpers using current kingdom tags, then display illegal/conceal markers everywhere.
3. Add original-style barter tests using fixed inventories and known appraisal outcomes.
4. Add original `benfordsLawRandom` and use it in generated Ask Price/Ask Offer quantities.
5. Add NPC reputation/patience and offer-quality tone messages.
6. Add travel confirmation/result with tolls and capacity checks.
7. Add dialogue graph runtime with typed callback registry.
8. Add quest state and journal.
9. Add event calendar and market event sessions.
10. Add theft/guard/snitch mechanics.

## Verification Checklist

Run after logic changes:

- `pnpm build`
- `pnpm audit:data`

Manual smoke:

- Start new game.
- Select a customer.
- Put NPC goods into their offer and use `Ask Price`.
- Put player goods into your offer and use `Ask Offer`.
- Reject a bad offer and confirm `offersMade` changes later appraisal.
- Complete an accepted trade and confirm quantities transfer correctly.
- Protect an item and confirm it cannot be added to offer.
- Conceal/reveal an item and confirm it stays out of auto-offer matching while concealed.
- Save, reload, and confirm barter still works.
