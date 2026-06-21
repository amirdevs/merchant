# 10 - Character Rework And Portraits

This is the compressed source-of-truth roadmap for replacing all visible character identity, adding useful new NPCs before portrait generation, and preparing portrait prompt batches that can be generated and cropped consistently.

## Starting point

- Generated base: 203 original character records, index `0` through index `202`.
- These records can remain as internal/mechanical references for now.
- Visible identity must be original: new names, stories, portraits, looks, roles, and dialogue flavor.

## Non-negotiable portrait rule

Do **not** generate portraits until Phase C.

Portrait batching is based on **total portrait images**, not total characters. If 240 characters need 726 expression images, the 726 images are batched. A single character can have 3 expressions in one sheet and the remaining 2 in another sheet, as long as every image repeats the same identity anchor.

## Compressed roadmap

### Phase A - Final roster and dependency pass

Merge the old audit, useful new NPC planning, keep/replace/disable decisions, stable-index safety, final visible count, and rough portrait count.

Current target:

```text
203 generated legacy records
192 visible reworked legacy slots
11 hidden/merged legacy slots
48 useful new NPCs
240 final visible characters
726 planned portrait images before final manifest review
```

### Phase B - Identity catalog mega-batches

Write large batches of final public-facing identities:

- new display names;
- short story descriptions;
- profession-specific looks;
- body/face/clothing/prop uniqueness;
- voice direction;
- trade personality;
- quest hooks;
- expression tier;
- portrait identity anchor.

Only shared art style and cropping rules may repeat. Character design content must stay hand-written and specific.

Current Phase B status after this overlay:

```text
48 useful new NPC identities complete
194 useful-new-NPC portrait images planned
legacy-slot identity writing remains
```

### Phase C - Portrait manifest and test sheet gate

Create the final image-count-based portrait manifest, then generate only one small test sheet first.

Recommended test:

```text
10-20 total portrait images
5x4 or 4x3 grid
pure green #00FF00 background
strict left-to-right order
```

If the test sheet has same-face problems, low detail, or weak expression consistency, fix prompt rules before generating all sheets.

### Phase D - Full portrait production and asset lock

Generate the remaining portrait sheets, crop them, place files under the final portrait asset folder, then add portrait audit checks for:

- missing portrait files;
- orphan portrait files;
- duplicate display names;
- invalid expression paths;
- unchanged original visible identity leaking into UI.

### Phase E - Runtime integration and gameplay pass

Use the remake identity/portrait layer in:

- market NPC list;
- trade/barter view;
- quest/dialogue view;
- company/warehouse/shipment UI;
- expression switching for offer state, route risk, quest success/failure, illegal goods, and reputation changes.

## Character prompt folder

Character prompts live beside item prompts:

```text
docs/assets/character-prompts/
```

Generated/cropped portrait sheet references may live under:

```text
docs/assets/character-sheets/
```

## Current next action

Continue Phase B with legacy-slot identity mega-batches. Do not generate portraits yet.
