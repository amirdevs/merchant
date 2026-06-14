# Arian-style migration patch 01

This patch restructures the React/Electron app toward `ARIAN_SYSTEM_DESIGN_MIGRATION.md` while keeping the current game behavior and UI intact.

## What changed

- `src/main.tsx` is now thin and only boots `src/app/app.tsx`.
- Added `src/app/` for top-level app composition and router-shaped composition.
- Added `src/sub-domains/` with domain-driven folders:
  - `shared/` for UI primitives, providers, globals, hooks, utils, and response helpers.
  - `game/` for game shell, controller hook, view state, profile/settings types, and menu/system views.
  - `inventory/` for inventory panel, slots, toolbar, filters, item modal, utils, types, and constants.
  - `barter/`, `market/`, `customer/`, and `travel/` for their own views/components.
- Replaced legacy large compatibility components with re-export wrappers:
  - `src/components/ui.tsx`
  - `src/components/InventoryPanel.tsx`
  - `src/components/HelpModal.tsx`
  - `src/components/TypewriterText.tsx`
- Added `@/*` path alias in `vite.config.ts` and `tsconfig.json`.
- Added Biome config and VS Code settings according to the migration guide.
- Added root `components.json` aliases for future shadcn-style primitives.

## Safety notes

- No game data, saves, item assets, public assets, or generated icon folders are changed.
- The existing CSS is still the source of styling. `src/sub-domains/shared/assets/globals.css` imports `src/styles.css` to avoid visual regressions.
- The old `src/lib/*` files are left in place for now to avoid risky behavior changes. The new domain layer imports them through smaller views/hooks. A later pass can move the business logic into use-cases/repositories in smaller chunks.
- I did not introduce React Router or TanStack Query yet. The migration guide lists them as target stack, but adding runtime routing/data libraries in the same patch would be riskier. This patch creates the structure first.

## Validation performed

Tested on the uploaded project after applying this overlay:

```text
npm install --ignore-scripts --no-audit --prefer-offline
npm run typecheck
npm run build
```

Results:

- TypeScript passed.
- Vite build passed.
- Vite emitted only the existing large chunk/font runtime warnings, not TypeScript errors.

## Next recommended migration pass

1. Split `src/styles.css` into domain CSS files under `src/sub-domains/shared/assets/` and domain folders.
2. Move `src/lib/game.ts`, `src/lib/save.ts`, and related business logic into `game/use-cases`, `game/repositories`, and `game/types` gradually.
3. Introduce React Router only if you want browser-level URLs for game screens; for Electron, a hash router is safer than browser history.
4. Introduce TanStack Query only when external async repositories/API calls exist.
