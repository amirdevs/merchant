import { describe, expect, it, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { BarterConversationView } from "./BarterConversationView";
import { charactersAtMarket, newGame, offerValue, selectedCharacter } from "@/lib/game";

describe("BarterConversationView", () => {
  it("renders selected customer trade controls without crashing", () => {
    const state = newGame();
    const character = charactersAtMarket(state)[0];
    state.selectedCharacterIndex = character.index;
    const selected = selectedCharacter(state);

    const html = renderToString(
      <BarterConversationView
        state={state}
        character={selected}
        playerOffer={offerValue(state.playerInventory, selected, "player", state)}
        characterOffer={selected ? offerValue(selected.inventory, selected, "character", state) : 0}
        message={state.message}
        onMovePlayer={vi.fn()}
        onMoveCharacter={vi.fn()}
        onSetPlayerOfferQuantity={vi.fn()}
        onSetCharacterOfferQuantity={vi.fn()}
        onTogglePlayerProtect={vi.fn()}
        onTrade={vi.fn()}
        onAskPrice={vi.fn()}
        onAskOffer={vi.fn()}
        onClearOffers={vi.fn()}
        onUndoOfferChange={vi.fn()}
        onGoodbye={vi.fn()}
        onHelp={vi.fn()}
        onSpeak={vi.fn()}
      />
    );

    expect(html).toContain("Barter / Conversation");
    expect(html).toContain("Ask Price");
    expect(html).toContain("Ask Offer");
    expect(html).toContain("Accept");
    expect(html).toContain("Deal Intelligence");
  });
});
