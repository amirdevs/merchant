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

## Character Profile Rules

Visible character identity must be original. Do not preserve prior public-facing names, portraits, dialogue flavor, or lookalike visual designs from earlier content sets.

Keep stable internal IDs/indexes until the runtime has a safe migration path. Current character profile data may continue to provide mechanical anchors, but UI-facing identity should come from the character profile layer.

Primary cast additions should be planned before portrait generation so portrait sheets only need to be generated/cropped once. The current primary cast roster lives in:

```text
src/data/characters/primaryCastSeeds.ts
```

The current roster planning files and runtime validation files live in:

```text
src/data/characters/characterCatalogAuditPlan.ts
src/data/characters/finalCharacterRosterPlan.ts
```

The identity catalog batches live in:

```text
src/data/characters/characterIdentityCatalogCastBatch01.ts
src/data/characters/characterIdentityCatalogCastBatch02.ts
src/data/characters/characterIdentityCatalogCastBatch03.ts
src/data/characters/characterIdentityCatalogCastBatch04.ts
src/data/characters/characterIdentityCatalogCastBatch05.ts
src/data/characters/characterIdentityCatalogCastBatch06.ts
src/data/characters/characterIdentityCatalog.ts
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
src/data/characters/characterPortraitManifest.ts
```

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
pnpm audit:character-portraits
```

Do not use npm for installs or scripts unless the user explicitly asks.

## Current User Preferences

- The user wants practical implementation, not long proposals.
- The user often says "continue"; continue the current task from local context.
- Ask before doing if there is a real product/architecture choice awaiting the user's call.
- The user prefers ZIP/root-overlay patches unless they ask for direct Git commits.
- Every ZIP response should include a suggested Git commit message.
- The user is fine with fresh saves; do not preserve save compatibility unless requested.
- Dist/release build output should not be committed.
- Do not use patch scripts for docs organization; provide direct files or a clear delete list.
- Character prompt files should be created before portrait generation so sheets and cropping stay consistent.

## Validation

Run focused tests for the area changed. For broad changes, run:

```powershell
pnpm verify:current-state
pnpm build
```

`verify:current-state` should include data, asset, item icon, character portrait, stock, barter, economy, travel, quest, character manifest, company, UI-integration, playtest checks, and reports.

## UI Architecture Rules

Keep reusable UI components under `src/components` or feature-specific component folders. Keep pure data transforms, audits, and view models outside React components where possible.
