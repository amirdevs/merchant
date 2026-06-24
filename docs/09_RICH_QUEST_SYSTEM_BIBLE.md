# 09 - Rich Quest System Bible

This document defines the confirmed direction and implementation rules for the new original quest system.

The remake should not keep the old reference-game quest content. Old marketplace quests may remain temporarily as legacy data while migration is in progress, but they are not the creative or runtime target for the remake.

## Core rule

A quest is not a todo.

A quest is a merchant story with a person, a pressure, a trade problem, a choice, a consequence, and a reward.

Bad quest shape:

```text
Bring 10 wheat.
Reward: 50 gold.
```

Target quest shape:

```text
A baker's ovens are cold because her flour shipment disappeared. The city thinks she is hoarding grain. Her supplier says the cargo was legally redirected by a guild tax officer. The player must decide whether to replace the flour, expose the officer, steal the cargo back, or exploit the shortage for profit.
```

Every important quest should make the player feel like a merchant making a meaningful decision, not a robot completing a checklist.

## Design pillars

1. **Merchant-first gameplay** - quests should use buying, selling, delivery, scarcity, negotiation, route risk, reputation, contracts, company growth, and market manipulation.
2. **Rich story framing** - every authored quest needs context, character motivation, conflict, and stakes.
3. **Meaningful choices** - important quests should support multiple solutions, not one forced path.
4. **Consequences that persist** - quests should affect NPC trust, city reputation, market prices, route safety, factions, company options, and future quest availability.
5. **Main goals to finish the game** - players need several long-term objectives so they always know what they are working toward.
6. **Side content supports the campaign** - side quests and NPC questlines should feed into the main campaign, not feel detached.
7. **Repeatable work still has flavor** - generated trade contracts can be shorter, but they should still have a reason, a client, a deadline, and a visible effect.
8. **Runtime memory matters** - a quest consequence is not complete until it is stored in GameState/save/export and can affect later play.

## Quest layers

| Layer | Purpose | Content type |
|---|---|---|
| Main campaign quests | Give the player direction, progression, and endings | Long-form authored story quests |
| Character questlines | Make NPCs memorable and create relationships | Multi-step NPC arcs |
| Side quests and contracts | Keep markets alive and create replayability | Rich side quests plus repeatable trade contracts |

## Main campaign premise

### The Ledger That Bought a City

The player begins as a small trader who receives an old merchant ledger. At first it looks like a useless debt book filled with names, old cargo marks, unpaid favors, broken route agreements, and forgotten warehouse claims.

As the player trades, travels, and investigates, the ledger proves to be dangerous. It contains records of hidden debts, forged contracts, old guild crimes, illegal route monopolies, and ownership claims that can reshape the region's economy.

The player must use trade, trust, contracts, and company power to survive rivals and decide what kind of merchant world they will build.

## Campaign acts

1. **The First Ledger** - basic trade, hidden obligations, altered records, suspicious prices.
2. **Roads and Debts** - tolls, weather, delivery deadlines, disputed cargo, route risk.
3. **The Guild War** - false standards, auction access, price fixing, warehouse fraud, rival pressure.
4. **The Company Charter** - company registration, clerks, warehouse, caravan papers, guild recognition.
5. **The Final Market** - market access, city law, rival ledger, guild vote, and final ending choice.

## Possible endings

Endings should be based on accumulated choices, not a single final button.

| Ending | Path |
|---|---|
| Fair Trade Ending | The player builds a stable, transparent trade network and earns broad public trust. |
| Guildmaster Ending | The player reforms or captures the official guild and becomes its leader. |
| Shadow Ledger Ending | The player controls black-market routes, hidden debts, and unofficial contracts. |
| Free Roads Ending | The player breaks monopolies and opens trade routes to independent merchants. |
| Coin Emperor Ending | The player becomes extremely rich and powerful, but feared and distrusted. |
| Quiet Partner Ending | The player avoids public power and controls the economy through trusted allies. |

## Current implementation files

```text
src/data/quests/questTypes.ts
src/data/quests/questCatalog.ts
src/data/quests/mainCampaignQuests.ts
src/data/quests/characterQuestlines.ts
src/data/quests/sideQuests.ts
src/data/quests/repeatableContractTemplates.ts
src/data/quests/index.ts
src/lib/quest-state.ts
src/lib/quest-effects.ts
src/lib/quest-selectors.ts
src/lib/quest-journal-view-model.ts
src/lib/first-playable-quest-chain.ts
src/lib/playable-merchant-loop.ts
src/lib/game-runtime-loop.ts
```

Content currently defined:

```text
25 rich main campaign quest drafts
10 important NPC questline outlines
30 rich side quest concepts
20 repeatable trade contract templates
6 possible campaign endings
```

The approved first vertical-slice chain is:

```text
main-02-first-honest-profit
side-01-bread-before-dawn
main-11-the-false-scale
main-18-warehouse-lease
main-16-a-name-on-the-door
```

## Rich quest structure

Important quests are represented as rich data, not only as objective text.

```ts
type RichQuest = {
  id: string
  title: string
  arc: string
  act?: 1 | 2 | 3 | 4 | 5
  category: QuestCategory
  tier: 1 | 2 | 3 | 4 | 5

  storyPremise: string
  playerHook: string
  emotionalConflict: string
  merchantConflict: string

  giverNpcId: string
  importantNpcIds: string[]
  originMarketId: string
  targetMarketIds?: string[]

  openingScene: QuestScene
  stages: QuestStage[]
  choices: QuestChoice[]
  consequences: QuestConsequence[]

  successEnding: string
  failureEnding?: string
  alternateEndings?: QuestEnding[]

  gameplayGoals: QuestGoal[]
  requirements: QuestRequirement[]
  rewards: QuestReward[]
  unlocks?: QuestUnlock[]

  expiresAfterDays?: number
  repeatable: boolean
  isMainQuest: boolean
}
```

## Quest states

```text
locked
available
offered
accepted
in_progress
ready_to_turn_in
completed
failed
expired
blocked
```

## Requirement types

```text
own_item
deliver_item
sell_item
buy_item
earn_profit
visit_market
talk_to_npc
raise_reputation
pay_gold
wait_days
win_auction
complete_trade
complete_contract
inspect_ledger
choose_dialogue_option
unlock_route
own_warehouse
hire_agent
reach_company_value
```

## Reward types

```text
gold
item
reputation
npc_trust
market_discount
route_unlock
warehouse_unlock
company_unlock
rumor_unlock
contract_access
auction_access
faction_access
employee_unlock
stock_priority
ending_score
```

## Consequence types

```text
price_change
stock_change
npc_trust_change
city_reputation_change
faction_reputation_change
route_risk_change
quest_unlock
quest_block
market_event
rival_action
legal_heat_change
company_reputation_change
warehouse_access_change
ending_score_change
```

## Choice design

Important quests should offer at least two meaningful approaches. Bigger quests should offer three or four.

A good choice changes at least two of these:

```text
profit
trust
risk
reputation
future access
market prices
route safety
NPC relationship
ending score
```

Example choice pattern:

```text
Honest solution: lower immediate profit, higher trust and reputation.
Practical solution: moderate profit, moderate trust, low risk.
Exploitative solution: high profit, lower trust, possible future enemy.
Risky solution: high reward, legal heat, route danger, or faction anger.
```

## Runtime persistence rule

From Phase 6 onward, implemented playable questlines should not live only in private component state or private local-storage keys.

The first playable merchant loop is stored on GameState as:

```text
playableLoop
```

The `playableLoop` payload contains:

```text
day
current town
money/copper
cargo
profit and completed trades
rich quest chain state
company state
town reputation
NPC trust
public trust
shadow heat
company readiness
consequence flags
loop ledger
```

This means save/load/export should preserve the first playable loop. The older component-local fallback is allowed only for isolated testing.

## Example rich quest: Bread Before Dawn

Mara, a night baker, keeps her ovens running for dockworkers, guards, and travelers who cannot afford tavern meals. Her flour shipment has vanished. By sunrise, the workers' guild will cancel her contract, and the city will accuse her of hoarding grain.

Player hook:

```text
Find my flour, replace it, or tell me who stole it. I do not care which truth you bring me, so long as my ovens are hot before dawn.
```

Choices:

| Choice | Result |
|---|---|
| Buy replacement flour at a loss | Mara trusts the player, workers respect the player, low profit. |
| Steal back the redirected flour | Strong worker reputation, noble anger, legal heat. |
| Sell Mara expensive replacement flour | Good profit, lower trust, Mara remembers the player's greed. |
| Expose the warehouse clerk | City reputation gain, clerk becomes a future enemy. |

## UI requirements

The quest UI should not look like a plain checklist.

A quest card should show:

```text
title
quest type / act / tier
giver portrait
short story hook
current stage
stakes
known choices or possible approaches
required items or actions
rewards if known
consequences if known
related NPCs
related markets
remaining time if deadline exists
```

A quest detail panel should show:

```text
opening scene
stage history
player choices made
NPC reactions
current objective
optional approaches
consequence preview when appropriate
turn-in options
runtime memory / what changed after the choice
```

## Writing checklist for every authored quest

Before a quest is accepted into the catalog, it should answer:

1. Who wants something?
2. Why do they want it now?
3. What trade or market pressure caused the problem?
4. What can the player do as a merchant?
5. What are at least two possible solutions?
6. What does the player gain besides gold?
7. Who remembers the player's choice?
8. What changes in the world after the quest?
9. Which future quest, discount, route, NPC trust, or ending score can it affect?
10. Does the quest text make the player curious?
11. Where is the consequence stored in GameState/save/export?

## Phase implementation notes

### Phase 3 - first playable chain

The first playable rich quest chain is implemented as a Journal surface with state helpers and focused tests. The intent is to prove that the quest experience feels like story progression rather than a checklist before deeper economy locks are added.

### Phase 4 - playable merchant loop v1

The quest system is connected to a small merchant loop:

```text
buy cargo
travel
sell for profit
resolve rich quest stages and choices
unlock warehouse/company readiness
register the first company
```

### Phase 5 - consequences must be visible

A consequence does not count if the player cannot see or feel it.

The first playable loop exposes:

```text
public trust
shadow heat
company readiness
town reputation
NPC trust
named consequence flags
```

### Phase 6 - consequences must persist

A visible consequence still is not complete if it disappears after save/load/export.

Phase 6 stores the first loop in the main game save payload so future expansion can build on persistent memory instead of a prototype panel.
