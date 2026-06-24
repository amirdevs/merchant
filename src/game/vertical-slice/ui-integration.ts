import type { InventoryEntry, Item } from "@/shared/types/game-data";
import { companySolvency, companyValuation, type CompanyLedger } from "@/game/company/company";
import { formatMoney, inventoryTotals, walletSummary } from "@/game/economy/economy";
import type { QuestWorkSummary } from "@/game/quests/quest-runtime";
import type { TravelPlan } from "@/game/travel/travel-loop";

export type UiSeverity = "ok" | "info" | "warning" | "blocked";

export type UiMessage = {
  severity: UiSeverity;
  text: string;
};

export type InventoryUiPanel = {
  title: string;
  moneyLabel: string;
  totalValueLabel: string;
  nonCoinValueLabel: string;
  visibleEntries: number;
  totalQuantity: number;
  capacityLabel: string;
  canTravel: boolean;
  messages: UiMessage[];
};

export type TravelUiCard = {
  title: string;
  routeLabel: string;
  costLabel: string;
  riskLabel: string;
  actionLabel: string;
  actionState: "ready" | "blocked";
  messages: UiMessage[];
};

export type QuestUiCard = {
  title: string;
  statusLabel: string;
  actionLabel: string;
  actionState: "available" | "ready" | "blocked" | "finished";
  messages: UiMessage[];
};

export type CompanyUiPanel = {
  title: string;
  cashLabel: string;
  netValueLabel: string;
  sharePriceLabel: string;
  weeklyCostLabel: string;
  actionState: "stable" | "warning";
  messages: UiMessage[];
};

function message(severity: UiSeverity, text: string): UiMessage {
  return { severity, text };
}

export function inventoryUiPanel(inventory: InventoryEntry[], items: Item[]): InventoryUiPanel {
  const wallet = walletSummary(inventory, items);
  const totals = inventoryTotals(inventory, items);
  const messages: UiMessage[] = [];

  if (!totals.canTravel) {
    if (totals.overWeight > 0) messages.push(message("blocked", `Over carry weight by ${totals.overWeight}.`));
    if (totals.overSize > 0) messages.push(message("blocked", `Over pull size by ${totals.overSize}.`));
  } else {
    messages.push(message("ok", "Cargo is within travel capacity."));
  }

  if (wallet.copperValue <= 0) messages.push(message("warning", "No visible coin reserve."));

  return {
    title: "Inventory",
    moneyLabel: formatMoney(wallet.copperValue, items),
    totalValueLabel: formatMoney(totals.value, items),
    nonCoinValueLabel: formatMoney(totals.nonCoinValue, items),
    visibleEntries: totals.visibleEntries,
    totalQuantity: totals.totalQuantity,
    capacityLabel: `${totals.weight}/${totals.carryCapacity} weight, ${totals.size}/${totals.sizeCapacity} size`,
    canTravel: totals.canTravel,
    messages,
  };
}

export function travelUiCard(plan: TravelPlan, items?: Item[]): TravelUiCard {
  const blocked = plan.blockers.length > 0;
  const messages = [
    ...plan.blockers.map((text) => message("blocked", text)),
    ...plan.warnings.map((text) => message("warning", text)),
  ];

  if (!messages.length) messages.push(message("ok", "Route is ready."));

  return {
    title: "Travel Plan",
    routeLabel: `${plan.fromMarketName} -> ${plan.toMarketName}`,
    costLabel: items ? formatMoney(plan.totalDueCopper, items) : `${plan.totalDueCopper}c`,
    riskLabel: plan.risk.level,
    actionLabel: blocked ? "Resolve blockers before travel" : "Travel",
    actionState: blocked ? "blocked" : "ready",
    messages,
  };
}

export function questUiCard(summary: QuestWorkSummary): QuestUiCard {
  const messages: UiMessage[] = [];
  if (summary.todo) messages.push(message("info", summary.todo));
  if (summary.deadline !== null) messages.push(message("info", `Deadline: day ${summary.deadline}.`));
  if (summary.requiredItems.length) messages.push(message("info", `Needs: ${summary.requiredItems.join(", ")}.`));

  const finished = summary.status === "finished" || summary.status === "failed";
  return {
    title: summary.name,
    statusLabel: summary.status,
    actionLabel: finished ? "Closed" : summary.canComplete ? "Complete" : "Track",
    actionState: finished ? "finished" : summary.canComplete ? "ready" : summary.status === "offered" ? "available" : "blocked",
    messages,
  };
}

export function companyUiPanel(company: CompanyLedger, items: Item[]): CompanyUiPanel {
  const valuation = companyValuation(company, items);
  const solvency = companySolvency(company, items);
  const messages: UiMessage[] = [];

  if (solvency.canPayNextWeek) messages.push(message("ok", solvency.summary));
  else messages.push(message("warning", `Company cannot cover next week's fixed costs (${formatMoney(solvency.weeklyCosts, items)}).`));

  if (company.shipments.some((shipment) => shipment.status === "in_transit")) messages.push(message("info", "Shipments are currently in transit."));
  if (company.warehouses.length <= 0) messages.push(message("info", "No warehouses owned yet."));

  return {
    title: company.name,
    cashLabel: formatMoney(valuation.cashCopper, items),
    netValueLabel: formatMoney(valuation.netValueCopper, items),
    sharePriceLabel: `${formatMoney(valuation.sharePriceCopper, items)} / share`,
    weeklyCostLabel: formatMoney(valuation.weeklyFixedCostCopper, items),
    actionState: solvency.canPayNextWeek ? "stable" : "warning",
    messages,
  };
}

export function actionChecklist(input: {
  inventory?: InventoryUiPanel;
  travel?: TravelUiCard;
  quests?: QuestUiCard[];
  company?: CompanyUiPanel;
}) {
  const items: string[] = [];

  if (input.inventory && !input.inventory.canTravel) items.push("Fix inventory capacity before travel.");
  if (input.travel?.actionState === "blocked") items.push("Resolve travel blockers before departure.");
  if (input.quests?.some((quest) => quest.actionState === "ready")) items.push("Complete ready quests before leaving the market.");
  if (input.company?.actionState === "warning") items.push("Add company cash or reduce fixed costs before the next week.");

  if (!items.length) items.push("No blocking UI actions detected.");
  return items;
}
