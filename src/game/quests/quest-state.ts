import type { RichQuest, RichQuestStatus } from "@/content/quests/questTypes";

export type RichQuestRuntimeState = {
  day: number;
  questStates: Record<string, RichQuestStatus>;
  questAcceptedDays: Record<string, number>;
  questStageIndexes: Record<string, number>;
  questChoices: Record<string, string>;
  questNotes: Record<string, string[]>;
  npcTrust: Record<string, number>;
  cityReputation: Record<string, number>;
  factionReputation: Record<string, number>;
  legalHeat: number;
  endingScores: Record<string, number>;
  unlockedQuestIds: string[];
  blockedQuestIds: string[];
  unlockedRouteIds: string[];
  unlockedWarehouseIds: string[];
  companyUnlocks: string[];
  marketEvents: string[];
};

export function createRichQuestRuntimeState(day = 1): RichQuestRuntimeState {
  return {
    day,
    questStates: {},
    questAcceptedDays: {},
    questStageIndexes: {},
    questChoices: {},
    questNotes: {},
    npcTrust: {},
    cityReputation: {},
    factionReputation: {},
    legalHeat: 0,
    endingScores: {},
    unlockedQuestIds: [],
    blockedQuestIds: [],
    unlockedRouteIds: [],
    unlockedWarehouseIds: [],
    companyUnlocks: [],
    marketEvents: [],
  };
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function uniquePush(list: string[], value: string) {
  if (!list.includes(value)) list.push(value);
}

export function richQuestStatus(state: Pick<RichQuestRuntimeState, "questStates">, questId: string): RichQuestStatus {
  return state.questStates[questId] || "locked";
}

export function describeRichQuestStatus(status: RichQuestStatus) {
  const labels: Record<RichQuestStatus, string> = {
    locked: "locked",
    available: "available",
    offered: "offered",
    accepted: "accepted",
    in_progress: "in progress",
    ready_to_turn_in: "ready to turn in",
    completed: "completed",
    failed: "failed",
    expired: "expired",
    blocked: "blocked",
  };
  return labels[status];
}

export function richQuestIsActive(status: RichQuestStatus) {
  return status === "accepted" || status === "in_progress" || status === "ready_to_turn_in";
}

export function offerRichQuest(state: RichQuestRuntimeState, questId: string) {
  const next = clone(state);
  if (richQuestStatus(next, questId) === "locked") next.questStates[questId] = "offered";
  return next;
}

export function unlockRichQuest(state: RichQuestRuntimeState, questId: string) {
  const next = clone(state);
  uniquePush(next.unlockedQuestIds, questId);
  if (richQuestStatus(next, questId) === "locked") next.questStates[questId] = "available";
  return next;
}

export function blockRichQuest(state: RichQuestRuntimeState, questId: string) {
  const next = clone(state);
  uniquePush(next.blockedQuestIds, questId);
  next.questStates[questId] = "blocked";
  return next;
}

export function acceptRichQuest(state: RichQuestRuntimeState, quest: Pick<RichQuest, "id" | "stages">, day = state.day) {
  const current = richQuestStatus(state, quest.id);
  if (["completed", "failed", "expired", "blocked"].includes(current)) return { ok: false, state, message: `Quest ${quest.id} is ${describeRichQuestStatus(current)}.` };

  const next = clone(state);
  next.questStates[quest.id] = quest.stages.length > 0 ? "in_progress" : "accepted";
  next.questAcceptedDays[quest.id] = day;
  next.questStageIndexes[quest.id] = 0;
  next.questNotes[quest.id] = [`Accepted on day ${day}.`];
  return { ok: true, state: next, message: `Accepted ${quest.id}.` };
}

export function advanceRichQuestStage(state: RichQuestRuntimeState, quest: Pick<RichQuest, "id" | "stages">) {
  const current = richQuestStatus(state, quest.id);
  if (!richQuestIsActive(current)) return { ok: false, state, message: `Quest ${quest.id} is not active.` };

  const next = clone(state);
  const currentIndex = next.questStageIndexes[quest.id] || 0;
  const nextIndex = Math.min(currentIndex + 1, Math.max(quest.stages.length - 1, 0));
  next.questStageIndexes[quest.id] = nextIndex;
  next.questStates[quest.id] = nextIndex >= quest.stages.length - 1 ? "ready_to_turn_in" : "in_progress";
  next.questNotes[quest.id] ||= [];
  next.questNotes[quest.id].push(`Advanced to stage ${nextIndex + 1}.`);
  return { ok: true, state: next, message: `Advanced ${quest.id} to stage ${nextIndex + 1}.` };
}

export function resolveRichQuest(state: RichQuestRuntimeState, questId: string, status: Extract<RichQuestStatus, "completed" | "failed" | "expired"> = "completed") {
  const next = clone(state);
  next.questStates[questId] = status;
  next.questNotes[questId] ||= [];
  next.questNotes[questId].push(`Resolved as ${status}.`);
  return next;
}

export function recordRichQuestChoice(state: RichQuestRuntimeState, questId: string, choiceId: string) {
  const next = clone(state);
  next.questChoices[questId] = choiceId;
  next.questNotes[questId] ||= [];
  next.questNotes[questId].push(`Choice selected: ${choiceId}.`);
  return next;
}

export function addRichQuestNote(state: RichQuestRuntimeState, questId: string, note: string) {
  const next = clone(state);
  next.questNotes[questId] ||= [];
  next.questNotes[questId].push(note);
  return next;
}
