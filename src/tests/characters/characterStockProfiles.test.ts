import { describe, expect, it } from "vitest";
import { characterStockProfiles, characterStockProfileById } from "@/content/characters/stock";

function profileForDisplayName(displayName: string) {
  return characterStockProfiles.find((entry) => entry.displayName === displayName);
}

function tagsForDisplayName(displayName: string) {
  const profile = profileForDisplayName(displayName);
  return profile ? [...profile.primaryPools, ...profile.secondaryPools].map((entry) => entry.tag) : [];
}

describe("explicit character stock profiles", () => {
  it("creates explicit stock profiles for runtime merchants", () => {
    expect(characterStockProfiles.length).toBeGreaterThan(40);
    expect(characterStockProfileById.size).toBe(characterStockProfiles.length);
  });

  it("keeps silk factors focused on textiles and dyes", () => {
    const tags = tagsForDisplayName("Lysaro Vellthorn");
    expect(tags).toContain("silk_bolt");
    expect(tags).toContain("dyed_silk");
    expect(tags).toContain("dye_vials");
    expect(tags).not.toContain("meat");
    expect(tags).not.toContain("ore");
  });

  it("keeps cookshop owners focused on kitchen goods", () => {
    const tags = tagsForDisplayName("Milo Copperpot");
    expect(tags).toContain("cookpot");
    expect(tags).toContain("ladle");
    expect(tags).toContain("spices");
    expect(tags).not.toContain("jewelry");
    expect(tags).not.toContain("ore");
  });

  it("keeps named specialist merchants out of the generic market bucket", () => {
    const expectations: Array<[string, string, string[]]> = [
      ["Rima Glasslark", "glass_seller", ["glassware", "glass_bottle"]],
      ["Ivo Plumspice", "spice_merchant", ["spices", "spice_jar_set"]],
      ["Edris Nightjar", "lamp_oil_seller", ["lamp_oil", "lantern"]],
      ["Senna Rainbarrel", "water_seller", ["rainwater_jug", "water"]],
      ["Jarek Thornboot", "cobbler", ["shoe_repair", "leather"]],
      ["Kellan Sootwink", "chimney_sweep", ["chimney_brush", "soot"]],
      ["Orvik Bellows", "tinker", ["repair_tools", "tinware"]],
      ["Tovan Gristlen", "miller", ["flour", "grain"]],
      ["Borin Mulefriend", "pack_animal_trader", ["pack_saddle", "animal_feed"]],
      ["Talia Redscale", "reptile_seller", ["reptile", "animal_cage"]],
      ["Vessa Stonebloom", "potter", ["pottery", "clay"]],
      ["Nico Quickmeasure", "surveying_tools", ["measuring_cord", "map"]],
      ["Nixie Copperbell", "bell_polisher", ["bell", "brass_polish"]],
      ["Idris Starbrass", "surveying_tools", ["astrolabe", "compass"]],
      ["Mora Pindrop", "locksmith", ["lock", "key"]],
    ];

    for (const [displayName, role, expectedTags] of expectations) {
      const profile = profileForDisplayName(displayName);
      expect(profile, displayName).toBeTruthy();
      expect(profile?.stockRole).toBe(role);
      const tags = new Set(tagsForDisplayName(displayName));
      for (const tag of expectedTags) expect(tags.has(tag), `${displayName} should stock ${tag}`).toBe(true);
      expect(profile?.stockRole).not.toBe("general_market_trader");
    }
  });

  it("gives every profile enough primary stock identity", () => {
    for (const profile of characterStockProfiles) {
      expect(profile.primaryPools.length).toBeGreaterThanOrEqual(2);
      expect(profile.stockBias.length).toBeGreaterThanOrEqual(2);
      expect(profile.stockRole.length).toBeGreaterThan(0);
    }
  });
});
