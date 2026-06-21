import type { Item } from "@/data/types";
import writtenItemDescriptions0000To0091 from "@/data/generated/item-written-descriptions.json";
import writtenItemDescriptions0092To0141 from "@/data/generated/item-written-descriptions-0092-0141.json";
import writtenItemDescriptions0142To0191 from "@/data/generated/item-written-descriptions-0142-0191.json";
import writtenItemDescriptions0192To0241 from "@/data/generated/item-written-descriptions-0192-0241.json";
import writtenItemDescriptions0242To0291 from "@/data/generated/item-written-descriptions-0242-0291.json";
import writtenItemDescriptions0292To0341 from "@/data/generated/item-written-descriptions-0292-0341.json";
import writtenItemDescriptions0342To0391 from "@/data/generated/item-written-descriptions-0342-0391.json";
import writtenItemDescriptions0392To0416 from "@/data/generated/item-written-descriptions-0392-0416.json";
import writtenItemDescriptions0417To0441 from "@/data/generated/item-written-descriptions-0417-0441.json";
import writtenItemDescriptions0442To0466 from "@/data/generated/item-written-descriptions-0442-0466.json";
import writtenItemDescriptions0467To0491 from "@/data/generated/item-written-descriptions-0467-0491.json";
import writtenItemDescriptions0492To0516 from "@/data/generated/item-written-descriptions-0492-0516.json";
import writtenItemDescriptions0517To0541 from "@/data/generated/item-written-descriptions-0517-0541.json";
import writtenItemDescriptions0542To0591 from "@/data/generated/item-written-descriptions-0542-0591.json";
import writtenItemDescriptions0592To0641 from "@/data/generated/item-written-descriptions-0592-0641.json";
import writtenItemDescriptions0642To0691 from "@/data/generated/item-written-descriptions-0642-0691.json";
import writtenItemDescriptions0692To0741 from "@/data/generated/item-written-descriptions-0692-0741.json";
import writtenItemDescriptions0742To0791 from "@/data/generated/item-written-descriptions-0742-0791.json";
import writtenItemDescriptions0792To0841 from "@/data/generated/item-written-descriptions-0792-0841.json";
import writtenItemDescriptions0842To0891 from "@/data/generated/item-written-descriptions-0842-0891.json";
import writtenItemDescriptions0892To0941 from "@/data/generated/item-written-descriptions-0892-0941.json";
import writtenItemDescriptions0942To0991 from "@/data/generated/item-written-descriptions-0942-0991.json";
import writtenItemDescriptions0992To1041 from "@/data/generated/item-written-descriptions-0992-1041.json";
import writtenItemDescriptions1042To1091 from "@/data/generated/item-written-descriptions-1042-1091.json";
import writtenItemDescriptions1092To1141 from "@/data/generated/item-written-descriptions-1092-1141.json";
import writtenItemDescriptions1142To1191 from "@/data/generated/item-written-descriptions-1142-1191.json";
import writtenItemDescriptions1192To1241 from "@/data/generated/item-written-descriptions-1192-1241.json";
import writtenItemDescriptions1242To1291 from "@/data/generated/item-written-descriptions-1242-1291.json";
import writtenItemDescriptions1292To1341 from "@/data/generated/item-written-descriptions-1292-1341.json";
import writtenItemDescriptions1342To1391 from "@/data/generated/item-written-descriptions-1342-1391.json";
import writtenItemDescriptions1392To1441 from "@/data/generated/item-written-descriptions-1392-1441.json";
import writtenItemDescriptions1442To1491 from "@/data/generated/item-written-descriptions-1442-1491.json";

type StaticCopy = {
  shortDescription: string;
  flavorText: string;
};

type WrittenItemCopy = StaticCopy & {
  index: number;
  id?: string;
  name: string;
};

const writtenCopies = [
  ...(writtenItemDescriptions0000To0091 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0092To0141 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0142To0191 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0192To0241 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0242To0291 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0292To0341 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0342To0391 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0392To0416 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0417To0441 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0442To0466 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0467To0491 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0492To0516 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0517To0541 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0542To0591 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0592To0641 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0642To0691 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0692To0741 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0742To0791 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0792To0841 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0842To0891 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0892To0941 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0942To0991 as WrittenItemCopy[]),
  ...(writtenItemDescriptions0992To1041 as WrittenItemCopy[]),
  ...(writtenItemDescriptions1042To1091 as WrittenItemCopy[]),
  ...(writtenItemDescriptions1092To1141 as WrittenItemCopy[]),
  ...(writtenItemDescriptions1142To1191 as WrittenItemCopy[]),
  ...(writtenItemDescriptions1192To1241 as WrittenItemCopy[]),
  ...(writtenItemDescriptions1242To1291 as WrittenItemCopy[]),
  ...(writtenItemDescriptions1292To1341 as WrittenItemCopy[]),
  ...(writtenItemDescriptions1342To1391 as WrittenItemCopy[]),
  ...(writtenItemDescriptions1392To1441 as WrittenItemCopy[]),
  ...(writtenItemDescriptions1442To1491 as WrittenItemCopy[]),
];

const byIndex = new Map<number, WrittenItemCopy>();
const byId = new Map<string, WrittenItemCopy>();

for (const copy of writtenCopies) {
  byIndex.set(copy.index, copy);
  if (copy.id) byId.set(copy.id, copy);
}

export function buildStaticItemCopy(item: Item): StaticCopy {
  const written = byIndex.get(item.index) || (item.id ? byId.get(item.id) : undefined);

  return {
    shortDescription:
      item.shortDescription ||
      written?.shortDescription ||
      item.name + " is trade stock with enough condition, context, and market use to deserve inspection before pricing.",
    flavorText:
      item.flavorText ||
      written?.flavorText ||
      "“Every item has two prices: the one in the ledger, and the one a buyer invents after hearing where it has been.”",
  };
}
