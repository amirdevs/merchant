# Character Portrait Prompt Rules

Character portrait prompt files live beside item prompts in `docs/assets/character-prompts/`. Final cropped portraits belong under `public/assets/portraits/`.

Production character prompt JSON files are named like item prompt ranges:

```text
characters-0001-0012.json
characters-0013-0024.json
characters-0025-0036.json
...
characters-0721-0722.json
```

Generate sheets in filename order. Do not use old category words such as useful, legacy, new-npcs, identity, batch group, test, template, or manifest to decide generation order.

## Current approved direction

Use the approved labeled V5 direction unless a later prompt manifest says otherwise:

```text
3 columns x 4 rows = 12 portraits per sheet
One flat solid #00FF00 background
No visible grid lines, borders, colored cell panels, separators, gradients, or watermarks
Each cell includes one pure magenta #FF00FF filename label in the bottom-left corner
The label text is exactly the JSON entry `outputFile`
Large green empty space between visible characters, labels, and crop-cell edges
Crop by JSON order / row / column / cropCell / outputFile
```

The sheet can be visually one continuous green background. The cropper will use the JSON crop cells, so the image itself must not draw cell backgrounds, frames, or separators. The only allowed text in the image is the required magenta filename label.

## Core batching rule

Batch by total portrait images, not by characters.

Example:

```text
200 characters x 5 expressions = 1000 portrait images.
The 1000 images are divided into portrait batches.
A single character may have neutral/happy/suspicious in one batch and worried/angry in another batch.
```

## Crop and mapping rules

Every portrait JSON entry must include:

```json
{
  "order": 1,
  "globalOrder": 1,
  "row": 1,
  "column": 1,
  "cell": "R1C1",
  "imageId": "character-001-neutral",
  "characterId": "character-001",
  "expression": "neutral",
  "outputFile": "character-001-neutral.png",
  "cropCell": { "x": 0, "y": 0, "width": 1024, "height": 1024 },
  "filenameLabel": {
    "text": "character-001-neutral.png",
    "color": "#FF00FF",
    "placement": "bottom-left corner inside this crop cell"
  }
}
```

The cropper must name files by `outputFile`, not by visual guessing.

## Filename label rules

The filename label exists to prevent order mistakes during generation and cropping.

Rules:

- Every generated portrait cell must include a small readable filename label.
- Label text must exactly equal the entry `outputFile`.
- Label color must be pure magenta `#FF00FF`.
- Use a simple bold readable font.
- No outline, no shadow, no glow, no gradient.
- Place the label in the bottom-left corner of the crop cell only.
- Keep the label fully separated from character art.
- Do not let the label touch clothing, hair, props, shadows, glow, accessories, hands, or feet.
- Keep a clear empty green safety gap around the label.
- Keep the character centered and scaled down so the label has its own empty green area.
- If a label is missing, unreadable, wrong, or touches the character/props, reject the sheet.

## Sheet generation rules

- One sheet only per batch.
- Generate `characters-*.json` files in filename order.
- Use the exact grid, canvas, crop cells, and image order from the JSON.
- The `sheetOrderLock` field is the highest-priority placement guide for cell identity/order.
- Fill cells left-to-right by row, top-to-bottom.
- Never reorder, skip, duplicate, merge, or invent images.
- Use a single flat solid `#00FF00` background across the whole sheet.
- No checkerboard, gradients, shadows on the background, visible grid lines, borders, names beyond the required filename label, extra text, UI frames, or watermarks.
- Each portrait must stay fully inside its own invisible square crop cell.
- Keep visible green padding around head, hair, hats, shoulders, elbows, hands, tools, mugs, papers, plants, hooks, bells, weapons, bags, accessories, and the filename label.
- If a character is broad or has big props, scale the bust down instead of cropping them.
- Keep portraits slightly smaller than the cell so adjacent characters do not visually crowd each other and labels stay clear.

## Character style direction

The approved style is:

```text
stylized medieval fantasy merchant RPG portrait art, polished painterly-cartoon PC game UI look, slightly cartoony, beautiful, charming, entertaining, natural facial acting, expressive eyes, varied body shapes, strong profession silhouette, rich clothing accents, clear crop-safe bust portrait, playful but not childish.
```

Avoid:

```text
boring plain medieval workers, stiff neutral poses, same-face syndrome, repeated body types, muddy brown clothing only, photorealism, gritty realism, anime, modern fashion, sci-fi, full-body scenes, busy backgrounds.
```

## Fantasy ancestry and magical variety

The cast should not be all human. Character identities and portrait prompts may include different fantasy ancestries, species, and magical traits when they fit the role.

Good examples:

```text
human, dwarf, gnome, halfling, elf, half-elf, orc-blooded, ogre-kin, goblin, fae-touched, moon-touched, djinn-blooded, merfolk-descended, dryad-touched, magically marked human, gentle construct, old minor spirit in merchant clothing.
```

Rules:

- Make ancestry/species visible through face shape, ears, height impression, silhouette, skin tone, hair, eyes, posture, and costume details.
- Keep magical traits readable but not too noisy: glowing eyes, faint runes, unusual ears, tiny horns, plantlike hair, gemlike skin freckles, spectral hand-glow, etc.
- Magical or non-human traits must stay consistent across all expressions of the same character.
- Profession must still be clear. A magical character should still read as auctioneer, appraiser, broker, clerk, guard, etc.
- Do not turn every character into a monster. Mix humans and fantasy ancestries intentionally.

## Prompt writing rules

- Prompts must be hand-written for each image.
- Only shared style/crop rules may be reused.
- Every expression prompt must repeat the same identity anchor.
- Expression prompts change face, eyes, mouth, brow, head tilt, hand acting, and posture; they must not change ancestry, clothing, age, body type, skin tone, hair, magical traits, or profession props.
- Profession must be visible through clothing, tools, hands, posture, and props.
- Characters must not look like the original game portraits.
- Characters must not look alike unless intentionally related.
- For test sheets, avoid placing all expressions of the same character together when possible.

## Expression tiers

```text
major: neutral, happy, suspicious, worried, angry
merchant: neutral, happy, suspicious
minor: neutral only
special: custom expression list based on story role
```

## Negative prompt baseline

```text
Do not change identity between expressions. No duplicate faces. No boring plain medieval worker. No modern clothing. No extra text beyond the required pure magenta outputFile filename label. No extra labels beyond the required outputFile filename label. No UI frame. No border. No watermark. No cropped-off head. No cropped shoulders. No cropped hands. No cropped props. No extra limbs. No full-body scene. No photorealism. No generic medieval peasant clone. No same face repeated for different characters. No flat muddy colors. No busy background.
```
