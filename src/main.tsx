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
import { BookOpen, CircleHelp, Compass, Download, HandCoins, Map, PackageSearch, RotateCcw, Route, Save, ScrollText, Star, Store, Upload, Users, Volume2, VolumeX } from "lucide-react";

type GameView = "main-menu" | "new-profile" | "load-game" | "settings" | "market" | "customers" | "barter" | "inventory" | "travel" | "system" | "ui-check";

type MerchantProfile = {
  name: string;
  background: string;
  difficulty: string;
  starter: string;
};

type UiPreferences = {
  uiScale: number;
  textSpeed: number;
  decorativeMotion: boolean;
  compactMode: boolean;
};

const defaultMerchantProfile: MerchantProfile = {
  name: "Aster Vale",
  background: "Ledger Apprentice",
  difficulty: "Standard Market",
  starter: "Careful Appraiser",
};

const defaultUiPreferences: UiPreferences = {
  uiScale: 100,
  textSpeed: 70,
  decorativeMotion: true,
  compactMode: false,
};

function readJsonSetting<T extends object>(key: string, fallback: T): T {
  try {
    if (typeof localStorage === "undefined") return fallback;
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

function writeJsonSetting<T>(key: string, value: T) {
  try {
    if (typeof localStorage !== "undefined") localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage failures in restricted runtimes.
  }
}

const viewTabs: Array<{ view: GameView; label: string; helper: string }> = [
  { view: "market", label: "Market", helper: "town hub" },
  { view: "customers", label: "Customers", helper: "people" },
  { view: "barter", label: "Barter", helper: "trade" },
  { view: "inventory", label: "Inventory", helper: "goods" },
  { view: "travel", label: "Travel", helper: "routes" },
  { view: "system", label: "System", helper: "save" },
  { view: "ui-check", label: "QA", helper: "layout" },
];

function App() {
  const [state, setState] = useState<GameState>(() => loadGame() || newGame());
  const [activeView, setActiveView] = useState<GameView>("market");
  const [merchantProfile, setMerchantProfile] = useState<MerchantProfile>(() => readJsonSetting("merchant-profile-v1", defaultMerchantProfile));
  const [uiPreferences, setUiPreferences] = useState<UiPreferences>(() => readJsonSetting("merchant-ui-preferences-v1", defaultUiPreferences));
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
    writeJsonSetting("merchant-profile-v1", merchantProfile);
  }, [merchantProfile]);

  useEffect(() => {
    writeJsonSetting("merchant-ui-preferences-v1", uiPreferences);
  }, [uiPreferences]);

  useEffect(() => {
    playAmbient(market.ambiancePrimaryFile);
  }, [market.ambiancePrimaryFile]);

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
      const numericViews: GameView[] = ["market", "customers", "barter", "inventory", "travel", "system", "ui-check"];
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
  }, [activeView, character, state]);

  function update(mutator: (draft: GameState) => void) {
    setState((current) => {
      const draft = structuredClone(current);
      mutator(draft);
      return draft;
    });
  }

  function updateUiPreferences(patch: Partial<UiPreferences>) {
    setUiPreferences((current) => ({ ...current, ...patch }));
  }

  function startNewGame(profile: MerchantProfile = merchantProfile) {
    playUiSound("menu_click");
    setMerchantProfile(profile);
    const fresh = newGame();
    fresh.message = `${profile.name} opens a new ledger as ${profile.background}. Starter plan: ${profile.starter}. Terms: ${profile.difficulty}.`;
    setState(fresh);
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
          merchantProfile={merchantProfile}
          soundOn={soundOn}
          onContinue={() => setActiveView("market")}
          onNewMerchant={() => setActiveView("new-profile")}
          onLoadGame={() => setActiveView("load-game")}
          onOpenTravel={() => setActiveView("travel")}
          onOpenBarter={() => setActiveView(character ? "barter" : "customers")}
          onOpenInventory={() => setActiveView("inventory")}
          onOpenSettings={() => setActiveView("settings")}
          onOpenSystem={() => setActiveView("system")}
        />
      );
    }

    if (activeView === "new-profile") {
      return (
        <NewMerchantProfileScreen
          market={market}
          merchantProfile={merchantProfile}
          onCreate={startNewGame}
          onBack={() => setActiveView("main-menu")}
        />
      );
    }

    if (activeView === "load-game") {
      return (
        <LoadGameScreen
          state={state}
          modStatus={modStatus}
          onLoadLocal={() => {
            playUiSound("pack_open");
            setState(loadGame() || state);
            setActiveView("market");
          }}
          onExport={exportSave}
          onImport={() => importInputRef.current?.click()}
          onBack={() => setActiveView("main-menu")}
          onOpenSettings={() => setActiveView("settings")}
        />
      );
    }

    if (activeView === "settings") {
      return (
        <SettingsScreen
          soundOn={soundOn}
          modStatus={modStatus}
          uiPreferences={uiPreferences}
          onUpdatePreferences={updateUiPreferences}
          onToggleSound={() => {
            const next = !soundOn;
            setSoundOn(next);
            setAudioEnabled(next);
            if (next) playUiSound("menu_click");
          }}
          onBack={() => setActiveView("main-menu")}
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
        <CustomersScreen
          state={state}
          market={market}
          people={people}
          character={character}
          playerOffer={playerOffer}
          characterOffer={characterOffer}
          onSelect={(person) => selectCharacter(person, true)}
          onTrade={trade}
          onNextCustomer={nextCustomer}
        />
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
      return <TravelMapScreen state={state} market={market} onTravel={travel} />;
    }

    if (activeView === "ui-check") {
      return (
        <UiAuditScreen
          state={state}
          market={market}
          merchantProfile={merchantProfile}
          uiPreferences={uiPreferences}
          onJump={setActiveView}
        />
      );
    }

    return (
      <SystemMenuScreen
        state={state}
        merchantProfile={merchantProfile}
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
        onOpenSettings={() => setActiveView("settings")}
        onOpenUiAudit={() => setActiveView("ui-check")}
      />
    );
  }

  return (
    <main
      className={`game-root ${uiPreferences.decorativeMotion ? "" : "reduce-motion"} ${uiPreferences.compactMode ? "is-compact-ui" : ""}`}
      style={{
        backgroundImage: `url("${backdropAsset(market.backdropFile)}")`,
        "--ui-scale-multiplier": uiPreferences.uiScale / 100,
        "--typewriter-speed": uiPreferences.textSpeed,
      } as React.CSSProperties}
    >
      <div className="game-viewport">
        <header className="game-topbar">
          <button className="game-brand" type="button" onClick={() => setActiveView("main-menu")}>
            <span className="game-brand-kicker">{merchantProfile.name} · Merchant Ledger</span>
            <h1 className="game-title">{market.name}</h1>
            <Muted className="game-subtitle">Day {state.day} · {merchantProfile.background} · stallage {money(market.stallage)} · {activeView.replace("-", " ")}</Muted>
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
  merchantProfile,
  soundOn,
  onContinue,
  onNewMerchant,
  onLoadGame,
  onOpenTravel,
  onOpenBarter,
  onOpenInventory,
  onOpenSettings,
  onOpenSystem,
}: {
  state: GameState;
  market: ReturnType<typeof currentMarket>;
  merchantProfile: MerchantProfile;
  soundOn: boolean;
  onContinue: () => void;
  onNewMerchant: () => void;
  onLoadGame: () => void;
  onOpenTravel: () => void;
  onOpenBarter: () => void;
  onOpenInventory: () => void;
  onOpenSettings: () => void;
  onOpenSystem: () => void;
}) {
  return (
    <section className="main-menu-v6-screen">
      <div className="main-menu-v6-art" style={{ backgroundImage: `url("${townAsset(market.townsquareFile)}")` }}>
        <div className="main-menu-v6-masthead">
          <span className="game-brand-kicker">Merchant of the Six Kingdoms</span>
          <h2>Merchant Ledger</h2>
          <p>{merchantProfile.name} · {merchantProfile.background}. Buy low, bargain carefully, protect your pack, and move through the kingdoms before the market turns.</p>
        </div>

        <nav className="main-menu-v6-buttons" aria-label="Main menu actions">
          <button className="main-menu-v6-primary" type="button" onClick={onContinue}>
            <strong>Continue</strong>
            <span>Day {state.day} · {market.name}</span>
          </button>
          <button type="button" onClick={onNewMerchant}><strong>New Merchant</strong><span>Create a fresh profile</span></button>
          <button type="button" onClick={onLoadGame}><strong>Load Game</strong><span>Local/imported saves</span></button>
          <button type="button" onClick={onOpenTravel}><strong>Travel Map</strong><span>Routes and markets</span></button>
          <button type="button" onClick={onOpenBarter}><strong>Barter Table</strong><span>Talk to customers</span></button>
          <button type="button" onClick={onOpenInventory}><strong>Inventory</strong><span>Inspect your goods</span></button>
          <button type="button" onClick={onOpenSettings}><strong>Settings</strong><span>Audio and interface</span></button>
          <button type="button" onClick={onOpenSystem}><strong>System</strong><span>Save, export, help</span></button>
        </nav>

        <aside className="main-menu-v6-savecard">
          <span className="game-brand-kicker">Current Save</span>
          <h3>{market.name}</h3>
          <dl>
            <div><dt>Merchant</dt><dd>{merchantProfile.name}</dd></div>
            <div><dt>Day</dt><dd>{state.day}</dd></div>
            <div><dt>Audio</dt><dd>{soundOn ? "On" : "Off"}</dd></div>
            <div><dt>Goods</dt><dd>{state.playerInventory.filter((entry) => visibleQuantity(entry) > 0).length}</dd></div>
          </dl>
        </aside>
      </div>
    </section>
  );
}

function NewMerchantProfileScreen({
  market,
  merchantProfile,
  onCreate,
  onBack,
}: {
  market: ReturnType<typeof currentMarket>;
  merchantProfile: MerchantProfile;
  onCreate: (profile: MerchantProfile) => void;
  onBack: () => void;
}) {
  const [merchantName, setMerchantName] = useState(merchantProfile.name);
  const [background, setBackground] = useState(merchantProfile.background);
  const [difficulty, setDifficulty] = useState(merchantProfile.difficulty);
  const starters = ["Careful Appraiser", "Road Bargainer", "Spice Runner"];
  const [starter, setStarter] = useState(merchantProfile.starter);
  const nextProfile = { name: merchantName.trim() || "Unnamed Merchant", background, difficulty, starter };

  return (
    <section className="profile-v6-layout ui-screen">
      <Panel className="profile-v6-hero" bodyClassName="p-0">
        <div className="profile-v6-art" style={{ backgroundImage: `url("${townAsset(market.townsquareFile)}")` }}>
          <div className="profile-v6-card">
            <span className="game-brand-kicker">New Merchant Profile</span>
            <h2>{merchantName || "Unnamed Merchant"}</h2>
            <p>Choose a starting identity. These papers now persist locally and are stamped into the next new-game ledger.</p>
          </div>
        </div>
      </Panel>

      <Panel title="Merchant Papers" bodyClassName="profile-v6-form">
        <label><span>Name</span><input value={merchantName} onChange={(event) => setMerchantName(event.target.value)} /></label>
        <label><span>Background</span><select value={background} onChange={(event) => setBackground(event.target.value)}><option>Ledger Apprentice</option><option>Dockside Trader</option><option>Traveling Peddler</option><option>Guild Castoff</option></select></label>
        <label><span>Difficulty</span><select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}><option>Standard Market</option><option>Kind Prices</option><option>Hard Bargains</option><option>Iron Ledger</option></select></label>
        <div className="profile-v6-starters">
          {starters.map((choice) => <button key={choice} className={starter === choice ? "is-active" : ""} type="button" onClick={() => setStarter(choice)}>{choice}</button>)}
        </div>
        <div className="profile-v6-actions"><Button onClick={onBack}>Back</Button><Button onClick={() => onCreate(nextProfile)}><RotateCcw size={16} /> Begin Journey</Button></div>
      </Panel>

      <Panel title="Starting Terms" bodyClassName="profile-v6-summary">
        <p><strong>Merchant:</strong> {nextProfile.name}</p><p><strong>Background:</strong> {background}</p><p><strong>Difficulty:</strong> {difficulty}</p><p><strong>Starter:</strong> {starter}</p>
        <p className="text-sm text-parchment-muted">Patch 07 persists these choices locally and writes them into the first ledger message for new games. Full balance changes remain intentionally untouched.</p>
      </Panel>
    </section>
  );
}

function LoadGameScreen({
  state,
  modStatus,
  onLoadLocal,
  onExport,
  onImport,
  onBack,
  onOpenSettings,
}: {
  state: GameState;
  modStatus: string;
  onLoadLocal: () => void;
  onExport: () => void;
  onImport: () => void;
  onBack: () => void;
  onOpenSettings: () => void;
}) {
  return (
    <section className="load-v6-layout ui-screen">
      <Panel className="load-v6-main" title="Load Game" bodyClassName="load-v6-slots">
        <button type="button" className="load-v6-slot is-active" onClick={onLoadLocal}><strong>Local Browser Save</strong><span>Continue from the latest saved game on this device.</span><em>Day {state.day}</em></button>
        <button type="button" className="load-v6-slot" onClick={onImport}><strong>Import Save File</strong><span>Load an exported merchant JSON save.</span><em>JSON</em></button>
        <button type="button" className="load-v6-slot disabled"><strong>Cloud Slot</strong><span>Reserved for future platform sync.</span><em>Locked</em></button>
      </Panel>
      <aside className="load-v6-side">
        <Panel title="Save Tools" bodyClassName="system-actions"><Button onClick={onLoadLocal}><BookOpen size={16} /> Load Local</Button><Button onClick={onExport}><Download size={16} /> Export Current</Button><Button onClick={onImport}><Upload size={16} /> Import Save</Button><Button onClick={onOpenSettings}>Settings</Button><Button onClick={onBack}>Back to Menu</Button></Panel>
        <Panel title="Session Ledger"><div className="system-ledger"><p><strong>Current day:</strong> {state.day}</p><p><strong>Mods:</strong> {modStatus}</p><p><strong>Save format:</strong> JSON export/import</p></div></Panel>
      </aside>
    </section>
  );
}

function SettingsScreen({
  soundOn,
  modStatus,
  uiPreferences,
  onUpdatePreferences,
  onToggleSound,
  onBack,
  onOpenSystem,
}: {
  soundOn: boolean;
  modStatus: string;
  uiPreferences: UiPreferences;
  onUpdatePreferences: (patch: Partial<UiPreferences>) => void;
  onToggleSound: () => void;
  onBack: () => void;
  onOpenSystem: () => void;
}) {

  return (
    <section className="settings-v6-layout ui-screen">
      <Panel title="Settings" bodyClassName="settings-v6-form">
        <div className="settings-v6-row"><span><strong>Audio</strong><small>Toggle UI and ambient sound.</small></span><button type="button" className={soundOn ? "is-active" : ""} onClick={onToggleSound}>{soundOn ? "Enabled" : "Disabled"}</button></div>
        <label className="settings-v6-slider"><span><strong>UI Scale</strong><small>{uiPreferences.uiScale}% responsive target</small></span><input type="range" min="80" max="120" value={uiPreferences.uiScale} onChange={(event) => onUpdatePreferences({ uiScale: Number(event.target.value) })} /></label>
        <label className="settings-v6-slider"><span><strong>Dialogue Speed</strong><small>{uiPreferences.textSpeed}% typewriter speed</small></span><input type="range" min="20" max="100" value={uiPreferences.textSpeed} onChange={(event) => onUpdatePreferences({ textSpeed: Number(event.target.value) })} /></label>
        <div className="settings-v6-row"><span><strong>Decorative Motion</strong><small>Use subtle menu and panel movement.</small></span><button type="button" className={uiPreferences.decorativeMotion ? "is-active" : ""} onClick={() => onUpdatePreferences({ decorativeMotion: !uiPreferences.decorativeMotion })}>{uiPreferences.decorativeMotion ? "On" : "Off"}</button></div>
        <div className="settings-v6-row"><span><strong>Compact Responsive UI</strong><small>Tighter panels for laptop and small Electron windows.</small></span><button type="button" className={uiPreferences.compactMode ? "is-active" : ""} onClick={() => onUpdatePreferences({ compactMode: !uiPreferences.compactMode })}>{uiPreferences.compactMode ? "On" : "Off"}</button></div>
      </Panel>
      <Panel title="Interface Notes" bodyClassName="message-ledger settings-v6-notes"><p>The controls match the settings mockup visually and now persist across sessions. UI scale and compact mode apply immediately to the whole shell.</p><p className="mt-2 text-sm text-parchment-muted">{modStatus}</p></Panel>
      <Panel title="Navigation" bodyClassName="system-actions"><Button onClick={onBack}>Back to Main Menu</Button><Button onClick={onOpenSystem}>Advanced System Menu</Button></Panel>
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
  const carriedEntries = state.playerInventory.filter((entry) => visibleQuantity(entry) > 0);
  const totalValue = carriedEntries.reduce((total, entry) => total + items[entry.itemIndex].loafValue * visibleQuantity(entry), 0);
  const totalWeight = carriedEntries.reduce((total, entry) => total + items[entry.itemIndex].weight * visibleQuantity(entry), 0);
  const routes = routeLedger(market, marketplaces).slice(0, 4);
  const featuredPeople = people.slice(0, 6);

  return (
    <section className="ui-screen market-v5-layout" aria-label="Market hub">
      <Panel className="market-v5-hero-panel" bodyClassName="p-0">
        <div className="market-v5-hero-art" style={{ backgroundImage: `url("${townAsset(market.townsquareFile)}")` }}>
          <div className="market-v5-hero-badge">
            <Store size={18} />
            <span>Westgate Market Hub</span>
          </div>
          <div className="market-v5-hero-copy">
            <span className="game-brand-kicker">Current Market</span>
            <h2>{market.name}</h2>
            <p>Day {state.day}. Stallage {money(market.stallage)}. Watch the crowd, check demand, and choose the next customer before your route costs catch up.</p>
            <div className="market-v5-hero-actions">
              <Button onClick={onOpenInventory}><PackageSearch size={16} /> Manage Goods</Button>
              <Button onClick={onOpenTravel}><Compass size={16} /> Open Map</Button>
            </div>
          </div>
        </div>
      </Panel>

      <Panel className="market-v5-ledger" title="Merchant Ledger" bodyClassName="market-v5-stat-grid">
        <span><small>Day</small><strong>{state.day}</strong></span>
        <span><small>Cash Value</small><strong>{money(totalValue)}</strong></span>
        <span><small>Cargo Weight</small><strong>{totalWeight}</strong></span>
        <span><small>Goods</small><strong>{carriedEntries.length}</strong></span>
      </Panel>

      <Panel className="market-v5-demand" title="Local Economy" bodyClassName="market-v5-economy-body">
        <MarketEconomyStrip title="Demand" text={compactBiasText(market, "demand")} />
        <MarketEconomyStrip title="Discounts" text={compactBiasText(market, "discount")} />
      </Panel>

      <Panel className="market-v5-customers" title={<span><Users size={18} /> Customers Waiting</span>}>
        <div className="market-v5-customer-row">
          {featuredPeople.map((person) => (
            <button key={person.index} className={`market-v5-customer ${selectedIndex === person.index ? "is-active" : ""}`} type="button" onClick={() => onSelect(person)}>
              <img src={portraitAsset(person.portraitFile)} alt="" />
              <strong>{person.name}</strong>
              <span>{person.profession || "Customer"}</span>
            </button>
          ))}
        </div>
      </Panel>

      <QuestPanel market={market} />

      <Panel className="market-v5-routes" title={<span><Route size={18} /> Nearby Routes</span>}>
        <div className="travel-route-list compact market-v5-route-list">
          {routes.map(({ connection, to, days, tolls, demand, discounts }) => (
            <button key={`${market.index}-${connection.marketplaceIndex}-${connection.routeFile}`} className="travel-route market-v5-route" onClick={() => onTravel(connection.marketplaceIndex)}>
              <img src={routeAsset(connection.routeFile)} alt="" />
              <span className="min-w-0"><strong>{to.name}</strong><small>{days} days · {tolls} toll · demand {demand}</small><small>Discounts {discounts}</small></span>
            </button>
          ))}
        </div>
      </Panel>
    </section>
  );
}

function MarketEconomyStrip({ title, text }: { title: string; text: string }) {
  return (
    <div className="market-v5-economy-strip">
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

function CustomersScreen({
  state,
  market,
  people,
  character,
  playerOffer,
  characterOffer,
  onSelect,
  onTrade,
  onNextCustomer,
}: {
  state: GameState;
  market: ReturnType<typeof currentMarket>;
  people: Character[];
  character: Character | null;
  playerOffer: number;
  characterOffer: number;
  onSelect: (character: Character) => void;
  onTrade: () => void;
  onNextCustomer: () => void;
}) {
  const selectedInventory = character?.inventory || [];
  const selectedVisible = selectedInventory.filter((entry) => visibleQuantity(entry) > 0);
  const selectedStockValue = selectedVisible.reduce((total, entry) => total + items[entry.itemIndex].loafValue * visibleQuantity(entry), 0);

  return (
    <section className="customers-v5-layout ui-screen" aria-label="Customers">
      <Panel className="customers-v5-board" bodyClassName="p-0" title={<span><Users size={18} /> Customer Board</span>}>
        <div className="customers-v5-market-art" style={{ backgroundImage: `url("${townAsset(market.townsquareFile)}")` }}>
          <div className="customers-v5-grid">
            {people.map((person) => (
              <button key={person.index} className={`customers-v5-token ${state.selectedCharacterIndex === person.index ? "is-active" : ""}`} type="button" onClick={() => onSelect(person)}>
                <img src={portraitAsset(person.portraitFile)} alt="" />
                <strong>{person.name}</strong>
                <span>{person.profession || "Customer"}</span>
              </button>
            ))}
          </div>
        </div>
      </Panel>

      <section className="customers-v5-dossier">
        {character ? (
          <>
            <Panel className="customers-v5-profile" bodyClassName="customers-v5-profile-body">
              <div className="customers-v5-portrait-frame">
                <img className="customers-v5-portrait" src={portraitAsset(character.portraitFile)} alt="" />
                {character.stallFile ? <img className="customers-v5-stall" src={stallAsset(character.stallFile)} alt="" /> : null}
              </div>
              <div className="customers-v5-profile-copy">
                <span className="game-brand-kicker">Customer Dossier</span>
                <h2>{character.name}</h2>
                <h3>{character.profession || "Market Customer"}</h3>
                <TypewriterText className="dialogue-scroll customers-v5-dialogue" text={customerIntro(character)} />
                <p className="preference-text">{customerPreference(character)}</p>
              </div>
            </Panel>

            <Panel title="Trade Position" bodyClassName="customers-v5-trade-grid">
              <span><small>Your Offer</small><strong>{money(playerOffer)}</strong></span>
              <span><small>Their Offer</small><strong>{money(characterOffer)}</strong></span>
              <span><small>Stock Value</small><strong>{money(selectedStockValue)}</strong></span>
              <span><small>Visible Stock</small><strong>{selectedVisible.length}</strong></span>
            </Panel>

            <Panel title="Preferences" bodyClassName="customers-v5-preferences">
              <CustomerPreferenceBoard character={character} />
            </Panel>

            <Panel title="Conversation Choices" bodyClassName="customers-v5-actions">
              <button type="button"><strong>{customerPrompt(character)}</strong><span>{customerReply(character)}</span></button>
              <Button onClick={onTrade}><HandCoins size={18} /> Make Offer</Button>
              <Button onClick={onNextCustomer}>Next Customer</Button>
            </Panel>
          </>
        ) : (
          <Panel title="Choose a customer">
            <div className="game-panel-empty">Select a customer from the board to inspect their portrait, preferences, stock value, and trade position.</div>
          </Panel>
        )}
      </section>
    </section>
  );
}

function CustomerPreferenceBoard({ character }: { character: Character }) {
  const likes = character.bias?.filter((bias) => bias.percent > 0).slice(0, 6) || [];
  const dislikes = character.bias?.filter((bias) => bias.percent < 0).slice(0, 6) || [];
  return (
    <div className="customers-v5-bias-columns">
      <div>
        <strong><Star size={15} /> Likes</strong>
        {likes.length ? likes.map((bias) => <span className="bias-tag like" key={bias.tag}>{bias.tag} +{bias.percent}%</span>) : <small>No clear likes listed.</small>}
      </div>
      <div>
        <strong><Star size={15} /> Avoids</strong>
        {dislikes.length ? dislikes.map((bias) => <span className="bias-tag dislike" key={bias.tag}>{bias.tag} {bias.percent}%</span>) : <small>No clear dislikes listed.</small>}
      </div>
    </div>
  );
}

function UiAuditScreen({
  state,
  market,
  merchantProfile,
  uiPreferences,
  onJump,
}: {
  state: GameState;
  market: ReturnType<typeof currentMarket>;
  merchantProfile: MerchantProfile;
  uiPreferences: UiPreferences;
  onJump: (view: GameView) => void;
}) {
  const implementedScreens: Array<{ view: GameView; mockup: string; status: string; focus: string }> = [
    { view: "main-menu", mockup: "01_main_menu_8x.png", status: "implemented", focus: "title, save card, primary navigation" },
    { view: "new-profile", mockup: "02_new_merchant_profile_8x.png", status: "connected", focus: "profile paper, local persistence" },
    { view: "load-game", mockup: "03_load_game_8x.png", status: "connected", focus: "local save, import/export" },
    { view: "settings", mockup: "04_settings_8x.png", status: "connected", focus: "audio, UI scale, compact mode" },
    { view: "system", mockup: "05_system_menu_8x.png", status: "connected", focus: "save/load/help tools" },
    { view: "travel", mockup: "06_travel_map_8x.png", status: "implemented", focus: "map nodes, route ledger" },
    { view: "market", mockup: "07_westgate_market_hub_8x.png", status: "implemented", focus: "town hub, economy cards" },
    { view: "customers", mockup: "08_customers_8x.png", status: "implemented", focus: "customer board and dossier" },
    { view: "barter", mockup: "09_barter_conversation_main_8x.png", status: "core-ready", focus: "offer columns, portrait, dialogue" },
    { view: "inventory", mockup: "10_inventory_management_8x.png", status: "core-ready", focus: "search, filters, modal" },
  ];

  const qaChecks = [
    "Resize Electron from 1920×1080 down to 1280×720 and confirm panels do not clip.",
    "Use number keys 1–7 to jump Market, Customers, Barter, Inventory, Travel, System, QA.",
    "Use M/I/B/C/T/Y/Q shortcuts for Menu, Inventory, Barter, Customers, Travel, System, QA.",
    "Use Ctrl/Cmd+S for local save and Ctrl/Cmd+O for save import.",
    "Open Inventory and inspect at least one item detail modal from the eye button.",
    "Open Barter and verify both offer columns remain scrollable at small heights.",
  ];

  return (
    <section className="ui-audit-screen ui-screen" aria-label="UI implementation QA board">
      <Panel className="ui-audit-hero" title="UI QA Board" bodyClassName="ui-audit-hero-body">
        <div>
          <span className="game-brand-kicker">Patch 08 · responsive implementation board</span>
          <h2>Compare, jump, resize, and inspect</h2>
          <p>This board is a temporary developer page for checking how closely the React implementation follows the 12 UI mockups while staying dynamic and responsive.</p>
        </div>
        <dl className="ui-audit-stats">
          <div><dt>Merchant</dt><dd>{merchantProfile.name}</dd></div>
          <div><dt>Market</dt><dd>{market.name}</dd></div>
          <div><dt>Day</dt><dd>{state.day}</dd></div>
          <div><dt>Scale</dt><dd>{uiPreferences.uiScale}%</dd></div>
          <div><dt>Compact</dt><dd>{uiPreferences.compactMode ? "On" : "Off"}</dd></div>
          <div><dt>Motion</dt><dd>{uiPreferences.decorativeMotion ? "On" : "Off"}</dd></div>
        </dl>
      </Panel>

      <div className="ui-audit-grid">
        <Panel title="Implemented screens" bodyClassName="ui-audit-screen-list">
          {implementedScreens.map((screen, index) => (
            <button key={`${screen.view}-${screen.mockup}`} className="ui-audit-screen-row" type="button" onClick={() => onJump(screen.view)}>
              <span className="ui-audit-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="ui-audit-copy"><strong>{screen.mockup}</strong><small>{screen.focus}</small></span>
              <em>{screen.status}</em>
            </button>
          ))}
        </Panel>

        <Panel title="Responsive QA checklist" bodyClassName="ui-audit-checklist">
          {qaChecks.map((check) => <label key={check}><input type="checkbox" /> <span>{check}</span></label>)}
        </Panel>

        <Panel title="Keyboard shortcuts" bodyClassName="ui-audit-shortcuts">
          <kbd>1</kbd><span>Market</span>
          <kbd>2</kbd><span>Customers</span>
          <kbd>3</kbd><span>Barter</span>
          <kbd>4</kbd><span>Inventory</span>
          <kbd>5</kbd><span>Travel</span>
          <kbd>6</kbd><span>System</span>
          <kbd>7</kbd><span>QA board</span>
          <kbd>M</kbd><span>Main Menu</span>
          <kbd>Esc</kbd><span>System / back to market</span>
          <kbd>?</kbd><span>Controls</span>
        </Panel>
      </div>
    </section>
  );
}

function SystemMenuScreen({
  state,
  merchantProfile,
  modStatus,
  soundOn,
  onToggleSound,
  onHelp,
  onNewGame,
  onSave,
  onLoad,
  onExport,
  onImport,
  onOpenSettings,
  onOpenUiAudit,
}: {
  state: GameState;
  merchantProfile: MerchantProfile;
  modStatus: string;
  soundOn: boolean;
  onToggleSound: () => void;
  onHelp: () => void;
  onNewGame: () => void;
  onSave: () => void;
  onLoad: () => void;
  onExport: () => void;
  onImport: () => void;
  onOpenSettings: () => void;
  onOpenUiAudit: () => void;
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
        <Button onClick={onOpenSettings}>Settings</Button>
        <Button onClick={onOpenUiAudit}><PackageSearch size={16} /> UI QA Board</Button>
        <Button onClick={onHelp}><CircleHelp size={16} /> Controls</Button>
      </Panel>
      <Panel title="Current Session">
        <div className="system-ledger">
          <p><strong>Merchant:</strong> {merchantProfile.name}</p>
          <p><strong>Background:</strong> {merchantProfile.background}</p>
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

function TravelMapScreen({ state, market, onTravel }: { state: GameState; market: ReturnType<typeof currentMarket>; onTravel: (marketIndex: number) => void }) {
  const routes = routeLedger(market, marketplaces);
  const bestRoute = routes[0];

  return (
    <section className="travel-v5-layout ui-screen" aria-label="Travel map">
      <Panel className="travel-v5-map-panel" bodyClassName="p-0">
        <div className="travel-v5-map-stage">
          <MarketMap market={market} onTravel={onTravel} />
          <div className="travel-v5-map-card">
            <span className="game-brand-kicker">Travel Planner</span>
            <h2>{market.name}</h2>
            <p>Day {state.day}. Routes are carved into the map board. Connected destinations are bright brass; locked cities stay dim.</p>
          </div>
          <div className="travel-v5-compass"><Compass size={34} /><span>Routes</span></div>
        </div>
      </Panel>

      <aside className="travel-v5-side">
        <Panel title={<span><Route size={18} /> Route Ledger</span>}>
          <div className="travel-v5-route-stack">
            {routes.map(({ connection, to, days, tolls, demand, discounts }) => (
              <button key={`${market.index}-${connection.marketplaceIndex}-${connection.routeFile}`} className="travel-v5-route-card" type="button" onClick={() => onTravel(connection.marketplaceIndex)}>
                <img src={routeAsset(connection.routeFile)} alt="" />
                <span className="travel-v5-route-copy">
                  <strong>{to.name}</strong>
                  <small>{days} days · {tolls} toll</small>
                  <em>Demand {demand} · Discounts {discounts}</em>
                </span>
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Market Pressure" bodyClassName="travel-v5-pressure">
          <MarketEconomyStrip title="Demand" text={compactBiasText(market, "demand")} />
          <MarketEconomyStrip title="Discounts" text={compactBiasText(market, "discount")} />
          {bestRoute ? <div className="travel-v5-best-route"><strong>Suggested first check</strong><span>{bestRoute.to.name}</span></div> : null}
        </Panel>

        <QuestPanel market={market} />
      </aside>
    </section>
  );
}

function MarketMap({ market, onTravel }: { market: ReturnType<typeof currentMarket>; onTravel: (marketIndex: number) => void }) {
  const connected = new Set(market.connections.map((connection) => connection.marketplaceIndex));

  return (
    <div className="market-map travel-v5-map">
      <img src={mapAsset()} alt="" />
      {marketplaces.map((place) => {
        if (!place.location) return null;
        const isCurrent = place.index === market.index;
        const isConnected = connected.has(place.index);
        return (
          <button
            key={place.index}
            className={`map-node travel-v5-node ${isCurrent ? "current" : isConnected ? "connected" : "locked"}`}
            style={{ top: `${place.location.top}%`, left: `${place.location.left}%` }}
            disabled={isCurrent || !isConnected}
            title={place.name}
            onClick={() => onTravel(place.index)}
          >
            <span>{place.name}</span>
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
