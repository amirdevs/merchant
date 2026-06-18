import type { Character } from "@/data/types";
import type { GameState } from "./game";
import type { DialogueEffect } from "./dialogue";
import { ensureRelation } from "./reputation";
import { marketplaces } from "./game";

type DialogueEffectHandler = (state: GameState, character: Character) => string;

const effectHandlers: Record<DialogueEffect, DialogueEffectHandler> = {
  "accept-local-quest": (state, character) => {
    const market = marketplaces[state.marketIndex];
    if (!market.quest) return `${character.name} has no local quest to offer here.`;
    const key = String(market.index);
    const status = state.questStates[key] || "offered";
    if (status === "finished") return `${market.quest.name} is already complete.`;
    state.questStates[key] = "accepted";
    state.questAcceptedDays[key] ??= state.day;
    const relation = ensureRelation(state.npcRelations, character);
    relation.mood += 1;
    return `${market.quest.name} accepted and added to your journal.`;
  },
};

export function applyDialogueEffect(state: GameState, character: Character, effect: DialogueEffect | undefined) {
  if (!effect) return null;
  return effectHandlers[effect](state, character);
}
