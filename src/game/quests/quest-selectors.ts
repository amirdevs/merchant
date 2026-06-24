import { authoredQuests, questCatalog } from "@/content/quests/questCatalog";
import type { QuestCatalog, RichQuest } from "@/content/quests/questTypes";
import { richQuestIsActive, richQuestStatus, type RichQuestRuntimeState } from "@/game/quests/quest-state";

export function allRichQuests(catalog: QuestCatalog = questCatalog): RichQuest[] {
  return [...catalog.mainQuests, ...catalog.sideQuests];
}

export function findRichQuest(questId: string, catalog: QuestCatalog = questCatalog) {
  return allRichQuests(catalog).find((quest) => quest.id === questId) || null;
}

export function availableRichQuests(state: RichQuestRuntimeState, catalog: QuestCatalog = questCatalog) {
  return allRichQuests(catalog).filter((quest) => {
    const status = richQuestStatus(state, quest.id);
    return status === "available" || status === "offered" || state.unlockedQuestIds.includes(quest.id) || quest.verticalSlice;
  });
}

export function activeRichQuests(state: RichQuestRuntimeState, catalog: QuestCatalog = questCatalog) {
  return allRichQuests(catalog).filter((quest) => richQuestIsActive(richQuestStatus(state, quest.id)));
}

export function completedRichQuests(state: RichQuestRuntimeState, catalog: QuestCatalog = questCatalog) {
  return allRichQuests(catalog).filter((quest) => richQuestStatus(state, quest.id) === "completed");
}

export function richQuestsByAct(catalog: QuestCatalog = questCatalog) {
  return catalog.acts.map((act) => ({
    ...act,
    quests: catalog.mainQuests.filter((quest) => quest.act === act.act),
  }));
}

export function verticalSliceRichQuests(catalog: QuestCatalog = questCatalog) {
  return catalog.verticalSliceQuestIds.map((questId) => authoredQuests.find((quest) => quest.id === questId)).filter((quest): quest is RichQuest => Boolean(quest));
}

export function campaignProgress(state: RichQuestRuntimeState, catalog: QuestCatalog = questCatalog) {
  const mainQuests = catalog.mainQuests;
  const completed = mainQuests.filter((quest) => richQuestStatus(state, quest.id) === "completed");
  const active = mainQuests.filter((quest) => richQuestIsActive(richQuestStatus(state, quest.id)));
  const completedByAct = catalog.acts.map((act) => ({
    act: act.act,
    title: act.title,
    completed: act.questIds.filter((questId) => richQuestStatus(state, questId) === "completed").length,
    total: act.questIds.length,
  }));

  return {
    totalMainQuests: mainQuests.length,
    completedMainQuests: completed.length,
    activeMainQuests: active.length,
    completedPercent: mainQuests.length === 0 ? 0 : Math.round((completed.length / mainQuests.length) * 100),
    completedByAct,
    leadingEndingScores: Object.entries(state.endingScores).sort((a, b) => b[1] - a[1]).slice(0, 5),
  };
}
