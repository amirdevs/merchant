import { useState, type ReactNode } from "react";
import { Handshake, HelpCircle, MessageCircle } from "lucide-react";
import type { Character, InventoryEntry } from "@/data/types";
import { currentKingdom, currentMarket, marketplaces, type GameState } from "@/lib/game";
import { moodLabel, patienceLabel, relationFor, trustLabel, ultimatumActive } from "@/lib/reputation";
import { dialogueChoices, type DialogueEffect, type DialogueNodeId } from "@/lib/dialogue";
import { roleLabel } from "@/lib/npc-behavior";
import type { MoveAmount } from "@/lib/inventory";
import { portraitAsset, townAsset } from "@/lib/assets";
import { money } from "@/lib/format";
import { uiAssets } from "@/lib/ui-assets";
import { InventoryPanel } from "@/components/InventoryPanel";
import { Button, ModalShell, Panel, ScreenFrame, StatChip } from "@/components/ui";

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

export function BarterConversationView({ state, character, playerOffer, characterOffer, message, onMovePlayer, onMoveCharacter, onSetPlayerOfferQuantity, onSetCharacterOfferQuantity, onTogglePlayerProtect, onTrade, onAskPrice, onAskOffer, onClearOffers, onGoodbye, onHelp, onSpeak }: BarterConversationViewProps) {
  const [conversationOpen, setConversationOpen] = useState(false);
  const advantage = playerOffer - characterOffer;
  const market = currentMarket(state);
  const sceneLight = tradeSceneLight(state.timeOfDayMinutes);
  const illegalTags = currentKingdom(state).illegalItemTags || [];
  const relation = relationFor(state.npcRelations, character);
  const dialogueNode = character ? state.dialogueNodes[String(character.index)] || "root" : "root";
  const choices = character ? dialogueChoices(character, {
    market,
    markets: marketplaces,
    kingdom: currentKingdom(state),
    relation,
    day: state.day,
  }, dialogueNode) : [];
  const recentNotes = character ? state.dialogueLog.filter((entry) => entry.characterIndex === character.index).slice(0, 3) : [];
  const dealReaction = reactionForAdvantage(advantage, playerOffer, characterOffer);
  const chooseDialogue = (choice: ReturnType<typeof dialogueChoices>[number]) => {
    if (choice.id === "ask-price") onAskPrice();
    else if (choice.id === "ask-offer" || choice.id === "barter") onAskOffer();
    else if (choice.id === "goodbye") setConversationOpen(false);
    else if (character) onSpeak(character, choice.label, choice.reply, choice.nextNode, choice.effect);
  };

  return (
    <ScreenFrame className="h-full max-h-full" backdrop={uiAssets.backplates.tradeConversation} overlay="dark" contentClassName="h-full min-h-0 p-2">
      <h1 className="sr-only">Barter / Conversation</h1>
      <div className="grid min-h-0 flex-1 gap-2 xl:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.15fr)_minmax(0,0.95fr)]">
        <div className="flex min-h-0 flex-col gap-2">
          <InventoryPanel className="min-h-0 flex-[0.75]" bodyClassName="h-full max-h-none" title="NPC Offer" owner="character" mode="offer" variant="compact" panelVariant="wood" inventory={character?.inventory || []} illegalTags={illegalTags} onMove={(entry, amount) => onMoveCharacter(entry, amount, true)} onMoveAll={(entry) => onMoveCharacter(entry, "none", true)} onSetOfferQuantity={onSetCharacterOfferQuantity} />
          <InventoryPanel className="min-h-0 flex-[1.25]" bodyClassName="h-full max-h-none" title="NPC Stock" owner="character" variant="compact" panelVariant="wood" inventory={character?.inventory || []} illegalTags={illegalTags} onMove={(entry, amount) => onMoveCharacter(entry, amount)} onMoveAll={(entry) => onMoveCharacter(entry, "all")} onSetOfferQuantity={onSetCharacterOfferQuantity} />
        </div>

        <section
          className="relative min-h-0 overflow-hidden rounded-sm border-2 border-[#b98b37]/90 bg-[#24150a] shadow-2xl shadow-black/40"
          style={{
            backgroundImage: `${sceneLight.overlay}, url("${townAsset(market.townsquareFile)}")`,
            backgroundPosition: "center top",
            backgroundSize: "cover",
          }}
        >
          <div className="pointer-events-none absolute inset-1 rounded-sm border border-[#f7d987]/30" />
          {character ? (
            <div className="relative z-10 flex h-full min-h-0 flex-col p-2">
              <div className="absolute right-3 top-3 z-20 rounded-sm border border-[#d0a65a]/80 bg-[#160d05]/85 px-3 py-2 text-right text-[#fff3bd] shadow-lg backdrop-blur-sm">
                <strong className="block font-display text-lg leading-none">{sceneLight.time}</strong>
                <span className="text-[0.62rem] font-black uppercase tracking-[0.16em]">{sceneLight.phase} / Day {state.day}</span>
              </div>

              <div className="mx-auto grid h-[38%] min-h-[13rem] w-[44%] min-w-[12rem] max-w-[19rem] place-items-center overflow-hidden rounded-sm border-2 border-[#b98b37]/90 bg-[#f2ddb1]/90 p-1 shadow-2xl shadow-black/45">
                  {character.portraitFile ? <img className="h-full w-full rounded object-cover object-top" src={portraitAsset(character.portraitFile)} alt="" /> : null}
              </div>

              <div className="mt-auto rounded-sm border-2 border-[#b98b37]/85 bg-[#f2ddb1]/92 p-2 text-[#26170a] shadow-2xl shadow-black/50 backdrop-blur-[2px]">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
                  <div className="min-w-0">
                    <h1 className="truncate font-display text-3xl leading-none">{character.name}</h1>
                    <p className="truncate text-sm font-bold text-[#75501f]">{character.profession} / {roleLabel(character)}</p>
                  </div>
                  <Button size="sm" variant="secondary" onClick={() => setConversationOpen(true)}>Talk With {character.name}</Button>
                </div>

                <dl className="mt-2 grid grid-cols-3 gap-1.5">
                    <StatChip label="Mood" value={moodLabel(relation)} icon={uiAssets.town.moodPositive} tone={relation && relation.mood <= -2 ? "danger" : "parchment"} />
                    <StatChip label="Trust" value={trustLabel(relation)} icon={uiAssets.town.relationshipBadge} />
                    <StatChip label="Patience" value={patienceLabel(relation)} icon={uiAssets.town.tradeStyleBadge} tone={relation && relation.patience <= 2 ? "danger" : "parchment"} />
                </dl>

                <p className="mt-2 min-h-10 rounded-sm border border-[#9a7138]/60 bg-[#fff6d7]/70 p-2 text-sm leading-snug text-[#3b260f]">{message}</p>

                <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center">
                  <div><span className="block text-xs text-[#75501f]">Their Offer Value</span><strong className="font-display text-xl">{money(characterOffer)}</strong></div>
                  <img className="h-10 w-10 object-contain drop-shadow" src={uiAssets.hud.weight} alt="" />
                  <div><span className="block text-xs text-[#75501f]">Your Offer Value</span><strong className="font-display text-xl">{money(playerOffer)}</strong></div>
                </div>

                <div className="mt-2 h-3 rounded-full border border-[#7f5b2a]/55 bg-[#7f5b2a]/35">
                  <span className="block h-full rounded-full bg-gradient-to-r from-[#8d271f] via-[#d5a641] to-[#1f6f38] transition-all duration-500" style={{ width: `${dealReaction.balancePercent}%` }} />
                </div>
                <div className="mt-1 text-center text-sm">Your Advantage <strong className={advantage >= 0 ? "text-[#1f6f38]" : "text-[#8d271f]"}>{advantage >= 0 ? "+" : ""}{money(advantage)}</strong></div>

                {recentNotes.length ? <p className="mt-1 line-clamp-1 text-center text-xs text-[#725331]">Last note: {recentNotes[0].note}</p> : null}

                <div className="mt-2 grid grid-cols-6 gap-1.5">
                  <Button className="col-span-2" size="sm" variant="secondary" onClick={onAskPrice}>Ask Price</Button>
                  <Button className="col-span-2" size="sm" variant="secondary" onClick={onAskOffer}>Ask Offer</Button>
                  <Button className="col-span-1" size="sm" variant="secondary" onClick={onClearOffers}>Clear</Button>
                  <Button className="col-span-1 px-2" size="sm" subtle onClick={onHelp} aria-label="Help"><HelpCircle size={14} /></Button>
                  <Button className="col-span-3 min-h-12 text-base" onClick={onTrade}><Handshake size={17} /> Offer</Button>
                  <Button className="col-span-3 min-h-12 text-base" subtle onClick={onGoodbye}>Goodbye</Button>
                </div>
              </div>
              {conversationOpen ? (
                <ModalShell panelClassName="relative max-h-[94dvh] max-w-6xl overflow-hidden p-3 lg:p-4" onClick={() => setConversationOpen(false)}>
                  <div className="grid min-h-0 gap-3 text-[#3b260f]" onClick={(event) => event.stopPropagation()}>
                    <div className="grid min-h-0 gap-4 md:grid-cols-[15rem_minmax(0,1fr)] lg:grid-cols-[17rem_minmax(0,1fr)]">
                      <div
                        className="relative mx-auto grid aspect-[4/5] w-full max-w-[17rem] place-items-center overflow-hidden rounded-sm border-2 border-[#b98b37]/80 bg-[#f2ddb1] p-2 text-[#26170a] shadow-xl shadow-[#6c4418]/25"
                        style={{
                          backgroundImage: `linear-gradient(180deg, rgba(255,246,217,.10), rgba(0,0,0,.08)), url("${uiAssets.town.portraitFrameSelected}")`,
                          backgroundSize: "100% 100%",
                        }}
                      >
                        {character.portraitFile ? <img className="h-full w-full rounded object-cover object-top" src={portraitAsset(character.portraitFile)} alt="" /> : null}
                        <div className="absolute inset-x-2 bottom-2 bg-[#160d05]/90 px-3 py-2 text-center text-[#fff3bd] shadow-lg">
                          <strong className="block truncate font-display text-xl">{character.name}</strong>
                          <span className="block truncate text-[0.65rem] font-black uppercase tracking-wide text-[#e8d39d]">{character.profession} / {roleLabel(character)}</span>
                        </div>
                      </div>
                      <div className="flex min-h-0 flex-col gap-3">
                        <header>
                          <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#75501f]"><MessageCircle size={15} /> Conversation</span>
                          <h2 className="mt-1 font-display text-4xl leading-none text-[#26170a]">{character.name}</h2>
                        </header>
                        <div className="relative rounded-sm border-2 border-[#9a7138]/65 bg-[#fff8df]/90 px-5 py-4 text-lg leading-relaxed text-[#3b260f] shadow-inner shadow-[#6c4418]/15 before:absolute before:-left-3 before:top-8 before:h-5 before:w-5 before:rotate-45 before:border-b-2 before:border-l-2 before:border-[#9a7138]/65 before:bg-[#fff8df]">
                          {message}
                        </div>
                        <dl className="grid grid-cols-3 gap-2">
                          <StatChip label="Mood" value={moodLabel(relation)} icon={uiAssets.town.moodPositive} tone={relation && relation.mood <= -2 ? "danger" : "parchment"} />
                          <StatChip label="Trust" value={trustLabel(relation)} icon={uiAssets.town.relationshipBadge} />
                          <StatChip label="Patience" value={patienceLabel(relation)} icon={uiAssets.town.tradeStyleBadge} tone={relation && relation.patience <= 2 ? "danger" : "parchment"} />
                        </dl>
                        <div className={`rounded-sm border px-3 py-2 text-sm font-black uppercase tracking-wide ${dealReaction.className}`}>
                          {dealReaction.label}: {dealReaction.text}
                        </div>
                        {ultimatumActive(relation) ? <p className="rounded-sm border border-[#8d271f]/60 bg-[#fff6d7]/80 p-2 text-sm font-black uppercase tracking-wide text-[#8d271f]">Final offer warning</p> : null}
                      </div>
                    </div>
                    <div className="border-t border-[#9a7138]/55 pt-3">
                      <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-[#75501f]">Your Response</span>
                      <div className="grid grid-cols-2 gap-2">
                      {choices.map((choice) => (
                        <ResponseLine key={choice.id} onClick={() => chooseDialogue(choice)}>
                          {choice.label}
                        </ResponseLine>
                      ))}
                      </div>
                    </div>
                  </div>
                </ModalShell>
              ) : null}
            </div>
          ) : <div className="relative z-10 grid min-h-[26rem] place-items-center bg-black/45 p-8 text-center text-xl text-[#fff3bd]">Choose a customer first.</div>}
        </section>

        <div className="flex min-h-0 flex-col gap-2">
          <InventoryPanel className="min-h-0 flex-[0.75]" bodyClassName="h-full max-h-none" title="Your Offer" owner="player" mode="offer" variant="compact" panelVariant="wood" inventory={state.playerInventory} illegalTags={illegalTags} onMove={(entry, amount) => onMovePlayer(entry, amount, true)} onMoveAll={(entry) => onMovePlayer(entry, "none", true)} onSetOfferQuantity={onSetPlayerOfferQuantity} />
          <InventoryPanel className="min-h-0 flex-[1.25]" bodyClassName="h-full max-h-none" title="Your Inventory" owner="player" variant="compact" panelVariant="wood" inventory={state.playerInventory} illegalTags={illegalTags} onMove={(entry, amount) => onMovePlayer(entry, amount)} onMoveAll={(entry) => onMovePlayer(entry, "all")} onSetOfferQuantity={onSetPlayerOfferQuantity} onToggleProtect={onTogglePlayerProtect} allowProtect />
        </div>
      </div>
    </ScreenFrame>
  );
}

function tradeSceneLight(minutes: number) {
  const normalized = ((Math.floor(minutes) % 1440) + 1440) % 1440;
  const hour = Math.floor(normalized / 60);
  const minute = normalized % 60;
  const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

  if (hour < 5) {
    return {
      time,
      phase: "Deep Night",
      overlay: "linear-gradient(180deg, rgba(8,16,48,.68), rgba(11,15,35,.76) 58%, rgba(8,6,18,.88))",
    };
  }
  if (hour < 8) {
    return {
      time,
      phase: "Dawn",
      overlay: "linear-gradient(180deg, rgba(255,174,113,.22), rgba(102,76,112,.30) 55%, rgba(32,23,38,.62))",
    };
  }
  if (hour < 12) {
    return {
      time,
      phase: "Morning",
      overlay: "linear-gradient(180deg, rgba(255,246,194,.04), rgba(255,220,137,.08) 62%, rgba(54,33,13,.36))",
    };
  }
  if (hour < 16) {
    return {
      time,
      phase: "Afternoon",
      overlay: "linear-gradient(180deg, rgba(255,234,170,.08), rgba(232,176,89,.13) 58%, rgba(60,35,13,.42))",
    };
  }
  if (hour < 19) {
    return {
      time,
      phase: "Late Afternoon",
      overlay: "linear-gradient(180deg, rgba(255,166,82,.22), rgba(157,88,53,.30) 58%, rgba(45,24,18,.64))",
    };
  }
  if (hour < 21) {
    return {
      time,
      phase: "Dusk",
      overlay: "linear-gradient(180deg, rgba(91,73,127,.40), rgba(95,52,72,.52) 56%, rgba(25,17,32,.78))",
    };
  }
  return {
    time,
    phase: "Night",
    overlay: "linear-gradient(180deg, rgba(16,29,70,.58), rgba(16,23,54,.68) 56%, rgba(8,8,22,.86))",
  };
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

function ResponseLine({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button className="group flex min-h-11 items-center gap-3 rounded-sm border border-[#b98b37]/55 bg-[#fff6d7]/70 px-4 py-2 text-left text-base shadow-inner shadow-[#6c4418]/10 transition hover:border-[#1f5960] hover:bg-[#fff1c6]" type="button" onClick={onClick}>
      <span className="text-[#9a7138] transition group-hover:text-[#1f5960]">›</span>
      <span>{children}</span>
    </button>
  );
}
