# UI Regeneration Backlog

This folder tracks UI components and assets that still need improvement or regeneration.

Authoritative visual target:

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

Do not use `docs/game/core-ui-wireframes.md` as a visual target. It is older planning material and no longer represents the desired UI.

## Target Style

Bright painterly fantasy merchant RPG UI:

- sunlit harbor and market backplates
- parchment work surfaces with fine brass border details
- dark carved wood side shells
- blue enamel title plates and command buttons
- gold resource chips and heraldic seals
- framed NPC portraits with polished collectible-game rendering
- inventory cards with item art, quantity, rarity, and protection markers
- compact, practical layouts for repeated trading

## Component Backlog

These React components should keep moving closer to the UI images:

- `src/components/ui/ScreenFrame.tsx`: needs stronger full-screen gold ornamental frame behavior on all screens.
- `src/components/ui/Panel.tsx`: needs closer parchment edge work and carved dark-wood shell variants.
- `src/components/ui/StatChip.tsx`: should read like the top HUD/resource chips in the mockups.
- `src/components/ui/Button.tsx` and `IconButton.tsx`: need more beveled blue, parchment, red, and circular command states.
- `src/components/ui/ItemSlot.tsx`: should match the collectible item-card style in inventory and barter screens.
- `src/components/InventoryPanel.tsx`: needs final dense card/grid states for inventory, stock, and offer panels.
- `src/features/trade/BarterConversationView.tsx`: should match the three-column mockup with dark side ledgers and a central portrait/conversation panel.
- `src/features/inventory/InventoryManagementView.tsx`: should match the left dark category rail, large parchment grid, and right detail inspector.

## Asset Backlog

Regenerate or improve these asset families first:

- main menu logo/title lockup with the current game name, not placeholder text
- full-screen gold corner/border overlays for 16:9 desktop screens
- top HUD resource bar and individual coin/gem/reputation chips
- left navigation rail buttons for inventory/settings/save screens
- item cards that support selected, protected, disabled, rarity, quantity, and empty states
- barter offer panels, stock panels, response rows, and offer comparison meter
- NPC portrait frames, nameplates, mood/trust/interest badges, and roster rows
- travel map city markers, route lines, route ledger rows, and side-panel frames
- modal shells for save/load, settings, system menu, search/filter, and item details

## Regeneration Rules

- Match the full UI images in `docs/ui_parts`, not the old wireframe document.
- Preserve the painterly fantasy merchant look: bright, polished, ornate, and readable.
- Avoid generic medieval UI, flat wireframes, gray placeholders, or dense admin-app styling.
- Prefer transparent assets when possible. If transparency is unavailable, use a solid pure `#00FF00` background for later keying.
- Keep assets isolated from text when the text should be rendered by React.
- Export final runtime assets under `public/game-assets/ui/...`.
- Keep source prompts, contact sheets, and review notes in this folder or under `docs/ui_parts/ui-assets/docs`.
