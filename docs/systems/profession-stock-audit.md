# NPC Profession Stock Audit

This audit reviews every current profession template against the configurable stock system in `src/data/stock`.

The purpose is to prevent the problem first noticed with George Smith: an NPC can have the correct profession but still stock an implausible mixture, such as a blacksmith carrying mostly finished weapons and too few ingots, ore, tools, or coins.

This document proposes balancing changes. It does not mean every recommendation has already been implemented.

## Design Standard

Every trading NPC should generally have four layers of stock:

1. **Money reserve** appropriate to stock tier.
2. **Profession essentials** that define the NPC immediately.
3. **Raw materials or consumables** required by that profession.
4. **Small general stock** such as food, supplies, storage, or household items.

Profession essentials should remain the majority. General stock should make an NPC believable and useful without turning every character into a general merchant.

## Universal Rules

Current baseline:

- Pocket through light tiers guarantee copper.
- Modest and standard tiers guarantee copper and silver.
- Stocked and higher tiers guarantee copper, silver, and gold.
- Non-empty profiles receive a small general-goods archetype.
- Food and supplies are baseline guaranteed categories.

Recommended refinements:

- Do not give identical baseline guarantees to every profession.
- Use a configurable baseline by lifestyle:
  - settled vendor: food, household, storage;
  - traveler: food, supplies, map or storage;
  - military: food, supplies, weapon maintenance;
  - poor NPC: food and one incidental possession;
  - noble: money, luxury, household;
  - criminal: money, food, concealment or contraband.
- Coin guarantees should represent buying power, not just saleable loot.
- Later, coin reserves should be separated from visible item inventory.

## Priority Findings

### High priority

- Blacksmiths need more ore and ingots than finished equipment.
- Fletchers need arrows, bows, wood, and packs—not generic weapon catalogs.
- Miners need raw ore, coal, rocks, gems, carts, and pack animals—not crafted blacksmith stock.
- Barkeeps need guaranteed drinks, food, barrels, glassware, and household goods.
- Bards need guaranteed music, games, books, and art; traveler supplies should be secondary.
- Farmers need high quantities of produce, grains, seeds, and animals.
- Butchers need meat and spices as dominant bulk goods.
- Toolmakers need tools and materials rather than blacksmith weapons and armor.

### Medium priority

- Alchemists need ingredients and containers as well as finished potions.
- Fishers need bulk seafood and barrels before miscellaneous maritime goods.
- Seamstresses need fabrics, fibers, thread, and tools before finished luxury goods.
- Hunters need meat, animal parts, arrows, bows, cages, and hides.
- Magic users need specialization instead of all sharing one broad magic catalog.
- Generic merchants need explicit subtypes so their stock is not uniformly broad.

### Lower priority

- Fighters, knights, soldiers, nobles, sailors, thieves, religious NPCs, and beggars mostly need quantity and guarantee tuning rather than entirely new systems.

## Profession-by-Profession Review

## Alchemist

Current profile:

- Standard tier.
- 75% alchemist, 25% magic.

Expected identity:

- Potions, remedies, solutions, aromatics, botanicals, monster ingredients, books, pottery, bottles, and limited magical goods.

Potential problem:

- Broad `magic` weighting can crowd out practical alchemy.
- Raw ingredients may appear less often than completed potions.
- Containers and books are not guaranteed.

Recommended fix:

- Guarantee `alchemy`, `potions`, and `botanicals`.
- Add an `alchemy-ingredients` archetype for botanicals, monster parts, mushrooms, aromatics, and pottery.
- Give ingredients higher quantities than finished potions.
- Keep magic at 10–15%, unless the named NPC is explicitly a magical alchemist.
- Add poisons only through a criminal or named override.

## Baker

Current profile:

- Modest tier.
- 85% baker, 15% food.

Expected identity:

- Bread, grains, desserts, dairy, spices, baskets, sacks, carts, and small household stock.

Potential problem:

- Bread is guaranteed, but grain and desserts may be underrepresented.
- The source data uses the tag `deserts`, which appears to mean desserts.
- General food can introduce too many unrelated foods.

Recommended fix:

- Guarantee `bread`, `grains`, and `deserts`.
- Increase bread and grain quantities.
- Add a data alias or correct `deserts` to `desserts` later.
- Reduce unrelated meat and seafood.
- Add baskets and sacks as low-quantity support stock.

## Bard

Current profile:

- Light tier.
- 60% traveler, 40% art.

Expected identity:

- Musical instruments, games, books, stories, paints, small art pieces, flags, fabrics, and road supplies.

Potential problem:

- Traveler weighting is too high.
- Music is not guaranteed.
- Bards may look like ordinary travelers with a few paintings.

Recommended fix:

- Create a dedicated `bard` archetype.
- Guarantee `music`, `games`, and `books`.
- Suggested mix: 65% bard, 20% art, 15% traveler.
- Keep quantities low except for books, games, and simple instruments.

## Barkeep

Current profile:

- Modest tier.
- 80% food, 20% general.

Expected identity:

- Drinks, food, barrels, glassware, candles, furniture, household goods, flags, and a large coin reserve.

Potential problem:

- Drinks and barrels are not guaranteed.
- Generic food can dominate.
- The barkeep's unusually large source coin ranges are not fully represented by a modest tier.

Recommended fix:

- Create a dedicated `barkeep` archetype.
- Guarantee `drinks`, `food`, `barrels`, and `glass`.
- Increase coin multiplier without necessarily increasing stack count.
- Add candles and household goods at moderate weight.
- Keep furniture rare and low quantity.

## Beggar

Current profile:

- Pocket tier.
- 70% salvage, 30% food.

Expected identity:

- A little food, copper, rags, incidental household objects, and perhaps one unusual found item.

Potential problem:

- Universal supplies may make beggars look too commercially stocked.
- Salvage can produce weapons or armor that feel too valuable.

Recommended fix:

- Give beggars a custom baseline instead of the universal one.
- Guarantee only food and copper.
- Strongly cap item value.
- Allow a tiny chance for one curiosities/salvage item.
- Exclude full armor, expensive weapons, and large storage.

## Blacksmith

Current profile:

- Standard by profession, raised to at least Stocked by `isMerchant`.
- 60% blacksmith, 20% weapons, 20% armor.
- Raw-material guarantees and multipliers have now been added.

Expected identity:

- Ore, ingots, iron ingots, tools, anvils, grindstones, weapons, armor, crates, carts, and coins.

Problem found:

- George Smith initially carried too many finished profession goods and too few raw materials or coins.

Current correction:

- Ingots and ore have higher weights.
- Ingots, ore, iron ingots, and tools are guaranteed.
- Ingots and ore receive quantity multipliers.
- Coins and a small general baseline are guaranteed by tier/profile resolution.

Further recommendation:

- Make raw materials 35–45% of distinct stock.
- Make finished weapons and armor 30–40%.
- Reserve the remainder for tools, transport, food, storage, and coins.
- Add named specialization overrides:
  - weapon smith;
  - armor smith;
  - rural repair smith;
  - royal master smith.

## Butcher

Current profile:

- Modest tier.
- 80% food, 20% livestock.

Expected identity:

- Bulk meat, spices, preserved food, tools, crates, carts, and small amounts of livestock-related goods.

Potential problem:

- Generic food may produce fruit, bread, and vegetables more often than meat.
- Livestock can make a butcher look like a farmer.

Recommended fix:

- Create a dedicated `butcher` archetype.
- Guarantee `meat` and `spices`.
- Apply a strong meat quantity multiplier.
- Add tools and crates at low quantity.
- Keep live animals rare unless a named NPC is also a livestock trader.

## Cook

Current profile:

- Modest tier.
- 85% food, 15% tools.

Expected identity:

- Prepared food, spices, drinks, cookware, household goods, crates, and coins.

Potential problem:

- The broad food archetype does not distinguish ingredients from prepared dishes.
- Tools may include unrelated workshop tools.

Recommended fix:

- Add `cook` or `kitchen` archetype.
- Guarantee `food`, `spices`, and `drinks`.
- Weight household/tableware more than generic tools.
- Keep raw livestock and monster foods low.

## Farmer

Current profile:

- Modest tier.
- 65% food, 20% livestock, 15% tools.

Expected identity:

- Produce, grains, seeds, botanicals, animals, sacks, carts, cages, and packhorses.

Potential problem:

- Generic food can dilute produce.
- Grains and seeds are not guaranteed.
- Quantities should be much higher than a normal food vendor.

Recommended fix:

- Create a dedicated `farmer` archetype.
- Guarantee `veggies`, `fruit`, `grains`, and `seeds`.
- Add quantity multipliers for grains, vegetables, fruit, and seeds.
- Keep tools, animals, and carts secondary.
- Add regional farm specializations later.

## Fighter

Current profile:

- Light tier.
- 55% weapons, 30% armor, 15% traveler.

Expected identity:

- Personal weapons, armor, arrows, food, trophies, maps, alchemy, and travel storage.

Potential problem:

- Fighters can appear like weapon shops.
- Their source data expects mostly one-off personal equipment.

Recommended fix:

- Lower weapon and armor quantities.
- Guarantee one weapon and one armor category, not many copies.
- Add monster parts, maps, food, and traveler supplies.
- Keep high-value gear relationship-gated later.

## Fisher

Current profile:

- Modest tier, raised to Stocked because all current fishers are merchants.
- 80% fisher, 20% maritime.

Expected identity:

- Large seafood quantities, barrels, crates, tools, maps, remedies, and small weapons.

Potential problem:

- Stocked-tier variety can introduce too much generic maritime inventory.
- Seafood is guaranteed but may not occupy enough total quantity.

Recommended fix:

- Keep seafood as the dominant quantity and value share.
- Guarantee seafood and barrels.
- Add seafood quantity multiplier.
- Keep tools, maps, daggers, spears, and remedies low.
- Add fresh versus preserved fish later.

## Fletcher

Current profile:

- Standard tier.
- 75% generic weapons, 25% tools.

Expected identity:

- Arrows, wood arrows, bows, crossbows, shields, wood, packs, and fletching tools.

Potential problem:

- This profile can stock swords, axes, maces, and other unrelated weapons.
- Arrows and bows are not guaranteed.
- Arrow quantities should be much higher than other weapons.

Recommended fix:

- Add a dedicated `fletcher` archetype.
- Guarantee `arrows`, `bows`, and `wood`.
- Apply strong quantity multipliers to arrows.
- Allow shields and crossbows at lower weight.
- Exclude swords, axes, maces, and heavy armor.

## Hunter

Current profile:

- Light tier.
- Salvage, weapons, food, and traveler mix.

Expected identity:

- Bows, arrows, spears, meat, animal parts, monster parts, cages, hides, and travel supplies.

Potential problem:

- Generic salvage and weapons can produce unrelated armor and melee catalogs.
- Animal parts and meat are not guaranteed.

Recommended fix:

- Add a dedicated `hunter` archetype.
- Guarantee `bows`, `arrows`, `meat`, and `animals` or `monster parts`.
- Add cages and storage at moderate weight.
- Keep swords and heavy armor rare.

## Knight

Current profile:

- Light tier.
- Armor, weapons, and royal goods.

Expected identity:

- Personal sword, armor, shield, horse, food, clothes, chest, books, and heraldic goods.

Potential problem:

- Knights may appear like retail armor merchants.
- Packhorse is expected but not guaranteed.

Recommended fix:

- Guarantee one sword/weapon, armor, and packhorse.
- Keep quantities near one for equipment.
- Add royal/heraldic objects and food.
- Let named wealthy knights carry more money without more equipment stacks.

## Magic

Current profile:

- Standard tier.
- 80% magic, 20% books.

Expected identity:

- Wands, staffs, runes, glyph stones, crystals, magical books, alchemy, and monster ingredients.

Potential problem:

- All magical professions use one broad profile.
- Wizards, sorcerers, conjurers, enchanters, and necromancers should differ.

Recommended fix:

- Split into sub-archetypes:
  - wizard: books, wands, runes;
  - enchanter: crystals, glyph stones, weapons/armor enchantment materials;
  - conjurer: monster parts, runes, magic;
  - necromancer: graves, bones, monster parts, forbidden magic;
  - sorcerer: staffs, crystals, potions.
- Add character overrides until profession slugs become more specific.
- Guarantee at least one magical focus and one reagent category.

## Merchant

Current profile:

- Large tier.
- General, luxury, and traveler mix.

Expected identity:

- Broad stock, strong coin reserves, maps, food, storage, packhorses, fabrics, tools, jewelry, and regional goods.

Potential problem:

- Twenty-three NPCs share this profile despite very different displayed professions.
- A librarian, painter, collector, king, and ordinary trader can become too similar.

Recommended fix:

- Treat `merchant` as capacity, not assortment.
- Add named or displayed-profession overrides for:
  - librarian/bookseller;
  - art dealer;
  - collector;
  - royal merchant;
  - fabric merchant;
  - general trader;
  - luxury trader;
  - caravan merchant.
- Use dialogue and displayed profession only as authoring hints, not runtime regex rules.

## Miner

Current profile:

- Modest tier.
- 55% blacksmith, 30% tools, 15% salvage.

Expected identity:

- Bulk ore, coal, rocks, gems, crystals, tools, carts, and packhorses.

Potential problem:

- Reusing blacksmith makes miners stock finished weapons, armor, and ingots.
- Ore and coal are not guaranteed.

Recommended fix:

- Create a dedicated `miner` archetype.
- Guarantee `ore`, `rocks`, `gems`, and `coal`.
- Apply high quantity multipliers to ore, coal, and rocks.
- Keep gems and crystals low quantity.
- Add tools, carts, and packhorses as support goods.
- Exclude finished weapons and armor.

## Noble

Current profile:

- Light tier.
- Royal and luxury.

Expected identity:

- Coins, jewelry, furniture, art, books, heraldry, pottery, and a small amount of food.

Potential problem:

- Nobles may carry too many trade goods for non-merchants.
- Royal archetype can introduce weapons and armor.

Recommended fix:

- Focus on money, personal valuables, books, art, and household luxury.
- Keep quantities low but values high.
- Do not guarantee general supplies.
- Add estate goods only to named landowners.

## Quartermaster

Current profile:

- Wholesale tier.
- General, tools, traveler, and weapons.

Expected identity:

- Bulk food, clothes, weapons, armor, tools, storage, packhorses, carts, grains, fabrics, and military supplies.

Potential problem:

- This profile is directionally correct but lacks guaranteed military essentials.
- General stock may still consume too many slots.

Recommended fix:

- Add a dedicated `quartermaster` archetype.
- Guarantee food, clothes, tools, storage, weapons, armor, and packhorses.
- Use high quantities and moderate item values.
- Keep luxury, art, jewelry, and unrelated magic minimal.
- Add faction-specific military supply overrides later.

## Religious

Current profile:

- Light tier.
- 80% religious, 20% books.

Expected identity:

- Religious objects, candles, books, robes, statues, pottery, simple food, and donations.

Potential problem:

- Jewelry may crowd out practical religious stock.
- Different faiths currently share one profile.

Recommended fix:

- Guarantee religious items, candles, and books.
- Keep jewelry low unless it is an amulet or ceremonial object.
- Add faith-specific overrides later.
- Separate donation money from visible sale stock.

## Sailor

Current profile:

- Modest tier.
- Maritime, traveler, and food.

Expected identity:

- Seafood, barrels, maps, daggers, clothes, food, tools, small curiosities, and coins.

Potential problem:

- Broad traveler stock can make sailors resemble caravan merchants.
- Barrels and maps are not guaranteed.

Recommended fix:

- Guarantee maps, barrels, and food or seafood.
- Weight maritime tools and storage above generic supplies.
- Allow occasional foreign jewelry, magic, or art as low-chance curiosities.
- Keep armor and statues rare.

## Seamstress

Current profile:

- Standard tier.
- 85% fabrics, 15% luxury.

Expected identity:

- Fabrics, fibers, thread, clothes, dresses, robes, tools, baskets, spindle, and loom.

Potential problem:

- Luxury goods can introduce unrelated art and furniture.
- Fibers, thread, and fabrics are not all guaranteed.

Recommended fix:

- Guarantee fabrics, fibers, and thread.
- Add quantity multipliers for raw textiles.
- Keep finished clothing varied but lower quantity.
- Replace generic luxury with a narrow fashion/luxury-clothing archetype.

## Soldier

Current profile:

- Sparse tier.
- Weapons, armor, and traveler supplies.

Expected identity:

- Personal sword, armor, food, clothes, sacks, flags, heraldry, and limited money.

Potential problem:

- Generic weapons may create too many weapon types.
- Soldiers should not look like merchants.

Recommended fix:

- Guarantee one weapon and one armor category.
- Keep equipment quantities at one or two.
- Add food, clothes, and military insignia.
- Exclude luxury and high-rarity equipment unless named.

## Thief

Current profile:

- Light tier.
- Contraband, salvage, and jewelry.
- Restocks on arrival.

Expected identity:

- Coins, daggers, jewelry, masks, keys, poisons, contraband, food, and occasional magic.

Potential problem:

- Broad contraband weapons can become too visible and too plentiful.
- Arrival-only restocking may feel inconsistent if the player stays in one market.

Recommended fix:

- Guarantee coins, dagger, and one jewelry/contraband category.
- Add concealment-themed stock when such items exist.
- Use a night-only hidden stock layer later.
- Consider a two- or three-day restock in addition to arrival restock.

## Toolmaker

Current profile:

- Standard tier.
- 80% tools, 20% blacksmith.

Expected identity:

- Tools, supplies, materials, fabrics, packs, crates, household equipment, and books.

Potential problem:

- Blacksmith archetype can introduce ore, ingots, weapons, and armor.
- Tool quantities should be larger than finished weapon quantities.

Recommended fix:

- Remove blacksmith archetype.
- Create a `toolmaker` archetype with tools, supplies, wood, ingots, fabrics, household, packs, and crates.
- Guarantee tools and supplies.
- Add moderate quantity multipliers to common tools.
- Keep weapons and armor excluded.

## Characters Without a Profession Slug

Current population:

- Nineteen active customers.
- They use the general fallback unless explicitly overridden.

Potential problem:

- Their displayed professions include specialized identities such as cartographer, healer, philosopher, or servant, but stock remains generic.

Recommended fix:

- Assign profession slugs where possible.
- Until data is corrected, create named overrides for important customers.
- Prioritize healers, cartographers, collectors, artisans, librarians, and quest contacts.
- Avoid runtime inference from profession text as the permanent solution.

## Recommended New Archetypes

The following reusable archetypes would solve most remaining mismatches:

- `alchemy-ingredients`
- `bard`
- `barkeep`
- `butcher`
- `cook`
- `farmer`
- `fletcher`
- `hunter`
- `miner`
- `quartermaster`
- `toolmaker`
- `fashion`
- `military`
- `curiosities`
- `containers`
- `raw-materials`
- `prepared-food`
- `heraldry`

## Recommended Quantity Rules

Distinct stack count alone is not enough. Quantity behavior should vary by category:

- Coins: governed by buying-power reserve.
- Food and produce: high quantity.
- Grains, ore, coal, ingots, fabrics, arrows: bulk quantity.
- Tools and ordinary clothes: medium quantity.
- Weapons and armor: low to medium quantity.
- Gems, jewelry, magic items, paintings: low quantity.
- Unique and legendary goods: usually one.
- Animals and vehicles: one to a few.

The new archetype `quantityMultipliers` field supports this direction and is already used for blacksmith raw materials.

## Additional System Ideas

### Separate wallet from visible inventory

NPC buying power should eventually be stored as a wallet rather than coin item stacks. This prevents players from treating every merchant's entire operating budget as ordinary merchandise.

### Stock composition targets

Profiles could define percentage goals:

```ts
composition: {
  profession: 0.65,
  rawMaterials: 0.20,
  general: 0.10,
  rare: 0.05
}
```

This is more reliable than weighted random selection alone.

### Category guarantees with counts

Current guarantees only require at least one matching stack. A future format should support:

```ts
guarantees: [
  { tag: "ingots", minStacks: 4 },
  { tag: "ore", minStacks: 3 }
]
```

That would make blacksmith and wholesale stock much easier to control.

### Value budget

Add a total stock-value budget per tier. Without it, a merchant can randomly receive many expensive items and distort the economy.

### Inventory diagnostics

Add a development audit that prints for every profession:

- average stack count;
- average stock value;
- category percentages;
- coin reserve;
- raw-versus-finished ratio;
- rare-item count;
- guaranteed-category failures.

### Named specialties

Named NPCs should have specialties layered over professions. For example:

- George Smith: bulk iron and repair tools;
- royal smith: masterwork armor and rare metals;
- village smith: tools, nails, cookware, and small weapons.

### Market-aware inputs

Later stock generation should account for:

- local kingdom production;
- shortages and surpluses;
- wars and events;
- season;
- route accessibility;
- goods sold to that NPC by the player.

## Suggested Implementation Order

1. Add dedicated fletcher, miner, barkeep, farmer, butcher, toolmaker, bard, and quartermaster archetypes.
2. Add per-tag quantity multipliers to those archetypes.
3. Replace universal baseline guarantees with lifestyle baselines.
4. Add category guarantee counts.
5. Separate NPC wallet from coin inventory.
6. Add stock composition and value-budget audits.
7. Add named overrides for important quest and merchant NPCs.
