import { useEffect, useMemo, useState } from "react";
import type { Character } from "@/shared/types/game-data";
import { fallbackCharacterProfileView } from "./characterProfileShared";
import type { CharacterProfileView } from "./characterProfileShared";
import type { CharacterExpression } from "@/content/characters/characterProfileTypes";

type CharacterPortraitManifestModule = typeof import("./characterPortraitManifest");

let manifestModulePromise: Promise<CharacterPortraitManifestModule> | null = null;
let manifestModuleValue: CharacterPortraitManifestModule | null = null;

function loadCharacterPortraitManifest() {
  if (manifestModuleValue) return Promise.resolve(manifestModuleValue);
  if (!manifestModulePromise) {
    manifestModulePromise = import("./characterPortraitManifest").then((module) => {
      manifestModuleValue = module;
      return module;
    });
  }
  return manifestModulePromise;
}

export function useCharacterProfiles() {
  const [manifest, setManifest] = useState<CharacterPortraitManifestModule | null>(() => manifestModuleValue);

  useEffect(() => {
    if (manifest) return;
    let cancelled = false;
    void loadCharacterPortraitManifest().then((module) => {
      if (!cancelled) setManifest(module);
    });
    return () => {
      cancelled = true;
    };
  }, [manifest]);

  return useMemo(() => ({
    loaded: Boolean(manifest),
    getProfileView(character: Character | null | undefined, expression: CharacterExpression = "neutral"): CharacterProfileView | null {
      if (!character) return null;
      if (manifest) return manifest.characterProfileView(character, expression);
      return fallbackCharacterProfileView(character);
    },
    getPortraitAsset(character: Character | null | undefined, expression: CharacterExpression = "neutral") {
      if (!character || !manifest) return "";
      return manifest.characterPortraitAssetForCharacter(character, expression);
    },
  }), [manifest]);
}
