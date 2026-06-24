export function money(value: number) {
  if (value >= 10000) return `${Math.round(value / 100) / 10}k`;
  return String(Math.round(value));
}

export function title(value: string) {
  return value
    .split(/[_\s]+/)
    .filter(Boolean)
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(" ");
}
