import type { MouseEvent } from "react";
import type { InventoryEntry } from "@/data/types";
import type { MoveAmount } from "@/lib/inventory";

export type InventoryPanelMode = "stock" | "offer";
export type InventoryPanelVariant = "standard" | "management" | "compact";
export type InventorySortMode = "name" | "value" | "quantity" | "weight";

export type InventoryPanelProps = {
  title: string;
  inventory: InventoryEntry[];
  mode?: InventoryPanelMode;
  onMove: (entry: InventoryEntry, amount: MoveAmount) => void;
  onMoveAll: (entry: InventoryEntry) => void;
  onToggleProtect?: (entry: InventoryEntry) => void;
  allowProtect?: boolean;
  variant?: InventoryPanelVariant;
  subtitle?: string;
};

export type ItemSlotProps = {
  entry: InventoryEntry;
  mode: InventoryPanelMode;
  selected: boolean;
  allowProtect: boolean;
  onMove: (entry: InventoryEntry, amount: MoveAmount) => void;
  onMoveAll: (entry: InventoryEntry) => void;
  onSelect: (entry: InventoryEntry) => void;
  onToggleProtect?: (entry: InventoryEntry) => void;
  clickAmount: (event: MouseEvent<HTMLButtonElement>) => MoveAmount;
};
