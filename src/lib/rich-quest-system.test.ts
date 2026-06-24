import { describe, expect, it } from "vitest";
import { characterQuestlines } from "../data/quests/characterQuestlines";
import { assertQuestCatalogShape, questCatalog, verticalSliceQuestIds } from "../data/quests/questCatalog";
import { repeatableContractTemplates } from "../data/quests/repeatableContractTemplates";
import { sideQuests } from "../data/quests/sideQuests";
import { completeRichQuestWithChoice } from "./quest-effects";
import { buildRichQuestJournal, buildVerticalSliceJournal } from "./quest-journal-view-model";
import { campaignProgress, richQuestsByAct, verticalSliceRichQuests } from "./quest-selectors";
import { acceptRichQuest, advanceRichQuestStage, createRichQuestRuntimeState, richQuestStatus } from "./quest-state";

describe("rich quest system foundation", () => {
  it("contains the confirmed phase 2 content counts", () => {
    const shape = assertQuestCatalogShape();
    expect(shape.valid).toBe(true);
    expect(shape.mainQuestCount).toBe(25);
    expect(shape.sideQuestCount).toBe(30);
    expect(shape.characterQuestlineCount).toBe(10);
    expect(shape.repeatableTemplateCount).toBe(20);
    expect(shape.endingCount).toBeGreaterThanOrEqual(5);
    expect(shape.duplicateQuestIds).toBe(0);
    expect(shape.missingVerticalSlice).toEqual([]);
  });

  it("keeps five campaign acts with five main quests each", () => {
    const acts = richQuestsByAct();
    expect(acts).toHaveLength(5);
    for (const act of acts) expect(act.quests).toHaveLength(5);
  });

  it("keeps the approved first vertical-slice chain in order", () => {
    expect([...verticalSliceQuestIds]).toEqual([
      "main-02-first-honest-profit",
      "side-01-bread-before-dawn",
      "main-11-the-false-scale",
      "main-18-warehouse-lease",
      "main-16-a-name-on-the-door",
    ]);
    expect(verticalSliceRichQuests().map((quest) => quest.title)).toEqual([
      "First Honest Profit",
      "Bread Before Dawn",
      "The False Scale",
      "Warehouse Lease",
      "A Name on the Door",
    ]);
  });

  it("uses rich story fields instead of todo-only quests", () => {
    const quests = [...questCatalog.mainQuests, ...questCatalog.sideQuests];
    for (const quest of quests) {
      expect(quest.storyPremise.length).toBeGreaterThan(80);
      expect(quest.playerHook.length).toBeGreaterThan(40);
      expect(quest.emotionalConflict.length).toBeGreaterThan(40);
      expect(quest.merchantConflict.length).toBeGreaterThan(40);
      expect(quest.stages.length).toBeGreaterThanOrEqual(3);
      expect(quest.choices.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("builds quest journal cards around story, stakes, approaches, and consequences", () => {
    const state = createRichQuestRuntimeState(3);
    const journal = buildRichQuestJournal(state);
    const bread = journal.find((entry) => entry.id === "side-01-bread-before-dawn");
    expect(bread?.storyHook).toContain("flour");
    expect(bread?.stakes.length).toBeGreaterThan(40);
    expect(bread?.approaches.length).toBe(4);
    expect(bread?.consequencePreview.length).toBeGreaterThan(0);
  });

  it("accepts, advances, and completes a rich quest with a meaningful choice", () => {
    const quest = questCatalog.sideQuests.find((entry) => entry.id === "side-01-bread-before-dawn");
    expect(quest).toBeDefined();
    if (!quest) return;

    const accepted = acceptRichQuest(createRichQuestRuntimeState(5), quest, 5);
    expect(accepted.ok).toBe(true);
    expect(richQuestStatus(accepted.state, quest.id)).toBe("in_progress");

    const advanced = advanceRichQuestStage(accepted.state, quest);
    expect(advanced.ok).toBe(true);
    expect(advanced.state.questStageIndexes[quest.id]).toBe(1);

    const honestChoice = quest.choices.find((choice) => choice.id === "buy-flour");
    expect(honestChoice).toBeDefined();
    if (!honestChoice) return;

    const completed = completeRichQuestWithChoice(advanced.state, quest.id, honestChoice);
    expect(richQuestStatus(completed, quest.id)).toBe("completed");
    expect(completed.questChoices[quest.id]).toBe("buy-flour");
    expect(Object.values(completed.cityReputation).reduce((sum, value) => sum + value, 0)).toBeGreaterThan(0);
  });

  it("summarizes campaign progress and ending score pressure", () => {
    const quest = questCatalog.mainQuests.find((entry) => entry.id === "main-02-first-honest-profit");
    expect(quest).toBeDefined();
    if (!quest) return;
    const choice = quest.choices.find((entry) => entry.id === "clean-margin");
    expect(choice).toBeDefined();
    if (!choice) return;

    const completed = completeRichQuestWithChoice(createRichQuestRuntimeState(), quest.id, choice);
    const progress = campaignProgress(completed);
    expect(progress.totalMainQuests).toBe(25);
    expect(progress.completedMainQuests).toBe(1);
    expect(progress.completedByAct[0].completed).toBe(1);
    expect(progress.leadingEndingScores.length).toBeGreaterThan(0);
  });

  it("keeps character questlines and repeatable contracts flavorful", () => {
    expect(characterQuestlines).toHaveLength(10);
    expect(repeatableContractTemplates).toHaveLength(20);
    expect(sideQuests).toHaveLength(30);
    for (const questline of characterQuestlines) {
      expect(questline.quests.length).toBeGreaterThanOrEqual(3);
      expect(questline.finalOutcomes.length).toBeGreaterThanOrEqual(3);
    }
    for (const template of repeatableContractTemplates) {
      expect(template.flavorHooks.length).toBeGreaterThanOrEqual(3);
      expect(template.consequenceHooks.length).toBeGreaterThan(0);
    }
  });

  it("builds a journal for the approved vertical slice only", () => {
    const entries = buildVerticalSliceJournal(createRichQuestRuntimeState());
    expect(entries.map((entry) => entry.title)).toEqual([
      "First Honest Profit",
      "Bread Before Dawn",
      "The False Scale",
      "Warehouse Lease",
      "A Name on the Door",
    ]);
    expect(entries.every((entry) => entry.isVerticalSlice)).toBe(true);
  });
});
