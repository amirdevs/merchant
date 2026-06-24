export type QuestCategory =
  | "main_campaign"
  | "character_questline"
  | "trade_contract"
  | "delivery_contract"
  | "procurement"
  | "arbitrage"
  | "shortage_relief"
  | "auction"
  | "warehouse_problem"
  | "guild_request"
  | "npc_favor"
  | "rumor_investigation"
  | "company_contract"
  | "city_event"
  | "story_arc"
  | "rival_scheme"
  | "route_unlock";

export type QuestAct = 1 | 2 | 3 | 4 | 5;
export type QuestTier = 1 | 2 | 3 | 4 | 5;

export type RichQuestStatus =
  | "locked"
  | "available"
  | "offered"
  | "accepted"
  | "in_progress"
  | "ready_to_turn_in"
  | "completed"
  | "failed"
  | "expired"
  | "blocked";

export type QuestRequirementType =
  | "own_item"
  | "deliver_item"
  | "sell_item"
  | "buy_item"
  | "earn_profit"
  | "visit_market"
  | "talk_to_npc"
  | "raise_reputation"
  | "pay_gold"
  | "wait_days"
  | "win_auction"
  | "complete_trade"
  | "complete_contract"
  | "inspect_ledger"
  | "choose_dialogue_option"
  | "unlock_route"
  | "own_warehouse"
  | "hire_agent"
  | "reach_company_value";

export type QuestRewardType =
  | "gold"
  | "item"
  | "reputation"
  | "npc_trust"
  | "market_discount"
  | "route_unlock"
  | "warehouse_unlock"
  | "company_unlock"
  | "rumor_unlock"
  | "contract_access"
  | "auction_access"
  | "faction_access"
  | "employee_unlock"
  | "stock_priority"
  | "ending_score";

export type QuestConsequenceType =
  | "price_change"
  | "stock_change"
  | "npc_trust_change"
  | "city_reputation_change"
  | "faction_reputation_change"
  | "route_risk_change"
  | "quest_unlock"
  | "quest_block"
  | "market_event"
  | "rival_action"
  | "legal_heat_change"
  | "company_reputation_change"
  | "warehouse_access_change"
  | "ending_score_change";

export type QuestUnlockType =
  | "quest"
  | "route"
  | "warehouse"
  | "company_feature"
  | "contract_pool"
  | "npc_service"
  | "ending_path";

export type QuestScene = {
  location: string;
  summary: string;
  dialogue?: string;
  mood?: string;
};

export type QuestStage = {
  id: string;
  title: string;
  story: string;
  objective: string;
  visibleWhen?: string;
  requirements?: QuestRequirement[];
};

export type QuestRequirement = {
  type: QuestRequirementType;
  label: string;
  target?: string;
  quantity?: number;
  marketId?: string;
  npcId?: string;
  amount?: number;
  optional?: boolean;
};

export type QuestReward = {
  type: QuestRewardType;
  label: string;
  target?: string;
  amount?: number;
  quantity?: number;
};

export type QuestConsequence = {
  type: QuestConsequenceType;
  label: string;
  target?: string;
  amount?: number;
};

export type QuestUnlock = {
  type: QuestUnlockType;
  id: string;
  label: string;
};

export type QuestChoice = {
  id: string;
  label: string;
  approach: "honest" | "practical" | "exploit" | "risky" | "diplomatic" | "shadow";
  description: string;
  requirements?: QuestRequirement[];
  rewards?: QuestReward[];
  consequences: QuestConsequence[];
  unlocks?: QuestUnlock[];
};

export type QuestEnding = {
  id: string;
  title: string;
  summary: string;
  consequences?: QuestConsequence[];
};

export type GameplayGoal =
  | "buy_sell"
  | "delivery"
  | "profit"
  | "scarcity"
  | "npc_trust"
  | "city_reputation"
  | "faction_reputation"
  | "travel_risk"
  | "route_unlock"
  | "warehouse_unlock"
  | "company_unlock"
  | "auction"
  | "market_manipulation"
  | "investigation"
  | "ending_progress";

export type RichQuest = {
  id: string;
  title: string;
  arc: string;
  act?: QuestAct;
  category: QuestCategory;
  tier: QuestTier;
  storyPremise: string;
  playerHook: string;
  emotionalConflict: string;
  merchantConflict: string;
  giverNpcId: string;
  importantNpcIds: string[];
  originMarketId: string;
  targetMarketIds?: string[];
  openingScene: QuestScene;
  stages: QuestStage[];
  choices: QuestChoice[];
  consequences: QuestConsequence[];
  successEnding: string;
  failureEnding?: string;
  alternateEndings?: QuestEnding[];
  gameplayGoals: GameplayGoal[];
  requirements: QuestRequirement[];
  rewards: QuestReward[];
  unlocks?: QuestUnlock[];
  expiresAfterDays?: number;
  repeatable: boolean;
  isMainQuest: boolean;
  verticalSlice?: boolean;
};

export type CampaignAct = {
  act: QuestAct;
  title: string;
  summary: string;
  questIds: string[];
  gameplayIntroduced: GameplayGoal[];
};

export type CampaignEnding = {
  id: string;
  title: string;
  summary: string;
  scoreKeys: string[];
};

export type CharacterQuestline = {
  id: string;
  npcId: string;
  npcName: string;
  theme: string;
  summary: string;
  quests: Array<{
    title: string;
    premise: string;
    choicePressure: string;
    possibleOutcomes: string[];
  }>;
  finalOutcomes: string[];
};

export type SideQuestConcept = RichQuest & {
  family: string;
};

export type RepeatableContractTemplate = {
  id: string;
  title: string;
  category: "delivery" | "procurement" | "arbitrage" | "bulk_supply" | "urgent_shortage" | "auction_supply" | "warehouse_cleanup";
  clientArchetypes: string[];
  itemTags: string[];
  quantityRange: readonly [number, number];
  deadlineDaysRange: readonly [number, number];
  rewardMultiplierRange: readonly [number, number];
  reputationReward: string;
  failurePenalty: string;
  flavorHooks: string[];
  consequenceHooks: QuestConsequence[];
};

export type QuestCatalog = {
  campaignTitle: string;
  campaignPremise: string;
  acts: CampaignAct[];
  endings: CampaignEnding[];
  mainQuests: RichQuest[];
  sideQuests: SideQuestConcept[];
  characterQuestlines: CharacterQuestline[];
  repeatableContractTemplates: RepeatableContractTemplate[];
  verticalSliceQuestIds: string[];
};
