import { Building2, Handshake, Map, PackageSearch, ScrollText, ShieldAlert, UserRoundPlus } from "lucide-react";
import type { Character } from "@/shared/types/game-data";
import { useCharacterProfiles } from "@/game/characters/useCharacterProfiles";
import type { GameView } from "@/app/types";
import { Button, LedgerRow, Panel, ScreenFrame, StatChip } from "@/shared/components/ui";
import { actionChecklist, companyUiPanel, inventoryUiPanel, questUiCard, travelUiCard, type UiMessage } from "@/game/vertical-slice/ui-integration";
import { currentKingdom, currentMarket, items, kingdoms, marketplaces, offerValue, selectedCharacter, type GameState } from "@/game/runtime/game";
import { money } from "@/shared/utils/format";
import { planTravel, marketCloseStatus } from "@/game/travel/travel-loop";
import { summarizeQuestWork } from "@/game/quests/quest-runtime";
import { uiAssets } from "@/shared/utils/ui-assets";

export function StrategyDashboardView({ state, onNavigate, onSelectCustomer, onNextCustomer }: {
  state: GameState;
  onNavigate: (view: GameView) => void;
  onSelectCustomer: (person: Character) => void;
  onNextCustomer: () => void;
}) {
  const { getProfileView } = useCharacterProfiles();
  const market = currentMarket(state);
  const kingdom = currentKingdom(state);
  const customer = selectedCharacter(state);
  const customerView = getProfileView(customer);
  const inventory = inventoryUiPanel(state.playerInventory, items);
  const company = companyUiPanel(state.company, items);
  const marketClock = marketCloseStatus(state.timeOfDayMinutes);
  const questCards = summarizeQuestWork({
    markets: marketplaces,
    state: {
      inventory: state.playerInventory,
      questStates: state.questStates,
      questAcceptedDays: state.questAcceptedDays,
    },
    items,
  })
    .map(questUiCard)
    .sort((left, right) => priorityForQuest(right.actionState) - priorityForQuest(left.actionState))
    .slice(0, 4);

  const travelPlans = market.connections
    .map((connection) => {
      const destination = marketplaces[connection.marketplaceIndex];
      const destinationKingdom = kingdoms[destination.kingdomIndex];
      const plan = planTravel({
        from: market,
        destination,
        destinationKingdom,
        inventory: state.playerInventory,
        items,
        timeOfDayMinutes: state.timeOfDayMinutes,
        concealmentLevel: state.caravan.concealmentLevel,
      });
      return plan ? { destination, card: travelUiCard(plan, items), plan } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .slice(0, 4);

  const selectedPlayerOffer = customer ? offerValue(state.playerInventory, customer, "player", state) : 0;
  const selectedNpcOffer = customer ? offerValue(customer.inventory, customer, "character", state) : 0;
  const checklist = actionChecklist({
    inventory,
    travel: travelPlans[0]?.card,
    quests: questCards,
    company,
  });

  return (
    <ScreenFrame title="Strategy Planner" eyebrow={`${market.name} / ${kingdom.name}`} backdrop={uiAssets.backplates.ledgerQuest} overlay="light" contentClassName="h-full min-h-0 p-2 lg:p-3">
      <div className="grid min-h-0 flex-1 gap-3 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="grid min-h-0 gap-3 overflow-auto pr-1 xl:grid-cols-2">
          <Panel title={<span className="inline-flex items-center gap-2"><Handshake size={18} /> Trade Desk</span>} variant="parchment">
            {customer && customerView ? (
              <div className="grid gap-3 text-[#3b260f]">
                <div className="grid grid-cols-2 gap-2">
                  <StatChip label="Customer" value={customerView.name} />
                  <StatChip label="Profession" value={customerView.profession} />
                  <StatChip label="Your Offer" value={money(selectedPlayerOffer)} />
                  <StatChip label="Their Offer" value={money(selectedNpcOffer)} />
                </div>
                <p className="rounded-sm border border-[#9a7138]/55 bg-[#fff6d7]/60 p-2 text-sm font-bold">
                  {state.message || customerView.marketFlavor || "Use Ask Price and Ask Offer on the barter table to test the current deal."}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => onNavigate("barter")}><Handshake size={16} /> Open Barter</Button>
                  <Button variant="secondary" onClick={onNextCustomer}><UserRoundPlus size={16} /> Next Customer</Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-3 text-[#3b260f]">
                <p className="rounded-sm border border-[#9a7138]/55 bg-[#fff6d7]/60 p-3 font-bold">No customer is selected. Call the next customer or review the customer list.</p>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={onNextCustomer}><UserRoundPlus size={16} /> Next Customer</Button>
                  <Button variant="secondary" onClick={() => onNavigate("customers")}>Customer List</Button>
                </div>
              </div>
            )}
          </Panel>

          <Panel title={<span className="inline-flex items-center gap-2"><PackageSearch size={18} /> Cargo and Money</span>} variant="parchment">
            <div className="grid grid-cols-2 gap-2">
              <StatChip label="Money" value={inventory.moneyLabel} />
              <StatChip label="Cargo Value" value={inventory.nonCoinValueLabel} />
              <StatChip label="Stacks" value={inventory.visibleEntries} />
              <StatChip label="Capacity" value={inventory.canTravel ? "Ready" : "Blocked"} tone={inventory.canTravel ? "parchment" : "danger"} />
            </div>
            <p className="mt-3 rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/55 p-2 text-sm font-bold text-[#3b260f]">{inventory.capacityLabel}</p>
            <MessageList messages={inventory.messages} />
            <Button className="mt-3" variant="secondary" onClick={() => onNavigate("inventory")}>Open Cargo</Button>
          </Panel>

          <Panel title={<span className="inline-flex items-center gap-2"><Map size={18} /> Routes</span>} variant="parchment">
            <div className="mb-3 grid grid-cols-2 gap-2">
              <StatChip label="Market Clock" value={marketClock.status} tone={marketClock.status === "closed" ? "danger" : "parchment"} />
              <StatChip label="Routes" value={travelPlans.length} />
            </div>
            <p className="mb-3 rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/55 p-2 text-sm font-bold text-[#3b260f]">{marketClock.label}</p>
            <div className="grid gap-2">
              {travelPlans.map(({ destination, card, plan }) => (
                <LedgerRow
                  key={destination.index}
                  title={card.routeLabel}
                  subtitle={`${card.costLabel} / ${card.riskLabel} / ${plan.days} day${plan.days === 1 ? "" : "s"}`}
                  trailing={<span className={card.actionState === "blocked" ? "text-xs font-black uppercase text-[#8d271f]" : "text-xs font-black uppercase text-[#1f6f38]"}>{card.actionState}</span>}
                  onClick={() => onNavigate("travel")}
                />
              ))}
            </div>
            <Button className="mt-3" variant="secondary" onClick={() => onNavigate("travel")}>Open Travel Map</Button>
          </Panel>

          <Panel title={<span className="inline-flex items-center gap-2"><ScrollText size={18} /> Quests and Contracts</span>} variant="parchment">
            <div className="grid gap-2">
              {questCards.length ? questCards.map((quest) => (
                <LedgerRow
                  key={quest.title}
                  title={quest.title}
                  subtitle={`${quest.statusLabel} / ${quest.actionLabel}${quest.messages.length ? ` / ${quest.messages[0].text}` : ""}`}
                  trailing={<span className={quest.actionState === "ready" ? "text-xs font-black uppercase text-[#1f6f38]" : "text-xs font-black uppercase text-[#75501f]"}>{quest.actionState}</span>}
                  onClick={() => onNavigate("journal")}
                />
              )) : <p className="text-sm font-bold text-[#3b260f]">No authored quest work is visible yet.</p>}
            </div>
            <Button className="mt-3" variant="secondary" onClick={() => onNavigate("journal")}>Open Journal</Button>
          </Panel>
        </div>

        <aside className="grid content-start gap-3 overflow-auto pr-1">
          <Panel title={<span className="inline-flex items-center gap-2"><Building2 size={18} /> Company</span>} variant="parchment">
            <div className="grid grid-cols-2 gap-2">
              <StatChip label="Cash" value={company.cashLabel} />
              <StatChip label="Net Value" value={company.netValueLabel} />
              <StatChip label="Share" value={company.sharePriceLabel} />
              <StatChip label="Weekly Cost" value={company.weeklyCostLabel} tone={company.actionState === "warning" ? "danger" : "parchment"} />
            </div>
            <MessageList messages={company.messages} />
            <Button className="mt-3" variant="secondary" onClick={() => onNavigate("company")}>Open Company</Button>
          </Panel>

          <Panel title={<span className="inline-flex items-center gap-2"><ShieldAlert size={18} /> Action Checklist</span>} variant="parchment">
            <div className="grid gap-2">
              {checklist.map((item) => (
                <p className="rounded-sm border border-[#9a7138]/50 bg-[#fff6d7]/60 p-2 text-sm font-bold text-[#3b260f]" key={item}>{item}</p>
              ))}
            </div>
          </Panel>

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => onNavigate("market")}>Back To Stall</Button>
            <Button variant="secondary" onClick={() => onNavigate("system")}>System Menu</Button>
          </div>
        </aside>
      </div>
    </ScreenFrame>
  );
}

function priorityForQuest(actionState: ReturnType<typeof questUiCard>["actionState"]) {
  if (actionState === "ready") return 4;
  if (actionState === "available") return 3;
  if (actionState === "blocked") return 2;
  return 1;
}

function MessageList({ messages }: { messages: UiMessage[] }) {
  if (!messages.length) return null;
  return (
    <div className="mt-3 grid gap-1.5">
      {messages.slice(0, 4).map((message) => (
        <p className={`rounded-sm border px-2 py-1 text-sm font-bold ${messageClassName(message.severity)}`} key={`${message.severity}-${message.text}`}>
          {message.text}
        </p>
      ))}
    </div>
  );
}

function messageClassName(severity: UiMessage["severity"]) {
  if (severity === "blocked") return "border-[#8d271f]/55 bg-[#fff6d7]/75 text-[#8d271f]";
  if (severity === "warning") return "border-[#b98b37]/60 bg-[#fff6d7]/75 text-[#75501f]";
  if (severity === "info") return "border-[#1f5960]/35 bg-[#fff6d7]/70 text-[#1f5960]";
  return "border-[#1f6f38]/35 bg-[#fff6d7]/70 text-[#1f6f38]";
}
