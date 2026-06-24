# 06 - Economy And Travel

## Economy foundation

Shared economy helpers live in `src/game/economy/economy.ts`.

They cover:

- coin denomination discovery
- wallet value
- readable gold/silver/copper breakdowns
- inventory total value
- coin vs non-coin value
- weight/size/carry/pull totals
- overload and travel-capacity status
- pack animal and storage detection
- affordability checks
- copper spending with change normalization
- trade affordability summary

Run:

```powershell
pnpm test:economy
```

## Travel foundation

Travel helpers live in `src/game/travel/travel-loop.ts`.

They cover:

- route connection lookup
- market open / closing soon / closed status
- route days
- tolls and destination stallage
- affordability
- capacity blockers
- illegal cargo exposure
- concealed illegal cargo warning
- theft/inspection risk preview
- route danger label
- arrival summary text
- disconnected-route handling

Run:

```powershell
pnpm test:travel
```

## Next UI work

The next visible product work should add:

- travel confirmation screen
- arrival summary screen
- money/capacity display in inventory and trading UI
- readable warnings for tolls, cargo, illegal goods, and risk
