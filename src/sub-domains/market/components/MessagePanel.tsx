import { BrassDivider, Panel } from "../../../components/ui";

export function MessagePanel({ message, modStatus }: { message: string; modStatus: string }) {
  return (
    <Panel className="message-panel" title="Merchant Log">
      <p>{message}</p>
      <BrassDivider />
      <p className="message-panel-status">{modStatus}</p>
    </Panel>
  );
}
