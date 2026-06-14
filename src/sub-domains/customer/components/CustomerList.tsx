import { Users } from "lucide-react";
import type { Character } from "../../../data/types";
import type { currentMarket } from "../../../lib/game";
import { portraitAsset, townAsset } from "../../../lib/assets";
import { Panel } from "../../../components/ui";

export function CustomerList({
  people,
  selectedIndex,
  market,
  onSelect,
}: {
  people: Character[];
  selectedIndex: number | null;
  market: ReturnType<typeof currentMarket>;
  onSelect: (character: Character) => void;
}) {
  return (
    <Panel className="customer-board" title={null}>
      <div className="customer-board-header">
        <h2><Users size={18} /> Customers</h2>
      </div>
      <div className="customer-board-town" style={{ backgroundImage: `url("${townAsset(market.townsquareFile)}")` }}>
        <div className="customer-board-grid">
          {people.map((person) => (
            <button
              key={person.index}
              className={selectedIndex === person.index ? "customer-token customer-token-selected" : "customer-token"}
              onClick={() => onSelect(person)}
            >
              <img src={portraitAsset(person.portraitFile)} alt="" />
              <span>{person.name}</span>
            </button>
          ))}
        </div>
      </div>
    </Panel>
  );
}
