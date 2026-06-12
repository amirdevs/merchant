# Merchant Remake Version Roadmap

## Summary

Current version is `v0.1.0`: React/Electron/Tailwind vertical slice with extracted assets/data, town/customer selection, inventory offers, basic haggling, travel, and local save/load.

Recommended next versions, in order:

## Version Order

### `v0.2.0` - App Foundation And Layout Parity

- Restructure the prototype into stable modules: game state, inventory, trading, travel, data loading, UI shell.
- Make the main layout closer to the original game: left NPC inventory, center dialogue/window, right player inventory.
- Add proper reusable UI primitives using Tailwind patterns: button, panel, inventory row, modal, tooltip.
- Add keyboard/mouse help modal safely, not via overlay hacks.
- Acceptance: player can select NPCs, inspect both inventories, and no click-blocking overlays exist.

### `v0.3.0` - Inventory And Trading System

- Rebuild inventory behavior properly:
  - left click moves 1
  - right click moves all/clears
  - shift moves half
  - alt moves 10
  - star/protect prevents accidental offer moves
  - conceal is separate from protect
- Add sorting, filtering, search keywords, and clear item value display.
- Improve haggling feedback with exact missing value and NPC preference hints.
- Acceptance: trading feels clearer and faster than the original.

### `v0.4.0` - Market, Travel, And Economy Loop

- Implement full market map using extracted marketplace/routes data.
- Add travel days, tolls, capacity pressure, stallage, and route profitability.
- Add market demand/supply bias to item valuation.
- Add route ledger UI showing best goods and travel costs.
- Acceptance: player can trade across multiple towns with understandable profit logic.

### `v0.5.0` - Dialogue And NPC Behavior

- Build dialogue engine from extracted dialogue data where available.
- Add NPC likes/dislikes panel directly in the trade screen.
- Add "next customer" as a real game action:
  - from active conversation, switch to next valid market NPC
  - do not merely click Goodbye
- Improve weak NPC inventories by profession and location.
- Acceptance: Cassandra/Zalia-style NPCs show visible inventories and clear preferences in new saves.

### `v0.6.0` - Save System And Modding

- Add explicit save schema versioning.
- Store saves offline in Electron app data or local JSON.
- Add `data/mods` folder support for items, NPCs, markets, and balance overrides.
- Add import/export buttons for saves and data.
- Acceptance: new content can be added without editing bundled source.

### `v0.7.0` - Audio, Animation, And Original Feel

- Add original audio routing: item sounds, trade sounds, ambient town sounds, voice snippets.
- Add dialogue typing, speech bubble sizing, and scroll behavior.
- Add visual polish using original backgrounds, portraits, stalls, and UI textures.
- Acceptance: the remake starts feeling close to the original game moment-to-moment.

### `v0.8.0` - Quest And Special Systems

- Rebuild core quest/event systems incrementally:
  - tutorial
  - market events
  - auctions/drafts
  - company jobs
  - myth/deck-related systems if still wanted
- Implement only offline/local behavior.
- Acceptance: major non-basic-trading gameplay loops are playable.

### `v0.9.0` - Full Content Pass And QA

- Verify all extracted characters, items, markets, routes, and professions load correctly.
- Fix broken asset references.
- Balance inventories, travel expenses, haggling thresholds, and tiredness/friction.
- Add regression tests for inventory visibility, trading, travel, saves, and data loading.
- Acceptance: playable long-session test without major blockers.

### `v1.0.0` - Offline Complete Remake

- Package as standalone Electron app.
- No Steam, no online dependencies.
- Include full offline content, saves, mod support, and stable gameplay loop.
- Acceptance: user can play from new game through extended trade progression without needing the old executable.

## Public Interfaces / Types

- Add `saveVersion` to `GameState`.
- Split current game logic into stable domain modules:
  - `inventory`
  - `trade`
  - `travel`
  - `npc`
  - `save`
  - `data`
- Keep generated extracted data read-only; custom changes go into mod/override files.

## Test Plan

- Build test: `pnpm build`.
- Manual smoke test per version:
  - start new game
  - select NPC
  - move items both ways
  - complete/reject trade
  - travel to another market
  - save/load
- Regression scenarios:
  - Cassandra-like NPC with `obtainableItems` shows inventory
  - protected item cannot move into offer
  - help modal opens without blocking clicks
  - next customer selects a different valid NPC
  - long dialogue stays inside visible box

## Assumptions

- We continue the new React/Electron remake, not the old asar patch.
- New saves only; no need to migrate old original-game saves.
- Offline-only remains mandatory.
- Use pnpm, Tailwind 4, React, Electron, and local extracted assets/data.
