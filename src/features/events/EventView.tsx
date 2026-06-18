import { CalendarDays, Gavel, HandCoins, StepForward } from "lucide-react";
import type { GameState } from "@/lib/game";
import { currentMarket, items } from "@/lib/game";
import { currentAuctionLot, nextAuctionBid, rivalTell } from "@/lib/auction";
import { eventBiases, eventIsActive, nextEventDay } from "@/lib/events";
import { coinQuantity } from "@/lib/economy";
import { money } from "@/lib/format";
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
};

export function EventView({ state, onBack, onAdvanceDay, onStartAuction, onBidAuction, onPassAuction, onCloseAuction }: EventViewProps) {
  const market = currentMarket(state);
  const active = eventIsActive(market, state.day);
  const session = state.auctionSession;
  const lot = session ? currentAuctionLot(session) : null;
  const biases = eventBiases(market, state.day);
  const copper = coinQuantity(state.playerInventory, items, "copper coins");
  const isAuction = Boolean(market.event?.name?.toLowerCase().includes("auction"));

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
                {isAuction ? <Button disabled={!active} onClick={onStartAuction}><Gavel size={16} /> Enter Auction</Button> : <Button disabled>Playable session coming in its dedicated event module</Button>}
                <Button variant="secondary" onClick={onAdvanceDay}><CalendarDays size={16} /> Wait One Day</Button>
                <Button subtle onClick={onBack}>Back</Button>
              </div>
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
