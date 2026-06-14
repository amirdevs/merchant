import { useEffect } from "react";
import type { Marketplace } from "@/data/types";
import { playAmbient } from "@/lib/audio";

export function useMarketAmbientAudio(market: Marketplace) {
  useEffect(() => {
    playAmbient(market.ambiancePrimaryFile);
  }, [market.ambiancePrimaryFile]);
}
