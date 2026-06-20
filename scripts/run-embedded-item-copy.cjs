"use strict";

const fs = require("fs");
const { execFileSync } = require("child_process");

const source = fs.readFileSync(".github/workflows/chatgpt-written-item-copy.yml", "utf8").split("\n");
const start = source.findIndex((line) => line.includes("node <<'JS'"));
const end = source.findIndex((line, index) => index > start && line.trim() === "JS");
if (start < 0 || end < 0) throw new Error("Could not find embedded writer script.");
let script = source.slice(start + 1, end).map((line) => line.replace(/^          /, "")).join("\n");
script = script.replaceAll("`${item.name}", "`\\${item.name}");
script = script.replace(
  "`\\${item.name} is trade stock with enough condition, context, and market use to deserve inspection before pricing.`,",
  "item.name + \" is trade stock with enough condition, context, and market use to deserve inspection before pricing.\","
);
script = script.replace(
  "`“Every item has two prices: the one in the ledger, and the one a buyer invents after hearing where it has been.”`,",
  "\"“Every item has two prices: the one in the ledger, and the one a buyer invents after hearing where it has been.”\","
);
fs.writeFileSync("/tmp/write-item-copy.cjs", script);
execFileSync("node", ["/tmp/write-item-copy.cjs"], { stdio: "inherit" });
