export type TradePermit = {
  kingdomIndex: number;
  quality: number;
  expiresDay: number;
  forged: boolean;
};

export type LawState = {
  heatByKingdom: Record<string, number>;
  permits: Record<string, TradePermit>;
  blackMarketReputation: number;
};

export function createLawState(): LawState {
  return {
    heatByKingdom: {},
    permits: {},
    blackMarketReputation: 0,
  };
}

export function kingdomHeat(law: LawState, kingdomIndex: number) {
  return law.heatByKingdom[String(kingdomIndex)] || 0;
}

export function adjustKingdomHeat(law: LawState, kingdomIndex: number, amount: number) {
  const key = String(kingdomIndex);
  law.heatByKingdom[key] = Math.max(0, Math.min(100, (law.heatByKingdom[key] || 0) + amount));
  return law.heatByKingdom[key];
}

export function coolLawHeat(law: LawState, days: number) {
  for (const [key, heat] of Object.entries(law.heatByKingdom)) {
    law.heatByKingdom[key] = Math.max(0, heat - Math.max(0, days));
  }
}

export function issuePermit(law: LawState, kingdomIndex: number, day: number, quality = 2, forged = false) {
  const permit: TradePermit = {
    kingdomIndex,
    quality: Math.max(1, Math.min(3, quality)),
    expiresDay: day + (forged ? 14 : 30),
    forged,
  };
  law.permits[String(kingdomIndex)] = permit;
  return permit;
}

export function activePermit(law: LawState, kingdomIndex: number, day: number) {
  const permit = law.permits[String(kingdomIndex)];
  return permit && permit.expiresDay >= day ? permit : null;
}

export function permitInspectionMultiplier(permit: TradePermit | null) {
  if (!permit) return 1;
  const qualityReduction = permit.quality === 3 ? 0.3 : permit.quality === 2 ? 0.5 : 0.7;
  return permit.forged ? qualityReduction + 0.15 : qualityReduction;
}

export function canUseBlackMarket(law: LawState, npcTrust: number, isUnderworldNpc: boolean) {
  return isUnderworldNpc && (law.blackMarketReputation >= 1 || npcTrust >= 2);
}
