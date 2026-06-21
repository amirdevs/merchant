import { describe, expect, it } from "vitest";
import type { InventoryEntry, Item, Marketplace } from "../data/types";
import { inventoryCoinValue } from "./economy";
import {
  assignAgentToShipment,
  canStoreInventory,
  companySolvency,
  companyValuation,
  createWarehouse,
  deliverShipmentToWarehouse,
  dividendPlan,
  hireAgent,
  marketWarehouse,
  payDividend,
  planShipment,
  playerInvestsCopper,
  resolveShipmentOutcome,
  routeLabel,
  shipmentRiskLabel,
  shipmentTotalUpfrontCopper,
  startShipment,
  storeInWarehouse,
  retrieveFromWarehouse,
  type CompanyLedger,
} from "./company";

const items = [
  { index: 0, name: "copper coins", tags: ["currency", "coins"], loafValue: 1, size: 0, weight: 0, kingdomIndex: null },
  { index: 1, name: "silver coins", tags: ["currency", "coins"], loafValue: 100, size: 0, weight: 0, kingdomIndex: null },
  { index: 2, name: "gold coins", tags: ["currency", "coins"], loafValue: 10000, size: 0, weight: 0, kingdomIndex: null },
  { index: 3, name: "iron ore", tags: ["ore", "raw_material"], loafValue: 8, size: 3, weight: 5, kingdomIndex: null },
  { index: 4, name: "spice crate", tags: ["spice", "food"], loafValue: 40, size: 4, weight: 2, kingdomIndex: null },
] as Item[];

function inventory(entries: Array<Partial<InventoryEntry> & Pick<InventoryEntry, "itemIndex" | "quantity">>): InventoryEntry[] {
  return entries.map((entry) => ({ offerQuantity: 0, ...entry }));
}

function company(): CompanyLedger {
  return {
    name: "Six Kingdoms Trading Co.",
    cashCopper: 12_000,
    reputation: 4,
    influence: 2,
    authorizedShares: 10_000,
    issuedShares: 1_000,
    warehouses: [],
    shipments: [],
    agents: [],
    shareholders: [
      { id: "player", name: "Player", shares: 600 },
      { id: "guild", name: "Guild", shares: 400 },
    ],
  };
}

describe("company, warehouse, shipment, and stock helpers", () => {
  it("stores and retrieves visible goods without touching offered quantities", () => {
    const source = inventory([{ itemIndex: 3, quantity: 10, offerQuantity: 2 }]);
    const target: InventoryEntry[] = [];
    const warehouse = createWarehouse({ id: "wh-1", name: "Small Storehouse", marketIndex: 1, capacityWeight: 80, capacitySize: 80, weeklyFeeCopper: 25 });

    expect(storeInWarehouse(source, warehouse, 3, 6, items)).toMatchObject({ ok: true, reason: "stored" });
    expect(source[0]).toMatchObject({ quantity: 4, offerQuantity: 2 });
    expect(warehouse.inventory[0]).toMatchObject({ itemIndex: 3, quantity: 6 });

    expect(retrieveFromWarehouse(warehouse, target, 3, 4)).toMatchObject({ ok: true, reason: "retrieved" });
    expect(target[0]).toMatchObject({ itemIndex: 3, quantity: 4 });
    expect(warehouse.inventory[0]).toMatchObject({ itemIndex: 3, quantity: 2 });
  });

  it("blocks warehouse storage that would exceed capacity", () => {
    const warehouse = createWarehouse({ id: "tiny", name: "Tiny", marketIndex: 0, capacityWeight: 10, capacitySize: 10, weeklyFeeCopper: 1 });
    expect(canStoreInventory(warehouse, inventory([{ itemIndex: 3, quantity: 3 }]), items)).toBe(false);
    expect(storeInWarehouse(inventory([{ itemIndex: 3, quantity: 3 }]), warehouse, 3, 3, items)).toMatchObject({ ok: false, reason: "warehouse_capacity_exceeded" });
  });

  it("plans shipments with declared cargo value, insurance, tolls, and risk labels", () => {
    const shipment = planShipment({
      id: "ship-1",
      fromMarketIndex: 0,
      toMarketIndex: 2,
      departDay: 7,
      travelDays: 3,
      tollCopper: 15,
      riskPercent: 26,
      insured: true,
      insuranceRatePercent: 10,
      cargo: inventory([{ itemIndex: 4, quantity: 5 }]),
      items,
    });

    expect(shipment.arrivalDay).toBe(10);
    expect(shipment.declaredCargoValueCopper).toBe(200);
    expect(shipment.insuranceCopper).toBe(20);
    expect(shipmentTotalUpfrontCopper(shipment)).toBe(35);
    expect(shipmentRiskLabel(shipment)).toBe("high");
  });

  it("starts and resolves shipments, including insured losses", () => {
    const localCompany = company();
    const shipment = planShipment({
      id: "ship-2",
      fromMarketIndex: 0,
      toMarketIndex: 1,
      departDay: 1,
      travelDays: 2,
      tollCopper: 50,
      riskPercent: 40,
      insured: true,
      cargo: inventory([{ itemIndex: 3, quantity: 10 }]),
      items,
    });
    localCompany.shipments.push(shipment);

    expect(startShipment(localCompany, "ship-2")).toMatchObject({ ok: true, reason: "started" });
    expect(localCompany.cashCopper).toBe(11_943);

    const loss = resolveShipmentOutcome(shipment, 0.1);
    expect(loss.lost).toBe(true);
    expect(loss.compensationCopper).toBe(80);

    const delivered = resolveShipmentOutcome(shipment, 0.9);
    const warehouse = createWarehouse({ id: "dest", name: "Destination", marketIndex: 1, capacityWeight: 200, capacitySize: 200, weeklyFeeCopper: 15 });
    expect(deliverShipmentToWarehouse(delivered.shipment, warehouse, items)).toMatchObject({ ok: true, reason: "delivered_to_warehouse" });
    expect(warehouse.inventory[0]).toMatchObject({ itemIndex: 3, quantity: 10 });
  });

  it("values company assets, warehouses, shipments, reputation, influence, and share price", () => {
    const localCompany = company();
    localCompany.warehouses.push(createWarehouse({ id: "wh", name: "Warehouse", marketIndex: 0, capacityWeight: 300, capacitySize: 300, weeklyFeeCopper: 25, inventory: inventory([{ itemIndex: 4, quantity: 5 }]) }));
    localCompany.shipments.push(planShipment({ id: "ship", fromMarketIndex: 0, toMarketIndex: 1, departDay: 1, travelDays: 1, cargo: inventory([{ itemIndex: 3, quantity: 10 }]), items }));

    const valuation = companyValuation(localCompany, items);
    expect(valuation.cashCopper).toBe(12_000);
    expect(valuation.warehouseValueCopper).toBe(200);
    expect(valuation.inTransitValueCopper).toBe(80);
    expect(valuation.reputationValueCopper).toBe(1000);
    expect(valuation.influenceValueCopper).toBe(1000);
    expect(valuation.weeklyFixedCostCopper).toBe(25);
    expect(valuation.sharePriceCopper).toBe(14);
  });

  it("plans and pays dividends by issued shares", () => {
    const localCompany = company();
    const plan = dividendPlan(localCompany, 1_000);
    expect(plan.payments).toEqual([
      { shareholderId: "player", shareholderName: "Player", shares: 600, copper: 600 },
      { shareholderId: "guild", shareholderName: "Guild", shares: 400, copper: 400 },
    ]);
    expect(payDividend(localCompany, 1_000)).toMatchObject({ ok: true, reason: "dividend_paid" });
    expect(localCompany.cashCopper).toBe(11_000);
  });

  it("handles agents, assignment risk reduction, and solvency summaries", () => {
    const localCompany = company();
    expect(hireAgent(localCompany, { id: "agent-1", name: "Mira", weeklyWageCopper: 150, skillPercent: 30, status: "idle" })).toMatchObject({ ok: true, reason: "agent_hired" });
    const shipment = planShipment({ id: "ship-3", fromMarketIndex: 0, toMarketIndex: 1, departDay: 1, travelDays: 1, riskPercent: 20, cargo: inventory([{ itemIndex: 4, quantity: 1 }]), items });
    localCompany.shipments.push(shipment);
    expect(assignAgentToShipment(localCompany, "agent-1", "ship-3")).toMatchObject({ ok: true, reason: "agent_assigned" });
    expect(localCompany.shipments[0].riskPercent).toBe(14);
    expect(companySolvency(localCompany, items)).toMatchObject({ weeklyCosts: 150, canPayNextWeek: true });
  });

  it("accepts player investment using real coin inventory and finds market warehouses", () => {
    const localCompany = company();
    const playerInventory = inventory([{ itemIndex: 1, quantity: 10 }]);
    expect(playerInvestsCopper(localCompany, playerInventory, items, 350)).toMatchObject({ ok: true, reason: "invested" });
    expect(localCompany.cashCopper).toBe(12_350);
    expect(inventoryCoinValue(playerInventory, items)).toBe(650);

    const warehouse = createWarehouse({ id: "wh-market", name: "Market Warehouse", marketIndex: 6, capacityWeight: 100, capacitySize: 100, weeklyFeeCopper: 20 });
    localCompany.warehouses.push(warehouse);
    expect(marketWarehouse(localCompany.warehouses, 6)?.id).toBe("wh-market");

    const markets = [
      { index: 2, name: "Harbor", kingdomIndex: 0, townsquareFile: "a.png", backdropFile: "b.png", stallage: 1, connections: [] },
      { index: 3, name: "Capital", kingdomIndex: 0, townsquareFile: "a.png", backdropFile: "b.png", stallage: 1, connections: [] },
    ] as Marketplace[];
    expect(routeLabel(markets, 2, 3)).toBe("Harbor -> Capital");
  });
});
