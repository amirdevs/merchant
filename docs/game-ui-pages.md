# Game UI Pages And Screen Plan

This document lists the screens needed for the merchant remake UI. The goal is to recreate the same kind of flow and usability as the original merchant game: menu first, city/town hub, customer trading, inventory/haggling, map travel, and save/load.

Use this as the source list when creating UI mockups or image-generation prompts.

## Global UI Direction

- Medieval fantasy merchant interface.
- Paper, wood, brass, leather, parchment, ink, wax seal, and old map materials.
- Clear readable UI, not decorative at the cost of usability.
- Dense information layout, because the game is about comparing items, value, travel, and NPC preferences.
- Main game should feel like a trading desk rather than a modern dashboard.
- Use framed panels, parchment windows, inventory grids, readable labels, and clear buttons.
- Preserve strong separation between player inventory, NPC inventory, current offer, dialogue, and travel/map state.

## Screen List

### 1. Main Menu

Purpose: first screen when the game opens.

Needed UI:
- Game title.
- New game button.
- Continue button, if a save exists.
- Load game button.
- Settings button.
- Exit button.
- Background art: merchant table, candlelit shop, parchment, coins, map, or city silhouette.

Image generation need:
- Full-screen main menu background and frame design.
- Empty button areas are fine; final text can be rendered in React.

### 2. New Game / Character Creation

Purpose: create a new merchant profile.

Needed UI:
- Merchant name input.
- Starting region or hometown selector.
- Starting difficulty/economy preset.
- Starting inventory preview.
- Starting coin amount.
- Confirm and back buttons.

Image generation need:
- Character creation parchment panel.
- Merchant ledger/book styling.
- Optional small portrait placeholder area.

### 3. Save / Load Browser

Purpose: show existing saves and allow loading/deleting/overwriting.

Needed UI:
- Save slots list.
- Save name.
- Location/city.
- Play time or in-game day.
- Coin amount.
- Last saved timestamp.
- Load button.
- Delete button.
- Back button.
- Empty state for no saves.

Image generation need:
- Save ledger UI with multiple rows/cards.
- Parchment list with wax seal/buttons.

### 4. Settings / Options

Purpose: configure game behavior.

Needed UI:
- Audio sliders: music, ambience, voices, UI sounds.
- Text speed slider.
- UI scale.
- Fullscreen/windowed.
- Accessibility toggles.
- Reset settings.
- Back/apply buttons.

Image generation need:
- Compact options panel in the same medieval UI language.

### 5. City / Town Hub

Purpose: main place screen after entering a city.

Needed UI:
- City/town background image.
- Current city name.
- Current day/time or travel day.
- Player coin/carry capacity summary.
- Available merchants/customers list.
- Buttons for market/trading, map/travel, inventory, save/menu.
- Optional city services: inn, bank, notice board, guild/company, rumors.

Image generation need:
- Full town hub layout.
- Large town scene area with UI frame overlays.
- Sidebar/list for available NPCs.

### 6. Customer / NPC Selection

Purpose: pick who to trade or talk with in the city.

Needed UI:
- NPC portrait.
- NPC name.
- Profession.
- Short description.
- Wealth/trading style hint.
- Likes/dislikes preview.
- Inventory category preview.
- Talk/trade button.
- Next customer button.

Image generation need:
- Merchant/customer roster UI.
- Portrait list with profession badges.

### 7. Trading / Haggling Main Screen

Purpose: main trading interaction.

Needed UI:
- NPC portrait and name.
- Dialogue/chat box.
- Scrollable dialogue history.
- NPC inventory panel.
- Player inventory panel.
- Current offer area: player gives / NPC gives.
- Value comparison indicator.
- NPC mood/interest/trust meter.
- Likes/dislikes/preferences panel.
- Haggling buttons: ask offer, propose trade, improve offer, accept, clear offer.
- Next customer button beside Goodbye.
- Goodbye button.
- Help/tip button.

Image generation need:
- Primary trading screen mockup.
- Three-zone layout: NPC inventory, conversation/offer, player inventory.
- Inventory grids with item-size variation.
- Clear haggling/status panel.

### 8. Inventory Management Screen

Purpose: inspect, sort, protect, conceal, and manage items outside active trade.

Needed UI:
- Grid inventory with variable item sizes.
- Item icon.
- Quantity/stack indicator.
- Value.
- Weight/size.
- Category filters.
- Search.
- Sort controls.
- Protected/starred marker.
- Concealed marker.
- Item details side panel.
- Bulk actions.

Image generation need:
- Inventory grid UI mockup.
- Item detail panel.
- Category/filter toolbar.

### 9. Item Detail Popover / Modal

Purpose: show exact item mechanics.

Needed UI:
- Large item icon.
- Name.
- Category/tags.
- Base value.
- Weight/size.
- Quantity.
- Rarity.
- Known demand/supply notes.
- NPC preference hints if known.
- Buttons: star/protect, conceal, add to offer, close.

Image generation need:
- Small parchment item-inspection popup.

### 10. Map / Travel Screen

Purpose: view cities and routes, then travel.

Needed UI:
- World map.
- City nodes.
- Route lines.
- Selected route panel.
- Travel cost.
- Travel days.
- Risk/tolls.
- Carry capacity warning.
- Known price/demand hints per city.
- Travel button.
- Back to city button.

Image generation need:
- Full map UI with parchment map style.
- Route selection panel.
- City node markers.

### 11. City Detail / Market Info Screen

Purpose: inspect a city before or after travel.

Needed UI:
- City name and banner.
- Region/kingdom/faction.
- Available professions.
- Local demand/supply categories.
- Common goods.
- Expensive/imported goods.
- Travel routes from this city.
- Known NPCs.

Image generation need:
- City information panel over map/town art.

### 12. Route / Travel Confirmation Modal

Purpose: confirm travel before spending money/time.

Needed UI:
- From city and destination.
- Cost breakdown.
- Days required.
- Risk/route notes.
- Inventory/capacity warnings.
- Confirm travel.
- Cancel.

Image generation need:
- Small parchment confirmation modal.

### 13. Travel Result / Arrival Screen

Purpose: show what happened during travel and arrival.

Needed UI:
- Travel summary.
- Money spent.
- Days passed.
- Random event summary if any.
- Arrival city name.
- Continue button.

Image generation need:
- Arrival parchment overlay with road/map background.

### 14. Dialogue / Story Event Screen

Purpose: non-trade conversations, rumors, quests, events.

Needed UI:
- Character portrait.
- Large scrollable dialogue box.
- Response choices.
- Reward/cost preview where relevant.
- Continue/back buttons.

Image generation need:
- Dialogue-heavy layout with portrait and scrollable text panel.

### 15. Quest / Notice Board Screen

Purpose: optional jobs, delivery tasks, company contracts, rumors.

Needed UI:
- Posted notices list.
- Job title.
- Destination.
- Required item or trade objective.
- Reward.
- Time limit.
- Accept/decline.

Image generation need:
- Wooden notice board or parchment contract list.

### 16. Company / Faction Screen

Purpose: track relationships with kingdoms, companies, or factions.

Needed UI:
- Faction list.
- Reputation values.
- Flags/seals.
- Active contracts.
- Benefits/penalties.
- Known faction preferences.

Image generation need:
- Heraldry/reputation ledger UI.

### 17. Help / Controls Modal

Purpose: explain all keyboard and mouse actions.

Needed UI:
- All shortcuts.
- Mouse actions:
  - left click
  - right click
  - drag
  - shift/alt modifiers
- Inventory actions:
  - move one
  - move all
  - move half
  - protect/star item
  - conceal item
- Trading actions.
- Map actions.
- Close button.

Image generation need:
- Readable help parchment modal.
- No tiny decorative text in generated image; final text should be rendered in UI.

### 18. Pause / In-Game Menu

Purpose: menu while already playing.

Needed UI:
- Resume.
- Save game.
- Load game.
- Settings.
- Main menu.
- Quit.

Image generation need:
- Compact pause/menu overlay.

### 19. Confirmation / Warning Modals

Purpose: reusable modals for risky actions.

Needed UI:
- Save overwrite warning.
- Delete save warning.
- Quit without saving warning.
- Trade confirmation if offer is unusual.
- Travel with high cost warning.

Image generation need:
- Generic parchment modal style with confirm/cancel buttons.

### 20. Toast / Small Notification UI

Purpose: small feedback messages.

Needed UI:
- Item moved.
- Trade accepted/rejected.
- Save complete.
- Not enough money.
- Item protected.
- Route too expensive.

Image generation need:
- Small medieval notification badge/toast style.

## Recommended Image Generation Order

1. Main Menu
2. City / Town Hub
3. Trading / Haggling Main Screen
4. Inventory Management Screen
5. Map / Travel Screen
6. Save / Load Browser
7. Item Detail Popover
8. Help / Controls Modal
9. Settings / Options
10. Reusable Modals / Toasts

## Prompt Template For UI Mockups

Use this base prompt when generating UI reference images:

```text
Create a medieval fantasy merchant game UI mockup for this screen: [SCREEN NAME].

Style: rich but readable parchment, dark carved wood, brass trim, leather panels, inked borders, wax-seal accents, old map details, candlelit merchant atmosphere. The UI should feel like a serious trading game, not a modern dashboard.

Layout requirements:
[PASTE SCREEN-SPECIFIC UI ELEMENTS]

Important:
- Make it a clean full-screen game UI mockup.
- Keep text areas mostly blank or use unreadable placeholder marks only.
- Do not add real readable text; final text will be rendered in React.
- Leave clear spaces for buttons, labels, item icons, portraits, inventory grids, and panels.
- Use consistent panel style across the whole screen.
- Prioritize usability and readable hierarchy.
- No modern flat UI, no sci-fi elements, no mobile-game cartoon style.
```

## Notes For Implementation

- Text should be rendered by the app, not baked into generated UI images.
- UI art should be split into reusable pieces where possible: panel backgrounds, button frames, parchment boxes, modal frames, inventory slots, map markers, and dividers.
- Full-screen mockups are useful for direction, but final implementation should use reusable UI components.
- Inventory and trade screens need the most precision because they are used constantly.
