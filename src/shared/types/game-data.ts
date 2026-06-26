export type Item = {
  index: number;
  id?: string;
  name: string;
  displayName?: string;
  iconFile?: string | null;
  tags: string[];
  family?: string;
  subfamily?: string;
  categoryAxes?: Partial<Record<
    | "material"
    | "productionStage"
    | "freshness"
    | "legalSocial"
    | "marketBehavior"
    | "storageHandling"
    | "artVariant"
    | "featureHooks",
    string[]
  >>;
  forms?: string[];
  professionUses?: string[];
  regions?: string[];
  sources?: string[];
  tradeRole?: string;
  rarityBand?: string;
  qualityBands?: string[];
  bulkProfile?: string;
  storageNeeds?: string[];
  decayProfile?: string;
  marketBehavior?: string[];
  loafValue: number;
  size: number;
  weight: number;
  pull?: number;
  carry?: number;
  kingdomIndex: number | null;
  unique?: boolean;
  rarity?: number;
};

export type InventoryEntry = {
  itemIndex: number;
  quantity: number;
  offerQuantity: number;
  protected?: boolean;
  conceal?: boolean;
  highlighted?: boolean;
  note?: string;
};

export type Bias = {
  tag: string;
  percent: number;
};

export type ObtainableItem = {
  tag: string;
  quantityMin: number;
  quantityMax: number;
};

export type Character = {
  characterId?: string;
  index: number;
  name: string;
  profession: string;
  professionSlug: string | null;
  stockRole?: string | null;
  stockProfileMode?: "explicit" | "fallback";
  primaryStockTags?: string[];
  secondaryStockTags?: string[];
  portraitFile?: string | null;
  stallFile?: string | null;
  isActive: boolean;
  isMerchant: boolean;
  isPlunderer?: boolean;
  isTraveler?: boolean;
  isBeggar?: boolean;
  isSnitch?: boolean;
  vote?: string | null;
  mythDeck?: unknown;
  mythDefeated?: boolean;
  companyJob?: {
    timeInWeeks: number;
    riskPercent: number;
    costInGold: number;
    storageTag: string;
    rewardAmount: number;
    rewardItem: string;
    rewardLabel: string;
    rewardText: string;
    kingdomIndex: number | null;
  } | null;
  marketplaceIndex: number;
  dayAvailable?: number | null;
  marketplaces?: number[];
  stockLastRestockDay?: number;
  maxObtainValue: number;
  frugalPercent: number;
  hagglePercent?: number;
  closeToDealPercent: number;
  reachingDealPercent: number;
  farFromDealPercent?: number;
  dialogue?: {
    who?: string;
    preference?: string;
    customQuestion?: string;
    customReply?: string;
  };
  bias: Bias[];
  obtainableItems: ObtainableItem[];
  excludedObtainItems: string[];
  inventory: InventoryEntry[];
};

export type Marketplace = {
  index: number;
  name: string;
  kingdomIndex: number;
  unlocked?: boolean;
  townsquareFile: string;
  backdropFile: string;
  musicFile?: string | null;
  ambiancePrimaryFile?: string | null;
  ambianceSecondaryFile?: string | null;
  stallage: number;
  event?: {
    name?: string | null;
    frequency?: string | null;
    characterName?: string | null;
    scene?: string | null;
    datetime?: {
      day?: number;
      week?: number;
      season?: number;
      year?: number;
    } | null;
    data?: Record<string, unknown>;
  } | null;
  quest?: {
    name: string;
    todo?: string | null;
    scene?: string | null;
    started?: boolean;
    finished?: boolean;
    questItems?: string[];
    data?: Record<string, unknown>;
    outcome?: unknown;
    wonVote?: boolean;
  } | null;
  bias?: Bias[];
  location?: {
    top: number;
    left: number;
  };
  theft?: {
    percent: number;
    maxLoafValue: number;
    maxQuantity: number;
    maxSize: number;
  };
  connections: Array<{
    marketplaceIndex: number;
    routeFile: string;
    travelDays: number;
    tolls: number;
  }>;
};

export type Kingdom = {
  index: number;
  name: string;
  bias?: Bias[];
  illegalItemTags?: string[];
};

export type Profession = {
  slug: string;
  bias?: Bias[];
  obtainableItems?: ObtainableItem[];
};
