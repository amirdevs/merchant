# Merchant React Vite - Agent Context

This repo is `C:\Freelance\merchant-react-electron`.

Always treat `C:\Freelance\merchant-react-electron` as the only valid project root for this app. Do not use, inspect, edit, sync from, or infer project state from any `D:\game\...` checkout unless the user explicitly asks for work in that path. If Codex is launched from another directory, change to `C:\Freelance\merchant-react-electron` before reading or editing project files.

The project is an offline React/Vite remake prototype inspired by Merchant of the Six Kingdoms. The user wants a local-only app that uses original extracted data as reference while replacing/overhauling systems, UI, and item art.

## Documentation Rules

All documentation must live under `/docs`.

Current source-of-truth docs must be numbered in reading order:

```text
/docs/00_READ_ME_FIRST.md
/docs/01_PROJECT_OVERVIEW.md
/docs/02_DEVELOPMENT_SETUP.md
/docs/03_GAME_LOGIC_AND_ROADMAP.md
/docs/04_TRADING_AND_STOCK.md
/docs/05_ITEMS_AND_ICONS.md
/docs/06_ECONOMY_AND_TRAVEL.md
/docs/07_QUESTS_COMPANY_AND_UI.md
/docs/08_UI_UX_DIRECTION.md
```

Do not add new unnumbered Markdown docs directly under `/docs`, `/docs/game`, `/docs/systems`, or `/docs/development`.

Log-only docs, generated reports, temporary phase notes, audits, and historical handoffs must go under:

```text
/docs/logs/
```

Examples of log-only docs:

- generated stock reviews
- generated item icon audit reports
- generated playtest/balance reports
- one-time phase notes
- migration notes that are no longer source-of-truth

Asset production folders are allowed to remain under `/docs/assets/` when they contain working assets/configs, not prose source-of-truth docs:

- `/docs/assets/icon-prompts/`
- `/docs/assets/icon-sheets/`
- `/docs/ui_parts/`

Before adding docs, update the numbered reading order if the doc is permanent; otherwise put it in `/docs/logs/`.

## Current UI Direction

Use `docs/ui_parts/` as the current UI visual reference. The target look is bright painterly fantasy merchant UI: sunlit coastal town scenes, parchment ledgers, carved dark wood shells, blue enamel title plates, brass trim, heraldic seals, gold status chips, polished NPC portraits, collectible item art, and beveled green/blue/red command buttons.

Do not describe or implement the UI as a generic dense medieval app. Keep it compact and practical for repeated trading, but match the premium PC merchant RPG mockups in `docs/ui_parts`.

## Stack

- Package manager: `pnpm`
- App: React 18, TypeScript, Vite
- Styling: Tailwind CSS v4
- UI icons: `lucide-react`

Common commands:

```powershell
pnpm dev
pnpm build
pnpm verify:current-state
```

Do not use npm for installs or scripts unless the user explicitly asks.

## Current User Preferences

- The user wants practical implementation, not long proposals.
- The user often says "continue"; continue the current task from local context.
- Ask before doing if there is a real product/architecture choice awaiting the user's call.
- The user prefers ZIP/root-overlay patches unless they ask for direct Git commits.
- The user is fine with creating new saves; do not preserve old save compatibility unless requested.
- Dist/release build output should not be committed.
- Do not use one-time patch scripts for docs organization; provide direct files or a clear delete list.

## Validation

Run focused tests for the area changed. For broad changes, run:

```powershell
pnpm verify:current-state
pnpm build
```

`verify:current-state` should include data, asset, item icon, stock, barter, economy, travel, quest, company, UI-integration, playtest checks, and reports.

## UI Architecture Rules

- Tailwind CSS is the default styling system.
- Keep `src/styles.css` minimal.
- Do not add broad global override files such as `ui-cooking.css`, `ui-gamefit.css`, or similar patch-layer CSS.
- Build each screen as real React components that fit the game viewport by design.
- Use small modular React files. Avoid giant components, giant utility files, and multi-component dump files.
- Use component-local CSS modules only when Tailwind cannot cleanly express the effect.
- Do not introduce duplicate architecture roots. The current clean base uses `src/app`, `src/features`, `src/components`, `src/lib`, and `src/data`.
- Do not recreate `src/sub-domains` unless the user explicitly asks.
- Before returning a patch, check imports for stale references to deleted folders and removed CSS layers.
