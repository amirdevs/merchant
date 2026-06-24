import type { CharacterIdentityCatalogBatch } from "./characterIdentityTypes";
import { getIdentityBatchPortraitImageCount } from "./characterIdentityTypes";

export const characterIdentityCatalogLegacyBatch03 = {
  "batchId": "identity-catalog-legacy-batch-003",
  "status": "portrait_generation_blocked",
  "rosterScope": "Third 54 reworked legacy slots: original indexes 108-161, expanding law, route, market-service, food, craft, dock, fantasy ancestry, and atmosphere identities while keeping generated indexes stable.",
  "portraitGenerationAllowed": false,
  "notes": [
    "This batch rewrites public-facing identity only; generated originalIndex values stay as stable mechanical anchors.",
    "Portrait generation stays blocked until every legacy identity batch and the final portrait manifest are complete.",
    "The JSON prompt sheets under docs/assets/character-prompts are final-layout manifests for later production, not a signal to generate before the full character set is ready."
  ],
  "identities": [
    {
      "characterId": "npc-legacy-108",
      "source": "legacy_reworked",
      "originalIndex": 108,
      "seedId": null,
      "finalDisplayName": "Lord Marrec Quillgate",
      "profession": "Customs Magistrate",
      "gameplayGroups": [
        "travel",
        "guild_noble",
        "risk_crime"
      ],
      "roleTags": [
        "customs",
        "law",
        "toll",
        "permit",
        "noble"
      ],
      "marketFlavor": "river customs hall",
      "voiceDirection": "formal, dry, makes every sentence sound notarized",
      "tradePersonality": "legal official who discounts honesty but charges arrogance",
      "shortStory": "Marrec rose from toll clerk to customs magistrate by remembering every merchant who lied to him. He can freeze cargo with a signature, but he secretly admires traders who keep immaculate books.",
      "visualIdentity": "A tall older human nobleman with umber skin, long white moustache, powdered blue robe, brass monocle, and a stack of wax-sealed customs tablets.",
      "uniquenessTraits": [
        "tall legal silhouette",
        "white moustache",
        "brass monocle",
        "powdered blue robe",
        "wax-sealed tablets",
        "long narrow hands"
      ],
      "professionProps": [
        "wax-sealed customs tablets",
        "brass monocle",
        "tax stamp"
      ],
      "dominantColors": [
        "powder blue",
        "brass",
        "seal red"
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
      "portraitFilePrefix": "npc-legacy-108",
      "identityAnchor": "same person as npc-legacy-108: tall legal silhouette, white moustache, brass monocle, powdered blue robe, wax-sealed tablets, customs magistrate, human, wax-sealed customs tablets",
      "portraitBasePrompt": "A tall older human nobleman with umber skin, long white moustache, powdered blue robe, brass monocle, and a stack of wax-sealed customs tablets. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "blocked cargo",
        "forged permit",
        "customs favor"
      ],
      "integrationNotes": "Major law/customs contact for route and illegal cargo checks.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-109",
      "source": "legacy_reworked",
      "originalIndex": 109,
      "seedId": null,
      "finalDisplayName": "Tazmina Dragonmint",
      "profession": "Dragonfruit Apothecary",
      "gameplayGroups": [
        "trade",
        "quest"
      ],
      "roleTags": [
        "apothecary",
        "medicine",
        "fruit",
        "alchemy",
        "supplier"
      ],
      "marketFlavor": "painted apothecary cart",
      "voiceDirection": "bright, theatrical, speaks as if every cure needs applause",
      "tradePersonality": "colorful healer who overpays for rare fruits and monster glands",
      "shortStory": "Tazmina makes medicines from fruits that should not smoke, hiss, or sing. Her stall smells like citrus and tiny explosions, and sick caravan guards trust her more than priests.",
      "visualIdentity": "A round djinn-blooded woman with copper skin, magenta curls, golden freckles, violet vest, and a tray of glowing dragonfruits cut like jewels.",
      "uniquenessTraits": [
        "round cheerful silhouette",
        "magenta curls",
        "golden freckles",
        "violet vest",
        "glowing fruit tray",
        "sparkly eyes"
      ],
      "professionProps": [
        "glowing dragonfruit tray",
        "tiny mortar",
        "medicine bottles"
      ],
      "dominantColors": [
        "magenta",
        "violet",
        "citrus gold"
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
      "portraitFilePrefix": "npc-legacy-109",
      "identityAnchor": "same person as npc-legacy-109: round cheerful silhouette, magenta curls, golden freckles, violet vest, glowing fruit tray, dragonfruit apothecary, djinn-blooded human, glowing dragonfruit tray",
      "portraitBasePrompt": "A round djinn-blooded woman with copper skin, magenta curls, golden freckles, violet vest, and a tray of glowing dragonfruits cut like jewels. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "fever cure",
        "rare fruit crate",
        "exploding medicine"
      ],
      "integrationNotes": "Potion/medicine supplier with playful magical visuals.",
      "ancestryOrSpecies": "djinn-blooded human",
      "magicalTraits": [
        "small fruit-spark motes around fingers"
      ]
    },
    {
      "characterId": "npc-legacy-110",
      "source": "legacy_reworked",
      "originalIndex": 110,
      "seedId": null,
      "finalDisplayName": "Captain Orvo Bluebanner",
      "profession": "Caravan Banner Captain",
      "gameplayGroups": [
        "travel",
        "company",
        "quest"
      ],
      "roleTags": [
        "caravan",
        "route",
        "guard",
        "banner",
        "shipment"
      ],
      "marketFlavor": "desert caravan court",
      "voiceDirection": "booming, optimistic, treats maps like battle songs",
      "tradePersonality": "route captain who buys supplies in bulk and values morale",
      "shortStory": "Orvo once led a caravan home by following the smell of rain on camel bells. He hires guards, argues with scouts, and keeps a blue banner patched with the names of roads that almost killed him.",
      "visualIdentity": "A huge broad-shouldered ogre-kin man with warm ochre skin, braided black beard, sky-blue banner cloak, bead-wrapped braids, and a route staff topped with little bells.",
      "uniquenessTraits": [
        "huge ogre-kin silhouette",
        "sky-blue banner cloak",
        "braided black beard",
        "bell-topped staff",
        "ochre skin",
        "road bead braids"
      ],
      "professionProps": [
        "route staff",
        "blue caravan banner",
        "bell charms"
      ],
      "dominantColors": [
        "sky blue",
        "ochre",
        "sand tan"
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
      "portraitFilePrefix": "npc-legacy-110",
      "identityAnchor": "same person as npc-legacy-110: huge ogre-kin silhouette, sky-blue banner cloak, braided black beard, bell-topped staff, ochre skin, caravan banner captain, ogre-kin, route staff",
      "portraitBasePrompt": "A huge broad-shouldered ogre-kin man with warm ochre skin, braided black beard, sky-blue banner cloak, bead-wrapped braids, and a route staff topped with little bells. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "lost caravan",
        "guard shortage",
        "storm route"
      ],
      "integrationNotes": "Travel/company route authority.",
      "ancestryOrSpecies": "ogre-kin",
      "magicalTraits": [
        "wind shimmer around banner edge"
      ]
    },
    {
      "characterId": "npc-legacy-111",
      "source": "legacy_reworked",
      "originalIndex": 111,
      "seedId": null,
      "finalDisplayName": "Madame Ivara Lacecoin",
      "profession": "Luxury Pawnbroker",
      "gameplayGroups": [
        "trade",
        "guild_noble",
        "company"
      ],
      "roleTags": [
        "pawn",
        "luxury",
        "jewelry",
        "loan",
        "collector"
      ],
      "marketFlavor": "velvet pawn salon",
      "voiceDirection": "sweet, cutting, smiles when collateral is beautiful",
      "tradePersonality": "luxury broker who buys desperate beauty and sells patience",
      "shortStory": "Ivara lends money to nobles who would rather pawn heirlooms than admit hunger. She can value a pearl by candlelight and a liar by posture.",
      "visualIdentity": "A glamorous raven-haired tiefling woman with burgundy skin, curled black horns capped in gold, pearl choker, black lace sleeves, and a velvet tray of rings.",
      "uniquenessTraits": [
        "glamorous tiefling silhouette",
        "gold-capped horns",
        "pearl choker",
        "black lace sleeves",
        "velvet ring tray",
        "sharp smile"
      ],
      "professionProps": [
        "velvet ring tray",
        "pawn ticket book",
        "pearl loupe"
      ],
      "dominantColors": [
        "burgundy",
        "black lace",
        "pearl white"
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
      "portraitFilePrefix": "npc-legacy-111",
      "identityAnchor": "same person as npc-legacy-111: glamorous tiefling silhouette, gold-capped horns, pearl choker, black lace sleeves, velvet ring tray, luxury pawnbroker, tiefling, velvet ring tray",
      "portraitBasePrompt": "A glamorous raven-haired tiefling woman with burgundy skin, curled black horns capped in gold, pearl choker, black lace sleeves, and a velvet tray of rings. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "pawned heirloom",
        "noble debt",
        "stolen ring"
      ],
      "integrationNotes": "Luxury/debt and noble market contact.",
      "ancestryOrSpecies": "tiefling",
      "magicalTraits": [
        "faint ruby glow in horn caps"
      ]
    },
    {
      "characterId": "npc-legacy-112",
      "source": "legacy_reworked",
      "originalIndex": 112,
      "seedId": null,
      "finalDisplayName": "Pell Oatwhistle",
      "profession": "Grain Futures Clerk",
      "gameplayGroups": [
        "trade",
        "company",
        "quest"
      ],
      "roleTags": [
        "grain",
        "contracts",
        "speculation",
        "ledger",
        "food"
      ],
      "marketFlavor": "grain exchange steps",
      "voiceDirection": "fast-talking, nervous, brilliant with bad weather",
      "tradePersonality": "contract trader who turns harvest rumors into prices",
      "shortStory": "Pell predicts grain prices by watching crows, mud, and the mood of millers. He writes futures contracts on oat paper and panics whenever the sky looks expensive.",
      "visualIdentity": "A tiny halfling man with sandy curls, oversized green coat, ink-stained fingers, and scrolls of grain contracts strapped like wings.",
      "uniquenessTraits": [
        "tiny halfling silhouette",
        "sandy curls",
        "oversized green coat",
        "ink-stained fingers",
        "contract-scroll wings",
        "anxious grin"
      ],
      "professionProps": [
        "grain contracts",
        "quill bundle",
        "oat sample pouch"
      ],
      "dominantColors": [
        "grain gold",
        "leaf green",
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
      "portraitFilePrefix": "npc-legacy-112",
      "identityAnchor": "same person as npc-legacy-112: tiny halfling silhouette, sandy curls, oversized green coat, ink-stained fingers, contract-scroll wings, grain futures clerk, halfling, grain contracts",
      "portraitBasePrompt": "A tiny halfling man with sandy curls, oversized green coat, ink-stained fingers, and scrolls of grain contracts strapped like wings. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "bad harvest rumor",
        "grain contract",
        "mill dispute"
      ],
      "integrationNotes": "Commodity-contract support NPC.",
      "ancestryOrSpecies": "halfling",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-113",
      "source": "legacy_reworked",
      "originalIndex": 113,
      "seedId": null,
      "finalDisplayName": "Seraphine Bellwater",
      "profession": "Canal Ferry Master",
      "gameplayGroups": [
        "travel",
        "trade",
        "quest"
      ],
      "roleTags": [
        "ferry",
        "canal",
        "water_route",
        "dock",
        "toll"
      ],
      "marketFlavor": "canal lock pier",
      "voiceDirection": "dry, musical, rings bells instead of shouting",
      "tradePersonality": "water-route operator who hates overloaded cargo",
      "shortStory": "Seraphine knows every canal lock by the note its bell makes. She ferries goods, refuses unsafe loads, and can smuggle a passenger only if the river likes them.",
      "visualIdentity": "A tall blue-skinned river-elf woman with silver wet hair, lacquered reed hat, turquoise coat, and a chain of tiny brass ferry bells across her chest.",
      "uniquenessTraits": [
        "tall river-elf silhouette",
        "blue skin",
        "silver wet hair",
        "reed hat",
        "brass bell chain",
        "turquoise coat"
      ],
      "professionProps": [
        "ferry bell chain",
        "lock key",
        "reed pole"
      ],
      "dominantColors": [
        "turquoise",
        "brass",
        "river silver"
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
      "portraitFilePrefix": "npc-legacy-113",
      "identityAnchor": "same person as npc-legacy-113: tall river-elf silhouette, blue skin, silver wet hair, reed hat, brass bell chain, canal ferry master, river-elf, ferry bell chain",
      "portraitBasePrompt": "A tall blue-skinned river-elf woman with silver wet hair, lacquered reed hat, turquoise coat, and a chain of tiny brass ferry bells across her chest. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "ferry strike",
        "canal toll",
        "missing passenger"
      ],
      "integrationNotes": "Water-route and toll contact.",
      "ancestryOrSpecies": "river-elf",
      "magicalTraits": [
        "water beads floating near hair"
      ]
    },
    {
      "characterId": "npc-legacy-114",
      "source": "legacy_reworked",
      "originalIndex": 114,
      "seedId": null,
      "finalDisplayName": "Grinda Ashcake",
      "profession": "Festival Cook",
      "gameplayGroups": [
        "trade",
        "quest",
        "market_service"
      ],
      "roleTags": [
        "food",
        "festival",
        "cook",
        "bulk",
        "supplier"
      ],
      "marketFlavor": "festival kitchen tent",
      "voiceDirection": "loud, affectionate, scolds with a spoon",
      "tradePersonality": "bulk cook who values spice, grain, and timing",
      "shortStory": "Grinda feeds festivals, soldiers, and funerals with the same enormous spoon. She can turn cheap grain into celebration or expose a supplier who watered the stew.",
      "visualIdentity": "A stout fire-touched dwarf woman with cinnamon skin, soot-dusted cheeks, red scarf, enormous wooden spoon, and a copper pot lid used like a shield.",
      "uniquenessTraits": [
        "stout dwarf silhouette",
        "cinnamon skin",
        "soot cheeks",
        "red scarf",
        "huge spoon",
        "copper pot lid"
      ],
      "professionProps": [
        "enormous spoon",
        "copper pot lid",
        "spice pouch"
      ],
      "dominantColors": [
        "red",
        "copper",
        "stew brown"
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
      "portraitFilePrefix": "npc-legacy-114",
      "identityAnchor": "same person as npc-legacy-114: stout dwarf silhouette, cinnamon skin, soot cheeks, red scarf, huge spoon, festival cook, fire-touched dwarf, enormous spoon",
      "portraitBasePrompt": "A stout fire-touched dwarf woman with cinnamon skin, soot-dusted cheeks, red scarf, enormous wooden spoon, and a copper pot lid used like a shield. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "festival feast",
        "spice shortage",
        "spoiled grain"
      ],
      "integrationNotes": "Food/festival economy contact.",
      "ancestryOrSpecies": "fire-touched dwarf",
      "magicalTraits": [
        "warm ember glow under scarf"
      ]
    },
    {
      "characterId": "npc-legacy-115",
      "source": "legacy_reworked",
      "originalIndex": 115,
      "seedId": null,
      "finalDisplayName": "Master Noll Fenwick",
      "profession": "Guild Inspector",
      "gameplayGroups": [
        "guild_noble",
        "quest",
        "risk_crime"
      ],
      "roleTags": [
        "guild",
        "inspection",
        "licenses",
        "quality",
        "law"
      ],
      "marketFlavor": "trade guild stair",
      "voiceDirection": "smug, exacting, impossible to impress twice",
      "tradePersonality": "quality inspector who rewards clean work and punishes shortcuts",
      "shortStory": "Noll inspects guild stalls with a ruler, a nose for fraud, and a hat too tall for most doorways. He can ruin a bad merchant or sponsor a good one.",
      "visualIdentity": "A narrow gnome man with mahogany skin, tall burgundy hat, round green spectacles, waxed moustache, and a silver inspection ruler held like a sword.",
      "uniquenessTraits": [
        "narrow gnome silhouette",
        "tall burgundy hat",
        "green spectacles",
        "waxed moustache",
        "silver ruler",
        "tiny formal boots"
      ],
      "professionProps": [
        "inspection ruler",
        "quality seal",
        "guild checklist"
      ],
      "dominantColors": [
        "burgundy",
        "silver",
        "green glass"
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
      "portraitFilePrefix": "npc-legacy-115",
      "identityAnchor": "same person as npc-legacy-115: narrow gnome silhouette, tall burgundy hat, green spectacles, waxed moustache, silver ruler, guild inspector, gnome, inspection ruler",
      "portraitBasePrompt": "A narrow gnome man with mahogany skin, tall burgundy hat, round green spectacles, waxed moustache, and a silver inspection ruler held like a sword. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "guild inspection",
        "counterfeit goods",
        "quality seal"
      ],
      "integrationNotes": "Guild/law pressure NPC.",
      "ancestryOrSpecies": "gnome",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-116",
      "source": "legacy_reworked",
      "originalIndex": 116,
      "seedId": null,
      "finalDisplayName": "Nyx Lanternglass",
      "profession": "Night Market Oracle",
      "gameplayGroups": [
        "quest",
        "market_service",
        "collector_specialist"
      ],
      "roleTags": [
        "oracle",
        "night_market",
        "rumor",
        "magic",
        "rare"
      ],
      "marketFlavor": "midnight lantern stall",
      "voiceDirection": "soft, teasing, never answers the first question",
      "tradePersonality": "mystic informant who trades hints for strange goods",
      "shortStory": "Nyx reads merchant luck in lamp soot and claims every bargain leaves a shadow. She sells rumors, warnings, and inconvenient prophecies to anyone brave enough to pay.",
      "visualIdentity": "A moon-pale elf with star-black hair, one gold eye and one cloudy violet eye, layered midnight shawls, and a glass lantern full of tiny floating cards.",
      "uniquenessTraits": [
        "moon-pale elf silhouette",
        "star-black hair",
        "mismatched eyes",
        "midnight shawls",
        "glass card lantern",
        "mysterious smile"
      ],
      "professionProps": [
        "glass oracle lantern",
        "floating cards",
        "ink-black shawl"
      ],
      "dominantColors": [
        "midnight blue",
        "gold",
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
      "portraitFilePrefix": "npc-legacy-116",
      "identityAnchor": "same person as npc-legacy-116: moon-pale elf silhouette, star-black hair, mismatched eyes, midnight shawls, glass card lantern, night market oracle, moon elf, glass oracle lantern",
      "portraitBasePrompt": "A moon-pale elf with star-black hair, one gold eye and one cloudy violet eye, layered midnight shawls, and a glass lantern full of tiny floating cards. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "route omen",
        "buyer prophecy",
        "lost heirloom vision"
      ],
      "integrationNotes": "Mystic rumor and quest hook contact.",
      "ancestryOrSpecies": "moon elf",
      "magicalTraits": [
        "tiny tarot cards orbit inside lantern"
      ]
    },
    {
      "characterId": "npc-legacy-117",
      "source": "legacy_reworked",
      "originalIndex": 117,
      "seedId": null,
      "finalDisplayName": "Marsa Clovejaw",
      "profession": "Spice Dentist",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "spices",
        "medicine",
        "teeth"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "spice dentist who buys/sells spices, medicine, teeth",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A cheerful lizardfolk woman with mint-green scales, polished tooth necklace, orange apron, and jars of clove oil.",
      "uniquenessTraits": [
        "spice dentist silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "spice dentist tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-117",
      "identityAnchor": "same person as npc-legacy-117: spice dentist silhouette, distinct face shape, profession costume, memorable prop, bright color accent, spice dentist, human, spice dentist tools",
      "portraitBasePrompt": "A cheerful lizardfolk woman with mint-green scales, polished tooth necklace, orange apron, and jars of clove oil. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Spice Dentist legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-118",
      "source": "legacy_reworked",
      "originalIndex": 118,
      "seedId": null,
      "finalDisplayName": "Boro Thimbleback",
      "profession": "Button Seller",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "cloth",
        "repairs",
        "buttons"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "button seller who buys/sells cloth, repairs, buttons",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A hunchbacked tortle man with mossy shell, tiny spectacles, blue waistcoat, and trays of glittering buttons.",
      "uniquenessTraits": [
        "button seller silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "button seller tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-118",
      "identityAnchor": "same person as npc-legacy-118: button seller silhouette, distinct face shape, profession costume, memorable prop, bright color accent, button seller, human, button seller tools",
      "portraitBasePrompt": "A hunchbacked tortle man with mossy shell, tiny spectacles, blue waistcoat, and trays of glittering buttons. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Button Seller legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-119",
      "source": "legacy_reworked",
      "originalIndex": 119,
      "seedId": null,
      "finalDisplayName": "Elka Rainbarrel",
      "profession": "Barrel Cooper",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "barrels",
        "wood",
        "storage"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "barrel cooper who buys/sells barrels, wood, storage",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A muscular human woman with rain-dark skin, shaved sides, oak apron, and a half-sized barrel under one arm.",
      "uniquenessTraits": [
        "barrel cooper silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "barrel cooper tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-119",
      "identityAnchor": "same person as npc-legacy-119: barrel cooper silhouette, distinct face shape, profession costume, memorable prop, bright color accent, barrel cooper, human, barrel cooper tools",
      "portraitBasePrompt": "A muscular human woman with rain-dark skin, shaved sides, oak apron, and a half-sized barrel under one arm. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Barrel Cooper legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-120",
      "source": "legacy_reworked",
      "originalIndex": 120,
      "seedId": null,
      "finalDisplayName": "Jorin Plumwax",
      "profession": "Seal Maker",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "wax",
        "documents",
        "letters"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "seal maker who buys/sells wax, documents, letters",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A slender half-elf man with plum hair, amber gloves, wax-stained sleeves, and a board of carved seals.",
      "uniquenessTraits": [
        "seal maker silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "seal maker tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-120",
      "identityAnchor": "same person as npc-legacy-120: seal maker silhouette, distinct face shape, profession costume, memorable prop, bright color accent, seal maker, halfling, seal maker tools",
      "portraitBasePrompt": "A slender half-elf man with plum hair, amber gloves, wax-stained sleeves, and a board of carved seals. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Seal Maker legacy trade contact.",
      "ancestryOrSpecies": "halfling",
      "magicalTraits": [
        "subtle harmless market-glow around props"
      ]
    },
    {
      "characterId": "npc-legacy-121",
      "source": "legacy_reworked",
      "originalIndex": 121,
      "seedId": null,
      "finalDisplayName": "Vess Nimblehook",
      "profession": "Fish Hook Peddler",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "fish",
        "hooks",
        "tools"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "fish hook peddler who buys/sells fish, hooks, tools",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A wiry goblin woman with bright teal skin, shell earrings, yellow coat, and strings of silver hooks.",
      "uniquenessTraits": [
        "fish hook peddler silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "fish hook peddler tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-121",
      "identityAnchor": "same person as npc-legacy-121: fish hook peddler silhouette, distinct face shape, profession costume, memorable prop, bright color accent, fish hook peddler, human, fish hook peddler tools",
      "portraitBasePrompt": "A wiry goblin woman with bright teal skin, shell earrings, yellow coat, and strings of silver hooks. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Fish Hook Peddler legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-122",
      "source": "legacy_reworked",
      "originalIndex": 122,
      "seedId": null,
      "finalDisplayName": "Orelia Sunflour",
      "profession": "Baker",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "bread",
        "flour",
        "food"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "baker who buys/sells bread, flour, food",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A plump sun-touched human with golden curls, flour-dusted cheeks, pink kerchief, and a tray of crescent loaves.",
      "uniquenessTraits": [
        "baker silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "baker tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-122",
      "identityAnchor": "same person as npc-legacy-122: baker silhouette, distinct face shape, profession costume, memorable prop, bright color accent, baker, human, baker tools",
      "portraitBasePrompt": "A plump sun-touched human with golden curls, flour-dusted cheeks, pink kerchief, and a tray of crescent loaves. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Baker legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-123",
      "source": "legacy_reworked",
      "originalIndex": 123,
      "seedId": null,
      "finalDisplayName": "Pax Underbridge",
      "profession": "Mushroom Forager",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "mushrooms",
        "caves",
        "food"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "mushroom forager who buys/sells mushrooms, caves, food",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A short cave-gnome with lavender skin, mushroom cap hat, muddy cloak, and glowing fungi basket.",
      "uniquenessTraits": [
        "mushroom forager silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "mushroom forager tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-123",
      "identityAnchor": "same person as npc-legacy-123: mushroom forager silhouette, distinct face shape, profession costume, memorable prop, bright color accent, mushroom forager, human, mushroom forager tools",
      "portraitBasePrompt": "A short cave-gnome with lavender skin, mushroom cap hat, muddy cloak, and glowing fungi basket. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Mushroom Forager legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-124",
      "source": "legacy_reworked",
      "originalIndex": 124,
      "seedId": null,
      "finalDisplayName": "Tilda Brasswool",
      "profession": "Blanket Weaver",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "wool",
        "cloth",
        "warmth"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "blanket weaver who buys/sells wool, cloth, warmth",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A broad older dwarf with grey braids, brass knitting needles, striped shawl, and rolled blankets stacked high.",
      "uniquenessTraits": [
        "blanket weaver silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "blanket weaver tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-124",
      "identityAnchor": "same person as npc-legacy-124: blanket weaver silhouette, distinct face shape, profession costume, memorable prop, bright color accent, blanket weaver, human, blanket weaver tools",
      "portraitBasePrompt": "A broad older dwarf with grey braids, brass knitting needles, striped shawl, and rolled blankets stacked high. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Blanket Weaver legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": [
        "subtle harmless market-glow around props"
      ]
    },
    {
      "characterId": "npc-legacy-125",
      "source": "legacy_reworked",
      "originalIndex": 125,
      "seedId": null,
      "finalDisplayName": "Naveen Bluepoppy",
      "profession": "Dye Merchant",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "dyes",
        "cloth",
        "luxury"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "dye merchant who buys/sells dyes, cloth, luxury",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A graceful human man with deep brown skin, cobalt-stained fingertips, white turban, and jars of vivid dye.",
      "uniquenessTraits": [
        "dye merchant silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "dye merchant tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-125",
      "identityAnchor": "same person as npc-legacy-125: dye merchant silhouette, distinct face shape, profession costume, memorable prop, bright color accent, dye merchant, halfling, dye merchant tools",
      "portraitBasePrompt": "A graceful human man with deep brown skin, cobalt-stained fingertips, white turban, and jars of vivid dye. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Dye Merchant legacy trade contact.",
      "ancestryOrSpecies": "halfling",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-126",
      "source": "legacy_reworked",
      "originalIndex": 126,
      "seedId": null,
      "finalDisplayName": "Rikka Saltneedle",
      "profession": "Sail Mender",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "sails",
        "cloth",
        "dock"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "sail mender who buys/sells sails, cloth, dock",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A tall half-orc woman with sea-grey skin, red bandana, needle harness, and folded sailcloth over one shoulder.",
      "uniquenessTraits": [
        "sail mender silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "sail mender tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-126",
      "identityAnchor": "same person as npc-legacy-126: sail mender silhouette, distinct face shape, profession costume, memorable prop, bright color accent, sail mender, human, sail mender tools",
      "portraitBasePrompt": "A tall half-orc woman with sea-grey skin, red bandana, needle harness, and folded sailcloth over one shoulder. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Sail Mender legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-127",
      "source": "legacy_reworked",
      "originalIndex": 127,
      "seedId": null,
      "finalDisplayName": "Cori Finchcup",
      "profession": "Tea Seller",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "tea",
        "herbs",
        "luxury"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "tea seller who buys/sells tea, herbs, luxury",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A tiny halfling woman with birdlike nose, green curls, porcelain teapot hat, and stacked tea tins.",
      "uniquenessTraits": [
        "tea seller silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "tea seller tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-127",
      "identityAnchor": "same person as npc-legacy-127: tea seller silhouette, distinct face shape, profession costume, memorable prop, bright color accent, tea seller, human, tea seller tools",
      "portraitBasePrompt": "A tiny halfling woman with birdlike nose, green curls, porcelain teapot hat, and stacked tea tins. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Tea Seller legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-128",
      "source": "legacy_reworked",
      "originalIndex": 128,
      "seedId": null,
      "finalDisplayName": "Mavro Tinlaugh",
      "profession": "Toy Tinker",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "toys",
        "gears",
        "festival"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "toy tinker who buys/sells toys, gears, festival",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A round brass-kin man with tin freckles, spiral moustache, patched red coat, and a dancing wooden toy.",
      "uniquenessTraits": [
        "toy tinker silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "toy tinker tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-128",
      "identityAnchor": "same person as npc-legacy-128: toy tinker silhouette, distinct face shape, profession costume, memorable prop, bright color accent, toy tinker, human, toy tinker tools",
      "portraitBasePrompt": "A round brass-kin man with tin freckles, spiral moustache, patched red coat, and a dancing wooden toy. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Toy Tinker legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": [
        "subtle harmless market-glow around props"
      ]
    },
    {
      "characterId": "npc-legacy-129",
      "source": "legacy_reworked",
      "originalIndex": 129,
      "seedId": null,
      "finalDisplayName": "Sela Moonpepper",
      "profession": "Pickle Witch",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "pickles",
        "jars",
        "preserved_food"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "pickle witch who buys/sells pickles, jars, preserved food",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A blue-green witch with moon freckles, crooked smile, violet scarf, and jars of glowing pickles.",
      "uniquenessTraits": [
        "pickle witch silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "pickle witch tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-129",
      "identityAnchor": "same person as npc-legacy-129: pickle witch silhouette, distinct face shape, profession costume, memorable prop, bright color accent, pickle witch, human, pickle witch tools",
      "portraitBasePrompt": "A blue-green witch with moon freckles, crooked smile, violet scarf, and jars of glowing pickles. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Pickle Witch legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-130",
      "source": "legacy_reworked",
      "originalIndex": 130,
      "seedId": null,
      "finalDisplayName": "Brann Oakfist",
      "profession": "Timber Measurer",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "wood",
        "timber",
        "construction"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "timber measurer who buys/sells wood, timber, construction",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A huge human with bark-brown beard, measuring cord across chest, plaid cloak, and carved timber tally stick.",
      "uniquenessTraits": [
        "timber measurer silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "timber measurer tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-130",
      "identityAnchor": "same person as npc-legacy-130: timber measurer silhouette, distinct face shape, profession costume, memorable prop, bright color accent, timber measurer, halfling, timber measurer tools",
      "portraitBasePrompt": "A huge human with bark-brown beard, measuring cord across chest, plaid cloak, and carved timber tally stick. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Timber Measurer legacy trade contact.",
      "ancestryOrSpecies": "halfling",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-131",
      "source": "legacy_reworked",
      "originalIndex": 131,
      "seedId": null,
      "finalDisplayName": "Yumi Goldscale",
      "profession": "Pearl Buyer",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "pearls",
        "luxury",
        "dock"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "pearl buyer who buys/sells pearls, luxury, dock",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A delicate merfolk-blooded woman with gold-flecked cheeks, white gloves, aquamarine dress, and pearl scales at her temples.",
      "uniquenessTraits": [
        "pearl buyer silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "pearl buyer tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-131",
      "identityAnchor": "same person as npc-legacy-131: pearl buyer silhouette, distinct face shape, profession costume, memorable prop, bright color accent, pearl buyer, human, pearl buyer tools",
      "portraitBasePrompt": "A delicate merfolk-blooded woman with gold-flecked cheeks, white gloves, aquamarine dress, and pearl scales at her temples. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Pearl Buyer legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-132",
      "source": "legacy_reworked",
      "originalIndex": 132,
      "seedId": null,
      "finalDisplayName": "Hasker Redroot",
      "profession": "Beet Farmer",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "vegetables",
        "farm",
        "food"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "beet farmer who buys/sells vegetables, farm, food",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A stout red-bearded dwarf with muddy boots, beet-purple apron, and a basket of enormous red roots.",
      "uniquenessTraits": [
        "beet farmer silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "beet farmer tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-132",
      "identityAnchor": "same person as npc-legacy-132: beet farmer silhouette, distinct face shape, profession costume, memorable prop, bright color accent, beet farmer, human, beet farmer tools",
      "portraitBasePrompt": "A stout red-bearded dwarf with muddy boots, beet-purple apron, and a basket of enormous red roots. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Beet Farmer legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": [
        "subtle harmless market-glow around props"
      ]
    },
    {
      "characterId": "npc-legacy-133",
      "source": "legacy_reworked",
      "originalIndex": 133,
      "seedId": null,
      "finalDisplayName": "Ilyen Starquill",
      "profession": "Letter Writer",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "letters",
        "scribe",
        "rumors"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "letter writer who buys/sells letters, scribe, rumors",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A thin elf with starry dark skin, silver quill behind one ear, blue ink robe, and sealed letters in both hands.",
      "uniquenessTraits": [
        "letter writer silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "letter writer tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-133",
      "identityAnchor": "same person as npc-legacy-133: letter writer silhouette, distinct face shape, profession costume, memorable prop, bright color accent, letter writer, human, letter writer tools",
      "portraitBasePrompt": "A thin elf with starry dark skin, silver quill behind one ear, blue ink robe, and sealed letters in both hands. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Letter Writer legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-134",
      "source": "legacy_reworked",
      "originalIndex": 134,
      "seedId": null,
      "finalDisplayName": "Nora Oxbell",
      "profession": "Pack Bell Seller",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "travel",
        "bells",
        "animals"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "pack bell seller who buys/sells travel, bells, animals",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A broad human woman with warm brown skin, ox-horn hair pins, green vest, and rows of tiny bronze animal bells.",
      "uniquenessTraits": [
        "pack bell seller silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "pack bell seller tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-134",
      "identityAnchor": "same person as npc-legacy-134: pack bell seller silhouette, distinct face shape, profession costume, memorable prop, bright color accent, pack bell seller, human, pack bell seller tools",
      "portraitBasePrompt": "A broad human woman with warm brown skin, ox-horn hair pins, green vest, and rows of tiny bronze animal bells. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Pack Bell Seller legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-135",
      "source": "legacy_reworked",
      "originalIndex": 135,
      "seedId": null,
      "finalDisplayName": "Kef Mosspocket",
      "profession": "Seed Trader",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "seeds",
        "farm",
        "plants"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "seed trader who buys/sells seeds, farm, plants",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A moss-haired gnome with tan skin, patched seed coat, tiny spade, and dozens of labeled seed pouches.",
      "uniquenessTraits": [
        "seed trader silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "seed trader tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-135",
      "identityAnchor": "same person as npc-legacy-135: seed trader silhouette, distinct face shape, profession costume, memorable prop, bright color accent, seed trader, halfling, seed trader tools",
      "portraitBasePrompt": "A moss-haired gnome with tan skin, patched seed coat, tiny spade, and dozens of labeled seed pouches. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Seed Trader legacy trade contact.",
      "ancestryOrSpecies": "halfling",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-136",
      "source": "legacy_reworked",
      "originalIndex": 136,
      "seedId": null,
      "finalDisplayName": "Daro Blackfig",
      "profession": "Fruit Cart Owner",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "fruit",
        "food",
        "market"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "fruit cart owner who buys/sells fruit, food, market",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A handsome dark-skinned human man with black curls, purple sash, and a cart tray of glossy black figs.",
      "uniquenessTraits": [
        "fruit cart owner silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "fruit cart owner tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-136",
      "identityAnchor": "same person as npc-legacy-136: fruit cart owner silhouette, distinct face shape, profession costume, memorable prop, bright color accent, fruit cart owner, human, fruit cart owner tools",
      "portraitBasePrompt": "A handsome dark-skinned human man with black curls, purple sash, and a cart tray of glossy black figs. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Fruit Cart Owner legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": [
        "subtle harmless market-glow around props"
      ]
    },
    {
      "characterId": "npc-legacy-137",
      "source": "legacy_reworked",
      "originalIndex": 137,
      "seedId": null,
      "finalDisplayName": "Pippa Quicksole",
      "profession": "Shoe Cobbler",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "shoes",
        "leather",
        "repair"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "shoe cobbler who buys/sells shoes, leather, repair",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A small halfling with red cheeks, leather cap, awl bracelet, and one boot held proudly aloft.",
      "uniquenessTraits": [
        "shoe cobbler silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "shoe cobbler tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-137",
      "identityAnchor": "same person as npc-legacy-137: shoe cobbler silhouette, distinct face shape, profession costume, memorable prop, bright color accent, shoe cobbler, human, shoe cobbler tools",
      "portraitBasePrompt": "A small halfling with red cheeks, leather cap, awl bracelet, and one boot held proudly aloft. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Shoe Cobbler legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-138",
      "source": "legacy_reworked",
      "originalIndex": 138,
      "seedId": null,
      "finalDisplayName": "Galen Brightmug",
      "profession": "Cup Potter",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "pottery",
        "cups",
        "clay"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "cup potter who buys/sells pottery, cups, clay",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A broad clay-touched man with terracotta skin, white smile, blue apron, and stack of painted mugs.",
      "uniquenessTraits": [
        "cup potter silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "cup potter tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-138",
      "identityAnchor": "same person as npc-legacy-138: cup potter silhouette, distinct face shape, profession costume, memorable prop, bright color accent, cup potter, human, cup potter tools",
      "portraitBasePrompt": "A broad clay-touched man with terracotta skin, white smile, blue apron, and stack of painted mugs. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Cup Potter legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-139",
      "source": "legacy_reworked",
      "originalIndex": 139,
      "seedId": null,
      "finalDisplayName": "Suri Amberpin",
      "profession": "Brooch Seller",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "jewelry",
        "fashion",
        "small_luxury"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "brooch seller who buys/sells jewelry, fashion, small luxury",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A stylish woman with amber eyes, braided hair pinned with insects, yellow dress, and a velvet brooch board.",
      "uniquenessTraits": [
        "brooch seller silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "brooch seller tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-139",
      "identityAnchor": "same person as npc-legacy-139: brooch seller silhouette, distinct face shape, profession costume, memorable prop, bright color accent, brooch seller, human, brooch seller tools",
      "portraitBasePrompt": "A stylish woman with amber eyes, braided hair pinned with insects, yellow dress, and a velvet brooch board. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Brooch Seller legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-140",
      "source": "legacy_reworked",
      "originalIndex": 140,
      "seedId": null,
      "finalDisplayName": "Old Moth Marn",
      "profession": "Candle Wick Spinner",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "candles",
        "wax",
        "religion"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "candle wick spinner who buys/sells candles, wax, religion",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A wrinkled moth-kin elder with soft antennae, grey shawl, and a spool of silver-white candle wick.",
      "uniquenessTraits": [
        "candle wick spinner silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "candle wick spinner tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-140",
      "identityAnchor": "same person as npc-legacy-140: candle wick spinner silhouette, distinct face shape, profession costume, memorable prop, bright color accent, candle wick spinner, halfling, candle wick spinner tools",
      "portraitBasePrompt": "A wrinkled moth-kin elder with soft antennae, grey shawl, and a spool of silver-white candle wick. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Candle Wick Spinner legacy trade contact.",
      "ancestryOrSpecies": "halfling",
      "magicalTraits": [
        "subtle harmless market-glow around props"
      ]
    },
    {
      "characterId": "npc-legacy-141",
      "source": "legacy_reworked",
      "originalIndex": 141,
      "seedId": null,
      "finalDisplayName": "Viko Thorncart",
      "profession": "Cactus Fruit Seller",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "desert_food",
        "fruit",
        "travel"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "cactus fruit seller who buys/sells desert food, fruit, travel",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A wiry desert elf with sun-browned skin, thorn tattoos, blue scarf, and a basket of ruby cactus fruits.",
      "uniquenessTraits": [
        "cactus fruit seller silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "cactus fruit seller tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-141",
      "identityAnchor": "same person as npc-legacy-141: cactus fruit seller silhouette, distinct face shape, profession costume, memorable prop, bright color accent, cactus fruit seller, human, cactus fruit seller tools",
      "portraitBasePrompt": "A wiry desert elf with sun-browned skin, thorn tattoos, blue scarf, and a basket of ruby cactus fruits. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Cactus Fruit Seller legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-142",
      "source": "legacy_reworked",
      "originalIndex": 142,
      "seedId": null,
      "finalDisplayName": "Ansel Copperdrip",
      "profession": "Oil Presser",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "oil",
        "lamps",
        "cooking"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "oil presser who buys/sells oil, lamps, cooking",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A bald human with coppery skin, olive-green apron, brass oil press crank, and shining bottles of golden oil.",
      "uniquenessTraits": [
        "oil presser silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "oil presser tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-142",
      "identityAnchor": "same person as npc-legacy-142: oil presser silhouette, distinct face shape, profession costume, memorable prop, bright color accent, oil presser, human, oil presser tools",
      "portraitBasePrompt": "A bald human with coppery skin, olive-green apron, brass oil press crank, and shining bottles of golden oil. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Oil Presser legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-143",
      "source": "legacy_reworked",
      "originalIndex": 143,
      "seedId": null,
      "finalDisplayName": "Mina Rosehook",
      "profession": "Ribbon Hawker",
      "gameplayGroups": [
        "trade"
      ],
      "roleTags": [
        "ribbons",
        "cloth",
        "festival"
      ],
      "marketFlavor": "market lane",
      "voiceDirection": "lively, profession-proud, quick with gossip",
      "tradePersonality": "ribbon hawker who buys/sells ribbons, cloth, festival",
      "shortStory": "This trader has turned a tiny stall into a landmark by knowing exactly what travelers forget to pack. Their deals are small but frequent, and their gossip often points toward shortages or local events.",
      "visualIdentity": "A young tiefling woman with tiny rose horns, pink curls, striped skirt, and ribbons fluttering from both wrists.",
      "uniquenessTraits": [
        "ribbon hawker silhouette",
        "distinct face shape",
        "profession costume",
        "memorable prop",
        "bright color accent"
      ],
      "professionProps": [
        "ribbon hawker tools",
        "sample goods",
        "small ledger"
      ],
      "dominantColors": [
        "bright accent",
        "warm neutral",
        "profession color"
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
      "portraitFilePrefix": "npc-legacy-143",
      "identityAnchor": "same person as npc-legacy-143: ribbon hawker silhouette, distinct face shape, profession costume, memorable prop, bright color accent, ribbon hawker, human, ribbon hawker tools",
      "portraitBasePrompt": "A young tiefling woman with tiny rose horns, pink curls, striped skirt, and ribbons fluttering from both wrists. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "local shortage",
        "supplier favor",
        "festival demand"
      ],
      "integrationNotes": "Ribbon Hawker legacy trade contact.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-144",
      "source": "legacy_reworked",
      "originalIndex": 144,
      "seedId": null,
      "finalDisplayName": "Rook Ashbutton",
      "profession": "Errand Boy",
      "gameplayGroups": [
        "quest",
        "market_service"
      ],
      "roleTags": [
        "minor",
        "rumor",
        "market_color"
      ],
      "marketFlavor": "side street",
      "voiceDirection": "brief, colorful, memorable",
      "tradePersonality": "minor market character who adds local color",
      "shortStory": "A small but memorable market face who helps the town feel alive and can point the player toward rumors, errands, or shortages without carrying a full shop role.",
      "visualIdentity": "A skinny soot-smudged teen with oversized cap, patched brown vest, and a basket of folded notes.",
      "uniquenessTraits": [
        "errand boy silhouette",
        "distinct small prop",
        "expressive face",
        "local outfit"
      ],
      "professionProps": [
        "errand boy prop",
        "small pouch"
      ],
      "dominantColors": [
        "local color",
        "soft neutral",
        "small bright accent"
      ],
      "expressionTier": "minor",
      "plannedExpressions": [
        {
          "expression": "neutral",
          "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      "portraitFilePrefix": "npc-legacy-144",
      "identityAnchor": "same person as npc-legacy-144: errand boy silhouette, distinct small prop, expressive face, local outfit, errand boy, human, errand boy prop",
      "portraitBasePrompt": "A skinny soot-smudged teen with oversized cap, patched brown vest, and a basket of folded notes. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "tiny errand",
        "local rumor",
        "market mood"
      ],
      "integrationNotes": "Minor atmosphere and rumor NPC.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-145",
      "source": "legacy_reworked",
      "originalIndex": 145,
      "seedId": null,
      "finalDisplayName": "Nella Puddleboot",
      "profession": "Rainwater Seller",
      "gameplayGroups": [
        "quest",
        "market_service"
      ],
      "roleTags": [
        "minor",
        "rumor",
        "market_color"
      ],
      "marketFlavor": "side street",
      "voiceDirection": "brief, colorful, memorable",
      "tradePersonality": "minor market character who adds local color",
      "shortStory": "A small but memorable market face who helps the town feel alive and can point the player toward rumors, errands, or shortages without carrying a full shop role.",
      "visualIdentity": "A short cheerful girl with blue raincoat, bucket hat, and tiny bottles of clean rainwater.",
      "uniquenessTraits": [
        "rainwater seller silhouette",
        "distinct small prop",
        "expressive face",
        "local outfit"
      ],
      "professionProps": [
        "rainwater seller prop",
        "small pouch"
      ],
      "dominantColors": [
        "local color",
        "soft neutral",
        "small bright accent"
      ],
      "expressionTier": "minor",
      "plannedExpressions": [
        {
          "expression": "neutral",
          "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      "portraitFilePrefix": "npc-legacy-145",
      "identityAnchor": "same person as npc-legacy-145: rainwater seller silhouette, distinct small prop, expressive face, local outfit, rainwater seller, human, rainwater seller prop",
      "portraitBasePrompt": "A short cheerful girl with blue raincoat, bucket hat, and tiny bottles of clean rainwater. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "tiny errand",
        "local rumor",
        "market mood"
      ],
      "integrationNotes": "Minor atmosphere and rumor NPC.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-146",
      "source": "legacy_reworked",
      "originalIndex": 146,
      "seedId": null,
      "finalDisplayName": "Fenn Silverrat",
      "profession": "Alley Rumor Kid",
      "gameplayGroups": [
        "quest",
        "market_service"
      ],
      "roleTags": [
        "minor",
        "rumor",
        "market_color"
      ],
      "marketFlavor": "side street",
      "voiceDirection": "brief, colorful, memorable",
      "tradePersonality": "minor market character who adds local color",
      "shortStory": "A small but memorable market face who helps the town feel alive and can point the player toward rumors, errands, or shortages without carrying a full shop role.",
      "visualIdentity": "A sharp-eyed rat-kin youth with grey fur, red scarf, and a stolen-looking apple.",
      "uniquenessTraits": [
        "alley rumor kid silhouette",
        "distinct small prop",
        "expressive face",
        "local outfit"
      ],
      "professionProps": [
        "alley rumor kid prop",
        "small pouch"
      ],
      "dominantColors": [
        "local color",
        "soft neutral",
        "small bright accent"
      ],
      "expressionTier": "minor",
      "plannedExpressions": [
        {
          "expression": "neutral",
          "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      "portraitFilePrefix": "npc-legacy-146",
      "identityAnchor": "same person as npc-legacy-146: alley rumor kid silhouette, distinct small prop, expressive face, local outfit, alley rumor kid, rat-kin, alley rumor kid prop",
      "portraitBasePrompt": "A sharp-eyed rat-kin youth with grey fur, red scarf, and a stolen-looking apple. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "tiny errand",
        "local rumor",
        "market mood"
      ],
      "integrationNotes": "Minor atmosphere and rumor NPC.",
      "ancestryOrSpecies": "rat-kin",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-147",
      "source": "legacy_reworked",
      "originalIndex": 147,
      "seedId": null,
      "finalDisplayName": "Oma Lentilsmile",
      "profession": "Soup Auntie",
      "gameplayGroups": [
        "quest",
        "market_service"
      ],
      "roleTags": [
        "minor",
        "rumor",
        "market_color"
      ],
      "marketFlavor": "side street",
      "voiceDirection": "brief, colorful, memorable",
      "tradePersonality": "minor market character who adds local color",
      "shortStory": "A small but memorable market face who helps the town feel alive and can point the player toward rumors, errands, or shortages without carrying a full shop role.",
      "visualIdentity": "A round elderly woman with dark skin, yellow shawl, and a steaming soup ladle.",
      "uniquenessTraits": [
        "soup auntie silhouette",
        "distinct small prop",
        "expressive face",
        "local outfit"
      ],
      "professionProps": [
        "soup auntie prop",
        "small pouch"
      ],
      "dominantColors": [
        "local color",
        "soft neutral",
        "small bright accent"
      ],
      "expressionTier": "minor",
      "plannedExpressions": [
        {
          "expression": "neutral",
          "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      "portraitFilePrefix": "npc-legacy-147",
      "identityAnchor": "same person as npc-legacy-147: soup auntie silhouette, distinct small prop, expressive face, local outfit, soup auntie, human, soup auntie prop",
      "portraitBasePrompt": "A round elderly woman with dark skin, yellow shawl, and a steaming soup ladle. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "tiny errand",
        "local rumor",
        "market mood"
      ],
      "integrationNotes": "Minor atmosphere and rumor NPC.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-148",
      "source": "legacy_reworked",
      "originalIndex": 148,
      "seedId": null,
      "finalDisplayName": "Bix Candletoe",
      "profession": "Temple Sweeper",
      "gameplayGroups": [
        "quest",
        "market_service"
      ],
      "roleTags": [
        "minor",
        "rumor",
        "market_color"
      ],
      "marketFlavor": "side street",
      "voiceDirection": "brief, colorful, memorable",
      "tradePersonality": "minor market character who adds local color",
      "shortStory": "A small but memorable market face who helps the town feel alive and can point the player toward rumors, errands, or shortages without carrying a full shop role.",
      "visualIdentity": "A tiny goblin with candle wax on shoes, green ears, and a broom twice his height.",
      "uniquenessTraits": [
        "temple sweeper silhouette",
        "distinct small prop",
        "expressive face",
        "local outfit"
      ],
      "professionProps": [
        "temple sweeper prop",
        "small pouch"
      ],
      "dominantColors": [
        "local color",
        "soft neutral",
        "small bright accent"
      ],
      "expressionTier": "minor",
      "plannedExpressions": [
        {
          "expression": "neutral",
          "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      "portraitFilePrefix": "npc-legacy-148",
      "identityAnchor": "same person as npc-legacy-148: temple sweeper silhouette, distinct small prop, expressive face, local outfit, temple sweeper, goblin, temple sweeper prop",
      "portraitBasePrompt": "A tiny goblin with candle wax on shoes, green ears, and a broom twice his height. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "tiny errand",
        "local rumor",
        "market mood"
      ],
      "integrationNotes": "Minor atmosphere and rumor NPC.",
      "ancestryOrSpecies": "goblin",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-149",
      "source": "legacy_reworked",
      "originalIndex": 149,
      "seedId": null,
      "finalDisplayName": "Hanna Milkbell",
      "profession": "Stable Helper",
      "gameplayGroups": [
        "quest",
        "market_service"
      ],
      "roleTags": [
        "minor",
        "rumor",
        "market_color"
      ],
      "marketFlavor": "side street",
      "voiceDirection": "brief, colorful, memorable",
      "tradePersonality": "minor market character who adds local color",
      "shortStory": "A small but memorable market face who helps the town feel alive and can point the player toward rumors, errands, or shortages without carrying a full shop role.",
      "visualIdentity": "A freckled stable girl with straw in hair, brown apron, and little silver cow bell.",
      "uniquenessTraits": [
        "stable helper silhouette",
        "distinct small prop",
        "expressive face",
        "local outfit"
      ],
      "professionProps": [
        "stable helper prop",
        "small pouch"
      ],
      "dominantColors": [
        "local color",
        "soft neutral",
        "small bright accent"
      ],
      "expressionTier": "minor",
      "plannedExpressions": [
        {
          "expression": "neutral",
          "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      "portraitFilePrefix": "npc-legacy-149",
      "identityAnchor": "same person as npc-legacy-149: stable helper silhouette, distinct small prop, expressive face, local outfit, stable helper, human, stable helper prop",
      "portraitBasePrompt": "A freckled stable girl with straw in hair, brown apron, and little silver cow bell. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "tiny errand",
        "local rumor",
        "market mood"
      ],
      "integrationNotes": "Minor atmosphere and rumor NPC.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-150",
      "source": "legacy_reworked",
      "originalIndex": 150,
      "seedId": null,
      "finalDisplayName": "Torro Greycap",
      "profession": "Old Porter",
      "gameplayGroups": [
        "quest",
        "market_service"
      ],
      "roleTags": [
        "minor",
        "rumor",
        "market_color"
      ],
      "marketFlavor": "side street",
      "voiceDirection": "brief, colorful, memorable",
      "tradePersonality": "minor market character who adds local color",
      "shortStory": "A small but memorable market face who helps the town feel alive and can point the player toward rumors, errands, or shortages without carrying a full shop role.",
      "visualIdentity": "A hunched old man with grey cap, rope belt, and padded shoulder board.",
      "uniquenessTraits": [
        "old porter silhouette",
        "distinct small prop",
        "expressive face",
        "local outfit"
      ],
      "professionProps": [
        "old porter prop",
        "small pouch"
      ],
      "dominantColors": [
        "local color",
        "soft neutral",
        "small bright accent"
      ],
      "expressionTier": "minor",
      "plannedExpressions": [
        {
          "expression": "neutral",
          "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      "portraitFilePrefix": "npc-legacy-150",
      "identityAnchor": "same person as npc-legacy-150: old porter silhouette, distinct small prop, expressive face, local outfit, old porter, human, old porter prop",
      "portraitBasePrompt": "A hunched old man with grey cap, rope belt, and padded shoulder board. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "tiny errand",
        "local rumor",
        "market mood"
      ],
      "integrationNotes": "Minor atmosphere and rumor NPC.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-151",
      "source": "legacy_reworked",
      "originalIndex": 151,
      "seedId": null,
      "finalDisplayName": "Lulu Finchseed",
      "profession": "Bird Feed Girl",
      "gameplayGroups": [
        "quest",
        "market_service"
      ],
      "roleTags": [
        "minor",
        "rumor",
        "market_color"
      ],
      "marketFlavor": "side street",
      "voiceDirection": "brief, colorful, memorable",
      "tradePersonality": "minor market character who adds local color",
      "shortStory": "A small but memorable market face who helps the town feel alive and can point the player toward rumors, errands, or shortages without carrying a full shop role.",
      "visualIdentity": "A childlike halfling with bird feathers in curls, seed pouch, and sparrow perched nearby.",
      "uniquenessTraits": [
        "bird feed girl silhouette",
        "distinct small prop",
        "expressive face",
        "local outfit"
      ],
      "professionProps": [
        "bird feed girl prop",
        "small pouch"
      ],
      "dominantColors": [
        "local color",
        "soft neutral",
        "small bright accent"
      ],
      "expressionTier": "minor",
      "plannedExpressions": [
        {
          "expression": "neutral",
          "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      "portraitFilePrefix": "npc-legacy-151",
      "identityAnchor": "same person as npc-legacy-151: bird feed girl silhouette, distinct small prop, expressive face, local outfit, bird feed girl, halfling, bird feed girl prop",
      "portraitBasePrompt": "A childlike halfling with bird feathers in curls, seed pouch, and sparrow perched nearby. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "tiny errand",
        "local rumor",
        "market mood"
      ],
      "integrationNotes": "Minor atmosphere and rumor NPC.",
      "ancestryOrSpecies": "halfling",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-152",
      "source": "legacy_reworked",
      "originalIndex": 152,
      "seedId": null,
      "finalDisplayName": "Cricket Marigold",
      "profession": "Flower Runner",
      "gameplayGroups": [
        "quest",
        "market_service"
      ],
      "roleTags": [
        "minor",
        "rumor",
        "market_color"
      ],
      "marketFlavor": "side street",
      "voiceDirection": "brief, colorful, memorable",
      "tradePersonality": "minor market character who adds local color",
      "shortStory": "A small but memorable market face who helps the town feel alive and can point the player toward rumors, errands, or shortages without carrying a full shop role.",
      "visualIdentity": "A bright young elf with marigold crown, green tunic, and armful of fresh flowers.",
      "uniquenessTraits": [
        "flower runner silhouette",
        "distinct small prop",
        "expressive face",
        "local outfit"
      ],
      "professionProps": [
        "flower runner prop",
        "small pouch"
      ],
      "dominantColors": [
        "local color",
        "soft neutral",
        "small bright accent"
      ],
      "expressionTier": "minor",
      "plannedExpressions": [
        {
          "expression": "neutral",
          "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      "portraitFilePrefix": "npc-legacy-152",
      "identityAnchor": "same person as npc-legacy-152: flower runner silhouette, distinct small prop, expressive face, local outfit, flower runner, elf, flower runner prop",
      "portraitBasePrompt": "A bright young elf with marigold crown, green tunic, and armful of fresh flowers. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "tiny errand",
        "local rumor",
        "market mood"
      ],
      "integrationNotes": "Minor atmosphere and rumor NPC.",
      "ancestryOrSpecies": "elf",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-153",
      "source": "legacy_reworked",
      "originalIndex": 153,
      "seedId": null,
      "finalDisplayName": "Dumple Grin",
      "profession": "Pie Shouter",
      "gameplayGroups": [
        "quest",
        "market_service"
      ],
      "roleTags": [
        "minor",
        "rumor",
        "market_color"
      ],
      "marketFlavor": "side street",
      "voiceDirection": "brief, colorful, memorable",
      "tradePersonality": "minor market character who adds local color",
      "shortStory": "A small but memorable market face who helps the town feel alive and can point the player toward rumors, errands, or shortages without carrying a full shop role.",
      "visualIdentity": "A round gnome with huge grin, cherry-stained apron, and tiny handbell.",
      "uniquenessTraits": [
        "pie shouter silhouette",
        "distinct small prop",
        "expressive face",
        "local outfit"
      ],
      "professionProps": [
        "pie shouter prop",
        "small pouch"
      ],
      "dominantColors": [
        "local color",
        "soft neutral",
        "small bright accent"
      ],
      "expressionTier": "minor",
      "plannedExpressions": [
        {
          "expression": "neutral",
          "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      "portraitFilePrefix": "npc-legacy-153",
      "identityAnchor": "same person as npc-legacy-153: pie shouter silhouette, distinct small prop, expressive face, local outfit, pie shouter, human, pie shouter prop",
      "portraitBasePrompt": "A round gnome with huge grin, cherry-stained apron, and tiny handbell. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "tiny errand",
        "local rumor",
        "market mood"
      ],
      "integrationNotes": "Minor atmosphere and rumor NPC.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-154",
      "source": "legacy_reworked",
      "originalIndex": 154,
      "seedId": null,
      "finalDisplayName": "Sable Thread",
      "profession": "Quiet Seamstress",
      "gameplayGroups": [
        "quest",
        "market_service"
      ],
      "roleTags": [
        "minor",
        "rumor",
        "market_color"
      ],
      "marketFlavor": "side street",
      "voiceDirection": "brief, colorful, memorable",
      "tradePersonality": "minor market character who adds local color",
      "shortStory": "A small but memorable market face who helps the town feel alive and can point the player toward rumors, errands, or shortages without carrying a full shop role.",
      "visualIdentity": "A shy dark-haired woman with needle case necklace, black shawl, and folded mending cloth.",
      "uniquenessTraits": [
        "quiet seamstress silhouette",
        "distinct small prop",
        "expressive face",
        "local outfit"
      ],
      "professionProps": [
        "quiet seamstress prop",
        "small pouch"
      ],
      "dominantColors": [
        "local color",
        "soft neutral",
        "small bright accent"
      ],
      "expressionTier": "minor",
      "plannedExpressions": [
        {
          "expression": "neutral",
          "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      "portraitFilePrefix": "npc-legacy-154",
      "identityAnchor": "same person as npc-legacy-154: quiet seamstress silhouette, distinct small prop, expressive face, local outfit, quiet seamstress, human, quiet seamstress prop",
      "portraitBasePrompt": "A shy dark-haired woman with needle case necklace, black shawl, and folded mending cloth. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "tiny errand",
        "local rumor",
        "market mood"
      ],
      "integrationNotes": "Minor atmosphere and rumor NPC.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-155",
      "source": "legacy_reworked",
      "originalIndex": 155,
      "seedId": null,
      "finalDisplayName": "Porrin Mudthumb",
      "profession": "Pot Washer",
      "gameplayGroups": [
        "quest",
        "market_service"
      ],
      "roleTags": [
        "minor",
        "rumor",
        "market_color"
      ],
      "marketFlavor": "side street",
      "voiceDirection": "brief, colorful, memorable",
      "tradePersonality": "minor market character who adds local color",
      "shortStory": "A small but memorable market face who helps the town feel alive and can point the player toward rumors, errands, or shortages without carrying a full shop role.",
      "visualIdentity": "A muddy-kneed boy with clay hands, oversized sleeves, and stack of tin cups.",
      "uniquenessTraits": [
        "pot washer silhouette",
        "distinct small prop",
        "expressive face",
        "local outfit"
      ],
      "professionProps": [
        "pot washer prop",
        "small pouch"
      ],
      "dominantColors": [
        "local color",
        "soft neutral",
        "small bright accent"
      ],
      "expressionTier": "minor",
      "plannedExpressions": [
        {
          "expression": "neutral",
          "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      "portraitFilePrefix": "npc-legacy-155",
      "identityAnchor": "same person as npc-legacy-155: pot washer silhouette, distinct small prop, expressive face, local outfit, pot washer, human, pot washer prop",
      "portraitBasePrompt": "A muddy-kneed boy with clay hands, oversized sleeves, and stack of tin cups. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "tiny errand",
        "local rumor",
        "market mood"
      ],
      "integrationNotes": "Minor atmosphere and rumor NPC.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-156",
      "source": "legacy_reworked",
      "originalIndex": 156,
      "seedId": null,
      "finalDisplayName": "Vela Starling",
      "profession": "Window Singer",
      "gameplayGroups": [
        "quest",
        "market_service"
      ],
      "roleTags": [
        "minor",
        "rumor",
        "market_color"
      ],
      "marketFlavor": "side street",
      "voiceDirection": "brief, colorful, memorable",
      "tradePersonality": "minor market character who adds local color",
      "shortStory": "A small but memorable market face who helps the town feel alive and can point the player toward rumors, errands, or shortages without carrying a full shop role.",
      "visualIdentity": "A slim moon-touched girl with silver braids, blue cloak, and tiny bell chimes.",
      "uniquenessTraits": [
        "window singer silhouette",
        "distinct small prop",
        "expressive face",
        "local outfit"
      ],
      "professionProps": [
        "window singer prop",
        "small pouch"
      ],
      "dominantColors": [
        "local color",
        "soft neutral",
        "small bright accent"
      ],
      "expressionTier": "minor",
      "plannedExpressions": [
        {
          "expression": "neutral",
          "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      "portraitFilePrefix": "npc-legacy-156",
      "identityAnchor": "same person as npc-legacy-156: window singer silhouette, distinct small prop, expressive face, local outfit, window singer, human, window singer prop",
      "portraitBasePrompt": "A slim moon-touched girl with silver braids, blue cloak, and tiny bell chimes. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "tiny errand",
        "local rumor",
        "market mood"
      ],
      "integrationNotes": "Minor atmosphere and rumor NPC.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-157",
      "source": "legacy_reworked",
      "originalIndex": 157,
      "seedId": null,
      "finalDisplayName": "Hobb Nettle",
      "profession": "Goat Minder",
      "gameplayGroups": [
        "quest",
        "market_service"
      ],
      "roleTags": [
        "minor",
        "rumor",
        "market_color"
      ],
      "marketFlavor": "side street",
      "voiceDirection": "brief, colorful, memorable",
      "tradePersonality": "minor market character who adds local color",
      "shortStory": "A small but memorable market face who helps the town feel alive and can point the player toward rumors, errands, or shortages without carrying a full shop role.",
      "visualIdentity": "A scruffy boy with nettle-green vest, crooked grin, and baby goat tucked under arm.",
      "uniquenessTraits": [
        "goat minder silhouette",
        "distinct small prop",
        "expressive face",
        "local outfit"
      ],
      "professionProps": [
        "goat minder prop",
        "small pouch"
      ],
      "dominantColors": [
        "local color",
        "soft neutral",
        "small bright accent"
      ],
      "expressionTier": "minor",
      "plannedExpressions": [
        {
          "expression": "neutral",
          "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      "portraitFilePrefix": "npc-legacy-157",
      "identityAnchor": "same person as npc-legacy-157: goat minder silhouette, distinct small prop, expressive face, local outfit, goat minder, human, goat minder prop",
      "portraitBasePrompt": "A scruffy boy with nettle-green vest, crooked grin, and baby goat tucked under arm. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "tiny errand",
        "local rumor",
        "market mood"
      ],
      "integrationNotes": "Minor atmosphere and rumor NPC.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-158",
      "source": "legacy_reworked",
      "originalIndex": 158,
      "seedId": null,
      "finalDisplayName": "Miss Bristle",
      "profession": "Brush Seller",
      "gameplayGroups": [
        "quest",
        "market_service"
      ],
      "roleTags": [
        "minor",
        "rumor",
        "market_color"
      ],
      "marketFlavor": "side street",
      "voiceDirection": "brief, colorful, memorable",
      "tradePersonality": "minor market character who adds local color",
      "shortStory": "A small but memorable market face who helps the town feel alive and can point the player toward rumors, errands, or shortages without carrying a full shop role.",
      "visualIdentity": "A hedgehog-kin woman with tiny bristles, pink bonnet, and fan of brushes.",
      "uniquenessTraits": [
        "brush seller silhouette",
        "distinct small prop",
        "expressive face",
        "local outfit"
      ],
      "professionProps": [
        "brush seller prop",
        "small pouch"
      ],
      "dominantColors": [
        "local color",
        "soft neutral",
        "small bright accent"
      ],
      "expressionTier": "minor",
      "plannedExpressions": [
        {
          "expression": "neutral",
          "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      "portraitFilePrefix": "npc-legacy-158",
      "identityAnchor": "same person as npc-legacy-158: brush seller silhouette, distinct small prop, expressive face, local outfit, brush seller, hedgehog-kin, brush seller prop",
      "portraitBasePrompt": "A hedgehog-kin woman with tiny bristles, pink bonnet, and fan of brushes. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "tiny errand",
        "local rumor",
        "market mood"
      ],
      "integrationNotes": "Minor atmosphere and rumor NPC.",
      "ancestryOrSpecies": "hedgehog-kin",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-159",
      "source": "legacy_reworked",
      "originalIndex": 159,
      "seedId": null,
      "finalDisplayName": "Oti Pebblepalm",
      "profession": "Stone Counter",
      "gameplayGroups": [
        "quest",
        "market_service"
      ],
      "roleTags": [
        "minor",
        "rumor",
        "market_color"
      ],
      "marketFlavor": "side street",
      "voiceDirection": "brief, colorful, memorable",
      "tradePersonality": "minor market character who adds local color",
      "shortStory": "A small but memorable market face who helps the town feel alive and can point the player toward rumors, errands, or shortages without carrying a full shop role.",
      "visualIdentity": "A calm dwarf child with pebble necklace, slate board, and chalky fingers.",
      "uniquenessTraits": [
        "stone counter silhouette",
        "distinct small prop",
        "expressive face",
        "local outfit"
      ],
      "professionProps": [
        "stone counter prop",
        "small pouch"
      ],
      "dominantColors": [
        "local color",
        "soft neutral",
        "small bright accent"
      ],
      "expressionTier": "minor",
      "plannedExpressions": [
        {
          "expression": "neutral",
          "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      "portraitFilePrefix": "npc-legacy-159",
      "identityAnchor": "same person as npc-legacy-159: stone counter silhouette, distinct small prop, expressive face, local outfit, stone counter, dwarf, stone counter prop",
      "portraitBasePrompt": "A calm dwarf child with pebble necklace, slate board, and chalky fingers. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "tiny errand",
        "local rumor",
        "market mood"
      ],
      "integrationNotes": "Minor atmosphere and rumor NPC.",
      "ancestryOrSpecies": "dwarf",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-160",
      "source": "legacy_reworked",
      "originalIndex": 160,
      "seedId": null,
      "finalDisplayName": "Glim Tallow",
      "profession": "Lamp Lighter",
      "gameplayGroups": [
        "quest",
        "market_service"
      ],
      "roleTags": [
        "minor",
        "rumor",
        "market_color"
      ],
      "marketFlavor": "side street",
      "voiceDirection": "brief, colorful, memorable",
      "tradePersonality": "minor market character who adds local color",
      "shortStory": "A small but memorable market face who helps the town feel alive and can point the player toward rumors, errands, or shortages without carrying a full shop role.",
      "visualIdentity": "A lanky young man with soot nose, orange scarf, and brass lamp snuffer.",
      "uniquenessTraits": [
        "lamp lighter silhouette",
        "distinct small prop",
        "expressive face",
        "local outfit"
      ],
      "professionProps": [
        "lamp lighter prop",
        "small pouch"
      ],
      "dominantColors": [
        "local color",
        "soft neutral",
        "small bright accent"
      ],
      "expressionTier": "minor",
      "plannedExpressions": [
        {
          "expression": "neutral",
          "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      "portraitFilePrefix": "npc-legacy-160",
      "identityAnchor": "same person as npc-legacy-160: lamp lighter silhouette, distinct small prop, expressive face, local outfit, lamp lighter, human, lamp lighter prop",
      "portraitBasePrompt": "A lanky young man with soot nose, orange scarf, and brass lamp snuffer. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "tiny errand",
        "local rumor",
        "market mood"
      ],
      "integrationNotes": "Minor atmosphere and rumor NPC.",
      "ancestryOrSpecies": "human",
      "magicalTraits": []
    },
    {
      "characterId": "npc-legacy-161",
      "source": "legacy_reworked",
      "originalIndex": 161,
      "seedId": null,
      "finalDisplayName": "Mera Softstep",
      "profession": "Quiet Courier",
      "gameplayGroups": [
        "quest",
        "market_service"
      ],
      "roleTags": [
        "minor",
        "rumor",
        "market_color"
      ],
      "marketFlavor": "side street",
      "voiceDirection": "brief, colorful, memorable",
      "tradePersonality": "minor market character who adds local color",
      "shortStory": "A small but memorable market face who helps the town feel alive and can point the player toward rumors, errands, or shortages without carrying a full shop role.",
      "visualIdentity": "A nimble cat-kin girl with tawny ears, blue satchel, and sealed packet.",
      "uniquenessTraits": [
        "quiet courier silhouette",
        "distinct small prop",
        "expressive face",
        "local outfit"
      ],
      "professionProps": [
        "quiet courier prop",
        "small pouch"
      ],
      "dominantColors": [
        "local color",
        "soft neutral",
        "small bright accent"
      ],
      "expressionTier": "minor",
      "plannedExpressions": [
        {
          "expression": "neutral",
          "actingDirection": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged",
          "promptDelta": "calm neutral expression, readable face, relaxed mouth, direct eye contact, identity anchors unchanged"
        }
      ],
      "portraitFilePrefix": "npc-legacy-161",
      "identityAnchor": "same person as npc-legacy-161: quiet courier silhouette, distinct small prop, expressive face, local outfit, quiet courier, cat-kin, quiet courier prop",
      "portraitBasePrompt": "A nimble cat-kin girl with tawny ears, blue satchel, and sealed packet. stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, expressive, entertaining, natural facial acting, clear profession silhouette, varied body shapes, rich costume accents, crop-safe bust portrait, one flat solid pure green #00FF00 background",
      "negativePrompt": "no text, no labels, no letters, no numbers, no watermark, no UI frame, no visible border, no visible grid lines, no colored cell panels, no cropped head, no cropped shoulders, no cropped hands, no cropped props, no prop touching edge, no extra limbs, no full-body scene, no photorealism, no anime, no modern clothes, no sci-fi, no gritty realism, no boring plain medieval worker, no generic identical NPC face, no duplicate faces across different characters, no busy background, no gradient background",
      "questHooks": [
        "tiny errand",
        "local rumor",
        "market mood"
      ],
      "integrationNotes": "Minor atmosphere and rumor NPC.",
      "ancestryOrSpecies": "cat-kin",
      "magicalTraits": []
    }
  ]
} as const satisfies CharacterIdentityCatalogBatch;

export const legacyIdentityCatalogBatch03PortraitImageCount = getIdentityBatchPortraitImageCount(
  characterIdentityCatalogLegacyBatch03,
);
