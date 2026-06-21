# Character Audit Overlay

Direct root-overlay for character rework Step 12.

No scripts are included.
No portrait generation is started.

## Adds

```text
src/data/characters/legacyCharacterAuditTypes.ts
src/data/characters/legacyCharacterAuditPlan.ts
docs/12_EXISTING_CHARACTER_AUDIT.md
docs/assets/character-prompts/02_EXISTING_CHARACTER_AUDIT_PROMPT_PLAN.md
```

## Updates

```text
README.md
AGENTS.md
docs/00_READ_ME_FIRST.md
src/data/characters/index.ts
```

## Run after extracting

```powershell
pnpm verify:current-state
pnpm build
```

## Suggested commit

```bash
git commit -m "data: add existing character audit plan"
```
