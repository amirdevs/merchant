import {
  acceptFirstPlayableQuest,
  advanceFirstPlayableQuest,
  buildFirstPlayableQuestChainView,
  chooseFirstPlayableQuestOutcome,
  completeFirstPlayableQuestWithDefaultChoice,
  createFirstPlayableQuestChainState,
  ensureFirstPlayableQuestChainState,
  FIRST_PLAYABLE_QUEST_CHAIN_IDS,
  type FirstPlayableQuestChainId,
  type FirstPlayableQuestChainState,
} from "@/lib/first-playable-quest-chain";
import { richQuestStatus } from "@/lib/quest-state";

export type LoopTownId = "sunwake-harbor" | "riverwake-mill" | "brasskeep-gate";
export type LoopItemId = "coastal-salt" | "mill-flour" | "lamp-oil" | "dyed-wool" | "ledger-paper" | "iron-nails";
export type LoopApproach = "honest" | "practical" | "exploit" | "risky" | "diplomatic" | "shadow";

export type LoopTown = {
  id: LoopTownId;
  name: string;
  role: string;
  storyHook: string;
  availableNpcIds: string[];
  priceTable: Record<LoopItemId, number>;
};

export type LoopItem = {
  id: LoopItemId;
  name: string;
  category: "food" | "staple" | "craft" | "document" | "tool";
  storyUse: string;
};

export type LoopRoute = {
  id: string;
  from: LoopTownId;
  to: LoopTownId;
  days: number;
  travelCost: number;
  risk: number;
  story: string;
};

export type LoopCargoEntry = {
  itemId: LoopItemId;
  quantity: number;
  averageCost: number;
};

export type LoopLedgerEntry = {
  day: number;
  type: "buy" | "sell" | "travel" | "quest" | "company" | "consequence";
  text: string;
  copperDelta?: number;
  townId?: LoopTownId;
};

export type LoopCompanyState = {
  registered: boolean;
  name: string;
  warehouseLeased: boolean;
  clerkHired: boolean;
  ledgerOpened: boolean;
};

export type LoopConsequenceScore = {
  publicTrust: number;
  shadowHeat: number;
  companyReadiness: number;
};

export type LoopBalanceSignal = {
  id: string;
  label: string;
  status: "good" | "watch" | "risk";
  detail: string;
};

export type LoopConsequenceSummary = {
  townReputation: { townId: LoopTownId; townName: string; score: number }[];
  npcTrust: { npcId: string; score: number }[];
  publicTrust: number;
  shadowHeat: number;
  companyReadiness: number;
  visibleConsequences: string[];
};

export type LoopBalanceReport = {
  score: number;
  summary: string;
  signals: LoopBalanceSignal[];
  nextRecommendedAction: string;
};

export type PlayableMerchantLoopState = {
  day: number;
  currentTownId: LoopTownId;
  copper: number;
  cargo: Record<LoopItemId, LoopCargoEntry>;
  totalProfit: number;
  completedTrades: number;
  visitedTownIds: LoopTownId[];
  routeHistory: string[];
  questChain: FirstPlayableQuestChainState;
  company: LoopCompanyState;
  tutorialFlags: Record<string, boolean>;
  reputation: Record<LoopTownId, number>;
  npcTrust: Record<string, number>;
  consequences: LoopConsequenceScore;
  consequenceFlags: Record<string, boolean>;
  ledger: LoopLedgerEntry[];
};

export const LOOP_ITEMS: LoopItem[] = [
  { id: "coastal-salt", name: "Coastal Salt", category: "staple", storyUse: "cheap at the harbor, valuable inland when meat-curers and tanners compete for supply" },
  { id: "mill-flour", name: "Mill Flour", category: "food", storyUse: "the first urgent shortage item for Bread Before Dawn" },
  { id: "lamp-oil", name: "Lamp Oil", category: "craft", storyUse: "keeps night markets, bakeries, and warehouse inspections running" },
  { id: "dyed-wool", name: "Dyed Wool", category: "craft", storyUse: "a visible festival good for early demand spikes" },
  { id: "ledger-paper", name: "Ledger Paper", category: "document", storyUse: "used by clerks, appraisers, and the first company registration" },
  { id: "iron-nails", name: "Iron Nails", category: "tool", storyUse: "needed for warehouse repairs and caravan crates" },
];

export const LOOP_TOWNS: LoopTown[] = [
  {
    id: "sunwake-harbor",
    name: "Sunwake Harbor",
    role: "starting port market",
    storyHook: "A crowded harbor where small traders can still find honest margins between fish bells, salt sheds, and paper clerks.",
    availableNpcIds: ["character-001", "character-004", "character-011", "character-049"],
    priceTable: {
      "coastal-salt": 8,
      "mill-flour": 13,
      "lamp-oil": 9,
      "dyed-wool": 19,
      "ledger-paper": 7,
      "iron-nails": 12,
    },
  },
  {
    id: "riverwake-mill",
    name: "Riverwake Mill",
    role: "food and craft town",
    storyHook: "Mill wheels and bakery ovens make this town cheap for flour but hungry for harbor salt and lamp oil.",
    availableNpcIds: ["character-006", "character-017", "character-024", "character-072"],
    priceTable: {
      "coastal-salt": 14,
      "mill-flour": 6,
      "lamp-oil": 12,
      "dyed-wool": 16,
      "ledger-paper": 10,
      "iron-nails": 11,
    },
  },
  {
    id: "brasskeep-gate",
    name: "Brasskeep Gate",
    role: "company and warehouse checkpoint",
    storyHook: "A guarded gate market where contracts, warehouses, caravan papers, and guild seals become more valuable than sacks of goods.",
    availableNpcIds: ["character-003", "character-031", "character-039", "character-169"],
    priceTable: {
      "coastal-salt": 12,
      "mill-flour": 11,
      "lamp-oil": 15,
      "dyed-wool": 24,
      "ledger-paper": 15,
      "iron-nails": 8,
    },
  },
];

export const LOOP_ROUTES: LoopRoute[] = [
  { id: "sunwake-riverwake", from: "sunwake-harbor", to: "riverwake-mill", days: 1, travelCost: 2, risk: 1, story: "A safe river road where salt sheds and grain barges constantly trade places." },
  { id: "riverwake-sunwake", from: "riverwake-mill", to: "sunwake-harbor", days: 1, travelCost: 2, risk: 1, story: "The return route follows empty flour carts back toward the harbor warehouses." },
  { id: "riverwake-brasskeep", from: "riverwake-mill", to: "brasskeep-gate", days: 1, travelCost: 3, risk: 2, story: "A toll road watched by warehouse guards and impatient guild factors." },
  { id: "brasskeep-riverwake", from: "brasskeep-gate", to: "riverwake-mill", days: 1, travelCost: 3, risk: 2, story: "A practical road for hauling nails, wool, and signed contracts back toward the mills." },
  { id: "sunwake-brasskeep", from: "sunwake-harbor", to: "brasskeep-gate", days: 2, travelCost: 5, risk: 3, story: "A longer commercial road with better profit potential and more inspections." },
  { id: "brasskeep-sunwake", from: "brasskeep-gate", to: "sunwake-harbor", days: 2, travelCost: 5, risk: 3, story: "A guarded road for registered traders returning toward the sea." },
];

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function uniquePush<T>(list: T[], value: T) {
  if (!list.includes(value)) list.push(value);
}

function townById(townId: LoopTownId) {
  const town = LOOP_TOWNS.find((entry) => entry.id === townId);
  if (!town) throw new Error(`Unknown loop town: ${townId}`);
  return town;
}

function itemById(itemId: LoopItemId) {
  const item = LOOP_ITEMS.find((entry) => entry.id === itemId);
  if (!item) throw new Error(`Unknown loop item: ${itemId}`);
  return item;
}

function routeBetween(from: LoopTownId, to: LoopTownId) {
  return LOOP_ROUTES.find((entry) => entry.from === from && entry.to === to) || null;
}

function addLedger(state: PlayableMerchantLoopState, entry: Omit<LoopLedgerEntry, "day">) {
  state.ledger.unshift({ day: state.day, ...entry });
  state.ledger = state.ledger.slice(0, 30);
}

function ensureCargoEntry(state: PlayableMerchantLoopState, itemId: LoopItemId): LoopCargoEntry {
  state.cargo[itemId] ||= { itemId, quantity: 0, averageCost: 0 };
  return state.cargo[itemId];
}

function defaultLoopReputation(): Record<LoopTownId, number> {
  return {
    "sunwake-harbor": 0,
    "riverwake-mill": 0,
    "brasskeep-gate": 0,
  };
}

function defaultLoopConsequences(): LoopConsequenceScore {
  return { publicTrust: 0, shadowHeat: 0, companyReadiness: 0 };
}

function clampScore(value: number, min = -20, max = 20) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function bumpTownReputation(state: PlayableMerchantLoopState, townId: LoopTownId, amount: number) {
  state.reputation[townId] = clampScore((state.reputation[townId] || 0) + amount);
}

function bumpNpcTrust(state: PlayableMerchantLoopState, npcId: string | undefined, amount: number) {
  if (!npcId) return;
  state.npcTrust[npcId] = clampScore((state.npcTrust[npcId] || 0) + amount);
}

function bumpConsequenceScore(state: PlayableMerchantLoopState, key: keyof LoopConsequenceScore, amount: number) {
  state.consequences[key] = clampScore((state.consequences[key] || 0) + amount, -50, 50);
}

function rememberConsequence(state: PlayableMerchantLoopState, flag: string) {
  state.consequenceFlags[flag] = true;
}

export function createPlayableMerchantLoopState(day = 1): PlayableMerchantLoopState {
  return {
    day,
    currentTownId: "sunwake-harbor",
    copper: 120,
    cargo: {} as Record<LoopItemId, LoopCargoEntry>,
    totalProfit: 0,
    completedTrades: 0,
    visitedTownIds: ["sunwake-harbor"],
    routeHistory: [],
    questChain: createFirstPlayableQuestChainState(day),
    company: {
      registered: false,
      name: "",
      warehouseLeased: false,
      clerkHired: false,
      ledgerOpened: false,
    },
    tutorialFlags: {},
    reputation: defaultLoopReputation(),
    npcTrust: {},
    consequences: defaultLoopConsequences(),
    consequenceFlags: {},
    ledger: [
      {
        day,
        type: "quest",
        townId: "sunwake-harbor",
        text: "Vertical slice started: buy a cheap harbor good, travel inland, sell at a profit, then use the story chain to unlock company registration.",
      },
    ],
  };
}

export function ensurePlayableMerchantLoopState(value: unknown, day = 1): PlayableMerchantLoopState {
  const fallback = createPlayableMerchantLoopState(day);
  const candidate = value as Partial<PlayableMerchantLoopState> | null;
  if (!candidate || typeof candidate !== "object") return fallback;
  const currentTownId = LOOP_TOWNS.some((entry) => entry.id === candidate.currentTownId) ? (candidate.currentTownId as LoopTownId) : fallback.currentTownId;
  return {
    ...fallback,
    ...clone(candidate),
    day: typeof candidate.day === "number" ? candidate.day : day,
    currentTownId,
    copper: typeof candidate.copper === "number" ? candidate.copper : fallback.copper,
    cargo: (candidate.cargo || fallback.cargo) as Record<LoopItemId, LoopCargoEntry>,
    totalProfit: typeof candidate.totalProfit === "number" ? candidate.totalProfit : 0,
    completedTrades: typeof candidate.completedTrades === "number" ? candidate.completedTrades : 0,
    visitedTownIds: Array.isArray(candidate.visitedTownIds) ? candidate.visitedTownIds.filter((id): id is LoopTownId => LOOP_TOWNS.some((town) => town.id === id)) : fallback.visitedTownIds,
    routeHistory: Array.isArray(candidate.routeHistory) ? candidate.routeHistory : [],
    questChain: ensureFirstPlayableQuestChainState(candidate.questChain, typeof candidate.day === "number" ? candidate.day : day),
    company: { ...fallback.company, ...(candidate.company || {}) },
    tutorialFlags: candidate.tutorialFlags || {},
    reputation: { ...fallback.reputation, ...(candidate.reputation || {}) },
    npcTrust: candidate.npcTrust || {},
    consequences: { ...fallback.consequences, ...(candidate.consequences || {}) },
    consequenceFlags: candidate.consequenceFlags || {},
    ledger: Array.isArray(candidate.ledger) ? candidate.ledger.slice(0, 30) : fallback.ledger,
  };
}

export function currentLoopTown(state: PlayableMerchantLoopState) {
  return townById(state.currentTownId);
}

export function loopPrice(townId: LoopTownId, itemId: LoopItemId) {
  return townById(townId).priceTable[itemId];
}

export function buyLoopItem(state: PlayableMerchantLoopState, itemId: LoopItemId, quantity = 1): PlayableMerchantLoopState {
  if (quantity <= 0) return state;
  const next = ensurePlayableMerchantLoopState(state);
  const price = loopPrice(next.currentTownId, itemId);
  const total = price * quantity;
  if (next.copper < total) {
    addLedger(next, { type: "buy", townId: next.currentTownId, text: `Could not buy ${quantity} ${itemById(itemId).name}; not enough copper.` });
    return next;
  }
  const cargo = ensureCargoEntry(next, itemId);
  const existingValue = cargo.averageCost * cargo.quantity;
  cargo.quantity += quantity;
  cargo.averageCost = Math.round(((existingValue + total) / cargo.quantity) * 100) / 100;
  next.copper -= total;
  next.tutorialFlags.boughtFirstCargo = true;
  if (quantity >= 4) rememberConsequence(next, "bulk-first-purchase");
  addLedger(next, { type: "buy", townId: next.currentTownId, copperDelta: -total, text: `Bought ${quantity} ${itemById(itemId).name} for ${total} copper.` });
  return next;
}

export function sellLoopItem(state: PlayableMerchantLoopState, itemId: LoopItemId, quantity = 1): PlayableMerchantLoopState {
  if (quantity <= 0) return state;
  const next = ensurePlayableMerchantLoopState(state);
  const cargo = ensureCargoEntry(next, itemId);
  const sold = Math.min(quantity, cargo.quantity);
  if (!sold) {
    addLedger(next, { type: "sell", townId: next.currentTownId, text: `Could not sell ${itemById(itemId).name}; none in cargo.` });
    return next;
  }
  const price = loopPrice(next.currentTownId, itemId);
  const revenue = price * sold;
  const profit = Math.round((price - cargo.averageCost) * sold);
  cargo.quantity -= sold;
  if (cargo.quantity <= 0) delete next.cargo[itemId];
  next.copper += revenue;
  next.totalProfit += profit;
  next.completedTrades += profit > 0 ? 1 : 0;
  next.tutorialFlags.soldForProfit ||= profit > 0;
  if (profit > 0) {
    bumpTownReputation(next, next.currentTownId, 1);
    bumpConsequenceScore(next, "publicTrust", 1);
    rememberConsequence(next, "first-visible-profit");
  } else if (profit < 0) {
    bumpConsequenceScore(next, "companyReadiness", -1);
    rememberConsequence(next, "sold-at-a-loss");
  }
  addLedger(next, { type: "sell", townId: next.currentTownId, copperDelta: revenue, text: `Sold ${sold} ${itemById(itemId).name} for ${revenue} copper (${profit >= 0 ? "+" : ""}${profit} profit).` });
  return maybeMarkFirstProfitReady(next);
}

export function travelLoopRoute(state: PlayableMerchantLoopState, to: LoopTownId): PlayableMerchantLoopState {
  const next = ensurePlayableMerchantLoopState(state);
  if (to === next.currentTownId) return next;
  const route = routeBetween(next.currentTownId, to);
  if (!route) {
    addLedger(next, { type: "travel", townId: next.currentTownId, text: `No vertical-slice route from ${currentLoopTown(next).name} to ${townById(to).name}.` });
    return next;
  }
  if (next.copper < route.travelCost) {
    addLedger(next, { type: "travel", townId: next.currentTownId, text: `Could not travel to ${townById(to).name}; route costs ${route.travelCost} copper.` });
    return next;
  }
  next.copper -= route.travelCost;
  next.day += route.days;
  next.currentTownId = to;
  uniquePush(next.visitedTownIds, to);
  uniquePush(next.routeHistory, route.id);
  next.questChain = ensureFirstPlayableQuestChainState({ ...next.questChain, day: next.day }, next.day);
  next.tutorialFlags.completedFirstTravel = true;
  if (route.risk >= 3) {
    bumpConsequenceScore(next, "shadowHeat", 1);
    rememberConsequence(next, "high-risk-road-seen");
  }
  addLedger(next, { type: "travel", townId: to, copperDelta: -route.travelCost, text: `Traveled to ${townById(to).name}. ${route.story}` });
  return next;
}

function maybeMarkFirstProfitReady(state: PlayableMerchantLoopState): PlayableMerchantLoopState {
  const next = ensurePlayableMerchantLoopState(state);
  const firstQuestId = FIRST_PLAYABLE_QUEST_CHAIN_IDS[0];
  const status = richQuestStatus(next.questChain, firstQuestId);
  if (next.totalProfit > 0 && (status === "accepted" || status === "in_progress" || status === "ready_to_turn_in")) {
    next.questChain.questStates[firstQuestId] = "ready_to_turn_in";
    next.questChain.questNotes[firstQuestId] ||= [];
    next.questChain.questNotes[firstQuestId].push("Real trade gate met: sold cargo at a profit inside the vertical-slice loop.");
  }
  return next;
}

export function acceptLoopStoryQuest(state: PlayableMerchantLoopState, questId?: FirstPlayableQuestChainId): PlayableMerchantLoopState {
  const next = ensurePlayableMerchantLoopState(state);
  next.questChain = acceptFirstPlayableQuest(next.questChain, questId || next.questChain.selectedQuestId);
  addLedger(next, { type: "quest", townId: next.currentTownId, text: `Accepted story quest: ${next.questChain.selectedQuestId}.` });
  return next;
}

export function advanceLoopStoryQuest(state: PlayableMerchantLoopState, questId?: FirstPlayableQuestChainId): PlayableMerchantLoopState {
  const next = ensurePlayableMerchantLoopState(state);
  next.questChain = advanceFirstPlayableQuest(next.questChain, questId || next.questChain.selectedQuestId);
  addLedger(next, { type: "quest", townId: next.currentTownId, text: `Advanced story quest: ${next.questChain.selectedQuestId}.` });
  return maybeMarkFirstProfitReady(next);
}

export function resolveLoopStoryQuest(state: PlayableMerchantLoopState, approach: LoopApproach = "honest", questId?: FirstPlayableQuestChainId): PlayableMerchantLoopState {
  const next = ensurePlayableMerchantLoopState(state);
  const targetQuestId = questId || next.questChain.selectedQuestId;
  const card = buildFirstPlayableQuestChainView(next.questChain).cards.find((entry) => entry.id === targetQuestId);
  const choice = card?.quest.choices.find((entry) => entry.approach === approach) || card?.quest.choices[0];
  next.questChain = choice ? chooseFirstPlayableQuestOutcome(next.questChain, targetQuestId, choice.id) : completeFirstPlayableQuestWithDefaultChoice(next.questChain, targetQuestId);

  const giverNpcId = card?.quest.giverNpcId;
  if (approach === "honest" || approach === "diplomatic") {
    bumpTownReputation(next, next.currentTownId, 2);
    bumpNpcTrust(next, giverNpcId, 2);
    bumpConsequenceScore(next, "publicTrust", 2);
    rememberConsequence(next, "public-trust-path");
  } else if (approach === "practical") {
    bumpTownReputation(next, next.currentTownId, 1);
    bumpNpcTrust(next, giverNpcId, 1);
    bumpConsequenceScore(next, "companyReadiness", 2);
    rememberConsequence(next, "practical-company-path");
  } else if (approach === "exploit" || approach === "shadow") {
    bumpTownReputation(next, next.currentTownId, -2);
    bumpNpcTrust(next, giverNpcId, -1);
    bumpConsequenceScore(next, "shadowHeat", 3);
    rememberConsequence(next, "shadow-profit-path");
  } else if (approach === "risky") {
    bumpTownReputation(next, next.currentTownId, 1);
    bumpConsequenceScore(next, "shadowHeat", 1);
    bumpConsequenceScore(next, "companyReadiness", 1);
    rememberConsequence(next, "risky-solution-path");
  }

  addLedger(next, { type: "quest", townId: next.currentTownId, text: `Resolved ${targetQuestId} by ${approach} approach.` });
  return applyLoopUnlocks(next);
}

export function applyLoopUnlocks(state: PlayableMerchantLoopState): PlayableMerchantLoopState {
  const next = ensurePlayableMerchantLoopState(state);
  const chain = next.questChain;
  if (chain.companyUnlocks.includes("warehouse-lease-ready") || richQuestStatus(chain, "main-18-warehouse-lease") === "completed") {
    next.company.warehouseLeased = true;
  }
  if (chain.companyUnlocks.includes("company-registration-ready") || chain.completedChain) {
    next.company.ledgerOpened = true;
  }
  return next;
}

export function registerLoopCompany(state: PlayableMerchantLoopState, name = "Sunwake Ledger Company"): PlayableMerchantLoopState {
  const next = applyLoopUnlocks(state);
  if (!next.company.ledgerOpened && !next.questChain.completedChain) {
    addLedger(next, { type: "company", townId: next.currentTownId, text: "Company registration is not ready yet. Finish the first playable story chain." });
    return next;
  }
  next.company.registered = true;
  next.company.name = name.trim() || "Sunwake Ledger Company";
  next.company.clerkHired = true;
  bumpTownReputation(next, next.currentTownId, 3);
  bumpConsequenceScore(next, "companyReadiness", 5);
  rememberConsequence(next, "first-company-registered");
  addLedger(next, { type: "company", townId: next.currentTownId, text: `${next.company.name} is registered. Warehouse, clerk, and company ledger are ready for the next expansion pass.` });
  return next;
}

export function bestLoopTradeRoutes(from: LoopTownId = "sunwake-harbor") {
  return LOOP_ROUTES.filter((route) => route.from === from).flatMap((route) => {
    const source = townById(route.from);
    const target = townById(route.to);
    return LOOP_ITEMS.map((item) => {
      const buyPrice = source.priceTable[item.id];
      const sellPrice = target.priceTable[item.id];
      return {
        routeId: route.id,
        itemId: item.id,
        itemName: item.name,
        from: source.name,
        to: target.name,
        buyPrice,
        sellPrice,
        grossProfit: sellPrice - buyPrice,
        netProfit: sellPrice - buyPrice - route.travelCost,
        days: route.days,
        risk: route.risk,
      };
    });
  }).sort((a, b) => b.netProfit - a.netProfit);
}

export function buildLoopConsequenceSummary(state: PlayableMerchantLoopState): LoopConsequenceSummary {
  const safe = ensurePlayableMerchantLoopState(state);
  const townReputation = LOOP_TOWNS.map((town) => ({ townId: town.id, townName: town.name, score: safe.reputation[town.id] || 0 }));
  const npcTrust = Object.entries(safe.npcTrust).map(([npcId, score]) => ({ npcId, score })).sort((a, b) => b.score - a.score);
  const visibleConsequences = Object.keys(safe.consequenceFlags).sort();
  return {
    townReputation,
    npcTrust,
    publicTrust: safe.consequences.publicTrust,
    shadowHeat: safe.consequences.shadowHeat,
    companyReadiness: safe.consequences.companyReadiness,
    visibleConsequences,
  };
}

export function buildLoopBalanceReport(state: PlayableMerchantLoopState): LoopBalanceReport {
  const safe = ensurePlayableMerchantLoopState(state);
  const cargoValue = Object.values(safe.cargo).reduce((total, entry) => total + entry.quantity * loopPrice(safe.currentTownId, entry.itemId), 0);
  const netWorth = safe.copper + cargoValue;
  const routeCount = new Set(safe.routeHistory).size;
  const completedQuestCount = FIRST_PLAYABLE_QUEST_CHAIN_IDS.filter((questId) => richQuestStatus(safe.questChain, questId) === "completed").length;
  const signals: LoopBalanceSignal[] = [
    {
      id: "money",
      label: "Money pressure",
      status: safe.copper >= 80 ? "good" : safe.copper >= 35 ? "watch" : "risk",
      detail: `${safe.copper} copper cash / ${netWorth} copper including cargo`,
    },
    {
      id: "profit",
      label: "Profit clarity",
      status: safe.totalProfit > 0 ? "good" : safe.completedTrades ? "watch" : "risk",
      detail: `${safe.totalProfit} copper realized profit across ${safe.completedTrades} profitable trade(s)`,
    },
    {
      id: "routes",
      label: "Route use",
      status: routeCount >= 2 ? "good" : routeCount === 1 ? "watch" : "risk",
      detail: `${routeCount} unique vertical-slice route(s) used`,
    },
    {
      id: "quests",
      label: "Story progress",
      status: completedQuestCount >= 5 ? "good" : completedQuestCount >= 2 ? "watch" : "risk",
      detail: `${completedQuestCount}/5 first-chain quests completed`,
    },
    {
      id: "company",
      label: "Company readiness",
      status: safe.company.registered ? "good" : safe.company.ledgerOpened ? "watch" : "risk",
      detail: safe.company.registered ? `${safe.company.name} registered` : safe.company.ledgerOpened ? "ledger ready, registration pending" : "registration still locked",
    },
  ];
  const good = signals.filter((entry) => entry.status === "good").length;
  const watch = signals.filter((entry) => entry.status === "watch").length;
  const score = good * 2 + watch;
  const nextRecommendedAction = !safe.tutorialFlags.boughtFirstCargo
    ? "Buy a low-risk harbor good."
    : !safe.tutorialFlags.completedFirstTravel
      ? "Travel to Riverwake Mill and compare sale prices."
      : safe.totalProfit <= 0
        ? "Sell cargo where the net route profit is positive."
        : completedQuestCount < 5
          ? "Resolve the rich story chain and watch how trust changes."
          : !safe.company.registered
            ? "Travel to Brasskeep Gate and register the company."
            : "Replay with a different quest approach to compare public trust and shadow heat.";
  return {
    score,
    summary: `${good}/${signals.length} balance signals are healthy.`,
    signals,
    nextRecommendedAction,
  };
}

export function buildPlayableMerchantLoopView(state: PlayableMerchantLoopState) {
  const safe = ensurePlayableMerchantLoopState(state);
  const town = currentLoopTown(safe);
  const questView = buildFirstPlayableQuestChainView(safe.questChain);
  const cargoList = Object.values(safe.cargo).filter((entry) => entry.quantity > 0).map((entry) => ({ ...entry, itemName: itemById(entry.itemId).name, currentSellPrice: loopPrice(safe.currentTownId, entry.itemId) }));
  const tradeRoutes = bestLoopTradeRoutes(safe.currentTownId).slice(0, 5);
  const consequenceSummary = buildLoopConsequenceSummary(safe);
  const balanceReport = buildLoopBalanceReport(safe);
  const goals = [
    { id: "buy", label: "Buy a low-risk good", done: Boolean(safe.tutorialFlags.boughtFirstCargo) },
    { id: "travel", label: "Travel to a second town", done: Boolean(safe.tutorialFlags.completedFirstTravel) },
    { id: "profit", label: "Sell cargo at a profit", done: safe.totalProfit > 0 },
    { id: "quest", label: "Complete the five-quest story chain", done: questView.completedChain },
    { id: "company", label: "Register the first company", done: safe.company.registered },
  ];
  return {
    title: "Playable Merchant Loop v1",
    town,
    day: safe.day,
    copper: safe.copper,
    cargoList,
    tradeRoutes,
    questView,
    company: safe.company,
    consequenceSummary,
    balanceReport,
    completedGoals: goals.filter((entry) => entry.done).length,
    totalGoals: goals.length,
    goals,
    ledger: safe.ledger,
  };
}

export function runRecommendedLoopDemo(): PlayableMerchantLoopState {
  let state = createPlayableMerchantLoopState();
  state = acceptLoopStoryQuest(state, FIRST_PLAYABLE_QUEST_CHAIN_IDS[0]);
  state = buyLoopItem(state, "coastal-salt", 4);
  state = travelLoopRoute(state, "riverwake-mill");
  state = sellLoopItem(state, "coastal-salt", 4);
  state = resolveLoopStoryQuest(state, "honest", FIRST_PLAYABLE_QUEST_CHAIN_IDS[0]);
  for (const questId of FIRST_PLAYABLE_QUEST_CHAIN_IDS.slice(1)) {
    state = acceptLoopStoryQuest(state, questId);
    state = advanceLoopStoryQuest(state, questId);
    state = resolveLoopStoryQuest(state, questId === "main-18-warehouse-lease" ? "practical" : "honest", questId);
  }
  state = travelLoopRoute(state, "brasskeep-gate");
  state = registerLoopCompany(state, "Sunwake Ledger Company");
  return state;
}
