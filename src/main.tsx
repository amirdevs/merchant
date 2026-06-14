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
  items,
  visibleQuantity,
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

type GameView = "main-menu" | "market" | "customers" | "barter" | "inventory" | "travel" | "system";

const viewTabs: Array<{ view: GameView; label: string; helper: string }> = [
  { view: "market", label: "Market", helper: "town hub" },
  { view: "customers", label: "Customers", helper: "people" },
  { view: "barter", label: "Barter", helper: "trade" },
  { view: "inventory", label: "Inventory", helper: "goods" },
  { view: "travel", label: "Travel", helper: "routes" },
  { view: "system", label: "System", helper: "save" },
];

function App() {
  const [state, setState] = useState<GameState>(() => loadGame() || newGame());
  const [activeView, setActiveView] = useState<GameView>("market");
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

  function startNewGame() {
    playUiSound("menu_click");
    setState(newGame());
    setActiveView("market");
  }

  function selectCharacter(next: Character, openBarter = false) {
    playUiSound("menu_click");
    update((draft) => {
      draft.selectedCharacterIndex = next.index;
      draft.message = customerIntro(next);
    });
    if (openBarter) setActiveView("barter");
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
    setActiveView("market");
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
    setActiveView("market");
  }

  function renderActiveView() {
    if (activeView === "main-menu") {
      return (
        <MainMenuScreen
          state={state}
          market={market}
          soundOn={soundOn}
          onContinue={() => setActiveView("market")}
          onNewGame={startNewGame}
          onOpenTravel={() => setActiveView("travel")}
          onOpenBarter={() => setActiveView(character ? "barter" : "customers")}
          onOpenInventory={() => setActiveView("inventory")}
          onOpenSystem={() => setActiveView("system")}
        />
      );
    }

    if (activeView === "market") {
      return (
        <MarketHubScreen
          state={state}
          market={market}
          people={people}
          selectedIndex={state.selectedCharacterIndex}
          onSelect={(person) => selectCharacter(person, true)}
          onTravel={travel}
          onOpenTravel={() => setActiveView("travel")}
          onOpenInventory={() => setActiveView("inventory")}
        />
      );
    }

    if (activeView === "customers") {
      return (
        <section className="ui-screen customers-screen-layout">
          <CustomerList people={people} selectedIndex={state.selectedCharacterIndex} market={market} onSelect={(person) => selectCharacter(person, true)} />
          {character ? (
            <CharacterCard character={character} playerOffer={playerOffer} characterOffer={characterOffer} onTrade={trade} onNextCustomer={nextCustomer} />
          ) : (
            <Panel title="Choose a customer">
              <div className="game-panel-empty">Select a customer to inspect preferences, stock, and current trade mood.</div>
            </Panel>
          )}
        </section>
      );
    }

    if (activeView === "barter") {
      return (
        <BarterConversationScreen
          state={state}
          market={market}
          people={people}
          character={character}
          playerOffer={playerOffer}
          characterOffer={characterOffer}
          modStatus={modStatus}
          onMovePlayer={movePlayer}
          onMoveCharacter={moveCharacter}
          onTogglePlayerProtect={togglePlayerProtect}
          onSelectCustomer={(person) => selectCharacter(person)}
          onNextCustomer={nextCustomer}
          onTrade={trade}
        />
      );
    }

    if (activeView === "inventory") {
      return (
        <InventoryManagementScreen
          state={state}
          playerOffer={playerOffer}
          onMovePlayer={movePlayer}
          onTogglePlayerProtect={togglePlayerProtect}
        />
      );
    }

    if (activeView === "travel") {
      return (
        <section className="ui-screen travel-screen-layout">
          <TravelPanel market={market} onTravel={travel} />
          <QuestPanel market={market} />
        </section>
      );
    }

    return (
      <SystemMenuScreen
        state={state}
        modStatus={modStatus}
        soundOn={soundOn}
        onToggleSound={() => {
          const next = !soundOn;
          setSoundOn(next);
          setAudioEnabled(next);
          if (next) playUiSound("menu_click");
        }}
        onHelp={() => setHelpOpen(true)}
        onNewGame={startNewGame}
        onSave={() => {
          playUiSound("pack_closed");
          saveGame(state);
        }}
        onLoad={() => {
          playUiSound("pack_open");
          setState(loadGame() || state);
        }}
        onExport={exportSave}
        onImport={() => importInputRef.current?.click()}
      />
    );
  }

  return (
    <main className="game-root" style={{ backgroundImage: `url("${backdropAsset(market.backdropFile)}")` }}>
      <div className="game-viewport">
        <header className="game-topbar">
          <button className="game-brand" type="button" onClick={() => setActiveView("main-menu")}>
            <span className="game-brand-kicker">Merchant Ledger</span>
            <h1 className="game-title">{market.name}</h1>
            <Muted className="game-subtitle">Day {state.day} · stallage {money(market.stallage)} · {activeView.replace("-", " ")}</Muted>
          </button>
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
            <Button onClick={() => setActiveView("main-menu")}>Menu</Button>
            <Button onClick={() => setActiveView("system")}>System</Button>
          </div>
        </header>

        <ViewTabs activeView={activeView} onChange={setActiveView} />
        {renderActiveView()}
      </div>

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
      {helpOpen ? <HelpModal onClose={() => setHelpOpen(false)} /> : null}
    </main>
  );
}

function ViewTabs({ activeView, onChange }: { activeView: GameView; onChange: (view: GameView) => void }) {
  return (
    <nav className="view-tabs" aria-label="Game sections">
      {viewTabs.map((tab) => (
        <button key={tab.view} className={`view-tab ${activeView === tab.view ? "is-active" : ""}`} type="button" onClick={() => onChange(tab.view)}>
          <strong>{tab.label}</strong>
          <span>{tab.helper}</span>
        </button>
      ))}
    </nav>
  );
}

function MainMenuScreen({
  state,
  market,
  soundOn,
  onContinue,
  onNewGame,
  onOpenTravel,
  onOpenBarter,
  onOpenInventory,
  onOpenSystem,
}: {
  state: GameState;
  market: ReturnType<typeof currentMarket>;
  soundOn: boolean;
  onContinue: () => void;
  onNewGame: () => void;
  onOpenTravel: () => void;
  onOpenBarter: () => void;
  onOpenInventory: () => void;
  onOpenSystem: () => void;
}) {
  return (
    <section className="main-menu-screen">
      <div className="main-menu-art" style={{ backgroundImage: `url("${townAsset(market.townsquareFile)}")` }}>
        <div className="main-menu-card">
          <span className="game-brand-kicker">Merchant of the Six Kingdoms</span>
          <h2>Trade, travel, bargain.</h2>
          <p>Day {state.day} in {market.name}. Balance your ledger, read each customer, and move goods between cities before prices turn against you.</p>
          <div className="main-menu-actions">
            <Button onClick={onContinue}><BookOpen size={18} /> Continue</Button>
            <Button onClick={onNewGame}><RotateCcw size={18} /> New Merchant</Button>
            <Button onClick={onOpenBarter}><HandCoins size={18} /> Barter</Button>
            <Button onClick={onOpenInventory}><ScrollText size={18} /> Inventory</Button>
            <Button onClick={onOpenTravel}><Map size={18} /> Travel Map</Button>
            <Button onClick={onOpenSystem}>{soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />} System</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarketHubScreen({
  state,
  market,
  people,
  selectedIndex,
  onSelect,
  onTravel,
  onOpenTravel,
  onOpenInventory,
}: {
  state: GameState;
  market: ReturnType<typeof currentMarket>;
  people: Character[];
  selectedIndex: number | null;
  onSelect: (character: Character) => void;
  onTravel: (marketIndex: number) => void;
  onOpenTravel: () => void;
  onOpenInventory: () => void;
}) {
  return (
    <section className="ui-screen market-hub-layout">
      <Panel className="market-hero-panel" bodyClassName="p-0">
        <div className="market-hero-art" style={{ backgroundImage: `url("${townAsset(market.townsquareFile)}")` }}>
          <div className="market-hero-copy">
            <span className="game-brand-kicker">Current Market</span>
            <h2>{market.name}</h2>
            <p>Day {state.day}. Stallage {money(market.stallage)}. Find customers, inspect local demand, then prepare the next route.</p>
            <div className="market-hero-actions">
              <Button onClick={onOpenInventory}><ScrollText size={16} /> Open Inventory</Button>
              <Button onClick={onOpenTravel}><Map size={16} /> Routes</Button>
            </div>
          </div>
        </div>
      </Panel>
      <CustomerList people={people} selectedIndex={selectedIndex} market={market} onSelect={onSelect} />
      <QuestPanel market={market} />
      <Panel title={<span><Map size={18} /> Nearby Routes</span>}>
        <div className="travel-route-list compact">
          {routeLedger(market, marketplaces).slice(0, 5).map(({ connection, to, days, tolls }) => (
            <button key={`${market.index}-${connection.marketplaceIndex}-${connection.routeFile}`} className="travel-route" onClick={() => onTravel(connection.marketplaceIndex)}>
              <img src={routeAsset(connection.routeFile)} alt="" />
              <span className="min-w-0"><strong>{to.name}</strong><small>{days} days · {tolls} toll</small></span>
            </button>
          ))}
        </div>
      </Panel>
    </section>
  );
}

function SystemMenuScreen({
  state,
  modStatus,
  soundOn,
  onToggleSound,
  onHelp,
  onNewGame,
  onSave,
  onLoad,
  onExport,
  onImport,
}: {
  state: GameState;
  modStatus: string;
  soundOn: boolean;
  onToggleSound: () => void;
  onHelp: () => void;
  onNewGame: () => void;
  onSave: () => void;
  onLoad: () => void;
  onExport: () => void;
  onImport: () => void;
}) {
  return (
    <section className="ui-screen system-menu-layout">
      <Panel title="System Menu" bodyClassName="system-actions">
        <Button onClick={onNewGame}><RotateCcw size={16} /> New Game</Button>
        <Button onClick={onSave}><Save size={16} /> Save Local</Button>
        <Button onClick={onLoad}><BookOpen size={16} /> Load Local</Button>
        <Button onClick={onExport}><Download size={16} /> Export Save</Button>
        <Button onClick={onImport}><Upload size={16} /> Import Save</Button>
        <Button onClick={onToggleSound}>{soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />} {soundOn ? "Disable Audio" : "Enable Audio"}</Button>
        <Button onClick={onHelp}><CircleHelp size={16} /> Controls</Button>
      </Panel>
      <Panel title="Current Session">
        <div className="system-ledger">
          <p><strong>Day:</strong> {state.day}</p>
          <p><strong>Mods:</strong> {modStatus}</p>
          <p><strong>Audio:</strong> {soundOn ? "enabled" : "disabled"}</p>
        </div>
      </Panel>
    </section>
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



function InventoryManagementScreen({
  state,
  playerOffer,
  onMovePlayer,
  onTogglePlayerProtect,
}: {
  state: GameState;
  playerOffer: number;
  onMovePlayer: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  onTogglePlayerProtect: (entry: InventoryEntry) => void;
}) {
  const carriedEntries = state.playerInventory.filter((entry) => visibleQuantity(entry) > 0);
  const offeredEntries = state.playerInventory.filter((entry) => entry.offerQuantity > 0);
  const protectedEntries = state.playerInventory.filter((entry) => entry.protected && visibleQuantity(entry) > 0);
  const totalValue = carriedEntries.reduce((total, entry) => total + items[entry.itemIndex].loafValue * visibleQuantity(entry), 0);
  const totalWeight = carriedEntries.reduce((total, entry) => total + items[entry.itemIndex].weight * visibleQuantity(entry), 0);
  const rareCount = carriedEntries.filter((entry) => (items[entry.itemIndex].rarity || 1) > 1 || items[entry.itemIndex].unique).length;
  const topGoods = [...carriedEntries]
    .sort((left, right) => items[right.itemIndex].loafValue * visibleQuantity(right) - items[left.itemIndex].loafValue * visibleQuantity(left))
    .slice(0, 6);

  return (
    <section className="inventory-v4-screen ui-screen" aria-label="Inventory management">
      <Panel className="inventory-v4-overview" title="Merchant Pack" bodyClassName="inventory-v4-overview-body">
        <div className="inventory-v4-hero-copy">
          <span className="game-brand-kicker">Inventory Management</span>
          <h2>Your goods, offers, and protected cargo</h2>
          <p>{state.message}</p>
        </div>
        <div className="inventory-v4-stat-grid">
          <span><small>Total value</small><strong>{money(totalValue)}</strong></span>
          <span><small>Offer value</small><strong>{money(playerOffer)}</strong></span>
          <span><small>Weight</small><strong>{totalWeight}</strong></span>
          <span><small>Goods</small><strong>{carriedEntries.length}</strong></span>
          <span><small>Protected</small><strong>{protectedEntries.length}</strong></span>
          <span><small>Rare / unique</small><strong>{rareCount}</strong></span>
        </div>
      </Panel>

      <div className="inventory-v4-main">
        <InventoryPanel
          title="Inventory"
          subtitle="Search, filter, inspect, protect, and move goods into the current offer."
          inventory={state.playerInventory}
          variant="management"
          onMove={(entry, amount) => onMovePlayer(entry, amount)}
          onMoveAll={(entry) => onMovePlayer(entry, "all")}
          onToggleProtect={onTogglePlayerProtect}
          allowProtect
        />

        <aside className="inventory-v4-side">
          <InventoryPanel
            title="Current Offer"
            subtitle="Right click clears a stack from the offer."
            mode="offer"
            variant="compact"
            inventory={state.playerInventory}
            onMove={(entry, amount) => onMovePlayer(entry, amount, true)}
            onMoveAll={(entry) => onMovePlayer(entry, "none", true)}
          />

          <Panel title="Valuable Goods" bodyClassName="inventory-v4-valuables">
            {topGoods.map((entry) => {
              const item = items[entry.itemIndex];
              const quantity = visibleQuantity(entry);
              return (
                <div className="inventory-v4-valuable-row" key={entry.itemIndex}>
                  <strong>{item.name}</strong>
                  <span>{quantity} × {money(item.loafValue)}</span>
                </div>
              );
            })}
            {!topGoods.length ? <div className="game-panel-empty">No goods in pack.</div> : null}
          </Panel>

          <Panel title="Search & Filter Notes" bodyClassName="message-ledger inventory-v4-notes">
            <p>Use the search bar to find goods by name or tag. Use category chips to narrow the pack like the search/filter mockup.</p>
            <p className="mt-2 text-sm text-parchment-muted">Click the eye button on any item to open the reusable item detail modal.</p>
            {offeredEntries.length ? <p className="mt-2">Current offer contains {offeredEntries.length} goods.</p> : null}
          </Panel>
        </aside>
      </div>
    </section>
  );
}

function BarterConversationScreen({
  state,
  market,
  people,
  character,
  playerOffer,
  characterOffer,
  modStatus,
  onMovePlayer,
  onMoveCharacter,
  onTogglePlayerProtect,
  onSelectCustomer,
  onNextCustomer,
  onTrade,
}: {
  state: GameState;
  market: ReturnType<typeof currentMarket>;
  people: Character[];
  character: Character | null;
  playerOffer: number;
  characterOffer: number;
  modStatus: string;
  onMovePlayer: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  onMoveCharacter: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  onTogglePlayerProtect: (entry: InventoryEntry) => void;
  onSelectCustomer: (character: Character) => void;
  onNextCustomer: () => void;
  onTrade: () => void;
}) {
  if (!character) {
    return (
      <section className="barter-v3-empty ui-screen">
        <Panel title="Choose a customer">
          <div className="barter-empty-copy">
            <strong>No customer is seated at the table.</strong>
            <span>Select a customer from the board to open the full barter conversation layout.</span>
          </div>
        </Panel>
        <CustomerList people={people} selectedIndex={state.selectedCharacterIndex} market={market} onSelect={onSelectCustomer} />
      </section>
    );
  }

  const likes = character.bias?.filter((bias) => bias.percent > 0).slice(0, 4) || [];
  const dislikes = character.bias?.filter((bias) => bias.percent < 0).slice(0, 3) || [];
  const difference = Math.round(playerOffer - characterOffer);
  const totalReference = Math.max(1, Math.max(playerOffer, characterOffer));
  const balancePercent = Math.max(6, Math.min(94, 50 + (difference / totalReference) * 42));
  const offerStatus = difference >= 0 ? `Favorable by ${money(difference)}` : `Short by ${money(Math.abs(difference))}`;

  return (
    <section className="barter-v3-layout ui-screen" aria-label="Barter conversation">
      <aside className="barter-v3-side barter-v3-side-left">
        <div className="barter-v3-side-ribbon">
          <span>Customer Table</span>
          <strong>{character.name}</strong>
        </div>
        <InventoryPanel
          title={`${character.name}'s Offer`}
          mode="offer"
          inventory={character.inventory}
          onMove={(entry, amount) => onMoveCharacter(entry, amount, true)}
          onMoveAll={(entry) => onMoveCharacter(entry, "none", true)}
        />
        <InventoryPanel
          title={`${character.name}'s Stock`}
          inventory={character.inventory}
          onMove={(entry, amount) => onMoveCharacter(entry, amount)}
          onMoveAll={(entry) => onMoveCharacter(entry, "all")}
        />
      </aside>

      <section className="barter-v3-center">
        <Panel className="barter-v3-focus-panel" bodyClassName="barter-v3-focus-body">
          <div className="barter-v3-scene">
            <div className="barter-v3-portrait-stage">
              <img className="barter-v3-portrait" src={portraitAsset(character.portraitFile)} alt="" />
              {character.stallFile ? <img className="barter-v3-stall" src={stallAsset(character.stallFile)} alt="" /> : null}
              <div className="barter-v3-nameplate">
                <strong>{character.name}</strong>
                <span>{character.profession || "Customer"}</span>
              </div>
            </div>

            <div className="barter-v3-dialogue-card">
              <div className="barter-v3-dialogue-head">
                <span>Conversation</span>
                <strong>{customerPrompt(character)}</strong>
              </div>
              <TypewriterText className="barter-v3-dialogue-text" text={customerIntro(character)} />
              <p className="barter-v3-preference">{customerPreference(character)}</p>
              <div className="barter-v3-reply">{customerReply(character)}</div>
            </div>
          </div>

          <div className="barter-v3-value-board">
            <div className="barter-v3-value-card">
              <small>Your offer</small>
              <strong>{money(playerOffer)}</strong>
            </div>
            <div className="barter-v3-balance">
              <div className="barter-v3-balance-track">
                <span className="barter-v3-balance-fill" style={{ width: `${balancePercent}%` }} />
                <span className="barter-v3-balance-mid" />
              </div>
              <strong className={difference >= 0 ? "good" : "bad"}>{offerStatus}</strong>
            </div>
            <div className="barter-v3-value-card">
              <small>Their offer</small>
              <strong>{money(characterOffer)}</strong>
            </div>
          </div>

          <div className="barter-v3-bias-row">
            {[...likes, ...dislikes].map((bias) => (
              <span className={`bias-tag ${bias.percent > 0 ? "like" : "dislike"}`} key={`${bias.tag}-${bias.percent}`}>{bias.tag} {bias.percent > 0 ? "+" : ""}{bias.percent}%</span>
            ))}
          </div>

          <div className="barter-v3-choice-grid">
            <button type="button"><strong>Ask Price</strong><span>Read their value bias.</span></button>
            <button type="button"><strong>Sweeten Deal</strong><span>Add goods from inventory.</span></button>
            <button type="button"><strong>Remove Goods</strong><span>Pull back from your offer.</span></button>
            <button type="button"><strong>Watch Mood</strong><span>Compare likes and dislikes.</span></button>
          </div>

          <div className="barter-v3-action-row">
            <Button className="barter-v3-primary-action" onClick={onTrade}>
              <HandCoins size={18} /> Make Offer
            </Button>
            <Button onClick={onNextCustomer}>Next Customer</Button>
          </div>
        </Panel>

        <Panel className="barter-v3-ledger-panel" bodyClassName="message-ledger">
          <p>{state.message}</p>
          <p className="mt-2 text-sm text-parchment-muted">{modStatus}</p>
        </Panel>

        <CustomerList people={people.slice(0, 8)} selectedIndex={state.selectedCharacterIndex} market={market} onSelect={onSelectCustomer} />
      </section>

      <aside className="barter-v3-side barter-v3-side-right">
        <div className="barter-v3-side-ribbon player">
          <span>Your Ledger</span>
          <strong>Merchant Pack</strong>
        </div>
        <InventoryPanel title="Your Offer" mode="offer" inventory={state.playerInventory} onMove={(entry, amount) => onMovePlayer(entry, amount, true)} onMoveAll={(entry) => onMovePlayer(entry, "none", true)} />
        <InventoryPanel
          title="Your Inventory"
          inventory={state.playerInventory}
          onMove={(entry, amount) => onMovePlayer(entry, amount)}
          onMoveAll={(entry) => onMovePlayer(entry, "all")}
          onToggleProtect={onTogglePlayerProtect}
          allowProtect
        />
      </aside>
    </section>
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
