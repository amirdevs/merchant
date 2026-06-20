import type { Item, Kingdom, Marketplace } from "@/data/types";
import { money, title } from "@/lib/format";
import { itemCatalogTokens, normalizeItemToken } from "@/lib/item-catalog";

type ItemWithOptionalLore = Item & {
  shortDescription?: string;
  flavorText?: string;
  lore?: string;
  inspectionText?: string;
  useText?: string;
  provenance?: string;
};

export type RichItemLore = {
  subtitle: string;
  shortDescription: string;
  flavorText: string;
  lore: string;
  appraisal: string;
  handling: string;
  marketNote: string;
  useText: string;
};

type LoreProfile = {
  label: string;
  appraiser: string;
  craft: string[];
  origin: string[];
  handling: string[];
  use: string[];
  market: string[];
};

const fallbackProfile: LoreProfile = {
  label: "trade good",
  appraiser: "broker",
  craft: ["passed through many hands before reaching a merchant stall", "carries enough odd detail to reward a careful inspection", "has the practical charm of a thing made for travel, barter, and display"],
  origin: ["counted among the wandering goods of the Painted Coast", "recorded in caravan ledgers as a useful but unpredictable article", "found wherever market roads cross old local custom"],
  handling: ["keep it dry, wrapped, and separate from rougher cargo", "inspect it for cracks, missing parts, stains, and hidden marks before pricing", "store it where customers can see it without handling it too freely"],
  use: ["best used as a bargaining piece when a buyer cares more about story than standard value", "use it to sweeten a bundle deal or anchor a cautious negotiation", "show it late in a trade, when the other side has already revealed what they value"],
  market: ["moves best when the stallholder can explain why it matters", "draws stronger offers from buyers who recognize its provenance", "has flexible value because rumor, need, and condition all matter"],
};

const familyProfiles: Record<string, LoreProfile> = {
  currency: {
    label: "currency",
    appraiser: "money-changer",
    craft: ["minted, clipped, weighed, and counted by generations of cautious hands", "keeps the blunt honesty of metal even when kingdoms argue over seals", "carries small scratches from purses, toll bowls, ship chests, and gambling tables"],
    origin: ["passed through toll gates, caravan posts, and counting houses across the Painted Coast", "belongs to the quiet language shared by every market from harbor to hilltown", "has probably bought bread, silence, passage, and favors in equal measure"],
    handling: ["count it twice, keep it close, and never let a stranger provide the scale", "separate clean stacks from suspect pieces before making an offer", "wrap it in cloth if traveling through districts where visible wealth attracts questions"],
    use: ["use it to settle exact differences, secure bribes, or make a nervous seller listen", "best kept liquid for tolls, sudden opportunities, and debt pressure", "trade it last; visible coin has a way of making prices rise"],
    market: ["accepted almost anywhere, though exchange rates and trust vary by kingdom", "gains leverage in poor markets and loses romance in wealthy ones", "never tells a story by itself, but it ends many arguments"],
  },
  weapon: {
    label: "weapon",
    appraiser: "arms factor",
    craft: ["balanced for hands that expect trouble before sunset", "shows the maker's argument between reach, weight, and intimidation", "bears the useful beauty of steel that was made to survive bad roads"],
    origin: ["the sort of piece that follows border patrols, caravan guards, and nervous nobles", "would not look out of place beside a drill yard, mercenary chest, or rebel cache", "carries the politics of every kingdom that taxes steel"],
    handling: ["oil the metal, bind the edge, and keep it away from damp sacks", "wrap it before entering strict towns; exposed steel changes every conversation", "check the grip, head, string, or point before trusting the listed value"],
    use: ["trade it to guards, hunters, militia quartermasters, and anyone who hears war in the weather", "pairs well with armor, repair tools, and travel permits in a hard bargain", "use its threat as part of the price, but never let the buyer test it near your stall"],
    market: ["rises sharply when roads become unsafe or rumors of war spread", "may trigger inspections where military goods are restricted", "sells best when condition and provenance are presented with confidence"],
  },
  armor: {
    label: "armor",
    appraiser: "armorer",
    craft: ["built around the old compromise between protection, pride, and fatigue", "shows careful joins where craft matters more than decoration", "has the unmistakable grammar of rivets, straps, plates, padding, and scars"],
    origin: ["belongs to the world of escorts, gate guards, tournament yards, and fearful roads", "has likely rested on a peg in some barracks, manor, guild hall, or caravan chest", "carries both status and suspicion in kingdoms that watch armed travelers"],
    handling: ["keep buckles supple, padding dry, and metal free from red bloom", "measure fit before promising it to a customer; badly fitted armor is an expensive insult", "pack it above wet goods and below nothing that can dent the finish"],
    use: ["trade it to guards, duelists, adventurers, and nobles who prefer caution to regret", "bundle it with weapons or repair supplies for stronger offers", "use visible quality to justify a higher first price"],
    market: ["valuable in dangerous seasons and awkward in peaceful inspections", "condition matters as much as material", "buyers pay more when the piece looks ready rather than merely old"],
  },
  alchemy: {
    label: "alchemy stock",
    appraiser: "apothecary",
    craft: ["smells of sealed cabinets, stained notes, and experiments that almost behaved", "balances useful chemistry with the superstition customers expect from bottles and powders", "was prepared by hands that understood heat, timing, and plausible deniability"],
    origin: ["comes from the back rooms of healers, poisoners, dye-makers, and ambitious students", "travels well only when packed by someone who respects corks and consequences", "belongs to markets where fear, pain, vanity, and curiosity all pay"],
    handling: ["keep it upright, shaded, and far from food unless you enjoy explaining stains", "check seals before travel; one bad leak can perfume an entire packhorse", "label it clearly even when the label is only for you"],
    use: ["sell it to healers, hedge mages, hunters, desperate nobles, and anyone with a strange problem", "use it as a high-margin item when the buyer lacks the nerve to haggle hard", "pair it with remedies, glassware, or rare botanicals to make the offer feel deliberate"],
    market: ["prices swing wildly with plague rumors, festivals, duels, and bad harvests", "illegal or suspicious mixtures invite inspection", "fresh seals and confident wording do half the selling"],
  },
  magic: {
    label: "arcane good",
    appraiser: "hedge arcanist",
    craft: ["hums with the kind of craft that pretends not to be listening", "has a decorative logic older than most market charters", "shows the patient marks of ritual work, failed theory, and stubborn belief"],
    origin: ["moves through scholar towers, shrine rooms, back-alley charm sellers, and noble cabinets", "is spoken of more carefully than ordinary goods because nobody agrees what it can do", "belongs to the borderland between trade, prayer, trickery, and power"],
    handling: ["wrap it in clean cloth and keep it away from iron filings, spilled salt, and loud skeptics", "do not promise more than you can prove; arcane buyers remember insults", "store it where curious customers can admire it without touching the working surface"],
    use: ["trade it to mages, priests, collectors, and desperate travelers chasing unlikely advantages", "use its mystery to raise interest, then anchor the price with condition and rarity", "bundle it with books, gems, or alchemical stock for better narrative value"],
    market: ["valuable wherever fear and ambition outrun common sense", "suffers when buyers demand proof and thrives when they demand hope", "may be prized, mocked, or seized depending on local law"],
  },
  book: {
    label: "readable volume",
    appraiser: "scribe",
    craft: ["stitched and copied for readers who expect knowledge to survive bad weather", "keeps its worth in ink, margin notes, bindings, and the patience of the copyist", "smells of lamp smoke, dry shelves, and hands that turned pages carefully"],
    origin: ["belongs to the quiet trade between monasteries, tutors, guild clerks, and curious merchants", "has likely crossed more borders in a satchel than many soldiers do on foot", "records what some town thought was worth remembering"],
    handling: ["keep it dry, flat, and away from oil, fish, and impatient customers", "inspect the binding, missing leaves, worm tracks, and ownership marks", "wrap it separately; crushed corners lower the price faster than honest age"],
    use: ["read it for clues, sell it to scholars, or use it to impress literate buyers", "quote a line before naming the price; books sell better when they sound alive", "bundle it with maps, documents, or rare inks for collectors"],
    market: ["valuable where literacy, bureaucracy, and vanity overlap", "rare titles can outperform practical goods if the right buyer appears", "condition and subject matter matter more than page count"],
  },
  document: {
    label: "legal paper",
    appraiser: "clerk",
    craft: ["made from ink, seal, oath, and the fear of being contradicted later", "turns paper into authority if the signatures still command respect", "is less impressive than a sword and often more dangerous"],
    origin: ["passed through counting houses, border offices, tax tables, and impatient courts", "belongs to the bureaucratic underside of every market road", "may be ordinary paperwork or the key to someone else's fortune"],
    handling: ["keep it flat, dry, and hidden from thieves who can read", "check names, seals, dates, and scratched corrections before trusting it", "never fold it across the seal unless you want a clerk to frown"],
    use: ["use it to prove ownership, claim passage, settle tax, or pressure a cautious official", "trade it only after verifying whether the local authority recognizes it", "present it calmly; documents gain power when handled as if they already won"],
    market: ["worth little to the wrong buyer and everything to the right one", "its value depends on jurisdiction, reputation, and current politics", "inspection risk rises when the seals are too useful"],
  },
  art: {
    label: "art object",
    appraiser: "collector's agent",
    craft: ["made to be looked at slowly and priced even more slowly", "carries the artist's hand in color, balance, flaw, and boast", "turns material into status with the oldest trick in trade: taste"],
    origin: ["belongs to parlors, guild halls, shrine alcoves, and wealthy cargo manifests", "has probably been praised by someone who wanted a discount", "travels best under a story of provenance, patronage, or scandal"],
    handling: ["protect edges, glaze, surface, and story; collectors buy all four", "keep it away from damp cloth and careless stacking", "inspect maker marks and repairs before letting the buyer inspect them first"],
    use: ["sell it to nobles, guildmasters, shrine keepers, and anyone decorating a reputation", "lead with provenance, then condition, then rarity", "pair it with luxury goods when courting a rich buyer"],
    market: ["price depends on fashion as much as material", "can sit unsold for weeks and then rescue an entire season", "best sold where pride has money"],
  },
  food: {
    label: "provision",
    appraiser: "provisioner",
    craft: ["made for hunger first and trade second", "keeps the honest value of anything that can end an argument with a meal", "carries the scent of kitchens, ovens, smokehouses, and busy morning stalls"],
    origin: ["belongs to farms, ovens, dairies, smoke racks, and the hands that feed markets before sunrise", "has crossed the line between household comfort and cargo", "is part of the daily economy that keeps grander trades possible"],
    handling: ["watch freshness, pests, damp, and bruising before you trust the price", "keep it away from alchemy stock and anything with a suspicious smell", "sell perishables quickly unless the road ahead is full of hungry travelers"],
    use: ["trade it to cooks, households, caravan masters, and customers who skipped breakfast", "bundle staples with rarer treats to lift the whole basket", "use it to build goodwill when copper is scarce"],
    market: ["steady demand, thin margins, and sudden spikes during shortages", "freshness can beat rarity in a hungry town", "local taste matters more than distant reputation"],
  },
  drink: {
    label: "drink stock",
    appraiser: "cellarer",
    craft: ["made by heat, patience, yeast, steeping, or someone else's secret", "carries its value in aroma, clarity, age, and how quickly people smile after tasting it", "belongs to cups, contracts, cold evenings, and careless promises"],
    origin: ["travels from breweries, tea rooms, orchards, vineyards, and tavern back doors", "moves wherever merchants need refreshment, courage, or hospitality", "has a social value no ledger fully captures"],
    handling: ["keep bottles upright, corks tight, and strong smells away", "guard it from heat and road shock; customers forgive less after a spill", "sample only when the margin can survive your curiosity"],
    use: ["sell it to taverns, hosts, sailors, nobles, and anyone negotiating after dusk", "offer it as part of a hospitality bundle or festival trade", "use it to soften a hard conversation before discussing price"],
    market: ["rises before festivals, cold weather, and long meetings", "quality claims need confidence and sometimes a tasting cup", "breakage and spoilage quietly eat profit"],
  },
  produce: {
    label: "produce",
    appraiser: "greenmarket factor",
    craft: ["grown under weather that merchants later pretend they predicted", "carries soil, sun, rain, and timing in a form buyers can smell", "keeps the fragile pride of harvest goods"],
    origin: ["comes from orchards, garden plots, fungus beds, marsh edges, or hillside terraces", "belongs to the seasonal pulse beneath every market day", "has passed from grower to hauler to stall before losing its morning look"],
    handling: ["avoid bruising, damp rot, and too much sun on the stall cloth", "sell the prettiest pieces first and hide the tired ones in stew bundles", "keep it apart from sharp tools and rough crates"],
    use: ["trade it to cooks, healers, dyers, brewers, and households", "bundle common produce with rare botanicals to make a stronger basket", "use freshness as your first argument and scarcity as your second"],
    market: ["local harvests can crush prices overnight", "scarcity turns ordinary greens into respectable profit", "best margins come from knowing what the town cannot grow nearby"],
  },
  seafood: {
    label: "sea good",
    appraiser: "dockside factor",
    craft: ["taken from water that never signs a receipt", "keeps the brine, silver flash, and short temper of the coast", "is valuable because it spoils faster than rumors travel"],
    origin: ["belongs to nets, tide tables, fishwives, harbor bells, and gull-cursed docks", "moves inland only when packed by people who respect ice and urgency", "carries the flavor of its coast into markets that miss the sea"],
    handling: ["keep it cool, clean, and moving; delay is the enemy", "separate it from cloth, books, and anything that must not smell like a pier", "inspect eyes, shells, scales, and salt before trusting a supplier"],
    use: ["sell it to cooks, taverns, festival buyers, and inland nobles craving novelty", "use coastal origin as a story but freshness as the price", "pair it with salt, herbs, or fine drink for a complete table offer"],
    market: ["excellent near inland demand and terrible after spoilage", "weather can double the price before noon", "harbor towns judge quality more harshly than distant villages"],
  },
  textile: {
    label: "textile good",
    appraiser: "cloth factor",
    craft: ["woven, dyed, cut, or stitched by hands that understand both warmth and vanity", "keeps its value in texture, colorfastness, drape, and clean edges", "is a practical good that becomes luxury when the color is right"],
    origin: ["moves from looms, dye houses, wardrobes, and caravan trunks", "belongs to tailors, nobles, servants, priests, performers, and anyone facing weather", "carries the quiet history of sheep, flax, silk, dye, and needlework"],
    handling: ["keep it dry, folded, and away from grease, moths, and damp leather", "inspect seams, fading, and hidden stains under honest light", "display color where customers can imagine themselves richer"],
    use: ["trade it to tailors, households, guilds, travelers, and status-hungry buyers", "bundle cloth with thread, buttons, or dyes for better margin", "use texture and rarity to slow the buyer's hand before they haggle"],
    market: ["steady demand, strong fashion swings, and excellent festival spikes", "condition matters more than age unless the story is noble", "rare dye or fine weave changes the entire negotiation"],
  },
  tool: {
    label: "working tool",
    appraiser: "craft broker",
    craft: ["made to turn effort into value", "shows honest wear where a skilled hand would grip it", "has the plain dignity of a thing that earns its keep"],
    origin: ["belongs to workshops, docks, mines, farms, and the backs of careful wagons", "travels wherever work waits and spare hands are scarce", "has likely fixed more problems than its owner admitted"],
    handling: ["check edges, hinges, handles, teeth, and balance before pricing", "keep it oiled or wrapped according to material", "display it with related goods so buyers imagine the job already done"],
    use: ["sell it to artisans, porters, miners, farmers, and practical travelers", "bundle it with raw materials or repair stock for a convincing offer", "use durability as your story; tools are bought for trust"],
    market: ["value rises wherever labor is delayed by missing gear", "plain tools outsell fancy ones in hard towns", "condition can be proven quickly, so do not exaggerate"],
  },
  container: {
    label: "cargo gear",
    appraiser: "warehouse keeper",
    craft: ["built around the merchant's oldest prayer: let the goods arrive together", "turns empty space into organized profit", "has value in hinges, hoops, handles, straps, and how much abuse it forgives"],
    origin: ["belongs to warehouses, wagons, ship holds, and anyone who has cursed loose cargo", "travels along every road where goods outnumber hands", "is rarely glamorous until something fragile survives because of it"],
    handling: ["check corners, lid fit, straps, nails, and hidden damp", "do not waste good cargo gear on bad packing", "empty it before selling unless the surprise is part of the price"],
    use: ["use it to organize inventory, protect fragile stock, or sell to other traders", "bundle it with bulk goods to make the load feel ready for travel", "offer it to buyers who need capacity more than decoration"],
    market: ["demand rises after storms, breakages, and long-route caravans", "practical buyers pay for sturdiness, not poetry", "good containers quietly increase the value of everything inside"],
  },
  animal_goods: {
    label: "beast trade good",
    appraiser: "bestiary broker",
    craft: ["carries the mark of claw, horn, scale, hide, feather, venom, or difficult capture", "belongs to the uneasy trade between hunters and people who ask too many questions", "has a wildness that survives even after it reaches a stall"],
    origin: ["comes from marsh hunts, mountain traps, monster dens, or handlers with missing fingers", "travels through markets that pretend not to fear the things they profit from", "has likely been exaggerated twice before reaching your ledger"],
    handling: ["pack it according to smell, bite, poison, brittleness, or superstition", "keep proof of origin if local law dislikes dangerous beasts", "do not let children, scholars, or drunk guards handle it freely"],
    use: ["sell it to alchemists, armorers, collectors, tamers, and brave fools", "use rarity and risk to justify the price", "bundle it with field notes or protective gear when the buyer looks uncertain"],
    market: ["excellent margins where danger is fashionable or useful", "inspection risk depends on species and kingdom law", "buyers pay more when the story sounds almost survivable"],
  },
  luxury: {
    label: "luxury good",
    appraiser: "noble broker",
    craft: ["made to prove that necessity is not the only reason money moves", "turns fine material into visible status", "has the practiced arrogance of a thing meant to be admired"],
    origin: ["belongs to gift chests, dowry lists, court favors, and careful thefts", "moves between patrons, jewelers, collectors, and merchants who polish their smiles", "carries more social weight than its size suggests"],
    handling: ["protect it from scratches, fingerprints, gossip, and low offers", "display it against clean cloth and let silence raise the price", "verify stones, clasps, marks, and repairs before making promises"],
    use: ["sell it to nobles, lovers, collectors, priests, and anyone buying reputation", "use rarity and presentation to make the buyer feel late to the opportunity", "bundle it with art or fine cloth for courtly buyers"],
    market: ["thin demand but high profit when the right purse opens", "fashion and scandal change value faster than material", "best sold with confidence, proof, and restraint"],
  },
  gem: {
    label: "gemstone",
    appraiser: "lapidary",
    craft: ["keeps value in clarity, cut, color, and the small lies people tell about luck", "looks simple until light begins negotiating on its behalf", "was shaped by patience, pressure, and a cutter's nerve"],
    origin: ["moves from mines, riverbeds, noble vaults, temple gifts, and discreet pouches", "belongs to jewelers, mages, bankers, and people who prefer portable wealth", "carries rumors of mountain labor and courtly hands"],
    handling: ["wrap it separately, count it privately, and never appraise under poor light", "guard it from swaps; small value is easy to lose and easier to steal", "use a clean tray when showing it"],
    use: ["sell it to jewelers, enchanters, nobles, and emergency cash buyers", "use its portability to negotiate where coin would draw attention", "pair it with metalwork or magic goods for higher perceived value"],
    market: ["portable value makes it useful across borders", "appraisal disputes are common and rarely innocent", "rarity, color, and trust drive the final price"],
  },
  ore: {
    label: "raw material",
    appraiser: "smelter's factor",
    craft: ["still speaks more of earth than workshop", "is valuable because other trades can turn it into almost anything", "has weight, grit, and the promise of a hotter future"],
    origin: ["comes from mines, river pans, quarry ledges, and exhausted backs", "belongs to the start of longer craft chains", "moves wherever furnaces are hungry"],
    handling: ["keep it dry enough to weigh honestly and packed well enough not to split sacks", "separate grades before selling; mixed quality invites lower offers", "do not spend fine words where a smelter wants a clean sample"],
    use: ["sell it to smiths, foundries, masons, and ambitious workshops", "bundle it with fuel or tools to make a production lot", "use bulk and reliability as the main arguments"],
    market: ["steady where workshops are active", "transport cost matters almost as much as price", "shortages turn ugly rock into good money"],
  },
  wood: {
    label: "wood stock",
    appraiser: "carpenter's buyer",
    craft: ["keeps the grain, knots, and weather memory of the tree it came from", "is humble until a carpenter sees the shape hidden in it", "carries more future than present"],
    origin: ["comes from managed groves, stormfall, river drives, and forest bargains", "belongs to shipwrights, coopers, builders, carvers, and firewood piles", "travels best when dry, straight, and honestly graded"],
    handling: ["keep it dry, stacked, and away from pests", "sort by size and straightness before pricing", "watch for hidden rot at the ends"],
    use: ["sell it to builders, coopers, bowyers, carvers, and anyone repairing travel gear", "bundle it with nails, tools, or resin for stronger offers", "use scarcity of good grain as the selling point"],
    market: ["bulky but reliable", "local supply can flatten profit", "shipyards and rebuilding towns pay best"],
  },
  game: {
    label: "game piece",
    appraiser: "tavern champion",
    craft: ["made for hands that confuse luck with skill", "keeps its worth in rules, memory, paint, and the pride of players", "is small enough for a pocket and loud enough to start an argument"],
    origin: ["belongs to tavern tables, noble salons, student rooms, and bored caravans", "travels wherever people have coins and too much confidence", "has probably been blamed for at least one unpaid debt"],
    handling: ["keep pieces complete, corners sharp, and marks honest", "check for weighted, shaved, or counterfeit parts before playing", "do not let a customer test it with your money"],
    use: ["sell it to collectors, gamblers, tutors, and tavern hosts", "use it to start conversation before negotiating more serious goods", "bundle it with books or luxury trinkets for leisure buyers"],
    market: ["demand rises in winter, festivals, and bored garrisons", "complete sets command better prices", "rarity matters, but local rule fashions matter more"],
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
  if (has(tokens, "books", "book", "letters", "letter", "history", "stories", "compendiums")) return familyProfiles.book;
  if (has(tokens, "document", "documents", "deed", "deeds", "maps", "map", "permit", "license", "contract")) return familyProfiles.document;
  if (has(tokens, "jewelry", "jewlery", "rings", "necklaces", "amulets", "crowns")) return familyProfiles.luxury;
  if (has(tokens, "gems", "gem", "crystals", "crystal")) return familyProfiles.gem;
  const family = normalizeItemToken(item.family || item.tradeRole || "").replace(/\s+/g, "_");
  return familyProfiles[family] || fallbackProfile;
}

function rarityText(item: Item) {
  if (item.unique) return "singular";
  const band = item.rarityBand || (item.rarity && item.rarity >= 5 ? "legendary" : item.rarity && item.rarity >= 4 ? "rare" : item.rarity && item.rarity >= 3 ? "uncommon" : "common");
  return normalizeItemToken(band).replace(/\s+/g, "-");
}

function qualityText(item: Item, tokens: Set<string>) {
  if (item.unique) return "a named piece with its own reputation";
  if (has(tokens, "fabled", "legendary")) return "the sort of fabled stock buyers ask to see twice";
  if (has(tokens, "scarce", "rare")) return "scarce enough to slow a buyer's breathing";
  if (has(tokens, "notable", "uncommon")) return "notable enough to deserve a better place on the stall cloth";
  if (item.loafValue >= 1000) return "valuable enough to make careful merchants lower their voices";
  if (item.loafValue <= 5) return "ordinary in price but still useful in the right bundle";
  return "respectable trade stock with room for a skilled seller to improve the margin";
}

function descriptor(item: Item, tokens: Set<string>) {
  if (has(tokens, "fragile")) return "fragile";
  if (has(tokens, "forbidden", "contraband", "poison")) return "dangerous";
  if (has(tokens, "fresh", "cool storage")) return "perishable";
  if (has(tokens, "valuable small")) return "compact and valuable";
  if (item.weight >= 7 || item.size >= 7) return "heavy";
  if (item.size >= 4) return "bulky";
  return "portable";
}

function originPhrase(item: Item, market: Marketplace, kingdom?: Kingdom) {
  const regions = item.regions?.map(human).filter(Boolean) || [];
  const sources = item.sources?.map(human).filter(Boolean) || [];
  if (regions.length && sources.length) return `${regions.slice(0, 2).join(" and ")} stock, usually sourced through ${sources.slice(0, 2).join(" and ").toLowerCase()}`;
  if (regions.length) return `${regions.slice(0, 2).join(" and ")} stock`;
  if (sources.length) return `stock usually sourced through ${sources.slice(0, 2).join(" and ").toLowerCase()}`;
  if (kingdom?.name) return `a piece that would not look strange in ${kingdom.name}'s ledgers`;
  return `a piece now being judged by the buyers of ${market.name}`;
}

function marketPressure(item: Item, market: Marketplace, kingdom?: Kingdom, illegal?: boolean) {
  const legalLine = illegal ? `It is risky in ${kingdom?.name || market.name}; price it as quietly as you carry it.` : `It is legal in ${kingdom?.name || market.name}, which keeps the negotiation open and public.`;
  const demand = (market.bias || []).map((bias) => normalizeItemToken(bias.tag)).filter(Boolean);
  const match = item.tags.find((tag) => demand.includes(normalizeItemToken(tag))) || item.family || item.tradeRole;
  return `${legalLine} Local demand ${match ? `can turn on ${human(match).toLowerCase()}` : "is not strongly marked"}, so watch who asks first and who asks twice.`;
}

function explicitLore(item: ItemWithOptionalLore) {
  return item.lore || item.inspectionText || item.flavorText || item.shortDescription || "";
}

export function buildItemLore({ item, market, kingdom, quantity, illegal }: { item: Item; market: Marketplace; kingdom?: Kingdom; quantity: number; illegal?: boolean }): RichItemLore {
  const richItem = item as ItemWithOptionalLore;
  const tokens = itemCatalogTokens(item);
  const profile = profileFor(item, tokens);
  const seed = `${item.index}:${item.name}:${market.index}`;
  const rarity = rarityText(item);
  const category = human(item.subfamily || item.family || profile.label).toLowerCase();
  const origin = originPhrase(item, market, kingdom);
  const explicit = explicitLore(richItem);
  const craft = pick(`${seed}:craft`, profile.craft);
  const originMemory = pick(`${seed}:origin`, profile.origin);
  const handling = richItem.useText || pick(`${seed}:handling`, profile.handling);
  const use = richItem.useText || pick(`${seed}:use`, profile.use);
  const marketLine = pick(`${seed}:market`, profile.market);
  const quality = qualityText(item, tokens);
  const condition = descriptor(item, tokens);
  const valueLine = `${money(item.loafValue)} base value, ${item.weight} weight, ${item.size} size, ${rarity} rarity`;

  const shortDescription = richItem.shortDescription
    || `${item.name} is ${condition} ${category} — ${quality}.`;

  const flavorText = richItem.flavorText
    || `“Every item has two prices: the one in the ledger, and the one a buyer invents after hearing where it has been.”`;

  const lore = explicit
    || `${craft}. It is ${origin}; ${originMemory}. In a merchant's hands, ${item.name.toLowerCase()} is not just cargo but a story waiting for the right customer in ${market.name}.`;

  const appraisal = `${profile.appraiser ? `A ${profile.appraiser}` : "A careful appraiser"} would start with ${valueLine}, then test condition, provenance, and how urgently the buyer needs this particular ${profile.label}. ${marketLine}.`;

  return {
    subtitle: `${human(profile.label)} • ${human(rarity)} • ${quantity} carried`,
    shortDescription,
    flavorText,
    lore,
    appraisal,
    handling,
    marketNote: marketPressure(item, market, kingdom, illegal),
    useText: use,
  };
}
