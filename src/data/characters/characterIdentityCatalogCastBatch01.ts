import type { CharacterIdentityCatalogBatch } from "./characterIdentityTypes";
import { getIdentityBatchPortraitImageCount } from "./characterIdentityTypes";

const sharedPortraitStyle = "ultra-readable stylized medieval fantasy merchant game portrait, polished painterly-cartoon PC RPG UI art, three-quarter bust portrait, clear face, expressive eyes, collectible NPC portrait, clean silhouette, soft warm daylight, simple pure green background #00FF00 for cropping, generous padding around head and shoulders";
const sharedNegativePrompt = "no text, no labels, no watermark, no UI frame, no border, no duplicated face, no extra limbs, no photorealism, no modern clothes, no sci-fi, no generic identical medieval NPC face, no cropped head, no busy background";

export const characterIdentityCatalogCastBatch01 = {
  batchId: "identity-catalog-cast-batch-001",
  status: "profile_locked",
  rosterScope: "First 16 primary cast characters: trade, travel, market service, collector, law, customs, and risk contacts.",
  portraitGenerationAllowed: false,
  notes: [
    "This is a catalog profile batch, not the final portrait manifest.",
    "Portrait work stays locked until every final character identity and image manifest is reviewed.",
    "The matching prompt-plan JSON under docs/assets/character-prompts supports catalog review only and does not mark the full portrait set ready for generation.",
  ],
  identities: [
    {
        "characterId": "character-001",
        "rosterGroup": "primary_cast",
        "runtimeIndex": null,
        "catalogKey": "character-001",
        "finalDisplayName": "Mirella Brasscall",
        "profession": "Auctioneer",
        "gameplayGroups": [
            "trade",
            "market_service"
        ],
        "roleTags": [
            "auctioneer",
            "market",
            "trade",
            "price_signal",
            "rare_lots"
        ],
        "marketFlavor": "capital auction hall",
        "voiceDirection": "commanding, theatrical, fast-talking, never sloppy",
        "tradePersonality": "theatrical price setter who turns scarcity into spectacle",
        "shortStory": "Mirella runs the noon auction like a duel, ringing her brass bell before hesitant bidders can breathe. She grew up copying estate ledgers for nobles and learned exactly how greed sounds when it tries to sound polite. She is useful for rare lots, festival auctions, and price-rumor events because she knows who is pretending poverty and who is secretly flush with coin.",
        "visualIdentity": "A tall olive-skinned auctioneer with a severe black braid pulled tight behind sharp cheekbones, long red wax-stained fingers, a burgundy sleeveless auction coat over parchment sleeves, and a polished brass hand bell held like a weapon.",
        "uniquenessTraits": [
            "tall ringing silhouette",
            "olive skin",
            "severe black braid",
            "sharp cheekbones",
            "long wax-stained fingers",
            "burgundy sleeveless auction coat",
            "brass hand bell",
            "parchment sleeves"
        ],
        "professionProps": [
            "brass hand bell",
            "sealed bid cards",
            "wax-stained ledger"
        ],
        "dominantColors": [
            "burgundy",
            "brass",
            "parchment"
        ],
        "expressionTier": "major",
        "plannedExpressions": [
            {
                "expression": "neutral",
                "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
                "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
            },
            {
                "expression": "happy",
                "actingDirection": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
                "promptDelta": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
            },
            {
                "expression": "suspicious",
                "actingDirection": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
                "promptDelta": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
            },
            {
                "expression": "worried",
                "actingDirection": "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged",
                "promptDelta": "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged"
            },
            {
                "expression": "angry",
                "actingDirection": "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged",
                "promptDelta": "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged"
            }
        ],
        "portraitFilePrefix": "character-001",
        "identityAnchor": "same person as character-001: tall olive-skinned auctioneer, severe black braid, sharp cheekbones, red wax-stained long fingers, burgundy auction coat, parchment sleeves, brass hand bell, commanding smile",
        "portraitBasePrompt": "A tall olive-skinned woman auctioneer with a severe black braid, sharp cheekbones, long fingers stained red with sealing wax, burgundy sleeveless auction coat over parchment sleeves, polished brass hand bell, sealed bid cards tucked at her belt, posture like a stage commander. ultra-readable stylized medieval fantasy merchant game portrait, polished painterly-cartoon PC RPG UI art, three-quarter bust portrait, clear face, expressive eyes, collectible NPC portrait, clean silhouette, soft warm daylight, simple pure green background #00FF00 for cropping, generous padding around head and shoulders",
        "negativePrompt": "no text, no labels, no watermark, no UI frame, no border, no duplicated face, no extra limbs, no photorealism, no modern clothes, no sci-fi, no generic identical medieval NPC face, no cropped head, no busy background",
        "questHooks": [
            "estate auction shortage",
            "noble buyer rivalry",
            "rare lot appraisal"
        ],
        "integrationNotes": "High-value market contact for auctions, price rumors, and rare item sales."
    },
    {
        "characterId": "character-002",
        "rosterGroup": "primary_cast",
        "runtimeIndex": null,
        "catalogKey": "character-002",
        "finalDisplayName": "Orren Scale-Eye",
        "profession": "Appraiser",
        "gameplayGroups": [
            "trade",
            "market_service"
        ],
        "roleTags": [
            "appraiser",
            "valuation",
            "item_quality",
            "counterfeit_check"
        ],
        "marketFlavor": "old city appraisal stall",
        "voiceDirection": "quiet, dry, exact, mildly insulting when impressed",
        "tradePersonality": "cold precise evaluator who rewards proof and maker marks",
        "shortStory": "Orren once judged tribute for a king and still weighs a cracked cup as if a throne depends on it. He never praises an item directly; the closest he comes is a single raised eyebrow and a slightly less cruel offer. He is the natural face for appraisal, item-quality hints, counterfeit warnings, and rare maker-mark quests.",
        "visualIdentity": "A short elderly appraiser with pale freckled skin, a square jaw, cloudy blue eyes behind round green glass lenses, and a dark apron sewn with rows of tiny labeled pockets.",
        "uniquenessTraits": [
            "short square build",
            "elder",
            "pale freckled skin",
            "cloudy blue eyes",
            "round green glass lenses",
            "square jaw",
            "dark pocketed apron",
            "tiny brass scale"
        ],
        "professionProps": [
            "tiny brass scale",
            "green glass lens",
            "marked appraisal tags"
        ],
        "dominantColors": [
            "dark green",
            "aged brass",
            "cream"
        ],
        "expressionTier": "merchant",
        "plannedExpressions": [
            {
                "expression": "neutral",
                "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
                "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
            },
            {
                "expression": "happy",
                "actingDirection": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
                "promptDelta": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
            },
            {
                "expression": "suspicious",
                "actingDirection": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
                "promptDelta": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
            }
        ],
        "portraitFilePrefix": "character-002",
        "identityAnchor": "same person as character-002: short elderly appraiser, square jaw, pale freckles, cloudy blue eyes, round green glass lenses, dark pocketed apron, tiny brass scale, severe patience",
        "portraitBasePrompt": "A short square elderly appraiser with pale freckled skin, square jaw, cloudy blue eyes behind round green glass lenses, a dark apron covered in tiny pockets, tiny brass scale raised near his chest, expression of severe patience. ultra-readable stylized medieval fantasy merchant game portrait, polished painterly-cartoon PC RPG UI art, three-quarter bust portrait, clear face, expressive eyes, collectible NPC portrait, clean silhouette, soft warm daylight, simple pure green background #00FF00 for cropping, generous padding around head and shoulders",
        "negativePrompt": "no text, no labels, no watermark, no UI frame, no border, no duplicated face, no extra limbs, no photorealism, no modern clothes, no sci-fi, no generic identical medieval NPC face, no cropped head, no busy background",
        "questHooks": [
            "counterfeit warning",
            "rare metal check",
            "hidden maker mark"
        ],
        "integrationNotes": "Trade-support NPC for Ask Price, item quality, and appraisal UI."
    },
    {
        "characterId": "character-003",
        "rosterGroup": "primary_cast",
        "runtimeIndex": null,
        "catalogKey": "character-003",
        "finalDisplayName": "Basko Fencrate",
        "profession": "Bulk Goods Broker",
        "gameplayGroups": [
            "trade",
            "company"
        ],
        "roleTags": [
            "bulk",
            "wholesale",
            "market",
            "supplier",
            "warehouse_turnover"
        ],
        "marketFlavor": "warehouse row",
        "voiceDirection": "booming, practical, amused by tiny orders",
        "tradePersonality": "bulk discount haggler who thinks in cartloads",
        "shortStory": "Basko buys by the cartload and laughs at anyone who asks for three onions. His real talent is sensing surplus before the market admits prices are about to fall. He gives the player a strong reason to think in quantity, warehouse turnover, and bulk delivery contracts.",
        "visualIdentity": "A broad barrel-chested broker with deep brown skin, close-cropped curls, patched ochre vest, rope belt hung with wooden counting tiles, and a crate hook resting across one shoulder.",
        "uniquenessTraits": [
            "broad barrel chest",
            "deep brown skin",
            "close-cropped curls",
            "patched ochre vest",
            "rope belt",
            "wooden counting tiles",
            "heavy relaxed stance"
        ],
        "professionProps": [
            "wooden counting tiles",
            "crate hook",
            "bulk order slate"
        ],
        "dominantColors": [
            "ochre",
            "rope tan",
            "dark brown"
        ],
        "expressionTier": "merchant",
        "plannedExpressions": [
            {
                "expression": "neutral",
                "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
                "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
            },
            {
                "expression": "happy",
                "actingDirection": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
                "promptDelta": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
            },
            {
                "expression": "suspicious",
                "actingDirection": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
                "promptDelta": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
            }
        ],
        "portraitFilePrefix": "character-003",
        "identityAnchor": "same person as character-003: barrel-chested broker, deep brown skin, close-cropped curls, patched ochre vest, rope belt with wooden counting tiles, crate hook, heavy confident posture",
        "portraitBasePrompt": "A broad barrel-chested bulk goods broker with deep brown skin, close-cropped curls, patched ochre vest, rope belt hung with wooden counting tiles, crate hook over one shoulder, confident warehouse-row posture. ultra-readable stylized medieval fantasy merchant game portrait, polished painterly-cartoon PC RPG UI art, three-quarter bust portrait, clear face, expressive eyes, collectible NPC portrait, clean silhouette, soft warm daylight, simple pure green background #00FF00 for cropping, generous padding around head and shoulders",
        "negativePrompt": "no text, no labels, no watermark, no UI frame, no border, no duplicated face, no extra limbs, no photorealism, no modern clothes, no sci-fi, no generic identical medieval NPC face, no cropped head, no busy background",
        "questHooks": [
            "oversupply tip",
            "warehouse clearance",
            "bulk delivery job"
        ],
        "integrationNotes": "Wholesale/bulk contact for warehouse economy and large trade lots."
    },
    {
        "characterId": "character-004",
        "rosterGroup": "primary_cast",
        "runtimeIndex": null,
        "catalogKey": "character-004",
        "finalDisplayName": "Saffra Moonlock",
        "profession": "Rare Item Collector",
        "gameplayGroups": [
            "collector_specialist",
            "quest"
        ],
        "roleTags": [
            "collector",
            "luxury",
            "rare_goods",
            "quest_giver",
            "rumor_buyer"
        ],
        "marketFlavor": "quiet collector salon",
        "voiceDirection": "soft, hungry for stories, elegant but unstable when denied",
        "tradePersonality": "obsessive collector who pays for provenance as much as value",
        "shortStory": "Saffra collects objects with stories more than objects with value. She will pay absurdly for a cracked relic if the rumor attached to it is strange enough, then refuse a flawless jewel that bores her. She creates rare-item sinks, collection quests, cursed-good rumors, and rival collector tension.",
        "visualIdentity": "A thin young rare-item collector with warm golden-brown skin, crescent earrings, a midnight-blue scarf, silver rings on every finger, wide restless eyes, and elegant hands always hovering near a velvet specimen pouch.",
        "uniquenessTraits": [
            "thin jeweled silhouette",
            "young adult",
            "warm golden-brown skin",
            "crescent earrings",
            "midnight-blue scarf",
            "many silver rings",
            "wide restless eyes",
            "nervous elegant hands"
        ],
        "professionProps": [
            "velvet specimen pouch",
            "silver rings",
            "catalog of rumors"
        ],
        "dominantColors": [
            "midnight blue",
            "silver",
            "violet"
        ],
        "expressionTier": "major",
        "plannedExpressions": [
            {
                "expression": "neutral",
                "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
                "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
            },
            {
                "expression": "happy",
                "actingDirection": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
                "promptDelta": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
            },
            {
                "expression": "suspicious",
                "actingDirection": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
                "promptDelta": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
            },
            {
                "expression": "worried",
                "actingDirection": "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged",
                "promptDelta": "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged"
            },
            {
                "expression": "angry",
                "actingDirection": "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged",
                "promptDelta": "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged"
            }
        ],
        "portraitFilePrefix": "character-004",
        "identityAnchor": "same person as character-004: thin young collector, warm golden-brown skin, crescent earrings, midnight-blue scarf, many silver rings, wide restless eyes, nervous elegant hands, velvet specimen pouch",
        "portraitBasePrompt": "A thin young rare item collector with warm golden-brown skin, crescent earrings, midnight-blue scarf, silver rings on every finger, wide restless eyes, elegant nervous hands around a velvet specimen pouch and tiny rumor catalog. ultra-readable stylized medieval fantasy merchant game portrait, polished painterly-cartoon PC RPG UI art, three-quarter bust portrait, clear face, expressive eyes, collectible NPC portrait, clean silhouette, soft warm daylight, simple pure green background #00FF00 for cropping, generous padding around head and shoulders",
        "negativePrompt": "no text, no labels, no watermark, no UI frame, no border, no duplicated face, no extra limbs, no photorealism, no modern clothes, no sci-fi, no generic identical medieval NPC face, no cropped head, no busy background",
        "questHooks": [
            "wants named relic",
            "collects cursed goods",
            "rival collector"
        ],
        "integrationNotes": "Rare-item sink and quest giver for named relics, luxury goods, and rumors."
    },
    {
        "characterId": "character-005",
        "rosterGroup": "primary_cast",
        "runtimeIndex": null,
        "catalogKey": "character-005",
        "finalDisplayName": "Joryn Crackbox",
        "profession": "Damaged Goods Dealer",
        "gameplayGroups": [
            "trade"
        ],
        "roleTags": [
            "damaged_goods",
            "bargain",
            "repair",
            "salvage"
        ],
        "marketFlavor": "back-lane repair cart",
        "voiceDirection": "quick, crooked, joking when cornered",
        "tradePersonality": "risk-taking bargain hunter who sells almost-useful things",
        "shortStory": "Joryn makes money from things other merchants are embarrassed to display. Half his stock is broken, the other half is misunderstood, and he insists the difference is negotiable. He is useful for damaged goods, salvage contracts, repair hooks, and weird bargain events.",
        "visualIdentity": "A wiry young damaged-goods dealer with tawny skin, uneven shoulders, a crooked grin, messy copper hair, and a patched leather satchel spilling bent hinges, cracked buckles, and chipped cups.",
        "uniquenessTraits": [
            "wiry lopsided body",
            "tawny skin",
            "uneven shoulders",
            "crooked grin",
            "messy copper hair",
            "patched leather satchel",
            "bent hinges and chipped cups"
        ],
        "professionProps": [
            "patched satchel",
            "repair twine",
            "cracked sample box"
        ],
        "dominantColors": [
            "copper",
            "patched leather",
            "dusty teal"
        ],
        "expressionTier": "merchant",
        "plannedExpressions": [
            {
                "expression": "neutral",
                "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
                "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
            },
            {
                "expression": "happy",
                "actingDirection": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
                "promptDelta": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
            },
            {
                "expression": "suspicious",
                "actingDirection": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
                "promptDelta": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
            }
        ],
        "portraitFilePrefix": "character-005",
        "identityAnchor": "same person as character-005: wiry lopsided damaged goods dealer, tawny skin, crooked grin, messy copper hair, uneven shoulders, patched leather satchel, bent hinges and chipped cups",
        "portraitBasePrompt": "A wiry lopsided young damaged-goods dealer with tawny skin, uneven shoulders, crooked grin, messy copper hair, patched leather satchel spilling bent hinges and chipped cups, bargain-cart energy. ultra-readable stylized medieval fantasy merchant game portrait, polished painterly-cartoon PC RPG UI art, three-quarter bust portrait, clear face, expressive eyes, collectible NPC portrait, clean silhouette, soft warm daylight, simple pure green background #00FF00 for cropping, generous padding around head and shoulders",
        "negativePrompt": "no text, no labels, no watermark, no UI frame, no border, no duplicated face, no extra limbs, no photorealism, no modern clothes, no sci-fi, no generic identical medieval NPC face, no cropped head, no busy background",
        "questHooks": [
            "repairable shipment",
            "mispriced goods",
            "salvage contract"
        ],
        "integrationNotes": "Discount/damaged goods NPC for later quality, salvage, and repair systems."
    },
    {
        "characterId": "character-006",
        "rosterGroup": "primary_cast",
        "runtimeIndex": null,
        "catalogKey": "character-006",
        "finalDisplayName": "Helva Quaystamp",
        "profession": "Import Export Clerk",
        "gameplayGroups": [
            "trade",
            "travel",
            "market_service"
        ],
        "roleTags": [
            "customs",
            "imports",
            "paperwork",
            "tariffs",
            "origin_marks"
        ],
        "marketFlavor": "port office",
        "voiceDirection": "polite, exact, dangerous when lied to",
        "tradePersonality": "lawful but flexible clerk who sells paperwork clarity",
        "shortStory": "Helva knows every stamped crate that crosses the docks, plus most crates that should have been stamped but were not. She is polite until someone lies about origin marks. She ties imports, tariffs, customs, legality, and port-flavored route events together.",
        "visualIdentity": "A narrow upright import-export clerk with dark umber skin, crisp teal collar, silver-threaded hair wrapped under a small cap, ink-stained thumbs, and a stack of stamped dock papers tucked beneath one arm.",
        "uniquenessTraits": [
            "upright narrow posture",
            "dark umber skin",
            "crisp teal collar",
            "silver-threaded hair under cap",
            "ink-stained thumbs",
            "stack of stamped dock papers"
        ],
        "professionProps": [
            "origin stamps",
            "dock papers",
            "ink pad"
        ],
        "dominantColors": [
            "teal",
            "silver",
            "ink black"
        ],
        "expressionTier": "major",
        "plannedExpressions": [
            {
                "expression": "neutral",
                "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
                "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
            },
            {
                "expression": "happy",
                "actingDirection": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
                "promptDelta": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
            },
            {
                "expression": "suspicious",
                "actingDirection": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
                "promptDelta": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
            },
            {
                "expression": "worried",
                "actingDirection": "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged",
                "promptDelta": "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged"
            },
            {
                "expression": "angry",
                "actingDirection": "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged",
                "promptDelta": "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged"
            }
        ],
        "portraitFilePrefix": "character-006",
        "identityAnchor": "same person as character-006: narrow upright import export clerk, dark umber skin, crisp teal collar, silver-threaded hair under cap, ink-stained thumbs, stamped dock papers, controlled polite stare",
        "portraitBasePrompt": "A narrow upright import-export clerk with dark umber skin, crisp teal collar, silver-threaded hair under a small cap, ink-stained thumbs, stack of stamped dock papers, origin stamps and ink pad visible. ultra-readable stylized medieval fantasy merchant game portrait, polished painterly-cartoon PC RPG UI art, three-quarter bust portrait, clear face, expressive eyes, collectible NPC portrait, clean silhouette, soft warm daylight, simple pure green background #00FF00 for cropping, generous padding around head and shoulders",
        "negativePrompt": "no text, no labels, no watermark, no UI frame, no border, no duplicated face, no extra limbs, no photorealism, no modern clothes, no sci-fi, no generic identical medieval NPC face, no cropped head, no busy background",
        "questHooks": [
            "origin paperwork",
            "import fee dispute",
            "lost customs stamp"
        ],
        "integrationNotes": "Customs/tariff NPC for port trade, route legality, and paperwork events."
    },
    {
        "characterId": "character-007",
        "rosterGroup": "primary_cast",
        "runtimeIndex": null,
        "catalogKey": "character-007",
        "finalDisplayName": "Pella Brightspoon",
        "profession": "Festival Trader",
        "gameplayGroups": [
            "trade",
            "quest"
        ],
        "roleTags": [
            "festival",
            "seasonal",
            "food",
            "rumor_source",
            "temporary_market"
        ],
        "marketFlavor": "festival square",
        "voiceDirection": "bright, fast, crowd-loving, secretly observant",
        "tradePersonality": "cheerful opportunist who profits from crowds and shortages",
        "shortStory": "Pella appears wherever a crowd is hungry and disappears before cleanup begins. She remembers which festival goods sell because every stain on her apron has a story. She adds seasonal demand, festival rumors, and temporary market opportunities.",
        "visualIdentity": "A round young festival trader with rosy-brown skin, sparkling eyes, a yellow scarf, embroidered apron, tiny bells tied to her sleeves, and a tray of sugared nut cones.",
        "uniquenessTraits": [
            "round animated silhouette",
            "rosy-brown skin",
            "sparkling eyes",
            "yellow scarf",
            "embroidered apron",
            "tiny sleeve bells",
            "festival tray"
        ],
        "professionProps": [
            "festival tray",
            "sleeve bells",
            "sugared nut cones"
        ],
        "dominantColors": [
            "yellow",
            "red",
            "cream"
        ],
        "expressionTier": "merchant",
        "plannedExpressions": [
            {
                "expression": "neutral",
                "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
                "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
            },
            {
                "expression": "happy",
                "actingDirection": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
                "promptDelta": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
            },
            {
                "expression": "suspicious",
                "actingDirection": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
                "promptDelta": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
            }
        ],
        "portraitFilePrefix": "character-007",
        "identityAnchor": "same person as character-007: round animated festival trader, rosy-brown skin, sparkling eyes, yellow scarf, embroidered apron, tiny sleeve bells, sugared nut tray, cheerful crowd-ready smile",
        "portraitBasePrompt": "A round animated festival trader with rosy-brown skin, sparkling eyes, yellow scarf, embroidered apron, tiny bells tied to sleeves, tray of sugared nut cones, bright crowd-ready smile. ultra-readable stylized medieval fantasy merchant game portrait, polished painterly-cartoon PC RPG UI art, three-quarter bust portrait, clear face, expressive eyes, collectible NPC portrait, clean silhouette, soft warm daylight, simple pure green background #00FF00 for cropping, generous padding around head and shoulders",
        "negativePrompt": "no text, no labels, no watermark, no UI frame, no border, no duplicated face, no extra limbs, no photorealism, no modern clothes, no sci-fi, no generic identical medieval NPC face, no cropped head, no busy background",
        "questHooks": [
            "seasonal demand",
            "festival shortage",
            "crowd rumor"
        ],
        "integrationNotes": "Seasonal/festival NPC for temporary demand and event-driven market flavor."
    },
    {
        "characterId": "character-008",
        "rosterGroup": "primary_cast",
        "runtimeIndex": null,
        "catalogKey": "character-008",
        "finalDisplayName": "Davin Ledgerhook",
        "profession": "Market Inspector",
        "gameplayGroups": [
            "market_service",
            "risk_crime"
        ],
        "roleTags": [
            "inspection",
            "law",
            "market",
            "anti_fraud",
            "permit_check"
        ],
        "marketFlavor": "central bazaar",
        "voiceDirection": "quiet, severe, devastatingly specific",
        "tradePersonality": "strict compliance haggler who weaponizes arithmetic",
        "shortStory": "Davin does not shout; he writes. Merchants fear his quiet notes more than a guard’s spear because fines arrive with perfect arithmetic. He supports anti-fraud events, illegal scale checks, permit problems, and law-abiding market pressure.",
        "visualIdentity": "A lean severe market inspector with light brown skin, close-shaven head, angular nose, stiff charcoal coat, and a hooked metal stylus chained to his wrist beside a book of seal tags.",
        "uniquenessTraits": [
            "lean severe silhouette",
            "light brown skin",
            "close-shaven head",
            "angular nose",
            "stiff charcoal coat",
            "hooked metal stylus chained to wrist",
            "seal tags"
        ],
        "professionProps": [
            "chained stylus",
            "inspection ledger",
            "seal tags"
        ],
        "dominantColors": [
            "charcoal",
            "steel",
            "red wax"
        ],
        "expressionTier": "major",
        "plannedExpressions": [
            {
                "expression": "neutral",
                "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
                "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
            },
            {
                "expression": "happy",
                "actingDirection": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
                "promptDelta": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
            },
            {
                "expression": "suspicious",
                "actingDirection": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
                "promptDelta": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
            },
            {
                "expression": "worried",
                "actingDirection": "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged",
                "promptDelta": "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged"
            },
            {
                "expression": "angry",
                "actingDirection": "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged",
                "promptDelta": "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged"
            }
        ],
        "portraitFilePrefix": "character-008",
        "identityAnchor": "same person as character-008: lean severe market inspector, light brown skin, close-shaven head, angular nose, stiff charcoal coat, chained hooked stylus, seal tags, controlled suspicious stare",
        "portraitBasePrompt": "A lean severe market inspector with light brown skin, close-shaven head, angular nose, stiff charcoal coat, hooked metal stylus chained to wrist, inspection ledger and seal tags held close. ultra-readable stylized medieval fantasy merchant game portrait, polished painterly-cartoon PC RPG UI art, three-quarter bust portrait, clear face, expressive eyes, collectible NPC portrait, clean silhouette, soft warm daylight, simple pure green background #00FF00 for cropping, generous padding around head and shoulders",
        "negativePrompt": "no text, no labels, no watermark, no UI frame, no border, no duplicated face, no extra limbs, no photorealism, no modern clothes, no sci-fi, no generic identical medieval NPC face, no cropped head, no busy background",
        "questHooks": [
            "fraud inspection",
            "illegal scale check",
            "market permit"
        ],
        "integrationNotes": "Law/inspection NPC for trade legality, fraud warnings, and market permits."
    },
    {
        "characterId": "character-009",
        "rosterGroup": "primary_cast",
        "runtimeIndex": null,
        "catalogKey": "character-009",
        "finalDisplayName": "Kesta Far-Ridge",
        "profession": "Route Scout",
        "gameplayGroups": [
            "travel",
            "risk_crime"
        ],
        "roleTags": [
            "route_scout",
            "travel",
            "risk",
            "rumor_source",
            "shortcut"
        ],
        "marketFlavor": "border road camp",
        "voiceDirection": "plain-spoken, clipped, allergic to exaggeration",
        "tradePersonality": "practical risk reader who sells warnings before comfort",
        "shortStory": "Kesta walks roads before caravans dare to name them safe. She sells warnings in plain words and never discounts a bad feeling. She is the face of travel risk previews, shortcut rumors, ambush warnings, and missing mile markers.",
        "visualIdentity": "A small weather-bitten route scout with copper-brown skin, sun-cracked lips, short black hair, a faded green hood, muddy boots, and a map case strapped across her chest.",
        "uniquenessTraits": [
            "small weather-bitten build",
            "copper-brown skin",
            "sun-cracked lips",
            "short black hair",
            "faded green hood",
            "map case across chest",
            "muddy boots"
        ],
        "professionProps": [
            "map case",
            "trail tokens",
            "muddy boots"
        ],
        "dominantColors": [
            "faded green",
            "dust brown",
            "sun tan"
        ],
        "expressionTier": "major",
        "plannedExpressions": [
            {
                "expression": "neutral",
                "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
                "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
            },
            {
                "expression": "happy",
                "actingDirection": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
                "promptDelta": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
            },
            {
                "expression": "suspicious",
                "actingDirection": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
                "promptDelta": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
            },
            {
                "expression": "worried",
                "actingDirection": "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged",
                "promptDelta": "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged"
            },
            {
                "expression": "angry",
                "actingDirection": "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged",
                "promptDelta": "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged"
            }
        ],
        "portraitFilePrefix": "character-009",
        "identityAnchor": "same person as character-009: small weather-bitten route scout, copper-brown skin, sun-cracked lips, short black hair, faded green hood, map case across chest, muddy boots, alert narrowed eyes",
        "portraitBasePrompt": "A small weather-bitten route scout with copper-brown skin, sun-cracked lips, short black hair, faded green hood, map case strapped across chest, muddy boots, alert narrowed eyes and trail tokens. ultra-readable stylized medieval fantasy merchant game portrait, polished painterly-cartoon PC RPG UI art, three-quarter bust portrait, clear face, expressive eyes, collectible NPC portrait, clean silhouette, soft warm daylight, simple pure green background #00FF00 for cropping, generous padding around head and shoulders",
        "negativePrompt": "no text, no labels, no watermark, no UI frame, no border, no duplicated face, no extra limbs, no photorealism, no modern clothes, no sci-fi, no generic identical medieval NPC face, no cropped head, no busy background",
        "questHooks": [
            "route ambush warning",
            "safe shortcut",
            "missing mile marker"
        ],
        "integrationNotes": "Travel-risk NPC for route previews, rumors, shortcuts, and ambush warnings."
    },
    {
        "characterId": "character-010",
        "rosterGroup": "primary_cast",
        "runtimeIndex": null,
        "catalogKey": "character-010",
        "finalDisplayName": "Brann Oxweather",
        "profession": "Caravan Captain",
        "gameplayGroups": [
            "travel",
            "company"
        ],
        "roleTags": [
            "caravan",
            "guard",
            "travel",
            "bulk",
            "escort"
        ],
        "marketFlavor": "caravan yard",
        "voiceDirection": "slow, calm, heavy with old road memory",
        "tradePersonality": "steady convoy negotiator who values reliability over charm",
        "shortStory": "Brann has lost wagons, friends, and one thumb, but never a caravan under contract. He trusts weather signs more than promises from nobles and sleeps badly when horses go quiet. He anchors convoy travel, escort jobs, weather advice, and route safety UI.",
        "visualIdentity": "A massive elderly caravan captain with dark bronze skin, one missing thumb, white beard braided into three cords, heavy red travel cloak pinned with iron route badges, and mountain-calm posture.",
        "uniquenessTraits": [
            "massive calm silhouette",
            "elder",
            "dark bronze skin",
            "missing thumb",
            "white beard in three braids",
            "heavy red travel cloak",
            "iron route badges"
        ],
        "professionProps": [
            "iron route badges",
            "wagon tally board",
            "heavy travel cloak"
        ],
        "dominantColors": [
            "deep red",
            "iron",
            "sand"
        ],
        "expressionTier": "major",
        "plannedExpressions": [
            {
                "expression": "neutral",
                "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
                "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
            },
            {
                "expression": "happy",
                "actingDirection": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
                "promptDelta": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
            },
            {
                "expression": "suspicious",
                "actingDirection": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
                "promptDelta": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
            },
            {
                "expression": "worried",
                "actingDirection": "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged",
                "promptDelta": "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged"
            },
            {
                "expression": "angry",
                "actingDirection": "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged",
                "promptDelta": "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged"
            }
        ],
        "portraitFilePrefix": "character-010",
        "identityAnchor": "same person as character-010: massive elderly caravan captain, dark bronze skin, missing thumb, white beard in three braids, heavy red travel cloak, iron route badges, calm mountain-like posture",
        "portraitBasePrompt": "A massive elderly caravan captain with dark bronze skin, one missing thumb visible, white beard braided into three cords, heavy red travel cloak pinned with iron route badges, wagon tally board at his side. ultra-readable stylized medieval fantasy merchant game portrait, polished painterly-cartoon PC RPG UI art, three-quarter bust portrait, clear face, expressive eyes, collectible NPC portrait, clean silhouette, soft warm daylight, simple pure green background #00FF00 for cropping, generous padding around head and shoulders",
        "negativePrompt": "no text, no labels, no watermark, no UI frame, no border, no duplicated face, no extra limbs, no photorealism, no modern clothes, no sci-fi, no generic identical medieval NPC face, no cropped head, no busy background",
        "questHooks": [
            "escort contract",
            "delayed caravan",
            "weather route advice"
        ],
        "integrationNotes": "Convoy/escort NPC for travel safety, caravan jobs, and bulk route planning."
    },
    {
        "characterId": "character-011",
        "rosterGroup": "primary_cast",
        "runtimeIndex": null,
        "catalogKey": "character-011",
        "finalDisplayName": "Nilo Gatecoin",
        "profession": "Toll Officer",
        "gameplayGroups": [
            "travel",
            "market_service"
        ],
        "roleTags": [
            "toll",
            "law",
            "travel",
            "money_sink",
            "bridge_fee"
        ],
        "marketFlavor": "stone toll gate",
        "voiceDirection": "oily, official, pleased by small fees",
        "tradePersonality": "bureaucratic toll collector with a fee for fairness",
        "shortStory": "Nilo remembers every unpaid toll by face, cart, and horse color. He claims fairness, but his definition of fairness has a fee schedule. He gives travel costs a human face through toll disputes, waivers, and bridge-fee scandals.",
        "visualIdentity": "A plump immaculate toll officer with fair skin, tiny curled moustache, lacquered blue cap, stiff cream gloves, and a polished coin abacus hanging from a spotless belt.",
        "uniquenessTraits": [
            "plump immaculate build",
            "fair skin",
            "tiny curled moustache",
            "lacquered blue cap",
            "stiff cream gloves",
            "polished coin abacus",
            "smug official posture"
        ],
        "professionProps": [
            "coin abacus",
            "toll tickets",
            "blue cap badge"
        ],
        "dominantColors": [
            "blue",
            "cream",
            "gold"
        ],
        "expressionTier": "merchant",
        "plannedExpressions": [
            {
                "expression": "neutral",
                "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
                "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
            },
            {
                "expression": "happy",
                "actingDirection": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
                "promptDelta": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
            },
            {
                "expression": "suspicious",
                "actingDirection": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
                "promptDelta": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
            }
        ],
        "portraitFilePrefix": "character-011",
        "identityAnchor": "same person as character-011: plump immaculate toll officer, fair skin, tiny curled moustache, lacquered blue cap, cream gloves, polished coin abacus, smug official posture",
        "portraitBasePrompt": "A plump immaculate toll officer with fair skin, tiny curled moustache, lacquered blue cap, stiff cream gloves, polished coin abacus at belt, toll tickets fanned in one hand. ultra-readable stylized medieval fantasy merchant game portrait, polished painterly-cartoon PC RPG UI art, three-quarter bust portrait, clear face, expressive eyes, collectible NPC portrait, clean silhouette, soft warm daylight, simple pure green background #00FF00 for cropping, generous padding around head and shoulders",
        "negativePrompt": "no text, no labels, no watermark, no UI frame, no border, no duplicated face, no extra limbs, no photorealism, no modern clothes, no sci-fi, no generic identical medieval NPC face, no cropped head, no busy background",
        "questHooks": [
            "toll dispute",
            "waiver papers",
            "bridge fee scandal"
        ],
        "integrationNotes": "Travel-cost NPC for toll events, waivers, and route money sinks."
    },
    {
        "characterId": "character-012",
        "rosterGroup": "primary_cast",
        "runtimeIndex": null,
        "catalogKey": "character-012",
        "finalDisplayName": "Arra Stonepassport",
        "profession": "Border Customs Guard",
        "gameplayGroups": [
            "travel",
            "risk_crime"
        ],
        "roleTags": [
            "customs",
            "guard",
            "border",
            "legality",
            "contraband_check"
        ],
        "marketFlavor": "border checkpoint",
        "voiceDirection": "flat, honest, impossible to charm quickly",
        "tradePersonality": "suspicious examiner who values clean papers and steady eyes",
        "shortStory": "Arra can spot contraband by the way a trader avoids looking at a saddlebag. She is honest, which makes smugglers hate her and honest merchants nervous. She supports legality warnings, border permits, confiscation events, and smuggler tips.",
        "visualIdentity": "A tall stone-faced border customs guard with deep mahogany skin, silver streaks at her temples, square shoulders, and a sand-colored uniform reinforced with dark leather plates.",
        "uniquenessTraits": [
            "tall stone-faced body",
            "deep mahogany skin",
            "silver streaks at temples",
            "square shoulders",
            "sand uniform",
            "dark leather plates",
            "inspection spear"
        ],
        "professionProps": [
            "inspection spear",
            "passport seals",
            "contraband hook"
        ],
        "dominantColors": [
            "sand",
            "dark leather",
            "silver"
        ],
        "expressionTier": "major",
        "plannedExpressions": [
            {
                "expression": "neutral",
                "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
                "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
            },
            {
                "expression": "happy",
                "actingDirection": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
                "promptDelta": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
            },
            {
                "expression": "suspicious",
                "actingDirection": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
                "promptDelta": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
            },
            {
                "expression": "worried",
                "actingDirection": "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged",
                "promptDelta": "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged"
            },
            {
                "expression": "angry",
                "actingDirection": "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged",
                "promptDelta": "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged"
            }
        ],
        "portraitFilePrefix": "character-012",
        "identityAnchor": "same person as character-012: tall stone-faced customs guard, deep mahogany skin, silver temple streaks, square shoulders, sand uniform with dark leather plates, inspection spear, piercing inspection stare",
        "portraitBasePrompt": "A tall stone-faced customs guard with deep mahogany skin, silver streaks at temples, square shoulders, sand-colored uniform reinforced with dark leather plates, inspection spear and passport seals. ultra-readable stylized medieval fantasy merchant game portrait, polished painterly-cartoon PC RPG UI art, three-quarter bust portrait, clear face, expressive eyes, collectible NPC portrait, clean silhouette, soft warm daylight, simple pure green background #00FF00 for cropping, generous padding around head and shoulders",
        "negativePrompt": "no text, no labels, no watermark, no UI frame, no border, no duplicated face, no extra limbs, no photorealism, no modern clothes, no sci-fi, no generic identical medieval NPC face, no cropped head, no busy background",
        "questHooks": [
            "confiscation event",
            "border permit",
            "smuggler tip"
        ],
        "integrationNotes": "Border/legal NPC for contraband checks, permits, and route risk."
    },
    {
        "characterId": "character-013",
        "rosterGroup": "primary_cast",
        "runtimeIndex": null,
        "catalogKey": "character-013",
        "finalDisplayName": "Tovin Hearthmile",
        "profession": "Roadside Innkeeper",
        "gameplayGroups": [
            "travel",
            "quest"
        ],
        "roleTags": [
            "inn",
            "travel",
            "food",
            "rest",
            "rumor_source"
        ],
        "marketFlavor": "roadside inn",
        "voiceDirection": "warm, tired, story-rich, protective of guests",
        "tradePersonality": "comfort seller who trades in soup, beds, and road rumors",
        "shortStory": "Tovin keeps soup hot for travelers who arrive with bad news on their boots. He hears enough road stories to know which routes are dangerous before officials admit it. He fits rest discounts, lost travelers, food demand, and rumor-based route warnings.",
        "visualIdentity": "A wide warm roadside innkeeper with ruddy skin, thick auburn beard, flour-dusted sleeves, patched brown waistcoat, and a copper ladle tucked at his belt like a sword.",
        "uniquenessTraits": [
            "wide warm build",
            "ruddy skin",
            "thick auburn beard",
            "flour-dusted sleeves",
            "patched brown waistcoat",
            "copper ladle like sword",
            "guest ledger"
        ],
        "professionProps": [
            "copper ladle",
            "guest ledger",
            "travel stew bowl"
        ],
        "dominantColors": [
            "brown",
            "copper",
            "warm cream"
        ],
        "expressionTier": "merchant",
        "plannedExpressions": [
            {
                "expression": "neutral",
                "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
                "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
            },
            {
                "expression": "happy",
                "actingDirection": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
                "promptDelta": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
            },
            {
                "expression": "suspicious",
                "actingDirection": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
                "promptDelta": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
            }
        ],
        "portraitFilePrefix": "character-013",
        "identityAnchor": "same person as character-013: wide warm roadside innkeeper, ruddy skin, thick auburn beard, flour-dusted sleeves, patched brown waistcoat, copper ladle at belt, welcoming tired smile",
        "portraitBasePrompt": "A wide warm roadside innkeeper with ruddy skin, thick auburn beard, flour-dusted sleeves, patched brown waistcoat, copper ladle tucked like a sword, guest ledger and steaming stew bowl nearby. ultra-readable stylized medieval fantasy merchant game portrait, polished painterly-cartoon PC RPG UI art, three-quarter bust portrait, clear face, expressive eyes, collectible NPC portrait, clean silhouette, soft warm daylight, simple pure green background #00FF00 for cropping, generous padding around head and shoulders",
        "negativePrompt": "no text, no labels, no watermark, no UI frame, no border, no duplicated face, no extra limbs, no photorealism, no modern clothes, no sci-fi, no generic identical medieval NPC face, no cropped head, no busy background",
        "questHooks": [
            "road rumor",
            "lost traveler",
            "rest discount"
        ],
        "integrationNotes": "Travel/rest NPC for road rumors, recovery, and food demand."
    },
    {
        "characterId": "character-014",
        "rosterGroup": "primary_cast",
        "runtimeIndex": null,
        "catalogKey": "character-014",
        "finalDisplayName": "Madu Long-Ear",
        "profession": "Pack Animal Trader",
        "gameplayGroups": [
            "travel",
            "company"
        ],
        "roleTags": [
            "animals",
            "capacity",
            "travel",
            "supplier",
            "cargo_upgrade"
        ],
        "marketFlavor": "animal yard",
        "voiceDirection": "patient, animal-focused, blunt about overloading",
        "tradePersonality": "capacity seller who trusts mules more than merchants",
        "shortStory": "Madu knows mules better than people and prefers their conversation. He sells carrying power, but he also notices which trader overloads animals before a bad road. He supports cargo-capacity upgrades, sick-animal quests, and overload warnings.",
        "visualIdentity": "A tall loose-limbed pack animal trader with dark skin, shaved head, long ears, faded orange sash, bits of straw stuck to a sleeveless work tunic, and a mule lead rope looped around one hand.",
        "uniquenessTraits": [
            "tall loose-limbed body",
            "dark skin",
            "shaved head",
            "long ears",
            "faded orange sash",
            "straw in sleeveless tunic",
            "mule lead rope"
        ],
        "professionProps": [
            "mule lead rope",
            "feed scoop",
            "capacity tags"
        ],
        "dominantColors": [
            "faded orange",
            "straw yellow",
            "earth brown"
        ],
        "expressionTier": "merchant",
        "plannedExpressions": [
            {
                "expression": "neutral",
                "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
                "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
            },
            {
                "expression": "happy",
                "actingDirection": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
                "promptDelta": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
            },
            {
                "expression": "suspicious",
                "actingDirection": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
                "promptDelta": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
            }
        ],
        "portraitFilePrefix": "character-014",
        "identityAnchor": "same person as character-014: tall loose-limbed pack animal trader, dark skin, shaved head, long ears, faded orange sash, straw in work tunic, mule lead rope, patient mule-wise eyes",
        "portraitBasePrompt": "A tall loose-limbed pack animal trader with dark skin, shaved head, long ears, faded orange sash, straw in sleeveless tunic, mule lead rope in one hand and capacity tags on belt. ultra-readable stylized medieval fantasy merchant game portrait, polished painterly-cartoon PC RPG UI art, three-quarter bust portrait, clear face, expressive eyes, collectible NPC portrait, clean silhouette, soft warm daylight, simple pure green background #00FF00 for cropping, generous padding around head and shoulders",
        "negativePrompt": "no text, no labels, no watermark, no UI frame, no border, no duplicated face, no extra limbs, no photorealism, no modern clothes, no sci-fi, no generic identical medieval NPC face, no cropped head, no busy background",
        "questHooks": [
            "pack animal sale",
            "overload warning",
            "sick mule cure"
        ],
        "integrationNotes": "Capacity/travel NPC for cargo upgrades and animal-based travel events."
    },
    {
        "characterId": "character-015",
        "rosterGroup": "primary_cast",
        "runtimeIndex": null,
        "catalogKey": "character-015",
        "finalDisplayName": "Suren Reedwake",
        "profession": "Ferry Master",
        "gameplayGroups": [
            "travel",
            "risk_crime"
        ],
        "roleTags": [
            "ferry",
            "river",
            "travel",
            "route",
            "secret_crossing"
        ],
        "marketFlavor": "river dock",
        "voiceDirection": "low, sparse, foggy, remembers everything",
        "tradePersonality": "quiet route gatekeeper who sells crossings and silence",
        "shortStory": "Suren ferries goods across the river even when fog makes the far bank vanish. He asks few questions, but remembers who crossed before a crime was discovered. He supports river tolls, route locks, secret crossings, and ferry disputes.",
        "visualIdentity": "A thin elderly ferry master with weathered tan skin, watery grey eyes, a reed hat, patched navy coat, and hands knotted like rope around a ferry pole.",
        "uniquenessTraits": [
            "thin reedlike silhouette",
            "elder",
            "weathered tan skin",
            "watery grey eyes",
            "reed hat",
            "patched navy coat",
            "rope-knotted hands",
            "ferry pole"
        ],
        "professionProps": [
            "ferry pole",
            "river token pouch",
            "reed hat"
        ],
        "dominantColors": [
            "navy",
            "reed tan",
            "grey"
        ],
        "expressionTier": "major",
        "plannedExpressions": [
            {
                "expression": "neutral",
                "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
                "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
            },
            {
                "expression": "happy",
                "actingDirection": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
                "promptDelta": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
            },
            {
                "expression": "suspicious",
                "actingDirection": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
                "promptDelta": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
            },
            {
                "expression": "worried",
                "actingDirection": "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged",
                "promptDelta": "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged"
            },
            {
                "expression": "angry",
                "actingDirection": "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged",
                "promptDelta": "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged"
            }
        ],
        "portraitFilePrefix": "character-015",
        "identityAnchor": "same person as character-015: thin elderly ferry master, weathered tan skin, watery grey eyes, reed hat, patched navy coat, rope-knotted hands, ferry pole, quiet foggy expression",
        "portraitBasePrompt": "A thin reedlike elderly ferry master with weathered tan skin, watery grey eyes, reed hat, patched navy coat, hands knotted like rope around a ferry pole, river token pouch at belt. ultra-readable stylized medieval fantasy merchant game portrait, polished painterly-cartoon PC RPG UI art, three-quarter bust portrait, clear face, expressive eyes, collectible NPC portrait, clean silhouette, soft warm daylight, simple pure green background #00FF00 for cropping, generous padding around head and shoulders",
        "negativePrompt": "no text, no labels, no watermark, no UI frame, no border, no duplicated face, no extra limbs, no photorealism, no modern clothes, no sci-fi, no generic identical medieval NPC face, no cropped head, no busy background",
        "questHooks": [
            "river closure",
            "secret crossing",
            "ferry fee dispute"
        ],
        "integrationNotes": "Route-lock NPC for river crossings, ferry costs, and stealth travel."
    },
    {
        "characterId": "character-016",
        "rosterGroup": "primary_cast",
        "runtimeIndex": null,
        "catalogKey": "character-016",
        "finalDisplayName": "Vaska LowLantern",
        "profession": "Smuggler Guide",
        "gameplayGroups": [
            "risk_crime",
            "travel"
        ],
        "roleTags": [
            "smuggler",
            "travel",
            "illegal",
            "risk",
            "hidden_route"
        ],
        "marketFlavor": "night road",
        "voiceDirection": "whispery, foxlike, playful until danger appears",
        "tradePersonality": "contraband-friendly guide who prices fear by moonlight",
        "shortStory": "Vaska knows goat paths that maps politely ignore. She charges more when the moon is bright and twice as much when the cargo smells like trouble. She enables illegal shortcuts, patrol tips, betrayal risks, and contraband travel options.",
        "visualIdentity": "A short shadowy smuggler guide with brown skin, sharp green eyes, a black hood lined in dull copper, and a lantern whose glass is painted half-dark.",
        "uniquenessTraits": [
            "short shadowy silhouette",
            "brown skin",
            "sharp green eyes",
            "black hood with dull copper lining",
            "half-dark painted lantern",
            "foxlike cautious posture"
        ],
        "professionProps": [
            "half-dark lantern",
            "hidden trail cord",
            "knife-length map"
        ],
        "dominantColors": [
            "black",
            "dull copper",
            "green"
        ],
        "expressionTier": "major",
        "plannedExpressions": [
            {
                "expression": "neutral",
                "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
                "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
            },
            {
                "expression": "happy",
                "actingDirection": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged",
                "promptDelta": "happy expression, genuine smile or profession-appropriate satisfaction, brighter eyes, identity anchors unchanged"
            },
            {
                "expression": "suspicious",
                "actingDirection": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged",
                "promptDelta": "suspicious expression, narrowed eyes, guarded mouth, slight backward lean, identity anchors unchanged"
            },
            {
                "expression": "worried",
                "actingDirection": "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged",
                "promptDelta": "worried expression, tense brow, compressed mouth, shoulders slightly raised, identity anchors unchanged"
            },
            {
                "expression": "angry",
                "actingDirection": "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged",
                "promptDelta": "angry expression, hard stare, tightened jaw, controlled anger, identity anchors unchanged"
            }
        ],
        "portraitFilePrefix": "character-016",
        "identityAnchor": "same person as character-016: short shadowy smuggler guide, brown skin, sharp green eyes, black hood with dull copper lining, half-dark painted lantern, foxlike cautious posture",
        "portraitBasePrompt": "A short shadowy smuggler guide with brown skin, sharp green eyes, black hood lined in dull copper, half-dark painted lantern held low, hidden trail cord and knife-length map visible. ultra-readable stylized medieval fantasy merchant game portrait, polished painterly-cartoon PC RPG UI art, three-quarter bust portrait, clear face, expressive eyes, collectible NPC portrait, clean silhouette, soft warm daylight, simple pure green background #00FF00 for cropping, generous padding around head and shoulders",
        "negativePrompt": "no text, no labels, no watermark, no UI frame, no border, no duplicated face, no extra limbs, no photorealism, no modern clothes, no sci-fi, no generic identical medieval NPC face, no cropped head, no busy background",
        "questHooks": [
            "illegal shortcut",
            "guard patrol tip",
            "betrayal risk"
        ],
        "integrationNotes": "Crime/travel NPC for illegal routes, smuggling, and risky shortcuts."
    },
  ],
} as const satisfies CharacterIdentityCatalogBatch;

export const characterIdentityCatalogCastBatch01Summary = {
  batchId: characterIdentityCatalogCastBatch01.batchId,
  characterCount: characterIdentityCatalogCastBatch01.identities.length,
  plannedPortraitImageCount: getIdentityBatchPortraitImageCount(characterIdentityCatalogCastBatch01),
  portraitGenerationAllowed: characterIdentityCatalogCastBatch01.portraitGenerationAllowed,
} as const;
