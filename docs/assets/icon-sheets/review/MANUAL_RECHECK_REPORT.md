# MANUAL_RECHECK_REPORT

This file records the manual follow-up after the first object-presence report.

## Corrections

- `items-5001-5006.json`: **PASS after manual recheck**. The earlier `R1C7 extra_art` detection was a false positive from the object-presence threshold. Visual recheck confirms the final sheet has the expected 6 items in `R1C1`–`R1C6`; cells after `R1C6` are empty for the purposes of the 6-item final batch.

## Still pending

- `items-4001-4050.json`: replacement sheet was visually shown in chat and appears structurally OK as a 10×5 sheet with 50 populated cells, but the original image bytes were not available to the runtime as a downloadable file. To commit the actual replacement PNG, upload it as a file/ZIP attachment rather than an inline chat preview.

## Current corrected structural status

- Corrected PASS count: 100
- Corrected FAIL/PENDING count: 1
- Pending replacement: `items-4001-4050.png`
