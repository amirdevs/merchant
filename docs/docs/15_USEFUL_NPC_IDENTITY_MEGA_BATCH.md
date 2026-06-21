# 15 - Useful NPC Identity Mega Batch

This doc records the second Phase B identity catalog batch.

This batch completes the useful-new-NPC identity catalog before legacy-slot identity rewriting begins.

## Portrait generation status

```text
STILL BLOCKED
```

Do not generate portraits yet. This batch creates final names, stories, visual identities, expression tiers, and portrait anchors. It is not the final portrait manifest.

## Files added

```text
src/data/characters/characterIdentityCatalogBatch02.ts
src/data/characters/characterIdentityCatalog.ts
docs/assets/character-prompts/05_USEFUL_NPC_IDENTITY_MEGA_BATCH_PROMPT_PLAN.md
docs/assets/character-prompts/portrait-batch-identity-002.json
```

## Batch 02 coverage

| ID | Final name | Role | Tier | Planned images |
|---|---|---|---|---:|
| `npc-new-017` | Tessa Cratewell | Warehouse Keeper | major | 5 |
| `npc-new-018` | Corvin Sailstamp | Shipment Broker | major | 5 |
| `npc-new-019` | Idra Sumbright | Company Accountant | major | 5 |
| `npc-new-020` | Lord Pavren Duskmere | Investor | major | 5 |
| `npc-new-021` | Mara Debtneedle | Debt Collector | major | 5 |
| `npc-new-022` | Fenro Shieldpaper | Insurance Agent | merchant | 3 |
| `npc-new-023` | Rudo Dockhand-King | Dock Foreman | major | 5 |
| `npc-new-024` | Linna Axlewise | Cartwright | merchant | 3 |
| `npc-new-025` | Nessa Pinboard | Contract Board Clerk | major | 5 |
| `npc-new-026` | Master Edrin Vowmark | Guild Representative | major | 5 |
| `npc-new-027` | Osha Rainbarrel | Missing Shipment Witness | minor | 1 |
| `npc-new-028` | Kael Varnish | Rival Merchant | major | 5 |
| `npc-new-029` | Lady Sermira Goldveil | Noble Patron | major | 5 |
| `npc-new-030` | Brother Calven Ashlamp | Religious Relic Buyer | merchant | 3 |
| `npc-new-031` | Yara Whispercup | Rumor Seller | major | 5 |
| `npc-new-032` | Elo Juniperseal | Public Scribe | merchant | 3 |
| `npc-new-033` | Rook Velvetknife | Black Market Fence | major | 5 |
| `npc-new-034` | Pip Sootheel | Thief Contact | merchant | 3 |
| `npc-new-035` | Sergeant Borran Clink | Corrupt Guard | major | 5 |
| `npc-new-036` | Tala Bittermint | Contraband Buyer | merchant | 3 |
| `npc-new-037` | Nim Crowstep | Night Courier | major | 5 |
| `npc-new-038` | Vel Tallowmark | Forger | merchant | 3 |
| `npc-new-039` | Harlon Briarjaw | Bounty Hunter | major | 5 |
| `npc-new-040` | Advocate Sel Orison | Legal Advocate | merchant | 3 |
| `npc-new-041` | Drava Bitterroot | Apothecary Buyer | merchant | 3 |
| `npc-new-042` | Iven Starfold | Mapmaker | major | 5 |
| `npc-new-043` | Sorna Maneclip | Beast Handler | merchant | 3 |
| `npc-new-044` | Qadir Saffron-Tongue | Spice Authenticator | merchant | 3 |
| `npc-new-045` | Mina Bluevat | Fabric Dyer | merchant | 3 |
| `npc-new-046` | Pavel Gemquiet | Gem Cutter | merchant | 3 |
| `npc-new-047` | Beni Tick-Tally | Tally Repairer | merchant | 3 |
| `npc-new-048` | Hessa Pilgrim-Marshal | Pilgrim Quartermaster | major | 5 |

Batch 02 totals:

```text
32 characters
128 planned portrait images
```

Useful-new-NPC identity catalog totals after Batch 01 + Batch 02:

```text
48 useful new NPC identities
194 planned useful-new-NPC portrait images
```

## Why this is a mega-batch

The previous roadmap had too many tiny steps. From this point forward, character work should move in larger useful chunks:

```text
finish useful NPC identities -> rewrite legacy identities in large groups -> final portrait manifest -> one test sheet -> full portrait sheets
```

## Prompt batching reminder

Prompt batches are based on total portrait images, not character count. The draft JSON in this step only provides a 20-image seed batch for future testing. It is not approval to generate all portraits.

## Next phase-B work

Start the legacy-slot identity mega-batches:

```text
legacy generated records -> new public names/stories/looks/expression tiers
```

Keep internal original indexes stable until runtime migration is safe.
