import { useState } from "react";
import { Banknote, Building2, PackageOpen, ShipWheel } from "lucide-react";
import type { GameState } from "@/lib/game";
import { currentMarket, items, marketplaces, visibleQuantity } from "@/lib/game";
import { coinQuantity } from "@/lib/economy";
import { money } from "@/lib/format";
import { uiAssets } from "@/lib/ui-assets";
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
};

export function CompanyView({ state, onBack, onOpenWarehouse, onDepositWarehouse, onWithdrawWarehouse, onBankDeposit, onBankWithdraw, onTakeLoan, onRepayLoan, onStartShipment }: CompanyViewProps) {
  const market = currentMarket(state);
  const warehouse = state.company.warehouses[String(market.index)];
  const [amount, setAmount] = useState(25);
  const copper = coinQuantity(state.playerInventory, items, "copper coins");
  const activeShipment = state.company.shipments.find((shipment) => shipment.status === "active");

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
              <div className="grid gap-2 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-display text-2xl text-[#26170a]">Carried Cargo</h3>
                  {state.playerInventory.filter((entry) => visibleQuantity(entry) > 0 && items[entry.itemIndex].name.toLowerCase() !== "copper coins").slice(0, 20).map((entry) => (
                    <LedgerRow key={entry.itemIndex} title={items[entry.itemIndex].name} subtitle={`Carried ${visibleQuantity(entry)}`} trailing={<Button size="sm" onClick={() => onDepositWarehouse(entry.itemIndex, 1)}>Store 1</Button>} />
                  ))}
                </div>
                <div>
                  <h3 className="mb-2 font-display text-2xl text-[#26170a]">Stored Cargo</h3>
                  {warehouse.length ? warehouse.map((entry) => (
                    <LedgerRow key={entry.itemIndex} title={items[entry.itemIndex].name} subtitle={`Stored ${visibleQuantity(entry)}`} trailing={<Button size="sm" variant="secondary" onClick={() => onWithdrawWarehouse(entry.itemIndex, 1)}>Take 1</Button>} />
                  )) : <p className="text-[#725331]">Warehouse is empty.</p>}
                </div>
              </div>
            </div>
          )}
        </Panel>

        <aside className="grid content-start gap-4">
          <Panel title={<span className="inline-flex items-center gap-2"><Banknote size={18} /> Bank and Loans</span>} variant="parchment">
            <div className="grid grid-cols-3 gap-2">
              <StatChip label="Purse" value={money(copper)} />
              <StatChip label="Company" value={money(state.company.bankCopper)} />
              <StatChip label="Debt" value={money(state.company.loanBalance)} tone={state.company.loanBalance ? "danger" : "parchment"} />
            </div>
            <label className="mt-3 flex items-center gap-2 text-sm font-bold text-[#3b260f]">Amount<input className="w-24 rounded-sm border border-[#9a7138]/60 bg-[#fff8df] px-2 py-1" min={1} type="number" value={amount} onChange={(event) => setAmount(Number(event.target.value))} /></label>
            <div className="mt-3 grid grid-cols-2 gap-2"><Button onClick={() => onBankDeposit(amount)}>Deposit</Button><Button variant="secondary" onClick={() => onBankWithdraw(amount)}>Withdraw</Button><Button onClick={onTakeLoan}>Borrow 100</Button><Button variant="secondary" onClick={onRepayLoan}>Repay Loan</Button></div>
          </Panel>
          <Panel title={<span className="inline-flex items-center gap-2"><ShipWheel size={18} /> Shipments</span>} variant="parchment">
            {activeShipment ? <p className="mb-3 text-sm font-bold text-[#1f5960]">Active route to {marketplaces[activeShipment.toMarketIndex].name}, due day {activeShipment.dueDay}.</p> : null}
            <div className="grid gap-2">
              {market.connections.map((route) => <Button key={route.marketplaceIndex} disabled={Boolean(activeShipment)} variant="secondary" onClick={() => onStartShipment(route.marketplaceIndex)}><PackageOpen size={16} /> {marketplaces[route.marketplaceIndex].name}</Button>)}
            </div>
            <div className="mt-3 grid gap-1 text-sm text-[#3b260f]">
              {state.company.shipments.slice(-5).reverse().map((shipment) => <span key={shipment.id}>{marketplaces[shipment.toMarketIndex].name}: {shipment.status} / cost {shipment.cost} / reward {shipment.reward}</span>)}
            </div>
          </Panel>
          <Button variant="secondary" onClick={onBack}>Back To Market</Button>
        </aside>
      </div>
    </ScreenFrame>
  );
}
