export function itemGridSpan(size: number) {
  if (size >= 50) return "col-span-4 row-span-3";
  if (size >= 25) return "col-span-3 row-span-3";
  if (size >= 5) return "col-span-2 row-span-2";
  return "col-span-1 row-span-1";
}
