# Written Item Descriptions

This draft branch is being rebuilt as **hand-written item copy**, not a runtime template/combinator output.

## Scope

- Actual game items in `src/data/generated/items.json`: **2206**
- Hand-written static entries completed in this branch: **92**
- Remaining items to write: **2114**
- Completed batches:
  - **items 0–43**: currency, the Sunwake Harbor share, Painted Coast annals, local chronicles, primers, almanacs, and practical directories.
  - **items 44–91**: Crowncards books, magic/luck books, battle reports, trade essays, field guides, letters, and first gem items.

## Files

- `src/data/generated/item-written-descriptions.json` contains the authored entries completed so far.
- `src/lib/item-static-description.ts` reads the stored copy first and only falls back if an entry is missing.

## Writing standard

Each item must be written individually after reading the item name. The goal is not merely unique output; it must feel like a human-authored merchant-world description.

Each entry should have:

- `shortDescription`: usually 2 rich but natural sentences.
- `flavorText`: one short quote, proverb, ledger note, or in-world observation.

Avoid:

- shared sentence skeletons
- category-template swapping
- generic AI-sounding phrasing
- over-explaining game mechanics
- weird lore that makes the object feel implausible

## Review rule

Do **not** merge this PR until the content has been reviewed and approved.
