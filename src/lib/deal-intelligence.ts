import type { Character } from "@/data/types";
import { valueOfferBreakdown, type OfferValueLine } from "./barter";
import { currentKingdom, currentMarket, items, professions, type GameState } from "./game";
import { money } from "./format";
import { canUseBlackMarket, kingdomHeat } from "./law";
import { npcRoles } from "./npc-behavior";
import { ensureRelation } from "./reputation";

export type DealHint = {
  label: string;
  detail: string;
  tone: "good" | "bad" | "neutral";
};

function strongestAdjustments(lines: OfferValueLine[]) {
  return lines
    .flatMap((line) => line.adjustments.map((adjustment) => ({ ...adjustment, itemName: line.itemName })))
    .sort((left, right) => Math.abs(right.amount) - Math.abs(left.amount))
    .slice(0, 4);
}

export function buildDealHints(state: GameState, character: Character | null, playerOffer: number, characterOffer: number) {
  if (!character) return [];
  const profession = character.professionSlug ? professions[character.professionSlug] : undefined;
  const kingdom = currentKingdom(state);
  const relation = ensureRelation(state.npcRelations, character);
  const blackMarket = canUseBlackMarket(state.law, relation.trust, npcRoles(character).includes("thief"));
  const shared = {
    items,
    character,
    profession,
    marketplace: currentMarket(state),
    kingdom,
    offersMade: state.offersMade,
    illegalTags: kingdom.illegalItemTags || [],
    blackMarket,
    heat: kingdomHeat(state.law, kingdom.index),
  };
  const player = valueOfferBreakdown({ ...shared, inventory: state.playerInventory, perspective: "player" });
  const npc = valueOfferBreakdown({ ...shared, inventory: character.inventory, perspective: "character" });
  const missing = Math.max(0, Math.ceil(characterOffer - playerOffer));
  const excess = Math.max(0, Math.ceil(playerOffer - characterOffer));
  const hints: DealHint[] = [];

  if (missing > 0) hints.push({ label: "Missing Value", detail: `${money(missing)} more is needed.`, tone: "bad" });
  if (excess > 0) hints.push({ label: "Your Edge", detail: `${money(excess)} above their offer.`, tone: "good" });
  if (state.offersMade > 0) hints.push({ label: "Haggling", detail: `${state.offersMade} failed offer${state.offersMade === 1 ? "" : "s"} softened their countervalue.`, tone: "neutral" });

  for (const adjustment of strongestAdjustments([...player.lines, ...npc.lines])) {
    hints.push({
      label: adjustment.label,
      detail: `${adjustment.itemName}: ${adjustment.amount > 0 ? "+" : ""}${money(Math.round(adjustment.amount))}`,
      tone: adjustment.amount > 0 ? "good" : "bad",
    });
  }

  return hints.slice(0, 6);
}
