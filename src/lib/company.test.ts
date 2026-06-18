import { describe, expect, it } from "vitest";
import { createCompanyState, createShipment, depositWarehouse, openWarehouse, repayLoan, settleShipments, takeLoan, withdrawWarehouse } from "./company";

describe("company progression", () => {
  it("stores and withdraws cargo from market warehouses", () => {
    const company = createCompanyState();
    const inventory = [{ itemIndex: 3, quantity: 5, offerQuantity: 0 }];
    expect(openWarehouse(company, 0)).toBe(true);
    expect(depositWarehouse(company, 0, inventory, 3, 2)).toBe(true);
    expect(inventory[0].quantity).toBe(3);
    expect(withdrawWarehouse(company, 0, inventory, 3, 1)).toBe(true);
    expect(inventory[0].quantity).toBe(4);
  });

  it("runs passive shipments and updates company accounts", () => {
    const company = createCompanyState();
    const shipment = createShipment(company, 0, 1, 1, 3, 2)!;
    const settled = settleShipments(company, shipment.dueDay);
    expect(settled).toHaveLength(1);
    expect(["succeeded", "failed"]).toContain(shipment.status);
  });

  it("supports one bank loan and repayment with interest", () => {
    const company = createCompanyState();
    expect(takeLoan(company, 100)).toBe(100);
    expect(company.loanBalance).toBe(110);
    company.bankCopper += 10;
    expect(repayLoan(company)).toBe(true);
    expect(company.loanBalance).toBe(0);
  });
});
