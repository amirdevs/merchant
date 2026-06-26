const { spawnSync } = require("child_process");

// Current-state verification should block on finalized runtime gates, not on
// optional visual asset gates. The full visual asset audit remains available
// through dedicated scripts and flags.
const checks = [
  ["pnpm", ["audit:naming"]],
  ["pnpm", ["audit:runtime-characters"]],
  ["pnpm", ["audit:character-merchandise"]],
  ["pnpm", ["audit:character-stock-profiles"]],
  ["pnpm", ["audit:data"]],
  ["pnpm", ["audit:assets"]],
  ["pnpm", ["audit:character-portraits"]],
  ["pnpm", ["audit:stock"]],
  ["pnpm", ["review:stock"]],
  ["pnpm", ["test:barter"]],
  ["pnpm", ["test:economy"]],
  ["pnpm", ["test:travel"]],
  ["pnpm", ["test:quests"]],
  ["pnpm", ["test:rich-quest-chain"]],
  ["pnpm", ["test:merchant-loop"]],
  ["pnpm", ["test:merchant-polish"]],
  ["pnpm", ["test:runtime-loop"]],
  ["pnpm", ["test:economy-world"]],
  ["pnpm", ["test:vertical-polish"]],
  ["pnpm", ["test:characters"]],
  ["pnpm", ["test:runtime-characters"]],
  ["pnpm", ["test:character-merchandise"]],
  ["pnpm", ["test:character-stock-personas"]],
  ["pnpm", ["test:character-stock-profiles"]],
  ["pnpm", ["test:company"]],
  ["pnpm", ["test:ui-integration"]],
  ["pnpm", ["test:playtest"]],
  ["pnpm", ["playtest:balance"]],
  ["pnpm", ["playtest:merchant-loop"]],
  ["pnpm", ["playtest:merchant-loop-polish"]],
  ["pnpm", ["playtest:runtime-loop"]],
  ["pnpm", ["playtest:economy-world"]],
  ["pnpm", ["playtest:vertical-polish"]],
  ["pnpm", ["build"]],
];

for (const [command, args] of checks) {
  const label = `${command} ${args.join(" ")}`;
  console.log(`\n=== ${label} ===`);
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.error) {
    console.error(`\nFailed to run ${label}`);
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error(`\n${label} failed with exit code ${result.status}`);
    process.exit(result.status || 1);
  }
}

console.log("\nCurrent-state verification passed.");
console.log("Review docs/logs/profession-stock-review.md before final stock/profile approval.");
console.log("Review docs/logs/character-merchandise-alignment-report.md before final character merchandise approval.");
console.log("Review docs/logs/character-stock-profile-report.md before final NPC stock approval.");
console.log("Review docs/logs/character-portrait-lock-report.md before final character portrait approval.");
console.log("Run pnpm audit:item-icons when the item icon runtime asset gate is needed.");
console.log("Run pnpm audit:assets -- --strict to run the full visual asset audit.");
console.log("Economy helpers are covered by src/tests/economy/economy.test.ts.");
console.log("Travel planning helpers are covered by src/tests/travel/travel-loop.test.ts.");
console.log("Quest runtime helpers, the rich quest foundation, the first playable story chain, the playable merchant loop, GameState runtime loop persistence, economy/world expansion helpers, and vertical-slice polish helpers are covered by pnpm test:quests, pnpm test:rich-quest-chain, pnpm test:merchant-loop, pnpm test:merchant-polish, pnpm test:runtime-loop, pnpm test:economy-world, and pnpm test:vertical-polish.");
console.log("Character portrait manifest helpers are covered by src/tests/characters/characterPortraitManifest.test.ts.");
console.log("Character merchandise assignments are covered by pnpm test:character-merchandise.");
console.log("Character stock persona coverage is checked by pnpm test:character-stock-personas.");
console.log("Explicit NPC stock profiles are covered by pnpm audit:character-stock-profiles and pnpm test:character-stock-profiles.");
console.log("Company, warehouse, shipment, and stock helpers are covered by src/tests/company/company.test.ts.");
console.log("UI integration view models are covered by src/tests/runtime/ui-integration.test.ts.");
console.log("Playtest/balance checklist helpers are covered by src/tests/vertical-slice/playtest-balance.test.ts.");
console.log("Review docs/logs/playtest-balance-report.md, docs/logs/playable-merchant-loop-v1-report.md, docs/logs/playable-merchant-loop-polish-report.md, docs/logs/runtime-loop-save-report.md, docs/logs/economy-world-expansion-report.md, and docs/logs/vertical-slice-polish-report.md before the final manual pass.");
