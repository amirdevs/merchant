import { Users } from "lucide-react";
import type { Character, Marketplace } from "@/data/types";
import { portraitAsset, townAsset } from "@/lib/assets";
import { Panel } from "@/sub-domains/shared/components/ui";

export function CustomerList({ people, selectedIndex, market, onSelect }: { people: Character[]; selectedIndex: number | null; market: Marketplace; onSelect: (character: Character) => void }) {
  return (
    <Panel className="customer-board" bodyClassName="p-0" title={<span><Users size={18} /> Customers</span>}>
      <div className="customer-grid-backdrop" style={{ backgroundImage: `url("${townAsset(market.townsquareFile)}")` }}>
        <div className="customer-grid">
          {people.map((person) => (
            <button key={person.index} className={`customer-token ${selectedIndex === person.index ? "is-active" : ""}`} onClick={() => onSelect(person)}>
              <img src={portraitAsset(person.portraitFile)} alt="" />
              <span className="customer-token-name">{person.name}</span>
            </button>
          ))}
        </div>
      </div>
    </Panel>
  );
}
