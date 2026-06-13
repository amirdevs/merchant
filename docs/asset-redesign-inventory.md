# Asset Redesign Inventory

This project currently includes extracted game assets under `public/game-assets`.

## Visual Assets

Total visual images in `public/game-assets/imgs`: **359**

| Category | Count | Notes |
| --- | ---: | --- |
| Characters | 202 | Mostly `2048x2048` PNG portraits. Most recognizable asset group. |
| Routes | 45 | Huge route/map images, usually `8192x6828`. |
| Town squares | 21 | Mostly `600x300` JPG scene panels. |
| Backdrops | 19 | Mostly `1920x800` JPG dialogue/background scenes. |
| Flags | 16 | Mix of square `800x800` and banner-like `762x508` PNGs. |
| Stalls | 10 | Small merchant stall/table images. |
| Symbols | 10 | Religion, magic, or faction-style symbols. |
| Settlements | 9 | Small map settlement icons. |
| Cursors | 4 | Cursor outline images. |
| Coat of arms | 4 | Small heraldry images. |
| Seals | 4 | Small seal images. |
| Textures | 3 | Paper/background texture pieces. |
| UI | 3 | Mouse-click helper images. |
| Backgrounds | 2 | General background images. |
| Kazuujan | 2 | Special Kazuujan scene images. |
| Maps | 1 | Main map image. |
| Landing | 1 | Landing/title-style image. |

## Audio Assets

Total audio files in `public/game-assets/media`: **1190**

| Category | Count |
| --- | ---: |
| Voices | 1091 |
| Item sounds | 29 |
| UI sounds | 14 |
| Music | 12 |
| Ambiance | 12 |
| Quest/crowd sounds | 11 |
| Unused sounds | 10 |
| General sounds | 8 |
| Fanfares | 3 |

## Fonts

Total font files in `public/game-assets/fonts`: **21**

The font assets include medieval/display fonts plus Font Awesome webfont files.

## Redesign Priority

1. **Characters**: redesign first. The 202 portraits are the most recognizable part of the original game.
2. **Town squares and backdrops**: redesign next. These 40 scene images define the game atmosphere.
3. **Flags, symbols, coat of arms, and seals**: redesign faction identity assets after the main scenes.
4. **Stalls, settlements, routes, and map assets**: redesign after the major identity assets.
5. **Audio**: redesign later unless the goal is a full identity change.

## Generation Notes

Item icons can be generated as contact sheets because they are small isolated objects.

Character portraits should not be generated in large 100-image sheets. Use individual prompts or small batches so each face, pose, outfit, profession, and silhouette stays distinct.

Town squares and backdrops should be generated one scene at a time or in very small batches, because they need composition, mood, location identity, and correct aspect ratio.
