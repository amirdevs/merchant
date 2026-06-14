export function MarketEconomyStrip({ title, text }: { title: string; text: string }) {
  return (
    <div className="market-v5-economy-strip">
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}
