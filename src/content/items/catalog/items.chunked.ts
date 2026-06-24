import items0001To0300 from "./chunks/items-0001-0300.json";
import items0301To0600 from "./chunks/items-0301-0600.json";
import items0601To0900 from "./chunks/items-0601-0900.json";
import items0901To1200 from "./chunks/items-0901-1200.json";
import items1201To1500 from "./chunks/items-1201-1500.json";
import items1501To1800 from "./chunks/items-1501-1800.json";
import items1801To2100 from "./chunks/items-1801-2100.json";
import items2101To2206 from "./chunks/items-2101-2206.json";
import characterMerchandiseItems from "./character-merchandise-items.json";
import specialistMerchantItems from "./specialist-merchant-items.json";
import type { Item } from "@/shared/types/game-data";

export const itemsChunked = [
  ...items0001To0300,
  ...items0301To0600,
  ...items0601To0900,
  ...items0901To1200,
  ...items1201To1500,
  ...items1501To1800,
  ...items1801To2100,
  ...items2101To2206,
  ...characterMerchandiseItems,
  ...specialistMerchantItems,
] as Item[];
