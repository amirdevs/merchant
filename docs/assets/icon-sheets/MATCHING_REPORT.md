# MATCHING_REPORT

Source branch inspected: `main`. Temporary branch used only for artifact extraction: `chatgpt-icon-tools`; main/master were not modified.

Matching method: JSON configs sorted by filename; ChatGPT exported sheets sorted by timestamp plus numeric suffix; valid images renamed to JSON basename. Review overlays are JPG files to keep the package size manageable.

- Prompt configs: 101
- Source sheet files: 101
- Renamed valid sheets included: 101
- Invalid/corrupt source files in `unmatched/`: 0
- PASS: 101
- FAIL: 0

## Important failures
No remaining structural failures after manual recheck and the replacement sheet for `items-4001-4050`.

## Manual corrections
- `items-4001-4050.json`: regenerated replacement uploaded in chat, verified as a valid 10x5 sheet with 50 populated cells, and saved as `items-4001-4050.png`.
- `items-5001-5006.json`: manual recheck confirms the final 6-item sheet is structurally valid; the earlier `R1C7` extra-art detection was a false positive.

## Sheet mapping
| JSON config | Source file | Output file | Status | Notes |
|---|---|---|---|---|
| `items-0001-0050.json` | `ChatGPT Image Jun 19, 2026, 07_41_16 PM (1).png` | `items-0001-0050.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-0051-0100.json` | `ChatGPT Image Jun 19, 2026, 07_41_16 PM (2).png` | `items-0051-0100.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-0101-0150.json` | `ChatGPT Image Jun 19, 2026, 07_41_16 PM (3).png` | `items-0101-0150.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-0151-0200.json` | `ChatGPT Image Jun 19, 2026, 07_41_16 PM (4).png` | `items-0151-0200.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-0201-0250.json` | `ChatGPT Image Jun 19, 2026, 07_41_16 PM (5).png` | `items-0201-0250.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-0251-0300.json` | `ChatGPT Image Jun 19, 2026, 07_41_16 PM (6).png` | `items-0251-0300.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-0301-0350.json` | `ChatGPT Image Jun 19, 2026, 07_41_16 PM (7).png` | `items-0301-0350.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-0351-0400.json` | `ChatGPT Image Jun 19, 2026, 07_41_16 PM (8).png` | `items-0351-0400.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-0401-0450.json` | `ChatGPT Image Jun 19, 2026, 07_41_16 PM (9).png` | `items-0401-0450.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-0451-0500.json` | `ChatGPT Image Jun 19, 2026, 07_41_16 PM (10).png` | `items-0451-0500.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-0501-0550.json` | `ChatGPT Image Jun 19, 2026, 07_41_27 PM (1).png` | `items-0501-0550.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-0551-0600.json` | `ChatGPT Image Jun 19, 2026, 07_41_27 PM (2).png` | `items-0551-0600.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-0601-0650.json` | `ChatGPT Image Jun 19, 2026, 07_41_27 PM (3).png` | `items-0601-0650.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-0651-0700.json` | `ChatGPT Image Jun 19, 2026, 07_41_28 PM (4).png` | `items-0651-0700.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-0701-0750.json` | `ChatGPT Image Jun 19, 2026, 07_41_28 PM (5).png` | `items-0701-0750.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-0751-0800.json` | `ChatGPT Image Jun 19, 2026, 07_41_28 PM (6).png` | `items-0751-0800.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-0801-0850.json` | `ChatGPT Image Jun 19, 2026, 07_41_28 PM (7).png` | `items-0801-0850.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-0851-0900.json` | `ChatGPT Image Jun 19, 2026, 07_41_28 PM (8).png` | `items-0851-0900.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-0901-0950.json` | `ChatGPT Image Jun 19, 2026, 07_41_28 PM (9).png` | `items-0901-0950.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-0951-1000.json` | `ChatGPT Image Jun 19, 2026, 07_41_29 PM (10).png` | `items-0951-1000.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-1001-1050.json` | `ChatGPT Image Jun 19, 2026, 07_41_35 PM (1).png` | `items-1001-1050.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-1051-1100.json` | `ChatGPT Image Jun 19, 2026, 07_41_35 PM (2).png` | `items-1051-1100.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-1101-1150.json` | `ChatGPT Image Jun 19, 2026, 07_41_35 PM (3).png` | `items-1101-1150.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-1151-1200.json` | `ChatGPT Image Jun 19, 2026, 07_41_35 PM (4).png` | `items-1151-1200.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-1201-1250.json` | `ChatGPT Image Jun 19, 2026, 07_41_35 PM (5).png` | `items-1201-1250.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-1251-1300.json` | `ChatGPT Image Jun 19, 2026, 07_41_35 PM (6).png` | `items-1251-1300.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-1301-1350.json` | `ChatGPT Image Jun 19, 2026, 07_41_35 PM (7).png` | `items-1301-1350.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-1351-1400.json` | `ChatGPT Image Jun 19, 2026, 07_41_35 PM (8).png` | `items-1351-1400.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-1401-1450.json` | `ChatGPT Image Jun 19, 2026, 07_41_35 PM (9).png` | `items-1401-1450.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-1451-1500.json` | `ChatGPT Image Jun 19, 2026, 07_41_37 PM (10).png` | `items-1451-1500.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-1501-1550.json` | `ChatGPT Image Jun 19, 2026, 07_41_48 PM (1).png` | `items-1501-1550.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-1551-1600.json` | `ChatGPT Image Jun 19, 2026, 07_41_48 PM (2).png` | `items-1551-1600.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-1601-1650.json` | `ChatGPT Image Jun 19, 2026, 07_41_48 PM (3).png` | `items-1601-1650.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-1651-1700.json` | `ChatGPT Image Jun 19, 2026, 07_41_48 PM (4).png` | `items-1651-1700.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-1701-1750.json` | `ChatGPT Image Jun 19, 2026, 07_41_48 PM (5).png` | `items-1701-1750.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-1751-1800.json` | `ChatGPT Image Jun 19, 2026, 07_41_48 PM (6).png` | `items-1751-1800.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-1801-1850.json` | `ChatGPT Image Jun 19, 2026, 07_41_48 PM (7).png` | `items-1801-1850.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-1851-1900.json` | `ChatGPT Image Jun 19, 2026, 07_41_48 PM (8).png` | `items-1851-1900.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-1901-1950.json` | `ChatGPT Image Jun 19, 2026, 07_41_48 PM (9).png` | `items-1901-1950.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-1951-2000.json` | `ChatGPT Image Jun 19, 2026, 07_41_48 PM (10).png` | `items-1951-2000.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-2001-2050.json` | `ChatGPT Image Jun 19, 2026, 07_41_58 PM (1).png` | `items-2001-2050.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-2051-2100.json` | `ChatGPT Image Jun 19, 2026, 07_41_58 PM (2).png` | `items-2051-2100.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-2101-2150.json` | `ChatGPT Image Jun 19, 2026, 07_41_58 PM (3).png` | `items-2101-2150.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-2151-2200.json` | `ChatGPT Image Jun 19, 2026, 07_41_58 PM (4).png` | `items-2151-2200.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-2201-2250.json` | `ChatGPT Image Jun 19, 2026, 07_41_58 PM (5).png` | `items-2201-2250.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-2251-2300.json` | `ChatGPT Image Jun 19, 2026, 07_41_58 PM (6).png` | `items-2251-2300.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-2301-2350.json` | `ChatGPT Image Jun 19, 2026, 07_41_58 PM (7).png` | `items-2301-2350.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-2351-2400.json` | `ChatGPT Image Jun 19, 2026, 07_41_58 PM (8).png` | `items-2351-2400.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-2401-2450.json` | `ChatGPT Image Jun 19, 2026, 07_41_58 PM (9).png` | `items-2401-2450.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-2451-2500.json` | `ChatGPT Image Jun 19, 2026, 07_41_58 PM (10).png` | `items-2451-2500.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-2501-2550.json` | `ChatGPT Image Jun 19, 2026, 07_42_07 PM (1).png` | `items-2501-2550.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-2551-2600.json` | `ChatGPT Image Jun 19, 2026, 07_42_07 PM (2).png` | `items-2551-2600.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-2601-2650.json` | `ChatGPT Image Jun 19, 2026, 07_42_07 PM (3).png` | `items-2601-2650.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-2651-2700.json` | `ChatGPT Image Jun 19, 2026, 07_42_07 PM (4).png` | `items-2651-2700.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-2701-2750.json` | `ChatGPT Image Jun 19, 2026, 07_42_07 PM (5).png` | `items-2701-2750.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-2751-2800.json` | `ChatGPT Image Jun 19, 2026, 07_42_07 PM (6).png` | `items-2751-2800.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-2801-2850.json` | `ChatGPT Image Jun 19, 2026, 07_42_07 PM (7).png` | `items-2801-2850.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-2851-2900.json` | `ChatGPT Image Jun 19, 2026, 07_42_07 PM (8).png` | `items-2851-2900.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-2901-2950.json` | `ChatGPT Image Jun 19, 2026, 07_42_07 PM (9).png` | `items-2901-2950.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-2951-3000.json` | `ChatGPT Image Jun 19, 2026, 07_42_07 PM (10).png` | `items-2951-3000.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-3001-3050.json` | `ChatGPT Image Jun 19, 2026, 07_42_20 PM (1).png` | `items-3001-3050.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-3051-3100.json` | `ChatGPT Image Jun 19, 2026, 07_42_20 PM (2).png` | `items-3051-3100.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-3101-3150.json` | `ChatGPT Image Jun 19, 2026, 07_42_20 PM (3).png` | `items-3101-3150.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-3151-3200.json` | `ChatGPT Image Jun 19, 2026, 07_42_20 PM (4).png` | `items-3151-3200.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-3201-3250.json` | `ChatGPT Image Jun 19, 2026, 07_42_20 PM (5).png` | `items-3201-3250.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-3251-3300.json` | `ChatGPT Image Jun 19, 2026, 07_42_20 PM (6).png` | `items-3251-3300.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-3301-3350.json` | `ChatGPT Image Jun 19, 2026, 07_42_20 PM (7).png` | `items-3301-3350.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-3351-3400.json` | `ChatGPT Image Jun 19, 2026, 07_42_20 PM (8).png` | `items-3351-3400.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-3401-3450.json` | `ChatGPT Image Jun 19, 2026, 07_42_20 PM (9).png` | `items-3401-3450.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-3451-3500.json` | `ChatGPT Image Jun 19, 2026, 07_42_20 PM (10).png` | `items-3451-3500.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-3501-3550.json` | `ChatGPT Image Jun 19, 2026, 07_42_31 PM (1).png` | `items-3501-3550.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-3551-3600.json` | `ChatGPT Image Jun 19, 2026, 07_42_31 PM (2).png` | `items-3551-3600.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-3601-3650.json` | `ChatGPT Image Jun 19, 2026, 07_42_34 PM (3).png` | `items-3601-3650.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-3651-3700.json` | `ChatGPT Image Jun 19, 2026, 07_42_34 PM (4).png` | `items-3651-3700.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-3701-3750.json` | `ChatGPT Image Jun 19, 2026, 07_42_34 PM (5).png` | `items-3701-3750.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-3751-3800.json` | `ChatGPT Image Jun 19, 2026, 07_42_34 PM (6).png` | `items-3751-3800.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-3801-3850.json` | `ChatGPT Image Jun 19, 2026, 07_42_34 PM (7).png` | `items-3801-3850.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-3851-3900.json` | `ChatGPT Image Jun 19, 2026, 07_42_34 PM (8).png` | `items-3851-3900.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-3901-3950.json` | `ChatGPT Image Jun 19, 2026, 07_42_34 PM (9).png` | `items-3901-3950.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-3951-4000.json` | `ChatGPT Image Jun 19, 2026, 07_42_34 PM (10).png` | `items-3951-4000.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-4001-4050.json` | `ChatGPT Image Jun 19, 2026, 10_12_20 PM.png` | `items-4001-4050.png` | PASS | User-regenerated replacement; valid 10x5 sheet with 50 populated cells; review overlay regenerated. |
| `items-4051-4100.json` | `ChatGPT Image Jun 19, 2026, 07_42_44 PM (2).png` | `items-4051-4100.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-4101-4150.json` | `ChatGPT Image Jun 19, 2026, 07_42_44 PM (3).png` | `items-4101-4150.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-4151-4200.json` | `ChatGPT Image Jun 19, 2026, 07_42_45 PM (4).png` | `items-4151-4200.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-4201-4250.json` | `ChatGPT Image Jun 19, 2026, 07_42_45 PM (5).png` | `items-4201-4250.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-4251-4300.json` | `ChatGPT Image Jun 19, 2026, 07_42_45 PM (6).png` | `items-4251-4300.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-4301-4350.json` | `ChatGPT Image Jun 19, 2026, 07_42_45 PM (7).png` | `items-4301-4350.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-4351-4400.json` | `ChatGPT Image Jun 19, 2026, 07_42_45 PM (8).png` | `items-4351-4400.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-4401-4450.json` | `ChatGPT Image Jun 19, 2026, 07_42_45 PM (9).png` | `items-4401-4450.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-4451-4500.json` | `ChatGPT Image Jun 19, 2026, 07_42_45 PM (10).png` | `items-4451-4500.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-4501-4550.json` | `ChatGPT Image Jun 19, 2026, 07_42_55 PM (1).png` | `items-4501-4550.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-4551-4600.json` | `ChatGPT Image Jun 19, 2026, 07_42_56 PM (2).png` | `items-4551-4600.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-4601-4650.json` | `ChatGPT Image Jun 19, 2026, 07_42_56 PM (3).png` | `items-4601-4650.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-4651-4700.json` | `ChatGPT Image Jun 19, 2026, 07_42_56 PM (4).png` | `items-4651-4700.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-4701-4750.json` | `ChatGPT Image Jun 19, 2026, 07_42_56 PM (5).png` | `items-4701-4750.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-4751-4800.json` | `ChatGPT Image Jun 19, 2026, 07_42_56 PM (6).png` | `items-4751-4800.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-4801-4850.json` | `ChatGPT Image Jun 19, 2026, 07_42_56 PM (7).png` | `items-4801-4850.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-4851-4900.json` | `ChatGPT Image Jun 19, 2026, 07_42_56 PM (8).png` | `items-4851-4900.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-4901-4950.json` | `ChatGPT Image Jun 19, 2026, 07_42_56 PM (9).png` | `items-4901-4950.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-4951-5000.json` | `ChatGPT Image Jun 19, 2026, 07_42_56 PM (10).png` | `items-4951-5000.png` | PASS | Matched by chronological ChatGPT export filename order; structurally valid in object-presence review. |
| `items-5001-5006.json` | `ChatGPT Image Jun 19, 2026, 07_46_14 PM.png` | `items-5001-5006.png` | PASS | Manual recheck: expected 6-item final sheet is valid; earlier R1C7 extra-art finding was a false positive. |
