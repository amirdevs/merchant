import { Panel } from "../../../components/ui";

export function MessagePanel({ message, modStatus }: { message: string; modStatus: string }) {
  return (
    <Panel className="message-panel">
      <p>{message}</p>
      <p className="mt-2 text-sm text-parchment-muted">{modStatus}</p>
    </Panel>
  );
}
