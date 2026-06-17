import type { Bias, Character, InventoryEntry, Item, Marketplace, Profession } from "../data/types";

export type TradePerspective = "player" | "character";

const EXOTIC_BIAS_PERCENT = 20;
const BULK_BIAS_NERF = 10;
const MAX_BULK_BIAS_PERCENT = 25;
const HAGGLE_DECREASE_MULTIPLIER = 2;
const DEFAULT_BIAS_MAGNITUDE = 1;

function matchesBias(item: Item, bias: Bias) {
  return item.name === bias.tag || item.tags.includes(bias.tag);
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
  perspective: TradePerspective;
}) {
  const { inventory, items, character, profession, marketplace, kingdom, offersMade = 0, difficulty = 0, biasMagnitude = DEFAULT_BIAS_MAGNITUDE, ultimatum, perspective } = options;
  return inventory.reduce((sum, entry) => {
    if (entry.offerQuantity <= 0) return sum;
    const item = items[entry.itemIndex];
    const baseValue = item.loafValue * entry.offerQuantity;
    let value =
      baseValue +
      bulkBias(baseValue, entry.offerQuantity) +
      marketplaceBias(marketplace, item, baseValue, biasMagnitude) +
      kingdomBias(kingdom, item, baseValue, biasMagnitude) +
      exoticBias(kingdom?.index, item, baseValue);

    if (character) {
      value += characterBias(character, item, baseValue, biasMagnitude);
      value += professionBias(profession, item, baseValue, biasMagnitude);
      value += frugalBias(character, baseValue, perspective, ultimatum);
      value += hagglingBias(character, baseValue, perspective, offersMade, ultimatum);
    }

    value += percentage(baseValue, perspective === "player" ? -difficulty : difficulty);

    return sum + Math.max(0, value);
  }, 0);
}

export function appraiseOffer(playerValue: number, characterValue: number, character: Character) {
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
