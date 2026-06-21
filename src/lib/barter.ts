import type { Bias, Character, InventoryEntry, Item, Marketplace, Profession } from "../data/types";
import { itemMatchesCatalogToken } from "./item-catalog";

export type TradePerspective = "player" | "character";
export type TradeAppraisal = "great_deal" | "good_deal" | "fair_deal" | "close" | "reaching" | "far" | "leave";
export type OfferabilityMode = "manual" | "auto";

export type ValueAdjustment = {
  label: string;
  amount: number;
};

export type OfferValueLine = {
  itemName: string;
  quantity: number;
  baseValue: number;
  finalValue: number;
  adjustments: ValueAdjustment[];
};

export type OfferFailureContext = {
  playerValue: number;
  characterValue: number;
  appraisal: TradeAppraisal;
  character?: Character | null;
  hasIllegalGoods?: boolean;
  hasProtectedGoods?: boolean;
  hasConcealedGoods?: boolean;
  hasPlayerOffer?: boolean;
  hasCharacterOffer?: boolean;
};

const EXOTIC_BIAS_PERCENT = 20;
const BULK_BIAS_NERF = 10;
const MAX_BULK_BIAS_PERCENT = 25;
const HAGGLE_DECREASE_MULTIPLIER = 2;
const DEFAULT_BIAS_MAGNITUDE = 1;

const ACCEPTED_APPRAISALS: TradeAppraisal[] = ["great_deal", "good_deal", "fair_deal"];

function matchesBias(item: Item, bias: Bias) {
  return itemMatchesCatalogToken(item, bias.tag);
}

function percentage(value: number, percent: number) {
  return (value * percent) / 100;
}

export function characterBias(character: Character, item: Item, baseValue: number, biasMagnitude = DEFAULT_BIAS_MAGNITUDE) {
  return (character.bias || []).reduce((total, bias) => {
    if (!matchesBias(item, bias)) return total;
    return total + percentage(baseValue, bias.percent * biasMagnitude);
  }, 0);
}

export function professionBias(profession: Profession | undefined, item: Item, baseValue: number, biasMagnitude = DEFAULT_BIAS_MAGNITUDE) {
  return (profession?.bias || []).reduce((total, bias) => {
    if (!matchesBias(item, bias)) return total;
    return total + percentage(baseValue, bias.percent * biasMagnitude);
  }, 0);
}

export function marketplaceBias(marketplace: Marketplace | undefined, item: Item, baseValue: number, biasMagnitude = DEFAULT_BIAS_MAGNITUDE) {
  const biases = ((marketplace as unknown as { bias?: Bias[] })?.bias || []);
  return biases.reduce((total, bias) => {
    if (!matchesBias(item, bias)) return total;
    return total + percentage(baseValue, bias.percent * biasMagnitude);
  }, 0);
}

export function kingdomBias(kingdom: { bias?: Bias[] } | undefined, item: Item, baseValue: number, biasMagnitude = DEFAULT_BIAS_MAGNITUDE) {
  return (kingdom?.bias || []).reduce((total, bias) => {
    if (!matchesBias(item, bias)) return total;
    return total + percentage(baseValue, bias.percent * biasMagnitude);
  }, 0);
}

export function exoticBias(currentKingdomIndex: number | undefined, item: Item, baseValue: number) {
  if (item.kingdomIndex === null || currentKingdomIndex === undefined || item.kingdomIndex === currentKingdomIndex) return 0;
  return percentage(baseValue, EXOTIC_BIAS_PERCENT);
}

export function bulkBias(baseValue: number, quantity: number) {
  let discountPercent = quantity > BULK_BIAS_NERF ? quantity / BULK_BIAS_NERF : 0;
  discountPercent = Math.min(MAX_BULK_BIAS_PERCENT, discountPercent);
  return percentage(baseValue, -discountPercent);
}

export function frugalBias(character: Character, baseValue: number, perspective: TradePerspective, ultimatum?: boolean) {
  if (ultimatum || perspective !== "player") return 0;
  return percentage(baseValue, -Math.max(0, character.frugalPercent || 0));
}

export function hagglingBias(character: Character, baseValue: number, perspective: TradePerspective, offersMade = 0, ultimatum?: boolean) {
  if (ultimatum || perspective !== "character") return 0;
  const percent = Math.max(0, (character.hagglePercent || 0) - offersMade * HAGGLE_DECREASE_MULTIPLIER);
  return percentage(baseValue, percent);
}

export function illegalRiskBias(item: Item, baseValue: number, illegalTags: string[] = [], blackMarket = false, heat = 0) {
  if (!illegalTags.some((tag) => itemMatchesCatalogToken(item, tag))) return 0;
  const heatPremium = Math.min(30, Math.max(0, heat) * 0.25);
  const percent = blackMarket ? 20 + heatPremium : -45 - heatPremium;
  return percentage(baseValue, percent);
}

export function valueOffer(options: {
  inventory: InventoryEntry[];
  items: Item[];
  character: Character | null;
  profession?: Profession;
  marketplace?: Marketplace;
  kingdom?: { bias?: Bias[]; index?: number };
  offersMade?: number;
  difficulty?: number;
  biasMagnitude?: number;
  ultimatum?: boolean;
  illegalTags?: string[];
  blackMarket?: boolean;
  heat?: number;
  perspective: TradePerspective;
}) {
  return valueOfferBreakdown(options).total;
}

export function valueOfferBreakdown(options: {
  inventory: InventoryEntry[];
  items: Item[];
  character: Character | null;
  profession?: Profession;
  marketplace?: Marketplace;
  kingdom?: { bias?: Bias[]; index?: number };
  offersMade?: number;
  difficulty?: number;
  biasMagnitude?: number;
  ultimatum?: boolean;
  illegalTags?: string[];
  blackMarket?: boolean;
  heat?: number;
  perspective: TradePerspective;
}) {
  const { inventory, items, character, profession, marketplace, kingdom, offersMade = 0, difficulty = 0, biasMagnitude = DEFAULT_BIAS_MAGNITUDE, ultimatum, illegalTags = [], blackMarket = false, heat = 0, perspective } = options;
  const lines: OfferValueLine[] = [];
  const total = inventory.reduce((sum, entry) => {
    if (entry.offerQuantity <= 0) return sum;
    const item = items[entry.itemIndex];
    const baseValue = item.loafValue * entry.offerQuantity;
    const adjustments: ValueAdjustment[] = [
      { label: "Bulk stack", amount: bulkBias(baseValue, entry.offerQuantity) },
      { label: "Market demand", amount: marketplaceBias(marketplace, item, baseValue, biasMagnitude) },
      { label: "Kingdom demand", amount: kingdomBias(kingdom, item, baseValue, biasMagnitude) },
      { label: "Imported goods", amount: exoticBias(kingdom?.index, item, baseValue) },
      { label: blackMarket ? "Underworld risk premium" : "Illegal risk discount", amount: illegalRiskBias(item, baseValue, illegalTags, blackMarket, heat) },
    ];

    if (character) {
      adjustments.push(
        { label: "Personal taste", amount: characterBias(character, item, baseValue, biasMagnitude) },
        { label: "Profession taste", amount: professionBias(profession, item, baseValue, biasMagnitude) },
        { label: "Frugal discount", amount: frugalBias(character, baseValue, perspective, ultimatum) },
        { label: "Haggling pressure", amount: hagglingBias(character, baseValue, perspective, offersMade, ultimatum) }
      );
    }

    adjustments.push({ label: "Difficulty", amount: percentage(baseValue, perspective === "player" ? -difficulty : difficulty) });

    const rawValue = baseValue + adjustments.reduce((lineTotal, adjustment) => lineTotal + adjustment.amount, 0);
    const finalValue = Math.max(0, rawValue);
    lines.push({
      itemName: item.name,
      quantity: entry.offerQuantity,
      baseValue,
      finalValue,
      adjustments: adjustments.filter((adjustment) => Math.abs(adjustment.amount) > 0.001),
    });
    return sum + finalValue;
  }, 0);
  return { total, lines };
}

export function appraiseOffer(playerValue: number, characterValue: number, character: Character): TradeAppraisal {
  const difference = playerValue - characterValue;
  const close = (characterValue * (character.closeToDealPercent || 10)) / 100;
  const reaching = (characterValue * (character.reachingDealPercent || 40)) / 100;
  const far = (characterValue * (character.farFromDealPercent || 80)) / 100;

  if (difference > reaching) return "great_deal";
  if (difference > close) return "good_deal";
  if (difference > 0) return "fair_deal";
  if (difference > -close) return "close";
  if (difference > -reaching) return "reaching";
  if (difference > -far) return "far";
  return "leave";
}

export function canAcceptAppraisal(appraisal: TradeAppraisal) {
  return ACCEPTED_APPRAISALS.includes(appraisal);
}

export function availableQuantity(entry: InventoryEntry) {
  return Math.max(0, entry.quantity - Math.max(0, entry.offerQuantity || 0));
}

export function isOfferableEntry(entry: InventoryEntry, mode: OfferabilityMode = "manual") {
  if (availableQuantity(entry) <= 0) return false;
  if (entry.protected) return false;
  if (mode === "auto" && entry.conceal) return false;
  return true;
}

export function visibleOfferableInventory(inventory: InventoryEntry[], mode: OfferabilityMode = "auto") {
  return inventory.filter((entry) => isOfferableEntry(entry, mode));
}

export function explainOfferFailure(context: OfferFailureContext) {
  const {
    playerValue,
    characterValue,
    appraisal,
    hasIllegalGoods = false,
    hasProtectedGoods = false,
    hasConcealedGoods = false,
    hasPlayerOffer = playerValue > 0,
    hasCharacterOffer = characterValue > 0,
  } = context;

  if (canAcceptAppraisal(appraisal)) return null;
  if (!hasPlayerOffer && !hasCharacterOffer) return "No goods are currently offered.";
  if (!hasPlayerOffer) return "Add goods or coins to your side of the offer.";
  if (!hasCharacterOffer) return "Select something from the customer's stock or use Ask Price first.";
  if (hasProtectedGoods) return "Protected goods cannot be offered accidentally.";
  if (hasConcealedGoods) return "Concealed goods are ignored by automatic offer matching.";
  if (hasIllegalGoods) return "Illegal goods make this deal risky for a normal trader.";
  if (appraisal === "close") return "The customer is close to accepting, but still wants a little more value.";
  if (appraisal === "reaching") return "The customer thinks the offer is reaching.";
  if (appraisal === "far") return "The customer thinks the offer is far from fair.";
  if (appraisal === "leave") return "The customer wants a much better offer.";
  if (playerValue <= characterValue) return "The offer is not in the customer's favor yet.";
  return "The customer wants a much better offer.";
}
