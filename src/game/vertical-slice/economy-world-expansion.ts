import {
  LOOP_ITEMS,
  LOOP_ROUTES,
  LOOP_TOWNS,
  bestLoopTradeRoutes,
  ensurePlayableMerchantLoopState,
  loopPrice,
  type LoopItemId,
  type LoopRoute,
  type LoopTownId,
  type PlayableMerchantLoopState,
} from "@/game/vertical-slice/playable-merchant-loop";

export type EconomyTownId = LoopTownId | "appleford-orchard" | "glassmere-court" | "wolfhook-bay";
export type EconomyItemId =
  | LoopItemId
  | "orchard-apples"
  | "smoked-eel"
  | "blue-dye"
  | "brass-gears"
  | "market-charms"
  | "sealed-contracts"
  | "waxed-canvas"
  | "amber-beads"
  | "hearth-coal"
  | "glass-vials"
  | "festival-ribbons"
  | "caravan-rope";

export type EconomyTrend = "shortage" | "tight" | "stable" | "surplus" | "opportunity";
export type EconomyTone = "safe" | "watch" | "risk" | "opportunity";
export type EconomyUpgradeStatus = "locked" | "available" | "active";

export type EconomyTradeItem = {
  id: EconomyItemId;
  loopItemId?: LoopItemId;
  name: string;
  family: "food" | "staple" | "craft" | "document" | "tool" | "luxury" | "company";
  tier: "starter" | "regional" | "company";
  storyUse: string;
};

export type EconomyTownProfile = {
  id: EconomyTownId;
  name: string;
  role: string;
  tradeIdentity: string;
  pressure: string;
  connectedTownIds: EconomyTownId[];
  npcPersonalityMix: string[];
};

export type EconomyStockProfile = {
  townId: EconomyTownId;
  itemId: EconomyItemId;
  baseStock: number;
  demand: number;
  supply: number;
  basePrice: number;
  story: string;
};

export type EconomyStockView = EconomyStockProfile & {
  itemName: string;
  currentStock: number;
  dynamicPrice: number;
  trend: EconomyTrend;
  tone: EconomyTone;
};

export type EconomyRouteEventView = {
  routeId: string;
  from: string;
  to: string;
  days: number;
  travelCost: number;
  baseRisk: number;
  currentRisk: number;
  event: string;
  tone: EconomyTone;
};

export type EconomyCompanyUpgrade = {
  id: string;
  name: string;
  status: EconomyUpgradeStatus;
  requirement: string;
  effect: string;
};

export type EconomyWorldExpansionView = {
  title: string;
  day: number;
  currentTown: EconomyTownProfile;
  tunedItems: EconomyTradeItem[];
  currentTownStocks: EconomyStockView[];
  bestTradeRoutes: ReturnType<typeof bestLoopTradeRoutes>;
  routeEvents: EconomyRouteEventView[];
  companyUpgrades: EconomyCompanyUpgrade[];
  playableQuestSeeds: string[];
  worldReadinessScore: number;
  readinessLabel: string;
  nextRecommendedExpansion: string;
};

export const ECONOMY_TRADE_ITEMS: EconomyTradeItem[] = [
  { id: "coastal-salt", loopItemId: "coastal-salt", name: "Coastal Salt", family: "staple", tier: "starter", storyUse: "first readable buy-low/sell-high route from harbor sheds to inland food towns" },
  { id: "mill-flour", loopItemId: "mill-flour", name: "Mill Flour", family: "food", tier: "starter", storyUse: "core shortage item for Bread Before Dawn and worker contracts" },
  { id: "lamp-oil", loopItemId: "lamp-oil", name: "Lamp Oil", family: "craft", tier: "starter", storyUse: "keeps night bakeries, toll offices, and warehouse inspections open" },
  { id: "dyed-wool", loopItemId: "dyed-wool", name: "Dyed Wool", family: "craft", tier: "starter", storyUse: "first festival/luxury good with visible demand spikes" },
  { id: "ledger-paper", loopItemId: "ledger-paper", name: "Ledger Paper", family: "document", tier: "company", storyUse: "company registration, clerk hiring, and contract-paper pressure" },
  { id: "iron-nails", loopItemId: "iron-nails", name: "Iron Nails", family: "tool", tier: "company", storyUse: "warehouse repairs, caravan crates, and route infrastructure" },
  { id: "orchard-apples", name: "Orchard Apples", family: "food", tier: "regional", storyUse: "cheap seasonal food from Appleford, fragile but good during city festivals" },
  { id: "smoked-eel", name: "Smoked Eel", family: "food", tier: "regional", storyUse: "coastal preserved food that feeds road crews and hungry guard posts" },
  { id: "blue-dye", name: "Blue Dye", family: "luxury", tier: "regional", storyUse: "high-margin textile input for nobles, guild banners, and masquerade markets" },
  { id: "brass-gears", name: "Brass Gears", family: "tool", tier: "company", storyUse: "warehouse lifts, mill clocks, caravan scales, and appraiser tools" },
  { id: "market-charms", name: "Market Charms", family: "luxury", tier: "regional", storyUse: "small magical trinkets that sell well when fear or hope is high" },
  { id: "sealed-contracts", name: "Sealed Contracts", family: "document", tier: "company", storyUse: "company-grade paperwork used by clerks, guildmasters, and rival brokers" },
  { id: "waxed-canvas", name: "Waxed Canvas", family: "craft", tier: "regional", storyUse: "keeps cargo dry on wet roads and during harbor storms" },
  { id: "amber-beads", name: "Amber Beads", family: "luxury", tier: "regional", storyUse: "small luxury good for shrine towns, nobles, and gift-based quests" },
  { id: "hearth-coal", name: "Hearth Coal", family: "staple", tier: "regional", storyUse: "winter pressure item that drives city survival and bakery costs" },
  { id: "glass-vials", name: "Glass Vials", family: "craft", tier: "regional", storyUse: "alchemist and healer supply route for richer side quests" },
  { id: "festival-ribbons", name: "Festival Ribbons", family: "luxury", tier: "regional", storyUse: "low-weight festival good that teaches timing and event demand" },
  { id: "caravan-rope", name: "Caravan Rope", family: "tool", tier: "company", storyUse: "company logistics item for route safety, caravans, and warehouse work" },
];

export const ECONOMY_TOWN_PROFILES: EconomyTownProfile[] = [
  {
    id: "sunwake-harbor",
    name: "Sunwake Harbor",
    role: "starting port market",
    tradeIdentity: "salt sheds, fish bells, paper clerks, and small honest margins",
    pressure: "Harbor stock is abundant, but small traders are squeezed by dock fees and guild paper costs.",
    connectedTownIds: ["riverwake-mill", "brasskeep-gate", "wolfhook-bay"],
    npcPersonalityMix: ["fair appraisers", "fast dock brokers", "quiet smugglers", "paper clerks"],
  },
  {
    id: "riverwake-mill",
    name: "Riverwake Mill",
    role: "food and craft town",
    tradeIdentity: "flour, ovens, work crews, and practical shortage relief",
    pressure: "The town has cheap flour, but every bakery crisis makes salt, oil, and coal suddenly matter.",
    connectedTownIds: ["sunwake-harbor", "brasskeep-gate", "appleford-orchard"],
    npcPersonalityMix: ["worried bakers", "mill accountants", "worker guild contacts", "honest haulers"],
  },
  {
    id: "brasskeep-gate",
    name: "Brasskeep Gate",
    role: "company and warehouse checkpoint",
    tradeIdentity: "contracts, toll seals, iron tools, and warehouse politics",
    pressure: "Everything here is more expensive, but company access and route permissions make the market powerful.",
    connectedTownIds: ["sunwake-harbor", "riverwake-mill", "glassmere-court"],
    npcPersonalityMix: ["strict toll clerks", "warehouse factors", "rival brokers", "guild inspectors"],
  },
  {
    id: "appleford-orchard",
    name: "Appleford Orchard",
    role: "planned food-side expansion town",
    tradeIdentity: "apples, cider barrels, waxed canvas, and seasonal food gluts",
    pressure: "Seasonal abundance creates low prices, but roads and spoilage punish greedy timing.",
    connectedTownIds: ["riverwake-mill"],
    npcPersonalityMix: ["seasonal farmers", "cider sellers", "route scouts"],
  },
  {
    id: "glassmere-court",
    name: "Glassmere Court",
    role: "planned luxury and document expansion town",
    tradeIdentity: "glass vials, market charms, sealed contracts, noble demand, and legal heat",
    pressure: "The court pays well, but every profitable sale is watched by rivals and tax clerks.",
    connectedTownIds: ["brasskeep-gate"],
    npcPersonalityMix: ["noble buyers", "legal scribes", "charm sellers", "fence informants"],
  },
  {
    id: "wolfhook-bay",
    name: "Wolfhook Bay",
    role: "planned risky coastal expansion town",
    tradeIdentity: "smoked eel, wet-road canvas, amber beads, and high-risk maritime rumors",
    pressure: "Profits are good, but storms and shadow deals raise risk quickly.",
    connectedTownIds: ["sunwake-harbor"],
    npcPersonalityMix: ["storm captains", "fishmongers", "shadow brokers", "risk-hungry traders"],
  },
];

export const ECONOMY_STOCK_PROFILES: EconomyStockProfile[] = [
  { townId: "sunwake-harbor", itemId: "coastal-salt", baseStock: 80, demand: 34, supply: 92, basePrice: 8, story: "Salt piles high at the docks, but inland curers keep the trade moving." },
  { townId: "sunwake-harbor", itemId: "ledger-paper", baseStock: 55, demand: 44, supply: 70, basePrice: 7, story: "Paper clerks sell cheap until company registrations spike." },
  { townId: "sunwake-harbor", itemId: "lamp-oil", baseStock: 46, demand: 58, supply: 56, basePrice: 9, story: "Night dock work keeps oil moving even when other crafts slow down." },
  { townId: "sunwake-harbor", itemId: "smoked-eel", baseStock: 62, demand: 40, supply: 78, basePrice: 10, story: "Preserved fish is common by the sea and useful on inland roads." },
  { townId: "riverwake-mill", itemId: "mill-flour", baseStock: 86, demand: 52, supply: 95, basePrice: 6, story: "Flour is cheap here until a missing shipment turns ovens cold." },
  { townId: "riverwake-mill", itemId: "coastal-salt", baseStock: 28, demand: 78, supply: 34, basePrice: 14, story: "Meat-curers, tanners, and bakers all bid against each other for salt." },
  { townId: "riverwake-mill", itemId: "lamp-oil", baseStock: 35, demand: 64, supply: 42, basePrice: 12, story: "Night baking and warehouse checks make oil tight but readable." },
  { townId: "riverwake-mill", itemId: "hearth-coal", baseStock: 30, demand: 70, supply: 36, basePrice: 13, story: "Coal prices climb whenever ovens and worker dormitories run late." },
  { townId: "brasskeep-gate", itemId: "iron-nails", baseStock: 72, demand: 50, supply: 86, basePrice: 8, story: "Gate workshops overproduce nails for crates, wagons, and warehouse repairs." },
  { townId: "brasskeep-gate", itemId: "ledger-paper", baseStock: 24, demand: 74, supply: 38, basePrice: 15, story: "Every company petition and toll appeal burns through paper." },
  { townId: "brasskeep-gate", itemId: "dyed-wool", baseStock: 20, demand: 78, supply: 28, basePrice: 24, story: "Guild banners and court uniforms make dyed wool a visible luxury route." },
  { townId: "brasskeep-gate", itemId: "sealed-contracts", baseStock: 18, demand: 82, supply: 30, basePrice: 22, story: "Sealed contracts are scarce because every clerk wants priority." },
  { townId: "appleford-orchard", itemId: "orchard-apples", baseStock: 110, demand: 38, supply: 100, basePrice: 5, story: "A seasonal glut teaches players to move cheap food before it spoils." },
  { townId: "glassmere-court", itemId: "glass-vials", baseStock: 34, demand: 76, supply: 42, basePrice: 18, story: "Healers and alchemists compete with noble collectors for clear glass." },
  { townId: "wolfhook-bay", itemId: "waxed-canvas", baseStock: 48, demand: 70, supply: 58, basePrice: 16, story: "Storm roads make dry cargo covers more valuable than they look." },
];

export const PLAYABLE_EXPANSION_QUEST_SEEDS = [
  "side-02-the-burned-oven",
  "side-03-a-contract-of-crumbs",
  "main-06-the-road-tax",
  "main-07-salt-before-rainfall",
  "main-08-three-seals-on-one-crate",
  "main-12-a-friend-in-the-auction-house",
  "main-17-the-first-clerk",
  "main-19-caravan-papers",
];

function itemName(itemId: EconomyItemId) {
  return ECONOMY_TRADE_ITEMS.find((item) => item.id === itemId)?.name || itemId;
}

function townProfile(townId: EconomyTownId) {
  const town = ECONOMY_TOWN_PROFILES.find((entry) => entry.id === townId);
  if (!town) throw new Error(`Unknown economy town profile: ${townId}`);
  return town;
}

function loopTownId(value: EconomyTownId): value is LoopTownId {
  return LOOP_TOWNS.some((town) => town.id === value);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

export function economyTrend(stock: number, demand: number, supply: number): EconomyTrend {
  if (stock <= 20 || demand - supply >= 35) return "shortage";
  if (demand > supply + 12) return "tight";
  if (supply > demand + 25) return "surplus";
  if (demand > 70 && supply < 55) return "opportunity";
  return "stable";
}

export function economyTone(trend: EconomyTrend): EconomyTone {
  if (trend === "shortage") return "risk";
  if (trend === "tight") return "watch";
  if (trend === "opportunity") return "opportunity";
  return "safe";
}

export function economyDynamicPrice(profile: EconomyStockProfile, loop: PlayableMerchantLoopState) {
  const scarcity = (profile.demand - profile.supply) / 10;
  const stockPressure = (50 - profile.baseStock) / 18;
  const trustDiscount = Math.max(0, loop.consequences.publicTrust) / 20;
  const heatMarkup = Math.max(0, loop.consequences.shadowHeat) / 12;
  const readinessDiscount = loop.company.registered ? 1 : 0;
  return Math.max(1, Math.round(profile.basePrice + scarcity + stockPressure + heatMarkup - trustDiscount - readinessDiscount));
}

export function buildEconomyStockView(profile: EconomyStockProfile, loop: PlayableMerchantLoopState): EconomyStockView {
  const trend = economyTrend(profile.baseStock, profile.demand, profile.supply);
  const currentStock = clamp(profile.baseStock + Math.max(0, loop.consequences.publicTrust) - Math.max(0, loop.consequences.shadowHeat), 0, 160);
  return {
    ...profile,
    itemName: itemName(profile.itemId),
    currentStock,
    dynamicPrice: economyDynamicPrice(profile, loop),
    trend,
    tone: economyTone(trend),
  };
}

export function routeEventForLoop(route: LoopRoute, loop: PlayableMerchantLoopState): EconomyRouteEventView {
  const heatRisk = Math.max(0, Math.floor(loop.consequences.shadowHeat / 6));
  const trustRelief = Math.max(0, Math.floor(loop.consequences.publicTrust / 10));
  const currentRisk = clamp(route.risk + heatRisk - trustRelief, 0, 8);
  const event = currentRisk >= 5
    ? "Inspections and rival scouts make this road dangerous. Expect delays, heat, or bad prices."
    : currentRisk >= 3
      ? "Toll clerks are watching this road. It is still profitable, but not quiet."
      : "This route is readable and safe enough for honest cargo runs.";
  const tone: EconomyTone = currentRisk >= 5 ? "risk" : currentRisk >= 3 ? "watch" : "safe";
  const from = townProfile(route.from).name;
  const to = townProfile(route.to).name;
  return { routeId: route.id, from, to, days: route.days, travelCost: route.travelCost, baseRisk: route.risk, currentRisk, event, tone };
}

export function companyUpgradePlan(loop: PlayableMerchantLoopState): EconomyCompanyUpgrade[] {
  return [
    {
      id: "warehouse-ledger-shelves",
      name: "Warehouse Ledger Shelves",
      status: loop.company.warehouseLeased ? "active" : loop.company.ledgerOpened ? "available" : "locked",
      requirement: "Open the company ledger and lease the first warehouse.",
      effect: "Turns company storage into a visible next upgrade instead of a hidden flag.",
    },
    {
      id: "first-clerk-desk",
      name: "First Clerk Desk",
      status: loop.company.clerkHired ? "active" : loop.company.ledgerOpened ? "available" : "locked",
      requirement: "Finish A Name on the Door and register the first company.",
      effect: "Prepares repeatable contracts, remote notices, and contract memory.",
    },
    {
      id: "route-permit-box",
      name: "Route Permit Box",
      status: loop.company.registered && loop.routeHistory.length >= 2 ? "available" : "locked",
      requirement: "Register a company and use at least two routes.",
      effect: "Prepares Phase 8 route-risk UI and travel-permit choices.",
    },
    {
      id: "stock-priority-seal",
      name: "Stock Priority Seal",
      status: loop.consequences.publicTrust >= 6 ? "available" : "locked",
      requirement: "Build public trust through honest or diplomatic quest choices.",
      effect: "Prepares discounts, stock priority, and fair-trade ending score.",
    },
    {
      id: "quiet-ledger-pocket",
      name: "Quiet Ledger Pocket",
      status: loop.consequences.shadowHeat >= 6 ? "available" : "locked",
      requirement: "Build shadow heat through exploit or shadow choices.",
      effect: "Prepares risky black-market access and shadow-ledger consequences.",
    },
  ];
}

export function worldExpansionReadinessScore(loop: PlayableMerchantLoopState) {
  let score = 0;
  if (loop.company.registered) score += 25;
  if (loop.company.warehouseLeased) score += 15;
  if (loop.company.clerkHired) score += 10;
  if (loop.completedTrades >= 1) score += 10;
  if (new Set(loop.routeHistory).size >= 2) score += 10;
  if (loop.questChain.completedChain) score += 20;
  if (loop.consequences.publicTrust > 0 || loop.consequences.shadowHeat > 0) score += 10;
  return clamp(score, 0, 100);
}

export function worldExpansionReadinessLabel(score: number) {
  if (score >= 80) return "Expansion-ready";
  if (score >= 55) return "Playable but thin";
  if (score >= 30) return "Foundation forming";
  return "Starter loop only";
}

export function buildEconomyWorldExpansionView(value: PlayableMerchantLoopState): EconomyWorldExpansionView {
  const loop = ensurePlayableMerchantLoopState(value);
  const currentTown = townProfile(loop.currentTownId);
  const currentTownStocks = ECONOMY_STOCK_PROFILES
    .filter((profile) => profile.townId === loop.currentTownId)
    .map((profile) => buildEconomyStockView(profile, loop));
  const routeEvents = LOOP_ROUTES
    .filter((route) => route.from === loop.currentTownId)
    .map((route) => routeEventForLoop(route, loop));
  const score = worldExpansionReadinessScore(loop);
  const nextRecommendedExpansion = score >= 80
    ? "Expand from three towns into Appleford Orchard, Glassmere Court, and Wolfhook Bay."
    : loop.company.registered
      ? "Tune stock pressure and route events before adding more towns."
      : "Finish the first company registration so economy expansion has a stable anchor.";
  return {
    title: "Economy, World, and Content Expansion",
    day: loop.day,
    currentTown,
    tunedItems: ECONOMY_TRADE_ITEMS,
    currentTownStocks,
    bestTradeRoutes: loopTownId(loop.currentTownId) ? bestLoopTradeRoutes(loop.currentTownId).slice(0, 5) : [],
    routeEvents,
    companyUpgrades: companyUpgradePlan(loop),
    playableQuestSeeds: PLAYABLE_EXPANSION_QUEST_SEEDS,
    worldReadinessScore: score,
    readinessLabel: worldExpansionReadinessLabel(score),
    nextRecommendedExpansion,
  };
}

export function economyExpansionSummary(loop: PlayableMerchantLoopState) {
  const view = buildEconomyWorldExpansionView(loop);
  return {
    tunedItemCount: view.tunedItems.length,
    currentTownStockCount: view.currentTownStocks.length,
    routeEventCount: view.routeEvents.length,
    companyUpgradeCount: view.companyUpgrades.length,
    playableQuestSeedCount: view.playableQuestSeeds.length,
    worldReadinessScore: view.worldReadinessScore,
    readinessLabel: view.readinessLabel,
  };
}
