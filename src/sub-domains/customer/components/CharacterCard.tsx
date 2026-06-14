import { HandCoins } from "lucide-react";
import type { Character } from "../../../data/types";
import { portraitAsset, stallAsset } from "../../../lib/assets";
import { customerIntro, customerPreference, customerPrompt, customerReply } from "../../../lib/dialogue";
import { money } from "../../../lib/format";
import { Button, FrameSurface, StatBadge } from "../../../components/ui";
import { TypewriterText } from "../../../components/TypewriterText";

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
    <FrameSurface className="character-card" variant="wood">
      <div className="character-portrait-frame">
        <img className="character-portrait" src={portraitAsset(character.portraitFile)} alt="" />
        {character.stallFile ? <img className="character-stall-badge" src={stallAsset(character.stallFile)} alt="" /> : null}
      </div>

      <div className="character-dossier">
        <p className="character-kicker">Trading With</p>
        <h2>{character.name}</h2>
        <h3>{character.profession || "Customer"}</h3>
        <TypewriterText className="character-dialogue" text={customerIntro(character)} />
        <p className="character-preference">{customerPreference(character)}</p>
        <div className="character-prompt">
          <strong>{customerPrompt(character)}</strong>
          <span>{customerReply(character)}</span>
        </div>
        <div className="bias-chip-row">
          {likes.map((bias) => <span className="bias-chip bias-chip-good" key={bias.tag}>{bias.tag} +{bias.percent}%</span>)}
          {dislikes.map((bias) => <span className="bias-chip bias-chip-bad" key={bias.tag}>{bias.tag} {bias.percent}%</span>)}
        </div>
        <div className="offer-ledger">
          <StatBadge label="Your offer" value={money(playerOffer)} />
          <StatBadge label="Their offer" value={money(characterOffer)} />
        </div>
        <div className={difference >= 0 ? "offer-status offer-status-good" : "offer-status offer-status-bad"}>{offerStatus}</div>
        <div className="character-actions">
          <Button className="font-bold" onClick={onTrade}><HandCoins size={18} /> Make Offer</Button>
          <Button subtle onClick={onNextCustomer}>Next Customer</Button>
        </div>
      </div>
    </FrameSurface>
  );
}
