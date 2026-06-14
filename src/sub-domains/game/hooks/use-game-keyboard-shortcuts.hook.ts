import { useEffect, type RefObject } from "react";
import { playUiSound } from "@/lib/audio";
import { saveGame, type GameState } from "@/lib/game";
import type { Character } from "@/data/types";
import type { GameView } from "@/sub-domains/game/types/game-view.type";

export function useGameKeyboardShortcuts({
  activeView,
  character,
  importInputRef,
  setActiveView,
  setHelpOpen,
  state,
}: {
  activeView: GameView;
  character: Character | null;
  importInputRef: RefObject<HTMLInputElement | null>;
  setActiveView: (view: GameView) => void;
  setHelpOpen: (open: boolean) => void;
  state: GameState;
}) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName?.toLowerCase();
      const isTyping = tagName === "input" || tagName === "select" || tagName === "textarea" || target?.isContentEditable;
      if (isTyping) return;

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        playUiSound("pack_closed");
        saveGame(state);
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "o") {
        event.preventDefault();
        importInputRef.current?.click();
        return;
      }

      const key = event.key.toLowerCase();
      const numericViews: GameView[] = ["market", "customers", "barter", "inventory", "inventory-filter", "item-detail", "travel", "system", "ui-check"];
      const numericIndex = Number(key);
      if (Number.isInteger(numericIndex) && numericIndex >= 1 && numericIndex <= numericViews.length) {
        event.preventDefault();
        setActiveView(numericViews[numericIndex - 1]);
        return;
      }

      const shortcuts: Partial<Record<string, GameView>> = {
        m: "main-menu",
        h: "market",
        c: "customers",
        b: character ? "barter" : "customers",
        i: "inventory",
        t: "travel",
        f: "inventory-filter",
        d: "item-detail",
        y: "system",
        q: "ui-check",
      };

      if (key === "?") {
        event.preventDefault();
        setHelpOpen(true);
        return;
      }

      if (key === "escape") {
        event.preventDefault();
        setActiveView(activeView === "main-menu" ? "market" : "system");
        return;
      }

      const nextView = shortcuts[key];
      if (nextView) {
        event.preventDefault();
        setActiveView(nextView);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeView, character, importInputRef, setActiveView, setHelpOpen, state]);
}
