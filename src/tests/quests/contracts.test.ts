import { describe, expect, it } from "vitest";
import type { Item, Kingdom, Marketplace } from "@/shared/types/game-data";
import { completeContract, expireContracts, generatedContracts } from "@/game/quests/contracts";

const markets: Marketplace[] = [
  {
    index: 0,
    name: "Boone",
    kingdomIndex: 0,
    townsquareFile: "",
    backdropFile: "",
    stallage: 0,
    bias: [{ tag: "food", percent: 20 }],
    connections: [{ marketplaceIndex: 1, routeFile: "", travelDays: 3, tolls: 2 }],
  },
  {
    index: 1,
    name: "Kai",
    kingdomIndex: 1,
    townsquareFile: "",
    backdropFile: "",
    stallage: 0,
    connections: [],
  },
];

const kingdom: Kingdom = { index: 0, name: "Boone Kingdom", illegalItemTags: ["monster"] };

describe("contracts", () => {
  it("generates delivery, procurement, and smuggling contracts from market data", () => {
    const contracts = generatedContracts(markets[0], markets, kingdom);

    expect(contracts.map((contract) => contract.kind)).toEqual(["delivery", "procurement", "smuggling"]);
    expect(contracts[0]).toMatchObject({ title: "Courier run to Kai", rewardCopper: 42, daysLimit: 5 });
    expect(contracts[1].detail).toContain("food");
    expect(contracts[2]).toMatchObject({ risk: "high" });
  });

  it("validates destination and rewards delivery completion", () => {
    const contract = generatedContracts(markets[0], markets, kingdom)[0];
    const coin = { index: 0, name: "copper coins", tags: ["coins"], loafValue: 1, size: 0, weight: 0, kingdomIndex: null } satisfies Item;
    const inventory = [{ itemIndex: 0, quantity: 2, offerQuantity: 0 }];

    expect(completeContract({
      contract,
      status: "accepted",
      acceptedDay: 2,
      currentDay: 4,
      currentMarketIndex: 0,
      inventory,
      items: [coin],
    }).ok).toBe(false);

    const result = completeContract({
      contract,
      status: "accepted",
      acceptedDay: 2,
      currentDay: 4,
      currentMarketIndex: 1,
      inventory,
      items: [coin],
    });

    expect(result.ok).toBe(true);
    expect(inventory[0].quantity).toBe(44);
  });

  it("requires and consumes concealed smuggling cargo", () => {
    const contract = generatedContracts(markets[0], markets, kingdom).find((entry) => entry.kind === "smuggling")!;
    const contraband = { index: 0, name: "Monster Tooth", tags: ["monster"], loafValue: 20, size: 1, weight: 1, kingdomIndex: null } satisfies Item;
    const coin = { index: 1, name: "copper coins", tags: ["coins"], loafValue: 1, size: 0, weight: 0, kingdomIndex: null } satisfies Item;
    const inventory = [{ itemIndex: 0, quantity: 1, offerQuantity: 0, conceal: true }];

    const result = completeContract({
      contract,
      status: "accepted",
      acceptedDay: 1,
      currentDay: 2,
      currentMarketIndex: 0,
      inventory,
      items: [contraband, coin],
    });

    expect(result.ok).toBe(true);
    expect(inventory).toEqual([{ itemIndex: 1, quantity: 90, offerQuantity: 0, conceal: false }]);
  });

  it("fails accepted contracts after their deadline", () => {
    const contract = generatedContracts(markets[0], markets, kingdom)[0];
    const states = { [contract.id]: "accepted" as const };

    const expired = expireContracts({
      states,
      acceptedDays: { [contract.id]: 1 },
      currentDay: 7,
      markets,
      kingdoms: [kingdom, { index: 1, name: "Kai Kingdom" }],
    });

    expect(expired).toHaveLength(1);
    expect(states[contract.id]).toBe("failed");
  });
});
