import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import {
  charactersAtMarket,
  completeTrade,
  currentMarket,
  loadGame,
  marketplaces,
  moveOffer,
  newGame,
  offerValue,
  saveGame,
  selectedCharacter,
  type GameState,
} from "./lib/game";
import { backdropAsset, portraitAsset, stallAsset, townAsset } from "./lib/assets";
import { money } from "./lib/format";
import type { Character, InventoryEntry } from "./data/types";
import { InventoryPanel } from "./components/InventoryPanel";
import { BookOpen, HandCoins, Map, RotateCcw, Save } from "lucide-react";

function App() {
  const [state, setState] = useState<GameState>(() => loadGame() || newGame());
  const market = currentMarket(state);
  const people = useMemo(() => charactersAtMarket(state).slice(0, 18), [state]);
  const character = selectedCharacter(state);
  const playerOffer = offerValue(state.playerInventory, character, "player");
  const characterOffer = character ? offerValue(character.inventory, character, "character") : 0;

  function update(mutator: (draft: GameState) => void) {
    setState((current) => {
      const draft = structuredClone(current);
      mutator(draft);
      return draft;
    });
  }

  function selectCharacter(next: Character) {
    update((draft) => {
      draft.selectedCharacterIndex = next.index;
      draft.message = next.dialogue?.who || `${next.name} is ready to trade.`;
    });
  }

  function movePlayer(entry: InventoryEntry, delta: number | "all" | "none") {
    update((draft) => {
      const actual = draft.playerInventory.find((item) => item.itemIndex === entry.itemIndex);
      if (actual) moveOffer(draft.playerInventory, actual, delta);
    });
  }

  function moveCharacter(entry: InventoryEntry, delta: number | "all" | "none") {
    update((draft) => {
      const current = selectedCharacter(draft);
      const actual = current?.inventory.find((item) => item.itemIndex === entry.itemIndex);
      if (actual && current) moveOffer(current.inventory, actual, delta);
    });
  }

  function trade() {
    setState((current) => completeTrade(current));
  }

  function travel(toMarketIndex: number) {
    update((draft) => {
      const route = currentMarket(draft).connections.find((connection) => connection.marketplaceIndex === toMarketIndex);
      draft.marketIndex = toMarketIndex;
      draft.day += route?.travelDays || 1;
      draft.selectedCharacterIndex = null;
      draft.message = `Arrived in ${marketplaces[toMarketIndex].name}.`;
    });
  }

  return (
    <main
      className="relative min-h-screen bg-cover bg-center p-3 text-parchment before:fixed before:inset-0 before:bg-ink/65 before:content-['']"
      style={{ backgroundImage: `url("${backdropAsset(market.backdropFile)}")` }}
    >
      <header className="relative z-10 flex items-center justify-between border-2 border-brass-soft bg-panel/90 px-4 py-3 shadow-2xl">
        <div>
          <h1 className="font-display text-3xl leading-none">{market.name}</h1>
          <span className="text-sm text-parchment-muted">Day {state.day}</span>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 border border-brass bg-ember px-3 py-2 text-sm font-semibold text-parchment hover:brightness-110" onClick={() => setState(newGame())}>
            <RotateCcw size={16} /> New Game
          </button>
          <button className="inline-flex items-center gap-2 border border-brass bg-ember px-3 py-2 text-sm font-semibold text-parchment hover:brightness-110" onClick={() => saveGame(state)}>
            <Save size={16} /> Save
          </button>
          <button className="inline-flex items-center gap-2 border border-brass bg-ember px-3 py-2 text-sm font-semibold text-parchment hover:brightness-110" onClick={() => setState(loadGame() || state)}>
            <BookOpen size={16} /> Load
          </button>
        </div>
      </header>

      <section className="relative z-10 mt-3 grid min-h-[620px] grid-cols-[34%_32%_34%] gap-3 max-[1100px]:grid-cols-1">
        <aside className="min-w-0">
          <div className="min-h-[420px] border-2 border-brass-soft bg-cover bg-center" style={{ backgroundImage: `url("${townAsset(market.townsquareFile)}")` }}>
            <div className="grid min-h-[420px] grid-cols-3 content-start gap-2 bg-gradient-to-b from-black/15 to-black/60 p-2">
              {people.map((person) => (
                <button
                  key={person.index}
                  className={`grid min-h-14 grid-cols-[42px_1fr] items-center gap-2 border text-left text-sm text-parchment ${
                    state.selectedCharacterIndex === person.index
                      ? "border-brass bg-ember/90"
                      : "border-brass/50 bg-panel/85 hover:bg-ember/70"
                  }`}
                  onClick={() => selectCharacter(person)}
                >
                  <img className="h-[42px] w-[42px] object-cover" src={portraitAsset(person.portraitFile)} alt="" />
                  <span className="truncate">{person.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 border-2 border-brass-soft bg-panel/90 p-3">
            <h2 className="mb-2 flex items-center gap-2 font-display text-xl"><Map size={18} /> Travel</h2>
            {market.connections.map((connection) => (
              <button
                key={connection.marketplaceIndex}
                className="mt-2 flex w-full justify-between border border-brass bg-ember px-3 py-2 text-left text-parchment hover:brightness-110"
                onClick={() => travel(connection.marketplaceIndex)}
              >
                {marketplaces[connection.marketplaceIndex].name}
                <span className="text-parchment-muted">{connection.travelDays}d / {connection.tolls} toll</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="flex min-w-0 flex-col gap-3">
          {character ? (
            <CharacterCard character={character} playerOffer={playerOffer} characterOffer={characterOffer} onTrade={trade} />
          ) : (
            <div className="min-h-[420px] border-2 border-brass-soft bg-panel/90 p-5 shadow-2xl">
              <h2 className="font-display text-2xl">Choose a customer</h2>
              <p className="mt-3 leading-relaxed text-parchment-muted">Select someone in the town square, compare their preferences, then build an offer from both inventories.</p>
            </div>
          )}
          <div className="min-h-16 border-2 border-brass-soft bg-panel/90 p-4 shadow-2xl">{state.message}</div>
        </section>

        <aside className="grid min-w-0 grid-rows-2 gap-3 max-[1100px]:grid-rows-none">
          <InventoryPanel title="Your Offer" mode="offer" inventory={state.playerInventory} onMove={(entry) => movePlayer(entry, -1)} onMoveAll={(entry) => movePlayer(entry, "none")} />
          <InventoryPanel title="Your Inventory" inventory={state.playerInventory} onMove={(entry) => movePlayer(entry, 1)} onMoveAll={(entry) => movePlayer(entry, "all")} allowProtect />
        </aside>
      </section>

      {character ? (
        <section className="relative z-10 mt-3 grid grid-cols-2 gap-3 max-[1100px]:grid-cols-1">
          <InventoryPanel title={`${character.name}'s Offer`} mode="offer" inventory={character.inventory} onMove={(entry) => moveCharacter(entry, -1)} onMoveAll={(entry) => moveCharacter(entry, "none")} />
          <InventoryPanel title={`${character.name}'s Stock`} inventory={character.inventory} onMove={(entry) => moveCharacter(entry, 1)} onMoveAll={(entry) => moveCharacter(entry, "all")} />
        </section>
      ) : null}
    </main>
  );
}

function CharacterCard({
  character,
  playerOffer,
  characterOffer,
  onTrade,
}: {
  character: Character;
  playerOffer: number;
  characterOffer: number;
  onTrade: () => void;
}) {
  const likes = character.bias?.filter((bias) => bias.percent > 0).slice(0, 5) || [];
  const dislikes = character.bias?.filter((bias) => bias.percent < 0).slice(0, 4) || [];
  return (
    <div className="grid min-h-[420px] grid-cols-[35%_65%] border-2 border-brass-soft bg-panel/90 shadow-2xl">
      <div className="relative overflow-hidden bg-panel-soft">
        <img className="h-full w-full object-cover" src={portraitAsset(character.portraitFile)} alt="" />
        {character.stallFile ? <img className="absolute bottom-3 left-3 h-14 w-14 border border-brass bg-black/45 object-contain" src={stallAsset(character.stallFile)} alt="" /> : null}
      </div>
      <div className="p-4">
        <h2 className="font-display text-2xl">{character.name}</h2>
        <h3 className="mt-1 font-display text-sm text-brass">{character.profession || "Customer"}</h3>
        <p className="mt-4 leading-relaxed">{character.dialogue?.who || "Open to trade."}</p>
        <p className="mt-3 leading-relaxed text-parchment-muted">{character.dialogue?.preference || "No stated preference."}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {likes.map((bias) => <span className="border border-brass/60 bg-white/5 px-2 py-1 text-good" key={bias.tag}>{bias.tag} +{bias.percent}%</span>)}
          {dislikes.map((bias) => <span className="border border-brass/60 bg-white/5 px-2 py-1 text-bad" key={bias.tag}>{bias.tag} {bias.percent}%</span>)}
        </div>
        <div className="mt-4 flex justify-between gap-2 border border-brass/45 bg-black/30 p-3">
          <span>Your offer: {money(playerOffer)}</span>
          <span>Their offer: {money(characterOffer)}</span>
        </div>
        <button className="mt-3 inline-flex w-full items-center justify-center gap-2 border border-brass bg-ember px-3 py-2 font-bold text-parchment hover:brightness-110" onClick={onTrade}>
          <HandCoins size={18} /> Make Offer
        </button>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
