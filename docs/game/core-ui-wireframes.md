# Core UI Wireframe Brief

Use this document as the focused UI/UX prompt source for the first playable app screens. It intentionally covers only the current core pages:

1. Title / Main Menu
2. New Game / Merchant Profile
3. Save / Load Browser
4. Settings / Options
5. System / Pause Menu
6. Travel Map / Market Planner
7. Market / Town Hub
8. Customer / NPC Selection
9. Barter / Conversation Main Screen
10. Inventory Management
11. Inventory Search / Filter Popover
12. Item Detail Modal

Design the actual game UI using the current mockup images in `docs/ui_parts/` as the visual baseline. The product is an offline fantasy merchant trading game.

## Global Wireframe Rules

- Style direction: bright painterly fantasy trade UI with sunlit coastal town art, parchment ledgers, carved dark wood shells, blue enamel title plates, brass trim, heraldic seals, gold status chips, polished NPC portraits, collectible item art, and beveled green/blue/red command buttons.
- UX direction: compact, practical, repeated-use trading interface with enough ornament to feel like a polished PC merchant RPG.
- Text should be rendered by the app. In mockups, use blank areas or unreadable placeholder marks only.
- Every screen needs clear hover, selected, disabled, empty, and error states.
- Keep ornamentation in frames, badges, headers, and dividers; do not let decoration slow inventory, route, dialogue, or offer comparison.
- Avoid plain productivity-dashboard styling, sci-fi UI, oversized marketing composition, and readable fake text baked into images.
- Primary persistent status should include current merchant/save, city/market, day, money/wealth, and carry capacity where relevant.
- Current reference images:
  - `docs/ui_parts/01-title-main-menu.png`
  - `docs/ui_parts/02-new-game-merchant-profile.png`
  - `docs/ui_parts/03-save-load-browser.png`
  - `docs/ui_parts/04-settings-options.png`
  - `docs/ui_parts/05-system-pause-menu.png`
  - `docs/ui_parts/06-travel-map-market-planner.png`
  - `docs/ui_parts/07-market-town-hub.png`
  - `docs/ui_parts/08-customer-npc-selection.png`
  - `docs/ui_parts/09-barter-conversation-main-screen.png`
  - `docs/ui_parts/10-inventory-management.png`
  - `docs/ui_parts/11-inventory-search-filter-popover.png`
  - `docs/ui_parts/12-item-detail-modal.png`

## Shared Layout Components

### App Frame

Wireframe:

```text
+--------------------------------------------------------------------------------+
| Header: game/location title | day | money | capacity | system/menu button       |
+--------------------------------------------------------------------------------+
| Main page content varies by screen                                              |
|                                                                                |
|                                                                                |
+--------------------------------------------------------------------------------+
| Optional footer/status/toasts                                                   |
+--------------------------------------------------------------------------------+
```

Required states:

- Normal.
- Loading save/data.
- Modal open with background dimmed.
- Toast visible.
- Narrow viewport stacked layout.

### Command Buttons

Required variants:

- Primary action.
- Secondary action.
- Dangerous action.
- Disabled.
- Icon-only utility.
- Text + icon command.

### Modal Shell

Wireframe:

```text
               +-------------------------------------------+
               | Modal title                         [ X ] |
               +-------------------------------------------+
               | Body content / warning / form             |
               |                                           |
               +-------------------------------------------+
               |                       [Cancel] [Confirm]  |
               +-------------------------------------------+
```

## 1. Title / Main Menu

Purpose: first screen on app launch.

Access path: app start, return from pause menu.

Wireframe:

```text
+--------------------------------------------------------------------------------+
|                                                                                |
|                         Background: merchant table / map                        |
|                                                                                |
|        GAME TITLE                                                               |
|        Small subtitle or version                                                |
|                                                                                |
|        +----------------------+                                                |
|        | Continue             |  disabled/hidden if no save                     |
|        | New Game             |                                                |
|        | Load Game            |                                                |
|        | Settings             |                                                |
|        | Exit                 |                                                |
|        +----------------------+                                                |
|                                                                                |
+--------------------------------------------------------------------------------+
```

Required UI:

- Game title.
- Continue.
- New Game.
- Load Game.
- Settings.
- Exit.
- Save-present and no-save states.
- Small version/build label.

UX notes:

- Make New Game and Continue clearly distinct.
- Continue should be the primary action only when a valid save exists.
- Do not put hero text in a card; menu controls can be framed.

AI mockup prompt:

```text
Create a full-screen fantasy merchant game main menu mockup matching `docs/ui_parts/01-title-main-menu.png`: bright coastal harbor/city artwork, ornate title treatment, carved dark wood side framing, blue enamel and parchment command buttons, gold trim, Continue/New Game/Load Game/Settings/Exit command stack, and a small version label area. Leave all text areas blank or placeholder-only for React-rendered text.
```

## 2. New Game / Merchant Profile

Purpose: create a new local merchant save.

Access path: Main Menu -> New Game.

Wireframe:

```text
+--------------------------------------------------------------------------------+
| New Merchant Profile                                                   [Back]  |
+--------------------------------------------------------------------------------+
| +----------------------------------+ +---------------------------------------+ |
| | Merchant Registration             | | Starting Preview                      | |
| | Name input                        | | Starting city art / small map         | |
| | Hometown selector                 | | Starting inventory list/grid          | |
| | Difficulty / economy preset       | | Starting coins                        | |
| | Hard Mode toggle/locked state     | | Carry capacity                        | |
| +----------------------------------+ +---------------------------------------+ |
|                                                                                |
|                                               [Cancel] [Begin Journey]         |
+--------------------------------------------------------------------------------+
```

Required UI:

- Merchant name input.
- Starting city/hometown selector.
- Difficulty/economy preset.
- Hard Mode row if supported.
- Starting inventory preview.
- Starting coins.
- Starting capacity.
- Begin Journey.
- Cancel/Back.
- Validation state for missing/invalid name.

UX notes:

- Treat this as a ledger/registration form.
- Starting inventory should be visible before confirm.
- Keep controls compact; no RPG character sheet unless later gameplay requires it.

AI mockup prompt:

```text
Create a medieval parchment ledger wireframe for creating a merchant profile. Include a left registration form for name, hometown, difficulty/economy preset, and Hard Mode. Include a right preview panel for starting city, starting inventory, coins, and carry capacity. Add Cancel and Begin Journey actions. Use readable trade-ledger hierarchy, not decorative fantasy character creation.
```

## 3. Save / Load Browser

Purpose: manage local saves.

Access path: Main Menu -> Load Game, Pause Menu -> Load/Save.

Wireframe:

```text
+--------------------------------------------------------------------------------+
| Save Ledger                                                            [Back]  |
+--------------------------------------------------------------------------------+
| Toolbar: [Load tab] [Save tab] [Import] [Export selected] [Sort] [Search]      |
|                                                                                |
| +------------------------------------------------------------------------------+
| | Save Name        Merchant    City       Day   Wealth    Mode      Saved At   |
| |------------------------------------------------------------------------------|
| | Row selected:    ...         ...        ...   ...       Normal    ...        |
| | Row              ...         ...        ...   ...       Hard      ...        |
| | Empty state if no saves                                                       |
| +------------------------------------------------------------------------------+
|                                                                                |
| Selected save detail panel:                                                     |
| Location art/thumb | inventory/quest summary | [Load] [Overwrite] [Delete]     |
+--------------------------------------------------------------------------------+
```

Required UI:

- Save list/table.
- Save name.
- Merchant name.
- City/market.
- In-game day.
- Wealth.
- Mode/difficulty.
- Last saved timestamp.
- Selected save detail.
- Load.
- Overwrite.
- Delete.
- Import.
- Export.
- Empty state.
- Delete/overwrite confirmation modal.

UX notes:

- Use dense ledger rows, not huge cards.
- Dangerous actions should be visually separated.
- The selected save detail should help prevent loading the wrong file.

AI mockup prompt:

```text
Create a medieval save/load ledger UI wireframe. Use a parchment table with rows for save name, merchant, city, day, wealth, mode, and saved date. Include toolbar actions for import/export/search/sort and a selected-save detail panel with Load, Overwrite, and Delete. Make it compact and practical for repeated use.
```

## 4. Settings / Options

Purpose: configure audio, display, accessibility, and gameplay toggles.

Access path: Main Menu, Pause Menu.

Wireframe:

```text
+--------------------------------------------------------------------------------+
| Settings                                                               [Back]  |
+--------------------------------------------------------------------------------+
| +----------------------+ +----------------------+ +--------------------------+ |
| | Audio                | | Display              | | Gameplay / Accessibility  | |
| | Music slider         | | UI scale slider      | | Text speed slider         | |
| | Ambience slider      | | Fullscreen toggle    | | Theft toggle              | |
| | Voices slider        | | Resolution/window    | | Highlight items toggle    | |
| | UI sounds slider     | | Contrast/readability | | Accessibility toggles     | |
| | Item sounds slider   | |                      | |                          | |
| +----------------------+ +----------------------+ +--------------------------+ |
|                                                                                |
|                                      [Reset Defaults] [Cancel] [Apply]         |
+--------------------------------------------------------------------------------+
```

Required UI:

- Music volume.
- Ambience volume.
- Voices volume.
- UI sounds volume.
- Item sounds volume.
- Text speed.
- UI scale.
- Fullscreen/windowed.
- Theft enabled/disabled.
- Highlight item behavior.
- Accessibility toggles.
- Reset defaults.
- Apply/Cancel/Back.

UX notes:

- Group by section.
- Sliders and toggles should be visually different.
- Show unsaved changes state.

AI mockup prompt:

```text
Create a compact medieval options screen wireframe with three parchment columns: Audio, Display, and Gameplay/Accessibility. Include sliders, toggles, reset defaults, cancel, and apply controls. Keep hierarchy clear and usable; no decorative clutter.
```

## 5. System / Pause Menu

Purpose: quick in-game command layer.

Access path: corner menu button, keyboard shortcut.

Wireframe:

```text
Gameplay screen dimmed

                              +----------------------------+
                              | Paused / Menu          [X] |
                              +----------------------------+
                              | Current city, day, save    |
                              | Resume                     |
                              | Save Game                  |
                              | Load Game                  |
                              | Settings                   |
                              | Main Menu                  |
                              | Quit                       |
                              +----------------------------+
```

Required UI:

- Resume.
- Save Game.
- Load Game.
- Settings.
- Main Menu.
- Quit.
- Close.
- Current location/day/save status.
- Unsaved changes warning if leaving.

UX notes:

- Should overlay without losing current page context.
- Original-like affordance can be a bottom-right hover/menu button, but make it discoverable.

AI mockup prompt:

```text
Create a medieval in-game pause/system menu overlay wireframe. Background gameplay is dimmed. Include current city/day/save status and vertical actions: Resume, Save Game, Load Game, Settings, Main Menu, Quit. Compact parchment modal with brass frame.
```

## 6. Travel Map / Market Planner

Purpose: inspect markets and choose travel routes.

Access path: after title/new save, from Market Hub, after travel result.

Wireframe:

```text
+--------------------------------------------------------------------------------+
| Realm Map                         Day | Money | Capacity | Journal | Menu      |
+--------------------------------------------------------------------------------+
| +------------------------------------------------------+ +-------------------+ |
| |                                                      | | Selected Market   | |
| |                 Illustrated world map                | | Name / kingdom    | |
| |                                                      | | Legal warnings    | |
| |   city nodes, route lines, locked markers            | | Demand/discounts  | |
| |   current location marker                            | | Quests/events     | |
| |                                                      | | Travel days/cost  | |
| +------------------------------------------------------+ | Risk/capacity     | |
|                                                          | [Travel] [Enter]   | |
| Route list / route ledger                               | [Skip Day]         | |
+--------------------------------------------------------------------------------+
```

Required UI:

- Large world map.
- Market nodes.
- Route lines.
- Current location marker.
- Locked destination marker.
- Selected market panel.
- Kingdom/faction identity.
- Illegal item warning for destination.
- Demand/supply hints.
- Quest/event availability.
- Travel days.
- Toll/cost.
- Stallage/fees if relevant.
- Capacity warning.
- Travel.
- Enter Market.
- Journal.
- Menu.
- Skip Day if implemented.

UX notes:

- Map is the primary visual.
- Side panel is for decision-making.
- Locked nodes should explain why they are locked.

AI mockup prompt:

```text
Create a medieval world map planner wireframe for a merchant trading game. Large parchment map with city nodes, route lines, current-location marker, and locked destination markers. Add a right-side selected-market panel showing kingdom, legal warnings, demand/discounts, quests/events, travel days, cost, risk, capacity warning, and Travel/Enter buttons. Dense but readable.
```

## 7. Market / Town Hub

Purpose: central city screen after entering a market.

Access path: Travel Map -> Enter Market, Travel Result -> Continue.

Wireframe:

```text
+--------------------------------------------------------------------------------+
| City Name                         Day | Money | Capacity | Map | Journal | Menu|
+--------------------------------------------------------------------------------+
| +------------------------------------------------------+ +-------------------+ |
| | Town background / market scene                       | | Market Status     | |
| |                                                      | | Demand/discounts  | |
| | Action markers or service buttons over/near scene    | | Law warnings      | |
| |                                                      | | Active event      | |
| +------------------------------------------------------+ | Quest summary     | |
|                                                          +-------------------+ |
| +----------------------------+ +---------------------------------------------+ |
| | Customers / NPC roster     | | Local Services                              | |
| | portrait rows/cards        | | Trade, Notice Board, Inventory, Company...  | |
| +----------------------------+ +---------------------------------------------+ |
+--------------------------------------------------------------------------------+
```

Required UI:

- City/town background.
- City name.
- Day.
- Money/wealth.
- Capacity.
- Market demand/discount summary.
- Law/illegal goods warning.
- Active quest/event summary.
- Customer/NPC roster.
- Local services/actions.
- Buttons: Map, Inventory, Journal, Notice Board, Menu.

UX notes:

- Hub should be visually rich but still action-oriented.
- NPC roster must be accessible without hunting around the art.

AI mockup prompt:

```text
Create a fantasy market hub mockup matching `docs/ui_parts/07-market-town-hub.png`: a bright painterly coastal market scene, parchment status panels, gold coin/capacity chips, side market-status ledger, notable-customer roster, and large icon command buttons for trade, map, inventory, journal, notice board, and menu. Keep the scene rich while making all actions easy to find.
```

## 8. Customer / NPC Selection

Purpose: choose who to talk or trade with.

Access path: Market Hub customer roster, Barter screen Next Customer.

Wireframe:

```text
+--------------------------------------------------------------------------------+
| Customers in [City]                                                    [Back]  |
+--------------------------------------------------------------------------------+
| Filters: [Profession] [Quest] [Merchant] [Search]                              |
|                                                                                |
| +------------------+ +------------------+ +------------------+ +-------------+ |
| | Portrait          | | Portrait          | | Portrait          | | Detail      | |
| | Name              | | Name              | | Name              | | portrait    | |
| | Profession        | | Profession        | | Profession        | | name/prof   | |
| | likes/dislikes    | | likes/dislikes    | | likes/dislikes    | | wealth      | |
| | quest marker      | | stock preview     | | event marker      | | preferences |
| +------------------+ +------------------+ +------------------+ | [Talk]      | |
|                                                                 | [Trade]     | |
|                                                                 +-------------+ |
+--------------------------------------------------------------------------------+
```

Required UI:

- NPC portrait.
- Name.
- Profession.
- Affiliation/location.
- Trade style hint.
- Wealth/budget hint.
- Likes/dislikes preview.
- Inventory category preview.
- Quest/event marker.
- Search/filter.
- Talk.
- Trade.
- Next Customer.

UX notes:

- Can be a separate screen or embedded panel, but the wireframe should define full detail behavior.
- Selected NPC detail panel prevents cramped cards.

AI mockup prompt:

```text
Create a medieval customer selection wireframe for a market. Include searchable/filterable NPC roster with portraits, names, professions, preference hints, stock previews, and quest/event markers. Add a selected NPC detail panel with Talk, Trade, and Next Customer actions.
```

## 9. Barter / Conversation Main Screen

Purpose: core trade and dialogue loop.

Access path: select NPC -> Talk/Trade.

Wireframe:

```text
+--------------------------------------------------------------------------------+
| Trading with NPC                  Day | Money | Capacity | Help | Menu         |
+--------------------------------------------------------------------------------+
| +----------------------+ +------------------------------+ +------------------+ |
| | NPC Offer            | | NPC portrait / dialogue       | | Your Offer       | |
| | item grid/list        | | name, profession, mood        | | item grid/list   | |
| +----------------------+ | dialogue text                  | +------------------+ |
| | NPC Stock            | | response buttons               | | Your Inventory   | |
| | search/sort optional  | |                              | | search/sort       | |
| | item grid             | | Offer comparison:             | | item grid         | |
| |                       | | Your value / Their value      | |                  | |
| |                       | | fairness / missing value      | |                  | |
| +----------------------+ | Preferences panel              | +------------------+ |
|                          | [Ask Price] [Ask Offer]        |                    |
|                          | [Make Offer] [Clear]           |                    |
|                          | [Next Customer] [Goodbye]      |                    |
|                          +------------------------------+                    |
+--------------------------------------------------------------------------------+
```

Required UI:

- NPC portrait.
- NPC name/profession.
- Mood/trust/interest indicator.
- Dialogue box.
- Response choices.
- NPC offer.
- NPC stock.
- Player offer.
- Player inventory.
- Offer values.
- Fairness/missing value indicator.
- Preferences/likes/dislikes.
- Ask for Price.
- Ask for Offer.
- Make Offer / Propose Trade.
- Accept if applicable.
- Clear Offer.
- Next Customer.
- Goodbye.
- Help.

UX notes:

- This is the most important screen. Prioritize function over decoration.
- Player and NPC inventories must not visually blend.
- Offer panels should be close to value comparison.
- Response buttons must support variable quest/dialogue states.

AI mockup prompt:

```text
Create the main barter/conversation mockup matching `docs/ui_parts/09-barter-conversation-main-screen.png`: a three-column trade screen with dark carved wood frame, parchment offer ledgers, dark inventory slot grids, polished NPC portrait, mood/trust/interest indicators, dialogue and response buttons, offer comparison meter, and clear command buttons for Ask Price, Ask Offer, Make Offer, Clear, Next Customer, Goodbye, Help, and Menu. Compact, readable, optimized for repeated trading.
```

## 10. Inventory Management

Purpose: manage player goods outside active trade.

Access path: Market Hub -> Inventory, header shortcut.

Wireframe:

```text
+--------------------------------------------------------------------------------+
| Your Inventory                  Money | Capacity used/limit | Search | Menu     |
+--------------------------------------------------------------------------------+
| Toolbar: [Search] [Category] [Sort] [Show illegal] [Show quest] [Bulk actions] |
|                                                                                |
| +-----------------------------------------------------+ +--------------------+ |
| | Inventory grid                                      | | Selected Item      | |
| | variable-size item tiles                            | | icon               | |
| | quantity badges                                     | | name/value         | |
| | star/protect markers                                | | tags               | |
| | conceal markers                                     | | weight/size        | |
| | illegal/quest/highlight markers                     | | legality           | |
| |                                                     | | notes/highlight    | |
| +-----------------------------------------------------+ | actions            | |
|                                                         +--------------------+ |
+--------------------------------------------------------------------------------+
```

Required UI:

- Inventory grid.
- Variable item sizes.
- Item icons.
- Quantity badges.
- Value.
- Weight/size.
- Total capacity.
- Search.
- Sort.
- Category filters.
- Protected/starred marker.
- Concealed marker.
- Illegal marker.
- Quest item marker.
- Highlight marker.
- Selected item inspector.
- Bulk actions.

UX notes:

- Dense and fast. This is a utility screen.
- Selected item panel can replace opening a modal for every click.
- Keep filters sticky or easy to reopen.

AI mockup prompt:

```text
Create an inventory management mockup matching `docs/ui_parts/10-inventory-management.png`: parchment workspace, dark side navigation, blue selected tabs, compact item tile grid with collectible item icons, quantity badges, rarity stars, protection/concealment/illegal/quest/highlight markers, top search/category/sort toolbar, bottom capacity/value controls, and a strong right-side selected-item inspector with details and actions.
```

## 11. Inventory Search / Filter Popover

Purpose: quickly filter items by name, tag, status, or category.

Access path: Inventory toolbar or inventory panel search button.

Wireframe:

```text
Inventory screen dimmed slightly or popover anchored to Search

        +----------------------------------------------+
        | Search Inventory                       [ X ] |
        +----------------------------------------------+
        | [ text input autofocus                     ] |
        | Result count: ##                            |
        | Category chips/toggles                      |
        | [Food] [Weapons] [Books] [Magic] [...]      |
        | Status toggles                              |
        | [Protected] [Concealed] [Illegal] [Quest]   |
        | Sort: [Name v] [Value v] [Quantity v]       |
        |                         [Clear] [Apply]     |
        +----------------------------------------------+
```

Required UI:

- Auto-focused search input.
- Result count.
- Category filters.
- Status toggles:
  - protected
  - concealed
  - illegal
  - quest
  - highlighted
- Sort controls.
- Clear.
- Apply/Close.

UX notes:

- Should be compact and anchored, not a full page.
- Must not cover too much of the inventory grid.
- Pressing Escape should close.

AI mockup prompt:

```text
Create a compact parchment inventory search/filter popover wireframe anchored to an inventory toolbar. Include auto-focused text input, result count, category chips, protected/concealed/illegal/quest/highlight toggles, sort controls, Clear, Apply, and Close. It should not obscure too much of the inventory.
```

## 12. Item Detail Modal

Purpose: inspect exact item mechanics and take item-specific actions.

Access path: click inspect/right-click item from inventory or offer.

Wireframe:

```text
Inventory/trade background dimmed

              +------------------------------------------------+
              | Item Detail                               [X]  |
              +------------------------------------------------+
              | +------------+  Name                           |
              | | Large icon |  Quantity / Value               |
              | |            |  Tags / category chips          |
              | +------------+  Weight / Size                  |
              |                 Rarity / unique / quest flags  |
              |                 Legality in current kingdom    |
              |                 Market demand notes            |
              |                 Player note / highlight        |
              |                                                |
              | Actions: [Add to Offer] [Protect] [Conceal]    |
              |          [Read/Use if available] [Close]       |
              +------------------------------------------------+
```

Required UI:

- Large item icon.
- Name.
- Quantity.
- Base value.
- Tags/categories.
- Weight.
- Size.
- Rarity/unique flag.
- Quest flag.
- Legal/illegal status in current kingdom.
- Concealed/protected/highlighted status.
- Known demand/supply hints.
- Player note/highlight control.
- Add to Offer.
- Protect/unprotect.
- Conceal/reveal.
- Read/use if available.
- Close.

UX notes:

- Use a modal when opened from trade; a side inspector can be used on full inventory screen.
- Illegal and quest item status should be unmistakable.
- Actions should be disabled when not applicable, not hidden if the player needs to learn they exist.

AI mockup prompt:

```text
Create a medieval item detail modal wireframe. Show large item icon, name, quantity, value, tags, weight, size, rarity, quest flag, legality, protected/concealed/highlighted status, market demand notes, and player note/highlight controls. Include actions Add to Offer, Protect, Conceal, Read/Use if available, and Close.
```

## Handoff Prompt For A UI/UX AI

Use this if handing the whole set to another AI:

```text
Design UI/UX mockups for an offline fantasy merchant trading game. Only design these 12 core screens: Title/Main Menu, New Game/Merchant Profile, Save/Load Browser, Settings/Options, System/Pause Menu, Travel Map/Market Planner, Market/Town Hub, Customer/NPC Selection, Barter/Conversation Main Screen, Inventory Management, Inventory Search/Filter Popover, and Item Detail Modal.

Use the attached screen-by-screen brief exactly and match the current `docs/ui_parts` reference style: bright painterly coastal fantasy scenes, parchment ledgers, carved dark wood shells, blue enamel title plates, brass trim, heraldic seals, gold status chips, polished NPC portraits, collectible item icons, and beveled green/blue/red command buttons. The UI must be compact, scannable, and practical for repeated trading. Do not bake readable text into generated art; leave clean areas for React-rendered text. Prioritize inventory, offer comparison, route planning, and clear command states.
```

