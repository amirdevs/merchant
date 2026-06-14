export function InventoryFilterStrip({
  activeTag,
  totalCount,
  categoryTags,
  onTagChange,
}: {
  activeTag: string;
  totalCount: number;
  categoryTags: Array<[string, number]>;
  onTagChange: (tag: string) => void;
}) {
  return (
    <div className="inventory-filter-strip" aria-label="Inventory filters">
      <button className={activeTag === "all" ? "is-active" : ""} type="button" onClick={() => onTagChange("all")}>
        All <span>{totalCount}</span>
      </button>
      {categoryTags.map(([tag, count]) => (
        <button key={tag} className={activeTag === tag ? "is-active" : ""} type="button" onClick={() => onTagChange(tag)}>
          {tag} <span>{count}</span>
        </button>
      ))}
    </div>
  );
}
