import { describe, expect, it } from "vitest";
import {
  ECONOMY_TRADE_ITEMS,
  buildEconomyStockView,
  buildEconomyWorldExpansionView,
  economyDynamicPrice,
  economyExpansionSummary,
  routeEventForLoop,
  worldExpansionReadinessScore,
} from "@/lib/economy-world-expansion";
import { createPlayableMerchantLoopState, LOOP_ROUTES, registerLoopCompany, runRecommendedLoopDemo } from "@/lib/playable-merchant-loop";

describe("economy world expansion", () => {
  it("defines a larger tuned item set for the starter region", () => {
    expect(ECONOMY_TRADE_ITEMS.length).toBeGreaterThanOrEqual(18);
    expect(ECONOMY_TRADE_ITEMS.some((item) => item.id === "coastal-salt" && item.loopItemId === "coastal-salt")).toBe(true);
    expect(ECONOMY_TRADE_ITEMS.some((item) => item.id === "sealed-contracts")).toBe(true);
  });

  it("builds dynamic stock views for the active loop town", () => {
    const loop = createPlayableMerchantLoopState();
    const view = buildEconomyWorldExpansionView(loop);

    expect(view.currentTown.name).toBe("Sunwake Harbor");
    expect(view.currentTownStocks.length).toBeGreaterThan(0);
    expect(view.currentTownStocks.every((stock) => stock.dynamicPrice > 0)).toBe(true);
    expect(view.routeEvents.length).toBeGreaterThan(0);
  });

  it("moves the world readiness score upward after the recommended loop", () => {
    const start = createPlayableMerchantLoopState();
    const completed = runRecommendedLoopDemo();

    expect(worldExpansionReadinessScore(completed)).toBeGreaterThan(worldExpansionReadinessScore(start));
    expect(economyExpansionSummary(completed).readinessLabel).toBe("Expansion-ready");
  });

  it("makes shadow heat affect route risk", () => {
    const loop = createPlayableMerchantLoopState();
    const route = LOOP_ROUTES.find((entry) => entry.id === "sunwake-brasskeep");
    if (!route) throw new Error("Expected route missing");

    const quiet = routeEventForLoop(route, loop);
    loop.consequences.shadowHeat = 18;
    const heated = routeEventForLoop(route, loop);

    expect(heated.currentRisk).toBeGreaterThan(quiet.currentRisk);
    expect(heated.tone).toBe("risk");
  });

  it("prices react to trust, heat, demand, and company registration", () => {
    const loop = createPlayableMerchantLoopState();
    const view = buildEconomyWorldExpansionView(loop);
    const stock = view.currentTownStocks[0];
    const profile = { ...stock };
    const basePrice = economyDynamicPrice(profile, loop);

    loop.consequences.shadowHeat = 18;
    const hotPrice = economyDynamicPrice(profile, loop);
    const registered = registerLoopCompany(runRecommendedLoopDemo());
    const trustedPrice = economyDynamicPrice(profile, registered);

    expect(hotPrice).toBeGreaterThanOrEqual(basePrice);
    expect(trustedPrice).toBeLessThanOrEqual(hotPrice);
  });

  it("can build a direct stock row from a profile", () => {
    const loop = createPlayableMerchantLoopState();
    const view = buildEconomyWorldExpansionView(loop);
    const row = buildEconomyStockView(view.currentTownStocks[0], loop);

    expect(row.itemName).toBeTruthy();
    expect(["safe", "watch", "risk", "opportunity"]).toContain(row.tone);
  });
});
