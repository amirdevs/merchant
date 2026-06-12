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
import type { MoveAmount } from "./lib/inventory";
import { InventoryPanel } from "./components/InventoryPanel";
import { HelpModal } from "./components/HelpModal";
import { Button, IconButton, Muted, Panel } from "./components/ui";
import { BookOpen, CircleHelp, HandCoins, Map, RotateCcw, Save, Users } from "lucide-react";

function App() {
  const [state, setState] = useState<GameState>(() => loadGame() || newGame());
  const [helpOpen, setHelpOpen] = useState(false);
  const market = currentMarket(state);
  const people = useMemo(() => charactersAtMarket(state).slice(0, 18), [state]);
  const character = selectedCharacter(state);
  const playerOffer = offerValue(state.playerInventory, character, "player", state);
  const characterOffer = character ? offerValue(character.inventory, character, "character", state) : 0;

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

  function movePlayer(entry: InventoryEntry, amount: MoveAmount, isOfferPanel = false) {
    update((draft) => {
      const actual = draft.playerInventory.find((item) => item.itemIndex === entry.itemIndex);
      if (actual) moveOffer(actual, amount, isOfferPanel);
    });
  }

  function moveCharacter(entry: InventoryEntry, amount: MoveAmount, isOfferPanel = false) {
    update((draft) => {
      const current = selectedCharacter(draft);
      const actual = current?.inventory.find((item) => item.itemIndex === entry.itemIndex);
      if (actual && current) moveOffer(actual, amount, isOfferPanel);
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
      className="relative min-h-screen bg-cover bg-center p-3 text-parchment before:pointer-events-none before:fixed before:inset-0 before:bg-ink/65 before:content-['']"
      style={{ backgroundImage: `url("${backdropAsset(market.backdropFile)}")` }}
    >
      <header className="relative z-10 flex items-center justify-between gap-3 border-2 border-brass-soft bg-panel/90 px-4 py-3 shadow-2xl max-[760px]:items-start">
        <div>
          <h1 className="font-display text-3xl leading-none">{market.name}</h1>
          <Muted className="text-sm">Day {state.day}</Muted>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <IconButton aria-label="Open controls" title="Controls" onClick={() => setHelpOpen(true)}>
            <CircleHelp size={18} />
          </IconButton>
          <Button onClick={() => setState(newGame())}>
            <RotateCcw size={16} /> New Game
          </Button>
          <Button onClick={() => saveGame(state)}>
            <Save size={16} /> Save
          </Button>
          <Button onClick={() => setState(loadGame() || state)}>
            <BookOpen size={16} /> Load
          </Button>
        </div>
      </header>

      <section className="relative z-10 mt-3 grid min-h-[720px] grid-cols-[30%_40%_30%] gap-3 max-[1180px]:grid-cols-1">
        <aside className="grid min-w-0 content-start gap-3">
          {character ? (
            <>
              <InventoryPanel title={`${character.name}'s Offer`} mode="offer" inventory={character.inventory} onMove={(entry, amount) => moveCharacter(entry, amount, true)} onMoveAll={(entry) => moveCharacter(entry, "none", true)} />
              <InventoryPanel title={`${character.name}'s Stock`} inventory={character.inventory} onMove={(entry, amount) => moveCharacter(entry, amount)} onMoveAll={(entry) => moveCharacter(entry, "all")} />
            </>
          ) : (
            <Panel className="min-h-[250px]" title="Customer Inventory">
              <p className="text-parchment-muted">Select a customer to inspect their stock and build their side of the trade.</p>
            </Panel>
          )}
        </aside>

        <section className="grid min-w-0 content-start gap-3">
          <CustomerList people={people} selectedIndex={state.selectedCharacterIndex} market={market} onSelect={selectCharacter} />

          {character ? (
            <CharacterCard character={character} playerOffer={playerOffer} characterOffer={characterOffer} onTrade={trade} />
          ) : (
            <Panel className="min-h-[300px]" title="Choose a customer">
              <p className="leading-relaxed text-parchment-muted">Select someone in the town square, compare their preferences, then build an offer from both inventories.</p>
            </Panel>
          )}

          <Panel className="max-h-40 min-h-20 overflow-auto leading-relaxed">{state.message}</Panel>
          <TravelPanel market={market} onTravel={travel} />
        </section>

        <aside className="grid min-w-0 content-start gap-3">
          <InventoryPanel title="Your Offer" mode="offer" inventory={state.playerInventory} onMove={(entry, amount) => movePlayer(entry, amount, true)} onMoveAll={(entry) => movePlayer(entry, "none", true)} />
          <InventoryPanel title="Your Inventory" inventory={state.playerInventory} onMove={(entry, amount) => movePlayer(entry, amount)} onMoveAll={(entry) => movePlayer(entry, "all")} allowProtect />
        </aside>
      </section>

      {helpOpen ? <HelpModal onClose={() => setHelpOpen(false)} /> : null}
    </main>
  );
}

function CustomerList({
  people,
  selectedIndex,
  market,
  onSelect,
}: {
  people: Character[];
  selectedIndex: number | null;
  market: ReturnType<typeof currentMarket>;
  onSelect: (character: Character) => void;
}) {
  return (
    <Panel className="bg-cover bg-center p-0" title={null}>
      <div className="border-b border-brass/45 bg-panel/90 p-3">
        <h2 className="flex items-center gap-2 font-display text-lg">
          <Users size={18} /> Customers
        </h2>
      </div>
      <div className="bg-cover bg-center" style={{ backgroundImage: `url("${townAsset(market.townsquareFile)}")` }}>
        <div className="grid max-h-[230px] grid-cols-3 content-start gap-2 overflow-auto bg-gradient-to-b from-black/10 to-black/65 p-2 max-[760px]:grid-cols-2">
          {people.map((person) => (
            <button
              key={person.index}
              className={`grid min-h-14 grid-cols-[42px_1fr] items-center gap-2 border text-left text-sm text-parchment ${
                selectedIndex === person.index ? "border-brass bg-ember/90" : "border-brass/50 bg-panel/85 hover:bg-ember/70"
              }`}
              onClick={() => onSelect(person)}
            >
              <img className="h-[42px] w-[42px] object-cover" src={portraitAsset(person.portraitFile)} alt="" />
              <span className="truncate">{person.name}</span>
            </button>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function TravelPanel({ market, onTravel }: { market: ReturnType<typeof currentMarket>; onTravel: (marketIndex: number) => void }) {
  return (
    <Panel title={<span className="flex items-center gap-2"><Map size={18} /> Travel</span>}>
      <div className="grid gap-2">
        {market.connections.map((connection) => (
          <button
            key={connection.marketplaceIndex}
            className="flex w-full justify-between gap-3 border border-brass bg-ember px-3 py-2 text-left text-parchment hover:brightness-110"
            onClick={() => onTravel(connection.marketplaceIndex)}
          >
            <span>{marketplaces[connection.marketplaceIndex].name}</span>
            <Muted>{connection.travelDays}d / {connection.tolls} toll</Muted>
          </button>
        ))}
      </div>
    </Panel>
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
    <div className="grid min-h-[360px] grid-cols-[35%_65%] border-2 border-brass-soft bg-panel/90 shadow-2xl max-[760px]:grid-cols-1">
      <div className="relative min-h-[260px] overflow-hidden bg-panel-soft">
        <img className="h-full w-full object-cover" src={portraitAsset(character.portraitFile)} alt="" />
        {character.stallFile ? <img className="absolute bottom-3 left-3 h-14 w-14 border border-brass bg-black/45 object-contain" src={stallAsset(character.stallFile)} alt="" /> : null}
      </div>
      <div className="p-4">
        <h2 className="font-display text-2xl">{character.name}</h2>
        <h3 className="mt-1 font-display text-sm text-brass">{character.profession || "Customer"}</h3>
        <p className="mt-4 max-h-28 overflow-auto leading-relaxed">{character.dialogue?.who || "Open to trade."}</p>
        <p className="mt-3 max-h-24 overflow-auto leading-relaxed text-parchment-muted">{character.dialogue?.preference || "No stated preference."}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {likes.map((bias) => <span className="border border-brass/60 bg-white/5 px-2 py-1 text-good" key={bias.tag}>{bias.tag} +{bias.percent}%</span>)}
          {dislikes.map((bias) => <span className="border border-brass/60 bg-white/5 px-2 py-1 text-bad" key={bias.tag}>{bias.tag} {bias.percent}%</span>)}
        </div>
        <div className="mt-4 flex justify-between gap-2 border border-brass/45 bg-black/30 p-3">
          <span>Your offer: {money(playerOffer)}</span>
          <span>Their offer: {money(characterOffer)}</span>
        </div>
        <Button className="mt-3 w-full font-bold" onClick={onTrade}>
          <HandCoins size={18} /> Make Offer
        </Button>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
