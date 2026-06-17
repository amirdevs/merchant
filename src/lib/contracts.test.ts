import { describe, expect, it } from "vitest";
import type { Kingdom, Marketplace } from "@/data/types";
import { generatedContracts } from "./contracts";

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
});
