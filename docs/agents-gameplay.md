# Agent Roadmap - Gameplay And UX

## User's Gameplay Concerns

The user reported:

- Bartering is unclear.
- Travel expenses feel too high.
- The game becomes tiring.
- Inventory management needs improvement.
- Haggling/trading mechanics need clearer feedback.
- Players should know what each NPC likes and dislikes.
- Some NPCs have poor inventories and need better overall design.

## Implemented/Discussed Mod Ideas

Earlier mod work included or planned:

- Star/flag items so merchants cannot request them in haggling.
- Scrollable or taller chat box for long text.
- Better NPC preference visibility.
- Next customer button beside Goodbye.
- Help modal with keyboard/mouse actions.
- Inventory grid with item sizing.
- Better haggling/trading clarity.

Some of this existed in the old patched game/mod path; the React/Electron remake should reimplement these features natively instead of trying to keep patching the bundled original.

## Roadmap

1. Inventory foundation:
   - grid layout
   - item sizes
   - item locking/starring
   - search/filter/sort
   - clear item details panel

2. Trading foundation:
   - explicit offer value comparison
   - NPC desired/undesired categories
   - visible trade fairness meter
   - suggested counter-offers
   - explain why NPC accepts/rejects

3. Haggling:
   - clearer phases
   - visible patience/mood
   - limited but meaningful negotiation actions
   - less repetitive dialogue

4. Travel:
   - rebalance costs
   - preview travel cost/risk/reward
   - add events to reduce fatigue

5. NPC quality:
   - seed better inventories by profession/location/wealth
   - give NPCs preference profiles
   - improve weak NPCs individually after telemetry/playtest notes

## Design Direction

This should feel like a usable merchant sim, not a marketing page:

- Dense but readable UI
- Clear panels and toolbars
- Minimal decorative clutter
- Fast repeated actions
- Keyboard/mouse shortcuts visible in help modal

