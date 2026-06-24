# 02 - Development Setup

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS v4
- `lucide-react`
- `pnpm`

Do not use npm unless explicitly asked.

## Commands

Start development:

```powershell
pnpm install
pnpm dev
```

Build:

```powershell
pnpm build
```

Full validation:

```powershell
pnpm verify:current-state
```

Targeted validation:

```powershell
pnpm audit:data
pnpm audit:assets
pnpm audit:item-icons
pnpm audit:character-portraits
pnpm audit:stock
pnpm review:stock
pnpm playtest:balance
pnpm test:barter
pnpm test:economy
pnpm test:travel
pnpm test:quests
pnpm test:characters
pnpm test:company
pnpm test:ui-integration
pnpm test:playtest
```

## Project structure

The source tree is organized by purpose:

```text
src/app/       app shell, controllers, providers, app-only hooks, and app types
src/content/   authored/static game content and catalogs
src/game/      pure gameplay/domain logic and runtime helpers
src/features/  screen-level feature UI and panels
src/shared/    reusable components, types, constants, hooks, and generic utilities
src/tests/     grouped Vitest tests by domain
```

Script folders are grouped by task type:

```text
scripts/audits/       audit gates
scripts/playtests/    manual/runtime playtest report generators
scripts/generators/   content and asset generation helpers
scripts/maintenance/  validation orchestrators and maintenance utilities
```

Rules:

- Content data belongs in `src/content/`.
- Reusable gameplay/domain rules belong in `src/game/`.
- Screen/panel UI belongs in `src/features/`.
- Shared UI/utilities/types belong in `src/shared/`.
- Tests belong under `src/tests/`, grouped by domain.
- Package scripts must point to the grouped script folders.

## Generated reports

Generated reports are logs. They should live under `docs/logs/`.

Important reports:

- stock review
- item icon lock report
- character portrait lock report
- item icon manual review CSV
- playtest/balance report

## Character portrait validation

After cropped portraits are in `public/assets/portraits/characters/`, run:

```powershell
pnpm audit:character-portraits
```

The audit reads the final prompt JSON files, checks the runtime portrait folder, rejects missing/orphan files, catches Git LFS pointer files that were not pulled, checks square PNG dimensions, scans for remaining pure magenta `#FF00FF` filename-label pixels, and writes:

```text
docs/logs/character-portrait-lock-report.md
```

## Git hygiene

- Do not commit `dist/`.
- Do not restore intentionally removed item assets unless asked.
- Do not add one-time patch scripts for docs organization.
- Prefer small commits with Conventional Commit style.
- Run focused tests for localized changes and full validation for broad changes.
