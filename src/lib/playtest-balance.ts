export type PlaytestArea =
  | "startup"
  | "items"
  | "stock"
  | "barter"
  | "economy"
  | "travel"
  | "quests"
  | "company"
  | "save_load";

export type PlaytestSeverity = "pass" | "review" | "blocker";

export type PlaytestCheck = {
  id: string;
  area: PlaytestArea;
  title: string;
  expected: string;
  severityIfFailed: Exclude<PlaytestSeverity, "pass">;
};

export type PlaytestResult = {
  checkId: string;
  status: PlaytestSeverity;
  note?: string;
};

export type PlaytestSummary = {
  total: number;
  pass: number;
  review: number;
  blocker: number;
  readyForNextStep: boolean;
  nextAction: string;
};

export function defaultPlaytestChecklist(): PlaytestCheck[] {
  return [
    { id: "startup-new-game", area: "startup", title: "Start a new game", expected: "A new game opens without console/runtime errors.", severityIfFailed: "blocker" },
    { id: "item-icons-visible", area: "items", title: "Inspect item icons", expected: "Common inventory/stock items show the intended icon and no missing fallback art.", severityIfFailed: "review" },
    { id: "profession-stock-identity", area: "stock", title: "Check profession stock identity", expected: "Blacksmith, miner, barkeep, farmer, fletcher, butcher, bard, and toolmaker inventories read correctly by profession.", severityIfFailed: "blocker" },
    { id: "ask-price-protected", area: "barter", title: "Ask Price respects protected/concealed goods", expected: "Auto-offer never selects protected or concealed player goods.", severityIfFailed: "blocker" },
    { id: "trade-complete-transfer", area: "barter", title: "Complete one fair trade", expected: "Accepted trade moves quantities correctly and clears offer quantities.", severityIfFailed: "blocker" },
    { id: "money-capacity-panel", area: "economy", title: "Review money/capacity values", expected: "Money, value, carry, pull, and overload summaries match the visible inventory.", severityIfFailed: "review" },
    { id: "travel-preview", area: "travel", title: "Preview and complete travel", expected: "Travel preview shows tolls, stallage, risk, capacity blockers, and arrival summary.", severityIfFailed: "review" },
    { id: "quest-contract-smoke", area: "quests", title: "Accept and resolve sample quest/contract state", expected: "Quest/contract state changes do not corrupt inventory or rewards.", severityIfFailed: "review" },
    { id: "company-smoke", area: "company", title: "Company helper smoke", expected: "Warehouse/shipment/company calculations pass tests and produce understandable view-model output.", severityIfFailed: "review" },
    { id: "save-load-current", area: "save_load", title: "Save/load current schema", expected: "A new v2 save reloads correctly and old incompatible saves stay blocked.", severityIfFailed: "blocker" },
  ];
}

export function summarizePlaytestResults(checks: PlaytestCheck[], results: PlaytestResult[]): PlaytestSummary {
  const resultById = new Map(results.map((result) => [result.checkId, result]));
  let pass = 0;
  let review = 0;
  let blocker = 0;

  for (const check of checks) {
    const result = resultById.get(check.id);
    const status = result?.status || "review";
    if (status === "pass") pass += 1;
    else if (status === "blocker") blocker += 1;
    else review += 1;
  }

  const readyForNextStep = blocker === 0 && review <= 2;
  return {
    total: checks.length,
    pass,
    review,
    blocker,
    readyForNextStep,
    nextAction: blocker > 0
      ? "Fix blocker playtest failures before building more systems."
      : review > 2
      ? "Tune review items before moving into polish."
      : "Safe to continue into polish or deeper UI integration.",
  };
}

export function playtestChecklistMarkdown(checks: PlaytestCheck[], results: PlaytestResult[] = []) {
  const resultById = new Map(results.map((result) => [result.checkId, result]));
  const summary = summarizePlaytestResults(checks, results);
  const lines = [
    "# Playtest And Balance Checklist",
    "",
    `Status: ${summary.readyForNextStep ? "PASS" : summary.blocker > 0 ? "BLOCKED" : "REVIEW"}`,
    "",
    `- Checks: ${summary.total}`,
    `- Pass: ${summary.pass}`,
    `- Review: ${summary.review}`,
    `- Blocker: ${summary.blocker}`,
    `- Next action: ${summary.nextAction}`,
    "",
    "| Area | Check | Expected | Status | Notes |",
    "|---|---|---|---|---|",
  ];

  for (const check of checks) {
    const result = resultById.get(check.id);
    lines.push(`| ${check.area} | ${check.title} | ${check.expected} | ${result?.status || "manual"} | ${result?.note || ""} |`);
  }

  return `${lines.join("\n")}\n`;
}
