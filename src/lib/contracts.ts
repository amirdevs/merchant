import type { Kingdom, Marketplace } from "@/data/types";

export type ContractKind = "delivery" | "procurement" | "smuggling";

export type Contract = {
  id: string;
  kind: ContractKind;
  title: string;
  detail: string;
  rewardCopper: number;
  daysLimit: number;
  risk: "low" | "medium" | "high";
};

export type ContractStatus = "available" | "accepted" | "completed" | "failed";
export type ContractStates = Record<string, ContractStatus>;

export function generatedContracts(market: Marketplace, markets: Marketplace[], kingdom?: Kingdom): Contract[] {
  const deliveryContracts = market.connections.slice(0, 3).map((route) => {
    const destination = markets[route.marketplaceIndex];
    const risk = route.tolls > 5 || route.travelDays > 7 ? "medium" : "low";
    return {
      id: `${market.index}:delivery:${destination.index}`,
      kind: "delivery" as const,
      title: `Courier run to ${destination.name}`,
      detail: `Carry sealed papers from ${market.name} to ${destination.name}. ${route.travelDays} days, ${route.tolls} copper toll.`,
      rewardCopper: Math.max(20, route.travelDays * 12 + route.tolls * 3),
      daysLimit: Math.max(route.travelDays + 2, 3),
      risk,
    };
  });

  const demand = (market.bias || []).filter((bias) => bias.percent > 0).sort((left, right) => right.percent - left.percent)[0];
  const procurementContracts: Contract[] = demand ? [{
    id: `${market.index}:procurement:${demand.tag}`,
    kind: "procurement",
    title: `Procure ${demand.tag}`,
    detail: `${market.name} buyers are paying attention to ${demand.tag}. Bring any matching goods before prices cool.`,
    rewardCopper: Math.max(30, 20 + demand.percent * 2),
    daysLimit: 14,
    risk: "low",
  }] : [];

  const illegalTag = kingdom?.illegalItemTags?.[0];
  const smugglingContracts: Contract[] = illegalTag ? [{
    id: `${market.index}:smuggling:${illegalTag}`,
    kind: "smuggling",
    title: `Quiet buyer for ${illegalTag}`,
    detail: `A discreet buyer wants ${illegalTag}. Guards in ${kingdom?.name || market.name} may confiscate exposed cargo.`,
    rewardCopper: 90,
    daysLimit: 10,
    risk: "high",
  }] : [];

  return [...deliveryContracts, ...procurementContracts, ...smugglingContracts];
}
