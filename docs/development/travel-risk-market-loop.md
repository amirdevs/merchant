# Step 7 Travel, Risk, And Market Loop

Step 7 adds a shared travel planning layer without forcing a full UI rewrite yet.

## Files

- `src/lib/travel-loop.ts`: pure route planning, close-status, warning, blocker, and arrival-summary helpers.
- `src/lib/travel-loop.test.ts`: regression tests for route cost, capacity, illegal-cargo warnings, theft/inspection preview, disconnected routes, and summary copy.

## Commands

```powershell
pnpm test:travel
pnpm verify:current-state
```

`verify:current-state` now runs `test:travel` after economy tests.

## What Is Now Centralized

- route connection lookup;
- route days, tolls, destination stallage, and total copper due;
- affordability using the shared economy helpers;
- cargo capacity state using the shared economy helpers;
- illegal cargo exposure in the destination kingdom;
- route risk preview using existing guard/theft risk helpers;
- player-facing warning/blocker strings;
- market open / closing-soon / closed status;
- arrival summary copy.

## Design Boundary

This step is deliberately a foundation step. It does not replace the travel UI yet.

Next implementation work can wire `planTravel()` into the travel confirmation screen so the player sees:

- route days;
- tolls and stallage;
- whether they can pay;
- capacity blockers;
- exposed/concealed illegal cargo risk;
- destination theft risk;
- expected inspection/theft danger.

## Manual Smoke Check

After wiring into UI later:

1. Start a new game.
2. Open travel screen from Boone.
3. Select a connected market.
4. Confirm route days and toll/stallage appear.
5. Carry too little money and confirm travel is blocked.
6. Carry too much cargo and confirm travel is blocked.
7. Carry illegal exposed cargo and confirm warning appears.
8. Conceal illegal cargo and confirm warning changes from exposed to concealed.
9. Travel and confirm arrival summary remains readable.
