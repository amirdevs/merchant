#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SKIP_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  '.vite',
  'docs/logs',
  'docs/assets/icon-prompts',
  'docs/assets/icon-sheets',
  'src/data/generated',
  'public',
]);
const TEXT_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.cjs', '.mjs', '.json', '.md', '.css', '.html']);

const forbidden = [
  'npc-new',
  'npc-legacy',
  'legacy_reworked',
  'new_useful_npc',
  'usefulNewNpc',
  'legacyReworked',
  'LegacyBatch',
  'characterRemakeTypes',
  'remakeCharacter',
  'RemakeCharacter',
  'legacyCharacter',
  'reference-game',
  'old generated',
  'old public-facing',
  'rebuild-era',
  'rebuilt project',
  'originalIndex',
  'seedId',
  'archived seed',
  'reference data',
  'old marketplace',
  'old character',
  'old standalone',
  'old scaffolding',
  'temporary scaffolding',
  'transitional quest',
  'retired standalone',
  'old scaffold',
  'test-batch seed',
  'portrait_generation_blocked',
  'PROJECT_CLEANUP_REMOVAL_PLAN.md',
  'portraitGenerationAllowed',
  'prompt-plan JSON',
  'full portrait set ready for generation',
  'source game',
  'original extracted data',
  'extracted original data',
  'extracted items',
  'extracted characters',
  'original generated character data',
  'generated-character audit',
  'generated-data',
  'original-game parity',
  'stale prototype',
  'obsolete fallback',
  'retired handoff',
  'retired character',
  'production intermediates',
  'not the final target',
  'inactive support path',
];

const allowedFiles = new Set(['scripts/audit-naming-traces.cjs']);

const issues = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(ROOT, full).replace(/\\/g, '/');
    if (SKIP_DIRS.has(entry.name) || SKIP_DIRS.has(rel)) continue;
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (allowedFiles.has(rel)) continue;

    for (const token of forbidden) {
      if (rel.includes(token)) issues.push({ file: rel, token, line: 0, kind: 'path' });
    }

    if (!TEXT_EXTS.has(path.extname(entry.name))) continue;
    const text = fs.readFileSync(full, 'utf8');
    const lines = text.split(/\r?\n/);
    lines.forEach((line, index) => {
      for (const token of forbidden) {
        if (line.includes(token)) issues.push({ file: rel, token, line: index + 1, kind: 'content' });
      }
    });
  }
}

walk(ROOT);

if (issues.length) {
  console.error(`Naming trace audit failed with ${issues.length} issue(s):`);
  for (const issue of issues.slice(0, 250)) {
    const loc = issue.line ? `${issue.file}:${issue.line}` : issue.file;
    console.error(`- ${issue.kind}: ${issue.token} in ${loc}`);
  }
  if (issues.length > 250) console.error(`...and ${issues.length - 250} more`);
  process.exit(1);
}

console.log('Naming trace audit passed.');
