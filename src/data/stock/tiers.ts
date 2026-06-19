import type { StockTier, StockTierId } from "./types";

export const stockTiers: Record<StockTierId, StockTier> = {
  empty: { minStacks: 0, maxStacks: 0, quantityMultiplier: 0, coinMultiplier: 0, rareItemChance: 0, restockMode: "never", restockDays: 0, restockRate: 0, progressionScaling: 0 },
  pocket: { minStacks: 3, maxStacks: 6, quantityMultiplier: 0.5, coinMultiplier: 0.4, rareItemChance: 0.005, restockMode: "interval", restockDays: 4, restockRate: 0.55, progressionScaling: 0.001 },
  sparse: { minStacks: 6, maxStacks: 11, quantityMultiplier: 0.7, coinMultiplier: 0.6, rareItemChance: 0.01, restockMode: "interval", restockDays: 3, restockRate: 0.6, progressionScaling: 0.0015 },
  light: { minStacks: 10, maxStacks: 16, quantityMultiplier: 0.9, coinMultiplier: 0.8, rareItemChance: 0.015, restockMode: "interval", restockDays: 2, restockRate: 0.65, progressionScaling: 0.002 },
  modest: { minStacks: 15, maxStacks: 22, quantityMultiplier: 1.1, coinMultiplier: 1, rareItemChance: 0.025, restockMode: "interval", restockDays: 2, restockRate: 0.7, progressionScaling: 0.0025 },
  standard: { minStacks: 21, maxStacks: 30, quantityMultiplier: 1.4, coinMultiplier: 1.25, rareItemChance: 0.04, restockMode: "daily", restockDays: 1, restockRate: 0.75, progressionScaling: 0.003 },
  stocked: { minStacks: 29, maxStacks: 40, quantityMultiplier: 1.8, coinMultiplier: 1.6, rareItemChance: 0.06, restockMode: "daily", restockDays: 1, restockRate: 0.8, progressionScaling: 0.0035 },
  large: { minStacks: 39, maxStacks: 52, quantityMultiplier: 2.4, coinMultiplier: 2.1, rareItemChance: 0.085, restockMode: "daily", restockDays: 1, restockRate: 0.85, progressionScaling: 0.004 },
  wholesale: { minStacks: 50, maxStacks: 68, quantityMultiplier: 3.2, coinMultiplier: 3, rareItemChance: 0.11, restockMode: "daily", restockDays: 1, restockRate: 0.9, progressionScaling: 0.0045 },
  grand: { minStacks: 65, maxStacks: 90, quantityMultiplier: 4.5, coinMultiplier: 4.5, rareItemChance: 0.15, restockMode: "daily", restockDays: 1, restockRate: 1, progressionScaling: 0.005 },
};
