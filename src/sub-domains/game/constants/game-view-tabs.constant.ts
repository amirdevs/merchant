import type { GameView } from "@/sub-domains/game/types/game-view.type";

export const viewTabs: Array<{ view: GameView; label: string; helper: string }> = [
  { view: "market", label: "Market", helper: "town hub" },
  { view: "customers", label: "Customers", helper: "people" },
  { view: "barter", label: "Barter", helper: "trade" },
  { view: "inventory", label: "Inventory", helper: "goods" },
  { view: "travel", label: "Travel", helper: "routes" },
  { view: "system", label: "System", helper: "save" },
  { view: "ui-check", label: "QA", helper: "layout" },
];
