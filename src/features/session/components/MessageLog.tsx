import { Panel } from "@/components/ui";

export function MessageLog({ message, modStatus }: { message: string; modStatus: string }) {
  return (
    <Panel className="max-h-40 min-h-20 overflow-auto leading-relaxed">
      <p>{message}</p>
      <p className="mt-2 text-sm text-parchment-muted">{modStatus}</p>
    </Panel>
  );
}
