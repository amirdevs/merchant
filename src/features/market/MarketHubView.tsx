import type { ReactNode } from "react";
import { Building2, Gavel, Handshake, Map, Menu, PackageSearch, ScrollText, UserRoundPlus } from "lucide-react";
import type { Character, Marketplace } from "@/data/types";
import type { GameState } from "@/lib/game";
import { eventBiases, eventIsActive, nextEventDay } from "@/lib/events";
import { money } from "@/lib/format";
import { uiAssets } from "@/lib/ui-assets";
import type { GameView } from "@/app/types";
import { Button, LedgerRow, Panel, ScreenFrame, StatChip } from "@/components/ui";

export function MarketHubView({ state, market, people, onNavigate, onSelectCustomer, onNextCustomer, onPackup }: { state: GameState; market: Marketplace; people: Character[]; onNavigate: (view: GameView) => void; onSelectCustomer: (person: Character) => void; onNextCustomer: () => void; onPackup: () => void; onUnavailable: (message: string) => void }) {
  const currentCustomer = people.find((person) => person.index === state.selectedCharacterIndex) || people[0];
  const waitingPeople = people.filter((person) => person.index !== currentCustomer?.index).slice(0, 3);
  const eventActive = eventIsActive(market, state.day);
  const activeBiases = eventBiases(market, state.day);

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
            <p className="text-base leading-snug text-[#3b260f]">{market.quest?.todo || "Prices shift quickly near the harbor. Check customers before committing cargo."}</p>
          </Panel>
        </div>

        <div className="absolute right-4 top-auto bottom-24 w-[28rem] max-w-[40vw]">
          <Panel className="p-4" title="At Your Stall" variant="parchment">
            {currentCustomer ? (
              <div className="grid gap-3">
                <div className="rounded-sm border-2 border-[#c89d55] bg-[#fff4c5]/85 p-3 shadow-inner">
                  <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#7b5726]">Current Customer</p>
                  <h2 className="font-display text-3xl leading-none text-[#2b1a0b]">{currentCustomer.name}</h2>
                  <p className="text-sm font-bold text-[#5b3b17]">{currentCustomer.profession}</p>
                  <p className="mt-2 text-sm leading-snug text-[#3b260f]">
                    {currentCustomer.isMerchant ? "A trader studies your shelves and waits for terms." : "They step up to the counter, watching your hands and the goods on display."}
                  </p>
                </div>
                <Button size="lg" onClick={() => onSelectCustomer(currentCustomer)}>
                  <Handshake size={18} /> Barter With Customer
                </Button>
                <Button size="lg" variant="secondary" onClick={onNextCustomer}>
                  <UserRoundPlus size={18} /> Next Customer
                </Button>
                {waitingPeople.length ? (
                  <div className="grid gap-1.5">
                    {waitingPeople.map((person) => (
                      <LedgerRow
                        key={person.index}
                        className="py-1.5"
                        title={person.name}
                        subtitle={person.profession}
                        trailing={<span className="text-[0.62rem] font-bold uppercase tracking-wide text-[#75501f]">Waiting</span>}
                        onClick={() => onSelectCustomer(person)}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="rounded-sm border border-[#9a7138]/45 bg-[#fff6d7]/55 p-3 text-sm font-bold text-[#5b3b17]">No customers are at the stall right now.</div>
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
            <MarketCommand icon={<UserRoundPlus size={34} />} label="Next Customer" onClick={onNextCustomer} />
            <MarketCommand icon={<Handshake size={34} />} label="Barter" onClick={() => currentCustomer && onSelectCustomer(currentCustomer)} />
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
