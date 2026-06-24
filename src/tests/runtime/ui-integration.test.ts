import { describe, expect, it } from "vitest";
import type { InventoryEntry, Item } from "@/shared/types/game-data";
import { createWarehouse, planShipment, type CompanyLedger } from "@/game/company/company";
import { actionChecklist, companyUiPanel, inventoryUiPanel, questUiCard, travelUiCard } from "@/game/vertical-slice/ui-integration";
import type { QuestWorkSummary } from "@/game/quests/quest-runtime";
import type { TravelPlan } from "@/game/travel/travel-loop";

const items = [
  { index: 0, name: "copper coins", tags: ["currency", "coins"], loafValue: 1, size: 0, weight: 0, kingdomIndex: null },
  { index: 1, name: "silver coins", tags: ["currency", "coins"], loafValue: 100, size: 0, weight: 0, kingdomIndex: null },
  { index: 2, name: "gold coins", tags: ["currency", "coins"], loafValue: 10000, size: 0, weight: 0, kingdomIndex: null },
  { index: 3, name: "iron ore", tags: ["ore", "raw_material"], loafValue: 8, size: 3, weight: 5, kingdomIndex: null },
] as Item[];

function inventory(entries: Array<Partial<InventoryEntry> & Pick<InventoryEntry, "itemIndex" | "quantity">>): InventoryEntry[] {
  return entries.map((entry) => ({ offerQuantity: 0, ...entry }));
}

function company(): CompanyLedger {
  return {
    name: "Six Kingdoms Trading Co.",
    cashCopper: 500,
    reputation: 1,
    influence: 1,
    authorizedShares: 1000,
    issuedShares: 100,
    warehouses: [],
    shipments: [],
    agents: [],
    shareholders: [{ id: "player", name: "Player", shares: 100 }],
  };
}

describe("UI integration view models", () => {
  it("summarizes inventory money, value, and capacity warnings", () => {
    const panel = inventoryUiPanel(inventory([{ itemIndex: 1, quantity: 2 }, { itemIndex: 3, quantity: 50 }]), items);
    expect(panel.moneyLabel).toBe("2s");
    expect(panel.totalValueLabel).toBe("6s");
    expect(panel.canTravel).toBe(false);
    expect(panel.messages.some((entry) => entry.severity === "blocked")).toBe(true);
  });

  it("converts travel plans into action cards", () => {
    const card = travelUiCard({
      fromMarketIndex: 0,
      toMarketIndex: 1,
      fromMarketName: "Harbor",
      toMarketName: "Capital",
      days: 2,
      tolls: 50,
      stallage: 25,
      totalDueCopper: 75,
      canPay: false,
      missingCopper: 10,
      cargo: {} as TravelPlan["cargo"],
      risk: { level: "high" } as TravelPlan["risk"],
      warnings: ["Inspection chance is high."],
      blockers: ["Missing 10 copper."],
      summary: "Harbor -> Capital",
    }, items);

    expect(card.routeLabel).toBe("Harbor -> Capital");
    expect(card.costLabel).toBe("75c");
    expect(card.actionState).toBe("blocked");
  });

  it("summarizes quest cards and ready actions", () => {
    const summary: QuestWorkSummary = {
      marketIndex: 2,
      name: "Bring Ore",
      status: "ready",
      canComplete: true,
      deadline: 5,
      requiredItems: ["ore"],
      todo: null,
    };

    const card = questUiCard(summary);
    expect(card.actionLabel).toBe("Complete");
    expect(card.actionState).toBe("ready");
  });

  it("summarizes company valuation and solvency", () => {
    const ledger = company();
    ledger.warehouses.push(createWarehouse({ id: "wh", name: "Warehouse", marketIndex: 0, capacityWeight: 100, capacitySize: 100, weeklyFeeCopper: 25, inventory: inventory([{ itemIndex: 3, quantity: 5 }]) }));
    ledger.shipments.push(planShipment({ id: "ship", fromMarketIndex: 0, toMarketIndex: 1, departDay: 1, travelDays: 2, cargo: inventory([{ itemIndex: 3, quantity: 3 }]), items }));

    const panel = companyUiPanel(ledger, items);
    expect(panel.title).toBe("Six Kingdoms Trading Co.");
    expect(panel.cashLabel).toBe("5s");
    expect(panel.actionState).toBe("stable");
    expect(panel.messages.some((entry) => entry.text.includes("Shipments"))).toBe(false);
  });

  it("builds a combined action checklist", () => {
    const inventoryPanel = inventoryUiPanel(inventory([{ itemIndex: 3, quantity: 50 }]), items);
    const questCard = questUiCard({ marketIndex: 2, name: "Bring Ore", status: "ready", canComplete: true, deadline: null, requiredItems: [], todo: null });
    const checks = actionChecklist({ inventory: inventoryPanel, quests: [questCard] });

    expect(checks).toContain("Fix inventory capacity before travel.");
    expect(checks).toContain("Complete ready quests before leaving the market.");
  });
});
