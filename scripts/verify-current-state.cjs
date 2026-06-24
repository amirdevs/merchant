const { spawnSync } = require("child_process");

// Current-state verification should block on finalized/runtime gates, not on
// retired generated visual references. Strict legacy asset gates remain available
// through their dedicated scripts/flags.
const checks = [
  ["pnpm", ["audit:data"]],
  ["pnpm", ["audit:assets"]],
  ["pnpm", ["audit:character-portraits"]],
  ["pnpm", ["audit:stock"]],
  ["pnpm", ["review:stock"]],
  ["pnpm", ["test:barter"]],
  ["pnpm", ["test:economy"]],
  ["pnpm", ["test:travel"]],
  ["pnpm", ["test:quests"]],
  ["pnpm", ["test:characters"]],
  ["pnpm", ["test:company"]],
  ["pnpm", ["test:ui-integration"]],
  ["pnpm", ["test:playtest"]],
  ["pnpm", ["playtest:balance"]],
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
console.log("Review docs/logs/character-portrait-lock-report.md before final character portrait approval.");
console.log("Run pnpm audit:item-icons when the item icon runtime asset gate is ready/restored.");
console.log("Run pnpm audit:assets -- --strict to inspect all old/generated visual references.");
console.log("Economy helpers are covered by src/lib/economy.test.ts.");
console.log("Travel planning helpers are covered by src/lib/travel-loop.test.ts.");
console.log("Legacy quest runtime helpers and the new rich quest foundation are covered by pnpm test:quests.");
console.log("Character portrait manifest helpers are covered by src/data/characters/characterPortraitManifest.test.ts.");
console.log("Company, warehouse, shipment, and stock helpers are covered by src/lib/company.test.ts.");
console.log("UI integration view models are covered by src/lib/ui-integration.test.ts.");
console.log("Playtest/balance checklist helpers are covered by src/lib/playtest-balance.test.ts.");
console.log("Review docs/logs/playtest-balance-report.md before the final manual pass.");
