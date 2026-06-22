import { ScrollText } from "lucide-react";
import type { Marketplace } from "@/data/types";
import { Panel } from "@/components/ui";

export function MarketNotes({ market }: { market: Marketplace }) {
  const quest = market.quest;
  const event = market.event;
  const hasQuest = Boolean(quest?.name);
  const hasEvent = Boolean(event?.name);

  return (
    <Panel title={<span className="flex items-center gap-2"><ScrollText size={18} /> Market Notes</span>}>
      <div className="grid grid-cols-2 gap-2 text-sm max-[760px]:grid-cols-1">
        <div className="border border-brass/35 bg-black/25 p-2">
          <strong className="text-brass">{hasQuest ? quest?.name : "No local quest"}</strong>
          <p className="mt-1 text-parchment-muted">{quest?.todo || "No active task is listed for this market."}</p>
          {quest?.questItems?.length ? <p className="mt-2 truncate text-parchment-muted">Items: {quest.questItems.join(", ")}</p> : null}
        </div>
        <div className="border border-brass/35 bg-black/25 p-2">
          <strong className="text-brass">{hasEvent ? event?.name : "No scheduled event"}</strong>
          <p className="mt-1 text-parchment-muted">{event?.frequency || "No event timing is listed."}</p>
          {event?.characterName ? <p className="mt-2 text-parchment-muted">Contact: {event.characterName}</p> : null}
        </div>
      </div>
    </Panel>
  );
}
