# Company, Warehouses, Shipments, And Stock Ownership

Step 9 adds the first pure gameplay foundation for long-term merchant-company progression.

The goal is not to create the final company UI yet. The goal is to make the business layer testable before it is wired into screens.

## Source Files

- `src/lib/company.ts`: company ledger, warehouses, shipments, agents, shares, valuation, dividends, and investment helpers.
- `src/lib/company.test.ts`: regression coverage for the company foundation.

## Command

```powershell
pnpm test:company
```

`pnpm verify:current-state` also runs this test.

## Current Foundation

### Warehouses

Warehouses are market-specific storage locations with:

- `marketIndex` ownership;
- weight and size capacity;
- weekly fee;
- stored inventory.

Helpers can store and retrieve visible quantities while respecting offer quantities and storage capacity.

### Shipments

Shipments can be planned between markets with:

- origin and destination market;
- depart day and arrival day;
- travel days;
- toll cost;
- risk percent;
- optional insurance;
- declared cargo value;
- cargo inventory.

The shipment resolver can produce delivered/lost outcomes from a deterministic roll. This is intentionally pure so future travel incidents, contracts, or agents can call the same logic.

### Company Ledger

A company tracks:

- cash;
- warehouses;
- shipments;
- agents;
- shareholders;
- issued and authorized shares;
- reputation;
- influence.

Valuation currently includes cash, warehouse inventory value, in-transit cargo value, reputation value, influence value, and weekly fixed costs.

### Stock Ownership And Dividends

The share layer is intentionally simple:

- `issuedShares` defines the divisor for share price and dividends;
- each shareholder has a share count;
- dividends are distributed proportionally by issued shares;
- share price is calculated from company net value divided by issued shares.

This is enough to support future company stock ownership without inventing fake numbers disconnected from actual assets.

### Agents

Agents can be hired and assigned to shipments. For now, agent skill reduces shipment risk in a simple deterministic way.

Future work can expand agents into route runners, rumor gatherers, warehouse managers, buyers, or smugglers.

## Not Yet UI-Integrated

Step 9 intentionally does not add screens yet. UI wiring belongs to the next integration pass.

Future UI should add:

- warehouse screen;
- shipment planning screen;
- company ledger screen;
- share/dividend screen;
- agent assignment screen.

## Validation

After applying Step 9, run:

```powershell
pnpm test:company
pnpm verify:current-state
pnpm build
```
