export type Item = {
  index: number;
  name: string;
  iconFile?: string | null;
  tags: string[];
  loafValue: number;
  size: number;
  weight: number;
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
  index: number;
  name: string;
  profession: string;
  professionSlug: string | null;
  portraitFile?: string | null;
  stallFile?: string | null;
  isActive: boolean;
  isMerchant: boolean;
  isPlunderer?: boolean;
  isTraveler?: boolean;
  marketplaceIndex: number;
  marketplaces?: number[];
  maxObtainValue: number;
  frugalPercent: number;
  closeToDealPercent: number;
  reachingDealPercent: number;
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
  stallage: number;
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

export type Profession = {
  slug: string;
  bias?: Bias[];
  obtainableItems?: ObtainableItem[];
};
