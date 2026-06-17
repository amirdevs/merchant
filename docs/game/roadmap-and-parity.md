# Gameplay Roadmap And Original Feature Parity

This document merges the remake roadmap, gameplay UX concerns, and original-game parity backlog. Use it as the canonical gameplay planning file.

The remake is currently a playable vertical slice, not a full clone. It has extracted content data and a basic trade/travel loop, but many original systems are still missing.

## Current Scope

Implemented or partially implemented:

- Town/customer selection.
- Original characters/items/markets data.
- Original town, backdrop, portrait, stall, route, map, audio, and font assets.
- Generated NPC inventories.
- Player inventory.
- Offer panels.
- Basic barter valuation using NPC preferences, profession bias, and market bias.
- Trade accept/refuse flow.
- Travel between connected markets with day advancement.
- Local save/load/import/export.
- Offline mod packs from `public/data/mods`.
- Market quest/event notes as read-only text.
- Routed original UI, item, travel, and ambient sounds.

Steam and online systems are not included.

Current UI target:

- Match the reference mockups in `docs/ui_parts/`: bright painterly fantasy merchant screens, sunlit coastal market art, parchment ledgers, carved dark wood frames, blue enamel headers, brass trim, heraldic seals, gold status chips, polished NPC portraits, collectible item icons, and beveled command buttons.
- Keep the interface compact and fast for repeated trading, inventory, route, and offer comparison.

## Extracted Data Snapshot

- 203 characters, 199 active characters, 53 merchant characters.
- 1,972 items.
- 20 marketplaces.
- 10 initially unlocked marketplaces and 10 locked marketplaces.
- 17 marketplaces with quest data.
- 14 marketplaces with event data.
- 20 marketplaces with theft data.
- 7 kingdoms, 5 with illegal item tags.
- 25 professions.
- 21 myth-tagged items, including 20 card items.
- 5 map items.
- 9 deed items.
- 8 packhorse items.

## User Gameplay Concerns

- Bartering is unclear.
- Travel expenses feel too high.
- The game becomes tiring.
- Inventory management needs improvement.
- Haggling/trading mechanics need clearer feedback.
- Players should know what each NPC likes and dislikes.
- Some NPCs have poor inventories and need better design.

## Missing Original Systems

### App Shell, Saves, Settings, And Hard Mode

Missing or incomplete:

- Real title screen/main menu.
- Save/load browser with multiple save slots.
- Pause/system menu.
- Bottom-right hover/menu affordance.
- Settings screen.
- Hard Mode/second-save behavior if implemented.

Required behavior:

- Main Menu: Continue, New Game, Load Game, Settings, Exit.
- Save Browser: save name, merchant, market, day, wealth, timestamp, difficulty/mode, load/delete/overwrite/export/import.
- Settings: audio channels, text speed, UI scale, fullscreen/windowed, accessibility, theft toggle, item highlight behavior.
- Save state must include schema version, save metadata, quests, unlocks, events, settings, and mode flags.

### Character Creation

Missing:

- Merchant name.
- Starting market/hometown selection.
- Starting inventory/coin preview.
- Difficulty/economy preset once economy is stable.

### Dialogue Graph Engine

Missing:

- Original-style dialogue graph runtime.
- Response choices.
- Dialogue callbacks.
- Conditional response visibility.
- Persistent dialogue/quest state.

Required behavior:

- Load dialogue graphs as structured data.
- Track current dialogue node per conversation.
- Render NPC speech, tone, response choices, Goodbye/Barter exits.
- Execute callback ids through a typed whitelist registry only.
- Support callback effects: give/take item, set quest flag, unlock market, start minigame, reward, change relationship.

### Quests, Journal, And Notice Board

Current behavior only displays read-only market notes.

Missing:

- Quest state machine: unseen, offered, accepted, rejected, active, readyToTurnIn, finished, failed.
- Objectives: bring item, deliver item, unlock route/market, negotiate story deal, pay/receive currency, trigger event scene, complete minigame result.
- Rewards: items, coins, discounts/free goods, market unlocks, reputation/progression flags.
- Journal/ledger with active/completed quests.
- Item notes and item highlights.
- Notice board jobs/contracts/rumors.

### Market Events

Missing:

- Event calendar/scheduling.
- Event availability in town.
- Event sessions.
- Recurring and one-time events.
- Event rewards/costs and persistent consequences.

Important event types:

- Auctions/drafts.
- Horse races.
- Myth tournaments.
- Story scenes.
- Market demand/supply shifts.

### Auctions And Drafts

Missing:

- Auction lots.
- Bidding.
- Competing bidders.
- Reserve prices.
- Winning/losing outcomes.
- Item transfer and payment.
- Draft pick ownership/order/selection.

### Horse Races

Missing:

- Race list.
- Odds.
- Advice purchase if supported by event data.
- Bet amount.
- Race result.
- Winnings/losses.

### Myth Card Game

Missing:

- Card/deck inventory support.
- Playable Myth rules.
- Casual NPC games.
- Wagered games if supported.
- Tournament entry fee, deck selection, bracket/progression, prize payout.
- Post-match result screen.

Implementation note: build rules as a pure module before UI.

### Economy, Investment, Company, And Speculation

Partial:

- Base value and bias valuation exist.

Missing:

- Real currency conversion.
- City supply/demand changes over time.
- Price speculation opportunities.
- NPC wealth/budget.
- Company jobs.
- Warehouse construction.
- Shipment collection.
- Profit split and stock ownership.

### Travel Costs, Capacity, And Risk

Partial:

- Travel day advancement exists.

Missing:

- Toll charging.
- Stallage/market fees.
- Carry capacity and weight pressure.
- Packhorse carry/pull mechanics.
- Travel confirmation.
- Route risk.
- Arrival result summary.

### Locked Markets, Maps, And Unlocks

Missing:

- Runtime unlocked market/route state.
- Locked destination UX.
- Map item unlock behavior.
- Quest/story unlock callbacks.

Do not mutate generated marketplace data at runtime; store unlocks in `GameState`.

### Theft, Guards, And Illegal Items

Data exists but gameplay is missing.

Required behavior:

- Mark illegal items based on current kingdom.
- Add concealment separate from protect/star.
- Resolve theft/guard/inspection risk.
- Apply market theft constraints: percent, max loaf value, max quantity, max size.
- Add consequences for carrying illegal goods.

### Inventory Detail And Special Item Behavior

Partial:

- Search/sort/grid/protect exist.

Missing:

- Item detail modal.
- Concealment.
- Illegal/quest/highlight markers.
- Text/image item readers.
- Pull/carry item behavior.
- Myth card details.
- Map/deed special behavior.
- Exact weight/size/capacity display.
- Ask for Price / Ask for Offer trade actions.

### NPC Behavior

Partial:

- Preferences affect valuation.

Missing:

- Mood/trust changes.
- Tone/audio reactions by offer quality.
- Wealth/budget.
- Merchant/non-merchant differences.
- Plunderer/traveler behavior.
- Better inventory refresh by profession/location/wealth.

### Factions, Kingdom Rules, And Reputation

Missing:

- Kingdom/faction UI.
- Reputation/status.
- Illegal item law UX.
- Contracts/company jobs tied to factions.
- Election/vote outcomes where story requires them.

### Story Outcomes, Library, Books, Banks, Loans

Missing:

- Quest outcome summaries.
- Election/vote result surfaces.
- Confiscated item lists.
- Exile/sneak-back/resistance choices.
- Bank/loan story behavior.
- Library/recommendations UI.
- Book reader/detail UI if text content is extractable.

### Audio Completeness

Partial:

- Basic UI/item/ambient/travel routing exists.

Missing:

- Dialogue voice snippets by tone/personality.
- Offer quality reactions.
- Quest/event crowd sounds.
- Myth/auction-specific sounds.
- Separate volume controls.

## Version Roadmap

### `v0.2.0` - App Foundation And Layout Parity

- Restructure game state, inventory, trading, travel, data loading, and UI shell.
- Make the main layout closer to original: left NPC inventory, center dialogue/window, right player inventory.
- Add reusable UI primitives.
- Add keyboard/mouse help modal safely.
- Acceptance: player can select NPCs, inspect both inventories, and no click-blocking overlays exist.

### `v0.3.0` - Inventory And Trading System

- Improve item movement: left click one, right click all/clear, shift half, alt ten.
- Keep star/protect behavior.
- Add conceal separate from protect.
- Add sorting, filtering, search, and clear item value display.
- Add item detail modal.
- Improve offer feedback with missing value and NPC preference hints.

### `v0.4.0` - Market, Travel, And Economy Loop

- Implement full market map using extracted route data.
- Add travel days, tolls, capacity, stallage, route profitability.
- Improve market demand/supply valuation.
- Add route ledger and travel confirmation/result.

### `v0.5.0` - Dialogue And NPC Behavior

- Build dialogue engine from extracted dialogue data where available.
- Add NPC likes/dislikes panel directly in trade screen.
- Make Next Customer a real game action.
- Improve weak NPC inventories by profession and location.

### `v0.6.0` - Save System And Modding

- Add explicit save schema versioning.
- Store saves in local JSON or browser-local storage while the app remains web-only.
- Keep data/mod support for items, NPCs, markets, and balance overrides.
- Add import/export for saves and data.

### `v0.7.0` - Audio, Animation, And Visual Polish

- Add original audio routing for voices and reactions.
- Add dialogue typing, speech bubble sizing, and scroll behavior.
- Polish screens toward the `docs/ui_parts/` visual direction with backgrounds, portraits, item art, parchment panels, carved frames, enamel headers, and command-button states.

### `v0.8.0` - Quest And Special Systems

- Rebuild tutorial, quests, market events, auctions/drafts, company jobs, and Myth/deck systems.
- Keep everything offline/local.

### `v0.9.0` - Full Content Pass And QA

- Verify all extracted characters, items, markets, routes, and professions.
- Fix broken asset references.
- Balance inventories, travel expenses, haggling thresholds, and friction.
- Add regression tests.

### `v1.0.0` - Offline Complete Remake

- Package standalone desktop app only if a desktop shell is reintroduced later.
- Include full offline content, saves, mod support, and stable gameplay loop.
- Acceptance: user can play extended trade progression without the original executable.

## Recommended Implementation Order

1. Split `GameState` into explicit sub-state: player, inventory, trade, travel, quests, events, unlocks, settings.
2. Add money/capacity helpers and tests.
3. Implement travel costs, locked markets, and map unlock state.
4. Implement item detail, legality, concealment, and quest item markers.
5. Implement dialogue graph runtime with typed callback registry.
6. Implement quest runtime and journal.
7. Implement event sessions.
8. Implement auctions/drafts.
9. Implement horse races.
10. Implement Myth game and tournaments.
11. Implement long-term progression and King of Coin access.
12. Add save browser/settings/pause polish once state is stable.

## Testing

- Build test: `pnpm build`.
- Data/script test: `pnpm audit:data`.
- Manual smoke:
  - start new game
  - select NPC
  - move items both ways
  - complete/reject trade
  - travel to another market
  - save/load
- Regression scenarios:
  - NPC with `obtainableItems` shows inventory.
  - Protected item cannot move into offer.
  - Concealed and illegal markers behave correctly.
  - Help modal opens without blocking clicks.
  - Next Customer selects a different valid NPC.
  - Long dialogue stays inside visible box.
  - Quest callbacks persist through save/load.

## Assumptions

- Continue the React/Vite remake, not old asar patching.
- New saves only; no original save migration unless explicitly requested.
- Offline-only remains mandatory.
- Use pnpm, Tailwind 4, React, Vite, and local extracted assets/data.

