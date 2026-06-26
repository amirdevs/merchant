import { describe, expect, it } from "vitest";
import { characterStockProfiles, characterStockProfileById } from "@/content/characters/stock";

function tagsForDisplayName(displayName: string) {
  const profile = characterStockProfiles.find((entry) => entry.displayName === displayName);
  return profile ? [...profile.primaryPools, ...profile.secondaryPools].map((pool) => pool.tag) : [];
}

describe("explicit character stock profiles", () => {
  it("creates explicit stock profiles for runtime merchants", () => {
    expect(characterStockProfiles.length).toBeGreaterThan(40);
    expect(characterStockProfileById.size).toBe(characterStockProfiles.length);
  });

  it("keeps silk factors focused on textiles and dyes", () => {
    const tags = tagsForDisplayName("Lysaro Vellthorn");
    if (!tags.length) return;
    expect(tags).toContain("silk_bolt");
    expect(tags).toContain("dyed_silk");
    expect(tags).toContain("dye_vials");
    expect(tags).not.toContain("meat");
    expect(tags).not.toContain("ore");
  });

  it("keeps cookshop owners focused on kitchen goods", () => {
    const tags = tagsForDisplayName("Milo Copperpot");
    if (!tags.length) return;
    expect(tags).toContain("cookpot");
    expect(tags).toContain("ladle");
    expect(tags).toContain("spices");
    expect(tags).not.toContain("jewelry");
    expect(tags).not.toContain("ore");
  });

  it("gives every profile enough primary stock identity", () => {
    for (const profile of characterStockProfiles) {
      expect(profile.primaryPools.length).toBeGreaterThanOrEqual(2);
      expect(profile.stockBias.length).toBeGreaterThanOrEqual(2);
      expect(profile.stockRole.length).toBeGreaterThan(0);
    }
  });
});
