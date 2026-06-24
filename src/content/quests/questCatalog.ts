import type { CampaignAct, CampaignEnding, QuestCatalog, RichQuest } from "./questTypes";
import { characterQuestlines } from "./characterQuestlines";
import { mainCampaignQuests } from "./mainCampaignQuests";
import { repeatableContractTemplates } from "./repeatableContractTemplates";
import { sideQuests } from "./sideQuests";

export const campaignActs: CampaignAct[] = [
  {
    act: 1,
    title: "The First Ledger",
    summary: "The player learns basic trade while discovering that old debts, falsified records, and hidden cargo marks still shape current market life.",
    questIds: mainCampaignQuests.filter((quest) => quest.act === 1).map((quest) => quest.id),
    gameplayIntroduced: ["buy_sell", "profit", "npc_trust", "city_reputation", "investigation"],
  },
  {
    act: 2,
    title: "Roads and Debts",
    summary: "Travel, tolls, weather, delivery risk, insurance, and disputed cargo teach the player that roads are political assets.",
    questIds: mainCampaignQuests.filter((quest) => quest.act === 2).map((quest) => quest.id),
    gameplayIntroduced: ["travel_risk", "delivery", "route_unlock", "scarcity", "faction_reputation"],
  },
  {
    act: 3,
    title: "The Guild War",
    summary: "Official standards, auction access, price rings, warehouse fraud, and doubled contracts force the player to choose enemies and methods.",
    questIds: mainCampaignQuests.filter((quest) => quest.act === 3).map((quest) => quest.id),
    gameplayIntroduced: ["market_manipulation", "faction_reputation", "investigation", "city_reputation", "ending_progress"],
  },
  {
    act: 4,
    title: "The Company Charter",
    summary: "The player becomes a company owner through registration, clerks, warehouse access, caravan papers, and guild recognition.",
    questIds: mainCampaignQuests.filter((quest) => quest.act === 4).map((quest) => quest.id),
    gameplayIntroduced: ["company_unlock", "warehouse_unlock", "route_unlock", "npc_trust", "ending_progress"],
  },
  {
    act: 5,
    title: "The Final Market",
    summary: "The final act resolves who controls market access, city law, rival evidence, guild votes, and the trade future.",
    questIds: mainCampaignQuests.filter((quest) => quest.act === 5).map((quest) => quest.id),
    gameplayIntroduced: ["ending_progress", "company_unlock", "city_reputation", "faction_reputation", "market_manipulation"],
  },
];

export const campaignEndings: CampaignEnding[] = [
  {
    id: "ending-fair-trade",
    title: "Fair Trade Ending",
    summary: "The player builds transparent trade, fair weights, open records, and broad public trust. Wealth grows slower, but the market becomes stable and respected.",
    scoreKeys: ["honest", "fair_trade", "public_trust", "city_reputation"],
  },
  {
    id: "ending-guildmaster",
    title: "Guildmaster Ending",
    summary: "The player reforms or captures the official merchant guild and leads trade through recognized institutions, alliances, and political compromise.",
    scoreKeys: ["diplomatic", "guild_reform", "faction_reputation", "company_reputation"],
  },
  {
    id: "ending-shadow-ledger",
    title: "Shadow Ledger Ending",
    summary: "The player controls hidden debts, unofficial contracts, and black-market routes while public markets continue believing someone else is in charge.",
    scoreKeys: ["shadow", "legal_heat", "hidden_leverage", "rival_action"],
  },
  {
    id: "ending-free-roads",
    title: "Free Roads Ending",
    summary: "The player breaks monopolies and opens route access to independent merchants, making travel fairer but less centralized.",
    scoreKeys: ["free_roads", "route_unlock", "public_access", "fair_trade"],
  },
  {
    id: "ending-coin-emperor",
    title: "Coin Emperor Ending",
    summary: "The player becomes extremely rich, controls supply and law through wealth, and is obeyed more than loved.",
    scoreKeys: ["exploit", "coin_emperor", "market_control", "company_power"],
  },
  {
    id: "ending-quiet-partner",
    title: "Quiet Partner Ending",
    summary: "The player avoids public rule but quietly shapes the market through trusted allies, proxy stalls, and careful favors.",
    scoreKeys: ["practical", "quiet_partner", "npc_trust", "hidden_alliances"],
  },
];

export const verticalSliceQuestIds = [
  "main-02-first-honest-profit",
  "side-01-bread-before-dawn",
  "main-11-the-false-scale",
  "main-18-warehouse-lease",
  "main-16-a-name-on-the-door",
] as const;

export const questCatalog: QuestCatalog = {
  campaignTitle: "The Ledger That Bought a City",
  campaignPremise:
    "A small trader receives an old merchant ledger containing debts, favors, forged contracts, hidden route rights, and guild crimes. Through trade, reputation, company growth, routes, and alliances, the player decides what kind of merchant world survives.",
  acts: campaignActs,
  endings: campaignEndings,
  mainQuests: mainCampaignQuests,
  sideQuests,
  characterQuestlines,
  repeatableContractTemplates,
  verticalSliceQuestIds: [...verticalSliceQuestIds],
};

export const authoredQuests: RichQuest[] = [...mainCampaignQuests, ...sideQuests];

export function getQuestById(id: string) {
  return authoredQuests.find((quest) => quest.id === id) || null;
}

export function assertQuestCatalogShape(catalog: QuestCatalog = questCatalog) {
  const allIds = [...catalog.mainQuests, ...catalog.sideQuests].map((quest) => quest.id);
  const uniqueIds = new Set(allIds);
  const missingVerticalSlice = catalog.verticalSliceQuestIds.filter((questId) => !uniqueIds.has(questId));

  return {
    mainQuestCount: catalog.mainQuests.length,
    sideQuestCount: catalog.sideQuests.length,
    characterQuestlineCount: catalog.characterQuestlines.length,
    repeatableTemplateCount: catalog.repeatableContractTemplates.length,
    endingCount: catalog.endings.length,
    duplicateQuestIds: allIds.length - uniqueIds.size,
    missingVerticalSlice,
    valid:
      catalog.mainQuests.length === 25 &&
      catalog.sideQuests.length === 30 &&
      catalog.characterQuestlines.length === 10 &&
      catalog.repeatableContractTemplates.length === 20 &&
      catalog.endings.length >= 5 &&
      uniqueIds.size === allIds.length &&
      missingVerticalSlice.length === 0,
  };
}
