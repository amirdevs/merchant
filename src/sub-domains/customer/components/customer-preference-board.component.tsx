import { Star } from "lucide-react";
import type { Character } from "@/data/types";

export function CustomerPreferenceBoard({ character }: { character: Character }) {
  const likes = character.bias?.filter((bias) => bias.percent > 0).slice(0, 6) || [];
  const dislikes = character.bias?.filter((bias) => bias.percent < 0).slice(0, 6) || [];
  return (
    <div className="customers-v5-bias-columns">
      <div>
        <strong><Star size={15} /> Likes</strong>
        {likes.length ? likes.map((bias) => <span className="bias-tag like" key={bias.tag}>{bias.tag} +{bias.percent}%</span>) : <small>No clear likes listed.</small>}
      </div>
      <div>
        <strong><Star size={15} /> Avoids</strong>
        {dislikes.length ? dislikes.map((bias) => <span className="bias-tag dislike" key={bias.tag}>{bias.tag} {bias.percent}%</span>) : <small>No clear dislikes listed.</small>}
      </div>
    </div>
  );
}
