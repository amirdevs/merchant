import { ScrollText } from "lucide-react";
import type { currentMarket } from "../../../lib/game";
import { Panel } from "../../../components/ui";

export function QuestPanel({ market }: { market: ReturnType<typeof currentMarket> }) {
  const quest = market.quest;
  const event = market.event;
  const hasQuest = Boolean(quest?.name);
  const hasEvent = Boolean(event?.name);

  return (
    <Panel title={<span className="flex items-center gap-2"><ScrollText size={18} /> Market Notes</span>}>
      <div className="market-note-grid">
        <div className="market-note-card">
          <strong>{hasQuest ? quest?.name : "No local quest"}</strong>
          <p>{quest?.todo || "No active task is listed for this market."}</p>
          {quest?.questItems?.length ? <small>Items: {quest.questItems.join(", ")}</small> : null}
        </div>
        <div className="market-note-card">
          <strong>{hasEvent ? event?.name : "No scheduled event"}</strong>
          <p>{event?.frequency || "No event timing is listed."}</p>
          {event?.characterName ? <small>Contact: {event.characterName}</small> : null}
        </div>
      </div>
    </Panel>
  );
}
