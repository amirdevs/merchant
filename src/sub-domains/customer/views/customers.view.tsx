import { HandCoins, Users } from "lucide-react";
import type { Character, Marketplace } from "@/data/types";
import { portraitAsset, stallAsset, townAsset } from "@/lib/assets";
import { customerIntro, customerPreference, customerPrompt, customerReply } from "@/lib/dialogue";
import { items, type GameState, visibleQuantity } from "@/lib/game";
import { money } from "@/lib/format";
import { Button, Panel } from "@/sub-domains/shared/components/ui";
import { TypewriterText } from "@/sub-domains/shared/components/text/typewriter-text.component";
import { CustomerPreferenceBoard } from "@/sub-domains/customer/components/customer-preference-board.component";

export function CustomersView({ state, market, people, character, playerOffer, characterOffer, onSelect, onTrade, onNextCustomer }: { state: GameState; market: Marketplace; people: Character[]; character: Character | null; playerOffer: number; characterOffer: number; onSelect: (character: Character) => void; onTrade: () => void; onNextCustomer: () => void }) {
  const selectedInventory = character?.inventory || [];
  const selectedVisible = selectedInventory.filter((entry) => visibleQuantity(entry) > 0);
  const selectedStockValue = selectedVisible.reduce((total, entry) => total + items[entry.itemIndex].loafValue * visibleQuantity(entry), 0);

  return (
    <section className="customers-v5-layout ui-screen" aria-label="Customers">
      <Panel className="customers-v5-board" bodyClassName="p-0" title={<span><Users size={18} /> Customer Board</span>}>
        <div className="customers-v5-market-art" style={{ backgroundImage: `url("${townAsset(market.townsquareFile)}")` }}>
          <div className="customers-v5-grid">
            {people.map((person) => (
              <button key={person.index} className={`customers-v5-token ${state.selectedCharacterIndex === person.index ? "is-active" : ""}`} type="button" onClick={() => onSelect(person)}>
                <img src={portraitAsset(person.portraitFile)} alt="" />
                <strong>{person.name}</strong>
                <span>{person.profession || "Customer"}</span>
              </button>
            ))}
          </div>
        </div>
      </Panel>

      <section className="customers-v5-dossier">
        {character ? (
          <>
            <Panel className="customers-v5-profile" bodyClassName="customers-v5-profile-body">
              <div className="customers-v5-portrait-frame"><img className="customers-v5-portrait" src={portraitAsset(character.portraitFile)} alt="" />{character.stallFile ? <img className="customers-v5-stall" src={stallAsset(character.stallFile)} alt="" /> : null}</div>
              <div className="customers-v5-profile-copy"><span className="game-brand-kicker">Customer Dossier</span><h2>{character.name}</h2><h3>{character.profession || "Market Customer"}</h3><TypewriterText className="dialogue-scroll customers-v5-dialogue" text={customerIntro(character)} /><p className="preference-text">{customerPreference(character)}</p></div>
            </Panel>
            <Panel title="Trade Position" bodyClassName="customers-v5-trade-grid"><span><small>Your Offer</small><strong>{money(playerOffer)}</strong></span><span><small>Their Offer</small><strong>{money(characterOffer)}</strong></span><span><small>Stock Value</small><strong>{money(selectedStockValue)}</strong></span><span><small>Visible Stock</small><strong>{selectedVisible.length}</strong></span></Panel>
            <Panel title="Preferences" bodyClassName="customers-v5-preferences"><CustomerPreferenceBoard character={character} /></Panel>
            <Panel title="Conversation Choices" bodyClassName="customers-v5-actions"><button type="button"><strong>{customerPrompt(character)}</strong><span>{customerReply(character)}</span></button><Button onClick={onTrade}><HandCoins size={18} /> Make Offer</Button><Button onClick={onNextCustomer}>Next Customer</Button></Panel>
          </>
        ) : (
          <Panel title="Choose a customer"><div className="game-panel-empty">Select a customer from the board to inspect their portrait, preferences, stock value, and trade position.</div></Panel>
        )}
      </section>
    </section>
  );
}
