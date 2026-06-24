import type { QuestChoice, QuestConsequence, QuestReward, QuestUnlock } from "../data/quests/questTypes";
import { recordRichQuestChoice, resolveRichQuest, type RichQuestRuntimeState } from "./quest-state";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function addScore(record: Record<string, number>, key: string, amount: number) {
  record[key] = (record[key] || 0) + amount;
}

function uniquePush(list: string[], value: string) {
  if (!list.includes(value)) list.push(value);
}

export function applyQuestConsequence(state: RichQuestRuntimeState, consequence: QuestConsequence) {
  const next = clone(state);
  const target = consequence.target || consequence.type;
  const amount = consequence.amount ?? 1;

  if (consequence.type === "npc_trust_change") addScore(next.npcTrust, target, amount);
  else if (consequence.type === "city_reputation_change") addScore(next.cityReputation, target, amount);
  else if (consequence.type === "faction_reputation_change") addScore(next.factionReputation, target, amount);
  else if (consequence.type === "legal_heat_change") next.legalHeat += amount;
  else if (consequence.type === "ending_score_change") addScore(next.endingScores, target, amount);
  else if (consequence.type === "quest_unlock") uniquePush(next.unlockedQuestIds, target);
  else if (consequence.type === "quest_block") uniquePush(next.blockedQuestIds, target);
  else if (consequence.type === "route_risk_change") uniquePush(next.unlockedRouteIds, target);
  else if (consequence.type === "warehouse_access_change") uniquePush(next.unlockedWarehouseIds, target);
  else if (consequence.type === "market_event") uniquePush(next.marketEvents, `${target}:${consequence.label}`);
  else addScore(next.endingScores, `${consequence.type}:${target}`, amount);

  return next;
}

export function applyQuestConsequences(state: RichQuestRuntimeState, consequences: QuestConsequence[] = []) {
  return consequences.reduce((current, consequence) => applyQuestConsequence(current, consequence), state);
}

export function applyQuestReward(state: RichQuestRuntimeState, reward: QuestReward) {
  const next = clone(state);
  const target = reward.target || reward.type;
  const amount = reward.amount ?? reward.quantity ?? 1;

  if (reward.type === "npc_trust") addScore(next.npcTrust, target, amount);
  else if (reward.type === "reputation") addScore(next.cityReputation, target, amount);
  else if (reward.type === "faction_access") addScore(next.factionReputation, target, amount);
  else if (reward.type === "ending_score") addScore(next.endingScores, target, amount);
  else if (reward.type === "route_unlock") uniquePush(next.unlockedRouteIds, target);
  else if (reward.type === "warehouse_unlock") uniquePush(next.unlockedWarehouseIds, target);
  else if (reward.type === "company_unlock") uniquePush(next.companyUnlocks, target);

  return next;
}

export function applyQuestRewards(state: RichQuestRuntimeState, rewards: QuestReward[] = []) {
  return rewards.reduce((current, reward) => applyQuestReward(current, reward), state);
}

export function applyQuestUnlock(state: RichQuestRuntimeState, unlock: QuestUnlock) {
  const next = clone(state);
  if (unlock.type === "quest") uniquePush(next.unlockedQuestIds, unlock.id);
  else if (unlock.type === "route") uniquePush(next.unlockedRouteIds, unlock.id);
  else if (unlock.type === "warehouse") uniquePush(next.unlockedWarehouseIds, unlock.id);
  else if (unlock.type === "company_feature") uniquePush(next.companyUnlocks, unlock.id);
  else addScore(next.endingScores, `${unlock.type}:${unlock.id}`, 1);
  return next;
}

export function applyQuestUnlocks(state: RichQuestRuntimeState, unlocks: QuestUnlock[] = []) {
  return unlocks.reduce((current, unlock) => applyQuestUnlock(current, unlock), state);
}

export function chooseRichQuestOutcome(state: RichQuestRuntimeState, questId: string, choice: QuestChoice) {
  let next = recordRichQuestChoice(state, questId, choice.id);
  next = applyQuestRewards(next, choice.rewards || []);
  next = applyQuestConsequences(next, choice.consequences || []);
  next = applyQuestUnlocks(next, choice.unlocks || []);
  return next;
}

export function completeRichQuestWithChoice(state: RichQuestRuntimeState, questId: string, choice: QuestChoice) {
  return resolveRichQuest(chooseRichQuestOutcome(state, questId, choice), questId, "completed");
}
