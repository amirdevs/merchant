import { InventoryPanel } from "@/components/InventoryPanel";
import { Panel } from "@/components/ui";
import type { MerchantController } from "@/app/types/MerchantController";
import { CustomerList } from "@/features/customers/components/CustomerList";
import { CharacterCard } from "@/features/customers/components/CharacterCard";
import { MarketNotes } from "@/features/market/components/MarketNotes";
import { TravelPanel } from "@/features/travel/components/TravelPanel";
import { MessageLog } from "@/features/session/components/MessageLog";

export function TradeWorkspace({ controller }: { controller: MerchantController }) {
  const { state, people, character, playerOffer, characterOffer, market, modStatus, actions } = controller;

  return (
    <section className="relative z-10 mt-3 grid min-h-[720px] grid-cols-[30%_40%_30%] gap-3 max-[1180px]:grid-cols-1">
      <aside className="grid min-w-0 content-start gap-3">
        {character ? (
          <>
            <InventoryPanel
              title={`${character.name}'s Offer`}
              owner="character"
              mode="offer"
              inventory={character.inventory}
              onMove={(entry, amount) => actions.moveCharacter(entry, amount, true)}
              onMoveAll={(entry) => actions.moveCharacter(entry, "none", true)}
            />
            <InventoryPanel
              title={`${character.name}'s Stock`}
              owner="character"
              inventory={character.inventory}
              onMove={(entry, amount) => actions.moveCharacter(entry, amount)}
              onMoveAll={(entry) => actions.moveCharacter(entry, "all")}
            />
          </>
        ) : (
          <Panel className="min-h-[250px]" title="Customer Inventory">
            <p className="text-parchment-muted">Select a customer to inspect their stock and build their side of the trade.</p>
          </Panel>
        )}
      </aside>

      <section className="grid min-w-0 content-start gap-3">
        <CustomerList people={people} selectedIndex={state.selectedCharacterIndex} market={market} onSelect={actions.selectCharacter} />

        {character ? (
          <CharacterCard
            character={character}
            playerOffer={playerOffer}
            characterOffer={characterOffer}
            onTrade={actions.trade}
            onNextCustomer={actions.nextCustomer}
          />
        ) : (
          <Panel className="min-h-[300px]" title="Choose a customer">
            <p className="leading-relaxed text-parchment-muted">Select someone in the town square, compare their preferences, then build an offer from both inventories.</p>
          </Panel>
        )}

        <MessageLog message={state.message} modStatus={modStatus} />
        <MarketNotes market={market} />
        <TravelPanel market={market} onTravel={actions.travel} />
      </section>

      <aside className="grid min-w-0 content-start gap-3">
        <InventoryPanel
          title="Your Offer"
          owner="player"
          mode="offer"
          inventory={state.playerInventory}
          onMove={(entry, amount) => actions.movePlayer(entry, amount, true)}
          onMoveAll={(entry) => actions.movePlayer(entry, "none", true)}
        />
        <InventoryPanel
          title="Your Inventory"
          owner="player"
          inventory={state.playerInventory}
          onMove={(entry, amount) => actions.movePlayer(entry, amount)}
          onMoveAll={(entry) => actions.movePlayer(entry, "all")}
          onToggleProtect={actions.togglePlayerProtect}
          allowProtect
        />
      </aside>
    </section>
  );
}
