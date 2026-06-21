# Profession Item Coverage

This report captures the item-catalog state after the first full rename, category normalization, and coverage expansion pass.

It is the handoff point between item-catalog work and `profession-stock-audit.md`.

## Catalog Summary

- Total items: 2,206.
- Added items in this pass: 234.
- Source-risk scan against old item names, tags, IDs, and icon paths: 0 hits for the checked inherited place/book/company/card terms.
- Icon prompt output: 5,006 image slots across 101 prompt configs.
- Final prompt sheet: 6 slots.

## Family Counts

| Family | Count |
|---|---:|
| weapon | 301 |
| animal_goods | 177 |
| magic | 167 |
| produce | 157 |
| luxury | 130 |
| armor | 112 |
| textile | 112 |
| curio | 108 |
| art | 105 |
| book | 85 |
| stone | 69 |
| tool | 67 |
| household | 65 |
| alchemy | 60 |
| food | 54 |
| seafood | 51 |
| metal | 47 |
| spice | 35 |
| wood | 30 |
| grain | 29 |
| drink | 29 |
| religion | 28 |
| game | 24 |
| meat | 23 |
| container | 23 |
| travel | 22 |
| livestock | 20 |
| document | 19 |
| maritime | 19 |
| music | 12 |
| ore | 12 |
| leather | 11 |
| currency | 3 |

## Profession Pool Coverage

These counts measure how many current items match at least one non-coin obtainable token in each generated profession profile. They are intentionally broad because current profession pools still include generic tokens such as `food`, `books`, `magic`, and `armor`.

| Profession | Matching items | Current pool tokens |
|---|---:|---|
| alchemist | 607 | alchemy, books, drinks, monster_parts, magic, pottery, religion |
| baker | 345 | bread, desserts, copper, silver, vehicles, baskets, household, clothes, books, grains |
| beggar | 342 | food, daggers, household |
| butcher | 418 | meat, spices, food, tools, vehicles, crates, household |
| barkeep | 543 | food, drinks, flags, heraldic_art, furniture, barrels, copper, glass, books, household, sacks, paintings, candles |
| blacksmith | 730 | food, ore, ingots, iron_ingot, weapons, armor, tools, vehicles, crates, chests, pack_animals, anvil, grindstone |
| cook | 366 | food, spices, drinks, copper, silver, vehicles, household, crates |
| farmer | 610 | food, animals, botanicals, household, furniture, pack_animals, vehicles, cages, sacks, seeds, grains |
| fighter | 1,290 | food, monster_parts, weapons, armor, arrows, bows, statues, jewelry, magic, maps, books, alchemy, storage |
| fletcher | 269 | clothes, wood_arrow, arrows, bows, shields, books, travel |
| fisher | 290 | seafood, tools, daggers, spears, barrels, remedies, books, maps, crates |
| knight | 754 | food, swords, armor, monster_parts, pack_animals, clothes, chests, books, sword_stones |
| merchant | 788 | jewelry, crystals, ingots, food, spices, vehicles, storage, pack_animals, clothes, furniture, tools, alchemy, maps, books, fabrics |
| miner | 278 | food, ore, coal, rocks, gems, crystals, pack_animals, vehicles |
| noble | 573 | maps, food, furniture, jewelry, books, statues, banners, flags, heraldic_art, pottery, chests |
| quartermaster | 747 | food, swords, armor, clothes, pack_animals, vehicles, storage, tools, grains, fabrics, books, educational, military |
| sailor | 919 | food, seafood, daggers, books, armor, clothes, statues, maps, jewelry, magic, barrels |
| seamstress | 517 | food, clothes, tools, flags, furniture, travel, baskets, spindle_and_wheel, loom, fabrics, fibers |
| soldier | 760 | food, swords, armor, monster_parts, pack_animals, clothes, sacks, flags, books, heraldic_art |
| thief | 644 | food, daggers, books, jewelry, magic |
| toolmaker | 532 | food, supplies, tools, furniture, books, travel, crates, fabrics |
| hunter | 416 | bows, arrows, spears, monster_parts, animals, meat, cages, storage, pack_animals |
| bard | 503 | food, games, books, paints, music, aromatics, paintings, flags, heraldic_art, pottery, glyph_stones, fabrics |
| religious | 490 | food, statues, religion, jewelry, books, pottery, fabric |
| magic | 760 | food, magic, alchemy, monster_parts, books, crystals, map_of_the_west |

## Step 3 Findings

- Every profession now has enough matching catalog coverage for the stock audit to proceed.
- The weakest primary families are still `currency`, `leather`, `ore`, `music`, `maritime`, `document`, and `livestock`, but all except currency now have enough items for at least small specialist stock.
- Blacksmiths, miners, hunters, fishers, seamstresses, barkeeps, butchers, alchemists, and farmers now have raw materials and support goods available, not only finished luxury or combat items.
- Current profession pools are still too broad. For example, fighter, sailor, merchant, and magic profiles match hundreds of items because their pools include large umbrella categories.
- `profession-stock-audit.md` should now narrow stock archetypes with `family`, `subfamily`, `tradeRole`, and `categoryAxes` rather than relying on old broad tags.

## Recommended Next Step

Proceed to `profession-stock-audit.md` implementation.

During that pass, prefer metadata-targeted archetypes:

- Blacksmith: `ore`, `metal`, `tool`, `construction`, `raw_material`, `refined_material`, limited `weapon` and `armor`.
- Fisher: `seafood`, `maritime`, `container`, `salted`, `preserved`, `tool`.
- Farmer: `grain`, `produce`, `livestock`, `food`, `seeds`, `daily_staple`.
- Barkeeper: `drink`, `food`, `container`, `household`, `game`, `music`.
- Seamstress: `textile`, `leather`, `tool`, `thread`, `finished_good`.
- Alchemist: `alchemy`, `magic`, `container`, `ingredient`, `volatile`, `remedies`.
