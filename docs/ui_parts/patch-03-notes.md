# UI Patch 03 — Barter / Conversation focus

Apply after patch 02. This patch is incremental.

## Files changed

- `src/main.tsx`
- `src/styles.css`

## What changed

- Replaced the older barter layout with a dedicated `BarterConversationScreen`.
- The barter screen now follows the `09_barter_conversation_main_8x.png` direction more closely:
  - left customer offer/stock column
  - central portrait + parchment dialogue card
  - offer value comparison board
  - conversation choice buttons
  - right player offer/inventory column
- Added stronger parchment/wood/brass styling for the central conversation area.
- Added responsive behavior:
  - 3-column desktop layout
  - 2-column mid-size layout
  - stacked mobile/narrow Electron window layout

## Important

This still uses real React UI and real game data. The PNG mockups are visual references only; they are not sliced into fake static UI.
