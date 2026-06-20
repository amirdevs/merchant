import type { Item } from "@/data/types";
import writtenItemDescriptions from "@/data/generated/item-written-descriptions.json";

type StaticCopy = {
  shortDescription: string;
  flavorText: string;
};

type WrittenItemCopy = StaticCopy & {
  index: number;
  id?: string;
  name: string;
};

const writtenCopies = writtenItemDescriptions as WrittenItemCopy[];
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
