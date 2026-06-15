import { useState, type ReactNode } from "react";
import { CheckCircle2, RotateCcw } from "lucide-react";
import type { Marketplace } from "@/data/types";
import { townAsset } from "@/lib/assets";
import type { MerchantProfile } from "@/app/types";
import { Button, Panel } from "@/components/ui";

const starterChoices = ["Balanced Pack", "Food Trader", "Textile Runner", "Curio Dealer", "Hard Bargain Kit"];

export function NewMerchantProfileView({ market, merchantProfile, onCreate, onBack }: { market: Marketplace; merchantProfile: MerchantProfile; onCreate: (profile: MerchantProfile) => void; onBack: () => void }) {
  const [merchantName, setMerchantName] = useState(merchantProfile.name);
  const [background, setBackground] = useState(merchantProfile.background);
  const [difficulty, setDifficulty] = useState(merchantProfile.difficulty);
  const [starter, setStarter] = useState(merchantProfile.starter);
  const isValid = merchantName.trim().length >= 2;
  const nextProfile = { name: merchantName.trim() || "Unnamed Merchant", background, difficulty, starter };

  return (
    <section className="w-full rounded-3xl border-2 border-brass/60 bg-panel/90 p-5 shadow-2xl shadow-black/50 backdrop-blur-[1px]">
      <header className="mb-5 flex items-center justify-between gap-4 border-b border-brass-soft/60 pb-4">
        <div><span className="text-[0.7rem] uppercase tracking-[0.3em] text-brass">New Game</span><h1 className="font-display text-4xl">Merchant Registration</h1></div>
        <Button subtle onClick={onBack}>Back</Button>
      </header>
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Panel title="Merchant Papers">
          <div className="grid gap-4">
            <Field label="Name"><input className="w-full rounded-lg border border-brass-soft bg-ink/70 px-3 py-2 text-parchment outline-none focus:border-brass" value={merchantName} onChange={(event) => setMerchantName(event.target.value)} placeholder="Merchant name" aria-invalid={!isValid} /></Field>
            {!isValid ? <p className="rounded-lg border border-red-800 bg-red-950/40 p-2 text-sm text-red-100">Name must be at least 2 characters.</p> : null}
            <Field label="Hometown"><select className="w-full rounded-lg border border-brass-soft bg-ink/70 px-3 py-2 text-parchment"><option>{market.name}</option><option>Westgate</option><option>Highroad Camp</option><option>Coastal Ward</option></select></Field>
            <Field label="Background"><select className="w-full rounded-lg border border-brass-soft bg-ink/70 px-3 py-2 text-parchment" value={background} onChange={(event) => setBackground(event.target.value)}><option>Ledger Apprentice</option><option>Dockside Trader</option><option>Traveling Peddler</option><option>Guild Castoff</option></select></Field>
            <Field label="Economy Preset"><select className="w-full rounded-lg border border-brass-soft bg-ink/70 px-3 py-2 text-parchment" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}><option>Standard Market</option><option>Kind Prices</option><option>Hard Bargains</option><option>Iron Ledger</option></select></Field>
            <div className="flex items-center justify-between rounded-xl border border-brass-soft/60 bg-black/25 p-3"><span>Hard Mode</span><strong className="text-sm text-brass">Locked until route mastery</strong></div>
            <div className="flex justify-end gap-2"><Button subtle onClick={onBack}>Cancel</Button><Button disabled={!isValid} onClick={() => onCreate(nextProfile)}><RotateCcw size={16} /> Begin Journey</Button></div>
          </div>
        </Panel>
        <Panel title="Starting Preview">
          <div className="mb-4 grid min-h-52 place-items-end overflow-hidden rounded-2xl border border-brass-soft/70 bg-cover bg-center p-4" style={{ backgroundImage: `linear-gradient(0deg, rgba(15,9,5,.9), rgba(15,9,5,.18)), url(\"${townAsset(market.townsquareFile)}\")` }}><span className="rounded-full border border-brass bg-panel/90 px-4 py-2 font-display text-xl">{market.name}</span></div>
          <div className="grid gap-2 sm:grid-cols-2">
            {starterChoices.map((choice) => <button key={choice} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left transition ${starter === choice ? "border-brass bg-ember" : "border-brass-soft/60 bg-black/25 hover:border-brass"}`} type="button" onClick={() => setStarter(choice)}><CheckCircle2 size={15} /> {choice}</button>)}
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-2 text-center"><Preview label="Difficulty" value={difficulty} /><Preview label="Origin" value={background} /><Preview label="Starter" value={starter} /></dl>
        </Panel>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) { return <label className="grid gap-1 text-sm text-parchment-muted"><span className="text-brass">{label}</span>{children}</label>; }
function Preview({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-brass-soft/60 bg-black/25 p-3"><dt className="text-[0.62rem] uppercase tracking-[0.16em] text-brass">{label}</dt><dd className="mt-1 truncate text-sm">{value}</dd></div>; }
