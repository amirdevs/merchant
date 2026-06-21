# Character Portrait Prompt Rules

Character portrait prompts live here because item prompts live beside them in `docs/assets/icon-prompts/`.

Use this folder for character portrait sheet manifests, not runtime cropped portraits. Final cropped portraits should go under `public/game-assets/portraits/`.

## Core rule

Batch by total images, not by characters.

Example:

```text
200 characters x 5 expressions = 1000 portrait images.
The 1000 images are divided into portrait batches.
A single character may have neutral/happy/suspicious in one batch and worried/angry in another batch.
```

## Why this matters

Portrait generation and cropping is expensive. The final roster, expression counts, image IDs, and grid order must be planned before generation so the project can crop once and avoid repeating sheets.

## Batch manifest fields

Every portrait batch JSON should include:

```json
{
  "batch": {
    "batchId": "portrait-batch-001",
    "firstImageSlot": 1,
    "lastImageSlot": 20,
    "slotCount": 20,
    "maxSlotsPerSheet": 20
  },
  "grid": {
    "columns": 5,
    "rows": 4,
    "readingOrder": "left-to-right by row, top-to-bottom",
    "targetCanvas": "highest available 16:9 canvas",
    "targetCell": "one bust portrait per cell, generous padding, crop-safe"
  },
  "style": "...",
  "sheetPrompt": "...",
  "generationPrompt": "...",
  "order": []
}
```

## Image entry fields

Every `order` item should include:

```json
{
  "slot": 1,
  "imageId": "npc-014-happy",
  "characterId": "npc-014",
  "expression": "happy",
  "batchId": "portrait-batch-001",
  "displayName": "Mara Vellwick",
  "profession": "candle seller and rumor broker",
  "identityAnchor": "same person as npc-014: short round candle seller, warm brown skin, black hair tucked under a wax-stained blue scarf, tiny burn scar on left thumb, amber bead necklace, cream linen apron with blue thread repairs",
  "visualTraits": [
    "short and round silhouette",
    "soft square face",
    "wax-stained apron",
    "amber bead necklace",
    "small burn scar on left thumb"
  ],
  "professionProps": [
    "bundle of thin beeswax candles",
    "small brass wick scissors"
  ],
  "prompt": "...",
  "negativePrompt": "..."
}
```

## Prompt writing rules

- Prompts must be hand-written for each image.
- Only shared style/crop rules may be reused.
- Never write generic character prompts.
- Every expression prompt must repeat the same identity anchor.
- Expression prompts change face, eyes, mouth, brow, head tilt, and posture; they must not change clothing, age, body type, skin tone, hair, or profession props.
- Profession must be visible in the portrait through clothing, tools, hands, posture, or background hint.
- Characters must not look like the original game portraits.
- Characters must not look alike unless intentionally related.

## Shared style

Use a consistent game portrait style:

```text
Stylized fantasy merchant RPG portrait, polished hand-painted game UI art, readable face, expressive eyes, clear silhouette, bust portrait from chest up, three-quarter view or front-facing, warm painterly lighting, crisp edges, premium collectible NPC portrait, not photo-realistic, not gritty realism, not anime, not modern clothing, no text, no labels, no UI frame, no watermark.
```

## Sheet generation rules

Follow the item-sheet discipline:

- strict grid;
- one portrait per cell;
- reading order left-to-right by row, top-to-bottom;
- exact slot order from JSON;
- solid pure green `#00FF00` background;
- no visible grid lines;
- no labels or numbers;
- no text;
- no borders;
- no watermarks;
- enough padding around each portrait for clean crop;
- portraits must not overlap neighboring cells.

## Recommended grids

Use the biggest grid that still preserves face quality:

```text
10x5 = 50 portraits, maximum efficiency, same as item sheets
5x4 = 20 portraits, balanced quality and efficiency
4x3 = 12 portraits, high-quality important characters or expressions
```

Record the grid in every batch. Do not assume all batches have the same grid.

## Expression tiers

```text
major: neutral, happy, suspicious, worried, angry
merchant: neutral, happy, suspicious
minor: neutral only
special: custom expression list based on story role
```

## Negative prompt baseline

```text
Do not change identity between expressions. No duplicate faces. No modern clothing. No text. No labels. No letters. No numbers. No UI frame. No border. No watermark. No cropped-off head. No extra limbs. No full-body scene. No photorealism. No generic medieval peasant clone. No same face repeated for different characters.
```
