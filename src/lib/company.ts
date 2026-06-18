import type { InventoryEntry } from "@/data/types";
import { addInventory, visibleQuantity } from "./inventory";

export type Shipment = {
  id: string;
  fromMarketIndex: number;
  toMarketIndex: number;
  startedDay: number;
  dueDay: number;
  cost: number;
  reward: number;
  riskPercent: number;
  status: "active" | "succeeded" | "failed";
};

export type CompanyState = {
  name: string;
  founded: boolean;
  bankCopper: number;
  loanBalance: number;
  factionReputation: Record<string, number>;
  warehouses: Record<string, InventoryEntry[]>;
  shipments: Shipment[];
};

export function createCompanyState(): CompanyState {
  return {
    name: "The Ledger Company",
    founded: false,
    bankCopper: 0,
    loanBalance: 0,
    factionReputation: {},
    warehouses: {},
    shipments: [],
  };
}

export function openWarehouse(company: CompanyState, marketIndex: number) {
  const key = String(marketIndex);
  if (company.warehouses[key]) return false;
  company.warehouses[key] = [];
  company.founded = true;
  return true;
}

export function depositWarehouse(company: CompanyState, marketIndex: number, playerInventory: InventoryEntry[], itemIndex: number, quantity: number) {
  const warehouse = company.warehouses[String(marketIndex)];
  const entry = playerInventory.find((item) => item.itemIndex === itemIndex);
  const amount = Math.min(Math.max(0, Math.floor(quantity)), entry ? visibleQuantity(entry) : 0);
  if (!warehouse || !entry || amount <= 0) return false;
  entry.quantity -= amount;
  entry.offerQuantity = Math.min(entry.offerQuantity, entry.quantity);
  addInventory(warehouse, itemIndex, amount);
  if (entry.quantity <= 0) playerInventory.splice(playerInventory.indexOf(entry), 1);
  return true;
}

export function withdrawWarehouse(company: CompanyState, marketIndex: number, playerInventory: InventoryEntry[], itemIndex: number, quantity: number) {
  const warehouse = company.warehouses[String(marketIndex)];
  const entry = warehouse?.find((item) => item.itemIndex === itemIndex);
  const amount = Math.min(Math.max(0, Math.floor(quantity)), entry ? visibleQuantity(entry) : 0);
  if (!warehouse || !entry || amount <= 0) return false;
  entry.quantity -= amount;
  addInventory(playerInventory, itemIndex, amount);
  if (entry.quantity <= 0) warehouse.splice(warehouse.indexOf(entry), 1);
  return true;
}

export function createShipment(company: CompanyState, fromMarketIndex: number, toMarketIndex: number, day: number, travelDays: number, tolls: number) {
  if (company.shipments.some((shipment) => shipment.status === "active")) return null;
  const cost = Math.max(20, tolls * 4 + travelDays * 3);
  const riskPercent = Math.min(70, 10 + travelDays * 4);
  const reward = Math.max(cost + 20, Math.floor(cost * (1.8 + riskPercent / 100)));
  const shipment: Shipment = {
    id: `${fromMarketIndex}:${toMarketIndex}:${day}`,
    fromMarketIndex,
    toMarketIndex,
    startedDay: day,
    dueDay: day + Math.max(2, travelDays),
    cost,
    reward,
    riskPercent,
    status: "active",
  };
  company.shipments.push(shipment);
  company.founded = true;
  return shipment;
}

function shipmentRoll(shipment: Shipment) {
  let value = ((shipment.startedDay + 1) * 1664525 + (shipment.fromMarketIndex + 1) * 1013904223 + shipment.toMarketIndex * 7919) >>> 0;
  value ^= value >>> 16;
  return (value >>> 0) / 4294967296;
}

export function settleShipments(company: CompanyState, day: number) {
  const settled: Shipment[] = [];
  for (const shipment of company.shipments) {
    if (shipment.status !== "active" || day < shipment.dueDay) continue;
    shipment.status = shipmentRoll(shipment) * 100 < shipment.riskPercent ? "failed" : "succeeded";
    if (shipment.status === "succeeded") {
      company.bankCopper += shipment.reward;
      company.factionReputation[String(shipment.toMarketIndex)] = (company.factionReputation[String(shipment.toMarketIndex)] || 0) + 1;
    } else {
      company.factionReputation[String(shipment.toMarketIndex)] = (company.factionReputation[String(shipment.toMarketIndex)] || 0) - 1;
    }
    settled.push(shipment);
  }
  return settled;
}

export function takeLoan(company: CompanyState, amount = 100) {
  if (company.loanBalance > 0) return 0;
  company.bankCopper += amount;
  company.loanBalance = Math.ceil((amount * 110) / 100);
  return amount;
}

export function repayLoan(company: CompanyState) {
  if (company.loanBalance <= 0 || company.bankCopper < company.loanBalance) return false;
  company.bankCopper -= company.loanBalance;
  company.loanBalance = 0;
  return true;
}
