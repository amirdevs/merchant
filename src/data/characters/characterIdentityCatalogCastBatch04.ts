import type { CharacterIdentityCatalogBatch } from "./characterIdentityTypes";
import { getIdentityBatchPortraitImageCount } from "./characterIdentityTypes";

export const characterIdentityCatalogLegacyBatch02 = {
  batchId: "identity-catalog-legacy-batch-002",
  status: "portrait_generation_blocked",
  rosterScope: "Second 54 reworked legacy slots: original indexes 54-107, expanding market, dock, route, religious, company, and service identities while keeping generated indexes stable.",
  portraitGenerationAllowed: false,
  notes: [
    "This batch rewrites public-facing identity only; generated originalIndex values stay as stable mechanical anchors.",
    "Portrait generation stays blocked until every legacy identity batch and the final portrait manifest are complete.",
    "The JSON prompt sheets under docs/assets/character-prompts are final-layout manifests for later production, not a signal to generate before the full character set is ready."
  ],
  identities: [
    {
      characterId: "npc-legacy-054",
      source: "legacy_reworked",
      originalIndex: 54,
      seedId: null,
      finalDisplayName: "Varka Glasshook",
      profession: "Harbor Broker",
      gameplayGroups: [
        "trade",
        "travel",
        "company"
      ],
      roleTags: [
        "dock",
        "broker",
        "shipping",
        "sea_route",
        "bulk_supplier"
      ],
      marketFlavor: "storm harbor office",
      voiceDirection: "slick, laughing, always counting waves and debts",
      tradePersonality: "port broker who sells space before ships finish docking",
      shortStory: "Varka began as a rope runner and learned that the richest cargo is usually the one nobody can unload politely. She can arrange dock space, whisper about storms, or make an inconvenient crate vanish into legal paperwork. She gives the player hooks for port fees, overseas demand, and shipment trouble.",
      visualIdentity: "A tall sea-orc woman with moss-green skin, pearl nose ring, black braids threaded with shell coins, dark indigo dock coat, and a polished steel cargo hook worn like a noble cane.",
      uniquenessTraits: [
        "tall sea-orc silhouette",
        "moss-green skin",
        "pearl nose ring",
        "shell-coin braids",
        "dark indigo dock coat",
        "steel cargo hook"
      ],
      professionProps: [
        "steel cargo hook",
        "dock receipt roll",
        "shell coin chain"
      ],
      dominantColors: [
        "indigo",
        "pearl white",
        "sea green"
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
      portraitFilePrefix: "npc-legacy-054",
      identityAnchor: "same person as npc-legacy-054: tall sea-orc silhouette, moss-green skin, pearl nose ring, shell-coin braids, dark indigo dock coat, harbor broker, sea-orc, steel cargo hook",
      portraitBasePrompt: "A tall sea-orc woman with moss-green skin, pearl nose ring, black braids threaded with shell coins, dark indigo dock coat, and a polished steel cargo hook worn like a noble cane. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "missing crate",
        "storm dock auction",
        "foreign cargo permit"
      ],
      integrationNotes: "High-value port/shipment contact.",
      ancestryOrSpecies: "sea-orc",
      magicalTraits: [
        "faint tide-glow in shell coins"
      ]
    },
    {
      characterId: "npc-legacy-055",
      source: "legacy_reworked",
      originalIndex: 55,
      seedId: null,
      finalDisplayName: "Sister Caldra Waxveil",
      profession: "Relic Candle Seller",
      gameplayGroups: [
        "trade",
        "quest",
        "guild_noble"
      ],
      roleTags: [
        "religious",
        "relics",
        "candles",
        "rumor_source",
        "pilgrim"
      ],
      marketFlavor: "shrine candle court",
      voiceDirection: "soft, ceremonial, sharper than incense smoke",
      tradePersonality: "devotional seller who prices belief, guilt, and rare wax",
      shortStory: "Caldra tends the shrine candles and knows whose prayers burn too quickly. She buys clean beeswax, relic boxes, and pilgrimage charms while pretending not to hear confessions traded in the candle smoke. She supports relic contracts, pilgrim demand, and moral-choice rumors.",
      visualIdentity: "A serene moon-touched woman with warm bronze skin, silver lashes, pale eyes like candle flame, layered ivory veil, blue prayer beads, and a tray of glowing votive candles.",
      uniquenessTraits: [
        "serene moon-touched silhouette",
        "bronze skin",
        "silver lashes",
        "pale candle eyes",
        "ivory veil",
        "blue prayer beads"
      ],
      professionProps: [
        "glowing votive tray",
        "prayer beads",
        "sealed relic box"
      ],
      dominantColors: [
        "ivory",
        "candle gold",
        "deep blue"
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
      portraitFilePrefix: "npc-legacy-055",
      identityAnchor: "same person as npc-legacy-055: serene moon-touched silhouette, bronze skin, silver lashes, pale candle eyes, ivory veil, relic candle seller, moon-touched human, glowing votive tray",
      portraitBasePrompt: "A serene moon-touched woman with warm bronze skin, silver lashes, pale eyes like candle flame, layered ivory veil, blue prayer beads, and a tray of glowing votive candles. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "stolen reliquary",
        "pilgrim shortage",
        "forbidden confession"
      ],
      integrationNotes: "Religious market and relic-demand anchor.",
      ancestryOrSpecies: "moon-touched human",
      magicalTraits: [
        "soft silver crescent mark on brow",
        "tiny candlelight motes"
      ]
    },
    {
      characterId: "npc-legacy-056",
      source: "legacy_reworked",
      originalIndex: 56,
      seedId: null,
      finalDisplayName: "Damon Redledger",
      profession: "Debt Collector",
      gameplayGroups: [
        "company",
        "risk_crime",
        "quest"
      ],
      roleTags: [
        "debt",
        "loan",
        "company",
        "risk",
        "collector"
      ],
      marketFlavor: "counting house back room",
      voiceDirection: "polite, cold, never raises his voice",
      tradePersonality: "credit predator who respects profit and proof",
      shortStory: "Damon never threatens anyone loudly because quiet debt follows farther than a knife. He buys bad accounts, offers risky financing, and knows which merchant families are about to crack. He supports loan pressure, company cash events, and debt-driven quests.",
      visualIdentity: "A lean pale man with fox-red hair slicked back, one gold tooth, narrow black coat, crimson ledger strapped to his chest, and a silver counting chain wrapped around gloved fingers.",
      uniquenessTraits: [
        "lean foxlike silhouette",
        "fox-red slick hair",
        "gold tooth",
        "narrow black coat",
        "crimson ledger",
        "silver counting chain"
      ],
      professionProps: [
        "crimson debt ledger",
        "silver counting chain",
        "sealed loan slips"
      ],
      dominantColors: [
        "black",
        "crimson",
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
      portraitFilePrefix: "npc-legacy-056",
      identityAnchor: "same person as npc-legacy-056: lean foxlike silhouette, fox-red slick hair, gold tooth, narrow black coat, crimson ledger, debt collector, human, crimson debt ledger",
      portraitBasePrompt: "A lean pale man with fox-red hair slicked back, one gold tooth, narrow black coat, crimson ledger strapped to his chest, and a silver counting chain wrapped around gloved fingers. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "unpaid caravan loan",
        "buyout threat",
        "forged debt seal"
      ],
      integrationNotes: "Company/risk contact for debt and cash pressure.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-057",
      source: "legacy_reworked",
      originalIndex: 57,
      seedId: null,
      finalDisplayName: "Nahla Sandglass",
      profession: "Route Astrologer",
      gameplayGroups: [
        "travel",
        "quest",
        "market_service"
      ],
      roleTags: [
        "route",
        "stars",
        "weather",
        "prediction",
        "map"
      ],
      marketFlavor: "desert map kiosk",
      voiceDirection: "dreamy, exact, speaks in weather and warnings",
      tradePersonality: "route adviser who sells probability with poetry",
      shortStory: "Nahla charts roads by stars, hoofprints, and the taste of dust before rain. Caravans mock her until her bad omens save their cargo. She supports route risk previews, weather warnings, and rare map fragments.",
      visualIdentity: "A slender djinn-blooded woman with amber-brown skin, wind-tossed white hair, luminous gold freckles, layered turquoise travel robes, and a brass sandglass filled with starlit blue sand.",
      uniquenessTraits: [
        "slender windblown silhouette",
        "white hair",
        "gold freckles",
        "turquoise robes",
        "brass sandglass",
        "far-looking eyes"
      ],
      professionProps: [
        "brass sandglass",
        "star map strip",
        "compass charm"
      ],
      dominantColors: [
        "turquoise",
        "brass",
        "starlit blue"
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
      portraitFilePrefix: "npc-legacy-057",
      identityAnchor: "same person as npc-legacy-057: slender windblown silhouette, white hair, gold freckles, turquoise robes, brass sandglass, route astrologer, djinn-blooded human, brass sandglass",
      portraitBasePrompt: "A slender djinn-blooded woman with amber-brown skin, wind-tossed white hair, luminous gold freckles, layered turquoise travel robes, and a brass sandglass filled with starlit blue sand. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "bad road omen",
        "lost map star",
        "desert toll warning"
      ],
      integrationNotes: "Travel-risk and route-preview contact.",
      ancestryOrSpecies: "djinn-blooded human",
      magicalTraits: [
        "gold star freckles",
        "faint blue sand glow"
      ]
    },
    {
      characterId: "npc-legacy-058",
      source: "legacy_reworked",
      originalIndex: 58,
      seedId: null,
      finalDisplayName: "Gorrum Bellowsong",
      profession: "Forge Guild Factor",
      gameplayGroups: [
        "trade",
        "guild_noble",
        "quest"
      ],
      roleTags: [
        "guild",
        "metal",
        "inspection",
        "blacksmith",
        "permit"
      ],
      marketFlavor: "guild forge office",
      voiceDirection: "booming, formal, secretly sentimental about good tools",
      tradePersonality: "guild factor who controls permits and bulk metal orders",
      shortStory: "Gorrum signs forge permits with one hand and tunes broken anvils with the other. He pretends to care only about guild law, but a beautiful tool can make him forget a fee. He supports guild reputation, bulk metal, and quality inspection hooks.",
      visualIdentity: "A broad fire-dwarf man with coal-black skin, bronze beard rings, ember-red eyebrows, a green guild sash over a soot-black waistcoat, and a tuning fork shaped like a tiny hammer.",
      uniquenessTraits: [
        "broad fire-dwarf silhouette",
        "coal-black skin",
        "bronze beard rings",
        "ember eyebrows",
        "green guild sash",
        "soot waistcoat"
      ],
      professionProps: [
        "hammer tuning fork",
        "guild seal stamp",
        "ore permit tag"
      ],
      dominantColors: [
        "soot black",
        "guild green",
        "ember red"
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
      portraitFilePrefix: "npc-legacy-058",
      identityAnchor: "same person as npc-legacy-058: broad fire-dwarf silhouette, coal-black skin, bronze beard rings, ember eyebrows, green guild sash, forge guild factor, fire-dwarf, hammer tuning fork",
      portraitBasePrompt: "A broad fire-dwarf man with coal-black skin, bronze beard rings, ember-red eyebrows, a green guild sash over a soot-black waistcoat, and a tuning fork shaped like a tiny hammer. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "guild inspection",
        "rare ingot order",
        "forged permit"
      ],
      integrationNotes: "Metal/guild authority legacy contact.",
      ancestryOrSpecies: "fire-dwarf",
      magicalTraits: [
        "warm ember glow in brows"
      ]
    },
    {
      characterId: "npc-legacy-059",
      source: "legacy_reworked",
      originalIndex: 59,
      seedId: null,
      finalDisplayName: "Velia Mothscribe",
      profession: "Contract Whisperer",
      gameplayGroups: [
        "quest",
        "company",
        "market_service"
      ],
      roleTags: [
        "contracts",
        "rumor_source",
        "legal",
        "scribe",
        "quest_giver"
      ],
      marketFlavor: "night market writing booth",
      voiceDirection: "hushed, playful, dangerous with exact wording",
      tradePersonality: "contract fixer who hides escape doors inside clauses",
      shortStory: "Velia writes contracts at night for people who cannot be seen entering the counting house. Her ink changes color when a promise is broken, which makes clients either faithful or terrified. She supports secret contracts, company clauses, and shady quest hooks.",
      visualIdentity: "A petite dark-skinned fae-touched scribe with moth-wing hair ornaments, violet eyes, ink-stained smile, soft grey cloak, and a scroll case covered in tiny silver locks.",
      uniquenessTraits: [
        "petite fae-touched silhouette",
        "violet eyes",
        "moth-wing ornaments",
        "ink-stained smile",
        "soft grey cloak",
        "silver lock scroll case"
      ],
      professionProps: [
        "silver-locked scroll case",
        "glowing ink pen",
        "folded contract"
      ],
      dominantColors: [
        "soft grey",
        "violet",
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
      portraitFilePrefix: "npc-legacy-059",
      identityAnchor: "same person as npc-legacy-059: petite fae-touched silhouette, violet eyes, moth-wing ornaments, ink-stained smile, soft grey cloak, contract whisperer, fae-touched human, silver-locked scroll case",
      portraitBasePrompt: "A petite dark-skinned fae-touched scribe with moth-wing hair ornaments, violet eyes, ink-stained smile, soft grey cloak, and a scroll case covered in tiny silver locks. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "secret contract",
        "broken promise ink",
        "hidden clause"
      ],
      integrationNotes: "Secret contract and quest writing contact.",
      ancestryOrSpecies: "fae-touched human",
      magicalTraits: [
        "tiny moth-wing shimmer near hair ornaments"
      ]
    },
    {
      characterId: "npc-legacy-060",
      source: "legacy_reworked",
      originalIndex: 60,
      seedId: null,
      finalDisplayName: "Belli Thimblethorn",
      profession: "Button Seller",
      gameplayGroups: [
        "trade",
        "market_service"
      ],
      roleTags: [
        "buttons",
        "cloth",
        "small_goods",
        "fashion"
      ],
      marketFlavor: "tailors alley",
      voiceDirection: "quick, bright, proudly particular",
      tradePersonality: "small-goods merchant who knows garments and gossip",
      shortStory: "Belli sells buttons so distinctive that people recognize lies by the coat they are sewn on. She remembers every missing cuff and every hurried disguise bought before sunrise.",
      visualIdentity: "A tiny gnome woman with cinnamon skin, huge round spectacles, lavender curls, yellow vest, and strings of bright buttons hanging like jewelry.",
      uniquenessTraits: [
        "tiny gnome silhouette",
        "cinnamon skin",
        "round spectacles",
        "lavender curls",
        "yellow vest",
        "button jewelry"
      ],
      professionProps: [
        "button strings",
        "tiny needle case",
        "cloth sample card"
      ],
      dominantColors: [
        "yellow",
        "lavender",
        "button-bright"
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
      portraitFilePrefix: "npc-legacy-060",
      identityAnchor: "same person as npc-legacy-060: tiny gnome silhouette, cinnamon skin, round spectacles, lavender curls, yellow vest, button seller, gnome, button strings",
      portraitBasePrompt: "A tiny gnome woman with cinnamon skin, huge round spectacles, lavender curls, yellow vest, and strings of bright buttons hanging like jewelry. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "stolen coat",
        "noble disguise",
        "tailor shortage"
      ],
      integrationNotes: "Cloth/fashion flavor merchant.",
      ancestryOrSpecies: "gnome",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-061",
      source: "legacy_reworked",
      originalIndex: 61,
      seedId: null,
      finalDisplayName: "Kesh Riverjaw",
      profession: "Ferry Clerk",
      gameplayGroups: [
        "travel",
        "market_service"
      ],
      roleTags: [
        "ferry",
        "river",
        "route",
        "ticket"
      ],
      marketFlavor: "river ferry steps",
      voiceDirection: "slow, deadpan, impossible to rush",
      tradePersonality: "route clerk who values exact fares and dry cargo",
      shortStory: "Kesh has watched impatient merchants argue with rivers for twenty years and the rivers always win. He stamps ferry tickets by weight, mood, and how likely the passenger is to vomit.",
      visualIdentity: "A heavyset river-troll man with slate-blue skin, mossy sideburns, sleepy yellow eyes, waterproof brown vest, and a huge ticket punch on a chain.",
      uniquenessTraits: [
        "heavy river-troll silhouette",
        "slate-blue skin",
        "mossy sideburns",
        "sleepy yellow eyes",
        "waterproof vest"
      ],
      professionProps: [
        "ticket punch",
        "ferry token roll",
        "river bell"
      ],
      dominantColors: [
        "slate blue",
        "moss green",
        "brown leather"
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
      portraitFilePrefix: "npc-legacy-061",
      identityAnchor: "same person as npc-legacy-061: heavy river-troll silhouette, slate-blue skin, mossy sideburns, sleepy yellow eyes, waterproof vest, ferry clerk, river-troll, ticket punch",
      portraitBasePrompt: "A heavyset river-troll man with slate-blue skin, mossy sideburns, sleepy yellow eyes, waterproof brown vest, and a huge ticket punch on a chain. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "flooded crossing",
        "lost ferry token",
        "river toll dispute"
      ],
      integrationNotes: "Travel/ferry service NPC.",
      ancestryOrSpecies: "river-troll",
      magicalTraits: [
        "small water droplets clinging to sideburns"
      ]
    },
    {
      characterId: "npc-legacy-062",
      source: "legacy_reworked",
      originalIndex: 62,
      seedId: null,
      finalDisplayName: "Pavia Goldspool",
      profession: "Ribbon Weaver",
      gameplayGroups: [
        "trade",
        "guild_noble"
      ],
      roleTags: [
        "ribbons",
        "cloth",
        "luxury",
        "festival"
      ],
      marketFlavor: "festival awning",
      voiceDirection: "flirtatious, musical, impossible to undercolor",
      tradePersonality: "festival cloth seller with noble clients",
      shortStory: "Pavia weaves ribbons for weddings, funerals, and feuds, charging extra when all three happen at once. Her color sense can make a poor stall look noble for a day.",
      visualIdentity: "A graceful woman with honey-brown skin, waist-length auburn hair, peacock-blue shawl, gold bracelets, and a fan of shimmering ribbons looped around both arms.",
      uniquenessTraits: [
        "graceful ribbon silhouette",
        "honey-brown skin",
        "auburn hair",
        "peacock shawl",
        "gold bracelets"
      ],
      professionProps: [
        "ribbon fan",
        "gold shuttle",
        "color chart"
      ],
      dominantColors: [
        "peacock blue",
        "gold",
        "auburn"
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
      portraitFilePrefix: "npc-legacy-062",
      identityAnchor: "same person as npc-legacy-062: graceful ribbon silhouette, honey-brown skin, auburn hair, peacock shawl, gold bracelets, ribbon weaver, human, ribbon fan",
      portraitBasePrompt: "A graceful woman with honey-brown skin, waist-length auburn hair, peacock-blue shawl, gold bracelets, and a fan of shimmering ribbons looped around both arms. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "festival order",
        "noble color feud",
        "missing dye"
      ],
      integrationNotes: "Luxury/festival cloth merchant.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-063",
      source: "legacy_reworked",
      originalIndex: 63,
      seedId: null,
      finalDisplayName: "Tomo Picklebarrel",
      profession: "Pickler",
      gameplayGroups: [
        "trade"
      ],
      roleTags: [
        "food",
        "preserved",
        "barrels",
        "supplier"
      ],
      marketFlavor: "sour alley stall",
      voiceDirection: "cheerful, sour, proud of terrible smells",
      tradePersonality: "preserved-food seller with bulk instincts",
      shortStory: "Tomo claims a good pickle should wake the dead and annoy tax officers. His cellar barrels are marked by smell because he says labels are for cowards.",
      visualIdentity: "A round halfling man with olive skin, wild green scarf, enormous eyebrows, stained apron, and a little barrel hugged under one arm.",
      uniquenessTraits: [
        "round halfling silhouette",
        "olive skin",
        "wild green scarf",
        "enormous eyebrows",
        "stained apron"
      ],
      professionProps: [
        "pickle barrel",
        "wooden tasting fork",
        "brine ladle"
      ],
      dominantColors: [
        "brine green",
        "wood brown",
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
      portraitFilePrefix: "npc-legacy-063",
      identityAnchor: "same person as npc-legacy-063: round halfling silhouette, olive skin, wild green scarf, enormous eyebrows, stained apron, pickler, halfling, pickle barrel",
      portraitBasePrompt: "A round halfling man with olive skin, wild green scarf, enormous eyebrows, stained apron, and a little barrel hugged under one arm. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "barrel leak",
        "festival pickle contest",
        "salt shortage"
      ],
      integrationNotes: "Preserved food merchant.",
      ancestryOrSpecies: "halfling",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-064",
      source: "legacy_reworked",
      originalIndex: 64,
      seedId: null,
      finalDisplayName: "Rashka Copperpaw",
      profession: "Pot Mender",
      gameplayGroups: [
        "trade",
        "market_service"
      ],
      roleTags: [
        "repair",
        "pots",
        "copper",
        "household"
      ],
      marketFlavor: "copper repair cart",
      voiceDirection: "raspy, funny, fond of dents",
      tradePersonality: "repair seller who sees stories in broken cookware",
      shortStory: "Rashka mends pots, pans, and the occasional helmet brought in by embarrassed guards. She says dents are memories but leaks are betrayal.",
      visualIdentity: "A wiry catfolk woman with copper fur, green eyes, patched red apron, curled whiskers, and a necklace of tiny copper rivets.",
      uniquenessTraits: [
        "wiry catfolk silhouette",
        "copper fur",
        "green eyes",
        "patched red apron",
        "curled whiskers"
      ],
      professionProps: [
        "copper rivet necklace",
        "small hammer",
        "mended pot"
      ],
      dominantColors: [
        "copper",
        "red",
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
      portraitFilePrefix: "npc-legacy-064",
      identityAnchor: "same person as npc-legacy-064: wiry catfolk silhouette, copper fur, green eyes, patched red apron, curled whiskers, pot mender, catfolk, copper rivet necklace",
      portraitBasePrompt: "A wiry catfolk woman with copper fur, green eyes, patched red apron, curled whiskers, and a necklace of tiny copper rivets. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "leaking still",
        "guard helmet dent",
        "rare copper rivets"
      ],
      integrationNotes: "Repair and household goods merchant.",
      ancestryOrSpecies: "catfolk",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-065",
      source: "legacy_reworked",
      originalIndex: 65,
      seedId: null,
      finalDisplayName: "Elowen Pearlcup",
      profession: "Tea Seller",
      gameplayGroups: [
        "trade",
        "quest"
      ],
      roleTags: [
        "tea",
        "spice",
        "luxury",
        "rumor_source"
      ],
      marketFlavor: "quiet tea steps",
      voiceDirection: "gentle, observant, weaponized politeness",
      tradePersonality: "luxury drink seller who trades in calm secrets",
      shortStory: "Elowen pours tea slowly enough that liars reveal themselves before the cup is full. She buys herbs, porcelain, and private apologies.",
      visualIdentity: "A serene half-elf woman with dark umber skin, pearl-white hair bun, moss-green robe, long fingers, and a porcelain cup painted with tiny birds.",
      uniquenessTraits: [
        "serene half-elf silhouette",
        "dark umber skin",
        "pearl-white hair",
        "moss-green robe",
        "long fingers"
      ],
      professionProps: [
        "porcelain tea cup",
        "tea tin",
        "bird-painted saucer"
      ],
      dominantColors: [
        "moss green",
        "pearl",
        "porcelain white"
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
      portraitFilePrefix: "npc-legacy-065",
      identityAnchor: "same person as npc-legacy-065: serene half-elf silhouette, dark umber skin, pearl-white hair, moss-green robe, long fingers, tea seller, half-elf, porcelain tea cup",
      portraitBasePrompt: "A serene half-elf woman with dark umber skin, pearl-white hair bun, moss-green robe, long fingers, and a porcelain cup painted with tiny birds. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "poisoned tea rumor",
        "rare leaf shipment",
        "quiet apology"
      ],
      integrationNotes: "Luxury tea and rumor merchant.",
      ancestryOrSpecies: "half-elf",
      magicalTraits: [
        "subtle steam curls shaped like birds"
      ]
    },
    {
      characterId: "npc-legacy-066",
      source: "legacy_reworked",
      originalIndex: 66,
      seedId: null,
      finalDisplayName: "Brindle Oaknail",
      profession: "Cartwright",
      gameplayGroups: [
        "travel",
        "company"
      ],
      roleTags: [
        "carts",
        "repair",
        "travel",
        "woodcraft"
      ],
      marketFlavor: "wheelwright yard",
      voiceDirection: "gruff, tender with wheels, rude to lazy axles",
      tradePersonality: "travel repair worker for wagons and shipments",
      shortStory: "Brindle knows every road by what it does to a wheel. He can fix a cart overnight if the merchant admits it was overloaded.",
      visualIdentity: "A broad old human with dark walnut skin, bald head, white beard, leather suspenders, and a small wagon wheel tucked under one arm.",
      uniquenessTraits: [
        "broad old silhouette",
        "dark walnut skin",
        "bald head",
        "white beard",
        "leather suspenders"
      ],
      professionProps: [
        "small wagon wheel",
        "wooden mallet",
        "axle grease pot"
      ],
      dominantColors: [
        "walnut",
        "leather brown",
        "wheel grey"
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
      portraitFilePrefix: "npc-legacy-066",
      identityAnchor: "same person as npc-legacy-066: broad old silhouette, dark walnut skin, bald head, white beard, leather suspenders, cartwright, human, small wagon wheel",
      portraitBasePrompt: "A broad old human with dark walnut skin, bald head, white beard, leather suspenders, and a small wagon wheel tucked under one arm. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "broken axle",
        "shipment cart upgrade",
        "rare wood spoke"
      ],
      integrationNotes: "Travel/company repair NPC.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-067",
      source: "legacy_reworked",
      originalIndex: 67,
      seedId: null,
      finalDisplayName: "Miri Cloudmilk",
      profession: "Cheesemonger",
      gameplayGroups: [
        "trade"
      ],
      roleTags: [
        "cheese",
        "dairy",
        "food",
        "supplier"
      ],
      marketFlavor: "dairy lane",
      voiceDirection: "bright, stubborn, insults bad milk",
      tradePersonality: "food supplier who values freshness and timing",
      shortStory: "Miri can identify a farm by the smell of its cheese rind, which makes farmers nervous. She sells soft wheels at dawn and hard wheels when caravans need food that survives arguments.",
      visualIdentity: "A plump young woman with rosy-brown skin, cloud-white kerchief, freckles, blue dress, and a round cheese wheel held like treasure.",
      uniquenessTraits: [
        "plump cheerful silhouette",
        "rosy-brown skin",
        "white kerchief",
        "freckles",
        "blue dress"
      ],
      professionProps: [
        "cheese wheel",
        "tasting knife",
        "wax rind seal"
      ],
      dominantColors: [
        "blue",
        "cream",
        "wax red"
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
      portraitFilePrefix: "npc-legacy-067",
      identityAnchor: "same person as npc-legacy-067: plump cheerful silhouette, rosy-brown skin, white kerchief, freckles, blue dress, cheesemonger, human, cheese wheel",
      portraitBasePrompt: "A plump young woman with rosy-brown skin, cloud-white kerchief, freckles, blue dress, and a round cheese wheel held like treasure. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "spoiled milk",
        "festival cheese prize",
        "farm shortage"
      ],
      integrationNotes: "Dairy supplier.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-068",
      source: "legacy_reworked",
      originalIndex: 68,
      seedId: null,
      finalDisplayName: "Sovan Inkbee",
      profession: "Map Illuminator",
      gameplayGroups: [
        "travel",
        "quest",
        "market_service"
      ],
      roleTags: [
        "maps",
        "scribe",
        "route",
        "art"
      ],
      marketFlavor: "map lamp booth",
      voiceDirection: "precise, fussy, easily thrilled by coastlines",
      tradePersonality: "map seller who makes routes beautiful and useful",
      shortStory: "Sovan paints maps with beeswax pigments that resist rain and bad decisions. He adds tiny monsters where roads have eaten too many caravans.",
      visualIdentity: "A slender bee-kin man with golden-brown skin, black-striped scarf, translucent amber spectacles, and a rolled map covered in bright miniature roads.",
      uniquenessTraits: [
        "slender bee-kin silhouette",
        "golden-brown skin",
        "striped scarf",
        "amber spectacles",
        "miniature map"
      ],
      professionProps: [
        "illuminated map",
        "tiny brush",
        "beeswax pigment pot"
      ],
      dominantColors: [
        "gold",
        "black",
        "map parchment"
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
      portraitFilePrefix: "npc-legacy-068",
      identityAnchor: "same person as npc-legacy-068: slender bee-kin silhouette, golden-brown skin, striped scarf, amber spectacles, miniature map, map illuminator, bee-kin, illuminated map",
      portraitBasePrompt: "A slender bee-kin man with golden-brown skin, black-striped scarf, translucent amber spectacles, and a rolled map covered in bright miniature roads. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "lost road map",
        "monster-marked route",
        "waterproof ink"
      ],
      integrationNotes: "Map and route-service NPC.",
      ancestryOrSpecies: "bee-kin",
      magicalTraits: [
        "faint translucent wing shimmer at shoulders"
      ]
    },
    {
      characterId: "npc-legacy-069",
      source: "legacy_reworked",
      originalIndex: 69,
      seedId: null,
      finalDisplayName: "Una Saltlace",
      profession: "Net Maker",
      gameplayGroups: [
        "trade",
        "travel"
      ],
      roleTags: [
        "nets",
        "fish",
        "rope",
        "dock"
      ],
      marketFlavor: "net drying yard",
      voiceDirection: "practical, sunburned, knots insults into rope",
      tradePersonality: "dock supplier for fishers and sailors",
      shortStory: "Una ties nets so tight that even gossip gets caught in them. She knows which fishermen are lucky and which are just lying about the tide.",
      visualIdentity: "A tall freckled woman with sunburned nose, straw hat, sea-green shirt, and a half-finished net draped over one shoulder.",
      uniquenessTraits: [
        "tall freckled silhouette",
        "sunburned nose",
        "straw hat",
        "sea-green shirt",
        "net shoulder drape"
      ],
      professionProps: [
        "fishing net",
        "wooden shuttle",
        "rope coil"
      ],
      dominantColors: [
        "sea green",
        "straw",
        "rope tan"
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
      portraitFilePrefix: "npc-legacy-069",
      identityAnchor: "same person as npc-legacy-069: tall freckled silhouette, sunburned nose, straw hat, sea-green shirt, net shoulder drape, net maker, human, fishing net",
      portraitBasePrompt: "A tall freckled woman with sunburned nose, straw hat, sea-green shirt, and a half-finished net draped over one shoulder. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "torn royal net",
        "missing fisher",
        "rare rope fiber"
      ],
      integrationNotes: "Dock/fish supplier.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-070",
      source: "legacy_reworked",
      originalIndex: 70,
      seedId: null,
      finalDisplayName: "Quillo Brassroot",
      profession: "Herbalist",
      gameplayGroups: [
        "trade",
        "quest"
      ],
      roleTags: [
        "herbs",
        "medicine",
        "plants",
        "healer"
      ],
      marketFlavor: "garden stall",
      voiceDirection: "soft-spoken, exact, plants get more compliments than people",
      tradePersonality: "healer merchant with careful plant knowledge",
      shortStory: "Quillo grows herbs in broken helmets because he says metal remembers pain. He sells remedies, cooking leaves, and the occasional warning disguised as a recipe.",
      visualIdentity: "A short dryad-blooded man with bark-brown skin, leafy sideburns, green apron, gentle eyes, and a tray of herbs sprouting from tiny helmet pots.",
      uniquenessTraits: [
        "short plantlike silhouette",
        "bark-brown skin",
        "leafy sideburns",
        "green apron",
        "helmet herb pots"
      ],
      professionProps: [
        "helmet herb pots",
        "small sickle",
        "medicine packet"
      ],
      dominantColors: [
        "leaf green",
        "bark brown",
        "iron grey"
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
      portraitFilePrefix: "npc-legacy-070",
      identityAnchor: "same person as npc-legacy-070: short plantlike silhouette, bark-brown skin, leafy sideburns, green apron, helmet herb pots, herbalist, dryad-blooded human, helmet herb pots",
      portraitBasePrompt: "A short dryad-blooded man with bark-brown skin, leafy sideburns, green apron, gentle eyes, and a tray of herbs sprouting from tiny helmet pots. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "sick caravan cure",
        "rare root request",
        "poison antidote"
      ],
      integrationNotes: "Herb/medicine merchant.",
      ancestryOrSpecies: "dryad-blooded human",
      magicalTraits: [
        "tiny leaves growing near temples"
      ]
    },
    {
      characterId: "npc-legacy-071",
      source: "legacy_reworked",
      originalIndex: 71,
      seedId: null,
      finalDisplayName: "Rollo Candlefat",
      profession: "Tallow Chandler",
      gameplayGroups: [
        "trade",
        "quest"
      ],
      roleTags: [
        "candles",
        "wax",
        "household",
        "religious"
      ],
      marketFlavor: "lamp lane",
      voiceDirection: "oily, kind, smells like supper and shrines",
      tradePersonality: "wax seller for homes, shrines, and night markets",
      shortStory: "Rollo sells candles by burn time and mood, not just length. His cheapest tapers smoke like gossip, but his best shrine candles make even thieves whisper.",
      visualIdentity: "A soft round man with deep tan skin, slick black hair, yellow apron, and a rack of twisted candles glowing faintly behind his shoulder.",
      uniquenessTraits: [
        "soft round silhouette",
        "deep tan skin",
        "slick black hair",
        "yellow apron",
        "twisted candle rack"
      ],
      professionProps: [
        "twisted candles",
        "wick scissors",
        "wax ladle"
      ],
      dominantColors: [
        "yellow",
        "wax cream",
        "smoke grey"
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
      portraitFilePrefix: "npc-legacy-071",
      identityAnchor: "same person as npc-legacy-071: soft round silhouette, deep tan skin, slick black hair, yellow apron, twisted candle rack, tallow chandler, human, twisted candles",
      portraitBasePrompt: "A soft round man with deep tan skin, slick black hair, yellow apron, and a rack of twisted candles glowing faintly behind his shoulder. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "wax shortage",
        "night watch candles",
        "shrine order"
      ],
      integrationNotes: "Candle/wax merchant.",
      ancestryOrSpecies: "human",
      magicalTraits: [
        "faint candle halos"
      ]
    },
    {
      characterId: "npc-legacy-072",
      source: "legacy_reworked",
      originalIndex: 72,
      seedId: null,
      finalDisplayName: "Tilda Rainbucket",
      profession: "Water Carrier",
      gameplayGroups: [
        "travel",
        "market_service"
      ],
      roleTags: [
        "water",
        "travel",
        "labor",
        "market_service"
      ],
      marketFlavor: "well square",
      voiceDirection: "tired, honest, remembers every drought",
      tradePersonality: "minor service seller for travel and town needs",
      shortStory: "Tilda carries water where fountains fail and charges extra when nobles pretend thirst is dignified. She knows which wells are sweet, bitter, or cursed by plumbing.",
      visualIdentity: "A strong woman with umber skin, broad shoulders, blue headwrap, patched skirt, and two polished water buckets on a yoke.",
      uniquenessTraits: [
        "strong broad silhouette",
        "umber skin",
        "blue headwrap",
        "patched skirt",
        "bucket yoke"
      ],
      professionProps: [
        "water buckets",
        "wooden yoke",
        "well token"
      ],
      dominantColors: [
        "blue",
        "water silver",
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
      portraitFilePrefix: "npc-legacy-072",
      identityAnchor: "same person as npc-legacy-072: strong broad silhouette, umber skin, blue headwrap, patched skirt, bucket yoke, water carrier, human, water buckets",
      portraitBasePrompt: "A strong woman with umber skin, broad shoulders, blue headwrap, patched skirt, and two polished water buckets on a yoke. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "dry well",
        "spoiled cistern",
        "caravan water order"
      ],
      integrationNotes: "Water/travel supply NPC.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-073",
      source: "legacy_reworked",
      originalIndex: 73,
      seedId: null,
      finalDisplayName: "Jessa Flamefig",
      profession: "Spice Roaster",
      gameplayGroups: [
        "trade"
      ],
      roleTags: [
        "spice",
        "food",
        "luxury",
        "supplier"
      ],
      marketFlavor: "spice smoke stall",
      voiceDirection: "fiery, generous, laughs at bland people",
      tradePersonality: "spice merchant who turns scarcity into scent",
      shortStory: "Jessa roasts spice blends in a copper pan and can make a whole street hungry by accident. She pays well for pepper, saffron, and anything that makes soldiers cry.",
      visualIdentity: "A curvy woman with copper-brown skin, bright hazel eyes, red-orange headscarf, gold nose ring, and a smoking spice pan held with theatrical pride.",
      uniquenessTraits: [
        "curvy lively silhouette",
        "copper-brown skin",
        "hazel eyes",
        "red-orange headscarf",
        "gold nose ring"
      ],
      professionProps: [
        "smoking spice pan",
        "saffron pouch",
        "pepper scoop"
      ],
      dominantColors: [
        "red-orange",
        "gold",
        "spice brown"
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
      portraitFilePrefix: "npc-legacy-073",
      identityAnchor: "same person as npc-legacy-073: curvy lively silhouette, copper-brown skin, hazel eyes, red-orange headscarf, gold nose ring, spice roaster, human, smoking spice pan",
      portraitBasePrompt: "A curvy woman with copper-brown skin, bright hazel eyes, red-orange headscarf, gold nose ring, and a smoking spice pan held with theatrical pride. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "rare saffron",
        "bland noble banquet",
        "pepper shortage"
      ],
      integrationNotes: "Spice merchant.",
      ancestryOrSpecies: "human",
      magicalTraits: [
        "tiny warm spice sparks over pan"
      ]
    },
    {
      characterId: "npc-legacy-074",
      source: "legacy_reworked",
      originalIndex: 74,
      seedId: null,
      finalDisplayName: "Nim Thrice-Locked",
      profession: "Locksmith",
      gameplayGroups: [
        "market_service",
        "risk_crime"
      ],
      roleTags: [
        "locks",
        "keys",
        "security",
        "crime_hint"
      ],
      marketFlavor: "keyhole kiosk",
      voiceDirection: "nervous, brilliant, hates simple doors",
      tradePersonality: "security crafter who knows every lock by personality",
      shortStory: "Nim makes locks for honest merchants and better locks for dishonest ones. He says no door is truly secure until it has embarrassed at least one thief.",
      visualIdentity: "A tiny blue-skinned goblin with enormous ears, silver goggles, black gloves, and a coat covered in dangling keys of impossible shapes.",
      uniquenessTraits: [
        "tiny goblin silhouette",
        "blue skin",
        "enormous ears",
        "silver goggles",
        "key-covered coat"
      ],
      professionProps: [
        "impossible keys",
        "lock pick wheel",
        "small padlock"
      ],
      dominantColors: [
        "blue",
        "silver",
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
      portraitFilePrefix: "npc-legacy-074",
      identityAnchor: "same person as npc-legacy-074: tiny goblin silhouette, blue skin, enormous ears, silver goggles, key-covered coat, locksmith, goblin, impossible keys",
      portraitBasePrompt: "A tiny blue-skinned goblin with enormous ears, silver goggles, black gloves, and a coat covered in dangling keys of impossible shapes. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "warehouse lock upgrade",
        "stolen key mold",
        "unpickable chest"
      ],
      integrationNotes: "Security/lock service NPC.",
      ancestryOrSpecies: "goblin",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-075",
      source: "legacy_reworked",
      originalIndex: 75,
      seedId: null,
      finalDisplayName: "Rana Silverbite",
      profession: "Dentist-Barber",
      gameplayGroups: [
        "market_service",
        "quest"
      ],
      roleTags: [
        "barber",
        "medicine",
        "tools",
        "rumor_source"
      ],
      marketFlavor: "barber awning",
      voiceDirection: "cheerful, horrifyingly calm, hums during extractions",
      tradePersonality: "service worker who hears pain and secrets",
      shortStory: "Rana cuts hair, pulls teeth, and collects confessions people shout by accident. Her tool tray is spotless enough to frighten sinners.",
      visualIdentity: "A poised woman with mahogany skin, white barber coat, silver tooth necklace, high braided bun, and tiny pliers held delicately like a flower.",
      uniquenessTraits: [
        "poised medical silhouette",
        "mahogany skin",
        "white barber coat",
        "silver tooth necklace",
        "high braided bun"
      ],
      professionProps: [
        "tiny pliers",
        "barber razor",
        "silver tooth charm"
      ],
      dominantColors: [
        "white",
        "silver",
        "mahogany"
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
      portraitFilePrefix: "npc-legacy-075",
      identityAnchor: "same person as npc-legacy-075: poised medical silhouette, mahogany skin, white barber coat, silver tooth necklace, high braided bun, dentist-barber, human, tiny pliers",
      portraitBasePrompt: "A poised woman with mahogany skin, white barber coat, silver tooth necklace, high braided bun, and tiny pliers held delicately like a flower. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "infected tooth",
        "barber rumor",
        "stolen razor"
      ],
      integrationNotes: "Medical/barber service NPC.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-076",
      source: "legacy_reworked",
      originalIndex: 76,
      seedId: null,
      finalDisplayName: "Percy Longwhistle",
      profession: "Bird Seller",
      gameplayGroups: [
        "trade",
        "travel"
      ],
      roleTags: [
        "birds",
        "messages",
        "pets",
        "market_service"
      ],
      marketFlavor: "cage arcade",
      voiceDirection: "sing-song, anxious, names every bird twice",
      tradePersonality: "bird merchant for messages and flavor",
      shortStory: "Percy insists birds understand contracts better than merchants do. He rents messenger pigeons, sells noisy pets, and panics when silence enters the cage row.",
      visualIdentity: "A very tall thin man with pale skin, long neck, straw-yellow hair, green coat, and two little birds perched on his shoulders.",
      uniquenessTraits: [
        "very tall thin silhouette",
        "pale skin",
        "long neck",
        "straw-yellow hair",
        "green coat"
      ],
      professionProps: [
        "bird cages",
        "shoulder birds",
        "seed pouch"
      ],
      dominantColors: [
        "green",
        "straw yellow",
        "feather grey"
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
      portraitFilePrefix: "npc-legacy-076",
      identityAnchor: "same person as npc-legacy-076: very tall thin silhouette, pale skin, long neck, straw-yellow hair, green coat, bird seller, human, bird cages",
      portraitBasePrompt: "A very tall thin man with pale skin, long neck, straw-yellow hair, green coat, and two little birds perched on his shoulders. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "missing messenger bird",
        "rare songbird",
        "silent cage"
      ],
      integrationNotes: "Bird/message merchant.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-077",
      source: "legacy_reworked",
      originalIndex: 77,
      seedId: null,
      finalDisplayName: "Azra Moonflour",
      profession: "Night Baker",
      gameplayGroups: [
        "trade",
        "quest"
      ],
      roleTags: [
        "bakery",
        "food",
        "night_market",
        "rumor_source"
      ],
      marketFlavor: "midnight oven",
      voiceDirection: "sleepy, sweet, slightly haunted",
      tradePersonality: "night food seller with strange recipes",
      shortStory: "Azra bakes after midnight because her dough rises better under moonlight and so do secrets. Travelers buy her black-sesame buns before dangerous roads.",
      visualIdentity: "A soft-faced woman with cool brown skin, moon-white flour on her cheeks, dark blue apron, sleepy eyes, and a tray of crescent buns.",
      uniquenessTraits: [
        "soft sleepy silhouette",
        "cool brown skin",
        "flour cheeks",
        "dark blue apron",
        "sleepy eyes"
      ],
      professionProps: [
        "crescent bun tray",
        "moon flour pouch",
        "wooden peel"
      ],
      dominantColors: [
        "dark blue",
        "moon white",
        "sesame black"
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
      portraitFilePrefix: "npc-legacy-077",
      identityAnchor: "same person as npc-legacy-077: soft sleepy silhouette, cool brown skin, flour cheeks, dark blue apron, sleepy eyes, night baker, human, crescent bun tray",
      portraitBasePrompt: "A soft-faced woman with cool brown skin, moon-white flour on her cheeks, dark blue apron, sleepy eyes, and a tray of crescent buns. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "midnight bread order",
        "haunted oven",
        "road ration buns"
      ],
      integrationNotes: "Night food/ration merchant.",
      ancestryOrSpecies: "human",
      magicalTraits: [
        "faint moonlit flour dust"
      ]
    },
    {
      characterId: "npc-legacy-078",
      source: "legacy_reworked",
      originalIndex: 78,
      seedId: null,
      finalDisplayName: "Torren Nailspark",
      profession: "Tinker",
      gameplayGroups: [
        "trade",
        "company"
      ],
      roleTags: [
        "tools",
        "repair",
        "metal",
        "small_machines"
      ],
      marketFlavor: "tinker cart",
      voiceDirection: "fast-talking, inventive, apologizes to broken things",
      tradePersonality: "tool seller who upgrades small systems",
      shortStory: "Torren travels with a cart that rattles like a bag of ideas. Half his inventions work, and the other half are useful warnings.",
      visualIdentity: "A wiry brass-skinned clockwork-touched man with spiky black hair, copper goggles, patched blue coat, and a belt full of springs and tiny hammers.",
      uniquenessTraits: [
        "wiry inventor silhouette",
        "brass-tinted skin",
        "spiky black hair",
        "copper goggles",
        "patched blue coat"
      ],
      professionProps: [
        "tiny hammers",
        "spring belt",
        "folding tool"
      ],
      dominantColors: [
        "brass",
        "blue",
        "copper"
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
      portraitFilePrefix: "npc-legacy-078",
      identityAnchor: "same person as npc-legacy-078: wiry inventor silhouette, brass-tinted skin, spiky black hair, copper goggles, patched blue coat, tinker, clockwork-touched human, tiny hammers",
      portraitBasePrompt: "A wiry brass-skinned clockwork-touched man with spiky black hair, copper goggles, patched blue coat, and a belt full of springs and tiny hammers. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "broken device",
        "warehouse pulley",
        "strange spring"
      ],
      integrationNotes: "Tool/repair merchant.",
      ancestryOrSpecies: "clockwork-touched human",
      magicalTraits: [
        "subtle brass seams on fingers"
      ]
    },
    {
      characterId: "npc-legacy-079",
      source: "legacy_reworked",
      originalIndex: 79,
      seedId: null,
      finalDisplayName: "Sella Redmoss",
      profession: "Mushroom Seller",
      gameplayGroups: [
        "trade",
        "quest"
      ],
      roleTags: [
        "mushrooms",
        "food",
        "forest",
        "medicine"
      ],
      marketFlavor: "shaded alley baskets",
      voiceDirection: "earthy, mysterious, never fully awake",
      tradePersonality: "forest food seller with medicine overlap",
      shortStory: "Sella gathers mushrooms before dawn and refuses to say which ones whisper back. She sells cooking caps, dye fungus, and remedies to people with steady hands.",
      visualIdentity: "A short moss-elf woman with green freckles, red moss hair, sleepy amber eyes, brown cloak, and baskets of bright mushrooms.",
      uniquenessTraits: [
        "short moss-elf silhouette",
        "green freckles",
        "red moss hair",
        "amber eyes",
        "brown cloak"
      ],
      professionProps: [
        "mushroom baskets",
        "small knife",
        "spore pouch"
      ],
      dominantColors: [
        "red moss",
        "brown",
        "amber"
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
      portraitFilePrefix: "npc-legacy-079",
      identityAnchor: "same person as npc-legacy-079: short moss-elf silhouette, green freckles, red moss hair, amber eyes, brown cloak, mushroom seller, moss-elf, mushroom baskets",
      portraitBasePrompt: "A short moss-elf woman with green freckles, red moss hair, sleepy amber eyes, brown cloak, and baskets of bright mushrooms. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "rare healing cap",
        "poison confusion",
        "forest trail rumor"
      ],
      integrationNotes: "Mushroom/forest supplier.",
      ancestryOrSpecies: "moss-elf",
      magicalTraits: [
        "tiny glowing spores around baskets"
      ]
    },
    {
      characterId: "npc-legacy-080",
      source: "legacy_reworked",
      originalIndex: 80,
      seedId: null,
      finalDisplayName: "Davi Goldthread",
      profession: "Embroidery Master",
      gameplayGroups: [
        "trade",
        "guild_noble"
      ],
      roleTags: [
        "embroidery",
        "cloth",
        "luxury",
        "guild"
      ],
      marketFlavor: "embroidered signboard",
      voiceDirection: "proud, delicate, deadly with criticism",
      tradePersonality: "luxury crafter who sells status in thread",
      shortStory: "Davi can make a family crest look honorable even when the family is not. Nobles fear his compliments because they contain measurements.",
      visualIdentity: "A slim man with dark olive skin, silver-streaked beard, violet waistcoat, gold-thread cuffs, and an embroidery hoop held close to his chest.",
      uniquenessTraits: [
        "slim elegant silhouette",
        "dark olive skin",
        "silver beard streaks",
        "violet waistcoat",
        "gold-thread cuffs"
      ],
      professionProps: [
        "embroidery hoop",
        "gold thread spool",
        "needle case"
      ],
      dominantColors: [
        "violet",
        "gold",
        "olive"
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
      portraitFilePrefix: "npc-legacy-080",
      identityAnchor: "same person as npc-legacy-080: slim elegant silhouette, dark olive skin, silver beard streaks, violet waistcoat, gold-thread cuffs, embroidery master, human, embroidery hoop",
      portraitBasePrompt: "A slim man with dark olive skin, silver-streaked beard, violet waistcoat, gold-thread cuffs, and an embroidery hoop held close to his chest. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "crest emergency",
        "noble insult",
        "rare gold thread"
      ],
      integrationNotes: "Luxury cloth crafter.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-081",
      source: "legacy_reworked",
      originalIndex: 81,
      seedId: null,
      finalDisplayName: "Bara Oxtongue",
      profession: "Butcher",
      gameplayGroups: [
        "trade"
      ],
      roleTags: [
        "meat",
        "butcher",
        "food",
        "supplier"
      ],
      marketFlavor: "red awning butcher stall",
      voiceDirection: "blunt, merry, terrifying with knives",
      tradePersonality: "meat seller who prices clean cuts and honest weight",
      shortStory: "Bara names every cleaver and every customer who asks for too much fat trimmed away. She feeds guards cheaply when trouble is coming.",
      visualIdentity: "A tall muscular woman with dark brown skin, shaved head, red apron, bright laugh, and a polished cleaver resting safely across one shoulder.",
      uniquenessTraits: [
        "tall muscular silhouette",
        "dark brown skin",
        "shaved head",
        "red apron",
        "bright laugh"
      ],
      professionProps: [
        "polished cleaver",
        "meat hook",
        "wrapped roast"
      ],
      dominantColors: [
        "red",
        "steel",
        "dark brown"
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
      portraitFilePrefix: "npc-legacy-081",
      identityAnchor: "same person as npc-legacy-081: tall muscular silhouette, dark brown skin, shaved head, red apron, bright laugh, butcher, human, polished cleaver",
      portraitBasePrompt: "A tall muscular woman with dark brown skin, shaved head, red apron, bright laugh, and a polished cleaver resting safely across one shoulder. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "festival roast",
        "spoiled meat rumor",
        "guard ration order"
      ],
      integrationNotes: "Meat supplier.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-082",
      source: "legacy_reworked",
      originalIndex: 82,
      seedId: null,
      finalDisplayName: "Orrick Dustwine",
      profession: "Antique Bottle Buyer",
      gameplayGroups: [
        "collector_specialist",
        "trade"
      ],
      roleTags: [
        "collector",
        "glass",
        "bottles",
        "luxury"
      ],
      marketFlavor: "antique shelf stall",
      voiceDirection: "nasal, nostalgic, sees history in stains",
      tradePersonality: "collector buyer for glassware and odd bottles",
      shortStory: "Orrick buys old bottles for the stories trapped in their stains. He can identify a hundred-year vinegar by its disappointment.",
      visualIdentity: "A thin elderly man with sallow skin, long white moustache, purple velvet cap, and a magnifying lens fixed to a bottle-green cane.",
      uniquenessTraits: [
        "thin elderly silhouette",
        "sallow skin",
        "white moustache",
        "purple cap",
        "bottle-green cane"
      ],
      professionProps: [
        "antique bottle",
        "magnifying cane",
        "velvet display cloth"
      ],
      dominantColors: [
        "purple",
        "bottle green",
        "old glass"
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
      portraitFilePrefix: "npc-legacy-082",
      identityAnchor: "same person as npc-legacy-082: thin elderly silhouette, sallow skin, white moustache, purple cap, bottle-green cane, antique bottle buyer, human, antique bottle",
      portraitBasePrompt: "A thin elderly man with sallow skin, long white moustache, purple velvet cap, and a magnifying lens fixed to a bottle-green cane. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "lost vintage bottle",
        "noble cellar sale",
        "strange residue"
      ],
      integrationNotes: "Collector NPC.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-083",
      source: "legacy_reworked",
      originalIndex: 83,
      seedId: null,
      finalDisplayName: "Chara Sunhook",
      profession: "Sailcloth Dealer",
      gameplayGroups: [
        "trade",
        "travel"
      ],
      roleTags: [
        "sailcloth",
        "cloth",
        "dock",
        "travel"
      ],
      marketFlavor: "sail loft",
      voiceDirection: "sunny, brisk, measures while talking",
      tradePersonality: "dock cloth seller for ship and caravan covers",
      shortStory: "Chara sells sailcloth, tentcloth, and excuses for people who tore both. She can judge a storm by how buyers touch the fabric.",
      visualIdentity: "A broad-shouldered woman with golden skin, cropped black curls, white sleeveless coat, blue sash, and a roll of canvas balanced easily on one shoulder.",
      uniquenessTraits: [
        "broad-shouldered silhouette",
        "golden skin",
        "cropped black curls",
        "white coat",
        "blue sash"
      ],
      professionProps: [
        "canvas roll",
        "measuring hook",
        "sail needle"
      ],
      dominantColors: [
        "white",
        "blue",
        "canvas tan"
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
      portraitFilePrefix: "npc-legacy-083",
      identityAnchor: "same person as npc-legacy-083: broad-shouldered silhouette, golden skin, cropped black curls, white coat, blue sash, sailcloth dealer, human, canvas roll",
      portraitBasePrompt: "A broad-shouldered woman with golden skin, cropped black curls, white sleeveless coat, blue sash, and a roll of canvas balanced easily on one shoulder. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "storm canvas order",
        "ship repair",
        "tent shortage"
      ],
      integrationNotes: "Dock/travel cloth supplier.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-084",
      source: "legacy_reworked",
      originalIndex: 84,
      seedId: null,
      finalDisplayName: "Fito Quicklime",
      profession: "Mason Supplier",
      gameplayGroups: [
        "company",
        "market_service"
      ],
      roleTags: [
        "stone",
        "construction",
        "warehouse",
        "tools"
      ],
      marketFlavor: "stone yard",
      voiceDirection: "dusty, direct, secretly artistic",
      tradePersonality: "construction supplier for warehouses and upgrades",
      shortStory: "Fito sells lime, stone, and the opinion that most walls are emotionally weak. He sketches arches in dust when nobody is watching.",
      visualIdentity: "A squat stone-kin man with grey speckled skin, square hands, orange scarf, dusty apron, and a chalked stone block hugged under one arm.",
      uniquenessTraits: [
        "squat stone-kin silhouette",
        "grey speckled skin",
        "square hands",
        "orange scarf",
        "dusty apron"
      ],
      professionProps: [
        "chalked stone block",
        "lime bag",
        "small trowel"
      ],
      dominantColors: [
        "stone grey",
        "orange",
        "chalk white"
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
      portraitFilePrefix: "npc-legacy-084",
      identityAnchor: "same person as npc-legacy-084: squat stone-kin silhouette, grey speckled skin, square hands, orange scarf, dusty apron, mason supplier, stone-kin, chalked stone block",
      portraitBasePrompt: "A squat stone-kin man with grey speckled skin, square hands, orange scarf, dusty apron, and a chalked stone block hugged under one arm. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "warehouse wall repair",
        "rare marble",
        "collapsed arch"
      ],
      integrationNotes: "Construction/company supplier.",
      ancestryOrSpecies: "stone-kin",
      magicalTraits: [
        "subtle granite freckles"
      ]
    },
    {
      characterId: "npc-legacy-085",
      source: "legacy_reworked",
      originalIndex: 85,
      seedId: null,
      finalDisplayName: "Lira Softstep",
      profession: "Carpet Seller",
      gameplayGroups: [
        "trade",
        "guild_noble"
      ],
      roleTags: [
        "carpets",
        "luxury",
        "cloth",
        "household"
      ],
      marketFlavor: "covered bazaar rugs",
      voiceDirection: "smooth, dramatic, excellent at silence",
      tradePersonality: "luxury home-goods seller with noble clients",
      shortStory: "Lira sells carpets that can make a drafty room believe it is a palace. She hears more secrets from people sitting down than spies do from doors.",
      visualIdentity: "A tall elegant woman with warm sienna skin, black hair under a gold scarf, layered teal robes, and a rolled crimson carpet tied with brass cord.",
      uniquenessTraits: [
        "tall elegant silhouette",
        "warm sienna skin",
        "gold scarf",
        "teal robes",
        "crimson carpet roll"
      ],
      professionProps: [
        "rolled carpet",
        "brass cord",
        "pattern sample"
      ],
      dominantColors: [
        "teal",
        "crimson",
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
      portraitFilePrefix: "npc-legacy-085",
      identityAnchor: "same person as npc-legacy-085: tall elegant silhouette, warm sienna skin, gold scarf, teal robes, crimson carpet roll, carpet seller, human, rolled carpet",
      portraitBasePrompt: "A tall elegant woman with warm sienna skin, black hair under a gold scarf, layered teal robes, and a rolled crimson carpet tied with brass cord. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "noble carpet order",
        "hidden map weave",
        "stolen rug"
      ],
      integrationNotes: "Luxury home goods NPC.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-086",
      source: "legacy_reworked",
      originalIndex: 86,
      seedId: null,
      finalDisplayName: "Mazo Cinderplum",
      profession: "Charcoal Seller",
      gameplayGroups: [
        "trade",
        "company"
      ],
      roleTags: [
        "charcoal",
        "fuel",
        "forge",
        "supplier"
      ],
      marketFlavor: "charcoal yard",
      voiceDirection: "smoky, cheerful, impossible to keep clean",
      tradePersonality: "fuel supplier for forges and cooking",
      shortStory: "Mazo is blackened with charcoal from hat brim to boots and insists it gives him character. He can smell whether a forge is wasting heat from two streets away.",
      visualIdentity: "A short broad man with charcoal-blackened skin, bright white grin, plum scarf, soot cap, and a sack of charcoal balanced on one hip.",
      uniquenessTraits: [
        "short broad silhouette",
        "charcoal-blackened face",
        "white grin",
        "plum scarf",
        "soot cap"
      ],
      professionProps: [
        "charcoal sack",
        "iron scoop",
        "smoke-stained token"
      ],
      dominantColors: [
        "charcoal black",
        "plum",
        "iron grey"
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
      portraitFilePrefix: "npc-legacy-086",
      identityAnchor: "same person as npc-legacy-086: short broad silhouette, charcoal-blackened face, white grin, plum scarf, soot cap, charcoal seller, human, charcoal sack",
      portraitBasePrompt: "A short broad man with charcoal-blackened skin, bright white grin, plum scarf, soot cap, and a sack of charcoal balanced on one hip. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "forge fuel shortage",
        "smoky alley dispute",
        "festival ovens"
      ],
      integrationNotes: "Fuel supplier.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-087",
      source: "legacy_reworked",
      originalIndex: 87,
      seedId: null,
      finalDisplayName: "Eris Whetstone",
      profession: "Knife Sharpener",
      gameplayGroups: [
        "market_service",
        "risk_crime"
      ],
      roleTags: [
        "knives",
        "repair",
        "weapons",
        "crime_hint"
      ],
      marketFlavor: "whetstone wheel",
      voiceDirection: "quiet, intense, never wastes motion",
      tradePersonality: "sharpening service with lawful and shady customers",
      shortStory: "Eris sharpens kitchen knives, guard blades, and questions she will not answer. Her wheel sings differently when a blade has seen trouble.",
      visualIdentity: "A lean woman with pale olive skin, close-shaved silver hair, black apron, amber eyes, and a foot-powered whetstone wheel behind one shoulder.",
      uniquenessTraits: [
        "lean precise silhouette",
        "pale olive skin",
        "shaved silver hair",
        "black apron",
        "amber eyes"
      ],
      professionProps: [
        "whetstone wheel",
        "knife roll",
        "oil cloth"
      ],
      dominantColors: [
        "black",
        "silver",
        "amber"
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
      portraitFilePrefix: "npc-legacy-087",
      identityAnchor: "same person as npc-legacy-087: lean precise silhouette, pale olive skin, shaved silver hair, black apron, amber eyes, knife sharpener, human, whetstone wheel",
      portraitBasePrompt: "A lean woman with pale olive skin, close-shaved silver hair, black apron, amber eyes, and a foot-powered whetstone wheel behind one shoulder. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "blood nicked blade",
        "chef knife order",
        "guard inspection"
      ],
      integrationNotes: "Repair/risk service NPC.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-088",
      source: "legacy_reworked",
      originalIndex: 88,
      seedId: null,
      finalDisplayName: "Pokk Brinecap",
      profession: "Salt Merchant",
      gameplayGroups: [
        "trade",
        "travel"
      ],
      roleTags: [
        "salt",
        "preserved",
        "food",
        "travel"
      ],
      marketFlavor: "salt sacks stall",
      voiceDirection: "crusty, practical, hates damp weather",
      tradePersonality: "salt supplier for preservation and travel",
      shortStory: "Pokk sells salt in blocks, sacks, and grudges. He claims the road is just meat waiting for salt if merchants plan poorly.",
      visualIdentity: "A compact dwarf with tan skin, salt-white eyebrows, blue cap, square beard, and a crystal salt block held up like a jewel.",
      uniquenessTraits: [
        "compact dwarf silhouette",
        "tan skin",
        "salt-white brows",
        "blue cap",
        "square beard"
      ],
      professionProps: [
        "salt block",
        "weighing scoop",
        "sack needle"
      ],
      dominantColors: [
        "salt white",
        "blue",
        "tan"
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
      portraitFilePrefix: "npc-legacy-088",
      identityAnchor: "same person as npc-legacy-088: compact dwarf silhouette, tan skin, salt-white brows, blue cap, square beard, salt merchant, dwarf, salt block",
      portraitBasePrompt: "A compact dwarf with tan skin, salt-white eyebrows, blue cap, square beard, and a crystal salt block held up like a jewel. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "salt tax dispute",
        "preserved meat order",
        "wet warehouse"
      ],
      integrationNotes: "Salt/preservation merchant.",
      ancestryOrSpecies: "dwarf",
      magicalTraits: [
        "tiny salt crystal sparkle on beard"
      ]
    },
    {
      characterId: "npc-legacy-089",
      source: "legacy_reworked",
      originalIndex: 89,
      seedId: null,
      finalDisplayName: "Nell Hushbasket",
      profession: "Egg Seller",
      gameplayGroups: [
        "trade"
      ],
      roleTags: [
        "eggs",
        "food",
        "farm",
        "supplier"
      ],
      marketFlavor: "morning market baskets",
      voiceDirection: "soft, anxious, brave about omelets",
      tradePersonality: "farm food seller with fragile stock",
      shortStory: "Nell carries eggs through crowds like a priest carrying relics. She knows exactly which cooks are gentle enough to deserve goose eggs.",
      visualIdentity: "A small young woman with fair skin, brown braids, green shawl, nervous smile, and a padded basket full of painted eggs.",
      uniquenessTraits: [
        "small careful silhouette",
        "fair skin",
        "brown braids",
        "green shawl",
        "nervous smile"
      ],
      professionProps: [
        "padded egg basket",
        "painted goose egg",
        "straw wrap"
      ],
      dominantColors: [
        "green",
        "egg white",
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
      portraitFilePrefix: "npc-legacy-089",
      identityAnchor: "same person as npc-legacy-089: small careful silhouette, fair skin, brown braids, green shawl, nervous smile, egg seller, human, padded egg basket",
      portraitBasePrompt: "A small young woman with fair skin, brown braids, green shawl, nervous smile, and a padded basket full of painted eggs. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "broken egg debt",
        "rare goose egg",
        "festival dye order"
      ],
      integrationNotes: "Farm food supplier.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-090",
      source: "legacy_reworked",
      originalIndex: 90,
      seedId: null,
      finalDisplayName: "Rafi Embercup",
      profession: "Coffee Roaster",
      gameplayGroups: [
        "trade",
        "quest"
      ],
      roleTags: [
        "coffee",
        "drink",
        "spice",
        "luxury"
      ],
      marketFlavor: "roasting brazier",
      voiceDirection: "lively, sleepless, talks faster after sunset",
      tradePersonality: "drink seller who fuels market rumors",
      shortStory: "Rafi roasts coffee beans until the whole square leans toward his brazier. He remembers who buys bitter cups before making bad decisions.",
      visualIdentity: "A wiry man with dark copper skin, bright restless eyes, curled moustache, red vest, and a smoking brass coffee roaster.",
      uniquenessTraits: [
        "wiry restless silhouette",
        "dark copper skin",
        "bright eyes",
        "curled moustache",
        "red vest"
      ],
      professionProps: [
        "brass coffee roaster",
        "tiny cup",
        "bean pouch"
      ],
      dominantColors: [
        "red",
        "brass",
        "coffee brown"
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
      portraitFilePrefix: "npc-legacy-090",
      identityAnchor: "same person as npc-legacy-090: wiry restless silhouette, dark copper skin, bright eyes, curled moustache, red vest, coffee roaster, human, brass coffee roaster",
      portraitBasePrompt: "A wiry man with dark copper skin, bright restless eyes, curled moustache, red vest, and a smoking brass coffee roaster. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "rare bean shipment",
        "sleepless guard rumor",
        "bitter cup debt"
      ],
      integrationNotes: "Luxury drink and rumor NPC.",
      ancestryOrSpecies: "human",
      magicalTraits: [
        "warm aromatic steam curl"
      ]
    },
    {
      characterId: "npc-legacy-091",
      source: "legacy_reworked",
      originalIndex: 91,
      seedId: null,
      finalDisplayName: "Mella Woolbright",
      profession: "Blanket Seller",
      gameplayGroups: [
        "trade",
        "travel"
      ],
      roleTags: [
        "blankets",
        "cloth",
        "travel",
        "household"
      ],
      marketFlavor: "winter cloth stall",
      voiceDirection: "motherly, firm, measures cold by insult",
      tradePersonality: "travel cloth seller for inns and caravans",
      shortStory: "Mella sells blankets thick enough to make mountain nights apologize. She can tell who is underpacked by how they pretend not to shiver.",
      visualIdentity: "A broad elderly woman with rich brown skin, silver curls, orange shawl, and a stack of patterned blankets held against her chest.",
      uniquenessTraits: [
        "broad elderly silhouette",
        "rich brown skin",
        "silver curls",
        "orange shawl",
        "blanket stack"
      ],
      professionProps: [
        "patterned blankets",
        "measuring cord",
        "wool comb"
      ],
      dominantColors: [
        "orange",
        "wool cream",
        "brown"
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
      portraitFilePrefix: "npc-legacy-091",
      identityAnchor: "same person as npc-legacy-091: broad elderly silhouette, rich brown skin, silver curls, orange shawl, blanket stack, blanket seller, human, patterned blankets",
      portraitBasePrompt: "A broad elderly woman with rich brown skin, silver curls, orange shawl, and a stack of patterned blankets held against her chest. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "winter caravan",
        "moth-eaten stock",
        "inn blanket order"
      ],
      integrationNotes: "Travel/home cloth NPC.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-092",
      source: "legacy_reworked",
      originalIndex: 92,
      seedId: null,
      finalDisplayName: "Ivo Blueclay",
      profession: "Potter",
      gameplayGroups: [
        "trade",
        "market_service"
      ],
      roleTags: [
        "pottery",
        "clay",
        "household",
        "craft"
      ],
      marketFlavor: "kiln yard",
      voiceDirection: "gentle, muddy, proud of useful shapes",
      tradePersonality: "household crafter with kiln supply hooks",
      shortStory: "Ivo makes jugs that survive roads better than most merchants do. He names glazes after weather and refuses to sell a pot with a bad attitude.",
      visualIdentity: "A tall blue-skinned clay-touched man with shaved head, clay-streaked arms, white linen shirt, and a stack of little cups balanced on one palm.",
      uniquenessTraits: [
        "tall clay-touched silhouette",
        "blue skin",
        "shaved head",
        "clay-streaked arms",
        "white shirt"
      ],
      professionProps: [
        "stacked cups",
        "glaze brush",
        "clay bowl"
      ],
      dominantColors: [
        "blue clay",
        "white",
        "terracotta"
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
      portraitFilePrefix: "npc-legacy-092",
      identityAnchor: "same person as npc-legacy-092: tall clay-touched silhouette, blue skin, shaved head, clay-streaked arms, white shirt, potter, clay-touched human, stacked cups",
      portraitBasePrompt: "A tall blue-skinned clay-touched man with shaved head, clay-streaked arms, white linen shirt, and a stack of little cups balanced on one palm. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "kiln fuel shortage",
        "rare glaze",
        "broken jug complaint"
      ],
      integrationNotes: "Pottery/craft merchant.",
      ancestryOrSpecies: "clay-touched human",
      magicalTraits: [
        "subtle clay-crack lines on forearms"
      ]
    },
    {
      characterId: "npc-legacy-093",
      source: "legacy_reworked",
      originalIndex: 93,
      seedId: null,
      finalDisplayName: "Pela Stepchalk",
      profession: "Queue Marker",
      gameplayGroups: [
        "market_service"
      ],
      roleTags: [
        "queue",
        "market_service",
        "chalk"
      ],
      marketFlavor: "market gate",
      voiceDirection: "busy, bossy, oddly fair",
      tradePersonality: "minor crowd-control worker",
      shortStory: "Pela draws queue lines and believes civilization begins where elbows stop. She can tell who cut in line by their shoes.",
      visualIdentity: "A small woman with tan skin, short grey hair, chalk-white apron, and a bundle of colored chalk sticks.",
      uniquenessTraits: [
        "small busy silhouette",
        "tan skin",
        "short grey hair",
        "chalk apron",
        "colored chalk"
      ],
      professionProps: [
        "colored chalk",
        "queue rope",
        "small slate"
      ],
      dominantColors: [
        "chalk white",
        "tan",
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
      portraitFilePrefix: "npc-legacy-093",
      identityAnchor: "same person as npc-legacy-093: small busy silhouette, tan skin, short grey hair, chalk apron, colored chalk, queue marker, human, colored chalk",
      portraitBasePrompt: "A small woman with tan skin, short grey hair, chalk-white apron, and a bundle of colored chalk sticks. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "market queue dispute"
      ],
      integrationNotes: "Minor market service NPC.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-094",
      source: "legacy_reworked",
      originalIndex: 94,
      seedId: null,
      finalDisplayName: "Orbo Tinwhistle",
      profession: "Street Crier",
      gameplayGroups: [
        "market_service",
        "quest"
      ],
      roleTags: [
        "announcements",
        "rumor_source",
        "market"
      ],
      marketFlavor: "fountain square",
      voiceDirection: "loud, breathless, proud of bad rhymes",
      tradePersonality: "minor announcement NPC",
      shortStory: "Orbo shouts market news, lost pets, and tax warnings in rhymes nobody requested. He knows urgent news before important people do.",
      visualIdentity: "A skinny goblin with lime skin, huge cheeks, red cap, and a rolled announcement horn.",
      uniquenessTraits: [
        "skinny goblin silhouette",
        "lime skin",
        "huge cheeks",
        "red cap",
        "announcement horn"
      ],
      professionProps: [
        "announcement horn",
        "news scroll",
        "red cap bell"
      ],
      dominantColors: [
        "red",
        "lime",
        "paper"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "npc-legacy-094",
      identityAnchor: "same person as npc-legacy-094: skinny goblin silhouette, lime skin, huge cheeks, red cap, announcement horn, street crier, goblin, announcement horn",
      portraitBasePrompt: "A skinny goblin with lime skin, huge cheeks, red cap, and a rolled announcement horn. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "urgent announcement"
      ],
      integrationNotes: "Minor news/rumor NPC.",
      ancestryOrSpecies: "goblin",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-095",
      source: "legacy_reworked",
      originalIndex: 95,
      seedId: null,
      finalDisplayName: "Mara Bentneedle",
      profession: "Seam Picker",
      gameplayGroups: [
        "market_service"
      ],
      roleTags: [
        "sewing",
        "repair",
        "cloth"
      ],
      marketFlavor: "tailor steps",
      voiceDirection: "quiet, careful, never wastes thread",
      tradePersonality: "minor clothing repair worker",
      shortStory: "Mara repairs hems on the steps outside richer tailors and knows which fine coats are secretly falling apart.",
      visualIdentity: "A thin elderly woman with warm brown skin, white braids, blue shawl, and a needle held between two careful fingers.",
      uniquenessTraits: [
        "thin elderly silhouette",
        "white braids",
        "blue shawl",
        "needle fingers"
      ],
      professionProps: [
        "needle",
        "thread card",
        "cloth patch"
      ],
      dominantColors: [
        "blue",
        "white",
        "thread red"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "npc-legacy-095",
      identityAnchor: "same person as npc-legacy-095: thin elderly silhouette, white braids, blue shawl, needle fingers, seam picker, human, needle",
      portraitBasePrompt: "A thin elderly woman with warm brown skin, white braids, blue shawl, and a needle held between two careful fingers. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "ripped hem"
      ],
      integrationNotes: "Minor sewing service NPC.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-096",
      source: "legacy_reworked",
      originalIndex: 96,
      seedId: null,
      finalDisplayName: "Korr Pebbletoe",
      profession: "Stable Sweeper",
      gameplayGroups: [
        "travel"
      ],
      roleTags: [
        "stable",
        "animals",
        "travel"
      ],
      marketFlavor: "stable yard",
      voiceDirection: "shy, kind, better with animals than people",
      tradePersonality: "minor stable worker",
      shortStory: "Korr sweeps stables, calms mules, and hears caravan gossip from people who forget quiet workers have ears.",
      visualIdentity: "A young half-ogre boy with grey-green skin, gentle eyes, straw vest, and a tiny broom too small for his big hands.",
      uniquenessTraits: [
        "young half-ogre silhouette",
        "grey-green skin",
        "gentle eyes",
        "straw vest",
        "tiny broom"
      ],
      professionProps: [
        "tiny broom",
        "mule bell",
        "straw bundle"
      ],
      dominantColors: [
        "straw",
        "grey green",
        "brown"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "npc-legacy-096",
      identityAnchor: "same person as npc-legacy-096: young half-ogre silhouette, grey-green skin, gentle eyes, straw vest, tiny broom, stable sweeper, half-ogre, tiny broom",
      portraitBasePrompt: "A young half-ogre boy with grey-green skin, gentle eyes, straw vest, and a tiny broom too small for his big hands. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "nervous mule"
      ],
      integrationNotes: "Minor stable/travel NPC.",
      ancestryOrSpecies: "half-ogre",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-097",
      source: "legacy_reworked",
      originalIndex: 97,
      seedId: null,
      finalDisplayName: "Sivi Rainpin",
      profession: "Umbrella Lender",
      gameplayGroups: [
        "market_service",
        "travel"
      ],
      roleTags: [
        "rain",
        "travel",
        "household"
      ],
      marketFlavor: "rain awning",
      voiceDirection: "cheery, opportunistic, loves clouds",
      tradePersonality: "minor weather service NPC",
      shortStory: "Sivi rents umbrellas when the sky changes its mind and charges double to people who laughed at clouds earlier.",
      visualIdentity: "A bright-eyed woman with copper skin, purple rain cloak, and a rack of patched umbrellas over one shoulder.",
      uniquenessTraits: [
        "bright rain silhouette",
        "copper skin",
        "purple cloak",
        "umbrella rack"
      ],
      professionProps: [
        "patched umbrella",
        "rain token",
        "small bell"
      ],
      dominantColors: [
        "purple",
        "copper",
        "rain blue"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "npc-legacy-097",
      identityAnchor: "same person as npc-legacy-097: bright rain silhouette, copper skin, purple cloak, umbrella rack, umbrella lender, human, patched umbrella",
      portraitBasePrompt: "A bright-eyed woman with copper skin, purple rain cloak, and a rack of patched umbrellas over one shoulder. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "sudden rain"
      ],
      integrationNotes: "Minor weather/travel NPC.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-098",
      source: "legacy_reworked",
      originalIndex: 98,
      seedId: null,
      finalDisplayName: "Denna Tallowick",
      profession: "Lamp-Lighter",
      gameplayGroups: [
        "market_service",
        "risk_crime"
      ],
      roleTags: [
        "lamps",
        "night",
        "city_service"
      ],
      marketFlavor: "lamp posts",
      voiceDirection: "calm, watchful, knows night routes",
      tradePersonality: "minor night city worker",
      shortStory: "Denna lights lamps and remembers which shadows move before the flame reaches them. She warns kind merchants about bad alleys.",
      visualIdentity: "A tall dark-skinned woman with hooded lantern cloak, brass lamp pole, and warm eyes reflecting tiny flames.",
      uniquenessTraits: [
        "tall night silhouette",
        "dark skin",
        "lantern cloak",
        "brass pole",
        "warm eyes"
      ],
      professionProps: [
        "lamp pole",
        "oil flask",
        "match cord"
      ],
      dominantColors: [
        "brass",
        "black",
        "flame gold"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "npc-legacy-098",
      identityAnchor: "same person as npc-legacy-098: tall night silhouette, dark skin, lantern cloak, brass pole, warm eyes, lamp-lighter, human, lamp pole",
      portraitBasePrompt: "A tall dark-skinned woman with hooded lantern cloak, brass lamp pole, and warm eyes reflecting tiny flames. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "dark alley warning"
      ],
      integrationNotes: "Minor night/risk NPC.",
      ancestryOrSpecies: "human",
      magicalTraits: [
        "tiny reflected flame in eyes"
      ]
    },
    {
      characterId: "npc-legacy-099",
      source: "legacy_reworked",
      originalIndex: 99,
      seedId: null,
      finalDisplayName: "Pip Puddleboot",
      profession: "Errand Child",
      gameplayGroups: [
        "quest",
        "market_service"
      ],
      roleTags: [
        "errand",
        "message",
        "child"
      ],
      marketFlavor: "market puddles",
      voiceDirection: "quick, cheeky, impossible to catch",
      tradePersonality: "minor message runner",
      shortStory: "Pip runs errands through puddles without spilling soup or secrets unless paid very badly.",
      visualIdentity: "A small child with brown skin, big grin, oversized blue boots, patched cap, and a sealed note clenched in one hand.",
      uniquenessTraits: [
        "small child silhouette",
        "brown skin",
        "big grin",
        "oversized blue boots",
        "patched cap"
      ],
      professionProps: [
        "sealed note",
        "blue boots",
        "string bracelet"
      ],
      dominantColors: [
        "blue",
        "brown",
        "cap grey"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "npc-legacy-099",
      identityAnchor: "same person as npc-legacy-099: small child silhouette, brown skin, big grin, oversized blue boots, patched cap, errand child, human, sealed note",
      portraitBasePrompt: "A small child with brown skin, big grin, oversized blue boots, patched cap, and a sealed note clenched in one hand. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "urgent note"
      ],
      integrationNotes: "Minor errand/quest NPC.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-100",
      source: "legacy_reworked",
      originalIndex: 100,
      seedId: null,
      finalDisplayName: "Old Yarra Snailpot",
      profession: "Soup Taster",
      gameplayGroups: [
        "trade"
      ],
      roleTags: [
        "food",
        "soup",
        "rumor_source"
      ],
      marketFlavor: "soup corner",
      voiceDirection: "ancient, blunt, spiritually committed to broth",
      tradePersonality: "minor food flavor NPC",
      shortStory: "Yarra tastes soup for vendors who fear her honesty more than sickness. One nod from her can save a stall.",
      visualIdentity: "A tiny elderly turtlefolk woman with olive shell, cream shawl, wooden spoon, and a steaming cup held in both hands.",
      uniquenessTraits: [
        "tiny turtlefolk silhouette",
        "olive shell",
        "cream shawl",
        "wooden spoon",
        "steaming cup"
      ],
      professionProps: [
        "wooden spoon",
        "soup cup",
        "small napkin"
      ],
      dominantColors: [
        "olive",
        "cream",
        "soup gold"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "npc-legacy-100",
      identityAnchor: "same person as npc-legacy-100: tiny turtlefolk silhouette, olive shell, cream shawl, wooden spoon, steaming cup, soup taster, turtlefolk, wooden spoon",
      portraitBasePrompt: "A tiny elderly turtlefolk woman with olive shell, cream shawl, wooden spoon, and a steaming cup held in both hands. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "soup judgment"
      ],
      integrationNotes: "Minor food/rumor NPC.",
      ancestryOrSpecies: "turtlefolk",
      magicalTraits: [
        "soft steam around cup"
      ]
    },
    {
      characterId: "npc-legacy-101",
      source: "legacy_reworked",
      originalIndex: 101,
      seedId: null,
      finalDisplayName: "Lio Featherwax",
      profession: "Seal Runner",
      gameplayGroups: [
        "market_service",
        "company"
      ],
      roleTags: [
        "wax_seals",
        "documents",
        "runner"
      ],
      marketFlavor: "counting steps",
      voiceDirection: "quick, proud, hates smudges",
      tradePersonality: "minor document runner",
      shortStory: "Lio carries sealed letters between stalls and guards them from rain like royal infants.",
      visualIdentity: "A slim teenager with light brown skin, feathered cap, red wax pouch, and a bundle of sealed letters.",
      uniquenessTraits: [
        "slim teen silhouette",
        "light brown skin",
        "feathered cap",
        "red wax pouch",
        "letter bundle"
      ],
      professionProps: [
        "sealed letters",
        "red wax pouch",
        "feather cap"
      ],
      dominantColors: [
        "red",
        "paper",
        "brown"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "npc-legacy-101",
      identityAnchor: "same person as npc-legacy-101: slim teen silhouette, light brown skin, feathered cap, red wax pouch, letter bundle, seal runner, human, sealed letters",
      portraitBasePrompt: "A slim teenager with light brown skin, feathered cap, red wax pouch, and a bundle of sealed letters. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "rushed seal delivery"
      ],
      integrationNotes: "Minor document/company NPC.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-102",
      source: "legacy_reworked",
      originalIndex: 102,
      seedId: null,
      finalDisplayName: "Gana Hookmop",
      profession: "Dock Cleaner",
      gameplayGroups: [
        "travel"
      ],
      roleTags: [
        "dock",
        "labor",
        "fish",
        "rumor_source"
      ],
      marketFlavor: "fish quay",
      voiceDirection: "grumpy, funny, knows every spill",
      tradePersonality: "minor dock flavor worker",
      shortStory: "Gana cleans docks after fishers, smugglers, and gulls all deny responsibility. She sees what people drop when they run.",
      visualIdentity: "A sturdy merrow woman with teal skin, black braid, rubber apron, and a hooked mop over one shoulder.",
      uniquenessTraits: [
        "sturdy merrow silhouette",
        "teal skin",
        "black braid",
        "rubber apron",
        "hooked mop"
      ],
      professionProps: [
        "hooked mop",
        "bucket",
        "fish scale rag"
      ],
      dominantColors: [
        "teal",
        "black",
        "grey"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "npc-legacy-102",
      identityAnchor: "same person as npc-legacy-102: sturdy merrow silhouette, teal skin, black braid, rubber apron, hooked mop, dock cleaner, merrow, hooked mop",
      portraitBasePrompt: "A sturdy merrow woman with teal skin, black braid, rubber apron, and a hooked mop over one shoulder. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "dropped dock clue"
      ],
      integrationNotes: "Minor dock/rumor NPC.",
      ancestryOrSpecies: "merrow",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-103",
      source: "legacy_reworked",
      originalIndex: 103,
      seedId: null,
      finalDisplayName: "Nixie Copperbell",
      profession: "Bell Polisher",
      gameplayGroups: [
        "market_service"
      ],
      roleTags: [
        "bells",
        "maintenance",
        "market"
      ],
      marketFlavor: "bell tower step",
      voiceDirection: "meticulous, musical, easily offended by tarnish",
      tradePersonality: "minor maintenance NPC",
      shortStory: "Nixie polishes market bells until every announcement sounds more expensive. She knows when officials are about to call bad news.",
      visualIdentity: "A small fairy-blooded girl with warm brown skin, copper curls, tiny translucent ear fins, and a polishing cloth wrapped around a hand bell.",
      uniquenessTraits: [
        "small fairy-blooded silhouette",
        "copper curls",
        "ear fins",
        "polishing cloth",
        "hand bell"
      ],
      professionProps: [
        "hand bell",
        "polishing cloth",
        "wax tin"
      ],
      dominantColors: [
        "copper",
        "cream",
        "brown"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "npc-legacy-103",
      identityAnchor: "same person as npc-legacy-103: small fairy-blooded silhouette, copper curls, ear fins, polishing cloth, hand bell, bell polisher, fairy-blooded human, hand bell",
      portraitBasePrompt: "A small fairy-blooded girl with warm brown skin, copper curls, tiny translucent ear fins, and a polishing cloth wrapped around a hand bell. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "official bell warning"
      ],
      integrationNotes: "Minor market maintenance NPC.",
      ancestryOrSpecies: "fairy-blooded human",
      magicalTraits: [
        "tiny shimmer near ear fins"
      ]
    },
    {
      characterId: "npc-legacy-104",
      source: "legacy_reworked",
      originalIndex: 104,
      seedId: null,
      finalDisplayName: "Hobb Reedback",
      profession: "Basket Carrier",
      gameplayGroups: [
        "market_service",
        "trade"
      ],
      roleTags: [
        "baskets",
        "labor",
        "farm"
      ],
      marketFlavor: "basket lane",
      voiceDirection: "sturdy, cheerful, forgets nothing carried",
      tradePersonality: "minor carrier worker",
      shortStory: "Hobb carries baskets for farmers and remembers which ones were suspiciously heavy. He wants his own cart someday.",
      visualIdentity: "A broad halfling man with sun-brown skin, green suspenders, straw hat, and three nested baskets strapped to his back.",
      uniquenessTraits: [
        "broad halfling silhouette",
        "sun-brown skin",
        "green suspenders",
        "straw hat",
        "nested baskets"
      ],
      professionProps: [
        "nested baskets",
        "carry strap",
        "market token"
      ],
      dominantColors: [
        "straw",
        "green",
        "brown"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "npc-legacy-104",
      identityAnchor: "same person as npc-legacy-104: broad halfling silhouette, sun-brown skin, green suspenders, straw hat, nested baskets, basket carrier, halfling, nested baskets",
      portraitBasePrompt: "A broad halfling man with sun-brown skin, green suspenders, straw hat, and three nested baskets strapped to his back. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "heavy basket clue"
      ],
      integrationNotes: "Minor labor/farm NPC.",
      ancestryOrSpecies: "halfling",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-105",
      source: "legacy_reworked",
      originalIndex: 105,
      seedId: null,
      finalDisplayName: "Ressa Blueash",
      profession: "Ash Sweeper",
      gameplayGroups: [
        "market_service"
      ],
      roleTags: [
        "ash",
        "cleaning",
        "forge"
      ],
      marketFlavor: "forge alley",
      voiceDirection: "quiet, smoky, surprisingly philosophical",
      tradePersonality: "minor forge service worker",
      shortStory: "Ressa sweeps forge ash and says every fire leaves an honest shape behind. Smiths listen when she says a batch burned wrong.",
      visualIdentity: "A lean blue-grey tiefling woman with small horns, ash-streaked face, black kerchief, and a wide broom dusted silver.",
      uniquenessTraits: [
        "lean tiefling silhouette",
        "small horns",
        "ash face",
        "black kerchief",
        "silver broom"
      ],
      professionProps: [
        "ash broom",
        "small dustpan",
        "forge rag"
      ],
      dominantColors: [
        "blue-grey",
        "black",
        "silver"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "npc-legacy-105",
      identityAnchor: "same person as npc-legacy-105: lean tiefling silhouette, small horns, ash face, black kerchief, silver broom, ash sweeper, tiefling, ash broom",
      portraitBasePrompt: "A lean blue-grey tiefling woman with small horns, ash-streaked face, black kerchief, and a wide broom dusted silver. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "bad forge ash"
      ],
      integrationNotes: "Minor forge flavor NPC.",
      ancestryOrSpecies: "tiefling",
      magicalTraits: [
        "faint smoky curl from horns"
      ]
    },
    {
      characterId: "npc-legacy-106",
      source: "legacy_reworked",
      originalIndex: 106,
      seedId: null,
      finalDisplayName: "Willa Peachbutton",
      profession: "Market Nurse",
      gameplayGroups: [
        "market_service",
        "quest"
      ],
      roleTags: [
        "medicine",
        "market_service",
        "aid"
      ],
      marketFlavor: "first-aid stool",
      voiceDirection: "gentle, brisk, scolds bleeding people",
      tradePersonality: "minor medical service NPC",
      shortStory: "Willa patches burns, cuts, and pride from merchants who trip over their own stock. She keeps sweets for frightened children.",
      visualIdentity: "A round young woman with peach-brown skin, white bonnet, green medicine satchel, and clean bandages looped over one arm.",
      uniquenessTraits: [
        "round gentle silhouette",
        "peach-brown skin",
        "white bonnet",
        "green satchel",
        "bandages"
      ],
      professionProps: [
        "bandages",
        "medicine satchel",
        "little sweet pouch"
      ],
      dominantColors: [
        "white",
        "green",
        "peach"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "npc-legacy-106",
      identityAnchor: "same person as npc-legacy-106: round gentle silhouette, peach-brown skin, white bonnet, green satchel, bandages, market nurse, human, bandages",
      portraitBasePrompt: "A round young woman with peach-brown skin, white bonnet, green medicine satchel, and clean bandages looped over one arm. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "market injury"
      ],
      integrationNotes: "Minor aid/quest NPC.",
      ancestryOrSpecies: "human",
      magicalTraits: []
    },
    {
      characterId: "npc-legacy-107",
      source: "legacy_reworked",
      originalIndex: 107,
      seedId: null,
      finalDisplayName: "Jori Mossbucket",
      profession: "Compost Buyer",
      gameplayGroups: [
        "market_service",
        "trade"
      ],
      roleTags: [
        "compost",
        "farm",
        "waste"
      ],
      marketFlavor: "back market heap",
      voiceDirection: "earthy, cheerful, suspiciously rich",
      tradePersonality: "minor farm/waste service NPC",
      shortStory: "Jori buys scraps everyone else wants gone and sells soil everyone suddenly needs. He says rot is just profit becoming patient.",
      visualIdentity: "A short goblin with moss-green skin, brown overalls, flower tucked behind one ear, and a little bucket of compost.",
      uniquenessTraits: [
        "short goblin silhouette",
        "moss-green skin",
        "brown overalls",
        "flower ear",
        "compost bucket"
      ],
      professionProps: [
        "compost bucket",
        "small shovel",
        "flower token"
      ],
      dominantColors: [
        "moss green",
        "brown",
        "flower pink"
      ],
      expressionTier: "minor",
      plannedExpressions: [
        {
          expression: "neutral",
          actingDirection: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          promptDelta: "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      portraitFilePrefix: "npc-legacy-107",
      identityAnchor: "same person as npc-legacy-107: short goblin silhouette, moss-green skin, brown overalls, flower ear, compost bucket, compost buyer, goblin, compost bucket",
      portraitBasePrompt: "A short goblin with moss-green skin, brown overalls, flower tucked behind one ear, and a little bucket of compost. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      negativePrompt: "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      questHooks: [
        "farm soil order"
      ],
      integrationNotes: "Minor farm service NPC.",
      ancestryOrSpecies: "goblin",
      magicalTraits: []
    }
  ]
} satisfies CharacterIdentityCatalogBatch;

export const characterIdentityCatalogLegacyBatch02PortraitImageCount = getIdentityBatchPortraitImageCount(characterIdentityCatalogLegacyBatch02);
