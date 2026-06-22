import { describe, expect, it } from "vitest";
import type { InventoryEntry, Item, Marketplace } from "../data/types";
import {
  applyQuestTransactions,
  completeLocalQuest,
  dialogueChoiceTransactions,
  questStatus,
  summarizeQuestWork,
  type QuestRuntimeState,
} from "./quest-runtime";

function item(index: number, name: string, tags: string[], loafValue = 1): Item {
  return {
    index,
    name,
    tags,
    loafValue,
    size: 1,
    weight: 1,
    kingdomIndex: null,
  };
}

function market(index: number, questItems: string[] = ["spice"]): Marketplace {
  return {
    index,
    name: `Market ${index}`,
    kingdomIndex: 0,
    townsquareFile: "town.png",
    backdropFile: "backdrop.png",
    stallage: 4,
    connections: [],
    quest: {
      name: "Spice Request",
      todo: "Bring spice to the notice board.",
      questItems,
      data: { reward: 12 },
    },
  };
}

const items = [
  item(0, "copper coins", ["currency", "coins"]),
  item(1, "pepper", ["spice", "food"]),
  item(2, "silver key", ["key"]),
];

function state(inventory: InventoryEntry[] = []): QuestRuntimeState {
  return {
    day: 5,
    marketIndex: 0,
    inventory,
    questStates: {},
    questAcceptedDays: {},
    contractStates: {},
    contractAcceptedDays: {},
    unlockedMarketIndexes: [],
    dialogueLog: [],
  };
}

describe("quest runtime", () => {
  it("accepts a local quest from a dialogue effect", () => {
    const localMarket = market(3);
    const transactions = dialogueChoiceTransactions(
      { effect: "accept-local-quest", label: "Tell me about work.", reply: "Bring spice." },
      { market: localMarket, day: 5 }
    );
    const result = applyQuestTransactions(state(), transactions, { items });
    expect(result.ok).toBe(true);
    expect(result.state.questStates["3"]).toBe("accepted");
    expect(result.state.questAcceptedDays["3"]).toBe(5);
    expect(result.state.dialogueLog?.[0].topic).toBe("Tell me about work.");
  });

  it("completes a local quest by consuming required goods and paying reward", () => {
    const inventory: InventoryEntry[] = [{ itemIndex: 1, quantity: 2, offerQuantity: 0 }];
    const localState = state(inventory);
    localState.questStates["1"] = "accepted";
    localState.questAcceptedDays["1"] = 2;

    const result = completeLocalQuest({ state: localState, market: market(1), items });
    expect(result.ok).toBe(true);
    expect(result.state.questStates["1"]).toBe("finished");
    expect(result.state.inventory.find((entry) => entry.itemIndex === 1)?.quantity).toBe(1);
    expect(result.state.inventory.find((entry) => entry.itemIndex === 0)?.quantity).toBeGreaterThan(0);
  });

  it("does not consume offered quantities when removing quest items", () => {
    const localState = state([{ itemIndex: 1, quantity: 2, offerQuantity: 1 }]);
    const result = applyQuestTransactions(localState, [{ type: "removeInventoryByToken", token: "spice", quantity: 1 }], { items });
    expect(result.ok).toBe(true);
    expect(result.state.inventory[0]).toEqual({ itemIndex: 1, quantity: 1, offerQuantity: 1 });
  });

  it("summarizes quest board work", () => {
    const localState = state([{ itemIndex: 1, quantity: 1, offerQuantity: 0 }]);
    localState.questStates["4"] = "accepted";
    localState.questAcceptedDays["4"] = 5;
    const [summary] = summarizeQuestWork({ markets: [market(4)], state: localState, items });
    expect(summary.status).toBe("accepted");
    expect(summary.canComplete).toBe(true);
    expect(summary.requiredItems).toEqual(["spice"]);
  });

  it("unlocks markets and accepts contracts through typed transactions", () => {
    const result = applyQuestTransactions(
      state(),
      [
        { type: "unlockMarket", marketIndex: 7 },
        { type: "acceptContract", contractId: "0:delivery:7", day: 5 },
      ],
      { items }
    );
    expect(result.ok).toBe(true);
    expect(result.state.unlockedMarketIndexes).toContain(7);
    expect(result.state.contractStates?.["0:delivery:7"]).toBe("accepted");
    expect(result.state.contractAcceptedDays?.["0:delivery:7"]).toBe(5);
  });

  it("reports status consistently", () => {
    const localState = state();
    expect(questStatus(localState, 9)).toBe("offered");
  });
});
