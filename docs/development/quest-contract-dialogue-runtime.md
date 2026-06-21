# Quest, Contract, And Dialogue Runtime Foundation

Step 8 adds a small pure runtime layer that turns dialogue and notice-board actions into typed state transactions.

## Files

- `src/lib/quest-runtime.ts`: typed quest/contract/dialogue transaction helpers.
- `src/lib/quest-runtime.test.ts`: regression tests for accepting quests, completing local quest requests, contract acceptance, market unlocks, and dialogue logs.

## Design

The runtime keeps three systems connected without forcing a UI rewrite yet:

1. Dialogue choices can produce explicit transactions.
2. Quest work can be accepted, completed, failed, and summarized from state.
3. Contracts and market unlocks use the same transaction pathway as quest actions.

This keeps callback behavior testable before it is wired into more screens.

## Transaction Types

Current typed actions include:

- `acceptQuest`
- `setQuestStatus`
- `addInventory`
- `removeInventory`
- `removeInventoryByToken`
- `addCopper`
- `acceptContract`
- `setContractStatus`
- `unlockMarket`
- `appendDialogueLog`

These are intentionally small. Future original callback IDs should map into this transaction list rather than mutating the full game state directly from UI code.

## Rules

- Quest item removal consumes only visible quantity, not quantity already in an offer panel.
- Quest completion can consume required items and grant copper/item rewards.
- Dialogue effects log what happened so the journal/ledger can show a readable history.
- Market unlocks and contract status changes are typed transactions, not ad hoc string mutations.

## Verification

Run:

```powershell
pnpm test:quests
pnpm verify:current-state
```

## Future Wiring

Next implementation passes can wire this runtime into:

- notice-board buttons;
- dialogue choices with original callback IDs;
- contract accept/complete buttons;
- journal entries;
- route or market unlock rewards;
- market demand/law/event changes caused by quest outcomes.
