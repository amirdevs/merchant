# 11 - Useful NPC Roster Seeds

This document is the next implementation step after `10_CHARACTER_REWORK_AND_PORTRAITS.md`.

## Purpose

Before rewriting every old character and before generating portrait sheets, the project now has a seed roster of useful new NPCs. This prevents the painful workflow of generating/cropping the original 203 portraits first and then discovering that new gameplay-supporting characters are still missing.

## Added data layer

New character rework data starts here:

```text
src/data/characters/characterRemakeTypes.ts
src/data/characters/newUsefulNpcSeeds.ts
src/data/characters/index.ts
```

This is intentionally a remake layer. It does not delete or mutate `src/data/generated/characters.json` yet.

## Current new-NPC seed count

```text
48 useful new NPC seeds
194 planned portrait images
```

The portrait-image number is larger than the character count because important NPCs have expression variants.

## New useful NPC groups

The seed roster covers these gameplay needs:

| Group | Examples | Why it exists |
| --- | --- | --- |
| Trade | auctioneer, appraiser, bulk broker, market inspector | Better pricing, valuation, bulk trade, and market rules. |
| Travel | route scout, caravan captain, toll officer, ferry master | Better route preview, travel risk, tolls, and transport flavor. |
| Company | warehouse keeper, shipment broker, accountant, investor | Company, warehouse, shipment, insurance, and finance UI support. |
| Quest | contract clerk, guild representative, witness, noble patron | Notice-board jobs, reputation, delivery hooks, and story structure. |
| Risk / crime | black-market fence, thief contact, corrupt guard, forger | Illegal goods, bribes, route danger, and confiscation/fine gameplay. |
| Specialists | apothecary buyer, mapmaker, spice authenticator, gem cutter | Stronger item sinks, appraisals, route discovery, and market identity. |

## Portrait planning rule

Portrait generation must continue to batch by total images, not by character count.

The current first example batch is:

```text
docs/assets/character-prompts/portrait-batch-new-npcs-001.json
```

It is a `5x4` sheet with 20 portrait images. It uses exact slot order, pure green `#00FF00`, and no labels/borders/watermarks, matching the item sheet discipline.

## Why these NPCs are not runtime-integrated yet

This patch is a roster/prompt foundation step. Runtime integration should come later after the roster is accepted.

Do not connect these NPCs to the UI before deciding whether any seeds should be renamed, merged, removed, or expanded.

## Next step

After this seed roster is reviewed, continue with:

1. audit existing 203 generated characters;
2. mark old characters as keep/rework/replace/disable;
3. create the final combined roster map;
4. write all public-facing names, stories, and visual identities;
5. then create the full portrait prompt manifests.

## Commit rule

This is a permanent numbered doc and belongs in the normal reading order after doc 10. Generated future audit reports must go under `docs/logs/` instead.
