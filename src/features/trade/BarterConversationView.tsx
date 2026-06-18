import type { ReactNode } from "react";
import { Handshake, HelpCircle } from "lucide-react";
import type { Character, InventoryEntry } from "@/data/types";
import { currentKingdom, currentMarket, items, marketplaces, type GameState } from "@/lib/game";
import { moodLabel, patienceLabel, relationFor, trustLabel, ultimatumActive } from "@/lib/reputation";
import { buildDealHints } from "@/lib/deal-intelligence";
import { dialogueChoices, type DialogueEffect, type DialogueNodeId } from "@/lib/dialogue";
import { roleLabel } from "@/lib/npc-behavior";
import type { MoveAmount } from "@/lib/inventory";
import { itemIconAsset, portraitAsset } from "@/lib/assets";
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
  onUndoOfferChange: () => void;
  onGoodbye: () => void;
  onHelp: () => void;
  onSpeak: (character: Character, topic: string, reply: string, nextNode?: DialogueNodeId, effect?: DialogueEffect) => void;
};

export function BarterConversationView({ state, character, playerOffer, characterOffer, message, onMovePlayer, onMoveCharacter, onSetPlayerOfferQuantity, onSetCharacterOfferQuantity, onTogglePlayerProtect, onTrade, onAskPrice, onAskOffer, onClearOffers, onUndoOfferChange, onGoodbye, onHelp, onSpeak }: BarterConversationViewProps) {
  const advantage = playerOffer - characterOffer;
  const illegalTags = currentKingdom(state).illegalItemTags || [];
  const relation = relationFor(state.npcRelations, character);
  const dealHints = buildDealHints(state, character, playerOffer, characterOffer);
  const dialogueNode = character ? state.dialogueNodes[String(character.index)] || "root" : "root";
  const choices = character ? dialogueChoices(character, {
    market: currentMarket(state),
    markets: marketplaces,
    kingdom: currentKingdom(state),
    relation,
    day: state.day,
  }, dialogueNode) : [];
  const recentNotes = character ? state.dialogueLog.filter((entry) => entry.characterIndex === character.index).slice(0, 3) : [];
  const dealReaction = reactionForAdvantage(advantage, playerOffer, characterOffer);

  return (
    <ScreenFrame className="h-full max-h-full" backdrop={uiAssets.backplates.tradeConversation} overlay="dark" contentClassName="h-full min-h-0 p-2">
      <h1 className="sr-only">Barter / Conversation</h1>
      <div className="grid min-h-0 flex-1 gap-2 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.9fr)_minmax(0,1.15fr)]">
        <div className="flex min-h-0 flex-col gap-2">
          <InventoryPanel className="min-h-0 flex-[0.75] [&>div:last-child]:h-[calc(100%-3.25rem)]" bodyClassName="h-full max-h-none overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" title="NPC Offer" owner="character" mode="offer" variant="compact" panelVariant="wood" inventory={character?.inventory || []} illegalTags={illegalTags} onMove={(entry, amount) => onMoveCharacter(entry, amount, true)} onMoveAll={(entry) => onMoveCharacter(entry, "none", true)} onSetOfferQuantity={onSetCharacterOfferQuantity} />
          <InventoryPanel className="min-h-0 flex-[1.25] [&>div:last-child]:h-[calc(100%-3.25rem)]" bodyClassName="h-full max-h-none overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" title="NPC Stock" owner="character" variant="compact" panelVariant="wood" inventory={character?.inventory || []} illegalTags={illegalTags} onMove={(entry, amount) => onMoveCharacter(entry, amount)} onMoveAll={(entry) => onMoveCharacter(entry, "all")} onSetOfferQuantity={onSetCharacterOfferQuantity} />
        </div>

        <Panel className="min-h-0 p-3 [&>div:last-child]:h-[calc(100%-3.25rem)]" title={character ? character.name : "Conversation"} variant="parchment">
          {character ? (
            <div className="flex h-full min-h-0 flex-col">
              <div className="grid min-h-0 gap-3 lg:grid-cols-[minmax(140px,0.62fr)_1fr]">
                <div className="min-h-0">
                  <div
                    className="mx-auto grid aspect-[4/5] max-h-[15rem] place-items-center overflow-hidden rounded-sm border-2 border-[#b98b37]/80 bg-[#f2ddb1] p-2 text-[#26170a] shadow-xl shadow-[#6c4418]/25"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(255,246,217,.10), rgba(0,0,0,.08)), url("${uiAssets.town.portraitFrameSelected}")`,
                      backgroundSize: "100% 100%",
                    }}
                  >
                    {character.portraitFile ? <img className="h-full w-full rounded object-cover" src={portraitAsset(character.portraitFile)} alt="" /> : null}
                  </div>
                </div>
                <div>
                  <h1 className="text-center font-display text-3xl text-[#26170a] lg:text-left">{character.name}</h1>
                  <p className="text-center font-bold text-[#75501f] lg:text-left">{character.profession}</p>
                  <p className="text-center text-xs font-black uppercase text-[#75501f] lg:text-left">{roleLabel(character)}</p>
                  <dl className="mt-2 grid grid-cols-3 gap-1.5">
                    <StatChip label="Mood" value={moodLabel(relation)} icon={uiAssets.town.moodPositive} tone={relation && relation.mood <= -2 ? "danger" : "parchment"} />
                    <StatChip label="Trust" value={trustLabel(relation)} icon={uiAssets.town.relationshipBadge} />
                    <StatChip label="Patience" value={patienceLabel(relation)} icon={uiAssets.town.tradeStyleBadge} tone={relation && relation.patience <= 2 ? "danger" : "parchment"} />
                  </dl>
                  <p className="mt-2 line-clamp-3 rounded-sm border border-[#9a7138]/60 bg-[#fff6d7]/65 p-3 text-base leading-snug text-[#3b260f] shadow-inner shadow-[#6c4418]/15">{message}</p>
                  <div className={`mt-2 rounded-sm border px-3 py-2 text-xs font-black uppercase tracking-wide ${dealReaction.className}`}>
                    {dealReaction.label}: {dealReaction.text}
                  </div>
                  {ultimatumActive(relation) ? <p className="mt-2 rounded-sm border border-[#8d271f]/60 bg-[#fff6d7]/80 p-2 text-sm font-black uppercase tracking-wide text-[#8d271f]">Final offer warning</p> : null}
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-1.5 text-[#3b260f]">
                {choices.map((choice) => (
                  <ResponseLine
                    key={choice.id}
                    onClick={() => {
                      if (choice.id === "ask-price") onAskPrice();
                      else if (choice.id === "ask-offer" || choice.id === "barter") onAskOffer();
                      else if (choice.id === "goodbye") onGoodbye();
                      else if (character) onSpeak(character, choice.label, choice.reply, choice.nextNode, choice.effect);
                    }}
                  >
                    {choice.label}
                  </ResponseLine>
                ))}
              </div>
              <div
                className="mt-2 min-h-0 rounded-sm border border-[#9a7138]/60 p-3 text-[#3b260f] shadow-inner shadow-[#6c4418]/20"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.16), rgba(0,0,0,.06)), url("${uiAssets.inventory.valueBalancePanel}")`,
                  backgroundSize: "100% 100%",
                }}
              >
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center">
                  <div><span className="block text-xs text-[#75501f]">Their Offer Value</span><strong className="font-display text-xl">{money(characterOffer)}</strong></div>
                  <img className="h-10 w-10 object-contain drop-shadow" src={uiAssets.hud.weight} alt="" />
                  <div><span className="block text-xs text-[#75501f]">Your Offer Value</span><strong className="font-display text-xl">{money(playerOffer)}</strong></div>
                </div>
                {recentNotes.length ? (
                  <div className="mt-3 rounded-sm border border-[#9a7138]/60 bg-[#fff6d7]/55 p-3 text-sm text-[#3b260f]">
                    <strong className="block text-[#75501f]">Remembered Notes</strong>
                    {recentNotes.map((note) => <p className="mt-1 line-clamp-2" key={`${note.day}-${note.topic}`}>Day {note.day}, {note.topic}: {note.note}</p>)}
                  </div>
                ) : null}
                <div className="mt-3 h-3 rounded-full border border-[#7f5b2a]/55 bg-[#7f5b2a]/35">
                  <span className="block h-full rounded-full bg-gradient-to-r from-[#8d271f] via-[#d5a641] to-[#1f6f38] transition-all duration-500" style={{ width: `${dealReaction.balancePercent}%` }} />
                </div>
                <div className="mt-1 text-center text-sm">Your Advantage <strong className={advantage >= 0 ? "text-[#1f6f38]" : "text-[#8d271f]"}>{advantage >= 0 ? "+" : ""}{money(advantage)}</strong></div>
                <div className="mt-2 grid gap-2 md:grid-cols-2">
                  <OfferPile title="They Put Forward" inventory={character.inventory} />
                  <OfferPile title="You Put Forward" inventory={state.playerInventory} />
                </div>
                <span className="sr-only">Deal Intelligence</span>
                {dealHints.length ? (
                  <div className="mt-2 grid grid-cols-2 gap-1.5 text-xs">
                    {dealHints.slice(0, 4).map((hint) => (
                      <div className="rounded-sm border border-[#9a7138]/35 bg-[#fff6d7]/50 px-2 py-1" key={`${hint.label}-${hint.detail}`}>
                        <span className={hint.tone === "good" ? "font-black text-[#1f6f38]" : hint.tone === "bad" ? "font-black text-[#8d271f]" : "font-black text-[#75501f]"}>{hint.label}: </span>
                        {hint.detail}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="mt-2 grid grid-cols-4 gap-1.5"><Button size="sm" variant="secondary" onClick={onAskPrice}>Ask Price</Button><Button size="sm" variant="secondary" onClick={onAskOffer}>Ask Offer</Button><Button size="sm" onClick={onTrade}><Handshake size={14} /> Accept</Button><Button size="sm" variant="secondary" onClick={onUndoOfferChange}>Undo</Button><Button size="sm" variant="secondary" onClick={onClearOffers}>Clear</Button><Button size="sm" subtle onClick={onGoodbye}>Goodbye</Button><Button className="col-span-2" size="sm" subtle onClick={onHelp}><HelpCircle size={14} /> Help</Button></div>
            </div>
          ) : <div className="grid min-h-[26rem] place-items-center rounded-sm border border-[#9a7138]/60 bg-[#fff6d7]/55 p-8 text-center text-xl text-[#725331]">Choose a customer first.</div>}
        </Panel>

        <div className="flex min-h-0 flex-col gap-2">
          <InventoryPanel className="min-h-0 flex-[0.75] [&>div:last-child]:h-[calc(100%-3.25rem)]" bodyClassName="h-full max-h-none overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" title="Your Offer" owner="player" mode="offer" variant="compact" panelVariant="wood" inventory={state.playerInventory} illegalTags={illegalTags} onMove={(entry, amount) => onMovePlayer(entry, amount, true)} onMoveAll={(entry) => onMovePlayer(entry, "none", true)} onSetOfferQuantity={onSetPlayerOfferQuantity} />
          <InventoryPanel className="min-h-0 flex-[1.25] [&>div:last-child]:h-[calc(100%-3.25rem)]" bodyClassName="h-full max-h-none overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" title="Your Inventory" owner="player" variant="compact" panelVariant="wood" inventory={state.playerInventory} illegalTags={illegalTags} onMove={(entry, amount) => onMovePlayer(entry, amount)} onMoveAll={(entry) => onMovePlayer(entry, "all")} onSetOfferQuantity={onSetPlayerOfferQuantity} onToggleProtect={onTogglePlayerProtect} allowProtect />
        </div>
      </div>
    </ScreenFrame>
  );
}

function reactionForAdvantage(advantage: number, playerOffer: number, characterOffer: number) {
  if (playerOffer <= 0 && characterOffer <= 0) {
    return {
      label: "Empty Table",
      text: "They wait for something worth discussing.",
      className: "border-[#9a7138]/60 bg-[#fff6d7]/70 text-[#75501f]",
      balancePercent: 50,
    };
  }
  if (advantage >= 250) {
    return {
      label: "Delighted",
      text: "This looks generous enough to soften their stance.",
      className: "border-[#2d7f42]/70 bg-[#e8ffd8]/80 text-[#1f6f38]",
      balancePercent: 92,
    };
  }
  if (advantage >= 0) {
    return {
      label: "Tempted",
      text: "The scale is leaning your way.",
      className: "border-[#6c9f38]/70 bg-[#f1ffd8]/80 text-[#426f1f]",
      balancePercent: 68,
    };
  }
  if (advantage > -200) {
    return {
      label: "Unconvinced",
      text: "They see a gap but might keep talking.",
      className: "border-[#d0a65a]/70 bg-[#fff3c6]/80 text-[#7b5726]",
      balancePercent: 38,
    };
  }
  return {
    label: "Insulted",
    text: "The offer looks lopsided and risks their patience.",
    className: "border-[#8d271f]/70 bg-[#ffe1d7]/85 text-[#8d271f]",
    balancePercent: 14,
  };
}

function OfferPile({ title, inventory }: { title: string; inventory: InventoryEntry[] }) {
  const offered = inventory.filter((entry) => entry.offerQuantity > 0).slice(0, 5);

  return (
    <div className="min-h-24 rounded-sm border border-[#9a7138]/60 bg-[#fff6d7]/55 p-2 shadow-inner shadow-[#6c4418]/15">
      <strong className="block text-xs uppercase tracking-wide text-[#75501f]">{title}</strong>
      {offered.length ? (
        <div className="mt-2 flex min-h-14 flex-wrap items-end gap-1.5">
          {offered.map((entry) => {
            const item = items[entry.itemIndex];
            return (
              <span className="relative grid h-14 w-14 place-items-center rounded-sm border border-[#c89d55]/70 bg-[#f5e1b7]/80 p-1 shadow" key={`${title}-${entry.itemIndex}`} title={item?.name || `Item ${entry.itemIndex}`}>
                <img className="max-h-10 max-w-10 object-contain drop-shadow" src={itemIconAsset(item?.iconFile)} alt="" />
                <span className="absolute -bottom-1 -right-1 rounded-full border border-[#5a3b18] bg-[#fff2bd] px-1.5 text-[0.65rem] font-black text-[#160d05]">x{entry.offerQuantity}</span>
              </span>
            );
          })}
        </div>
      ) : (
        <p className="mt-2 text-sm font-semibold text-[#725331]">Nothing on this side yet.</p>
      )}
    </div>
  );
}

function ResponseLine({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button className="rounded-sm border border-[#b98b37]/55 bg-[#fff6d7]/60 px-4 py-3 text-left text-base shadow-inner shadow-[#6c4418]/10 hover:bg-[#fff1c6]" type="button" onClick={onClick}>
      {children}
    </button>
  );
}
