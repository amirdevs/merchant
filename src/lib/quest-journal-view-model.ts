import type { QuestCatalog, QuestStage, RichQuest } from "../data/quests/questTypes";
import { questCatalog } from "../data/quests/questCatalog";
import { allRichQuests } from "./quest-selectors";
import { describeRichQuestStatus, richQuestStatus, type RichQuestRuntimeState } from "./quest-state";

export type RichQuestJournalEntry = {
  id: string;
  title: string;
  actLabel: string;
  category: string;
  status: string;
  portraitCharacterId: string;
  storyHook: string;
  stakes: string;
  currentStage: QuestStage | null;
  approaches: Array<{ id: string; label: string; approach: string; description: string }>;
  rewardPreview: string[];
  consequencePreview: string[];
  relatedNpcIds: string[];
  relatedMarketIds: string[];
  notes: string[];
  isVerticalSlice: boolean;
};

function actLabel(quest: RichQuest) {
  return quest.act ? `Act ${quest.act}` : quest.category.replaceAll("_", " ");
}

export function buildRichQuestJournalEntry(quest: RichQuest, state: RichQuestRuntimeState): RichQuestJournalEntry {
  const status = richQuestStatus(state, quest.id);
  const stageIndex = state.questStageIndexes[quest.id] ?? 0;
  const currentStage = quest.stages[stageIndex] || quest.stages[0] || null;

  return {
    id: quest.id,
    title: quest.title,
    actLabel: actLabel(quest),
    category: quest.category.replaceAll("_", " "),
    status: describeRichQuestStatus(status),
    portraitCharacterId: quest.giverNpcId,
    storyHook: quest.playerHook,
    stakes: quest.emotionalConflict,
    currentStage,
    approaches: quest.choices.map((choice) => ({ id: choice.id, label: choice.label, approach: choice.approach, description: choice.description })),
    rewardPreview: quest.rewards.map((reward) => reward.label),
    consequencePreview: [...quest.consequences.map((consequence) => consequence.label), ...quest.choices.flatMap((choice) => choice.consequences.map((consequence) => consequence.label))].slice(0, 6),
    relatedNpcIds: quest.importantNpcIds,
    relatedMarketIds: [quest.originMarketId, ...(quest.targetMarketIds || [])],
    notes: state.questNotes[quest.id] || [],
    isVerticalSlice: Boolean(quest.verticalSlice),
  };
}

export function buildRichQuestJournal(state: RichQuestRuntimeState, catalog: QuestCatalog = questCatalog) {
  return allRichQuests(catalog).map((quest) => buildRichQuestJournalEntry(quest, state));
}

export function buildVerticalSliceJournal(state: RichQuestRuntimeState, catalog: QuestCatalog = questCatalog) {
  const entries = buildRichQuestJournal(state, catalog);
  return catalog.verticalSliceQuestIds.map((questId) => entries.find((entry) => entry.id === questId)).filter((entry): entry is RichQuestJournalEntry => Boolean(entry));
}
