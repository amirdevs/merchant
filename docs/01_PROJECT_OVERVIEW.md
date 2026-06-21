# 01 - Project Overview

Merchant is an offline React/Vite remake prototype inspired by Merchant of the Six Kingdoms.

The project uses extracted original data as a reference layer, but the current goal is to build a cleaner local-only trading game with new systems, item naming, stock logic, UI, and generated item art.

## Current foundation status

Implemented or packaged foundations include:

- extracted items, characters, marketplaces, professions, and kingdoms
- new item catalog structure
- item icon prompts, generated icons, and structural icon audits
- profession/lifestyle NPC stock profiles
- mild generated-data stock bias from character/profession/market/kingdom data
- barter valuation, Ask Price, Ask Offer, accept/refuse rules, and tests
- save schema v2 clean break after item rewrite
- economy helpers for money, inventory value, capacity, affordability
- travel planning helpers for tolls, route risk, capacity, and arrival summaries
- quest, contract, and dialogue transaction helpers
- company, warehouse, shipment, agent, share, dividend helpers
- UI-facing view model helpers
- playtest/balance report foundation

## Product direction

The next work should turn tested foundations into visible playable flows:

1. trade screen polish and readable barter/economy information
2. travel confirmation and arrival UI
3. quest/contract UI
4. company/warehouse/shipment UI
5. visual polish and deeper original-game parity

## Branch note

Current active work is on `main`. If GitHub still shows `master` as default, change the repository default branch in GitHub settings.
