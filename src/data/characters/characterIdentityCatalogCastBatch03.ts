import type { CharacterIdentityCatalogBatch } from "./characterIdentityTypes";
import { getIdentityBatchPortraitImageCount } from "./characterIdentityTypes";

export const characterIdentityCatalogCastBatch03 = {
  batchId: "identity-catalog-cast-batch-003",
  status: "profile_locked",
  rosterScope: "First 54 supporting cast slots: runtime indexes 0-53, covering current names, stories, looks, portraits, ancestry/species flavor, and expression plans while keeping runtime anchors stable.",
  portraitGenerationAllowed: false,
  notes: [
    "This batch defines current runtime-facing identity data while keeping runtime anchors stable.",
    "Portrait work stays locked until every supporting cast batch and the final portrait manifest are complete.",
    "The JSON prompt sheets under docs/assets/character-prompts are final-layout manifests for later production, not a signal to generate before the full character set is ready."
  ],
  identities: [
    {
      characterId: "character-049",
      rosterGroup: "supporting_cast",
      runtimeIndex: 0,
      catalogKey: null,
      finalDisplayName: "Captain Rowan Ashveil",
      profession: "Gate Captain",
      gameplayGroups: [
        "travel",
        "quest",
        "risk_crime"
      ],
      roleTags: [
        "guard",
        "gate",
        "route_permit",
        "law",
        "rumor_source"
      ],
      marketFlavor: "main city gate",
      voiceDirection: "stern but fair, speaks like every word is stamped on a permit",
      tradePersonality: "lawful gatekeeper who respects clean papers and hates smuggler charm",
      shortStory: "Rowan has guarded the city gate long enough to know the sound of guilt in a cart wheel. He keeps a private list of merchants who pay tolls honestly and quietly helps the ones who protect travelers. He is useful for route warnings, guard reputation, and legal travel checks.",
      visualIdentity: "A tall ash-brown human gate captain with silver-threaded black hair, a hawk nose, scar under one eye, blue-black cloak clasped with an iron gate pin, and a ledger of route permits tucked under his arm.",
      uniquenessTraits: [
        "tall disciplined silhouette",
        "silver-threaded black hair",
        "scar under one eye",
        "blue-black cloak",
        "iron gate pin",
        "permit ledger"
      ],
      professionProps: [
        "iron gate pin",
        "route permit ledger",
        "short baton"
      ],
      dominantColors: [
        "blue-black",
        "iron grey",
        "paper cream"
      ],
      expressionTier: "major",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        },
        {
          expression: "worried",
          actingDirection: "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged",
          promptDelta: "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged"
        },
        {
          expression: "angry",
          actingDirection: "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged",
          promptDelta: "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-049",
      identityAnchor: "same person as character-049: tall disciplined silhouette, silver-threaded black hair, scar under one eye, blue-black cloak, iron gate pin, gate captain, human, iron gate pin",
      portraitBasePrompt: "A tall ash-brown human gate captain with silver-threaded black hair, a hawk nose, scar under one eye, blue-black cloak clasped with an iron gate pin, and a ledger of route permits tucked under his arm. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "border trouble",
        "permit inspection",
        "guard favor"
      ],
      integrationNotes: "Primary law/travel core contact for gates and toll warnings.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "character-050",
      rosterGroup: "supporting_cast",
      runtimeIndex: 1,
      catalogKey: null,
      finalDisplayName: "Brenna Coalbright",
      profession: "Blacksmith",
      gameplayGroups: [
        "trade",
        "quest"
      ],
      roleTags: [
        "blacksmith",
        "tools",
        "weapons",
        "repair",
        "supplier"
      ],
      marketFlavor: "forge quarter",
      voiceDirection: "warm, loud, practical, laughs before giving bad news",
      tradePersonality: "honest maker who values good metal and hates ornamental nonsense",
      shortStory: "Brenna inherited a forge with a roof full of holes and made it famous by repairing three caravans in a single storm. She can spot cheap iron by smell and talks to tools like stubborn relatives. She supports repair jobs, tool demand, and weapon-quality hooks.",
      visualIdentity: "A broad dwarf blacksmith woman with copper-brown skin, muscular forearms, soot freckles, flame-orange braids tied with iron beads, a leather apron burned at the edges, and a small hammer held like a favorite spoon.",
      uniquenessTraits: [
        "broad dwarf silhouette",
        "flame-orange braids",
        "soot freckles",
        "muscular forearms",
        "burnt leather apron",
        "iron bead ties"
      ],
      professionProps: [
        "small forge hammer",
        "tongs",
        "glowing rivets"
      ],
      dominantColors: [
        "charcoal",
        "flame orange",
        "iron"
      ],
      expressionTier: "major",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        },
        {
          expression: "worried",
          actingDirection: "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged",
          promptDelta: "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged"
        },
        {
          expression: "angry",
          actingDirection: "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged",
          promptDelta: "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-050",
      identityAnchor: "same person as character-050: broad dwarf silhouette, flame-orange braids, soot freckles, muscular forearms, burnt leather apron, blacksmith, dwarf, small forge hammer",
      portraitBasePrompt: "A broad dwarf blacksmith woman with copper-brown skin, muscular forearms, soot freckles, flame-orange braids tied with iron beads, a leather apron burned at the edges, and a small hammer held like a favorite spoon. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "broken axle",
        "rare ore sample",
        "rival smith insult"
      ],
      integrationNotes: "Important trade/repair core contact.",
      ancestryOrSpecies: "dwarf",
      magicalTraits: [
        "soft ember glow in braids"
      ]
    },
    {
      characterId: "character-051",
      rosterGroup: "supporting_cast",
      runtimeIndex: 2,
      catalogKey: null,
      finalDisplayName: "Lysaro Vellthorn",
      profession: "Silk Factor",
      gameplayGroups: [
        "trade",
        "guild_noble"
      ],
      roleTags: [
        "cloth",
        "luxury",
        "guild",
        "fashion",
        "supplier"
      ],
      marketFlavor: "merchant arcade",
      voiceDirection: "silky, amused, dangerous when underbid",
      tradePersonality: "luxury haggler who sells status as much as fabric",
      shortStory: "Lysaro came from a family of dyers who could ruin a noble with one shade of unfashionable blue. He smiles like a compliment and bargains like a knife wrapped in velvet. He is useful for luxury demand, noble contracts, and fashion events.",
      visualIdentity: "A graceful violet-eyed half-elf silk factor with long silver-black hair, narrow shoulders, lacquered nails, layered emerald and plum scarves, and a fan of fabric swatches that flutter like bright birds.",
      uniquenessTraits: [
        "slender half-elf silhouette",
        "violet eyes",
        "silver-black hair",
        "lacquered nails",
        "emerald and plum scarves",
        "fabric swatch fan"
      ],
      professionProps: [
        "fabric swatches",
        "silk measuring cord",
        "ornate fan"
      ],
      dominantColors: [
        "emerald",
        "plum",
        "silver"
      ],
      expressionTier: "major",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        },
        {
          expression: "worried",
          actingDirection: "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged",
          promptDelta: "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged"
        },
        {
          expression: "angry",
          actingDirection: "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged",
          promptDelta: "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-051",
      identityAnchor: "same person as character-051: slender half-elf silhouette, violet eyes, silver-black hair, lacquered nails, emerald and plum scarves, silk factor, half-elf, fabric swatches",
      portraitBasePrompt: "A graceful violet-eyed half-elf silk factor with long silver-black hair, narrow shoulders, lacquered nails, layered emerald and plum scarves, and a fan of fabric swatches that flutter like bright birds. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "noble order",
        "dyer rivalry",
        "festival cloth shortage"
      ],
      integrationNotes: "Luxury cloth trade merchant contact.",
      ancestryOrSpecies: "half-elf",
      magicalTraits: [
        "faint shimmer on silk edges"
      ]
    },
    {
      characterId: "character-052",
      rosterGroup: "supporting_cast",
      runtimeIndex: 3,
      catalogKey: null,
      finalDisplayName: "Marta Honeyjaw",
      profession: "Baker Matron",
      gameplayGroups: [
        "trade",
        "quest"
      ],
      roleTags: [
        "food",
        "bakery",
        "rumor_source",
        "supplier"
      ],
      marketFlavor: "morning bread lane",
      voiceDirection: "warm, nosy, generous until crossed",
      tradePersonality: "bulk food seller who remembers every customer debt",
      shortStory: "Marta feeds half the market before sunrise and knows which families are pretending not to be hungry. She slips messages into bread crusts when guards search pockets too closely. She supports grain, flour, pastry, and town-rumor hooks.",
      visualIdentity: "A round cheerful halfling baker with flour-dusted cheeks, golden curls escaping a red kerchief, dimpled hands, a honey-colored apron, and a basket of moon-shaped rolls held high.",
      uniquenessTraits: [
        "round halfling silhouette",
        "flour-dusted cheeks",
        "golden curls",
        "red kerchief",
        "honey apron",
        "dimpled hands"
      ],
      professionProps: [
        "basket of rolls",
        "wooden peel",
        "flour pouch"
      ],
      dominantColors: [
        "honey gold",
        "red",
        "warm cream"
      ],
      expressionTier: "major",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        },
        {
          expression: "worried",
          actingDirection: "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged",
          promptDelta: "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged"
        },
        {
          expression: "angry",
          actingDirection: "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged",
          promptDelta: "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-052",
      identityAnchor: "same person as character-052: round halfling silhouette, flour-dusted cheeks, golden curls, red kerchief, honey apron, baker matron, halfling, basket of rolls",
      portraitBasePrompt: "A round cheerful halfling baker with flour-dusted cheeks, golden curls escaping a red kerchief, dimpled hands, a honey-colored apron, and a basket of moon-shaped rolls held high. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "flour shortage",
        "hidden message loaf",
        "festival pastry order"
      ],
      integrationNotes: "Food supply and rumor core contact.",
      ancestryOrSpecies: "halfling",
      magicalTraits: []
    },
    {
      characterId: "character-053",
      rosterGroup: "supporting_cast",
      runtimeIndex: 4,
      catalogKey: null,
      finalDisplayName: "Ysolde Nightquill",
      profession: "Scribe of Ledgers",
      gameplayGroups: [
        "company",
        "quest",
        "market_service"
      ],
      roleTags: [
        "scribe",
        "contracts",
        "company",
        "ledger",
        "document"
      ],
      marketFlavor: "counting house",
      voiceDirection: "precise, dry, quietly dramatic with commas",
      tradePersonality: "contract scribe who charges extra for lies written neatly",
      shortStory: "Ysolde has copied so many partnership agreements that she can smell a bankruptcy clause before the ink dries. She keeps spare contracts in her sleeve and a personal grudge against messy signatures. She supports company formation, ledger UI, and contract reading.",
      visualIdentity: "A tall raven-haired human scribe with deep umber skin, crescent spectacles, ink-blue lips, crisp teal robe, a stack of sealed contracts, and a silver pen tucked behind one ear.",
      uniquenessTraits: [
        "tall elegant scribe",
        "raven hair",
        "crescent spectacles",
        "ink-blue lips",
        "teal robe",
        "sealed contracts"
      ],
      professionProps: [
        "silver pen",
        "sealed contracts",
        "ledger ribbon"
      ],
      dominantColors: [
        "teal",
        "ink blue",
        "silver"
      ],
      expressionTier: "major",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        },
        {
          expression: "worried",
          actingDirection: "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged",
          promptDelta: "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged"
        },
        {
          expression: "angry",
          actingDirection: "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged",
          promptDelta: "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-053",
      identityAnchor: "same person as character-053: tall elegant scribe, raven hair, crescent spectacles, ink-blue lips, teal robe, scribe of ledgers, human, silver pen",
      portraitBasePrompt: "A tall raven-haired human scribe with deep umber skin, crescent spectacles, ink-blue lips, crisp teal robe, a stack of sealed contracts, and a silver pen tucked behind one ear. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "missing contract",
        "forged seal",
        "company charter"
      ],
      integrationNotes: "Company/legal document core contact.",
      ancestryOrSpecies: "human",
      magicalTraits: [
        "tiny ink motes around pen nib"
      ]
    },
    {
      characterId: "character-054",
      rosterGroup: "supporting_cast",
      runtimeIndex: 5,
      catalogKey: null,
      finalDisplayName: "Old Marrow Finn",
      profession: "Fishmonger",
      gameplayGroups: [
        "trade",
        "travel"
      ],
      roleTags: [
        "fish",
        "seafood",
        "dock",
        "supplier",
        "rumor_source"
      ],
      marketFlavor: "wet dock market",
      voiceDirection: "salty, poetic, suspicious of dry shoes",
      tradePersonality: "dock trader who prices fish by weather and gossip",
      shortStory: "Finn claims the sea owes him money and keeps careful track in chalk on his stall. He knows which ships came in heavy, which came in silent, and which should never have come back at all. He supports seafood stock, port rumors, and storm-route hooks.",
      visualIdentity: "A wiry elderly sea-gnome fishmonger with blue-grey skin, seaweed-white beard, one cloudy pearl eye, patched rubbery apron, and a string of silver fish charms across his chest.",
      uniquenessTraits: [
        "wiry sea-gnome silhouette",
        "blue-grey skin",
        "seaweed-white beard",
        "one pearl eye",
        "patched wet apron",
        "fish charm necklace"
      ],
      professionProps: [
        "fish charm string",
        "small gutting knife",
        "dock tally slate"
      ],
      dominantColors: [
        "sea grey",
        "silver",
        "kelp green"
      ],
      expressionTier: "major",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        },
        {
          expression: "worried",
          actingDirection: "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged",
          promptDelta: "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged"
        },
        {
          expression: "angry",
          actingDirection: "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged",
          promptDelta: "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-054",
      identityAnchor: "same person as character-054: wiry sea-gnome silhouette, blue-grey skin, seaweed-white beard, one pearl eye, patched wet apron, fishmonger, sea-gnome, fish charm string",
      portraitBasePrompt: "A wiry elderly sea-gnome fishmonger with blue-grey skin, seaweed-white beard, one cloudy pearl eye, patched rubbery apron, and a string of silver fish charms across his chest. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "storm catch",
        "missing boat",
        "rare shellfish"
      ],
      integrationNotes: "Port/fisher core contact.",
      ancestryOrSpecies: "sea-gnome",
      magicalTraits: [
        "pearl-clouded eye",
        "faint brine sparkle in beard"
      ]
    },
    {
      characterId: "character-055",
      rosterGroup: "supporting_cast",
      runtimeIndex: 6,
      catalogKey: null,
      finalDisplayName: "Nera Flintcup",
      profession: "Tavern Keeper",
      gameplayGroups: [
        "trade",
        "quest"
      ],
      roleTags: [
        "tavern",
        "drink",
        "rumor_source",
        "food"
      ],
      marketFlavor: "old bridge tavern",
      voiceDirection: "bright, teasing, remembers every unpaid cup",
      tradePersonality: "social seller who discounts for good stories",
      shortStory: "Nera bought her tavern with dice winnings and turned it into the safest loud room in town. She hires musicians only if they can carry barrels after midnight. She supports drinks, rumors, lodging, and local introductions.",
      visualIdentity: "A compact human tavern keeper with warm tan skin, sharp green eyes, short black curls, rolled burgundy sleeves, and a belt crowded with corkscrews, keys, and chalk tabs.",
      uniquenessTraits: [
        "compact quick silhouette",
        "sharp green eyes",
        "short black curls",
        "rolled burgundy sleeves",
        "crowded tavern belt"
      ],
      professionProps: [
        "tankard",
        "key ring",
        "chalk tabs"
      ],
      dominantColors: [
        "burgundy",
        "dark wood",
        "cream"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-055",
      identityAnchor: "same person as character-055: compact quick silhouette, sharp green eyes, short black curls, rolled burgundy sleeves, crowded tavern belt, tavern keeper, human, tankard",
      portraitBasePrompt: "A compact human tavern keeper with warm tan skin, sharp green eyes, short black curls, rolled burgundy sleeves, and a belt crowded with corkscrews, keys, and chalk tabs. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "missing keg",
        "gossip payment",
        "tavern brawl debt"
      ],
      integrationNotes: "Tavern core contact.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "character-056",
      rosterGroup: "supporting_cast",
      runtimeIndex: 7,
      catalogKey: null,
      finalDisplayName: "Jarek Thornboot",
      profession: "Caravan Cobbler",
      gameplayGroups: [
        "trade",
        "travel"
      ],
      roleTags: [
        "shoes",
        "repair",
        "travel",
        "leather"
      ],
      marketFlavor: "caravan yard",
      voiceDirection: "patient, earthy, laughs at fancy boots",
      tradePersonality: "repair merchant who values durable goods",
      shortStory: "Jarek can tell how far a traveler lied about walking by looking at their heels. He patches boots for pilgrims, smugglers, and guards without asking which is which. He supports travel supplies, leather demand, and route-prep flavor.",
      visualIdentity: "A lean brown-skinned cobbler with long arms, shaved head, braided beard, patched green vest, and a cluster of tiny boot lasts hanging from his shoulder strap.",
      uniquenessTraits: [
        "lean long-armed silhouette",
        "shaved head",
        "braided beard",
        "patched green vest",
        "boot lasts"
      ],
      professionProps: [
        "boot last",
        "awl",
        "leather strips"
      ],
      dominantColors: [
        "forest green",
        "leather brown",
        "brass"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-056",
      identityAnchor: "same person as character-056: lean long-armed silhouette, shaved head, braided beard, patched green vest, boot lasts, caravan cobbler, human, boot last",
      portraitBasePrompt: "A lean brown-skinned cobbler with long arms, shaved head, braided beard, patched green vest, and a cluster of tiny boot lasts hanging from his shoulder strap. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "ruined boots",
        "secret route footprints",
        "leather shortage"
      ],
      integrationNotes: "Travel repair merchant.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "character-057",
      rosterGroup: "supporting_cast",
      runtimeIndex: 8,
      catalogKey: null,
      finalDisplayName: "Pippa Candlebrook",
      profession: "Candle Maker",
      gameplayGroups: [
        "trade",
        "quest"
      ],
      roleTags: [
        "candles",
        "wax",
        "religious",
        "night_market"
      ],
      marketFlavor: "chapel steps",
      voiceDirection: "soft-spoken, superstitious, sharper than she sounds",
      tradePersonality: "small-goods seller who pays well for wax and oils",
      shortStory: "Pippa learned every prayer in town by selling candles outside the chapel, then learned every secret when people thought wax did not listen. She scents her best tapers with herbs that calm frightened horses. She supports wax, oil, religion, and small rumor hooks.",
      visualIdentity: "A small round-faced human candle maker with pale brown skin, dark sleepy eyes, lavender head wrap, wax droplets on her sleeves, and a tray of crooked colored candles.",
      uniquenessTraits: [
        "small gentle silhouette",
        "lavender head wrap",
        "wax-spotted sleeves",
        "sleepy eyes",
        "colored candles"
      ],
      professionProps: [
        "candle tray",
        "wax knife",
        "scented oil vial"
      ],
      dominantColors: [
        "lavender",
        "warm wax",
        "soft brown"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-057",
      identityAnchor: "same person as character-057: small gentle silhouette, lavender head wrap, wax-spotted sleeves, sleepy eyes, colored candles, candle maker, human, candle tray",
      portraitBasePrompt: "A small round-faced human candle maker with pale brown skin, dark sleepy eyes, lavender head wrap, wax droplets on her sleeves, and a tray of crooked colored candles. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "stolen chapel wax",
        "mourning order",
        "horse-calming tapers"
      ],
      integrationNotes: "Wax/oil core contact.",
      ancestryOrSpecies: "human",
      magicalTraits: [
        "tiny warm candle glow"
      ]
    },
    {
      characterId: "character-058",
      rosterGroup: "supporting_cast",
      runtimeIndex: 9,
      catalogKey: null,
      finalDisplayName: "Tovan Gristlen",
      profession: "Miller",
      gameplayGroups: [
        "trade"
      ],
      roleTags: [
        "grain",
        "flour",
        "bulk",
        "food_supplier"
      ],
      marketFlavor: "windmill lane",
      voiceDirection: "slow, dusty, practical, suspicious of poetry",
      tradePersonality: "bulk grain seller who thinks in sacks and weather",
      shortStory: "Tovan counts clouds with the seriousness of a tax collector because one wet harvest can ruin three markets. He never hurries unless flour catches fire. He supports grain supply, flour price shifts, and food contracts.",
      visualIdentity: "A broad pale human miller with dusty eyebrows, heavy shoulders, wheat-straw hair, faded blue smock, and a wooden scoop tucked under one elbow.",
      uniquenessTraits: [
        "broad dusty silhouette",
        "wheat-straw hair",
        "dusty eyebrows",
        "faded blue smock",
        "wooden scoop"
      ],
      professionProps: [
        "wooden scoop",
        "flour sack",
        "grain tally cord"
      ],
      dominantColors: [
        "flour white",
        "faded blue",
        "straw"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-058",
      identityAnchor: "same person as character-058: broad dusty silhouette, wheat-straw hair, dusty eyebrows, faded blue smock, wooden scoop, miller, human, wooden scoop",
      portraitBasePrompt: "A broad pale human miller with dusty eyebrows, heavy shoulders, wheat-straw hair, faded blue smock, and a wooden scoop tucked under one elbow. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "spoiled grain",
        "millstone repair",
        "bulk flour order"
      ],
      integrationNotes: "Food bulk core contact.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "character-059",
      rosterGroup: "supporting_cast",
      runtimeIndex: 10,
      catalogKey: null,
      finalDisplayName: "Suri Amberleaf",
      profession: "Herbalist",
      gameplayGroups: [
        "trade",
        "quest"
      ],
      roleTags: [
        "herbs",
        "medicine",
        "garden",
        "healer"
      ],
      marketFlavor: "garden stall",
      voiceDirection: "kind, quick, suspicious of shiny medicine",
      tradePersonality: "healer seller who trusts scent and leaf veins",
      shortStory: "Suri grows herbs in cracked pots and knows which leaves work because she tested them on herself first. She speaks gently to customers and sternly to roots. She supports medicine, herbs, poison warnings, and garden quests.",
      visualIdentity: "A petite dryad-touched herbalist with moss-brown skin, amber eyes, leaf-shaped freckles, loose green shawl, and living vine bracelets that curl toward her herb pots.",
      uniquenessTraits: [
        "petite dryad-touched silhouette",
        "amber eyes",
        "leaf freckles",
        "green shawl",
        "living vine bracelets"
      ],
      professionProps: [
        "potted herb",
        "mortar spoon",
        "herb bundles"
      ],
      dominantColors: [
        "leaf green",
        "amber",
        "earth brown"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-059",
      identityAnchor: "same person as character-059: petite dryad-touched silhouette, amber eyes, leaf freckles, green shawl, living vine bracelets, herbalist, dryad-touched human, potted herb",
      portraitBasePrompt: "A petite dryad-touched herbalist with moss-brown skin, amber eyes, leaf-shaped freckles, loose green shawl, and living vine bracelets that curl toward her herb pots. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "rare root",
        "sick child remedy",
        "poisoned herb bundle"
      ],
      integrationNotes: "Herbal medicine core contact.",
      ancestryOrSpecies: "dryad-touched human",
      magicalTraits: [
        "living vine bracelets",
        "leaf-shaped freckles"
      ]
    },
    {
      characterId: "character-060",
      rosterGroup: "supporting_cast",
      runtimeIndex: 11,
      catalogKey: null,
      finalDisplayName: "Kellan Sootwink",
      profession: "Chimney Sweep",
      gameplayGroups: [
        "trade",
        "quest"
      ],
      roleTags: [
        "cleaning",
        "coal",
        "city_service",
        "rumor_source"
      ],
      marketFlavor: "roofline alleys",
      voiceDirection: "cheerful, filthy, impossible to offend",
      tradePersonality: "small service trader who hears secrets through walls",
      shortStory: "Kellan knows the city by its rooftops and measures neighborhoods by the taste of their soot. He can climb into a noble house and come out with chimney ash, gossip, and sometimes a lost ring. He supports coal, cleaning tools, urban rumors, and hidden-item hooks.",
      visualIdentity: "A skinny soot-blackened youth with bright white grin, copper skin under ash, messy curls, patched charcoal coat, and a tiny brush taller than his shoulder.",
      uniquenessTraits: [
        "skinny vertical silhouette",
        "soot-blackened face",
        "bright grin",
        "messy curls",
        "patched charcoal coat"
      ],
      professionProps: [
        "chimney brush",
        "soot pouch",
        "roof hook"
      ],
      dominantColors: [
        "charcoal",
        "copper",
        "patched grey"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-060",
      identityAnchor: "same person as character-060: skinny vertical silhouette, soot-blackened face, bright grin, messy curls, patched charcoal coat, chimney sweep, human, chimney brush",
      portraitBasePrompt: "A skinny soot-blackened youth with bright white grin, copper skin under ash, messy curls, patched charcoal coat, and a tiny brush taller than his shoulder. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "lost ring in chimney",
        "roof route rumor",
        "coal shortage"
      ],
      integrationNotes: "Urban service core contact.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "character-061",
      rosterGroup: "supporting_cast",
      runtimeIndex: 12,
      catalogKey: null,
      finalDisplayName: "Dalla Reefsong",
      profession: "Pearl Trader",
      gameplayGroups: [
        "trade",
        "collector_specialist"
      ],
      roleTags: [
        "pearls",
        "jewelry",
        "dock",
        "luxury"
      ],
      marketFlavor: "pearl quay",
      voiceDirection: "musical, elusive, never names the first price",
      tradePersonality: "luxury sea trader who loves rarity and silence",
      shortStory: "Dalla dives only at dawn and claims pearls dislike impatient buyers. She has a voice like a lullaby but bargains until sailors sweat. She supports pearls, jewelry, coastal luxury, and rare-shell quests.",
      visualIdentity: "A graceful merfolk-blooded trader with bronze skin, turquoise eyes, black hair braided with shells, a scaled teal collar, and a velvet tray of pale pearls.",
      uniquenessTraits: [
        "graceful sea-blood silhouette",
        "turquoise eyes",
        "shell-braided hair",
        "scaled teal collar",
        "pearl tray"
      ],
      professionProps: [
        "velvet pearl tray",
        "shell comb",
        "small water flask"
      ],
      dominantColors: [
        "teal",
        "pearl white",
        "bronze"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-061",
      identityAnchor: "same person as character-061: graceful sea-blood silhouette, turquoise eyes, shell-braided hair, scaled teal collar, pearl tray, pearl trader, merfolk-blooded human, velvet pearl tray",
      portraitBasePrompt: "A graceful merfolk-blooded trader with bronze skin, turquoise eyes, black hair braided with shells, a scaled teal collar, and a velvet tray of pale pearls. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "black pearl rumor",
        "lost diving charm",
        "noble pearl order"
      ],
      integrationNotes: "Coastal luxury merchant.",
      ancestryOrSpecies: "merfolk-blooded human",
      magicalTraits: [
        "subtle scale shimmer at collarbones"
      ]
    },
    {
      characterId: "character-062",
      rosterGroup: "supporting_cast",
      runtimeIndex: 13,
      catalogKey: null,
      finalDisplayName: "Hobb Ashbarrel",
      profession: "Charcoal Burner",
      gameplayGroups: [
        "trade",
        "travel"
      ],
      roleTags: [
        "charcoal",
        "fuel",
        "forest",
        "bulk"
      ],
      marketFlavor: "forest edge",
      voiceDirection: "dry, smoky, surprisingly gentle",
      tradePersonality: "fuel supplier who prefers buyers who stack properly",
      shortStory: "Hobb lives where the forest turns into smoke and can identify wood by how it complains in fire. He dislikes city noise but loves exact payment. He supports charcoal, fuel shortages, and forest-route hooks.",
      visualIdentity: "A squat grey-bearded dwarf charcoal burner with ash-stained cheeks, smoky wool hood, thick gloves, and a small iron ember pot hanging from his belt.",
      uniquenessTraits: [
        "squat dwarf silhouette",
        "ash-stained cheeks",
        "grey beard",
        "smoky hood",
        "thick gloves"
      ],
      professionProps: [
        "iron ember pot",
        "charcoal sack",
        "wood axe"
      ],
      dominantColors: [
        "ash grey",
        "ember orange",
        "dark wool"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-062",
      identityAnchor: "same person as character-062: squat dwarf silhouette, ash-stained cheeks, grey beard, smoky hood, thick gloves, charcoal burner, dwarf, iron ember pot",
      portraitBasePrompt: "A squat grey-bearded dwarf charcoal burner with ash-stained cheeks, smoky wool hood, thick gloves, and a small iron ember pot hanging from his belt. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "wet charcoal",
        "forest kiln trouble",
        "fuel contract"
      ],
      integrationNotes: "Fuel trade merchant.",
      ancestryOrSpecies: "dwarf",
      magicalTraits: [
        "faint ember glow inside belt pot"
      ]
    },
    {
      characterId: "character-063",
      rosterGroup: "supporting_cast",
      runtimeIndex: 14,
      catalogKey: null,
      finalDisplayName: "Rima Glasslark",
      profession: "Glass Seller",
      gameplayGroups: [
        "trade",
        "collector_specialist"
      ],
      roleTags: [
        "glass",
        "luxury",
        "craft",
        "fragile_goods"
      ],
      marketFlavor: "sunlit arcade",
      voiceDirection: "bright, nervous, delighted by delicate things",
      tradePersonality: "fragile-goods trader who charges for careful hands",
      shortStory: "Rima learned glasswork after a fever left her hearing tiny cracks before they spread. She wraps every bottle as if it were a sleeping bird. She supports fragile goods, bottles, lenses, and breakage risk.",
      visualIdentity: "A slim human glass seller with honey skin, short blue-black bob, amber spectacles, translucent sleeve cuffs, and a crate of colored bottles padded with straw.",
      uniquenessTraits: [
        "slim careful silhouette",
        "amber spectacles",
        "short blue-black bob",
        "translucent cuffs",
        "colored bottles"
      ],
      professionProps: [
        "colored bottles",
        "straw crate",
        "glass lens"
      ],
      dominantColors: [
        "sky blue",
        "amber",
        "clear glass"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-063",
      identityAnchor: "same person as character-063: slim careful silhouette, amber spectacles, short blue-black bob, translucent cuffs, colored bottles, glass seller, human, colored bottles",
      portraitBasePrompt: "A slim human glass seller with honey skin, short blue-black bob, amber spectacles, translucent sleeve cuffs, and a crate of colored bottles padded with straw. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "fragile delivery",
        "broken lens",
        "rare blue bottle"
      ],
      integrationNotes: "Fragile luxury merchant.",
      ancestryOrSpecies: "human",
      magicalTraits: [
        "tiny rainbow glints on glass props"
      ]
    },
    {
      characterId: "character-064",
      rosterGroup: "supporting_cast",
      runtimeIndex: 15,
      catalogKey: null,
      finalDisplayName: "Orvik Bellows",
      profession: "Tinker",
      gameplayGroups: [
        "trade",
        "quest"
      ],
      roleTags: [
        "tools",
        "repair",
        "metal",
        "oddities"
      ],
      marketFlavor: "junk archway",
      voiceDirection: "fast, clattering, delighted by broken things",
      tradePersonality: "repair trader who buys failed inventions",
      shortStory: "Orvik believes every broken tool is halfway to a better idea. His pockets rattle so loudly that children follow him like a parade. He supports odd tools, repairs, metal scraps, and invention hooks.",
      visualIdentity: "A wiry goblin tinker with lime-tinted skin, enormous ears, brass goggles on his forehead, patched orange coat, and a spiral screwdriver tucked behind each ear.",
      uniquenessTraits: [
        "wiry goblin silhouette",
        "lime-tinted skin",
        "huge ears",
        "brass goggles",
        "patched orange coat"
      ],
      professionProps: [
        "spiral screwdrivers",
        "tool roll",
        "tiny bellows"
      ],
      dominantColors: [
        "orange",
        "brass",
        "lime green"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-064",
      identityAnchor: "same person as character-064: wiry goblin silhouette, lime-tinted skin, huge ears, brass goggles, patched orange coat, tinker, goblin, spiral screwdrivers",
      portraitBasePrompt: "A wiry goblin tinker with lime-tinted skin, enormous ears, brass goggles on his forehead, patched orange coat, and a spiral screwdriver tucked behind each ear. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "broken machine",
        "missing spring",
        "experimental tool"
      ],
      integrationNotes: "Tool/oddity core contact.",
      ancestryOrSpecies: "goblin",
      magicalTraits: []
    },
    {
      characterId: "character-065",
      rosterGroup: "supporting_cast",
      runtimeIndex: 16,
      catalogKey: null,
      finalDisplayName: "Selka Warmhide",
      profession: "Furrier",
      gameplayGroups: [
        "trade",
        "travel"
      ],
      roleTags: [
        "furs",
        "clothing",
        "cold_route",
        "hunter_supplier"
      ],
      marketFlavor: "north market awning",
      voiceDirection: "blunt, warm, judges poor stitching openly",
      tradePersonality: "clothing seller who values weatherproof work",
      shortStory: "Selka buys pelts only from hunters who waste nothing and customers who can admit they are cold. She makes winter cloaks that survive sleet and bad marriages. She supports furs, cold travel, and hunter trade.",
      visualIdentity: "A tall broad-shouldered woman with copper skin, thick black braid, white fur collar, scarred hands, and a measuring strap wrapped around her wrist.",
      uniquenessTraits: [
        "tall broad silhouette",
        "copper skin",
        "thick braid",
        "white fur collar",
        "scarred hands"
      ],
      professionProps: [
        "fur collar",
        "measuring strap",
        "pelt bundle"
      ],
      dominantColors: [
        "white fur",
        "copper",
        "dark leather"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-065",
      identityAnchor: "same person as character-065: tall broad silhouette, copper skin, thick braid, white fur collar, scarred hands, furrier, human, fur collar",
      portraitBasePrompt: "A tall broad-shouldered woman with copper skin, thick black braid, white fur collar, scarred hands, and a measuring strap wrapped around her wrist. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "winter cloak order",
        "bad pelt dispute",
        "hunter debt"
      ],
      integrationNotes: "Cold-weather clothing merchant.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "character-066",
      rosterGroup: "supporting_cast",
      runtimeIndex: 17,
      catalogKey: null,
      finalDisplayName: "Ivo Plumspice",
      profession: "Spice Hawker",
      gameplayGroups: [
        "trade",
        "travel"
      ],
      roleTags: [
        "spices",
        "imports",
        "food",
        "exotic_goods"
      ],
      marketFlavor: "red canopy bazaar",
      voiceDirection: "flamboyant, flattering, allergic to honesty about price",
      tradePersonality: "import trader who sells aroma before weight",
      shortStory: "Ivo announces spices in rhymes and claims each pouch has crossed a desert, even the local parsley. Beneath the show, he tracks import shortages better than most guild clerks. He supports spices, exotic goods, and festival demand.",
      visualIdentity: "A slim fox-kin spice hawker with russet ears, gold eyes, curled moustache, purple sash, and dozens of tiny spice pouches fanning from his belt.",
      uniquenessTraits: [
        "slim fox-kin silhouette",
        "russet ears",
        "gold eyes",
        "curled moustache",
        "purple sash",
        "spice pouch belt"
      ],
      professionProps: [
        "spice pouches",
        "tiny spoon",
        "colored powders"
      ],
      dominantColors: [
        "purple",
        "saffron",
        "russet"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-066",
      identityAnchor: "same person as character-066: slim fox-kin silhouette, russet ears, gold eyes, curled moustache, purple sash, spice hawker, fox-kin, spice pouches",
      portraitBasePrompt: "A slim fox-kin spice hawker with russet ears, gold eyes, curled moustache, purple sash, and dozens of tiny spice pouches fanning from his belt. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "lost spice caravan",
        "festival curry order",
        "fake saffron"
      ],
      integrationNotes: "Import/spice core contact.",
      ancestryOrSpecies: "fox-kin",
      magicalTraits: []
    },
    {
      characterId: "character-067",
      rosterGroup: "supporting_cast",
      runtimeIndex: 18,
      catalogKey: null,
      finalDisplayName: "Coro Bluecap",
      profession: "Mushroom Farmer",
      gameplayGroups: [
        "trade",
        "quest"
      ],
      roleTags: [
        "mushrooms",
        "food",
        "cave_goods",
        "medicine"
      ],
      marketFlavor: "cool cellar market",
      voiceDirection: "soft, damp, laughs at sunlight jokes",
      tradePersonality: "cave-food supplier who trades in strange freshness",
      shortStory: "Coro grows mushrooms in old wine tunnels and names the largest caps after local politicians. He is shy aboveground and fearless in caves. He supports mushroom stock, medicine ingredients, and cellar quests.",
      visualIdentity: "A round blue-capped gnome mushroom farmer with pale violet skin, soft beard, huge blue cap-hat, mossy vest, and a basket of glowing cave mushrooms.",
      uniquenessTraits: [
        "round gnome silhouette",
        "pale violet skin",
        "huge blue cap-hat",
        "soft beard",
        "mossy vest"
      ],
      professionProps: [
        "glowing mushrooms",
        "woven basket",
        "small watering flask"
      ],
      dominantColors: [
        "blue",
        "moss green",
        "violet"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-067",
      identityAnchor: "same person as character-067: round gnome silhouette, pale violet skin, huge blue cap-hat, soft beard, mossy vest, mushroom farmer, gnome, glowing mushrooms",
      portraitBasePrompt: "A round blue-capped gnome mushroom farmer with pale violet skin, soft beard, huge blue cap-hat, mossy vest, and a basket of glowing cave mushrooms. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "sickly mushroom patch",
        "cellar monster rumor",
        "rare spore sample"
      ],
      integrationNotes: "Cave/food trade merchant.",
      ancestryOrSpecies: "gnome",
      magicalTraits: [
        "gentle glow from cave mushrooms"
      ]
    },
    {
      characterId: "character-068",
      rosterGroup: "supporting_cast",
      runtimeIndex: 19,
      catalogKey: null,
      finalDisplayName: "Anja Threadmere",
      profession: "Seamstress",
      gameplayGroups: [
        "trade",
        "guild_noble"
      ],
      roleTags: [
        "clothing",
        "cloth",
        "repair",
        "fashion"
      ],
      marketFlavor: "needle court",
      voiceDirection: "polite, cutting, notices every loose hem",
      tradePersonality: "tailor who sells dignity by the stitch",
      shortStory: "Anja repairs soldiers, nobles, and beggars with the same small frown. Her stitches last longer than most promises. She supports cloth, clothing repair, faction uniforms, and disguise hooks.",
      visualIdentity: "A lean dark-skinned seamstress with silver locs pinned high, tiny gold spectacles, measuring tape around her neck, and sleeves full of colored needles.",
      uniquenessTraits: [
        "lean elegant silhouette",
        "silver locs",
        "tiny gold spectacles",
        "measuring tape",
        "needle-filled sleeves"
      ],
      professionProps: [
        "measuring tape",
        "colored needles",
        "folded cloth"
      ],
      dominantColors: [
        "deep blue",
        "silver",
        "gold"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-068",
      identityAnchor: "same person as character-068: lean elegant silhouette, silver locs, tiny gold spectacles, measuring tape, needle-filled sleeves, seamstress, human, measuring tape",
      portraitBasePrompt: "A lean dark-skinned seamstress with silver locs pinned high, tiny gold spectacles, measuring tape around her neck, and sleeves full of colored needles. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "uniform rush",
        "hidden pocket",
        "rival tailor scandal"
      ],
      integrationNotes: "Clothing repair merchant.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "character-069",
      rosterGroup: "supporting_cast",
      runtimeIndex: 20,
      catalogKey: null,
      finalDisplayName: "Borin Mulefriend",
      profession: "Pack Animal Trader",
      gameplayGroups: [
        "trade",
        "travel"
      ],
      roleTags: [
        "animals",
        "travel",
        "capacity",
        "caravan"
      ],
      marketFlavor: "dusty animal yard",
      voiceDirection: "slow, affectionate, suspicious of anyone animals dislike",
      tradePersonality: "capacity seller who trusts beasts more than merchants",
      shortStory: "Borin remembers every mule by name and most humans by their mistakes. He can tell if a cart is overloaded by the way a donkey blinks. He supports capacity upgrades, animal trade, and travel prep.",
      visualIdentity: "A large gentle orc-blooded trader with moss-green skin, kind brown eyes, braided beard, padded vest, and a small mule bell necklace.",
      uniquenessTraits: [
        "large gentle silhouette",
        "moss-green skin",
        "kind eyes",
        "braided beard",
        "padded vest",
        "mule bell necklace"
      ],
      professionProps: [
        "mule bell",
        "feed scoop",
        "halter rope"
      ],
      dominantColors: [
        "moss green",
        "dust tan",
        "leather"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-069",
      identityAnchor: "same person as character-069: large gentle silhouette, moss-green skin, kind eyes, braided beard, padded vest, pack animal trader, orc-blooded human, mule bell",
      portraitBasePrompt: "A large gentle orc-blooded trader with moss-green skin, kind brown eyes, braided beard, padded vest, and a small mule bell necklace. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "stubborn mule",
        "lost feed shipment",
        "caravan capacity check"
      ],
      integrationNotes: "Travel capacity merchant.",
      ancestryOrSpecies: "orc-blooded human",
      magicalTraits: []
    },
    {
      characterId: "character-070",
      rosterGroup: "supporting_cast",
      runtimeIndex: 21,
      catalogKey: null,
      finalDisplayName: "Talia Redscale",
      profession: "Reptile Seller",
      gameplayGroups: [
        "trade",
        "collector_specialist"
      ],
      roleTags: [
        "pets",
        "exotic",
        "medicine",
        "risk"
      ],
      marketFlavor: "warm stone stall",
      voiceDirection: "bright, fearless, handles biting things like kittens",
      tradePersonality: "exotic seller who values calm hands",
      shortStory: "Talia grew up catching roof lizards and now sells creatures nobles pretend are decorations. She likes animals with teeth because they reveal cowards quickly. She supports exotic pets, venom, and rare creature hooks.",
      visualIdentity: "A sun-browned lizardfolk woman with copper scales along her cheeks, yellow eyes, braided red scarf, sleeveless leather vest, and a tiny jeweled lizard perched on her wrist.",
      uniquenessTraits: [
        "lizardfolk silhouette",
        "copper cheek scales",
        "yellow eyes",
        "red scarf",
        "tiny jeweled lizard"
      ],
      professionProps: [
        "jeweled lizard",
        "small cage charm",
        "venom vial"
      ],
      dominantColors: [
        "red",
        "copper",
        "sun yellow"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-070",
      identityAnchor: "same person as character-070: lizardfolk silhouette, copper cheek scales, yellow eyes, red scarf, tiny jeweled lizard, reptile seller, lizardfolk, jeweled lizard",
      portraitBasePrompt: "A sun-browned lizardfolk woman with copper scales along her cheeks, yellow eyes, braided red scarf, sleeveless leather vest, and a tiny jeweled lizard perched on her wrist. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "escaped basilisk hatchling",
        "venom order",
        "noble pet dispute"
      ],
      integrationNotes: "Exotic animal merchant.",
      ancestryOrSpecies: "lizardfolk",
      magicalTraits: []
    },
    {
      characterId: "character-071",
      rosterGroup: "supporting_cast",
      runtimeIndex: 22,
      catalogKey: null,
      finalDisplayName: "Milo Copperpot",
      profession: "Cookshop Owner",
      gameplayGroups: [
        "trade",
        "quest"
      ],
      roleTags: [
        "cooked_food",
        "kitchen",
        "rumor_source",
        "festival"
      ],
      marketFlavor: "steam alley",
      voiceDirection: "fast, affectionate, yells as a love language",
      tradePersonality: "food seller who values ingredients and timing",
      shortStory: "Milo can feed a queue of fifty without looking away from a conversation. His soups have ended feuds and started three romances. He supports prepared food, ingredient demand, and festival cooking hooks.",
      visualIdentity: "A chubby halfling cook with cinnamon skin, curly black hair under a copper pot helmet, striped apron, and a ladle worn like a commander baton.",
      uniquenessTraits: [
        "chubby halfling silhouette",
        "copper pot helmet",
        "striped apron",
        "cinnamon skin",
        "curly hair"
      ],
      professionProps: [
        "ladle",
        "soup bowl",
        "herb bundle"
      ],
      dominantColors: [
        "copper",
        "cream",
        "tomato red"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-071",
      identityAnchor: "same person as character-071: chubby halfling silhouette, copper pot helmet, striped apron, cinnamon skin, curly hair, cookshop owner, halfling, ladle",
      portraitBasePrompt: "A chubby halfling cook with cinnamon skin, curly black hair under a copper pot helmet, striped apron, and a ladle worn like a commander baton. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "festival soup",
        "missing herbs",
        "hungry guards"
      ],
      integrationNotes: "Cook/food core contact.",
      ancestryOrSpecies: "halfling",
      magicalTraits: []
    },
    {
      characterId: "character-072",
      rosterGroup: "supporting_cast",
      runtimeIndex: 23,
      catalogKey: null,
      finalDisplayName: "Edris Nightjar",
      profession: "Lamp Oil Seller",
      gameplayGroups: [
        "trade",
        "travel"
      ],
      roleTags: [
        "oil",
        "lamps",
        "night",
        "travel_supply"
      ],
      marketFlavor: "lantern bridge",
      voiceDirection: "quiet, observant, always smells faintly of smoke",
      tradePersonality: "night-supply trader who pays for clean oil and glass",
      shortStory: "Edris lights alleys before the guards arrive and knows which streets prefer darkness. He sells oil honestly but sells warnings carefully. He supports lamp oil, night travel, and crime-risk hints.",
      visualIdentity: "A thin shadow-touched human with deep brown skin, pale grey eyes, charcoal turban, long amber coat, and a cluster of tiny brass lanterns at his hip.",
      uniquenessTraits: [
        "thin shadow-touched silhouette",
        "pale grey eyes",
        "charcoal turban",
        "amber coat",
        "tiny brass lanterns"
      ],
      professionProps: [
        "brass lanterns",
        "oil flask",
        "wick scissors"
      ],
      dominantColors: [
        "amber",
        "charcoal",
        "brass"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-072",
      identityAnchor: "same person as character-072: thin shadow-touched silhouette, pale grey eyes, charcoal turban, amber coat, tiny brass lanterns, lamp oil seller, shadow-touched human, brass lanterns",
      portraitBasePrompt: "A thin shadow-touched human with deep brown skin, pale grey eyes, charcoal turban, long amber coat, and a cluster of tiny brass lanterns at his hip. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "dark alley warning",
        "lamp oil shortage",
        "night delivery"
      ],
      integrationNotes: "Night/travel supply merchant.",
      ancestryOrSpecies: "shadow-touched human",
      magicalTraits: [
        "soft smoky halo around lanterns"
      ]
    },
    {
      characterId: "character-073",
      rosterGroup: "supporting_cast",
      runtimeIndex: 24,
      catalogKey: null,
      finalDisplayName: "Vessa Stonebloom",
      profession: "Potter",
      gameplayGroups: [
        "trade",
        "collector_specialist"
      ],
      roleTags: [
        "pottery",
        "containers",
        "craft",
        "fragile_goods"
      ],
      marketFlavor: "kiln lane",
      voiceDirection: "earthy, proud, offended by bad shelves",
      tradePersonality: "container maker who treats clay like family",
      shortStory: "Vessa digs her own clay and claims it remembers the river. Her pots are plain until you use them, then you realize they balance perfectly. She supports containers, pottery, and fragile cargo.",
      visualIdentity: "A sturdy earth-genasi potter with warm clay-colored skin, green mineral freckles, thick arms, indigo headscarf, and a wet clay cup turning between her hands.",
      uniquenessTraits: [
        "sturdy earth-genasi silhouette",
        "clay-colored skin",
        "mineral freckles",
        "thick arms",
        "indigo headscarf"
      ],
      professionProps: [
        "wet clay cup",
        "potter rib",
        "small bowl stack"
      ],
      dominantColors: [
        "clay red",
        "indigo",
        "mineral green"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-073",
      identityAnchor: "same person as character-073: sturdy earth-genasi silhouette, clay-colored skin, mineral freckles, thick arms, indigo headscarf, potter, earth-genasi, wet clay cup",
      portraitBasePrompt: "A sturdy earth-genasi potter with warm clay-colored skin, green mineral freckles, thick arms, indigo headscarf, and a wet clay cup turning between her hands. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "broken kiln",
        "rare clay deposit",
        "fragile jar shipment"
      ],
      integrationNotes: "Container/craft core contact.",
      ancestryOrSpecies: "earth-genasi",
      magicalTraits: [
        "green mineral freckles"
      ]
    },
    {
      characterId: "character-074",
      rosterGroup: "supporting_cast",
      runtimeIndex: 25,
      catalogKey: null,
      finalDisplayName: "Nico Quickmeasure",
      profession: "Surveyor",
      gameplayGroups: [
        "travel",
        "company"
      ],
      roleTags: [
        "maps",
        "route",
        "company",
        "measurement"
      ],
      marketFlavor: "map steps",
      voiceDirection: "precise, energetic, insults bad roads",
      tradePersonality: "route service trader who sells distance truth",
      shortStory: "Nico walks routes with a wheel, a notebook, and a hatred of vague directions. He can turn a rumor into mileage and mileage into profit. He supports route planning, maps, and company shipment accuracy.",
      visualIdentity: "A short wiry human surveyor with tawny skin, bright blue eyes, sun-cracked lips, yellow measuring sash, and a folded map case strapped diagonally across his chest.",
      uniquenessTraits: [
        "short wiry silhouette",
        "bright blue eyes",
        "yellow measuring sash",
        "map case",
        "sun-cracked lips"
      ],
      professionProps: [
        "folded map case",
        "measuring wheel token",
        "route notebook"
      ],
      dominantColors: [
        "yellow",
        "map tan",
        "sky blue"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-074",
      identityAnchor: "same person as character-074: short wiry silhouette, bright blue eyes, yellow measuring sash, map case, sun-cracked lips, surveyor, human, folded map case",
      portraitBasePrompt: "A short wiry human surveyor with tawny skin, bright blue eyes, sun-cracked lips, yellow measuring sash, and a folded map case strapped diagonally across his chest. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "wrong milestone",
        "new shortcut",
        "survey contract"
      ],
      integrationNotes: "Route information core contact.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "character-075",
      rosterGroup: "supporting_cast",
      runtimeIndex: 26,
      catalogKey: null,
      finalDisplayName: "Faela Mournmint",
      profession: "Undertaker",
      gameplayGroups: [
        "trade",
        "quest"
      ],
      roleTags: [
        "funerary",
        "cloth",
        "religious",
        "rumor_source"
      ],
      marketFlavor: "quiet grave road",
      voiceDirection: "gentle, dry, politely impossible to shock",
      tradePersonality: "ritual merchant who buys clean cloth and candles",
      shortStory: "Faela speaks softly because grief already fills the room. She knows which families can pay and which need the bill forgotten. She supports cloth, candles, religious goods, and darker town stories.",
      visualIdentity: "A tall pale elf undertaker with ash-blonde hair, long black veil pinned with mint leaves, narrow silver eyes, and a folded stack of white burial cloth.",
      uniquenessTraits: [
        "tall pale elf silhouette",
        "ash-blonde hair",
        "black veil",
        "mint leaves",
        "silver eyes",
        "white cloth stack"
      ],
      professionProps: [
        "burial cloth",
        "mint sprig",
        "black ribbon"
      ],
      dominantColors: [
        "black",
        "mint green",
        "white"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-075",
      identityAnchor: "same person as character-075: tall pale elf silhouette, ash-blonde hair, black veil, mint leaves, silver eyes, undertaker, elf, burial cloth",
      portraitBasePrompt: "A tall pale elf undertaker with ash-blonde hair, long black veil pinned with mint leaves, narrow silver eyes, and a folded stack of white burial cloth. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "missing funeral cloth",
        "haunted grave rumor",
        "candle shortage"
      ],
      integrationNotes: "Religious/funerary trade merchant.",
      ancestryOrSpecies: "elf",
      magicalTraits: [
        "cool silver eye glint"
      ]
    },
    {
      characterId: "character-076",
      rosterGroup: "supporting_cast",
      runtimeIndex: 27,
      catalogKey: null,
      finalDisplayName: "Garrik Rednail",
      profession: "Butcher",
      gameplayGroups: [
        "trade"
      ],
      roleTags: [
        "meat",
        "food",
        "supplier",
        "market"
      ],
      marketFlavor: "red awning market",
      voiceDirection: "booming, practical, proud of clean cuts",
      tradePersonality: "meat trader who values cold storage and sharp knives",
      shortStory: "Garrik can split a carcass while arguing politics and never miss the joint. He gives scraps to street dogs and lectures customers about proper stew bones. He supports meat stock, hides, knives, and food demand.",
      visualIdentity: "A huge red-bearded human butcher with freckled arms, heavy shoulders, striped apron, polished cleaver kept low and safe, and a necklace of little bone tally tags.",
      uniquenessTraits: [
        "huge butcher silhouette",
        "red beard",
        "freckled arms",
        "striped apron",
        "bone tally tags"
      ],
      professionProps: [
        "polished cleaver",
        "bone tally necklace",
        "wrapped meat parcel"
      ],
      dominantColors: [
        "red",
        "cream",
        "steel"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-076",
      identityAnchor: "same person as character-076: huge butcher silhouette, red beard, freckled arms, striped apron, bone tally tags, butcher, human, polished cleaver",
      portraitBasePrompt: "A huge red-bearded human butcher with freckled arms, heavy shoulders, striped apron, polished cleaver kept low and safe, and a necklace of little bone tally tags. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "cold room failure",
        "festival meat order",
        "knife sharpening debt"
      ],
      integrationNotes: "Meat trade merchant.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "character-077",
      rosterGroup: "supporting_cast",
      runtimeIndex: 28,
      catalogKey: null,
      finalDisplayName: "Senna Rainbarrel",
      profession: "Water Seller",
      gameplayGroups: [
        "trade",
        "travel"
      ],
      roleTags: [
        "water",
        "travel_supply",
        "city_service",
        "bulk"
      ],
      marketFlavor: "dry square",
      voiceDirection: "cheerful, stubborn, knows every well by mood",
      tradePersonality: "travel supplier who values clean barrels",
      shortStory: "Senna sells water where fountains fail and laughs at anyone who thinks it is simple work. She tests wells with silver beads and old songs. She supports travel supply, clean water, and drought events.",
      visualIdentity: "A tall blue-skinned water-touched woman with braided white hair, bright smile, patched teal dress, and two tiny silver water-testing beads on a cord.",
      uniquenessTraits: [
        "tall water-touched silhouette",
        "blue skin",
        "white braids",
        "teal dress",
        "silver testing beads"
      ],
      professionProps: [
        "water beads",
        "small barrel cup",
        "cord of tokens"
      ],
      dominantColors: [
        "teal",
        "silver",
        "blue"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-077",
      identityAnchor: "same person as character-077: tall water-touched silhouette, blue skin, white braids, teal dress, silver testing beads, water seller, water-touched human, water beads",
      portraitBasePrompt: "A tall blue-skinned water-touched woman with braided white hair, bright smile, patched teal dress, and two tiny silver water-testing beads on a cord. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "tainted well",
        "drought price spike",
        "barrel shortage"
      ],
      integrationNotes: "Water/travel supply core contact.",
      ancestryOrSpecies: "water-touched human",
      magicalTraits: [
        "wet shimmer along hair tips"
      ]
    },
    {
      characterId: "character-078",
      rosterGroup: "supporting_cast",
      runtimeIndex: 29,
      catalogKey: null,
      finalDisplayName: "Odelia Sunhusk",
      profession: "Fruit Seller",
      gameplayGroups: [
        "trade"
      ],
      roleTags: [
        "fruit",
        "food",
        "farm",
        "fresh_goods"
      ],
      marketFlavor: "sunny produce row",
      voiceDirection: "sweet, sharp, impossible to fool about ripeness",
      tradePersonality: "fresh-goods seller who tracks seasons by bruises",
      shortStory: "Odelia can pick the sweetest peach from a wagon without touching it. She smiles at children, scolds nobles, and hides bruised fruit from no one. She supports fresh produce, farm links, and festival foods.",
      visualIdentity: "A warm brown-skinned fruit seller with round cheeks, sunflower-yellow scarf, green eyes, woven shoulder basket, and a fan of bright fruit slices held safely inside the portrait.",
      uniquenessTraits: [
        "round-cheeked silhouette",
        "sunflower scarf",
        "green eyes",
        "woven basket",
        "bright fruit slices"
      ],
      professionProps: [
        "fruit basket",
        "small knife",
        "market scale"
      ],
      dominantColors: [
        "sunflower yellow",
        "leaf green",
        "peach"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-078",
      identityAnchor: "same person as character-078: round-cheeked silhouette, sunflower scarf, green eyes, woven basket, bright fruit slices, fruit seller, human, fruit basket",
      portraitBasePrompt: "A warm brown-skinned fruit seller with round cheeks, sunflower-yellow scarf, green eyes, woven shoulder basket, and a fan of bright fruit slices held safely inside the portrait. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "late orchard cart",
        "fruit blight",
        "festival preserves"
      ],
      integrationNotes: "Produce trade merchant.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "character-079",
      rosterGroup: "supporting_cast",
      runtimeIndex: 30,
      catalogKey: null,
      finalDisplayName: "Kiva Moonmoth",
      profession: "Dyer",
      gameplayGroups: [
        "trade",
        "guild_noble"
      ],
      roleTags: [
        "dye",
        "cloth",
        "craft",
        "luxury"
      ],
      marketFlavor: "dye canal",
      voiceDirection: "dreamy, artistic, suddenly ruthless about color",
      tradePersonality: "craft trader who sells color memory",
      shortStory: "Kiva says every color has a temper and refuses to mix angry blues before noon. Her dyes are expensive because they do not fade, even from lies. She supports dye goods, luxury cloth, and guild color disputes.",
      visualIdentity: "A delicate moth-kin dyer with soft grey-lilac skin, feathery brows, black eyes, layered stained aprons, and fingers tipped with bright permanent dye.",
      uniquenessTraits: [
        "delicate moth-kin silhouette",
        "grey-lilac skin",
        "feathery brows",
        "black eyes",
        "stained aprons",
        "bright dye fingertips"
      ],
      professionProps: [
        "dye bottles",
        "cloth strips",
        "mixing rod"
      ],
      dominantColors: [
        "lilac",
        "indigo",
        "bright dye"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-079",
      identityAnchor: "same person as character-079: delicate moth-kin silhouette, grey-lilac skin, feathery brows, black eyes, stained aprons, dyer, moth-kin, dye bottles",
      portraitBasePrompt: "A delicate moth-kin dyer with soft grey-lilac skin, feathery brows, black eyes, layered stained aprons, and fingers tipped with bright permanent dye. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "stolen dye recipe",
        "guild color ban",
        "festival banner order"
      ],
      integrationNotes: "Dye/craft core contact.",
      ancestryOrSpecies: "moth-kin",
      magicalTraits: [
        "subtle powdery wing-like collar"
      ]
    },
    {
      characterId: "character-080",
      rosterGroup: "supporting_cast",
      runtimeIndex: 31,
      catalogKey: null,
      finalDisplayName: "Padrig Nailroot",
      profession: "Carpenter",
      gameplayGroups: [
        "trade",
        "company"
      ],
      roleTags: [
        "wood",
        "repair",
        "construction",
        "warehouse"
      ],
      marketFlavor: "timber yard",
      voiceDirection: "steady, stubborn, measures twice and complains once",
      tradePersonality: "woodworker who values straight grain and fair labor",
      shortStory: "Padrig builds stalls, carts, shelves, and grudges that last equally long. He can hear a bad joint across a room. He supports construction, warehouse upgrades, carts, and wood shortages.",
      visualIdentity: "A burly green-eyed human carpenter with sawdust in chestnut beard, rolled tan sleeves, leather braces, and a carved ruler tucked behind one ear.",
      uniquenessTraits: [
        "burly craftsman silhouette",
        "sawdust beard",
        "green eyes",
        "rolled tan sleeves",
        "leather braces"
      ],
      professionProps: [
        "carved ruler",
        "small saw",
        "wood plane"
      ],
      dominantColors: [
        "tan",
        "wood brown",
        "green"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-080",
      identityAnchor: "same person as character-080: burly craftsman silhouette, sawdust beard, green eyes, rolled tan sleeves, leather braces, carpenter, human, carved ruler",
      portraitBasePrompt: "A burly green-eyed human carpenter with sawdust in chestnut beard, rolled tan sleeves, leather braces, and a carved ruler tucked behind one ear. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "warehouse shelving",
        "broken cart",
        "rare timber order"
      ],
      integrationNotes: "Construction/company core contact.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "character-081",
      rosterGroup: "supporting_cast",
      runtimeIndex: 32,
      catalogKey: null,
      finalDisplayName: "Zaira Ashpetal",
      profession: "Flower Seller",
      gameplayGroups: [
        "trade",
        "quest"
      ],
      roleTags: [
        "flowers",
        "festival",
        "religious",
        "fresh_goods"
      ],
      marketFlavor: "fountain steps",
      voiceDirection: "bright, romantic, sells sympathy and gossip equally",
      tradePersonality: "festival seller who prices mood and season",
      shortStory: "Zaira sells flowers for weddings, funerals, apologies, and lies, and she knows the difference. She grows night-blooming flowers under her bed. She supports festivals, religious offerings, romance hooks, and fresh goods.",
      visualIdentity: "A young human flower seller with deep brown skin, glossy coiled hair pinned with petals, rose-pink shawl, and a basket of impossible blue flowers.",
      uniquenessTraits: [
        "young bright silhouette",
        "coiled hair with petals",
        "rose shawl",
        "deep brown skin",
        "blue flowers"
      ],
      professionProps: [
        "flower basket",
        "ribbon shears",
        "pressed petal book"
      ],
      dominantColors: [
        "rose",
        "blue",
        "leaf green"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-081",
      identityAnchor: "same person as character-081: young bright silhouette, coiled hair with petals, rose shawl, deep brown skin, blue flowers, flower seller, human, flower basket",
      portraitBasePrompt: "A young human flower seller with deep brown skin, glossy coiled hair pinned with petals, rose-pink shawl, and a basket of impossible blue flowers. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "missing wedding flowers",
        "funeral rush",
        "rare night blossom"
      ],
      integrationNotes: "Festival/fresh goods merchant.",
      ancestryOrSpecies: "human",
      magicalTraits: [
        "one faintly glowing blue flower"
      ]
    },
    {
      characterId: "character-082",
      rosterGroup: "supporting_cast",
      runtimeIndex: 33,
      catalogKey: null,
      finalDisplayName: "Rusk Ironbelly",
      profession: "Ore Buyer",
      gameplayGroups: [
        "trade",
        "company"
      ],
      roleTags: [
        "ore",
        "mining",
        "bulk",
        "metal"
      ],
      marketFlavor: "mine exchange",
      voiceDirection: "gruff, exact, respects heavy loads",
      tradePersonality: "bulk ore buyer who judges rock like character",
      shortStory: "Rusk can tell a mine is lying by the dust on a cart. He pays fairly for honest ore and poorly for pretty excuses. He supports ore trading, mining contracts, and metal supply.",
      visualIdentity: "A short massive dwarf ore buyer with dark umber skin, braided black beard, iron nose ring, heavy slate apron, and a cracked ore sample in one fist.",
      uniquenessTraits: [
        "short massive dwarf silhouette",
        "dark umber skin",
        "braided black beard",
        "iron nose ring",
        "slate apron"
      ],
      professionProps: [
        "ore sample",
        "weighing hook",
        "mine token"
      ],
      dominantColors: [
        "slate",
        "iron",
        "umber"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-082",
      identityAnchor: "same person as character-082: short massive dwarf silhouette, dark umber skin, braided black beard, iron nose ring, slate apron, ore buyer, dwarf, ore sample",
      portraitBasePrompt: "A short massive dwarf ore buyer with dark umber skin, braided black beard, iron nose ring, heavy slate apron, and a cracked ore sample in one fist. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "mine cave-in demand",
        "bad ore dispute",
        "metal shortage"
      ],
      integrationNotes: "Mining/metal core contact.",
      ancestryOrSpecies: "dwarf",
      magicalTraits: []
    },
    {
      characterId: "character-083",
      rosterGroup: "supporting_cast",
      runtimeIndex: 34,
      catalogKey: null,
      finalDisplayName: "Lumi Starling",
      profession: "Songbird Seller",
      gameplayGroups: [
        "trade",
        "collector_specialist"
      ],
      roleTags: [
        "birds",
        "luxury",
        "pets",
        "festival"
      ],
      marketFlavor: "bird cage balcony",
      voiceDirection: "musical, delicate, ruthless about cages",
      tradePersonality: "pet seller who trades in sound and status",
      shortStory: "Lumi says a songbird is the only luxury that complains when neglected. She can imitate every bird she sells and several customers she dislikes. She supports pets, luxury goods, and festival song events.",
      visualIdentity: "A petite birdfolk woman with soft golden feathers along her temples, bright black eyes, layered sky-blue cape, and a tiny round cage held safely at chest height.",
      uniquenessTraits: [
        "petite birdfolk silhouette",
        "gold feather temples",
        "black eyes",
        "sky-blue cape",
        "tiny cage"
      ],
      professionProps: [
        "songbird cage",
        "seed pouch",
        "whistle charm"
      ],
      dominantColors: [
        "sky blue",
        "gold",
        "cream"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-083",
      identityAnchor: "same person as character-083: petite birdfolk silhouette, gold feather temples, black eyes, sky-blue cape, tiny cage, songbird seller, birdfolk, songbird cage",
      portraitBasePrompt: "A petite birdfolk woman with soft golden feathers along her temples, bright black eyes, layered sky-blue cape, and a tiny round cage held safely at chest height. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "missing songbird",
        "noble cage order",
        "festival chorus"
      ],
      integrationNotes: "Luxury pet merchant.",
      ancestryOrSpecies: "birdfolk",
      magicalTraits: []
    },
    {
      characterId: "character-084",
      rosterGroup: "supporting_cast",
      runtimeIndex: 35,
      catalogKey: null,
      finalDisplayName: "Marek Saltfront",
      profession: "Pickle Seller",
      gameplayGroups: [
        "trade"
      ],
      roleTags: [
        "preserved_food",
        "salt",
        "barrels",
        "food"
      ],
      marketFlavor: "barrel corner",
      voiceDirection: "sour, witty, never trusts fresh enthusiasm",
      tradePersonality: "preserved-food trader who loves patience",
      shortStory: "Marek believes anything worth eating can survive a winter in brine. He keeps a barrel for every mood and names the angriest pickles after tax collectors. He supports preserved foods, salt, barrels, and winter supply.",
      visualIdentity: "A narrow-faced human pickle seller with sea-tanned skin, sharp grey eyes, green-stained apron, salt-white moustache, and a small pickle barrel tucked under one arm.",
      uniquenessTraits: [
        "narrow sour silhouette",
        "salt-white moustache",
        "sharp grey eyes",
        "green-stained apron",
        "small barrel"
      ],
      professionProps: [
        "pickle barrel",
        "wooden fork",
        "salt pouch"
      ],
      dominantColors: [
        "pickle green",
        "salt white",
        "barrel brown"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-084",
      identityAnchor: "same person as character-084: narrow sour silhouette, salt-white moustache, sharp grey eyes, green-stained apron, small barrel, pickle seller, human, pickle barrel",
      portraitBasePrompt: "A narrow-faced human pickle seller with sea-tanned skin, sharp grey eyes, green-stained apron, salt-white moustache, and a small pickle barrel tucked under one arm. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "salt shortage",
        "spoiled barrel",
        "winter stockpile"
      ],
      integrationNotes: "Preserved food trade merchant.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "character-085",
      rosterGroup: "supporting_cast",
      runtimeIndex: 36,
      catalogKey: null,
      finalDisplayName: "Imri Lockspoke",
      profession: "Locksmith",
      gameplayGroups: [
        "trade",
        "risk_crime"
      ],
      roleTags: [
        "locks",
        "keys",
        "security",
        "crime"
      ],
      marketFlavor: "keyhole alley",
      voiceDirection: "soft, precise, refuses to ask why",
      tradePersonality: "security seller who charges for discretion",
      shortStory: "Imri sells locks to honest merchants and better locks to dishonest ones. He recognizes every key he has ever cut by weight in the dark. He supports security, warehouse upgrades, theft risk, and discreet crime hooks.",
      visualIdentity: "A slender tiefling locksmith with bronze skin, tiny curled horns, violet eyes, black gloves, and a fan of delicate keys across one palm.",
      uniquenessTraits: [
        "slender tiefling silhouette",
        "bronze skin",
        "tiny curled horns",
        "violet eyes",
        "black gloves",
        "key fan"
      ],
      professionProps: [
        "fan of keys",
        "lockpick case",
        "tiny padlock"
      ],
      dominantColors: [
        "bronze",
        "violet",
        "black"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-085",
      identityAnchor: "same person as character-085: slender tiefling silhouette, bronze skin, tiny curled horns, violet eyes, black gloves, locksmith, tiefling, fan of keys",
      portraitBasePrompt: "A slender tiefling locksmith with bronze skin, tiny curled horns, violet eyes, black gloves, and a fan of delicate keys across one palm. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "warehouse lock upgrade",
        "stolen key mold",
        "silent entry rumor"
      ],
      integrationNotes: "Security/risk core contact.",
      ancestryOrSpecies: "tiefling",
      magicalTraits: [
        "faint violet glow in keyholes"
      ]
    },
    {
      characterId: "character-086",
      rosterGroup: "supporting_cast",
      runtimeIndex: 37,
      catalogKey: null,
      finalDisplayName: "Bela Fernstep",
      profession: "Goatherd Trader",
      gameplayGroups: [
        "trade",
        "travel"
      ],
      roleTags: [
        "animals",
        "milk",
        "farm",
        "rural"
      ],
      marketFlavor: "hill path market",
      voiceDirection: "merry, stubborn, smells faintly of hay",
      tradePersonality: "rural supplier who trades in milk, cheese, and trouble",
      shortStory: "Bela brings goats to market and leaves with gossip, coin, and one fewer argument than she started with. Her goats have better route sense than some caravan guards. She supports dairy, animals, rural trade, and travel rumors.",
      visualIdentity: "A freckled human goatherd with sun-browned skin, tangled auburn hair, green patched cloak, and a carved goat bell necklace.",
      uniquenessTraits: [
        "freckled rural silhouette",
        "auburn hair",
        "patched green cloak",
        "goat bell necklace",
        "sun-browned skin"
      ],
      professionProps: [
        "goat bell",
        "cheese cloth",
        "small crook"
      ],
      dominantColors: [
        "green",
        "auburn",
        "cream"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-086",
      identityAnchor: "same person as character-086: freckled rural silhouette, auburn hair, patched green cloak, goat bell necklace, sun-browned skin, goatherd trader, human, goat bell",
      portraitBasePrompt: "A freckled human goatherd with sun-browned skin, tangled auburn hair, green patched cloak, and a carved goat bell necklace. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "missing goat",
        "cheese delivery",
        "hill route rumor"
      ],
      integrationNotes: "Rural animal merchant.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "character-087",
      rosterGroup: "supporting_cast",
      runtimeIndex: 38,
      catalogKey: null,
      finalDisplayName: "Nax Twocopper",
      profession: "Street Peddler",
      gameplayGroups: [
        "trade",
        "risk_crime"
      ],
      roleTags: [
        "small_goods",
        "street",
        "rumor_source",
        "cheap_goods"
      ],
      marketFlavor: "alley blanket stall",
      voiceDirection: "fast, funny, slippery with facts",
      tradePersonality: "cheap-goods seller who knows every pocket economy",
      shortStory: "Nax sells buttons, charms, bent spoons, and occasionally truth if the price is funny enough. He can vanish his blanket faster than guards can say license. He supports cheap goods, rumors, and low-level contraband.",
      visualIdentity: "A tiny ratfolk peddler with brown fur, bright bead eyes, patched yellow scarf, many little satchels, and a grin full of market math.",
      uniquenessTraits: [
        "tiny ratfolk silhouette",
        "brown fur",
        "bead eyes",
        "yellow scarf",
        "many satchels",
        "mischievous grin"
      ],
      professionProps: [
        "button tray",
        "cheap charms",
        "folding blanket"
      ],
      dominantColors: [
        "yellow",
        "brown",
        "brass"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-087",
      identityAnchor: "same person as character-087: tiny ratfolk silhouette, brown fur, bead eyes, yellow scarf, many satchels, street peddler, ratfolk, button tray",
      portraitBasePrompt: "A tiny ratfolk peddler with brown fur, bright bead eyes, patched yellow scarf, many little satchels, and a grin full of market math. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "illegal charm rumor",
        "lost button box",
        "guard license chase"
      ],
      integrationNotes: "Street/trinket core contact.",
      ancestryOrSpecies: "ratfolk",
      magicalTraits: []
    },
    {
      characterId: "character-088",
      rosterGroup: "supporting_cast",
      runtimeIndex: 39,
      catalogKey: null,
      finalDisplayName: "Thera Quillglass",
      profession: "Map Copyist",
      gameplayGroups: [
        "travel",
        "market_service"
      ],
      roleTags: [
        "maps",
        "scribe",
        "travel",
        "information"
      ],
      marketFlavor: "map alcove",
      voiceDirection: "patient, dry, obsessed with clean margins",
      tradePersonality: "information trader who sells certainty one line at a time",
      shortStory: "Thera copies maps by hand and leaves tiny flowers where roads are likely to kill fools. She dislikes adventurers who fold maps badly. She supports route previews, maps, and information goods.",
      visualIdentity: "A calm human map copyist with dark olive skin, short silver bob, rectangular spectacles, ink-smudged fingers, and a rolled map tube under one arm.",
      uniquenessTraits: [
        "calm precise silhouette",
        "short silver bob",
        "rectangular spectacles",
        "ink-smudged fingers",
        "map tube"
      ],
      professionProps: [
        "rolled map tube",
        "ink pen",
        "compass charm"
      ],
      dominantColors: [
        "map tan",
        "silver",
        "dark olive"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-088",
      identityAnchor: "same person as character-088: calm precise silhouette, short silver bob, rectangular spectacles, ink-smudged fingers, map tube, map copyist, human, rolled map tube",
      portraitBasePrompt: "A calm human map copyist with dark olive skin, short silver bob, rectangular spectacles, ink-smudged fingers, and a rolled map tube under one arm. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "wrong map correction",
        "secret pass copy",
        "ink shortage"
      ],
      integrationNotes: "Map/travel information merchant.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "character-089",
      rosterGroup: "supporting_cast",
      runtimeIndex: 40,
      catalogKey: null,
      finalDisplayName: "Ula Flintseed",
      profession: "Seed Merchant",
      gameplayGroups: [
        "trade",
        "quest"
      ],
      roleTags: [
        "seeds",
        "farm",
        "garden",
        "future_supply"
      ],
      marketFlavor: "spring market",
      voiceDirection: "patient, hopeful, judges greed by planting depth",
      tradePersonality: "farm supplier who sells next season not today",
      shortStory: "Ula sells seeds with instructions, warnings, and unwanted moral advice. She remembers which farmers paid late and which shared harvest during famine. She supports farm goods, seasonal planning, and garden quests.",
      visualIdentity: "An elderly halfling seed merchant with dark wrinkled skin, snow-white curls, sunflower cloak clasp, and many labeled seed envelopes fan-shaped in her hands.",
      uniquenessTraits: [
        "elderly halfling silhouette",
        "snow-white curls",
        "sunflower clasp",
        "seed envelope fan",
        "dark wrinkled skin"
      ],
      professionProps: [
        "seed envelopes",
        "tiny trowel",
        "cloth seed pouch"
      ],
      dominantColors: [
        "sunflower yellow",
        "soil brown",
        "cream"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-089",
      identityAnchor: "same person as character-089: elderly halfling silhouette, snow-white curls, sunflower clasp, seed envelope fan, dark wrinkled skin, seed merchant, halfling, seed envelopes",
      portraitBasePrompt: "An elderly halfling seed merchant with dark wrinkled skin, snow-white curls, sunflower cloak clasp, and many labeled seed envelopes fan-shaped in her hands. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "rare seed swap",
        "bad harvest warning",
        "garden request"
      ],
      integrationNotes: "Farm supply merchant.",
      ancestryOrSpecies: "halfling",
      magicalTraits: []
    },
    {
      characterId: "character-090",
      rosterGroup: "supporting_cast",
      runtimeIndex: 41,
      catalogKey: null,
      finalDisplayName: "Varek Crowmask",
      profession: "Mask Carver",
      gameplayGroups: [
        "trade",
        "guild_noble"
      ],
      roleTags: [
        "masks",
        "festival",
        "woodcraft",
        "luxury"
      ],
      marketFlavor: "festival lane",
      voiceDirection: "theatrical, soft, unsettlingly observant",
      tradePersonality: "festival maker who sells faces and secrets",
      shortStory: "Varek carves masks for weddings, funerals, plays, and people who need to be someone else by dusk. He recognizes customers by how they choose to hide. He supports festivals, disguises, and social quests.",
      visualIdentity: "A tall crowfolk mask carver with glossy black feather hair, long narrow nose, dark cloak, carved half-mask at his belt, and wood shavings on his sleeves.",
      uniquenessTraits: [
        "tall crowfolk silhouette",
        "black feather hair",
        "long narrow nose",
        "dark cloak",
        "half-mask belt"
      ],
      professionProps: [
        "carved mask",
        "tiny carving knife",
        "wood shavings"
      ],
      dominantColors: [
        "black",
        "wood brown",
        "ivory"
      ],
      expressionTier: "merchant",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        },
        {
          expression: "happy",
          actingDirection: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
          promptDelta: "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
        },
        {
          expression: "suspicious",
          actingDirection: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
          promptDelta: "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-090",
      identityAnchor: "same person as character-090: tall crowfolk silhouette, black feather hair, long narrow nose, dark cloak, half-mask belt, mask carver, crowfolk, carved mask",
      portraitBasePrompt: "A tall crowfolk mask carver with glossy black feather hair, long narrow nose, dark cloak, carved half-mask at his belt, and wood shavings on his sleeves. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "missing festival mask",
        "disguise request",
        "haunted mask rumor"
      ],
      integrationNotes: "Festival/disguise merchant.",
      ancestryOrSpecies: "crowfolk",
      magicalTraits: []
    },
    {
      characterId: "character-091",
      rosterGroup: "supporting_cast",
      runtimeIndex: 42,
      catalogKey: null,
      finalDisplayName: "Nell Copperbloom",
      profession: "Market Sweeper",
      gameplayGroups: [
        "market_service"
      ],
      roleTags: [
        "market_service",
        "cleaning",
        "rumor_source"
      ],
      marketFlavor: "market square",
      voiceDirection: "quiet, observant, humble",
      tradePersonality: "minor market worker who notices what falls between stalls",
      shortStory: "Nell sweeps before sunrise and finds more secrets than dirt. She knows which stalls leak coins and which customers drop letters when frightened.",
      visualIdentity: "A small elderly woman with copper skin, grey bun, patched brown shawl, and a twig broom decorated with blue ribbons.",
      uniquenessTraits: [
        "small elderly silhouette",
        "grey bun",
        "patched shawl",
        "twig broom",
        "blue ribbons"
      ],
      professionProps: [
        "twig broom",
        "dustpan",
        "blue ribbons"
      ],
      dominantColors: [
        "brown",
        "blue",
        "copper"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-091",
      identityAnchor: "same person as character-091: small elderly silhouette, grey bun, patched shawl, twig broom, blue ribbons, market sweeper, human, twig broom",
      portraitBasePrompt: "A small elderly woman with copper skin, grey bun, patched brown shawl, and a twig broom decorated with blue ribbons. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "lost letter",
        "market gossip"
      ],
      integrationNotes: "Minor rumor/service NPC.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "character-092",
      rosterGroup: "supporting_cast",
      runtimeIndex: 43,
      catalogKey: null,
      finalDisplayName: "Pim Hollowcheek",
      profession: "Rat Catcher",
      gameplayGroups: [
        "risk_crime",
        "market_service"
      ],
      roleTags: [
        "pest_control",
        "street",
        "rumor_source"
      ],
      marketFlavor: "warehouse drains",
      voiceDirection: "cheerful in places others avoid",
      tradePersonality: "minor service worker who hears cellar stories",
      shortStory: "Pim knows every drain by smell and every warehouse by its rats. He is paid to remove pests and accidentally removes secrets too.",
      visualIdentity: "A lanky pale youth with hollow cheeks, huge grin, patched oilskin hood, and a little cage of sleepy rats.",
      uniquenessTraits: [
        "lanky pale silhouette",
        "hollow cheeks",
        "oilskin hood",
        "rat cage"
      ],
      professionProps: [
        "rat cage",
        "short hook",
        "oilskin pouch"
      ],
      dominantColors: [
        "oil grey",
        "pale cream",
        "rust"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-092",
      identityAnchor: "same person as character-092: lanky pale silhouette, hollow cheeks, oilskin hood, rat cage, rat catcher, human, rat cage",
      portraitBasePrompt: "A lanky pale youth with hollow cheeks, huge grin, patched oilskin hood, and a little cage of sleepy rats. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "cellar route",
        "warehouse rats"
      ],
      integrationNotes: "Minor risk/service NPC.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "character-093",
      rosterGroup: "supporting_cast",
      runtimeIndex: 44,
      catalogKey: null,
      finalDisplayName: "Sola Bellfern",
      profession: "Courier Child",
      gameplayGroups: [
        "travel",
        "quest"
      ],
      roleTags: [
        "courier",
        "message",
        "street"
      ],
      marketFlavor: "post steps",
      voiceDirection: "fast, proud, impatient",
      tradePersonality: "minor message runner who knows shortcuts",
      shortStory: "Sola runs messages faster than horses can turn in the old streets. She saves every broken seal as proof adults are slow.",
      visualIdentity: "A wiry teen girl with brown skin, bright yellow scarf, cropped curls, running satchel, and mud on both knees.",
      uniquenessTraits: [
        "wiry teen silhouette",
        "yellow scarf",
        "cropped curls",
        "running satchel"
      ],
      professionProps: [
        "message satchel",
        "sealed note",
        "little whistle"
      ],
      dominantColors: [
        "yellow",
        "mud brown",
        "red wax"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-093",
      identityAnchor: "same person as character-093: wiry teen silhouette, yellow scarf, cropped curls, running satchel, courier child, human, message satchel",
      portraitBasePrompt: "A wiry teen girl with brown skin, bright yellow scarf, cropped curls, running satchel, and mud on both knees. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "urgent note",
        "shortcut rumor"
      ],
      integrationNotes: "Minor courier NPC.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "character-094",
      rosterGroup: "supporting_cast",
      runtimeIndex: 45,
      catalogKey: null,
      finalDisplayName: "Brindle Mossback",
      profession: "Stable Hand",
      gameplayGroups: [
        "travel",
        "market_service"
      ],
      roleTags: [
        "stable",
        "animals",
        "travel"
      ],
      marketFlavor: "stable yard",
      voiceDirection: "sleepy, animal-wise, dislikes loud coins",
      tradePersonality: "minor animal worker who calms mounts",
      shortStory: "Brindle can quiet a panicked horse with one hum and a carrot. He rarely speaks to people unless they are blocking the feed bin.",
      visualIdentity: "A gentle half-ogre stable hand with mossy green skin, sleepy eyes, straw in hair, and a soft horse brush held carefully.",
      uniquenessTraits: [
        "gentle half-ogre silhouette",
        "moss green skin",
        "sleepy eyes",
        "straw hair"
      ],
      professionProps: [
        "horse brush",
        "feed scoop",
        "halter"
      ],
      dominantColors: [
        "moss green",
        "straw",
        "leather"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-094",
      identityAnchor: "same person as character-094: gentle half-ogre silhouette, moss green skin, sleepy eyes, straw hair, stable hand, half-ogre, horse brush",
      portraitBasePrompt: "A gentle half-ogre stable hand with mossy green skin, sleepy eyes, straw in hair, and a soft horse brush held carefully. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "sick mule",
        "stable rumor"
      ],
      integrationNotes: "Minor travel/stable NPC.",
      ancestryOrSpecies: "half-ogre",
      magicalTraits: []
    },
    {
      characterId: "character-095",
      rosterGroup: "supporting_cast",
      runtimeIndex: 46,
      catalogKey: null,
      finalDisplayName: "Etti Goldpin",
      profession: "Button Seller",
      gameplayGroups: [
        "trade"
      ],
      roleTags: [
        "buttons",
        "small_goods",
        "cloth"
      ],
      marketFlavor: "needle stall",
      voiceDirection: "tiny, bright, exacting",
      tradePersonality: "minor small-goods seller who knows fashion scraps",
      shortStory: "Etti sells buttons like they are family jewels and can match a noble coat from one missing clasp. She speaks quickly and forgives slowly.",
      visualIdentity: "A tiny gnome woman with warm beige skin, pink spectacles, enormous hat pinned with buttons, and a tray of shining clasps.",
      uniquenessTraits: [
        "tiny gnome silhouette",
        "pink spectacles",
        "button hat",
        "shining clasp tray"
      ],
      professionProps: [
        "button tray",
        "tiny pincushion",
        "thread spool"
      ],
      dominantColors: [
        "pink",
        "gold",
        "cream"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-095",
      identityAnchor: "same person as character-095: tiny gnome silhouette, pink spectacles, button hat, shining clasp tray, button seller, gnome, button tray",
      portraitBasePrompt: "A tiny gnome woman with warm beige skin, pink spectacles, enormous hat pinned with buttons, and a tray of shining clasps. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "lost clasp",
        "button shortage"
      ],
      integrationNotes: "Minor cloth/small goods NPC.",
      ancestryOrSpecies: "gnome",
      magicalTraits: []
    },
    {
      characterId: "character-096",
      rosterGroup: "supporting_cast",
      runtimeIndex: 47,
      catalogKey: null,
      finalDisplayName: "Rallo Turnipnose",
      profession: "Turnip Crier",
      gameplayGroups: [
        "trade"
      ],
      roleTags: [
        "vegetables",
        "food",
        "street_vendor"
      ],
      marketFlavor: "produce corner",
      voiceDirection: "loud, comic, strangely persuasive",
      tradePersonality: "minor food vendor who makes cheap goods memorable",
      shortStory: "Rallo shouts about turnips as if announcing royalty. People buy from him because refusing feels like insulting a vegetable hero.",
      visualIdentity: "A round red-nosed man with curly brown hair, patched green coat, and a heroic bunch of turnips held like flowers.",
      uniquenessTraits: [
        "round comic silhouette",
        "red nose",
        "green coat",
        "turnip bouquet"
      ],
      professionProps: [
        "turnip bunch",
        "price slate",
        "small bell"
      ],
      dominantColors: [
        "green",
        "turnip white",
        "red"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-096",
      identityAnchor: "same person as character-096: round comic silhouette, red nose, green coat, turnip bouquet, turnip crier, human, turnip bunch",
      portraitBasePrompt: "A round red-nosed man with curly brown hair, patched green coat, and a heroic bunch of turnips held like flowers. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "turnip surplus",
        "street joke"
      ],
      integrationNotes: "Minor food vendor.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "character-097",
      rosterGroup: "supporting_cast",
      runtimeIndex: 48,
      catalogKey: null,
      finalDisplayName: "Miri Softstep",
      profession: "Laundry Girl",
      gameplayGroups: [
        "market_service",
        "quest"
      ],
      roleTags: [
        "laundry",
        "cloth",
        "rumor_source"
      ],
      marketFlavor: "wash steps",
      voiceDirection: "gentle, practical, knows stains and scandals",
      tradePersonality: "minor worker who sees what people try to wash away",
      shortStory: "Miri can name a stain before it dries and a lie before it is finished. She keeps secrets unless they smell dangerous.",
      visualIdentity: "A slim young woman with deep umber skin, white head wrap, rolled sleeves, and a basket of bright wet cloth.",
      uniquenessTraits: [
        "slim worker silhouette",
        "white head wrap",
        "rolled sleeves",
        "wet cloth basket"
      ],
      professionProps: [
        "laundry basket",
        "soap stone",
        "clothespins"
      ],
      dominantColors: [
        "white",
        "blue",
        "umber"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-097",
      identityAnchor: "same person as character-097: slim worker silhouette, white head wrap, rolled sleeves, wet cloth basket, laundry girl, human, laundry basket",
      portraitBasePrompt: "A slim young woman with deep umber skin, white head wrap, rolled sleeves, and a basket of bright wet cloth. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "bloodstained shirt",
        "missing linens"
      ],
      integrationNotes: "Minor service/rumor NPC.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "character-098",
      rosterGroup: "supporting_cast",
      runtimeIndex: 49,
      catalogKey: null,
      finalDisplayName: "Dox Lintwhistle",
      profession: "Toy Mender",
      gameplayGroups: [
        "trade",
        "quest"
      ],
      roleTags: [
        "toys",
        "repair",
        "children",
        "woodcraft"
      ],
      marketFlavor: "fountain nook",
      voiceDirection: "sweet, eccentric, oddly wise",
      tradePersonality: "minor repairer who turns scraps into wonder",
      shortStory: "Dox repairs toys for children who pay in buttons and adults who pretend not to care. He hides clever mechanisms in silly ducks.",
      visualIdentity: "A small elderly goblin with mint skin, wild white hair, purple vest, and a wooden duck puppet on one hand.",
      uniquenessTraits: [
        "small goblin silhouette",
        "mint skin",
        "wild white hair",
        "purple vest",
        "duck puppet"
      ],
      professionProps: [
        "wooden duck puppet",
        "tiny tools",
        "toy wheel"
      ],
      dominantColors: [
        "purple",
        "mint",
        "wood"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-098",
      identityAnchor: "same person as character-098: small goblin silhouette, mint skin, wild white hair, purple vest, duck puppet, toy mender, goblin, wooden duck puppet",
      portraitBasePrompt: "A small elderly goblin with mint skin, wild white hair, purple vest, and a wooden duck puppet on one hand. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "broken toy",
        "hidden mechanism"
      ],
      integrationNotes: "Minor repair/craft NPC.",
      ancestryOrSpecies: "goblin",
      magicalTraits: []
    },
    {
      characterId: "character-099",
      rosterGroup: "supporting_cast",
      runtimeIndex: 50,
      catalogKey: null,
      finalDisplayName: "Kara Roofsalt",
      profession: "Gull Keeper",
      gameplayGroups: [
        "travel",
        "quest"
      ],
      roleTags: [
        "birds",
        "dock",
        "message",
        "rumor_source"
      ],
      marketFlavor: "harbor roof",
      voiceDirection: "sharp, windburned, laughs like a gull",
      tradePersonality: "minor dock worker who sends messages by bird",
      shortStory: "Kara feeds gulls on rooftops and claims they bring better news than people. The birds obey her because she cheats at crumbs.",
      visualIdentity: "A windburned woman with cropped silver hair, blue scarf, leather glove, and a white gull perched on her forearm.",
      uniquenessTraits: [
        "windburned silhouette",
        "cropped silver hair",
        "blue scarf",
        "gull glove"
      ],
      professionProps: [
        "white gull",
        "leather glove",
        "message tube"
      ],
      dominantColors: [
        "blue",
        "white",
        "leather"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-099",
      identityAnchor: "same person as character-099: windburned silhouette, cropped silver hair, blue scarf, gull glove, gull keeper, human, white gull",
      portraitBasePrompt: "A windburned woman with cropped silver hair, blue scarf, leather glove, and a white gull perched on her forearm. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "bird message",
        "dock warning"
      ],
      integrationNotes: "Minor port message NPC.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "character-100",
      rosterGroup: "supporting_cast",
      runtimeIndex: 51,
      catalogKey: null,
      finalDisplayName: "Omi Claythumb",
      profession: "Brick Carrier",
      gameplayGroups: [
        "company",
        "market_service"
      ],
      roleTags: [
        "construction",
        "labor",
        "warehouse"
      ],
      marketFlavor: "building yard",
      voiceDirection: "strong, shy, proud of straight walls",
      tradePersonality: "minor labor NPC for construction and warehouse flavor",
      shortStory: "Omi carries bricks all day and arranges them straighter than some masons lay them. She dreams of designing a wall nobody can break.",
      visualIdentity: "A muscular young woman with clay-red skin, shaved sides, thick arms, grey work tunic, and two bricks held safely against her chest.",
      uniquenessTraits: [
        "muscular silhouette",
        "clay-red skin",
        "shaved sides",
        "thick arms",
        "grey tunic"
      ],
      professionProps: [
        "two bricks",
        "work gloves",
        "chalk mark"
      ],
      dominantColors: [
        "clay red",
        "grey",
        "white"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-100",
      identityAnchor: "same person as character-100: muscular silhouette, clay-red skin, shaved sides, thick arms, grey tunic, brick carrier, earth-touched human, two bricks",
      portraitBasePrompt: "A muscular young woman with clay-red skin, shaved sides, thick arms, grey work tunic, and two bricks held safely against her chest. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "warehouse repair",
        "wall design"
      ],
      integrationNotes: "Minor construction/company NPC.",
      ancestryOrSpecies: "earth-touched human",
      magicalTraits: [
        "subtle stone freckles"
      ]
    },
    {
      characterId: "character-101",
      rosterGroup: "supporting_cast",
      runtimeIndex: 52,
      catalogKey: null,
      finalDisplayName: "Fennel Quickpurse",
      profession: "Coin Washer",
      gameplayGroups: [
        "market_service",
        "risk_crime"
      ],
      roleTags: [
        "coins",
        "market_service",
        "crime_hint"
      ],
      marketFlavor: "coin fountain",
      voiceDirection: "smiling, slippery, plausible",
      tradePersonality: "minor coin worker who spots bad money",
      shortStory: "Fennel cleans old coins in the fountain and somehow always knows which purse they came from. He is either harmless or very good at looking harmless.",
      visualIdentity: "A thin ratfolk with tawny fur, neat blue vest, bright eyes, and a little bowl of shining coins.",
      uniquenessTraits: [
        "thin ratfolk silhouette",
        "tawny fur",
        "blue vest",
        "coin bowl"
      ],
      professionProps: [
        "coin bowl",
        "small brush",
        "cloth rag"
      ],
      dominantColors: [
        "blue",
        "coin gold",
        "tawny"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-101",
      identityAnchor: "same person as character-101: thin ratfolk silhouette, tawny fur, blue vest, coin bowl, coin washer, ratfolk, coin bowl",
      portraitBasePrompt: "A thin ratfolk with tawny fur, neat blue vest, bright eyes, and a little bowl of shining coins. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "fake coin",
        "lost purse"
      ],
      integrationNotes: "Minor money/risk NPC.",
      ancestryOrSpecies: "ratfolk",
      magicalTraits: []
    },
    {
      characterId: "character-102",
      rosterGroup: "supporting_cast",
      runtimeIndex: 53,
      catalogKey: null,
      finalDisplayName: "Asha Noonveil",
      profession: "Pilgrim Seller",
      gameplayGroups: [
        "trade",
        "quest"
      ],
      roleTags: [
        "religious",
        "charms",
        "travel"
      ],
      marketFlavor: "pilgrim steps",
      voiceDirection: "calm, sun-warmed, speaks in blessings and prices",
      tradePersonality: "minor religious traveler selling charms",
      shortStory: "Asha sells road charms to pilgrims and never promises safety, only courage. She has walked every shrine road and remembers where shade is scarce.",
      visualIdentity: "A sun-browned woman with white veil, amber eyes, simple ochre robe, and a string of small prayer charms.",
      uniquenessTraits: [
        "sun-browned silhouette",
        "white veil",
        "amber eyes",
        "ochre robe",
        "prayer charms"
      ],
      professionProps: [
        "prayer charms",
        "travel staff token",
        "small pouch"
      ],
      dominantColors: [
        "white",
        "ochre",
        "amber"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "character-102",
      identityAnchor: "same person as character-102: sun-browned silhouette, white veil, amber eyes, ochre robe, prayer charms, pilgrim seller, human, prayer charms",
      portraitBasePrompt: "A sun-browned woman with white veil, amber eyes, simple ochre robe, and a string of small prayer charms. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "pilgrim route",
        "missing charm"
      ],
      integrationNotes: "Minor religious/travel NPC.",
      ancestryOrSpecies: "human",
      magicalTraits: [
        "soft sun-halo charm glint"
      ]
    }
  ]
} satisfies CharacterIdentityCatalogBatch;

export const characterIdentityCatalogCastBatch03PortraitImageCount = getIdentityBatchPortraitImageCount(characterIdentityCatalogCastBatch03);
