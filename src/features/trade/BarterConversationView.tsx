import { Handshake, HelpCircle, Scale } from "lucide-react";
import type { Character, InventoryEntry } from "@/data/types";
import type { GameState } from "@/lib/game";
import type { MoveAmount } from "@/lib/inventory";
import { portraitAsset } from "@/lib/assets";
import { money } from "@/lib/format";
import { InventoryPanel } from "@/components/InventoryPanel";
import { Button, Panel } from "@/components/ui";

type BarterConversationViewProps = {
  state: GameState;
  character: Character | null;
  playerOffer: number;
  characterOffer: number;
  message: string;
  onMovePlayer: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  onMoveCharacter: (entry: InventoryEntry, amount: MoveAmount, isOfferPanel?: boolean) => void;
  onTogglePlayerProtect: (entry: InventoryEntry) => void;
  onTrade: () => void;
};

export function BarterConversationView({ state, character, playerOffer, characterOffer, message, onMovePlayer, onMoveCharacter, onTogglePlayerProtect, onTrade }: BarterConversationViewProps) {
  return (
    <section className="grid w-full gap-4 rounded-3xl border-2 border-brass/60 bg-panel/90 p-5 shadow-2xl shadow-black/50 xl:grid-cols-[360px_1fr_360px]">
      <div className="grid gap-4">
        <InventoryPanel title="NPC Offer" mode="offer" variant="compact" inventory={character?.inventory || []} onMove={(entry, amount) => onMoveCharacter(entry, amount, true)} onMoveAll={(entry) => onMoveCharacter(entry, "none", true)} />
        <InventoryPanel title="NPC Stock" inventory={character?.inventory || []} onMove={(entry, amount) => onMoveCharacter(entry, amount)} onMoveAll={(entry) => onMoveCharacter(entry, "all")} />
      </div>

      <Panel title="Conversation">
        {character ? (
          <div>
            <div className="mx-auto grid h-44 w-44 place-items-center overflow-hidden rounded-3xl border border-brass-soft bg-parchment/90 text-ink">{character.portraitFile ? <img className="h-full w-full object-cover" src={portraitAsset(character.portraitFile)} alt="" /> : null}</div>
            <h1 className="mt-4 font-display text-3xl">{character.name}</h1>
            <p className="text-brass">{character.profession}</p>
            <dl className="mt-3 grid grid-cols-3 gap-2 text-center text-xs"><Mood label="Mood" value="Open" /><Mood label="Trust" value="New" /><Mood label="Interest" value="Fair" /></dl>
            <p className="mt-3 rounded-xl border border-brass-soft/60 bg-black/25 p-3 text-sm text-parchment-muted">{message}</p>
            <div className="mt-3 grid grid-cols-3 gap-2"><Button subtle>Ask Price</Button><Button subtle>Ask Offer</Button><Button subtle>Response</Button></div>
            <div className="mt-4 rounded-xl border border-brass-soft/60 bg-black/25 p-3">
              <div className="flex items-center justify-between"><span>Your value</span><strong>{money(playerOffer)}</strong></div>
              <div className="flex items-center justify-between"><span>Their value</span><strong>{money(characterOffer)}</strong></div>
              <div className="mt-2 h-2 rounded-full bg-black/40"><span className="block h-2 w-1/2 rounded-full bg-brass" /></div>
              <p className="mt-2 text-xs text-parchment-muted">Fairness / missing value indicator and preference notes.</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2"><Button onClick={onTrade}><Handshake size={16} /> Make Offer</Button><Button subtle>Clear Offer</Button><Button subtle>Next Customer</Button><Button subtle>Goodbye</Button><Button subtle><HelpCircle size={16} /> Help</Button></div>
          </div>
        ) : <p className="text-parchment-muted">Choose a customer first.</p>}
      </Panel>

      <div className="grid gap-4">
        <InventoryPanel title="Your Offer" mode="offer" variant="compact" inventory={state.playerInventory} onMove={(entry, amount) => onMovePlayer(entry, amount, true)} onMoveAll={(entry) => onMovePlayer(entry, "none", true)} />
        <InventoryPanel title="Your Inventory" inventory={state.playerInventory} onMove={(entry, amount) => onMovePlayer(entry, amount)} onMoveAll={(entry) => onMovePlayer(entry, "all")} onToggleProtect={onTogglePlayerProtect} allowProtect />
        <Panel title={<span className="inline-flex items-center gap-2"><Scale size={18} /> Preferences</span>}><p className="text-sm text-parchment-muted">Likes, dislikes, missing value, and acceptance hints stay close to both offer panels.</p></Panel>
      </div>
    </section>
  );
}

function Mood({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-brass-soft/60 bg-black/25 p-2"><dt className="text-brass">{label}</dt><dd>{value}</dd></div>; }
