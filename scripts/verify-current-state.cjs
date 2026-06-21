const { spawnSync } = require("child_process");

const checks = [
  ["pnpm", ["audit:data"]],
  ["pnpm", ["audit:assets"]],
  ["pnpm", ["audit:item-icons"]],
  ["pnpm", ["audit:stock"]],
  ["pnpm", ["review:stock"]],
  ["pnpm", ["test:barter"]],
  ["pnpm", ["test:economy"]],
  ["pnpm", ["test:travel"]],
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
console.log("Review docs/systems/profession-stock-review.md before final stock/profile approval.");
console.log("Review docs/assets/item-icon-lock-report.md before final item/icon approval.");
console.log("Economy helpers are covered by src/lib/economy.test.ts.");
console.log("Travel planning helpers are covered by src/lib/travel-loop.test.ts.");
