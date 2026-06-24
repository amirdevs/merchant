import { questCatalog } from "@/data/quests/questCatalog";
import type { QuestChoice, RichQuest, RichQuestStatus } from "@/data/quests/questTypes";
import { buildVerticalSliceJournal, type RichQuestJournalEntry } from "@/lib/quest-journal-view-model";
import { verticalSliceRichQuests } from "@/lib/quest-selectors";
import {
  acceptRichQuest,
  addRichQuestNote,
  advanceRichQuestStage,
  createRichQuestRuntimeState,
  describeRichQuestStatus,
  richQuestStatus,
  type RichQuestRuntimeState,
} from "@/lib/quest-state";
import { completeRichQuestWithChoice } from "@/lib/quest-effects";

export const FIRST_PLAYABLE_QUEST_CHAIN_IDS = [
  "main-02-first-honest-profit",
  "side-01-bread-before-dawn",
  "main-11-the-false-scale",
  "main-18-warehouse-lease",
  "main-16-a-name-on-the-door",
] as const;

export type FirstPlayableQuestChainId = (typeof FIRST_PLAYABLE_QUEST_CHAIN_IDS)[number];

export type FirstPlayableQuestChainState = RichQuestRuntimeState & {
  selectedQuestId: string;
  completedChain: boolean;
};

export type FirstPlayableQuestCard = RichQuestJournalEntry & {
  quest: RichQuest;
  lockedByPreviousQuest: boolean;
  canAccept: boolean;
  canAdvance: boolean;
  canResolve: boolean;
  selectedChoiceId: string | null;
};

export type FirstPlayableQuestChainView = {
  title: string;
  summary: string;
  selectedQuestId: string;
  selectedQuest: FirstPlayableQuestCard;
  cards: FirstPlayableQuestCard[];
  completedCount: number;
  totalCount: number;
  activeCount: number;
  progressPercent: number;
  leadingEndingScores: Array<[string, number]>;
  unlockedCompanyFeatures: string[];
  completedChain: boolean;
};

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function chainQuests() {
  return verticalSliceRichQuests(questCatalog);
}

function previousQuestId(questId: string) {
  const index = FIRST_PLAYABLE_QUEST_CHAIN_IDS.indexOf(questId as FirstPlayableQuestChainId);
  return index > 0 ? FIRST_PLAYABLE_QUEST_CHAIN_IDS[index - 1] : null;
}

function nextQuestId(questId: string) {
  const index = FIRST_PLAYABLE_QUEST_CHAIN_IDS.indexOf(questId as FirstPlayableQuestChainId);
  return index >= 0 && index < FIRST_PLAYABLE_QUEST_CHAIN_IDS.length - 1 ? FIRST_PLAYABLE_QUEST_CHAIN_IDS[index + 1] : null;
}

export function createFirstPlayableQuestChainState(day = 1): FirstPlayableQuestChainState {
  const base = createRichQuestRuntimeState(day) as FirstPlayableQuestChainState;
  base.selectedQuestId = FIRST_PLAYABLE_QUEST_CHAIN_IDS[0];
  base.completedChain = false;
  for (const questId of FIRST_PLAYABLE_QUEST_CHAIN_IDS) {
    base.questStates[questId] = questId === FIRST_PLAYABLE_QUEST_CHAIN_IDS[0] ? "available" : "locked";
  }
  base.unlockedQuestIds = [FIRST_PLAYABLE_QUEST_CHAIN_IDS[0]];
  base.questNotes[FIRST_PLAYABLE_QUEST_CHAIN_IDS[0]] = [
    "The first playable story chain begins here. Use the buttons to test acceptance, stages, and choices before deeper economy gates are wired.",
  ];
  return base;
}

export function ensureFirstPlayableQuestChainState(value: unknown, day = 1): FirstPlayableQuestChainState {
  const fallback = createFirstPlayableQuestChainState(day);
  const candidate = value as Partial<FirstPlayableQuestChainState> | null;
  if (!candidate || typeof candidate !== "object") return fallback;

  const next: FirstPlayableQuestChainState = {
    ...fallback,
    ...clone(candidate),
    day: typeof candidate.day === "number" ? candidate.day : day,
    questStates: { ...fallback.questStates, ...(candidate.questStates || {}) },
    questAcceptedDays: { ...(candidate.questAcceptedDays || {}) },
    questStageIndexes: { ...(candidate.questStageIndexes || {}) },
    questChoices: { ...(candidate.questChoices || {}) },
    questNotes: { ...fallback.questNotes, ...(candidate.questNotes || {}) },
    npcTrust: { ...(candidate.npcTrust || {}) },
    cityReputation: { ...(candidate.cityReputation || {}) },
    factionReputation: { ...(candidate.factionReputation || {}) },
    legalHeat: typeof candidate.legalHeat === "number" ? candidate.legalHeat : 0,
    endingScores: { ...(candidate.endingScores || {}) },
    unlockedQuestIds: Array.isArray(candidate.unlockedQuestIds) ? candidate.unlockedQuestIds : [...fallback.unlockedQuestIds],
    blockedQuestIds: Array.isArray(candidate.blockedQuestIds) ? candidate.blockedQuestIds : [],
    unlockedRouteIds: Array.isArray(candidate.unlockedRouteIds) ? candidate.unlockedRouteIds : [],
    unlockedWarehouseIds: Array.isArray(candidate.unlockedWarehouseIds) ? candidate.unlockedWarehouseIds : [],
    companyUnlocks: Array.isArray(candidate.companyUnlocks) ? candidate.companyUnlocks : [],
    marketEvents: Array.isArray(candidate.marketEvents) ? candidate.marketEvents : [],
    selectedQuestId: typeof candidate.selectedQuestId === "string" ? candidate.selectedQuestId : fallback.selectedQuestId,
    completedChain: Boolean(candidate.completedChain),
  };

  for (const questId of FIRST_PLAYABLE_QUEST_CHAIN_IDS) {
    const previous = previousQuestId(questId);
    if (!previous) {
      if (richQuestStatus(next, questId) === "locked") next.questStates[questId] = "available";
      if (!next.unlockedQuestIds.includes(questId)) next.unlockedQuestIds.push(questId);
      continue;
    }
    if (richQuestStatus(next, previous) === "completed" && richQuestStatus(next, questId) === "locked") {
      next.questStates[questId] = "available";
      if (!next.unlockedQuestIds.includes(questId)) next.unlockedQuestIds.push(questId);
    }
  }

  if (!FIRST_PLAYABLE_QUEST_CHAIN_IDS.includes(next.selectedQuestId as FirstPlayableQuestChainId)) {
    next.selectedQuestId = FIRST_PLAYABLE_QUEST_CHAIN_IDS.find((questId) => richQuestStatus(next, questId) !== "completed") || FIRST_PLAYABLE_QUEST_CHAIN_IDS[0];
  }
  next.completedChain = FIRST_PLAYABLE_QUEST_CHAIN_IDS.every((questId) => richQuestStatus(next, questId) === "completed");
  return next;
}

export function selectFirstPlayableQuest(state: FirstPlayableQuestChainState, questId: string): FirstPlayableQuestChainState {
  const next = ensureFirstPlayableQuestChainState(state);
  if (FIRST_PLAYABLE_QUEST_CHAIN_IDS.includes(questId as FirstPlayableQuestChainId)) next.selectedQuestId = questId;
  return next;
}

export function acceptFirstPlayableQuest(state: FirstPlayableQuestChainState, questId = state.selectedQuestId): FirstPlayableQuestChainState {
  const quest = chainQuests().find((entry) => entry.id === questId);
  if (!quest) return state;
  const current = richQuestStatus(state, questId);
  if (current !== "available" && current !== "offered") return addRichQuestNote(state, questId, `Cannot accept while status is ${describeRichQuestStatus(current)}.`) as FirstPlayableQuestChainState;
  const result = acceptRichQuest(state, quest, state.day);
  const next = result.state as FirstPlayableQuestChainState;
  next.selectedQuestId = questId;
  return addRichQuestNote(next, questId, `${quest.title} is now active. ${quest.openingScene.summary}`) as FirstPlayableQuestChainState;
}

export function advanceFirstPlayableQuest(state: FirstPlayableQuestChainState, questId = state.selectedQuestId): FirstPlayableQuestChainState {
  const quest = chainQuests().find((entry) => entry.id === questId);
  if (!quest) return state;
  const result = advanceRichQuestStage(state, quest);
  const next = result.state as FirstPlayableQuestChainState;
  next.selectedQuestId = questId;
  const stage = quest.stages[next.questStageIndexes[questId] || 0];
  return addRichQuestNote(next, questId, stage ? `${stage.title}: ${stage.objective}` : result.message) as FirstPlayableQuestChainState;
}

export function chooseFirstPlayableQuestOutcome(state: FirstPlayableQuestChainState, questId: string, choiceId: string): FirstPlayableQuestChainState {
  const quest = chainQuests().find((entry) => entry.id === questId);
  if (!quest) return state;
  const choice = quest.choices.find((entry) => entry.id === choiceId) || quest.choices[0];
  if (!choice) return addRichQuestNote(state, questId, "This quest has no playable outcome choices yet.") as FirstPlayableQuestChainState;
  let next = completeRichQuestWithChoice(state, questId, choice) as FirstPlayableQuestChainState;
  next = addRichQuestNote(next, questId, `${choice.label}: ${choice.description}`) as FirstPlayableQuestChainState;
  next = addRichQuestNote(next, questId, quest.successEnding) as FirstPlayableQuestChainState;

  const unlocked = nextQuestId(questId);
  if (unlocked) {
    next.questStates[unlocked] = "available";
    if (!next.unlockedQuestIds.includes(unlocked)) next.unlockedQuestIds.push(unlocked);
    next.questNotes[unlocked] ||= [];
    next.questNotes[unlocked].push(`Unlocked after ${quest.title}.`);
    next.selectedQuestId = unlocked;
  } else {
    next.completedChain = true;
    next.selectedQuestId = questId;
    if (!next.companyUnlocks.includes("company-registration-ready")) next.companyUnlocks.push("company-registration-ready");
  }
  return ensureFirstPlayableQuestChainState(next, state.day);
}

export function failFirstPlayableQuest(state: FirstPlayableQuestChainState, questId = state.selectedQuestId): FirstPlayableQuestChainState {
  const next = clone(state) as FirstPlayableQuestChainState;
  next.questStates[questId] = "failed";
  next.questNotes[questId] ||= [];
  next.questNotes[questId].push("Failed during vertical-slice testing. This branch is kept so failure UI can be checked.");
  return ensureFirstPlayableQuestChainState(next, state.day);
}

function statusCardFlags(status: RichQuestStatus, lockedByPreviousQuest: boolean) {
  return {
    lockedByPreviousQuest,
    canAccept: !lockedByPreviousQuest && (status === "available" || status === "offered"),
    canAdvance: status === "accepted" || status === "in_progress",
    canResolve: status === "ready_to_turn_in" || status === "in_progress" || status === "accepted",
  };
}

export function buildFirstPlayableQuestChainView(state: FirstPlayableQuestChainState): FirstPlayableQuestChainView {
  const safeState = ensureFirstPlayableQuestChainState(state);
  const journals = buildVerticalSliceJournal(safeState, questCatalog);
  const quests = chainQuests();
  const cards = journals.map((entry) => {
    const quest = quests.find((candidate) => candidate.id === entry.id)!;
    const previous = previousQuestId(entry.id);
    const lockedByPreviousQuest = Boolean(previous && richQuestStatus(safeState, previous) !== "completed");
    const status = richQuestStatus(safeState, entry.id);
    return {
      ...entry,
      quest,
      selectedChoiceId: safeState.questChoices[entry.id] || null,
      ...statusCardFlags(status, lockedByPreviousQuest),
    } satisfies FirstPlayableQuestCard;
  });

  const selectedQuest = cards.find((entry) => entry.id === safeState.selectedQuestId) || cards[0];
  if (!selectedQuest) throw new Error("First playable quest chain has no quest cards.");
  const completedCount = cards.filter((entry) => richQuestStatus(safeState, entry.id) === "completed").length;
  const activeCount = cards.filter((entry) => ["accepted", "in_progress", "ready_to_turn_in"].includes(richQuestStatus(safeState, entry.id))).length;

  return {
    title: "First Playable Story Chain",
    summary: "A five-quest merchant story proving rich quest acceptance, stages, choices, consequences, unlocks, and company registration readiness.",
    selectedQuestId: selectedQuest.id,
    selectedQuest,
    cards,
    completedCount,
    totalCount: cards.length,
    activeCount,
    progressPercent: cards.length ? Math.round((completedCount / cards.length) * 100) : 0,
    leadingEndingScores: Object.entries(safeState.endingScores).sort((a, b) => b[1] - a[1]).slice(0, 5),
    unlockedCompanyFeatures: safeState.companyUnlocks,
    completedChain: safeState.completedChain,
  };
}

export function completeFirstPlayableQuestWithDefaultChoice(state: FirstPlayableQuestChainState, questId = state.selectedQuestId): FirstPlayableQuestChainState {
  const quest = chainQuests().find((entry) => entry.id === questId);
  const choice: QuestChoice | undefined = quest?.choices[0];
  return choice ? chooseFirstPlayableQuestOutcome(state, questId, choice.id) : state;
}
