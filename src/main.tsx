import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import {
  charactersAtMarket,
  completeTrade,
  currentMarket,
  loadGame,
  loadMods,
  marketplaces,
  moveOffer,
  newGame,
  nextCustomerIndex,
  offerValue,
  saveGame,
  selectedCharacter,
  serializeGame,
  importGame,
  type GameState,
} from "./lib/game";
import { backdropAsset, mapAsset, portraitAsset, routeAsset, stallAsset, townAsset } from "./lib/assets";
import { money } from "./lib/format";
import { compactBiasText, routeLedger } from "./lib/travel";
import { customerIntro, customerPreference, customerPrompt, customerReply } from "./lib/dialogue";
import type { Character, InventoryEntry } from "./data/types";
import type { MoveAmount } from "./lib/inventory";
import { InventoryPanel } from "./components/InventoryPanel";
import { HelpModal } from "./components/HelpModal";
import { TypewriterText } from "./components/TypewriterText";
import { Button, IconButton, Muted, Panel } from "./components/ui";
import { audioEnabled, playAmbient, playItemSound, playUiSound, setAudioEnabled } from "./lib/audio";
import { BookOpen, CircleHelp, Download, HandCoins, Map, RotateCcw, Save, ScrollText, Upload, Users, Volume2, VolumeX } from "lucide-react";

function App() {
  const [state, setState] = useState<GameState>(() => loadGame() || newGame());
  const [helpOpen, setHelpOpen] = useState(false);
  const [modStatus, setModStatus] = useState("Loading mods...");
  const [soundOn, setSoundOn] = useState(() => audioEnabled());
  const importInputRef = useRef<HTMLInputElement | null>(null);
  const market = currentMarket(state);
  const people = useMemo(() => charactersAtMarket(state).slice(0, 18), [state]);
  const character = selectedCharacter(state);
  const playerOffer = offerValue(state.playerInventory, character, "player", state);
  const characterOffer = character ? offerValue(character.inventory, character, "character", state) : 0;

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
  }, []);

  useEffect(() => {
    playAmbient(market.ambiancePrimaryFile);
  }, [market.ambiancePrimaryFile]);

  function update(mutator: (draft: GameState) => void) {
    setState((current) => {
      const draft = structuredClone(current);
      mutator(draft);
      return draft;
    });
  }

  function selectCharacter(next: Character) {
    playUiSound("menu_click");
    update((draft) => {
      draft.selectedCharacterIndex = next.index;
      draft.message = customerIntro(next);
    });
  }

  function nextCustomer() {
    playUiSound("menu_click");
    update((draft) => {
      const nextIndex = nextCustomerIndex(draft);
      if (nextIndex === null) return;
      const next = draft.characters[nextIndex];
      draft.selectedCharacterIndex = next.index;
      draft.message = customerIntro(next);
    });
  }

  function movePlayer(entry: InventoryEntry, amount: MoveAmount, isOfferPanel = false) {
    playItemSound("page");
    update((draft) => {
      const actual = draft.playerInventory.find((item) => item.itemIndex === entry.itemIndex);
      if (actual) moveOffer(actual, amount, isOfferPanel);
    });
  }

  function moveCharacter(entry: InventoryEntry, amount: MoveAmount, isOfferPanel = false) {
    playItemSound("page");
    update((draft) => {
      const current = selectedCharacter(draft);
      const actual = current?.inventory.find((item) => item.itemIndex === entry.itemIndex);
      if (actual && current) moveOffer(actual, amount, isOfferPanel);
    });
  }

  function togglePlayerProtect(entry: InventoryEntry) {
    playUiSound("pack_closed");
    update((draft) => {
      const actual = draft.playerInventory.find((item) => item.itemIndex === entry.itemIndex);
      if (!actual) return;
      actual.protected = !actual.protected;
      if (actual.protected) actual.offerQuantity = 0;
    });
  }

  function trade() {
    playUiSound("trade");
    setState((current) => completeTrade(current));
  }

  function travel(toMarketIndex: number) {
    playUiSound("map");
    update((draft) => {
      const route = currentMarket(draft).connections.find((connection) => connection.marketplaceIndex === toMarketIndex);
      draft.marketIndex = toMarketIndex;
      draft.day += route?.travelDays || 1;
      draft.selectedCharacterIndex = null;
      draft.message = `Arrived in ${marketplaces[toMarketIndex].name}.`;
    });
  }

  function exportSave() {
    playUiSound("pack_open");
    const blob = new Blob([serializeGame(state)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `merchant-save-day-${state.day}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function importSave(file: File | undefined) {
    if (!file) return;
    playUiSound("pack_open");
    const imported = importGame(await file.text());
    if (!imported) {
      update((draft) => {
        draft.message = "Save import failed. The file was not a valid merchant save.";
      });
      return;
    }
    setState({ ...imported, message: "Imported save file." });
  }

  return (
    <main className="game-root" style={{ backgroundImage: `url("${backdropAsset(market.backdropFile)}")` }}>
      <div className="game-viewport">
        <header className="game-topbar">
          <div className="game-brand">
            <span className="game-brand-kicker">Merchant Ledger</span>
            <h1 className="game-title">{market.name}</h1>
            <Muted className="game-subtitle">Day {state.day} · stallage {money(market.stallage)} · offline trading prototype</Muted>
          </div>
          <div className="game-toolbar">
            <IconButton aria-label="Open controls" title="Controls" onClick={() => setHelpOpen(true)}>
              <CircleHelp size={18} />
            </IconButton>
            <IconButton
              aria-label={soundOn ? "Disable audio" : "Enable audio"}
              title={soundOn ? "Disable audio" : "Enable audio"}
              onClick={() => {
                const next = !soundOn;
                setSoundOn(next);
                setAudioEnabled(next);
                if (next) playUiSound("menu_click");
              }}
            >
              {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </IconButton>
            <Button onClick={() => setState(newGame())}>
              <RotateCcw size={16} /> New Game
            </Button>
            <Button
              onClick={() => {
                playUiSound("pack_closed");
                saveGame(state);
              }}
            >
              <Save size={16} /> Save
            </Button>
            <Button
              onClick={() => {
                playUiSound("pack_open");
                setState(loadGame() || state);
              }}
            >
              <BookOpen size={16} /> Load
            </Button>
            <Button onClick={exportSave}>
              <Download size={16} /> Export
            </Button>
            <Button onClick={() => importInputRef.current?.click()}>
              <Upload size={16} /> Import
            </Button>
            <input
              ref={importInputRef}
              className="hidden"
              type="file"
              accept="application/json,.json"
              onChange={(event) => {
                void importSave(event.target.files?.[0]);
                event.target.value = "";
              }}
            />
          </div>
        </header>

        <section className="game-layout">
          <aside className="game-column game-column-left">
            {character ? (
              <>
                <InventoryPanel
                  title={`${character.name}'s Offer`}
                  mode="offer"
                  inventory={character.inventory}
                  onMove={(entry, amount) => moveCharacter(entry, amount, true)}
                  onMoveAll={(entry) => moveCharacter(entry, "none", true)}
                />
                <InventoryPanel
                  title={`${character.name}'s Stock`}
                  inventory={character.inventory}
                  onMove={(entry, amount) => moveCharacter(entry, amount)}
                  onMoveAll={(entry) => moveCharacter(entry, "all")}
                />
              </>
            ) : (
              <Panel title="Customer Inventory">
                <div className="game-panel-empty">Select a customer to inspect their stock and build their side of the trade.</div>
              </Panel>
            )}
          </aside>

          <section className="game-column game-center">
            <CustomerList people={people} selectedIndex={state.selectedCharacterIndex} market={market} onSelect={selectCharacter} />

            {character ? (
              <CharacterCard character={character} playerOffer={playerOffer} characterOffer={characterOffer} onTrade={trade} onNextCustomer={nextCustomer} />
            ) : (
              <Panel title="Choose a customer">
                <div className="game-panel-empty">Select someone in the town square, compare their preferences, then build an offer from both inventories.</div>
              </Panel>
            )}

            <Panel bodyClassName="message-ledger">
              <p>{state.message}</p>
              <p className="mt-2 text-sm text-parchment-muted">{modStatus}</p>
            </Panel>
            <QuestPanel market={market} />
            <TravelPanel market={market} onTravel={travel} />
          </section>

          <aside className="game-column game-column-right">
            <InventoryPanel title="Your Offer" mode="offer" inventory={state.playerInventory} onMove={(entry, amount) => movePlayer(entry, amount, true)} onMoveAll={(entry) => movePlayer(entry, "none", true)} />
            <InventoryPanel
              title="Your Inventory"
              inventory={state.playerInventory}
              onMove={(entry, amount) => movePlayer(entry, amount)}
              onMoveAll={(entry) => movePlayer(entry, "all")}
              onToggleProtect={togglePlayerProtect}
              allowProtect
            />
          </aside>
        </section>
      </div>

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
    <Panel className="customer-board" bodyClassName="p-0" title={<span><Users size={18} /> Customers</span>}>
      <div className="customer-grid-backdrop" style={{ backgroundImage: `url("${townAsset(market.townsquareFile)}")` }}>
        <div className="customer-grid">
          {people.map((person) => (
            <button key={person.index} className={`customer-token ${selectedIndex === person.index ? "is-active" : ""}`} onClick={() => onSelect(person)}>
              <img src={portraitAsset(person.portraitFile)} alt="" />
              <span className="customer-token-name">{person.name}</span>
            </button>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function QuestPanel({ market }: { market: ReturnType<typeof currentMarket> }) {
  const quest = market.quest;
  const event = market.event;
  const hasQuest = Boolean(quest?.name);
  const hasEvent = Boolean(event?.name);

  return (
    <Panel title={<span><ScrollText size={18} /> Market Notes</span>}>
      <div className="market-notes-grid">
        <div className="note-card">
          <strong>{hasQuest ? quest?.name : "No local quest"}</strong>
          <p>{quest?.todo || "No active task is listed for this market."}</p>
          {quest?.questItems?.length ? <p>Items: {quest.questItems.join(", ")}</p> : null}
        </div>
        <div className="note-card">
          <strong>{hasEvent ? event?.name : "No scheduled event"}</strong>
          <p>{event?.frequency || "No event timing is listed."}</p>
          {event?.characterName ? <p>Contact: {event.characterName}</p> : null}
        </div>
      </div>
    </Panel>
  );
}

function TravelPanel({ market, onTravel }: { market: ReturnType<typeof currentMarket>; onTravel: (marketIndex: number) => void }) {
  const routes = routeLedger(market, marketplaces);

  return (
    <Panel title={<span><Map size={18} /> Travel</span>}>
      <div className="travel-layout">
        <MarketMap market={market} onTravel={onTravel} />

        <div className="market-notes-grid">
          <div className="note-card">
            <strong>Current demand</strong>
            <p>{compactBiasText(market, "demand")}</p>
          </div>
          <div className="note-card">
            <strong>Current discounts</strong>
            <p>{compactBiasText(market, "discount")}</p>
          </div>
        </div>

        <div className="travel-route-list">
          {routes.map(({ connection, to, days, tolls, demand, discounts }) => (
            <button key={`${market.index}-${connection.marketplaceIndex}-${connection.routeFile}`} className="travel-route" onClick={() => onTravel(connection.marketplaceIndex)}>
              <img src={routeAsset(connection.routeFile)} alt="" />
              <span className="min-w-0">
                <strong>{to.name}</strong>
                <small>Demand: {demand}</small>
                <small>Discounts: {discounts}</small>
              </span>
              <span className="travel-route-cost">{days}d / {tolls} toll</span>
            </button>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function MarketMap({ market, onTravel }: { market: ReturnType<typeof currentMarket>; onTravel: (marketIndex: number) => void }) {
  const connected = new Set(market.connections.map((connection) => connection.marketplaceIndex));

  return (
    <div className="market-map">
      <img src={mapAsset()} alt="" />
      {marketplaces.map((place) => {
        if (!place.location) return null;
        const isCurrent = place.index === market.index;
        const isConnected = connected.has(place.index);
        return (
          <button
            key={place.index}
            className={`map-node ${isCurrent ? "current" : isConnected ? "connected" : "locked"}`}
            style={{ top: `${place.location.top}%`, left: `${place.location.left}%` }}
            disabled={!isConnected}
            title={place.name}
            onClick={() => onTravel(place.index)}
          >
            {place.name}
          </button>
        );
      })}
    </div>
  );
}

function CharacterCard({
  character,
  playerOffer,
  characterOffer,
  onTrade,
  onNextCustomer,
}: {
  character: Character;
  playerOffer: number;
  characterOffer: number;
  onTrade: () => void;
  onNextCustomer: () => void;
}) {
  const likes = character.bias?.filter((bias) => bias.percent > 0).slice(0, 5) || [];
  const dislikes = character.bias?.filter((bias) => bias.percent < 0).slice(0, 4) || [];
  const difference = Math.round(playerOffer - characterOffer);
  const offerStatus = difference >= 0 ? `Ahead by ${money(difference)}` : `Missing ${money(Math.abs(difference))}`;

  return (
    <div className="character-card">
      <div className="character-portrait-wrap">
        <img className="character-portrait" src={portraitAsset(character.portraitFile)} alt="" />
        {character.stallFile ? <img className="character-stall" src={stallAsset(character.stallFile)} alt="" /> : null}
      </div>
      <div className="character-body">
        <div>
          <h2 className="character-name">{character.name}</h2>
          <h3 className="character-role">{character.profession || "Customer"}</h3>
        </div>
        <TypewriterText className="dialogue-scroll" text={customerIntro(character)} />
        <p className="preference-text">{customerPreference(character)}</p>
        <div className="dialogue-choice">
          <strong>{customerPrompt(character)}</strong>
          <span>{customerReply(character)}</span>
        </div>
        <div className="bias-tags">
          {likes.map((bias) => (
            <span className="bias-tag like" key={bias.tag}>{bias.tag} +{bias.percent}%</span>
          ))}
          {dislikes.map((bias) => (
            <span className="bias-tag dislike" key={bias.tag}>{bias.tag} {bias.percent}%</span>
          ))}
        </div>
        <div className="offer-meter">
          <span><small>Your offer</small><strong>{money(playerOffer)}</strong></span>
          <span><small>Their offer</small><strong>{money(characterOffer)}</strong></span>
        </div>
        <div className={`offer-status ${difference >= 0 ? "good" : "bad"}`}>{offerStatus}</div>
        <div className="character-actions">
          <Button className="font-bold" onClick={onTrade}>
            <HandCoins size={18} /> Make Offer
          </Button>
          <Button onClick={onNextCustomer}>Next Customer</Button>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
