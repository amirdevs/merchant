# Save Schema And Item-Catalog Break

## Current Decision

The current save schema is a clean break after the item catalog, item icon, and NPC stock overhaul.

- Current `SAVE_VERSION`: `2`.
- Current schema label: `item-catalog-2026-06-v2`.
- Legacy raw `GameState` saves are rejected.
- Save envelopes with an older or missing `saveVersion` are rejected.
- Incompatible slots remain visible in the Save/Load screen so the player can delete or overwrite them intentionally.

## Why The Break Exists

Inventory entries still use `itemIndex`. The item catalog was recreated and renamed, so old saves can silently point an inventory entry at the wrong item. Blocking old saves is safer than pretending they can be migrated without a reliable old-index to new-ID map.

## UX Behavior

- Compatible slots can be loaded normally.
- Empty slots can be saved into normally.
- Incompatible or corrupt slots cannot be loaded.
- Incompatible or corrupt slots can still be deleted or overwritten.
- Imported saves must match the current save envelope version.

## Future Migration Target

Before long-term economy, warehouses, passive shipments, or company stock ownership become serious systems, inventory ownership should move from index-only references to stable item IDs.

Recommended future path:

1. Add `itemId` alongside `itemIndex` to inventory entries.
2. Save both during a transition period.
3. Load primarily by `itemId`, using `itemIndex` only as a fallback.
4. Add one explicit migration function per future schema bump.
5. Remove index fallback only after all active save paths have been migrated.
