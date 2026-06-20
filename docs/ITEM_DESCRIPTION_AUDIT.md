# Item Description Audit

Generated: 2026-06-20T10:24:20Z

## Scope

- Audited `docs/assets/icon-prompts/*.json`, using `manifest.json` as the source of truth.
- This checks **generation descriptions** for icon production/review, not final player-facing shop text.

## Result

**Status: WARN — some generation description fields need review.**

- Manifest total base items: **2206**
- Manifest total image slots: **5006**
- Batches listed: **101**
- Slots loaded: **5006**
- Unique item names in slots: **2196**
- Batch/file errors: **0**
- Hard field failures: **2499**
- Soft warnings: **0**
- Prompt length chars: min **343**, median **508**, max **647**
- Tag count: min **1**, median **4**, max **7**

## Answer

- For **AI icon generation, sheet matching, semantic QA, and crop QA**, the item slots have enough description: each slot carries item name, variant, tags, family/subfamily/trade role, output path, and a direct prompt.
- For **gameplay/UI descriptions shown to players**, these prompt configs are not enough by themselves. They are technical generation prompts, not polished market/inventory text.
- Recommended next step: create a separate gameplay item metadata file with `shortDescription` and optional `flavorText` for every base item.

## Variant Counts

- `single`: 2206
- `few`: 1400
- `many`: 1400

## Top Families

- `weapon`: 787
- `produce`: 467
- `magic`: 345
- `animal_goods`: 331
- `textile`: 314
- `armor`: 286
- `art`: 253
- `tool`: 201
- `curio`: 196
- `alchemy`: 178
- `food`: 162
- `seafood`: 153

## Top Subfamilies

- `monster_parts`: 354
- `botanicals`: 344
- `clothes`: 257
- `tool`: 240
- `swords`: 184
- `furniture`: 181
- `glyph_stones`: 135
- `axes`: 122
- `statues`: 119
- `storage`: 103
- `jewelry`: 89
- `fruit`: 87

## Hard Field Failures
- items-0351-0400.json slot 376 R3C6 `cauldron` (one): prompt_missing_small inventory tile
- items-0351-0400.json slot 377 R3C7 `cauldron` (few): prompt_missing_small inventory tile
- items-0351-0400.json slot 378 R3C8 `cauldron` (many): prompt_missing_small inventory tile
- items-0351-0400.json slot 379 R3C9 `defuser` (one): prompt_missing_small inventory tile
- items-0351-0400.json slot 380 R3C10 `defuser` (few): prompt_missing_small inventory tile
- items-0351-0400.json slot 381 R4C1 `defuser` (many): prompt_missing_small inventory tile
- items-0351-0400.json slot 382 R4C2 `influser` (one): prompt_missing_small inventory tile
- items-0351-0400.json slot 383 R4C3 `influser` (few): prompt_missing_small inventory tile
- items-0351-0400.json slot 384 R4C4 `influser` (many): prompt_missing_small inventory tile
- items-0351-0400.json slot 385 R4C5 `iron stove` (one): prompt_missing_small inventory tile
- items-0351-0400.json slot 386 R4C6 `iron stove` (few): prompt_missing_small inventory tile
- items-0351-0400.json slot 387 R4C7 `iron stove` (many): prompt_missing_small inventory tile
- items-0351-0400.json slot 391 R5C1 `refuser` (one): prompt_missing_small inventory tile
- items-0351-0400.json slot 392 R5C2 `refuser` (few): prompt_missing_small inventory tile
- items-0351-0400.json slot 393 R5C3 `refuser` (many): prompt_missing_small inventory tile
- items-0351-0400.json slot 394 R5C4 `retort` (one): prompt_missing_small inventory tile
- items-0351-0400.json slot 395 R5C5 `retort` (few): prompt_missing_small inventory tile
- items-0351-0400.json slot 396 R5C6 `retort` (many): prompt_missing_small inventory tile
- items-0401-0450.json slot 408 R1C8 `alligator snapping turtle` (one): prompt_missing_small inventory tile
- items-0401-0450.json slot 409 R1C9 `alligator snapping turtle` (few): prompt_missing_small inventory tile
- items-0401-0450.json slot 410 R1C10 `alligator snapping turtle` (many): prompt_missing_small inventory tile
- items-0401-0450.json slot 411 R2C1 `alligator snapping turtle shell` (one): prompt_missing_small inventory tile
- items-0401-0450.json slot 412 R2C2 `alligator snapping turtle shell` (few): prompt_missing_small inventory tile
- items-0401-0450.json slot 413 R2C3 `alligator snapping turtle shell` (many): prompt_missing_small inventory tile
- items-0401-0450.json slot 415 R2C5 `snapping turtle` (one): prompt_missing_small inventory tile
- items-0401-0450.json slot 416 R2C6 `snapping turtle` (few): prompt_missing_small inventory tile
- items-0401-0450.json slot 417 R2C7 `snapping turtle` (many): prompt_missing_small inventory tile
- items-0401-0450.json slot 418 R2C8 `snapping turtle shell` (one): prompt_missing_small inventory tile
- items-0401-0450.json slot 419 R2C9 `snapping turtle shell` (few): prompt_missing_small inventory tile
- items-0401-0450.json slot 420 R2C10 `snapping turtle shell` (many): prompt_missing_small inventory tile
- items-0451-0500.json slot 470 R2C10 `hound` (one): prompt_missing_small inventory tile
- items-0451-0500.json slot 471 R3C1 `hound` (few): prompt_missing_small inventory tile
- items-0451-0500.json slot 472 R3C2 `hound` (many): prompt_missing_small inventory tile
- items-0451-0500.json slot 473 R3C3 `jackal` (one): prompt_missing_small inventory tile
- items-0451-0500.json slot 474 R3C4 `jackal` (few): prompt_missing_small inventory tile
- items-0451-0500.json slot 475 R3C5 `jackal` (many): prompt_missing_small inventory tile
- items-0451-0500.json slot 476 R3C6 `wolf` (one): prompt_missing_small inventory tile
- items-0451-0500.json slot 477 R3C7 `wolf` (few): prompt_missing_small inventory tile
- items-0451-0500.json slot 478 R3C8 `wolf` (many): prompt_missing_small inventory tile
- items-0451-0500.json slot 487 R4C7 `black bear` (one): prompt_missing_small inventory tile
- items-0451-0500.json slot 488 R4C8 `black bear` (few): prompt_missing_small inventory tile
- items-0451-0500.json slot 489 R4C9 `black bear` (many): prompt_missing_small inventory tile
- items-0451-0500.json slot 490 R4C10 `fabled catoblepas` (one): prompt_missing_small inventory tile
- items-0451-0500.json slot 491 R5C1 `fabled catoblepas` (few): prompt_missing_small inventory tile
- items-0451-0500.json slot 492 R5C2 `fabled catoblepas` (many): prompt_missing_small inventory tile
- items-0451-0500.json slot 493 R5C3 `elephant` (one): prompt_missing_small inventory tile
- items-0451-0500.json slot 494 R5C4 `elephant` (few): prompt_missing_small inventory tile
- items-0451-0500.json slot 495 R5C5 `elephant` (many): prompt_missing_small inventory tile
- items-0451-0500.json slot 496 R5C6 `grizzly bear` (one): prompt_missing_small inventory tile
- items-0451-0500.json slot 497 R5C7 `grizzly bear` (few): prompt_missing_small inventory tile
- items-0451-0500.json slot 498 R5C8 `grizzly bear` (many): prompt_missing_small inventory tile
- items-0451-0500.json slot 499 R5C9 `polar bear` (one): prompt_missing_small inventory tile
- items-0451-0500.json slot 500 R5C10 `polar bear` (few): prompt_missing_small inventory tile
- items-0501-0550.json slot 501 R1C1 `polar bear` (many): prompt_missing_small inventory tile
- items-0501-0550.json slot 502 R1C2 `alligator` (one): prompt_missing_small inventory tile
- items-0501-0550.json slot 503 R1C3 `alligator` (few): prompt_missing_small inventory tile
- items-0501-0550.json slot 504 R1C4 `alligator` (many): prompt_missing_small inventory tile
- items-0501-0550.json slot 505 R1C5 `baby alligator` (one): prompt_missing_small inventory tile
- items-0501-0550.json slot 506 R1C6 `baby alligator` (few): prompt_missing_small inventory tile
- items-0501-0550.json slot 507 R1C7 `baby alligator` (many): prompt_missing_small inventory tile
- items-0501-0550.json slot 508 R1C8 `crocodile` (one): prompt_missing_small inventory tile
- items-0501-0550.json slot 509 R1C9 `crocodile` (few): prompt_missing_small inventory tile
- items-0501-0550.json slot 510 R1C10 `crocodile` (many): prompt_missing_small inventory tile
- items-0501-0550.json slot 514 R2C4 `scarce komodo dragon` (one): prompt_missing_small inventory tile
- items-0501-0550.json slot 515 R2C5 `scarce komodo dragon` (few): prompt_missing_small inventory tile
- items-0501-0550.json slot 516 R2C6 `scarce komodo dragon` (many): prompt_missing_small inventory tile
- items-0501-0550.json slot 519 R2C9 `adder` (one): prompt_missing_small inventory tile
- items-0501-0550.json slot 520 R2C10 `adder` (few): prompt_missing_small inventory tile
- items-0501-0550.json slot 521 R3C1 `adder` (many): prompt_missing_small inventory tile
- items-0501-0550.json slot 522 R3C2 `anaconda` (one): prompt_missing_small inventory tile
- items-0501-0550.json slot 523 R3C3 `anaconda` (few): prompt_missing_small inventory tile
- items-0501-0550.json slot 524 R3C4 `anaconda` (many): prompt_missing_small inventory tile
- items-0501-0550.json slot 525 R3C5 `ball python` (one): prompt_missing_small inventory tile
- items-0501-0550.json slot 526 R3C6 `ball python` (few): prompt_missing_small inventory tile
- items-0501-0550.json slot 527 R3C7 `ball python` (many): prompt_missing_small inventory tile
- items-0501-0550.json slot 528 R3C8 `black mamba` (one): prompt_missing_small inventory tile
- items-0501-0550.json slot 529 R3C9 `black mamba` (few): prompt_missing_small inventory tile
- items-0501-0550.json slot 530 R3C10 `black mamba` (many): prompt_missing_small inventory tile
- items-0501-0550.json slot 532 R4C2 `fabled mana viper` (one): prompt_missing_small inventory tile
- items-0501-0550.json slot 533 R4C3 `fabled mana viper` (few): prompt_missing_small inventory tile
- items-0501-0550.json slot 534 R4C4 `fabled mana viper` (many): prompt_missing_small inventory tile
- items-0501-0550.json slot 538 R4C8 `viper` (one): prompt_missing_small inventory tile
- items-0501-0550.json slot 539 R4C9 `viper` (few): prompt_missing_small inventory tile
- items-0501-0550.json slot 540 R4C10 `viper` (many): prompt_missing_small inventory tile
- items-0501-0550.json slot 544 R5C4 `yellow snake` (one): prompt_missing_small inventory tile
- items-0501-0550.json slot 545 R5C5 `yellow snake` (few): prompt_missing_small inventory tile
- items-0501-0550.json slot 546 R5C6 `yellow snake` (many): prompt_missing_small inventory tile
- items-0551-0600.json slot 553 R1C3 `chicken` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 554 R1C4 `turkey` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 555 R1C5 `llama` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 556 R1C6 `pig` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 557 R1C7 `cow` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 558 R1C8 `sheep` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 559 R1C9 `goat` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 569 R2C9 `blue barding` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 570 R2C10 `blue barding` (few): prompt_missing_small inventory tile
- items-0551-0600.json slot 571 R3C1 `blue barding` (many): prompt_missing_small inventory tile
- items-0551-0600.json slot 572 R3C2 `magenta barding` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 573 R3C3 `magenta barding` (few): prompt_missing_small inventory tile
- items-0551-0600.json slot 574 R3C4 `magenta barding` (many): prompt_missing_small inventory tile
- items-0551-0600.json slot 575 R3C5 `metal barding` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 576 R3C6 `metal barding` (few): prompt_missing_small inventory tile
- items-0551-0600.json slot 577 R3C7 `metal barding` (many): prompt_missing_small inventory tile
- items-0551-0600.json slot 578 R3C8 `red barding` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 579 R3C9 `red barding` (few): prompt_missing_small inventory tile
- items-0551-0600.json slot 580 R3C10 `red barding` (many): prompt_missing_small inventory tile
- items-0551-0600.json slot 581 R4C1 `fabled blue dragon scale mail` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 582 R4C2 `fabled golden dragon armor` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 583 R4C3 `fabled ice dragon armor` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 584 R4C4 `Glassmere dragon armor` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 585 R4C5 `fabled pearl dragon armor` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 586 R4C6 `fabled quicksilver dragon scale mail` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 587 R4C7 `fabled shadow dragon scale mail` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 588 R4C8 `fabled silver dragon scale mail` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 589 R4C9 `swamp dragon armor` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 590 R4C10 `royal gauntlet` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 591 R5C1 `heavy guantlet` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 592 R5C2 `heavy guantlet` (few): prompt_missing_small inventory tile
- items-0551-0600.json slot 593 R5C3 `heavy guantlet` (many): prompt_missing_small inventory tile
- items-0551-0600.json slot 594 R5C4 `iron gauntlet` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 595 R5C5 `iron gauntlet` (few): prompt_missing_small inventory tile
- items-0551-0600.json slot 596 R5C6 `iron gauntlet` (many): prompt_missing_small inventory tile
- items-0551-0600.json slot 597 R5C7 `fabled royal guantlet` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 598 R5C8 `steel guantlet` (one): prompt_missing_small inventory tile
- items-0551-0600.json slot 599 R5C9 `steel guantlet` (few): prompt_missing_small inventory tile
- items-0551-0600.json slot 600 R5C10 `steel guantlet` (many): prompt_missing_small inventory tile
- items-0601-0650.json slot 601 R1C1 `war gloves` (one): prompt_missing_small inventory tile
- items-0601-0650.json slot 602 R1C2 `war gloves` (few): prompt_missing_small inventory tile
- items-0601-0650.json slot 603 R1C3 `war gloves` (many): prompt_missing_small inventory tile
- items-0601-0650.json slot 604 R1C4 `cermonial helmet of Embercourt` (one): prompt_missing_small inventory tile
- items-0601-0650.json slot 605 R1C5 `rough helmet` (one): prompt_missing_small inventory tile
- items-0601-0650.json slot 606 R1C6 `rough helmet` (few): prompt_missing_small inventory tile
- items-0601-0650.json slot 607 R1C7 `rough helmet` (many): prompt_missing_small inventory tile
- items-0601-0650.json slot 608 R1C8 `crested helmet` (one): prompt_missing_small inventory tile
- items-0601-0650.json slot 609 R1C9 `crested helmet` (few): prompt_missing_small inventory tile
- items-0601-0650.json slot 610 R1C10 `crested helmet` (many): prompt_missing_small inventory tile
- items-0601-0650.json slot 611 R2C1 `cross helmet` (one): prompt_missing_small inventory tile
- items-0601-0650.json slot 612 R2C2 `cross helmet` (few): prompt_missing_small inventory tile
- items-0601-0650.json slot 613 R2C3 `cross helmet` (many): prompt_missing_small inventory tile
- items-0601-0650.json slot 614 R2C4 `dragonmask helmet` (one): prompt_missing_small inventory tile
- items-0601-0650.json slot 615 R2C5 `dragonmask helmet` (few): prompt_missing_small inventory tile
- items-0601-0650.json slot 616 R2C6 `dragonmask helmet` (many): prompt_missing_small inventory tile
- items-0601-0650.json slot 617 R2C7 `etched helmet` (one): prompt_missing_small inventory tile
- items-0601-0650.json slot 618 R2C8 `etched helmet` (few): prompt_missing_small inventory tile
- items-0601-0650.json slot 619 R2C9 `etched helmet` (many): prompt_missing_small inventory tile
- items-0601-0650.json slot 620 R2C10 `golden grill helmet` (one): prompt_missing_small inventory tile
- items-0601-0650.json slot 621 R3C1 `golden grill helmet` (few): prompt_missing_small inventory tile
- items-0601-0650.json slot 622 R3C2 `golden grill helmet` (many): prompt_missing_small inventory tile
- items-0601-0650.json slot 623 R3C3 `golden winged helmet with gem` (one): prompt_missing_small inventory tile
- items-0601-0650.json slot 624 R3C4 `green helmet` (one): prompt_missing_small inventory tile
- items-0601-0650.json slot 625 R3C5 `green helmet` (few): prompt_missing_small inventory tile
- items-0601-0650.json slot 626 R3C6 `green helmet` (many): prompt_missing_small inventory tile
- items-0601-0650.json slot 627 R3C7 `helmet with flair` (one): prompt_missing_small inventory tile
- items-0601-0650.json slot 628 R3C8 `helmet with flair` (few): prompt_missing_small inventory tile
- items-0601-0650.json slot 629 R3C9 `helmet with flair` (many): prompt_missing_small inventory tile
- items-0601-0650.json slot 630 R3C10 `helmet with mask` (one): prompt_missing_small inventory tile
- items-0601-0650.json slot 631 R4C1 `helmet with mask` (few): prompt_missing_small inventory tile
- items-0601-0650.json slot 632 R4C2 `helmet with mask` (many): prompt_missing_small inventory tile
- items-0601-0650.json slot 633 R4C3 `Crownfall commander helmet` (one): prompt_missing_small inventory tile
- items-0601-0650.json slot 634 R4C4 `Crownfall commander helmet` (few): prompt_missing_small inventory tile
- items-0601-0650.json slot 635 R4C5 `Crownfall commander helmet` (many): prompt_missing_small inventory tile
- items-0601-0650.json slot 636 R4C6 `iron grilled helmet` (one): prompt_missing_small inventory tile
- items-0601-0650.json slot 637 R4C7 `iron grilled helmet` (few): prompt_missing_small inventory tile
- items-0601-0650.json slot 638 R4C8 `iron grilled helmet` (many): prompt_missing_small inventory tile
- items-0601-0650.json slot 639 R4C9 `plumed helmet` (one): prompt_missing_small inventory tile
- items-0601-0650.json slot 640 R4C10 `plumed helmet` (few): prompt_missing_small inventory tile
- items-0601-0650.json slot 641 R5C1 `plumed helmet` (many): prompt_missing_small inventory tile
- items-0601-0650.json slot 642 R5C2 `plumed helmet with grill` (one): prompt_missing_small inventory tile
- items-0601-0650.json slot 643 R5C3 `plumed helmet with grill` (few): prompt_missing_small inventory tile
- items-0601-0650.json slot 644 R5C4 `plumed helmet with grill` (many): prompt_missing_small inventory tile
- items-0601-0650.json slot 645 R5C5 `spiked helmet` (one): prompt_missing_small inventory tile
- items-0601-0650.json slot 646 R5C6 `spiked helmet` (few): prompt_missing_small inventory tile
- items-0601-0650.json slot 647 R5C7 `spiked helmet` (many): prompt_missing_small inventory tile
- items-0601-0650.json slot 648 R5C8 `standing wings helmet` (one): prompt_missing_small inventory tile
- items-0601-0650.json slot 649 R5C9 `standing wings helmet` (few): prompt_missing_small inventory tile
- items-0601-0650.json slot 650 R5C10 `standing wings helmet` (many): prompt_missing_small inventory tile
- items-0651-0700.json slot 651 R1C1 `tall helmet` (one): prompt_missing_small inventory tile
- items-0651-0700.json slot 652 R1C2 `tall helmet` (few): prompt_missing_small inventory tile
- items-0651-0700.json slot 653 R1C3 `tall helmet` (many): prompt_missing_small inventory tile
- items-0651-0700.json slot 654 R1C4 `winged helmet` (one): prompt_missing_small inventory tile
- items-0651-0700.json slot 655 R1C5 `winged helmet` (few): prompt_missing_small inventory tile
- items-0651-0700.json slot 656 R1C6 `winged helmet` (many): prompt_missing_small inventory tile
- items-0651-0700.json slot 657 R1C7 `banded mail` (one): prompt_missing_small inventory tile
- items-0651-0700.json slot 658 R1C8 `banded mail` (few): prompt_missing_small inventory tile
- items-0651-0700.json slot 659 R1C9 `banded mail` (many): prompt_missing_small inventory tile
- items-0651-0700.json slot 660 R1C10 `basic chain mail` (one): prompt_missing_small inventory tile
- items-0651-0700.json slot 661 R2C1 `basic chain mail` (few): prompt_missing_small inventory tile
- items-0651-0700.json slot 662 R2C2 `basic chain mail` (many): prompt_missing_small inventory tile
- items-0651-0700.json slot 663 R2C3 `Crownfall general platemail` (one): prompt_missing_small inventory tile
- items-0651-0700.json slot 664 R2C4 `Crownfall general platemail` (few): prompt_missing_small inventory tile
- items-0651-0700.json slot 665 R2C5 `Crownfall general platemail` (many): prompt_missing_small inventory tile
- items-0651-0700.json slot 666 R2C6 `rough leather armor` (one): prompt_missing_small inventory tile
- items-0651-0700.json slot 667 R2C7 `rough leather armor` (few): prompt_missing_small inventory tile
- items-0651-0700.json slot 668 R2C8 `rough leather armor` (many): prompt_missing_small inventory tile
- items-0651-0700.json slot 669 R2C9 `colorful scale mail` (one): prompt_missing_small inventory tile
- items-0651-0700.json slot 670 R2C10 `colorful scale mail` (few): prompt_missing_small inventory tile
- items-0651-0700.json slot 671 R3C1 `colorful scale mail` (many): prompt_missing_small inventory tile
- items-0651-0700.json slot 672 R3C2 `dwarven ringmail` (one): prompt_missing_small inventory tile
- items-0651-0700.json slot 673 R3C3 `dwarven ringmail` (few): prompt_missing_small inventory tile
- items-0651-0700.json slot 674 R3C4 `dwarven ringmail` (many): prompt_missing_small inventory tile
- items-0651-0700.json slot 675 R3C5 `starcourt leather armor` (one): prompt_missing_small inventory tile
- items-0651-0700.json slot 676 R3C6 `starcourt leather armor` (few): prompt_missing_small inventory tile
- items-0651-0700.json slot 677 R3C7 `starcourt leather armor` (many): prompt_missing_small inventory tile
- items-0651-0700.json slot 678 R3C8 `starcourt ringmail` (one): prompt_missing_small inventory tile
- items-0651-0700.json slot 679 R3C9 `starcourt ringmail` (few): prompt_missing_small inventory tile
- items-0651-0700.json slot 680 R3C10 `starcourt ringmail` (many): prompt_missing_small inventory tile
- items-0651-0700.json slot 681 R4C1 `starcourt scalemail` (one): prompt_missing_small inventory tile
- items-0651-0700.json slot 682 R4C2 `starcourt scalemail` (few): prompt_missing_small inventory tile
- items-0651-0700.json slot 683 R4C3 `starcourt scalemail` (many): prompt_missing_small inventory tile
- items-0651-0700.json slot 684 R4C4 `faerie platemail` (one): prompt_missing_small inventory tile
- items-0651-0700.json slot 685 R4C5 `banded mail` (one): prompt_missing_small inventory tile
- items-0651-0700.json slot 686 R4C6 `banded mail` (few): prompt_missing_small inventory tile
- items-0651-0700.json slot 687 R4C7 `banded mail` (many): prompt_missing_small inventory tile
- items-0651-0700.json slot 688 R4C8 `fancy chain mail` (one): prompt_missing_small inventory tile
- items-0651-0700.json slot 689 R4C9 `fancy chain mail` (few): prompt_missing_small inventory tile
- items-0651-0700.json slot 690 R4C10 `fancy chain mail` (many): prompt_missing_small inventory tile
- items-0651-0700.json slot 691 R5C1 `Redvale general armor` (one): prompt_missing_small inventory tile
- items-0651-0700.json slot 692 R5C2 `Redvale general armor` (few): prompt_missing_small inventory tile
- items-0651-0700.json slot 693 R5C3 `Redvale general armor` (many): prompt_missing_small inventory tile
- items-0651-0700.json slot 694 R5C4 `fancy ring mail with gem` (one): prompt_missing_small inventory tile
- items-0651-0700.json slot 695 R5C5 `fabled solid gold breastplate` (one): prompt_missing_small inventory tile
- items-0651-0700.json slot 696 R5C6 `orange crystal platemail` (one): prompt_missing_small inventory tile
- items-0651-0700.json slot 697 R5C7 `ironclan chain mail` (one): prompt_missing_small inventory tile
- items-0651-0700.json slot 698 R5C8 `ironclan chain mail` (few): prompt_missing_small inventory tile
- items-0651-0700.json slot 699 R5C9 `ironclan chain mail` (many): prompt_missing_small inventory tile
- items-0651-0700.json slot 700 R5C10 `ironclan leather armor` (one): prompt_missing_small inventory tile
- items-0701-0750.json slot 701 R1C1 `ironclan leather armor` (few): prompt_missing_small inventory tile
- items-0701-0750.json slot 702 R1C2 `ironclan leather armor` (many): prompt_missing_small inventory tile
- items-0701-0750.json slot 703 R1C3 `ironclan platemail` (one): prompt_missing_small inventory tile
- items-0701-0750.json slot 704 R1C4 `ironclan platemail` (few): prompt_missing_small inventory tile
- items-0701-0750.json slot 705 R1C5 `ironclan platemail` (many): prompt_missing_small inventory tile
- items-0701-0750.json slot 706 R1C6 `ironclan ringmail` (one): prompt_missing_small inventory tile
- items-0701-0750.json slot 707 R1C7 `ironclan ringmail` (few): prompt_missing_small inventory tile
- items-0701-0750.json slot 708 R1C8 `ironclan ringmail` (many): prompt_missing_small inventory tile
- items-0701-0750.json slot 709 R1C9 `platemail with gold` (one): prompt_missing_small inventory tile
- items-0701-0750.json slot 710 R1C10 `ring mail with leather` (one): prompt_missing_small inventory tile
- items-0701-0750.json slot 711 R2C1 `ring mail with leather` (few): prompt_missing_small inventory tile
- items-0701-0750.json slot 712 R2C2 `ring mail with leather` (many): prompt_missing_small inventory tile
- items-0701-0750.json slot 713 R2C3 `fancy ring mail with leather` (one): prompt_missing_small inventory tile
- items-0701-0750.json slot 714 R2C4 `fancy ring mail with leather` (few): prompt_missing_small inventory tile
- items-0701-0750.json slot 715 R2C5 `fancy ring mail with leather` (many): prompt_missing_small inventory tile
- items-0701-0750.json slot 716 R2C6 `salamander platemail` (one): prompt_missing_small inventory tile
- items-0701-0750.json slot 717 R2C7 `salamander platemail` (few): prompt_missing_small inventory tile
- items-0701-0750.json slot 718 R2C8 `salamander platemail` (many): prompt_missing_small inventory tile
- items-0701-0750.json slot 719 R2C9 `scale mail` (one): prompt_missing_small inventory tile
- items-0701-0750.json slot 720 R2C10 `scale mail` (few): prompt_missing_small inventory tile
- items-0701-0750.json slot 721 R3C1 `scale mail` (many): prompt_missing_small inventory tile
- items-0701-0750.json slot 722 R3C2 `scale mail with expensive gems` (one): prompt_missing_small inventory tile
- items-0701-0750.json slot 723 R3C3 `heavy platemail` (one): prompt_missing_small inventory tile
- items-0701-0750.json slot 724 R3C4 `heavy platemail` (few): prompt_missing_small inventory tile
- items-0701-0750.json slot 725 R3C5 `heavy platemail` (many): prompt_missing_small inventory tile
- items-0701-0750.json slot 726 R3C6 `fabled spiked ironclan breastplate` (one): prompt_missing_small inventory tile
- items-0701-0750.json slot 727 R3C7 `splint mail` (one): prompt_missing_small inventory tile
- items-0701-0750.json slot 728 R3C8 `splint mail` (few): prompt_missing_small inventory tile
- items-0701-0750.json slot 729 R3C9 `splint mail` (many): prompt_missing_small inventory tile
- items-0701-0750.json slot 730 R3C10 `strong leather armor` (one): prompt_missing_small inventory tile
- items-0701-0750.json slot 731 R4C1 `strong leather armor` (few): prompt_missing_small inventory tile
- items-0701-0750.json slot 732 R4C2 `strong leather armor` (many): prompt_missing_small inventory tile
- items-0701-0750.json slot 733 R4C3 `studded leather armor` (one): prompt_missing_small inventory tile
- items-0701-0750.json slot 734 R4C4 `studded leather armor` (few): prompt_missing_small inventory tile
- items-0701-0750.json slot 735 R4C5 `studded leather armor` (many): prompt_missing_small inventory tile
- items-0701-0750.json slot 736 R4C6 `mire brute hide` (one): prompt_missing_small inventory tile
- items-0701-0750.json slot 737 R4C7 `mire brute hide` (few): prompt_missing_small inventory tile
- items-0701-0750.json slot 738 R4C8 `mire brute hide` (many): prompt_missing_small inventory tile
- items-0701-0750.json slot 739 R4C9 `mire brute leather armor` (one): prompt_missing_small inventory tile
- items-0701-0750.json slot 740 R4C10 `mire brute leather armor` (few): prompt_missing_small inventory tile
- items-0701-0750.json slot 741 R5C1 `mire brute leather armor` (many): prompt_missing_small inventory tile
- items-0701-0750.json slot 742 R5C2 `fabled platemail of Unraveling` (one): prompt_missing_small inventory tile
- items-0701-0750.json slot 743 R5C3 `iron boots` (one): prompt_missing_small inventory tile
- items-0701-0750.json slot 744 R5C4 `iron boots` (few): prompt_missing_small inventory tile
- items-0701-0750.json slot 745 R5C5 `iron boots` (many): prompt_missing_small inventory tile
- items-0701-0750.json slot 746 R5C6 `shield of Pearlgate` (one): prompt_missing_small inventory tile
- items-0701-0750.json slot 747 R5C7 `shield of Pearlgate` (few): prompt_missing_small inventory tile
- items-0701-0750.json slot 748 R5C8 `shield of Pearlgate` (many): prompt_missing_small inventory tile
- items-0701-0750.json slot 749 R5C9 `Crownfall officier shield` (one): prompt_missing_small inventory tile
- items-0701-0750.json slot 750 R5C10 `Crownfall officier shield` (few): prompt_missing_small inventory tile
- items-0751-0800.json slot 751 R1C1 `Crownfall officier shield` (many): prompt_missing_small inventory tile
- items-0751-0800.json slot 752 R1C2 `buckler shield` (one): prompt_missing_small inventory tile
- items-0751-0800.json slot 753 R1C3 `buckler shield` (few): prompt_missing_small inventory tile
- items-0751-0800.json slot 754 R1C4 `buckler shield` (many): prompt_missing_small inventory tile
- items-0751-0800.json slot 755 R1C5 `decorative buckler shield` (one): prompt_missing_small inventory tile
- items-0751-0800.json slot 756 R1C6 `decorative buckler shield` (few): prompt_missing_small inventory tile
- items-0751-0800.json slot 757 R1C7 `decorative buckler shield` (many): prompt_missing_small inventory tile
- items-0751-0800.json slot 758 R1C8 `shield of Border March brotherhood` (one): prompt_missing_small inventory tile
- items-0751-0800.json slot 759 R1C9 `dwarven buckler shield` (one): prompt_missing_small inventory tile
- items-0751-0800.json slot 760 R1C10 `dwarven buckler shield` (few): prompt_missing_small inventory tile
- items-0751-0800.json slot 761 R2C1 `dwarven buckler shield` (many): prompt_missing_small inventory tile
- items-0751-0800.json slot 762 R2C2 `fabled shield of Highbell` (one): prompt_missing_small inventory tile
- items-0751-0800.json slot 763 R2C3 `starcourt buckler shield` (one): prompt_missing_small inventory tile
- items-0751-0800.json slot 764 R2C4 `starcourt buckler shield` (few): prompt_missing_small inventory tile
- items-0751-0800.json slot 765 R2C5 `starcourt buckler shield` (many): prompt_missing_small inventory tile
- items-0751-0800.json slot 766 R2C6 `fancy buckler shield` (one): prompt_missing_small inventory tile
- items-0751-0800.json slot 767 R2C7 `fancy buckler shield` (few): prompt_missing_small inventory tile
- items-0751-0800.json slot 768 R2C8 `fancy buckler shield` (many): prompt_missing_small inventory tile
- items-0751-0800.json slot 769 R2C9 `fancy dwarven buckler shield` (one): prompt_missing_small inventory tile
- items-0751-0800.json slot 770 R2C10 `fancy dwarven buckler shield` (few): prompt_missing_small inventory tile
- items-0751-0800.json slot 771 R3C1 `fancy dwarven buckler shield` (many): prompt_missing_small inventory tile
- items-0751-0800.json slot 772 R3C2 `fancy starcourt buckler shield` (one): prompt_missing_small inventory tile
- items-0751-0800.json slot 773 R3C3 `fancy starcourt buckler shield` (few): prompt_missing_small inventory tile
- items-0751-0800.json slot 774 R3C4 `fancy starcourt buckler shield` (many): prompt_missing_small inventory tile
- ...and 2199 more

## Proposed Gameplay Description Standard

```json
{
  "id": "category/item_id",
  "name": "Readable Item Name",
  "shortDescription": "One clear sentence for market/inventory UI.",
  "flavorText": "Optional one-line worldbuilding text.",
  "family": "...",
  "subfamily": "...",
  "tags": ["..."]
}
```
