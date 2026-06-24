# Merchant React Vite - Agent Context

This repo is `C:\Freelance\merchant-react-electron`.

Always treat `C:\Freelance\merchant-react-electron` as the only valid project root for this app. Do not use, inspect, edit, sync from, or infer project state from any `D:\game\...` checkout unless the user explicitly asks for work in that path. If Codex is launched from another directory, change to `C:\Freelance\merchant-react-electron` before reading or editing project files.

The project is an offline React/Vite fantasy trading game. The user wants a local-only app that uses current runtime data while evolving systems, UI, item art, character identities, character portraits, and visible narrative flavor.

## Documentation Rules

All permanent documentation must live under `/docs`.

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
/docs/09_RICH_QUEST_SYSTEM_BIBLE.md
```

Only one roadmap doc exists:

```text
/docs/03_GAME_LOGIC_AND_ROADMAP.md
```

Do not add per-step completion docs. Do not add root delivery-note docs such as `README_STEP*.md`, `README_NEXT_*.md`, or patch handoffs. Update the existing roadmap/system docs instead of creating new docs.

Every ZIP/root-overlay response should not include `README_STEP*` files or temporary delivery notes as repo files.

Do not add new unnumbered Markdown docs directly under `/docs`, `/docs/game`, `/docs/systems`, or `/docs/development`.

Log-only docs, generated reports, implementation notes, audits, and archived validation notes must go under:

```text
/docs/logs/
```

Examples of log-only docs:

- generated stock reviews
- generated item icon audit reports
- generated character portrait lock reports
- generated playtest/balance reports
- implementation notes
- archived validation notes that are no longer source-of-truth

Asset production folders are allowed to remain under `/docs/assets/` when they contain working assets/configs, prompt manifests, sheet plans, or cropping guides rather than prose source-of-truth docs:

- `/docs/assets/icon-prompts/`
- `/docs/assets/icon-sheets/`
- `/docs/assets/character-prompts/`
- `/docs/assets/character-sheets/`
- `/docs/ui_parts/`

Before adding docs, update the numbered reading order if the doc is permanent; otherwise put it in `/docs/logs/`.

## Project Structure Rules

Use the current domain-based structure:

```text
src/app/       app shell, controllers, providers, app-only hooks, and app types
src/content/   authored/static game content and catalogs
src/game/      pure gameplay/domain logic and runtime helpers
src/features/  screen-level feature UI and panels
src/shared/    reusable components, types, constants, hooks, and generic utilities
src/tests/     grouped Vitest tests by domain
scripts/audits/       audit gates
scripts/playtests/    manual/runtime playtest report generators
scripts/generators/   content and asset generation helpers
scripts/maintenance/  validation orchestrators and maintenance utilities
```

Keep authored content, gameplay rules, feature UI, shared utilities, tests, and scripts separated. Do not put broad gameplay rules inside feature components when the rule is reused elsewhere. Do not put tests beside domain logic; place them under `src/tests/`.

`verify:current-state` lives under:

```text
scripts/maintenance/verify-current-state.cjs
```

## Character Profile Rules

Visible character identity must stay original to this game. Keep character-facing names, portraits, dialogue flavor, and visual designs consistent with the approved character profile catalog.

Keep stable internal IDs/indexes until the runtime has a safe migration path. Current character profile data may continue to provide mechanical anchors, but UI-facing identity should come from the character profile layer.

Runtime character behavior now lives in typed character runtime profiles under:

```text
src/content/characters/runtime/profiles.ts
src/content/characters/runtime/profiles.data.json
```

Visible runtime identity must resolve through the final character profile catalog and runtime portrait manifest, not from raw roster files or stale asset filenames.

Primary cast additions should be planned before portrait generation so portrait sheets only need to be generated/cropped once. The current primary cast roster lives in:

```text
src/content/characters/planning/primary-cast-seeds.ts
```

The current roster planning files and runtime validation files live in:

```text
src/content/characters/planning/character-catalog-audit-plan.ts
src/content/characters/planning/final-character-roster-plan.ts
```

The identity catalog batches live in:

```text
src/content/characters/profiles/batches/cast-batch-01.ts
src/content/characters/profiles/batches/cast-batch-02.ts
src/content/characters/profiles/batches/cast-batch-03.ts
src/content/characters/profiles/batches/cast-batch-04.ts
src/content/characters/profiles/batches/cast-batch-05.ts
src/content/characters/profiles/batches/cast-batch-06.ts
src/content/characters/profiles/catalog.ts
```

Character portrait prompts must live beside item prompts under:

```text
/docs/assets/character-prompts/
```

Final cropped runtime portraits must live under:

```text
/public/assets/portraits/characters/
```

The runtime portrait manifest and character selectors live in:

```text
src/game/characters/characterPortraitManifest.ts
```

Runtime character validation blocks raw roster files, direct raw-roster imports, stale portrait/stall filenames, and runtime/profile mapping drift.

Character prompt batches are batched by total portrait images, not by total characters. Example: 200 characters with 5 expression portraits each means 1000 portrait images to batch. A single character may have some expressions in one batch and the remaining expressions in another batch.

Every portrait image entry must include:

- `imageId`
- `characterId`
- `expression`
- `batchId`
- `identityAnchor`
- `visualTraits`
- `professionProps`
- `prompt`
- `negativePrompt`

Prompts must be hand-written for each character/image. Do not use generic repeated character prompts except for shared style/cropping constraints.

Each expression prompt must preserve the same identity anchors and change only expression, posture, and emotional acting.

Do not generate portrait sheets until the final roster, per-character identity catalog, and portrait manifest batches have been reviewed. Portrait generation/cropping is expensive and should happen after weak catalog characters, primary cast additions, and expression counts are planned.

After cropping, run `pnpm audit:character-portraits` and review `docs/logs/character-portrait-lock-report.md` before treating portraits as locked.

## Current UI Direction

Use `docs/ui_parts/` as the current UI visual reference. The target look is bright painterly fantasy merchant UI: sunlit coastal town scenes, parchment ledgers, carved dark wood shells, blue enamel title plates, brass trim, heraldic seals, gold status chips, polished NPC portraits, collectible item art, and beveled green/blue/red command buttons.

Do not describe or implement the UI as a generic dense medieval app. Keep it compact and practical for repeated trading, but match the premium PC merchant RPG mockups in `docs/ui_parts`.
