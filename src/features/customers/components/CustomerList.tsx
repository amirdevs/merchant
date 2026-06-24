import { Users } from "lucide-react";
import type { Character, Marketplace } from "@/data/types";
import { characterPortraitAssetForCharacter, characterProfileView } from "@/data/characters/characterPortraitManifest";
import { townAsset } from "@/lib/assets";
import { Panel } from "@/components/ui";

export function CustomerList({
  people,
  selectedIndex,
  market,
  onSelect,
}: {
  people: Character[];
  selectedIndex: number | null;
  market: Marketplace;
  onSelect: (character: Character) => void;
}) {
  return (
    <Panel className="bg-cover bg-center p-0" title={null}>
      <div className="border-b border-brass/45 bg-panel/90 p-3">
        <h2 className="flex items-center gap-2 font-display text-lg">
          <Users size={18} /> Customers
        </h2>
      </div>
      <div className="bg-cover bg-center" style={{ backgroundImage: `url("${townAsset(market.townsquareFile)}")` }}>
        <div className="grid max-h-[230px] grid-cols-3 content-start gap-2 overflow-auto bg-gradient-to-b from-black/10 to-black/65 p-2 max-[760px]:grid-cols-2">
          {people.map((person) => {
            const portraitSrc = characterPortraitAssetForCharacter(person);
            const view = characterProfileView(person);
            return (
              <button
                key={person.index}
                className={`grid min-h-14 grid-cols-[42px_1fr] items-center gap-2 border text-left text-sm text-parchment ${
                  selectedIndex === person.index ? "border-brass bg-ember/90" : "border-brass/50 bg-panel/85 hover:bg-ember/70"
                }`}
                onClick={() => onSelect(person)}
              >
                {portraitSrc ? (
                  <img className="h-[42px] w-[42px] object-cover" src={portraitSrc} alt="" />
                ) : (
                  <span className="grid h-[42px] w-[42px] place-items-center bg-black/25 text-xs text-parchment-muted">NPC</span>
                )}
                <span className="truncate">{view.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}
