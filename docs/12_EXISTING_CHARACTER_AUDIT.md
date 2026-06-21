# 12 - Existing Character Audit

This doc is the next step after `11_USEFUL_NPC_ROSTER_SEEDS.md`.

Portrait generation is still blocked. We are not there yet.

## Current baseline

The generated character source is:

```text
src/data/generated/characters.json
```

Current known generated baseline:

```text
Total generated records: 203
Index range: 0-202
```

This file remains a mechanical reference for now. Do not edit it directly for visible identity work.

## Why audit before portraits

Character portraits are expensive to generate and crop. The final visible roster must be decided before any real portrait-sheet production.

The audit decides which generated records become:

```text
KEEP_AND_REWORK
REPLACE_VISIBLE_IDENTITY
MERGE_WITH_ANOTHER
DISABLE_OR_HIDE
PROMOTE_TO_SYSTEM_NPC
NEEDS_MANUAL_REVIEW
```

## Hard rule

All visible old identity must be replaced:

```text
old public name -> new original display name
old portrait -> new original portrait
old look -> new profession-specific visual design
old dialogue flavor -> new story/dialogue voice
```

The internal index can stay temporarily so quests, markets, saves, and stock logic do not break.

## Initial audit decisions

The seed audit lives in:

```text
src/data/characters/legacyCharacterAuditPlan.ts
```

Initial direction:

| Generated index scope | Current role type | Decision | Why |
|---:|---|---|---|
| `0` | Guard/law role | `PROMOTE_TO_SYSTEM_NPC` | Needed for illegal goods, confiscation, customs, toll, and route-risk loops. |
| `1` | Thief/risk role | `PROMOTE_TO_SYSTEM_NPC` | Needed for robbery, crime, black-market, and travel risk loops. |
| `2-10` | Early guild/tutorial leaders | `REPLACE_VISIBLE_IDENTITY` | High-visibility NPCs must become fully original. |
| `11-120` | Main merchants/specialists | `KEEP_AND_REWORK` | Most likely useful as stock anchors, market flavor, quest contacts, and portrait variety. |
| `121-180` | Later specialists/travelers/duplicates | `NEEDS_MANUAL_REVIEW` | Useful roles may be mixed with duplicates; avoid portrait work until sorted. |
| `181-202` | Tail/special/inactive records | `NEEDS_MANUAL_REVIEW` | Some may be hidden or special; check references before disabling. |

## What counts as a useful old slot

Keep or promote a generated slot when it supports at least one current/future system:

- barter/trade stock identity
- travel risk or route events
- warehouse/company/shipment loop
- quest/contract/runtime dialogue
- illegal goods, customs, or guard behavior
- market identity and local price flavor
- rare item sink or specialist buyer
- tutorial/onboarding role

## What should be disabled or merged

Disable, hide, or merge a slot when it is:

- a weak duplicate of a stronger NPC
- inactive and not referenced by any useful system
- too generic to justify portrait generation
- redundant inside the same market
- only useful as historical source data

## Existing + new roster rule

The final roster must combine:

```text
reworked generated slots
useful new NPC seeds
merged/disabled generated slots
final expression count per visible NPC
```

Do not generate portraits until that final roster map exists.

## Next step

Next doc/patch should be:

```text
13_FINAL_CHARACTER_ROSTER_MAP.md
```

That step should produce the first final roster manifest and calculate:

```text
final visible legacy characters
final useful new NPCs
disabled/hidden old slots
final total characters
final total portrait images
first test portrait batch size
```

Only after that do we write full hand-made identities and prompt batches.
