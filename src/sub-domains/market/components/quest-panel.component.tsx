import { ScrollText } from "lucide-react";
import type { Marketplace } from "@/data/types";
import { Panel } from "@/sub-domains/shared/components/ui";

export function QuestPanel({ market }: { market: Marketplace }) {
  const quest = market.quest;
  const event = market.event;
  const hasQuest = Boolean(quest?.name);
  const hasEvent = Boolean(event?.name);

  return (
    <Panel title={<span><ScrollText size={18} /> Market Notes</span>}>
      <div className="market-notes-grid">
        <div className="note-card">
          <strong>{hasQuest ? quest?.name : "No local quest"}</strong>
          <p>{quest?.todo || "No active task is listed for this market."}</p>
          {quest?.questItems?.length ? <p>Items: {quest.questItems.join(", ")}</p> : null}
        </div>
        <div className="note-card">
          <strong>{hasEvent ? event?.name : "No scheduled event"}</strong>
          <p>{event?.frequency || "No event timing is listed."}</p>
          {event?.characterName ? <p>Contact: {event.characterName}</p> : null}
        </div>
      </div>
    </Panel>
  );
}
