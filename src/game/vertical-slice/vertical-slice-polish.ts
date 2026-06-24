import { buildEconomyWorldExpansionView } from "@/game/vertical-slice/economy-world-expansion";
import { ensureGamePlayableLoopState, type GameStateWithPlayableLoop } from "@/game/vertical-slice/game-runtime-loop";
import {
  buildPlayableMerchantLoopView,
  ensurePlayableMerchantLoopState,
  type PlayableMerchantLoopState,
} from "@/game/vertical-slice/playable-merchant-loop";

export type VerticalSlicePolishStatus = "done" | "watch" | "blocked";

export type VerticalSlicePolishCheck = {
  id: string;
  title: string;
  status: VerticalSlicePolishStatus;
  detail: string;
  action: string;
};

export type VerticalSlicePolishReport = {
  title: string;
  subtitle: string;
  alphaReadinessScore: number;
  alphaLabel: string;
  completedChecks: number;
  totalChecks: number;
  primaryNextAction: string;
  flowPath: string[];
  checks: VerticalSlicePolishCheck[];
  releaseChecklist: string[];
  cleanupGuards: string[];
};

function isGameStateWithLoop(value: GameStateWithPlayableLoop | PlayableMerchantLoopState): value is GameStateWithPlayableLoop {
  return !Object.prototype.hasOwnProperty.call(value, "currentTownId");
}

function statusWeight(status: VerticalSlicePolishStatus) {
  if (status === "done") return 2;
  if (status === "watch") return 1;
  return 0;
}

function labelForScore(score: number) {
  if (score >= 85) return "Alpha-ready vertical slice";
  if (score >= 65) return "Playable, needs polish";
  if (score >= 40) return "Foundation playable";
  return "Still onboarding the player";
}

function checkDone(done: boolean, watch: boolean, doneDetail: string, watchDetail: string, blockedDetail: string): { status: VerticalSlicePolishStatus; detail: string } {
  if (done) return { status: "done", detail: doneDetail };
  if (watch) return { status: "watch", detail: watchDetail };
  return { status: "blocked", detail: blockedDetail };
}

export function buildVerticalSlicePolishReport(value: GameStateWithPlayableLoop | PlayableMerchantLoopState): VerticalSlicePolishReport {
  const isRuntimeGameState = isGameStateWithLoop(value);
  const loop = isRuntimeGameState ? ensureGamePlayableLoopState(value) : ensurePlayableMerchantLoopState(value);
  const loopView = buildPlayableMerchantLoopView(loop);
  const economyView = buildEconomyWorldExpansionView(loop);
  const hasCargo = loopView.cargoList.length > 0;
  const usedRoutes = new Set(loop.routeHistory).size;
  const hasVisibleConsequence = loopView.consequenceSummary.visibleConsequences.length > 0
    || loopView.consequenceSummary.publicTrust !== 0
    || loopView.consequenceSummary.shadowHeat !== 0;
  const hasSaveRuntime = isRuntimeGameState && Boolean(value.playableLoop && value.playableLoopRuntimeVersion);
  const readyForCompany = loop.company.registered || loop.company.ledgerOpened;
  const strongEconomy = economyView.worldReadinessScore >= 55;

  const tradeCheck = checkDone(
    loop.totalProfit > 0 && loop.completedTrades > 0,
    hasCargo || loop.completedTrades > 0,
    `${loop.totalProfit} copper realized profit from ${loop.completedTrades} completed trade(s).`,
    "The player has cargo or a partial trade path, but the first profit moment is not clear yet.",
    "The player has not bought, moved, or sold cargo yet.",
  );
  const routeCheck = checkDone(
    usedRoutes >= 2,
    usedRoutes === 1,
    `${usedRoutes} unique routes used, enough to prove travel is part of the loop.`,
    "One route has been used; the player still needs to see return or branch travel.",
    "No travel route has been used yet.",
  );
  const questCheck = checkDone(
    loopView.questView.completedChain,
    loopView.questView.completedCount >= 2,
    "The five-quest rich story chain is complete.",
    `${loopView.questView.completedCount}/5 rich quests are complete; the chain is visible but not finished.`,
    "The rich quest chain is still at the start.",
  );
  const companyCheck = checkDone(
    loop.company.registered,
    readyForCompany,
    `${loop.company.name} is registered and visible as the first company milestone.`,
    "The company ledger is ready, but the registration moment is still pending.",
    "Company progression is still locked behind trade and story progress.",
  );
  const consequenceCheck = checkDone(
    hasVisibleConsequence,
    loopView.questView.completedCount > 0,
    "The player can see consequences through trust, heat, reputation, or named flags.",
    "The story has started, but consequences need to become more visible.",
    "No meaningful consequence has been created yet.",
  );
  const economyCheck = checkDone(
    strongEconomy,
    economyView.currentTownStocks.length > 0 && economyView.routeEvents.length > 0,
    `${economyView.readinessLabel}: stock pressure, route risk, and expansion hooks are visible.`,
    "Economy panels are present, but the world-readiness score is still low.",
    "Economy expansion data is not visible enough for the player yet.",
  );
  const saveCheck = checkDone(
    hasSaveRuntime,
    isRuntimeGameState,
    "Playable loop state is mounted on GameState and ready for save/export.",
    "The panel is using GameState, but the saved loop field has not been initialized yet.",
    "The loop is running as an isolated module instead of the runtime save state.",
  );
  const guidanceCheck = checkDone(
    loopView.balanceReport.signals.some((signal) => signal.status === "good") && Boolean(loopView.balanceReport.nextRecommendedAction),
    Boolean(loopView.balanceReport.nextRecommendedAction),
    `Guidance is live: ${loopView.balanceReport.nextRecommendedAction}`,
    `Guidance exists but most balance signals are not healthy: ${loopView.balanceReport.nextRecommendedAction}`,
    "The player does not have a clear next action yet.",
  );

  const checks: VerticalSlicePolishCheck[] = [
    { id: "runtime-save", title: "Save/load foundation", ...saveCheck, action: "Open Journal, trigger a loop action, save, reload, and confirm the same town/copper/quest/company state returns." },
    { id: "trade", title: "Readable trade profit", ...tradeCheck, action: "Buy Coastal Salt at Sunwake Harbor, travel to Riverwake Mill, and sell at a visible profit." },
    { id: "travel", title: "Travel has purpose", ...routeCheck, action: "Use at least two vertical-slice routes so the map feels connected instead of a one-click demo." },
    { id: "rich-quests", title: "Story chain engagement", ...questCheck, action: "Finish First Honest Profit through A Name on the Door and confirm quest text reads like story, not a todo list." },
    { id: "company", title: "Company milestone", ...companyCheck, action: "Register the first company after the story chain and confirm it feels like the end of the starter act." },
    { id: "consequences", title: "Visible consequences", ...consequenceCheck, action: "Resolve a quest honestly or exploitatively and confirm public trust, shadow heat, or NPC/town memory changes." },
    { id: "economy-world", title: "Economy/world hooks", ...economyCheck, action: "Inspect stocks, route risk, company upgrades, and expansion-town hooks from the Journal." },
    { id: "guidance", title: "Player guidance", ...guidanceCheck, action: "Confirm the Journal tells the player what to do next without needing developer notes." },
  ];

  const weighted = checks.reduce((sum, check) => sum + statusWeight(check.status), 0);
  const max = checks.length * 2;
  const alphaReadinessScore = Math.round((weighted / max) * 100);
  const blocked = checks.find((check) => check.status === "blocked");
  const watch = checks.find((check) => check.status === "watch");

  return {
    title: "Full Vertical Slice Polish",
    subtitle: "Make the current merchant loop feel like a clean playable alpha before expanding again.",
    alphaReadinessScore,
    alphaLabel: labelForScore(alphaReadinessScore),
    completedChecks: checks.filter((check) => check.status === "done").length,
    totalChecks: checks.length,
    primaryNextAction: blocked?.action || watch?.action || "Run a clean no-debug playtest from new game through company registration, then prepare the next content expansion.",
    flowPath: [
      "Start in Sunwake Harbor",
      "Buy a readable low-risk good",
      "Travel to Riverwake Mill",
      "Sell for profit",
      "Complete the five rich starter quests",
      "Make a visible consequence choice",
      "Travel to Brasskeep Gate",
      "Register the first company",
      "Save, reload, and continue",
    ],
    checks,
    releaseChecklist: [
      "Run pnpm verify:current-state and pnpm build.",
      "Complete the starter loop without using reset/demo buttons.",
      "Confirm the Journal, Market, Travel, Cargo, and Company surfaces explain the next action clearly.",
      "Confirm save/load preserves town, day, copper, cargo, quest chain, consequences, and company state.",
      "Record any confusing UI text before adding more towns or quests.",
    ],
    cleanupGuards: [
      "Do not delete inactive quest/data panels until replacement UI covers the same gameplay need.",
      "Do not expand beyond the starter region until the alpha readiness score is stable.",
      "Do not add random items or towns unless they support trade, quests, company progression, or consequence visibility.",
      "Keep debug/reset controls out of the main player path when preparing a demo build.",
    ],
  };
}

export function verticalSlicePolishSummary(value: GameStateWithPlayableLoop | PlayableMerchantLoopState) {
  const report = buildVerticalSlicePolishReport(value);
  return {
    alphaReadinessScore: report.alphaReadinessScore,
    alphaLabel: report.alphaLabel,
    completedChecks: report.completedChecks,
    totalChecks: report.totalChecks,
    blockedChecks: report.checks.filter((check) => check.status === "blocked").map((check) => check.id),
    watchChecks: report.checks.filter((check) => check.status === "watch").map((check) => check.id),
    primaryNextAction: report.primaryNextAction,
  };
}
