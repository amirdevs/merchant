import { HandCoins } from "lucide-react";
import type { Character, InventoryEntry, Marketplace } from "@/data/types";
import { portraitAsset, stallAsset } from "@/lib/assets";
import { customerIntro, customerPreference, customerPrompt, customerReply } from "@/lib/dialogue";
import type { GameState } from "@/lib/game";
import { money } from "@/lib/format";
import type { MoveAmount } from "@/lib/inventory";
import { Button, Panel } from "@/sub-domains/shared/components/ui";
import { TypewriterText } from "@/sub-domains/shared/components/text/typewriter-text.component";
import { InventoryPanel } from "@/sub-domains/inventory/components";
import { CustomerList } from "@/sub-domains/customer/components/customer-list.component";

export function BarterConversationView({
  state,
  market,
  people,
  character,
  playerOffer,
  characterOffer,
  modStatus,
  onMovePlayer,
  onMoveCharacter,
  onTogglePlayerProtect,
  onSelectCustomer,
  onNextCustomer,
  onTrade,
}: {
  state: GameState;
  market: Marketplace;
  people: Character[];
  character: Character | null;
  playerOffer: number;
  characterOffer: number;
  modStatus: string;
  onMovePlayer: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  onMoveCharacter: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  onTogglePlayerProtect: (entry: InventoryEntry) => void;
  onSelectCustomer: (character: Character) => void;
  onNextCustomer: () => void;
  onTrade: () => void;
}) {
  if (!character) {
    return (
      <section className="barter-v3-empty ui-screen">
        <Panel title="Choose a customer"><div className="barter-empty-copy"><strong>No customer is seated at the table.</strong><span>Select a customer from the board to open the full barter conversation layout.</span></div></Panel>
        <CustomerList people={people} selectedIndex={state.selectedCharacterIndex} market={market} onSelect={onSelectCustomer} />
      </section>
    );
  }

  const likes = character.bias?.filter((bias) => bias.percent > 0).slice(0, 4) || [];
  const dislikes = character.bias?.filter((bias) => bias.percent < 0).slice(0, 3) || [];
  const difference = Math.round(playerOffer - characterOffer);
  const totalReference = Math.max(1, Math.max(playerOffer, characterOffer));
  const balancePercent = Math.max(6, Math.min(94, 50 + (difference / totalReference) * 42));
  const offerStatus = difference >= 0 ? `Favorable by ${money(difference)}` : `Short by ${money(Math.abs(difference))}`;

  return (
    <section className="barter-v3-layout ui-screen" aria-label="Barter conversation">
      <aside className="barter-v3-side barter-v3-side-left">
        <div className="barter-v3-side-ribbon"><span>Customer Table</span><strong>{character.name}</strong></div>
        <InventoryPanel title={`${character.name}'s Offer`} mode="offer" inventory={character.inventory} onMove={(entry, amount) => onMoveCharacter(entry, amount, true)} onMoveAll={(entry) => onMoveCharacter(entry, "none", true)} />
        <InventoryPanel title={`${character.name}'s Stock`} inventory={character.inventory} onMove={(entry, amount) => onMoveCharacter(entry, amount)} onMoveAll={(entry) => onMoveCharacter(entry, "all")} />
      </aside>

      <section className="barter-v3-center">
        <Panel className="barter-v3-focus-panel" bodyClassName="barter-v3-focus-body">
          <div className="barter-v3-scene">
            <div className="barter-v3-portrait-stage">
              <img className="barter-v3-portrait" src={portraitAsset(character.portraitFile)} alt="" />
              {character.stallFile ? <img className="barter-v3-stall" src={stallAsset(character.stallFile)} alt="" /> : null}
              <div className="barter-v3-nameplate"><strong>{character.name}</strong><span>{character.profession || "Customer"}</span></div>
            </div>
            <div className="barter-v3-dialogue-card">
              <div className="barter-v3-dialogue-head"><span>Conversation</span><strong>{customerPrompt(character)}</strong></div>
              <TypewriterText className="barter-v3-dialogue-text" text={customerIntro(character)} />
              <p className="barter-v3-preference">{customerPreference(character)}</p>
              <div className="barter-v3-reply">{customerReply(character)}</div>
            </div>
          </div>

          <div className="barter-v3-value-board">
            <div className="barter-v3-value-card"><small>Your offer</small><strong>{money(playerOffer)}</strong></div>
            <div className="barter-v3-balance"><div className="barter-v3-balance-track"><span className="barter-v3-balance-fill" style={{ width: `${balancePercent}%` }} /><span className="barter-v3-balance-mid" /></div><strong className={difference >= 0 ? "good" : "bad"}>{offerStatus}</strong></div>
            <div className="barter-v3-value-card"><small>Their offer</small><strong>{money(characterOffer)}</strong></div>
          </div>

          <div className="barter-v3-bias-row">{[...likes, ...dislikes].map((bias) => <span className={`bias-tag ${bias.percent > 0 ? "like" : "dislike"}`} key={`${bias.tag}-${bias.percent}`}>{bias.tag} {bias.percent > 0 ? "+" : ""}{bias.percent}%</span>)}</div>
          <div className="barter-v3-choice-grid"><button type="button"><strong>Ask Price</strong><span>Read their value bias.</span></button><button type="button"><strong>Sweeten Deal</strong><span>Add goods from inventory.</span></button><button type="button"><strong>Remove Goods</strong><span>Pull back from your offer.</span></button><button type="button"><strong>Watch Mood</strong><span>Compare likes and dislikes.</span></button></div>
          <div className="barter-v3-action-row"><Button className="barter-v3-primary-action" onClick={onTrade}><HandCoins size={18} /> Make Offer</Button><Button onClick={onNextCustomer}>Next Customer</Button></div>
        </Panel>

        <Panel className="barter-v3-ledger-panel" bodyClassName="message-ledger"><p>{state.message}</p><p className="mt-2 text-sm text-parchment-muted">{modStatus}</p></Panel>
        <CustomerList people={people.slice(0, 8)} selectedIndex={state.selectedCharacterIndex} market={market} onSelect={onSelectCustomer} />
      </section>

      <aside className="barter-v3-side barter-v3-side-right">
        <div className="barter-v3-side-ribbon player"><span>Your Ledger</span><strong>Merchant Pack</strong></div>
        <InventoryPanel title="Your Offer" mode="offer" inventory={state.playerInventory} onMove={(entry, amount) => onMovePlayer(entry, amount, true)} onMoveAll={(entry) => onMovePlayer(entry, "none", true)} />
        <InventoryPanel title="Your Inventory" inventory={state.playerInventory} onMove={(entry, amount) => onMovePlayer(entry, amount)} onMoveAll={(entry) => onMovePlayer(entry, "all")} onToggleProtect={onTogglePlayerProtect} allowProtect />
      </aside>
    </section>
  );
}
