import { useState } from "react";
import { RotateCcw } from "lucide-react";
import type { Marketplace } from "@/data/types";
import { townAsset } from "@/lib/assets";
import { merchantStarterChoices } from "@/sub-domains/game/constants/merchant-profile.constant";
import type { MerchantProfile } from "@/sub-domains/game/types/merchant-profile.type";
import { Button, Panel } from "@/sub-domains/shared/components/ui";

export function NewMerchantProfileView({ market, merchantProfile, onCreate, onBack }: { market: Marketplace; merchantProfile: MerchantProfile; onCreate: (profile: MerchantProfile) => void; onBack: () => void }) {
  const [merchantName, setMerchantName] = useState(merchantProfile.name);
  const [background, setBackground] = useState(merchantProfile.background);
  const [difficulty, setDifficulty] = useState(merchantProfile.difficulty);
  const [starter, setStarter] = useState(merchantProfile.starter);
  const nextProfile = { name: merchantName.trim() || "Unnamed Merchant", background, difficulty, starter };

  return (
    <section className="profile-v6-layout ui-screen">
      <Panel className="profile-v6-hero" bodyClassName="p-0">
        <div className="profile-v6-art" style={{ backgroundImage: `url("${townAsset(market.townsquareFile)}")` }}>
          <div className="profile-v6-card">
            <span className="game-brand-kicker">New Merchant Profile</span>
            <h2>{merchantName || "Unnamed Merchant"}</h2>
            <p>Choose a starting identity. These papers now persist locally and are stamped into the next new-game ledger.</p>
          </div>
        </div>
      </Panel>
      <Panel title="Merchant Papers" bodyClassName="profile-v6-form">
        <label><span>Name</span><input value={merchantName} onChange={(event) => setMerchantName(event.target.value)} /></label>
        <label><span>Background</span><select value={background} onChange={(event) => setBackground(event.target.value)}><option>Ledger Apprentice</option><option>Dockside Trader</option><option>Traveling Peddler</option><option>Guild Castoff</option></select></label>
        <label><span>Difficulty</span><select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}><option>Standard Market</option><option>Kind Prices</option><option>Hard Bargains</option><option>Iron Ledger</option></select></label>
        <div className="profile-v6-starters">
          {merchantStarterChoices.map((choice) => <button key={choice} className={starter === choice ? "is-active" : ""} type="button" onClick={() => setStarter(choice)}>{choice}</button>)}
        </div>
        <div className="profile-v6-actions"><Button onClick={onBack}>Back</Button><Button onClick={() => onCreate(nextProfile)}><RotateCcw size={16} /> Begin Journey</Button></div>
      </Panel>
      <Panel title="Starting Terms" bodyClassName="profile-v6-summary">
        <p><strong>Merchant:</strong> {nextProfile.name}</p><p><strong>Background:</strong> {background}</p><p><strong>Difficulty:</strong> {difficulty}</p><p><strong>Starter:</strong> {starter}</p>
        <p className="text-sm text-parchment-muted">Profile values persist locally. Balance changes remain intentionally untouched.</p>
      </Panel>
    </section>
  );
}
