import { HandCoins } from "lucide-react";
import type { Character } from "@/data/types";
import { portraitAsset, stallAsset } from "@/lib/assets";
import { customerIntro, customerPreference, customerPrompt, customerReply } from "@/lib/dialogue";
import { money } from "@/lib/format";
import { Button } from "@/components/ui";
import { TypewriterText } from "@/components/TypewriterText";

export function CharacterCard({
  character,
  playerOffer,
  characterOffer,
  onTrade,
  onNextCustomer,
}: {
  character: Character;
  playerOffer: number;
  characterOffer: number;
  onTrade: () => void;
  onNextCustomer: () => void;
}) {
  const likes = character.bias?.filter((bias) => bias.percent > 0).slice(0, 5) || [];
  const dislikes = character.bias?.filter((bias) => bias.percent < 0).slice(0, 4) || [];
  const difference = Math.round(playerOffer - characterOffer);
  const offerStatus = difference >= 0 ? `Ahead by ${money(difference)}` : `Missing ${money(Math.abs(difference))}`;

  return (
    <div className="grid min-h-[360px] grid-cols-[35%_65%] border-2 border-brass-soft bg-panel/90 shadow-2xl max-[760px]:grid-cols-1">
      <div className="relative min-h-[260px] overflow-hidden bg-panel-soft">
        <img className="h-full w-full object-cover" src={portraitAsset(character.portraitFile)} alt="" />
        {character.stallFile ? <img className="absolute bottom-3 left-3 h-14 w-14 border border-brass bg-black/45 object-contain" src={stallAsset(character.stallFile)} alt="" /> : null}
      </div>
      <div className="p-4">
        <h2 className="font-display text-2xl">{character.name}</h2>
        <h3 className="mt-1 font-display text-sm text-brass">{character.profession || "Customer"}</h3>
        <TypewriterText className="mt-4 max-h-28 overflow-auto leading-relaxed" text={customerIntro(character)} />
        <p className="mt-3 max-h-24 overflow-auto leading-relaxed text-parchment-muted">{customerPreference(character)}</p>
        <div className="mt-3 border border-brass/35 bg-black/20 p-2 text-sm">
          <strong className="block text-brass">{customerPrompt(character)}</strong>
          <span className="mt-1 block text-parchment-muted">{customerReply(character)}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {likes.map((bias) => <span className="border border-brass/60 bg-white/5 px-2 py-1 text-good" key={bias.tag}>{bias.tag} +{bias.percent}%</span>)}
          {dislikes.map((bias) => <span className="border border-brass/60 bg-white/5 px-2 py-1 text-bad" key={bias.tag}>{bias.tag} {bias.percent}%</span>)}
        </div>
        <div className="mt-4 flex justify-between gap-2 border border-brass/45 bg-black/30 p-3">
          <span>Your offer: {money(playerOffer)}</span>
          <span>Their offer: {money(characterOffer)}</span>
        </div>
        <div className={`mt-2 border border-brass/35 bg-black/20 p-2 text-sm ${difference >= 0 ? "text-good" : "text-bad"}`}>
          {offerStatus}
        </div>
        <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
          <Button className="font-bold" onClick={onTrade}>
            <HandCoins size={18} /> Make Offer
          </Button>
          <Button onClick={onNextCustomer}>Next Customer</Button>
        </div>
      </div>
    </div>
  );
}
