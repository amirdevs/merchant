import type { InventoryEntry, Item, Marketplace } from "../data/types";
import { canAffordCopper, formatMoney, inventoryTotals, spendCopper } from "./economy";
import { addInventory, visibleQuantity } from "./inventory";

export type CompanyWarehouse = {
  id: string;
  name: string;
  marketIndex: number;
  capacityWeight: number;
  capacitySize: number;
  weeklyFeeCopper: number;
  inventory: InventoryEntry[];
};

export type CompanyShipmentStatus = "planned" | "in_transit" | "delivered" | "lost" | "cancelled";

export type CompanyShipment = {
  id: string;
  fromMarketIndex: number;
  toMarketIndex: number;
  departDay: number;
  arrivalDay: number;
  travelDays: number;
  tollCopper: number;
  riskPercent: number;
  insured: boolean;
  insuranceCopper: number;
  declaredCargoValueCopper: number;
  status: CompanyShipmentStatus;
  cargo: InventoryEntry[];
  note?: string;
};

export type CompanyAgentStatus = "idle" | "assigned" | "recovering";

export type CompanyAgent = {
  id: string;
  name: string;
  weeklyWageCopper: number;
  skillPercent: number;
  status: CompanyAgentStatus;
  assignedShipmentId?: string | null;
};

export type CompanyShareholder = {
  id: string;
  name: string;
  shares: number;
};

export type CompanyLedger = {
  name: string;
  cashCopper: number;
  reputation: number;
  influence: number;
  authorizedShares: number;
  issuedShares: number;
  warehouses: CompanyWarehouse[];
  shipments: CompanyShipment[];
  agents: CompanyAgent[];
  shareholders: CompanyShareholder[];
};

export type CompanyState = CompanyLedger & {
  /** Legacy UI/save compatibility flag. New valuation uses cashCopper and structured warehouses. */
  founded: boolean;
  /** Legacy alias kept for older screens. Prefer cashCopper for new systems. */
  bankCopper: number;
  loanBalance: number;
  factionReputation: Record<string, number>;
};

export type WarehouseCapacityStatus = {
  valueCopper: number;
  weight: number;
  size: number;
  capacityWeight: number;
  capacitySize: number;
  availableWeight: number;
  availableSize: number;
  overWeight: number;
  overSize: number;
  canStore: boolean;
};

export type CompanyValuation = {
  cashCopper: number;
  warehouseValueCopper: number;
  inTransitValueCopper: number;
  reputationValueCopper: number;
  influenceValueCopper: number;
  grossAssetValueCopper: number;
  weeklyFixedCostCopper: number;
  netValueCopper: number;
  issuedShares: number;
  sharePriceCopper: number;
};

export type DividendPayment = {
  shareholderId: string;
  shareholderName: string;
  shares: number;
  copper: number;
};

export type DividendPlan = {
  totalCopper: number;
  distributedCopper: number;
  remainderCopper: number;
  payments: DividendPayment[];
};

export type ShipmentPlanInput = {
  id: string;
  fromMarketIndex: number;
  toMarketIndex: number;
  departDay: number;
  travelDays: number;
  tollCopper?: number;
  riskPercent?: number;
  insured?: boolean;
  insuranceRatePercent?: number;
  cargo: InventoryEntry[];
  items: Item[];
  note?: string;
};

export type ShipmentResolution = {
  shipment: CompanyShipment;
  delivered: boolean;
  lost: boolean;
  compensationCopper: number;
  summary: string;
};

function cloneInventory(inventory: InventoryEntry[]) {
  return inventory.map((entry) => ({ ...entry }));
}

export function createCompanyState(): CompanyState {
  return {
    name: "The Ledger Company",
    cashCopper: 0,
    reputation: 0,
    influence: 0,
    authorizedShares: 1_000,
    issuedShares: 100,
    warehouses: [],
    shipments: [],
    agents: [],
    shareholders: [{ id: "player", name: "Player", shares: 100 }],
    founded: false,
    bankCopper: 0,
    loanBalance: 0,
    factionReputation: {},
  };
}

function syncLegacyCompanyCash(company: CompanyState) {
  company.cashCopper = Math.max(0, Math.floor(company.cashCopper || 0));
  company.bankCopper = company.cashCopper;
}


function removeVisibleQuantity(inventory: InventoryEntry[], itemIndex: number, quantity: number) {
  let remaining = Math.max(0, Math.floor(quantity || 0));
  if (remaining <= 0) return true;

  for (let index = inventory.length - 1; index >= 0 && remaining > 0; index -= 1) {
    const entry = inventory[index];
    if (entry.itemIndex !== itemIndex) continue;
    const removable = Math.min(visibleQuantity(entry), remaining);
    entry.quantity -= removable;
    remaining -= removable;
    if (entry.offerQuantity > entry.quantity) entry.offerQuantity = entry.quantity;
    if (entry.quantity <= 0) inventory.splice(index, 1);
  }

  return remaining <= 0;
}

export function createWarehouse(input: Omit<CompanyWarehouse, "inventory"> & { inventory?: InventoryEntry[] }): CompanyWarehouse {
  return {
    ...input,
    capacityWeight: Math.max(0, Math.floor(input.capacityWeight || 0)),
    capacitySize: Math.max(0, Math.floor(input.capacitySize || 0)),
    weeklyFeeCopper: Math.max(0, Math.floor(input.weeklyFeeCopper || 0)),
    inventory: cloneInventory(input.inventory || []),
  };
}

export function warehouseCapacityStatus(warehouse: CompanyWarehouse, items: Item[]): WarehouseCapacityStatus {
  const totals = inventoryTotals(warehouse.inventory, items);
  const overWeight = Math.max(0, totals.weight - warehouse.capacityWeight);
  const overSize = Math.max(0, totals.size - warehouse.capacitySize);
  return {
    valueCopper: totals.value,
    weight: totals.weight,
    size: totals.size,
    capacityWeight: warehouse.capacityWeight,
    capacitySize: warehouse.capacitySize,
    availableWeight: Math.max(0, warehouse.capacityWeight - totals.weight),
    availableSize: Math.max(0, warehouse.capacitySize - totals.size),
    overWeight,
    overSize,
    canStore: overWeight <= 0 && overSize <= 0,
  };
}

export function canStoreInventory(warehouse: CompanyWarehouse, inventory: InventoryEntry[], items: Item[]) {
  const combined = cloneInventory(warehouse.inventory);
  for (const entry of inventory) addInventory(combined, entry.itemIndex, visibleQuantity(entry));
  return warehouseCapacityStatus({ ...warehouse, inventory: combined }, items).canStore;
}

export function storeInWarehouse(source: InventoryEntry[], warehouse: CompanyWarehouse, itemIndex: number, quantity: number, items: Item[]) {
  const amount = Math.max(0, Math.floor(quantity || 0));
  const sourceEntry = source.find((entry) => entry.itemIndex === itemIndex);
  if (!sourceEntry || visibleQuantity(sourceEntry) < amount) return { ok: false, reason: "not_enough_visible_quantity" as const };
  if (!canStoreInventory(warehouse, [{ itemIndex, quantity: amount, offerQuantity: 0 }], items)) return { ok: false, reason: "warehouse_capacity_exceeded" as const };
  if (!removeVisibleQuantity(source, itemIndex, amount)) return { ok: false, reason: "not_enough_visible_quantity" as const };
  addInventory(warehouse.inventory, itemIndex, amount);
  return { ok: true, reason: "stored" as const };
}

export function retrieveFromWarehouse(warehouse: CompanyWarehouse, target: InventoryEntry[], itemIndex: number, quantity: number) {
  const amount = Math.max(0, Math.floor(quantity || 0));
  const entry = warehouse.inventory.find((candidate) => candidate.itemIndex === itemIndex);
  if (!entry || visibleQuantity(entry) < amount) return { ok: false, reason: "not_enough_stored_quantity" as const };
  if (!removeVisibleQuantity(warehouse.inventory, itemIndex, amount)) return { ok: false, reason: "not_enough_stored_quantity" as const };
  addInventory(target, itemIndex, amount);
  return { ok: true, reason: "retrieved" as const };
}

export function inventoryCopperValue(inventory: InventoryEntry[], items: Item[]) {
  return inventoryTotals(inventory, items).value;
}

export function planShipment(input: ShipmentPlanInput): CompanyShipment {
  const declaredCargoValueCopper = inventoryCopperValue(input.cargo, input.items);
  const insuranceRate = Math.max(0, input.insuranceRatePercent ?? 8);
  const insuranceCopper = input.insured ? Math.ceil((declaredCargoValueCopper * insuranceRate) / 100) : 0;
  const travelDays = Math.max(0, Math.floor(input.travelDays || 0));
  return {
    id: input.id,
    fromMarketIndex: input.fromMarketIndex,
    toMarketIndex: input.toMarketIndex,
    departDay: Math.max(0, Math.floor(input.departDay || 0)),
    arrivalDay: Math.max(0, Math.floor(input.departDay || 0)) + travelDays,
    travelDays,
    tollCopper: Math.max(0, Math.floor(input.tollCopper || 0)),
    riskPercent: Math.max(0, Math.min(100, Math.floor(input.riskPercent || 0))),
    insured: Boolean(input.insured),
    insuranceCopper,
    declaredCargoValueCopper,
    status: "planned",
    cargo: cloneInventory(input.cargo),
    note: input.note,
  };
}

export function shipmentRiskLabel(shipment: Pick<CompanyShipment, "riskPercent">) {
  if (shipment.riskPercent >= 50) return "severe";
  if (shipment.riskPercent >= 25) return "high";
  if (shipment.riskPercent >= 10) return "moderate";
  if (shipment.riskPercent > 0) return "low";
  return "safe";
}

export function shipmentTotalUpfrontCopper(shipment: CompanyShipment) {
  return shipment.tollCopper + shipment.insuranceCopper;
}

export function canFundShipment(company: Pick<CompanyLedger, "cashCopper">, shipment: CompanyShipment) {
  return company.cashCopper >= shipmentTotalUpfrontCopper(shipment);
}

export function startShipment(company: CompanyLedger, shipmentId: string) {
  const shipment = company.shipments.find((candidate) => candidate.id === shipmentId);
  if (!shipment) return { ok: false, reason: "missing_shipment" as const };
  if (shipment.status !== "planned") return { ok: false, reason: "shipment_not_planned" as const };
  const due = shipmentTotalUpfrontCopper(shipment);
  if (company.cashCopper < due) return { ok: false, reason: "insufficient_company_cash" as const };
  company.cashCopper -= due;
  shipment.status = "in_transit";
  return { ok: true, reason: "started" as const };
}

export function resolveShipmentOutcome(shipment: CompanyShipment, riskRoll: number): ShipmentResolution {
  const roll = Math.max(0, Math.min(1, riskRoll));
  const lost = shipment.riskPercent > 0 && roll < shipment.riskPercent / 100;
  if (lost) {
    const updated = { ...shipment, status: "lost" as const };
    const compensationCopper = shipment.insured ? shipment.declaredCargoValueCopper : 0;
    return {
      shipment: updated,
      delivered: false,
      lost: true,
      compensationCopper,
      summary: shipment.insured
        ? `Shipment ${shipment.id} was lost, but insurance pays ${compensationCopper}c.`
        : `Shipment ${shipment.id} was lost with no insurance.`,
    };
  }

  return {
    shipment: { ...shipment, status: "delivered" },
    delivered: true,
    lost: false,
    compensationCopper: 0,
    summary: `Shipment ${shipment.id} arrived after ${shipment.travelDays} day${shipment.travelDays === 1 ? "" : "s"}.`,
  };
}

export function deliverShipmentToWarehouse(shipment: CompanyShipment, warehouse: CompanyWarehouse, items: Item[]) {
  if (shipment.status !== "delivered") return { ok: false, reason: "shipment_not_delivered" as const };
  if (!canStoreInventory(warehouse, shipment.cargo, items)) return { ok: false, reason: "warehouse_capacity_exceeded" as const };
  for (const entry of shipment.cargo) addInventory(warehouse.inventory, entry.itemIndex, visibleQuantity(entry));
  return { ok: true, reason: "delivered_to_warehouse" as const };
}

export function marketWarehouse(warehouses: CompanyWarehouse[], marketIndex: number) {
  return warehouses.find((warehouse) => warehouse.marketIndex === marketIndex) || null;
}

export function openWarehouse(company: CompanyState, marketIndex: number) {
  if (marketWarehouse(company.warehouses, marketIndex)) return false;
  company.warehouses.push(createWarehouse({
    id: `market-${marketIndex}`,
    name: `Market ${marketIndex} Warehouse`,
    marketIndex,
    capacityWeight: 1_000,
    capacitySize: 1_000,
    weeklyFeeCopper: 25,
  }));
  company.founded = true;
  return true;
}

export function depositWarehouse(company: CompanyState, marketIndex: number, playerInventory: InventoryEntry[], itemIndex: number, quantity: number, items: Item[] = []) {
  let warehouse = marketWarehouse(company.warehouses, marketIndex);
  if (!warehouse) {
    openWarehouse(company, marketIndex);
    warehouse = marketWarehouse(company.warehouses, marketIndex);
  }
  if (!warehouse) return false;
  if (!items.length) {
    const amount = Math.max(0, Math.floor(quantity || 0));
    if (!removeVisibleQuantity(playerInventory, itemIndex, amount)) return false;
    addInventory(warehouse.inventory, itemIndex, amount);
    company.founded = true;
    return true;
  }
  const result = storeInWarehouse(playerInventory, warehouse, itemIndex, quantity, items);
  if (result.ok) company.founded = true;
  return result.ok;
}

export function withdrawWarehouse(company: CompanyState, marketIndex: number, playerInventory: InventoryEntry[], itemIndex: number, quantity: number) {
  const warehouse = marketWarehouse(company.warehouses, marketIndex);
  if (!warehouse) return false;
  return retrieveFromWarehouse(warehouse, playerInventory, itemIndex, quantity).ok;
}

export function warehouseValueCopper(warehouses: CompanyWarehouse[], items: Item[]) {
  return warehouses.reduce((total, warehouse) => total + inventoryCopperValue(warehouse.inventory, items), 0);
}

export function inTransitValueCopper(shipments: CompanyShipment[]) {
  return shipments.reduce((total, shipment) => {
    if (shipment.status !== "planned" && shipment.status !== "in_transit") return total;
    return total + shipment.declaredCargoValueCopper;
  }, 0);
}

export function weeklyFixedCosts(company: Pick<CompanyLedger, "warehouses" | "agents">) {
  const warehouseFees = company.warehouses.reduce((total, warehouse) => total + warehouse.weeklyFeeCopper, 0);
  const agentWages = company.agents.reduce((total, agent) => total + agent.weeklyWageCopper, 0);
  return warehouseFees + agentWages;
}

export function companyValuation(company: CompanyLedger, items: Item[]): CompanyValuation {
  const warehouseValue = warehouseValueCopper(company.warehouses, items);
  const transitValue = inTransitValueCopper(company.shipments);
  const reputationValue = Math.max(0, Math.floor(company.reputation || 0)) * 250;
  const influenceValue = Math.max(0, Math.floor(company.influence || 0)) * 500;
  const weeklyCost = weeklyFixedCosts(company);
  const gross = Math.max(0, company.cashCopper) + warehouseValue + transitValue + reputationValue + influenceValue;
  const net = Math.max(0, gross - weeklyCost);
  const issuedShares = Math.max(1, Math.floor(company.issuedShares || 1));
  return {
    cashCopper: Math.max(0, Math.floor(company.cashCopper || 0)),
    warehouseValueCopper: warehouseValue,
    inTransitValueCopper: transitValue,
    reputationValueCopper: reputationValue,
    influenceValueCopper: influenceValue,
    grossAssetValueCopper: gross,
    weeklyFixedCostCopper: weeklyCost,
    netValueCopper: net,
    issuedShares,
    sharePriceCopper: Math.floor(net / issuedShares),
  };
}

export function shareholderOwnershipPercent(company: CompanyLedger, shareholderId: string) {
  const shares = company.shareholders.find((holder) => holder.id === shareholderId)?.shares || 0;
  const issued = Math.max(1, company.issuedShares || 1);
  return (shares / issued) * 100;
}

export function dividendPlan(company: CompanyLedger, totalCopper: number): DividendPlan {
  const total = Math.max(0, Math.floor(totalCopper || 0));
  const issued = Math.max(1, company.issuedShares || 1);
  const payments = company.shareholders.map((holder) => ({
    shareholderId: holder.id,
    shareholderName: holder.name,
    shares: Math.max(0, Math.floor(holder.shares || 0)),
    copper: Math.floor((total * Math.max(0, Math.floor(holder.shares || 0))) / issued),
  }));
  const distributedCopper = payments.reduce((sum, payment) => sum + payment.copper, 0);
  return {
    totalCopper: total,
    distributedCopper,
    remainderCopper: Math.max(0, total - distributedCopper),
    payments,
  };
}

export function payDividend(company: CompanyLedger, totalCopper: number) {
  const plan = dividendPlan(company, totalCopper);
  if (company.cashCopper < plan.totalCopper) return { ok: false, reason: "insufficient_company_cash" as const, plan };
  company.cashCopper -= plan.totalCopper;
  return { ok: true, reason: "dividend_paid" as const, plan };
}

export function companySolvency(company: CompanyLedger, items: Item[]) {
  const valuation = companyValuation(company, items);
  const weeklyCosts = weeklyFixedCosts(company);
  const runwayWeeks = weeklyCosts <= 0 ? Infinity : Math.floor(company.cashCopper / weeklyCosts);
  return {
    valuation,
    weeklyCosts,
    runwayWeeks,
    canPayNextWeek: company.cashCopper >= weeklyCosts,
    summary: weeklyCosts <= 0
      ? "No fixed weekly company costs."
      : `${formatMoney(company.cashCopper, items)} cash covers ${runwayWeeks} week${runwayWeeks === 1 ? "" : "s"} of fixed costs.`,
  };
}

export function hireAgent(company: CompanyLedger, agent: CompanyAgent) {
  if (company.agents.some((candidate) => candidate.id === agent.id)) return { ok: false, reason: "duplicate_agent" as const };
  company.agents.push({ ...agent, weeklyWageCopper: Math.max(0, Math.floor(agent.weeklyWageCopper || 0)), skillPercent: Math.max(0, Math.min(100, Math.floor(agent.skillPercent || 0))) });
  return { ok: true, reason: "agent_hired" as const };
}

export function assignAgentToShipment(company: CompanyLedger, agentId: string, shipmentId: string) {
  const agent = company.agents.find((candidate) => candidate.id === agentId);
  if (!agent) return { ok: false, reason: "missing_agent" as const };
  const shipment = company.shipments.find((candidate) => candidate.id === shipmentId);
  if (!shipment) return { ok: false, reason: "missing_shipment" as const };
  if (agent.status !== "idle") return { ok: false, reason: "agent_not_idle" as const };
  agent.status = "assigned";
  agent.assignedShipmentId = shipmentId;
  shipment.riskPercent = Math.max(0, shipment.riskPercent - Math.floor(agent.skillPercent / 5));
  return { ok: true, reason: "agent_assigned" as const };
}

export function companyCanPayCopper(company: CompanyLedger, copperValue: number) {
  return company.cashCopper >= Math.max(0, Math.floor(copperValue || 0));
}

export function companyPaysCopper(company: CompanyLedger, copperValue: number) {
  const amount = Math.max(0, Math.floor(copperValue || 0));
  if (!companyCanPayCopper(company, amount)) return false;
  company.cashCopper -= amount;
  return true;
}

export function playerInvestsCopper(company: CompanyLedger, playerInventory: InventoryEntry[], items: Item[], copperValue: number) {
  const amount = Math.max(0, Math.floor(copperValue || 0));
  if (!canAffordCopper(playerInventory, items, amount)) return { ok: false, reason: "player_cannot_afford" as const };
  if (!spendCopper(playerInventory, items, amount)) return { ok: false, reason: "player_cannot_afford" as const };
  company.cashCopper += amount;
  return { ok: true, reason: "invested" as const };
}

function shipmentDeterministicRoll(shipment: Pick<CompanyShipment, "id" | "fromMarketIndex" | "toMarketIndex" | "departDay">) {
  let value = 0;
  for (const char of shipment.id) value = (value * 31 + char.charCodeAt(0)) >>> 0;
  value = (value + (shipment.departDay + 1) * 1664525 + (shipment.fromMarketIndex + 1) * 1013904223 + shipment.toMarketIndex * 7919) >>> 0;
  value ^= value >>> 16;
  return (value >>> 0) / 4294967296;
}

export function settleShipments(company: CompanyState, day: number) {
  const settled: CompanyShipment[] = [];
  for (const shipment of company.shipments) {
    if (shipment.status !== "in_transit" || day < shipment.arrivalDay) continue;
    const result = resolveShipmentOutcome(shipment, shipmentDeterministicRoll(shipment));
    Object.assign(shipment, result.shipment);
    if (result.delivered) {
      company.reputation += 1;
      company.influence += 1;
      company.factionReputation[String(shipment.toMarketIndex)] = (company.factionReputation[String(shipment.toMarketIndex)] || 0) + 1;
    } else {
      company.reputation = Math.max(0, company.reputation - 1);
      company.factionReputation[String(shipment.toMarketIndex)] = (company.factionReputation[String(shipment.toMarketIndex)] || 0) - 1;
      if (result.compensationCopper > 0) {
        company.cashCopper += result.compensationCopper;
        syncLegacyCompanyCash(company);
      }
    }
    settled.push(shipment);
  }
  return settled;
}

export function createShipment(company: CompanyState, fromMarketIndex: number, toMarketIndex: number, day: number, travelDays: number, tolls: number) {
  if (company.shipments.some((shipment) => shipment.status === "in_transit")) return null;
  const shipment = planShipment({
    id: `${fromMarketIndex}:${toMarketIndex}:${day}`,
    fromMarketIndex,
    toMarketIndex,
    departDay: day,
    travelDays: Math.max(2, travelDays),
    tollCopper: Math.max(20, tolls * 4 + travelDays * 3),
    riskPercent: Math.min(70, 10 + travelDays * 4),
    cargo: [],
    items: [],
  });
  company.shipments.push(shipment);
  company.founded = true;
  return shipment;
}

export function takeLoan(company: CompanyState, amount = 100) {
  const loan = Math.max(0, Math.floor(amount || 0));
  if (company.loanBalance > 0 || loan <= 0) return 0;
  company.cashCopper += loan;
  company.loanBalance = Math.ceil((loan * 110) / 100);
  syncLegacyCompanyCash(company);
  company.founded = true;
  return loan;
}

export function repayLoan(company: CompanyState) {
  syncLegacyCompanyCash(company);
  if (company.loanBalance <= 0 || company.cashCopper < company.loanBalance) return false;
  company.cashCopper -= company.loanBalance;
  company.loanBalance = 0;
  syncLegacyCompanyCash(company);
  return true;
}

export function routeLabel(markets: Marketplace[], fromMarketIndex: number, toMarketIndex: number) {
  const from = markets.find((market) => market.index === fromMarketIndex)?.name || `Market ${fromMarketIndex}`;
  const to = markets.find((market) => market.index === toMarketIndex)?.name || `Market ${toMarketIndex}`;
  return `${from} -> ${to}`;
}
