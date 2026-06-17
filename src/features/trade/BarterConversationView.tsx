import type { ReactNode } from "react";
import { Handshake, HelpCircle, Scale } from "lucide-react";
import type { Character, InventoryEntry } from "@/data/types";
import { currentKingdom, type GameState } from "@/lib/game";
import { moodLabel, patienceLabel, relationFor, trustLabel } from "@/lib/reputation";
import { buildDealHints } from "@/lib/deal-intelligence";
import type { MoveAmount } from "@/lib/inventory";
import { portraitAsset } from "@/lib/assets";
import { money } from "@/lib/format";
import { uiAssets } from "@/lib/ui-assets";
import { InventoryPanel } from "@/components/InventoryPanel";
import { Button, Panel, ScreenFrame, StatChip } from "@/components/ui";

type BarterConversationViewProps = {
  state: GameState;
  character: Character | null;
  playerOffer: number;
  characterOffer: number;
  message: string;
  onMovePlayer: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  onMoveCharacter: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  onSetPlayerOfferQuantity: (entry: InventoryEntry, quantity: number) => void;
  onSetCharacterOfferQuantity: (entry: InventoryEntry, quantity: number) => void;
  onTogglePlayerProtect: (entry: InventoryEntry) => void;
  onTrade: () => void;
  onAskPrice: () => void;
  onAskOffer: () => void;
  onClearOffers: () => void;
  onGoodbye: () => void;
  onHelp: () => void;
  onUnavailable: (message: string) => void;
};

export function BarterConversationView({ state, character, playerOffer, characterOffer, message, onMovePlayer, onMoveCharacter, onSetPlayerOfferQuantity, onSetCharacterOfferQuantity, onTogglePlayerProtect, onTrade, onAskPrice, onAskOffer, onClearOffers, onGoodbye, onHelp, onUnavailable }: BarterConversationViewProps) {
  const advantage = playerOffer - characterOffer;
  const illegalTags = currentKingdom(state).illegalItemTags || [];
  const relation = relationFor(state.npcRelations, character);
  const dealHints = buildDealHints(state, character, playerOffer, characterOffer);

  return (
    <ScreenFrame title="Barter / Conversation" eyebrow="Main Screen" backdrop={uiAssets.backplates.tradeConversation} overlay="dark" contentClassName="p-2 lg:p-3">
      <div className="grid flex-1 gap-3 xl:grid-cols-[27rem_minmax(340px,1fr)_27rem]">
        <div className="grid min-h-0 content-start gap-3">
          <InventoryPanel title="NPC Offer" mode="offer" variant="compact" panelVariant="wood" inventory={character?.inventory || []} illegalTags={illegalTags} onMove={(entry, amount) => onMoveCharacter(entry, amount, true)} onMoveAll={(entry) => onMoveCharacter(entry, "none", true)} onSetOfferQuantity={onSetCharacterOfferQuantity} />
          <InventoryPanel title="NPC Stock" variant="compact" panelVariant="wood" inventory={character?.inventory || []} illegalTags={illegalTags} onMove={(entry, amount) => onMoveCharacter(entry, amount)} onMoveAll={(entry) => onMoveCharacter(entry, "all")} onSetOfferQuantity={onSetCharacterOfferQuantity} />
        </div>

        <Panel className="p-4" title={character ? character.name : "Conversation"} variant="parchment">
          {character ? (
            <div>
              <div className="grid gap-4 lg:grid-cols-[minmax(210px,0.8fr)_1fr]">
                <div>
                  <div
                    className="mx-auto grid aspect-[4/5] max-h-[22rem] place-items-center overflow-hidden rounded-sm border-2 border-[#b98b37]/80 bg-[#f2ddb1] p-2 text-[#26170a] shadow-xl shadow-[#6c4418]/25"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(255,246,217,.10), rgba(0,0,0,.08)), url("${uiAssets.town.portraitFrameSelected}")`,
                      backgroundSize: "100% 100%",
                    }}
                  >
                    {character.portraitFile ? <img className="h-full w-full rounded object-cover" src={portraitAsset(character.portraitFile)} alt="" /> : null}
                  </div>
                </div>
                <div>
                  <h1 className="text-center font-display text-4xl text-[#26170a] lg:text-left">{character.name}</h1>
                  <p className="text-center font-bold text-[#75501f] lg:text-left">{character.profession}</p>
                  <dl className="mt-3 grid grid-cols-3 gap-2">
                    <StatChip label="Mood" value={moodLabel(relation)} icon={uiAssets.town.moodPositive} tone={relation && relation.mood <= -2 ? "danger" : "parchment"} />
                    <StatChip label="Trust" value={trustLabel(relation)} icon={uiAssets.town.relationshipBadge} />
                    <StatChip label="Patience" value={patienceLabel(relation)} icon={uiAssets.town.tradeStyleBadge} tone={relation && relation.patience <= 2 ? "danger" : "parchment"} />
                  </dl>
                  <p className="mt-3 rounded-sm border border-[#9a7138]/60 bg-[#fff6d7]/65 p-4 text-lg leading-snug text-[#3b260f] shadow-inner shadow-[#6c4418]/15">{message}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-[#3b260f]">
                <ResponseLine onClick={() => onUnavailable("Dialogue choices are placeholders until the dialogue graph engine is implemented.")}>I have just what you're looking for.</ResponseLine>
                <ResponseLine onClick={onAskOffer}>Perhaps we can find a fair trade.</ResponseLine>
                <ResponseLine onClick={onAskPrice}>What goods do you value most?</ResponseLine>
                <ResponseLine onClick={onGoodbye}>I'll think on it. Farewell.</ResponseLine>
              </div>
              <div
                className="mt-4 rounded-sm border border-[#9a7138]/60 p-4 text-[#3b260f] shadow-inner shadow-[#6c4418]/20"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.16), rgba(0,0,0,.06)), url("${uiAssets.inventory.valueBalancePanel}")`,
                  backgroundSize: "100% 100%",
                }}
              >
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
                  <div><span className="block text-sm text-[#75501f]">Their Offer Value</span><strong className="font-display text-2xl">{money(characterOffer)}</strong></div>
                  <img className="h-14 w-14 object-contain drop-shadow" src={uiAssets.hud.weight} alt="" />
                  <div><span className="block text-sm text-[#75501f]">Your Offer Value</span><strong className="font-display text-2xl">{money(playerOffer)}</strong></div>
                </div>
                <div className="mt-3 h-3 rounded-full border border-[#7f5b2a]/55 bg-[#7f5b2a]/35">
                  <span className="block h-full w-1/2 rounded-full bg-gradient-to-r from-[#1f5960] via-[#d5a641] to-[#8d271f]" />
                </div>
                <div className="mt-1 text-center text-sm">Your Advantage <strong className={advantage >= 0 ? "text-[#1f6f38]" : "text-[#8d271f]"}>{advantage >= 0 ? "+" : ""}{money(advantage)}</strong></div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 lg:grid-cols-6"><Button size="lg" variant="secondary" onClick={onAskPrice}>Ask Price</Button><Button size="lg" variant="secondary" onClick={onAskOffer}>Ask Offer</Button><Button size="lg" onClick={onTrade}><Handshake size={16} /> Accept</Button><Button size="lg" variant="secondary" onClick={onClearOffers}>Clear</Button><Button size="lg" subtle onClick={onGoodbye}>Goodbye</Button><Button size="lg" subtle onClick={onHelp}><HelpCircle size={16} /> Help</Button></div>
            </div>
          ) : <div className="grid min-h-[26rem] place-items-center rounded-sm border border-[#9a7138]/60 bg-[#fff6d7]/55 p-8 text-center text-xl text-[#725331]">Choose a customer first.</div>}
        </Panel>

        <div className="grid gap-4">
          <InventoryPanel title="Your Offer" mode="offer" variant="compact" panelVariant="wood" inventory={state.playerInventory} illegalTags={illegalTags} onMove={(entry, amount) => onMovePlayer(entry, amount, true)} onMoveAll={(entry) => onMovePlayer(entry, "none", true)} onSetOfferQuantity={onSetPlayerOfferQuantity} />
          <InventoryPanel title="Your Inventory" variant="compact" panelVariant="wood" inventory={state.playerInventory} illegalTags={illegalTags} onMove={(entry, amount) => onMovePlayer(entry, amount)} onMoveAll={(entry) => onMovePlayer(entry, "all")} onSetOfferQuantity={onSetPlayerOfferQuantity} onToggleProtect={onTogglePlayerProtect} allowProtect />
          <Panel title={<span className="inline-flex items-center gap-2"><Scale size={18} /> Deal Intelligence</span>} variant="wood" dense>
            {dealHints.length ? (
              <div className="grid gap-2 text-sm text-[#ead7a8]">
                {dealHints.map((hint) => (
                  <div className="rounded-sm border border-[#d0a65a]/35 bg-[#1f1308]/35 px-3 py-2" key={`${hint.label}-${hint.detail}`}>
                    <div className={hint.tone === "good" ? "font-black text-[#b7ef9a]" : hint.tone === "bad" ? "font-black text-[#ffb3a1]" : "font-black text-[#ffe6a0]"}>{hint.label}</div>
                    <div>{hint.detail}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#ead7a8]">Put goods on either side of the scale to reveal trade pressure.</p>
            )}
          </Panel>
        </div>
      </div>
    </ScreenFrame>
  );
}

function ResponseLine({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button className="rounded-sm border border-[#b98b37]/55 bg-[#fff6d7]/60 px-4 py-3 text-left text-base shadow-inner shadow-[#6c4418]/10 hover:bg-[#fff1c6]" type="button" onClick={onClick}>
      {children}
    </button>
  );
}
