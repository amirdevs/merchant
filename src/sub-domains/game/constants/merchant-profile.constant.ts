import type { MerchantProfile } from "@/sub-domains/game/types/merchant-profile.type";

export const defaultMerchantProfile: MerchantProfile = {
  name: "Aster Vale",
  background: "Ledger Apprentice",
  difficulty: "Standard Market",
  starter: "Careful Appraiser",
};

export const merchantStarterChoices = ["Careful Appraiser", "Road Bargainer", "Spice Runner"] as const;
