# Character Portrait Prompt Rules

Character portrait prompts live here because item prompts live beside them in `docs/assets/icon-prompts/`.

Use this folder for character portrait sheet manifests, not runtime cropped portraits. Final cropped portraits should go under `public/game-assets/portraits/`.

## Current generation gate

Generate only the approved test batch first:

```text
docs/assets/character-prompts/portrait-batch-identity-001.json
```

Do not generate the template. Do not generate full production sheets until the test sheet is approved.

Useful new NPC and identity planning currently comes from source data, not separate step docs:

```text
src/data/characters/newUsefulNpcSeeds.ts
src/data/characters/characterIdentityCatalogBatch01.ts
```

Current planning target:

```text
48 useful new NPC identities
194 useful-new-NPC portrait images
240 target visible characters
726 target portrait images
```

These targets are planning inputs only. They are not approval to generate full portrait production sheets.

## Core batching rule

Batch by total images, not by characters.

Example:

```text
200 characters x 5 expressions = 1000 portrait images.
The 1000 images are divided into portrait batches.
A single character may have neutral/happy/suspicious in one batch and worried/angry in another batch.
```

## Quality rule after first test

The first 5x4 test proved the crop pipeline works, but it made the cast feel too plain and repetitive. For character portraits, default to fewer portraits per sheet unless quality is already proven.

Recommended test grid:

```text
4 columns x 3 rows = 12 portraits
Target sheet: 4096 x 3072
Cell size: 1024 x 1024
```

Use 5x4 only after the art direction is approved. Do not use 10x5 for character faces unless quality remains excellent.

Approve the first test sheet only if:

- every cell follows JSON order;
- each portrait is centered inside its square crop cell;
- no portrait crosses into another cell;
- characters look entertaining, profession-specific, and distinct;
- repeated expressions still look like the same character;
- the green background is clean enough for automatic crop/removal;
- props are visible but not cut off.

## Crop and mapping rules

Every portrait JSON entry must include:

```json
{
  "order": 1,
  "row": 1,
  "column": 1,
  "cell": "R1C1",
  "imageId": "npc-new-001-neutral",
  "characterId": "npc-new-001",
  "expression": "neutral",
  "outputFile": "npc-new-001-neutral.png",
  "cropCell": { "x": 0, "y": 0, "width": 1024, "height": 1024 }
}
```

The cropper should name files by `outputFile`, not by visual guessing.

## Sheet generation rules

- One sheet only per batch.
- Use the exact grid from the JSON.
- Fill cells left-to-right by row, top-to-bottom.
- Never reorder images.
- Never skip slots.
- Never duplicate slots.
- Each portrait must stay fully inside its own invisible square crop cell.
- Keep generous padding around head, hair, hats, shoulders, hands, and props.
- Use a solid pure green background: `#00FF00`.
- No checkerboard.
- No visible grid lines.
- No labels, numbers, names, text, UI frames, borders, or watermarks.
- Do not let a hand, bell, paper, hair, hat, tool, or shoulder cross into another cell.
- Keep each character centered in the cell with consistent bust scale.

## Character attractiveness and entertainment direction

The portraits should feel like premium collectible NPCs, not plain medieval workers.

Use:

```text
beautiful, charming, memorable, expressive, playful, profession-specific, stylized fantasy merchant RPG character design, bold silhouette, vibrant clothing accents, readable face, appealing eyes, cinematic but crop-safe bust portrait, polished painterly-cartoon PC game UI portrait.
```

Avoid:

```text
boring plain peasants, generic medieval faces, same nose/eyes/mouth repeated, low-energy neutral poses, muddy brown clothing only, over-realistic photo faces, gritty realism, anime, modern fashion, full-body scenes, busy backgrounds.
```

## Prompt writing rules

- Prompts must be hand-written for each image.
- Only shared style/crop rules may be reused.
- Never write generic character prompts.
- Every expression prompt must repeat the same identity anchor.
- Expression prompts change face, eyes, mouth, brow, head tilt, hand acting, and posture; they must not change clothing, age, body type, skin tone, hair, or profession props.
- Profession must be visible through clothing, tools, hands, posture, and props.
- Characters must not look like the original game portraits.
- Characters must not look alike unless intentionally related.
- Do not place all expressions of the same character together in every test sheet. For test sheets, prefer 1–2 expressions per character so the sheet shows variety.

## Shared style

Use a consistent game portrait style:

```text
Stylized fantasy merchant RPG portrait, polished painterly-cartoon PC game UI art, beautiful and entertaining character design, expressive eyes, clear silhouette, bust portrait from chest up, three-quarter view or front-facing, warm painterly lighting, crisp edges, premium collectible NPC portrait, playful profession-specific details, simple pure green background #00FF00, not photo-realistic, not gritty realism, not anime, not modern clothing, no text, no labels, no UI frame, no watermark.
```

## Expression tiers

```text
major: neutral, happy, suspicious, worried, angry
merchant: neutral, happy, suspicious
minor: neutral only
special: custom expression list based on story role
```

## Negative prompt baseline

```text
Do not change identity between expressions. No duplicate faces. No boring plain medieval worker. No modern clothing. No text. No labels. No letters. No numbers. No UI frame. No border. No watermark. No cropped-off head. No extra limbs. No full-body scene. No photorealism. No generic medieval peasant clone. No same face repeated for different characters. No flat muddy colors. No busy background.
```
