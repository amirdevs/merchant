import { useEffect, useState } from "react";
import { loadGame, loadMods, newGame, type GameState } from "@/lib/game";

export function useGameMods(setState: (state: GameState) => void) {
  const [modStatus, setModStatus] = useState("Loading mods...");

  useEffect(() => {
    let cancelled = false;
    loadMods().then((result) => {
      if (cancelled) return;
      setModStatus(result.loaded ? `Loaded mods: ${result.names.join(", ")}` : "No mods loaded");
      if (!loadGame()) setState(newGame());
    });
    return () => {
      cancelled = true;
    };
  }, [setState]);

  return modStatus;
}
