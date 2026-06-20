import type { Item } from "@/data/types";
import writtenItemDescriptions0000To0091 from "@/data/generated/item-written-descriptions.json";
import writtenItemDescriptions0092To0141 from "@/data/generated/item-written-descriptions-0092-0141.json";
import writtenItemDescriptions0142To0191 from "@/data/generated/item-written-descriptions-0142-0191.json";

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
