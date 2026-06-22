# Item Catalog Redesign

This document proposes the first pass for replacing the inherited item catalog with a new, project-owned catalog before implementing `profession-stock-audit.md`.

The goal is not only to rename items. The goal is to make the economy, item art, professions, and world identity feel original enough that the catalog reads as this game's own merchant RPG.

## Why This Comes First

Profession stock work depends heavily on the item list. If professions are audited before the catalog is redesigned, many archetypes will be balanced around inherited item names, inherited groupings, and item gaps that may not survive the redesign.

Recommended order:

1. Redesign item catalog names, taxonomy, and world flavor.
2. Implement the profession stock audit against the new catalog.
3. Regenerate icon prompts and item art after the economy has stabilized.

Small visual test sheets are fine during step 1, but the full icon pipeline should wait until after profession stock work reveals which items are kept, merged, split, or added.

## Design Goals

- Make every item feel native to the new setting.
- Prefer expressive fantasy merchant goods over generic medieval lists.
- Keep items practical for trade, crafting, profession stock, quests, rumors, and market demand.
- Support quantity variants for item art: `one`, `few`, and `many`.
- Add clear item taxonomy so stock archetypes can target item families reliably.
- Avoid names, companies, books, historical references, or regional labels that reveal the source catalog.
- Do not preserve old save compatibility unless specifically requested.

## Naming Direction

Use bright, painterly coastal fantasy language: trade winds, enamel, brass, shell, salt, moon-tide, sunlit markets, orchard roads, guild marks, carved wood, sea glass, old shrines, and whimsical magical craft.

Good patterns:

- Concrete noun plus distinctive material: `brass-ribbed lantern`, `blueglass bottle`, `sunwax candle`.
- Regional fantasy adjective plus good: `Tidefall saffron`, `Marrowfen peat`, `Aurelian pear`.
- Profession-readable names: `farrier's rasp`, `dyer's mordant jar`, `cartwright's axle pin`.
- Magical but tradeable: `glowmoss bundle`, `whisper-ink vial`, `star-salt pinch`.
- Slightly playful premium RPG names: `moonbun pastry`, `stormcap mushroom`, `luck-knot charm`.

Avoid patterns:

- Names that sound copied from a plain medieval commodity list.
- Long lore book titles that resemble source text.
- Real-world company names or source-like faction names.
- Excessive synonym swaps where the item role is still obviously identical.
- Too many joke items; the tone should be charming, not parody.

## Proposed Taxonomy

Every item should have stable structured fields beyond `name` and `tags` in this rewrite.

Suggested fields:

- `id`: stable slug used by data, stock profiles, saves, and art lookup.
- `displayName`: player-facing name.
- `family`: broad economy family.
- `subfamily`: narrower stock/audit group.
- `categoryAxes`: structured categories used by current and upcoming systems.
- `forms`: available quantity art variants, usually `one`, `few`, `many`.
- `professionUses`: optional list of professions that commonly buy, sell, or consume it.
- `regions`: optional list of markets or cultures that specialize in it.
- `sources`: optional list of origins such as farmed, mined, foraged, crafted, imported, blessed, illicit, or monster-derived.
- `tradeRole`: `currency`, `raw`, `ingredient`, `tool`, `finished`, `luxury`, `container`, `document`, `animal`, `curio`, `contraband`, or `quest`.
- `rarityBand`: practical rarity bucket for stock generation.
- `qualityBands`: optional item quality variants such as rough, common, fine, masterwork, spoiled, counterfeit, antique, blessed, cursed, or enchanted.
- `bulkProfile`: how it should stack and appear visually: `single`, `bundle`, `crate`, `sack`, `barrel`, `pile`, `rack`, `cage`, `chest`, `jar`, `roll`, `book`, `bottle`.
- `storageNeeds`: optional handling tags such as dry, chilled, sealed, fragile, locked, sacred, stable, hazardous, or guarded.
- `decayProfile`: optional spoilage rules such as none, fresh, preserved, volatile, rusts, wilts, ferments, or expires.
- `marketBehavior`: optional demand behavior such as staple, seasonal, festival, wartime, famine, luxury, remote-demand, port-demand, guild-demand, or illegal-demand.

Initial `family` values:

- `currency`
- `food`
- `drink`
- `spice`
- `grain`
- `produce`
- `meat`
- `seafood`
- `animal_goods`
- `livestock`
- `wood`
- `stone`
- `ore`
- `metal`
- `gem`
- `textile`
- `leather`
- `tool`
- `weapon`
- `armor`
- `alchemy`
- `magic`
- `religion`
- `book`
- `art`
- `music`
- `game`
- `household`
- `container`
- `travel`
- `maritime`
- `vehicle`
- `construction`
- `luxury`
- `document`
- `contraband`
- `curio`
- `quest`

## Expansion Category Axes

Families answer "what is this?" Category axes answer "how can systems use this?" An item can belong to one family but many axes.

### Material Axis

Useful for crafting, repairs, decay, market shortages, and icon prompt styling.

- `plant`
- `grain`
- `fruit`
- `vegetable`
- `fungus`
- `meat`
- `fish`
- `shellfish`
- `dairy`
- `egg`
- `honey`
- `wood`
- `paper`
- `cloth`
- `thread`
- `leather`
- `fur`
- `bone`
- `horn`
- `shell`
- `stone`
- `clay`
- `glass`
- `iron`
- `steel`
- `copper`
- `bronze`
- `brass`
- `silver`
- `gold`
- `gemstone`
- `crystal`
- `wax`
- `oil`
- `resin`
- `salt`
- `powder`
- `ink`
- `spirit`
- `monster_part`
- `divine_material`
- `arcane_material`

### Production Stage Axis

Useful for profession inventories and crafting chains.

- `raw_material`
- `cleaned_material`
- `preserved_material`
- `refined_material`
- `component`
- `blank`
- `part`
- `kit`
- `tool`
- `finished_good`
- `repaired_good`
- `damaged_good`
- `salvage`
- `waste_byproduct`

Example chain:

- `bog iron ore`
- `charcoal bundle`
- `forge flux jar`
- `iron ingot`
- `hinge blank`
- `brass hinge pair`
- `polished cabinet latch`

### Freshness and Preservation Axis

Useful for spoilage, travel risk, market timing, and tavern stock.

- `fresh`
- `dried`
- `salted`
- `smoked`
- `pickled`
- `candied`
- `fermented`
- `cured`
- `frozen`
- `wax_sealed`
- `oil_packed`
- `shelf_stable`
- `spoiled`
- `overripe`

### Legal and Social Axis

Useful for guards, thieves, nobles, reputation, inspections, and events.

- `ordinary`
- `taxed`
- `licensed`
- `guild_restricted`
- `noble_restricted`
- `temple_restricted`
- `military_restricted`
- `smuggled`
- `stolen`
- `counterfeit`
- `forged`
- `forbidden`
- `cursed`
- `scandalous`

### Market Behavior Axis

Useful for demand simulation.

- `daily_staple`
- `bulk_trade`
- `craft_supply`
- `repair_supply`
- `festival_good`
- `pilgrim_good`
- `winter_good`
- `summer_good`
- `storm_good`
- `war_good`
- `famine_good`
- `plague_good`
- `wedding_good`
- `funeral_good`
- `port_specialty`
- `inland_specialty`
- `noble_luxury`
- `poor_household`
- `collector_good`
- `speculative_good`

### Storage and Handling Axis

Useful for inventory rules, wagons, warehouses, theft risk, and spoilage.

- `tiny`
- `handheld`
- `bulky`
- `heavy`
- `fragile`
- `sharp`
- `flammable`
- `wet`
- `dry_storage`
- `cool_storage`
- `sealed`
- `locked`
- `caged`
- `tethered`
- `guarded`
- `sacred`
- `hazardous`
- `smelly`
- `noisy`
- `valuable_small`

### Art Variant Axis

Useful for prompt generation and icon review.

- `single_object`
- `separated_group`
- `overflowing_pile`
- `sack`
- `crate`
- `barrel`
- `jar`
- `bottle`
- `vial`
- `tin`
- `box`
- `chest`
- `basket`
- `tray`
- `bundle`
- `roll`
- `rack`
- `cage`
- `book`
- `scroll`
- `tool_set`
- `wearable`
- `weapon_profile`
- `animal_portrait`

### Feature Hooks Axis

Useful for expansion without redesigning the catalog again.

- `crafting_input`
- `crafting_output`
- `repair_input`
- `cooking_input`
- `brewing_input`
- `alchemy_input`
- `enchanting_input`
- `quest_turn_in`
- `rumor_trigger`
- `gift`
- `bribe`
- `inspection_risk`
- `theft_target`
- `warehouse_good`
- `travel_consumable`
- `combat_consumable`
- `equipment`
- `collection`
- `decoration`
- `pet`
- `mount`
- `pack_animal`
- `shop_fixture`

## Variant Strategy

Variants should expand gameplay and art variety without making every item explode into unnecessary clones.

### Quantity Variants

Use these when an item naturally stacks or trades in bulk:

- `one`: exactly one main item.
- `few`: exactly 3 to 5 separated pieces.
- `many`: at least 12 pieces or an overflowing pile, sack, crate, basket, rack, or barrel.

Good quantity-variant families:

- coins
- food staples
- produce
- seafood
- spices
- ore
- ingots
- gems
- thread
- buttons
- arrows
- candles
- vials
- books only when generic, not unique titled books

Avoid `many` variants for:

- named books
- unique documents
- large livestock
- carts
- rare artifacts
- one-of-a-kind curios

### Quality Variants

Use sparingly where quality affects value or NPC taste.

- `rough`
- `common`
- `fine`
- `masterwork`
- `antique`
- `blessed`
- `enchanted`
- `counterfeit`
- `damaged`
- `spoiled`

Good quality-variant families:

- weapons
- armor
- tools
- jewelry
- clothing
- books
- art
- gems
- horses and pack animals
- documents and licenses

### Processing Variants

Use when a profession turns one good into another.

- raw hide, cured hide, dyed leather, leather strap, finished belt
- wheat sheaf, flour sack, dough crock, oat loaf
- fresh fish, salted fish, smoked fish, fish oil
- ore, ingot, blank, fitting, finished tool
- raw herb, dried herb, powdered herb, tincture, tonic

### Regional Variants

Use when market identity matters. Do not create regional variants for every item; reserve them for goods that make travel and arbitrage more interesting.

Examples:

- Tidefall saffron
- Marrowfen peat brick
- Sunharbor pearl seed
- Glassmere blue bottle
- Ashroad charcoal bundle
- Orchard Road cider apple
- Highbell prayer bead
- Saltspire smoked herring

### Seasonal Variants

Use when the item can support festivals, shortages, or seasonal demand.

Examples:

- spring nettle bundle
- midsummer berry basket
- harvest moon pumpkin
- winter candle box
- storm-season tar pot
- first-catch silverfin
- festival sugar twist
- funeral incense cone

### Condition Variants

Use when risk, repair, or bargain hunting is part of the trade.

Examples:

- cracked blueglass bottle
- tarnished silver spoon
- rusty hinge bundle
- bruised apple basket
- water-damaged ledger
- chipped moonstone
- patched rain cloak
- dull carving knife

### Package Variants

Use when the same good trades differently at different scales.

Examples:

- saffron pinch, saffron tin, saffron lockbox
- salt scoop, salt sack, salt barrel
- nails handful, nail pouch, nail keg
- cider bottle, cider jug, cider keg
- flour pouch, flour sack, flour crate

## Expanded Family Scope

These families are part of the full catalog rewrite scope. Some can start with fewer items than the core trade families, but they should exist in the taxonomy and have enough examples for stock, prompts, and future content additions.

### Cooking and Kitchenware

- iron skillet
- copper saucepan
- soup ladle
- bread peel
- clay baking dish
- spice spoon set
- kitchen knife
- chopping board
- flour sieve
- butter churn
- cheese press
- pie mold
- cooling rack
- stew pot
- glazed serving bowl

### Medicine and Care

- clean bandage roll
- splint bundle
- fever cloth
- herbal poultice
- tooth powder tin
- smelling salts
- leech jar
- bone-setter's brace
- eye patch
- soothing syrup
- wound wash flask
- apothecary label set
- invalid broth jar
- warm brick wrap

### Education and Stationery

- slate tablet
- chalk bundle
- quill set
- ink cake
- wax tablet
- arithmetic board
- copybook
- lesson primer
- map pin tin
- bookmark ribbon
- document weight
- paper sheaf
- parchment roll
- brass page clip

### Festivals and Ceremonies

- ribbon garland
- flower crown
- painted lantern
- festival bell
- sugar mask
- confetti pouch
- parade sash
- firework cone
- wedding candle pair
- mourning veil
- oath cup
- prize ribbon
- lucky coin wreath
- painted egg basket

### Shop Fixtures and Merchant Gear

- counter bell
- brass price tags
- chalkboard sign
- sample spoon
- folding display stand
- velvet display pad
- ledger stamp
- coin tray
- merchant awning cloth
- lockbox key ring
- customer token bowl
- weighing chain
- receipt spike
- inventory peg board

### Farming Equipment

- hand sickle
- seed dibber
- hoe head
- watering can
- pruning hook
- grafting knife
- scarecrow hat
- bee smoker
- milking pail
- egg basket
- feed scoop
- small plowshare
- orchard ladder rung
- compost fork

### Mining and Quarry Gear

- miner's pick
- ore pan
- candle helmet
- pit rope
- wedge set
- sledge hammer
- mine lamp
- chalk mark stone
- sample pouch
- rubble basket
- hand winch crank
- rail spike
- quarry chisel
- dust mask cloth

### Glass, Ceramics, and Enamel

- clear glass bead
- blueglass pane
- perfume bottle
- apothecary vial
- glazed tile
- clay cup
- porcelain spoon
- enamel powder
- kiln cone
- glass frit jar
- ceramic button
- painted plate
- mosaic chip sack
- lamp chimney

### Jewelry and Personal Adornment

- brass ring
- silver hairpin
- pearl earring
- enamel brooch
- charm bracelet
- shell necklace
- signet blank
- velvet choker
- cufflink pair
- anklet bells
- carved comb
- jeweled hat pin
- mourning locket
- lucky button

### Clothing and Wearables

- work apron
- rain cloak
- sailor cap
- market bonnet
- embroidered vest
- wool stockings
- leather gloves
- silk sash
- linen shirt
- patched trousers
- noble cuff pair
- pilgrim scarf
- fur-lined hood
- festival shoes

### Furniture and Household Comfort

- carved stool
- folding chair
- wool blanket
- rush mat
- pillow roll
- brass candlestick
- wall hook
- curtain tie
- laundry soap
- broom bundle
- hearth brush
- small mirror
- flower vase
- storage trunk

### Writing, Law, and Bureaucracy

- blank contract
- stamped license
- tax seal strip
- customs tag
- notarized receipt
- apprentice papers
- warehouse claim ticket
- witness ribbon
- boundary map
- court summons
- debt marker
- guild dues ledger
- import permit
- seal wax brick

### Monster and Adventure Salvage

- basilisk scale
- wyvern tooth
- giant moth wing
- cave spider silk
- ember lizard tail
- trollish brass button
- haunted coin
- ghost salt vial
- mimic hinge
- gargoyle chip
- siren shell
- swamp hag hairpin
- fae thorn
- dungeon candle stub

### Weather and Navigation

- stormglass
- pocket compass
- tide dial
- rain gauge tube
- wind ribbon
- sailor's astrolabe
- sun chart
- fog bell
- beacon oil
- star map scrap
- weather journal
- harbor light token
- cloud-reading cards
- waterproof map case

### Vehicles and Pack Gear

- cart wheel
- axle grease
- wheel spoke
- wagon canvas
- harness buckle
- yoke pad
- sled runner
- handcart handle
- pack saddle
- cargo net
- tie-down strap
- wheel chock
- lantern bracket
- repair plank

### Dyes, Paints, and Pigments

- indigo cake
- madder root bundle
- saffron dye pinch
- soot black pot
- shell white powder
- copper green jar
- enamel blue jar
- gold paint tin
- lacquer pot
- brush bundle
- mordant jar
- alum crystal
- painter's palette
- stencil sheet

### Perfume, Soap, and Cosmetics

- rosewater flask
- lavender soap
- citrus pomade
- kohl stick
- rouge tin
- perfume sampler
- bath salt pouch
- hair oil vial
- tooth polish
- scented wax tablet
- shaving brush
- comb oil
- mirror powder
- hand cream jar

### Toys and Children's Goods

- wooden horse toy
- painted spinning top
- marble pouch
- cloth doll
- tin soldier
- paper kite
- puzzle box
- jumping jack puppet
- story tiles
- toy boat
- ribbon hoop
- chalk dragon set
- small drum rattle
- festival whistle

### Siege, Guard, and Military Supply

- spear rack tag
- shield strap
- bowstring bundle
- arrowhead pouch
- oilcloth armor wrap
- watch horn
- signal flare cone
- gate key blank
- practice target
- ration crate
- boot nail tin
- banner patch
- helmet liner
- patrol lantern

### Shrine, Occult, and Superstition

- fortune ash packet
- omen bone set
- saint ribbon
- grave coin
- moon incense
- warding nail
- bell charm
- curse tablet
- prayer wax
- blessing bowl
- reliquary glass
- spirit thread
- funeral salt
- candle snuffer

## Catalog Restructure Strategy

### Phase 1: Inventory the Existing Catalog

Generate a working audit table from `src/data/generated/items.json`:

- old index
- old name
- old tags
- proposed new id
- proposed display name
- proposed family
- proposed subfamily
- keep, merge, split, replace, or delete
- notes

The first pass should classify items without editing gameplay data. This makes it easier to review risky inherited names and detect duplicates.

### Phase 2: Replace World-Specific Names

Rename or replace:

- company stakes
- named books
- named histories
- named artifacts
- region-specific goods
- faction-linked items
- unique quest-like items
- any item whose name reveals source setting structure

These are highest risk because they are searchable and memorable.

### Phase 3: Rebuild Commodity Families

For common goods, do more than rename. Rebalance the spread so each profession has enough raw materials, tools, consumables, and finished goods.

Examples:

- Blacksmiths need ore, coal, flux, ingots, rivets, nails, horseshoes, hinges, buckles, tools, and only some weapons.
- Farmers need seeds, grain, produce, feed, animals, baskets, cider, preserves, and field tools.
- Alchemists need bottles, powders, oils, salts, gums, roots, insects, monster bits, papers, seals, and finished tonics.
- Sailors and fishers need rope, sailcloth, tar, hooks, nets, floats, barrels, salted seafood, charts, and ship fittings.

### Phase 4: Add Missing Economy Items

The catalog can grow. Extra items are useful if they create clearer professions, stronger regional identity, or more interesting trade.

Additions should be grouped, not scattered. A new item should usually belong to a family that supports at least one profession or market behavior.

### Phase 5: Stabilize IDs Before Art

Once names and item roles are accepted:

- Generate final slugs.
- Update item art prompt configs.
- Crop/regenerate icons using the final ordering.
- Then implement profession stock profiles against the new families.

## Suggested New Item Families

### Currency and Trade Instruments

Keep coinage simple, but make high-value trade more flavorful.

Suggested items:

- copper pennies
- silver marks
- gold crowns
- brass trade tokens
- stamped guild chits
- sealed credit note
- waxed market receipt
- dockmaster's tally strip
- caravan bond
- pearl-backed promissory note
- jewel-weight scale set
- merchant seal kit

### Food Staples

These support farmers, grocers, travelers, inns, soldiers, and poor NPCs.

Suggested items:

- oat loaf
- barley flatbread
- honeycrust roll
- rye travel biscuit
- salt bun
- moonbun pastry
- orchard pie
- peppered meat pie
- chickpea mash crock
- lentil stew jar
- smoked bean cake
- buttered root mash
- mushroom handpie
- sailor's hardcake
- festival sugar twist

### Grains, Seeds, and Field Goods

These make farmers distinct from cooks and general merchants.

Suggested items:

- amber wheat sack
- blue barley sack
- red millet sack
- pearl rice pouch
- oat sheaf
- rye sheaf
- flaxseed jar
- pumpkin seed pouch
- onion seed packet
- moonpea seed packet
- saffron crocus bulbs
- orchard graft bundle
- hay bale
- clover feed sack
- chicken feed scoop
- scarecrow charm

### Produce

Use brighter fantasy names and regional variants.

Suggested items:

- sunpear
- cider apple
- moonplum
- saltmelon
- ruby carrot
- lantern squash
- sugar beet
- frost onion
- marrow pumpkin
- glassberry basket
- cloudcap mushroom
- stormcap mushroom
- fiddle fern bundle
- pepperleaf bundle
- golden garlic braid
- sleepy turnip
- brightbean pod

### Meat and Butchery

Butchers need raw cuts, preserved products, seasonings, and tools.

Suggested items:

- pork shoulder
- beef rib slab
- mutton haunch
- goat chop
- smoked ham
- pepper sausage coil
- blood pudding crock
- salt-cured bacon
- marrow bone bundle
- rendered tallow jar
- butcher's twine
- carving hook
- cleaver whetstone
- spice-rub packet
- sausage casing spool

### Seafood

Fishers and coastal markets should have strong identity.

Suggested items:

- silverfin fish
- lanternfish
- blueback tuna
- red snapper
- tide eel
- reef crab
- pearl clam
- moon oyster
- scallop basket
- smoked herring string
- salted cod barrel
- shrimp net bag
- dried kelp bundle
- sea lettuce crate
- fish roe jar
- squid ink flask
- shark tooth bundle

### Drinks and Tavern Goods

Barkeeps should stock drinks, serving ware, and hospitality goods.

Suggested items:

- apple cider jug
- honey ale keg
- dark malt barrel
- pear wine bottle
- berry cordial
- spiced tea tin
- mintwater flask
- sailor's grog bottle
- moonmilk crock
- coffee bean sack
- cocoa nib pouch
- pewter tankard
- blueglass cup
- cork bundle
- tap spigot
- tavern candle

### Spices, Sugars, and Preserves

These support grocers, nobles, cooks, caravans, and regional arbitrage.

Suggested items:

- Tidefall saffron
- red pepper flakes
- green peppercorn pouch
- smoked salt pinch
- star-salt jar
- cinnamon bark roll
- candied ginger
- vanilla pod tube
- nutmeg bead
- clove packet
- honeycomb slab
- molasses crock
- berry jam jar
- lemon preserve
- pickled onion jar
- brined olive crock
- sour plum jar

### Textiles and Tailoring

Seamstresses, nobles, sailors, travelers, and armorers all need these.

Suggested items:

- linen bolt
- wool bolt
- sailcloth roll
- velvet ribbon
- blue brocade panel
- sun-dyed cotton
- sea-silk scarf
- lace cuff pair
- felt square
- dyed thread spool
- gold thread spool
- button tin
- bone needle case
- tailor's chalk
- beeswax thread cake
- pattern paper roll
- mending kit

### Leather and Animal Goods

Hunters, cobblers, armorers, and travelers need a wider spread.

Suggested items:

- cured hide
- soft kid leather
- thick oxhide
- waxed boot leather
- dyed strap bundle
- leather cord spool
- belt buckle set
- saddle pad
- bridle rings
- fur pelt
- fox fur trim
- wool fleece
- horn button blanks
- bone comb
- feather bundle
- beeswax cake
- shell button blanks

### Wood, Stone, and Construction

This gives builders, carpenters, miners, masons, and cartwrights better stock.

Suggested items:

- pine plank stack
- oak beam
- cedar board
- driftwood bundle
- carved peg bag
- wagon spoke set
- barrel stave bundle
- pitch bucket
- resin lump
- limewash pail
- brick stack
- slate tile
- marble chip sack
- granite block
- riverstone basket
- mason's chalk line
- brass hinge pair
- iron nail keg

### Ore, Metal, and Forge Supplies

This should become a major blacksmith/miner/toolmaker backbone.

Suggested items:

- bog iron ore
- red iron ore
- tin nugget
- copper nugget
- silver ore
- gold dust vial
- coal sack
- charcoal bundle
- forge flux jar
- iron ingot
- steel billet
- copper bar
- brass bar
- bronze puck
- silver wire
- gold leaf packet
- rivet tin
- horseshoe bundle
- hinge blank
- buckle blank
- chain links
- blacksmith's tongs
- quenching oil jar

### Gems, Shells, and Decorative Materials

These support jewelers, nobles, magic users, and coastal flavor.

Suggested items:

- sea glass chips
- moonstone pebble
- amber bead
- garnet shard
- sapphire chip
- emerald chip
- pearl seed
- mother-of-pearl tile
- coral branch
- opal fleck
- jade button
- crystal lens blank
- carved shell cameo
- brass filigree strip
- enamel powder jar
- polishing rouge

### Tools and Workshop Goods

Tools should be broad enough for many professions without becoming generic filler.

Suggested items:

- carpenter's plane
- joiner's mallet
- hand drill
- awl set
- farrier's rasp
- smithing hammer
- jeweler's tweezers
- glassblower's pipe
- mortar and pestle
- herb knife
- pruning shears
- fishing knife
- net mender's shuttle
- rope splicing fid
- wax seal spoon
- ledger ruler
- brass compass
- pocket sundial
- balance weights
- magnifying lens

### Containers and Packing

These are useful for stock visuals and trader identity.

Suggested items:

- reed basket
- lidded market basket
- canvas sack
- waxed pouch
- spice tin
- blueglass bottle
- clay amphora
- corked vial
- stoneware jar
- small barrel
- iron-banded chest
- lacquered box
- sample tray
- scroll tube
- egg crate
- fish barrel
- padded gem case
- potion rack

### Travel and Caravan Supplies

These support travelers, guards, merchants, hunters, and sailors.

Suggested items:

- bedroll
- canvas tent
- rain cloak
- travel kettle
- trail lantern
- sunwax candle
- tinder tin
- water skin
- ration pouch
- rope coil
- climbing hook
- road map
- toll pass
- hoof pick
- mule bell
- saddlebag pair
- pack frame
- caravan repair kit
- weather charm

### Maritime Goods

These make coastal markets and sailors more distinctive.

Suggested items:

- tar pot
- sail patch kit
- rope hawser
- anchor charm
- fishing float
- brass fishhook tin
- crab trap
- eel basket
- net weight pouch
- shell lure
- tide chart
- captain's logbook
- signal flag
- ship biscuit barrel
- deck brush
- bilge pump handle
- boat nail keg
- carved prow token

### Books, Documents, and Knowledge Goods

Replace inherited titles with new, shorter, collectible-feeling works.

Suggested items:

- Ledger of Little Debts
- Tide Almanac
- Orchard Road Recipes
- The Brass Scale Primer
- Harbor Beasts and How to Price Them
- Saints of the Painted Coast
- Practical Charms for Rainy Markets
- A Cartwright's Pocket Geometry
- The Blue Enamel Bestiary
- Seventeen Fair Bargains
- Shrine Candle Accounts
- Dockside Knots Illustrated
- Field Notes on Glowmoss
- Courtly Compliments for Nervous Merchants
- The Pearl Tax Tables
- Sealed love letter
- unsigned contract
- guild license
- pilgrim token book

### Art, Music, and Games

Bards, nobles, taverns, and collectors need a stronger playful set.

Suggested items:

- painted fan
- miniature harbor painting
- carved saint tile
- enamel brooch
- puppet mask
- ribbon dancer wand
- lute string set
- small drum
- tin whistle
- song scroll
- dice cup
- shell dice
- painted card deck
- travel chess set
- fortune tiles
- festival mask
- brass bell chime
- music box cylinder

### Alchemy Ingredients

Alchemists should mostly carry ingredients and containers, not only finished potions.

Suggested items:

- glowmoss bundle
- frostroot
- bitterleaf
- dragonpepper
- dream poppy pod
- mooncap mushroom
- glasswing beetle husk
- firefly dust vial
- powdered pearl
- quicksilver bead
- vinegar spirit
- rose oil flask
- serpent scale
- dried newt tail
- amber resin
- blue gum lump
- chalk powder pouch
- binding salt jar
- tincture paper strips
- alchemist's stopper set

### Potions and Remedies

Keep finished consumables readable and bright.

Suggested items:

- red vigor tonic
- blue calm draught
- green mending cordial
- gold luck syrup
- pepperwake drops
- dreamless sleep vial
- seasick sailor's remedy
- clear-eye wash
- burn balm tin
- chill salve
- cough honey jar
- thornbite antivenom
- brightmind elixir
- featherstep cordial
- ironbelly bitters
- perfume of good manners

### Magic Goods

Make magic goods tradeable, specific, and less generic.

Suggested items:

- whisper-ink vial
- glowchalk stick
- moonthread spool
- star-salt pinch
- pocket ward charm
- blue ward bead
- candle of tiny omens
- bottled breeze
- lucky knot charm
- mirror shard charm
- spell paper square
- charm lacquer pot
- crystal focus bead
- scrying water vial
- hush bell
- ember rune tile
- rain-call seed
- foxfire lantern wick

### Religion and Shrine Goods

Clerics, pilgrims, nobles, and poor NPCs need distinct pious items.

Suggested items:

- shrine candle
- votive ribbon
- painted prayer bead
- pilgrim shell
- small brass idol
- saint tile
- blessing oil vial
- temple incense cone
- alms bowl
- festival wreath
- memorial card
- silvered prayer pin
- oath cord
- consecrated salt
- bell-rope charm

### Weapons and Armor

Do not let blacksmiths become weapon shops by default. Weapons should mostly belong to soldiers, guards, hunters, nobles, bandits, and specialist smiths.

Suggested items:

- dock knife
- boar spear
- militia pike
- polished rapier
- caravan sabre
- hunting bow
- short bow
- crossbow
- arrow bundle
- bodkin arrow case
- practice sword
- brass-capped cudgel
- buckler
- kettle helm
- padded jack
- boiled leather vest
- chain shirt
- guard breastplate
- enamel parade shield
- weapon oil flask

### Livestock, Pets, and Animal Handling

Useful for farmers, hunters, nobles, travelers, and quest hooks.

Suggested items:

- laying hen
- speckled rooster
- duck pair
- goose
- milk goat
- wool sheep
- market piglet
- pack mule
- pony
- ox
- beehive box
- songbird cage
- messenger pigeon cage
- hound leash
- cat basket
- feed trough
- grooming brush
- veterinary salve

### Contraband and Risky Goods

Use carefully for thieves, smugglers, corrupt nobles, and events.

Suggested items:

- false-bottom box
- unmarked pearl pouch
- watered wine flask
- loaded dice
- forged toll pass
- stolen signet ring
- black-market spice tin
- hush powder
- lockpick roll
- nightglass lens
- coded ledger scrap
- smuggler's wax seal
- cutpurse charm
- illegal dueling blade
- tax stamp sheet

### Curios and Collectibles

These are useful for nobles, collectors, random trades, and light quest hooks.

Suggested items:

- bottle with a tiny storm
- singing shell
- carved driftwood whale
- brass mechanical beetle
- lucky blue button
- clouded mirror
- miniature painted caravan
- old key ring
- cracked festival crown
- pearl-inlaid spoon
- sea captain's medal
- antique spice scoop
- glass apple
- memory ribbon
- laughing mask

## Profession Coverage Targets

Each profession should have enough matching items for stock generation without relying on generic goods.

Minimum healthy counts:

- Major vendor profession: 40 to 100 directly relevant items.
- Minor vendor profession: 20 to 40 directly relevant items.
- Non-vendor profession: 8 to 20 plausible possessions.
- Regional market specialty: 20 to 60 goods that can appear in that market more often.

High-priority profession item support:

- Alchemist: alchemy ingredients, bottles, papers, remedies, minor magic.
- Barkeeper: drinks, food, barrels, mugs, candles, tavern games.
- Bard: music, art, games, books, travel goods, clothing.
- Blacksmith: ore, fuel, ingots, blanks, fittings, tools, repairs, limited arms.
- Butcher: meat cuts, cured meats, spices, hooks, twine, tallow.
- Farmer: seeds, produce, feed, animals, field tools, baskets.
- Fisher: seafood, nets, hooks, barrels, maritime supplies.
- Fletcher: wood shafts, feathers, glue, arrowheads, bows, quivers, knives.
- Hunter: meat, hides, traps, bows, arrows, animal parts, camp goods.
- Miner: ore, stone, gems, coal, carts, lamps, picks, pack animals.
- Seamstress: fabric, thread, buttons, needles, patterns, finished clothing.
- Toolmaker: tools, handles, metal blanks, wood, sharpening supplies.

## Replacement Policy

Use this policy while reviewing old items:

- `Keep role, rename heavily`: common commodity is useful but name is inherited or bland.
- `Replace concept`: source item is too specific, but the economy slot is useful.
- `Merge`: multiple inherited items are redundant and do not need separate gameplay.
- `Split`: one item is too broad and should become raw, processed, and finished variants.
- `Delete`: item is source-specific, low utility, or confusing.
- `Add`: needed for profession coverage, region flavor, icon variety, or trade interest.

## Data Migration Notes

Since old save compatibility is not a priority, prefer a clean generated-data reset over compatibility shims.

Suggested implementation path:

1. Create a catalog planning CSV or JSON beside the source item data.
2. Generate a new item file with stable slugs and display names.
3. Update item lookup code to prefer `id` over numeric index where practical.
4. Update stock archetypes to target `family`, `subfamily`, and `tradeRole`.
5. Update icon prompt generation to use the new display names, families, quantity variants, and bulk profiles.
6. Run `pnpm audit:data`.

## Open Decisions

- Should numeric `index` remain the primary ID for now, or should the project move to slug IDs before stock audit work?
- Should currencies remain items in inventory, or should visible item inventory and buying power be separated first?
- Should every item have all three quantity variants, or only items that naturally stack?
- Should unique books and curios have `many` variants, or should they remain single-art only?
- Should region flavor be encoded directly on items now, or also mirrored in market demand work?
- How many total items is the target for the first original catalog: roughly 2,000, 2,500, or 3,000+?

## Recommended First Pass

Start with a new catalog map rather than editing `items.json` by hand.

First-pass deliverables:

- `docs/systems/item-catalog-redesign.md` as the design reference.
- A generated audit table of all current item names and tags.
- A proposed taxonomy for every existing item.
- A list of high-risk source-specific items to replace first.
- A draft of 300 to 500 new/renamed items across the families above.

After that, the profession stock audit can be implemented against the new families instead of the inherited catalog.
