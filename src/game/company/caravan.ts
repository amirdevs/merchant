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
  weather?: RouteWeather;
  roadQuality?: RouteRoadQuality;
  suppliesUsed?: number;
  moraleChange?: number;
  success: boolean;
  note?: string;
};

export type RouteWeather = "clear" | "windy" | "rain" | "fog" | "heat";
export type RouteRoadQuality = "good" | "worn" | "rough" | "dangerous";

export type CaravanState = {
  packhorseCondition: number;
  concealmentLevel: number;
  supplies: number;
  morale: number;
  routeHistory: RouteHistoryEntry[];
  routeMastery: Record<string, number>;
  bookmarkedRoutes: string[];
};

export function createCaravanState(): CaravanState {
  return {
    packhorseCondition: 100,
    concealmentLevel: 0,
    supplies: 12,
    morale: 70,
    routeHistory: [],
    routeMastery: {},
    bookmarkedRoutes: [],
  };
}

export function ensureCaravanState(caravan: CaravanState) {
  if (typeof caravan.packhorseCondition !== "number") caravan.packhorseCondition = 100;
  if (typeof caravan.concealmentLevel !== "number") caravan.concealmentLevel = 0;
  if (typeof caravan.supplies !== "number") caravan.supplies = 12;
  if (typeof caravan.morale !== "number") caravan.morale = 70;
  if (!Array.isArray(caravan.routeHistory)) caravan.routeHistory = [];
  if (!caravan.routeMastery || typeof caravan.routeMastery !== "object") caravan.routeMastery = {};
  if (!Array.isArray(caravan.bookmarkedRoutes)) caravan.bookmarkedRoutes = [];
  caravan.packhorseCondition = Math.max(0, Math.min(100, caravan.packhorseCondition));
  caravan.supplies = Math.max(0, Math.floor(caravan.supplies));
  caravan.morale = Math.max(0, Math.min(100, caravan.morale));
  return caravan;
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

function seededRouteValue(fromMarketIndex: number, toMarketIndex: number, day: number) {
  let value = ((fromMarketIndex + 1) * 73856093) ^ ((toMarketIndex + 1) * 19349663) ^ (day * 83492791);
  value >>>= 0;
  return ((value * 1664525 + 1013904223) >>> 0) / 4294967296;
}

export function routeTravelConditions(fromMarketIndex: number, toMarketIndex: number, day: number, days: number) {
  const roll = seededRouteValue(fromMarketIndex, toMarketIndex, day);
  const weather: RouteWeather = roll > 0.86 ? "heat" : roll > 0.7 ? "fog" : roll > 0.52 ? "rain" : roll > 0.34 ? "windy" : "clear";
  const roadRoll = seededRouteValue(toMarketIndex, fromMarketIndex, day + days);
  const roadQuality: RouteRoadQuality = roadRoll > 0.88 ? "dangerous" : roadRoll > 0.62 ? "rough" : roadRoll > 0.32 ? "worn" : "good";
  const weatherSupply = weather === "heat" ? 2 : weather === "rain" || weather === "fog" ? 1 : 0;
  const roadMorale = roadQuality === "dangerous" ? -8 : roadQuality === "rough" ? -5 : roadQuality === "worn" ? -2 : 1;
  const weatherMorale = weather === "clear" ? 2 : weather === "windy" ? -1 : weather === "heat" ? -4 : -3;
  return {
    weather,
    roadQuality,
    suppliesNeeded: Math.max(1, days) * 2 + weatherSupply,
    moraleChange: roadMorale + weatherMorale,
    wearBonus: (roadQuality === "dangerous" ? 4 : roadQuality === "rough" ? 2 : 0) + (weather === "rain" ? 1 : weather === "heat" ? 2 : 0),
  };
}

export function applyTravelConditions(caravan: CaravanState, conditions: ReturnType<typeof routeTravelConditions>) {
  ensureCaravanState(caravan);
  const suppliesUsed = Math.min(caravan.supplies, conditions.suppliesNeeded);
  const shortage = conditions.suppliesNeeded - suppliesUsed;
  caravan.supplies -= suppliesUsed;
  caravan.morale = Math.max(0, Math.min(100, caravan.morale + conditions.moraleChange - shortage * 6));
  return { suppliesUsed, shortage, moraleChange: conditions.moraleChange - shortage * 6 };
}

export function recordRoute(caravan: CaravanState, entry: RouteHistoryEntry) {
  caravan.routeHistory = [entry, ...caravan.routeHistory].slice(0, 100);
  if (entry.success) {
    const key = routeKey(entry.fromMarketIndex, entry.toMarketIndex);
    caravan.routeMastery[key] = (caravan.routeMastery[key] || 0) + 1;
  }
}

export function setRouteNote(caravan: CaravanState, routeId: string, note: string) {
  const entry = caravan.routeHistory.find((route) => route.id === routeId);
  if (!entry) return false;
  entry.note = note.slice(0, 240);
  return true;
}

export function routeProfitSummary(caravan: CaravanState, fromMarketIndex: number, toMarketIndex: number) {
  const matches = caravan.routeHistory.filter((entry) => entry.fromMarketIndex === fromMarketIndex && entry.toMarketIndex === toMarketIndex);
  if (!matches.length) return null;
  const totals = matches.reduce(
    (summary, entry) => {
      summary.trips += 1;
      summary.cost += entry.tolls + entry.stallage;
      summary.cargoValue += entry.cargoValue;
      summary.incidents += entry.incidents.length;
      return summary;
    },
    { trips: 0, cost: 0, cargoValue: 0, incidents: 0 }
  );
  return {
    trips: totals.trips,
    averageCost: Math.round(totals.cost / totals.trips),
    averageCargoValue: Math.round(totals.cargoValue / totals.trips),
    averageNetExposure: Math.round((totals.cargoValue - totals.cost) / totals.trips),
    incidentRate: Math.round((totals.incidents / totals.trips) * 100),
  };
}

export function applyPackhorseTravelWear(caravan: CaravanState, packAnimals: number, days: number, overloaded: boolean, extraWear = 0) {
  if (packAnimals <= 0) return 0;
  ensureCaravanState(caravan);
  const moraleWear = caravan.morale < 25 ? 2 : 0;
  const wear = Math.max(1, Math.ceil(days / 2) + (overloaded ? 8 : 0) + Math.max(0, Math.floor(extraWear)) + moraleWear);
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
