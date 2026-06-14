import { Panel } from "../../../components/ui";
import { InventoryPanel } from "../../inventory/components/InventoryPanel";
import { CharacterCard } from "../../customer/components/CharacterCard";
import { CustomerList } from "../../customer/components/CustomerList";
import { MessagePanel } from "../../market/components/MessagePanel";
import { QuestPanel } from "../../market/components/QuestPanel";
import { TravelPanel } from "../../travel/components/TravelPanel";
import type { MerchantGameController } from "../../../app/hooks/useMerchantGameController";

export function TradeWorkspace({ game }: { game: MerchantGameController }) {
  const character = game.character;

  return (
    <section className="trade-workspace">
      <aside className="trade-column trade-column-left">
        {character ? (
          <>
            <InventoryPanel title={`${character.name}'s Offer`} mode="offer" inventory={character.inventory} onMove={(entry, amount) => game.moveCharacter(entry, amount, true)} onMoveAll={(entry) => game.moveCharacter(entry, "none", true)} />
            <InventoryPanel title={`${character.name}'s Stock`} inventory={character.inventory} onMove={(entry, amount) => game.moveCharacter(entry, amount)} onMoveAll={(entry) => game.moveCharacter(entry, "all")} />
          </>
        ) : (
          <Panel className="min-h-[250px]" title="Customer Inventory">
            <p className="text-parchment-muted">Select a customer to inspect their stock and build their side of the trade.</p>
          </Panel>
        )}
      </aside>

      <section className="trade-column trade-column-center">
        <CustomerList people={game.people} selectedIndex={game.state.selectedCharacterIndex} market={game.market} onSelect={game.selectCharacter} />

        {character ? (
          <CharacterCard character={character} playerOffer={game.playerOffer} characterOffer={game.characterOffer} onTrade={game.trade} onNextCustomer={game.nextCustomer} />
        ) : (
          <Panel className="min-h-[300px]" title="Choose a customer">
            <p className="leading-relaxed text-parchment-muted">Select someone in the town square, compare their preferences, then build an offer from both inventories.</p>
          </Panel>
        )}

        <MessagePanel message={game.state.message} modStatus={game.modStatus} />
        <QuestPanel market={game.market} />
        <TravelPanel market={game.market} onTravel={game.travel} />
      </section>

      <aside className="trade-column trade-column-right">
        <InventoryPanel title="Your Offer" mode="offer" inventory={game.state.playerInventory} onMove={(entry, amount) => game.movePlayer(entry, amount, true)} onMoveAll={(entry) => game.movePlayer(entry, "none", true)} />
        <InventoryPanel title="Your Inventory" inventory={game.state.playerInventory} onMove={(entry, amount) => game.movePlayer(entry, amount)} onMoveAll={(entry) => game.movePlayer(entry, "all")} onToggleProtect={game.togglePlayerProtect} allowProtect />
      </aside>
    </section>
  );
}
