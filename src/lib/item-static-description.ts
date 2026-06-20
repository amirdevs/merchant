import type { Item } from "@/data/types";
import { title } from "@/lib/format";
import { itemCatalogTokens, normalizeItemToken } from "@/lib/item-catalog";

type StaticCopy = {
  shortDescription: string;
  flavorText: string;
};

type StaticProfile = {
  noun: string;
  craft: string[];
  value: string[];
  buyer: string[];
  flavor: string[];
};

const defaultProfile: StaticProfile = {
  noun: "trade good",
  craft: [
    "It carries the practical marks of travel, handling, and repeated bargaining",
    "Its details reward the sort of slow inspection that separates cargo from treasure",
    "It has the worn, useful character of something that has already survived several markets",
  ],
  value: [
    "Its value depends less on spectacle than on condition, timing, and the buyer's need",
    "It earns its place in a merchant's pack by being flexible enough for more than one bargain",
    "It is the sort of stock that becomes interesting when a trader knows how to frame it",
  ],
  buyer: [
    "A careful merchant can use it to anchor a bundle, sweeten an offer, or test how much a customer knows",
    "It suits buyers who prefer useful goods with enough story to justify a better price",
    "It belongs on a stall where the seller can explain both what it is and why it matters",
  ],
  flavor: [
    "The ledger records the price; the road records the rest.",
    "A dull item in the wrong hands can become a fine profit in the right market.",
    "Every cargo has a story, but only a merchant decides whether to sell it.",
  ],
};

const profiles: Record<string, StaticProfile> = {
  currency: {
    noun: "currency",
    craft: [
      "It bears the small scars of purses, toll bowls, counting houses, and hurried exchanges",
      "The stamped metal feels bluntly honest, even when the kingdom seal on it is not",
      "Its shine has been dulled by palms, debt, luck, and every kind of promise a market can make",
    ],
    value: [
      "Its worth is understood before a word is spoken, which makes it both simple and dangerous",
      "It can end an argument, start a bribe, settle a debt, or make a cautious seller suddenly generous",
      "It is less a possession than a portable permission slip for food, passage, silence, and opportunity",
    ],
    buyer: [
      "Keep it counted, hidden, and close; visible coin has a bad habit of raising every price nearby",
      "A money-changer will weigh it, a thief will measure the room, and a merchant should do both first",
      "Use it when exact value matters, but never forget that visible wealth changes the negotiation",
    ],
    flavor: [
      "Every kingdom claims its seal gives coin meaning. Merchants know the weight matters more.",
      "A coin spends only once, but it can change three minds before it leaves your hand.",
      "Gold talks loudly; wise merchants make sure it does not speak too soon.",
    ],
  },
  alchemy: {
    noun: "alchemical stock",
    craft: [
      "It smells faintly of sealed cabinets, stained notes, and experiments that nearly behaved",
      "Its preparation hints at measured heat, careful timing, and a maker who respected consequences",
      "The container, residue, label, and color all suggest work done somewhere between medicine and trouble",
    ],
    value: [
      "Its price rises whenever fear, pain, vanity, or curiosity enters the market",
      "It is only as trustworthy as its seal, its maker, and the seller's willingness to answer questions",
      "Handled well, it is high-margin stock; handled badly, it becomes an expensive smell",
    ],
    buyer: [
      "Healers, hedge mages, hunters, poisoners, and desperate nobles all inspect such goods differently",
      "Keep it upright, shaded, and far from food unless you enjoy dramatic explanations",
      "A good seller offers confidence, a careful label, and no promises that cannot survive daylight",
    ],
    flavor: [
      "A cork is just a small door between profit and disaster.",
      "The best mixtures cure, the worst accuse, and the profitable ones do a little of both.",
      "Alchemy is trade with a smell sharp enough to remember.",
    ],
  },
  animal_goods: {
    noun: "beast trade good",
    craft: [
      "It keeps the wild grammar of claw, horn, hide, scale, venom, feather, or difficult capture",
      "Even cleaned and packed, it carries the uneasy presence of the creature it came from",
      "Its condition tells a story of traps, handlers, marsh paths, mountain dens, or missing fingers",
    ],
    value: [
      "Its price is built from usefulness, rarity, and the risk someone took before it reached the stall",
      "Collectors, alchemists, armorers, and brave fools each see a different kind of value in it",
      "It sells best when the danger sounds controlled rather than invented",
    ],
    buyer: [
      "Keep proof of origin close if local law dislikes dangerous beasts or suspicious trophies",
      "Do not let children, scholars, or drunk guards handle it without a reason and a witness",
      "A merchant should price not only the item, but the trouble required to replace it",
    ],
    flavor: [
      "A beast leaves the forest once; its price can haunt a market for years.",
      "Beautiful, useful, and only mostly safe is often the perfect merchant's compromise.",
      "Hunters bring back trophies. Merchants bring back margins.",
    ],
  },
  armor: {
    noun: "armor piece",
    craft: [
      "It is built around the old compromise between protection, pride, and fatigue",
      "Rivets, straps, padding, plates, and scars give it a language any armorer can read",
      "Its shape suggests long roads, nervous gates, and owners who preferred caution to regret",
    ],
    value: [
      "Condition matters as much as material, because badly fitted protection is only expensive discomfort",
      "Its value rises when rumors of unsafe roads begin moving faster than caravans",
      "Buyers pay more when it looks ready for use rather than merely old enough to be interesting",
    ],
    buyer: [
      "Measure fit before promising it, and never let a buyer confuse polish with protection",
      "It pairs well with weapons, repair tools, and any story involving a road that turned ugly",
      "A guard sees survival, a noble sees status, and a merchant should charge for both",
    ],
    flavor: [
      "Armor is fear made respectable enough to wear in public.",
      "A bright plate says confidence; a repaired strap says experience.",
      "The safest bargain is the one that survives being struck.",
    ],
  },
  art: {
    noun: "art object",
    craft: [
      "It was made to be looked at slowly and priced even more slowly",
      "Color, balance, flaw, surface, and maker's hand all argue quietly for attention",
      "It turns material into status with the oldest trick in trade: taste",
    ],
    value: [
      "Its price depends on fashion, provenance, condition, and the buyer's need to appear refined",
      "It may sit unsold for weeks, then rescue an entire season when the right patron appears",
      "A collector buys the object, the story, and the chance to repeat both at dinner",
    ],
    buyer: [
      "Protect the surface, edges, and story; collectors inspect all three",
      "Display it with silence and clean cloth, because rich buyers often negotiate with their eyes first",
      "Lead with provenance, then condition, then rarity, and let pride do the remaining work",
    ],
    flavor: [
      "Art is cargo that learned to look offended by the word cargo.",
      "Beauty does not set the price, but it keeps the buyer standing still long enough to hear one.",
      "A fine piece is half object, half permission to boast.",
    ],
  },
  book: {
    noun: "readable volume",
    craft: [
      "It smells of dry shelves, lamp smoke, worn bindings, and hands that turned pages carefully",
      "Its worth hides in ink, margin marks, subject, binding, and the patience of whoever copied it",
      "The pages carry that fragile authority books gain after surviving travel, damp, and careless readers",
    ],
    value: [
      "Its value depends on condition, subject, rarity, and whether the buyer can read enough to be impressed",
      "A common title informs; a rare one changes the posture of the entire negotiation",
      "Books sell best when they sound useful, forbidden, beautiful, or embarrassing to own",
    ],
    buyer: [
      "Keep it dry, flat, and away from oil, fish, impatient customers, and boastful scholars",
      "Quote a line before naming the price; books sell better when they sound alive",
      "Bundle it with maps, documents, inks, or curios when courting collectors",
    ],
    flavor: [
      "Ink is lighter than iron and has started more wars than most swords.",
      "A book's first owner writes a name. Every owner after that writes a price.",
      "Paper burns quickly, but the right sentence can outlive a kingdom.",
    ],
  },
  container: {
    noun: "cargo gear",
    craft: [
      "It is built around the merchant's oldest prayer: let the goods arrive together",
      "Hinges, hoops, handles, straps, and corners reveal whether it was made for show or punishment",
      "Its empty space has value because order is profit before the first sale is made",
    ],
    value: [
      "Good containers quietly increase the worth of everything they protect",
      "Its price rises after storms, breakages, long routes, and any journey with more goods than hands",
      "Practical buyers pay for sturdiness, not poetry, though a little polish never hurts",
    ],
    buyer: [
      "Check corners, lid fit, damp, nails, and hidden smells before trusting it with better cargo",
      "Sell it with bulk goods when you want the whole load to feel road-ready",
      "Empty it before sale unless the surprise inside is worth more than the container",
    ],
    flavor: [
      "A chest is just a promise with hinges.",
      "Merchants do not fear distance as much as loose cargo.",
      "The finest treasure in trade is often the box that kept the rest intact.",
    ],
  },
  document: {
    noun: "legal paper",
    craft: [
      "It is made from ink, seal, oath, and the fear of being contradicted later",
      "The paper looks harmless until a clerk, guard, or heir realizes what it claims",
      "Its authority depends on signatures, dates, seals, and how loudly local law agrees with them",
    ],
    value: [
      "It may be worthless to one buyer and life-changing to another",
      "Jurisdiction, reputation, politics, and timing set its price more than the paper itself",
      "Useful documents are often more dangerous than sharp steel because they can enter offices unsearched",
    ],
    buyer: [
      "Keep it flat, dry, and hidden from thieves who can read",
      "Check seals, names, dates, scraped corrections, and suspiciously convenient wording",
      "Present it calmly; documents gain power when handled as if they already won",
    ],
    flavor: [
      "A seal is a small circle that can trap a very large fortune.",
      "Paper cannot swing a sword, but it can hire someone who will.",
      "Never underestimate an item that frightens honest clerks.",
    ],
  },
  drink: {
    noun: "drink stock",
    craft: [
      "It carries its value in aroma, clarity, age, heat, steeping, brewing, or someone else's secret",
      "It belongs to cups, contracts, cold evenings, festival noise, and careless promises",
      "Its character depends on patience, storage, and how warmly the buyer remembers the last cup",
    ],
    value: [
      "Its price improves before festivals, long meetings, cold weather, and negotiations after dusk",
      "Good drink buys goodwill before it buys profit, which is often the better order",
      "Breakage, heat, souring, and bold claims can ruin the margin faster than a poor buyer",
    ],
    buyer: [
      "Keep vessels sealed, upright, and away from road shock or strong smells",
      "Offer it to taverns, hosts, sailors, nobles, and anyone trying to soften a hard conversation",
      "A tasting cup can close a sale, but only when the margin can survive generosity",
    ],
    flavor: [
      "A shared cup can make a bad price sound almost friendly.",
      "Some goods are sold by weight; drink is sold by memory.",
      "Never trust a bargain made thirsty if you can profit from making it otherwise.",
    ],
  },
  food: {
    noun: "provision",
    craft: [
      "It carries the honest value of anything that can quiet hunger and improve a road mood",
      "Its scent belongs to ovens, smoke racks, dairies, kitchens, and morning stalls before the crowd arrives",
      "It was made for hunger first and trade second, which is why it sells even when poetry fails",
    ],
    value: [
      "Freshness can beat rarity in a hungry town, while scarcity can make plain food suddenly noble",
      "Its margin is often thin, but its demand is steady enough to keep a stall alive",
      "A hungry buyer bargains poorly, and a clever merchant notices before offering a price",
    ],
    buyer: [
      "Watch freshness, pests, damp, bruising, and every smell that should not be there",
      "Sell perishables quickly unless the road ahead is full of hungry travelers",
      "Bundle staples with rarer treats to lift the whole basket without frightening practical buyers",
    ],
    flavor: [
      "Bread is never just bread when the road has been long enough.",
      "A full stomach is the cheapest guard a caravan can hire.",
      "Food spoils, but goodwill from feeding someone lasts surprisingly long.",
    ],
  },
  gem: {
    noun: "gemstone",
    craft: [
      "It keeps value in clarity, cut, color, and the little lies people tell about luck",
      "It looks simple until light begins negotiating on its behalf",
      "Pressure, patience, and a cutter's nerve have turned a stubborn piece of earth into portable desire",
    ],
    value: [
      "It is small enough to hide and valuable enough to start an argument about appraisal",
      "Color, rarity, trust, and lighting drive the final price more than any honest seller admits",
      "Its portability makes it useful across borders, debts, emergencies, and discreet gifts",
    ],
    buyer: [
      "Show it on a clean tray, under good light, and never let it leave your sight",
      "Jewelers, enchanters, nobles, and emergency cash buyers all value different flaws",
      "Pair it with metalwork, magic goods, or courtly rumors for a stronger story",
    ],
    flavor: [
      "A gem is a mountain's secret taught to shine in public.",
      "Small stones carry large lies, and the best ones carry them beautifully.",
      "Light is the first appraiser and the easiest one to bribe.",
    ],
  },
  luxury: {
    noun: "luxury good",
    craft: [
      "It was made to prove that necessity is not the only reason money moves",
      "Fine material, careful finish, and visible status all work together before the seller speaks",
      "It has the practiced arrogance of an object meant to be admired before it is useful",
    ],
    value: [
      "Its market is narrow, but the right purse can turn narrow demand into excellent profit",
      "Fashion, scandal, gift customs, and courtly pride can change its value faster than material quality",
      "It sells best when the buyer feels late to an opportunity that deserves them",
    ],
    buyer: [
      "Protect it from scratches, fingerprints, gossip, and low offers",
      "Display it with restraint; luxury loses power when the seller looks desperate",
      "Lead with rarity and presentation, then let the buyer imagine who will notice it",
    ],
    flavor: [
      "Luxury is usefulness dressed well enough to deny the accusation.",
      "Some buyers purchase beauty. Better buyers purchase witnesses.",
      "The richest customers do not ask what it does; they ask who else has seen it.",
    ],
  },
  magic: {
    noun: "arcane good",
    craft: [
      "It carries a decorative logic older than most market charters",
      "Its marks, glow, weight, or silence suggest craft that refuses to explain itself plainly",
      "It sits between trade, prayer, trickery, and power with the confidence of something used to arguments",
    ],
    value: [
      "Its price thrives where hope, fear, ambition, or superstition outruns proof",
      "Skeptics lower the offer, believers raise the room temperature, and both are useful to a merchant",
      "The fewer promises a seller makes, the longer the mystery can support the price",
    ],
    buyer: [
      "Wrap it cleanly, avoid iron filings and spilled salt, and never let a drunk customer test it",
      "Sell it to mages, priests, collectors, and desperate travelers chasing unlikely advantages",
      "Bundle it with books, gems, or alchemical stock when the buyer wants a complete story",
    ],
    flavor: [
      "Magic is easiest to sell when no one agrees what it should cost.",
      "The safest charm is the one that scares buyers just enough to respect it.",
      "A mystery with a price tag is already half a spell.",
    ],
  },
  ore: {
    noun: "raw material",
    craft: [
      "It still speaks more of earth, quarry, furnace, and exhausted backs than finished craft",
      "Its value is heavy, plain, and pointed toward whatever hotter future a workshop can give it",
      "Grit, grade, weight, and hidden quality matter more here than ornament",
    ],
    value: [
      "Transport cost matters almost as much as price, because bulk turns profit into work",
      "Where workshops are hungry, ugly material becomes respectable money",
      "Its best buyers care less for romance than for clean samples and honest grades",
    ],
    buyer: [
      "Keep it dry enough to weigh honestly and packed well enough not to split sacks",
      "Separate grades before selling; mixed quality invites punishment in the offer",
      "Bundle it with fuel, tools, or reliable delivery when courting makers",
    ],
    flavor: [
      "Ore is unfinished profit with a bad temper and a heavy back.",
      "The earth does not haggle, but everyone after it does.",
      "A furnace sees promise where most travelers see a burden.",
    ],
  },
  produce: {
    noun: "produce",
    craft: [
      "It carries soil, sun, rain, timing, and the fragile pride of harvest goods",
      "Its quality can often be judged by scent before a buyer ever asks the price",
      "It belongs to the seasonal pulse beneath every market day",
    ],
    value: [
      "Local harvests can crush prices overnight, while scarcity can turn ordinary greens into profit",
      "Freshness is its first argument and scarcity its second",
      "Its value fades with bruising, damp, heat, and every hour the stall grows older",
    ],
    buyer: [
      "Avoid rough crates, too much sun, damp rot, and buyers who squeeze before asking",
      "Sell the prettiest pieces first and hide tired stock inside stew bundles",
      "Bundle common produce with rare herbs, spices, or cook goods for better margins",
    ],
    flavor: [
      "A harvest never enters market alone; weather follows it in the price.",
      "Fresh goods teach merchants the value of haste.",
      "The road is unkind to anything that bruises easily.",
    ],
  },
  seafood: {
    noun: "sea good",
    craft: [
      "It keeps the brine, silver flash, shell weight, and short temper of the coast",
      "It was taken from water that never signs receipts and spoils faster than rumor travels",
      "Its quality depends on tide, packing, handling, and how far inland ambition has carried it",
    ],
    value: [
      "Weather can double the price before noon and spoilage can erase it before dusk",
      "Harbor towns judge it harshly, while inland buyers may pay dearly for the idea of the sea",
      "Freshness is not a detail here; it is the whole negotiation wearing scales or shell",
    ],
    buyer: [
      "Keep it cool, clean, and moving; delay is the enemy",
      "Separate it from cloth, books, and anything that should not smell like a pier",
      "Pair it with salt, herbs, or fine drink when selling a complete table offer",
    ],
    flavor: [
      "The sea gives no credit, so dockside merchants charge interest.",
      "Fresh fish is cargo with a countdown.",
      "A gull can judge seafood faster than a clerk and twice as loudly.",
    ],
  },
  textile: {
    noun: "textile good",
    craft: [
      "It keeps its value in texture, dye, drape, seams, warmth, and clean edges",
      "It carries the quiet history of sheep, flax, silk, dye vats, and needlework",
      "It is practical material until color, cut, or softness turns it into ambition",
    ],
    value: [
      "Steady demand, fashion swings, and festival seasons all tug at its price",
      "Condition matters more than age unless the story is noble enough to survive inspection",
      "Rare dye or fine weave can change the negotiation before the buyer touches it",
    ],
    buyer: [
      "Keep it dry, folded, and away from grease, moths, and damp leather",
      "Display color where customers can imagine themselves richer",
      "Bundle cloth with thread, buttons, trims, or dyes when selling to tailors",
    ],
    flavor: [
      "Cloth is warmth until fashion teaches it to overcharge.",
      "A good dye can make a common buyer stand like nobility for one dangerous moment.",
      "Needles make garments; mirrors make prices.",
    ],
  },
  tool: {
    noun: "working tool",
    craft: [
      "It was made to turn effort into value, and its honest wear proves someone already tried",
      "Edges, handles, hinges, teeth, balance, or grip tell more truth than decoration",
      "It has the plain dignity of a thing expected to earn its keep",
    ],
    value: [
      "Its value rises wherever labor waits on missing gear",
      "Plain tools often outsell fancy ones in hard towns because work has little patience for ornament",
      "Condition can be tested quickly, so a seller's exaggeration has short legs",
    ],
    buyer: [
      "Oil it, wrap it, sharpen it, or display it beside the materials it wants to change",
      "Sell it to artisans, porters, miners, farmers, sailors, and practical travelers",
      "Durability is the story; tools are bought for trust before beauty",
    ],
    flavor: [
      "A good tool is a silent worker that charges only once.",
      "Craft begins when the hand trusts what it is holding.",
      "Tools do not boast; finished work does it for them.",
    ],
  },
  weapon: {
    noun: "weapon",
    craft: [
      "It is balanced for hands that expect trouble before sunset",
      "Reach, weight, edge, point, or impact all argue for a particular kind of danger",
      "It bears the useful beauty of steel, wood, cord, or head-weight made to survive bad roads",
    ],
    value: [
      "Its price rises whenever roads grow unsafe or rumors of war learn to travel",
      "Condition, legality, and the buyer's nerve decide whether it is stock, threat, or evidence",
      "The value includes both what it can do and what people believe it might do nearby",
    ],
    buyer: [
      "Oil the metal, bind the edge, and keep it wrapped in towns that dislike exposed steel",
      "Sell it to guards, hunters, militia quartermasters, duelists, and nervous travelers",
      "Never let a buyer test it near the stall unless you already priced the furniture",
    ],
    flavor: [
      "A weapon is a question asked in a language everyone understands too quickly.",
      "Steel has no politics until someone carries it through a gate.",
      "The sharpest edge in any arms deal is usually the price.",
    ],
  },
  wood: {
    noun: "wood stock",
    craft: [
      "It keeps the grain, knots, weight, scent, and weather memory of the tree it came from",
      "It looks humble until a carpenter sees the shape hidden inside it",
      "Its value lies in dryness, straightness, strength, and the future work it can become",
    ],
    value: [
      "Local supply can flatten profit, but shipyards and rebuilding towns can make it shine",
      "Good grain is scarcity disguised as ordinary cargo",
      "It is bulky, reliable, and profitable when delivered to people with plans larger than their timber piles",
    ],
    buyer: [
      "Keep it dry, stacked, sorted, and watched for pests or hidden rot",
      "Sell it to builders, coopers, bowyers, carvers, shipwrights, and anyone repairing travel gear",
      "Bundle it with nails, resin, rope, or tools when selling a full repair lot",
    ],
    flavor: [
      "A tree becomes cargo when someone imagines a wall, wheel, bow, or ship.",
      "Wood remembers storms even after the carpenter forgets them.",
      "Straight grain is honesty in a language builders trust.",
    ],
  },
};

function hashText(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pick<T>(seed: string, values: T[]) {
  return values[hashText(seed) % values.length];
}

function human(value: string | undefined) {
  return title(String(value || "").replace(/[_-]+/g, " ")) || "Trade Good";
}

function has(tokens: Set<string>, ...values: string[]) {
  return values.some((value) => tokens.has(normalizeItemToken(value)));
}

function profileFor(item: Item, tokens: Set<string>) {
  if (has(tokens, "books", "book", "letters", "letter", "history", "stories", "compendiums", "primer", "almanac")) return profiles.book;
  if (has(tokens, "document", "documents", "deed", "deeds", "maps", "map", "permit", "license", "contract", "share", "note")) return profiles.document;
  if (has(tokens, "jewelry", "jewlery", "rings", "necklaces", "amulets", "crowns")) return profiles.luxury;
  if (has(tokens, "gems", "gem", "crystals", "crystal")) return profiles.gem;
  if (has(tokens, "cards", "card", "game", "dice", "deck")) return {
    ...profiles.luxury,
    noun: "game piece",
    flavor: [
      "Luck is cheaper than skill until the final wager is counted.",
      "Every game piece carries two histories: the rules, and who cheated them.",
      "A table can become a battlefield if the stakes are dressed politely enough.",
    ],
  };
  const family = normalizeItemToken(item.family || item.tradeRole || "").replace(/\s+/g, "_");
  return profiles[family] || defaultProfile;
}

function rarityPhrase(item: Item, tokens: Set<string>) {
  if (item.unique) return "singular";
  if (has(tokens, "fabled", "legendary")) return "fabled";
  if (has(tokens, "scarce", "rare")) return "rare";
  if (has(tokens, "notable", "uncommon")) return "uncommon";
  const band = normalizeItemToken(item.rarityBand || "");
  if (band.includes("legendary")) return "fabled";
  if (band.includes("rare")) return "rare";
  if (band.includes("uncommon")) return "uncommon";
  if (item.rarity && item.rarity >= 5) return "fabled";
  if (item.rarity && item.rarity >= 4) return "rare";
  if (item.rarity && item.rarity >= 3) return "uncommon";
  return "common";
}

function physicalPhrase(item: Item, tokens: Set<string>) {
  if (has(tokens, "fragile", "glass", "porcelain", "paper")) return "fragile";
  if (has(tokens, "poison", "venom", "acid", "contraband", "forbidden")) return "dangerous";
  if (has(tokens, "fresh", "fish", "meat", "fruit", "produce", "dairy")) return "perishable";
  if (has(tokens, "coin", "gem", "ring", "amulet")) return "compact";
  if (item.weight >= 8 || item.size >= 8) return "heavy";
  if (item.size >= 5) return "bulky";
  return "portable";
}

function rolePhrase(item: Item, tokens: Set<string>) {
  const uses = item.professionUses?.map(human).filter(Boolean) || [];
  if (uses.length) return `${uses.slice(0, 2).join(" and ").toLowerCase()} buyers`;
  if (has(tokens, "weapon", "sword", "axe", "bow", "spear")) return "guards and fighters";
  if (has(tokens, "food", "bread", "meat", "fruit", "cheese")) return "cooks and hungry travelers";
  if (has(tokens, "book", "document", "map")) return "scribes and collectors";
  if (has(tokens, "potion", "remedy", "poison")) return "healers and risky customers";
  return "practical buyers";
}

function extraDetail(item: Item, tokens: Set<string>) {
  const rarity = rarityPhrase(item, tokens);
  const region = item.regions?.[0] ? human(item.regions[0]) : "";
  const source = item.sources?.[0] ? human(item.sources[0]) : "";
  const origin = region || source;
  if (origin) return `${rarity === "common" ? "Local" : human(rarity)} interest improves when it is tied to ${origin}.`;
  if (item.loafValue >= 1000) return "Its high base value means buyers will expect confidence, proof, and careful handling.";
  if (item.loafValue <= 5) return "Its low price makes it useful for bundles, favors, and small adjustments in a trade.";
  return "Its best price comes from matching it to the right buyer rather than rushing it into the first open hand.";
}

export function buildStaticItemCopy(item: Item): StaticCopy {
  const tokens = itemCatalogTokens(item);
  const profile = profileFor(item, tokens);
  const seed = `${item.index}:${item.name}:${item.family || ""}:${item.subfamily || ""}`;
  const name = item.name;
  const noun = human(item.subfamily || profile.noun).toLowerCase();
  const physical = physicalPhrase(item, tokens);
  const rarity = rarityPhrase(item, tokens);
  const role = rolePhrase(item, tokens);
  const craft = pick(`${seed}:craft`, profile.craft);
  const value = pick(`${seed}:value`, profile.value);
  const buyer = pick(`${seed}:buyer`, profile.buyer);
  const detail = extraDetail(item, tokens);
  const sentenceOpeners = [
    `${name} is ${physical} ${rarity} ${noun}, the kind of stock that earns attention before it earns trust.`,
    `${name} is ${physical} ${noun} with ${rarity} market character and enough detail to reward a careful look.`,
    `${name} is ${physical} ${noun}, valued not only for what it is but for the story a competent trader can place around it.`,
    `${name} is ${physical} ${rarity} ${noun} that belongs naturally among the stranger ledgers of a traveling merchant.`,
  ];
  const shortDescription = `${pick(`${seed}:opener`, sentenceOpeners)} ${craft}. ${value}. ${buyer}; ${detail}`;
  const flavorBase = pick(`${seed}:flavor`, profile.flavor);
  const flavorVariants = [
    `“${flavorBase}”`,
    `“Ask three merchants about ${name.toLowerCase()} and you will hear one price, one warning, and one lie.”`,
    `“The right buyer sees ${name.toLowerCase()} as more than ${noun}; the wrong buyer is merely an obstacle.”`,
    `“Never sell ${name.toLowerCase()} too quickly. Even plain goods grow teeth when the market is hungry.”`,
    `“For ${role}, ${name.toLowerCase()} is not a curiosity. It is leverage.”`,
  ];
  return {
    shortDescription,
    flavorText: pick(`${seed}:flavorVariant`, flavorVariants),
  };
}
