import { describe, expect, it } from "vitest";
import type { InventoryEntry, Item, Marketplace } from "@/data/types";
import { questCanComplete, questItemProgress, questReward, questRewardCopper } from "./quests";

const items: Item[] = [
  { index: 0, name: "Juggernaut", iconFile: "juggernaut.png", tags: ["livestock"], loafValue: 100, size: 10, weight: 10, kingdomIndex: 0 },
  { index: 1, name: "Blue Gem", iconFile: "blue_gem.png", tags: ["gems"], loafValue: 50, size: 1, weight: 1, kingdomIndex: 0 },
];

function market(questItems: string[], reward?: number): Marketplace {
  return {
    index: 3,
    name: "Quest Market",
    kingdomIndex: 0,
    townsquareFile: "",
    backdropFile: "",
    stallage: 0,
    quest: {
      name: "Test Quest",
      questItems,
      data: reward === undefined ? {} : { reward },
    },
    connections: [],
  };
}

describe("quests", () => {
  it("matches required quest tokens by item name or icon filename", () => {
    const inventory: InventoryEntry[] = [{ itemIndex: 0, quantity: 1, offerQuantity: 0 }];
    const progress = questItemProgress(market(["juggernaut"]), inventory, items);

    expect(progress).toEqual([{ token: "juggernaut", held: 1, complete: true }]);
    expect(questCanComplete(market(["juggernaut"]), inventory, items)).toBe(true);
  });

  it("reports missing required items", () => {
    const inventory: InventoryEntry[] = [{ itemIndex: 1, quantity: 1, offerQuantity: 0 }];

    expect(questCanComplete(market(["juggernaut"]), inventory, items)).toBe(false);
  });

  it("allows no-item quests and computes copper rewards", () => {
    expect(questCanComplete(market([]), [], items)).toBe(true);
    expect(questRewardCopper(market([], 50))).toBe(200);
  });

  it("returns authored item rewards when reward item data is available", () => {
    const rewardMarket = market([], 50);
    rewardMarket.quest!.data = { reward: 50, rewardItemFilename: "blue_gem", rewardQuantity: 3 };

    expect(questReward(rewardMarket, items)).toEqual({
      copper: 200,
      items: [{ itemIndex: 1, quantity: 3 }],
    });
  });
});
