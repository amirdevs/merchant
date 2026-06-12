# Item Icons

Item icons should keep the original relative paths from `src/data/generated/items.json`.

Example:

```text
public/game-assets/items/coins/gold/gold_coin.png
public/game-assets/items/books/a_royal_book_of_teal_revised.png
public/game-assets/items/weapons/swords/katana.png
```

The current installed game copy used for extraction did not expose these PNG files as loose assets, even though every generated item has an `iconFile` path. When the original item icon folder is recovered from another install/source archive, copy it here with the same directory structure.
