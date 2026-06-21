# Merchant React Vite - Agent Context

This repo is `C:\Freelance\merchant-react-electron`.

Always treat `C:\Freelance\merchant-react-electron` as the only valid project root for this app. Do not use, inspect, edit, sync from, or infer project state from any `D:\game\...` checkout unless the user explicitly asks for work in that path. If Codex is launched from another directory, change to `C:\Freelance\merchant-react-electron` before reading or editing project files.

The project is an offline React/Vite remake prototype inspired by Merchant of the Six Kingdoms. The user wants a local-only app that uses original extracted data as reference while replacing/overhauling systems, UI, item art, character identities, character portraits, and visible narrative flavor.

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
/docs/09_PLAYABLE_UI_INTEGRATION.md
/docs/10_CHARACTER_REWORK_AND_PORTRAITS.md
/docs/11_USEFUL_NPC_ROSTER_SEEDS.md
/docs/12_EXISTING_CHARACTER_AUDIT.md
/docs/13_FINAL_CHARACTER_ROSTER_MAP.md
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

Asset production folders are allowed to remain under `/docs/assets/` when they contain working assets/configs, prompt manifests, generated sheet plans, or cropping references rather than prose source-of-truth docs:

- `/docs/assets/icon-prompts/`
- `/docs/assets/icon-sheets/`
- `/docs/assets/character-prompts/`
- `/docs/assets/character-sheets/`
- `/docs/ui_parts/`

Before adding docs, update the numbered reading order if the doc is permanent; otherwise put it in `/docs/logs/`.

## Character Rework Rules

Visible character identity must be original. Do not preserve original public-facing names, portraits, dialogue flavor, or lookalike visual designs from the source game.

Keep stable internal IDs/indexes until the runtime has a safe migration path. The original generated character data may remain as mechanical reference, but UI-facing identity should come from the remake layer.

Useful new NPCs should be planned before portrait generation so portrait sheets only need to be generated/cropped once. The current seed roster lives in:

```text
src/data/characters/newUsefulNpcSeeds.ts
```

The existing generated-character audit and final roster-map planning live in:

```text
src/data/characters/legacyCharacterAuditPlan.ts
src/data/characters/finalCharacterRosterPlan.ts
```

Character portrait prompts must live beside item prompts under:

```text
/docs/assets/character-prompts/
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

Do not generate portrait sheets until the final roster, per-character identity catalog, and portrait manifest batches have been reviewed. Portrait generation/cropping is expensive and should happen after weak old characters, useful new NPCs, and expression counts are planned.

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
- Every ZIP response should include a suggested Git commit message.
- The user is fine with creating new saves; do not preserve old save compatibility unless requested.
- Dist/release build output should not be committed.
- Do not use one-time patch scripts for docs organization; provide direct files or a clear delete list.
- Character prompt files should be created before portrait generation so sheets and cropping stay consistent.

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
