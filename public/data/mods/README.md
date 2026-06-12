# Mods

Add offline JSON mod packs in this folder and list them in `manifest.json`.

Example:

```json
{
  "mods": ["my-balance-mod.json"]
}
```

Each mod pack may patch generated data by `index` or profession `slug`:

```json
{
  "name": "My Balance Mod",
  "items": [
    { "index": 0, "loafValue": 2 }
  ],
  "characters": [
    { "index": 19, "maxObtainValue": 500 }
  ],
  "marketplaces": [
    { "index": 0, "stallage": 0 }
  ],
  "professions": {
    "baker": {
      "bias": [{ "tag": "bread", "percent": 20 }]
    }
  }
}
```

The app loads listed packs on startup before a fresh game is generated. New saves are recommended after changing mods.
