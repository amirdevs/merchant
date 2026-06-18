export type RouteHistoryEntry = {
  id: string;
  dayDeparted: number;
  dayArrived: number;
  fromMarketIndex: number;
  toMarketIndex: number;
  days: number;
  tolls: number;
  stallage: number;
  strategy: "comply" | "bribe" | "evade";
  cargoValue: number;
  incidents: string[];
  success: boolean;
};

export type CaravanState = {
  packhorseCondition: number;
  concealmentLevel: number;
  routeHistory: RouteHistoryEntry[];
  routeMastery: Record<string, number>;
  bookmarkedRoutes: string[];
};

export function createCaravanState(): CaravanState {
  return {
    packhorseCondition: 100,
    concealmentLevel: 0,
    routeHistory: [],
    routeMastery: {},
    bookmarkedRoutes: [],
  };
}

export function routeKey(fromMarketIndex: number, toMarketIndex: number) {
  return `${fromMarketIndex}:${toMarketIndex}`;
}

export function routeMasteryLevel(trips: number) {
  if (trips >= 12) return 3;
  if (trips >= 6) return 2;
  if (trips >= 3) return 1;
  return 0;
}

export function masteryRiskReduction(trips: number) {
  return routeMasteryLevel(trips) * 5;
}

export function recordRoute(caravan: CaravanState, entry: RouteHistoryEntry) {
  caravan.routeHistory = [entry, ...caravan.routeHistory].slice(0, 100);
  if (entry.success) {
    const key = routeKey(entry.fromMarketIndex, entry.toMarketIndex);
    caravan.routeMastery[key] = (caravan.routeMastery[key] || 0) + 1;
  }
}

export function applyPackhorseTravelWear(caravan: CaravanState, packAnimals: number, days: number, overloaded: boolean) {
  if (packAnimals <= 0) return 0;
  const wear = Math.max(1, Math.ceil(days / 2) + (overloaded ? 8 : 0));
  caravan.packhorseCondition = Math.max(0, caravan.packhorseCondition - wear);
  return wear;
}

export function repairPackhorses(caravan: CaravanState, amount: number) {
  const safeAmount = Math.max(0, Math.floor(amount));
  const repaired = Math.min(100 - caravan.packhorseCondition, safeAmount);
  caravan.packhorseCondition += repaired;
  return repaired;
}

export function upgradeConcealment(caravan: CaravanState) {
  if (caravan.concealmentLevel >= 3) return false;
  caravan.concealmentLevel += 1;
  return true;
}

export function toggleRouteBookmark(caravan: CaravanState, fromMarketIndex: number, toMarketIndex: number) {
  const key = routeKey(fromMarketIndex, toMarketIndex);
  const index = caravan.bookmarkedRoutes.indexOf(key);
  if (index >= 0) caravan.bookmarkedRoutes.splice(index, 1);
  else caravan.bookmarkedRoutes.push(key);
  return index < 0;
}
