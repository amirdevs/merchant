# 12 - Existing Character Audit

This document defines how to audit the existing generated character records before writing final names, stories, looks, portrait prompts, and expression sets.

## Current baseline

The generated character data contains **203 records**, indexed from `0` through `202`.

This step does **not** generate portraits.

## Why audit first

The project needs original public-facing characters, but the old generated indexes can still be useful as mechanical anchors for market placement, stock generation, dialogue references, quest references, tests, and save/load safety.

So the rule is:

```text
Keep internal generated indexes stable for now.
Replace all public-facing identity.
```

Public-facing identity includes:

- display name
- portrait
- visual design
- story/description
- dialogue flavor
- personality wording
- any lookalike source-game presentation

## Audit decisions

Each generated slot should receive one of these decisions:

```text
KEEP_AND_REWORK
REPLACE_VISIBLE_IDENTITY
MERGE_WITH_ANOTHER
DISABLE_OR_HIDE
REFERENCE_CHECK_REQUIRED
```

Use `REFERENCE_CHECK_REQUIRED` when a slot might be linked to stock, market placement, dialogue, quests, or save data.

## Initial target

The first final-roster target is:

```text
203 generated records
192 visible reworked legacy slots
11 hidden/merged legacy slots
```

This is only a target. It can change after the per-character identity batch reveals which slots are worth keeping.

## Range-level audit plan

The first audit plan lives in:

```text
src/data/characters/legacyCharacterAuditPlan.ts
```

It divides the generated character list into five work ranges:

| Range | Purpose | Default action |
|---|---:|---|
| 0 | guard/security anchor | replace visible identity |
| 1-40 | core market cast | replace visible identity |
| 41-120 | standard traders/workers | replace visible identity |
| 121-180 | duplicate/support review | reference check |
| 181-202 | late/inactive/special review | reference check and likely hide/merge |

## Portrait-tier default

Portrait tiers should stay conservative until the full identity catalog exists:

| Tier | Expressions | Use |
|---|---:|---|
| major | 5 | recurring service/quest/company/guard characters |
| merchant | 3 | normal active traders and useful workers |
| minor | 1 | background or low-frequency visible characters |

## What not to do yet

Do not generate character sheets yet.

Portrait generation begins only after:

1. final visible roster is approved,
2. all final names/stories/looks are written,
3. all portrait images are listed in image-based batch manifests,
4. one small test sheet passes quality/crop/style checks.

## Next doc

Read next:

```text
docs/13_FINAL_CHARACTER_ROSTER_MAP.md
```
