# Playtest And Balance Report

Generated: 2026-06-24T09:38:00.848Z

This report is a lightweight checkpoint after the item, stock, barter, economy, travel, quest, company, and UI-integration foundation work.

## Automated Inputs

- Stock report present: yes
- Stock PASS sections: 12
- Stock REVIEW sections: 0
- Item icon report present: yes
- Item icon metrics rosterGroup: JSON
- Missing runtime icon files: 0
- Orphan item icon files: 0
- Icon errors: 0
- Icon warnings: 0
- Icon issues total: 0

## Manual Smoke Checklist

| Area | Check | Result | Notes |
|---|---|---|---|
| Startup | Start a new game and check for console errors | manual | |
| Save/Load | Save v2, reload v2, confirm old saves stay blocked | manual | |
| Items | Inspect common item icons and quantity variants | manual | |
| Stock | Inspect blacksmith, miner, fletcher, barkeep, butcher, farmer, bard, toolmaker | manual | |
| Barter | Ask Price/Ask Offer with protected and concealed goods | manual | |
| Economy | Compare money/capacity panel numbers against inventory | manual | |
| Travel | Preview travel, pay toll/stallage, inspect arrival summary | manual | |
| Quests | Accept/complete one sample quest or contract state | manual | |
| Company | Plan warehouse/shipment helper state from tests or dev UI | manual | |

## Go / No-Go Rule

- Any startup, save/load, stock-identity, or barter-transfer failure is a blocker.
- More than two REVIEW profession-stock sections should be tuned before UI polish.
- Missing runtime item icons should be fixed before quest/company content depends on those goods.

