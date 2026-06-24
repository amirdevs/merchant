import type { GameState } from "@/game/runtime/game";
import { items, marketplaces } from "@/game/runtime/game";
import { inventoryTotals } from "@/game/economy/economy";
import { kingdomHeat } from "@/game/company/law";

export type BalanceWarning = {
  severity: "info" | "warning" | "danger";
  label: string;
  detail: string;
};

export type BalanceReport = {
  playerCargoValue: number;
  companyWealth: number;
  activeContracts: number;
  activeShipments: number;
  maximumMarketShift: number;
  maximumHeat: number;
  routeHistoryCount: number;
  warnings: BalanceWarning[];
};

export function createBalanceReport(state: GameState): BalanceReport {
  const cargo = inventoryTotals(state.playerInventory, items);
  const marketShifts = Object.values(state.marketSimulation).flatMap((market) => Object.values(market.tagShifts));
  const maximumMarketShift = marketShifts.length ? Math.max(...marketShifts.map((shift) => Math.abs(shift))) : 0;
  const maximumHeat = Math.max(0, ...marketplaces.map((market) => kingdomHeat(state.law, market.kingdomIndex)));
  const companyWealth = state.company.bankCopper + cargo.value - state.company.loanBalance;
  const warnings: BalanceWarning[] = [];

  if (maximumMarketShift >= 80) warnings.push({ severity: "danger", label: "Extreme market drift", detail: `A simulated price modifier reached ${maximumMarketShift}%.` });
  else if (maximumMarketShift >= 45) warnings.push({ severity: "warning", label: "Strong market drift", detail: `A simulated price modifier reached ${maximumMarketShift}%.` });
  if (maximumHeat >= 70) warnings.push({ severity: "danger", label: "Severe legal heat", detail: `A kingdom heat level reached ${maximumHeat}.` });
  if (state.company.loanBalance > state.company.bankCopper + cargo.value) warnings.push({ severity: "warning", label: "Debt pressure", detail: "Debt exceeds liquid company and cargo value." });
  if (state.caravan.packhorseCondition < 25) warnings.push({ severity: "danger", label: "Packhorse condition", detail: "Packhorse condition is below 25%." });
  if (!warnings.length) warnings.push({ severity: "info", label: "No major outliers", detail: "Current economy and progression values are within first-pass thresholds." });

  return {
    playerCargoValue: cargo.value,
    companyWealth,
    activeContracts: Object.values(state.contractStates).filter((status) => status === "accepted").length,
    activeShipments: state.company.shipments.filter((shipment) => shipment.status === "active").length,
    maximumMarketShift,
    maximumHeat,
    routeHistoryCount: state.caravan.routeHistory.length,
    warnings,
  };
}
