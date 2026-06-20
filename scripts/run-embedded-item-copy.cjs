"use strict";

const fs = require("fs");
const { execFileSync } = require("child_process");

const source = fs.readFileSync(".github/workflows/chatgpt-written-item-copy.yml", "utf8").split("\n");
const start = source.findIndex((line) => line.includes("node <<'JS'"));
const end = source.findIndex((line, index) => index > start && line.trim() === "JS");
if (start < 0 || end < 0) throw new Error("Could not find embedded writer script.");
let script = source.slice(start + 1, end).map((line) => line.replace(/^          /, "")).join("\n");
script = script.replaceAll("`${item.name}", "`\\${item.name}");
fs.writeFileSync("/tmp/write-item-copy.cjs", script);
execFileSync("node", ["/tmp/write-item-copy.cjs"], { stdio: "inherit" });
