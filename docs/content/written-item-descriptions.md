# Written Item Descriptions

This review branch replaces runtime-template static item copy with a stored static copy layer.

## Scope

- Items loaded from `src/data/generated/items.json`: **2206**
- Written static entries created: **2206**
- Duplicate short descriptions: **0**
- Duplicate flavor texts: **0**

## Files

- `src/data/generated/item-written-descriptions.json` contains one static entry per item.
- `src/lib/item-static-description.ts` reads the stored copy first and only falls back if an entry is missing.

## Review rule

Do not merge this until the content has been reviewed.
