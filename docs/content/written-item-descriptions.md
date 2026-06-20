# Written Item Descriptions

This draft branch is being rebuilt as **hand-written item copy**, not a runtime template/combinator output.

## Scope

- Actual game items in `src/data/generated/items.json`: **2206**
- Hand-written static entries completed in this branch: **542**
- Remaining items to write: **1664**
- Completed batches:
  - **items 0–43**: currency, the Sunwake Harbor share, Painted Coast annals, local chronicles, primers, almanacs, and practical directories.
  - **items 44–91**: Crowncards books, magic/luck books, battle reports, trade essays, field guides, letters, and first gem items.
  - **items 92–141**: scarce/fabled gemstones, crowns, colored crystals, gem necklaces, and rings.
  - **items 142–191**: additional rings plus the first spice/herb goods.
  - **items 192–241**: remaining spices/aromatics, poisons, potions, remedies, alchemy solutions, and first alchemy tools.
  - **items 242–291**: alchemy workbench tools, oozes, jellies, turtles, frogs, scorpions, spiders, beetles, butterflies, moths, and first giant insects.
  - **items 292–341**: giant insects, moths, hive queens/workers, hounds, wolves, bats, rats, bears, megafauna, reptiles, and snakes.
  - **items 342–391**: remaining snakes and worms, farm animals, small birds, horse barding, dragon armors, gauntlets, war gloves, and first helmets.
  - **items 392–441**: helmets, mail shirts, plate armor, leather armor, named faction armor, exotic breastplates, iron boots, and the shield of Pearlgate.
  - **items 442–491**: named shields, bucklers, banners, an empty book, flowers, rare botanicals, and first mushrooms.
  - **items 492–541**: remaining mushrooms, leaves, pond pads, odd herbs, wetland plants, rare red plants, and named botanicals.

## Files

- `src/data/generated/item-written-descriptions.json` contains authored entries 0–91.
- `src/data/generated/item-written-descriptions-0092-0141.json` contains authored entries 92–141.
- `src/data/generated/item-written-descriptions-0142-0191.json` contains authored entries 142–191.
- `src/data/generated/item-written-descriptions-0192-0241.json` contains authored entries 192–241.
- `src/data/generated/item-written-descriptions-0242-0291.json` contains authored entries 242–291.
- `src/data/generated/item-written-descriptions-0292-0341.json` contains authored entries 292–341.
- `src/data/generated/item-written-descriptions-0342-0391.json` contains authored entries 342–391.
- `src/data/generated/item-written-descriptions-0392-0416.json` contains authored entries 392–416.
- `src/data/generated/item-written-descriptions-0417-0441.json` contains authored entries 417–441.
- `src/data/generated/item-written-descriptions-0442-0466.json` contains authored entries 442–466.
- `src/data/generated/item-written-descriptions-0467-0491.json` contains authored entries 467–491.
- `src/data/generated/item-written-descriptions-0492-0516.json` contains authored entries 492–516.
- `src/data/generated/item-written-descriptions-0517-0541.json` contains authored entries 517–541.
- `src/lib/item-static-description.ts` reads the stored copy first and only falls back if an entry is missing. Current note: the 492–541 JSON chunks have been committed; the reader wiring still needs to be updated after the connector accepts the TypeScript file update.

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
