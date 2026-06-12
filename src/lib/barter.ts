import type { Bias, Character, InventoryEntry, Item, Marketplace, Profession } from "../data/types";

export type TradePerspective = "player" | "character";

function matchesBias(item: Item, bias: Bias) {
  return item.name === bias.tag || item.tags.includes(bias.tag);
}

export function characterBias(character: Character, item: Item, baseValue: number) {
  return (character.bias || []).reduce((total, bias) => {
    if (!matchesBias(item, bias)) return total;
    return total + (baseValue * bias.percent) / 100;
  }, 0);
}

export function professionBias(profession: Profession | undefined, item: Item, baseValue: number) {
  return (profession?.bias || []).reduce((total, bias) => {
    if (!matchesBias(item, bias)) return total;
    return total + (baseValue * bias.percent) / 100;
  }, 0);
}

export function marketplaceBias(marketplace: Marketplace | undefined, item: Item, baseValue: number) {
  const biases = ((marketplace as unknown as { bias?: Bias[] })?.bias || []);
  return biases.reduce((total, bias) => {
    if (!matchesBias(item, bias)) return total;
    return total + (baseValue * bias.percent) / 100;
  }, 0);
}

export function valueOffer(options: {
  inventory: InventoryEntry[];
  items: Item[];
  character: Character | null;
  profession?: Profession;
  marketplace?: Marketplace;
  perspective: TradePerspective;
}) {
  const { inventory, items, character, profession, marketplace, perspective } = options;
  return inventory.reduce((sum, entry) => {
    if (entry.offerQuantity <= 0) return sum;
    const item = items[entry.itemIndex];
    const baseValue = item.loafValue * entry.offerQuantity;
    let value = baseValue;

    if (character && perspective === "player") {
      value += characterBias(character, item, baseValue);
      value += professionBias(profession, item, baseValue);
      value += marketplaceBias(marketplace, item, baseValue);
    }

    if (character && perspective === "character") {
      value -= (baseValue * Math.max(0, character.frugalPercent || 0)) / 100;
    }

    return sum + Math.max(0, value);
  }, 0);
}

export function appraiseOffer(playerValue: number, characterValue: number, character: Character) {
  const difference = playerValue - characterValue;
  const close = (characterValue * (character.closeToDealPercent || 10)) / 100;
  const reaching = (characterValue * (character.reachingDealPercent || 40)) / 100;

  if (difference > reaching) return "great_deal";
  if (difference > close) return "good_deal";
  if (difference >= 0) return "fair_deal";
  if (difference > -close) return "close";
  if (difference > -reaching) return "reaching";
  return "bad";
}

