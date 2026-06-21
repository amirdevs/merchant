# 09 - Playable UI Integration

This document tracks the first visible gameplay integration pass after the foundation systems were added.

## Purpose

The previous roadmap created tested helpers for trading, inventory value, travel planning, quests, company warehouses, shipments, and UI view models. This pass makes those systems visible in the actual app flow without rewriting every existing screen.

## Added Screen

### Strategy Planner

The Strategy Planner is a new market-level screen opened from the market command bar.

It gathers the main playable decisions in one place:

1. Trade desk: current customer, current offer values, and quick access to barter.
2. Cargo and money: wallet, cargo value, visible stacks, and travel-capacity status.
3. Routes: route cost/risk summaries using the travel planning helpers.
4. Quests and contracts: ready/available quest work from the quest runtime summaries.
5. Company: cash, value, share price, weekly costs, and company warnings.
6. Action checklist: blockers and recommended next actions.

## Updated Screens

### Market Hub

The market command bar now includes a Planner button. This keeps the normal market screen simple while giving the player one place to review current trade, route, quest, and company state.

### Company View

The company screen now reads the newer structured company model more directly:

- warehouses are found by market index;
- warehouse capacity/value is shown;
- shipment statuses use planned/in-transit/delivered/lost/cancelled states;
- shipment cost labels use toll and insurance fields;
- company cash display handles both the newer cash field and the older bank alias.

## What This Does Not Do Yet

This is still an integration pass, not a full UI redesign.

Remaining future work:

- add direct trade intelligence inside the barter screen;
- add exact route planner cards into the travel confirmation modal;
- replace journal quest status buttons with full typed quest transactions;
- add true shipment cargo selection instead of passive route shipment buttons;
- add company ledger/shareholder UI.

## Validation

After applying this pass, run:

```powershell
pnpm verify:current-state
pnpm build
```

Then smoke-test:

1. Start or load a game.
2. Open Market.
3. Click Planner.
4. Open Barter from Planner.
5. Open Cargo, Travel, Journal, and Company from Planner.
6. Confirm Company no longer shows undefined shipment cost/reward fields.
