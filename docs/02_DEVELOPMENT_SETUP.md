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
- Do not restore intentionally deleted/remade item assets unless asked.
- Do not add one-time patch scripts for docs organization.
- Prefer small commits with Conventional Commit style.
- Run focused tests for localized changes and full validation for broad changes.
