import { Handshake, HelpCircle, Scale } from "lucide-react";
import type { Character, InventoryEntry } from "@/data/types";
import type { GameState } from "@/lib/game";
import type { MoveAmount } from "@/lib/inventory";
import { portraitAsset } from "@/lib/assets";
import { money } from "@/lib/format";
import { uiAssets } from "@/lib/ui-assets";
import { InventoryPanel } from "@/components/InventoryPanel";
import { Button, Panel, ScreenFrame, StatChip } from "@/components/ui";

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
  const advantage = playerOffer - characterOffer;

  return (
    <ScreenFrame title="Barter / Conversation" eyebrow="Main Screen" backdrop={uiAssets.backplates.tradeConversation} overlay="medium">
      <div className="grid flex-1 gap-4 xl:grid-cols-[330px_1fr_330px]">
        <div className="grid gap-4">
          <InventoryPanel title="NPC Offer" mode="offer" variant="compact" panelVariant="wood" inventory={character?.inventory || []} onMove={(entry, amount) => onMoveCharacter(entry, amount, true)} onMoveAll={(entry) => onMoveCharacter(entry, "none", true)} />
          <InventoryPanel title="NPC Stock" variant="compact" panelVariant="wood" inventory={character?.inventory || []} onMove={(entry, amount) => onMoveCharacter(entry, amount)} onMoveAll={(entry) => onMoveCharacter(entry, "all")} />
        </div>

        <Panel title="Conversation" variant="parchment">
          {character ? (
            <div>
              <div className="grid gap-4 lg:grid-cols-[minmax(180px,0.8fr)_1fr]">
                <div>
                  <div
                    className="mx-auto grid aspect-[4/5] max-h-80 place-items-center overflow-hidden rounded-md border border-[#9a7138]/70 bg-[#f2ddb1] p-2 text-[#26170a] shadow-xl shadow-[#6c4418]/25"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(255,246,217,.10), rgba(0,0,0,.08)), url("${uiAssets.town.portraitFrameSelected}")`,
                      backgroundSize: "100% 100%",
                    }}
                  >
                    {character.portraitFile ? <img className="h-full w-full rounded object-cover" src={portraitAsset(character.portraitFile)} alt="" /> : null}
                  </div>
                </div>
                <div>
                  <h1 className="text-center font-display text-3xl text-[#26170a] lg:text-left">{character.name}</h1>
                  <p className="text-center font-bold text-[#75501f] lg:text-left">{character.profession}</p>
                  <dl className="mt-3 grid grid-cols-3 gap-2">
                    <StatChip label="Mood" value="Open" icon={uiAssets.town.moodPositive} />
                    <StatChip label="Trust" value="New" icon={uiAssets.town.relationshipBadge} />
                    <StatChip label="Interest" value="Fair" icon={uiAssets.town.tradeStyleBadge} />
                  </dl>
                  <p className="mt-3 rounded-md border border-[#9a7138]/60 bg-[#fff6d7]/55 p-3 text-sm text-[#3b260f] shadow-inner shadow-[#6c4418]/15">{message}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2"><Button subtle>Ask Price</Button><Button subtle>Ask Offer</Button><Button subtle>Response</Button></div>
              <div
                className="mt-4 rounded-md border border-[#9a7138]/60 p-3 text-[#3b260f] shadow-inner shadow-[#6c4418]/20"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.16), rgba(0,0,0,.06)), url("${uiAssets.inventory.valueBalancePanel}")`,
                  backgroundSize: "100% 100%",
                }}
              >
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
                  <div><span className="block text-sm text-[#75501f]">Their Offer Value</span><strong className="font-display text-2xl">{money(characterOffer)}</strong></div>
                  <img className="h-14 w-14 object-contain drop-shadow" src={uiAssets.hud.weight} alt="" />
                  <div><span className="block text-sm text-[#75501f]">Your Offer Value</span><strong className="font-display text-2xl">{money(playerOffer)}</strong></div>
                </div>
                <div className="mt-3 h-3 rounded-full border border-[#7f5b2a]/55 bg-[#7f5b2a]/35">
                  <span className="block h-full w-1/2 rounded-full bg-gradient-to-r from-[#1f5960] via-[#d5a641] to-[#8d271f]" />
                </div>
                <div className="mt-1 text-center text-sm">Your Advantage <strong className={advantage >= 0 ? "text-[#1f6f38]" : "text-[#8d271f]"}>{advantage >= 0 ? "+" : ""}{money(advantage)}</strong></div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2"><Button onClick={onTrade}><Handshake size={16} /> Make Offer</Button><Button subtle>Clear Offer</Button><Button subtle>Next Customer</Button><Button subtle>Goodbye</Button><Button subtle><HelpCircle size={16} /> Help</Button></div>
            </div>
          ) : <p className="text-[#725331]">Choose a customer first.</p>}
        </Panel>

        <div className="grid gap-4">
          <InventoryPanel title="Your Offer" mode="offer" variant="compact" panelVariant="wood" inventory={state.playerInventory} onMove={(entry, amount) => onMovePlayer(entry, amount, true)} onMoveAll={(entry) => onMovePlayer(entry, "none", true)} />
          <InventoryPanel title="Your Inventory" variant="compact" panelVariant="wood" inventory={state.playerInventory} onMove={(entry, amount) => onMovePlayer(entry, amount)} onMoveAll={(entry) => onMovePlayer(entry, "all")} onToggleProtect={onTogglePlayerProtect} allowProtect />
          <Panel title={<span className="inline-flex items-center gap-2"><Scale size={18} /> Preferences</span>} variant="wood" dense><p className="text-sm text-[#ead7a8]">Likes, dislikes, missing value, and acceptance hints stay close to both offer panels.</p></Panel>
        </div>
      </div>
    </ScreenFrame>
  );
}
