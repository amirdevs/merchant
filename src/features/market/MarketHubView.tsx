import type { ReactNode } from "react";
import { Building2, ClipboardList, Gavel, Handshake, Map, Menu, PackageSearch, ScrollText, UserRoundPlus } from "lucide-react";
import type { Character, Marketplace } from "@/data/types";
import { remakeCharacterPortraitAsset, remakeCharacterView } from "@/data/characters/characterPortraitManifest";
import type { GameState } from "@/lib/game";
import { eventBiases, eventIsActive, nextEventDay } from "@/lib/events";
import { money } from "@/lib/format";
import { uiAssets } from "@/lib/ui-assets";
import type { GameView } from "@/app/types";
import { Button, LedgerRow, Panel, ScreenFrame, StatChip } from "@/components/ui";

export function MarketHubView({ state, market, people, onNavigate, onSelectCustomer, onNextCustomer, onPackup }: { state: GameState; market: Marketplace; people: Character[]; onNavigate: (view: GameView) => void; onSelectCustomer: (person: Character) => void; onNextCustomer: () => void; onPackup: () => void; onUnavailable: (message: string) => void }) {
  const currentCustomer = people.find((person) => person.index === state.selectedCharacterIndex) || null;
  const currentCustomerView = currentCustomer ? remakeCharacterView(currentCustomer) : null;
  const seenToday = state.customerQueueDay === state.day ? new Set(state.seenCharacterIndexes || []) : new Set<number>();
  const waitingPeople = people.filter((person) => person.index !== currentCustomer?.index && !seenToday.has(person.index)).slice(0, 3);
  const eventActive = eventIsActive(market, state.day);
  const activeBiases = eventBiases(market, state.day);
  const newsAndTips = eventActive && market.event?.name
    ? `${market.event.name} is moving demand today. Check event-sensitive goods before locking your cargo.`
    : currentCustomerView
      ? `${currentCustomerView.name} is at the stall now. Read the customer before you commit stock.`
      : "Prices shift quickly near the harbor. Check customers before committing cargo.";

  return (
    <ScreenFrame backdrop={uiAssets.backplates.marketTown} overlay="light" contentClassName="p-2 lg:p-3">
      <div
        className="relative flex min-h-[520px] flex-1 overflow-hidden rounded-sm border-2 border-[#b98b37] bg-cover bg-center shadow-2xl shadow-black/45"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(255,244,206,.02), rgba(31,18,8,.10) 56%, rgba(18,10,4,.64)), url("${uiAssets.backplates.marketTown}")`,
          backgroundPosition: "center top",
        }}
      >
        {market.event?.name ? (
          <div className={eventActive ? "absolute inset-x-0 top-0 z-10 border-b-2 border-[#d0a65a] bg-[#1f5960]/95 px-4 py-2 text-center font-black text-[#fff8d8] shadow-xl" : "absolute inset-x-0 top-0 z-10 border-b border-[#9a7138] bg-[#fff6d7]/92 px-4 py-2 text-center font-bold text-[#3b260f] shadow"}>
            {eventActive ? `${market.event.name} is active today` : `${market.event.name} returns on day ${nextEventDay(market, state.day)}`}
            {activeBiases.length ? ` / Demand: ${activeBiases.map((bias) => `${bias.tag} +${bias.percent}%`).join(", ")}` : ""}
          </div>
        ) : null}
        <div className={`absolute left-4 w-[25rem] max-w-[42vw] ${market.event?.name ? "top-14" : "top-4"}`}>
          <Panel className="p-5" title="Market Status" variant="parchment">
            <h1 className="font-display text-5xl leading-none text-[#2b1a0b]">{market.name}</h1>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#7b5726]">Coastal Trade Hub</p>
            <dl className="grid gap-3 text-lg">
              <StatChip label="Stallage" value={money(market.stallage)} icon={uiAssets.hud.goldCoin} />
              <StatChip label="Routes" value={market.connections.length} icon={uiAssets.hud.market} />
              <StatChip label="Customers" value={people.length} icon={uiAssets.hud.inventory} />
              <StatChip label="Event" value={market.event?.name || "None"} icon={uiAssets.hud.warning} />
            </dl>
          </Panel>
          <Panel className="mt-4 p-4" title="News and Tips" variant="parchment">
            <p className="text-base leading-snug text-[#3b260f]">{newsAndTips}</p>
          </Panel>
        </div>

        <div className="absolute right-4 top-auto bottom-24 w-[30rem] max-w-[42vw]">
          <Panel className="p-4" title="At Your Stall" variant="parchment">
            {currentCustomer && currentCustomerView ? (
              <div className="grid gap-3">
                <div className="grid grid-cols-[5rem_minmax(0,1fr)] gap-3 rounded-sm border-2 border-[#c89d55] bg-[#fff4c5]/85 p-3 shadow-inner">
                  <CustomerPortrait person={currentCustomer} />
                  <div className="min-w-0">
                    <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#7b5726]">Current Customer</p>
                    <h2 className="truncate font-display text-3xl leading-none text-[#2b1a0b]">{currentCustomerView.name}</h2>
                    <p className="truncate text-sm font-bold text-[#5b3b17]">{currentCustomerView.profession}</p>
                    <p className="mt-2 line-clamp-3 text-sm leading-snug text-[#3b260f]">{currentCustomerView.marketFlavor}</p>
                    <p className="mt-2 truncate text-[0.68rem] font-black uppercase tracking-wide text-[#7b5726]">{currentCustomerView.roleTags.slice(0, 3).join(" / ") || "market regular"}</p>
                  </div>
                </div>
                <Button size="lg" onClick={() => onSelectCustomer(currentCustomer)}>
                  <Handshake size={18} /> Barter With Customer
                </Button>
                <Button size="lg" variant="secondary" onClick={onNextCustomer}>
                  <UserRoundPlus size={18} /> Next Customer
                </Button>
                {waitingPeople.length ? (
                  <div className="grid gap-1.5">
                    {waitingPeople.map((person) => {
                      const view = remakeCharacterView(person);
                      return (
                        <LedgerRow
                          key={person.index}
                          className="py-1.5"
                          title={view.name}
                          subtitle={`${view.profession} - ${view.marketFlavor}`}
                          trailing={<span className="text-[0.62rem] font-bold uppercase tracking-wide text-[#75501f]">Waiting</span>}
                          onClick={() => onSelectCustomer(person)}
                        />
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="grid gap-3">
                <div className="rounded-sm border border-[#9a7138]/45 bg-[#fff6d7]/55 p-3 text-sm font-bold text-[#5b3b17]">
                  {waitingPeople.length ? "The counter is clear. Call the next customer when you are ready." : "No more customers are waiting at the stall today."}
                </div>
                {waitingPeople.length ? (
                  <Button size="lg" variant="secondary" onClick={onNextCustomer}>
                    <UserRoundPlus size={18} /> Next Customer
                  </Button>
                ) : null}
              </div>
            )}
          </Panel>
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <div
            className="mx-auto flex min-h-20 items-stretch justify-center gap-3 border-t-2 border-[#b98b37] px-6 py-2 shadow-2xl shadow-black/45"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.07), rgba(0,0,0,.28)), url("${uiAssets.nineSlice.textureWoodDark}")`,
              backgroundSize: "cover",
            }}
          >
            <MarketCommand icon={<ClipboardList size={34} />} label="Planner" onClick={() => onNavigate("strategy")} />
            <MarketCommand icon={<ScrollText size={34} />} label="Journal" onClick={() => onNavigate("journal")} />
            <MarketCommand icon={<Map size={34} />} label="Packup" onClick={onPackup} />
            <MarketCommand icon={<Map size={34} />} label="Map" onClick={() => onNavigate("travel")} />
            <MarketCommand icon={<PackageSearch size={34} />} label="Cargo" onClick={() => onNavigate("inventory")} />
            <MarketCommand icon={<Building2 size={34} />} label="Company" onClick={() => onNavigate("company")} />
            {market.event?.name ? <MarketCommand icon={<Gavel size={34} />} label="Event" onClick={() => onNavigate("event")} /> : null}
            <MarketCommand icon={<Menu size={34} />} label="Menu" onClick={() => onNavigate("system")} />
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

function CustomerPortrait({ person }: { person: Character }) {
  const view = remakeCharacterView(person);
  const src = remakeCharacterPortraitAsset(person);
  return (
    <span className="grid h-20 w-20 place-items-center overflow-hidden rounded-sm border border-[#9a7138]/70 bg-[#f2ddb1] text-[#26170a] shadow-inner">
      {src ? <img className="h-full w-full object-cover object-top" src={src} alt={view.name} /> : <UserRoundPlus />}
    </span>
  );
}

function MarketCommand({ icon, label, onClick }: { icon: ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      className="grid h-16 w-32 place-items-center gap-0.5 rounded-sm border-2 border-[#d0a65a]/80 bg-cover bg-center px-3 py-1.5 font-display text-lg font-bold text-[#fff8d8] shadow-lg shadow-black/40 transition hover:-translate-y-0.5 hover:brightness-110 [text-shadow:0_1px_2px_rgba(0,0,0,.9)]"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.08), rgba(0,0,0,.52)), url("${uiAssets.nineSlice.textureWoodDark}")`,
      }}
      type="button"
      onClick={onClick}
    >
      <span className="text-[#ffd975] drop-shadow">{icon}</span>
      <span className="rounded-sm bg-black/25 px-2 py-0.5 leading-none">{label}</span>
    </button>
  );
}
