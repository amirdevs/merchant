import { useState } from "react";
import { BadgeCheck, Banknote, Building2, PackageOpen, ShieldCheck, ShipWheel, Wrench } from "lucide-react";
import type { GameState } from "@/lib/game";
import { currentKingdom, currentMarket, items, marketplaces } from "@/lib/game";
import { coinQuantity } from "@/lib/economy";
import { money } from "@/lib/format";
import { uiAssets } from "@/lib/ui-assets";
import { activePermit, kingdomHeat } from "@/lib/law";
import { marketWarehouse, warehouseCapacityStatus } from "@/lib/company";
import { visibleQuantity } from "@/lib/inventory";
import { Button, LedgerRow, Panel, ScreenFrame, StatChip } from "@/components/ui";

type CompanyViewProps = {
  state: GameState;
  onBack: () => void;
  onOpenWarehouse: () => void;
  onDepositWarehouse: (itemIndex: number, quantity: number) => void;
  onWithdrawWarehouse: (itemIndex: number, quantity: number) => void;
  onBankDeposit: (amount: number) => void;
  onBankWithdraw: (amount: number) => void;
  onTakeLoan: () => void;
  onRepayLoan: () => void;
  onStartShipment: (marketIndex: number) => void;
  onRepairPackhorses: () => void;
  onUpgradeConcealment: () => void;
  onBuyPermit: (forged?: boolean) => void;
};

export function CompanyView({ state, onBack, onOpenWarehouse, onDepositWarehouse, onWithdrawWarehouse, onBankDeposit, onBankWithdraw, onTakeLoan, onRepayLoan, onStartShipment, onRepairPackhorses, onUpgradeConcealment, onBuyPermit }: CompanyViewProps) {
  const market = currentMarket(state);
  const warehouse = marketWarehouse(state.company.warehouses, market.index);
  const warehouseStatus = warehouse ? warehouseCapacityStatus(warehouse, items) : null;
  const [amount, setAmount] = useState(25);
  const copper = coinQuantity(state.playerInventory, items, "copper coins");
  const activeShipment = state.company.shipments.find((shipment) => shipment.status === "planned" || shipment.status === "in_transit");
  const kingdom = currentKingdom(state);
  const permit = activePermit(state.law, kingdom.index, state.day);
  const companyCash = Math.max(state.company.cashCopper || 0, state.company.bankCopper || 0);

  return (
    <ScreenFrame title="Merchant Company" eyebrow={state.company.name} backdrop={uiAssets.backplates.warehouseInventory} overlay="dark">
      <div className="grid flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
        <Panel title={<span className="inline-flex items-center gap-2"><Building2 size={18} /> {market.name} Warehouse</span>} variant="parchment">
          {!warehouse ? (
            <div className="grid gap-3 text-[#3b260f]">
              <p>Open a permanent warehouse here for 100 copper to store cargo outside travel capacity.</p>
              <Button onClick={onOpenWarehouse}>Open Warehouse</Button>
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="grid grid-cols-4 gap-2">
                <StatChip label="Stored Value" value={money(warehouseStatus?.valueCopper || 0)} />
                <StatChip label="Weight" value={`${warehouseStatus?.weight || 0}/${warehouse.capacityWeight}`} />
                <StatChip label="Size" value={`${warehouseStatus?.size || 0}/${warehouse.capacitySize}`} />
                <StatChip label="Weekly Fee" value={money(warehouse.weeklyFeeCopper)} />
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-display text-2xl text-[#26170a]">Carried Cargo</h3>
                  {state.playerInventory.filter((entry) => visibleQuantity(entry) > 0 && items[entry.itemIndex]?.name.toLowerCase() !== "copper coins").slice(0, 24).map((entry) => (
                    <LedgerRow key={entry.itemIndex} title={items[entry.itemIndex]?.name || "Unknown Item"} subtitle={`Carried ${visibleQuantity(entry)}`} trailing={<Button size="sm" onClick={() => onDepositWarehouse(entry.itemIndex, 1)}>Store 1</Button>} />
                  ))}
                </div>
                <div>
                  <h3 className="mb-2 font-display text-2xl text-[#26170a]">Stored Cargo</h3>
                  {warehouse.inventory.length ? warehouse.inventory.map((entry) => (
                    <LedgerRow key={entry.itemIndex} title={items[entry.itemIndex]?.name || "Unknown Item"} subtitle={`Stored ${visibleQuantity(entry)}`} trailing={<Button size="sm" variant="secondary" onClick={() => onWithdrawWarehouse(entry.itemIndex, 1)}>Take 1</Button>} />
                  )) : <p className="text-[#725331]">Warehouse is empty.</p>}
                </div>
              </div>
            </div>
          )}
        </Panel>

        <aside className="grid content-start gap-4">
          <Panel title="Caravan Workshop" variant="parchment">
            <div className="grid grid-cols-2 gap-2">
              <StatChip label="Horse Condition" value={`${state.caravan.packhorseCondition}%`} tone={state.caravan.packhorseCondition < 40 ? "danger" : "parchment"} />
              <StatChip label="Hidden Compartments" value={`Level ${state.caravan.concealmentLevel}`} />
              <StatChip label="Routes Logged" value={state.caravan.routeHistory.length} />
              <StatChip label="Mastered Routes" value={Object.values(state.caravan.routeMastery).filter((trips) => trips >= 3).length} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button onClick={onRepairPackhorses}><Wrench size={16} /> Care</Button>
              <Button variant="secondary" onClick={onUpgradeConcealment}><ShieldCheck size={16} /> Upgrade</Button>
            </div>
          </Panel>
          <Panel title={<span className="inline-flex items-center gap-2"><BadgeCheck size={18} /> Law and Permits</span>} variant="parchment">
            <div className="grid grid-cols-3 gap-2">
              <StatChip label="Kingdom Heat" value={kingdomHeat(state.law, kingdom.index)} tone={kingdomHeat(state.law, kingdom.index) >= 40 ? "danger" : "parchment"} />
              <StatChip label="Permit" value={permit ? (permit.forged ? "Forged" : "Official") : "None"} />
              <StatChip label="Underworld" value={state.law.blackMarketReputation} />
            </div>
            {permit ? <p className="mt-2 text-sm font-bold text-[#1f5960]">Valid through day {permit.expiresDay}, quality {permit.quality}.</p> : null}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button onClick={() => onBuyPermit(false)}>Official Permit</Button>
              <Button variant="secondary" disabled={state.law.blackMarketReputation < 2} onClick={() => onBuyPermit(true)}>Forged Permit</Button>
            </div>
          </Panel>
          <Panel title={<span className="inline-flex items-center gap-2"><Banknote size={18} /> Bank and Loans</span>} variant="parchment">
            <div className="grid grid-cols-3 gap-2">
              <StatChip label="Purse" value={money(copper)} />
              <StatChip label="Company" value={money(companyCash)} />
              <StatChip label="Debt" value={money(state.company.loanBalance)} tone={state.company.loanBalance ? "danger" : "parchment"} />
            </div>
            <label className="mt-3 flex items-center gap-2 text-sm font-bold text-[#3b260f]">Amount<input className="w-24 rounded-sm border border-[#9a7138]/60 bg-[#fff8df] px-2 py-1" min={1} type="number" value={amount} onChange={(event) => setAmount(Number(event.target.value))} /></label>
            <div className="mt-3 grid grid-cols-2 gap-2"><Button onClick={() => onBankDeposit(amount)}>Deposit</Button><Button variant="secondary" onClick={() => onBankWithdraw(amount)}>Withdraw</Button><Button onClick={onTakeLoan}>Borrow 100</Button><Button variant="secondary" onClick={onRepayLoan}>Repay Loan</Button></div>
          </Panel>
          <Panel title={<span className="inline-flex items-center gap-2"><ShipWheel size={18} /> Shipments</span>} variant="parchment">
            {activeShipment ? <p className="mb-3 text-sm font-bold text-[#1f5960]">Active route to {marketplaces[activeShipment.toMarketIndex]?.name || "unknown market"}, due day {activeShipment.arrivalDay}.</p> : null}
            <div className="grid gap-2">
              {market.connections.map((route) => <Button key={route.marketplaceIndex} disabled={Boolean(activeShipment)} variant="secondary" onClick={() => onStartShipment(route.marketplaceIndex)}><PackageOpen size={16} /> {marketplaces[route.marketplaceIndex].name}</Button>)}
            </div>
            <div className="mt-3 grid gap-1 text-sm text-[#3b260f]">
              {state.company.shipments.slice(-5).reverse().map((shipment) => (
                <span key={shipment.id}>
                  {marketplaces[shipment.toMarketIndex]?.name || "Unknown"}: {shipment.status} / toll {money(shipment.tollCopper)} / insured {shipment.insured ? money(shipment.insuranceCopper) : "no"}
                </span>
              ))}
            </div>
          </Panel>
          <Button variant="secondary" onClick={onBack}>Back To Market</Button>
        </aside>
      </div>
    </ScreenFrame>
  );
}
