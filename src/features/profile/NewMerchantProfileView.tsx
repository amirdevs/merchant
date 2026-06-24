import { useState, type ReactNode } from "react";
import { CheckCircle2, RotateCcw } from "lucide-react";
import type { Marketplace } from "@/shared/types/game-data";
import type { MerchantProfile } from "@/app/types";
import { Button, Panel, ScreenFrame, StatChip } from "@/shared/components/ui";
import { uiAssets } from "@/shared/utils/ui-assets";

const starterChoices = ["Balanced Pack", "Food Trader", "Textile Runner", "Curio Dealer", "Hard Bargain Kit"];

export function NewMerchantProfileView({ market, merchantProfile, onCreate, onBack }: { market: Marketplace; merchantProfile: MerchantProfile; onCreate: (profile: MerchantProfile) => void; onBack: () => void }) {
  const [merchantName, setMerchantName] = useState(merchantProfile.name);
  const [background, setBackground] = useState(merchantProfile.background);
  const [difficulty, setDifficulty] = useState(merchantProfile.difficulty);
  const [starter, setStarter] = useState(merchantProfile.starter);
  const isValid = merchantName.trim().length >= 2;
  const nextProfile = { name: merchantName.trim() || "Unnamed Merchant", background, difficulty, starter };

  return (
    <ScreenFrame title="New Merchant Profile" eyebrow="Merchant Registration" backdrop={uiAssets.backplates.marketTown} overlay="light">
      <div className="grid flex-1 gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <Panel title="Merchant Papers" variant="parchment">
          <div className="grid gap-4">
            <Field label="Merchant Name">
              <input className="w-full rounded-md border border-[#9a7138]/70 bg-[#fff8df]/80 px-3 py-2 text-[#26170a] outline-none focus:border-[#1f5960]" value={merchantName} onChange={(event) => setMerchantName(event.target.value)} placeholder="Merchant name" aria-invalid={!isValid} />
            </Field>
            {!isValid ? <p className="rounded-md border border-red-800 bg-red-950/20 p-2 text-sm text-red-900">Name must be at least 2 characters.</p> : null}
            <Field label="Hometown">
              <select className="w-full rounded-md border border-[#9a7138]/70 bg-[#fff8df]/80 px-3 py-2 text-[#26170a]">
                <option>{market.name}</option>
                <option>Westgate</option>
                <option>Highroad Camp</option>
                <option>Coastal Ward</option>
              </select>
            </Field>
            <Field label="Background">
              <select className="w-full rounded-md border border-[#9a7138]/70 bg-[#fff8df]/80 px-3 py-2 text-[#26170a]" value={background} onChange={(event) => setBackground(event.target.value)}>
                <option>Ledger Apprentice</option>
                <option>Dockside Trader</option>
                <option>Traveling Peddler</option>
                <option>Guild Castoff</option>
              </select>
            </Field>
            <Field label="Economy Preset">
              <select className="w-full rounded-md border border-[#9a7138]/70 bg-[#fff8df]/80 px-3 py-2 text-[#26170a]" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
                <option>Standard Market</option>
                <option>Kind Prices</option>
                <option>Hard Bargains</option>
                <option>Iron Ledger</option>
              </select>
            </Field>
            <div className="flex items-center justify-between rounded-md border border-[#9a7138]/55 bg-[#fff6d7]/45 p-3">
              <span>Hard Mode</span>
              <strong className="text-sm text-[#75501f]">Off</strong>
            </div>
            <div className="flex justify-end gap-2">
              <Button subtle onClick={onBack}>Cancel</Button>
              <Button disabled={!isValid} onClick={() => onCreate(nextProfile)}><RotateCcw size={16} /> Begin Journey</Button>
            </div>
          </div>
        </Panel>

        <Panel title="Starting Preview" variant="parchment">
          <div className="mb-4 grid min-h-64 place-items-end overflow-hidden rounded-md border border-[#9a7138]/70 bg-cover bg-center p-4" style={{ backgroundImage: `linear-gradient(0deg, rgba(24,13,5,.78), rgba(255,246,217,.08)), url("${uiAssets.backplates.marketTown}")` }}>
            <span className="rounded-md border border-brass bg-[#201309]/90 px-4 py-2 font-display text-xl text-[#fff1c9]">{market.name}</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {starterChoices.map((choice) => (
              <button key={choice} className={`flex min-h-16 items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition ${starter === choice ? "border-[#1f5960] bg-[#1f5960]/20 text-[#1c1309]" : "border-[#9a7138]/60 bg-[#fff6d7]/35 text-[#3b260f] hover:border-[#1f5960]"}`} type="button" onClick={() => setStarter(choice)}>
                <CheckCircle2 size={15} /> {choice}
              </button>
            ))}
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-2">
            <StatChip label="Difficulty" value={difficulty} />
            <StatChip label="Origin" value={background} />
            <StatChip label="Starter" value={starter} />
          </dl>
        </Panel>
      </div>
    </ScreenFrame>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="grid gap-1 text-sm text-[#725331]"><span className="font-bold text-[#5a3715]">{label}</span>{children}</label>;
}
