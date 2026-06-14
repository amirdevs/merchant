import type { GameView } from "@/sub-domains/game/types/game-view.type";

export const viewTabs: Array<{ view: GameView; label: string; helper: string }> = [
  { view: "main-menu", label: "Menu", helper: "title" },
  { view: "new-profile", label: "New", helper: "profile" },
  { view: "load-game", label: "Load", helper: "saves" },
  { view: "settings", label: "Settings", helper: "options" },
  { view: "system", label: "System", helper: "pause" },
  { view: "travel", label: "Map", helper: "routes" },
  { view: "market", label: "Market", helper: "town hub" },
  { view: "customers", label: "Customers", helper: "roster" },
  { view: "barter", label: "Barter", helper: "trade" },
  { view: "inventory", label: "Inventory", helper: "goods" },
  { view: "inventory-filter", label: "Filter", helper: "search" },
  { view: "item-detail", label: "Item", helper: "detail" },
];
