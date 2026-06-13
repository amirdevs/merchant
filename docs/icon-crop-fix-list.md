# Icon Crop Fix List

Best-effort icon crop run from `docs/icon-prompts/full/upscayl_png_upscayl-standard-4x_8x` into `public/game-assets/items`.

Total PNGs saved: **1865**

## Batch Results

| Sheet | Config | Status | Detected | Required | Saved | Missing | Extra Ignored |
| ---: | --- | --- | ---: | ---: | ---: | ---: | ---: |
| 1 | `items-0001-0100.json` | cropped | 130 | 122 | 121 | 0 | 8 |
| 2 | `items-0101-0200.json` | partial | 179 | 180 | 179 | 1 | 0 |
| 3 | `items-0201-0300.json` | partial | 159 | 178 | 159 | 19 | 0 |
| 4 | `items-0301-0400.json` | cropped | 104 | 100 | 100 | 0 | 4 |
| 5 | `items-0401-0500.json` | cropped | 152 | 100 | 100 | 0 | 52 |
| 6 | `items-0501-0600.json` | cropped | 162 | 140 | 140 | 0 | 22 |
| 7 | `items-0601-0700.json` | cropped | 160 | 100 | 100 | 0 | 60 |
| 8 | `items-0701-0800.json` | partial | 143 | 206 | 143 | 63 | 0 |
| 9 | `items-0801-0900.json` | partial | 103 | 300 | 103 | 197 | 0 |
| 10 | `items-0901-1000.json` | cropped | 110 | 102 | 102 | 0 | 8 |
| 11 | `items-1001-1100.json` | cropped | 121 | 100 | 100 | 0 | 21 |
| 12 | `items-1101-1200.json` | partial | 78 | 100 | 78 | 22 | 0 |
| 13 | `items-1201-1300.json` | partial | 84 | 100 | 84 | 16 | 0 |
| 14 | `items-1301-1400.json` | cropped | 102 | 100 | 100 | 0 | 2 |
| 15 | `items-1401-1500.json` | cropped | 174 | 132 | 132 | 0 | 42 |
| 16 | `items-1501-1600.json` | partial | 124 | 174 | 124 | 50 | 0 |
| 17 | `items-1601-1700.json` | zero-byte | 0 | 166 | 0 | 166 | 0 |
| 18 | `items-1701-1800.json` | zero-byte | 0 | 100 | 0 | 100 | 0 |
| 19 | `items-1801-1900.json` | missing-sheet | 0 | 0 | 0 | 0 | 0 |
| 20 | `items-1901-1972.json` | missing-sheet | 0 | 0 | 0 | 0 | 0 |

## Needs Fixing Later

- Sheet 2, `items-0101-0200.json`: partial. Best-effort order-based crop. Saved 179 of 180 expected outputs; missing 1.
- Sheet 3, `items-0201-0300.json`: partial. Best-effort order-based crop. Saved 159 of 178 expected outputs; missing 19.
- Sheet 8, `items-0701-0800.json`: partial. Best-effort order-based crop. Saved 143 of 206 expected outputs; missing 63.
- Sheet 9, `items-0801-0900.json`: partial. Best-effort order-based crop. Saved 103 of 300 expected outputs; missing 197.
- Sheet 12, `items-1101-1200.json`: partial. Best-effort order-based crop. Saved 78 of 100 expected outputs; missing 22.
- Sheet 13, `items-1201-1300.json`: partial. Best-effort order-based crop. Saved 84 of 100 expected outputs; missing 16.
- Sheet 16, `items-1501-1600.json`: partial. Best-effort order-based crop. Saved 124 of 174 expected outputs; missing 50.
- Sheet 17, `items-1601-1700.json`: zero-byte. Upscaled sheet is zero bytes. Saved 0 of 166 expected outputs; missing 166.
- Sheet 18, `items-1701-1800.json`: zero-byte. Upscaled sheet is zero bytes. Saved 0 of 100 expected outputs; missing 100.
- Sheet 19, `items-1801-1900.json`: missing-sheet. No upscaled sheet file exists for this config. Saved 0 of 0 expected outputs; missing 0.
- Sheet 20, `items-1901-1972.json`: missing-sheet. No upscaled sheet file exists for this config. Saved 0 of 0 expected outputs; missing 0.

## Notes

- Filenames are assigned best-effort from JSON order, not image recognition.
- Some visually similar items may have imperfect matches.
- Sheets 17 and 18 are zero-byte upscaled files.
- Configs 19 and 20 do not have upscaled sheet files in this batch.
