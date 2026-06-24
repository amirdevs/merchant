import type { InventoryEntry, Item, Kingdom, Marketplace } from "@/shared/types/game-data";
import { itemMatchesCatalogToken } from "@/game/trade/item-catalog";
import { addInventory, visibleQuantity } from "@/game/trade/inventory";

export type ContractKind = "delivery" | "procurement" | "smuggling" | "race" | "auction" | "rumor";

export type Contract = {
  id: string;
  originMarketIndex: number;
  kind: ContractKind;
  title: string;
  detail: string;
  rewardCopper: number;
  failurePenaltyCopper: number;
  daysLimit: number;
  risk: "low" | "medium" | "high";
  destinationMarketIndex?: number;
  requiredTag?: string;
  requiredQuantity?: number;
  requiresConcealment?: boolean;
};

export type ContractStatus = "available" | "accepted" | "completed" | "failed";
export type ContractStates = Record<string, ContractStatus>;
export type ContractAcceptedDays = Record<string, number>;

function itemMatchesTag(item: Item, tag: string) {
  return itemMatchesCatalogToken(item, tag);
}

export function generatedContracts(market: Marketplace, markets: Marketplace[], kingdom?: Kingdom): Contract[] {
  const deliveryContracts = market.connections.slice(0, 3).map((route) => {
    const destination = markets[route.marketplaceIndex];
    const risk = route.tolls > 5 || route.travelDays > 7 ? "medium" : "low";
    return {
      id: `${market.index}:delivery:${destination.index}`,
      originMarketIndex: market.index,
      kind: "delivery" as const,
      title: `Courier run to ${destination.name}`,
      detail: `Carry sealed papers from ${market.name} to ${destination.name}. ${route.travelDays} days, ${route.tolls} copper toll.`,
      rewardCopper: Math.max(20, route.travelDays * 12 + route.tolls * 3),
      failurePenaltyCopper: Math.max(5, route.tolls * 2),
      daysLimit: Math.max(route.travelDays + 2, 3),
      risk,
      destinationMarketIndex: destination.index,
    };
  });

  const demand = (market.bias || []).filter((bias) => bias.percent > 0).sort((left, right) => right.percent - left.percent)[0];
  const procurementContracts: Contract[] = demand ? [{
    id: `${market.index}:procurement:${demand.tag}`,
    originMarketIndex: market.index,
    kind: "procurement",
    title: `Procure ${demand.tag}`,
    detail: `${market.name} buyers need 3 units of ${demand.tag}. Return before prices cool; delivered goods are consumed.`,
    rewardCopper: Math.max(30, 20 + demand.percent * 2),
    failurePenaltyCopper: 10,
    daysLimit: 14,
    risk: "low",
    requiredTag: demand.tag,
    requiredQuantity: 3,
    destinationMarketIndex: market.index,
  }] : [];

  const illegalTag = kingdom?.illegalItemTags?.[0];
  const smugglingContracts: Contract[] = illegalTag ? [{
    id: `${market.index}:smuggling:${illegalTag}`,
    originMarketIndex: market.index,
    kind: "smuggling",
    title: `Quiet buyer for ${illegalTag}`,
    detail: `A discreet buyer wants 1 concealed unit of ${illegalTag}. Return without exposing it to guards.`,
    rewardCopper: 90,
    failurePenaltyCopper: 25,
    daysLimit: 10,
    risk: "high",
    requiredTag: illegalTag,
    requiredQuantity: 1,
    requiresConcealment: true,
    destinationMarketIndex: market.index,
  }] : [];

  const eventContracts: Contract[] = market.event?.name ? [{
    id: `${market.index}:rumor:${market.event.name}`,
    originMarketIndex: market.index,
    kind: "rumor",
    title: `Observe ${market.event.name}`,
    detail: `Attend ${market.event.name} in ${market.name} and return with a reliable market report.`,
    rewardCopper: 45,
    failurePenaltyCopper: 10,
    daysLimit: 21,
    risk: "low",
    destinationMarketIndex: market.index,
  }] : [];

  return [...deliveryContracts, ...procurementContracts, ...smugglingContracts, ...eventContracts];
}

export function resolveContract(contractId: string, markets: Marketplace[], kingdoms: Kingdom[]) {
  const originMarketIndex = Number(contractId.split(":")[0]);
  const market = markets[originMarketIndex];
  if (!market) return null;
  return generatedContracts(market, markets, kingdoms[market.kingdomIndex]).find((contract) => contract.id === contractId) || null;
}

export function contractDeadline(contract: Contract, acceptedDay: number | undefined) {
  return acceptedDay === undefined ? null : acceptedDay + contract.daysLimit;
}

export function contractItemProgress(contract: Contract, inventory: InventoryEntry[], items: Item[]) {
  if (!contract.requiredTag) return { held: 0, concealed: 0, required: 0 };
  return inventory.reduce(
    (progress, entry) => {
      const item = items[entry.itemIndex];
      if (!item || !itemMatchesTag(item, contract.requiredTag!)) return progress;
      const quantity = visibleQuantity(entry);
      progress.held += quantity;
      if (entry.conceal) progress.concealed += quantity;
      return progress;
    },
    { held: 0, concealed: 0, required: contract.requiredQuantity || 1 }
  );
}

function consumeContractItems(contract: Contract, inventory: InventoryEntry[], items: Item[]) {
  let remaining = contract.requiredQuantity || 0;
  if (!contract.requiredTag || remaining <= 0) return;
  for (const entry of inventory) {
    if (remaining <= 0) break;
    const item = items[entry.itemIndex];
    if (!item || !itemMatchesTag(item, contract.requiredTag)) continue;
    if (contract.requiresConcealment && !entry.conceal) continue;
    const taken = Math.min(visibleQuantity(entry), remaining);
    entry.quantity -= taken;
    entry.offerQuantity = Math.min(entry.offerQuantity, entry.quantity);
    remaining -= taken;
  }
  for (let index = inventory.length - 1; index >= 0; index--) {
    if (inventory[index].quantity <= 0) inventory.splice(index, 1);
  }
}

export function completeContract(options: {
  contract: Contract;
  status: ContractStatus;
  acceptedDay: number | undefined;
  currentDay: number;
  currentMarketIndex: number;
  inventory: InventoryEntry[];
  items: Item[];
}) {
  const { contract, status, acceptedDay, currentDay, currentMarketIndex, inventory, items } = options;
  if (status !== "accepted" || acceptedDay === undefined) return { ok: false, message: "Accept the contract before trying to complete it." };
  const deadline = contractDeadline(contract, acceptedDay)!;
  if (currentDay > deadline) return { ok: false, expired: true, message: `${contract.title} expired on day ${deadline}.` };
  if (contract.destinationMarketIndex !== undefined && currentMarketIndex !== contract.destinationMarketIndex) {
    return { ok: false, message: `Travel to the required market before completing ${contract.title}.` };
  }

  const progress = contractItemProgress(contract, inventory, items);
  const available = contract.requiresConcealment ? progress.concealed : progress.held;
  if (progress.required > 0 && available < progress.required) {
    const concealText = contract.requiresConcealment ? " concealed" : "";
    return { ok: false, message: `${contract.title} requires ${progress.required}${concealText} ${contract.requiredTag}; you have ${available}.` };
  }

  consumeContractItems(contract, inventory, items);
  const copper = items.find((item) => item.name.toLowerCase() === "copper coins");
  if (copper) addInventory(inventory, copper.index, contract.rewardCopper);
  return { ok: true, rewardCopper: contract.rewardCopper, message: `${contract.title} completed. Reward: ${contract.rewardCopper} copper.` };
}

export function expireContracts(options: {
  states: ContractStates;
  acceptedDays: ContractAcceptedDays;
  currentDay: number;
  markets: Marketplace[];
  kingdoms: Kingdom[];
}) {
  const expired: Contract[] = [];
  for (const [contractId, status] of Object.entries(options.states)) {
    if (status !== "accepted") continue;
    const contract = resolveContract(contractId, options.markets, options.kingdoms);
    const acceptedDay = options.acceptedDays[contractId];
    if (contract && acceptedDay !== undefined && options.currentDay > acceptedDay + contract.daysLimit) {
      options.states[contractId] = "failed";
      expired.push(contract);
    }
  }
  return expired;
}
