import { CalendarDays, Gavel, HandCoins, StepForward } from "lucide-react";
import { useState } from "react";
import type { GameState } from "@/lib/game";
import { currentMarket, items } from "@/lib/game";
import { currentAuctionLot, nextAuctionBid, rivalTell } from "@/lib/auction";
import { eventBiases, eventIsActive, nextEventDay } from "@/lib/events";
import { coinQuantity } from "@/lib/economy";
import { money } from "@/lib/format";
import { raceEntries } from "@/lib/racing";
import { currentDraftRound } from "@/lib/draft";
import { filterMythCards, type MythCardFilter, type MythSuit } from "@/lib/myth";
import { uiAssets } from "@/lib/ui-assets";
import { Button, Panel, ScreenFrame, StatChip } from "@/components/ui";

type EventViewProps = {
  state: GameState;
  onBack: () => void;
  onAdvanceDay: () => void;
  onStartAuction: () => void;
  onBidAuction: () => void;
  onPassAuction: () => void;
  onCloseAuction: () => void;
  onRunHorseRace: (horseName: string, wager: number) => void;
  onStartMythGame: () => void;
  onPlayMythCard: (cardId: string) => void;
  onCloseMythGame: () => void;
  onStartDraft: () => void;
  onPickDraftItem: (itemIndex: number) => void;
  onCloseDraft: () => void;
  onToggleMythDeckCard: (cardId: string) => void;
  onSaveMythDeckPreset: () => void;
  onLoadMythDeckPreset: (presetId: string) => void;
};

export function EventView({ state, onBack, onAdvanceDay, onStartAuction, onBidAuction, onPassAuction, onCloseAuction, onRunHorseRace, onStartMythGame, onPlayMythCard, onCloseMythGame, onStartDraft, onPickDraftItem, onCloseDraft, onToggleMythDeckCard, onSaveMythDeckPreset, onLoadMythDeckPreset }: EventViewProps) {
  const market = currentMarket(state);
  const active = eventIsActive(market, state.day);
  const session = state.auctionSession;
  const lot = session ? currentAuctionLot(session) : null;
  const biases = eventBiases(market, state.day);
  const copper = coinQuantity(state.playerInventory, items, "copper coins");
  const isAuction = Boolean(market.event?.name?.toLowerCase().includes("auction"));
  const isRace = Boolean(market.event?.name?.toLowerCase().includes("horse race"));
  const isMyth = Boolean(market.event?.name?.toLowerCase().includes("card game"));
  const mythSession = state.mythSession;
  const isDraft = Boolean(market.event?.name?.toLowerCase().includes("draft"));
  const draftSession = state.draftSession;
  const draftRound = draftSession ? currentDraftRound(draftSession) : null;
  const horses = raceEntries(market);
  const [selectedHorse, setSelectedHorse] = useState(horses[0]?.name || "");
  const [wager, setWager] = useState(10);
  const [mythSuitFilter, setMythSuitFilter] = useState<MythCardFilter["suit"]>("all");
  const [mythRarityFilter, setMythRarityFilter] = useState<MythCardFilter["rarity"]>("all");
  const [mythSort, setMythSort] = useState<MythCardFilter["sort"]>("name");
  const mythCards = filterMythCards(state.mythProgression.collection, { suit: mythSuitFilter, rarity: mythRarityFilter, sort: mythSort });

  return (
    <ScreenFrame title={market.event?.name || "Market Events"} eyebrow={`${market.name} / Day ${state.day}`} backdrop={uiAssets.backplates.marketTown} overlay="light">
      <div className="grid flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Panel title={<span className="inline-flex items-center gap-2"><Gavel size={18} /> Event Floor</span>} variant="parchment">
          {!market.event?.name ? <p className="text-[#3b260f]">No recurring event is scheduled here.</p> : null}
          {market.event?.name && !session ? (
            <div className="grid gap-4 text-[#3b260f]">
              <p className="text-lg">{active ? `${market.event.name} is open today.` : `${market.event.name} returns on day ${nextEventDay(market, state.day)}.`}</p>
              {biases.length ? <p className="font-bold text-[#75501f]">Event demand: {biases.map((bias) => `${bias.tag} +${bias.percent}%`).join(", ")}</p> : null}
              <div className="flex flex-wrap gap-2">
                {isAuction ? <Button disabled={!active} onClick={onStartAuction}><Gavel size={16} /> Enter Auction</Button> : null}
                {isMyth && !mythSession ? <Button disabled={!active} onClick={onStartMythGame}>Enter Myth Tournament</Button> : null}
                {isDraft && !draftSession ? <Button disabled={!active} onClick={onStartDraft}>Enter Magic Draft</Button> : null}
                <Button variant="secondary" onClick={onAdvanceDay}><CalendarDays size={16} /> Wait One Day</Button>
                <Button subtle onClick={onBack}>Back</Button>
              </div>
              {isRace && horses.length ? (
                <div className="grid gap-3 rounded-sm border-2 border-[#9a7138]/60 bg-[#fff6d7]/60 p-4">
                  <div className="grid gap-2 md:grid-cols-2">
                    {horses.map((horse) => (
                      <button key={horse.name} className={`rounded-sm border p-3 text-left ${selectedHorse === horse.name ? "border-[#1f5960] bg-[#1f5960]/15" : "border-[#9a7138]/50 bg-[#fff8df]/60"}`} type="button" onClick={() => setSelectedHorse(horse.name)}>
                        <strong className="block">{horse.name}</strong>
                        <span className="text-sm">Form {horse.form.toFixed(1)} / pays {horse.odds}x</span>
                      </button>
                    ))}
                  </div>
                  <label className="flex items-center gap-2 font-bold">Wager<input className="w-28 rounded-sm border border-[#9a7138]/60 bg-[#fff8df] px-2 py-1" min={1} type="number" value={wager} onChange={(event) => setWager(Number(event.target.value))} /> copper</label>
                  <Button disabled={!active || !selectedHorse} onClick={() => onRunHorseRace(selectedHorse, wager)}>Run Race</Button>
                  {state.raceResult?.marketIndex === market.index ? (
                    <div className="rounded-sm border border-[#1f5960]/40 bg-[#fff8df]/70 p-3">
                      <strong>{state.raceResult.horseName} placed {state.raceResult.placement}.</strong>
                      <p>Payout: {state.raceResult.payout} copper.</p>
                      <p className="text-sm">Finish: {state.raceResult.finishOrder.join(" / ")}</p>
                    </div>
                  ) : null}
                </div>
              ) : null}
              {isMyth && mythSession ? (
                <div className="grid gap-3 rounded-sm border-2 border-[#1f5960]/55 bg-[#fff6d7]/65 p-4">
                  <div className="grid grid-cols-3 gap-2">
                    <StatChip label="Opponent" value={mythSession.opponentName} />
                    <StatChip label="Score" value={`${mythSession.playerPoints}-${mythSession.opponentPoints}`} />
                    <StatChip label="Prize" value={mythSession.prize} icon={uiAssets.hud.goldCoin} />
                  </div>
                  <p className="font-bold text-[#3b260f]">{mythSession.message}</p>
                  {mythSession.status === "active" ? (
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
                      {mythSession.playerHand.map((card) => (
                        <button className="min-h-32 rounded-sm border-2 border-[#9a7138]/65 bg-[#fff8df] p-3 text-center text-[#26170a] shadow hover:-translate-y-0.5" key={card.id} type="button" onClick={() => onPlayMythCard(card.id)}>
                          <strong className="block font-display text-xl">{card.name}</strong>
                          <span className="mt-2 block text-xs font-black uppercase text-[#75501f]">{card.suit}</span>
                          <span className="mt-2 block text-3xl font-black">{card.power}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-2">
                      {mythSession.rounds.map((round, index) => <p className="rounded-sm border border-[#9a7138]/45 bg-[#fff8df]/70 p-2 text-sm" key={`${round.playerCard.id}-${index}`}>Round {index + 1}: {round.playerCard.name} vs {round.opponentCard.name} / {round.winner}</p>)}
                      <Button variant="secondary" onClick={onCloseMythGame}>Close Match</Button>
                    </div>
                  )}
                </div>
              ) : null}
              {isMyth && !mythSession ? (
                <div className="grid gap-3 rounded-sm border border-[#9a7138]/55 bg-[#fff6d7]/55 p-4">
                  <div className="grid grid-cols-4 gap-2">
                    <StatChip label="Owned" value={state.mythProgression.collection.length} />
                    <StatChip label="Deck" value={state.mythProgression.activeDeckIds.length} />
                    <StatChip label="Wins" value={state.mythProgression.wins} />
                    <StatChip label="Losses" value={state.mythProgression.losses} />
                  </div>
                  <div className="grid gap-2 rounded-sm border border-[#9a7138]/40 bg-[#fff8df]/65 p-3 md:grid-cols-[1fr_1fr_1fr_auto]">
                    <label className="grid gap-1 text-xs font-black uppercase text-[#75501f]">
                      Suit
                      <select className="rounded-sm border border-[#9a7138]/60 bg-[#fff8df] px-2 py-1 text-sm font-bold normal-case text-[#26170a]" value={mythSuitFilter} onChange={(event) => setMythSuitFilter(event.target.value as MythSuit | "all")}>
                        <option value="all">All suits</option>
                        <option value="wild">Wild</option>
                        <option value="harvest">Harvest</option>
                        <option value="prey">Prey</option>
                        <option value="predator">Predator</option>
                        <option value="arcane">Arcane</option>
                      </select>
                    </label>
                    <label className="grid gap-1 text-xs font-black uppercase text-[#75501f]">
                      Rarity
                      <select className="rounded-sm border border-[#9a7138]/60 bg-[#fff8df] px-2 py-1 text-sm font-bold normal-case text-[#26170a]" value={mythRarityFilter} onChange={(event) => setMythRarityFilter(event.target.value === "all" ? "all" : Number(event.target.value) as MythCardFilter["rarity"])}>
                        <option value="all">All rarities</option>
                        <option value="1">Rarity 1</option>
                        <option value="2">Rarity 2</option>
                        <option value="3">Rarity 3</option>
                        <option value="4">Rarity 4</option>
                      </select>
                    </label>
                    <label className="grid gap-1 text-xs font-black uppercase text-[#75501f]">
                      Sort
                      <select className="rounded-sm border border-[#9a7138]/60 bg-[#fff8df] px-2 py-1 text-sm font-bold normal-case text-[#26170a]" value={mythSort} onChange={(event) => setMythSort(event.target.value as MythCardFilter["sort"])}>
                        <option value="name">Name</option>
                        <option value="power">Power</option>
                        <option value="rarity">Rarity</option>
                        <option value="suit">Suit</option>
                      </select>
                    </label>
                    <Button variant="secondary" onClick={onSaveMythDeckPreset}>Save Deck</Button>
                  </div>
                  {state.mythProgression.deckPresets.length ? (
                    <div className="flex flex-wrap gap-2">
                      {state.mythProgression.deckPresets.map((preset) => (
                        <button className="rounded-sm border border-[#1f5960]/45 bg-[#e3f0d0] px-3 py-2 text-sm font-black text-[#1f3f34] shadow-sm hover:bg-[#cfe4b3]" key={preset.id} type="button" onClick={() => onLoadMythDeckPreset(preset.id)}>
                          {preset.name} / {preset.cardIds.length}
                        </button>
                      ))}
                    </div>
                  ) : null}
                  <div className="grid max-h-52 grid-cols-2 gap-2 overflow-auto md:grid-cols-4">
                    {mythCards.map((card) => {
                      const activeCard = state.mythProgression.activeDeckIds.includes(card.id);
                      return (
                        <button className={`rounded-sm border p-2 text-left ${activeCard ? "border-[#1f5960] bg-[#1f5960]/15" : "border-[#9a7138]/50 bg-[#fff8df]/60"}`} key={card.id} type="button" onClick={() => onToggleMythDeckCard(card.id)}>
                          <strong className="block">{card.name}</strong>
                          <span className="text-xs">{card.suit} / power {card.power} / rarity {card.rarity}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
              {isDraft && draftSession ? (
                <div className="grid gap-3 rounded-sm border-2 border-[#1f5960]/55 bg-[#fff6d7]/65 p-4">
                  <div className="grid grid-cols-3 gap-2">
                    <StatChip label="Round" value={`${Math.min(draftSession.roundIndex + 1, draftSession.rounds.length)}/${draftSession.rounds.length}`} />
                    <StatChip label="Your Picks" value={draftSession.playerPicks.length} />
                    <StatChip label="Rival Picks" value={draftSession.rivalPicks.length} />
                  </div>
                  <p className="font-bold text-[#3b260f]">{draftSession.message}</p>
                  {draftRound ? (
                    <div className="grid grid-cols-3 gap-3">
                      {draftRound.choices.map((itemIndex) => (
                        <button className="min-h-36 rounded-sm border-2 border-[#9a7138]/65 bg-[#fff8df] p-3 text-center text-[#26170a] shadow hover:-translate-y-0.5" key={itemIndex} type="button" onClick={() => onPickDraftItem(itemIndex)}>
                          <strong className="block font-display text-xl">{items[itemIndex]?.name}</strong>
                          <span className="mt-2 block text-sm">{items[itemIndex]?.tags.slice(0, 3).join(" / ")}</span>
                          <span className="mt-3 block font-black">{money(items[itemIndex]?.loafValue || 0)}</span>
                        </button>
                      ))}
                    </div>
                  ) : <Button variant="secondary" onClick={onCloseDraft}>Close Draft Results</Button>}
                </div>
              ) : null}
            </div>
          ) : null}
          {session ? (
            <div className="grid gap-4 text-[#3b260f]">
              <div className="grid grid-cols-4 gap-2">
                <StatChip label="Lot" value={`${Math.min(session.lotIndex + 1, session.lots.length)}/${session.lots.length}`} />
                <StatChip label="Your Wins" value={session.playerWins} />
                <StatChip label="Rival Wins" value={session.rivalWins} />
                <StatChip label="Copper" value={money(copper)} icon={uiAssets.hud.goldCoin} />
              </div>
              {lot ? (
                <div className="rounded-sm border-2 border-[#9a7138]/65 bg-[#fff6d7]/65 p-6 text-center">
                  <span className="text-xs font-black uppercase text-[#75501f]">Current Lot</span>
                  <h2 className="font-display text-4xl text-[#26170a]">{lot.quantity} x {items[lot.itemIndex]?.name || "Unknown item"}</h2>
                  <p className="mt-2">Base value {money((items[lot.itemIndex]?.loafValue || 0) * lot.quantity)} / opening bid {money(lot.openingBid)}</p>
                  <p className="mt-2 font-bold">Highest bid: {session.highestBid ? money(session.highestBid) : "None"} / leader: {session.leader}</p>
                  <p className="mt-3 italic text-[#75501f]">{rivalTell(session)}</p>
                  <div className="mt-4 flex justify-center gap-2">
                    <Button onClick={onBidAuction}><HandCoins size={16} /> Bid {money(nextAuctionBid(session))}</Button>
                    <Button variant="secondary" onClick={onPassAuction}><StepForward size={16} /> Pass</Button>
                  </div>
                </div>
              ) : <p className="text-lg font-bold">{session.message}</p>}
              <p className="rounded-sm border border-[#9a7138]/55 bg-[#fff6d7]/55 p-3">{session.message}</p>
              <Button variant="secondary" onClick={onCloseAuction}>{session.status === "finished" ? "Close Results" : "Leave Auction"}</Button>
            </div>
          ) : null}
        </Panel>

        <Panel title="Event Guide" variant="parchment">
          <p className="text-[#3b260f]">Rival tells become more nervous as bids approach their private limit. Winning immediately spends copper and transfers the lot into your inventory.</p>
          <Button className="mt-4 w-full" variant="secondary" onClick={onBack}>Return To Market</Button>
        </Panel>
      </div>
    </ScreenFrame>
  );
}
