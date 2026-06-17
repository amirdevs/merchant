import { describe, expect, it } from "vitest";
import { benfordsQuantity } from "./game";

describe("inventory generation", () => {
  it("keeps generated quantities inside the configured bounds", () => {
    const rolls = [0, 0.2, 0.5, 0.9, 0.999];
    const quantities = rolls.map((roll) => benfordsQuantity(2, 8, () => roll));

    expect(Math.min(...quantities)).toBeGreaterThanOrEqual(2);
    expect(Math.max(...quantities)).toBeLessThanOrEqual(8);
  });

  it("skews lower rolls toward lower quantities", () => {
    const low = benfordsQuantity(1, 20, () => 0.25);
    const middle = benfordsQuantity(1, 20, () => 0.5);
    const high = benfordsQuantity(1, 20, () => 0.9);

    expect(low).toBeLessThan(middle);
    expect(middle).toBeLessThan(high);
    expect(low).toBeLessThan(6);
  });

  it("returns fixed values for fixed ranges", () => {
    expect(benfordsQuantity(4, 4, () => 0.99)).toBe(4);
  });
});
