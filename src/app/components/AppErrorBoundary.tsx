import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button, Panel } from "@/shared/components/ui";
import { uiAssets } from "@/shared/utils/ui-assets";

type AppErrorBoundaryProps = {
  children: ReactNode;
};

type AppErrorBoundaryState = {
  error: Error | null;
};

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Game view crashed", error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main
        className="grid min-h-dvh place-items-center bg-cover bg-center p-6 text-[#26170a]"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(15,9,5,.72), rgba(15,9,5,.25), rgba(15,9,5,.72)), url("${uiAssets.backplates.settingsRoom}")`,
        }}
      >
        <Panel className="max-w-2xl p-6" title={<span className="inline-flex items-center gap-2"><AlertTriangle size={20} /> Game View Error</span>} variant="parchment">
          <p className="text-base leading-snug text-[#3b260f]">This screen crashed, but the app shell is still running. Return to the main menu or reload after saving from another slot if needed.</p>
          <pre className="mt-4 max-h-48 overflow-auto rounded-sm border border-[#9a7138]/55 bg-[#fff6d7]/65 p-3 text-xs text-[#5a3917]">{this.state.error.message}</pre>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={() => window.location.assign(window.location.pathname)}>Main Menu</Button>
            <Button variant="secondary" onClick={() => this.setState({ error: null })}>Try Again</Button>
          </div>
        </Panel>
      </main>
    );
  }
}
